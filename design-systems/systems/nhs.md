---
name: NHS design system (nhsuk-frontend)
org: NHS (UK National Health Service)
coverage: partial
url: https://service-manual.nhs.uk/design-system
repo: https://github.com/nhsuk/nhsuk-frontend
license: MIT
tech: [SCSS, Nunjucks]
figma_kit: unverified
tokens_format: [SCSS]
a11y_target: "WCAG 2.2 AA (stated — confirmed 2026-08-18)"
platform: web
domain: public
verified: 2026-08-18
source: "npm nhsuk-frontend@10.6.0 → src/nhsuk/core/settings/_{spacing,typography,globals}.scss · npm govuk-frontend@6.4.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](nhs.ko.md)
<!-- /lang-links -->

## In one line

**It took GOV.UK's code and changed the spacing base to 4px** — the source comment says
"Original code taken from GDS" outright, and yet `$nhsuk-spacing-points` runs
`4 · 8 · 16 · 24 · 32 …`, multiples of 4. **Direct evidence that GOV.UK's 5px was not
inherited.** Second in the healthcare domain, eighth in the public sector.

## The GOV.UK 5px question is closed

```scss
// @link https://github.com/alphagov/govuk-frontend
//        Original code taken from GDS (Government Digital Service)
$nhsuk-spacing-points: (0: 0, 1: 4px, 2: 8px, 3: 16px, 4: 24px,
                        5: 32px, 6: 40px, 7: 48px, 8: 56px, 9: 64px);
```

- **The same code lineage (a GDS fork), and yet the spacing values alone were swapped for
  multiples of 4.** The conclusion recorded in `tokens/scales.md` — that GOV.UK's 5px is a
  single system's choice, not a public-sector tendency — is now settled in the strongest
  form: **the system that actually took that code changed the value.**
- The structure (the responsive spacing map, the ordinal keys, the mixins) is inherited
  intact — **what carried over is the mechanism; what changed is the value.**

### Responsive spacing — a value per breakpoint

```scss
3: (null: 8px,  tablet: 16px)   // mobile 8 → tablet 16
4: (null: 16px, tablet: 24px)
5: (null: 24px, tablet: 32px)
```

The same token holds different values depending on the viewport — the same call as
Spindle (three CSS files) and Mística (desktop/mobile pairs), made here through an
**SCSS map**. This mechanism is shared with GOV.UK.

## Type — breakpoints plus a third value for print

```scss
$nhsuk-typography-scale: (
  64: (mobile 48px / desktop 64px / print 34pt),
  48: (32px / 48px / 26pt),
  36: (27px / 36px / 20pt),
  26: (22px / 26px / 17pt),
  22: (19px / 22px / 15pt), 19: (…)
)
```

- **Print sizes are defined alongside, in `pt`** — NHS (and the GDS lineage) are the only
  places in the sample where print typography sits in the tokens. The reality of printing
  medical documents on paper has made it into the token file.
- The size names are the **desktop px values** (`64` is 64px on desktop)
- Odd numbers like 27px and 19px appear in the mobile values

## Colour — function-based, with a yellow focus

```scss
$nhsuk-focus-colour: nhsuk-colour("yellow");
$nhsuk-reverse-secondary-text-colour: nhsuk-tint($nhsuk-brand-colour, 78%);
```

- Colours are referenced through **an `nhsuk-colour()` function lookup** (a palette map
  plus an accessor) — the SCSS edition of the position SmartHR occupies with its
  transformation functions
- **Focus is yellow** — the same choice as GOV.UK, confirming again that public-sector
  systems share their accessibility structure (the public-sector table in
  `tokens/scales.md`)
- It uses **unconventional ratios** like `nhsuk-tint()` at 78%

## Components in depth — (2026-08-18)

Measured from `src/nhsuk/components/` (43 directories) in the same
`nhsuk-frontend@10.6.0`. Since it derives from GOV.UK, this records mainly **the
differences against the original** (`govuk-frontend@6.4.0`, the components section of
`govuk.md`).

### Buttons — the physical metaphor is inherited, the press is twice as deep

The physical button settling onto its shadow (`box-shadow 0 Npx 0` + `:active { top: Npx }`),
the `::before` expansion widening the click target over the shadow, full-width on mobile
becoming auto on tablet, the `forced-colors` branch — **the mechanism is GDS's, unchanged.**
What changed are the values:

| | GOV.UK | NHS |
|---|:--:|:--:|
| radius | **0** | **4px** |
| shadow / press depth | 2px | **4px** |
| min-height | none (derived) | **44px / 56px on desktop** (including the 4px shadow) |
| block padding | fixed 8px | **10px → 14px on desktop** |
| inline padding | `spacing(2)` = 10px | **16px** |
| small variant | none | **yes** (36px, padding 6/12, 16px type on desktop) |
| variants | secondary · warning · inverse | secondary (+solid) · reverse · warning · **login** |

- **The press is 4px, twice GDS's** — `top: 4px` plus the shadow vanishing. The deepest
  physical movement in the corpus (shadcn 1px, GOV.UK 2px).
- **Two things the original does not have**: a 4px radius (leaving the square-cornered
  camp), and an explicit `min-height` with **a control height that grows on desktop**
  (a 40→52px body). GOV.UK declares no height and has a single size. The small variant and
  the `--login` variant (a colour set specific to NHS login) are additions too.
- The type is shared — 19px, 19px line height, bold — so **typography comes from the
  original while the dimensions are reassembled on multiples of 4** (radius 4, shadow 4,
  inline padding 16). The token section's conclusion — mechanism inherited, values changed —
  repeats at the component layer.

### Form controls — the same 40px, only the padding differs

- Inputs: **40px tall · 2px border · radius 0** — identical to GOV.UK. The single
  difference is **4px padding** (`nhsuk-spacing(1)`) against GOV.UK's 5px — **the place
  where the base swap (5→4px) shows through into component padding.**
- Focused input: a black 2px border plus an inset box-shadow of the same thickness (a
  visually 4px border) plus a yellow 4px outline — the GDS structure, shared.
- Checkboxes and radios: **40px visually with a 44px touch target (a 4px gutter), small at
  24px** — the same values as GOV.UK. The tick is drawn with CSS borders, at
  **22×10px with a 4px stroke** — GOV.UK's multiple-of-5 stroke (23×12px, 5px) **retuned to
  multiples of 4**. The base swap reaches all the way into the thickness of a checkmark.

### Modals — confirmed absent

There is no modal or dialog among the 43 components (`grep -ril "modal|<dialog"` returns
nothing). GOV.UK ships no modal either, so **even the "government front end without a
modal" convention is inherited** (though the tendency has a counterexample: USWDS ships
usa-modal).

### Characteristic decisions (from the deep pass)

- **A 4px press depth** — the deepest physical-button metaphor in the corpus
- **Radius 0→4px** plus an explicit responsive min-height (44→56px) — a layer the original
  lacks
- **Added small and login variants** — the fork widened the variant axis too
- **Multiples of 4 reaching everywhere**: input padding 5→4px, checkmark stroke 5→4px
- No modal (the GDS convention, shared)

## Characteristic decisions

- **A GDS code fork with spacing swapped to 4px** — direct evidence that the 5px is a
  single system's choice
- **Print `pt` sizes in the tokens** — specific to the GDS lineage
- Responsive spacing and type maps (a value per viewport)
- Colour lookups through a function, and a yellow focus (shared with GOV.UK)
- Second in the healthcare domain (after Nord) · eighth in the public sector

## Accessibility

- The GDS accessibility structure is inherited, yellow focus included
- ~~The WCAG target is not stated in the package~~ → **WCAG 2.2 level AA (resolved
  2026-08-18).** Source: `service-manual.nhs.uk/design-system` — "We've updated the design
  system to meet WCAG 2.2 level AA" (the v10 update notice)

## References

- Tokens: `npm pack nhsuk-frontend@10.6.0` → `src/nhsuk/core/settings/`
- Components in depth: `src/nhsuk/components/{button,input,checkboxes}/` and
  `core/tools/_{buttons,focused}.scss` from the same package, with `govuk-frontend@6.4.0`
  for comparison (2026-08-18)
- A React wrapper `nhsuk-react-components@6.0.1` and a Vue one `nhsuk-frontend-vue` exist
- **Open questions:** the actual colour palette values, the accessibility target figure,
  ~~the component list~~ (resolved 2026-08-18 — 43 directories, no modal)
