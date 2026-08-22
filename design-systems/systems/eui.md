---
name: EUI (Elastic UI)
org: Elastic
coverage: partial
url: https://eui.elastic.co
repo: https://github.com/elastic/eui
license: Dual SSPL-1.0 / Elastic-2.0 (some files are Apache-2.0 compatible)
tech: [React]
figma_kit: unverified
tokens_format: [JS/TS]
a11y_target: "WCAG 2.1 (no level stated — confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @elastic/eui-theme-common@10.0.0 → lib/esm/global_styling/variables/size.d.ts · npm @elastic/eui-theme-borealis@8.0.0 (components and levels, 2026-08-18) · npm @elastic/eui@119.0.0 → es/components/{table,datagrid,tabs,breadcrumbs,toast,call_out,badge} (tables, navigation and feedback measured, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](eui.ko.md)
<!-- /lang-links -->

## In one line

Elastic's (Elasticsearch and Kibana's) design system for data-analysis tooling.
**It puts a step named `base` in the middle of the scale.**

## Tokens

### Size / spacing

| token | value |
|------|-----|
| `xxs` | 2px |
| `xs` | 4px |
| `s` | 8px |
| `m` | 12px |
| **`base`** | **16px** |
| `l` | 24px |
| `xl` | 32px |
| `xxl` | 40px |
| `xxxl` | 48px |
| `xxxxl` | 64px |

**`2 / 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64` — every common core value is present.**
There is no 20px and no 6px, and the top ends at 64px.

Source: `@elastic/eui-theme-common@10.0.0` → `lib/esm/global_styling/variables/size.d.ts`
(the real values are in the type definitions' JSDoc `@default` comments)

### Naming — `base` sits in the middle

```
xxs · xs · s · m · base · l · xl · xxl · xxxl · xxxxl
```

`base` is wedged into the middle of the t-shirt sequence.
Between `m` (12px) and `l` (24px) sits `base` (16px).

Backpack uses `BASE` too, but in a different position — Backpack places `BASE` (16px)
**above** `MD` (8px).
**In neither system can you guess a size from the t-shirt order alone.**

### Radius / typography / colour

~~Unverified — they are in `variables/borders.js` and `variables/typography.js`.~~
→ radius and typography are resolved in the deep pass below (2026-08-18). The full colour
palette remains unverified.

## Components

`global_styling/variables/` contains component-related variable files such as `buttons`,
`states`, `levels` and `components`. ~~The list and count are unverified.~~
→ 90 directories in `lib/components/` of `@elastic/eui@119.0.0` (2026-08-18).
Buttons, inputs and modals are in the deep pass below.

## Components in depth — (2026-08-18)

The emotion style JS of `@elastic/eui@119.0.0` (`lib/**/*.styles.js` and
`mixins/_button.js`) was parsed, with value references resolved through the variable JS of
**the default theme package, `@elastic/eui-theme-borealis@8.0.0`.** Note — unlike the
token section's `.d.ts` JSDoc trap (HARVESTING lesson 2),
**the theme's real values sit in plain text in borealis's runtime JS**
(`lib/esm/variables/_*.js`).
`eui-theme-common` holds types and utilities; if you need real values, opening the theme
package is faster.

### The default theme's (borealis) confirmed values

| item | value |
|------|-----|
| radius | `small` = `medium` = **4px** (both by the `base×0.25` formula) |
| border | thin 1px · thick 2px |
| typeface | Inter / weights 300 · 400 · **450 (medium)** · 500 (semiBold) · 600 (bold) |
| type scale | 9 · 11 · 12 · 14 · 16 · 20 · 24 · 30px (approximately a Major Third) · body `s` (**14px**) |
| durations | 90 · 150 · 250 · 350 · 500ms (`extraFast`–`extraSlow`) |
| easings | `bounce (.34,1.61,.7,1)` · `resistance (.32,.72,0,1)` — **only two** |
| breakpoints | 0 / 575 / 768 / 992 / 1200 |

- **There are two radius tokens holding the same value** — small = medium = 4px. A
  single-radius system where the names survive and the steps have vanished.
- **A weight of 450** — in the sample, weights off the hundreds belong to Apple SF (590) and
  EUI (450). A value presupposing the Inter variable font.

### Buttons (`mixins/_button.js`'s `euiButtonSizeMap` + `_button_display.styles.js`)

| | xs | s | m (default) |
|---|:--:|:--:|:--:|
| **height** | 24px (`size.l`) | 32px (`size.xl`) | 40px (`size.xxl`) |
| inline padding | 6px (`size.m`÷2) | 8px (`size.s`) | 12px (`size.m`) |
| **min-width** | 96px (`base×6`) | 96px | **112px (`base×7`)** |
| radius | 4px | 4px | 4px |
| type | 12px | 14px | 14px |

- The heights are **spacing tokens directly** (l/xl/xxl) — there are no control-height
  tokens.
- `line-height: height` for single-line alignment, at weight 450 (medium).
- **The minimum width is not a token but the formula `base×6/7`.** 96px matches Fluent 2's
  medium (`patterns/button.md`), but Fluent's is a constant and EUI's a multiplication.
- Colours come from a `components.buttons.*` token tier (seven colours × base/fill/empty ×
  default/hover/active), and **on the base and empty variants hover lays a `::before`
  overlay** rather than swapping the background (only fill swaps it directly).

### Inputs (`form.styles.js`'s `euiFormVariables`)

| | default | compressed |
|---|:--:|:--:|
| **height** | **40px** (`size.xxl`) | 32px (`size.xl`) |
| padding (all sides) | 12px (`size.m`) | 8px (`size.s`) |
| radius | 4px | 4px |
| max width | **400px (`base×25`)** | the same |

- The default 40px is **the same token as the button's m** (`size.xxl`) — button and input
  heights aligned.
- **Inputs carry a default `max-width: 400px`** — a rare decision to limit form width with a
  token.
- The inline padding is **added to by a CSS variable counting the icons**:
  `calc(12px + 24px × var(--euiFormControlLeftIconsCount, 0))`. Icon slots resolved by a
  counter variable rather than by measuring the DOM.
- The label is a separate block element — title `xxxs` (12px) at weight 500 (semiBold), with
  4px (`size.xs`) between label and field and 16px (`size.base`) between rows.
- Inside a group (prepend/append), the input's height is reduced to **the control minus 2px**
  to account for the border.
- Transition: 150ms (`animation.fast`) ease-in.

### Modals (`modal.styles.js`)

| item | value |
|------|-----|
| **min-width** | **400px — reusing the input's `maxWidth`** (`euiFormVariables().maxWidth`) |
| default max-width | `min(768px (the m breakpoint), 100vw − 16px)` |
| radius | 4px (`radius.medium`) |
| max-height | 75vh · full-screen automatically below 768px |
| enter | **translateY(40px)→0 plus a fade, 350ms `bounce (.34,1.61,.7,1)`** |
| padding | header `24 40 16 24` (the 40 on the right is the close icon's share) · body 24/8 · footer 24/16–24, gap 16 |
| scrim | rgba(72, 89, 117, 0.7) — blueGrey100 at 70% |

- **The form's max-width (400px) is the modal's min-width** — one value, two roles.
  The same reuse camp as Backpack (modal width = breakpoint) and MUI (dialog width =
  breakpoint), except what EUI reuses is a form token.
- **The default entrance easing is a bounce** — at y2 = 1.61 it sits above TDS's `back`
  (1.56) and below Spindle's (2.05) in the overshoot ranking in `patterns/motion.md`.
  An unusual combination: a dense enterprise tool whose every modal springs.
- The scrim is not black but **a blue-grey at 70%** — almost exactly Evergreen's colour and
  density (rgba(67,90,111,.7)). Two data tools arriving at the same decision independently.

### Tables (`basic_table` · `datagrid`) — two components on different coordinate systems

| item | value |
|---|---|
| **basic table cell padding** | `size.s` = **8px** · compressed `size.xs` = **4px** |
| basic table cell min-height | `size.l` = **24px** |
| checkbox column width | `size.xl` = **32px** |
| mobile action column width | `size.xxl` = 40px · offset = cell padding × 2 |
| **datagrid default row height** | **34px** (`DEFAULT_ROW_HEIGHT`) |

- **There are two tables in one system** — `EuiBasicTable` (document-style, content height)
  and `EuiDataGrid` (virtually scrolled, **a fixed 34px**). The second case after Blueprint
  (20px) of actually providing a fixed row height for virtual scrolling, at 14px more.
- **On mobile it removes `thead` and `tfoot` with `display: none`**
  (`table.styles.js`) — a responsive table that rearranges the cells into vertical cards.
  A case in the collected sample of specifying a table's mobile layout in CSS.
- Among the three cell alignments (left by default / right / center), **only right** is
  handled not by reversing the icon and label with `flex-direction` but with
  `justify-content: flex-end` plus logical alignment.
- Only the action cell's gap differs — standard actions `size.xs` (4px), custom `size.s`
  (8px).

### Navigation (`tabs` · `breadcrumbs`) and the z-index tiers

| item | value |
|---|---|
| tab inline padding | `size.xs` = **4px** · 8px between icon and label |
| tab height (line-height derived) | s **32px** (`size.xl`) · m **40px** (`size.xxl`) · l `size.xl + size.s` = 40px |
| tab weight | `font.weight.semiBold` |
| tab indicator | `border.width.thick` (**2px**), **×2 = 4px** in high-contrast mode |
| tab list | a bottom `border.thin` |
| breadcrumb gap | `size.xs` = **4px** |

- **Tab height comes from `line-height`, not `height`** — the block padding is 0 and the
  line height is the height. The `l` step reaches 40px as `xl + s`, **the same value as `m`
  (xxl = 40px) by a different formula** (only the type size differs).
- **In high-contrast mode the indicator doubles to 4px.** The only case in the collected
  sample of tying the active indicator's thickness to high-contrast mode.
- **z-index is tokenised in nine role-named steps** (`levels.js`):

```
toast 9000 · modal 8000 · mask 6000 · navigation 6000
menu 2000 · header 1000 · flyout 1000 · maskBelowHeader 1000 · content 0
```

  **`toast` sits above `modal`**, and `navigation` shares 6000 with `mask`.
  A separate `maskBelowHeader` (1000) gives **a mask that does not cover the header** its own
  tier.

### Feedback (`toast` · `call_out` · `badge`)

| item | value |
|---|---|
| **toast list width** | `base × 27.5` = **440px** (a source comment: *"results in 360px toast width"*) |
| list padding | `size.base` = 16px all round · 16px below each item |
| position | `bottom: 0` plus `side` defaulting to **`'right'`** → **bottom right** |
| z-index | `levels.toast` = **9000** |
| enter | `translateY(size.l = 24px) scale(.9)` → 0/1, `animation.normal` plus `animation.resistance` |
| exit | **250ms** (`TOAST_FADE_OUT_MS`) |
| "clear all" appears | from **three** toasts (`CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT`) |
| mobile | `left: 0; width: 100%` at or below the `m` breakpoint |
| **CallOut padding** | s **12 / 16px** · m **16px all round** |
| CallOut left emphasis | `border.thin + border.thick` = **3px** (a `::before`, extended −1px top and bottom) |
| CallOut gap | s 8px / m 12px · 40px in the wide layout |
| **Badge** | line height `base + thin×2` = **18px** · padding `0 (size.s − 1px = 7px)` · radius `size.l` (24px, a pill) · a 1px transparent border · weight medium |

- **The badge subtracts the border's share from its padding and line height** — the source
  leaves the reason in a comment (*"Account for the (usually transparent) border so that the
  visual padding is of size s"*). The "subtract the border from the padding" convention in
  `patterns/button.md` is confirmed on a badge too, **with the reason recorded in a comment.**
- **Toasts default to the bottom right** — `side: 'right'` plus `bottom: 0`.
- The CallOut's left emphasis line is a `border-inline-start` drawn 1px past the container
  above and below (`block-size: calc(100% + 2px)`) **so that it meets the rounded corners.**

### Characteristic decisions (from the deep pass)

- **There are no control-specific dimension tokens** — heights (spacing), minimum widths
  (`base×n`) and the modal's min-width (the form's maxWidth) are all reuses or formulas over
  existing values.
- The radius is effectively one step (4px) — a single 4px across every size variant and
  component.
- There are only two easing tokens, bounce and resistance, with no standard ease family.
- Input icon padding added through a CSS counter variable.
- Button hover handled by an overlay pseudo-element (on base and empty).

## Characteristic decisions

- **It puts `base` in the middle of the scale**, naming the reference value explicitly.
  Different from the systems that use t-shirt sizes alone (Fluent, Ant, Cloudscape).
- **Ten steps, ending at 64px.** Layout whitespace is not handled on this scale.
- **The tokens live in the type definitions.** The `.d.ts` JSDoc comments are the source of
  the real values, while the runtime JS holds only a theme factory — so
  **a static scanner has trouble finding them.**
- **The theme packages are separated.** Beyond `@elastic/eui-theme-common` (the shared
  layer), per-theme packages such as `@elastic/eui-theme-borealis` ship separately.
- **There is a separate `vis_color_store`.** Data-visualisation palettes are managed at the
  system level — a structure reflecting the nature of an analysis tool.

## Accessibility

~~Unverified.~~ → **WCAG 2.1 (resolved 2026-08-18 — with no level stated).**
Source: `eui.elastic.co/docs/getting-started/accessibility/` — "The components provided
strive to meet WCAG 2.1 guidelines on semantics, keyboard functionality, color
contrast". The copy guide (`docs/content/accessibility/`) separately cites WCAG 2.0.

## References

- Repository: https://github.com/elastic/eui
- Packages: `@elastic/eui-theme-common`, `@elastic/eui-theme-borealis`
- **Note:** the tokens are in **`-theme-common`**, not in the main `@elastic/eui` package.
  The values have to be read from the `.d.ts` JSDoc.
- **Correction (2026-08-18):** the real values also sit in plain text in
  **the default theme package `@elastic/eui-theme-borealis`'s runtime JS**
  (`lib/esm/variables/_*.js`). The `.d.ts` JSDoc is the theme-common route; if you need the
  theme's real values, opening borealis is faster.
- Components in depth: `@elastic/eui@119.0.0` → `lib/global_styling/mixins/_button.js` ·
  `lib/components/button/button_display/_button_display.styles.js` ·
  `lib/components/form/form.styles.js` · `lib/components/modal/modal*.styles.js`,
  cross-referenced with `@elastic/eui-theme-borealis@8.0.0`'s variable JS (2026-08-18)
- Licence: the package's LICENSE.txt states a **dual SSPL v1 / Elastic License 2.0**
  (with per-file Apache-2.0-compatible exceptions noted) — reflected in the frontmatter
  (2026-08-18)
- **Licence resolved (2026-08-18):** `Dual SSPL-1.0 / Elastic-2.0 (some files are
  Apache-2.0 compatible)` — source: github elastic/eui → `LICENSE.txt`. The file header
  takes precedence, with the dual licence as the default. The npm metadata for
  `@elastic/eui-theme-common@10.0.0` says `SEE LICENSE IN LICENSE.txt`
