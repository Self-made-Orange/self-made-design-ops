---
name: HSDS (Help Scout Design System)
org: Help Scout
coverage: partial
url: https://hsds.helpscout.design
repo: https://github.com/helpscout/hsds-react
license: MIT
tech: [React]
figma_kit: unverified
tokens_format: [JSON]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @hsds/tokens@2.8.0 → src/json/{default,newBrand}/*.json (52 files per component × 2 themes)"
---
<!-- lang-links -->
> **English** · [한국어](hsds.ko.md)
<!-- /lang-links -->

## In one line

Help Scout's system — the tokens are split into **52 JSON files, one per component**, and
**the same 52-file structure ships twice, once for the `default` theme and once for
`newBrand`**. The primary unit of a token is not a global scale but **a component**.

## Tokens — the component is the top-level unit

```
src/json/default/    accordion · attachment · avatar · badge · button ·
                     card · datePicker · dropList · modal · stepper … (52)
src/json/newBrand/   the same 52 files (the rebrand edition)
```

```json
// default/button.json
{ "color": { "blue": { "main": "#1292EE", "hover": "#0077CC",
    "shortcut": { "background": "#005CA4", "backgroundHover": "#034077" },
    "outline": { "background": "#ffffff", "border": "#1292EE",
      "textSeamlessHover": "#034077", "shortcut": {…} } } } }
```

- **There is no global spacing or type scale file** — apart from `color.json` and
  `cssVarsTokens.json`, every name is a component name. This is the third system whose
  **cut through the material is unusual** (alongside Semi, with 0 dimension tokens, and
  Spindle, with no colour), and this one **cuts by component rather than by axis**
- Values nest **three to four levels deep inside a component, by colour × variant ×
  state** (`button.color.blue.outline.shortcut.backgroundHover`). Comparable in depth to
  LeafyGreen (property × role × state), except **here it exists separately per component**
- **Product-specific states like `shortcut` and `textSeamlessHover`** appear in the colour
  names — Help Scout UI concepts: keyboard shortcut badges, seamless buttons and so on
- Alpha is written as 8-digit hex (`#ffffffff`) — the same notation as Apple's kit

### The rebrand coexists as a directory

`default` and `newBrand` are **the same 52-file structure** — the **fourth case of
migration coexistence** after Mística (a `-new` skin), Vibes (a second-generation palette)
and Spindle (typeface version-1/2), and the largest of them (two copies of every component).

## Components in depth — (2026-08-18)

The components, like the tokens, are **split into individual packages** — the old
`@helpscout/hsds-react` (v3, a single package) migrated to a **split distribution under the
`@hsds/*` scope at v9** (`@hsds/hsds@9.6.0` is the meta-package). Measured from the
styled-components sources of `button@9.4.2`, `input@9.3.2` and `modal@9.2.3`.
Inside the style strings, `getToken('button.color.blue.main')` is **called at runtime** —
this is how the per-component token JSON from the section above is consumed.

### Buttons — seven sizes, no transition

| | xxs | xs | sm | md | lg (default) | xl | xxl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **height** | 20 | 24 | 30 | **35** | **40** | 44 | 50 |
| type | 11 | 13 | 13 | 14 | 14 | 14 | 14 |
| min-width | — | — | 90 | 90 | 110 | 120 | 200 |

- **Seven sizes is the most in the sample** (Asphalt and Pluralsight have four, Backpack
  two). The heights are not multiples of 8 but **20/24/30/35/40/44/50 — with 5px gaps mixed
  in** — and md lands on an odd 35px.
- **`--hsds-button-transition: none`** — the hover colour change is deliberately
  unanimated. The modal moves over 250ms (below), so **motion is decided per component**.
- min-width steps up with size (90→200px) — unlike Fluent's single 96px, it tracks the size.
- Six colours (blue by default, green, red, grey, yellow, brand) × three styles
  (filled/outlined/link) — the three-to-four-level nesting of the token JSON becomes the
  class grid directly. Radius 3px (4px from lg up), weight 500, and `is-rounded` gives a
  100px pill.
- **The identity of the `shortcut` token, confirmed** — it is the **keyboard shortcut
  badge** that sits inside a button (24px square, radius 3px, system font stack). What the
  token section guessed was a "product-specific state" is borne out at the component layer.
- Focus is **a ring drawn with a ::before pseudo-element** — two-colour inner/outer tokens
  (`color.focusRing.*`), with the default −2px offset overridden on buttons to **−3px
  (inside)**. The error/warning/success ring colour variants are shared with inputs.

### Inputs — a separate "Backdrop" layer draws the border

| | xs | sm | — | md (default) | lg |
|---|:--:|:--:|:--:|:--:|:--:|
| **height** | 24 | 28 | 32 | **42** | 48 |

- **The input field does not own its border** — an absolutely positioned `BackdropUI` div
  takes sole charge of the border, background and focus shadow, while the actual `<input>`
  is transparent. The inner height is `calc(height − 2px×2 − 1px×2)` — the formula
  subtracting **a 2px border plus a 1px offset** is left in a comment.
- The default height is **42px** — **2px off** the button's default (40px). A rare case of a
  system whose buttons and inputs do not share a base height (Backpack and Asphalt do).
- Inline padding 16px, radius 3px, transition `box-shadow · background · border 100ms ease`
  — unlike the button (none), the input does use 100ms.
- textarea gets five min-height steps from 22 to 46px plus `will-change: height` for
  auto-resizing.

### Modals — a vocabulary of named easings, entering on 'boop'

- v2 is a fixed **680px** wide with min-height 400px; the alert variant is **440px** with
  min-height 180px. The wrapper caps at 75% width and 98% height.
- v2 body padding is **`40px 90px 50px`** — the 90px inline padding is the largest modal
  inner whitespace in the sample (a dialog typeset like a document).
- Enter: **fade + scale (0.8→1), 250ms, easing `boop`** =
  `cubic-bezier(0.175, 0.885, 0.325, 1.2)`, which overshoots. The overlay fades over 250ms
  ease-in-out.
- **The easings form a named vocabulary** — `@hsds/utils-animation` carries the whole
  Penner set (easeInQuad through easeInOutBack) plus three of its own:

  | name | value |
  |------|-----|
  | `bounce` | (0.680, −0.650, 0.265, 1.650) |
  | **`boop`** | **(0.175, 0.885, 0.325, 1.2)** |
  | `elastic` | (0.680, −1.500, 0.265, 2.500) |

  A component picks its curve with the string `easing="boop"` — the only case in the sample
  of **shipping motion under onomatopoeic names** rather than numbers.

### Characteristic decisions (from the deep pass)

- **Seven button sizes (20–50px, including an odd 35)** — the most steps in the sample
- **Button transition none vs input 100ms vs modal 250ms** — motion graded per component
- **The Backdrop-separated input** — a dedicated layer owns the border and focus
- Button 40 / input 42 — no shared base height
- **The `boop` · `bounce` · `elastic` onomatopoeic easing vocabulary** plus the full Penner
  set built in
- 90px inline padding in the modal body — document-style typesetting
- The old single package → the split `@hsds/*` v9 — the same cut as the tokens (by component)

## Characteristic decisions

- **52 per-component JSON files as the primary unit of a token** — no global scale
- **`default`/`newBrand` fully duplicated across 52 files** — the largest migration
  coexistence in the sample
- Product-specific states (`shortcut`, `seamless`) in the colour names
- 8-digit hex alpha notation
- The npm licence reads `None` — publicly distributed but without a licence grant

## Accessibility

Unverified.

## References

- Tokens: `npm pack @hsds/tokens@2.8.0` → `src/json/`
- Components: ~~`@helpscout/hsds-react@3.58.0`~~ → the current form is the
  **split `@hsds/*` v9 distribution** — `@hsds/button@9.4.2` · `@hsds/input@9.3.2` ·
  `@hsds/modal@9.2.3` · `@hsds/animate@9.0.2` · `@hsds/utils-animation@9.0.2` ·
  `@hsds/utils-mixins@9.3.0` (used in the 2026-08-18 deep pass); colour utilities live in
  `@helpscout/colorway`
- **Open questions:** the global values in `color.json` and `cssVarsTokens.json`, a full
  diff of default vs newBrand, the licence
- **Licence resolved (2026-08-18):** `MIT` — source: github helpscout/hsds-react →
  `LICENSE`. The package.json of npm `@hsds/tokens@2.8.0` has no `license` field
