---
name: DSFR (Système de Design de l'État)
org: French Government
coverage: partial
url: https://www.systeme-de-design.gouv.fr
repo: https://github.com/GouvernementFR/dsfr
license: Etalab-2.0 (Licence Ouverte 2.0) plus usage-restricting CGU
tech: [CSS, JS]
figma_kit: unverified
tokens_format: [CSS]
a11y_target: unverified
platform: web
domain: public
verified: 2026-08-18
source: "npm @gouvfr/dsfr@1.15.2 → dist/dsfr.css (1,086 variables)"
---
<!-- lang-links -->
> **English** · [한국어](dsfr.ko.md)
<!-- /lang-links -->

## In one line

The French government's system — the **sixth government sample.** Its colour token names
carry **the lightness numbers of both the light and dark modes together**
(`--grey-200-850`), that notation uses **`sun` / `moon`**, and the palette names are
national symbols (blue-france · red-marianne) alongside poetic proper nouns
(émeraude · glycine · tournesol).

## Tokens — 1,086 of them

### The name calls both modes at once

```css
--grey-200-850          /* grey-200 in light, grey-850 in dark */
--grey-1000-50          /* light 1000 (white) ↔ dark 50 (black) — an inverting pair */
--blue-france-sun-113-625   /* sun = the light basis 113, dark 625 */
--green-emeraude-975-75
```

- **The sixth approach to dark mode** — after theme files, classes, one token with two
  values, `light-dark()`, and combinations (`patterns/color.md`), this **encodes mode
  handling into the token's *name***. From the name alone you can read the lightness in
  both modes
- **The `sun` / `moon` prefixes** — the only sample calling light and dark sun and moon
- The semantic layer is assembled by reference, `--text-default-grey` → `var(--grey-200-850)`

### Palette — national symbols plus 17 poetic families

`blue-france` · `red-marianne` (Marianne) plus `green-tilleul-verveine` (lime and verbena) ·
`green-émeraude` · `blue-écume` (sea foam) · `pink-macaron` · `yellow-tournesol`
(sunflower) · `brown-café-crème` · `brown-opéra` … — **the colour names are French cultural
vocabulary throughout**. Unlike Auro (three brands) or Mística (skins), it **expresses
national identity through naming within a single palette**. The `background` family alone
has 322, the most.

### Updating the government axis

There is no spacing scale among the CSS variables — across **seven government samples**
(GOV.UK 5px · Codex 4x · USWDS 8px · the KRDS 4 family · SGDS 16px · the Digital Agency
none · DSFR none in its CSS variables), **agreement on spacing is still zero**, and the
only shared convention is the accessibility structure.

## Components

(Confirmed 2026-08-18) `dist/component/` holds **45** — accordion · alert · badge ·
breadcrumb · button · card · checkbox · consent (cookie consent) · header/footer · input ·
modal · navigation · pagination · segmented · stepper · table · tab · tile · tooltip ·
transcription · translate and others. Each component's CSS and JS also ships as individual
files (`component/button/button.css` and so on) — a fully split distribution, rare among
the government samples.

## Component deep-dive — (2026-08-18)

Measured from `@gouvfr/dsfr@1.15.2`'s `dist/component/{button,input,form,modal}/*.css`
(the uncompressed distribution).

### Buttons (`.fr-btn`) — an 8px ladder, no transitions

| | sm | md (default) | lg |
|---|:--:|:--:|:--:|
| **min-height** | **32px** | **40px** | 48px |
| Padding | 4px 12px | 8px 16px | 8px 24px |
| Type | 14 / 24 | 16 / 24 | 18 / 28 |
| Radius | 0 | 0 | 0 |
| Weight | 500 | 500 | 500 |

- **Radius 0** — square. Icon-only is `max-width/height 2.5rem` = 40×40.
- **There is no colour transition** — the only transition in button.css is the sort arrow's
  transform (0.3s). A transitionless form where hover and active respond instantly.
- **Hover lives only inside `@media (hover: hover) and (pointer: fine)`** — the core injects
  hover backgrounds for every interactive element behind that gate, through three variables
  (`--idle` / `--hover` / `--active`). A structure that blocks hover styling outright on
  touch devices.
- secondary is a transparent background plus an **inset box-shadow 1px** border, with
  tertiary (with or without an outline) separate.
- Border 0 (the default button is a solid fill).

### Inputs (`.fr-input`) — the French edition of Material filled

- **A filled background with the radius on top only**:
  `border-radius: 0.25rem 0.25rem 0 0` (4px 4px 0 0), with the underline as a 2px
  `inset box-shadow 0 -2px`. There is no border element.
- 16px / 24px, padding 8px 16px, single-line `max-height: 2.5rem` (40px) — **aligning with
  the md button at 40px**.
- There are **no size variants** (one step). The placeholder is **italic**.
- The label is a separate block (`.fr-label`) — 16px / 24px, 8px from the input. Not
  floating.

### Modals (`.fr-modal`) — width delegated to the layout grid

- **The component CSS has no width steps** (zero `max-width`) — the dialog takes its width
  from `fr-container` plus `fr-col-*` grid columns. Neither dedicated steps (Pajamas) nor
  reused breakpoints (MUI) but **a third form, grid delegation**.
- Mobile: **bottom-aligned by default** (a bottom-sheet form, with a `--top` variant
  offered) → from 768px, centred with 10% spacers above and below and the body at
  `max-height: 80vh`.
- Animation: `opacity + visibility`, **a 300ms fade only** (no transform). Fully disabled
  under `prefers-reduced-motion`. Scrim `rgba(22,22,22,.64)`.
- Padding: header `16px 16px 8px` → from 768px `16px 32px` · content 16 → 32px horizontal ·
  the footer is **sticky** with a `margin-top: -2.5rem` overlap, and while scrolling a 1px
  gradient divider (`.fr-scroll-divider`) rises.
- Title 22/28 → from 768px 24/32 — responsive typography built into the component.
- Radius 0, with the border restored under `forced-colors`.

### Notable decisions (deep-dive)

- **A radius-0 button with no transitions and hover behind a pointer gate** — state
  expression that is instant, square and input-device aware
- **A filled input with the radius on top only** — a semantic use of radius to indicate
  "which way it opens"
- **Modal width delegated to the grid** — no width scale; the 12-column system decides
- Button min-heights 32/40/48 — an 8px ladder, aligned with the input's 40px
- A mobile bottom sheet by default and a desktop centre — one component carrying two
  grammars

## Notable decisions

- **The mode pair inside the token name** (`-200-850`) — the sixth dark-mode approach,
  unique in the sample
- **The `sun` / `moon` vocabulary** — unique in the sample
- A 17-family palette of national symbols and cultural vocabulary
- The seventh government sample — spacing disagreement holds

## Accessibility

Unverified (it is subject to RGAA, the French accessibility standard, but no figures were
confirmed in the package).

## Notes

- Tokens: `npm pack @gouvfr/dsfr@1.15.2` → `dist/dsfr.css`
- Component deep-dive: the same package's `dist/component/{button,input,form,modal}/*.css`
  (2026-08-18)
- Licence: the package states **Etalab-2.0** (`package.json` plus a "restricted use" note in
  the CSS header. Reflected in the frontmatter — 2026-08-18)
- **Still to confirm:** ~~the licence~~ (resolved 2026-08-18 — Etalab-2.0), spacing (the
  SCSS source is unexamined — the component CSS writes rem literals directly),
  ~~the component list~~ (resolved 2026-08-18 — 45, see the components section),
  ~~the Marianne typeface rules~~ (partly resolved 2026-08-18 — Marianne woff/woff2 in every
  weight (Light, Regular, Medium, Bold) plus Spectral (serif) **ship bundled in the
  package**, with `font-family: "Marianne", arial, sans-serif`. The usage-rules document is
  unexamined)
- **Licence resolved (2026-08-18):** `Etalab-2.0 (Licence Ouverte 2.0) plus usage-restricting
  CGU` — source: github GouvernementFR/dsfr → `LICENSE.md`. The code is Etalab 2.0, but
  `doc/legal/cgu.md` **forbids use by parties outside the administration and reproduction
  outside `.gouv.fr` domains** — a sample of an open licence with a restriction on who may
  use it
