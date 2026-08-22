---
name: Park UI
org: Open source (Christian Schröter)
coverage: partial
url: https://park-ui.com
repo: https://github.com/cschroeter/park-ui
license: MIT
tech: [Panda CSS, Ark UI, React/Vue/Solid]
figma_kit: true
tokens_format: [JS]
a11y_target: unverified
platform: web
domain: framework
verified: 2026-08-18
source: "npm @park-ui/panda-preset@0.43.1 → dist/{index.js,options-*.d.ts}"
---
<!-- lang-links -->
> **English** · [한국어](park-ui.ko.md)
<!-- /lang-links -->

## In one line

A Panda CSS preset-shaped framework — the theme is **26 accents × 6 grays × 7 radius
steps = 1,092 combinations**, and the **accent palette carries Radix Colors' names
verbatim** (tomato · ruby · jade · iris …). Radius is a **preset option (a choice)**.

## Tokens — the preset's generation options

```ts
interface PresetOptions {
  accentColor: ColorPalette;   // 26
  grayColor: ColorPalette;     // 6
  radius: Radius;              // 7 steps
}
accentColors = [neutral, tomato, red, ruby, crimson, pink, plum, purple,
                violet, iris, indigo, blue, cyan, teal, jade, green, grass,
                bronze, gold, brown, orange, amber, yellow, lime, mint, sky]
grayColors   = [neutral, mauve, olive, sage, sand, slate]
radii        = [none, xs, sm, md, lg, xl, 2xl]
```

- **26 × 6 × 7 = 1,092 theme combinations** — second in scale only to Radix Themes
  (5 axes, 6,500 combinations), and **Radix and Park UI are the two places that put
  radius on a theme axis**
- **The accent names are identical to Radix Colors'** (tomato · ruby · crimson · iris ·
  jade · grass · bronze · mint and 26 in all; the 6 grays match too — mauve · olive ·
  sage · sand · slate). This is **the Radix Colors palette carried over onto Panda CSS**,
  and after Skeleton (inheriting from Tailwind) and shadcn (Tailwind + Radix Primitives)
  it is the **third kind of inheritance relationship** in the sample — this one inherits
  a colour palette
- `radii: createRadii(radius)` — the chosen radius step **generates the whole radius
  scale**. Radius is not a value here but a **theme parameter**
- The raw radius scale includes `0.0625rem` (1px) — a sub-pixel-grade smallest step
- Component primitives come from **Ark UI** (Zag.js state machines) — the same layer
  where shadcn and Radix Themes sit on Radix Primitives

## Components in depth — (2026-08-18)

Extracted from the Panda recipe definitions in `@park-ui/panda-preset@0.43.1` →
`dist/index.js` (the recipe comments preserve the original source paths —
57 files under `src/theme/recipes/*.ts`, plus the preset's own token definitions).
Values were resolved against the spacing/radii/textStyles tokens in the same file.

### Buttons (recipe `button`) — minW equals the height

| | xs | sm | md | lg | xl | 2xl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| **height** | 32px | 36px | **40px** | 44px | 48px | 64px |
| min-width | 32px | 36px | 40px | 44px | 48px | 64px |
| inline padding | 12px | 14px | 16px | 18px | 20px | 28px |
| type | 12/18 | 14/20 | 14/20 | 16/24 | 16/24 | 18/28 |

- **`minW` = height** — no button ever gets narrower than a square. Tying the minimum
  width to the height rather than to a separate value (MUI's 64px) is unique in the sample.
- Six size steps (xs–2xl) with a doubling jump at xl→2xl, 48→64px. Default md is 40px.
- Type is a `textStyle` reference (a size/leading pair) — sm and md share the same 14px.
- Weight semibold (600), radius **`l2`** (see the radius layer below), transition 200ms.
- Five variants: solid · outline · ghost · link · subtle. outline, ghost and subtle default
  to `colorPalette: gray` — **unless you name a colour you get gray**, and only solid rides
  the preset's accentColor. Focus is a 2px outline with a 2px offset.
- The recipe actually uses 18px (4.5) padding — the reason Park UI added a 4.5 step to
  spacing, which Tailwind does not have, shows up at the component layer.

### Inputs (recipe `input`)

| | 2xs | xs | sm | md | lg | xl | 2xl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **height** | 28px | 32px | 36px | **40px** | 44px | 48px | 64px |
| inline padding | 6px | 8px | 10px | 12px | 14px | 16px | 18px |

- The same 4px staircase and the same md 40px alignment as buttons, but **inputs get an
  extra 2xs (28px)** and thinner inline padding at the same size (md: 12 vs 16px).
- Border 1px; on focus the border colour changes and **a 1px box-shadow in the same colour
  is layered over it** so it reads as 2px thick. Radius is `l2`, as on buttons.

### The `l1/l2/l3` radius semantic layer — the preset option slides a window

```
with radius option "md":  l1=sm(4px)  l2=md(6px)  l3=lg(8px)
with radius option "xl":  l1=lg(8px)  l2=xl(12px) l3=2xl(16px)
```

- Components never reach for a raw radius; they use only the three layers
  **l1 (small) · l2 (controls) · l3 (containers)**. The preset's radius option is a
  **window that slides those three layers ±1 notch** along the raw scale
  (2xs 1px – 3xl 24px). One layer more than Skeleton's base/container pair, and coupled
  to the theme axis.

### Dialog and drawer (slot recipe)

| | dialog | drawer |
|---|---|---|
| width | min-width **384px** (`sizes.sm`) | 384px (100vw on mobile) |
| radius | `l3` | — (full height) |
| scrim | **blur(4px)** + light `white.a10` / dark `black.a10` | same |
| enter | translateY 64px→0 + fade, **400ms** `emphasized-in` | translateX 100%→0, 400ms |
| exit | **200ms** `emphasized-out` | 200ms |

- **400ms in / 200ms out — a 2:1 asymmetry** defined as animation tokens
  (`animations.dialog-in/out`), a wider gap than MUI's 225/195.
- **The scrim is white in light mode** (white alpha 10) — a departure from the black-scrim
  majority, and it comes with a 4px background blur.
- Dialog titles are semibold 18px, body 14px. The drawer pins header/body/footer to
  CSS grid areas.

### Motion tokens — the easings are Material 3 curves

| token | value | match |
|------|-----|------|
| `default` | `cubic-bezier(0.2, 0, 0, 1.0)` | **M3 standard** |
| `emphasized-in` | `(0.05, 0.7, 0.1, 1.0)` | **M3 emphasized-decelerate** |
| `emphasized-out` | `(0.3, 0.0, 0.8, 0.15)` | **M3 emphasized-accelerate** |
| durations | 7 steps, 50–500ms (`fastest`–`slowest`) | |

- **Colour from Radix, primitives from Ark UI (Zag), motion from Material 3** — the
  hybrid structure, split lineage by lineage across layers, is confirmed. Unlike Backpack
  (untokenised drift), this one **formally admits the M3 curves as tokens**.

### Characteristic decisions (from the deep pass)

- **Button minW = height** — a square floor, unique in the sample
- **Three radius layers (l1/l2/l3) as a sliding window** — a theme parameter moves the
  whole semantic layer
- **400/200ms 2:1 asymmetric** enter/exit animation tokens
- **A white scrim in light mode, plus blur** — the scrim-colour inversion in the sample
- **M3 easings formally admitted as tokens** — the third layer of the lineage mix
- outline, ghost and subtle default to gray — the accent applies by default only to solid

## Characteristic decisions

- **1,092 theme combinations** (26 accents × 6 grays × 7 radii) — second in scale to Radix
- **The Radix Colors palette adopted verbatim** — a case of colour-palette inheritance
- **Radius as a theme parameter** (a choice, not a value) — the same call Radix Themes made
- A Panda CSS preset shipped alongside Ark UI primitives — a three-layer dependency
  (Park UI → Panda CSS + Ark UI + Radix Colors)

## Accessibility

Unverified (it rests on the accessibility of the Ark UI primitives — not checked).

## References

- Tokens: `npm pack @park-ui/panda-preset@0.43.1`
- Primitives: `@ark-ui/react@5.38.1` (Vue and Solid versions exist)
- Components in depth: the recipe and token definitions in `dist/index.js` of the same
  package + `dist/chunk-LS3ONKWL.js` (createRadii) (2026-08-18)
- **Open questions:** ~~the spacing and type scales (whether they inherit Panda CSS's
  defaults)~~ ~~the component list~~ (resolved 2026-08-18 — spacing, type, radius and
  easing are all **defined by the preset itself**, extending `@pandacss/preset-base`;
  spacing is Tailwind-compatible plus 0.5–4.5 half-steps, fonts run 2xs 8px – 9xl 128px;
  57 recipes), the licensing and attribution relative to Radix Colors, and confirmation
  that all three `createPreset` options are required (no defaults)
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — `park-ui.com/docs/figma` → `figma.com/community/file/1268615283036362769`
