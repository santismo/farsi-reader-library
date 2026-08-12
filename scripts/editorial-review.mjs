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
  "۰۰۱٫۰۱": "هوانوردان گرامی، نیروی هوایی ایالات متحده برای پرواز، نبرد و پیروزی تشکیل شده است.",
  "۰۰۱٫۰۲": "ما با به‌کارگیری قدرت هوایی در هر زمان و هر مکان، به متحدان خود اطمینان می‌بخشیم و دشمنانمان را بازمی‌داریم.",
  "۰۰۱٫۰۳": "هوانوردان امروز به ندای کشور پاسخ داده‌اند و ما آماده‌ایم از میهن خود در برابر همهٔ دشمنان خارجی و داخلی دفاع کنیم.",
  "۰۰۱٫۰۴": "به پشتوانهٔ پیشگامان هوانوردی، اندیشمندان حوزهٔ قدرت هوایی و بدنه‌ای حرفه‌ای و توانمند از نیروهای درجه‌دار، مرگبارترین نیروی هوایی جهان هستیم.",
  "۰۰۱٫۰۵": "رهبران نیروی هوایی در همهٔ سطوح باید تاریخ و میراث ما را به‌خوبی بشناسند.",
  "۰۰۱٫۰۶": "اکنون بیش از هر زمان دیگری به رهبرانی در همهٔ سطوح نیاز داریم که با هنر جنگ هوایی آشنا باشند.",
  "۰۰۱٫۰۷": "این راهنما ابزارهای لازم را در اختیار هوانوردان ما می‌گذارد تا به‌عنوان هم‌تیمی و رهبر موفق باشند.",
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
  "۰۰۱٫۱۸": "امروز هوانوردان با نوآوری، پشتکار، کار تیمی و بیش از همه اعتماد، برای رویارویی با چالش‌های عرصه‌های مورد مناقشه پیش‌قدم می‌شوند.",
  "۰۰۱٫۱۹": "ما اعضای تیمی پیروز و هوانوردانی خدمت‌گزار در حرفهٔ نظامی هستیم؛ ارزش‌های بنیادین و هدف مشترکمان ما را متحد می‌کند.",
  "۰۰۱٫۲۰": "خوب رهبری کنید… هر روز را ارزشمند کنید.",
  "۰۰۱٫۲۲": "گروهبان ارشد نیروی هوایی",
  "۰۰۳٫۰۳": "هیچ حرفه‌ای به اندازهٔ حرفهٔ نظامی از اعضایش انتظار ندارد.",
  "۰۰۳٫۰۷": "ژنرال رونالد فوگلمن، پانزدهمین رئیس ستاد نیروی هوایی، زمانی گفت: «ما صرفا به کاری دیگر مشغول نیستیم؛ ما از دست‌اندرکاران حرفهٔ نظامی هستیم.»",
  "۰۰۴٫۲۴": "احترام، شالودهٔ حرفهٔ نظامی ماست و همواره چنین بوده است.",
  "۰۰۵٫۲۰": "هوانوردان اعضای حرفهٔ نظامی‌اند و امنیت کشور، حفاظت از شهروندان و پاسداری از شیوهٔ زندگی آنان به ایشان سپرده شده است.",
  "۰۰۶٫۰۵": "تعالی در همهٔ کارها یعنی هوانوردان فرصت‌های رشد را دنبال کنند و آموزش‌های توسعه‌ای را به پایان برسانند؛ پیوسته بکوشند از نظر جسمی، ذهنی، عاطفی، معنوی و اخلاقی آماده بمانند؛ شایستگی‌های حرفه‌ای خود را ارتقا دهند؛ و مهارت‌های شغلی، دانش و آمادگی شخصی را در بالاترین سطح ممکن حفظ کنند.",
  "۰۰۷٫۱۲": "اصول اخلاقی ما در ارزش‌های بنیادین، سوگندها، مرام‌نامهٔ هوانورد، حرفهٔ نظامی، رهنمودهای وزارت دفاع و نیروی هوایی، مقررات مشترک اخلاقی و قانون یکپارچهٔ عدالت نظامی بیان شده است.",
  "۰۱۲٫۰۴": "با این کشف، ارتش دریافت که برای باد کردن بالن‌ها و انجام تعمیرات لازم به نیروهای درجه‌دار آموزش‌دیده نیاز دارد.",
  "۰۱۲٫۰۶": "آنان نخستین نیروهای درجه‌دار بخش هوانوردی بودند که اصول کار با پارچه، تا کردن و دوختن را آموختند.",
  "۰۱۲٫۰۹": "خدمهٔ درجه‌دار نه‌تنها هواپیماها را تعمیر می‌کردند، بلکه می‌کوشیدند پرواز با آنها ایمن‌تر شود.",
  "۰۲۱٫۱۱": "هوانوردان تاسکیگی ۱۱۲ هواپیمای دشمن را در نبرد هوا‌به‌هوا منهدم کردند و ۶۶ فروند از هواپیماهای خود را از دست دادند.",
  "۰۲۹٫۱۰": "و ما نیرویی هستیم که باید نبرد مشترک را در این عرصهٔ تازهٔ مورد مناقشه رهبری کنیم.",
  "۰۸۳٫۲۴": "نیروی ذخیرهٔ USAF (https://www.airforce.com/ways-to-serve/air-force-reserve) از افسران، نیروهای درجه‌دار و کارکنان غیرنظامی تشکیل می‌شود که طبق قانون موظف‌اند هرگاه نیرو و یگان‌های موجود در بخش فعال پاسخ‌گوی نیاز نباشد، نیازهای نیروهای مسلح ایالات متحده را تأمین کنند.",
  "۱۱۲٫۱۹": "هوانوردان درجه‌یک کاملاً با استانداردهای نیروی هوایی مطابقت دارند، برای افزایش مهارت در رستهٔ شغلی و حرفهٔ نظامی خود وقت می‌گذارند و در عین حال به اعضای مؤثر تیم تبدیل می‌شوند.",
  "۱۱۳٫۰۱": "ردهٔ درجه‌داران (NCO) شامل درجات Staff Sergeant و Technical Sergeant است.",
  "۱۱۳٫۱۵": "ردهٔ درجه‌داران ارشد (SNCO) شامل درجات Master Sergeant، Senior Master Sergeant و Chief Master Sergeant است.",
  "۱۱۴٫۰۹": "درجه‌دار مسئول.",
  "۱۱۴٫۱۰": "عنوان درجه‌دار مسئول (NCOIC) فقط برای NCOها و SNCOهایی به‌کار می‌رود که مسئول یک مرکز کاری یا بخش هستند.",
  "۱۱۶٫۰۵": "آنان عالی‌ترین ویژگی‌های درجه‌داران ارشد نیروی هوایی را نمایندگی می‌کنند.",
  "۱۲۳٫۰۵": "مدیران رسته‌های شغلی نیروی هوایی (AFCFM) مسئول‌اند اطمینان یابند که برنامهٔ جامع آموزش و تربیت رستهٔ مربوط (CFETP) هوانوردی را در خود بازتاب می‌دهد و شایستگی‌های زیر را، همسو با شایستگی‌های بنیادی نیروی هوایی، دربر می‌گیرد: ارتباط، پاسخ‌گویی، کار تیمی، تفکر تحلیلی و مدیریت منابع.",
  "۱۲۳٫۲۴": "برنامهٔ هوانورد زبان‌دان (LEAP) (https://www.airuniversity.af.edu/AFCLC/) را مرکز فرهنگ و زبان نیروی هوایی در دانشگاه نیروی هوایی، پایگاه ماکسولِ آلاباما، طراحی و مدیریت می‌کند. این برنامه برای افسران و هوانوردان درجه‌دارِ نیروی چندمنظوره (GPF) که سابقهٔ خدمتی ممتاز و مقداری مهارت در یک زبان خارجی دارند فرصت‌هایی فراهم می‌کند؛ این مهارت با آزمون سنجش مهارت زبانی دفاعی (DLPT) یا مصاحبهٔ سنجش مهارت گفتاری (OPI) ارزیابی می‌شود.",
  "۱۲۴٫۱۶": "آموزش از راه دورِ مدرسهٔ رهبری هوانورد.",
  "۱۲۴٫۱۷": "دورهٔ آموزش از راه دور مدرسهٔ رهبری هوانورد (ALS-DL) آموزش نظامی حرفه‌ای لازم را برای آماده‌سازی هوانوردان ارشد جهت سرپرستی و تقویت تعهد به حرفهٔ نظامی فراهم می‌کند.",
  "۱۲۴٫۲۲": "آموزش ترکیبیِ مدرسهٔ رهبری هوانورد.",
  "۱۲۴٫۲۳": "مدرسهٔ رهبری هوانورد در اکتبر ۲۰۱۶ دورهٔ آموزش ترکیبی (ALS-BLC) را راه‌اندازی کرد که اصول آموزش از راه دور را با یادگیری سنتی در کلاس درهم می‌آمیزد.",
  "۱۲۵٫۰۵": "مدرسهٔ رهبری هوانورد (ALS) نخستین سطح آموزش نظامی حرفه‌ای درجه‌داران است که هوانوردان در مسیر پیشرفت شغلی خود در نیروی هوایی می‌گذرانند.",
  "۱۲۷٫۰۴": "این مرکز که اکنون در پایگاه مشترک سن‌آنتونیو–لکلندِ تگزاس قرار دارد، سالانه به‌طور میانگین ۹۰۰ دانشجو فارغ‌التحصیل می‌کند و در تاریخ ۷۵ سالهٔ خود بیش از ۳۵٬۰۰۰ دانشجو داشته است. همچنین تنها مرکز آموزش نظامی حرفه‌ای نیروی هوایی است که هر سه دورهٔ درجه‌داران—مدرسهٔ رهبری هوانورد، آکادمی درجه‌داران و آکادمی درجه‌داران ارشد—را ارائه می‌دهد.",
  "۱۵۵٫۱۹": "بر پایهٔ برنامهٔ «هوانورد ارشد زیر منطقه»، هوانوردان دارای درجهٔ هوانورد درجه‌یک، در صورت داشتن حداقل شرایط لازم، می‌توانند یک بار برای ترفیع زودهنگام به هوانورد ارشد در نظر گرفته شوند.",
  "۱۵۷٫۱۲": "هوانورد پس از ده ماه خدمت در درجهٔ کنونی می‌تواند واجد شرایط ترفیع به هوانورد درجه‌یک باشد.",
  "۱۶۴٫۰۹": "اعلامیه‌های امتیاز ترفیع، جایگاه نسبی هوانوردان را در فرایند بررسی ترفیع به آنان نشان می‌دهد و هرگز نباید جز در اختیار خود فرد و فرمانده او قرار گیرد یا استفاده شود.",
  "۲۳۸٫۳۳": "بازمهندسی فرایندهای کسب‌وکار فرصت بسیار خوبی برای توانمندسازی هوانوردان فراهم می‌کند تا نوآور باشند. هوانوردان می‌توانند ایده‌های چابک و نوآورانه را به‌طور راهبردی همسو کنند و در فرایندهای تازه‌طراحی‌شده به کار گیرند.",
  "۴۵۰٫۲۶": "(استثنا: برای درجهٔ هوانورد پایه، ذکر درجه الزامی نیست.)",
  "۵۴۴٫۲۹": "سپس هوانوردان حاضر در آرایش به محل‌های خود هدایت می‌شوند و پایان آرایش اعلام می‌شود.",
  "۵۹۴٫۱۳": "او که مدافع سرسخت روحیهٔ «هوانورد آمریکایی» بود، راه را برای تدوین مرام‌نامهٔ هوانورد گشود؛ متنی که باورهای بنیادی نیروی هوایی را مدون کرد و اخلاق جنگاوری را بیان کرد.",
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
  let text = String(value ?? "")
    .replace(/درخت تبار(?:زایی)+/gu, "درخت تبارزایی")
    .replace(/رابط کاربری+/gu, "رابط کاربری")
    .replaceAll("هوانوردانانی", "هوانوردانی")
    .replaceAll("هوانوردانان", "هوانوردان")
    .replaceAll("ت عضو نیروی هوایی’س کرید", "مرام‌نامهٔ هوانورد")
    .replaceAll("برنامه عضو نیروی هوایی با زبان فعال", "برنامهٔ هوانورد زبان‌دان")
    .replaceAll("بخش ۸ا-ارزیابی جامع عضو نیروی هوایی", "بخش ۸الف — ارزیابی جامع هوانورد")
    .replaceAll("۸.۴. زمان انجام ارزیابی جامع عضو نیروی هوایی", "۸.۴. زمان‌بندی ارزیابی جامع هوانورد")
    .replaceAll("بخش ۸ا-ارزیابی جامع هوانورد", "بخش ۸الف — ارزیابی جامع هوانورد")
    .replaceAll("۸.۴. زمان انجام ارزیابی جامع هوانورد", "۸.۴. زمان‌بندی ارزیابی جامع هوانورد")
    .replaceAll("ارزیابی جامع عضو نیروی هوایی", "ارزیابی جامع هوانورد");
  for (const [before, after] of contemporaryTerms) {
    if (after.startsWith(before)) {
      const suffix = after.slice(before.length);
      text = text.replaceAll(new RegExp(`${before}(?!${suffix})`, "gu"), after);
    } else {
      text = text.replaceAll(before, after);
    }
  }
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

  if (line.id === "۴۵۵٫۰۳") {
    text = text.replace(
      "ABM هوانورد دورم ادمینیستراتیون",
      "ABM؛ رهبر خوابگاه هوانورد (ADL)؛ امور اداری",
    );
  }

  if (line.id === "۵۵۸٫۰۱") {
    text = text
      .replace(
        "AF فرم ۴۲۲، اعلان وضعیت صلاحیت هوانورد",
        "AF فرم ۴۲۲، اعلان وضعیت صلاحیت عضو نیروی هوایی",
      )
      .replace(
        "AF فرم ۹۳۲، برگه ارزیابی جامع عضو نیروی هوایی، کاربرگ ارزیابی جامع عضو نیروی هوایی برای تصحیح/حذف گزارش‌های ارزیابی",
        "AF فرم ۹۳۲، کاربرگ ارزیابی جامع هوانورد (MSgt تا CMSgt) DAF فرم ۹۴۸، درخواست تصحیح یا حذف گزارش‌های ارزیابی",
      );
  }

  if (line.id === "۵۶۰٫۰۱") {
    text = text
      .replace(
        /ALS—.*?امن—هوانورد(?= ANG—)/u,
        "ALS—مدرسهٔ رهبری هوانورد ALS-BLC—آموزش ترکیبی مدرسهٔ رهبری هوانورد ALS-DL—آموزش از راه دور مدرسهٔ رهبری هوانورد ALQ—ویژگی‌های رهبری هوانورد AMC—فرماندهی جابه‌جایی هوایی AMT—تکنسین‌های نگهداری هوانوردی Amn—هوانورد",
      )
      .replace("AU—عضو نیروی هوایی", "AU—دانشگاه نیروی هوایی");
  }

  return text;
}

function airmanForms(english) {
  return [...String(english ?? "").matchAll(/\b(Airmen|Airman)(?:['’]s)?\b/giu)].map((match) => ({
    plural: match[1].toLocaleLowerCase("en-US") === "airmen",
    possessive: /['’]s$/iu.test(match[0]),
  }));
}

function containsExpectedAirmanForms(text, forms) {
  let cursor = 0;
  for (const form of forms) {
    const expected = form.plural ? "هوانوردان" : "هوانورد";
    const index = text.indexOf(expected, cursor);
    if (index < 0) return false;
    cursor = index + expected.length;
  }
  return true;
}

function countMatches(text, expression) {
  return [...text.matchAll(expression)].length;
}

function replaceFirst(text, candidates, replacement) {
  for (const candidate of candidates) {
    const index = text.indexOf(candidate);
    if (index >= 0) return `${text.slice(0, index)}${replacement}${text.slice(index + candidate.length)}`;
  }
  return null;
}

function standardizeAirmanTerminology(line) {
  const forms = airmanForms(line.gloss);
  if (!forms.length) return line.text;

  let text = line.text
    .replaceAll("عضو نیروی هوایی’س کرید", "مرام‌نامهٔ هوانورد")
    .replaceAll("ت عضو نیروی هوایی’س کرید", "مرام‌نامهٔ هوانورد")
    .replaceAll("اعتقادنامه هوانوردی", "مرام‌نامهٔ هوانورد")
    .replaceAll("هوانوردی کرید", "مرام‌نامهٔ هوانورد")
    .replaceAll("مدرسه رهبری هوانوردی", "مدرسهٔ رهبری هوانورد")
    .replaceAll("مدرسهٔ رهبری هوانوردی", "مدرسهٔ رهبری هوانورد")
    .replaceAll("مدرسه رهبری هوانورد", "مدرسهٔ رهبری هوانورد")
    .replaceAll("ارزیابی جامع هوانوردی", "ارزیابی جامع هوانورد")
    .replaceAll("شورای مشورتی هوانوردی", "شورای مشورتی هوانورد")
    .replaceAll("برنامه هوانوردی با زبان فعال", "برنامهٔ هوانورد زبان‌دان")
    .replaceAll("عضو نیروی هوایی باسیک", "هوانورد پایه")
    .replaceAll("هوانیروز پایه و تازه استخدام شده", "هوانورد پایه و هوانوردان تازه‌استخدام‌شده")
    .replaceAll("هوانیروز پایه", "هوانورد پایه")
    .replaceAll("نیروهای هوایی باسیک", "هوانوردان پایه")
    .replaceAll("و همچنین افرادی که در ابتدا", "و همچنین هوانوردانی که در ابتدا")
    .replaceAll("عضو نیروی هوایی فیرست کلاسس", "هوانورد درجه‌یک")
    .replaceAll("هوانوردان فیرست کلاسس", "هوانوردان درجه‌یک")
    .replaceAll("هواپیمای درجه یک", "هوانورد درجه‌یک")
    .replaceAll("هوانورد درجه باسیک", "هوانورد پایه")
    .replaceAll("هوانورد درجه یک پایه", "هوانورد پایه")
    .replaceAll("ون تومان ا باسیک", "و هوانورد پایه")
    .replaceAll("سنیور عضو نیروی هوایی", "هوانورد ارشد")
    .replaceAll("خلبان ارشد", "هوانورد ارشد")
    .replaceAll("غیرنظامیان هوایی", "هوانوردان غیرنظامی")
    .replaceAll("تک تک هوادارانی", "هر هوانوردی")
    .replaceAll("هر یک از هواداران", "هر هوانورد")
    .replaceAll("ایرمن‌ها", "هوانوردان")
    .replaceAll("پایین‌ترین مقام هوایی", "پایین‌رتبه‌ترین هوانورد")
    .replaceAll("اولین هوایی", "نخستین هوانورد")
    .replaceAll("اولین نیروی هوایی نیروهای امنیتی", "نخستین هوانورد نیروهای امنیتی")
    .replaceAll("اولین زن هوایی", "نخستین هوانورد زن")
    .replaceAll("نیروهای چابک", "هوانوردان چابک")
    .replaceAll("توانایی فرمانده (یا عدم وجود آن)", "توانایی هوانورد (یا نداشتن آن)")
    .replaceAll("سوابق پرسنل او", "سوابق پرسنلی هوانورد")
    .replaceAll("مسافران هوایی", "هوانوردان")
    .replaceAll("اگر یک نیروی هوایی", "اگر هوانوردی")
    .replaceAll("فرمانده ارشد هوایی", "هوانورد ارشد")
    .replaceAll("فرمانده ارشد", "هوانورد ارشد")
    .replaceAll("قبل از ورود او به رگاف", "پیش از ورود هوانورد به رگاف")
    .replaceAll("رهبر خوابگاه هوایی", "رهبر خوابگاه هوانورد")
    .replaceAll("اقدامات هوایی", "اقدامات هوانوردان")
    .replaceAll("سوابق نظامی او", "سوابق نظامی هوانورد")
    .replaceAll("نیروهای اعزامی", "هوانوردان اعزامی")
    .replaceAll("هوانوردانی است که از آنها مراقبت می‌کنند", "هوانوردانی است که از دیگر هوانوردان مراقبت می‌کنند")
    .replaceAll("هوایی که به‌طور دائم", "هوانوردانی که به‌طور دائم")
    .replaceAll("هر هوایی که", "هر هوانوردی که")
    .replaceAll("به محض پوشیدن لباس‌های هوایی", "به‌محض آنکه هوانوردان آرایش گرفتند")
    .replaceAll("سلامت و تناسب اندام هواداران", "سلامت و آمادگی جسمانی هوانورد");

  if (containsExpectedAirmanForms(text, forms)) return text;

  const pluralCandidates = [
    "اعضای نیروی هوایی", "سربازان نیروی هوایی", "پرسنل نیروی هوایی",
    "کارکنان نیروی هوایی", "نیروهای هوایی", "سربازان هوایی",
    "افراد واجد شرایط", "افراد هوایی", "افرادی", "هواداران", "هواپیماهای", "هواپیماها", "هواپیمای", "هواپیما", "هوانیروزها", "هوانیروز",
    "خلبانان", "مسافرانی", "مسافران", "هوانوردی", "هواپیمایی", "هموطنان", "همتایان", "نیروی هوایی",
  ];
  const singularCandidates = [
    "یک عضو نیروی هوایی", "عضو نیروی هوایی", "یک نیروی هوایی", "هر نیروی هوایی",
    "ایرمن", "هواپیمای", "هواپیما", "هوانیروز", "هوادار", "هواگرد",
    "خلبان", "پروازدار", "نیروی هوایی",
  ];

  const expectedPlural = forms.filter((form) => form.plural).length;
  const expectedSingular = forms.length - expectedPlural;
  let pluralCount = countMatches(text, /هوانوردان/gu);
  let singularCount = countMatches(text, /هوانورد(?!ان)/gu);

  while (pluralCount < expectedPlural) {
    if (singularCount > expectedSingular) {
      text = text.replace(/هوانورد(?!ان)/u, "هوانوردان");
      pluralCount = countMatches(text, /هوانوردان/gu);
      singularCount = countMatches(text, /هوانورد(?!ان)/gu);
      continue;
    }
    const replaced = replaceFirst(text, pluralCandidates, "هوانوردان");
    if (replaced === null) break;
    text = replaced;
    pluralCount = countMatches(text, /هوانوردان/gu);
  }
  while (singularCount < expectedSingular) {
    if (pluralCount > expectedPlural) {
      text = text.replace("هوانوردان", "هوانورد");
      pluralCount = countMatches(text, /هوانوردان/gu);
      singularCount = countMatches(text, /هوانورد(?!ان)/gu);
      continue;
    }
    const replaced = replaceFirst(text, singularCandidates, "هوانورد");
    if (replaced === null) break;
    text = replaced;
    singularCount = countMatches(text, /هوانورد(?!ان)/gu);
  }

  if (pluralCount < expectedPlural || singularCount < expectedSingular) {
    throw new Error(`Could not standardize Airman terminology in ${line.id}: ${line.text} => ${text}`);
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
      if (reader.slug === "afh1-2025") line.text = standardizeAirmanTerminology(line);
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
