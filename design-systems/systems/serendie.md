---
name: Serendie Design System
org: Mitsubishi Electric (+ Takram)
coverage: partial
url: https://serendie.design
repo: https://github.com/serendie/serendie
license: MIT
tech: [CSS, React, Panda CSS]
figma_kit: true
tokens_format: [CSS, JS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @serendie/design-token@1.4.6 → dist/tokens.css (802 --sd-* tokens) · npm @serendie/ui@3.7.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](serendie.ko.md)
<!-- /lang-links -->

## In one line

Mitsubishi Electric's system (in collaboration with Takram) — **the type scale ships in two
sets, expanded and compact**, elevation is not a shadow but **an opacity scale**, and the
semantic colour family is named **`impression`**. The **fourth CJK sample** with two weights
(400/700).

## Tokens — 802 of them, in two tiers, reference and system

**`reference` (raw) / `system` (role)**, occupying the same position as M3's ref/sys. Even
the tier names match M3's structure, though the source mentions no relationship.

### Type — two size scales

| step | expanded | compact |
|------|:---:|:---:|
| small | 14 | 12 |
| **medium** | **16** | **14** |
| large | 18 | 16 |
| 5XL | 64 | 56 |

- **Both sets ship in full — 12 steps from 10 to 64px and 10 steps from 10 to 56px** —
  making Spectrum (desktop/mobile sets) and Serendie (expanded/compact) the two samples with
  **two type scales by density**, and Serendie the first CJK case
- ~~compact's medium is **14px** — the 14px body of the two Chinese-language samples
  (Ant, Semi) appearing as a Japanese company's "compact" mode. expanded is 16px~~
  → **Interpretation corrected (2026-08-18, confirmed in the components deep pass):** those
  are the reference-tier ramps, and **in actual use (the system tier) the direction is
  reversed** — compact is mobile (<768px) with a 16px body, and expanded is desktop with a
  **14px** body.
  `body.medium_compact` refers to the compact ramp's **large** (16px) and
  `body.medium_expanded` to the expanded ramp's **small** (14px) — a cross-referencing
  structure. It is the desktop side that joins the 14px-body camp
- Values like 21, 26, 43 and 37 are **not integer multiples** — neither arithmetic nor
  geometric
- **Only two weights, regular 400 and bold 700** — after KRDS, the Digital Agency and
  Charcoal, **all four CJK samples ship two weights**
- **`fontFamily-primary: inherit`** — the only sample that specifies no system typeface and
  instead inherits from the page (only the monospace face is set, to Noto Sans Mono)

### Elevation — opacity, not shadow

```
--sd-reference-elevation-opacity-scale-0~10: 0 – 1 (in steps of 0.1)
```

**`elevation` is not a set of shadow presets but eleven opacity steps** — the opposite
reading from the Digital Agency's (eight steps of doubled shadow). A sample that adds a third
meaning (opacity) to the "ambiguity of elevation" in `GLOSSARY.md`.

~~Not shadows~~ → **Supplemented (2026-08-18):** the opacity is the reference tier; the
system tier holds `elevation-shadow-level1~5` (**drop-shadow** — a filter, not box-shadow,
crossing with Spindle's split) and `elevation-zIndex` (deepDive **−1000** · base 0 ·
docked 10 · dropdown 500 · modal 1000 · toast 2000).
Elevation is **a superordinate category binding opacity, shadow and z-index together**, and
the tokenised-z-index samples gain one more (the only one including a negative step).

### Colour — the `impression` family plus 240+ chart-specific tokens

```
--sd-system-color-impression-primary / onPrimary / primaryContainer / onPrimaryContainer …
```

- **The `primary`/`onPrimary`/`Container` combinations are M3's vocabulary verbatim**, but
  the family is called `impression` — M3's structure borrowed under a name of its own (180
  tokens)
- **There are 240+ chart-specific colours** — `chart-mark-multi` 60,
  `chart-mark-{primary,positive,notice,negative}` 36 each, `chart-component` 36.
  The largest share of data-visualisation tokens in the sample (exceeding Cloudscape's chart
  tokens).

### Spacing and radius

- Spacing: 12 t-shirt steps, `4 8 12 16 20 24 32 40 48 64 80` plus none — every core value
  (4/8/16/24/32) present
- The raw `dimension-scale` is ordinal, 0–18 (0 · 1 · 2 · 4 · 8 · … · 96)
- Radius: `2 4 8 12 16` plus `full` (9999px)

## Components in depth — (2026-08-18)

Measured from `@serendie/ui@3.7.0` — built on **Panda CSS recipes (cva/sva) plus headless
Ark UI** (the same combination as Park UI, in a corporate edition).
`@serendie/design-token@1.4.5` is bundled into dist, and values were resolved from the bundled
tokens and `styled-system/tokens`. What compact and expanded actually are was settled here:
**`expanded` = the media condition `min-width: 768px`.**

### Buttons (`Button`) — the label is not bold

| | medium (default) | small |
|---|:--:|:--:|
| height | **48px** | 32px |
| padding | 24×12px | 12×4px |
| radius | **full (9999px)** | same |
| label | label.large — **14px** compact / 13px expanded, **400**, line height 1 | label.medium 12px/400 |

- **Two steps, 48/32px — there is no 40px step.** The default of 48px is at the top of the
  sample (touch-first), and it is one step off from Spindle (48/40/32) and Charcoal (40/32).
- **The button label's weight is 400** — the only one of the five Japanese samples whose
  buttons are not bold (SmartHR, Vibes, Charcoal and Spindle all use bold). In a two-weight
  system (400/700), assigning the button to the regular side (→ crossing the i18n axis:
  a label line height of 1.0 against a body line height of 1.6 — CJK leading split by role).
- Four styleTypes: filled · ghost · outlined · **rectangle** — rectangle is outlined
  **with only the radius changed to 8px**. The only sample where "shape" becomes a variant
  axis.
- filled's hover is not a colour swap but **an `::after` overlay state layer** — M3's state
  layer grammar (component-layer evidence of the M3 borrowing that is consistent with the
  impression vocabulary).
- The label's textStyle is conditioned on compact/expanded, so **the two densities reach
  right inside the components** — the label is larger on mobile, compact 14px > expanded 13px.

### Inputs (`TextField`) — outline instead of border, and yielding with @layer

- A single **48px** height (no size variants), radius 8px, and **an outline of 1px rather
  than a border** → on focus **a 2px (thick) outline in the primary colour** — state
  expressed as a change of thickness. Invalid gets a negative outline plus a warning icon,
  and a **clear button is built in** when there is a value.
- The default width `min(100%, 300px)` is **declared inside `@layer components`** — a source
  comment says the priority is yielded so that consumer CSS always wins.
- The right-hand icon's touch target is **48px in compact / 44px in expanded** — the density
  switch changes not only the typography but **the touch-target size**.

### Modals (`ModalDialog`) — a single 408px width

- Composed from Ark UI's dialog. **A single maxWidth of 408px — there are no size variants**
  (the actual width is `100% − spacing.large×2`). Radius 8px (medium, even for a modal —
  parting from Charcoal's and Spindle's large 20–24px radii), shadow `shadow.level5`
  (drop-shadow 0 8px 24px #00000033), a scrim token, and `zIndex.modal` 1000.
- **The button order flips with density** — by default (mobile) submit comes first; at
  expanded, `flex-direction: row-reverse` plus right alignment. The only implementation in
  the sample that settles the platform button-order argument with a single media condition.
- The component library **embeds a translation layer (`useTranslations`)** — the close label
  and others come from multilingual resources.

### Themes — four traditional Japanese colours

Switching `data-panda-theme` ships four themes: asagi (浅葱 `#006066`) · kurikawa
(栗皮 `#8F3D15`) · sumire (菫 `#7C3694`) · tsutsuji (躑躅 `#9B2657`) — a rare case of themes
used **as a matter of taste within one organisation rather than for multiple brands**.

### Characteristic decisions (from the deep pass)

- **A 400-weight button label** — the only non-bold button among the five Japanese samples
- **What compact/expanded actually are, settled** — a 768px media condition, with a 16px
  mobile body against a 14px desktop one (correcting the token section's reading)
- **The rectangle styleType** — radius as a variant axis, unique in the sample
- **Touch targets follow the density too, 48→44px** — the two-density split carried through
  completely
- **Modal button order reversed by a media condition** — unique in the sample
- Ark UI plus Panda CSS — a corporate adoption of the headless combination

## Characteristic decisions

- **Two type size scales** ~~(a 16px expanded body / 14px compact)~~
  (a 16px compact body on mobile / 14px expanded on desktop — corrected 2026-08-18) —
  the first CJK density split
- **elevation = an opacity scale** ~~— not shadows, a reading unique in the sample~~
  (the reference tier only — the system tier carries five shadow steps and z-index alongside,
  supplemented 2026-08-18)
- **The `impression` family** — M3's vocabulary structure under a name of its own
- **240+ chart colours** — the largest data-visualisation token set in the sample
- `fontFamily-primary: inherit` — the only sample specifying no typeface
- **Weights 400/700** — confirming that all four CJK samples ship two weights
- Two tiers, reference and system — the same structure as M3's ref/sys

## Accessibility

Unverified.

## References

- Tokens: `npm pack @serendie/design-token@1.4.6` → `dist/tokens.css`
- A Panda CSS preset (`panda-tokens.js`) ships alongside — a framework-integrated
  distribution
- Components in depth: `npm pack @serendie/ui@3.7.0` → `dist/components/*` plus
  `dist/recipes/*` and the bundled `@serendie/design-token@1.4.5` (2026-08-18)
- **Open questions:** ~~the components (`@serendie/ui`)~~ ~~the expanded/compact switching
  criterion~~ (resolved 2026-08-18 — the deep pass: a 768px media condition), the Figma kit,
  and how dark mode is handled (the four themes are confirmed — whether they are all light
  is not)
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — `serendie.design` →
  `figma.com/community/file/1433690846108785966/serendie-ui-kit`
