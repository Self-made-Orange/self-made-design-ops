---
name: Siemens Industrial Experience (iX)
org: Siemens
coverage: partial
url: https://ix.siemens.io
repo: https://github.com/siemens/ix
license: MIT
tech: [Web Components, React, Angular, Vue]
figma_kit: true
tokens_format: [CSS]
a11y_target: "WCAG AA (no version stated — confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @siemens/ix@5.2.0 → dist/siemens-ix/{siemens-ix-standalone,theme/classic-*}.css"
---
<!-- lang-links -->
> **English** · [한국어](siemens-ix.ko.md)
<!-- /lang-links -->

## In one line

Siemens' industrial UI system — the type-size names are **a modular scale including negative
exponents** (`ms--2` to `ms-6`), text roles are **single tokens in CSS `font` shorthand**,
and the base size is 14px (a dense industrial UI).

## Tokens — 240 per theme

### Type — the `ms` exponent scale

```
ms--2: 10px · ms--1: 12px · ms-0: 14px · ms-1: 16px · ms-2: 20px
ms-3: 24px · ms-4: 29px · ms-5: 35px · ms-6: 42px
```

- **The names are modular-scale exponents** — `ms-0` is the base (14px) and the negative
  exponents (`ms--1`, with a double hyphen) are the steps below. The only case in the sample
  of **making explicit in the naming system** what EUI does by placing its base mid-scale
- **A 14px base** — the dense-enterprise 14px camp, with Ring UI and Blueprint.
  The upper steps 29/35/42 are ratio-derived values off any 4px grid
- Line heights are unitless ratios (1 · 1.091 · 1.2 · 1.3 · 1.43 · 1.5)

### Text roles are CSS `font` shorthand

```css
--theme-h1: var(--weight-bold) var(--ms-4)/var(--line-height-sm) var(--font-sans);
--theme-body: var(--weight-normal) var(--ms-0)/var(--line-height-md) var(--font-sans);
```

**Weight, size, line height and family are composed into one token as a CSS `font`
shorthand**, so `font: var(--theme-h1)` finishes the styling in a single line — unique in
the sample. The typographic edition of the same shorthand camp as Ring UI (duration +
easing composed). There are 20-plus roles: display (xxl–xs) · h1–h6 · body (lg–xs) · label ·
code.

### Themes — a classic-light / classic-dark file pair

`--theme-color-primary` moves from `#006e93` in light to `#00bde3` in dark —
**replaced by a brighter cyan in dark mode** (the same direction as TDS's ramp inversion,
handled here at the semantic layer). Seventeen chart-specific colour families are included
in the theme — the chart-token camp of the industrial and data domains, with Serendie.

## Components

Web Components (Stencil) shipped alongside React, Angular and Vue wrappers —
**supporting four frameworks at once is unique in the sample** (most ship React alone).
→ Buttons, inputs and modals are in the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

Measured from `dist/collection/components/*/**.css` (the uncompressed Stencil collection) and
`dist/siemens-ix/siemens-ix-core.css` (the component variable layer) of `@siemens/ix@5.2.0`.

### Buttons — one size only, and a 1px focus

| item | value |
|------|-----|
| **height** | **a fixed 2rem (32px) — no size variants** |
| inline padding | 8px (the public `--ix-button-padding` variable) |
| radius | **2px** (`--theme-btn--border-radius` → small 0.125rem) |
| border | 1px — always, on every variant including primary |
| type | **14px / 700** / 1.429em (≈20px) |
| focus | **a 1px outline** with a 2px offset (`#199fff`) |

- **There are no size variants** — a single 32px, in contrast to Tegel's four steps and
  Kontur's three. A dense industrial UI fixing density at one value.
- **The button type is 14px at weight 700** — the same bold camp as Backpack (16px, 700),
  at a dense size.
- **The focus outline is 1px** — the thinnest in a sample where 2px and above is the
  majority.
- The three radius steps are min (0) / small (**2px**) / default (4px), with buttons and
  inputs on 2px and cards and modals on 4px. An ultra-low-radius system with nothing in the
  8px range at all.
- `--ix-button-border-radius-left/right` are separated so that a grouped (joined) button can
  fold one side to 0 — the variable edition of Backpack's `--docked`.

### Inputs — state painted as a background colour

| item | value |
|------|-----|
| min-height | **2rem (32px)** — the same as the button |
| padding | 4px 8px |
| radius | 2px · border 1px |
| type | `--theme-ms-0` (14px) / 400 |

- **invalid, warning and info change not just the border colour but the background itself**
  — the variable layer carries a per-state background set,
  `--theme-input--background--invalid: var(--theme-color-component-error)` and so on. This
  parts from the majority, who change only the border.
- Focus is the same 1px outline as the button plus a border swapped to
  `--theme-color-dynamic` (#00eaff) — the two signals overlaid.

### Modals — the class names are px values, and the motion is JS reading CSS variables

| size class | width |
|------|-----|
| `modal-size-360` | 22.5rem (360px) |
| `modal-size-480` | 30rem |
| `modal-size-600` | 37.5rem |
| `modal-size-720` | 45rem |
| `modal-size-840` | 52.5rem |
| + `full-width` 95% / `full-screen` | |

- **The width-step names are the px values** (the same philosophy as Tegel's value-named
  `element-16`, applied to a modal API). Five steps plus two full options, max-height
  **80vh**, radius 4px, scrim `--theme-color-lightbox` (rgba(0,0,0,.549)).
- **The entrance animation is not CSS but animejs (a JS library)** — by default a 40px
  slide-down plus fade over 300ms, top-aligned; with `centered`, translateY −90%→−50%.
  The default position is the top, not vertical centre.
- **The duration is read out of a CSS variable by JS via `getComputedStyle`**
  (the `Animation` utility — `--theme-short/default/medium/slow/x-slow-time`, with fallbacks
  of 0/150/300/500/1000ms). Those variables are not in the theme files, so the effective
  values are the fallbacks — meaning **short = 0ms**, with "instant" as the first step of the
  scale. Under `prefers-reduced-motion` JS sets every step to 0 — **blocking motion at the
  JS layer** rather than through a CSS media query, unique in the sample.

### Characteristic decisions (from the deep pass)

- **One button size (32px)** — the size axis is simply not offered
- **A 1px focus outline** — the thinnest in the sample
- **A 2px radius on buttons and inputs** — an ultra-low three-step system (0/2/4)
- **Input state as a background colour** — the opposite pole from the border-signal camp
- **Modal class names = px values** · the default position is the top
- **Motion values consumed in JS** (CSS variable → getComputedStyle → animejs) —
  reduced-motion handled in JS too

## Characteristic decisions

- **The `ms` negative-exponent naming system** — the mid-scale base made explicit in the
  name, unique in the sample
- **Text roles as single CSS `font` shorthand tokens** — unique in the sample
- A 14px base — the dense industrial UI camp
- Web Components plus three framework wrappers — the widest distribution in the sample
- primary replaced by a brighter value in dark, plus 17 chart colour families

## Accessibility

~~Unverified.~~ → **WCAG AA (resolved 2026-08-18 — though no version is stated).**
Source: `ix.siemens.io/docs/guidelines/accessibility/overview` — "We strive to meet
WCAG AA standards". The individual guidelines carry success-criterion numbers (1.1, 1.3,
2.1, 2.5 and so on) and state a **minimum target of 24×24px**.

## References

- **Basis for the Figma kit (true):** the "iX Design System" library on the Siemens AG
  Global Figma account — internal licence only, with guest and classic access on request,
  confirmed 2026-08-18

- Tokens: `npm pack @siemens/ix@5.2.0` → `dist/siemens-ix/*.css`
- Components in depth: `dist/collection/components/{button,input,modal}/*.css` ·
  `dist/collection/components/utils/animation.js` · `dist/siemens-ix/siemens-ix-core.css`
  from the same package (2026-08-18)
- **Open questions:** ~~the spacing system~~ (resolved 2026-08-18 — **confirmed to have no
  spacing tokens**: zero occurrences of `--theme-spacing*` in the whole of core.css, with
  0.25/0.5rem literals in the component CSS), ~~whether a brand theme (siemens-brand)
  exists~~ (resolved 2026-08-18 — the Figma library embeds **four themes: Brand dark ·
  Brand light · Classic dark · Classic light**, and Siemens AG applications are
  **required to use the Corporate Brand Theme** — source
  <https://ix.siemens.io/docs/styles/theming/usage-designers>),
  ~~the accessibility target~~ (resolved 2026-08-18 — see the accessibility section)
- **Figma kit resolved (2026-08-18):** `figma_kit: true` — source
  <https://ix.siemens.io/docs/home/overview>, which states that "our **Figma library
  contains all the tokens, components and blueprints you need to design your app**".
  Access, however, is **gated in three ways**: ① the main library is administered on the
  **Siemens AG Global Figma account** and used by **Siemens employees with a Figma licence,
  who search for "iX Design System"**; ② **guest access and the classic (open-source)
  library are provided individually on request**; ③ the library contains
  **Siemens brand assets**. The asymmetry — MIT open-source code with a
  **design kit that is internal-first and request-based** — is characteristic of this system
