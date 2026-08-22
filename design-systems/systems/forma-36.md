---
name: Forma 36
org: Contentful
coverage: partial
url: https://f36.contentful.com
repo: https://github.com/contentful/forma-36
license: MIT
tech: [React]
figma_kit: true
tokens_format: [JSON, CSS, SCSS, JS]
a11y_target: "WCAG 2.1 AA (stated — confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @contentful/f36-tokens@6.2.1 → dist/json/*.json · npm @contentful/f36-button@6.19.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](forma-36.ko.md)
<!-- /lang-links -->

## In one line

Contentful's (a headless CMS) system. **Font sizes have a density variant (`-high`)**, the
z-index is **a power of ten**, and `notification` sits above `tooltip`.

## Tokens

### Typography — a `-high` twin for every size

```json
"font-size-l":       "1rem",       // 16px
"font-size-l-high":  "0.875rem",   // 14px
"font-size-m":       "0.875rem",   // 14px
"font-size-m-high":  "0.75rem",    // 12px
"font-size-xl":      "1.25rem",    // 20px
"font-size-xl-high": "1.125rem"    // 18px
```

**Every step name carries a `-high` variant one size smaller** (the line heights follow the
same structure). Where Cloudscape puts density on the axis of **spacing** values, F36 puts
it on **font size** — F36 is the only typographic density variant in the sample.

Sizes: 12 · 14 · 16 · 20 · 24 · 36 · 48 (plus the `-high` twins).
There are two line-height ratio tokens, `default` 1.5 and `condensed` 1.25.

Three weights — 400 / 500 / **600 (`demi-bold`)**. There is no 700 (bold) — a gap running
the opposite way from Radix Themes (which has no 600).

The font stack is **Geist Sans / Geist Mono** — a non-Vercel system using Vercel's
typeface.

### z-index — powers of ten

```json
"z-index-negative": -1,   "z-index-default": 1,
"z-index-workbench-header": 10,  "z-index-modal": 100,
"z-index-dropdown": 1000, "z-index-tooltip": 10000,
"z-index-notification": 100000
```

**−1 · 0 · 1 · 10 · 100 · 1000 · 10⁴ · 10⁵ — a logarithmic scale.**
The fourth z-index scheme in the sample:

| Approach | System |
|----------|--------|
| Purpose names, steps of 100 (13 steps) | Chakra UI |
| The 1000s, with background/content adjacency (+5) | Bootstrap |
| Ordinals 1–5 | Open Props |
| **10ⁿ logarithmic** | **F36** |

**`modal` (100) sits below `dropdown` (1000)** — the reverse of Chakra (dropdown 1000 <
modal 1400). **`notification` (10⁵) above `tooltip` (10⁴)** likewise reverses Chakra
(toast 1700 < tooltip 1800). **Demonstrating that the layering order itself differs per
system.**

There are +1 adjacency pairs too, like `modal-content: 101` (the same idea as Bootstrap's
+5).

### Spacing — nine steps

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80
```

It holds the entire core `4/8/16/24/32`. There is no 20, and the top runs 48/64/80. A
conventional composition.

### Content widths

```json
"content-width-default": "1280px",  "content-width-text": "768px"
```

**It tokenises the reading width (768px) in px** — unlike Open Props (`45ch`) and USWDS
(`64ex`), which use character-relative units, this is **an absolute value**. The third
line-width sample, and the third unit.

## Components

`@contentful/f36-components` (a meta package) re-exports ~~an unverified list~~ →
**40 `@contentful/f36-*` subpackages** (accordion · autocomplete · button · card ·
datepicker · forms · menu · modal · notification · pill · progress-stepper · table ·
tooltip and others, as of 6.19.0). → buttons, inputs and modals are in the deep-dive below.

## Component deep-dive — (2026-08-18)

The dist JS (emotion object styles) of `@contentful/f36-button@6.19.0` ·
`f36-forms@6.19.0` · `f36-modal@6.19.0` was parsed, with token references resolved through
`@contentful/f36-tokens@6.2.1`. That also settled two radii (`small` 4px · `medium` 6px),
three durations (0.1/0.2/0.3s) and two easings (`ease-in-out` ·
`cubic-bezier(0.13, 0.62, 0.11, 0.99)`).

### Buttons — density reaches down into the dimensions

| | tiny | small | medium (default) | large |
|---|:--:|:--:|:--:|:--:|
| **min-height** | 24px | 32px | **40px** | 48px |
| At high density | 24px | **24px** | **32px** | — |
| Padding | 4×12 | 4×12 (high 4×8) | 8×16 (high 8×12) | 8×16 |
| Type | 12px | 14px | 14px | **20px / 32px** |

- **Four heights, 24/32/40/48 — stepping by 8px.** tiny and small **reuse spacing tokens as
  heights** (`spacingL` = 24 · `spacingXl` = 32), while 40 and 48 are absent from the
  spacing scale and pinned as **literal `"40px"` and `"48px"`**.
- **`density="high"` folds each size down a step** — small → 24, medium → 32. The padding,
  the type (through the `-high` twins) and the radius (6 → 4px) shrink with it. The token
  layer's typographic density variant (`-high`) **realised as component dimensions**, with
  density arriving not through a prop but through a **`useDensity()` React context** (the
  same tree-wide switch as Ring UI's `ControlsHeightContext`).
- **It imposes a maximum width instead of a minimum** — **max-width 240px** (except
  full-width).
- Radius 6px (`borderRadiusMedium`), weight 500, a 1px border plus a
  `0 1px 0 rgba(25,37,50,.08)` shadow.
- Only large jumps to 20px/32px type — the other three steps sit at 12–14px with a 1.25
  line-height ratio.
- Transition: background over **0.1s ease-in-out** (`transitionDurationShort`).

### Inputs (TextInput) — a fixed height written as a min=max pair

| | small | medium (default) |
|---|:--:|:--:|
| **min-height = max-height** | 32px (high 24) | **40px** (high 32) |
| Padding | 8px | **10px** × 12px (high 8px) |
| Type | 14px / 20px (high 12/16) | same |
| Radius | 6px (high 4px) | same |

- **It declares the same value for min-height and max-height** — a fixed height expressed
  as a min/max pair.
- **The vertical padding is a literal 10px** — a hand value outside the 4px grid (the
  spacing tokens).
- The label is a separate block (FormLabel) — 14px, **500**, 8px below. The required marker
  follows as a 400-weight grey "(required)". At high density the label shrinks to 12px too.
- Border 1px `gray300`; focus is a `blue600` border plus the `glowPrimary` shadow token.

### Modals — three steps plus arbitrary widths allowed

| size | Width |
|------|-------|
| small | 400px |
| medium (default) | **520px** |
| large | 700px |
| fullWidth / zen / fullscreen | 100vw |

- **The width prop accepts an arbitrary value directly** (`width: map[size] || size`) —
  the steps are defaults offered rather than enforced.
- Entry: **scale(0.85)→1 plus an overlay fade over 0.2s ease-in-out**
  (`transitionDurationDefault` · `transitionEasingDefault`) — through react-modal's
  afterOpen/beforeClose class transitions.
- Radius 6px, overlay `rgba(12,20,28,0.75)` plus a 48px viewport margin (`spacing2Xl`).
- Padding: header `16 16 16 24` plus a 1px bottom border · body 16×24 · footer 12×16.
- The maximum dimension is `calc(100vw − 1rem×(100/16))` — **a rem conversion correction**
  dividing by `fontBaseDefault` (16), written into the code.
- z-index 100 (modal) and 101 (modal-content) — the token layer's logarithmic scale as-is.

### Notable decisions (deep-dive)

- **The density axis running through every layer** — tokens (the `-high` twins) → type →
  padding → min-height → radius, delivered by React context (`useDensity`)
- **A 240px max-width on buttons** — a constraint running the opposite way from the
  min-width camp (MUI's 64px and others)
- **Spacing tokens reused as heights**, with the off-scale values (40/48) as literals
- **Arbitrary modal widths allowed** — the three steps are only defaults
- An input's fixed height written as a min=max pair

## Notable decisions

- **A typographic density variant** (the `-high` twins) — unique in the sample. The third
  place the density axis is applied (Cloudscape's spacing · Radix's global `--scaling` ·
  **F36's font size**)
- **A logarithmic z-index scale**, with the layering order reversed against Chakra in
  several places
- **There is no 700 among the weights** (400/500/600)
- **The reading-width token is in px** (768px) — a third unit, distinct from `ch` and `ex`
- The Geist font stack — adopting another company's (Vercel's) typeface

## Accessibility

~~Unverified.~~ → **WCAG 2.1 Level AA (resolved 2026-08-18).**
Source: `f36.contentful.com/guidelines/accessibility` — "Contentful aims to meet WCAG 2.1
Level AA standards". It states that automated testing runs alongside.

## Notes

- Tokens: `npm pack @contentful/f36-tokens@6.2.1` → `dist/json/`
  (border-radius · box-shadows · colors · spacing · transitions · typography · z-index)
- Component deep-dive: `@contentful/f36-{button,forms,modal}@6.19.0` → `dist/index.js`
  (emotion object styles), resolved against f36-tokens (2026-08-18)
- Licence: both the package's `license` field and LICENSE.md say **MIT** — reflected in the
  frontmatter (2026-08-18)
- **Still to confirm:** the colour structure, ~~radii, transition values and the component
  list~~ (resolved 2026-08-18 — see the deep-dive and components sections)
- **Licence resolved (2026-08-18):** `MIT` — source: github contentful/forma-36 →
  `LICENSE.md` (matching the npm `@contentful/f36-tokens@6.2.1` metadata)
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — `f36.contentful.com` — from the
  Figma Community page you copy **three libraries** (Components · Tokens · Assets) and
  register them as team libraries
