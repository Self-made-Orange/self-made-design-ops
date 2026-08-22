---
name: Grommet
org: HPE (Hewlett Packard Enterprise)
coverage: partial
url: https://v2.grommet.io
repo: https://github.com/grommet/grommet
license: Apache-2.0
tech: [React, styled-components]
figma_kit: unverified
tokens_format: [JS]
a11y_target: "WCAG 2.1 (no level stated — confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm grommet@2.56.1 → es6/themes/base.js (the generate function) · the dataTable, sidebar, tab, menu and notification tokens in themes/base.js (tables, navigation and feedback measured, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](grommet.ko.md)
<!-- /lang-links -->

## In one line

HPE's system — **the entire theme is generated from a single number
(`baseSpacing: 24`)**, the default body is **18px, the largest in the sample**, and
**the maximum measure is computed as font size × 24** (with a source comment citing
UX StackExchange).

## Tokens — a single `generate(baseSpacing, scale)`

```js
generate(baseSpacing = 24, scale = 6)
baseFontSize = 24 × 0.75        // 18px
fontScale    = 24 / 6           // 4
size         = 18 + factor × 4  // 4px per step
height       = 24 + factor × 4  // line height
maxWidth     = 24 × size        // the maximum measure
```

**Spacing, borders, type, line height and measure all come out of the single 24** —
the widest derivation range among the seed-derived family (Ant, Tailwind, SmartHR).

### Spacing (edgeSize) — derived by division

```
none 0 · hair 1px · xxsmall 2 · xsmall 24/8=3 · small 24/4=6
medium 24/2=12 · large 24 · xlarge 48
```

> **Correction (2026-08-18).** The table above holds the values of the
> **`breakpoints.small` (≤768px) override.** Running `base.js` confirms that the
> **default (desktop) scale** is one step larger throughout:
> `xxsmall 3 · xsmall 6 · small 12 · medium 24 · large 48 · xlarge 96`.
> Below 768px the whole edgeSize, borderSize and size scale is swapped for the halved
> family (a mobile density switch — the same names, halved values). The observation that
> the grid consists of divisors of 24 stands.

- **3px · 6px · 12px** — not a 4px grid but **a grid of divisors of 24.**
  After Garden (multipliers 1 · 2 · 3 · 5 …), the second system to miss the 4/8/16 core
  entirely
- `hair` (1px) — a hairline name Charcoal also has
- Borders work the same way: 1 · 2 · 24/6=4 · 24/2=12 · 24

### Type — an 18px body, the largest in the sample

- **An 18px default** — above the sample's body-default axis (13 · 14 · 15 · 16 · 17).
  The steps are 18 + factor × 4, arithmetic
- **The maximum measure is a token** — `maxWidth = 24 × fontSize`
  (432px at an 18px body). The source comment: "~50 characters wide,
  see ux.stackexchange.com/a/34125" — **the only sample with the rationale linked in the
  code.** The second measure data point after Charcoal (nine fixed paragraph-width tokens),
  and where Charcoal enumerates, Grommet computes

## Components

Included in the same package — **about 95** under `components/` (Box, Layer, DataTable,
Chart, Diagram, WorldMap and other visualisations). Event themes such as
`hacktoberfest2022` ship alongside in the theme files.

## Components in depth — (2026-08-18)

`themes/base.js` of `grommet@2.56.0` was **actually executed in node** to dump the theme
object (after installing peer dependencies such as `grommet-icons` and `styled-components`),
and compared against the style formulas in `components/Button/StyledButton.js` and
`components/Layer/StyledLayer.js`.

### Buttons — no fixed height; they use the text scale directly

`fontStyle()` in `StyledButton.js` **references `theme.text[size]` directly** — there is no
button-specific typography; it shares the body type scale.

| | small | medium (default) | large |
|---|:--:|:--:|:--:|
| type/line height (shared with `text`) | 14/20px | **18/24px** | 22/28px |
| block padding | 4px | 4px | 8px |
| inline padding | 20px | 22px | 32px |
| border | 2px | 2px | 2px |
| radius | 18px | 18px | **24px** |
| **derived height** | **32px** | **36px** | **48px** |

- **The radius equals half the derived height** — medium 36/2 = 18, large 48/2 = 24.
  Written as fixed values, they are **pills in effect** (small clamps, since 18 > 16).
- **The border is 2px** — parting from the 1px majority, and 2px even in the default
  (inactive) state.
- The button's body type is **18px** — the largest body value carried straight into the
  button.
- Transition 100ms `ease-in-out` (across colour, background, border and shadow) ·
  disabled **opacity 0.3**.
- No minimum width (only the skeleton variant sets a min of 100px).

### Inputs — the border subtraction is written into the padding formula in code

```js
// base.js
input.padding = baseSpacing/2 − controlBorderWidth  // 12 − 1 = 11px
```

| | value |
|---|---|
| padding | **11px** all round (= the 12 − 1px border formula) |
| border / radius | `global.control`: 1px / **4px** |
| type | shared with the text scale (18/24px by default) · **weight 600** |
| **derived height** | 24 + 22 + 2 = **48px** |

- **The input's value type is semibold (600)** — where most systems use 400.
- **The button's radius (18px) and the input's (4px) live in different tiers** — the button's
  in `button.size[*].border.radius`, the input's in `global.control.border.radius`.
- The label (FormField) is a separate block — margins of `xsmall` (6px) vertically and
  `small` (12px) horizontally, with the field border on **the bottom only**
  (`position: inner, side: bottom` — an underline form).

### Layer (the modal) — no width steps

| | value |
|---|---|
| width | **no steps — the content's size** (controlled only through `full`, `margin` and position) |
| radius | 4px (`layer.border.radius`) |
| overlay | rgba(0,0,0,0.5) |
| enter | centred: **scale 0.8→1** · edge-anchored: a slide (eight keyframe sets, one per position) |
| duration / easing | **200ms ease-in-out forwards** — `animationDuration = 200`, **a hardcoded constant** |
| responsive | full-screen at or below `responsiveBreakpoint: small` (768px) |

- A sample with no modal width scale at all — a third axis again, beside Cloudscape's five
  steps and MUI's reused breakpoints. If you need a width, you set `width` yourself.
- The duration is a JS constant outside the theme, so **it cannot be changed through the
  theme** — in a system where everything derives from the seed, motion alone sits outside the
  derivation.

### Further confirmation of seed derivation — breakpoints and dark mode

- **The breakpoints derive from the seed too**: small = 24×32 = **768** ·
  medium = 24×64 = **1536**. The "widest derivation range in the sample" observation extends
  to responsiveness.
- **Dark mode is not a theme file but a pair inside each colour token** —
  `text: {dark:'#f8f8f8', light:'#444444'}`, a `{dark, light}` object per colour.
  Which applies depends on the background context (Box's `dark` prop). A
  **pair-in-token** approach, distinct from the theme-swapping camp (Clarity and others).
- The focus colour is a single **#6FFFB0** (a fluorescent mint) — a high-visibility colour
  unrelated to the brand purple (#7D4CDB).

### Tables (`dataTable`) — only t-shirt names, not values

`themes/base.js` of `grommet@2.56.0`. The table tokens are **entirely references to scale
names.**

| item | value |
|---|---|
| container gap | `gap: 'xsmall'` = **6px** |
| sort icon gap | `sort.gap: 'xsmall'` = 6px |
| column resize | border `color: 'border'`, `side: 'end'` · vertical padding `xsmall` (6px) |
| expand toggle | `expand.size: 'xxsmall'` = 3px |
| group end rule | `border.side: 'bottom'` |
| pinned header and footer | background `opacity: 'strong'` |
| header primary column | `weight: 'bold'` |
| search field | left padding `small` (12px) |

- **There are no cell-padding or row-height tokens.** Table cells simply use `Box`'s pad
  rules, so the values do not exist in the table token tier — the "do not fix the height"
  attitude seen in buttons and inputs continues into the table.
- **Pinned headers and footers are handled with `opacity: 'strong'` rather than a colour** —
  raising the background's opacity so the rows beneath do not show through, and the only case
  in the collected sample of specifying a pinned area through opacity.
- Column selection and reordering UI (`dataTableColumns`) has its own token group — tab
  padding `small` (12px), a selection list with `small` vertical padding and `xsmall` (6px)
  gaps.

### Navigation (`sidebar` · `tab` · `menu`)

| item | value |
|---|---|
| Sidebar | `gap: 'large'` (**48px**) · `pad: 'small'` (**12px**) — **no width token** |
| Tab active indicator | `border.side: 'bottom'`, `size: 'small'` = **2px** |
| Tab colours | default `control`, active `text`, hover black/white |
| Tab gap | `gap: 'small'` = 12px |
| Menu group | vertical padding `xsmall` (6px) · separator `size: 'xsmall'` (the 1px family) |
| Menu separator padding | horizontal `small` (12px) |
| skipLinks | position `top` · radius `small` · padding `medium` (24px) |

- **The sidebar has no width value** — the only case among the ten navigation samples
  collected that does not set one (the rest run 200–280px). It delegates to `Box`'s width
  rules.
- **The tab hover colour is stated as black in light and white in dark**
  (`{dark: 'white', light: 'black'}`) — and the active border colour is the same pair.
- A sample that makes skip links (`skipLinks`) a theme token.

### Feedback (`notification`)

| item | value |
|---|---|
| **Toast width** | `container.width: 'medium'` = **384px** |
| **Toast duration** | **8000ms** (`notification.toast.time`) |
| Toast position and margin | `layer.position: 'top'` · `margin: 'medium'` (24px) · elevation medium |
| Inline container | radius `xsmall` · padding horizontal `small` (12px) / vertical `xsmall` (6px) |
| **Global banner** | radius **`none`** · padding horizontal `large` (**48px**) / vertical `xsmall` (6px) |
| Gap between parts | `gap: 'small'` (12px) · icon right `small` · text gap `medium` (24px) |
| Title | `weight: 'bold'` |
| Actions | right margin `xsmall` (6px) |

- **8000ms is the longest duration among the code-layer samples collected**
  (Naive and Ant message 3000 · Sonner 4000 · Ant notification 4500 · Blueprint 5000).
  The same value Atlassian specifies at the documentation layer, eight seconds.
- **The three forms — inline, global and toast — differ only in their container
  specification.** The content structure (icon, title, body, actions) is shared, and only
  `container` (radius and padding) and `layer` branch. The global banner presupposes filling
  the screen width, with **radius 0 and 48px on each side.**
- Per-state icons are enumerated as `critical`, `warning`, `normal`, `unknown` and so on,
  each a pair of an icon component and a background colour.

### Characteristic decisions (from the deep pass)

- **The button's type = the body text scale as-is** (18px) — no button-specific typography
- **A radius equal to half the derived height, so pills in effect**, plus a 2px border
- **A border subtraction in the input's padding formula** (12−1) — the same technique as MUI
  and Codex, expressed as a formula
- **A weight of 600 for input values**
- **No modal width steps**, with the 200ms duration as a constant outside the theme
- **Below 768px, the whole spacing, border and size scale is swapped for halved values**

## Characteristic decisions

- **A single seed (24) deriving spacing, borders, type, line height and measure** — the
  widest derivation range in the sample
- **An 18px body** — the largest default size in the sample
- **A measure = font size × 24 formula** with the rationale linked in a comment — unique in
  the sample
- Spacing on a grid of divisors of 24 (3/6/12) — the second case of departing from the core
  values
- `generate()` is public — a user can change the seed and regenerate the whole theme

## Accessibility

~~Unverified.~~ → **WCAG 2.1 (resolved 2026-08-18 — with no level stated).**
Source: `v2.grommet.io/accessibility` — "grommet provides support for W3c's WCAG 2.1 spec".

## References

- **2.56.1 re-verified — recorded values unchanged (2026-08-18).** Every token section this
  entry records (`dataTable`, `sidebar`, `tab`, `menu`, `notification`) was compared section
  by section and confirmed **identical.** Two things changed — **a new `dateTimeInput`
  component token** and **the insertion of SPDX headers**
  (`SPDX-License-Identifier: Apache-2.0` — the licence has begun to be stated in file
  headers).

- Tokens: `npm pack grommet@2.56.0` → `es6/themes/base.js`
- Components in depth: `themes/base.js` from the same package, executed, plus
  `components/Button/StyledButton.js` and `components/Layer/StyledLayer.js` (2026-08-18)
- **Open questions:** ~~the colour palette structure~~ ~~the component list~~
  ~~dark mode~~ (resolved 2026-08-18 — the deep pass: colours are `{dark, light}` pairs,
  with the full palette values not enumerated; about 95 components; dark handled as
  pairs inside the tokens), and the relationship to the HPE-specific theme
  (`grommet-theme-hpe`)
