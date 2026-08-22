---
name: Palette
org: Artsy
coverage: partial
url: https://palette.artsy.net
repo: https://github.com/artsy/palette
license: MIT
tech: [React, styled-system]
figma_kit: false
tokens_format: [JS]
a11y_target: false (no conformance level declared — "best-practices in mind, may still have some issues", confirmed by render 2026-08-18)
platform: web
domain: commerce
verified: 2026-08-18
source: "npm @artsy/palette-tokens@7.3.0 → dist/themes/v3.js, dist/typography/v3.js"
---
<!-- lang-links -->
> **English** · [한국어](artsy-palette.ko.md)
<!-- /lang-links -->

## In one line

Artsy's (art marketplace) system — spacing is **five steps in units of 10px**
(`1` = 10px) with `half` (5px) as the only exception. Typography tops out at **102px**,
and there is a `bq` (blockquote) variant. **Breakpoints go up to 1920px.**

## Tokens

### Spacing — units of 10px, five steps

```js
space = { 0.5: '5px', half: '5px', 1: '10px', 2: '20px',
          4: '40px', 6: '60px', 12: '120px' }
```

- **Number 1 is 10px** — the **fourth in the 10px family** after GOV.UK (5px),
  Blueprint (10px grid) and KRDS (10px root, and Artsy is the only one to build the
  spacing scale purely from multiples of 10px
- **There is no 4px, 8px or 16px at all** — the second complete departure from the
  core, after Kaizen (a 6px grid). The two systems' grids differ from each other, at
  6px and 10px
- **`0.5` and `half` are two names for one value** — the only duplication of its kind
  in the sample, offering a numeric key and a word key at once
- **Five steps (plus half)**, the smallest family in the sample (Protocol 6 ·
  Bootstrap 6 · Nord 6)

### Typography — 11–102px, names abbreviating size

```
xxxl 102/108 · bq 50/60 · xxl 60/70 · xl 40/48 · lg 26/40 · md 20/32
sm 16/26 · xs 13/20 · xxs 11/14 (+ lg-display · sm-display)
```

- **A maximum of 102px** — the largest type size in the sample (beyond Kaizen's 84px
  and the Digital Agency's 64px). Display typography for artwork pages
- **A `bq` (blockquote) variant** — the only case in the sample of an HTML element
  appearing directly in a role name (a 50px pull quote)
- `-display` suffixed pairs — display variants at the same size (lg / lg-display)
- Line heights are fixed px per size and run wide, like 26/40 (lg) at **a ratio of
  1.54**
- One custom typeface, `ll-unica77`; only the fallbacks are system fonts

### Breakpoints — a 1920px top

```
xs ≤767 · sm 768 · md 1280 · lg 1920
```

**The top is 1920px** — higher than LeafyGreen (1440) and most others (1200–1440). A
domain characteristic of showing artwork images large on big screens, and it ships a
unitless copy alongside as `unitlessBreakpoints`.

The dark theme is a separate file, `themes/v3Dark.js`.

## Notable decisions

- **Spacing in five steps of 10px** — 4, 8 and 16 entirely absent; the fourth in the
  10px family
- `0.5` and `half` as two names for one value — the only duplication in the sample
- **Typography up to 102px** — the largest in the sample
- **A `bq` variant named after an HTML element** — unique in the sample
- A 1920px top breakpoint — the highest in the sample
- Ships breakpoints in both unit-bearing and unitless form

## Accessibility

~~Unverified.~~ → **It declares no conformance level (resolved 2026-08-18 — confirmed
as none).**

The Storybook `Guides › Accessibility` document was read by headless render
(<https://palette.artsy.net/?path=/story/guides--accessibility>). A WCAG level or
version **never appears once**; instead this single sentence is the whole of it:

> Palette's components are generally built with accessibility best practices in mind,
> but may still have some issues — if you find one, file a bug with the Design System
> Working Group, or as an external user open a GitHub issue

Instead of a target it keeps **two pieces of practical guidance**:

- **Click handlers** — when putting `onClick` on UI that is neither a `Button` nor an
  anchor with a valid `href`, use `Clickable` (a stripped `button` tag built on `Box`).
  `<Box onClick={…}>` is named explicitly as the forbidden example
- **Alternative text** — the WebAIM guidance is quoted directly. No "image of …" or
  "graphic of …", no duplication of the surrounding text. There is a self-diagnosis
  that **duplicated alt on large anchor-area images with text beneath them** is common
  in the Artsy codebase, and it says `alt=""` is acceptable in those cases

So **there is no declared target and no regression guard in the documentation.** All
that can be confirmed is that an a11y addon (`sb-addons/a11y-3`) is installed in
Storybook.

## Notes

- **Basis for figma_kit (false):** no official kit — zero mentions of Figma across the
  documentation and README, confirmed by render 2026-08-18

- Tokens: `npm pack @artsy/palette-tokens@7.3.0` → `dist/themes/v3.js`
- Components: `@artsy/palette@46.9.3`, charts in `palette-charts`
- **Still to confirm:** the colour palette, the relationship to versions before v3, the
  component list, ~~the accessibility target~~ (resolved 2026-08-18 — confirmed absent),
  ~~the Figma kit~~ (resolved 2026-08-18 — confirmed absent)
- **Absence of a Figma kit confirmed (2026-08-18):** all four Storybook guides
  (`guides--getting-started` · `guides--how-palette-works` ·
  `guides--developing-for-palette` · `guides--accessibility`) were rendered headlessly
  and `README.md` at `github.com/artsy/palette` was checked as well, with **not one
  mention of Figma, Sketch or a design kit.** Even rendered, this system publishes no
  design-tool kit (2026-08-18, confirmed by rendering <https://palette.artsy.net/>)
