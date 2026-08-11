import { mkdir, readdir, readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readers = JSON.parse(await readFile(path.join(root, "data/readers.json"), "utf8"));
const downloadDir = path.join(root, "public", "downloads");
const files = {};
for (const name of await readdir(downloadDir)) {
  files[name] = (await readFile(path.join(downloadDir, name))).toString("base64");
}
const template = await readFile(path.join(root, "worker", "template.js"), "utf8");
const bundled = template
  .replace("__READERS__", JSON.stringify(readers.readers))
  .replace("__FILES__", JSON.stringify(files));
const dist = path.join(root, "dist");
await mkdir(path.join(dist, "server"), { recursive: true });
await mkdir(path.join(dist, ".openai"), { recursive: true });
await writeFile(path.join(dist, "server", "index.js"), bundled);
await copyFile(path.join(root, ".openai", "hosting.json"), path.join(dist, ".openai", "hosting.json"));
console.log(`Built ${Object.keys(files).length} downloadable readers.`);
