const READERS = __READERS__;
const FILES = __FILES__;
const OG_IMAGE = __OG_IMAGE__;

const HANDBOOKS = {
  student: "AFH1_2025_Farsi_Student_Study_Handbook.docx",
  teacher: "AFH1_2025_Farsi_English_Teacher_Handbook.docx",
};

const ADVANCED_SOURCES = [
  {
    kind: "ادبیات کلاسیک",
    title: "گنجور",
    description: "متن کامل آثار بسیاری از شاعران فارسی، همراه با جست‌وجو و نسخه‌های گوناگون.",
    url: "https://ganjoor.net/",
    task: "یک غزل را بلند بخوانید و واژه‌های کهن را جدا کنید.",
  },
  {
    kind: "دانشنامه",
    title: "مرکز دائرةالمعارف بزرگ اسلامی",
    description: "مقاله‌های بلند و ویراسته درباره تاریخ، فرهنگ، زبان، هنر و جامعه ایران.",
    url: "https://www.cgie.org.ir/",
    task: "یک مدخل را خلاصه کنید و ساختار استدلال آن را پیدا کنید.",
  },
  {
    kind: "پژوهش دانشگاهی",
    title: "پایگاه اطلاعات علمی SID",
    description: "مقاله‌ها و چکیده‌های دانشگاهی فارسی در علوم انسانی، اجتماعی و فنی.",
    url: "https://www.sid.ir/",
    task: "چکیده یک مقاله را بخوانید و پنج اصطلاح تخصصی بردارید.",
  },
  {
    kind: "نشریات",
    title: "نورمگز",
    description: "آرشیو بزرگ مجله‌ها و مقاله‌های فارسی در علوم انسانی و مطالعات فرهنگی.",
    url: "https://www.noormags.ir/",
    task: "دو چکیده درباره یک موضوع را از نظر لحن مقایسه کنید.",
  },
  {
    kind: "خبر و گزارش",
    title: "ایسنا",
    description: "گزارش‌های روز در حوزه‌های علمی، فرهنگی، اجتماعی، اقتصادی و ورزشی.",
    url: "https://www.isna.ir/",
    task: "یک خبر و یک گزارش تحلیلی را از نظر زبان مقایسه کنید.",
  },
  {
    kind: "زبان رسمی",
    title: "ایرنا",
    description: "نمونه گسترده‌ای از نثر رسمی خبری و گزارش‌های استانی و ملی.",
    url: "https://www.irna.ir/",
    task: "عنوان خبر را با بند نخست مقایسه و فعل‌های رسمی را مشخص کنید.",
  },
  {
    kind: "خواندن و شنیدن",
    title: "رادیو فردا",
    description: "خبر، گزارش، گفت‌وگو و برنامه صوتی برای تمرین هم‌زمان خواندن و شنیدن.",
    url: "https://www.radiofarda.com/",
    task: "یک گزارش صوتی را بشنوید و سپس متن همراه آن را بخوانید.",
  },
  {
    kind: "خبر بین‌المللی",
    title: "بی‌بی‌سی فارسی",
    description: "خبر، تحلیل، ویدئو و گزارش‌های بلند با واژگان معاصر فارسی.",
    url: "https://www.bbc.com/persian",
    task: "یک موضوع را اینجا و در رسانه‌ای دیگر بخوانید و تفاوت لحن را بسنجید.",
  },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@500;600;700&family=Vazirmatn:wght@400;500;600;700;800&display=swap');
:root{--ink:#172421;--muted:#65716d;--canvas:#f2f5f1;--surface:#fff;--surface-soft:#e8efea;--green:#123f38;--green-2:#1e6559;--mint:#bfe1d4;--orange:#e57943;--orange-soft:#ffe3d1;--line:#dbe3de;--shadow:0 18px 55px rgba(19,52,45,.09);--radius:22px;--font-ui:"Vazirmatn",Tahoma,"Geeza Pro",Arial,sans-serif;--font-reading:"Noto Naskh Arabic","Vazirmatn","Geeza Pro",serif;color-scheme:light}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--canvas);color:var(--ink);font-family:var(--font-ui);font-size:16px}button,select{font:inherit}button,a,select{-webkit-tap-highlight-color:transparent}a{color:inherit;text-decoration:none}button{cursor:pointer}button:focus-visible,a:focus-visible,select:focus-visible{outline:3px solid rgba(229,121,67,.45);outline-offset:3px}[hidden]{display:none!important}.global-controls{position:fixed;z-index:30;top:16px;left:16px;display:flex;gap:7px;padding:6px;background:rgba(255,255,255,.82);border:1px solid rgba(213,224,217,.9);border-radius:16px;box-shadow:0 8px 30px rgba(17,52,44,.12);backdrop-filter:blur(14px)}.global-controls button{min-width:40px;height:38px;padding:0 11px;border:0;border-radius:11px;background:transparent;color:var(--green);font-weight:800}.global-controls button:hover{background:var(--surface-soft)}.site-header{max-width:1180px;margin:auto;padding:24px 32px;display:flex;align-items:center;justify-content:space-between;gap:24px}.wordmark{display:flex;align-items:center;gap:10px;color:var(--green);font-size:1.05rem;font-weight:900}.wordmark-mark{display:grid;width:32px;height:32px;place-items:center;border-radius:10px;background:var(--green);color:white}.site-header nav{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:.9rem;font-weight:650}.site-header nav a{padding:8px 12px;border-radius:999px}.site-header nav a:hover,.site-header nav a.active{background:var(--surface);color:var(--green)}.hero{max-width:1180px;margin:8px auto 0;padding:72px clamp(24px,6vw,78px);overflow:hidden;position:relative;background:linear-gradient(135deg,#103d36 0%,#1e6457 100%);border-radius:32px;color:#fff;box-shadow:var(--shadow)}.hero:after{content:"";position:absolute;width:330px;height:330px;left:-90px;bottom:-190px;border:58px solid rgba(255,255,255,.07);border-radius:50%}.eyebrow{margin:0 0 14px;color:#ffbd93;font-size:.82rem;font-weight:800}.hero h1{max-width:830px;margin:0;font-family:var(--font-reading);font-size:clamp(2.55rem,7vw,5.6rem);line-height:1.18;letter-spacing:-.025em}.hero-copy{max-width:690px;margin:21px 0 0 auto;color:#dcebe6;font-size:clamp(1rem,2vw,1.15rem);line-height:2}.stats{display:flex;flex-wrap:wrap;gap:8px;margin-top:32px}.stats span{padding:7px 12px;border:1px solid rgba(255,255,255,.22);border-radius:999px;background:rgba(255,255,255,.07);font-size:.78rem}.quick-strip{max-width:1060px;margin:-27px auto 0;position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);background:var(--surface);border:1px solid var(--line);border-radius:20px;box-shadow:var(--shadow)}.quick-item{padding:19px 22px;display:flex;align-items:center;gap:12px}.quick-item+.quick-item{border-right:1px solid var(--line)}.quick-icon{display:grid;flex:0 0 auto;width:34px;height:34px;place-items:center;border-radius:11px;background:var(--orange-soft);color:#9b4620;font-weight:900}.quick-item p{margin:0;color:var(--green);font-size:.86rem;font-weight:750}.feature-panel{max-width:1180px;margin:72px auto 0;padding:0 32px}.feature-card{padding:28px;display:grid;grid-template-columns:1.3fr 1fr;gap:28px;align-items:center;background:#ead9c6;border-radius:var(--radius)}.feature-copy small{color:#78543c;font-weight:800}.feature-copy h2{margin:8px 0 8px;color:#382b23;font-family:var(--font-reading);font-size:clamp(1.5rem,3vw,2.2rem)}.feature-copy p{margin:0;color:#705a4a;line-height:1.85}.feature-actions{display:flex;flex-wrap:wrap;gap:9px;justify-content:flex-end}.button{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:10px 15px;border:1px solid transparent;border-radius:12px;background:var(--green);color:white;font-size:.86rem;font-weight:800}.button:hover{background:var(--green-2)}.button.secondary{background:rgba(255,255,255,.66);border-color:rgba(70,51,38,.14);color:#4c392d}.button.ghost{background:transparent;border-color:var(--line);color:var(--green)}.collections{max-width:1180px;margin:70px auto;padding:0 32px}.collection{margin-bottom:64px}.collection-heading{display:flex;justify-content:space-between;align-items:end;gap:18px;padding-bottom:13px;border-bottom:1px solid var(--line)}.collection-heading p{margin:0;color:var(--green);font-family:var(--font-reading);font-size:1.65rem;font-weight:800}.collection-heading span{color:var(--muted);font-size:.8rem}.reader-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:18px}.reader-card{min-height:245px;padding:22px;display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:0 8px 28px rgba(29,62,54,.055);transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.reader-card:hover{transform:translateY(-3px);border-color:#bfd0c6;box-shadow:0 16px 38px rgba(29,62,54,.1)}.reader-card-top{display:flex;justify-content:space-between;gap:10px;color:var(--muted);font-size:.75rem}.reader-card-top p{margin:0;color:#b95429;font-weight:800}.reader-card h2{margin:24px 0 6px;color:var(--green);font-family:var(--font-reading);font-size:1.5rem;line-height:1.45}.english-title{margin:0;direction:ltr;text-align:left;color:var(--muted);font:.78rem/1.55 Arial,sans-serif}.hide-english .english-title{display:none}.card-actions{margin-top:auto;padding-top:24px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;align-items:center}.read-button{padding:9px 14px;border-radius:11px;background:var(--green);color:white;font-size:.83rem;font-weight:800}.downloads{display:flex;gap:9px;color:#ac4d28;font-size:.79rem;font-weight:700}.downloads a:hover{text-decoration:underline}.site-footer{max-width:1180px;margin:auto;padding:30px 32px 52px;display:flex;justify-content:space-between;gap:18px;color:var(--muted);border-top:1px solid var(--line);font-size:.8rem}.site-footer a{color:var(--green);font-weight:750}.reader-page{max-width:1000px;margin:auto;padding:34px 30px 78px}.reader-header{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:end;padding:26px 0 24px;border-bottom:1px solid var(--line)}.back-link{grid-column:1/-1;justify-self:start;color:var(--muted);font-size:.82rem;font-weight:700}.back-link:hover{color:var(--green)}.reader-title-block p{margin:0 0 7px;color:#b95429;font-size:.78rem;font-weight:800}.reader-title-block h1{margin:0;color:var(--green);font-family:var(--font-reading);font-size:clamp(2rem,5vw,3.4rem);line-height:1.28}.reader-title-block span{display:block;margin-top:4px;color:var(--muted);font:.8rem Arial,sans-serif;text-align:right}.week-chip{align-self:center;padding:8px 11px;border-radius:999px;background:var(--orange-soft);color:#8d431f;font-size:.8rem;font-weight:850;white-space:nowrap}.edition-switch{margin:20px 0 12px;display:flex;gap:6px;padding:5px;width:max-content;border:1px solid var(--line);border-radius:14px;background:var(--surface-soft)}.edition-switch a{padding:8px 13px;border-radius:10px;color:var(--muted);font-size:.82rem;font-weight:750}.edition-switch a.active{background:var(--surface);color:var(--green);box-shadow:0 2px 8px rgba(24,57,49,.08)}.reader-tools{position:sticky;top:12px;z-index:15;margin:0 0 16px;padding:10px;display:flex;flex-wrap:wrap;align-items:center;gap:8px;background:rgba(255,255,255,.9);border:1px solid var(--line);border-radius:17px;box-shadow:0 10px 28px rgba(26,60,51,.09);backdrop-filter:blur(14px)}.tool-button{min-height:38px;padding:7px 11px;border:1px solid var(--line);border-radius:11px;background:var(--surface);color:var(--green);font-size:.78rem;font-weight:800}.tool-button:hover,.tool-button[aria-pressed="true"]{border-color:#a9c8bc;background:var(--surface-soft)}.voice-badge{margin-right:auto;padding:6px 10px;border-radius:999px;background:var(--green);color:white;font-size:.72rem;font-weight:800}.voice-status{width:100%;padding:0 3px;color:var(--muted);font-size:.7rem}.week-reader{padding:clamp(20px,5vw,48px);background:#fffdfa;border:1px solid #e6e0d7;border-radius:var(--radius);box-shadow:var(--shadow)}.week-intro{display:flex;justify-content:space-between;gap:18px;margin-bottom:25px;color:var(--muted);font-size:.8rem}.week-intro p{margin:0;color:var(--green);font-weight:800}.source-lines{margin:0;padding:0;list-style:none}.sentence-row{margin:0 0 10px;padding:14px;border:1px solid transparent;border-radius:15px;transition:background .16s ease,border-color .16s ease}.sentence-row:hover{background:#f8f6f0}.sentence-row.is-active{background:#f0f6f2;border-color:#bfd5cb}.sentence-main{display:grid;grid-template-columns:38px 1fr;gap:10px;align-items:start}.speak-sentence{display:grid;width:36px;height:36px;place-items:center;border:1px solid var(--line);border-radius:11px;background:var(--surface);color:var(--green);font-size:.77rem}.speak-sentence:hover,.sentence-row.is-active .speak-sentence{background:var(--green);border-color:var(--green);color:white}.source-line{margin:0;font-family:var(--font-reading);font-size:clamp(1.18rem,2.5vw,1.48rem);line-height:2.05;transition:filter .18s ease,opacity .18s ease}.line-id{display:inline-block;margin-left:.7rem;color:#c25d32;font:700 .67rem/1 var(--font-ui);direction:ltr}.spoken-word{border-radius:5px;transition:background .08s ease,color .08s ease}.spoken-word.is-read{background:rgba(191,225,212,.5)}.spoken-word.is-current{background:#ffb883;color:#482314}.sentence-actions{display:flex;gap:7px;margin:9px 48px 0 0}.sentence-actions button{padding:5px 9px;border:0;border-radius:8px;background:var(--surface-soft);color:var(--green);font-size:.7rem;font-weight:750}.sentence-actions button:hover{background:var(--mint)}.reveal-script{display:none}.gloss{margin:8px 48px 0 0;padding:11px 13px;border-right:3px solid var(--orange);border-radius:7px;background:#fff7f0;color:#4f5b57;font:.82rem/1.65 Arial,sans-serif;text-align:left}.listening .sentence-row:not(.revealed) .sentence-text{filter:blur(9px);opacity:.2;user-select:none}.listening .reveal-script{display:inline-block}.listening .sentence-row.revealed .reveal-script{background:var(--green);color:white}.teacher-notes{margin-top:28px;padding:22px;border-radius:15px;background:var(--surface-soft);color:#31413d;font-family:Arial,sans-serif}.teacher-notes h2{margin:0 0 10px;color:var(--green);font-size:.95rem}.teacher-notes ul{margin:0;padding-left:17px;font-size:.82rem;line-height:1.65}.teacher-notes p{margin:13px 0 0;color:var(--muted);font-size:.8rem;line-height:1.6}.week-navigation{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;margin:25px 0;color:var(--muted);font-size:.8rem}.week-navigation a{color:var(--green);font-weight:850}.week-navigation a:last-child{justify-self:end}.week-navigation select{padding:7px 9px;border:1px solid var(--line);border-radius:9px;background:var(--surface);color:var(--ink)}.reader-downloads{padding:18px;border:1px solid #cbded5;border-radius:16px;background:#e6f1ec}.reader-downloads p{margin:0 0 10px;color:var(--green);font-size:.85rem;font-weight:850}.reader-downloads a{display:inline-block;margin-left:7px;padding:7px 10px;border:1px solid var(--green);border-radius:9px;color:var(--green);font-size:.78rem;font-weight:750}.reader-downloads a:hover{background:var(--green);color:white}.resources-page{max-width:1180px;margin:auto;padding:30px 32px 80px}.resources-hero{padding:54px clamp(24px,5vw,58px);background:var(--green);border-radius:28px;color:white}.resources-hero .back-link{color:#cfe0db}.resources-hero h1{margin:30px 0 12px;font-family:var(--font-reading);font-size:clamp(2.6rem,6vw,4.8rem);line-height:1.2}.resources-hero p{max-width:690px;margin:0;color:#dbe9e5;line-height:1.9}.resource-section{margin-top:54px}.resource-section-heading{margin-bottom:17px}.resource-section-heading small{color:#b95429;font-weight:800}.resource-section-heading h2{margin:5px 0 0;color:var(--green);font-family:var(--font-reading);font-size:2rem}.prose-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.prose-card{padding:22px;display:flex;flex-direction:column;min-height:220px;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius)}.prose-card small{color:#b95429;font-size:.72rem;font-weight:800}.prose-card h3{margin:12px 0 7px;color:var(--green);font-family:var(--font-reading);font-size:1.35rem}.prose-card p{margin:0;color:var(--muted);font-size:.83rem;line-height:1.8}.prose-card .button{align-self:flex-start;margin-top:auto}.source-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.source-card{padding:19px;display:flex;flex-direction:column;min-height:245px;background:var(--surface);border:1px solid var(--line);border-radius:18px}.source-card small{color:#b95429;font-size:.69rem;font-weight:800}.source-card h3{margin:11px 0 7px;color:var(--green);font-size:1.02rem}.source-card p{margin:0;color:var(--muted);font-size:.77rem;line-height:1.75}.practice-task{margin-top:14px!important;padding-top:12px;border-top:1px solid var(--line);color:#41504c!important}.source-card a{margin-top:auto;padding-top:15px;color:var(--green);font-size:.76rem;font-weight:850}.source-card a:hover{color:#b95429}.handbook-downloads{display:flex;flex-wrap:wrap;gap:10px;padding:25px;background:#ead9c6;border-radius:20px}body.dark{--ink:#edf5f2;--muted:#a9b9b4;--canvas:#0c1412;--surface:#13201d;--surface-soft:#1b2d28;--green:#a9d8c5;--green-2:#83bea7;--mint:#24493f;--orange:#ffad7e;--orange-soft:#503224;--line:#2f4540;--shadow:0 18px 55px rgba(0,0,0,.23);color-scheme:dark}body.dark .global-controls{background:rgba(18,31,27,.88);border-color:var(--line)}body.dark .hero{background:linear-gradient(135deg,#183e36,#24594e)}body.dark .feature-card,body.dark .handbook-downloads{background:#392e27}body.dark .feature-copy h2{color:#f5e8dc}body.dark .feature-copy p,body.dark .feature-copy small{color:#d4bdac}body.dark .button.secondary{background:#4a3b31;color:#f4e7dc;border-color:#665143}body.dark .week-reader{background:#171c1a;border-color:#313a37}body.dark .sentence-row:hover{background:#1e2825}body.dark .sentence-row.is-active{background:#1d342e;border-color:#31584e}body.dark .gloss{background:#2d231e;color:#e9ded7}body.dark .reader-tools{background:rgba(18,31,27,.9)}body.dark .resources-hero{background:#173d35}body.dark .prose-card,body.dark .source-card{background:var(--surface)}body.dark .reader-downloads{background:#1c352f;border-color:#315c50}@media(max-width:900px){.reader-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.source-grid{grid-template-columns:repeat(2,1fr)}.prose-grid{grid-template-columns:1fr}.feature-card{grid-template-columns:1fr}.feature-actions{justify-content:flex-start}}@media(max-width:680px){.global-controls{top:10px;left:10px}.site-header{padding:20px 18px 76px;align-items:flex-start}.site-header nav{max-width:75%;overflow:auto;justify-content:flex-start}.hero{margin:0 12px;padding:48px 22px 58px;border-radius:24px}.hero h1{font-size:2.75rem}.quick-strip{margin:-20px 24px 0;grid-template-columns:1fr}.quick-item{padding:13px 16px}.quick-item+.quick-item{border-right:0;border-top:1px solid var(--line)}.feature-panel,.collections{padding:0 16px}.feature-panel{margin-top:52px}.reader-grid{grid-template-columns:1fr}.reader-card{min-height:215px}.site-footer{padding:25px 18px 45px;flex-direction:column}.reader-page{padding:18px 13px 58px}.reader-header{grid-template-columns:1fr;padding-top:68px}.week-chip{justify-self:start}.reader-tools{top:8px}.voice-badge{margin-right:0}.week-reader{padding:18px 8px}.sentence-row{padding:12px 8px}.sentence-main{grid-template-columns:34px 1fr;gap:7px}.speak-sentence{width:32px;height:32px}.sentence-actions,.gloss{margin-right:41px}.source-line{line-height:1.9}.resources-page{padding:82px 14px 60px}.resources-hero{padding:35px 20px}.source-grid{grid-template-columns:1fr}.week-navigation{grid-template-columns:1fr 1fr}.week-navigation label{grid-column:1/-1;grid-row:1;justify-self:center}.week-navigation a:last-child{justify-self:end}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
`;

const handbookCss = `.sentence-row.is-heading{margin:20px 0 5px;padding:10px 14px;border-right:3px solid var(--mint);border-radius:7px;background:var(--surface-soft)}.sentence-row.is-heading .sentence-main{display:block}.sentence-row.is-heading .source-line{color:var(--green);font-size:1.05rem;font-weight:850;line-height:1.7}`;

const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
const faNumber = (value) => new Intl.NumberFormat("fa-IR").format(value);
const wordMarkup = (value) => String(value).split(/(\s+)/u).map((part) => /^\s+$/u.test(part) ? part : `<span class="spoken-word">${escape(part)}</span>`).join("");
const externalLink = (url) => `href="${escape(url)}" target="_blank" rel="noopener noreferrer"`;

const commonScript = String.raw`
const body = document.body;
const themeToggle = document.querySelector('[data-theme-toggle]');
const englishToggle = document.querySelector('[data-english-toggle]');
const savedTheme = localStorage.getItem('farsi-theme');
if (savedTheme === 'dark' || (!savedTheme && matchMedia('(prefers-color-scheme: dark)').matches)) body.classList.add('dark');
if (localStorage.getItem('farsi-hide-english') === 'true') body.classList.add('hide-english');
function syncGlobalControls() {
  const dark = body.classList.contains('dark');
  const hidden = body.classList.contains('hide-english');
  if (themeToggle) {
    themeToggle.textContent = dark ? '☀' : '☾';
    themeToggle.setAttribute('aria-pressed', String(dark));
  }
  if (englishToggle) {
    englishToggle.textContent = hidden ? 'EN×' : 'EN';
    englishToggle.setAttribute('aria-pressed', String(hidden));
    englishToggle.setAttribute('aria-label', hidden ? 'نمایش عنوان‌های انگلیسی' : 'پنهان کردن عنوان‌های انگلیسی');
  }
}
themeToggle?.addEventListener('click', function () {
  body.classList.toggle('dark');
  localStorage.setItem('farsi-theme', body.classList.contains('dark') ? 'dark' : 'light');
  syncGlobalControls();
});
englishToggle?.addEventListener('click', function () {
  body.classList.toggle('hide-english');
  localStorage.setItem('farsi-hide-english', String(body.classList.contains('hide-english')));
  syncGlobalControls();
});
syncGlobalControls();
`;

const piperWarmScript = String.raw`
const PIPER_MODULE_URL = 'https://esm.sh/@mintplex-labs/piper-tts-web@1.0.5?bundle&deps=onnxruntime-web@1.18.0';
const PIPER_VOICE_ID = 'fa_IR-amir-medium';
const piperWarmup = window.farsiPiper = window.farsiPiper || { state: 'idle', module: null, promise: null, message: '' };

function reportPiper(message) {
  piperWarmup.message = message;
  const status = document.querySelector('[data-voice-status]');
  if (status) status.textContent = message;
  window.dispatchEvent(new CustomEvent('farsi-piper-status', { detail: message }));
}

function piperProgressMessage(progress) {
  if (!progress || String(progress.url || '').startsWith('tts://')) return 'در حال آماده‌سازی موتور گفتار…';
  if (progress.total > 0) return 'در حال دریافت صدای فارسی: ' + Math.round(progress.loaded * 100 / progress.total) + '٪';
  return 'در حال دریافت صدای فارسی…';
}

piperWarmup.warm = function () {
  if (piperWarmup.state === 'ready') return Promise.resolve(piperWarmup.module);
  if (piperWarmup.promise) return piperWarmup.promise;
  piperWarmup.state = 'loading';
  reportPiper('در حال بارگیری موتور Piper…');
  piperWarmup.promise = import(PIPER_MODULE_URL).then(async function (piper) {
    piperWarmup.module = piper;
    const stored = await piper.stored().catch(function () { return []; });
    if (!stored.includes(PIPER_VOICE_ID)) {
      piperWarmup.state = 'downloading';
      reportPiper('در حال دریافت صدای فارسی…');
      await piper.download(PIPER_VOICE_ID, function (progress) {
        reportPiper(piperProgressMessage(progress));
      });
    }
    piperWarmup.state = 'ready';
    reportPiper('صدای Piper آماده است.');
    return piper;
  }).catch(function (error) {
    piperWarmup.state = 'error';
    piperWarmup.promise = null;
    reportPiper('Piper در دسترس نیست؛ صدای مرورگر استفاده می‌شود.');
    throw error;
  });
  return piperWarmup.promise;
};

`;

const readerScript = String.raw`
const rows = Array.from(document.querySelectorAll('.sentence-row:not(.is-heading)'));
const playToggle = document.querySelector('[data-play-toggle]');
const nextButton = document.querySelector('[data-next-sentence]');
const listeningToggle = document.querySelector('[data-listening-toggle]');
const piperButton = document.querySelector('[data-piper-button]');
const voiceBadge = document.querySelector('[data-voice-badge]');
const statusNode = document.querySelector('[data-voice-status]');
let currentRow = null;
let audioContext = null;
let playback = null;
let nativeUtterance = null;
let voiceMode = 'browser';
let animationFrame = 0;
let requestToken = 0;

function setStatus(message) {
  if (statusNode) statusNode.textContent = message;
}

function clearWords(row) {
  row?.querySelectorAll('.spoken-word').forEach(function (word) {
    word.classList.remove('is-read', 'is-current');
  });
}

function setCurrent(row) {
  rows.forEach(function (item) { item.classList.toggle('is-active', item === row); });
  if (currentRow && currentRow !== row) clearWords(currentRow);
  currentRow = row;
  row?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function highlightIndex(row, index) {
  const words = Array.from(row?.querySelectorAll('.spoken-word') || []);
  words.forEach(function (word, wordIndex) {
    word.classList.toggle('is-read', wordIndex < index);
    word.classList.toggle('is-current', wordIndex === index);
  });
}

function highlightRatio(row, ratio) {
  const words = Array.from(row?.querySelectorAll('.spoken-word') || []);
  if (!words.length) return;
  const weights = words.map(function (word) { return Math.max(1, Array.from(word.textContent || '').length) + 0.8; });
  const total = weights.reduce(function (sum, value) { return sum + value; }, 0);
  const target = Math.max(0, Math.min(1, ratio)) * total;
  let cursor = 0;
  let index = words.length - 1;
  for (let position = 0; position < weights.length; position += 1) {
    cursor += weights[position];
    if (target <= cursor) { index = position; break; }
  }
  highlightIndex(row, index);
}

function syncPlayButton() {
  const paused = playback?.paused || (nativeUtterance && speechSynthesis.paused);
  const active = Boolean(playback || nativeUtterance);
  if (playToggle) {
    playToggle.textContent = active && !paused ? 'مکث' : 'پخش';
    playToggle.setAttribute('aria-pressed', String(active && !paused));
  }
}

function stopPlayback(keepHighlight) {
  requestToken += 1;
  if (playback?.source) {
    playback.manualStop = true;
    try { playback.source.stop(); } catch {}
  }
  playback = null;
  if (nativeUtterance) speechSynthesis.cancel();
  nativeUtterance = null;
  cancelAnimationFrame(animationFrame);
  if (!keepHighlight) clearWords(currentRow);
  syncPlayButton();
}

function finishPlayback() {
  if (currentRow) highlightRatio(currentRow, 1);
  playback = null;
  nativeUtterance = null;
  cancelAnimationFrame(animationFrame);
  setStatus('پخش جمله تمام شد.');
  syncPlayButton();
}

function tick() {
  if (!playback || playback.paused) return;
  const elapsed = playback.offset + (audioContext.currentTime - playback.startedAt);
  highlightRatio(currentRow, elapsed / playback.buffer.duration);
  if (elapsed < playback.buffer.duration) animationFrame = requestAnimationFrame(tick);
}

function startBuffer(offset) {
  const source = audioContext.createBufferSource();
  source.buffer = playback.buffer;
  source.connect(audioContext.destination);
  playback.source = source;
  playback.offset = offset;
  playback.startedAt = audioContext.currentTime;
  playback.paused = false;
  playback.manualStop = false;
  source.onended = function () {
    if (playback && !playback.manualStop && !playback.paused) finishPlayback();
  };
  source.start(0, offset);
  cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(tick);
  syncPlayButton();
}

async function ensureAudio() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state !== 'running') await audioContext.resume();
}

async function ensurePiper(waitMilliseconds) {
  const warmup = window.farsiPiper;
  if (!warmup?.warm) throw new Error('Piper warmup unavailable');
  if (warmup.state === 'ready') return warmup.module;
  let timer = 0;
  const timeout = new Promise(function (_, reject) {
    timer = setTimeout(function () {
      const error = new Error('Piper is still warming');
      error.code = 'PIPER_WARMING';
      reject(error);
    }, waitMilliseconds);
  });
  try {
    return await Promise.race([warmup.warm(), timeout]);
  } finally {
    clearTimeout(timer);
  }
}

function speakWithBrowser(row, token, message) {
  if (!('speechSynthesis' in window)) {
    setStatus('پخش صوتی در این مرورگر در دسترس نیست.');
    return;
  }
  const text = row.dataset.text || '';
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fa-IR';
  utterance.rate = 0.86;
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(function (voice) { return /^fa([-_]|$)/i.test(voice.lang); }) || null;
  utterance.onboundary = function (event) {
    if (token !== requestToken || event.name !== 'word') return;
    const words = Array.from(row.querySelectorAll('.spoken-word'));
    let cursor = 0;
    let index = 0;
    for (let position = 0; position < words.length; position += 1) {
      const found = text.indexOf(words[position].textContent || '', cursor);
      if (found <= event.charIndex) index = position;
      cursor = Math.max(cursor, found + (words[position].textContent || '').length);
    }
    highlightIndex(row, index);
  };
  utterance.onend = function () { if (token === requestToken) finishPlayback(); };
  utterance.onerror = function () { if (token === requestToken) setStatus('پخش این جمله ممکن نشد.'); };
  nativeUtterance = utterance;
  setStatus(message || 'صدای جایگزین مرورگر در حال پخش است.');
  speechSynthesis.speak(utterance);
  syncPlayButton();
}

async function readRow(row) {
  stopPlayback(false);
  const token = requestToken;
  setCurrent(row);
  if (voiceMode !== 'piper') {
    speakWithBrowser(row, token, 'صدای سریع مرورگر در حال پخش است.');
    return;
  }
  await ensureAudio().catch(function () {});
  setStatus('در حال ساخت صدا با Piper…');
  try {
    const piper = await ensurePiper(1500);
    setStatus('در حال ساخت صدا…');
    const wav = await piper.predict({ text: row.dataset.text || '', voiceId: 'fa_IR-amir-medium' }, function (progress) {
      if (token === requestToken && String(progress?.url || '').startsWith('tts://')) setStatus('در حال ساخت صدا…');
    });
    if (token !== requestToken) return;
    await ensureAudio();
    const buffer = await audioContext.decodeAudioData(await wav.arrayBuffer());
    if (token !== requestToken) return;
    playback = { buffer: buffer, source: null, offset: 0, startedAt: 0, paused: false, manualStop: false };
    setStatus('صدای Piper فارسی در حال پخش است.');
    startBuffer(0);
  } catch (error) {
    if (token !== requestToken) return;
    const message = error?.code === 'PIPER_WARMING'
      ? 'Piper هنوز در حال آماده‌سازی است؛ فعلاً صدای مرورگر پخش می‌شود.'
      : 'Piper در دسترس نیست؛ صدای مرورگر پخش می‌شود.';
    speakWithBrowser(row, token, message);
  }
}

function activatePiper() {
  const warmup = window.farsiPiper;
  if (!warmup?.warm) {
    setStatus('Piper در این مرورگر در دسترس نیست؛ صدای مرورگر فعال است.');
    return;
  }
  if (warmup.state === 'ready') {
    voiceMode = 'piper';
    if (voiceBadge) voiceBadge.textContent = 'Piper · امیر';
    if (piperButton) {
      piperButton.textContent = 'Piper فعال است';
      piperButton.disabled = true;
    }
    setStatus('صدای Piper آماده است.');
    return;
  }
  if (piperButton) {
    piperButton.textContent = 'در حال دریافت Piper…';
    piperButton.disabled = true;
  }
  setStatus('در حال دریافت صدای Piper؛ در این فاصله صدای مرورگر فعال است.');
  const slowNotice = setTimeout(function () {
    if (warmup.state === 'ready' || warmup.state === 'error') return;
    setStatus('دریافت Piper هنوز ادامه دارد؛ پخش جمله‌ها با صدای مرورگر آماده است.');
    if (piperButton) {
      piperButton.textContent = 'بررسی دوبارهٔ Piper';
      piperButton.disabled = false;
    }
  }, 12000);
  warmup.warm().then(function () {
    clearTimeout(slowNotice);
    activatePiper();
  }).catch(function () {
    clearTimeout(slowNotice);
    voiceMode = 'browser';
    if (voiceBadge) voiceBadge.textContent = 'صدای مرورگر';
    if (piperButton) {
      piperButton.textContent = 'تلاش دوباره برای Piper';
      piperButton.disabled = false;
    }
    setStatus('دریافت Piper کامل نشد؛ صدای مرورگر فعال است.');
  });
}

function pauseOrResume() {
  if (playback) {
    if (playback.paused) {
      ensureAudio().then(function () { startBuffer(playback.offset); });
      setStatus('پخش از همان واژه ادامه یافت.');
    } else {
      playback.offset = Math.min(playback.buffer.duration, playback.offset + (audioContext.currentTime - playback.startedAt));
      playback.paused = true;
      playback.manualStop = true;
      try { playback.source.stop(); } catch {}
      cancelAnimationFrame(animationFrame);
      setStatus('پخش مکث شد؛ از همین‌جا می‌توانید ادامه دهید.');
      syncPlayButton();
    }
    return;
  }
  if (nativeUtterance) {
    if (speechSynthesis.paused) speechSynthesis.resume(); else speechSynthesis.pause();
    setStatus(speechSynthesis.paused ? 'پخش مکث شد.' : 'پخش ادامه یافت.');
    syncPlayButton();
    return;
  }
  readRow(currentRow || rows[0]);
}

document.querySelectorAll('.speak-sentence').forEach(function (button) {
  button.addEventListener('click', function () { readRow(button.closest('.sentence-row')); });
});

document.querySelectorAll('.translation-toggle').forEach(function (button) {
  button.addEventListener('click', function () {
    const row = button.closest('.sentence-row');
    const gloss = row.querySelector('.gloss');
    const open = gloss.hasAttribute('hidden');
    gloss.toggleAttribute('hidden', !open);
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'بستن ترجمه' : 'ترجمه';
  });
});

document.querySelectorAll('.reveal-script').forEach(function (button) {
  button.addEventListener('click', function () {
    const row = button.closest('.sentence-row');
    row.classList.toggle('revealed');
    button.setAttribute('aria-pressed', String(row.classList.contains('revealed')));
    button.textContent = row.classList.contains('revealed') ? 'پنهان کردن متن' : 'نمایش متن';
  });
});

listeningToggle?.addEventListener('click', function () {
  const active = document.body.classList.toggle('listening');
  rows.forEach(function (row) { row.classList.remove('revealed'); });
  listeningToggle.setAttribute('aria-pressed', String(active));
  listeningToggle.textContent = active ? 'پایان حالت شنیداری' : 'حالت شنیداری';
});

playToggle?.addEventListener('click', pauseOrResume);
piperButton?.addEventListener('click', activatePiper);
nextButton?.addEventListener('click', function () {
  const currentIndex = Math.max(0, rows.indexOf(currentRow));
  const nextRow = rows[Math.min(rows.length - 1, currentIndex + 1)];
  readRow(nextRow);
});
window.addEventListener('beforeunload', function () { stopPlayback(false); });
`;

const globalControls = `<div class="global-controls" aria-label="تنظیمات نمایش"><button type="button" data-english-toggle aria-label="پنهان کردن عنوان‌های انگلیسی">EN</button><button type="button" data-theme-toggle aria-label="تغییر حالت روشن و تیره">☾</button></div>`;
const page = (title, content, scripts = "", origin = "") => {
  const imageUrl = origin ? `${origin}/og.png` : "";
  const social = imageUrl ? `<meta property="og:type" content="website"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="کتابخانه خواندن و شنیدن فارسی"><meta property="og:image" content="${escape(imageUrl)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="کتابخانه خواندن و شنیدن فارسی"><meta name="twitter:image" content="${escape(imageUrl)}">` : "";
  return `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#123f38"><meta name="description" content="کتابخانه خواندن و شنیدن فارسی با ترجمه جمله‌ای و تمرین شنیداری">${social}<title>${escape(title)}</title><style>${css}${handbookCss}</style></head><body>${globalControls}${content}<script>${commonScript}</script><script type="module">${piperWarmScript}</script>${scripts}</body></html>`;
};

function siteHeader(active = "library") {
  return `<header class="site-header"><a class="wordmark" href="/"><span class="wordmark-mark">ف</span><span>خوانش فارسی</span></a><nav aria-label="راهبری اصلی"><a class="${active === "library" ? "active" : ""}" href="/">کتابخانه</a><a href="/#${encodeURIComponent("شاهنامه")}">شاهنامه</a><a class="${active === "resources" ? "active" : ""}" href="/resources">منابع پیشرفته</a></nav></header>`;
}

function siteFooter() {
  return `<footer class="site-footer"><span>خواندن، شنیدن، و گفت‌وگو به فارسی.</span><a href="/resources">منابع تکمیلی</a></footer>`;
}

function home(origin) {
  const categoryOrder = ["راهنمای AFH", "علوم و فناوری", "شاهنامه", "شعر", "نثر"];
  const categories = categoryOrder.filter((category) => READERS.some((reader) => reader.category === category));
  const groups = categories.map((category) => ({ category, readers: READERS.filter((reader) => reader.category === category) }));
  const weeklyCount = READERS.reduce((total, reader) => total + reader.weeks.length, 0);
  const cards = groups.map(({ category, readers }) => `<section class="collection" id="${encodeURIComponent(category)}"><div class="collection-heading"><p>${category}</p><span>${faNumber(readers.length)} عنوان</span></div><div class="reader-grid">${readers.map((reader) => `<article class="reader-card"><div class="reader-card-top"><p>${reader.category}</p><span>${faNumber(reader.weeks.length)} بخش</span></div><h2>${reader.title_fa}</h2><p class="english-title">${escape(reader.title_en)}</p><div class="card-actions"><a class="read-button" href="/read/${reader.slug}/1">شروع خواندن</a>${reader.student && reader.teacher ? `<div class="downloads"><a href="/downloads/${reader.student}">دانشجو</a><a href="/downloads/${reader.teacher}">مدرس</a></div>` : `<span class="downloads">نسخه برخط</span>`}</div></article>`).join("")}</div></section>`).join("");
  return page("خوانش فارسی", `<main>${siteHeader()}<section class="hero"><p class="eyebrow">کتابخانه خواندن و شنیدن</p><h1>فارسی را بخوان، بشنو، و کشف کن.</h1><p class="hero-copy">متن‌های ادبی و علمی، جمله‌به‌جمله؛ با ترجمه انتخابی، صدای فارسی و حالت تمرین شنیداری.</p><div class="stats"><span>${faNumber(READERS.length)} عنوان</span><span>${faNumber(weeklyCount)} بخش</span><span>دانشجو و مدرس</span></div></section><section class="quick-strip" aria-label="امکانات خوانش"><div class="quick-item"><span class="quick-icon">۱</span><p>ترجمه هر جمله، فقط وقتی لازم است</p></div><div class="quick-item"><span class="quick-icon">◖</span><p>صدای فارسی با مکث و ادامه</p></div><div class="quick-item"><span class="quick-icon">◌</span><p>حالت شنیداری با متن پوشیده</p></div></section><section class="feature-panel"><div class="feature-card"><div class="feature-copy"><small>تازه در کتابخانه</small><h2>راهنمای مطالعهٔ AFH 1</h2><p>نسخه فارسی دانشجو و نسخه دوزبانه مدرس، با شماره‌گذاری یکسان جمله‌ها.</p></div><div class="feature-actions"><a class="button" href="/read/afh1-2025/1">مطالعه در سایت</a><a class="button secondary" href="/downloads/${HANDBOOKS.student}">دریافت نسخه دانشجو</a><a class="button secondary" href="/downloads/${HANDBOOKS.teacher}">دریافت نسخه مدرس</a></div></div></section><div class="collections">${cards}</div>${siteFooter()}</main>`, "", origin);
}

function readerPage(reader, week, teacher, origin) {
  const lines = week.lines.map((line) => line.kind === "heading"
    ? `<li class="sentence-row is-heading"><div class="sentence-main"><p class="source-line"><span class="sentence-text">${escape(line.text)}</span></p></div></li>`
    : `<li class="sentence-row" data-text="${escape(line.text)}"><div class="sentence-main"><button class="speak-sentence" type="button" aria-label="خواندن این جمله">▶</button><p class="source-line"><span class="line-id">${line.id}</span><span class="sentence-text">${wordMarkup(line.text)}</span></p></div><div class="sentence-actions">${line.gloss ? `<button class="translation-toggle" type="button" aria-expanded="false">ترجمه</button>` : ""}<button class="reveal-script" type="button" aria-pressed="false">نمایش متن</button></div>${line.gloss ? `<p class="gloss" dir="ltr" hidden>${escape(line.gloss)}</p>` : ""}</li>`).join("");
  const previous = week.number > 1 ? `<a href="/read/${reader.slug}/${week.number - 1}${teacher ? "?edition=teacher" : ""}">بخش پیش</a>` : "<span></span>";
  const next = week.number < reader.weeks.length ? `<a href="/read/${reader.slug}/${week.number + 1}${teacher ? "?edition=teacher" : ""}">بخش بعد</a>` : "<span></span>";
  const notes = teacher && week.vocab.length ? `<section class="teacher-notes" dir="ltr"><h2>Vocabulary and usage</h2><ul>${week.vocab.map((word) => `<li>${escape(word)}</li>`).join("")}</ul>${week.note ? `<p><strong>Teaching note:</strong> ${escape(week.note)}</p>` : ""}</section>` : "";
  const picker = `<label>بخش <select aria-label="انتخاب بخش" onchange="window.location.href='/read/${reader.slug}/'+this.value+'${teacher ? "?edition=teacher" : ""}'">${reader.weeks.map((item) => `<option value="${item.number}"${item.number === week.number ? " selected" : ""}>${faNumber(item.number)} از ${faNumber(reader.weeks.length)}</option>`).join("")}</select></label>`;
  const downloads = reader.student && reader.teacher ? `<section class="reader-downloads"><p>دریافت نسخه کامل</p><a href="/downloads/${reader.student}">فایل دانشجو</a><a href="/downloads/${reader.teacher}">فایل مدرس</a></section>` : "";
  const tools = `<section class="reader-tools" aria-label="ابزارهای خواندن"><button class="tool-button" type="button" data-listening-toggle aria-pressed="false">حالت شنیداری</button><button class="tool-button" type="button" data-play-toggle aria-pressed="false">پخش</button><button class="tool-button" type="button" data-next-sentence>جمله بعد</button><button class="tool-button" type="button" data-piper-button>صدای Piper (۶۴ مگابایت)</button><span class="voice-badge" data-voice-badge>صدای مرورگر</span><span class="voice-status" data-voice-status aria-live="polite">صدای سریع مرورگر آماده است؛ Piper اختیاری است.</span></section>`;
  return page(`${reader.title_fa} — بخش ${faNumber(week.number)}`, `<main class="reader-page"><header class="reader-header"><a class="back-link" href="/">← کتابخانه</a><div class="reader-title-block"><p>${reader.category}</p><h1>${reader.title_fa}</h1>${teacher ? `<span class="english-title" dir="ltr">${escape(reader.title_en)}</span>` : ""}</div><span class="week-chip">بخش ${faNumber(week.number)}</span></header><nav class="edition-switch" aria-label="انتخاب نسخه"><a class="${teacher ? "" : "active"}" href="/read/${reader.slug}/${week.number}">مطالعه</a><a class="${teacher ? "active" : ""}" href="/read/${reader.slug}/${week.number}?edition=teacher">راهنمای مدرس</a></nav>${tools}<article class="week-reader"><div class="week-intro"><p>${week.section_fa}</p><span>${faNumber(week.lines.length)} جمله</span></div><ol class="source-lines">${lines}</ol>${notes}</article><nav class="week-navigation">${previous}${picker}${next}</nav>${downloads}</main>`, `<script type="module">${readerScript}</script>`, origin);
}

function resourcesPage(origin) {
  const sources = ADVANCED_SOURCES.map((source) => `<article class="source-card"><small>${source.kind}</small><h3>${source.title}</h3><p>${source.description}</p><p class="practice-task"><strong>تمرین:</strong> ${source.task}</p><a ${externalLink(source.url)}>رفتن به منبع ↗</a></article>`).join("");
  return page("منابع پیشرفته فارسی", `<main>${siteHeader("resources")}<div class="resources-page"><section class="resources-hero"><a class="back-link" href="/">← کتابخانه</a><h1>منابع اصیل برای فارسی پیشرفته</h1><p>متن‌های واقعی و بلند برای گسترش واژگان، آشنایی با سبک‌های گوناگون و مطالعه مستقل.</p></section><section class="resource-section"><div class="resource-section-heading"><small>شاهنامه به زبان امروز</small><h2>نسخه‌های کامل و روایی</h2></div><div class="prose-grid"><article class="prose-card"><small>متن کامل منظوم</small><h3>شاهنامه فردوسی در گنجور</h3><p>نزدیک به پنجاه هزار بیت در یک مجموعه جست‌وجوپذیر؛ مناسب برای رجوع به متن اصلی.</p><a class="button ghost" ${externalLink("https://ganjoor.net/ferdousi/shahname/")}>دیدن متن کامل</a></article><article class="prose-card"><small>نثر روان و کامل</small><h3>نثر کامل شاهنامه فردوسی</h3><p>روایت عباس عطاری کرمانی با زبان ساده و پیوسته؛ گزینه‌ای برای خواندن شاهنامه مانند یک داستان بلند.</p><a class="button ghost" ${externalLink("https://taaghche.com/book/91793/%D9%86%D8%AB%D8%B1-%DA%A9%D8%A7%D9%85%D9%84-%D8%B4%D8%A7%D9%87%D9%86%D8%A7%D9%85%D9%87-%D9%81%D8%B1%D8%AF%D9%88%D8%B3%DB%8C")}>مشاهده نسخه قانونی</a></article><article class="prose-card"><small>روایت داستانی کامل</small><h3>شاهنامه به نثر کاوه گوهرین</h3><p>بازگویی کامل داستان‌ها از آغاز تا پایان، برای خواننده‌ای که نثر معاصر را ترجیح می‌دهد.</p><a class="button ghost" ${externalLink("https://zhin.co.uk/shop/shahnameh-3/")}>مشاهده معرفی کتاب</a></article></div></section><section class="resource-section"><div class="resource-section-heading"><small>راهنمای دوره</small><h2>دفترچه AFH 1</h2></div><div class="handbook-downloads"><a class="button" href="/downloads/${HANDBOOKS.student}">نسخه فارسی دانشجو</a><a class="button secondary" href="/downloads/${HANDBOOKS.teacher}">نسخه دوزبانه مدرس</a></div></section><section class="resource-section"><div class="resource-section-heading"><small>مطالعه تکمیلی</small><h2>نشریات و پایگاه‌های بزرگ</h2></div><div class="source-grid">${sources}</div></section></div>${siteFooter()}</main>`, "", origin);
}

function download(name) {
  const data = FILES[name];
  if (!data) return new Response("Not found", { status: 404 });
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Response(bytes, { headers: { "content-type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "content-disposition": `attachment; filename="${name}"` } });
}

function socialImage() {
  const binary = atob(OG_IMAGE);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Response(bytes, { headers: { "content-type": "image/png", "cache-control": "public, max-age=31536000, immutable" } });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.split("/").filter(Boolean).map(decodeURIComponent);
    if (path[0] === "og.png" && path.length === 1) return socialImage();
    if (path[0] === "downloads" && path.length === 2) return download(path[1]);
    if (path[0] === "resources" && path.length === 1) return new Response(resourcesPage(url.origin), { headers: { "content-type": "text/html; charset=utf-8" } });
    if (path[0] === "read" && path.length === 3) {
      const reader = READERS.find((item) => item.slug === path[1]);
      const week = reader?.weeks.find((item) => item.number === Number(path[2]));
      if (!reader || !week) return new Response(page("پیدا نشد", "<main class=reader-page><p>این صفحه پیدا نشد.</p></main>", "", url.origin), { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });
      return new Response(readerPage(reader, week, url.searchParams.get("edition") === "teacher", url.origin), { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    if (path.length === 0) return new Response(home(url.origin), { headers: { "content-type": "text/html; charset=utf-8" } });
    return new Response("Not found", { status: 404 });
  },
};
