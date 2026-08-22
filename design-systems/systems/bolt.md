---
name: Bolt Design System
org: Pega (Bolt DS)
coverage: partial
url: https://boltdesignsystem.com
repo: https://github.com/bolt-design-system/bolt
license: MIT
tech: [Web Components, Twig, SCSS]
figma_kit: unverified
tokens_format: [SCSS, CSS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @bolt/core-v3.x@5.8.0 → styles/01-settings/settings-spacing/_settings-spacing.scss · npm components-button@5.8.0 · components-form@5.8.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](bolt.ko.md)
<!-- /lang-links -->

## In one line

Bolt's system — **the horizontal and vertical spacing bases differ, and neither is an
integer** (`x: 1.55` / `y: 1.35`). Multiplying these near-irrational per-axis bases produces
**values unrelated to any 4px grid** (24.8px · 21.6px). A structure unique in the sample.

## Tokens — a base per axis × a multiplier, all in `calc()`

```scss
$bolt-spacing-system: ('x': 1.55, 'y': 1.35);   // unitless (deliberately)
$bolt-spacing-multiplier-system: (
  xxsmall .125 · xsmall .25 · small .5 · medium 1 ·
  large 2 · xlarge 4 · xxlarge 8 · xxxlarge 16
);
$bolt-spacing-x-system: (
  'medium': calc(var(--bolt-spacing-x) * var(--bolt-spacing-multiplier-medium) * 1rem)
);
```

Converted to px (at a 16px root):

| step | horizontal (x) | vertical (y) |
|------|:---:|:---:|
| xxsmall | 3.1 | 2.7 |
| small | 12.4 | 10.8 |
| **medium** | **24.8** | **21.6** |
| large | 49.6 | 43.2 |
| xlarge | 99.2 | 86.4 |

- **Not one value sits on a 4 or 8px grid.** It is a different character from the
  off-grid list (Kaizen's 6px · Artsy's 10px · GOV.UK's 5px · Grommet's divisors of 24) —
  the only case where **there is no grid at all, only ratios**
- **Horizontal is 15% wider than vertical** (1.55 vs 1.35). Unlike Lightning and Vanilla,
  which separate the axes but use the same grid values, **the base itself differs per axis**.
  The typesetting habit of giving more horizontal room is pinned into the base
- **The reason the base is unitless is in the comments** — "to enable pure math" (so it can
  be swapped to `* 1em` where `em` is wanted instead of `rem`). The **third unitless-token
  case** after Braid (grid multiples) and PIE (unitless globals), and the only one where the
  reason is written in the source
- The multipliers run from `.125` in **eight geometric doublings** — the same call as
  Priceline (whose values themselves are geometric), made here at the multiplier layer
- Every token value is a **formula string** of the form `calc(var() * var() * 1rem)` — a
  comment says they are kept as formulas "so that changing only the base and the multiplier
  updates everything"

## Components in depth — (2026-08-18)

Components ship as individual `@bolt/components-*` packages (Web Components plus SCSS).
`src/*.scss` from `components-button@5.8.0`, `components-form@5.8.0` and
`components-modal@5.8.2` was resolved against the settings in `core-v3.x@5.8.0`. Because
what ships is **the SCSS source** rather than compiled CSS, the design comments are readable
too.

### First, the token layer the deep pass resolved (backlog cleared)

- **Type**: eight steps, 0.7 / 0.8 / 0.9 / 1 / 1.15 / 1.4 / 1.75 / 2.35rem — in px,
  11.2 / 12.8 / 14.4 / 16 / 18.4 / 22.4 / 28 / 37.6. **Off-grid, like the spacing.**
  Line height is a per-size multiplier (1.25–1.55) plus a separate multiplier
  (tight 0.77 / regular 1 / loose 1.2).
- **Weights**: light 300 / regular 400 / semibold 600 / **bold 800** —
  **there is no 500 and no 700.** The only sample that skips 700 and uses 800 as bold.
- **Radius**: small **3px** / large **0.75em** / full 100em — only three steps, and large is
  **a relative em value** (the same "decide at the point of consumption" philosophy as the
  unitless base).
- **Transition**: a single token, `--bolt-transition: ease-in-out 200ms`.
- Breakpoints: nine steps from 320 to 1920px (`xxsmall`–`xxxxlarge`).

### Buttons — even the derived heights are non-integer

No height is declared; it derives from **type × line height + block padding (= the y spacing
÷ 2)**.

| | xsmall | small | medium | large | xlarge |
|---|:--:|:--:|:--:|:--:|:--:|
| type | 12.8px | 12.8px | **12.8px** | 16px | 18.4px |
| block padding | 2.7px | 5.4px | 10.8px | 10.8px | 21.6px |
| **derived height** | **≈25.3px** | **≈30.7px** | **≈41.5px** | **≈48.4px** | **≈72.8px** |

- **The padding is wired straight into the spacing system** —
  `calc(var(--bolt-spacing-y-medium) / 2)` block plus `--bolt-spacing-x-medium` inline. The
  1.55/1.35 per-axis bases flow right into the button dimensions, so **no size has an
  integer height** (the extreme form of MUI's tolerance for fractions).
- **The default (medium) button's type is xsmall (12.8px)** — smaller than the body (16px).
  The polar opposite of Backpack (body size at 700). medium and large share padding and
  differ only in type.
- **Hover lifts** — `translate3d(0, −2px, 0)` plus a cross-fade between two stacked shadows:
  a ::before (grey, `0 0.2em 0.75em` at 0.8) and an ::after (**its own primary colour**,
  `0 0.4em 1.5em` at 0.4). **The shadow offsets are in em**, so they scale with the type.
  The only case in the sample of moving a button's position on hover.
- text-transform ships as **class variants** (uppercase/lowercase/capitalize) — optional,
  unlike MUI's forced uppercase.
- Radius 3px (small), weight semibold 600, focus `outline: var(--bolt-focus-ring)` with a
  2px offset.

### Inputs (form) — the 1px border subtracted from the padding, with the reason in a comment

- Padding is `calc(var(--bolt-spacing-y-medium) / 2 − 1px)` — the comment reads
  **"match the line height to the button, and offset the input's 1px border"**. A case where
  the formula aligning a border-less button with a 1px-bordered input survives in the source
  as a sentence.
- **On mobile the type is forced to 16px** — the comment: "below 16px, iOS Safari zooms on
  focus". An accessibility/UX correction stated explicitly in code.
- Floating label: scaled down to **0.8**, reusing `--bolt-transition` (200ms).
  The input background **does not follow the theme and is always white** (stated in a
  comment).
- **Checkbox and radio transitions use `cubic-bezier(0.45, 1.8, 0.5, 0.75)`** — an
  overshooting bounce with a second control point of **1.8**. The checkmark springs out with
  `rotate(45deg) scale(0.1→1)`. A **curve reserved for micro-interactions**, separate from
  the mainline ease-in-out 200ms.

### Modals — `75ch` among the width options, and a light overlay variant

| width option | value |
|------|-----|
| regular | `clamp(200px, 10/12 of 100%, 1400px)` |
| **optimal** | **75ch** |
| full | 100% − margins |

- **`optimal` is in character units (75ch)** — the only case in the sample of defining a
  modal's width as "a readable measure". regular is 10 of a 12-column grid, clamped by the
  xxlarge breakpoint (1400px).
- Enter: **scale 0.95→1 plus a fade**, 200ms ease-in-out (exposed as the
  `$bolt-modal-animation-scale` variable). max-height 80vh, radius 3px.
- The overlay is navy-xdark **at 0.8** by default, with a separate **`--overlay-light`
  (white) variant** — a rare case of offering a light scrim as an option.
- **Below 600px it goes full-screen** and the overlay is removed. The iOS Safari corrections
  (`-webkit-fill-available`, a 150vh spill, Safari targeting via
  `@supports (-webkit-touch-callout: none)`) are still there, with comments linking to the
  bug tracker.

### Characteristic decisions (from the deep pass)

- **Every derived button height is non-integer** (≈25.3–72.8px) — the per-axis non-integer
  base reaching through to the components
- **A 12.8px default button type** — button text smaller than the body
- **A hover lift (−2px) with an em-based shadow cross-fade** — unique in the sample
- Weights **300/400/600/800** — no 500 and no 700
- A **`75ch`** modal width option plus a **light overlay** variant
- The checkbox bounce curve `(0.45, 1.8, 0.5, 0.75)` — easing separated by purpose
- **The reasons behind the alignment formulas and browser corrections ship as comments** —
  a by-product of distributing the SCSS source

## Characteristic decisions

- **A non-integer base per axis** (x 1.55 / y 1.35) — unique in the sample, and entirely
  unrelated to a 4px grid
- **A unitless base with the reason in a comment** — the unit is decided at the point of use
- Eight geometric doubling multipliers, with token values as `calc()` formulas
- The v2 package delegates to v3 by `@import` plus a deprecation `@warn` — a case of the
  migration being visible in the code (the Spindle, Mística and Vibes family)

## Accessibility

Unverified.

## References

- Tokens: `npm pack @bolt/core-v3.x@5.8.0` → `styles/01-settings/`
  (`@bolt/core@2.30.3` only delegates to v3)
- Components: `@bolt/components-button@5.8.0` · `-form@5.8.0` ·
  `-modal@5.8.2` → `src/*.scss` (used in the 2026-08-18 deep pass)
- **Open questions:** ~~the type and radius settings~~ (resolved 2026-08-18 — the deep pass),
  the actual colour palette values, a full component list, and the rationale behind the
  1.55/1.35 choice (the documentation site is blocked by the proxy)
