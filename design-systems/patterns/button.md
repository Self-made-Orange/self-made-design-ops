<!-- lang-links -->
> **English** · [한국어](button.ko.md)
<!-- /lang-links -->

# Button

**Button measurements are held for 77 systems** (re-synthesised 2026-08-18).
The individual values are in the "components in depth" section of each `systems/*.md`;
this document carries **only the distribution and the cross-system conclusions**.
The tables below were written from the initial sample (weighted towards the framework
family); the re-verification against the 77 is in the "re-synthesis over 77 samples"
section — **where the two disagree, the re-synthesis takes precedence.**

> Guidance on component usage (which variant to use when) lives on each system's
> documentation site, and is blocked in this environment. What follows is only
> **what could be confirmed from tokens, source code and measured dimensions.**
>
> **The arrival of four framework-family systems greatly increased this document's
> evidence.**
> shadcn/ui publishes its component source, so **variants, states, dimensions and padding
> can all be read** — the only system in the sample confirmed to this depth.

## Height / touch target

| system | value | source |
|--------|:---:|------|
| Material 3 | 48dp (the minimum touch target) | documentation convention |
| **Material 3 Expressive — five button steps** | **32 / 40 / 56 / 96 / 136dp** (default Small = 40) | androidx generated tokens |
| **Apple iOS — top toolbar** | **44pt** | measured in Figma |
| **Apple iOS — bottom toolbar** | **48pt** | measured in Figma |
| Apple iOS — sheet toolbar | 44pt | measured in Figma |
| Apple iOS — text button | 36pt | measured in Figma |
| Apple iOS — back button | 36pt | measured in Figma |
| visionOS — dropdown | 44pt | measured in Figma |
| Ant Design | 32px (the `controlHeight` seed) | token |
| Orbit | 16 / 24 / 32 / 44 / 52px (the `size` scale) | token |
| **Mantine** | **30 / 36 / 42 / 50 / 60px** (`xs`–`xl`, default `sm` = 36) | CSS variables |
| **Radix Themes** | **24 / 32 / 40 / 48px** (size 1–4) | referring to `--space-5`–`8` |
| **shadcn/ui** | **24 / 32 / 36 / 40px** (`xs`/`sm`/`default`/`lg`) | source classes |
| **Cloudscape** | ≈32px (derived from padding) — radius **a 20px pill**, border 2px | component CSS |
| **Garden** | 32 / **40** / 48px | classic CSS |
| **Atlassian** | **32** / 24 (compact) px — the old version is `32/14em` | build output |
| **Orbit (shared with forms)** | 32 / **44 (default)** / 52px | token dist |

### The three frameworks' height scales — the bases differ

| step | Mantine | Radix Themes | shadcn/ui |
|:---:|:---:|:---:|:---:|
| 1 | 30 | **24** | **24** |
| 2 | 36 | 32 | 32 |
| 3 | 42 | 40 | **36** |
| 4 | 50 | 48 | 40 |
| 5 | 60 | — | — |
| **default** | **36 (`sm`)** | 32 (size 2) | **36 (`default`)** |

- **Only Radix Themes steps by an even 8px** (24/32/40/48), because it uses the spacing
  tokens (`--space-5`–`8`) directly as heights
- **Mantine's increments run +6/+6/+8/+10**, widening towards the top. At a maximum of 60px
  it is the largest
- **shadcn/ui's third step is 36px**, so the increments on either side (32→36→40) are 4px.
  It is denser than the other two and its maximum, 40px, is the lowest
- **The default is 36px in both Mantine and shadcn/ui.** The step names differ but the
  values coincide (`sm` vs `default`)
- **None of the three meets a 44–48pt touch target at its default.**
  Mantine `lg` (50) · Radix size 4 (48) · shadcn/ui cannot reach 48 at any step.
  **They presume desktop web** — the counterexample is **Orbit**: the default of its
  form-wide height is **44px**, the only web system whose default already meets the touch
  target (a travel B2C mobile-web premise, `systems/orbit.md`)

### Where they part

**Apple's touch target differs by position on screen.** 44pt at the top, 48pt at the bottom.
A different structure from Material 3's single minimum (48dp).
The kit records no reason.

**Icon buttons and text buttons differ in height.** Apple iOS gives symbol buttons 44pt and
text buttons 36pt — an 8pt difference inside the same toolbar.

**Ant Design is 32px.** Lower than the 44–48 family — a desktop-enterprise premise, derived
from the `controlHeight` seed.

### Desktop ↔ touch dual sizing — three solutions (from the second `full` deep pass)

Three systems solve the same problem ("small for a pointer, large for a finger")
differently:

| system | method | values |
|--------|------|-----|
| **Spectrum** | **swapping the whole scale** (two token files, medium/large) | button 32 → 40px, every step ×1.25 |
| **Polaris** | a breakpoint branch (48em) | Micro 28 (mobile) → 24px (desktop) |
| **Lightning** | parallel per-item touch tokens | row height 30 → `-touch` 42.4px |

Spectrum's blanket ×1.25 is the most systematic, and Polaris is distinctive for going the
other way round (mobile is the default, the desktop shrinks).

**The `full` component-CSS deep pass (2026-08-17) produced three new axes:**

- **Carbon**: a default of 48px with **a 176px min-width token**
  (`$button-min-inline-size`) — the height can be inherited from the contextual layout
  tokens (xs 24 to 2xl 80, six steps).
  ~~Unique in the sample~~ → **Fluent 2 has a min-width spec too** (small 64 / medium 96px)
  — two samples, at about half Carbon's value.
- **Polaris**: **the height is viewport-responsive** — Micro is 28px on mobile and 24px on
  the desktop (48em+). The only sample in which a breakpoint enters a control height.
  `min-width` = height guarantees a square minimum area.
- **GOV.UK**: **there is no height token** — it derives from 19px type plus padding, and the
  2px bottom shadow is counted as part of the visual height and subtracted from the padding.
  Pressing is `top: 2px` (a physical metaphor of settling onto its own shadow, twice
  shadcn's 1px drop).

**M3 Expressive opened a new upper extreme** — Large 96 and XLarge **136dp**
(androidx generated tokens, 2026-08-17). More than twice the previous sample maximum of
60px (Mantine `xl`). It brings the hero CTA inside the button component's scale, and
**a shape morph that tightens the radius one step on press** (`PressedContainerShape`) is
standardised as a token — the only sample in which a state changes **shape** rather than
colour (the component dimensions section of `systems/material-3.md`).

## Radius

| system | value | note |
|--------|:---:|------|
| **Cloudscape** | **20px** | larger than the container's (16px) |
| Material 3 | per component (the tokens have a buttons family) | |
| Ant Design | 6px (a single global) | |
| Lightning | a choice of 2 / 4 / 8px | the global scale |
| Helios | a choice of 3 / 5 / 6 / 8px | the global scale |
| Evergreen | a choice of 0 / 4 / 8px | an array index |
| Pajamas | `md` 4px by default | aliased `default` |
| **shadcn/ui** | **8px (`rounded-md`)** | identical across every variant and size |
| **Mantine** | a choice of 2 / 4 / 8 / 16 / 32 | the global scale (default 8) |
| **Radix Themes** | `--radius-*` × `--radius-factor` | decided by the theme axis |

### Where they part

**Only Cloudscape makes the button rounder than the container** (button 20px, container
16px). In most systems the button is smaller than or equal to the container.

**Ant Design has no button-specific radius.** It uses the global `borderRadius: 6` as-is.

**shadcn/ui keeps the same radius at every size** — `xs` (24px tall) and `lg` (40px) are
both `rounded-md` (8px). Small buttons therefore look relatively rounder.

**Radix Themes leaves the button radius to the theme axis.** With `data-radius="none"`,
`--radius-factor: 0` takes every component's radius to 0.
There is no notion of setting an individual value for the button.

## Width by count — only Apple tokenises it

Apple iOS symbol buttons have **a separate variant per count.**

| count | top | bottom |
|:---:|:---:|:---:|
| 1 | 44 | 48 |
| 2 | 104 | 110 |
| 3 | 160 | 164 |
| 4 | 216 | 218 |
| 5 | 272 | 272 |
| 6 | 328 | 326 |

The increment at the top is a constant 56pt (44 + 56×(n−1)).
**At the bottom the increment is not constant, running 54–56.**

No other system tokenises button groups by count.

## Padding — shadcn/ui is the only one confirmed in full

| size | height | inline padding | **with an icon** | ratio (padding/height) |
|------|:---:|:---:|:---:|:---:|
| `xs` | 24 | 8 | **6** | 0.33 |
| `sm` | 32 | 12 | **10** | 0.38 |
| `default` | 36 | 16 | **12** | 0.44 |
| `lg` | 40 | 24 | **16** | 0.60 |

**The padding grows faster than the height.** The height goes 24→40 (1.67×) while the
padding goes 8→24 (3×). Larger buttons become relatively wider.

### With an icon the padding shrinks — implemented with `:has()`

```css
/* the Tailwind class: has-[>svg]:px-3 */
.button:has(> svg) { padding-inline: 12px; }   /* default: 16 → 12 */
```

| size | default | with an icon | reduction |
|------|:---:|:---:|:---:|
| `xs` | 8 | 6 | -2 |
| `sm` | 12 | 10 | -2 |
| `default` | 16 | 12 | -4 |
| `lg` | 24 | 16 | **-8** |

**The gap between icon and label takes its place** — `default` uses 8px (`gap-2`), `xs` 4px
and `sm` 6px.

**shadcn/ui is the only system in the sample to change padding by the presence of content.**
It is an implementation only CSS `:has()` makes possible, and it cannot be expressed as a
token.

### Padding in other systems

| system | value |
|--------|-----|
| Cloudscape | `space-button-horizontal` 20px · `-vertical` 4px |
| Ant Design | the `paddingContentHorizontal` family (derived from the seed) |
| **Radix Themes** | **8 / 12 / 16 / 24px** (size 1–4, `--space-2`–`5`) — confirmed in `button.css` (3.3.0) |
| **Mantine** | **14 / 18 / 22 / 26 / 32px** (`xs`–`xl`) · compact **7 / 8 / 10 / 12 / 14** — confirmed in `styles/Button.css` (9.5.1) |

**Cloudscape's 20/4 is a ratio of 5:1.** It cannot be compared directly with shadcn/ui
`default`'s 16, but Cloudscape is the only one to pin the vertical padding at 4px.

### The three frameworks' inline padding — now fully confirmed (2026-08-18)

| height | Mantine 9.5.1 | Radix Themes 3.3.0 | shadcn/ui |
|:---:|:---:|:---:|:---:|
| 24 | — | 8 | 8 |
| 30–32 | 14 (`xs`, height 30) | 12 | 12 |
| 36 | **18 (`sm`, the default)** | — | **16 (`default`)** |
| 40–42 | 22 (`md`, height 42) | 16 | 24 (`lg`) |
| 48–50 | 26 (`lg`, height 50) | 24 | — |
| 60 | 32 (`xl`) | — | — |

- **Radix Themes uses the spacing tokens directly for padding too** (`--space-2`–`5` =
  8/12/16/24). The same scale as the heights (`--space-5`–`8`) — size 2 (height 32, padding
  12) matches shadcn/ui's `sm` (32/12) exactly
- **Mantine is the widest at a given height** — 18px at the default 36px (shadcn/ui's 16).
  Its `compact` variant, conversely, drops to less than half (7–14px) —
  **the only sample keeping a separate dense-padding axis on the same height scale**
- **Mantine also reduces the padding on the side with an icon (a section)** —
  `padding-x ÷ 1.5` (18 → 12). The same direction as shadcn/ui's `:has(>svg)` subtraction,
  with Mantine dividing and shadcn/ui subtracting a fixed amount
- **None of the three has vertical padding** — a fixed height plus flex centring
  (Mantine's `line-height: 1`). The only sample with vertical padding is still Cloudscape
  (4px)
- Radix Themes' `ghost` variant **cancels its own padding
  (`--button-ghost-padding-*`) with a negative margin** to preserve the text alignment
  baseline — a structure in which the padding exists visually but not in the layout
  (`button.css`)

## Button groups — shadcn/ui and Mantine source confirmed (2026-08-18)

Both follow the "remove the radius and border of the middle members" pattern, but
**they handle the border differently**:

| | shadcn/ui `button-group` | Mantine `Button.Group` |
|---|---|---|
| radius | kept on the first and last only (`rounded-l-none` and so on) | the same (logical properties such as `border-end-end-radius`) |
| doubled border | **the trailing member's border is removed** (`border-l-0`) | **half from each side** (`calc(var(--button-border-width) / 2)`) |
| focus | `focus-visible:z-10` — the ring is not hidden by a neighbour | `z-index: 1` on `:focus` — the same solution |
| orientation | both horizontal and vertical | the same (`data-orientation`) |
| extras | `role="group"` · `gap-2` (8px) between nested groups · `ButtonGroupText` (a label cell, `px-4` bg-muted) · a built-in separator | Button.Section falls under the same rules |

- **The focus-ring z-index handling coincides across the two samples** — both solve the
  problem of a ring being buried under a neighbouring button using stacking order
- The half-border method (Mantine) produces 0.5px rendering with a 1px border, so outside
  high-DPI environments shadcn/ui's removal method is safer
- shadcn/ui allows inputs and selects inside the group (`[&>input]:flex-1`) — handling the
  search-field-plus-button combination with the same component

## The loading spinner — shadcn/ui's `spinner.tsx` (2026-08-18)

The whole component is six lines — `Loader2Icon` + `size-4 animate-spin` +
`role="status"` `aria-label="Loading"`. **There is no dedicated machinery for combining it
with a button**: the button's ordinary rules
(`[&_svg:not([class*='size-'])]:size-4` · `gap-2` · `has-[>svg]:px-3`) apply to the spinner
as-is, and the loading visual state is produced by **the caller applying disabled
themselves**, as in `<Button disabled><Spinner/>…`.
In contrast, Mantine uses `data-loading` to slide the label away with `translateY(100%)` and
lays an overlay over it (a `::before` with a 12px blur) — the axis is whether loading is a
component state (Mantine) or a composition (shadcn/ui).

## Icon size — only shadcn/ui ties it to the button size

| button size | icon |
|-----------|:---:|
| `xs` · `icon-xs` | **12px** (`size-3`) |
| `sm` · `default` · `lg` | 16px (`size-4`) |

`[&_svg:not([class*='size-'])]:size-4` — **an SVG whose size is already set by a class is
left alone.** Overrides are permitted at selector level.

There are four separate icon-only variants — `icon` (36) · `icon-xs` (24) ·
`icon-sm` (32) · `icon-lg` (40). **They are square and have no padding.**

The same distinction as Apple iOS's split into 44pt symbol buttons and 36pt text buttons,
except that shadcn/ui **provides a square variant at every size step.**

## The state set — it depends on the input method

| system | states confirmed |
|--------|-------------|
| Apple iOS (text button) | Default · Selected · Tinted · Disabled |
| Apple iOS (sheet button) | Default · Preferred |
| **visionOS** | Idle (No Platter) · **Hover** · Selected · Disabled |
| Atlassian | (by border width) selected · focused + **`motion.button.hovered/pressed`** |
| Material 3 | 147 State Layer tokens |
| **shadcn/ui** | default · hover · **focus-visible** · **active (mobile only)** · disabled · **aria-invalid** |
| **Mantine** | (by colour token) `-filled-hover` · `-light-hover` · `-outline-hover` |
| **Radix Themes** | (by cursor token) `--cursor-button` · `--cursor-disabled` |

### Where they part

**visionOS has a `Hover` despite having no mouse.** Because gaze points at the target, a
pre-tap stage exists. The iOS kit has no Hover.

**Apple distinguishes `Tinted` from `Selected`.** Both are "emphasised" states, yet they are
separate. In a sheet it uses yet another name, `Preferred` — the state names differ by
container.

**Material 3 solves state with colour layers.** The 147 State Layer tokens per theme are 75%
of the total. Per-state variants are handled in the tokens rather than in the component.

**Atlassian expresses state through border width.** `border.width.selected` and
`border.width.focused` hold the same value (2px) but are separate tokens.

**Atlassian tokenises the state transition duration too.**

| token | duration | properties transitioned |
|------|:---:|-----------|
| `motion.button.hovered` | 150ms | `background-color` · `border-color` |
| `motion.button.pressed` | 150ms | `background-color` · `border-color` |
| `motion.listitem.hovered` | **50ms** | + `color` · `text-decoration-color` |

**Button hover is 150ms and list-item hover 50ms** — a threefold difference.
Atlassian is the only system in the sample to separate per-component state transition
durations into tokens.

**shadcn/ui applies `active` on mobile only.**

```
a:active, button:active { @apply opacity-60 md:opacity-100; }
```

The pressed effect is released from `md` (768px) up.
**This is the only case in the sample of switching off a state style by viewport.**

**shadcn/ui catches the error state with the `aria-invalid` attribute.**
The style hook is an ARIA attribute rather than an `error` prop —
`aria-invalid:border-destructive aria-invalid:ring-destructive/20`.
The accessibility attribute and the visual state cannot come apart.

**Mantine and Radix Themes handle state at the token layer rather than in the component.**
Mantine through colour tokens (`-filled-hover`), Radix Themes including even cursor tokens.
The same direction as Material 3's 147 State Layer tokens.

## The focus ring — the thickness parts

| system | thickness | offset | composition |
|--------|:---:|:---:|------|
| **shadcn/ui** | **3px** | **none** | a border colour change plus a translucent ring (`ring-ring/50`) |
| Atlassian | 2px | unverified | a border-width token (`border.width.focused`) |
| Cloudscape | unverified | unverified | only the radius confirmed (`...focus-ring` 4px) |
| Spectrum | unverified | 2px | `accordion-focus-indicator-gap` |
| Radix Themes | unverified | unverified | only the `--focus-*` colour family confirmed |

**shadcn/ui's 3px is the thickest in the sample.** One pixel thicker than the 2px
convention, and it sits against the element with no offset.

**It is not even consistent within shadcn/ui** — only the Dialog close button uses
`focus:ring-2 focus:ring-offset-2` (2px plus a 2px offset). Every other control is 3px with
no offset.

**Atlassian is the only one to express the focus ring as a border width rather than a
colour.** It thickens the existing border instead of drawing a ring over it, so the layout
does not shift.

## Cases where the dimensions change in dark mode

| system | component | light | dark |
|--------|----------|:---:|:---:|
| **Apple iOS** | back button | 78 × 36 | **80 × 36** |

**This is the only case in the sample of dark mode changing a dimension.** It is 2pt wider.
The kit does not state a reason.

Every other system changes only colour in dark mode.

## Re-synthesis across 77 samples — component measurements (2026-08-18)

The `partial` deep pass raised the button measurements to 77 systems, and this document's
conclusions were re-verified against that sample.

### How the height is produced — three camps, a third each

| method | meaning | systems |
|------|-----|--------|
| **a fixed `height`** | the value is the height | Canvas · Chakra · EUI · Evergreen · HeroUI · HSDS · Kontur · KRDS · LeafyGreen · Naive UI · NYSDS · Odyssey · Orbit · Park UI · Pluralsight · Ring UI · Seed · Semi · Serendie · Vapor · Vibe · Charcoal · Clarity · Auro (min and max set together) |
| **`min-height`** | grows when the content overflows | Backpack · Blueprint · Braid · Codex · Digital Agency · DSFR · eBay · Forma 36 · Gestalt · Helios · Kaizen · NHS · Nord · Origami · Pajamas · Shoelace · WMN |
| **derived** | no height declaration; line height + padding (+ border) | Asphalt · Astro · Audi · Base Web · bf-solid · Bolt · Bootstrap · Cedar · Grommet · Mística · MUI · Paste · Pharos · PIE · Porsche · Priceline · PrimeVue · Protocol · SGDS · Thumbprint · Vanilla · Skeleton |

**The value "button height" lives at a different layer in each system.** The derived camp
gives up integer heights — MUI 36.5 · Bolt 41.5 · Braid 38.4 · Audi 51px. Base Web, by
contrast, is derived and yet back-computed so the result lands exactly on its sizing tokens
(28/36/48/56).

### The default height — 40px is the mode, but not a majority

```
40px  ~14   Canvas · Chakra · DSFR · eBay · EUI · Forma 36 · Gestalt · HeroUI ·
            HSDS · Odyssey · Park UI · Shoelace · Vibe · Strapi
48px   ~8   Auro · Base Web · Braid · Mística · NYSDS · Serendie · SGDS · Vitamin
36px   ~7   Astro · Backpack · Grommet · LeafyGreen · Nord · Paste · Vanilla
32px    4   Codex · Pajamas · Semi · Vapor
others      KRDS 56 · Thumbprint 52 · Audi 51 · Orbit 44 · Protocol 44 · smarthr 42 ·
            Bolt 41.5 · Bootstrap 38 · Cedar 38 · MUI 36.5 · Naive 34 · Ring UI 28 ·
            Intergalactic 28 · Origami 28 · Blueprint 30
```

> **Correction — the earlier "36px default for desktop web" recommendation was sample bias.**
> That value was a coincidence between Mantine and shadcn/ui; **across 77 samples the mode
> is 40px** and 36px is around third. Even so, **the mode itself is only about 23%**, so
> there is no such thing as an "industry standard height" — the "implementation defaults"
> section below has been corrected accordingly.

### Minimum width — "its own height" converged on independently by six systems

| rule | systems |
|------|--------|
| **min-width = its own height** (a square floor) | **Blueprint · Chakra · Evergreen · Kaizen · Pajamas · Park UI** |
| absolute px in steps | Canvas 72/88/104 · HeroUI 64/80/96 · Digital Agency 72/80/96/136 · HSDS 90–200 |
| a formula | EUI `base×6` and `×7` (96/96/112) · Spectrum height × 2.25 (documentation layer) |
| a single value | MUI and Kontur 64 · Gestalt 60 · Mística 104/80 · Origami 60/80 · eBay 88 |
| **replaced by a maximum width** | **Codex 28rem (448px) · Forma 36 240px** |
| explicitly removed | Odyssey — MUI's 64px set to `unset` |

**Six systems independently arrived at "never narrower than a square".** It is the rule that
emerges when icon-only buttons are handled by the same button rather than a separate
component.
And **cases of solving i18n text expansion with a maximum width rather than a minimum**
(Codex, Forma 36) are observed — a perspective that inverts this document's earlier focus on
the minimum alone.

### Shape — pills are not a minority

- **Pills at every size (10+)**: Canvas (65rem) · Charcoal (999999px) · PIE (50rem) ·
  Serendie (full) · Gestalt (24px = half the height) · eBay (literal halves, 16/20/24) ·
  Grommet (half the derived height) · Mística (five skins) · Priceline (small and medium
  only) · Seed (xsmall only)
- **Radius 0 (square)**: Audi · DSFR · Protocol · WMN · Vanilla
- **The majority**: 4–8px

**A camp that ties the radius to the size is confirmed** — HeroUI 8/12/14 · KRDS 4/6/8 ·
Digital Agency 4/6/8/8 · Backpack 8→12 (large) · Orbit 8→12 (large) · Seed. The earlier
statement that "shadcn/ui keeps it identical at every size" is true but **is not the
convention.**

### The camp that does without borders — inset box-shadows

**Blueprint · Paste · Ring UI · Cedar · Astro · Vitamin · Vapor · Pajamas · Skeleton ·
Orbit · Braid** draw their outline with an inset box-shadow instead of a `border`.
**Blueprint is the one to leave the reason in a source comment** — a border can only be one,
cannot overlap a shadow, changes the element's size and demands `box-sizing`. The practical
gain is **that the layout does not shift on state transitions** (Vitamin handles hover 1px →
focus 2px this way).

### The habit of subtracting the border from the padding

**Helios · LeafyGreen · Codex · Kaizen · NYSDS · Mística · Clarity · MUI · Kontur ·
Origami · Grommet · Bolt** set their padding as `calc(value − border)`. Those that document
the rationale are Helios ("the Figma value − the border" survives as a comment in the
shipped CSS) and LeafyGreen (`// 12px - 1px border`).
**In Kontur the token value itself is `calc(2px - 1px)`**, and in Mística the border is
1.5px so every padding is `calc(value − 1.5px)`.

### Press feedback — a scale reduction has become the convention

Braid · Auro 0.95 · eBay · HeroUI 0.97 · Pluralsight 0.98 · Seed 0.95–0.98 (graded by
size).
**Only Gestalt fixes the pixels rather than the ratio** — it computes
`scale((longest side − 4px)/longest side)` at runtime so the reduction is 4px regardless of
button size.

### Type weight — 500 is the majority, with the extremes parting

```
400   Porsche · Naive UI · Nord · Bootstrap · Astro · Stacks · Serendie · Audi
450   EUI
500   the majority (Canvas · Chakra · Orbit · MUI · Kontur · Pluralsight · HSDS · Mística …)
600   Braid · Park UI · Bolt · Semi · Clarity · Italia · Asphalt · Grommet (inputs)
700   Backpack · Thumbprint · Codex · Protocol · Pharos · WMN · Digital Agency · Gestalt · Charcoal
800   PIE · Unify
```

**A camp that sets button type smaller than the body** (Bolt 12.8px · Evergreen 12px ·
Charcoal 14px · Serendie 13px) parts from **a camp that keeps the body size and adds weight**
(Backpack 16/700 · Braid 16/600) — the former is dense working UI, the latter consumer
services.

## Implementation defaults

**Height** — it parts by platform. It cannot be unified into one value.

```
mobile / touch     48    (Material 48dp · Apple 48pt · second in the 77 sample, ~8)
desktop web        40    (the mode of the 77 sample, ~14)
desktop dense      32    (the default in Codex, Pajamas, Semi and Vapor · Ant, Orbit, Radix size 2)
text button        36    (on Apple's basis)
```

**Start desktop web at 40px** (corrected 2026-08-18). The earlier edition recommended 36px,
which was a value on which two frameworks, Mantine and shadcn/ui, happened to coincide.
**Across 77 samples the mode is 40px** and 36px is around third — but since even the mode is
only about 23%, **do not take it as "the standard height"; choose it against your density
requirement.**

Allow 44pt only for the iOS top toolbar, and **in a touch environment set 48** — the value
where the two operating systems meet.

**Start with four size steps.** Two of the three frameworks have four and one has five.
An even 8px increment (Radix Themes) is the easiest to manage — it uses the spacing tokens
as-is.

**If you plan to support touch, set the top step at 48 or above.**
shadcn/ui's maximum is 40px, so no step of it can make 48.

**Radius** — set it equal to or smaller than the container's radius.
Making the button rounder, as Cloudscape does, should be a deliberate choice.

**Decide whether the radius changes by size.** shadcn/ui keeps it identical (8px) at every
size, which makes small buttons look relatively rounder. To make it proportional there is
the Radix Themes approach of an `em` base
(`calc(0.35em * var(--radius-factor))`).

**Padding** — shadcn/ui's ratios are the reference.

```
height 24 → inline  8
height 32 → inline 12
height 36 → inline 16
height 40 → inline 24
```

**Grow it faster than the height** (height 1.67× / padding 3×).
If you want separate vertical padding, Cloudscape's 4px is the only confirmed case.

**When an icon is present, reduce the inline padding by 2–8px and set an icon-to-label `gap`
of 4–8px.**
CSS `:has()` can automate it, but since it cannot be expressed as a token it has to live in
the component implementation.

**Provide an icon-only square variant at every size step.** shadcn/ui provides one at all
four. Use the height as the width (`size-9` = 36×36).

**States** — the minimum set is this.

```
default · hover (web and spatial) · pressed · selected · disabled · focus-visible
```

**If you plan to support a spatial UI (visionOS), do not drop `hover`.**
Build it touch-only and the gaze-input stage is left empty.

**Catching the error state with `aria-invalid` is recommended** (the shadcn/ui approach).
Keeping a separate `error` prop lets the accessibility attribute and the visual state fall
out of step.

**Fix the names of the emphasis states in advance.** Apple alone uses `Selected`, `Tinted`
and `Preferred` differently by container. When the names part company inside one system, the
implementation wobbles.

**The focus ring**

```
2px, offset 0–2px
```

The sample majority uses 2px. shadcn/ui's 3px is the only thick value in the sample, and it
is not even consistent within that system (only the Dialog close button is 2px).
**Fix the thickness and offset once and use them across every component.**

Expressing it as a border width (Atlassian) has the advantage that the layout does not
shift, but it cannot be used on variants without a border (`ghost`, `link`).

**State transition durations** — Atlassian is the only evidence.

```
button hover/pressed   150ms
list item hover         50ms
```

**A list item is three times faster than a button.** Even within `listitem`, hover (50ms)
differs from pressed and selected (100ms).

The number of transitioned properties differs too — `listitem` has four (background, border,
text colour, underline colour) and `button` two (background, border).

The full cross-system motion comparison is in `motion.md`.

## Guidance at the documentation layer — measured (2026-08-18)

The button guidance of eight systems (M3 · Atlassian · Spectrum · Polaris · Carbon · Primer ·
Cloudscape · GOV.UK) was read directly.

### The number of primaries — "one per screen", converged on by six systems

| rule | systems |
|------|--------|
| **one per page/area** | Atlassian ("Only include one primary button or CTA in a page or area" — not every screen needs a primary) · Carbon (**with the caveat that headers, modals and side panels are excluded from the count**) · Primer (one per group, and typically one per page) · Cloudscape ("The Highlander, there can be only one") · M3 filled ("ideally for only one action on a page") · GOV.UK ("Avoid multiple default buttons on a single page") |
| **three per view at the highest emphasis** | **Spectrum** — except that Spectrum's highest emphasis is not primary but **accent**. Its 'primary' variant is medium emphasis (a name/role inversion — one for the GLOSSARY) |
| sparingly only | Polaris, current |

**Do not be fooled by the name when comparing with Spectrum** — Spectrum's "primary" sits
where other systems put secondary.

### Variant vocabulary — the same emphasis ladder, different numbers of rungs and names

- **M3** (by emphasis): Elevated (only when separation is needed) → **Filled** (completing a
  flow: Save, Confirm) → Tonal (onboarding Next and the like) → Outlined (paired with
  filled) → Text (inside dialogs, cards and snackbars)
- **Atlassian**: Default is the default and **Primary is only for form submission and the
  highest importance.**
  Warning (a significant change) and Danger (a destructive final confirmation) are separate.
  The only sample with Discovery (a new feature) and Rovo (AI)
- **Carbon**: **it pins Secondary to "paired with a primary, for the negative action
  (Cancel, Back) only"** — standalone or affirmative use is prohibited. This rule is
  Carbon's own
- **Cloudscape**: the Link variant occupies "the modal's Cancel" slot — the same role as
  Carbon's secondary, carried by a different variant
- **GOV.UK**: Warning (red) is "only for the final confirmation of a serious, irreversible
  destructive action; **most services will not need it**" — wording that blocks the abuse of
  danger, built into the rule
- Primer: Invisible (inside composite components) plus **an Inactive state** (an accessible
  alternative to disabled — focus is retained)

### Loading state — "replace the label with a spinner" is the majority; only Primer covers the accessibility detail

- **Label replacement plus click blocking**: Atlassian (+ disabling) · Spectrum (Pending —
  **shown after a one-second delay**, limited to operations under five seconds, with progress
  outside the button beyond that) · Polaris · Carbon (inline loading plus disabling)
- **Primer's accessibility rule goes the other way**: applying `disabled` or removing the
  element from the DOM during loading is **prohibited** (focus is retained), and the state is
  announced through `aria-disabled` plus an `aria-live="polite"` region. Cloudscape is on the
  same axis (block the click but keep it focusable, plus `loadingText`)
- M3 and GOV.UK: no loading-state rule (confirmed). GOV.UK instead has a different solution,
  `preventDoubleClick` (preventing duplicate submissions)

### Minimum width — the only rule is Spectrum's proportion

**"minimum width = height × 2.25"** (Spectrum — to preserve a recognisable shape for small
buttons. The inline padding is half the height). The other seven systems were confirmed to
have no rule. There are zero samples with an absolute (px) minimum width — the i18n
text-expansion problem must ultimately be solved by a proportion or by container rules.

## Not yet filled in

- ~~Variant kinds and usage / loading state / minimum width~~ → **resolved (2026-08-18)** —
  the "guidance at the documentation layer" section above
- ~~Mantine's and Radix Themes' padding~~ → **resolved (2026-08-18)** — measured from
  `@mantine/core@9.5.1` `styles/Button.css` and `@radix-ui/themes@3.3.0`
  `src/components/button.css`.
  See "the three frameworks' inline padding" above (Mantine 14–32 plus a compact axis, Radix
  8/12/16/24)
- ~~Button groups~~ → **resolved (2026-08-18)** — shadcn/ui's `button-group.tsx`
  (main@8a7701e) compared against Mantine's `Button.Group`. See "button groups" above
