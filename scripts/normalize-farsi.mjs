import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "readers.json");
const payload = JSON.parse(await readFile(dataPath, "utf8"));

const proseReplacements = new Map([
  ["مفهوم‌های اصلی این بحث", "محورهای اصلی این بحث"],
  ["برای فهم دقیق، مشاهده، اندازه‌گیری و مدل‌سازی باید در کنار هم به کار روند.", "برای فهم دقیق‌تر، مشاهده، اندازه‌گیری و مدل‌سازی باید در کنار هم قرار بگیرند."],
  ["یک نتیجهٔ علمی زمانی نیرومندتر است که با داده‌های تازه و آزمون مستقل سنجیده شود.", "نتیجهٔ علمی وقتی معتبرتر است که با داده‌های تازه و آزمون مستقل سنجیده شود."],
  ["پرسش گفت‌وگو این است:", "برای گفت‌وگو:"],
  ["جانداران از سلول‌ها ساخته شده‌اند و برای ادامهٔ زندگی انرژی می‌گیرند و سامان می‌دهند.", "جانداران از سلول‌ها ساخته شده‌اند، انرژی مصرف می‌کنند و نظم درونی خود را حفظ می‌کنند."],
]);

function canonicalize(value, stripVowels = true) {
  let text = String(value ?? "")
    .normalize("NFC")
    .replaceAll("ي", "ی")
    .replaceAll("ى", "ی")
    .replaceAll("ك", "ک")
    .replaceAll("ۀ", "هٔ")
    .replace(/[\u00a0\u2007\u202f]/gu, " ")
    .replace(/\s+([،؛؟!])/gu, "$1")
    .replace(/ {2,}/gu, " ")
    .trim();

  // Keep hamza-above (ٔ), which is part of standard Persian ezafe spelling.
  if (stripVowels) text = text.replace(/[\u064b-\u0653\u0655-\u065f\u0670]/gu, "");
  // Only join a true verb prefix at the start of a token; do not alter words
  // ending in «می», such as «علمی زمانی» or classical «همی گفت».
  text = text.replace(/(?<![\u0600-\u06ff])(ن?می) (?=[\u0600-\u06ff])/gu, "$1‌");

  for (const [before, after] of proseReplacements) text = text.replaceAll(before, after);
  return text;
}

for (const reader of payload.readers) {
  const literaryVerse = reader.category === "شاهنامه" || reader.category === "شعر";
  reader.title_fa = canonicalize(reader.title_fa, !literaryVerse);
  for (const week of reader.weeks) {
    week.title_fa = canonicalize(week.title_fa, !literaryVerse);
    week.section_fa = canonicalize(week.section_fa, !literaryVerse);
    week.vocab = week.vocab.map((value) => canonicalize(value, !literaryVerse));
    for (const line of week.lines) {
      const looksLikeVerse = literaryVerse || line.text.includes("/");
      line.text = canonicalize(line.text, !looksLikeVerse);
    }
  }
}

await writeFile(dataPath, JSON.stringify(payload), "utf8");
console.log(`Normalized ${payload.readers.length} readers.`);
