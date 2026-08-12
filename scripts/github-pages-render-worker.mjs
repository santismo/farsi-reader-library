import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parentPort, workerData } from "node:worker_threads";
import { pagesOrigin, pagesUrl, staticAsset, staticHtml } from "./github-pages-helpers.mjs";

const { staticSite } = await import(pathToFileURL(workerData.workerPath).href);

parentPort.on("message", async (task) => {
  if (task === null) {
    parentPort.close();
    return;
  }

  try {
    const destination = path.join(workerData.output, task.destination);
    const content = task.piperWorker
      ? staticSite.piperWorkerScript
      : task.assetName
        ? staticAsset(staticSite.assets[task.assetName], task.assetName)
        : staticHtml(staticSite.render(new URL(`${pagesOrigin}${task.requestPath}`).pathname, task.teacher, pagesUrl), { readerSlug: task.readerSlug, teacher: task.teacher });
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, content);
    parentPort.postMessage({ ok: true });
  } catch (error) {
    parentPort.postMessage({ ok: false, error: error.stack || error.message || String(error) });
  }
});
