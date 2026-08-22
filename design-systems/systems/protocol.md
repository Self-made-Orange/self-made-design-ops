---
name: Protocol
org: Mozilla
coverage: partial
url: https://protocol.mozilla.org
repo: https://github.com/mozilla/protocol
license: MPL-2.0
tech: [CSS/SCSS]
figma_kit: unverified
tokens_format: [SCSS]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @mozilla-protocol/core@22.0.0 → protocol/css/includes/"
---
<!-- lang-links -->
> **English** · [한국어](protocol.ko.md)
<!-- /lang-links -->

## In one line

The design system for Mozilla's web properties (mozilla.org and the Firefox-related
sites). Marketing and content pages are its main stage.

## Tokens

### Spacing — only six steps

| Token | Value |
|-------|-------|
| `$spacing-xs` | 4px |
| `$spacing-sm` | 8px |
| `$spacing-md` | 16px |
| `$spacing-lg` | 24px |
| `$spacing-xl` | 32px |
| `$spacing-2xl` | 48px |

**The fewest steps of any system harvested.** There is no 12px or 20px, and it ends at
48px.

The set is exactly `4, 8, 16, 24, 32, 48`, and the first five **match the common core
shared by 13 systems** (`4/8/16/24/32`) exactly. Protocol has, in effect, adopted only
the common core.

### Typography

| Token | Value |
|-------|-------|
| `$title-3xs-size` | 16px |
| `$title-2xs-size` | 20px |
| `$title-xs-size` | 24px |
| `$title-sm-size` | 32px |
| `$title-md-size` | 40px |
| `$title-lg-size` | 48px |
| `$title-xl-size` | 56px |
| `$title-2xl-size` | 64px |

A heading-only scale stepping evenly by 8px (16 → 64px). The run after 40px — 48, 56,
64 — is particularly even.

### Radii / colour

Unverified.

Source: `@mozilla-protocol/core@22.0.0` → `protocol/css/includes/_themes-sass.scss`

## Components

~~Unverified.~~ (resolved 2026-08-18) `protocol/css/components/` holds **25** plus forms
and logos: article · billboard · breadcrumb · button · callout · card · feature-card ·
footer · menu · modal · navigation · newsletter-form · notification-bar · picto · split ·
sticky-promo · video · zap and others. A composition in which **the download button
(plus its privacy link) is an independent component** — the marketing-site domain reads
straight off the list.

## Component deep-dive — (2026-08-18)

Measured from the scss under `protocol/css/components/` in
`@mozilla-protocol/core@22.0.0` together with the compiled `protocol-components.css`.

### Buttons (`.mzp-c-button`) — height not fixed, four sizes

No height is declared; it derives from **type × 1.5 line height + padding + a 4px
border**.

| | sm | md | lg (default) | xl |
|---|:--:|:--:|:--:|:--:|
| Type | 12px | 14px | 16px | 16px |
| Padding | 1px 8px | 4px 8px | 8px 16px | 10px 24px |
| **Derived height** | 24px | **33px** | 44px | 48px |

- **The border is 2px** — twice the 1px majority. Since hover works by inverting
  background and text colour (outline ↔ filled), the border is part of the form in this
  marketing-style button.
- **The button radius is 0** — radius tokens exist (2/4/8/16px) but are not used on
  buttons. Only form fields get 4px (`$field-border-radius: $border-radius-sm`).
  Square-versus-round splits along a component axis.
- The md derived height is **an odd 33px** — no integer compensation (the opposite pole
  from MUI's half-pixel correction: laissez-faire).
- Font weight **700**, transition 100ms (easing unspecified, so `ease`).
- The icon gap is **`0.5ch`** — a character-width unit rather than px or rem.
- Variants: primary (default) · secondary · product (Firefox blue) · neutral, crossed
  with a dark theme.

### Inputs (forms `form-input`)

- Padding **8px all round**, 2px border, 4px radius, 16px type / 1.25 line height →
  a derived height of **40px**.
- `min-width: 256px` — from the formula `$content-xs(304) − $layout-xs(24)×2`. A rare
  route, back-computing an input's minimum width from a content-width token.
- Comes with `margin-bottom: 24px` (`$field-v-spacing`).
- The label is a separate block — 14px / bold / 8px below.
- Focus ring `0 0 0 2px rgba(blue-40, .5)` plus a separate red ring for errors.

### Modals (`.mzp-c-modal`) — a theatre rather than a dialog

- **Black on black**: a full `rgba(0,0,0,.85)` scrim plus an inner `rgba(0,0,0,.9)`
  panel, with white text. There is no white dialog card at all — this is a lightbox for
  video and images.
- No width steps, a single `max-width: 1200px`, 32px padding, radius 0.
- Entry fade-in **300ms ease-in** (keyframes, `both`). The close button is a 42×42px
  white icon.
- `z-index: 9999999`, `height: 101%` — right down to the comment about compensating for
  mobile scroll drift, this is production marketing-site code.

### Notable decisions (deep-dive)

- **Radius 0 on buttons versus 4px on fields** — buttons stay square regardless of the
  radius tokens existing
- **A 2px border plus inverting hover** — a marketing button whose outline is the shape
  language
- **The modal is a theatre (lightbox)** — none of the product-UI dialog grammar (width
  steps, cards, footers)
- Derived heights left alone (an odd 33px) — the type scale takes priority over height
  alignment
- Icon gap in `ch` units

## Notable decisions

- **Only six spacing steps.** Less than a third of Canvas's 19. Fewer options make
  decisions fast and keep things consistent, at the cost of fine adjustment.
- **The values adopted match the common core exactly.** `4/8/16/24/32` (+48). It can be
  read as a validation of the core derived from 13 systems — **when reduced to a
  minimum, what remained was the core.**
- **There is no 12px or 20px.** These are the next layer out from the common core
  (adopted by 11/12 and 10/12 respectively), and Protocol excluded them. The gap between
  8 and 16 matches Backpack.
- **The heading scale steps evenly by 8px.** It climbs evenly from 16 to 64. Keeping
  headings on their own scale, separate from body, resembles Paste (the display family).
- **The t-shirt naming uses `2xl`.** A numeric prefix rather than `xxl`, differing in
  notation from Material 3's `xxl` and Fluent's `XXXL`.

## Accessibility

Unverified.

## Notes

- Repository: https://github.com/mozilla/protocol
- Package: `@mozilla-protocol/core` (component deep-dive:
  `@mozilla-protocol/core@22.0.0` → `protocol/css/components/` + `includes/forms/`,
  2026-08-18)
- Licence: the package's `package.json` states **MPL-2.0** — reflected in the
  frontmatter (2026-08-18)
- **Licence resolved (2026-08-18):** `MPL-2.0` — source: github mozilla/protocol →
  `LICENSE` (matching the npm `@mozilla-protocol/core@22.0.0` metadata)
