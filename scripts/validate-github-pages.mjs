import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "pages-dist");
const basePath = "/farsi-reader-library";
const { readers } = JSON.parse(await readFile(path.join(root, "data", "readers.json"), "utf8"));

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const item = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(item) : [item];
  }));
  return nested.flat();
}

async function requireFile(file) {
  try {
    await access(file);
  } catch {
    throw new Error(`Missing generated file: ${path.relative(output, file)}`);
  }
}

const allFiles = await filesBelow(output);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const indexFiles = htmlFiles.filter((file) => path.basename(file) === "index.html");
const publicDownloads = (await readdir(path.join(root, "public", "downloads"))).sort();
const generatedDownloads = (await readdir(path.join(output, "downloads"))).sort();
const sectionCount = readers.reduce((total, reader) => total + reader.weeks.length, 0);
const expectedIndexes = 3 + sectionCount * 2;

if (indexFiles.length !== expectedIndexes) {
  throw new Error(`Expected ${expectedIndexes} index pages, found ${indexFiles.length}.`);
}
if (JSON.stringify(publicDownloads) !== JSON.stringify(generatedDownloads)) {
  throw new Error("The generated document downloads do not match public/downloads.");
}

await Promise.all([
  requireFile(path.join(output, "index.html")),
  requireFile(path.join(output, "resources", "index.html")),
  requireFile(path.join(output, "library-downloads", "index.html")),
  requireFile(path.join(output, "piper-worker.js")),
  requireFile(path.join(output, "assets", "site.css")),
  requireFile(path.join(output, "assets", "common.js")),
  requireFile(path.join(output, "assets", "piper-client.js")),
  requireFile(path.join(output, "assets", "reader.js")),
  requireFile(path.join(output, "og.png")),
  requireFile(path.join(output, ".nojekyll")),
]);

for (const reader of readers) {
  for (const week of reader.weeks) {
    const directory = path.join(output, "read", reader.slug, String(week.number));
    await requireFile(path.join(directory, "index.html"));
    await requireFile(path.join(directory, "teacher", "index.html"));
  }
}

for (const pdf of [
  "AFH1_2025_Farsi_Student_Study_Handbook.pdf",
  "AFH1_2025_Farsi_English_Teacher_Handbook.pdf",
]) {
  const header = await readFile(path.join(output, "downloads", pdf), { encoding: null });
  if (header.subarray(0, 5).toString("ascii") !== "%PDF-") {
    throw new Error(`Invalid PDF download: ${pdf}`);
  }
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (html.includes("?edition=teacher")) throw new Error(`Dynamic teacher link remains in ${path.relative(output, file)}.`);
  if (html.includes("new SharedWorker('/piper-worker.js") || html.includes("new Worker('/piper-worker.js")) {
    throw new Error(`Root-level Piper path remains in ${path.relative(output, file)}.`);
  }
  if (/href="\/(?!farsi-reader-library(?:\/|#))/.test(html)) {
    throw new Error(`Unscoped root link remains in ${path.relative(output, file)}.`);
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith(basePath)) continue;
    const pathname = decodeURIComponent(href.split("#", 1)[0].split("?", 1)[0]);
    if (!pathname.startsWith(basePath)) continue;
    const relative = pathname.slice(basePath.length).replace(/^\//, "");
    const target = relative === ""
      ? path.join(output, "index.html")
      : relative.endsWith("/")
        ? path.join(output, relative, "index.html")
        : path.join(output, relative);
    await requireFile(target);
  }
}

console.log(`Validated ${indexFiles.length} routes and ${generatedDownloads.length} complete document downloads for GitHub Pages.`);
