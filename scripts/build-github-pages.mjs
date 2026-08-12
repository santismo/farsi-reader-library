import { availableParallelism } from "node:os";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "pages-dist");
const workerPath = path.join(root, "dist", "server", "index.js");
const renderWorker = new URL("./github-pages-render-worker.mjs", import.meta.url);
const { readers } = JSON.parse(await readFile(path.join(root, "data", "readers.json"), "utf8"));

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const tasks = [
  { requestPath: "/", destination: "index.html" },
  { requestPath: "/resources", destination: "resources/index.html" },
  { requestPath: "/library-downloads", destination: "library-downloads/index.html" },
  { destination: "piper-worker.js", piperWorker: true },
  { destination: "assets/site.css", assetName: "site.css" },
  { destination: "assets/common.js", assetName: "common.js" },
  { destination: "assets/piper-client.js", assetName: "piper-client.js" },
  { destination: "assets/reader.js", assetName: "reader.js" },
];

let sectionCount = 0;
for (const reader of readers) {
  for (const week of reader.weeks) {
    sectionCount += 1;
    const route = `/read/${reader.slug}/${week.number}`;
    const directory = `read/${reader.slug}/${week.number}`;
    tasks.push(
      { requestPath: route, destination: `${directory}/index.html`, readerSlug: reader.slug },
      { requestPath: `${route}?edition=teacher`, destination: `${directory}/teacher/index.html`, readerSlug: reader.slug, teacher: true },
    );
  }
}

const threadCount = Math.max(1, Math.min(8, availableParallelism(), tasks.length));
await new Promise((resolve, reject) => {
  let nextTask = 0;
  let closedThreads = 0;
  let settled = false;
  const threads = [];

  function stopWithError(error) {
    if (settled) return;
    settled = true;
    for (const thread of threads) thread.terminate();
    reject(error);
  }

  function assign(thread) {
    if (nextTask < tasks.length) thread.postMessage(tasks[nextTask++]);
    else thread.postMessage(null);
  }

  for (let index = 0; index < threadCount; index += 1) {
    const thread = new Worker(renderWorker, { workerData: { output, workerPath } });
    threads.push(thread);
    thread.on("message", (message) => {
      if (!message.ok) {
        stopWithError(new Error(message.error));
        return;
      }
      assign(thread);
    });
    thread.on("error", stopWithError);
    thread.on("exit", (code) => {
      if (settled) return;
      if (code !== 0) {
        stopWithError(new Error(`A static rendering worker exited with code ${code}.`));
        return;
      }
      closedThreads += 1;
      if (closedThreads === threadCount) {
        settled = true;
        resolve();
      }
    });
    assign(thread);
  }
});

await cp(path.join(root, "public", "downloads"), path.join(output, "downloads"), { recursive: true });
await cp(path.join(root, "public", "og.png"), path.join(output, "og.png"));
await writeFile(path.join(output, ".nojekyll"), "");

const notFound = `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>صفحه پیدا نشد</title><style>body{font-family:Tahoma,Arial,sans-serif;display:grid;min-height:100vh;place-content:center;margin:0;background:#f4f1e8;color:#123f38;text-align:center}a{color:#ad552d}</style></head><body><main><h1>این صفحه پیدا نشد.</h1><p><a href="/farsi-reader-library/">بازگشت به کتابخانه</a></p></main></body></html>`;
await writeFile(path.join(output, "404.html"), notFound);

console.log(`Built GitHub Pages mirror with ${threadCount} render workers: ${readers.length} readers, ${sectionCount} student pages, and ${sectionCount} teacher pages.`);
