---
name: Mantine
org: Mantine (open source)
coverage: partial
url: https://mantine.dev
repo: https://github.com/mantinedev/mantine
license: MIT
tech: [React]
figma_kit: false
tokens_format: [CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "npm @mantine/core@9.5.1 → styles.css, styles/*.css (101 component style files)"
---
<!-- lang-links -->
> **English** · [한국어](mantine.ko.md)
<!-- /lang-links -->

## In one line

A React component library. It adjusts the whole UI's density through a
**`--mantine-scale` multiplier variable**, and manages **component dimensions bound to
size names (xs–xl)**.

## Tokens

### The multiplier variable — every dimension is a `calc()`

```css
--mantine-scale: 1;
--mantine-spacing-md: calc(1rem * var(--mantine-scale));
--mantine-radius-md: calc(0.5rem * var(--mantine-scale));
--mantine-font-size-md: calc(1rem * var(--mantine-scale));
```

**Spacing, radii and font sizes all multiply by the same factor.** Unlike Vapor UI, which
separates the dimension and radius multipliers, Mantine has **one**.

Systems using the same approach:

| System | Multiplier variables | Count |
|--------|----------------------|:---:|
| Vapor UI | `--vapor-scale-factor` · `--vapor-radius-factor` | 2 |
| **Mantine** | **`--mantine-scale`** | **1** |
| Radix Themes | `--scaling` · `--radius-factor` | 2 |
| shadcn/ui | `--radius` (a base-value approach) | 1 (radius only) |

### Spacing — five steps, name-based

| Token | rem | px (at scale 1) |
|-------|:---:|:---:|
| `xs` | 0.625rem | **10** |
| `sm` | 0.75rem | 12 |
| `md` | 1rem | 16 |
| `lg` | 1.25rem | 20 |
| `xl` | 2rem | 32 |

**There are only five steps.** Most of the sample has 8–14 (`tokens/scales.md`).

**There is no 4 or 8px.** `xs` starts at 10px — where the corpus confirmed `4/8/16/24` as
universal (17 of 17), Mantine skips both 4 and 8. There is no `24` either — 20 is followed
by 32.

The increments: **+2 / +4 / +4 / +12.** The last interval opens up sharply.

### Radii — pure doubling

| Token | rem | px |
|-------|:---:|:---:|
| `xs` | 0.125rem | 2 |
| `sm` | 0.25rem | 4 |
| `md` | 0.5rem | 8 |
| `lg` | 1rem | 16 |
| `xl` | 2rem | 32 |

**2 → 4 → 8 → 16 → 32. Exactly doubling.**
`--mantine-radius-default` points at `md` (8px).

Mantine is the only sample whose radii are a pure geometric series — the rest fill in
intermediate values like 2/4/6/8/12/16.

### Typography

Five body sizes:

| Token | rem | px | Line height |
|-------|:---:|:---:|:---:|
| `xs` | 0.75rem | 12 | 1.4 |
| `sm` | 0.875rem | 14 | 1.45 |
| `md` | 1rem | 16 | 1.55 |
| `lg` | 1.125rem | 18 | 1.6 |
| `xl` | 1.25rem | 20 | 1.65 |

**The line height differs per size** — tighter when small (1.4), looser when large (1.65).

**The direction is the reverse of convention.** Apple and Material 3 reduce the line-height
ratio as type grows (Apple Large Title 34→41 = 1.21, Caption 2 11→13 = 1.18, though Body
17→22 = 1.29). Mantine increases the ratio as type grows. `--mantine-line-height` defaults
to 1.55, the same as `md`.

Six heading steps — **all at weight 700**:

| Token | rem | px | Line height | Weight |
|-------|:---:|:---:|:---:|:---:|
| `h1` | 2.125rem | 34 | 1.3 | 700 |
| `h2` | 1.625rem | 26 | 1.35 | 700 |
| `h3` | 1.375rem | 22 | 1.4 | 700 |
| `h4` | 1.125rem | 18 | 1.45 | 700 |
| `h5` | 1rem | 16 | 1.5 | 700 |
| `h6` | 0.875rem | 14 | 1.5 | 700 |

**Heading line heights are likewise tighter when smaller** (1.3 → 1.5). The same direction
as the body.

Size increments: 34 → 26 → 22 → 18 → 16 → 14. Narrowing by **−8 / −4 / −4 / −2 / −2**.

`h4` (18), `h5` (16) and `h6` (14) hold the same values as body `lg`, `md` and `sm` —
differing only in weight and line height. The same structure as Atlassian's
`font.heading.xsmall` (14px) sharing a size with `font.body.[default]` (14px).

There are no tracking tokens.

### Colour — 14 hues × 10 steps

```
blue · cyan · dark · grape · gray · green · indigo
lime · orange · pink · red · teal · violet · yellow
```

The steps run `0` to `9`, **ten of them** (Tailwind and Radix have 11–12).
140 primitive colours plus derived tokens come to **270 in total**.

**`dark` is a hue family.** Separate from `gray`, there is
`--mantine-color-dark-0..9` — dark-mode surface colours kept as a hue ramp.

Derived tokens — every hue has state and purpose variants:

| Suffix | Purpose |
|--------|---------|
| `-filled` | filled background |
| `-filled-hover` | filled hover |
| `-light` | light background |
| `-light-hover` | light background hover |
| `-light-color` | text on a light background |
| `-outline` · `-outline-hover` | outlined variants |

The same family as **Orbit putting state inside colour names** (`normalHover` and so on)
(`patterns/color.md`). Mantine adds **the variant (filled / light / outline)** on top.

A `--mantine-primary-color-*` alias family exists, defaulting to `blue` —
`--mantine-primary-color-6: var(--mantine-color-blue-6)`. **The primary colour is swapped
in one place.**

### Breakpoints — in `em`

| Token | Value | px (at 16px) |
|-------|:---:|:---:|
| `xs` | 36em | 576 |
| `sm` | 48em | 768 |
| `md` | 62em | 992 |
| `lg` | 75em | 1200 |
| `xl` | 88em | 1408 |

**They are `em`.** Tailwind uses `rem` and most others px. In a media query `em` and `rem`
behave identically against the root font size, but the unit differs when read as a token
value.

`62em` (992) · `75em` (1200) · `88em` (1408) — **landing on integer px with no fractions.**

### Shadows

Five steps, `xs` · `sm` · `md` · `lg` · `xl`. Compound values, not subject to the scale
multiplier.

## Component dimensions — the size name determines the height

Button, Input and Section share **one height scale**.

| Size | Height |
|------|:---:|
| `xs` | 30px |
| **`sm`** | **36px** |
| `md` | 42px |
| `lg` | 50px |
| `xl` | 60px |

**The default is `sm` (36px)** — not `md`.
`--button-height: var(--button-height-sm)`.

Increments: **+6 / +6 / +8 / +10.** Opening up toward the top.

**Button and Input have entirely identical height scales.** Placing the two side by side in
a form aligns them through the same `size` value.

The input's line height is computed from its height:

```css
--input-line-height: calc(var(--input-height) - calc(0.125rem * var(--mantine-scale)));
```

**It uses the height minus 2px as the line height** — 1px top and bottom for the border.

## Components

**101 of them** by style file. They are split into per-component CSS under `styles/`
(`Button.css` · `NumberInput.css` · `Cascader.css` · `EmptyState.layer.css` and so on).

Files with a `.layer.css` suffix go into a CSS `@layer`.

## Notable decisions

- **One multiplier variable adjusts spacing, radii and font sizes together.** Unlike Vapor
  UI and Radix Themes, which separate the radius.
- **Spacing has only five steps and no 4, 8 or 24px.** It is `10/12/16/20/32`. Of the
  `4/8/16/24` the corpus confirmed as universal, only 16 is present.
- **The radii are a pure doubling series** (2/4/8/16/32). Unique in the sample.
- **The line height grows with the type size** (1.4 → 1.65). The reverse direction from
  Apple and Material.
- **All six heading steps are weight 700.** The same structure as Pajamas being uniformly
  600, at a different value.
- **`dark` is kept as a hue family.** A ten-step ramp separate from `gray`.
- **The default component size is `sm`.** `md` is the middle value but not the default.
- **Button and Input share a height scale** (30/36/42/50/60).
- **The breakpoints are `em`.**
- **The input's line height is back-computed from its height** (`height − 2px`).

## Accessibility

No stated WCAG target was found in the tokens or CSS. The `-light-color` token keeps a
separate text colour for light backgrounds, but no contrast-ratio target is written in the
source.

## Notes

- Documentation: https://mantine.dev
- Repository: https://github.com/mantinedev/mantine
- Tokens: `npm pack @mantine/core@9.5.1` → `package/styles.css`
- Component styles: `package/styles/*.css`
- **Still to confirm:** the dark-mode token mapping rules, real shadow values, and any
  additional tokens in subpackages beyond `@mantine/hooks`
- **Figma kit confirmed (2026-08-18):** `figma_kit: false` — **it states the absence
  explicitly** — `mantine.dev/getting-started`: "Design is not a part of the development
  process – there are no official Figma or Sketch design files." Community kits exist in
  number, but it pins down that the team does not maintain them. **The only sample to put
  the absence in writing.**
