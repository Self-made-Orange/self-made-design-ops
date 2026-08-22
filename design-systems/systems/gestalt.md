---
name: Gestalt
org: Pinterest
coverage: partial
url: https://gestalt.pinterest.systems
repo: https://github.com/pinterest/gestalt
license: Apache-2.0
tech: [React]
figma_kit: unverified
tokens_format: [CSS]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-18
source: "npm gestalt@177.0.12 → dist/gestalt.css · npm gestalt-design-tokens@177.0.12 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](gestalt.ko.md)
<!-- /lang-links -->

## In one line

Pinterest's design system for its consumer service.
Being an image-grid-centred service, its radii are large and finely subdivided.

## Tokens

### Spacing — an arithmetic series in 4px

| token | value |
|------|-----|
| `--space-0` | 0px |
| `--space-100` | 4px |
| `--space-200` | 8px |
| `--space-300` | 12px |
| `--space-400` | 16px |
| `--space-500` | 20px |
| `--space-600` | 24px |
| `--space-700` | 28px |
| `--space-1000` | 40px |
| `--space-1100` | 44px |
| `--space-1200` | 48px |
| `--space-1300` | 52px |
| `--space-1400` | 56px |
| `--space-1500` | 60px |
| `--space-1600` | 64px |

**It runs in 4px steps all the way to 64px.** The number in the name is px × 25
(`space-400` = 16px).

The same arithmetic-series approach as Paste (Twilio); neither system widens its steps
toward the top.

### Radius

| token | value |
|------|-----|
| `--rounding-0` | 0px |
| `--rounding-100` | 4px |
| `--rounding-200` | 8px |
| `--rounding-300` | 12px |
| `--rounding-400` | 16px |
| `--rounding-500` | 20px |
| `--rounding-600` | 24px |
| `--rounding-700` | 28px |
| `--rounding-800` | 32px |
| `--rounding-circle` | 50% |

### Per-component radius combinations

Above the raw radii sit **component-specific combination tokens**.

```css
--rounding-datepicker-container: var(--rounding-400);
--rounding-datepicker-days: var(--rounding-circle);
--rounding-datepicker-range-end:
    var(--rounding-0) var(--rounding-circle) var(--rounding-circle) var(--rounding-0);
--rounding-datepicker-range-middle: var(--rounding-0);
```

**The value with four differently specified corners is itself made a token.**

Source: `gestalt@177.0.12` → `dist/gestalt.css`

### Typography / colour

~~Unverified.~~ → only the size scale is confirmed (the 2026-08-18 deep pass):
`--font-size-100`–`600` = **12 / 14 / 16 / 20 / 28 / 36px**. Colour remains unverified.
A separate `--opacity-*` scale exists (0–500 = 0 / 0.04 / 0.2 / 0.4 / 0.8 / 0.9).

## Components

~~Unverified. The token names confirm a datepicker.~~ → buttons, inputs and modals are in
the deep pass below (2026-08-18). For the datepicker combination tokens, see the radius
section above.

## Components in depth — (2026-08-18)

`dist/gestalt.css` in `gestalt@177.0.12` has hashed class names and cannot be read alone.
The measurements come from **cross-referencing the CSS-module mapping object (original name →
hash) in `dist/gestalt.es.js` with the `sourcesContent` of `dist/gestalt.es.js.map`, which
bundles the components' `.tsx` sources**. The original CSS was re-verified against the GitHub
tag `v177.0.12`.

### Buttons — three min-height steps, a fixed 24px radius

| | sm | md (default) | lg |
|---|:--:|:--:|:--:|
| **min-height** | **32px** | **40px** | **48px** |
| inline padding | 12px | 12px | 16px |
| block padding | 4px | 8px | 12px |
| type | 14px **bold** | 16px bold | 16px bold |

- **The radius is a fixed 24px at every size** (`--rounding-600`). A separate pill token
  exists (`--rounding-pill: 999px`) but the button does not use it — though since the height
  tops out at 48px, a 24px radius **renders effectively as a pill at every size**.
- The height is not `height` but **min-height** (the same choice as Backpack).
  The minimum width is a single **60px** — parting from Canvas (three steps by size).
- **The button type is 16px bold** — the "bold at body size" camp, with Backpack (16px, 700).
  Zero border, nine colour variants (grey by default, red, blue, transparent and lightness
  families).
- **The press feedback is a fixed-pixel shrink** — `useTapFeedback` measures the element at
  runtime and computes `scale((longest edge − 4px) / longest edge)` so that **whatever the
  size, it shrinks by exactly 4px**, transitioning the transform over 85ms ease-out.
  This parts from the existing press samples (Atlassian's 150ms colour transition, M3's shape
  morph, Radix's ratio-fixed `scale(0.97)` — `patterns/motion.md`, `button.md`) by
  **fixing the amount of the reduction**.
- **A VR theme (the experimental next generation) coexists**: min-heights drop to
  24/32/44px and radii come down to 8/12/16px (`--sema-rounding-*`), undoing the pill.
  Padding 4×8 / 6×12 / 8×16. Intermediate steps such as `--sema-space-150` (6px) appear —
  values absent from the main theme's 4px series (`gestalt-design-tokens@177.0.12` vr-theme).

### Inputs (TextField) — physically sharing the button's height classes

| | sm | md (default) | lg |
|---|:--:|:--:|:--:|
| **min-height** | 32px | 40px | 48px |
| padding | 4px 8px | 8px 12px | 12px 16px |
| **radius** | **8px** | **12px** | **16px** |
| type | 14px | 16px | 16px |

- **They share min-height with the button through the same CSS classes**
  (`layout.small/medium/large`) — not merely equal values but **the same declaration
  reused**. A tighter coupling than Backpack's 36/48px alignment (shared values).
- **The radius tracks the size (8→12→16px)** — Backpack changes 8→12px only at large, while
  Gestalt differs across all three. The type differs too, but only at sm (14px).
- **The border is 2px** (`--color-border-container`), parting from the 1px majority.
  Focus is **a 4px solid outline at offset 0** — the thick-outline camp.
- The label is a separate block (FormLabel) — **fixed at 12px**, with 4px below (8px only at
  lg).
- If there is a trailing icon button, padding-end widens to 32px (`--space-800`).
- In tag-input mode the input is absolutely positioned and **an invisible spacer div mirrors
  the content** to achieve flex wrapping (an input cannot wrap).

### Modals — 540 / 720 / 900px plus an arbitrary px

| item | value |
|------|-----|
| width | sm **540** / md **720** / lg **900px** plus **an arbitrary width via a numeric prop** |
| radius | 16px (`--rounding-400`) |
| margin / max height | 16px inline / `calc(100vh − 32px)` |
| header and body padding | 24px (Box `padding={6}` = 6×4px) |
| scrim | **`rgba(0,0,0,.8)`** |
| animation | scrim fade over **400ms linear** (symmetric in and out) — the panel itself does not move |

- **The width steps skew wide** — the smallest is 540px, larger than Mantine's default (440),
  Canvas's (440) and Backpack's (512). Allowing 900px plus an arbitrary number, it is aimed
  at content (pin grid) modals.
- **The scrim is black at 80%, among the darkest in the sample** (Backpack is 70%), with a
  400ms **linear** fade — a scrim with no easing is also rare.
- **The panel has no entrance motion.** Only the scrim fades; the panel is simply placed
  (the opposite pole from Canvas's 150ms translate and Backpack's scale 0.9→1).
- With `closeOnOutsideClick`, **the scrim's cursor becomes `zoom-out`** — announcing
  "click outside = close" through the cursor. No comparable case is recorded among the
  existing samples in `patterns/modal.md`.
- On mobile the component is **swapped for SheetMobile (full screen)** rather than a modal.

### Characteristic decisions (from the deep pass)

- **Buttons and inputs physically reuse the height classes** — three min-height steps,
  32/40/48
- **Press motion as a runtime-computed "fixed 4px shrink"** — an absolute compression, not a
  ratio
- **Input radius and type track the size** (8/12/16px · 14/16/16px)
- **Modals: three wide widths plus an arbitrary px, a 0.8 scrim, a motionless panel and a
  zoom-out cursor**
- **A coexisting VR theme** — a next generation (lower heights, smaller radii) switched by a
  flag in the same package through a second `--sema-*` token tier

## Characteristic decisions

- **The radii share the spacing's rhythm.** Both are arithmetic in 4px, with similar step
  counts. The result resembles Polaris deriving both from one `size` map, except Gestalt has
  separate scales that happen (or were made) to line up.
- **Multi-corner radius combinations are tokenised.** `rounding-datepicker-range-end` is not
  a single value but a four-value combination like `0 50% 50% 0` — pinning down the
  "square on the left, round on the right" shape of a date-range selection as a token.
  **It is the only multi-value radius token among the systems collected.**
- **`circle` is expressed as 50%** — the ratio approach, as in Spectrum (0.5) and Paste (50%).
- **The maximum radius is 32px** — the second largest after Material 3 (48px).
  (Supplement, 2026-08-18: `--rounding-pill: 999px` exists separately, outside the numeric
  scale — the arithmetic scale still tops out at 32px, with the pill as a dedicated token.)
- **There is a separate opacity scale**, `--opacity-0` through `--opacity-500`.
  Few systems in the sample tokenise opacity.

## Accessibility

Unverified.

## References

- Repository: https://github.com/pinterest/gestalt
- Packages: `gestalt@177.0.12` (components and tokens in one package) ·
  `gestalt-design-tokens@177.0.12` (the VR theme's `--sema-*` values — used in the
  2026-08-18 deep pass)
- Method for the deep pass: cross-referencing the CSS-module mapping in `dist/gestalt.es.js`
  with the `.tsx` sources in `dist/gestalt.es.js.map`'s `sourcesContent`, re-verified against
  the original CSS at GitHub tag `v177.0.12`
- Licence: `package.json` states **Apache-2.0** — reflected in the frontmatter (2026-08-18)
- **Open questions:** the full type scale (the deep pass confirmed only
  `--font-size-100`–`600` = 12/14/16/20/28/36px), the actual colour palette values,
  figma_kit and a11y_target
- **Licence resolved (2026-08-18):** `Apache-2.0` — source: github pinterest/gestalt →
  `LICENSE` (matching the npm metadata for `gestalt@177.0.12`)
