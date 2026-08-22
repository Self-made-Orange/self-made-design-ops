---
name: Atlassian Design System
org: Atlassian
coverage: full
url: https://atlassian.design
repo: https://bitbucket.org/atlassian/atlassian-frontend-mirror
license: Apache-2.0
tech: [React]
figma_kit: true
tokens_format: [JSON, CSS, JS]
a11y_target: "confirmed to be unstated in the design-system documentation (the company-wide standard is WCAG 2.1 AA — atlassian.com/trust, 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-17
source: "npm @atlaskit/tokens@16.7.0 → figma/*.json (15 files), dist/cjs/artifacts/tokens-raw/*.js (14 themes)"
---
<!-- lang-links -->
> **English** · [한국어](atlassian.ko.md)
<!-- /lang-links -->

## In one line

The design system behind Jira, Confluence and the rest of the Atlassian suite.
It **tokenises motion per component** and ships **466 tokens per theme, in 14 sets**.

## Tokens

The distribution splits into one file per axis.

| file | tokens | contents |
|------|:---:|------|
| `atlassian-light.js` and the rest of the **10 colour themes** | 466 each | colour · elevation · opacity |
| `atlassian-typography.js` | 23 | family · size · weight |
| `atlassian-spacing.js` | 23 | spacing (negatives included) |
| `atlassian-shape.js` | 11 | radius · border width |
| `atlassian-motion.js` | **68** | duration · easing · keyframes · **per-component motion** |

The 10 colour themes: `light` · `dark` · `light-future` · `dark-future` ·
`light-increased-contrast` · `dark-increased-contrast` ·
`light-new-input-border` · `dark-new-input-border` · `legacy-light` · `legacy-dark`.
(`light-brand-refresh` and `dark-brand-refresh` exist on top of those, for 12 in all.)

### Spacing

| token | value |
|------|-----|
| `space.0` | 0 |
| `space.025` | 2px |
| `space.050` | 4px |
| `space.075` | 6px |
| `space.100` | 8px |
| `space.150` | 12px |
| `space.200` | 16px |
| `space.250` | 20px |
| `space.300` | 24px |
| `space.400` | 32px |
| `space.500` | 40px |
| `space.600` | 48px |
| `space.800` | 64px |
| `space.1000` | 80px |

The numbers in the names are **multiples of an 8px base** (`space.100` = 8px).
The same scheme as Polaris (on a 4px base), with a different base value.

### Negative spacing

| token | value |
|------|-----|
| `space.negative.025` | -2px |
| `space.negative.050` | -4px |
| `space.negative.075` | -6px |
| `space.negative.100` | -8px |
| `space.negative.150` | -12px |
| `space.negative.200` | -16px |
| `space.negative.250` | -20px |
| `space.negative.300` | -24px |
| `space.negative.400` | -32px |

Exactly symmetric with the positive scale up to 32px. There are no negatives at 40px
and above.

### Radius

| token | value |
|------|-----|
| `radius.xsmall` | 2px |
| `radius.small` | 4px |
| `radius.medium` | 6px |
| `radius.large` | 8px |
| `radius.xlarge` | 12px |
| `radius.xxlarge` | 16px |
| `radius.full` | 9999px |
| `radius.tile` | **25%** |

### Border width — semantic by state

| token | value |
|------|-----|
| `border.width` | 1px |
| `border.width.selected` | 2px |
| `border.width.focused` | 2px |

### Typography — a one-line CSS `font` shorthand

The values are not individual properties but **CSS `font` shorthand strings**.

```
font.heading.large = "normal 653 24px/28px \"Atlassian Sans\", ui-sans-serif, …"
                      │      │   │    │
                      style  weight size line-height
```

| token | weight | size | line height | ratio |
|------|:---:|:---:|:---:|:---:|
| `font.heading.xxlarge` | 653 | 32px | 36px | 1.125 |
| `font.heading.xlarge` | 653 | 28px | 32px | 1.143 |
| `font.heading.large` | 653 | 24px | 28px | 1.167 |
| `font.heading.medium` | 653 | 20px | 24px | 1.2 |
| `font.heading.small` | 653 | 16px | 20px | 1.25 |
| `font.heading.xsmall` | 653 | 14px | 20px | 1.429 |
| `font.heading.xxsmall` | 653 | 12px | 16px | 1.333 |
| `font.body.large` | 400 | 16px | 24px | 1.5 |
| **`font.body.[default]`** | 400 | **14px** | 20px | 1.429 |
| `font.body.small` | 400 | 12px | 16px | 1.333 |
| `font.metric.large` | 653 | 28px | 32px | 1.143 |
| `font.metric.medium` | 653 | 24px | 28px | 1.167 |
| `font.metric.small` | 653 | 16px | 20px | 1.25 |
| `font.code.[default]` | 400 | **0.875em** | **1** | — |

**The body default is 14px.** The same camp as Ant Design · Material 3 (Body Medium) ·
Helios · Evergreen · Seed (100) (`patterns/typography.md`).

**The line heights sit on a 4px grid** — 16 · 20 · 24 · 28 · 32 · 36, without exception.
The ratios wander between 1.125 and 1.5, but the absolute values are always multiples of 4.

**Every heading weight is 653.**

| token | value |
|------|:---:|
| `font.weight.regular` | 400 |
| `font.weight.medium` | 500 |
| `font.weight.semibold` | 600 |
| **`font.weight.bold`** | **653** |

**The two weights in the sample that are not multiples of 100 are Atlassian's (653) and
Apple's (590).**
Each is the real weight of a variable typeface (Atlassian Sans / SF Pro) used as-is, and
neither source records why that value was chosen.

| system | typeface | value | style |
|--------|------|:---:|------|
| Atlassian | Atlassian Sans | **653** | `bold` |
| Apple | SF Pro | **590** | Semibold |

Apple's Bold is the standard 700 and only Semibold deviates.
Atlassian's `bold` alone is 653 while `semibold` is 600 — **each has exactly one step off
standard.**

There is a separate `font.metric.*` family — the sizes and weights overlap `heading`
(28/32 · 24/28 · 16/20) but the names are kept apart.

Only `font.code.[default]` is in **relative units** — `0.875em/1`.
It scales with the surrounding text and has a line height of 1.

### Typefaces — the brand family is kept separate

| token | typeface |
|------|------|
| `font.family.heading` | Atlassian Sans |
| `font.family.body` | Atlassian Sans |
| `font.family.code` | Atlassian Mono |
| **`font.family.brand.heading`** | **Charlie Display** |
| **`font.family.brand.body`** | **Charlie Text** |

**The product UI typeface (Atlassian Sans) and the brand typeface (Charlie) are separate.**
Charlie splits into Display and Text — the same structure as Evergreen's
SF UI Display / SF UI Text split (`patterns/typography.md`).

### Colour — 466 per theme

| group | count |
|------|:---:|
| `color.background` | **208** |
| `color.chart` | **100** |
| `color.text` | 49 |
| `color.border` | 39 |
| `color.icon` | 23 |
| `elevation.surface` | 13 |
| `color.rovo` | 11 |
| `elevation.shadow` | 5 |
| `color.link` | 4 |
| `color.blanket` | 3 |
| `elevation.rovo` | 3 |
| `color.interaction` | 2 |
| `color.skeleton` | 2 |
| `opacity` | 2 |
| `utility` | 2 |

#### Backgrounds — four levels × three states

```
color.background.accent.blue.subtlest.[default]
color.background.accent.blue.subtlest.hovered
color.background.accent.blue.subtlest.pressed
                            └─ subtler · subtle · bolder
```

**Four strength steps** (`subtlest` · `subtler` · `subtle` · `bolder`) **× three states**
(`[default]` · `hovered` · `pressed`) = 12 per colour.
With 10 colours under `accent`, that is **120**.

**The same structure as Orbit's three lightness steps × three states + darker = 10**
(`patterns/color.md`), with Atlassian carrying four strength steps.

**The strength names are comparatives** — weaker than `subtle` is `subtler`, and weaker
still is `subtlest`. The `bold` side has only `bolder`, so the scale is **asymmetric**.

#### State colours — there is a `discovery`

Counting backgrounds, 10 each:

| group | count |
|------|:---:|
| `danger` | 10 |
| `warning` | 10 |
| `success` | 10 |
| **`discovery`** | **10** |
| `information` | 10 |
| `brand` | 9 |
| `neutral` | 9 |
| `code` | 7 |
| `selected` | 6 |
| `input` | 3 |
| `inverse` | 3 |
| `disabled` | 1 |

**`discovery` is a first-class state colour.** The widest set in the sample, against
Evergreen's four (`success` · `warning` · `danger` · `none`) and shadcn/ui's single
`destructive`.

#### Charts — 100 tokens

| family | count |
|------|:---:|
| `categorical` | **16** |
| per colour (`lime` · `red` · `orange` · `yellow` · `green` · `teal` · `blue` · `purple` · `magenta` · `gray`) | 6 each |
| per state (`danger` · `warning` · `success` · `discovery` · `information`) | 4 each |
| `neutral` · `brand` | 2 each |

**There are 16 `categorical` tokens** — a colour order for categorical data.
Where shadcn/ui's five chart colours are a single-hue lightness ramp, Atlassian uses
**hue separation**.

Atlassian is the only system in the sample with 100 chart-specific tokens.

#### `rovo` — a per-product colour family

11 `color.rovo.*` plus 3 `elevation.rovo.*`.
`border` and `icon` carry four colours: `lime` · `saffron` · `blue` · `purple`.

**The same structure as Helios keeping per-product brand colours for Terraform, Vault and
Consul** (`patterns/color.md`).

#### Elevation — surface and shadow are separate families

| family | tokens |
|------|------|
| `elevation.surface.*` | `[default]` · `container` · `raised` · `overlay` (three states each) + `sunken` |
| `elevation.shadow.*` | `overflow.[default]` · `overflow.perimeter` · `overflow.spread` · `overlay` · `raised` |

**Surface colour and shadow are split.** `raised` appears on both sides, so "the raised
surface colour" and "the raised shadow" are used separately.

There are three `elevation.shadow.overflow.*` — the shadow marking scroll overflow is
divided into `perimeter` and `spread`.

#### Opacity · utility

| token | value |
|------|:---:|
| `opacity.disabled` | **0.4** |
| `opacity.loading` | 0.2 |
| `utility.UNSAFE.transparent` | `transparent` |
| `utility.elevation.surface.current` | `#FFFFFF` (light) |

**The disabled opacity is 0.4.** shadcn/ui uses 0.5 (`opacity-50`).

**`utility.UNSAFE.transparent`** — the token name itself contains `UNSAFE`.
Atlassian is the only system in the sample that marks usage risk in a token name.

## Motion — 68 per-component tokens

**The most deeply tokenised motion system in the sample.**

### Eight duration steps

| token | value |
|------|:---:|
| `motion.duration.instant` | 0ms |
| `motion.duration.xxshort` | 50ms |
| `motion.duration.xshort` | 100ms |
| `motion.duration.short` | 150ms |
| `motion.duration.medium` | 200ms |
| `motion.duration.long` | 250ms |
| `motion.duration.xlong` | 400ms |
| `motion.duration.xxlong` | 600ms |

Increments of **50 / 50 / 50 / 50 / 50 / 150 / 200** — an arithmetic 50ms series up to
250ms.

### Five easings

| token | value |
|------|-----|
| `motion.easing.in.practical` | `cubic-bezier(0.6, 0, 0.8, 0.6)` |
| `motion.easing.out.practical` | `cubic-bezier(0.4, 1, 0.6, 1)` |
| `motion.easing.inout.bold` | `cubic-bezier(0.4, 0, 0, 1)` |
| `motion.easing.out.bold` | `cubic-bezier(0, 0.4, 0, 1)` |
| **`motion.easing.spring`** | **a `linear()` with 65 stops** |

**They divide into two families, `practical` and `bold`.**

**`spring` is defined with the CSS `linear()` function** — 65 enumerated stops
approximating a spring curve. It overshoots to a maximum of 1.024 and undershoots slightly
to 0.999 at the end.

```
linear(0, 0.021, 0.058, …, 1.024, 1.024, …, 0.999, 1)
```

Atlassian is the only case in the sample of expressing a spring as a multi-stop `linear()`.

### 18 keyframes — named animations

| family | tokens |
|------|------|
| fade | `FadeIn0to100` · `FadeOut100to0` |
| scale | `ScaleIn80to100` · `ScaleIn95to100` · `ScaleOut100to80` · `ScaleOut100to95` |
| slide (8px) | `SlideInTop8px` · `SlideInBottom8px` · `SlideInLeft8px` · `SlideInRight8px` (+ 4 Out) |
| slide (percentage) | `SlideIn50PercentLeft` · `SlideOut15PercentLeft` · `SlideIn100PercentLeft/Right` (+ Out) |

**The values are in the names** — `ScaleIn80to100` runs 80% → 100%.

**Entry and exit travel different distances** — `SlideIn50PercentLeft` (50%) against
`SlideOut15PercentLeft` (15%). Things come in from further away than they leave.

### Per-component motion — unique in the sample

Each component's entry, exit and state motion is defined as a **composite token**.

```js
motion.modal.enter = {
  duration: 250,
  curve: 'cubic-bezier(0.4, 0, 0, 1)',   // inout.bold
  keyframes: ['ScaleIn95to100'],
  fill: 'backwards',
}
motion.panel.content.enter = {
  duration: 150, curve: '…out.practical',
  keyframes: ['FadeIn0to100'], delay: 100, fill: 'backwards',
}
```

The components covered: `avatar` · `blanket` · `button` · `flag` · `label` · `listitem` ·
`modal` · `panel` · `popup` · `sidenav` · `spotlight`.

Split by direction: `popup.enter.{top,bottom,left,right}` ·
`panel.enter.{left,right,[default]}` · `sidenav.enter.{left,right}`.

#### Entry against exit — exits are faster

| component | entry | exit | difference |
|----------|:---:|:---:|:---:|
| `avatar` | 150ms | 100ms | -50 |
| `blanket` | 250ms | 200ms | -50 |
| `flag` | 250ms | 200ms | -50 |
| `label` | 150ms | 100ms | -50 |
| `modal` | 250ms | 200ms | -50 |
| `panel` | 250ms | 200ms | -50 |
| `popup` | 150ms | 100ms | -50 |
| `sidenav` | 250ms | 200ms | -50 |
| `spotlight` | 250ms | 200ms | -50 |
| **`panel.content`** | **150ms** (+ `delay: 100`) | **50ms** | **-100** |

**Nine of the ten pairs differ by exactly 50ms.**
Only `panel.content` differs by 100ms, and its entry carries a 100ms delay — the content
fades in while the panel is still sliding so that both finish together, and on exit the
content goes first (50ms) before the panel leaves (200ms).

**Every entry duration is either 150 or 250ms.**
Small, incidental elements (`avatar` · `label` · `popup`) take 150ms; things that cover the
screen or occupy a large area (`blanket` · `modal` · `panel` · `sidenav` · `spotlight` ·
`flag`) take 250ms.

The cross-system comparison is in `patterns/motion.md`.

#### State transitions — the properties are named too

```js
motion.listitem.hovered = {
  duration: 50, curve: '…out.practical',
  properties: ['background-color', 'border-color', 'color', 'text-decoration-color'],
}
motion.button.hovered = {
  duration: 150, curve: '…out.practical',
  properties: ['background-color', 'border-color'],
}
```

**`listitem` hover is 50ms and `button` hover 150ms** — a threefold difference.
`listitem` transitions four properties (text colour and underline colour included);
`button` transitions two.

Only `panel.content.enter` carries a `delay: 100` — the content appears after the panel has
opened.

**The `fill` value is `backwards` on entry and `forwards` on exit, without exception.**

**The easing assignment follows a rule too** — entries take the `out` family and exits the
`in` family. The only exceptions are `panel.exit.*` (`out.bold`) and `panel.content.exit`
(`out.practical`).
The `bold` family is used only on large areas (blanket · modal · spotlight · panel ·
sidenav · flag).

## Components

Unverified — the documentation site is blocked by the proxy.
The 11 components covered by the motion tokens are listed above.

## Characteristic decisions

- **Motion is tokenised per component.** 68 tokens hold duration, easing, keyframes,
  transition properties, delay and `fill` as composite objects. Nothing else in the sample
  goes to this depth.
- **Exits are shorter than entries.** Nine of the ten pairs differ by exactly 50ms; only
  `panel.content` differs by 100ms (content disappears before its container).
- **The `spring` easing is defined as a 65-stop CSS `linear()`.**
- **The type tokens are CSS `font` shorthand strings.** There are no individual property
  tokens, so the size cannot be used on its own.
- **The `bold` weight is 653.** The only non-multiple-of-100 cases in the sample are this
  and Apple's Semibold (590).
- **Line heights are always multiples of 4** (16–36), while the ratios wander between 1.125
  and 1.5.
- **The brand typeface (Charlie) is separate from the product typeface (Atlassian Sans).**
- **Background colours are four strength steps × three states.** The names are comparatives
  (`subtle` → `subtler` → `subtlest`) and the structure is asymmetric, with only `bolder` on
  the bold side.
- **`discovery` is a first-class state colour.** It stands alongside danger, warning,
  success and information with 10 tokens each.
- **100 chart-specific tokens,** including a 16-colour `categorical` order.
- **Negative spacing is provided.** The second confirmed case after Primer, and in both the
  negatives mirror the lower part of the positive scale (Atlassian to -32px, Primer
  to -48px).
- **`radius.tile` is 25%.** A ratio-based radius that is not 50% (a circle) but 25%.
  **It is the only 25% radius among the systems collected.**
- **Border widths are semantic by state.** `border.width.selected` and
  `border.width.focused` hold the same value (2px) but are separate tokens —
  in contrast to Primer naming its by size (`thin`/`thick`).
- **Surface colour and shadow are separate families** (`elevation.surface` 13 ·
  `elevation.shadow` 5).
- **`UNSAFE` appears in a token name** (`utility.UNSAFE.transparent`).
- **The Figma token files ship on npm.** The package's `figma/` directory holds 15 JSON
  files for the design tool.
- **Legacy and experimental themes ship alongside.** `legacy-light` · `adg3` (older),
  `future` · `new-input-border` · `brand-refresh` (upcoming). Twelve sets in all.
- **There is an `increased-contrast` theme in both light and dark.**
  Material 3 is alone in offering a medium contrast (`patterns/color.md`); Atlassian offers
  one high-contrast step.

## Buttons in depth (2026-08-17, the `@atlaskit/button@25.1.0` build output)

**The old and new buttons coexist in one package**, expressing their dimensions
differently:

- **old-button**: height `32/14em` (≈2.28571em) · compact `24/14em` —
  **a repeating em decimal** back-computed from an intended 32/24px (the same phenomenon as
  Garden and Stacks). Padding is the formula `gridSize(8) + gridSize/4` = 10px.
- **new-button**: statically compiled with Compiled (atomic CSS-in-JS) —
  heights as **direct 32/24px values**, inline padding 12/6px, radius
  `--ds-radius-medium` (6px).
  **A generational handover inside a single package** — the same values moved from an em
  formula to a token reference.
- The compiled CSS carries **two coexisting `--ds-radius-small` fallbacks, 3px and 4px** —
  the intermediate state of the radius-token migration visible in the artefact itself.

## Accessibility

- **Two high-contrast themes,** `light-increased-contrast` and `dark-increased-contrast`.
  They hold the same token count as the ordinary themes (466) — an identical structure with
  different values
- `border.width.focused` is managed as a separate token (2px)
- `opacity.disabled` = 0.4
- No explicit WCAG conformance target was confirmed from the package.
  There are no contrast-ratio figures in the tokens either

## References

- Documentation: https://atlassian.design
- Package: `@atlaskit/tokens@16.7.0`
- Figma tokens: `figma/*.json` inside the package (15 files)
- Raw tokens (with values): `dist/cjs/artifacts/tokens-raw/*.js` (14 files)
- **Harvesting note:** `figma/atlassian-typography.json` holds only families and weights;
  **the sizes and line heights are in `dist/cjs/artifacts/tokens-raw/atlassian-typography.js`
  alone**.
  Looking only at the Figma JSON makes it appear there is no type scale — an instance of
  `HARVESTING.md` lesson 6 (list the files before giving up on a path as not found).
- **Open questions:** the component list and dimensions, the licence, and how the
  `light-future` / `brand-refresh` themes differ in value from the current ones
- **Licence resolved (2026-08-18):** `Apache-2.0` — source: npm `@atlaskit/tokens@16.7.0` → `package.json` (`license`). The repository is a Bitbucket mirror, so the LICENSE file could not be read directly
