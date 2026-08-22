---
name: Rakuten ReX
org: Rakuten (Japan)
coverage: partial
url: https://rex.rakuten.design (403 — taken internal)
repo: null (the github.com/rakuten-rex org still exists but has 0 public repos — see "Source status" below)
license: MIT (per the LICENSE in the npm packages)
tech: [React, Sass, built CSS output]
figma_kit: unverified
tokens_format: [no token package — measured from each component's *.static.css]
a11y_target: unverified
platform: web
domain: commerce
verified: 2026-08-18
source: "npm @rakuten-rex/typography@1.0.5 · @rakuten-rex/button@1.5.1 · @rakuten-rex/grid@1.6.0 · @rakuten-rex/core@3.0.1 → package/*/​*.static.css"
---
<!-- lang-links -->
> **English** · [한국어](rakuten-rex.ko.md)
<!-- /lang-links -->

## In one line

Rakuten's (Japanese commerce) React component system — a sample **published to npm
between 2019 and 2021 and then discontinued, whose documentation and repositories
have all disappeared, leaving the npm tarballs as the only surviving source**. Its
typography has **`:lang(en)` / `:lang(ja)` line-height branching** baked into the CSS
(crossing LINE's language axis), and the shipped CSS carries **a build bug that left
`undefined` literals in place**.

## Source status — a system that exists only on npm (measured 2026-08-18)

| Channel | Status |
|---------|--------|
| Docs rex.rakuten.design | **403** (presumed taken internal — the Wayback record shows a 301 in 2024 and 403s through 2025–26) |
| Wayback 200 snapshots | **none** (the CDX `statuscode:200` filter returns 0 rows — there is no snapshot from when it was public) |
| GitHub org rakuten-rex | the org returns 200 but **public_repos: 0** — the typography, button, core and grid repos all 404 (every repository URL in package.json is a dead link) |
| npm `@rakuten-rex/*` | **36 packages confirmed** (35 from search plus `core` by direct probe) · published between 2019-07 and 2021-02 (`icons@1.3.0` on 2021-02-18 was the last) |

- **There is no token package** — `color`, `colors`, `palette`, `spacing`, `tokens`,
  `design-tokens`, `theme`, `foundation`, `elevation` and `shadow` all 404 on probe.
  `core@3.0.1` is not tokens but **normalize.css split into Sass mixins**.
- Values were measured from the component packages' `*.static.css` (one of five build
  outputs). An extreme case of the "npm published package" route in HARVESTING.md —
  one where **no other route exists at all**.

## Typography — 16 styles, with :lang() line-height branching

`@rakuten-rex/typography@1.0.5` (2020-09-11). Default colour `#333`, a system font
stack (-apple-system … Segoe UI Emoji). Weights 100/300/400/500/700 by class.

| Style | Desktop | Mobile (≤25.875em = 414px) |
|-------|---------|------------|
| Display1 | 2.875rem (46px) / 1.391 | 2.25rem + **:lang(en) 1.444 · :lang(ja) 1.333** |
| Display2 | 2.5rem (40) / 1.4 | 2rem / 1.375 |
| Display3 | 2.25rem (36) / 1.5 + **:lang branching (en 1.444 / ja 1.333)** | 1.75rem / 1.429 |
| Display4 | 2rem (32) / 1.375 | 1.5rem / 1.333 |
| Display5 | 1.75rem (28) / 1.429 | (no branching) |
| H1–H6 | 24/20/16/14/12/12px | 20/16/14/12/10/10px |
| LeadBody · Body1 · Body2 | 20 / 16 / 14px (lh 1.4/1.5/1.429) | (fixed) |
| Caption · Overline | 12 / 10px (lh 1.333/1.6) | (fixed) |

- **Per-language (:lang) line-height branching exists as a CSS selector** — ja takes a
  lower line height than en (1.333 vs 1.444). Where LINE (LDSG) puts the language axis
  in the token names, ReX branches **at the selector layer**. A counter-example to
  "no per-language line-height or tracking rules were found" in
  `patterns/typography.md` (line 623) · cross-reference `line.md` and `i18n/`.
- A single responsive downshift boundary at **414px** (25.875em) — two-band typography.

## Buttons — three blue steps, a 2.5rem pill

`@rakuten-rex/button@1.5.1` (2020-11-16). Seven variants (Button, ButtonUi, Outline,
Link plus three Pill forms).

```
Base    #134ff3 · hover #3a6dfa · active #053ace  (three blue steps)
Shape   radius 0.25rem · Pill 2.5rem · border 1px · padding 0.5rem 1rem
Text    1rem / 1.5 (system font)
Outline: white background + blue text → fills on hover / Link: hover bg #ebebeb
```

- **An `undefined` literal shipped as a bug**:
  `.rex-button.hover{background-color: undefined}` — a JS undefined serialised
  straight into CSS on the state mirror classes (`.hover` / `.active` / `.focus`), and
  distributed that way across every variant. Physical evidence of an unverified build
  pipeline.
- `:focus` holds the same values as `:hover` — no focus-specific indication (which,
  combined with `outline: none`, counts against accessibility).

## Grid — 12 columns, 24px gutter, six breakpoints

`@rakuten-rex/grid@1.6.0` (2020-07-01). A Bootstrap-style 12-column flexbox.

```
Breakpoints      375 · 414 · 768 · 1024 · 1280 · 1440px (xxl)
Container max    290 · 345 · 384 · 696 · 936 · 1224px
Gutter           24px (row -12 / col +12)
```

**414px is a first-class boundary in both the typography and the grid** — a
mobile-first commerce sample that takes the iPhone Plus/Max width straight as a
breakpoint.

## Notable decisions

- **The npm tarball is the only surviving source** — docs 403, zero Wayback
  snapshots, repositories gone. A sample demonstrating that a discontinued system can
  still be measured after the fact
- :lang(en) / :lang(ja) line-height branching at the selector layer — the third
  position for the language axis (LINE = token names · shadcn/ui = font slots ·
  ReX = CSS selectors)
- Packages split per component, each bundling five outputs
  (development/production/static × css/js) — static.css is the measurement window
- A single 414px mobile boundary plus a 1440 xxl — traces of the device distribution
  in commerce traffic
- The `undefined` shipping bug — a JS→CSS serialisation failure on the state tokens,
  distributed as-is

## Accessibility

Unverified (`:focus` identical to hover plus `outline: none` — AA is doubtful without
an explicit provision).

## Notes

- npm: https://www.npmjs.com/org/rakuten-rex (36 packages, 2019-07 to 2021-02)
- Verification commands: `registry.npmjs.org/-/v1/search?text=%40rakuten-rex` plus
  individual probes (confirming `@rakuten-rex/<name>` 404s)
- **Still to confirm:** the full colour palette (there is no token package — sweeping
  the static.css of the remaining 30-odd packages such as text-field and checkbox
  would recover the list of colours in use), the contents of `icons@1.3.0` (the last
  release), what became of Rakuten's internal system after ReX, and the Figma kit
