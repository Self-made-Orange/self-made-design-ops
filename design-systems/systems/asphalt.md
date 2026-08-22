---
name: Asphalt
org: Gojek (GoTo)
coverage: partial
url: https://asphalt.gojek.com
repo: null
license: UNLICENSED (stated on npm)
tech: [React]
figma_kit: unverified
tokens_format: [JS]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @gojek/asphalt-web-tokens@1.14.0 → dist/index.js (DTCG format) · npm button@2.16.0 · textfield@2.17.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](asphalt.ko.md)
<!-- /lang-links -->

## In one line

Gojek's system — **the corpus's first Southeast Asian sample**.
It keeps **`emboss`/`deboss` (raised/sunken) shadow families**, and in typography
**`display` and `heading` use different typefaces** (Maison Neue Extended vs Maison Neue).
Spacing is a **12-step t-shirt scale from `3XS` to `6XL`**.

> **A correction to the record.** This corpus previously stated "confirmed that Asphalt is
> not on npm". **That was wrong** — `@gojek/asphalt-web-tokens`, `@asphalt-react/*` and
> `@gojek/theme-asphalt-web-{carina,lynx}` are all public.
> The same kind of mistake as with Toss (probing a single name), and the second confirmed
> instance of lesson 9 in `HARVESTING.md`.

## Tokens — the DTCG format (`{value, type}`)

Distributed in the W3C Design Tokens format — type metadata such as `type: "spacing"`,
`"typography"` and `"boxShadow"` ships alongside the values.
References use DTCG aliases too (`"{gap.2XL}"`), the same syntax as PrimeVue.

### Spacing — 12 `gap` steps plus a `space.layout` reference tier

```
3XS 0.125rem(2) · 2XS 0.25(4) · XS 0.5(8) · S 0.75(12) · M 1(16) ·
L 1.25(20) · XL 1.5(24) · 2XL 1.75(28) · 3XL 2(32) · 4XL 2.5(40) ·
5XL 3(48) · 6XL 3.5(56)
```

- **A 12-step t-shirt scale**, the most in the sample alongside Yoga (also 12).
  It extends by repeating the x prefix (`3XS`, `6XL`) — a different solution from Yoga's
  `huge`/`xhuge`
- With 4px intermediate steps such as 20 and 28px, every core value (4/8/16/24/32) is present
- **`space.layout` references `gap`** in a two-tier structure — the camp that puts layout
  whitespace in a separate namespace (Vanilla, Tegel, Pharos)

### Shadow — `emboss` / `deboss`

```js
emboss.low.top:    innerShadow  #ffffffb3  y1 blur1   // a white highlight above
emboss.low.bottom: dropShadow   #ffffffb3  y1 blur1
deboss.low.top:    innerShadow  #1e2c6a0a  y2 blur4   // a pressed-in inner shadow
```

- **Raised (emboss) and sunken (deboss) are separate families** — the only sample that treats
  shadow not only as `elevation` (height) but as **a direction, raised or sunken**
- Each step is **a pair of shadows, `top` and `bottom`** — a white highlight above plus a
  shadow below to build the relief (skeuomorphism tokenised)
- The colour is `#1e2c6a0a`, **a blue-tinged shadow** (not pure black)

### Type — a different typeface per role

| role | typeface | weight | line height |
|------|------|:---:|:---:|
| `display` | **Maison Neue Extended** | 700 | 1.5 |
| `heading` | Maison Neue | 600 | 1.29 |
| `code` | Fira Code | 400 | 1.56 |

- **Only `display` uses the Extended (wide) face** — the only sample that assigns a separate
  typeface family to large headings
- Line heights are **fractional ratios per role**, like 1.29, 1.56 and 1.63
- Tracking on `heading` is **+0.015em (positive)** — the opposite direction from the
  majority, who give large type negative tracking

## Components in depth — (2026-08-18)

A component distribution was confirmed — the individual `@asphalt-react/*` packages contain
**CSS Modules builds (`dist/index.css`)** that can be measured directly.
The figures come from `button@2.16.0`, `textfield@2.17.0` and `modal@2.16.0`; every colour
and dimension takes the form `var(--token, fallback)`, so the fallback values are readable
too.

### Buttons — padding instead of height, with the border offset twice over

No height is declared; it derives from **the type (with line height forced to 1) plus the
block padding**.

| | L | M | S | Xs |
|---|:--:|:--:|:--:|:--:|
| type (600) | 18px | 16px | 14px | 12px |
| block padding (normal) | 19px | 16px | 13px | 12px |
| block padding (secondary) | 17px | 14px | 11px | 10px |
| **derived height** | **56px** | **48px** | **40px** | **36px** |

- **The border compensation is a double structure** — on top of the base formula
  `--padding: calc(2px − var(--border-width))` (commented "keeps the height when the border
  width changes"), a `:not(.secondary)` selector adds 2px more padding to the border-less
  variants. Only secondary has a 2px border, so the total height matches either way — the
  same intention as MUI (subtracting 1px) and Backpack, solved here through a CSS-variable
  formula.
- The variants form **a grid**: primary/secondary/tertiary/nude × brand/danger/system =
  **12 combinations**, plus link. The brand green is `#00aa13`.
- **Every hover style sits inside `@media (hover: hover) and (pointer: fine)`** — a
  mobile-first decision not to ship hover states at all on touch devices. The first case in
  the sample of gating hover behind a media query.
- There are **12 size classes** — four text steps plus four icon-only plus four compact
  (plus compactIcon). Radius 6px (`--roundness-action-control`).
- Focus is `outline: 2px solid #86afff` (`--interactive-focus`) — a blue-only focus colour,
  kept separate from the brand green.
- `stick*` classes fold corners to `--roundness-sharp` (0) to build **segmented groups**
  (the same mechanism as Backpack's `--docked`).

### Inputs (textfield) — the same four-step ladder as the button, and an input with hover

| | L | M | S | Xs |
|---|:--:|:--:|:--:|:--:|
| **field-height** | **56px** | 48px | 40px | 36px |
| block padding | 19px | 16px | 13px | 11px |

- **Buttons and inputs share the 56/48/40/36 ladder** — the same alignment as Backpack
  (sharing 36/48), across four steps. Inline padding 16px, border 1px `#cbcfd7`, radius 6px,
  min-width 160px.
- **The input has a hover state** — the background lifts to `#f5f7fa`. active turns the
  border `#1c3abb` (blue), and focus draws an outline — **three states across three
  channels** (background / border / outline).
- The body line height is **1.618** — the `--text-regular-*` tokens use the golden ratio.
  Different again from the button (forced to 1) and heading (1.5), by role.
- **A Hero input variant** — the `display` typeface (Maison Neue **Extended** 700) builds a
  large search field at 68/72/76px and overlays the **`--shadow-deboss-mid-top` inner
  shadow**. Confirmation that the token layer's emboss/deboss families really are used for a
  "pressed-in input surface" — the shadow-direction family's purpose demonstrated.
- multiline (textarea) is not freely resizable but takes **three named extent heights**
  (76/92/108px). underline, nude and borderless variants ship too, along with a tracking
  class for OTP fields (`letter-spacing: 0.34–0.36rem`).

### Modals — a native `<dialog>` with no width scale

- **There are no width steps** — `width: fit-content`. Content decides the width and the only
  ceiling is the viewport. A **scale-less** approach, different from Cloudscape's five steps,
  MUI's reused breakpoints and Yoga's fixed 580.
- A native `<dialog>` plus `::backdrop`, with a `#32333acc` scrim (≈80%) — the same native
  camp as Backpack V2, at a heavier alpha.
- Radius **16px** (`--roundness-container-M`) — component-layer confirmation of a token
  system that **separates action (6px) and container (16px) radii by purpose name**.
- Shadow `0 2px 20px #1e2c6a14` — the **blue tinge** seen in the token layer is consistent in
  the modal shadow too.
- Content padding 32px, max-height by an 85vh-minus-margins formula, top margin
  `clamp(56px, 12vh, 120px)`.
- **Below 600px it becomes a bottom sheet in CSS alone** — width 100%, bottom 0, bottom radii
  0. The same modal changes form with no separate component. The shipped CSS still carries
  the comment about correcting for the mobile address bar (vh).

### Characteristic decisions (from the deep pass)

- **Hover gated behind `@media (hover:hover)`** — the first case in the sample
- Buttons and inputs sharing **four steps, 56/48/40/36**, plus the doubled border-offset
  formula
- A body line height of **1.618 (the golden ratio)**, with the button forced to 1
- **The deboss shadow actually used for the Hero input's "pressed surface"** — the token's
  purpose demonstrated
- Scale-less modal width (fit-content) plus a mobile bottom-sheet switch in CSS alone
- Action 6px / container 16px — radii separated by purpose name

## Characteristic decisions

- **The first Southeast Asian sample** — opening the third axis in the cultural-region
  priority
- **`emboss`/`deboss` raised and sunken shadows** — unique in the sample
- **A separate Extended typeface assigned to `display`** — unique in the sample
- The DTCG format with type metadata shipped
- A 12-step t-shirt scale (`3XS`–`6XL`) — the most, with Yoga
- A blue-tinged shadow colour and positive tracking on `heading`
- `UNLICENSED` stated on npm — publicly distributed but without a licence grant

## Accessibility

Unverified.

## References

- Tokens: `npm pack @gojek/asphalt-web-tokens@1.14.0`
- Components: `@asphalt-react/*` (split individually) — the `dist/index.css` of
  `button@2.16.0` · `textfield@2.17.0` · `modal@2.16.0` (used in the 2026-08-18 deep pass)
- Brand themes: `@gojek/theme-asphalt-web-carina` · `-lynx` (not surveyed)
- **Open questions:** the colour palette, a full component list (a scope search confirms
  button, textfield, modal, popover, tab, tag, checkbox, selection, loader and others, but
  the enumeration is incomplete), how the carina and lynx themes differ, and the licence
  terms (what the UNLICENSED marking means)
