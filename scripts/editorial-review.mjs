import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "readers.json");
const payload = JSON.parse(await readFile(dataPath, "utf8"));

// Human-reviewed corrections for the handbook's opening statement. These are
// intentionally keyed by stable sentence IDs so that the English source and
// the two downloadable editions remain aligned.
const handbookCorrections = new Map(Object.entries({
  "۰۰۱٫۰۱": "همکاران نیروی هوایی، نیروی هوایی ایالات متحده برای پرواز، نبرد و پیروزی تشکیل شده است.",
  "۰۰۱٫۰۲": "ما با به‌کارگیری قدرت هوایی در هر زمان و هر مکان، به متحدان خود اطمینان می‌بخشیم و دشمنانمان را بازمی‌داریم.",
  "۰۰۱٫۰۳": "نیروهای هوایی امروز به ندای کشور پاسخ داده‌اند و ما آماده‌ایم از میهن خود در برابر همهٔ دشمنان خارجی و داخلی دفاع کنیم.",
  "۰۰۱٫۰۴": "به پشتوانهٔ پیشگامان هوانوردی، اندیشمندان حوزهٔ قدرت هوایی و بدنه‌ای حرفه‌ای و توانمند از نیروهای درجه‌دار، مرگبارترین نیروی هوایی جهان هستیم.",
  "۰۰۱٫۰۵": "رهبران نیروی هوایی در همهٔ سطوح باید تاریخ و میراث ما را به‌خوبی بشناسند.",
  "۰۰۱٫۰۶": "اکنون بیش از هر زمان دیگری به رهبرانی در همهٔ سطوح نیاز داریم که با هنر جنگ هوایی آشنا باشند.",
  "۰۰۱٫۰۷": "این راهنما ابزارهای لازم را در اختیار نیروهای ما می‌گذارد تا به‌عنوان هم‌تیمی و رهبر موفق باشند.",
  "۰۰۱٫۰۸": "امروز در محیط امنیتی جهانی بسیار پیچیده‌ای خدمت می‌کنیم.",
  "۰۰۱٫۰۹": "در دفاع از میهن استوار می‌مانیم و تهدید فزاینده و چندحوزه‌ای جمهوری خلق چین را معیار برنامه‌ریزی خود قرار می‌دهیم.",
  "۰۰۱٫۱۰": "همچنین بر تقویت همکاری‌های بین‌المللی و بازداشتن رقیبانی چون روسیه، کرهٔ شمالی و سازمان‌های افراطی خشونت‌طلب در سراسر جهان تمرکز داریم.",
  "۰۰۱٫۱۱": "پیش از این نیز با چنین وضعی روبه‌رو بوده‌ایم.",
  "۰۰۱٫۱۲": "در این راهنما دربارهٔ رهبرانی مانند سرهنگ بنجامین او. دیویس جونیور و هوانوردان تاسکیگی می‌خوانید.",
  "۰۰۱٫۱۳": "با قهرمانانی چون CMSgt ریچارد ال. اچبرگر و پیشگامانی مانند Staff Sgt. استر مک‌گوین بلیک، نخستین زنی که در نیروی هوایی نام‌نویسی کرد، آشنا می‌شوید.",
  "۰۰۱٫۱۴": "همچنین با نوآورانی آشنا می‌شوید که حملهٔ دولیتل، بمب اتمی و—با شکل‌گیری رزمایش رد فلگ—توان تمرین مأموریت‌های پیشرفته را پدید آوردند.",
  "۰۰۱٫۱۵": "این درس‌ها یادآوری می‌کنند که می‌توانیم بر چالش‌های دشواری مانند چالش‌های امروز غلبه کنیم.",
  "۰۰۱٫۱۶": "برای این کار باید برای اجرای مأموریت آماده باشیم.",
  "۰۰۱٫۱۷": "ما نیز مانند پیشینیان خود نماد روحیه‌ای دلیرانه‌ایم و تعهد مشترک به دفاع از کشور بزرگمان ما را به هم پیوند می‌دهد.",
  "۰۰۱٫۱۸": "امروز نیروهای هوایی با نوآوری، پشتکار، کار تیمی و بیش از همه اعتماد، برای رویارویی با چالش‌های عرصه‌های مورد مناقشه پیش‌قدم می‌شوند.",
  "۰۰۱٫۱۹": "ما اعضای تیمی پیروز و نیروهای هوایی خدمت‌گزار در حرفهٔ نظامی هستیم؛ ارزش‌های بنیادین و هدف مشترکمان ما را متحد می‌کند.",
  "۰۰۱٫۲۰": "خوب رهبری کنید… هر روز را ارزشمند کنید.",
  "۰۰۱٫۲۲": "گروهبان ارشد نیروی هوایی",
  "۰۰۳٫۰۳": "هیچ حرفه‌ای به اندازهٔ حرفهٔ نظامی از اعضایش انتظار ندارد.",
  "۰۰۳٫۰۷": "ژنرال رونالد فوگلمن، پانزدهمین رئیس ستاد نیروی هوایی، زمانی گفت: «ما صرفا به کاری دیگر مشغول نیستیم؛ ما از دست‌اندرکاران حرفهٔ نظامی هستیم.»",
  "۰۰۴٫۲۴": "احترام، شالودهٔ حرفهٔ نظامی ماست و همواره چنین بوده است.",
  "۰۰۵٫۲۰": "نیروهای هوایی اعضای حرفهٔ نظامی‌اند و امنیت کشور، حفاظت از شهروندان و پاسداری از شیوهٔ زندگی آنان به ایشان سپرده شده است.",
  "۰۰۶٫۰۵": "تعالی در همهٔ کارها یعنی نیروهای هوایی فرصت‌های رشد را دنبال کنند و آموزش‌های توسعه‌ای را به پایان برسانند؛ پیوسته بکوشند از نظر جسمی، ذهنی، عاطفی، معنوی و اخلاقی آماده بمانند؛ شایستگی‌های حرفه‌ای خود را ارتقا دهند؛ و مهارت‌های شغلی، دانش و آمادگی شخصی را در بالاترین سطح ممکن حفظ کنند.",
  "۰۱۲٫۰۴": "با این کشف، ارتش دریافت که برای باد کردن بالن‌ها و انجام تعمیرات لازم به نیروهای درجه‌دار آموزش‌دیده نیاز دارد.",
  "۰۱۲٫۰۶": "آنان نخستین نیروهای درجه‌دار بخش هوانوردی بودند که اصول کار با پارچه، تا کردن و دوختن را آموختند.",
  "۰۱۲٫۰۹": "خدمهٔ درجه‌دار نه‌تنها هواپیماها را تعمیر می‌کردند، بلکه می‌کوشیدند پرواز با آنها ایمن‌تر شود.",
  "۰۲۹٫۱۰": "و ما نیرویی هستیم که باید نبرد مشترک را در این عرصهٔ تازهٔ مورد مناقشه رهبری کنیم.",
  "۰۸۳٫۲۴": "نیروی ذخیرهٔ USAF (https://www.airforce.com/ways-to-serve/air-force-reserve) از افسران، نیروهای درجه‌دار و کارکنان غیرنظامی تشکیل می‌شود که طبق قانون موظف‌اند هرگاه نیرو و یگان‌های موجود در بخش فعال پاسخ‌گوی نیاز نباشد، نیازهای نیروهای مسلح ایالات متحده را تأمین کنند.",
  "۱۱۳٫۰۱": "ردهٔ درجه‌داران (NCO) شامل درجات Staff Sergeant و Technical Sergeant است.",
  "۱۱۳٫۱۵": "ردهٔ درجه‌داران ارشد (SNCO) شامل درجات Master Sergeant، Senior Master Sergeant و Chief Master Sergeant است.",
  "۱۱۴٫۰۹": "درجه‌دار مسئول.",
  "۱۱۴٫۱۰": "عنوان درجه‌دار مسئول (NCOIC) فقط برای NCOها و SNCOهایی به‌کار می‌رود که مسئول یک مرکز کاری یا بخش هستند.",
  "۱۱۶٫۰۵": "آنان عالی‌ترین ویژگی‌های درجه‌داران ارشد نیروی هوایی را نمایندگی می‌کنند.",
}));

const contemporaryTerms = new Map([
  ["اندیشیدن مهندسی", "تفکر مهندسی"],
  ["فناوری ماده", "فناوری مواد"],
  ["داده و تصمیم", "داده‌ها و تصمیم‌گیری"],
  ["رابط کاربر", "رابط کاربری"],
  ["تولد ستاره", "زایش ستاره‌ها"],
  ["مرگ ستاره", "پایان عمر ستاره‌ها"],
  ["ویژگی‌های زندگی", "ویژگی‌های جانداران"],
  ["درخت تبار", "درخت تبارزایی"],
]);

function modernize(value) {
  let text = String(value ?? "");
  for (const [before, after] of contemporaryTerms) text = text.replaceAll(before, after);
  return text;
}

function restoreUrls(text, gloss) {
  const sourceUrls = (String(gloss ?? "").match(/https?:\/\/[^\s)]+/giu) ?? [])
    .map((url) => url.replace(/[.,;]+$/u, ""));
  let index = 0;
  return text.replace(/هتتپس:\/\/[^\s)،]+/gu, () => sourceUrls[index++] ?? "");
}

function repairHandbookTerminology(line) {
  let text = restoreUrls(line.text, line.gloss);
  const english = String(line.gloss ?? "");

  if (/\benlisted\b/iu.test(english)) {
    text = text
      .replaceAll("پرسنل ثبت‌نام‌شده", "پرسنل درجه‌دار")
      .replaceAll("اعضای ثبت‌نام‌شده", "نیروهای درجه‌دار")
      .replaceAll("هوانوردان ثبت‌نام‌شده", "هوانوردان درجه‌دار")
      .replaceAll("هوانوردان استخدام شده", "هوانوردان درجه‌دار")
      .replaceAll("سربازان وظیفه", "نیروهای درجه‌دار")
      .replaceAll("ثبت‌نام‌شده", "درجه‌دار")
      .replaceAll("تسلیم شده", "درجه‌دار");
  }

  if (/\bservice members?\b/iu.test(english)) {
    text = text
      .replaceAll("اعضای خدمات", "اعضای نیروهای مسلح")
      .replaceAll("عضو خدمات", "عضو نیروهای مسلح");
  }

  if (/\bcareer fields?\b/iu.test(english)) {
    text = text
      .replaceAll("زمینه‌های شغلی", "رسته‌های شغلی")
      .replaceAll("زمینه شغلی", "رستهٔ شغلی");
  }

  if (/\bcivil servants?\b/iu.test(english)) {
    text = text.replaceAll("کارمندان ملکی", "کارکنان غیرنظامی");
  }

  if (/\bprofession of arms\b/iu.test(english)) {
    text = text
      .replaceAll("حرفهٔ اسلحه", "حرفهٔ نظامی")
      .replaceAll("حرفه اسلحه", "حرفهٔ نظامی")
      .replaceAll("حرفه ما در اسلحه", "حرفهٔ نظامی ما");
  }

  if (/\bnoncommissioned officers?\b|\bNCOs?\b/iu.test(english)) {
    text = text
      .replaceAll("افسران ارشد", "درجه‌داران ارشد")
      .replaceAll("افسران وظیفه", "درجه‌داران")
      .replaceAll("افسر درجه دار", "درجه‌دار")
      .replaceAll("افسر درجه‌دار", "درجه‌دار")
      .replaceAll("افسر غیرمجاز", "درجه‌دار");
  }

  if (/\bwingman\b/iu.test(english)) {
    text = text.replaceAll("بال‌من", "وینگمن").replaceAll("بالمن", "وینگمن");
  }

  if (/\bairpower\b/iu.test(english)) {
    text = text
      .replaceAll("پایه‌های نیروی هوایی", "مبانی قدرت هوایی")
      .replaceAll("تکامل نیروی هوایی", "تکامل قدرت هوایی")
      .replaceAll("پتانسیل نیروی هوایی", "ظرفیت قدرت هوایی")
      .replaceAll("تطبیق پذیری نیروی هوایی", "انعطاف‌پذیری قدرت هوایی")
      .replaceAll("تطبیق‌پذیری نیروی هوایی", "انعطاف‌پذیری قدرت هوایی")
      .replaceAll("نیروی هوایی نیروی هوایی", "قدرت هوایی نیروی هوایی")
      .replaceAll("از طریق لنز نیروی هوایی", "از منظر قدرت هوایی");
  }

  if (/\bGreat Power Competition\b/iu.test(english)) {
    text = text.replaceAll("مسابقات قدرت بزرگ", "رقابت قدرت‌های بزرگ")
      .replaceAll("رقابت قدرت بزرگ", "رقابت قدرت‌های بزرگ");
  }

  return text;
}

function splitPersianTerms(value) {
  return value.split(/،\s*|\s+و\s+/u).map((item) => item.trim()).filter(Boolean);
}

function splitEnglishTerms(value) {
  return value.split(/,\s*|\s+and\s+/iu).map((item) => item.trim()).filter(Boolean);
}

let correctedHandbookLines = 0;
let modernizedFields = 0;
let repairedVocabEntries = 0;

for (const reader of payload.readers) {
  const originalTitle = reader.title_fa;
  reader.title_fa = modernize(reader.title_fa);
  if (reader.title_fa !== originalTitle) modernizedFields += 1;

  for (const week of reader.weeks) {
    for (const key of ["title_fa", "section_fa"]) {
      const original = week[key];
      week[key] = modernize(week[key]);
      if (week[key] !== original) modernizedFields += 1;
    }

    for (const line of week.lines) {
      if (reader.slug === "afh1-2025") line.text = repairHandbookTerminology(line);
      if (reader.slug === "afh1-2025" && handbookCorrections.has(line.id)) {
        line.text = handbookCorrections.get(line.id);
        correctedHandbookLines += 1;
      }
      const original = line.text;
      line.text = modernize(line.text);
      if (line.text !== original) modernizedFields += 1;
    }

    if (reader.category === "علوم و فناوری" && week.lines.length >= 2) {
      const faMatch = week.lines[1].text.match(/^محورهای اصلی این بحث (.+) هستند[.!؟]?$/u);
      const enMatch = week.lines[1].gloss.match(/^The central ideas in this topic are (.+)\.$/iu);
      if (faMatch && enMatch) {
        const faTerms = splitPersianTerms(faMatch[1]);
        const enTerms = splitEnglishTerms(enMatch[1]);
        if (faTerms.length === enTerms.length) {
          week.vocab = faTerms.map((term, index) => `${term} — ${enTerms[index]}`);
          repairedVocabEntries += week.vocab.length;
        }
      }
    }
  }
}

await writeFile(dataPath, JSON.stringify(payload), "utf8");
console.log(JSON.stringify({ correctedHandbookLines, modernizedFields, repairedVocabEntries }));
