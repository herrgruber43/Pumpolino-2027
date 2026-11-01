/* ════════════════════════════════════════════════════════════════
   build.mjs — emits three static, self-contained pages plus a 404.

     node build.mjs

   Output:
     dist/index.html        en   →  pumpolino.com/
     dist/de/index.html     de   →  pumpolino.com/de/
     dist/fr/index.html     fr   →  pumpolino.com/fr/
     dist/404.html
     dist/sitemap.xml
     dist/robots.txt

   Every page carries its own <style> and <script> inline, so any of
   them can be opened straight off disk with a double-click.
   ════════════════════════════════════════════════════════════════ */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { CONTENT, LOCALES, LANG_NAMES, PATHS } from './src/content.mjs';
import { OPERATOR, LEGAL } from './src/legal.mjs';
import { copyFileSync, existsSync } from 'node:fs';

const SITE = 'https://pumpolino.com';
const CSS  = readFileSync('src/style.css', 'utf8');
const JS   = readFileSync('src/flow.js', 'utf8');

const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230A0D0F'/%3E%3Cg fill='none' stroke='%23E8ECEE' stroke-width='2.2' stroke-linecap='round'%3E%3Cpath d='M16 10 Q22 11 23 18'/%3E%3Cpath d='M21 19 Q19 24 13 24'/%3E%3Cpath d='M11 21 Q8 16 11 11'/%3E%3C/g%3E%3Ccircle cx='16' cy='16' r='2.4' fill='%23E4572E'/%3E%3C/svg%3E";

/* relative path from `from` locale's directory to `to` locale's page.
   Works identically on a server (/de/ → ../ → /) and from file://. */
function rel(from, to) {
  const up = from === 'en' ? '' : '../';
  return to === 'en' ? `${up}index.html` : `${up}${PATHS[to]}index.html`;
}

const esc = s => String(s).replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;');

function langSwitch(loc) {
  return `<div class="langsw" role="group" aria-label="${esc(CONTENT[loc].langLabel)}">
        ${LOCALES.map(l => l === loc
          ? `<span class="lang on" aria-current="true" lang="${l}">${l.toUpperCase()}</span>`
          : `<a class="lang" href="${rel(loc, l)}" data-lang-link="${rel(loc, l)}" hreflang="${CONTENT[l].htmlLang}" lang="${l}"><abbr title="${LANG_NAMES[l]}">${l.toUpperCase()}</abbr></a>`
        ).join('\n        ')}
      </div>`;
}

function tile(t) {
  return `      <a class="tile" href="${t.href}">
        <div class="win">
          <canvas id="${t.canvas}" aria-hidden="true"></canvas>
          <span class="rg" style="color:var(${t.regimeVar})">${t.regime}</span>
        </div>
        <div class="body">
          <h3>${t.h3}</h3>
          <p class="kind">${t.kind}</p>
          <p>${t.p}</p>
          <ul>${t.li.map(x => `\n            <li>${x}</li>`).join('')}
          </ul>
          <span class="go">${t.go}</span>
        </div>
      </a>`;
}

function product(it, n, c) {
  const circuit = it.circuit ? `
    <div class="circuit">
      <canvas id="f-pipe" aria-hidden="true"></canvas>
      <div class="circ-ui">
        <button class="modebtn" id="mode-btn" type="button" aria-pressed="false">${c.js.modeOn}</button>
        <span class="circ-state" id="mode-state" role="status">${c.js.stateReactive}</span>
      </div>
    </div>` : '';
  return `  <article class="prod">
    <div class="prod-top">
      <div>
        <p class="n">${c.products.productWord} 0${n}</p>
        <h3>${it.name}</h3>
        <p class="sub">${it.sub}</p>
      </div>
    </div>${circuit}
    <div class="prod-body">
      <p>${it.lead}</p>
      <div class="feats">
${it.feats.map(([h, p]) => `        <div class="feat">
          <h4>${h}</h4>
          <p>${p}</p>
        </div>`).join('\n')}
      </div>
      <div class="steps">
${it.steps.map((s, i) => `        <span class="step"><b>0${i + 1}</b> &nbsp;${s}</span>`).join('\n')}
      </div>
    </div>
  </article>`;
}

function sideList(rows) {
  return rows.map(([h, b]) => `      <b>${h}</b>\n      ${b}`).join('\n');
}

function page(loc) {
  const c = CONTENT[loc];
  const canonical = `${SITE}/${PATHS[loc]}`;
  const alts = LOCALES.map(l =>
    `<link rel="alternate" hreflang="${CONTENT[l].htmlLang}" href="${SITE}/${PATHS[l]}">`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="${c.htmlLang}" dir="${c.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.metaDesc)}">
<link rel="canonical" href="${canonical}">
${alts}
<link rel="alternate" hreflang="x-default" href="${SITE}/">
<meta property="og:type" content="website">
<meta property="og:locale" content="${c.htmlLang.replace('-', '_')}">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(c.ogTitle)}">
<meta property="og:description" content="${esc(c.ogDesc)}">
<meta property="og:image" content="${SITE}/assets/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0A0D0F">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">

<style>
${CSS}</style>
</head>
<body>

<a class="skip" href="#main">${c.skip}</a>

<div id="rail" aria-hidden="true">
  <svg viewBox="0 0 64 64" width="60" height="60">
    <circle cx="32" cy="32" r="26" fill="#0E1416" stroke="#2E3940" stroke-width="1"/>
    <path d="M 13 45 A 26 26 0 1 1 51 45" fill="none" stroke="#1F282D" stroke-width="3"/>
    <path id="g-arc" d="M 13 45 A 26 26 0 1 1 51 45" fill="none" stroke="#5FBFA8" stroke-width="3"
          stroke-linecap="round" stroke-dasharray="123" stroke-dashoffset="123"/>
    <line id="g-needle" x1="32" y1="32" x2="32" y2="13" stroke="#E4572E" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="32" cy="32" r="2.6" fill="#E4572E"/>
  </svg>
  <div class="rd" id="g-read">0.00 bar</div>
</div>

<header class="hdr" id="hdr">
  <div class="hdr-in">
    <a class="brand" href="index.html">
      <canvas id="f-mark" width="30" height="30" aria-hidden="true"></canvas>
      <span class="wm">pump<em>o</em>lino</span>
    </a>
    <div class="navwrap" id="navwrap">
      <nav class="nav" id="nav" aria-label="${esc(c.langLabel === 'Sprache' ? 'Hauptnavigation' : c.langLabel === 'Langue' ? 'Navigation principale' : 'Main')}">
        <a href="#thesis" data-amp="0.55">${c.nav.thesis}</a>
        <a href="#practice" class="calm" data-amp="0.3">${c.nav.practice}</a>
        <a href="#products" data-amp="0.75">${c.nav.products}</a>
        <a href="#pumps" class="rough" data-amp="1.6">${c.nav.pumps}</a>
      </nav>
      ${langSwitch(loc)}
      <a class="navcta" href="#contact">${c.nav.contact}</a>
      <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="${esc(c.menu)}">
        <svg viewBox="0 0 18 14" aria-hidden="true"><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M0 1h18"/><path d="M0 7h12"/><path d="M0 13h16"/></g></svg>
      </button>
    </div>
  </div>
</header>

<main id="main">

<div class="hero">
  <canvas id="f-hero" aria-hidden="true"></canvas>
  <div class="hero-veil" aria-hidden="true"></div>
  <div class="shell hero-in">
    <p class="eyebrow">${c.hero.eyebrow}</p>
    <h1>${c.hero.h1}</h1>
    <p>${c.hero.lede}</p>
    <div class="btns">
      <a class="btn-p" href="#products">${c.hero.cta1}</a>
      <a class="btn-s" href="#thesis">${c.hero.cta2}</a>
    </div>
  </div>
</div>

<section id="thesis" class="shell">
  <p class="sec-lab">${c.thesis.lab}</p>
  <div class="thesis">
    <div>
      <h2>${c.thesis.h2}</h2>
${c.thesis.p.map(x => `      <p>${x}</p>`).join('\n')}
    </div>
    <div class="side">
${sideList(c.thesis.side)}
    </div>
  </div>
</section>

<canvas class="divider" id="f-div1" aria-hidden="true"></canvas>

<section id="practice" class="shell">
  <p class="sec-lab">${c.practice.lab}</p>
  <h2>${c.practice.h2}</h2>
  <p style="margin-bottom:34px">${c.practice.lede}</p>
  <div class="tiles">
${c.practice.tiles.map(tile).join('\n\n')}
  </div>
</section>

<canvas class="divider" id="f-div2" aria-hidden="true"></canvas>

<section id="products" class="shell">
  <p class="sec-lab">${c.products.lab}</p>
  <h2>${c.products.h2}</h2>
  <p style="margin-bottom:34px">${c.products.lede}</p>

${c.products.items.map((it, i) => product(it, i + 1, c)).join('\n\n')}
</section>

<canvas class="divider" id="f-div3" aria-hidden="true"></canvas>

<section id="pumps" class="shell">
  <p class="sec-lab">${c.pumps.lab}</p>
  <div class="thesis">
    <div>
      <h2>${c.pumps.h2}</h2>
${c.pumps.p.map(x => `      <p>${x}</p>`).join('\n')}
    </div>
    <div class="side">
${sideList(c.pumps.side)}
    </div>
  </div>
</section>

<canvas class="divider" id="f-div4" aria-hidden="true"></canvas>

<section id="contact" class="shell">
  <p class="sec-lab">${c.contact.lab}</p>
  <div class="contact">
    <div>
      <h2>${c.contact.h2}</h2>
      <form class="form" id="cform" novalidate>
        <div class="fld">
          <label for="c-name">${c.contact.f.name}</label>
          <input id="c-name" name="name" type="text" autocomplete="name" placeholder="${esc(c.contact.f.namePh)}">
          <canvas class="mn" aria-hidden="true"></canvas>
        </div>
        <div class="fld">
          <label for="c-email">${c.contact.f.email} <span class="req" aria-hidden="true">*</span></label>
          <input id="c-email" name="email" type="email" required autocomplete="email" placeholder="${esc(c.contact.f.emailPh)}">
          <canvas class="mn" aria-hidden="true"></canvas>
        </div>
        <div class="fld">
          <label for="c-subject">${c.contact.f.subject} <span class="req" aria-hidden="true">*</span></label>
          <input id="c-subject" name="subject" type="text" required placeholder="${esc(c.contact.f.subjectPh)}">
          <canvas class="mn" aria-hidden="true"></canvas>
        </div>
        <div class="fld">
          <label for="c-message">${c.contact.f.message} <span class="req" aria-hidden="true">*</span></label>
          <textarea id="c-message" name="message" rows="4" required placeholder="${esc(c.contact.f.messagePh)}"></textarea>
          <canvas class="mn" aria-hidden="true"></canvas>
        </div>

        <div class="hp" aria-hidden="true">
          <label for="c-website">${esc(c.contact.f.hp)}</label>
          <input id="c-website" name="botcheck" type="text" tabindex="-1" autocomplete="off">
        </div>

        <label class="consent" for="c-consent">
          <input id="c-consent" name="consent" type="checkbox" required>
          <span>${c.contact.f.consent}</span>
        </label>

        <button class="sendbtn" id="c-send" type="submit">
          <span id="c-send-label">${c.contact.f.send}</span>
          <canvas id="f-btn" aria-hidden="true"></canvas>
        </button>

        <div class="formmsg" id="c-msg" role="status" aria-live="polite" hidden></div>
      </form>
    </div>
    <div class="cnote">${c.contact.note}</div>
  </div>
</section>

</main>

<footer>
  <div class="shell foot">
    <nav aria-label="Footer">
      <a href="#thesis">${c.nav.thesis}</a>
      <a href="#practice">${c.nav.practice}</a>
      <a href="#products">${c.nav.products}</a>
      <a href="#pumps">${c.nav.pumps}</a>
      <a href="#contact">${c.nav.contact}</a>
      <a href="legal/">${c.footer.legal}</a>
    </nav>
    <p class="mono" style="margin:0">
      pumpolino.com<br>
      ${c.footer.tag}
    </p>
  </div>
</footer>

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"ProfessionalService",
  "name":"Pumpolino",
  "url":"${canonical}",
  "slogan":"${c.footer.tag}",
  "description":"${c.jsonDesc.replace(/"/g, '\\"')}",
  "areaServed":"CH",
  "availableLanguage":["en","de","fr"]
}
</script>

<script>window.I18N = ${JSON.stringify(c.js)};</script>

<script>
${JS}</script>
</body>
</html>
`;
}

/* ── 404: one page, all three languages, no guessing ── */
function notFound() {
  const NF = readFileSync('src/404.html', 'utf8');
  return NF;
}

function out(path, body) {
  mkdirSync(dirname(`dist/${path}`), { recursive: true });
  writeFileSync(`dist/${path}`, body);
  const kb = (Buffer.byteLength(body) / 1024).toFixed(1);
  console.log(`  dist/${path.padEnd(20)} ${kb.padStart(6)} KB`);
}

console.log('building pumpolino…');
out('index.html', page('en'));
out('de/index.html', page('de'));
out('fr/index.html', page('fr'));
out('404.html', notFound());


/* ── legal pages: /legal/, /de/legal/, /fr/legal/ ── */
const legalFill = t => t.replace(/\{(\w+)\}/g, (_, k) => {
  const v = OPERATOR[k];
  return /^«TODO/.test(v) ? `<mark>${v}</mark>` : esc(v);
});
function legalPage(loc) {
  const L = LEGAL[loc];
  const home = loc === 'en' ? '../' : '../';              // legal/ sits one level below its locale root
  const hrefLegal = l => l === loc ? null : (loc === 'en' ? '../' + PATHS[l] + 'legal/' : (l === 'en' ? '../../legal/' : '../../' + PATHS[l] + 'legal/'));
  const sw = LOCALES.map(l => l === loc
    ? `<span class="lang on" aria-current="true" lang="${l}">${l.toUpperCase()}</span>`
    : `<a class="lang" href="${hrefLegal(l)}" hreflang="${LEGAL[l].htmlLang}" lang="${l}"><abbr title="${LANG_NAMES[l]}">${l.toUpperCase()}</abbr></a>`).join('');
  const canonical = `${SITE}/${PATHS[loc]}legal/`;
  const alts = LOCALES.map(l => `<link rel="alternate" hreflang="${LEGAL[l].htmlLang}" href="${SITE}/${PATHS[l]}legal/">`).join('\n');
  return `<!DOCTYPE html>
<html lang="${L.htmlLang}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(L.title)}</title>
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${canonical}">
${alts}
<meta name="theme-color" content="#0A0D0F">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
${CSS}
mark{background:rgba(228,87,46,.25);color:var(--ink);padding:0 4px}
.legal h3{font-size:12px;font-family:var(--m);font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:var(--ink);margin:36px 0 10px;padding-bottom:9px;border-bottom:1px solid var(--rule-2);max-width:66ch}
.legal h1{margin-bottom:10px}
.back{display:inline-flex;align-items:center;min-height:44px;font-family:var(--m);font-size:13px;letter-spacing:.06em;margin-bottom:20px}
</style>
</head>
<body>
<header class="hdr stuck" id="hdr">
  <div class="hdr-in">
    <a class="brand" href="${loc === 'en' ? '../' : '../'}"><span class="wm">pump<em>o</em>lino</span></a>
    <div class="langsw" role="group" aria-label="${esc(L.langLabel)}">${sw}</div>
  </div>
</header>
<main class="shell legal" style="padding-block:clamp(40px,7vw,80px)">
  <a class="back" href="../">${L.back}</a>
  <h1 style="font-size:clamp(34px,6vw,56px)">${L.h1}</h1>
${L.sections.map(([h, ps]) => `  <h3>${h}</h3>\n${ps.map(p => `  <p>${legalFill(p)}</p>`).join('\n')}`).join('\n')}
</main>
<footer><div class="shell foot"><p class="mono" style="margin:0">pumpolino.com<br>${L.tag}</p></div></footer>
</body>
</html>
`;
}
LOCALES.forEach(l => out(`${PATHS[l]}legal/index.html`, legalPage(l)));
const todo = Object.values(OPERATOR).filter(v => /^«TODO/.test(v));
if (todo.length) console.warn(`\n  ⚠  ${todo.length} legal field(s) still TODO in src/legal.mjs — fill before going live.\n`);

/* ── redirect stubs for the old site's URLs ── */
const OLD = { process: '/#practice', art: '/#practice', 'pumps-and-art': '/#pumps', contact: '/#contact' };
for (const [slug, target] of Object.entries(OLD)) {
  out(`${slug}/index.html`, `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>Pumpolino</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${SITE}${target.replace('/#', '/')}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)});</script>
</head><body><p><a href="${target}">pumpolino.com</a></p></body></html>
`);
}

/* ── social image ── */
if (existsSync('src/og.png')) { mkdirSync('dist/assets', { recursive: true }); copyFileSync('src/og.png', 'dist/assets/og.png'); console.log('  dist/assets/og.png'); }

out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.map(l => `  <url>
    <loc>${SITE}/${PATHS[l]}</loc>
${LOCALES.map(a => `    <xhtml:link rel="alternate" hreflang="${CONTENT[a].htmlLang}" href="${SITE}/${PATHS[a]}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>
    <changefreq>monthly</changefreq>
    <priority>${l === 'en' ? '1.0' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>
`);

out('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('done.');
