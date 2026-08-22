---
name: Thumbprint
org: Thumbtack
coverage: partial
url: https://thumbprint.design
repo: https://github.com/thumbtack/thumbprint
license: Apache-2.0
tech: [React, Sass]
figma_kit: unverified
tokens_format: [SCSS, JS, Android]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @thumbtack/thumbprint-tokens@13.0.1 → dist/scss/_index.scss · npm @thumbtack/thumbprint-scss@4.0.3 · @thumbtack/thumbprint-react@14.18.2 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](thumbprint.ko.md)
<!-- /lang-links -->

## In one line

Thumbtack's (home-services marketplace) system. The top of the spacing scale is
**pure doubling above 32** (64 → 128 → **256**), and round shapes are split across
**two tokens, `full` (50%) and `sides` (9999px)**.

## Tokens

### Spacing — eight steps, doubling above 32

```
$tp-space__1: 4    __2: 8    __3: 16    __4: 24
$tp-space__5: 32   __6: 64   __7: 128   __8: 256
```

- Holds **the entire core `4/8/16/24/32`** — 12 and 48 are absent
- **After 32 it doubles purely: 64, 128, 256.** What Mantine does with radii (doubling
  2 to 32), Thumbprint does at the top of its spacing scale
- **256px is the largest value in an enumerated spacing scale** (Base Web's 192 and
  Pajamas's 704 are irregular index extensions; Open Props's 480 is a different animal)
  — for the sample comparison see `tokens/scales.md`
- The keys are **ordinals** `__1` to `__8` (BEM-style underscore notation)

### Radii — round shapes take two tokens

```
base: 4px   big: 6px   full: 50%   sides: 9999px
```

**It distinguishes `full` (50% — a circle when the element is square) from `sides`
(9999px — a pill).** The same judgement as Paste splitting `circle` from `pill`
(`tokens/scales.md`), with names pointing at the geometric result ("the sides are
round").

There are only two stepped radii, 4 and 6 — the minimalism of the Ant (a single 6) and
Blueprint (a single 4) family.

## Components

Not in the token package. `dist/` ships SCSS · JS (cjs/es) · TypeScript · **Android** —
these are cross-platform tokens (the Paste and Material 3 family).
→ Components are in separate packages. See the deep-dive below (2026-08-18).

## Component deep-dive — (2026-08-18)

The component CSS is `@thumbtack/thumbprint-scss@4.0.3` (classic CSS, last published
2022-05) and the React wrappers are `@thumbtack/thumbprint-react@14.18.2` (last
published 2024-04, 35 components). **The React button uses the scss `.tp-button` class
directly** — the values originate on the scss side.

### Buttons (`button.css`)

| | Default | small |
|---|:--:|:--:|
| **min-height** | **52px** | 40px |
| Padding | 12px 22px | 8px vertical (22px horizontal kept) |
| Border | **2px** (always present, transparent included) | same |
| Radius | 4px | 4px |
| Type | 16px / 24px / **700** | 14px / 20px |

- **No minimum width** (`min-width` appears zero times). Height comes from
  `min-height` plus `box-sizing:border-box` (24 line height + 24 padding + 4 border =
  52).
- **Button type at 16px and 700** — the same "body size in bold" camp as Backpack.
  52px is at the upper end of the sample's heights.
- Seven variants: primary (`#009fd9`) · secondary · tertiary · caution · solid · line ·
  clear. **Focus is `text-decoration: underline` plus a background change rather than a
  ring** (`outline:none`).
- small does not reduce the horizontal padding — only the vertical, 12 → 8px.

### Inputs (`input.css` · React `TextInput`)

| | large (default) | small |
|---|:--:|:--:|
| Padding | 13px 15px (13px 16px in React) | 9px 15px |
| Border | 1px `#d3d4d5` | same |
| Radius | 4px | 4px |
| Type | 16px / 24px | 14px / 20px |
| **Derived height** | **52px** | **40px** |

- **The derived height matches the button's min-height exactly** (52/40) — a case of
  aligning the two through a line-height-plus-padding formula rather than declaring a
  height (compensated by a 2px border on the button against 1px plus 1px of React
  wrapper padding on the input).
- The label is a separate block (`.tp-label`) — **weight 700, margin-bottom 4px**, size
  inherited.
- The React `TextInput` draws the border on an absolutely positioned `.inputStyles`
  layer rather than on the input — a structure that keeps the border a single stroke
  even with icons and buttons inserted.

### Modals (React `Modal/index.module.scss`)

| | narrow | medium (default) | wide |
|---|:--:|:--:|:--:|
| max-width | 416px | 632px | **1400px** |

- Height variants exist separately — `heightMedium` 600px / `heightTall` 900px.
  **Three widths crossed with two heights** is a structure rare in the sample.
- Entry 300ms (`$tp-duration__5`) / exit 250ms (`$tp-duration__4`), easing
  `$tp-ease__in-out` = `cubic-bezier(0.45, 0, 0.40, 1)`.
- **On desktop (≥481px) the modal itself is `transition:none`** — only the curtain
  (`rgba(0,0,0,.8)`) fades and the body appears at once. Only on mobile (<481px) is it
  full-screen with a `translate(0,100%)→0` slide-up. The breakpoint is
  `$tp-breakpoint__small: 481px`.
- Content padding 20px (mobile) / 32px horizontal (`$tp-space__5`) and 40px bottom
  (desktop). The header (the close-button row) has min-height 56px / 64px
  (`$tp-space__6`). No radius declared (0).

### Motion tokens (thumbprint-tokens@13.0.1)

Six durations, `75/150/200/250/300/350ms`, plus three easings —
`in (0.50,0,1,1)` · `out (0,0,0.40,1)` · `in-out (0.45,0,0.40,1)`.
**These are its own curves, not Material's** (Material's is (0.4,0,0.2,1)).

### Notable decisions (deep-dive)

- **Button and input derived heights aligned at 52/40px** — one by min-height, the
  other by formula
- **Button type at 16px and 700** — the same camp as Backpack
- **Focus as an underline** (no ring) — rare in the sample
- **No transition on desktop modals** (only the curtain fades) plus a mobile slide-up
- **Three modal widths and two heights separated orthogonally**

## Notable decisions

- **Pure doubling at the top of the spacing scale → 256px** — the largest enumerated
- **Round shapes split in two** (`full` 50% / `sides` 9999px)
- **No 12 or 48** — eight steps holding exactly the 4/8/16/24/32 core
- **An Android build shipped alongside** — a consumer app on two platforms
- Underscored ordinal keys (`__1`) — a notation unique in the sample

## Accessibility

Unverified.

## Notes

- Documentation: https://thumbprint.design (blocked by the proxy)
- Tokens: `npm pack @thumbtack/thumbprint-tokens@13.0.1` → `dist/scss/_index.scss`
- Component deep-dive: `@thumbtack/thumbprint-scss@4.0.3` (button/input/label.css) ·
  `@thumbtack/thumbprint-react@14.18.2`
  (`dist/es/components/{Modal,TextInput}/index.module.scss`) (2026-08-18)
- Licence: both component packages state **Apache-2.0** in package.json — reflected in
  the frontmatter (2026-08-18)
- **Still to confirm:** the full type scale · the colour palette (only some real button
  colours confirmed), ~~the component list~~ (35 React components confirmed —
  2026-08-18), ~~the licence~~ (Apache-2.0 — 2026-08-18)
- **Licence resolved (2026-08-18):** `Apache-2.0` — source: github thumbtack/thumbprint
  → `LICENSE` (matching the npm `@thumbtack/thumbprint-tokens@13.0.1` metadata)
