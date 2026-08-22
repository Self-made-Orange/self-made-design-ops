---
name: Spectrum
org: Adobe
coverage: full
url: https://spectrum.adobe.com
repo: https://github.com/adobe/spectrum-tokens
license: Apache-2.0
tech: [Web Components, React, CSS]
figma_kit: false
tokens_format: [JSON]
a11y_target: "Confirmed to state none (2026-08-18 — the accessibility documentation mentions WCAG only in general terms, with no version or level target)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @adobe/spectrum-tokens@15.0.0 → src/layout.json · src/typography.json · src/color-palette.json · src/semantic-color-palette.json · src/color-aliases.json"
---
<!-- lang-links -->
> **English** · [한국어](spectrum.ko.md)
<!-- /lang-links -->

## In one line

Adobe's design system across its creative products.
Its defining feature is **a structure in which every token can hold both a desktop and a
mobile value.**

## Tokens

### Spacing

| token | value |
|------|-----|
| `spacing-25` | 1px |
| `spacing-50` | 2px |
| `spacing-75` | 4px |
| `spacing-85` | 6px |
| `spacing-100` | 8px |
| `spacing-200` | 12px |
| `spacing-300` | 16px |
| `spacing-350` | 20px |
| `spacing-400` | 24px |
| `spacing-500` | 32px |
| `spacing-600` | 40px |
| `spacing-700` | 48px |
| `spacing-800` | 64px |
| `spacing-900` | 80px |
| `spacing-1000` | 96px |

The numbering is not evenly spaced — intermediate numbers such as `85` and `350` are traces
of steps inserted later.

### Radius — subdivided at 1px

| token | value |
|------|-----|
| `corner-radius-0` | 0px |
| `corner-radius-75` | 3px |
| `corner-radius-100` | 4px |
| `corner-radius-200` | 5px |
| `corner-radius-300` | 6px |
| `corner-radius-400` | 7px |
| `corner-radius-500` | 8px |
| `corner-radius-600` | 9px |
| `corner-radius-700` | 10px |
| `corner-radius-800` | 16px |
| `corner-radius-1000` | 0.5 (a ratio) |

**It provides 3px through 10px in 1px increments** — the most finely subdivided radius scale
among the systems collected.

`corner-radius-1000` is not px but `0.5` — meaning 50% of the element's size, a full circle.
A ratio in place of a large constant (9999px).

### Border widths

`border-width-100` 1px · `border-width-200` 2px · `border-width-400` 4px

Source: `@adobe/spectrum-tokens@15.0.0` → `src/layout.json`

### Typography

~~Unverified — `src/typography.json` needs checking~~ → **resolved (2026-08-18,
`@adobe/spectrum-tokens@15.0.0` → `src/typography.json` and the per-role files).**

**All 18 size steps come in desktop and mobile pairs**, the same `sets` structure as the
spacing.

| token | desktop | mobile | paired line height (desktop) | (mobile) |
|------|:---:|:---:|:---:|:---:|
| `font-size-25` | 10px | 12px | 12px | 14px |
| `font-size-50` | 11px | 13px | 14px | 16px |
| `font-size-75` | 12px | 15px | 16px | 20px |
| `font-size-100` | **14px** | **17px** | 18px | 22px |
| `font-size-200` | 16px | 19px | 20px | 24px |
| `font-size-300` | 18px | 22px | 22px | 26px |
| `font-size-400` | 20px | 24px | 24px | 28px |
| `font-size-500` | 22px | 27px | 26px | 32px |
| `font-size-600` | 25px | 31px | 30px | 36px |
| `font-size-700` | 28px | 34px | 32px | 40px |
| `font-size-800` | 32px | 39px | 36px | 44px |
| `font-size-900` | 36px | 44px | 42px | 50px |
| `font-size-1000` | 40px | 49px | 46px | 56px |
| `font-size-1100` | 45px | 55px | 52px | 64px |
| `font-size-1200` | 51px | 62px | 58px | 72px |
| `font-size-1300` | 58px | 70px | 66px | 80px |
| `font-size-1400` | 65px | 79px | 74px | 90px |
| `font-size-1500` | 73px | 88px | 84px | 102px |

- The default body is `font-size-100` — 14px on desktop, 17px on mobile.
- The mobile values are about 1.2× the desktop ones (10→12 · 14→17 · 36→44 · 73→88).
  No multiplier constant is recorded in the source; only the values are listed.
- **Each size step has a paired px line-height token** (`line-height-font-size-*`, the same
  18 steps × desktop/mobile). **Ratio tokens (`line-height-100` 1.3 · `line-height-200` 1.5)
  and px line heights both exist.**

**The weight tokens' values are names, not numbers.**

| token | value |
|------|-----|
| `light-font-weight` | `light` |
| `regular-font-weight` | `regular` |
| `medium-font-weight` | `medium` |
| `bold-font-weight` | `bold` |
| `extra-bold-font-weight` | `extra-bold` |
| `black-font-weight` | `black` |

There is no numeric mapping (300/400/500 …) in the token files — the instance names of the
variable font `Adobe Clean Spectrum VF` are used as the values directly.

Typefaces: `sans-serif-font-family` = **Adobe Clean Spectrum VF**,
`serif-font-family` = Adobe Clean Serif, `cjk-font-family` = **Adobe Clean Han**.
Tracking is a single `letter-spacing` = `0em`, with only the `detail` role set separately at
`0.06em`. Style (`normal`/`italic`) and alignment (`start`/`center`/`end`) are tokens too.

#### The role scales — Latin and CJK in two sets

There are per-role files (`heading.json` 98 · `detail.json` 69 · `body.json` 47 ·
`title.json` 45 · `code.json` 31), and **every role has a `-cjk-` counterpart** — with
separate values for typeface, weight, line height and size.

| role size | Latin (desktop) | CJK (desktop) |
|------|:---:|:---:|
| `heading-size-xxs` | 14px | 14px |
| `heading-size-xs` | 18px | 16px |
| `heading-size-s` | 20px | 18px |
| `heading-size-m` | 22px | 20px |
| `heading-size-l` | 28px | 25px |
| `heading-size-xl` | 36px | 32px |
| `heading-size-xxl` | 45px | 40px |
| `heading-size-xxxl` | 58px | 51px |
| `heading-size-xxxxl` | 73px | 65px |
| `body-size-xxs` | 11px | 10px |
| `body-size-xs` | 12px | 11px |
| `body-size-s` | 14px | 12px |
| `body-size-m` | 16px | 14px |
| `body-size-l` | 18px | 16px |
| `body-size-xl` | 20px | 18px |
| `body-size-xxl` | 22px | 20px |
| `body-size-xxxl` | 25px | 22px |

**At the same role, the CJK size is one step down the scale** (`body-size-m` 16px against
`body-cjk-size-m` 14px = `font-size-100`). The line height moves the other way:

| | Latin | CJK |
|---|:---:|:---:|
| `heading-line-height` | 1.3 | **1.5** |
| `body-line-height` | 1.5 | **1.7** |

`title`, `code` and `detail` run five steps, xs–xl (with `title` adding xxl and xxxl), on the
same structure. Heading weights are `extra-bold` in both Latin and CJK.

### Colour

~~Unverified — `src/color-*.json` needs checking~~ → **resolved (2026-08-18).**
The full hex list is not reproduced (`../SCHEMA.md`) — only the structure.

**Three tiers.**

| tier | file | tokens |
|------|------|:---:|
| the raw palette | `src/color-palette.json` | **369** |
| semantic ramps | `src/semantic-color-palette.json` | 94 |
| role aliases | `src/color-aliases.json` | 170 |

#### The raw palette — 18 hues × 16 steps

- **Eighteen chromatic families** (blue · brown · celery · chartreuse · cinnamon · cyan ·
  fuchsia · green · indigo · magenta · orange · pink · purple · red · seafoam · silver ·
  turquoise · yellow), each **16 steps** (100–1600, in hundreds) = 288.
- `gray` alone has **13 steps** — adding 25, 50 and 75 at the bottom, then 100–1000.
- **There are separate alpha families**: `transparent-black-*` and `transparent-white-*`,
  13 steps each (25–1000). `transparent-black-100` is `rgba(0,0,0,0.09)` and `-1000` fully
  opaque.
- **Forty theme-independent `static-*` tokens across 11 families** — identical in light and
  dark (`static-blue` has only 900 and 1000; `static-fuchsia`, `static-indigo`,
  `static-magenta` and `static-red` have five steps). The rest have three: 400/600/800.
- Plus `black` and `white`.

#### Three themes — light / dark / **wireframe**

A colour token's `sets` are **`light`, `dark` and `wireframe`** (the same mechanism as the
spacing's `desktop`/`mobile`). Of the 369 palette tokens, 301 have all three sets and the
remaining 68 (`static-*`, `transparent-*`, `black`, `white`) hold a single value.

**The step number is not lightness but distance from the background.**

| token | light | dark |
|------|-------|------|
| `gray-25` | `rgb(255,255,255)` | `rgb(17,17,17)` |
| `gray-1000` | `rgb(0,0,0)` | `rgb(255,255,255)` |

The same step is light in the light theme and dark in the dark one — **the ramp's direction
inverts wholesale in dark mode.** The consumer uses the same token name and the theme decides
the direction.

#### The semantic ramps — aliasing a whole ramp

`semantic-color-palette.json` aliases **whole 16-step ramps rather than individual tokens.**

```
accent-color-100 … accent-color-1600      → {blue-100} … {blue-1600}
informative-color-*  → blue-*      negative-color-*  → red-*
notice-color-*       → orange-*    positive-color-*  → green-*
```

Five meanings × 16 steps = 80, plus five `*-subtle-background-color-default`, five
`icon-color-*` (informative · negative · neutral · notice · positive) and four
`negative-subdued-background-color-*` states = 94.

**A meaning is assigned a ramp, not a colour.**

#### The role aliases — state in the name

170 tokens in `color-aliases.json`. The state suffixes are `-default` · `-hover` · `-down` ·
`-key-focus` · `-selected` (`down` is pressed and `key-focus` is keyboard focus).

| family | example |
|------|-----|
| background layers | `background-base-color` · `background-layer-1-color` · `background-layer-2-color` · `background-elevated-color` · `background-pasteboard-color` |
| meanings | `accent-*` · `negative-*` · `positive-*` · `informative-*` · `notice-*` · `neutral-*` |
| per hue | for each of the 18: `{hue}-background-color-default` · `{hue}-subtle-background-color-default` · `{hue}-visual-color` |
| fixed contrast | `static-black-*` · `static-white-*` (text, focus rings, tracks) |
| disabled | `disabled-background-color` · `disabled-border-color` · `disabled-content-color` plus `static-black`/`static-white` editions |
| shadow | 16 `drop-shadow-*` (elevated · emphasized · dragged · transition) |
| opacity | four `background-opacity-*` states · `opacity-disabled` · `overlay-opacity` |

**Colour values are written as `rgb()`/`rgba()` function strings** rather than hex
(`"rgb(142, 185, 252)"`). In the corpus, Spectrum and Polaris are the two that ship their raw
palettes in function notation rather than hex.

## Components

Components confirmed from the token file structure (a selection): accordion, action-bar,
action-button, alert-banner, alert-dialog, avatar, breadcrumbs, button, card, checkbox,
coach-mark, the color-picker family, combo-box, contextual-help, date-field, date-picker,
divider, drop-zone, field, help-text, floating-action-button, form-item.

Because the tokens are split into a JSON file per component, the file listing is close to a
component listing.

### The deep pass (2026-08-17, `@spectrum-css/button@14.2.0` + `@spectrum-css/tokens@16.0.2`)

**The real values of the two platform scales were obtained** — the shared component height
scale `--spectrum-component-height-*` ships in two files, medium (desktop) and large (touch):

| step | 75 | 100 (the button default) | 200 | 300 | 400 | 500 |
|------|:--:|:--:|:--:|:--:|:--:|:--:|
| medium | 24 | **32** | 40 | 48 | 56 | 64 |
| large | 30 | **40** | 50 | 60 | 70 | 80 |

- **The touch scale = desktop × exactly 1.25** — a single multiplier across every step.
  A third way of solving the problem that SLDS handles with individual touch tokens and
  Polaris with breakpoint branches: **swapping the whole scale.**
- The height is not a component token but **a reference to the shared `component-height`
  scale** — the same "shared height ruler" family as Carbon's context sizes.
- The override layer has three tiers: `--mod-button-*` (public to consumers) →
  `--spectrum-button-*` (the component) → the global tokens. The same structure as SLDS's
  hooks, made explicit by the `mod` prefix.

## Characteristic decisions

- **Every token can hold separate desktop and mobile values**, expressed through a `sets`
  structure.

  ```
  base-padding-horizontal-medium  [desktop] 12px  [mobile] 10px
  accordion-top-to-text-spacious-medium  [desktop] 13px  [mobile] 15px
  ```

  Platform branching is resolved **at the token layer** rather than in the implementation.
  The same family of idea as GOV.UK embedding breakpoints or Cloudscape embedding density in
  its tokens, at a far wider scope.

- **Odd values appear in quantity in the component tokens.** 3, 5, 7, 9, 11, 13, 15, 17 and
  19px are used in `base-padding-vertical-*`, `accessory-gap-*` and elsewhere, none of which
  fit the public spacing scale (1 · 2 · 4 · 6 · 8 · 12 · 16 …).
  **Spectrum does not enforce its raw scale.**

- **The radii run in 1px steps**, dividing 3–10px into eight — the opposite of most systems'
  sparse 2 · 4 · 8 · 12 · 16.

- **The circle is expressed as a ratio (0.5)**, unlike the large-constant approach of Polaris
  (9999px) and Fluent (10000px).

- **In places the mobile value is larger than the desktop one.**
  `accordion-top-to-text-spacious-medium` is 13px on desktop and 15px on mobile.

- **CJK is handled through two scales rather than a typeface swap** (2026-08-18). Every
  typographic role has a `-cjk-` counterpart, **dropping the size a step and raising the line
  height** (body 16→14px, line height 1.5→1.7). Other CJK-handling samples in the corpus touch
  only one axis — a typeface mapping or a line-height branch — while Spectrum keeps size,
  line height, weight and typeface all as separate axes.

- **The ramp's direction inverts in dark mode.** `gray-25` is white in light and
  `rgb(17,17,17)` in dark. The step number is distance from the background, not lightness.

- **A meaning is assigned a ramp, not a colour.** All 16 steps of
  `accent-color-100`–`1600` alias the `blue-*` ramp — unlike the usual semantic tier of
  "one role → one colour".

- **The weight tokens' values are names, not numbers** (`extra-bold`, `black`).
  The variable font's instance names are used directly as values, with no numeric mapping in
  the tokens.

## Accessibility

Focus-indicator tokens exist per component, such as `accordion-focus-indicator-gap: 2px`.
~~The explicit conformance target is unverified.~~ → **re-confirmed absent (2026-08-18,
headless render of the documentation site).**

The **Inclusive design** page, which serves as the accessibility documentation, was rendered
and read in full. It consists of principles (Assume nothing is perfect · Make room to adapt ·
Give people a choice · Avoid distractions · Be consistent · Involve marginalized users) and
checkpoints (structure · colour · Windows high-contrast mode · animation · interaction ·
alternative text · type and text · error prevention · keyboard equivalence), and
**there is no sentence declaring a conformance level (AA/AAA) or a target version.**
WCAG is cited only as grounds — the alternative-text exception references
"Guideline 1.1 Text Alternatives in the **WCAG 2.1** standards", and the resources list links
WCAG and "Techniques for WCAG 2.1".
The concrete figures given are **support down to a 320px page width**, a maximum of
**50–75 characters** per line (80 characters per column / **40 for CJK**) and
**no flashing more than three times a second.**
Source: https://spectrum.adobe.com/page/inclusive-design/ (headless render, 2026-08-18)

## References

- Repository: https://github.com/adobe/spectrum-tokens
- Packages: `@adobe/spectrum-tokens` (the token source), `@spectrum-css/tokens` (the CSS
  build)
- Documentation site: https://spectrum.adobe.com — an SPA, so curl returns only an empty
  shell, but **the body was read successfully by headless render on 2026-08-18**
  (`/page/inclusive-design/` · `/page/ui-kits/`)
- **The design kit — needs checking (2026-08-18, headless render):** `/page/ui-kits/` says
  **"These UI kits are available as XD files and contain resources for both scales
  (desktop and mobile) and all color themes"**. The download bundle at the root is likewise
  **an Adobe XD plugin, the UI kits (XD), fonts and icons**, and no text on the documentation
  site points to a Figma kit (the site's CMS has a `patterns_figma_url` field, but its value
  is `null` on the pages rendered).
  → **Corrected (2026-08-18).** `figma_kit` was changed from `true` to **`false`**.
  Three grounds: ① the UI kits page states "available as **XD files**",
  ② the site CMS's `patterns_figma_url` field is `null`,
  ③ the download list contains only the XD plugin, the XD kits, fonts and icons.
  The previous `true` had been entered without a source.
  **Note:** this verdict is based on the official documentation site — it does not rule out
  the existence of internal or community Figma kits.
  **An incidental observation:** the corpus's USWDS entry records that "Adobe no longer
  supports XD, so the XD assets were discontinued". Set beside Spectrum still keeping XD kits
  as its primary distribution, it reads as **the tool's own maker remaining on a tool it has
  discontinued** — though Adobe's XD policy itself was not verified in this corpus, so this
  is recorded only as an observation.
  Being an organisation that uses its own tool (XD) puts it in an exceptional position within
  the sample.
  Sources: https://spectrum.adobe.com/page/ui-kits/ · https://spectrum.adobe.com/
