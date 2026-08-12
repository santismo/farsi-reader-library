export const basePath = "/farsi-reader-library";
export const pagesOrigin = "https://santismo.github.io";
export const pagesUrl = `${pagesOrigin}${basePath}`;

export function staticHtml(html, options = {}) {
  const { readerSlug = null, teacher = false } = options;
  let result = html
    .replaceAll(`${pagesOrigin}/og.png`, `${pagesUrl}/og.png`)
    .replaceAll("new SharedWorker('/piper-worker.js", `new SharedWorker('${basePath}/piper-worker.js`)
    .replaceAll("new Worker('/piper-worker.js", `new Worker('${basePath}/piper-worker.js`);

  if (readerSlug) {
    const dynamicPicker = `window.location.href='/read/${readerSlug}/'+this.value+'${teacher ? "?edition=teacher" : ""}'`;
    const staticPicker = `window.location.href='${basePath}/read/${readerSlug}/'+this.value+'${teacher ? "/teacher/" : "/"}'`;
    result = result.replaceAll(dynamicPicker, staticPicker);
  }

  return result
    .replace(/href="\/read\/([^/"?]+)\/(\d+)\?edition=teacher"/g, `href="${basePath}/read/$1/$2/teacher/"`)
    .replace(/href="\/read\/([^/"?]+)\/(\d+)"/g, `href="${basePath}/read/$1/$2/"`)
    .replace(/href="\/downloads\//g, `href="${basePath}/downloads/`)
    .replace(/href="\/library-downloads"/g, `href="${basePath}/library-downloads/"`)
    .replace(/href="\/resources"/g, `href="${basePath}/resources/"`)
    .replace(/href="\/#/g, `href="${basePath}/#`)
    .replace(/href="\/"/g, `href="${basePath}/"`);
}

export function staticAsset(content, assetName) {
  if (assetName !== "piper-client.js") return content;
  return content
    .replaceAll("new SharedWorker('/piper-worker.js", `new SharedWorker('${basePath}/piper-worker.js`)
    .replaceAll("new Worker('/piper-worker.js", `new Worker('${basePath}/piper-worker.js`);
}
