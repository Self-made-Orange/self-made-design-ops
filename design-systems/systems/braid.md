---
name: Braid
org: SEEK
coverage: partial
url: https://seek-oss.github.io/braid-design-system
repo: https://github.com/seek-oss/braid-design-system
license: MIT
tech: [React, vanilla-extract]
figma_kit: unverified
tokens_format: [TS/JS]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-23
source: "npm braid-design-system@34.7.0 → dist/lib/themes/baseTokens/nvl.mjs"
---
<!-- lang-links -->
> **English** · [한국어](braid.ko.md)
<!-- /lang-links -->

## In one line

SEEK's system (a jobs platform) — **token values are grid multiples rather than px**
(`grid: 4`, `space.medium: 6` → 24px), and line spacing is defined not as a height but as
**`lineGap`, the gap between lines**. Both are unique in the sample.

## Tokens — the values are grid units

```js
grid: 4                                   // 1 unit = 4px
space: { gutter: 6, xxsmall: 2, xsmall: 3, small: 4, medium: 6,
         large: 8, xlarge: 12, xxlarge: 16, xxxlarge: 24 }
touchableSize: 12                         // = 48px
text.standard: { mobile: { fontSize: 16, lineGap: 12 } }
```

- **Spacing values are unitless grid multiples** — `medium: 6` is not 6px but six units =
  **24px**. Converted to px the scale is `8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`, and
  **the core value 4 is absent** (the smallest is two units = 8px)
- Changing the `grid` rescales the whole system — the same effect as the runtime-multiplier
  camp, obtained here through **a build-time unit definition**
- **`touchableSize: 12` (48px)** — the touch target is a token. The same value as
  Material 3's 48dp; making the touch target a first-class token puts Braid in the same
  family as Orbit (control size) within the sample

### `lineGap` — leading defined as a gap

```js
{ fontSize: 16, lineGap: 12 }   // the empty space between lines, not the total height
```

**Where the entire sample uses `lineHeight` (a total height or a ratio), Braid alone uses
`lineGap` (the gap).** The total height is computed from the font metrics plus the gap, so
**the visual spacing holds even when the typeface changes.**
The same concern as Vanilla's (Canonical's) `nudge` baseline correction, with a different
solution — Vanilla adds a correction to sit on the grid, while Braid fixes the gap instead
of the grid.

### Themes — only brand colours are injected

```js
makeTokens({ name: 'seekJobs', brandAccent: palette.seekPink['500'], … })
```

A theme is generated from `baseTokens` (the structure) plus three brand colours
(`brandAccent` / `Light` / `Soft`) — a far thinner multi-brand structure than Mística's
(which ships a whole skin).

## Components in depth — (2026-08-18)

Parsed from the **vanilla-extract build output** of the same
`braid-design-system@34.6.2` (`dist/lib/components/**/*.css.mjs` — the `.css.ts` files ship
as ESM with their values intact) and from the component `.mjs` files. Value references were
resolved against `dist/lib/themes/baseTokens/nvl.mjs` (the only current baseTokens — both
the seekJobs and seekBusiness themes derive from nvl). **71** public component directories.

### Additional base values (nvl)

| item | value |
|------|-----|
| radius | small **4** / standard **8** / large 16 / xlarge 24px |
| border width | **standard 2px** / large 4px |
| `contentWidth` | xsmall 400 / small 660 / medium 940 / large 1280px |
| type | SeekSans · weight 400 / **medium 600** / strong 700 |
| body | `standard` 16px (lineGap 12) · `small` 14px (lineGap 10) |
| transition tokens | `fast` 125ms ease · `touchable` 200ms `cubic-bezier(0.02,1.505,0.745,1.235)` |
| press transform | `transform.touchable: scale(0.95)` |

**The default border is 2px** — a value that parts from the 1px majority, and it carries
straight into the input border (below).

### Buttons (`Button.css.mjs` + `Button.mjs`)

| | small | standard |
|---|:--:|:--:|
| **min-height** | **38.4px** (`touchableSize × 0.8`) | **48px** (`touchableSize`) |
| inline padding | 16px (`space.small`) | 24px (`space.gutter`) |
| radius | 8px (standard) | 8px |
| type | 14px / 600 | 16px / 600 |

- **No height is declared; min-height is the touch-target token.** The single source of
  control dimensions is `touchableSize` (48px), and small is 0.8 of it —
  **the resulting 38.4px fraction is simply allowed** (the same camp as MUI's 36.5px).
- **Block padding is the formula `(min-height − cap height)/2`** — vertical centring is
  computed against **cap height**, not line height. The component-layer counterpart of the
  `lineGap` leading model (above), and deriving control padding from cap height is seen for
  the first time in this corpus.
- **The press is `scale(0.95)` over 200ms on an overshooting curve** (y1 = 1.505) — the
  elastic camp alongside the bezier-overshoot ranking in `patterns/motion.md`
  (Spindle 2.05, TDS 1.56), except its place is **a button press** rather than a modal
  entrance.
- Hover and active swap opacity on an **overlay layer** rather than replacing the background.
- The `transparent` variant and small drop the padding a step (24→16px).

### Inputs (`private/Field`)

| item | value |
|------|-----|
| **height** | **exactly 48px** (`touchableSize` — block padding by the `(48 − line height)/2` formula) |
| inline padding | 16px (`space.small`) |
| radius | 8px (standard) |
| border | **a 2px inset box-shadow** in `grey400` (`borderWidth.standard`) |
| type | 16px (`text.standard`) |

- The same 48px and the same formula as the standard button — the origin of button/input
  height alignment is not a height token but the touch-target token.
- **The border is an inset box-shadow rather than the border property.** On focus and hover
  a 2px `formAccent` overlay fades in by opacity — the state transition is a layer fade, not
  a border-colour swap.
- The icon slot is also a `touchableSize` square (48px).
- Labels: a separate block — `Text` (16px) plus `Strong` (700), 16px (`space.small`) between
  label and field, 12px (`xsmall`) between field and message. Not floating.

### Modals and dialogs (`private/Modal` + `Dialog`)

| item | value |
|------|-----|
| width steps | **four, reusing `contentWidth`**: 400 / **660 (default)** / 940 / 1280px, plus `content` (fit) |
| radius | **24px (`xlarge`)** |
| content padding | 24px on mobile (`gutter`) / 32px on tablet (`large`) |
| outer gutter | 12 mobile / 24 tablet / 48px desktop |
| scrim | **light rgba(0,0,0,.4) / dark rgba(0,0,0,.6)** |
| enter (center) | scale(0.8)→1 plus fade, on the **`fast` token = 125ms ease** |
| enter (drawer) | translateX, 300ms mobile / 175ms tablet `cubic-bezier(0.4,0,0,1)` |

- **The dialog widths reuse the content-width tokens** — the same "one value, two roles"
  camp as MUI (reusing breakpoints) and Backpack (modal width = breakpoint), with the
  difference that what Braid reuses is the body content width.
- **A 24px radius** — twice the web sample's cluster (8–12px, `patterns/modal.md`), the
  largest web value in the sample, sitting between Apple's sheets (34/58px) and the web
  cluster.
- **A 125ms entrance** — the shortest modal entrance in the sample (Radix and shadcn 200ms,
  Atlassian 250ms). There is no modal-specific motion; the general-purpose `fast` transition
  token is used as-is.
- Scrim density **splits by colour mode** (.4/.6) — darker in dark mode.
- The JS cleanup timer is 300ms (`ANIMATION_DURATION`) — a constant that coexists out of
  step with the CSS's 125ms.

### Characteristic decisions (from the deep pass)

- **`touchableSize` as the single source of control dimensions** — buttons, inputs and icon
  slots all derive from 48px, with small at ×0.8 (the 38.4px fraction simply allowed)
- **Block padding computed against cap height** — the component-layer form of the lineGap
  model
- **A 2px default border, with input borders as inset box-shadows and states as overlay
  fades**
- **Dialog widths = reused contentWidth**, a 24px radius (the largest web value in the
  sample), and a 125ms entrance (the shortest)
- Button press `scale(0.95)` on an overshooting curve — elasticity assigned to the press
  rather than the entrance

## Characteristic decisions

- **Token values as grid multiples** (unitless) — unique in the sample
- **The `lineGap` leading model** — unique in the sample; visual spacing independent of the
  typeface
- The `touchableSize` touch-target token (48px)
- A minimal theme contract injecting only three brand colours
- Built on vanilla-extract (zero-runtime CSS-in-TS)

## Accessibility

Unverified (a touch-target token exists).

## References

- Tokens: `npm pack braid-design-system@34.6.2` → `dist/lib/themes/baseTokens/`
- Components in depth: `dist/lib/components/**/*.css.mjs` (the vanilla-extract build output)
  from the same package plus
  `dist/lib/components/{Button/Button,private/Field/Field,private/Modal/*,Dialog/Dialog}.mjs`
  (2026-08-18)
- **Open questions:** the full colour palette, ~~radius~~ · ~~the component list~~
  (resolved 2026-08-18 — the deep pass: four radius steps, 71 public components),
  a full survey of the responsive (mobile/tablet) pairs
