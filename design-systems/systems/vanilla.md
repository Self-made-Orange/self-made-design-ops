---
name: Vanilla Framework
org: Canonical (Ubuntu)
coverage: partial
url: https://vanillaframework.io
repo: https://github.com/canonical/vanilla-framework
license: LGPL-3.0
tech: [SCSS]
figma_kit: true
tokens_format: [SCSS]
a11y_target: "WCAG 2.2 AA (stated — confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-23
source: "npm vanilla-framework@4.58.0 → scss/_settings_{spacing,font}.scss"
---
<!-- lang-links -->
> **English** · [한국어](vanilla.ko.md)
<!-- /lang-links -->

## In one line

Canonical's (Ubuntu's) system — every text style carries a **baseline correction
(`nudge`) as a token**, line heights are defined **only as whole multiples of an 8px
grid**, and spacing is **split vertical/horizontal** the way Lightning's is.

## Tokens — SCSS variables plus a map per style

### Type — the baseline grid and `nudge`

```scss
$settings-text-h1: (
  nudge: 0.55rem,             // baseline correction
  line-height: 6 * $sp-unit,  // 48px — a whole multiple of the 8px grid
  font-size: 2.5,             // rem
  sp-after: $spv--x-large,    // space after the element
  sp-before: $spv--x-large,
)
```

- **`nudge`** — an optical correction that pulls the text onto the baseline grid, held as
  a token per style (display 0.35rem, h1 0.55rem …). **Unique in the sample.** The
  structure is "line height is a whole multiple of the grid; the font metrics' error is
  absorbed by nudge."
- **Every line height is `n × 8px`** (display 88px, h1 48px …) — the only system in the
  sample that forces line height onto grid multiples. The opposite extreme from fractional
  line heights (TDS).
- **The style map includes `sp-before`/`sp-after`** — the space before and after the
  element, so a text style carries its own margins (the same "ship it as a bundle" call as
  TDS's companion-element specs, here applied to whitespace)
- `$ms-ratio: 16/14` — the modular scale ratio written as a **fraction, not a decimal**
- `$increase-font-size-on-larger-screens: true` — a **viewport-conditional switch** that
  raises the base size by 1.125× on large screens (Bootstrap's `$enable-*` family, applied
  to type)

### Spacing — vertical/horizontal split plus a strip family

```scss
$sp-unit: 0.5rem (8px)
$spv--*  : vertical   (x-small 4 · small 8 · medium 12 · large 16 · x-large 24)
$sph--*  : horizontal (x-small 4 · small 8 · large 16 · x-large 24)
$spv--strip-shallow/regular/deep: 24 / 64 / 128px
```

- **The `spv` (vertical) / `sph` (horizontal) prefix split** — the same call as Lightning's
  axis separation. It is asymmetric: horizontal has no medium.
- **The `strip` family** — three steps of vertical space (24/64/128) reserved for page
  sections (strips). Layout-level whitespace lives in a different namespace from
  component whitespace.

## Components

Shipped as a CSS framework (class-based). ~~List not surveyed.~~
(Resolved 2026-08-18) **66 patterns** in `scss/_patterns_*.scss` — accordion · badge ·
buttons · card · chip · contextual-menu · forms · modal · navigation · notification ·
pagination · search-box · side-navigation · strip · table · tabs · tooltips and more.

## Components in depth — (2026-08-18)

The scss of `vanilla-framework@4.57.0` was **actually compiled** with dart-sass and
verified against the output CSS (a full `@include vanilla` build, 14,237 lines).

### Buttons (`.p-button`) — the height is written nowhere

| | default | small | dense |
|---|:--:|:--:|:--:|
| **derived height** | **36px** | ≈23px | 28px |
| block padding | `calc(0.375rem − 1.5px)` = **4.5px** | `calc(0.05rem − 1.5px)` = **−0.7px** → clamped to 0 | 0.5px |
| inline padding | 16px | 8px | 16px |
| border | **1.5px** | 1.5px | 1.5px |
| type | 16px / 24px / 400 | 14px / 20px | same |
| radius | **0** | 0 | 0 |

- **Every vertical padding is the formula `calc(nudge − border)`** — the token layer's
  baseline `nudge` governs component padding too. The 36px height appears nowhere in the
  source; it is simply the result of 24 (line height) + 4.5×2 + 1.5×2.
- **The small size's vertical padding computes negative (−0.7px)** — small text's nudge
  (0.05rem = 0.8px) is smaller than the border (1.5px). CSS clamps it to 0 in the used
  value so it works, but it is a corner where the nudge system collides with border width.
- **Buttons carry their own margins** — `margin: 0 16px 20px 0`. The same
  "whitespace travels with the thing" call as the text styles' `sp-before/after`, applied
  to a component.
- **The transition uses an ease-in (accelerating) curve** — `snap` (100ms) + `in` =
  `cubic-bezier(0.55, 0.055, 0.675, 0.19)`. In the whole compiled output the `in` curve
  appears **exactly once**, on the button's base style; the other 22 uses are all `out`.
  On `:active`, `transition-duration: 0s` makes the response instant.
- Variants: plain (default) · positive · negative · base (transparent) + brand (deprecated).
  No minimum width.

### Inputs — the border is only an underline

- Derived height **36px** (sharing the same padding formula as buttons via
  `%bordered-text-vertical-padding`) — the path by which buttons and inputs arrive at the
  same height is itself a shared placeholder.
- **Only the bottom border is visible** — `border-bottom: 1.5px solid`, with a
  **transparent 1.5px** top (to preserve the height) and 0 on the sides.
  `border-radius: 0` is explicit. A filled background plus a hover background change
  (fast, 165ms, `out`) — a square-cornered cousin of Material's filled field.
- Carries `margin-bottom: 20px`, `min-width: 8em`.
- The label is a separate block — line-height 24px, `padding-top: 6px` (its own nudge),
  10px below. The required marker is `.is-required::before { content: '* ' }`.

### Modals (`.p-modal`) — no width steps and no animation

- **No width steps**: `width: auto` + `max-width: 80rem (1280px)` = the grid's maximum
  width. Content decides the width; only the ceiling is a layout value.
- Padding 16px — the card's `%vf-card-padding` extended as-is. The header is sticky
  (padding-top 16px, 8px below); the footer gets a top border and 16px.
- **There is no entrance animation** — zero transitions and zero keyframes in the modal
  styles. It simply appears.
- Radius 0, z-index 150, scrim `$color-dark` at 85% alpha.
- The title inherits heading-4 — 24px / 32px / **weight 275** (the light axis of the Ubuntu
  variable font).

### Characteristic decisions (from the deep pass)

- **Component heights are derived from the nudge formula, not tokens** — 36px is an
  unrecorded by-product
- **1.5px borders** — shared by buttons and inputs. A fractional border, against the
  integer-px majority (in this sample it matches FT Origami o3's 1.5px input)
- **Only the button uses an ease-in curve, with 0s on :active** — hover accelerates, the
  press is instant
- **Radius 0 across the board** — apart from the badge (a 1rem pill), radius is effectively
  absent at the component layer
- Duration tokens are named snap/fast/brisk/slow/sleepy — character adjectives rather than
  numbers

## Characteristic decisions

- **The `nudge` baseline-correction token** — unique in the sample
- **Line height forced to whole 8px-grid multiples** — unique in the sample
- Text styles carry their before/after space (`sp-before/after`)
- Vertical/horizontal spacing split (the Lightning family) plus `strip` layout space
- The modular ratio written as a fraction (16/14)
- A viewport-conditional switch (×1.125 on large screens)

## Accessibility

~~Unverified.~~ → **WCAG 2.2 level AA (resolved 2026-08-18).**
Source: `vanillaframework.io/accessibility` — "aim to comply with the Web Content
Accessibility Guidelines (WCAG) 2.2, level AA".

## References

- Tokens: `npm pack vanilla-framework@4.57.0` → `scss/_settings_*.scss`
- Components in depth: `_base_button.scss` · `_base_forms.scss` ·
  `_patterns_modal.scss` from the same package, plus a full dart-sass compile check
  (2026-08-18)
- **Open questions:** the colour and theme structure (`_settings_themes.scss` not
  surveyed), ~~the component list~~ (resolved 2026-08-18 — 66 patterns), dark mode,
  the accessibility target
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — `vanillaframework.io` → `figma.com/community/file/1435297834108003391/vanilla-core-component-library`

## Drift record — 4.57.0 → 4.58.0 (2026-08-23)

Both recorded files, `scss/_settings_spacing.scss` and `scss/_settings_font.scss`, are
**byte-identical**. No recorded value changed.
