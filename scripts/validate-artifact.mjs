import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const workerPath = resolve(projectRoot, "dist/server/index.js");
const manifestPath = resolve(projectRoot, "dist/.openai/hosting.json");

const [source, manifest] = await Promise.all([
  readFile(workerPath, "utf8"),
  readFile(manifestPath, "utf8"),
]);
JSON.parse(manifest);

// A data URL forces ESM parsing even though the generated output has no package.json.
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const workerModule = await import(moduleUrl);
assert.equal(
  typeof workerModule.default?.fetch,
  "function",
  `${pathToFileURL(workerPath)} must export default.fetch`,
);

for (const pdf of [
  "AFH1_2025_Farsi_Student_Study_Handbook.pdf",
  "AFH1_2025_Farsi_English_Teacher_Handbook.pdf",
]) {
  const response = await workerModule.default.fetch(new Request(`https://example.com/downloads/${pdf}`, { redirect: "manual" }));
  assert.equal(response.status, 302, `${pdf} must redirect to the GitHub Pages download.`);
  assert.equal(
    response.headers.get("location"),
    `https://santismo.github.io/farsi-reader-library/downloads/${pdf}`,
    `${pdf} must redirect to its matching fixed-layout file.`,
  );
}

console.log("Artifact is valid ESM, exports default.fetch, and preserves AFH PDF downloads.");
