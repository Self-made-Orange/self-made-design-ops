---
name: Origami
org: Financial Times
coverage: partial
url: https://origami.ft.com
repo: https://github.com/Financial-Times/origami
license: MIT
tech: [SCSS, Web Components]
figma_kit: unverified
tokens_format: [SCSS]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @financial-times/o-typography@7.7.2 → src/scss/_brand.scss · npm @financial-times/o-buttons@7.11.1 · o-forms@10.0.4 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](origami.ko.md)
<!-- /lang-links -->

## In one line

The Financial Times' system — its type scale is named by **integer indices including
negatives** (`-2` to `10`), **size and line height are defined as a pair (a tuple)**, and
**the scale differs per brand** (the base brand uses fixed line heights, others use ×1.2).

## Tokens — size and line-height pairs

```scss
$_o-typography-font-scale: (
  -2: (12, 16),   -1: (14, 16),   0: (16, 20),   1: (18, 20),
   2: (20, 24),    3: (24, 28),   4: (28, 32),   5: (32, 32),
   6: (40, 40),    7: (48, 48),   8: (56, 56),   9: (72, 72),  10: (84, 84),
);
```

- **A step is a `(size, line height)` tuple** — unlike the many systems (Yoga, Vanilla and
  others) that keep size and line height as separate scales and leave the combination to the
  call site, this **fixes them as a pair**
- **Index `0` is the body (16px) and it goes negative below** — the same idea as Siemens iX
  (an `ms-0` base plus `ms--1`), with names that are purely integers here
- **From `5` (32px) on, the line height equals the size** (32/32 · 40/40 · 84/84) — the
  heading range runs at a line height of 1.0. Only the body range is 1.17–1.33
- The maximum is 84px

### The scale differs per brand

```scss
// in another brand
$_o-typography-font-scale: ( -2: (12, 12*1.2), -1: (14, 14*1.2), … )
```

- **In a brand override, the line height changes to a `size × 1.2` formula** — the base
  brand (the FT proper) uses fixed line heights on a 4px grid while other brands compute a
  ratio. **The only sample where the line-height model itself differs per brand within one
  system**
- Per-brand values are looked up through an `oBrandGet()` function (a brand axis like
  `master` / `internal` / `whitelabel` is an Origami convention — the list is unverified in
  this package)
- Three typeface slots, `sans` · `serif` · **`display`** — newspaper typesetting vocabulary

## Component deep-dive — (2026-08-18)

Components are individual `o-*` packages, so three were measured separately:
`@financial-times/o-buttons@7.11.1` · `o-forms@10.0.4` · `o-overlay@5.0.3`
(plus the token dependency `o-private-foundation@1.10.0`).

**The token generations diverge between packages** — o-buttons uses the old `o-typography`
scale (the tuple scale above) while o-forms and o-overlay use the new **o3 foundation**
(`oPrivateFoundationGet('o3-*')`). A sample where a migration fault line is left exposed
between components.

### Buttons (`o-buttons`) — the padding formula is in a source comment

| | Default | big |
|---|:--:|:--:|
| **min-height** | **28px** | 40px |
| min-width | **60px** | 80px |
| Padding | 6px 8px | 11px 20px |
| Type | 14px (scale −1) | 16px (scale 0) |
| line-height | **14px (= the type)** | 16px |
| Border | 1px | 1px |
| Radius | 0 | 0 |

- The vertical padding is documented as a formula in a source comment:
  `((min-height − line-height) / 2) − border-width`. The back-computation Garden and MUI
  hide in code, declared in a comment.
- **It sets line-height equal to the font size (1.0) and lets min-height fill the height** —
  the tuple scale's line heights (16 and 20px) are discarded on buttons.
- A base height of **28px** — the smallest of the five systems measured in this pass.
  `border-radius: 0` is stated explicitly (with the comment "Edge 80 insists on a boarder
  radius").
- Transitions differ per property:
  `0.3s background-color, 0.15s color ease-out, 0.15s border-color ease-out`.
- Three types (primary, secondary, ghost) × six themes (inverse, mono, b2c, professional,
  ft-live, professional-inverse) — rather than enumerating colours, it **generates state
  colours by function from a single `color` plus `context` (the background colour)**.
  Icon-only min-width 40px.

### Inputs (`o-forms` v10 — the o3 token layer)

| | Default | small |
|---|:--:|:--:|
| **min-height** | **44px** | 28px |
| Padding | 8px 16px | 0 8px |
| Type | **18px / 24px** (metric2-1) | 16px / 24px |
| Border | **1.5px** `#b3a9a0` | same |
| Radius | 2px (`o3-border-radius-1`) | same |

- **The input type is 18px** — larger than the body (16px). A value where the newspaper's
  sense of body typesetting reaches the form.
- The border is **1.5px** (a fractional border, as in Vanilla) coloured `#b3a9a0` — a warm
  grey from the paper (FT salmon) palette.
- **Button 28px versus input 44px — a 16px gap.** Among the largest button-to-input height
  differences within one system in the measured sample (compounded by the fault line of the
  button using old tokens and the input new ones).
- The label is a separate block — 16px / 24px / **700** (body-highlight), 12px below. The
  whole field takes `margin-bottom: 32px`.
- **It injects the optional-field marker through CSS** —
  `.o-forms-field--optional …::after { content: 'Optional' }`. A rare case of an English
  string hard-coded into a stylesheet.
- o3 spacing: a 4px increment function (`oPrivateSpacingByIncrement(11)` = 44px) plus a
  named scale `s1–s8 · m12 · m16 · l18 · l24` (with the increment number inside the name).

### Modals (`o-overlay`) — JavaScript measures the width

- **There are no width steps in the CSS** — zero `max-width`. JS (`overlay.js`) measures the
  viewport and sets the alignment and size. Only the compact and
  full-screen/full-width/full-height variants are CSS.
- The panel: a 1px border, radius 0, an elevation `high` shadow, content padding 16px (s4),
  compact 12px (s3). The title is scale 2 regular.
- Entry: both panel and scrim fade with **opacity over 300ms ease-in-out**.
- The scrim is `rgba(0,0,0,.2)` — among the lightest in the measured sample (against
  Protocol .85, Vanilla .85 and DSFR .64).

### Notable decisions (deep-dive)

- **Two and three token generations coexisting by package** — o-buttons (old) versus o-forms
  and o-overlay (o3)
- **Button 28px / input 44px** — a 16px gap, height alignment abandoned
- **Button line-height = font size with min-height filling**, plus the padding formula
  documented in a comment
- **Button colours generated by function rather than enumerated** (two variables, colour and
  context)
- Modal width measured in JS — no CSS width steps
- `content: 'Optional'` — a locale string hard-coded in CSS

## Notable decisions

- **A size / line-height tuple scale** — an expression unique in the sample
- **Negative integer indices** (`-2` to `10`), with 0 as the body
- **A line height of 1.0 from 32px up** (headings take a line height equal to the size)
- **The line-height model differs per brand** (fixed px ↔ ×1.2) — unique in the sample
- Three typeface slots, `sans` / `serif` / `display` — the newspaper domain
- Components split into individual `o-*` prefixed packages (o-grid · o-brand ·
  o-typography …)

## Accessibility

Unverified.

## Notes

- Tokens: `npm pack @financial-times/o-typography@7.7.2` → `src/scss/_brand.scss`
- Related packages: `o-grid` · `o-brand` · `o-editorial-typography`
- Component deep-dive: `o-buttons@7.11.1` · `o-forms@10.0.4` · `o-overlay@5.0.3` ·
  `o-private-foundation@1.10.0` (2026-08-18)
- **Still to confirm:** ~~the brand list~~ (partly resolved 2026-08-18 — the o3 tokens branch
  into four brands, core, professional, internal and whitelabel; each brand's full type
  scale is unexamined), ~~spacing~~ (resolved 2026-08-18 — o3: a 4px increment function plus
  the s1–l24 named scale. The older o-grid remains unexamined), the colour palette, and a
  complete component list (enumerating the o-* packages is unfinished)
