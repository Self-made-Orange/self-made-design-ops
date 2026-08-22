---
name: Vibe
org: monday.com
coverage: partial
url: https://vibe.monday.com
repo: https://github.com/mondaycom/vibe
license: MIT
tech: [React, SCSS]
figma_kit: false
tokens_format: [CSS]
a11y_target: "Confirmed to state none (2026-08-18 — only a general reference to WCAG, with no version or level target. The contrast requirements are 4.5:1 for text and 3:1 for non-text)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm monday-ui-style@0.26.2 → dist/index.css (919 variables) + @vibe/core@4.5.9"
---
<!-- lang-links -->
> **English** · [한국어](vibe.ko.md)
<!-- /lang-links -->

## In one line

monday.com's system — the size scale contains **the same value twice** (10 and 20 are both
14px), the default font stack **includes Hebrew, Arabic and Japanese faces**, and the
official themes include **a `hacker` easter-egg theme.**

## Tokens — 919 variables (`monday-ui-style` is the token layer)

The token CSS (`monday-ui-style`) and the components (`@vibe/core`) ship separately —
the same cut as TDS (colors and typography split out).

### Type — duplicate values in the scale

```
--font-size-10: 14px   --font-size-40: 18px
--font-size-20: 14px   --font-size-50: 24px
--font-size-30: 16px   --font-size-60: 30px
h1=60(30px) · h2=50(24px) · h3=50(24px) · h4=40(18px)
```

- **`10` and `20` are both 14px, and `h2` and `h3` are both 24px** — the only sample where
  the step number does not guarantee the value. The trace of roles being consolidated,
  left in the scale (the name/value-inversion family in `GLOSSARY.md`)
- Tracking is **enumerated for every role × weight combination**
  (`h1-bold/normal/light` are all −0.5px) — every combination kept even where the values
  are identical

### Typefaces — a multi-script default stack

```
Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif
```

**The only sample naming Hebrew, Arabic and Japanese faces in the default stack** —
an Israeli company's RTL script region reflected in the typeface tokens.
It contrasts handling CJK through the font stack (Vibe) with handling it through the weight
and size systems (the four CJK samples).

### Spacing and radius

```
spacing: 4 8 16 24 32 48 64 (no 12)
radius: small 4 · medium 8 · big 16
disabled opacity: 0.38
```

Seven core-focused steps with 12px missing. The `0.38` disabled value is the same
coefficient as M3's (the source mentions no relationship).

### Themes — light · black · **hacker**

```scss
.hacker_theme-app-theme {
  --primary-color: #fe78c6;            /* pink */
  --primary-background-color: #282a36; /* dark */
}
```

**A joke theme ships in the official distribution** — dark is named `black`, and `hacker`
is a pink-on-dark easter egg. With Grommet's `hacktoberfest2022` theme, one of two samples
using the theme slot as a playground.

## Components in depth — (2026-08-18)

Measured from `@vibe/core@4.5.8`. This package **ships no CSS files** — the component CSS is
**bundled as strings inside `*.module.scss.js` and injected into `<head>` at runtime**
(stated in the README; SSR uses a `globalThis.injectedStyles` hook). The values below were
read by extracting each module's bundled CSS string, with token references resolved through
the same package's `dist/style` (a bundled `@vibe/style` 4.x build).
There are **about 70** component directories (`dist/components/`).

### Buttons (`Button`) — five fixed heights

| | xxs | xs | small | medium (default) | large |
|---|:--:|:--:|:--:|:--:|:--:|
| **height** | **16px** | 24px | 32px | **40px** | 48px |
| padding | 2px 4px | 4px 8px | 4px 8px | 8px 16px | 12px 24px |
| type | 14px (text2) | 14px | 14px | **16px** (text1) | 16px |
| line height | 16px (redefined) | 21px (redefined) | 24px (redefined) | 22px | 22px |

- Radius **4px** at every size (`--border-radius-small`), and **no minimum width**
  (`min-width: auto` — though min-width does get a 100ms transition for the loading state).
- **A `scale(0.95)` press transform on `:active`** plus a
  `--motion-productive-short` (70ms) transform transition — the decision to put the scale on
  **the button** rather than the modal (Atlassian's and shadcn's 0.95).
- The default weight is **400** (`--font-text*-normal`) — the same non-bold camp as Stacks.
- The focus ring is a **hardcoded** 3px `hsla(209, 100%, 50%, 0.5)` — among 919 variables,
  the focus colour alone sits outside the tokens.
- Icon size is branched in JS rather than CSS: 16 for xxs/xs, 20 otherwise.

### Inputs (`TextField`) — the same 32/40/48 axis as the button

| | small | medium (default) | large |
|---|:--:|:--:|:--:|
| **height** (fixed on the wrapper) | 32px | 40px | 48px |
| padding | block 8px · start 8px | block 8px · **start 12px / end 4px** | as medium |
| type | 14px (text2) | 16px (text1) | 16px |

- **The inline padding is asymmetric, 12/4px** — the 4px at the end is the icon container's
  place (24×24). Border 1px, radius 4px (plus `round` 50px and `square` 0 variants).
- **On hover the border becomes the text colour** (`--primary-text-color`) — grey to black.
  Focus takes `--primary-color`. The transition is the literal `border-color 100ms ease-in`.
- The label (`FieldLabel`) is a separate block — 14px/20 · **weight 400** · 4px below.
  A non-bold label too, parting from Stacks (700 labels).

### Modals (`Modal`, the v4 form) — px widths that grow with the viewport

| size | base | ≥1280px | ≥1440px | max-height |
|:---:|:---:|:---:|:---:|:---:|
| small | 460px | 480px | 520px | 50% |
| medium | 540px | 580px | 620px | 80% |
| large | 800px | 840px | 900px | 80% |

(plus `fullView` = inset 0, leaving 40px at the top)

- **The px width itself grows in three steps through media queries** — a third way, between
  the fixed-px camp (Mantine, shadcn, Cloudscape) and the viewport-percentage camp (Carbon)
  (compare the width section of `patterns/modal.md`).
- Radius **16px** (`--border-radius-big`) — the top of the radius scale assigned to the modal.
  Padding: 32px inline · 32px above the header · 32px below the content · `20px 24px` on the
  footer.
- The scrim is **`rgba(41, 47, 76, 0.7)` — a navy tint rather than black**
  (the black theme uses `rgba(33,33,33,0.7)`).
- Animation: enter over **150ms** `cubic-bezier(0, 0, 0.4, 1)`, scale 0.8→1 plus a fade;
  exit over **100ms** `cubic-bezier(0.6, 0, 1, 1)` — enter > exit, the mainline
  (anchorPop 200/150 · fullView 250/100ms).
- **Delays are imitated with keyframes** — centerPopIn completes at `50%, 100%`
  (an effective 75ms of the 150), and the out animation waits through `0%, 50%` before
  moving. There is not a single `animation-delay`.
- **Motion timing tokens exist, and the modal uses literals** — the tokens are
  enter `(0, 0, 0.35, 1)` / exit `(0.4, 0, 1, 1)`, while the modal measures
  `(0, 0, 0.4, 1)` / `(0.6, 0, 1, 1)` — **close but not matching.** The same drift family as
  Backpack's deep pass ("hand-written curves drifting into newer components").
  For reference, `--motion-timing-transition` is `(0.4, 0, 0.2, 1)` — the Material standard
  curve.

### Characteristic decisions (from the deep pass)

- **Five button steps (16–48px) and three input steps (32–48px) sharing one axis** — a dense
  lower end reaching down to 16px at xxs
- **`scale(0.95)` on the button's `:active`** — the press as a scale
- **Modal px widths growing across three viewport steps** — neither fixed px nor percentages,
  a third camp
- **A navy-tinted scrim** (41, 47, 76)
- **Motion tokens present, with near-but-not-matching literals in the modal** — an easing
  drift sample
- No CSS distribution; a runtime-injection architecture (with a separate SSR hook)

## Characteristic decisions

- **Duplicate values in the scale** (10 = 20 = 14px, h2 = h3) — a sample where the step
  number cannot be trusted
- **A multi-script (Hebrew, Arabic, Japanese) default font stack** — unique in the sample
- A `hacker` easter-egg theme in the official distribution
- Tracking enumerated exhaustively by role × weight
- Token and component packages separated (`monday-ui-style` / `@vibe/core`)

## Accessibility

~~Unverified~~ → **Resolved (2026-08-18, confirmed by headless render).**
**But the target level is confirmed absent.**

Source: https://vibe.monday.com/iframe.html?id=foundations-accessibility--docs&viewMode=docs
(Storybook docs render inside an iframe, so `iframe.html?id=…&viewMode=docs` has to be opened
directly — the parent URL shows only the sidebar.)

- **It cites WCAG as grounds but states no version or level.** The body goes only as far as
  "Web Accessibility is based on guidelines published by The World Wide Web Consortium (W3C)
  ... called Web Content Accessibility Guidelines or WCAG", with no target notation such as
  `2.1` or `AA`. Across the whole page `WCAG` appears **twice** — in that sentence and in a
  "WCAG Quick Reference" link.
- **The contrast requirements are nailed down numerically** (the same numbers as WCAG AA's
  thresholds):
  - Text: at least **4.5:1** against the background, including placeholders and text shown on
    hover or keyboard focus.
  - The large-text exception: 18pt (about 24px) and up, or 14pt (about 18.66px) bold, at
    **3:1**
  - Non-text: **3:1** — UI components (input, radio and checkbox borders, focus indication)
    and graphical objects needed to understand the content
  - Excluded: disabled UI, decoration (icons, illustrations) and logotypes
- **It uses its own vocabulary for the four principles instead of W3C's standard terms** —
  Clear · Operable · Understandable · Robust. A sample that **replaces POUR's `Perceivable`
  with `Clear`.**
- **The checklist ships as a download** ("Get our Accessibility checklist") — a case of
  handing it over **as an artefact rather than documentation.**
- Images: informative images' alt text must carry the same information, and expressions like
  "graphic", "An image of", "A picture of" and "an icon of" are **explicitly forbidden.**
  Decorative images take `role="presentation"` or move into a CSS background.
- Focus: every interactive element must be reachable in tab order, and when a dynamic
  component closes **focus returns to where the interaction began.**
- Assistive technologies are named by product — JAWS · NVDA (Windows) · VoiceOver (macOS) ·
  ZoomText (magnification) · Dragon Naturally Speaking (speech recognition).
  It also explains the distinction between a screen reader's Virtual/Browse mode and its
  Input/Forms mode.

### Figma kit absent — confirmed by render (2026-08-18)

This is the basis for `figma_kit: false`. Nowhere in the Storybook index
(https://vibe.monday.com/index.json, 653 entries) is there a Figma-related entry, and the
accessibility document's only mention of `figma` is **a single recommendation of a "contrast
figma plugin"** for checking contrast — not a kit. The sidebar's top level is likewise
Getting Started · Catalog · MCP · Playground · Changelog · Migration Guide ·
Contributing · Foundations · Components · Layout · Text · Theming ·
Accessibility · Hooks, with no design-asset entry.

## References

- **4.5.9 re-verified — the token source unchanged (2026-08-18).** What moved was only the
  component package (`@vibe/core` 4.5.8 → 4.5.9); **`monday-ui-style`, this entry's token
  source, is still at 0.26.2** (confirmed against the registry). No re-collection needed.

- Tokens: `npm pack monday-ui-style@0.26.2` → `dist/index.css`
- Components: `@vibe/core@4.5.8` (React ≥16.9)
- Components in depth: the bundled CSS strings extracted from `@vibe/core@4.5.8`'s
  `dist/components/button/dist/Button/Button.module.scss.js` ·
  `dist/src/components/TextField/TextField.module.scss.js` ·
  `dist/src/components/Modal/**/*.module.scss.js` · `FieldLabel.module.scss.js`,
  with tokens resolved through `dist/style/dist/index.min.css.js` (2026-08-18)
- Accessibility documentation:
  https://vibe.monday.com/iframe.html?id=foundations-accessibility--docs&viewMode=docs
  (headless render, 2026-08-18)
- Storybook index: https://vibe.monday.com/index.json (653 entries, 2026-08-18)
- **Open questions:** the colour palette structure, ~~the component list~~ (resolved
  2026-08-18 — the deep pass, about 70), ~~the accessibility target~~ (rendered 2026-08-18 —
  a general WCAG reference exists but the version and level target are confirmed absent),
  ~~the Figma kit~~ (confirmed absent), and a full diff between the black and hacker themes
