import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { readers } = JSON.parse(await readFile(path.join(root, "data/readers.json"), "utf8"));
const repository = "https://github.com/santismo/farsi-reader-library";
const website = "https://farsi.ojertrejo.chatgpt.site";
const raw = "https://raw.githubusercontent.com/santismo/farsi-reader-library/main/public/downloads";
const categoryOrder = ["راهنمای AFH", "علوم و فناوری", "شاهنامه", "شعر", "نثر"];

const rows = readers.map((reader) =>
  `| ${reader.title_fa} | ${reader.title_en} | [Student / دانشجو](${raw}/${reader.student}) | [Teacher / مدرس](${raw}/${reader.teacher}) |`,
).join("\n");

const catalog = `# Complete DOCX downloads

Every title in the online library has two complete Word downloads. Student editions are Persian-only study readers. Teacher editions retain the same Persian text and add English translations or teaching support.

| فارسی | English | Student DOCX | Teacher DOCX |
|---|---|---|---|
${rows}

You can also [download the complete repository as a ZIP](${repository}/archive/refs/heads/main.zip) or use the [site download catalog](${website}/library-downloads).
`;

const groups = categoryOrder.map((category) => {
  const titles = readers.filter((reader) => reader.category === category);
  if (!titles.length) return "";
  return `- **${category}:** ${titles.map((reader) => reader.title_fa).join("، ")}`;
}).filter(Boolean).join("\n");

const readme = `# Farsi Reader Library · کتابخانهٔ خوانش فارسی

The complete source and document collection behind [farsi.ojertrejo.chatgpt.site](${website}). The library contains ${readers.length} Persian readers with sentence-level English support, student and teacher modes, listening practice, and full Word downloads.

## Download the materials

- [Browse every Student and Teacher DOCX](DOWNLOADS.md)
- [Download the complete repository as a ZIP](${repository}/archive/refs/heads/main.zip)
- [Read and listen on the live site](${website})

## Collection

${groups}

The collection currently includes ${readers.reduce((total, reader) => total + reader.weeks.length, 0).toLocaleString("en-US")} sections and ${readers.reduce((total, reader) => total + reader.weeks.reduce((sum, week) => sum + week.lines.filter((line) => line.kind !== "heading").length, 0), 0).toLocaleString("en-US")} Persian reading lines.

## Repository layout

- \`public/downloads/\`: all complete student and teacher DOCX files
- \`data/readers.json\`: the full structured bilingual reader corpus used by the site
- \`worker/template.js\`: the site interface, reader mode, downloads catalog, and audio controls
- \`scripts/\`: corpus normalization, handbook synchronization, document generation, validation, and deployment build tools

## Build

This is a dependency-free Sites Worker project. Run \`npm run build\` to create the deployable worker in \`dist/\`, then run \`node scripts/validate-artifact.mjs\` to verify the artifact.

## Notes

The modern educational prose uses standard contemporary Persian orthography and avoids unnecessary short-vowel marks. Classical poetry and source-specific historical forms are preserved when appropriate. The AFH materials retain their educational structure while using reviewed Persian terminology.
`;

await Promise.all([
  writeFile(path.join(root, "DOWNLOADS.md"), catalog),
  writeFile(path.join(root, "README.md"), readme),
]);

console.log(`Indexed ${readers.length} readers and ${readers.length * 2} complete DOCX downloads.`);
