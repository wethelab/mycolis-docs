#!/usr/bin/env node
// Generates the brand images from static/img/logo.svg:
//   static/img/favicon.ico      (PNG 32 and 64 px inside an ICO)
//   static/img/favicon-192.png
//   static/img/favicon-512.png
//   static/img/social-card.png  (1200 x 630)
//
// Each size is rendered from the SVG by a headless Chrome, never scaled from
// a bitmap. Run it again whenever the logo changes:
//
//   CHROME=/path/to/chrome-headless-shell node scripts/brand-assets.mjs
//
// Without CHROME, the script looks for the headless shell that Playwright
// installs in ~/Library/Caches/ms-playwright.

import {execFileSync} from 'node:child_process';
import {existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {homedir, tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const img = join(root, 'static', 'img');
const logo = join(img, 'logo.svg');

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const cache = join(homedir(), 'Library', 'Caches', 'ms-playwright');
  if (!existsSync(cache)) return null;
  for (const dir of readdirSync(cache).sort().reverse()) {
    if (!dir.startsWith('chromium_headless_shell-')) continue;
    for (const arch of ['chrome-headless-shell-mac-arm64', 'chrome-headless-shell-mac-x64']) {
      const bin = join(cache, dir, arch, 'chrome-headless-shell');
      if (existsSync(bin)) return bin;
    }
  }
  return null;
}

const chrome = findChrome();
if (!chrome) {
  console.error('Chrome sans interface introuvable : définissez CHROME.');
  process.exit(1);
}
if (!existsSync(logo)) {
  console.error(`Logo introuvable : ${logo}`);
  process.exit(1);
}

const work = mkdtempSync(join(tmpdir(), 'mycolis-brand-'));
const logoUrl = pathToFileURL(logo).href;

/** Renders an HTML document to a PNG of exactly width x height pixels. */
function render(name, html, width, height) {
  const page = join(work, `${name}.html`);
  const out = join(work, `${name}.png`);
  writeFileSync(page, html);
  execFileSync(chrome, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--default-background-color=00000000',
    `--window-size=${width},${height}`,
    `--screenshot=${out}`,
    pathToFileURL(page).href,
  ], {stdio: 'ignore'});
  return readFileSync(out);
}

function icon(size) {
  return render(
    `icon-${size}`,
    `<!doctype html><html><body style="margin:0;background:transparent">` +
      `<img src="${logoUrl}" width="${size}" height="${size}" style="display:block"></body></html>`,
    size,
    size,
  );
}

/** ICO container holding PNG images, read by every current browser. */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({size, png}, index) => {
    const entry = 6 + 16 * index;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map(({png}) => png)]);
}

const socialCard = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; }
  body {
    display: flex;
    align-items: center;
    gap: 64px;
    padding: 0 96px;
    box-sizing: border-box;
    background-color: #f4f1e6;
    background-image:
      radial-gradient(700px 380px at 8% 0%, rgba(46, 20, 196, 0.10), transparent 60%),
      radial-gradient(620px 340px at 94% 100%, rgba(240, 74, 40, 0.12), transparent 60%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1a1523;
  }
  img {
    width: 232px;
    height: 232px;
    border-radius: 44px;
    box-shadow: 0 18px 48px rgba(26, 21, 35, 0.18);
    flex: none;
  }
  .eyebrow { margin: 0 0 12px; font-size: 28px; font-weight: 600; color: #2e14c4; }
  h1 { margin: 0; font-size: 112px; font-weight: 800; line-height: 1; letter-spacing: -0.02em; }
  p.tagline { margin: 24px 0 0; font-size: 38px; font-weight: 500; line-height: 1.3; color: #3b3548; }
</style>
</head>
<body>
  <img src="${logoUrl}" alt="">
  <div>
    <p class="eyebrow">Documentation</p>
    <h1>myColis</h1>
    <p class="tagline">Étiquettes, douane et points relais Colissimo pour Shopify</p>
  </div>
</body>
</html>`;

try {
  const icons = Object.fromEntries([32, 64, 192, 512].map((size) => [size, icon(size)]));
  writeFileSync(join(img, 'favicon.ico'), ico([
    {size: 32, png: icons[32]},
    {size: 64, png: icons[64]},
  ]));
  writeFileSync(join(img, 'favicon-192.png'), icons[192]);
  writeFileSync(join(img, 'favicon-512.png'), icons[512]);
  writeFileSync(join(img, 'social-card.png'), render('social-card', socialCard, 1200, 630));
  console.log('Images générées dans static/img : favicon.ico, favicon-192.png, favicon-512.png, social-card.png');
} finally {
  rmSync(work, {recursive: true, force: true});
}
