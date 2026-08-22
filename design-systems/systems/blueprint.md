---
name: Blueprint
org: Palantir
coverage: partial
url: https://blueprintjs.com
repo: https://github.com/palantir/blueprint
license: Apache-2.0
tech: [React, Sass]
figma_kit: false
tokens_format: [Sass]
a11y_target: "WCAG 2.0 (colour contrast) + WCAG 2.2 focus appearance (focus indication, a 3:1 minimum) — confirmed 2026-08-18"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @blueprintjs/core@6.18.0 → lib/scss/variables.scss · lib/css/blueprint.css · npm @blueprintjs/table@6.2.4 → lib/css/table.css + lib/esm (table, navigation and feedback measurements, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](blueprint.ko.md)
<!-- /lang-links -->

## In one line

Palantir's system for dense data UI. **The grid is 10px** (legacy as of v6 — the current
primary unit is 4px, see the "correction" section below) and the line height is
**1.28581**, to five decimal places — the value choices diverge from the sample's
conventions in every direction.

## Tokens

### The grid — 10px

```scss
$pt-grid-size: 10px !default;
```

**Blueprint is the only 10px grid in the sample.** KRDS's 10px is a rem root (a notation
unit) and its scale is of the 4px family, whereas Blueprint's **layout grid is 10px**.
With GOV.UK (5px) it is the second system outside the multiples of 4.

### Dimensions — written as `4px × N`, with fractional multipliers

```scss
$pt-font-size:          4px * 3.5;   // 14px
$pt-button-height:      4px * 7.5;   // 30px
$pt-button-height-large: 4px * 10;   // 40px
$pt-navbar-height:      4px * 12.5;  // 50px
```

**The grid is 10px but the derived values are written as `4px × N`.** Fractions such as
3.5, 7.5 and 12.5 are common in the multipliers — in effect, 2px-unit values written as
multiples of 4px.

| item | value |
|------|:---:|
| type | 12 · **14** · 16 |
| button height | 20 · 24 · **30** · 40 |
| input height | 24 · **30** · 40 |
| navbar | **50** |
| radius | a single 4px |

**The default button and input height is 30px** — the lowest in the sample
(previously Ant 32 · Radix size 2 32 · Mantine `xs` 30 was the floor — for Blueprint 30 is
**the default**).
It presumes a dense desktop application, an entirely different coordinate system from a
44–48pt touch target.

**Buttons and inputs share their heights** (30/40, small 24) — the same judgement as
Mantine (`patterns/form.md`).

### Line height — 1.28581

```scss
$pt-line-height: 1.28581 !default;
```

**Five decimal places.** 14px × 1.28581 ≈ 18px — it looks like a ratio back-computed from an
integer px, but the source gives no rationale. It is the only five-digit line height in the
sample (a value that leaves the "round numbers" convention behind, like Cloudscape's 115ms).

### Elevation — five steps, 0 to 4

`$pt-elevation-shadow-0`–`4`. The same range as the sample majority (3–6 steps), and it
**explicitly keeps a step 0 (no shadow).**

## Components

The `@blueprintjs/*` package family. ~~The list was unverified~~ → **resolved (2026-08-18,
by rendering the documentation sidebar — https://blueprintjs.com/docs/).** The
documentation **states a version per package**:
`core 6.18.0` · `datetime 6.2.4` · `icons 6.13.0` · `select 6.3.4` ·
`table 6.2.4` · **`labs 6.4.4`**. The per-package versions vary (6.2.x–6.18.x), and
`labs` is in the official documentation's table of contents (the `Box` and `Flex` layout
primitives, both with a `new` badge).
**There is a dedicated `table` package** — evidence of a system centred on the data grid.

## Components in depth — (2026-08-18)

Sources: `@blueprintjs/core@6.18.0` → `src/components/**/*.scss` +
`src/common/_variables.scss` + `lib/css/blueprint.css` (cross-checked against the compiled
output).

### Correction — the 10px grid is legacy

A v6 source comment says so: `$pt-grid-size: 10px` is
"Legacy, kept for backward compatibility", and **the current primary unit is
`$pt-spacing: 4px`** ("multiply by 2.5 to convert").
The "only 10px grid in the sample" verdict in the token section above applies to v5 and
below, and **the puzzle of fractional multipliers like `4px × 7.5` resolves too** — it is
transitional notation, the 10px era's values (30px) rewritten on a 4px base.

v6 also carries a separate CSS-variable token layer — the `--bp-*` variables in
`lib/css/blueprint-design-tokens.css` (`--bp-surface-spacing: 4px` ·
`--bp-surface-border-radius: 4px` · type such as
`--bp-typography-size-body-medium: 14px`). **The compiled CSS ships `oklch` relative colour
syntax (`from`) as-is**
(`oklch(from var(--bp-palette-black) l c h/0.2)`) — static `oklch()` is used by shadcn/ui
(`patterns/color.md`), but **runtime relative-colour derivation appears first in Blueprint
in this sample** (a different syntax within the same "derive by computation" camp as Radix
Themes' `color-mix()`).

### Buttons — a min-height, not a height

| | small | default | large |
|---|:--:|:--:|:--:|
| **min-height** | 24 | **30** | 40px |
| min-width | 24 | 30 | 40px |
| padding (block · inline) | 0 · 8 | 4 · 8 | 4 · 16px |
| type | 14 | 14 | 16px |
| radius | 4 | 4 | 4px |

- **The height is a `min-height` rather than fixed** — it grows when the content overflows.
  `min-width` holds the same value, so the minimum is a square (the same judgement as
  Chakra's `minW: h`).
- The SCSS also has `$pt-button-height-smaller: 20px` — a fourth, smallest step.
- **There is no border** — it is replaced by an `inset 0 0 0 1px` box-shadow.
  A source comment states the reason: a border can only be one, cannot overlap a shadow,
  changes the element's size and demands box-sizing. **The only sample to document its
  border avoidance.**
- Cursor `pointer` (the Chakra camp).

### Inputs — the same values, used as a `height`

| | small | default | large |
|---|:--:|:--:|:--:|
| **height** | 24 | **30** | 40px |
| inline padding | 8 | 8 | 12px |

- They share the values with the button (24/30/40), but **the button uses `min-height` and
  the input a fixed `height`.**
  `line-height` is set equal to the height to centre the text vertically.
- Radius 4px, and the border is again an inset box-shadow.

### Dialogs — no width steps, a single 500px

| item | value |
|------|-----|
| **width** | **a fixed 500px** (`$pt-spacing × 125`) |
| block margin | 32px |
| radius | 4px |
| body and footer | 16px (**margin, not padding** — with a backward-compatibility TODO comment) |
| header | 4px padding plus 16px on the left, min-height 38px (a 30 button + 4×2) |
| backdrop | `rgba($black, 0.7)` |

- **There are no width steps** — unlike Cloudscape's five, Bootstrap's four and Chakra's
  five, there is one 500px (whether that is unique across the whole sample was not checked).
  The value itself converges with Bootstrap's default (500px).
- **The 0.7 backdrop is the darkest among the samples confirmed**
  (Bootstrap 0.5 · Chakra 0.36 · shadcn/ui Drawer 0.1 — `patterns/modal.md`).

Animation:

| | value |
|---|-----|
| content | **`scale(0.5)` → 1** plus a fade, **300ms**, `cubic-bezier(0.54, 1.12, 0.38, 1.11)` |
| backdrop | fade, 200ms |

- **The easing's control-point y is 1.12 — an overshooting bounce**
  (`$pt-transition-ease-bounce`).
  It belongs to the bezier-overshoot camp of `patterns/motion.md` (Spindle 2.05 · TDS 1.56),
  and ~~Blueprint is the only confirmed case of actually applying an overshoot to a modal
  entrance~~ →
  **corrected (2026-08-18, on re-synthesising the 83 samples of patterns/motion.md):** there
  are at least eight (Kaizen, HSDS and others). Blueprint is one of them, not the only one.
- **Starting at scale 0.5 is the largest entrance scale change among the samples confirmed**
  (Chakra 0.95 · Radix Themes 0.97 — `patterns/modal.md`).
- It is a **×3 (content) / ×2 (backdrop) multiple system** off the base transition unit
  `$pt-transition-duration: 100ms`. The base easing is `cubic-bezier(0.4, 1, 0.75, 0.9)` —
  which is not of the standard ease family either, with y₁ = 1.

### Tables (`@blueprintjs/table@6.2.4`) — fixed row heights premised on virtual scrolling

A dedicated package ships separately, and it is a data grid (a four-quadrant renderer).

| item | value |
|------|-----|
| **default row height** | **20px** (`Table.defaultProps.defaultRowHeight`) |
| default column width | **150px** (`defaultColumnWidth`) |
| cell type and line height | 12px / 20px · padding **0 8px** |
| `large` cell | type 14px, height and line height **30px** |
| column header min-height | **30px** (`Grid.MIN_COLUMN_HEADER_HEIGHT`) |
| row header min-width | 30px (`MIN_ROW_HEADER_WIDTH`) |
| ghost cell caps | 50 columns · 200 rows (`DEFAULT_MAX_COLUMNS/ROWS`) |
| zebra | `ledger-even` `#ffffff` / `ledger-odd` `#fafbfc` |

- **The row height is fixed in a JS constant (20px).** Where most of the sample collected
  uses a min-height or the content height, this is **a case of actually providing the
  integer fixed row height that virtual scrolling needs**. The value matches the macOS
  design kit's 20pt row.
- **Every boundary line is drawn with a `box-shadow`** — cells use
  `inset 0 -1px, inset -1px 0` and headers `0 1px 0`. Only the quadrant boundaries (the last
  cell of a frozen row or column) thicken to **inset ±3px** to mark the end of the frozen
  region.
  The inset box-shadow outline used on buttons and inputs is applied to the table as-is.
- **There are 13 z-index levels by purpose** — cells 0–3, quadrants and resize guides 10–13,
  the selection region 20, interactive cells 21. A single table divides its own stacking
  order.
- The four cell `intent`s (primary · success · warning · danger) combine **a 10%-alpha
  background with a text colour** — a sample that standardises state colour at cell level.
- The zebra colours `#ffffff` / `#fafbfc` differ **by about 1% in lightness**.

### Navigation (`.bp6-navbar` · `.bp6-tab` · `.bp6-breadcrumbs`)

| item | value |
|------|-----|
| navbar height | **50px** (the group too) · inline padding 16px · z-index 10 |
| navbar heading | 16px · 16px right margin |
| tab line height (height) | **30px** · type 14px · `column-gap` between tabs **20px** |
| tab indicator | a **3px** bottom bar (`$pt-intent-primary`) |
| indicator transition | **200ms** `cubic-bezier(0.4, 1, 0.75, 0.9)`, on `height·transform·width` |
| vertical tabs | item radius 4px · padding 0 8px · **a pill background** (primary at 20% alpha) |
| breadcrumbs | container **30px** · item type **16px** · a 16px SVG separator |

- **The tab indicator is 3px** — the thickest in the sample collected
  (PrimeVue 1 · Vuetify, Carbon, Semi, EUI and Chakra 2). In high-contrast mode it is
  replaced by the system colour with `background: highlight`.
- **The indicator moves as a separate wrapper element**
  (`.bp6-tab-indicator-wrapper`) — it slides between tabs with `transform` and can be turned
  off with the `.bp6-no-animation` class.
  The same approach as Radix Themes' segmented control (100ms), at twice the duration.
- **Horizontal tabs get an underline and vertical tabs a pill** — one component changing its
  active marker by orientation (shadcn/ui picks by variant regardless of orientation).
- **Breadcrumb items are 16px, larger than the body's 14px.** The only case in the sample
  collected of setting breadcrumbs larger than the body.
- The 50px navbar height is a remnant of this system's 10px grid
  (see "the 10px grid is legacy" above).

### Feedback (`.bp6-toast` · `.bp6-callout` · `.bp6-tag`)

| item | value |
|------|-----|
| **toast** width | max `min(500px, 100%)` / min `min(300px, 100%)` |
| toast radius and gap | 4px · **20px** margin between toasts |
| toast container | padding `0 20px 20px` · z-index **40** · positions top/bottom × left/center/right |
| **default duration** | **5000ms** (the `Toast` `timeout` default; 0 or less disables it — the documentation calls that "not recommended") |
| entrance | **300ms** `translateY(-40px)` → 0, `cubic-bezier(0.54, 1.12, 0.38, 1.11)` (an overshoot) |
| exit | **300ms** opacity 1→0 plus **`filter: blur(0 → 8px)`** |
| repositioning | **100ms**, **a 50ms delay**, `cubic-bezier(0.4, 1, 0.75, 0.9)` |
| **callout** | padding 16px · radius 4px · icon 16px (left 16 / top **18**) |
| **tag** | min-height and min-width **20px** · padding 2px 6px · radius 4px · 12/16px |
| tag large | min-height 30px · type 14px / line height 18px |

- **Blueprint is the only sample collected that uses a blur on exit** — a departing toast
  goes out of focus as it leaves (`filter: blur(8px)`).
- **It has a repositioning axis in code** — sibling toasts get a `transform` transition via
  the `~ .bp6-toast` selector. At 100ms it is far shorter than the entrance and exit
  (300ms), and it carries **a 50ms delay** so the gap is closed after the toast has gone.
  A different solution from Atlassian's (250ms, no delay).
- **The 5000ms default duration** is the code-layer value matching the "five-second floor"
  observed at the documentation layer.
- The callout icon sits at `left: 16px; top: 18px` — **the two differ** — the 16px padding
  plus a 2px first-line baseline correction
  (the same 2px correction as shadcn/ui's `translate-y-0.5`).
- The tag is a multiple formula off `--bp-surface-spacing` (4px) —
  min 20 = 4×5, padding 2/6 = 4×0.5 / 4×1.5, large 30 = 4×7.5.

## Characteristic decisions

- **A 10px grid** — unique in the sample. With GOV.UK's 5px, the camp outside multiples of 4
- **A 30px default control height** — the lowest default in the sample. A dense-desktop
  premise
- **Fractional multiplier notation** (`4px * 7.5`) — the grid (10px) and the notation base
  (4px) do not agree
- **A line height of 1.28581** — five-digit precision, unique in the sample
- **Three type steps (12/14/16)** — the fewest steps in the sample, in the 14px body camp
- A single 4px radius (the same "no scale" family as Ant's single 6px)

## Accessibility

~~Unverified~~ → **resolved (2026-08-18, confirmed by headless render).**

Source: https://blueprintjs.com/docs/#core/accessibility
(curl returns an empty shell, but a headless render makes the body readable.)

- **The WCAG version differs by item** — a rare composition in the sample.
  - Colour contrast: "Our colors ... adhere to **WCAG 2.0** standards"
  - Focus indication: "Focus indication states generally adhere to
    **WCAG 2.2 focus appearance**"
- **The focus contrast requirement is pinned to background token names.**
  The default focus indication guarantees **a minimum of 3:1** against background colours up
  to `$light-gray1` in the light theme and up to `$dark-gray5` in the dark theme.
- **The intent outlines carry stated exceptions.** In the `InputGroup`,
  `EditableText` and `NumericInput` family, the light theme holds 3:1 up to `$light-gray4`
  for `warning` alone, and the dark theme up to `$dark-gray5` for `warning` alone
  (the other intents up to `$dark-gray4`).
  A way of **publishing how far the guarantee extends, in terms of token boundaries**.
- **Focus styling is managed by a runtime singleton.** `FocusStyleManager`
  (`isActive()` / `onlyShowFocusOnTabs()` / `alwaysShowFocus()`) hides the focus ring during
  mouse operation and brings it back on Tab.
  It only works if the application **turns it on explicitly.**
  The focus styling of text inputs (a bold coloured outline) is not removed by this utility.
- An escape route: putting `Classes.FOCUS_STYLE_MANAGER_IGNORE` on a container makes its
  descendants always show the focus ring (for trees and the like).

## The Figma kit — absence confirmed (2026-08-18)

The grounds for `figma_kit: false`. **A full render of the documentation site produces the
string `figma` zero times** — measured on a dump including every sidebar item
(Accessibility · Classes · Colors · Typography · Internationalization · Dark theme ·
Variables · Grids & dimensions · all Components).
Blueprint **ships Sass variables and a React implementation only, with no design-tool
assets.**

## Component list — measured from the documentation sidebar (2026-08-18)

Source: a headless render of https://blueprintjs.com/docs/ with the sidebar expanded.
**The classification splits into six groups plus per-package sections.**

- **Components** — Breadcrumbs · Buttons · Button group · Callout · Card ·
  Card List · Control card (Switch/Checkbox/Radio card) · Collapse · Divider ·
  Editable text · Entity Title · HTML elements · HTML table · HotkeysTarget ·
  Icon · Link (new) · Menu · Navbar · Non-ideal state · Overflow list ·
  Panel stack · Progress bar · Resize sensor · Section · Section card ·
  Skeleton · Spinner · Tabs · Tag · Compound Tag · Text · Tree
- **Form Controls** — Form group · Control group · Label · Checkbox · Radio ·
  RadioGroup · HTML select · Segmented control · Slider (Range/Multi slider) · Switch
- **Form Inputs** — Input group · Search input · Text area · File input ·
  Numeric input · Tag input
- **Overlays** — Overlay (deprecated) · Overlay2 · Portal · Alert ·
  Context Menu · Context Menu Popover · Dialog (+ Multistep dialog) · Drawer ·
  Popover (deprecated) · PopoverNext (new) · Toast (OverlayToaster) · Tooltip
- **Context** — BlueprintProvider · HotkeysProvider · OverlaysProvider ·
  PortalProvider
- **Hooks** — `useHotkeys` · `useOverlayStack`
- **Separate package sections** — Datetime 6.2.4 (DatePicker · DateInput ·
  DateRangePicker · DateRangeInput · Time picker · Timezone select) ·
  Icons 6.13.0

**The old and new versions of the same component are exposed in the sidebar together** —
`Overlay` (deprecated) sits beside `Overlay2`, and `Popover` (deprecated) beside
`PopoverNext` (new). The same concern as SLDS's coexisting `slds`/`sds` fallbacks, but
Blueprint reveals the migration **at the level of the documentation's contents.**

## References

- Documentation: https://blueprintjs.com (curl gives an empty shell — resolved by headless
  render, 2026-08-18)
- Tokens: `npm pack @blueprintjs/core@6.18.0` → `lib/scss/variables.scss`
- Components in depth: `package/src/components/button/_common.scss` · `_button.scss` ·
  `forms/_common.scss` · `_input.scss` · `dialog/_dialog.scss` ·
  `overlay/_overlay.scss` · `common/_variables.scss` ·
  `lib/css/blueprint.css` (2026-08-18, @blueprintjs/core@6.18.0)
- **Open questions:** colour (the `$pt-intent-*` family), the dark theme (the v6 prefix is
  `.bp6-`), ~~the component list~~ (sidebar confirmed by render 2026-08-18 — see the section
  above), the actual steps of the spacing utilities, ~~the licence~~ (Apache-2.0 settled),
  ~~the Figma kit~~ (absence confirmed — see above), ~~the accessibility target~~ (resolved —
  see above)
- **Licence resolved (2026-08-18):** `Apache-2.0` — source: github palantir/blueprint → `LICENSE` (matching the npm `@blueprintjs/core@6.18.0` metadata)
