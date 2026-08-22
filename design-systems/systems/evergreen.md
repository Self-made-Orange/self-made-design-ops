---
name: Evergreen
org: Segment
coverage: partial
url: https://evergreen.segment.com
repo: https://github.com/segmentio/evergreen
license: MIT
tech: [React]
figma_kit: true
tokens_format: [JS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "github segmentio/evergreen@master → src/themes/default/tokens/"
---
<!-- lang-links -->
> **English** · [한국어](evergreen.ko.md)
<!-- /lang-links -->

## In one line

Segment's design system for its data-pipeline products.
**The tokens are unnamed arrays**, and there are no spacing tokens.

## Tokens

### Radius — an unnamed three-step array

```js
radii[0] = '0px'
radii[1] = '4px'
radii[2] = '8px'
```

**The tokens have no names.** They are referenced only by array index — no naming like
`xs`/`sm`/`md`, and no numbering like `radius-100`.

Three steps, all 8px or under — the same square-cornered family as Helios (3 · 5 · 6 · 8px)
and Lightning (2 · 4 · 8px).

Source: `src/themes/default/tokens/radii.js`

### Typography

| item | value |
|------|-----|
| sizes | 10 · 12 · 14 · 16 · 18 · 20 · 24 · 32px |
| line heights | 16 · 18 · 20 · 24 · 28 · 32 · 40px |
| body default | **14px** |
| heading default | 16px |
| caption | 10px |

Sizes and line heights are **arrays** too. Above them sit only the aliases `body` /
`heading` / `caption` as names.

**There is a 10px size** — the smallest body-grade value in the sample; Seed Design also has
10px.

### Tracking — the only one in px, and the only one with a `wide`

| token | value |
|------|-----|
| `tightest` | **-0.2px** |
| `tighter` | -0.07px |
| `tight` | -0.05px |
| `normal` | 0 |
| **`wide`** | **+0.6px** |

Two things are unique in the sample.

- **Tracking is defined in px.** Backpack and Seed Design use `em`; Apple and Material use
  fractional px. Being fixed in px, the tracking does not scale as the type grows.
- **A positive `wide` is provided.** Backpack and Seed Design offer only negatives.

It uses hundredth-of-a-pixel values like `-0.07px` and `-0.05px`.

### Typefaces

| family | default |
|------|------|
| Display | SF UI Display → the system stack |
| UI | SF UI Text → the system stack |
| Mono | SF Mono → Monaco · Inconsolata · Fira Mono … |

**Display and UI are separated** — a different typeface for headings than for the interface.

### Spacing

**None.** The `src/themes/default/tokens/` directory looks like this:

```
colors.js  fills.js  index.js  intents.js
radii.js   shadows.js  typography.js  z-indices.js
```

**There is no spacing file.** Whitespace lives directly in the components.

### Unusual token families

| file | contents |
|------|------|
| `intents.js` | colour bundles per intent (success · warning · danger · none) |
| `fills.js` | colours reserved for background fills |
| `z-indices.js` | the z-index scale |

**`intents` is a family of its own** — state colours separated out as an independent
concept rather than living inside `color`.

## Components

~~Unverified.~~ `src/themes/default/components/` holds **38 files** of per-component theming.
→ see the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

Measured from `src/themes/default/components/*.js`, `src/dialog/src/Dialog.js` and
`src/overlay/src/Overlay.js` in GitHub `segmentio/evergreen@master` (commit `9b774ae`,
2025-06-11, v7.1.9). Because the npm distribution omits the tokens (HARVESTING lesson 5),
the component layer was read from GitHub `src/` too.

### Buttons (`components/button.js`)

| | small | medium | large |
|---|:--:|:--:|:--:|
| **height** | **24px** | 32px | 40px |
| inline padding | 12px | 16px | 20px |
| **min-width** | **24px (= the height)** | 32px | 40px |
| type | 12px (`fontSizes.1`) | **12px** | 14px (`fontSizes.2`) |
| radius | 4px (`radii.1`) | 4px | 4px |

- Single-line alignment via `line-height: height`. **min-width = its own height** — a square
  floor guaranteeing icon-only buttons, the same decision as Polaris (`min-width` = height,
  `patterns/button.md`).
- **The type stays at 12px right through the medium (32px) button** — smaller than the body
  (14px). Only large goes to 14px. A structure where the control type is smaller than the
  body type.
- The only transition is **`box-shadow 80ms ease-in-out`** — no colour or background
  transition, only the focus ring animates. 80ms is at the short end of the sample.
- Variants: primary / default (a white background with a border) / minimal (transparent) /
  destructive, plus intent (success, danger), which swaps the colour key wholesale
  (blue→green/red) — the `intents` token family (above) feeding directly into how button
  colours are computed.

### Inputs (`components/input.js`)

| | small | medium | large |
|---|:--:|:--:|:--:|
| **height** | 24px | 32px | 40px |
| inline padding | 12px | 12px | 12px |
| type | 12px | 12px | 12px (only the line height moves, 16→18px) |
| radius | 4px | 4px | 4px |
| border | 1px `gray400` | same | same |

- **The same three steps as the button, 24/32/40px** — the same alignment pattern as
  Backpack (two shared steps, 36/48), differing only in the number of steps.
- **Inline padding is fixed at 12px** — the size variants change only the height, not the
  padding. This parts from the majority (EUI, MUI and others), who vary padding by height.
- The type is fixed at 12px too — large grows only its line height, to 18px.
- Focus: `shadows.focusRing` plus a `blue200` border / invalid: a `red500` border.
- Labels: `FormField` uses a separate block label (`Label` size 400 = 14px/18px, weight 500
  semibold) plus `marginBottom: 8px`. Not floating.
  `Label`'s baseStyle is the Display typeface, but **size 400 overrides it with the UI
  typeface** — in the default combination the label is set in the UI face too.

### Dialogs (`dialog/src/Dialog.js` + `components/dialog-*.js`)

| item | value |
|------|-----|
| width | **a single 560px default** (a free `width` prop — no steps) |
| ceiling | `calc(100% − 16px×2)` · block margin `topOffset: 12vmin` |
| radius | **8px** (`radii.2` — the top of the scale) |
| shadow | elevation 4 (the top of a five-step scale) |
| enter | scale(0.8)→1 plus fade, **200ms `deceleration (0,0,0.2,1)`** |
| exit | the reverse, 200ms `acceleration (0.4,0,1,1)` |
| scrim | **rgba(67, 90, 111, 0.7)** (`colors.overlay`) · fading over **240ms** |
| padding | header `32 32 24` · body 8 block / 32 inline · footer `24 32 32` |

- **There are no width steps** — one 560px default, with a free value accepted through a
  prop. The polar opposite of Cloudscape's five and Braid's four, and close to Mantine, in
  the same "single default" camp.
- **The easing names are Material's terms verbatim** (`deceleration`/`acceleration` = the
  Material standard curves). They are not tokenised but re-declared as constants in each
  component file.
- **The panel takes 200ms and the scrim 240ms** — because durations are hardcoded per
  component (Dialog 200 · Overlay/SideSheet/Toast/CornerDialog 240), the scrim finishes 40ms
  after the panel on entry. A textbook drift from the absence of motion tokens.
- The scrim is not black but **a blue-grey at 70%** — almost exactly EUI's value
  (rgba(72,89,117,.7)). A convergence between two data-tooling samples.

### Characteristic decisions (from the deep pass)

- **Buttons and inputs share three steps, 24/32/40px**, with min-width = the height
- **A 12px control type right through medium** — smaller than the 14px body
- **Input padding and type fixed regardless of the size variant** (only the height and line
  height move)
- **No dialog width steps** (a single 560px default)
- **Every motion value hardcoded per file** — the 200/240ms mismatch, and Material's curves
  borrowed

## Characteristic decisions

- **The tokens have no names.** Radii, sizes and line heights are all arrays referenced by
  index. Unique in the sample. Adding or removing a step **shifts the existing indices and
  breaks them.**
- **There are no spacing tokens.** One of four, with Apple HIG, Material 3 and Seed Design.
- **Tracking is in px, and it goes positive.** Both traits are unique in the sample.
- **Display and UI typefaces are separated.** Most systems use a single font stack.
- **`intents` is an independent family.** State colours pulled out of the colour palette.
- **The body is 14px.** The same family as Ant Design, Material 3 and Helios.

## Accessibility

Unverified.

## References

- Repository: https://github.com/segmentio/evergreen
- Package: `evergreen-ui` (the theme ships inside the component package)
- Tokens: `src/themes/default/tokens/*.js`
- Components in depth: GitHub `segmentio/evergreen` commit `9b774ae` (2025-06-11, v7.1.9) →
  `src/themes/default/components/{button,input,dialog-*}.js` ·
  `src/dialog/src/Dialog.js` · `src/overlay/src/Overlay.js` ·
  `src/form-field/src/FormField*.js` (2026-08-18)
- **Note:** the npm package's `esm/` holds only components; the theme tokens live in `src/`.
  Reading from GitHub is the reliable route.
- **Licence resolved (2026-08-18):** `MIT` — source: github segmentio/evergreen → `LICENSE`
  (matching the npm metadata for `evergreen-ui@7.1.9`)
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — the "Evergreen Figma Library" in
  the resource list at `evergreen.segment.com`
