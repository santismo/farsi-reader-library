import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { readers } = JSON.parse(await readFile(path.join(root, "data", "readers.json"), "utf8"));
const handbook = readers.find((reader) => reader.slug === "afh1-2025");
if (!handbook) throw new Error("The AFH reader is missing.");

const problems = [];
let alignedLines = 0;
let sourceForms = 0;

for (const week of handbook.weeks) {
  for (const line of week.lines) {
    const forms = [...String(line.gloss ?? "").matchAll(/\b(Airmen|Airman)(?:['’]s)?\b/giu)];
    if (!forms.length) continue;
    alignedLines += 1;
    sourceForms += forms.length;

    const expectedPlural = forms.filter((form) => form[1].toLocaleLowerCase("en-US") === "airmen").length;
    const expectedSingular = forms.length - expectedPlural;
    const plural = [...line.text.matchAll(/هوانوردان/gu)].length;
    const singular = [...line.text.matchAll(/هوانورد(?!ان)/gu)].length;

    if (plural < expectedPlural || singular < expectedSingular) {
      problems.push(`${line.id}: expected ${expectedSingular} singular/${expectedPlural} plural; found ${singular}/${plural}`);
    }
    const requiredPhrases = [
      [/\bAirmen Basic\b/iu, "هوانوردان پایه"],
      [/\bAirman Basic\b/iu, "هوانورد پایه"],
      [/\bAirmen First Class\b/iu, "هوانوردان درجه‌یک"],
      [/\bAirman First Class\b/iu, "هوانورد درجه‌یک"],
      [/\bSenior Airmen\b/iu, "هوانوردان ارشد"],
      [/\bSenior Airman\b/iu, "هوانورد ارشد"],
      [/\bAirman Leadership School\b/iu, "مدرسهٔ رهبری هوانورد"],
      [/\bAirman Comprehensive Assessment\b/iu, "ارزیابی جامع هوانورد"],
      [/\bAirman['’]s Creed\b/iu, "مرام‌نامهٔ هوانورد"],
      [/\bLanguage Enabled Airman Program\b/iu, "برنامهٔ هوانورد زبان‌دان"],
    ];
    for (const [sourcePhrase, persianPhrase] of requiredPhrases) {
      if (sourcePhrase.test(line.gloss) && !line.text.includes(persianPhrase)) {
        problems.push(`${line.id}: ${sourcePhrase.source} must use ${persianPhrase}`);
      }
    }
    for (const legacy of ["ایرمن", "هوانیروز", "هوادار", "هواپیمای آمریکایی"]) {
      if (line.text.includes(legacy)) problems.push(`${line.id}: legacy rendering remains: ${legacy}`);
    }
  }
}

for (const week of handbook.weeks) {
  for (const line of week.lines) {
    for (const malformed of ["هوانوردانان", "هوانوردانانی", "عضو نیروی هوایی’س", "ایرمن", "هوانیروز"]) {
      if (line.text.includes(malformed)) problems.push(`${line.id || "heading"}: malformed or legacy rendering remains: ${malformed}`);
    }
  }
}

if (problems.length) throw new Error(`Airman terminology validation failed:\n${problems.join("\n")}`);
console.log(`Validated ${sourceForms} Airman/Airmen forms across ${alignedLines} AFH lines.`);
