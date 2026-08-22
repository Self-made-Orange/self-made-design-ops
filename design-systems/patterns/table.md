<!-- lang-links -->
> **English** · [한국어](table.ko.md)
<!-- /lang-links -->

# Table

**Comparing cell padding, row height, density, boundary lines and sticky headers.**

> **Sixteen systems carry evidence** (second update, 2026-08-18) — to shadcn/ui ·
> Radix Themes · Mantine · Cloudscape · Polaris · macOS, **ten were added: Carbon ·
> Vuetify · Ant Design · Chakra UI · PrimeVue · Semi · Naive UI · EUI · Blueprint ·
> Grommet**.
>
> The earlier part of this document (the density, cell padding and row height tables and so
> on) rests on **the initial six samples.**
> **The re-verification against 16 is in the "re-synthesis across 16 samples" section, and
> where the two disagree that section takes precedence.**
>
> **"How is the sort UI shown?" and "checkbox or row click for selection?" were read
> separately at the documentation layer** — see the "guidance at the documentation layer"
> section below (seven systems).

## Density — three approaches

| method | systems | steps |
|------|--------|:---:|
| **a density axis in the token values** | **Cloudscape** | 2 (`comfortable` / `compact`) |
| **a component size prop** | **Radix Themes** | 3 (size 1–3) |
| **CSS variable injection** | **Mantine** | unlimited (`--table-vertical-spacing`) |
| **a single value** | **shadcn/ui** | 1 |

### Cloudscape — the token values themselves come in two sets

```json
"space-scaled-m":  { "$value": { "comfortable": "16px", "compact": "12px" } }
"size-vertical-input": { "$value": { "comfortable": "32px", "compact": "28px" } }
```

**Forty-three tokens carry a `compact` axis.** Exactly the same structure as colour tokens
carrying `light`/`dark` — **density is an axis on a par with colour.**

| token | comfortable | compact | reduction |
|------|:---:|:---:|:---:|
| `space-scaled-xxxs` | 2px | **0px** | -2 |
| `space-scaled-xxs` | 4px | 2px | -2 |
| `space-scaled-xs` | 8px | 4px | **-4** |
| `space-scaled-s` | 12px | 8px | -4 |
| `space-scaled-m` | 16px | 12px | -4 |
| `space-scaled-l` | 20px | 16px | -4 |
| `space-scaled-xl` | 24px | 20px | -4 |
| `space-scaled-xxl` | 32px | 24px | **-8** |
| `space-scaled-xxxl` | 40px | 32px | -8 |

**The reduction is not constant** — 2 / 2 / 4 / 4 / 4 / 4 / 4 / 8 / 8.
Not a ratio but **a value decided per step.**

**`xxxs` becomes 0px in compact** — the space disappears.
A result the runtime-factor approach (Vapor UI · Mantine · Radix Themes) cannot produce.
A factor multiplies by 0.75 to make 1.5px; it cannot kill the value to 0.

**There are tokens that reduce the vertical while holding the horizontal.**

| token | comfortable | compact |
|------|:---:|:---:|
| `space-field-vertical` | **5px** | **3px** |
| `space-field-horizontal` | 12px | **12px** (unchanged) |
| `space-button-vertical` | 4px | 2px |
| `space-button-horizontal` | 20px | 16px |
| `space-card-horizontal-default` | 20px | **20px** (unchanged) |
| `space-card-vertical-default` | 16px | 12px |
| `space-option-padding-horizontal` | 20px | **20px** (unchanged) |
| `space-container-horizontal` | 20px | **20px** (unchanged) |

**Four tokens hold their horizontal space.** When density rises,
**only the vertical shrinks to fit more rows, and legibility (the horizontal space) is
preserved.**

A runtime factor cannot distinguish horizontal from vertical — that is the practical gain
of Cloudscape's approach.

**`space-field-vertical` is an odd 5px and 3px.** Odd spacing values are rare in the sample.

### The `compact-table` context — density is enforced inside a table alone

Cloudscape's token file has eight `contexts`.

| context | tokens differing from the default |
|----------|:---:|
| **`compact-table`** | **17** |
| `top-navigation` | 182 |
| `header` | 183 |
| `app-layout-toolbar` | — |
| `flashbar` · `flashbar-warning` | — |
| `alert` · `alert-header` | — |

In the `compact-table` context **the `comfortable` values are overwritten with the
`compact` values.**

```
default:         space-scaled-m = { comfortable: 16px, compact: 12px }
compact-table:   space-scaled-m = { comfortable: 12px, compact: 12px }
```

**Even with the density set to `comfortable`, everything inside a compact table behaves as
compact.**
Buttons, fields and cards placed inside the table narrow automatically (17 tokens).

`top-navigation` and `header` do the same in the other direction, **overwriting the `light`
values with the `dark` values** — the top region always renders in the dark theme (182–183
tokens).

**Cloudscape is the only system in the sample to ship per-context token overrides.**
The exceptions per region are **absorbed at the token layer** rather than in the component
implementation.

### Radix Themes — a three-step size prop

| size | cell padding | min row height | type size | radius |
|:---:|---|:---:|:---:|:---:|
| 1 | `--space-2` (8) | **36px** | `font-size-2` (14) | `--radius-3` (6) |
| 2 | `--space-3` (12) | **44px** | `font-size-2` (14) | `--radius-3` (6) |
| 3 | `--space-3 --space-4` (12 / 16) | **`--space-8`** (48) | `font-size-3` (16) | `--radius-4` (8) |

**Only size 3 has different vertical and horizontal padding** (12 / 16). Sizes 1 and 2 are
even on all sides.

**The minimum row heights are 36 / 44 / 48px.** 44px equals the minimum touch target
(`button.md` — Apple's top toolbar at 44pt).

**Only size 3's row height refers to a spacing token (`--space-8`).**
Sizes 1 and 2 are literals, `calc(36px * var(--scaling))` and
`calc(44px * var(--scaling))` — **because 36 and 44 are not on the spacing scale
(4/8/12/16/24/32/40/48/64).**

It is set as `height: var(--table-cell-min-height)` with a comment reading *"Works as
min-height"* — in a table cell, `height` behaves as a minimum.

There is also `.rt-TableRootTable { height: 0 }`, commented *"Makes `height: 100%` work on
content inside cells"* — a trick for letting elements inside a cell fill the full height.

### Mantine — injected as CSS variables

```css
padding: var(--table-vertical-spacing)
         var(--table-horizontal-spacing, var(--mantine-spacing-xs));
```

**The vertical spacing has no default and the horizontal is `xs` (10px).**
The `verticalSpacing` prop has to be injected.

**No steps are defined** — any of the five spacing tokens can go in.
Unlike Radix Themes' three steps and Cloudscape's two, **it hands the choice to the
consumer.**

### shadcn/ui — a single density

| element | value |
|------|:---:|
| header cell height | **40px** (`h-10`) |
| cell inline padding | **8px** (`px-2`) |
| type size | 14px (`text-sm`) |
| header weight | 500 (`font-medium`) |

**There are no density variants.** The table has no `size` prop.

## Cell padding — comparison across the sample

| system | horizontal | vertical |
|--------|:---:|:---:|
| **shadcn/ui** | **8px** | not stated (controlled by the 40px header height) |
| Radix Themes size 1 | 8 | 8 |
| Radix Themes size 2 | 12 | 12 |
| Radix Themes size 3 | **16** | 12 |
| Mantine (default) | **10px** (`spacing-xs`) | unspecified |
| Cloudscape | (no table-specific token) | — |
| **Polaris** (token) | **6px** (`space-table-cell-padding`) | **6px** |
| **Polaris** (shipped CSS, desktop) | **12px** | **8px** |

**The range is 6–16px.** Polaris's 6px token is the narrowest and Radix Themes size 3's
16px the widest.
Among the framework family alone, shadcn/ui's 8px is the floor.

Polaris's original notation is `padding 8×12px` — read in CSS shorthand order (vertical /
horizontal).

**Mantine's 10px is a consequence of its spacing scale having no `4` or `8`**
(`10/12/16/20/32` — `tokens/scales.md`). Where other systems use 8px, 10px goes in.

## Row height

| system | value |
|--------|-----|
| **shadcn/ui** | header 40px, body rows at content height |
| **Radix Themes** | **minimums of 36 / 44 / 48px** |
| **Polaris** (desktop) | **`min-height: 32px`** |
| **macOS** (design kit) | **row 20pt · column header 28pt** |
| Mantine · Cloudscape | unverified |

**shadcn/ui does not fix the body row height.** Only the header is 40px — each row grows
with its content.

**Radix Themes sets only a minimum** (`height` behaving like `min-height`).
It grows when the content is long.

**The web samples do not use fixed heights** — shadcn/ui, Radix Themes and Polaris all use
a minimum or the content height. Virtual scrolling needs a fixed height, and no web sample
provides that value.

**Only macOS enumerates a single 20pt row** — though that is a component dimension in the
Figma design resource, not a virtual-scrolling guideline.

## Boundary lines — three expressions

| system | method |
|--------|------|
| **Radix Themes** | **`box-shadow: inset 0 -1px`** |
| **Mantine** | `border-bottom` (switching to `box-shadow` on a sticky header) |
| shadcn/ui | unverified (no boundary-line class in the Table source) |

### Radix Themes — row separation by `box-shadow`

```css
--table-row-box-shadow: inset 0 -1px var(--gray-a5);
--table-row-box-shadow: none;            /* the last row */
```

**Not a `border` but an `inset box-shadow`.** It does not affect the layout height and works
regardless of `border-collapse`.

The colour is `--gray-a5` (alpha step 5) — a grey alpha, so it works regardless of the
background colour (`color.md` — Radix Themes has 12 alpha steps for all 33 colours).

`--table-row-background-color` likewise has two values, `transparent` and `var(--gray-a2)`.

### Mantine — it switches to `box-shadow` on a sticky header

A source comment records the reason.

> *"`border-collapse: collapse` drops borders on `position: sticky` cells —
> box-shadow on the (sticky) th. The tr's border-bottom is suppressed…"*

```css
[data-sticky] tr[data-with-row-border] th {
  box-shadow: inset 0 -1px 0 var(--table-border-color);
}
```

**`border-collapse: collapse` and `position: sticky` collide** — borders vanish on sticky
cells. Mantine switches to `box-shadow` in that case alone.

**Radix Themes uses `box-shadow` from the outset and avoids the problem.**

### Boundary colour tokens

| system | token |
|--------|------|
| **Mantine** | `--table-border-color` (light `gray-3` / dark `dark-4`) |
| **Radix Themes** | `--gray-a5` (an alpha reference) |

**Mantine uses opaque colours per mode, Radix Themes an alpha.**
The alpha side does better when the background has several levels (`color.md`).

Mantine's border width is `calc(0.0625rem * var(--mantine-scale))` = **1px × the factor.**
At a 110% factor it becomes 1.1px — **a sub-pixel border appears.**

## Sticky headers

**Among the initial six samples only Mantine's implementation was confirmed** (the 16-sample
values are in "re-synthesis across 16 samples — sticky header z-index" below).

| item | value |
|------|-----|
| `position` | `sticky` |
| `top` | `var(--table-sticky-header-offset, 0)` |
| `z-index` | **3** |

**The offset is a variable** — if the page has a fixed top bar, its height goes in.

**`z-index: 3`.** A literal, unrelated to Mantine's own level tokens —
the systems that tokenise z-index are Chakra, Bootstrap, Open Props, Forma 36, Vibes, Solid
and Pluralsight, seven in all.

Sticky columns draw their boundary with `data-with-column-border` and a `::before`
pseudo-element — avoiding the same `border-collapse` problem.

**Radix Themes' and shadcn/ui's sticky header values were not confirmed.**
**Cloudscape was confirmed at `z-index: 798` plus a sticky-column shadow of
`4px 0 8px 1px` and `clip-path: inset(0 -24px 0 0)`** (2026-08-18) —
see "re-synthesis across 16 samples" below.

## Striping and hover

| system | striping | hover |
|--------|:---:|:---:|
| **Mantine** | `--table-striped-color` (light `gray-0` / dark `dark-6`) | `--table-hover-color` (light `gray-1` / dark `dark-5`) |
| **Radix Themes** | `--table-row-background-color: var(--gray-a2)` | unverified |
| **macOS** | **`Alternating Gray`** (enumerated as a kit variant) | unverified — instead a `Selected` / **`Selected Inactive`** axis |
| shadcn/ui | unverified | unverified |

**Mantine's stripe (`gray-0`) is lighter than its hover (`gray-1`).**
Hover has to override the stripe, so the order is right.

### Mantine — it swaps hover for `:active` on touch devices

```css
@media (hover: hover) { tr:hover[data-hover] { background: var(--tr-hover-bg) } }
@media (hover: none)  { tr:active[data-hover] { background: var(--tr-hover-bg) } }
```

**Under `@media (hover: none)` it substitutes `:active` for `:hover`.**
On a touch device `:hover` persists after a tap, leaving the wrong row highlighted.

**Mantine is the only system in the sample to branch state on `@media (hover: …)`.**

It is a different solution to the same problem as visionOS's gaze-based hover
(`patterns/button.md`) — **judging "is there hover?" by media query rather than by
platform.**

## Numeric alignment — an option (Mantine) and a default (Chakra)

```css
/* Mantine — an option turned on by attribute */
[data-tabular-nums] { font-variant-numeric: tabular-nums; }
```

```js
// Chakra UI — unconditionally on the table root
root: { fontVariantNumeric: "lining-nums tabular-nums", … }
```

**Tabular figures line up the digits of a numeric column.**

> **Correction (2026-08-18).** "Mantine is the only system in the sample to expose
> `font-variant-numeric`" is wrong. **Chakra UI applies it to the table `root` by default**
> (not as an option). The same conclusion with a different default —
> see "re-synthesis across 16 samples" below.

## Caption position

| system | value |
|--------|-----|
| **shadcn/ui** | `caption-bottom` (fixed) |
| **Mantine** | `var(--table-caption-side, bottom)` (changeable) |

**Both default to the bottom.** The browser default for HTML `<caption>` is the top, so both
change it explicitly.

shadcn/ui's caption: `mt-4 text-sm text-muted-foreground` (a 16px top margin).

## A cell containing a checkbox — shadcn/ui's `:has()` approach

```
[&:has([role=checkbox])]:pr-0
[&>[role=checkbox]]:translate-y-[2px]
```

**CSS `:has()` changes the padding according to the cell's contents.**

| condition | treatment |
|------|------|
| the cell contains a checkbox | **right padding 0** |
| the cell's direct child is a checkbox | **moved down 2px** |

**The checkbox is lowered 2px. The source gives no reason.**

The same pattern as the Button's `has-[>svg]:px-3` (reducing the padding when an icon is
present, `button.md`) — **shadcn/ui uses `:has()` as its standard tool for conditional
styling.**

**Other approaches to the checkbox column are confirmed too** (2026-08-18):
**Carbon** enumerates a separate `table-column-checkbox` vertical padding for each of its
five density steps (at xs pinning the checkbox label height to `a 24px row − 1px border =
23px`, with a comment), while **EUI** sets the checkbox column width at `size.xl` (32px),
**Cloudscape** at `--size-table-selection-horizontal` (40px) and **Ant** at
`selectionColumnWidth: controlHeight` (32px) — **column-width tokens.**
Only shadcn/ui solves it with `:has()`; **the rest use dedicated tokens and selectors.**

## Table variants

| system | variants |
|--------|------|
| **Radix Themes** | `surface` (with a background and border) · `ghost` (without) |
| **Mantine** | `data-variant='vertical'` (**the header is the left column**) |
| shadcn/ui | none |

**Mantine's `vertical` variant makes the first column the header** —
`font-weight: medium` plus a background colour (`gray-0` / `dark-6`).
A table in the form of an attribute-value list.

**Radix Themes' `surface` uses `background-clip: padding-box`** — keeping the background
from spilling past the border inside a rounded container.

## Guidance at the documentation layer — measured (2026-08-18)

The table guidance of seven systems was read. **M3 has no data table component at all**
(confirmed against the component list), and GOV.UK's table has no sorting or selection
guidance — table rules are the province of enterprise systems.

### The sort UI — only Carbon and Cloudscape define it

- **Carbon codifies three states**: unsorted (a two-way arrow) → sorted-up →
  sorted-down. **The icon is shown only on hover and when sorting is active** — an unsorted
  column's arrow appears on hover alone
- **Cloudscape goes as far as sorting policy**: single-column sorting is the default (multi
  only on analysis screens — a numbered priority badge plus a direction arrow), the default
  sort column is chosen from the user's data, and alternative text such as "Creation date
  unsorted" is required on the header
- Atlassian, Spectrum and Polaris current: no rule (confirmed)

### Row selection — "only when there is an action, and with a checkbox column" is the convergence

- **The shared principle (Spectrum and Cloudscape agree almost word for word)**: **"offer
  selection only when an action can be taken on a row"** — a rule about the very condition
  for having selection
- **A checkbox column is the only prescribed method**: Spectrum (a checkbox on the left) ·
  Carbon (multi = checkboxes plus a three-state select-all in the header / single = a radio
  in the first column).
  **Zero systems prescribe row-click selection** — Polaris current uses the row click not
  for selection but to link the primary action (clickDelegate), and states the accessibility
  limitations
- **Cloudscape's defensive rules**: **reset the selection** when pagination, sorting or
  filters change (preventing action on items selected unawares), show the selection count in
  a header counter (1/150), and do not use a radio selection change as an action trigger
- shadcn/ui's `:has([role=checkbox])` premise is consistent with this convergence (a
  checkbox column)

## Deep-pass carry-over — the table axis grew by two (2026-08-18)

> This section is **a record from the first deep pass (79 samples)**. A table-axis
> reinforcement carried out the same day took the evidence to 16 systems —
> **the "re-synthesis across 16 samples" section below is the current one.**

In the `partial` deep pass (79 systems), **table component measurements were newly obtained
for only two systems, Polaris and macOS.**
The evidence went from 4 to **6 systems.**

> **The table axis grew by only two systems in that deep pass — table components were
> relatively low priority for it.** The pass concentrated on buttons, inputs and modals.
> All 79 system documents were searched exhaustively for table keywords, but measurements
> such as cell padding and row height are confirmed only in the six above; for the rest only
> **the fact that `table` appears in a component list** is confirmed. Hence no large
> re-synthesis section was written and only the values obtained were folded into the tables
> above.

### Polaris — it names a table-specific spacing token

| layer | value |
|-----|-----|
| React tokens | `space-table-cell-padding` = `space-150` = **6px** |
| the web-component shipped CSS (desktop) | cell padding **8×12px** · **`min-height: 32px`** · type 14 → **13px** |

**Polaris is the only one of the six samples obtained to name a table-specific spacing
token.**
Cloudscape uses the shared `space-scaled-*` directly for cell padding, and the other four
have values only in component CSS.

**The token (6px) and the shipped CSS (8/12px) disagree.** Polaris is a system in which a
React edition and a web-component edition coexist (`systems/polaris.md` — the button heights
differ between editions too), and the same fault line shows in the table cell padding.
**Which is current could not be confirmed.**

**It reduces the table type by 1px against the body** (14 → 13px). The same desktop
reduction applies to input fields (13px type, a 32px `min-height`) and buttons (14 → 12px) —
**it is not a table decision but a general desktop density reduction.**

### macOS — a 20pt row and a 28pt column header

| item | value |
|------|:---:|
| row height | **20pt** |
| column header height | **28pt** |
| row background axis | `Selected` / **`Selected Inactive`** / **`Alternating Gray`** |
| tree indent | Levels 0–4 enumerated |

**20pt is the lowest row height among the six samples obtained** — about half Radix Themes'
minimum (36px), and no web sample goes that low. These are desktop-native coordinates.
Row 20 and column header 28 sit on the macOS control ladder of five steps (16 · 20 · 24 ·
28 · 36) — **the table has no dimensional system of its own and uses the shared ladder.**

**`Alternating Gray` is the striping** — enumerated **as a state variant of the kit**, not
as a colour token.

**`Selected Inactive` is a selected row while the window is inactive.** A multi-window
desktop premise; according to `systems/macos.md`, Push Button, Stepper and List selected
rows all carry an `Active Window` axis. **The web samples have no such axis.**

These values are, though, **component dimensions from the Figma design resource**, not CSS
or token layer values.

### Systems with a table component whose values are unconfirmed

| system | what is confirmed |
|--------|-----------|
| **Blueprint** | **a dedicated `@blueprintjs/table` package** — evidence of a system centred on the data grid |
| **DSFR** | a `table` component plus **a 0.3s `transform` on the sort arrow** (the only transition in `button.css`) |
| **smarthr** | **a table column background token (`column`)** — reused on readonly inputs' border and background |
| **Cedar** | `table` in the component token JSON |
| **Grommet** | a `DataTable` component (of some 95) |
| bf-solid · Clarity · Forma 36 · Pharos · Stacks · Vanilla | `table` in the component list |

**DSFR's sort arrow is the only sort-UI datum confirmed at the code layer** — there is
effectively no implementation value in the sample corresponding to the Carbon and Cloudscape
rules (documentation layer) in the section above.

**smarthr's `column` token was observed not on a table but on an input** — it paints
readonly fields in "the table column colour". The table's own values could not be confirmed.

### Effect on the earlier conclusions

> **Correction — the floor of the "8–16px" cell padding range comes down to 6px.**
> Polaris's `space-table-cell-padding` is **6px**. Since the same system's shipped CSS is
> 8/12px, though, whether 6px is the actual rendered value is unconfirmed.
> **The floor for the framework family is still 8px** (shadcn/ui · Radix Themes size 1).

> **Correction — a 44px row height is not "the default" but a touch value.**
> Among the six samples obtained, desktop table row heights are **macOS 20pt · Polaris 32px ·
> Radix Themes size 1 36px**, and 44px appears only from Radix Themes size 2 up.
> The row-height item under "implementation defaults" below has been split by platform.

**The density recommendation is not contradicted — it is reinforced.** The compact
combination recommended below (vertical 8 / horizontal 12) **matches Polaris's shipped
desktop values.** It was derived from Cloudscape's "reduce the vertical, keep the
horizontal" and has now met an independent system's shipped values.

**The recommendations on boundary lines, hover, striping, captions, sticky headers and
numeric alignment are not contradicted by the new data** — neither Polaris nor macOS has
those values confirmed, so there is neither refutation nor reinforcement.

## Re-synthesis across 16 samples — component measurements (2026-08-18)

To resolve the thinness of the table axis, the component CSS, tokens and source of **ten
systems that actually ship tables** were newly read
(Carbon `@carbon/styles@1.113.0` · Vuetify `4.1.10` · Ant `antd@6.6.1` ·
Chakra `@chakra-ui/react@3.36.1` · PrimeVue `@primeuix/themes@3.0.0` ·
Semi `@semi-bot/semi-theme-default@1.0.0` · Naive UI `2.45.0` ·
EUI `@elastic/eui@119.0.0` · Blueprint `@blueprintjs/table@6.2.4` ·
Grommet `2.56.0`). For Cloudscape the shipped CSS of
`@cloudscape-design/components@3.0.1348` was read in addition, correcting the earlier
description.

### Density — having steps is the majority; the number of steps scatters from 1 to 5

| steps | systems |
|:---:|--------|
| **5** | **Carbon** (xs 24 / sm 32 / md 40 / **lg 48 default** / xl 64px) |
| **3** | Vuetify (default/comfortable/compact) · Chakra (sm/md/lg) · PrimeVue (sm/default/lg) · Semi (default/middle/small) · Ant (default/middle/small) · Radix Themes (size 1–3) · Naive UI (three exposed, **two in value**) |
| **2** | Cloudscape (comfortable/compact) · EUI (default/compressed) · Blueprint (default/large) |
| **1 or none** | shadcn/ui · Grommet · Polaris · macOS |
| **unlimited** | Mantine (CSS variable injection) |

**Twelve of the 16 samples have a density or size axis.** Contrary to the impression that
"density variants are an enterprise thing", consumer-facing frameworks (Vuetify, Chakra,
Naive) mostly have them too.

**Naive UI exposes three steps while medium and large share the same cell padding** (both
12px) — a case of the step names and the actual value steps falling out of step.

### Cell padding — the floor comes down to 2px vertically

```
vertical 0     Vuetify · Blueprint          (the height is set with height, so there is no vertical padding)
vertical 2     PrimeVue sm · Carbon xs
vertical 4     EUI compressed
vertical 6     the Polaris token
vertical 7     Carbon sm and md (an asymmetric 7/6)
vertical 8     Chakra sm · Semi small · Ant small · Radix 1 · Cloudscape · Naive small · Polaris shipped
vertical 12    Chakra md and lg · Radix 2 and 3 · Semi middle · Ant middle · Naive medium and large
vertical 16    Carbon lg and xl · Semi default · Ant default
```

```
horizontal 6     PrimeVue sm
horizontal 8     shadcn/ui · Radix 1 · Blueprint · EUI · Chakra sm · Ant middle and small · Polaris
horizontal 10    Mantine (the scale has no 8)
horizontal 12    Chakra md · Radix 2
horizontal 14    PrimeVue default
horizontal 16    every Carbon step · every Semi step · Ant default · Chakra lg · Vuetify · Radix 3
horizontal 19    Cloudscape (20 − a 1px border)
```

> **Correction — the cell padding floor comes down from 6px to 2px.**
> The earlier edition's floor was Polaris's 6px token. **PrimeVue `sm` is 2 vertical / 6
> horizontal, and Carbon `xs` is 2px vertical.** Both are values of **the tightest density
> step**, though, and the floor at the default step is still 8px (Chakra sm · Radix 1 ·
> shadcn/ui).

### Does raising density reduce only the vertical — the majority yes, with a counterexample

| attitude | systems |
|------|--------|
| **reduce the vertical, hold the horizontal** | **Cloudscape · Semi (fixed at 16) · Carbon (fixed at 16) · Polaris** |
| reduce both | Chakra (12/12 → 8/8) · PrimeVue (vertical 8→2 / horizontal 14→6) · Radix Themes · Naive UI |
| **reduce the horizontal more** | **Ant Design** (default 16/16 → middle vertical 12 / **horizontal 8**) |

**Only Ant goes the other way.** At middle it halves the horizontal (16→8) while reducing
the vertical only from 16 to 12. It is the sole counterexample to this document's
Cloudscape-derived recommendation that "reducing the horizontal costs legibility", and
**the reason is not in the source.**

### Row height — systems that actually ship a fixed value have appeared

| method | systems · values |
|------|-------------|
| **a fixed `height`** | **Carbon** 24/32/40/**48**/64 · **Vuetify** header 56/48/40 · rows 52/44/36 · **Blueprint** 20 (large 30) |
| **a minimum height** | Radix Themes 36/44/48 · Polaris 32 · EUI basic table 24 |
| **derived from content** | shadcn/ui · Semi · Ant · Chakra · PrimeVue · Naive UI · Mantine · Cloudscape · Grommet |
| kit dimensions | macOS 20pt (column header 28pt) |

> **Correction — "the web samples do not use fixed row heights" is wrong.**
> **Carbon (all five steps with a fixed `block-size`) · Vuetify (a fixed
> `--v-table-row-height`) · Blueprint (a 20px JS constant)** — three web systems ship fixed
> row heights.
> The majority is still derived (nine samples), though, against three with a minimum height
> and three fixed.

> **Correction — "the sample has no reference fixed row height for virtual scrolling" is
> resolved too.**
> The default row heights of the two systems that ship a virtual-scrolling grid are
> **Blueprint's `@blueprintjs/table` at 20px and EUI's `EuiDataGrid` at 34px.**
> Blueprint's 20px equals the macOS design kit's row height, and
> **EUI keeps a document-style table (content height) and a grid (a fixed 34px) side by side
> in one system.**

Gathering only the default steps gives **48px (Carbon) · 52px (Vuetify) · 32–36px (Polaris,
Radix 1) · 20px (Blueprint, macOS)** — **there is no single mode.**

### Boundary lines — border is the majority; box-shadow is a minority, used for a purpose

| method | systems |
|------|--------|
| **`border-bottom` / `border-block-end`** | Carbon · Semi · Ant · Chakra (`line`) · Naive UI · PrimeVue · EUI · Vuetify (the gridlines variant) |
| **`box-shadow` throughout** | **Radix Themes · Blueprint** |
| **box-shadow only where needed** | Mantine (sticky headers) · Vuetify (sticky headers) · Chakra (the `outline` variant uses a ring) |

**Box-shadow throughout is still a minority (2 of 16).** The systems that know about the
`border-collapse` + `position: sticky` collision **switch only on the sticky header**
(Mantine and Vuetify both use `inset 0 -1px`).

**There is a camp with borders both above and below** — Carbon and Cloudscape set
`border-block-start` to the background colour or transparent and use only
`border-block-end` as a solid line.
**The row height does not change when the top border takes a colour on hover or selection.**
Rather than changing the border thickness by state, it is **a slot prepared in advance where
only the colour changes.**

**Systems that thicken only the line under the header**: Semi (body 1px / under the header
**2px**).

### Sticky header z-index — the values scatter into three digits

```
798   Cloudscape        (a value inside the app layout's stacking scheme)
101   Semi              (a literal, unrelated to any other levels)
  3   Mantine
  2   Ant Design        (the zIndexTableFixed constant)
  1   Carbon · Chakra · Vuetify   (Vuetify uses 2 only on the sticky row ∩ column cell)
0–21  Blueprint         (subdivided into 13 levels inside the table)
```

**There is no cross-system recommended value.** **The practice of keeping the offset as a
variable converges**, though — Chakra's `--table-sticky-offset` · Mantine's
`--table-sticky-header-offset` · shadcn/ui the same shape. Three unrelated systems arrived
at nearly the same name.

**Only Blueprint divides z-index into levels inside a single table** (cells 0–3 · quadrants
10–13 · the selection region 20 · interactive cells 21) — a requirement of the four-quadrant
virtual-scrolling grid.

### Striping and hover — striping is an option, and hover may not be the default

- **Striping implementations**: an `nth-child(odd)` background (Carbon · Chakra · Blueprint)
  · two variants, `nth-child(even)`/`(odd)` (**Vuetify**, with a
  `background-image: linear-gradient`) · a single token (PrimeVue's
  `row.stripedBackground` · Naive's `tdColorStriped` · Mantine)
- **Only Vuetify uses a gradient image rather than a background colour** — leaving
  `background-color` free so it can coexist with selection and hover backgrounds
- Blueprint's stripe colours `#ffffff` / `#fafbfc` differ **by about 1% in lightness**
- **In Chakra hover is not the default** — it appears only with the `interactive` variant.
  A case in the sample held of making row hover opt-in
- **Vuetify does hover as a `td::after` overlay too** (the same mechanism as its button
  state layer)
- Systems with sticky columns **paint the hover colour twice** — Semi re-applies the same
  colour to a sticky cell with a `::before` (since a sticky cell carries an opaque
  background)

### The sort UI — "unsorted only on hover" converges at the code layer

| system | icon size | unsorted state |
|--------|:---:|------|
| **Carbon** | **20px** | **`opacity: 0`** → 1 when sorting is active, descending gets a `rotate(180deg)` with a transition |
| **Vuetify** | 16px (order badge 20px) | **`opacity: 0`** → **0.5** on hover and focus |
| Semi | 16px | always shown, `primary` coloured when active |
| Naive UI | 15px | unverified |
| PrimeVue | **12px** | unverified |
| DSFR | unverified | a 0.3s `transform` on the arrow |

> The earlier edition recorded that "the only implementation value for a sort UI is DSFR's
> 0.3s".
> **Two systems, Carbon and Vuetify, independently implement "the unsorted arrow is visible
> only on hover"** — the code-layer counterpart of Carbon's documented rule (three states)
> is confirmed, and Vuetify reaches the same rule with an opacity of 0.5.

**The scope of the sort highlight parts.** Carbon and Semi change the header cell only,
while **Naive UI and Ant change the body cells too** (`tdColorSorting` · `bodySortBg`).

### Table-specific token names — 6 of the 16 have them

| system | tokens |
|--------|------|
| **Cloudscape** | `--space-table-horizontal` (20px) · `--space-table-content-bottom` (4px) · `--space-table-header-tools-bottom` (0) · `--size-table-selection-horizontal` (40px) |
| Polaris | `space-table-cell-padding` (6px) |
| PrimeVue | the whole `datatable.*` slot token set (header/bodyCell/row/sortIcon …) |
| Naive UI | `thPadding{Small,Medium,Large}` · `tdPadding*` · `sorterSize` |
| Ant Design | `cellPaddingBlock/Inline{,MD,SM}` · `zIndexTableFixed` |
| Mantine | the `--table-*` CSS variable group |
| **reusing shared tokens** | **Carbon** (the `layout.size('height')` ladder plus `$spacing-05`) · Chakra · Vuetify · Semi · EUI · Grommet |

> **Correction — "Cloudscape has no `space-table-*` tokens" is wrong.**
> They are absent from the design-token package
> (`@cloudscape-design/design-tokens`), but **the four above exist under table-specific
> names in the component package's shipped CSS.**

**Carbon is the opposite extreme** — it keeps no table-specific dimension tokens and
**inherits the size from the context** via `layout.use('size', …)`. The density setting of
the region wrapping the table decides the table's size.

### Tabular figures — a system that turns it on by default has appeared

> **Correction — "Mantine is the only system to expose `font-variant-numeric`" is wrong.**
> **Chakra UI applies `fontVariantNumeric: "lining-nums tabular-nums"` to the table `root`
> by default, with no option.** The same property is in its badge recipe too.
> Mantine's is an option that has to be turned on with a `data-tabular-nums` attribute —
> **the same conclusion with a different default.**

### The habit of subtracting the border from the padding shows in tables too

**Cloudscape** sets the cell's horizontal padding to `calc(20px − 1px)` and the vertical to
`calc(8px − 1px + 2px)` plus `margin-block: -2px` (borrowing 2px so the focus ring is not
clipped at the cell boundary, then reclaiming it). The border-subtraction habit observed
across 12 systems in `patterns/button.md` is confirmed in table cells too.

### Other single observations

- **EUI removes `thead` and `tfoot` with `display: none` on mobile** — rearranging the cells
  into vertical cards. A case in the sample held of prescribing a table's mobile layout in
  CSS
- **Grommet has no cell padding or row height tokens at all** — it delegates to `Box` pad
  rules and handles the sticky header not with colour but with **`opacity: 'strong'`**
- **Cloudscape's sticky column shadow carries a `clip-path: inset(0 -24px 0 0)`** so the
  shadow leaks in one direction only. The sticky cell's padding transition is 90ms
- **Blueprint gives cells four `intent`s** (a 10%-alpha background plus a text colour) — a
  case of standardising state colour at cell level
- **PrimeVue switches table transitions off explicitly** (`root.transitionDuration: "0s"`)

## Not yet filled in

- ~~The sort UI / selection method~~ → **resolved (2026-08-18)** — the "guidance at the
  documentation layer" section above
- **Column resizing** — shadcn/ui has a separate `resizable` component, but its combination
  with the table is unverified
- **Empty state** — shadcn/ui has an `empty` component. The source is unread
- **Pagination** — shadcn/ui has a `pagination` component. The source is unread
- ~~A fixed row height for virtual scrolling~~ → **resolved (2026-08-18)** —
  Blueprint's `@blueprintjs/table` at **20px** (`defaultRowHeight`, with a 150px column
  width) · EUI's `EuiDataGrid` at **34px** (`DEFAULT_ROW_HEIGHT`). See "re-synthesis across
  16 samples" above
- ~~Cloudscape's table-specific tokens~~ → **resolved (2026-08-18, a correction)** — absent
  from the design-token package but present in the component's shipped CSS as
  **`--space-table-horizontal` (20px) · `--space-table-content-bottom` (4px) ·
  `--space-table-header-tools-bottom` (0) · `--size-table-selection-horizontal` (40px)**
- **shadcn/ui's boundary lines** — there is no border class in the Table source.
  There is a global `* { @apply border-border }`, but whether it applies to the table could
  not be confirmed
- **Radix Themes' hover and striping** — `--table-row-background-color` has two values, but
  which is hover and which is striping could not be confirmed from the selectors
- **The z-index scale** — whether Mantine's sticky-header `3` is a literal or from its own
  scale is unverified.
  Across the 16 samples the sticky-header z scatters from 1 to 798, so there is no
  cross-system recommended value.
  The z-index token itself exists in eight systems, Chakra among them
  (EUI's `levels.js` added — `systems/eui.md`)
- **Polaris's two cell padding values** — which of the 6px token and the 8/12px shipped CSS
  is current could not be confirmed. It is the React-edition / web-component-edition
  coexistence problem (`systems/polaris.md`)
- **The remaining systems with a table component** — ~~Blueprint~~ · ~~Grommet~~ →
  **resolved (2026-08-18)**. For DSFR · Cedar · Clarity · Pharos · Stacks · Vanilla ·
  bf-solid · Forma 36 · smarthr only the component's existence is still confirmed
- **Whether striping exists** — no striping selector or token could be found in the Semi,
  Ant or EUI distributions. Whether it is absent or named differently could not be confirmed
- ~~The sort UI at the code layer~~ → **resolved (2026-08-18)** — Carbon (20px, unsorted at
  `opacity: 0` plus a 180° rotation for descending) · Vuetify (16px, unsorted 0 → hover
  0.5) · Semi (16px) · Naive UI (15px) · PrimeVue (12px). See "re-synthesis across 16
  samples" above
- **macOS row background colour values** — `Alternating Gray` and `Selected Inactive` are
  enumerated as kit variants, but the actual colour values could not be read

## Implementation defaults

**Density — start with two steps** (12 of the 16 samples have a density or size axis).

```
comfortable  vertical 12px  horizontal 12px
compact      vertical  8px  horizontal 12px
```

**To go further, Carbon's five steps (row heights of 24 / 32 / 40 / 48 / 64px) are the
widest span in the sample held.** Three steps is the mode (seven systems) and two is next.

**Reduce the vertical and hold the horizontal.** Cloudscape keeps four tokens —
`space-field-horizontal`, `space-card-horizontal-default`, `space-container-horizontal` and
`space-option-padding-horizontal` — independent of density.
Reducing the horizontal costs legibility rather than gaining density.

**Across the 16 samples this attitude is confirmed in four (Cloudscape · Semi · Carbon ·
Polaris), and only Ant Design goes the other way** (halving the horizontal from 16 to 8 at
middle while the vertical goes 16 to 12). Semi and Carbon fix the horizontal at 16px across
every density step — **three independent systems arrived at the same rule.**

**A runtime factor (`calc(var(--scale) * N)`) cannot do this** —
it cannot distinguish horizontal from vertical, and it cannot produce 0px.
**If you plan to support density modes, put the axis in the token values as Cloudscape
does** (see the "runtime factor" section of `tokens/scales.md`).

**To go to three steps, Radix Themes' values are the reference.**

```
size 1   padding  8    min height 36
size 2   padding 12    min height 44
size 3   padding 12/16 min height 48
```

**In a touch environment use a minimum row height of 44px or more** — Radix Themes size 2's
value, and the same as Apple's minimum touch target.

**Cell padding**

```
horizontal 8–16px  (12 by default)
vertical   8–12px
```

**The floor at the default step is 8px** (shadcn/ui · Radix Themes size 1 · Chakra sm ·
Cloudscape). **Going down to the tightest density step reaches 2px vertical and 6px
horizontal** (PrimeVue `sm` · Carbon `xs`, corrected 2026-08-18) — though it is safer to
regard those as reserved for screens whose purpose is scanning, such as logs and monitoring.
Where data density is not the goal, 12px is unobjectionable.

**Taking a fixed 16px horizontal as the base axis is a real option too** —
Carbon and Semi do not change the horizontal 16px across any density step.

**Polaris's shipped desktop values (vertical 8 / horizontal 12) match the compact
combination above** — the point where "reduce only the vertical", derived from Cloudscape,
met an independent system's shipped values.

**Row height — it parts by platform and purpose** (second correction, 2026-08-18).

```
touch                 44 and up  (Radix Themes size 2 · Apple's touch target)
desktop web, roomy    48–52      (Carbon lg 48 · Vuetify default 52)
desktop web, dense    32–36      (Polaris 32 · Radix 1 36 · Carbon sm 32 · Vuetify compact 36)
virtual-scrolling grid 20–34     (Blueprint 20 · EUI DataGrid 34)
desktop native        20–28      (macOS row 20 · column header 28)
```

**The earlier edition recommended 44px as a single default, but that is a touch value.**
It is excessive for a dense desktop table.

**"The web samples do not use fixed heights" is corrected too** — Carbon, Vuetify and
Blueprint, three web systems, ship fixed row heights. Since **derived is still the majority
at nine samples**, though, setting only a minimum is unobjectionable unless there is a
particular reason (virtual scrolling, an aligned row grid). In a table cell `height` behaves
like `min-height`, so specifying it with `height` is fine (the Radix Themes way).

**If you use virtual scrolling, Blueprint's 20px and EUI's 34px are the references**
(replacing the earlier edition's "the sample has no value to refer to"). Blueprint runs 12px
type on a 20px line height, and EUI's 34px is against 14px type.

**Boundary lines — use `box-shadow: inset`.**

```css
box-shadow: inset 0 -1px var(--gray-a5);
```

**A `border` disappears under `border-collapse: collapse` + `position: sticky`.**
That is why Mantine switches to `box-shadow` on sticky headers alone, and Radix Themes uses
`box-shadow` from the outset — **the latter is simpler.**

**Use an alpha token for the colour** (`--gray-a5`). An opaque grey falls out of step over
striped and hover backgrounds.

**Do not multiply the border width by a runtime factor.** Mantine's
`calc(0.0625rem * var(--mantine-scale))` becomes 1.1px at a 110% factor —
sub-pixel rendering blurs the line.

**Hover — branch on touch devices.**

```css
@media (hover: hover) { tr:hover  { … } }
@media (hover: none)  { tr:active { … } }
```

The Mantine way. **On touch, `:hover` persists after a tap** — the wrong row stays
highlighted.

**Keep the stripe lighter than the hover.** Mantine uses `gray-0` (stripe) / `gray-1`
(hover).

**Use `font-variant-numeric: tabular-nums` on numeric columns — applying it to the table
root by default is recommended** (updated 2026-08-18).

**Chakra UI applies `lining-nums tabular-nums` to the table `root` with no option.**
Mantine's is an option that has to be turned on by attribute — the same conclusion with a
different default.
Proportional figures put the digits out of line and make column comparison hard, so
**on should be the default.**

**Put the caption at the bottom.** Both systems explicitly change the browser default (the
top).

**The checkbox column**

```
right padding 0
vertical alignment matched to the text
```

It can be automated with `:has([role=checkbox])` (the shadcn/ui way).
It cannot be expressed as a token, so it goes into the component implementation.

**Sticky header**

```
position: sticky
top: var(--sticky-header-offset, 0)
z-index: 1–3  (inside your app's stacking scheme if you have one)
```

**Keep the offset as a variable** — if the page has a fixed top bar, the header has to drop
by its height.
Hardcoding 0 hides the header behind the top bar.
**Three unrelated systems (Chakra's `--table-sticky-offset` · Mantine's
`--table-sticky-header-offset` · shadcn/ui) arrived at the same name.**

**No cross-system recommendation is possible for the z-index value** — across the 16 samples
it scatters over 1 (Carbon, Chakra, Vuetify) · 2 (Ant) · 3 (Mantine) · 101 (Semi) · 798
(Cloudscape).
**Use a value from your app-wide level tokens if you have them, and 1–3 if you do not.**
Large values collide with modals and toasts.

**Consider narrowing the components inside a table automatically.**
Cloudscape's `compact-table` context overrides 17 tokens to make buttons, fields and cards
inside a table compact. **Absorbing it at the token layer has fewer omissions** than passing
a prop down to every component.
