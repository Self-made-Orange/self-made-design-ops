---
name: GOV.UK Design System
org: UK Government (GDS)
coverage: full
url: https://design-system.service.gov.uk
repo: https://github.com/alphagov/govuk-frontend
license: MIT
tech: [Nunjucks, HTML/CSS]
figma_kit: true
tokens_format: [SCSS]
a11y_target: "WCAG 2.2 AA (accessibility statement declares fully compliant, confirmed 2026-08-18)"
platform: web
domain: public
verified: 2026-08-16
source: "npm govuk-frontend@6.4.0 → dist/govuk/settings/_spacing.scss"
---
<!-- lang-links -->
> **English** · [한국어](govuk.ko.md)
<!-- /lang-links -->

## In one line

The design system for UK government services throughout. Accessibility and support
for low-spec environments are the starting point of the design.

## Tokens

### Spacing — a 5px base

**The only system harvested so far that is not a multiple of 4 or 8.**

| Point | Value |
|-------|-------|
| 0 | 0 |
| 1 | 5px |
| 2 | 10px |
| 3 | 15px |
| 4 | 20px |
| 5 | 25px |
| 6 | 30px |
| 7 | 40px |
| 8 | 50px |
| 9 | 60px |

Points 1–6 step evenly by 5px; from 7 on the interval widens to 10px.

Source: `govuk-frontend@6.4.0` → `dist/govuk/settings/_spacing.scss`
(`$govuk-spacing-points`)

### Responsive spacing

Separately from the scale, it ships a **responsive spacing map holding a value per
breakpoint**. It is reached through the `govuk-responsive-margin` /
`govuk-responsive-padding` mixins, and can specify different values for mobile (the
`null` breakpoint), tablet and desktop.

The source comment says to use this map wherever possible. In other words,
**responsive spacing is the default rather than fixed spacing.**

### Typography / colour / radii

Unverified.

## Components

~~Unverified~~ → **component SCSS deep-dive (2026-08-17, govuk-frontend 6.4.0
`dist/govuk/components/` — the full source of some 30 components is on npm).**

### Buttons — the shadow is a physical button

```scss
box-shadow: 0 2px 0 shade-50;   // a 2px dark band underneath (s0)
&:active { top: 2px; }          // pressing drops the body 2px onto its shadow
```

- **There is no height token** — height is derived from 19px type on a 19px line
  height plus `spacing(2)−2px (border)` of padding. The bottom padding additionally
  subtracts the shadow's share (`shadow/2`) — the source carries a comment stating
  that **the shadow is counted as part of the visual height**.
- The pressed state is `top: 2px` rather than a `translateY` — **the physical metaphor
  of the button settling onto its own shadow**. Twice the travel of shadcn's
  `active:translate-y-px` (1px) in the corpus, combined with the shadow disappearing.
- Radius **0** (the square-cornered camp); hover and shadow colours derive from the
  background through `shade-25` / `shade-50` functions — the same formula for every
  variant (secondary, warning, inverse).
- Focus = a yellow background plus `box-shadow 0 2px 0 focus-text` — the button
  edition of the GDS double yellow ring.

### Form controls — the 40px large camp

| Control | Value |
|---------|-------|
| Input and select height | **40px** (`px-to-rem`), 5px padding, **2px** border |
| Checkbox and radio | **40px visually** plus a 44px touch target (40 + 4 gutter) · small 24px |
| The check mark | drawn with CSS borders (23×12px, `border-width: 0 0 5px 5px`) |
| Select minimum width | `11.5em` (with a comment giving the reason) |
| Radio focus ring | **3px + 1px = 4px** — curvature compensation, with a comment that "the default width looks thin on a curved edge" |

**The 40px checkbox is 2.5× the corpus's convergence value (16px)** — a case of
government-service design, premised on low-vision and motor-constrained users,
enlarging the control itself. It shows that "checkboxes converge on 16px" is
**a convergence of consumer and enterprise web** rather than a universal
(cross-reference `patterns/form.md`).

## Notable decisions

- **A 5px base.** With 4px and 8px grids effectively the industry standard, it stands
  alone on 5. Since 5, 10, 15 and 20 line up with an 8px grid at no point, components
  from other systems cannot simply be dropped in alongside.
- **Responsive spacing is a first-class concept.** Most systems give a single value and
  leave breakpoint handling to the implementer. GOV.UK builds breakpoints into the
  spacing itself.
- **The scale is named by index.** `govuk-spacing(4)` references the step, not the
  value; from the consuming side, the 5px base is not visible.
- **The top end stops at 60px.** Lower than other systems (96–160px).

## Accessibility

Accessibility is known to be this system's central motivation, but the specific
compliance target and how it is verified live on the documentation site and could not
be confirmed from here.

## Notes

- Repository: https://github.com/alphagov/govuk-frontend
- Package: `govuk-frontend`
