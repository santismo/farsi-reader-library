# Farsi Reader Library · کتابخانهٔ خوانش فارسی

The complete source and document collection behind [farsi.ojertrejo.chatgpt.site](https://farsi.ojertrejo.chatgpt.site). The library contains 17 Persian readers with sentence-level English support, student and teacher modes, listening practice, full Word downloads, and fixed-layout PDF editions of the AFH 1 handbooks.

## Download the materials

- [Browse every Student and Teacher download](DOWNLOADS.md)
- [Download the complete repository as a ZIP](https://github.com/santismo/farsi-reader-library/archive/refs/heads/main.zip)
- [Read and listen on the live site](https://farsi.ojertrejo.chatgpt.site)

## Collection

- **راهنمای AFH:** راهنمای مطالعهٔ AFH 1
- **علوم و فناوری:** کیهان و اخترشناسی، زیست و بدن، زمین و اقلیم، فیزیک و شیمی، رایانه و اینترنت، مهندسی و فناوری
- **شاهنامه:** داستان زال و رودابه، هفت‌خوان رستم، داستان رستم و سهراب، داستان سیاوش، داستان بیژن و منیژه، هفت‌خوان اسفندیار، داستان رستم و اسفندیار، داستان رستم و شغاد
- **شعر:** گزیدهٔ شعرِ فارسی
- **نثر:** گلستان: حکایت‌های برگزیده

The collection currently includes 1,516 sections and 25,838 Persian reading lines.

## Repository layout

- `public/downloads/`: all complete student and teacher DOCX files, plus fixed-layout AFH 1 PDFs
- `data/readers.json`: the full structured bilingual reader corpus used by the site
- `worker/template.js`: the site interface, reader mode, downloads catalog, and audio controls
- `scripts/`: corpus normalization, handbook synchronization, document generation, validation, and deployment build tools

## Build

This is a dependency-free Sites Worker project. Run `npm run build` to create the deployable worker in `dist/`, then run `node scripts/validate-artifact.mjs` to verify the artifact.

## Notes

The modern educational prose uses standard contemporary Persian orthography and avoids unnecessary short-vowel marks. Classical poetry and source-specific historical forms are preserved when appropriate. The AFH materials retain their educational structure while using reviewed Persian terminology.
