# Pumpolino — Direction C build

Three languages, generated from one source of copy. No framework, no dependencies.

```
dist/index.html        English   →  pumpolino.com/          52.0 KB
dist/de/index.html     Deutsch   →  pumpolino.com/de/       52.6 KB
dist/fr/index.html     Français  →  pumpolino.com/fr/       53.1 KB
dist/404.html          cavitation error page                10.1 KB
dist/sitemap.xml       with hreflang alternates
dist/robots.txt

src/content.mjs        every word on the site, all 3 languages
src/style.css          the stylesheet
src/flow.js            the canvas engine
build.mjs              the generator
```

## Open it locally

Double-click `dist/index.html`. Everything is inline — no server needed, and the
language switcher works off disk because the links are relative.

The only external request is Google Fonts. Offline it falls back to
Helvetica/Arial and the system mono; the layout holds either way. The contact
form detects `file://` and shows a local-preview message instead of posting.

## Change the copy

**Edit `src/content.mjs`, then run `node build.mjs`.** That's the whole loop.

Every string — headings, body, form labels, error messages, even the stage names
painted onto the ServiceFlow canvas — lives in that one file, keyed by locale.
This is deliberate: the audit flagged that your six hand-maintained HTML files
each re-declared the same header and footer, which is how nav drift starts. With
three languages that problem would have tripled. Now there is one place to edit
and one command to run.

Adding a fourth language means adding a key to `CONTENT` and a line to `LOCALES`.

## Language handling

- **English is the default** at `/`, and nothing auto-redirects. A visitor with a
  German browser still lands on English and chooses for themselves.
- The switcher is real `<a href>` links, not JavaScript — crawlers follow them and
  they work with JS disabled.
- It **keeps your place**: switching from `/#products` lands on `/de/#products`.
  Section IDs are identical across all three pages.
- `hreflang` alternates on every page plus `x-default` → English, and the same
  set in `sitemap.xml`. This is what tells Google these are translations rather
  than duplicate content.
- `lang="de-CH"` and `lang="fr-CH"`, not bare `de`/`fr` — it signals the market
  and gets you the right hyphenation and quotation marks.

### About the German

It is **Schweizer Hochdeutsch**, not dialect — nobody writes B2B copy in
Schwiizerdütsch, and a Swiss reader would find it odd if you did.

- **No ß anywhere**, always `ss` (`fliessen`, not `fließen`). Verified: zero in the build.
- Helvetisms used on purpose: **Offerte** (not Angebot), **innert zwei Tagen**
  (not innerhalb), **Unterlagen**, **Fachkräfte**, **Impressum**.
- German runs ~15% longer than English, which is why the tile headings now carry
  a `min-height` — otherwise the three cards break their shared baseline.

### About the French

Business French for Suisse romande. `Mentions légales` for the legal page,
`e-mail` rather than `courriel`, and the typographic conventions French
actually needs — the narrow no-break space before `?` and `:` is handled by
the `lang` attribute.

## Deploy to GitHub Pages

Copy the contents of `dist/` to the repo root. `404.html` is picked up
automatically. Then:

1. **Self-host the fonts.** Two WOFF2 files into `/assets/fonts/`, swap the
   `<link>` for `@font-face` in `src/style.css`, rebuild. Removes a 741 ms
   render-blocking request and the EU data-transfer question together.
2. **Add `/assets/og.png`** (1200×630). `og:image` already points there; until
   the file exists, shared links render a blank card.
3. **Write a real Impressum** at `/legal/` in all three languages. The current
   one is not valid for CH/EU — no entity, no address, no data controller.
4. **Check `WEB3FORMS_KEY`** at the top of `src/flow.js`. Same key your current
   site uses, now behind a honeypot and a required consent checkbox.

## The motion system

One engine, one `requestAnimationFrame` loop, 15 canvas instances. Regimes are
parameter sets on the same `field()` function, not separate code paths:

| Regime | Meaning | Where |
|---|---|---|
| laminar | ordered, under control | Process tile, nav underlines |
| transitional | work in progress | section dividers |
| turbulent | energy, load | Pumps tile, divider right edge |
| sedimenting | discretion, patience | Art & Provenance tile |
| cavitation | failure | 404 |

Off-screen canvases are paused by `IntersectionObserver`. `prefers-reduced-motion`
and phone widths render a composed still frame and stop — never a blank canvas.

## Audit fixes, verified in all three languages

Checked with a headless render at 1440 px and 390 px, per locale:

- One `<h1>`, five `<h2>`, five `<h3>` per page (the old site had **zero** headings)
- All text ≥ 12 px; body and labels pass WCAG AA contrast
- Zero tap targets under 44 px
- No horizontal overflow at 390 px; mobile header renders on every page
- Skip link, visible `:focus-visible` rings throughout
- ServiceFlow circuit driven by a real `<button aria-pressed>`, so it works
  without hover — on touch and by keyboard
- No JavaScript errors on any page in any language

## Still to do

Case studies, product screenshots, an About page, the Impressum. The layout has
room reserved for all of it — thin content is the remaining gap, not the design.
When those exist they go in `src/content.mjs` alongside everything else.
