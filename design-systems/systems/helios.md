---
name: Helios
org: HashiCorp
coverage: partial
url: https://helios.hashicorp.design
repo: https://github.com/hashicorp/design-system
license: MPL-2.0
tech: [Ember, CSS]
figma_kit: unverified
tokens_format: [CSS, SCSS]
a11y_target: "WCAG 2.2 AA (stated — confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @hashicorp/design-system-tokens@5.1.0 → dist/products/css/tokens.css · npm @hashicorp/design-system-components@6.5.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](helios.ko.md)
<!-- /lang-links -->

## In one line

HashiCorp's design system for its infrastructure products (Terraform, Vault, Consul and
others).

## Tokens

### Radii — centred on odd values

| Token | Value |
|-------|-------|
| `--token-border-radius-x-small` | **3px** |
| `--token-border-radius-small` | **5px** |
| `--token-border-radius-medium` | 6px |
| `--token-border-radius-large` | 8px |

**It uses 3px and 5px, departing from the multiple-of-4-or-8 convention.**
There are only four steps, the fewest of any system harvested.

### Typography

Split into three families.

| Family | Token | Value |
|--------|-------|-------|
| Display | `display-100` | 13px |
| | `display-200` | 16px |
| | `display-300` | 18px |
| | `display-400` | 24px |
| | `display-500` | 30px |
| Body | `body-100` | 13px |
| | `body-200` | 14px |
| | `body-300` | 16px |
| Code | `code-100` | 13px |
| | `code-200` | 14px |
| | `code-300` | 16px |

**Body and Code share the same three sizes (13/14/16).**

### Spacing

**Unverified.** The `--token-*` prefix listing was checked and no general spacing scale was
found. Per-component tokens do exist (`--token-badge-padding`, `--token-badge-gap` and so
on).

It may be a structure like Cloudscape's, exposing only component tokens with no primitive
spacing scale, but since that is not confirmed it is not asserted.

### Colour

There are per-product brand colour tokens (`--token-color-consul` and others).

Source: `@hashicorp/design-system-tokens@5.1.0`

## Components

Confirmed from the token names: badge, app-header, app-side.
→ button, input and modal dimensions are in the deep-dive below (2026-08-18).
Motion (six component-scoped tokens, with no global scale) is covered in the Helios section
of `patterns/motion.md`.

## Component deep-dive — (2026-08-18)

Measured from the distributed CSS of `@hashicorp/design-system-components@6.5.0` (Ember),
`dist/styles/@hashicorp/design-system-components.css` (390KB, with the token definitions
embedded). Dimensions only — motion is recorded in `patterns/motion.md` and not repeated.

### Buttons (`.hds-button`)

| | small | medium | large |
|---|:--:|:--:|:--:|
| **min-height** | **1.75rem (28px)** | 2.25rem (36px) | 3rem (48px) |
| Vertical padding | 6px | 9px | 11px |
| Horizontal padding | **11px** | **15px** | **19px** |
| Type | 13px / 14px | 14px / 16px | 16px / 24px |
| Icon | 12px | 16px | 24px |
| Radius | 5px (`border-radius-small`) | same | same |

- **Every padding falls 1px short of the 4px grid** (11 = 12−1, 15 = 16−1, 19 = 20−1) —
  the 1px border subtracted. The reasoning survives as a comment in the distributed CSS,
  right beside the input token: `--token-form-control-padding: 7px; /** Notice: we have to
  take in account the border, so it's 1px less than in Figma. */` — **the only sample to
  document the "Figma value minus border" principle in a comment** (the same intent as
  MUI's outlined −1px).
- The button type aligns with the typography tokens: 13/14/16 = display-100 =
  body-100/200/300.
- The focus ring is a double structure, floating a `::before` out by −4px and drawing a 3px
  border — the radius follows as `calc(5px + 3px)`.
- **A misuse warning is built into the CSS**: if `button.hds-button[href]`, it applies a red
  background and injects the message "you should use an @href argument" on screen through
  `::after` — the only sample linting at runtime through CSS.

### Inputs (`.hds-form-text-input`)

| | Value |
|---|---|
| Padding | **7px** (`form-control-padding` — the token from the comment above) |
| Border | 1px, radius **5px** (`form-control-border-radius`) |
| Type | 14px / 20px (body-200 — the template injects the typography class) |
| **Derived height** | **36px** (aligning with the medium button) |

- A default `box-shadow: elevation-inset` — only inputs carry an inner shadow.
- focus: a border colour plus `outline: 3px solid` (offset 0) — a different mechanism from
  the button's (`::before`).
- Only the derived filter-bar search input shrinks, to 3px padding and 13px type.

### Modals (`.hds-modal`) — a native `<dialog>`

| size | Width |
|------|-------|
| small | min(400px, 95vw) |
| medium | **min(600px, 95vw)** |
| large | min(800px, 95vw) |

- 400/600/800 — three steps of 200px. Radius **8px** (`border-radius-large` — the top of
  the scale assigned to modals), max-height 95vh.
- It is a native `<dialog>`, but `::backdrop` is turned off with `display:none` and **a
  separate overlay element** is used (a neutral-700 palette colour at opacity 0.5) —
  z-index 50/49 as literals.
- The header and footer take a different background from the body (`surface-faint`) plus a
  1px divider — a "framed" three-part split. Padding: header 16px 24px · body 24px ·
  footer 16px 24px.
- The warning and critical colour variants change only the header background and border.

### The copyright notice in the distributed CSS

All 102 headers in 6.5.0's distributed CSS and source read
**`Copyright IBM Corp. 2021, 2025`** (the licence stays MPL-2.0) — IBM's 2025 acquisition
of HashiCorp reflected in the design system's build output. The corpus's first case of an
organisational change appearing in a distribution.

### Notable decisions (deep-dive)

- **The "Figma value minus a 1px border" padding principle written into a comment** —
  applied consistently across buttons and inputs
- Three button steps at 28/36/48 plus a 36px input alignment, with the type reusing the
  body scale
- **A misuse warning injected through CSS** (the `[href]` guard) — unique in the sample
- A native `<dialog>` used alongside its own overlay, with modal widths stepping 400/600/800
- The copyright notice transitioned to IBM (MPL-2.0 retained)

## Notable decisions

- **It uses 3px and 5px radii.** Where most systems use 2, 4, 6 and 8, it chose odd numbers.
  A rare case, alongside Spectrum (which includes 3, 5, 7 and 9px).
- **There are only four radii.** 3, 5, 6 and 8px, all 8px or under. With no large radius at
  all, it holds a square-cornered infrastructure-tool tone. The opposite axis from Material 3
  (which goes to 48px).
- **Body and code type sizes are identical.** They share 13/14/16px.
- **The body default is in the 14px range.** `body-100` is 13px and `body-200` 14px —
  smaller than the Western convention of a 16px default, and close to Ant Design (14px).
- **It keeps per-product colour tokens.** Terraform, Vault, Consul and the rest each have
  brand colours.
- **It ships separate tokens for email** (`dist/cloud-email/`).

## Accessibility

~~Unverified.~~ → **WCAG 2.2 AA (resolved 2026-08-18).**
Source: `helios.hashicorp.design/about/accessibility-statement` — "formalizing our
commitment to WCAG 2.2 AA conformance with an internal policy". **A sample that keeps an
accessibility statement on its own page and codifies it as internal policy.**

## Notes

- Repository: https://github.com/hashicorp/design-system
- Package: `@hashicorp/design-system-tokens`
- Component deep-dive: `@hashicorp/design-system-components@6.5.0` →
  `dist/styles/@hashicorp/design-system-components.css` (2026-08-18)
- Licence: the components package states **MPL-2.0** — reflected in the frontmatter
  (2026-08-18)
- **Confirming the spacing scale is still outstanding.** The component CSS also uses literal
  px (8, 16, 24) for padding, strengthening the circumstantial case that there are no
  primitive spacing tokens — but the conclusion is withheld.
- **Licence resolved (2026-08-18):** `MPL-2.0` — source: github hashicorp/design-system →
  `LICENSE` (matching the npm `@hashicorp/design-system-tokens@5.1.0` metadata)
