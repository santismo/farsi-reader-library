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
  ["می‌باشد", "است"],
  ["می‌باشند", "هستند"],
  ["نمی‌باشد", "نیست"],
  ["نمی‌باشند", "نیستند"],
  ["در رابطه با", "درباره"],
  ["به منظور", "برای"],
  ["مورد استفاده قرار می‌گیرد", "استفاده می‌شود"],
  ["مورد استفاده قرار می‌گیرند", "استفاده می‌شوند"],
  ["مورد استفاده قرار گرفت", "استفاده شد"],
  ["مورد استفاده قرار گرفتند", "استفاده شدند"],
  ["اطمینان حاصل کنید که", "مطمئن شوید که"],
  ["اجازه می‌دهد تا", "اجازه می‌دهد"],
  ["اجازه می‌دهند تا", "اجازه می‌دهند"],
  ["ثبت نام", "ثبت‌نام"],
  ["راه اندازی", "راه‌اندازی"],
  ["برنامه ریزی", "برنامه‌ریزی"],
  ["تصمیم گیری", "تصمیم‌گیری"],
  ["پیاده سازی", "پیاده‌سازی"],
  ["جمع آوری", "جمع‌آوری"],
  ["بهره برداری", "بهره‌برداری"],
  ["درجه بندی", "درجه‌بندی"],
  ["آماده سازی", "آماده‌سازی"],
  ["گزارش دهی", "گزارش‌دهی"],
  ["فارغ التحصیل", "فارغ‌التحصیل"],
  ["دانش آموز", "دانش‌آموز"],
  ["کهنه سرباز", "کهنه‌سرباز"],
  ["وب سایت", "وب‌سایت"],
  ["خط مشی", "خط‌مشی"],
  ["فوق العاده", "فوق‌العاده"],
  ["به علاوه", "به‌علاوه"],
  ["بعلاوه", "به‌علاوه"],
  ["گفت و گو", "گفت‌وگو"],
  ["جست و جو", "جست‌وجو"],
  ["دست کم", "دست‌کم"],
  ["حرفه ای گرایی", "حرفه‌ای‌گری"],
  ["حرفه گرایی", "حرفه‌ای‌گری"],
  ["هم تیمی", "هم‌تیمی"],
  ["کار گروهی", "کار تیمی"],
  ["چند دامنه ای", "چندحوزه‌ای"],
  ["حوزه‌های مورد بحث", "عرصه‌های مورد مناقشه"],
  ["با ارائه نیروی هوایی", "با به‌کارگیری قدرت هوایی"],
  ["از دشمنان خود جلوگیری می‌کنیم", "دشمنان خود را بازمی‌داریم"],
]);

function canonicalize(value, stripVowels = true) {
  let text = String(value ?? "")
    .normalize("NFC")
    .replaceAll("ي", "ی")
    .replaceAll("ى", "ی")
    .replaceAll("ك", "ک")
    .replaceAll("ۀ", "هٔ")
    .replace(/[\u00a0\u2007\u202f]/gu, " ")
    .replace(/\s+([،؛:؟!])/gu, "$1")
    .replace(/ {2,}/gu, " ")
    .trim();

  // Keep hamza-above (ٔ), which is part of standard Persian ezafe spelling.
  if (stripVowels) text = text.replace(/[\u064b-\u0653\u0655-\u065f\u0670]/gu, "");
  // Only join a true verb prefix at the start of a token; do not alter words
  // ending in «می», such as «علمی زمانی» or classical «همی گفت».
  text = text.replace(/(?<![\u0600-\u06ff])(ن?می) (?=[\u0600-\u06ff])/gu, "$1‌");

  if (stripVowels) {
    // Standard contemporary Persian spacing. These changes are deliberately
    // excluded from verse, where the source spelling and meter are preserved.
    text = text
      .replace(/([\u0600-\u06ff]) (ها|های)(?![\u0600-\u06ff])/gu, "$1‌$2")
      .replace(/([\u0600-\u06ff]) (تر|ترین)(?![\u0600-\u06ff])/gu, "$1‌$2")
      .replace(/ه (ای|ام|ات|اش|ایم|اید|اند)(?![\u0600-\u06ff])/gu, "ه‌$1")
      .replace(/(?<![\u0600-\u06ff])به عنوان(?![\u0600-\u06ff])/gu, "به‌عنوان")
      .replace(/(?<![\u0600-\u06ff])به طور(?![\u0600-\u06ff])/gu, "به‌طور")
      .replace(/(?<![\u0600-\u06ff])به کار(?=[\u0600-\u06ff])/gu, "به‌کار")
      .replace(/(?<![\u0600-\u06ff])به ویژه(?![\u0600-\u06ff])/gu, "به‌ویژه")
      .replace(/(?<![\u0600-\u06ff])به روز(?![\u0600-\u06ff])/gu, "به‌روز")
      .replace(/(?<![\u0600-\u06ff])رو به رو(?![\u0600-\u06ff])/gu, "روبه‌رو")
      .replace(/(?<![\u0600-\u06ff])ماموریت/gu, "مأموریت")
      .replace(/(?<![\u0600-\u06ff])تایید/gu, "تأیید")
      .replace(/(?<![\u0600-\u06ff])تامین/gu, "تأمین")
      .replace(/(?<![\u0600-\u06ff])تاثیر/gu, "تأثیر")
      .replace(/(?<![\u0600-\u06ff])مساله/gu, "مسئله")
      .replace(/(?<![\u0600-\u06ff])مسوول/gu, "مسئول")
      .replace(/(?<![\u0600-\u06ff])موثر/gu, "مؤثر")
      .replace(/(?<![\u0600-\u06ff])مهمتر(?![\u0600-\u06ff])/gu, "مهم‌تر")
      .replace(/(?<![\u0600-\u06ff])قبلا(?![\u0600-\u06ff])/gu, "پیش‌تر")
      .replace(/,(?=\D|$)/gu, "،")
      .replace(/;/gu, "؛");
  }

  for (const [before, after] of proseReplacements) text = text.replaceAll(before, after);

  if (stripVowels) {
    text = text.replace(
      /^برای گفت‌وگو: (.+) چگونه بر زندگی، تصمیم یا فناوری ما اثر می‌گذارد؟$/u,
      "برای گفت‌وگو: $1 چه تأثیری بر زندگی روزمره، تصمیم‌های ما یا فناوری دارد؟",
    );
  }
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
      // Slashes are common in military designations and URLs; they do not make
      // modern prose into verse. Literary categories alone preserve vocalized
      // source spelling.
      line.text = canonicalize(line.text, !literaryVerse);
    }
  }
}

await writeFile(dataPath, JSON.stringify(payload), "utf8");
console.log(`Normalized ${payload.readers.length} readers.`);
