---
name: Chakra UI
org: Chakra UI (open source)
coverage: partial
url: https://chakra-ui.com
repo: https://github.com/chakra-ui/chakra-ui
license: MIT
tech: [React]
figma_kit: unverified
tokens_format: [JS]
a11y_target: unverified
platform: web
domain: framework
verified: 2026-08-18
source: "npm @chakra-ui/react@3.36.1 → dist/esm/theme/tokens/*.js (18 files) · dist/esm/theme/recipes/{table,tabs,alert,toast,badge}.js + layer-styles.js (tables, navigation and feedback measured, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](chakra-ui.ko.md)
<!-- /lang-links -->

## In one line

A React component library. **Its 18 token families are the widest in the sample**, and it
makes `z-index`, `cursor` and `aspect-ratio` first-class tokens.

## Tokens — 18 families

```
animations · aspect-ratios · blurs · borders · colors · cursor · durations ·
easings · font-sizes · font-weights · fonts · keyframes · letter-spacing ·
line-heights · radius · sizes · spacing · z-indices
```

**Each family gets its own file, in the form `defineTokens.<family>()`.**

### z-index — the most detailed in the sample

| token | value |
|------|:---:|
| `hide` | **-1** |
| `base` | 0 |
| `docked` | 10 |
| `dropdown` | 1000 |
| `sticky` | 1100 |
| `banner` | 1200 |
| `overlay` | 1300 |
| `modal` | 1400 |
| `popover` | 1500 |
| **`skipNav`** | **1600** |
| `toast` | 1700 |
| `tooltip` | 1800 |
| `max` | **2147483647** |

**Thirteen steps, all named by role.** From `dropdown` 1000 to `tooltip` 1800 they step in
hundreds.

**`hide: -1` and `skipNav: 1600` stand out.** `skipNav` is the "skip to content" link for
screen readers, and it sits **below toast and tooltip but above popover.**

`max` is `2147483647` (int32's maximum) — exactly the same value as Open Props's
`--layer-important`.

### cursor — the values diverge from Radix Themes

| token | Chakra UI | Radix Themes |
|------|:---:|:---:|
| **`button`** | **`pointer`** | **`default`** |
| **`switch`** | **`pointer`** | **`default`** |
| `checkbox` | `default` | `default` |
| `radio` | `default` | `default` |
| `option` / `menuitem` | `default` | `default` (`menu-item`) |
| `slider` | `default` | `default` |
| `disabled` | `not-allowed` | `not-allowed` |

**Buttons and switches are squarely opposed.** Chakra uses `pointer` and Radix Themes
`default`. The other six agree.

Radix Themes has `--cursor-link: pointer`, while **Chakra has no link token** — the button is
`pointer` instead. The two systems diverge on "how far the pointing-hand cursor goes".

`slider-thumb` exists only in Radix Themes (`slider-thumb` · `slider-thumb-active`).

### Spacing — 34 steps

```
2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 ·
52 · 56 · 60 · 64 · 72 · 80 · 96 · 112 · 128 · 144 · 160 · 176 · 192 · 208 ·
224 · 240 · 256 · 288 · 320 · 384
```

**The key is `rem × 4`** — `4` is `1rem` (16px) and `0.5` is `0.125rem` (2px).
**There are fractional keys** (`0.5` · `1.5` · `2.5` · `3.5` · `4.5`).

In the "names for 16px" table in `tokens/scales.md`, **Chakra's is `4`** — the same as
Tailwind's `p-4`, and coincidentally the same as Radix Themes's `--space-4` (16px, the fourth
step).

**The 2–20px range runs ten even 2px steps** (the same density as Base Web and Canvas).
Above 20px it steps by 4, and above 64px it becomes irregular.

The core `4/8/16/24` and `32` are all present.

### Radius — `2xs` is 1px

| token | value | px |
|------|:---:|:---:|
| `none` | 0 | 0 |
| **`2xs`** | **0.0625rem** | **1** |
| `xs` | 0.125rem | 2 |
| `sm` | 0.25rem | 4 |
| `md` | 0.375rem | 6 |
| `lg` | 0.5rem | 8 |
| `xl` | 0.75rem | 12 |
| `2xl` | 1rem | 16 |
| `3xl` | 1.5rem | 24 |
| `4xl` | 2rem | 32 |
| `full` | 9999px | — |

**Chakra is the only system in the sample with a 1px radius.** Spectrum divides 3–10px at 1px
but has no 1px itself.

`xs` through `4xl` match Tailwind's values exactly (2/4/6/8/12/16/24/32) —
**Chakra has added one more, `2xs` (1px), at the front.**

### Borders — a composite shorthand

| token | value |
|------|-----|
| `xs` | **`0.5px solid`** |
| `sm` | `1px solid` |
| `md` | `2px solid` |
| `lg` | `4px solid` |
| `xl` | `8px solid` |

**The value is not a thickness but the whole `border` shorthand** (including `solid`),
unlike Atlassian's `border.width`, which holds thickness alone.

**`xs` is a sub-pixel 0.5px** — the second case after Polaris's `0.66px`.
Reaching `8px`, it is also the thickest in the sample (Primer and Spectrum stop at 4px).

### Typography

Fourteen sizes — `2xs` 0.625rem (10) · `xs` 12 · `sm` 14 · `md` 16 · `lg` 18 · `xl` 20 ·
`2xl` 24 · `3xl` 30 · `4xl` 36 · `5xl` 48 · `6xl` 60 · `7xl` 72 · `8xl` 96 · `9xl` 128.

**The 13 steps `xs` through `9xl` match Tailwind exactly.** Chakra has added `2xs` (10px).

The five line heights **have different names.**

| Chakra | value | the Tailwind equivalent |
|--------|:---:|------|
| `shorter` | 1.25 | `tight` |
| `short` | 1.375 | `snug` |
| **`moderate`** | 1.5 | `normal` |
| `tall` | 1.625 | `relaxed` |
| `taller` | 2 | `loose` |

**All five values match Tailwind's; only the names differ.**
Chakra uses comparatives (`shorter`/`short`/`tall`/`taller`) where Tailwind uses adjectives.

**Chakra's middle value is named `moderate`**, not `normal` — avoiding the implication of
"the default".

Five tracking steps — `tighter` −0.05em · `tight` −0.025em · `wide` 0.025em ·
`wider` 0.05em · `widest` 0.1em. **The values match Tailwind's, but there is no `normal`
(0em).**

Nine weights (100–900) — identical to Tailwind's.

### Colour — 10 hues × steps

`gray` · `red` · `orange` · `yellow` · `green` · `teal` · `blue` · `cyan` ·
`purple` · `pink` — **ten hues**, in 136 token declarations.

**Far fewer than Tailwind (26 hues) or Radix Themes (33).**
There are no achromatic variants such as `slate`, `zinc` or `stone` — just the one `gray`.

### Motion

| family | values |
|------|-----|
| **`durations`** | `fastest` 50 · `faster` 100 · `fast` 150 · `moderate` 200 · `slow` 300 · `slower` 400 · `slowest` 500ms |
| **`easings`** | `ease-in` · `ease-out` · `ease-in-out` plus **`ease-in-smooth`** |
| `animations` · `keyframes` | separate families |

**The seven durations are 50 · 100 · 150 · 200 · 300 · 400 · 500ms.**
After 200 it jumps to 300 rather than 250 — parting from Atlassian (250ms) and Cloudscape
(250ms).

**The names are comparatives, as with the line heights** (`fastest`–`slowest`), and the
middle value is `moderate` here too.

`ease-in-smooth` is `cubic-bezier(0.32, 0.72, 0, 1)` — an extra curve beyond the three CSS
standards.

### The other families

| family | values |
|------|-----|
| **`aspect-ratios`** | `square` 1/1 · `landscape` 4/3 · `portrait` 3/4 · `wide` 16/9 · `ultrawide` 18/5 · **`golden` 1.618/1** |
| `blurs` | 4 · 8 · 12 · 16 · 24 · 40 · 64px (seven steps) |
| **`sizes`** | the spacing scale plus **25 fractions** (`1/2` 50% · `1/3` · `1/12` … `11/12`) |

**`aspect-ratios` includes the golden ratio (1.618).** Open Props has a `--ratio-golden` too,
and **the six ratio names and values match exactly between the two systems** (including
`ultrawide` 18/5).

The seven `blurs` match Tailwind's exactly.

**`sizes` includes 25 fractions** — from `1/2` to `11/12`, a twelve-column grid expressed as
tokens.

## Components

Defined as recipe files under `theme/recipes/` — `kbd`, `color-swatch`, `tree-view` and
others are confirmed. The total was not counted.

**It uses the `recipes` concept**, based on Panda CSS's recipe system, keeping component
styles in a tier separate from the tokens.

## Components in depth — (2026-08-18)

Source: `@chakra-ui/react@3.36.1` → `dist/esm/theme/recipes/*.js`.
**There are 75 recipe files** (a mix of single and slot recipes).
Dimensions are recorded in px by resolving the spacing token keys (rem × 4).

### Buttons — seven steps, with min-width = height

| | 2xs | xs | sm | md (default) | lg | xl | 2xl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| height | 24 | 32 | 36 | **40** | 44 | 48 | 64px |
| min-width | 24 | 32 | 36 | 40 | 44 | 48 | 64px |
| inline padding | 8 | 10 | 14 | 16 | 20 | 20 | 28px |
| type | 12 | 12 | 14 | 14 | 16 | 16 | 18px |

- **`minW` equals the height** — however short the text, it never goes narrower than a square
  (Blueprint makes the same call — `min-width: $height`).
- **Seven steps** (2xs–2xl) — far wider than the three of Garden, Bootstrap and Blueprint
  (whether it is the most in the whole sample was not checked).
- **`lg` and `xl` share the same 20px inline padding** — only the height opens up by 4px.
- The radius is the semantic `l2` — from the **three tiers `l1`/`l2`/`l3`**
  (= `xs` 2px / `sm` 4px / `md` 6px) in `semantic-tokens/radii.js`.
  The real value is **4px**. Rather than using a raw radius directly, it wraps it once in a
  tier name.
- Border 1px (on every variant), weight `medium` (500), a fixed line height of 1.2, and a
  transition of `moderate` = **200ms**.

### Inputs — sharing heights with the button, differing only at the smallest

The height goes out as a `--input-height` CSS variable, referencing `sizes.N`.

| | 2xs | xs | sm | md (default) | lg | xl | 2xl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| height | **28** | 32 | 36 | **40** | 44 | 48 | 64px |
| inline padding | 8 | 8 | 10 | **12** | 16 | 18 | 20px |

- **Only `2xs` diverges** — the button is 24px, the input 28px. The other six heights are
  identical.
- **At the same `md`, the button's inline padding is 16px and the input's 12px** — heights
  shared, padding separate.
- Three variants: `outline` (the default) · `subtle` · `flushed`. **`flushed` leaves only an
  underline, with radius 0 and no padding.**
- The radius is the same `l2` (4px) as the button's.

### Dialogs — five widths plus cover/full, with the names off by one step

| size | maxW token | px |
|:---:|:---:|:---:|
| xs | `sm` (24rem) | 384 |
| sm | `md` (28rem) | 448 |
| md (default) | `lg` (32rem) | **512** |
| lg | `2xl` (42rem) | 672 |
| xl | `4xl` (56rem) | 896 |
| cover / full | — | full-bleed |

- **The dialog's size names are off from the `sizes` token names by exactly one step**
  (an `md` dialog uses the `lg` token) — the price of making component size names independent
  of token names.
- **The z-index is `popover` (1500), not `modal` (1400)** —
  `--dialog-z-index: zIndex.popover` plus a `--layer-index` addend, so **nested dialogs are
  handled by variable arithmetic.** It keeps 13 tokens and does not use its own `modal` tier.
- **The default placement is `top`, not `center`** — with `spacing.16` = 64px of block margin.
- Padding: 24px inline throughout. The header takes 24 above and 16 below, the body 8 above
  and 24 below, and the footer 8 above and 16 below. Radius `l3` = 6px. The title is 18px
  semibold.
- The backdrop is `blackAlpha.500` = **`rgba(0, 0, 0, 0.36)`** — lighter than Bootstrap's
  (0.5) or Blueprint's (0.7).

The animation (with the default `motionPreset: scale`):

| | open | close |
|---|---|---|
| content | `scale-in` (0.95→1) + `fade-in`, **200ms** | `scale-out` + `fade-out`, **100ms** |
| backdrop | `fade-in` 300ms | `fade-out` 200ms |

- **Closing takes half of opening** (200/100ms), and the backdrop is slower than the content
  (300ms).
- **No easing is specified** — it falls back to the browser's default `ease`.
  Only the drawer specifies `ease-in-smooth` (`cubic-bezier(0.32, 0.72, 0, 1)`), at
  **500ms opening / 400ms closing**, the slowest in the sample.

### Tables (`recipes/table.js`) — `tabular-nums` by default on the root

`dist/esm/theme/recipes/table.js` of `@chakra-ui/react@3.36.1`.

| size | header cell padding | body cell padding | type |
|:---:|:--:|:--:|:--:|
| sm | 8 / 8px (`px-2 py-2`) | 8 / 8px | `sm` |
| **md (default)** | **12 / 12px** | **12 / 12px** | `sm` |
| lg | **16 / 12px** | 16 / 12px | `md` |

- **`root` unconditionally carries `fontVariantNumeric: "lining-nums tabular-nums"`.**
  It is the default rather than an option — unlike Mantine, which requires a
  `data-tabular-nums` attribute to switch on. The badge recipe carries
  `fontVariantNumeric: "tabular-nums"` too.
- The sticky header is **`top: var(--table-sticky-offset, 0)` with `z-index: 1`.**
  Keeping the offset in a variable matches shadcn/ui and Mantine, and even the variable name
  is nearly Mantine's (`--table-sticky-header-offset`).
- There are **two variants, `line` (the default) and `outline`** — `line` gives cells a 1px
  bottom border, while `outline` gives a `box-shadow: 0 0 0 1px {colors.border}` ring plus a
  `bg.muted` header background.
- Striping is `&:nth-of-type(odd) td { bg: bg.muted }`, and **hover appears only when the
  `interactive` variant is switched on** (`colorPalette.subtle`) — a case where hover is not
  the default.
- Column rules appear only in the `showColumnBorder` variant (`:not(:last-of-type)`, 1px).
- A selected row is `_selected: { bg: colorPalette.subtle }` — **the same colour as hover.**

### Navigation (`recipes/tabs.js`)

| size | tab height (`--tabs-height`) | trigger padding | content padding |
|:---:|:--:|:--:|:--:|
| sm | **36px** (`sizes.9`) | 4 / 12px | 12px |
| **md (default)** | **40px** (`sizes.10`) | 8 / 16px | 16px |
| lg | **44px** (`sizes.11`) | 8 / 18px | 18px |

- The active indicator is **the layer style `indicator.bottom`**, at a default thickness of
  `var(--indicator-thickness, 2px)`. In the `line` variant a `-1px` offset lays it over the
  list's 1px bottom border.
- **There are four variants** — `line` (an underline) · `subtle` (a background) ·
  `enclosed` (a pill at height −4px) · `outline` (a 1px line with an offset). The most
  active-indicator variants in the collected sample.
- `enclosed` uses `minH: calc(var(--tabs-height) - 4px)` so it **insets 2px on each side
  within the container** — a pill floating over the list's background.
- Root-level `--tabs-indicator-bg` and `-shadow` (`shadows.xs`) tokens support the sliding
  indicator.

### Feedback (`recipes/alert.js` · `toast.js` · `badge.js`)

| item | value |
|---|---|
| **Alert padding** | sm 12px · **md 16px** · lg 16px (equal on all sides) |
| Alert gap | 8 / 12 / 12px · radius `l3` |
| **Alert icon** | **`width: 1em; height: 1em`** (relative to the type) |
| Alert states | info · warning · success · error plus **`neutral`**, five in all |
| Alert variants | subtle (the default) · surface · outline · solid |
| **Toast padding** | 16px block · 16px left / **24px right** (the close button's place) |
| Toast gap / icon | 12px · 20px (`boxSize: 5`) |
| **Toast transition** | `translate 400ms, scale 400ms, opacity 400ms, height 400ms, box-shadow 200ms` |
| Toast easings | enter `cubic-bezier(0.21, 1.02, 0.73, 1)` / exit `cubic-bezier(0.06, 0.71, 0.55, 1)` |
| Toast action button | 32px tall · 12px inline · a 1px border |
| **Badge height** | xs 16 · **sm 20 (default)** · md 24 · lg 28px |
| Badge padding / type | 4 / 6 / 8 / 10px · weight medium · **`tabular-nums`** |

- **The alert icon is a `1em` square** — tying the size to the type rather than to px.
  The same direction as Radix Themes (icon height = line height) by a different
  implementation, and parting from shadcn/ui (a fixed 16px with a 2px offset correction).
- **The toast transition includes `height 400ms`** — the height interpolates as the stack
  rearranges. The same axis as Atlassian's `motion.flag.reposition` (250ms), using
  **the same duration** as enter and exit.
- **On exit only `opacity` shortens, to 200ms** (translate and scale stay at 400ms).
- The state backgrounds are `orange.solid`, `green.solid` and `red.solid`, and **`info` has
  no background specified** — an info toast keeps the neutral panel colour.
- The alert has a **`neutral` state** — a case in the collected sample of a neutral state
  outside the four semantic axes.

## Characteristic decisions

- **Eighteen token families, the widest in the sample.**
- **z-index tokenised in 13 role-named steps.** `skipNav` (1600) exists specifically for an
  accessibility element, alongside `hide` (−1) and `max` (int32's maximum)
- **The cursor tokens' values are the reverse of Radix Themes's** — `button` and `switch` are
  `pointer`
- **The `2xs` radius is 1px.** Unique in the sample
- **Borders are a `1px solid` composite shorthand**, not thickness alone.
  With `xs` at 0.5px and `xl` at 8px, it spans the widest range in the sample
- **Line heights and durations are named in comparatives** (`shorter`–`taller` ·
  `fastest`–`slowest`), with `moderate` as the middle value in both, rather than `normal`
- **Most of the values match Tailwind's and only the names differ** — the eight radii, 13
  sizes, five tracking steps and seven blurs all agree.
  **Only colour differs sharply, at 10 hues against 26**
- **The golden ratio as an aspect-ratio token** (matching Open Props in name and value)
- **25 twelfths-based fractions in `sizes`**

## Accessibility

- **A dedicated `skipNav` z-index token** — Chakra is the only system in the sample with a
  tier token for an accessibility element
- `cursor.disabled: not-allowed`
- No explicit WCAG target was found in the token files

## References

- Documentation: https://chakra-ui.com
- Repository: https://github.com/chakra-ui/chakra-ui
- Tokens: `npm pack @chakra-ui/react@3.36.1` → `package/dist/esm/theme/tokens/*.js`
- Recipes: `package/dist/esm/theme/recipes/*.js`
- Components in depth: `package/dist/esm/theme/recipes/{button,input,dialog,drawer}.js` ·
  `semantic-tokens/radii.js` · `text-styles.js` (2026-08-18, @chakra-ui/react@3.36.1)
- **Open questions:** the number of colour steps, shadows, and the full values of
  `animations` and `keyframes`
  (~~the recipe count~~ → confirmed at 75; ~~whether `semanticTokens` exists~~ → a
  `semantic-tokens/` directory is confirmed, with three families: colors, radii and shadows)
