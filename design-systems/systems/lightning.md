---
name: Lightning Design System
org: Salesforce
coverage: full
url: https://www.lightningdesignsystem.com
repo: https://github.com/salesforce-ux/design-system
license: BSD-3-Clause
tech: [Aura, LWC, CSS]
figma_kit: true
tokens_format: [JSON, SCSS, CSS]
a11y_target: "WCAG 2.1 AA (the baseline across Salesforce products — confirmed 2026-08-18)"
platform: [web, mobile]
domain: enterprise
verified: 2026-08-18
source: "npm @salesforce-ux/design-system@2.264.0 → design-tokens/dist/primitive.raw.json"
---
<!-- lang-links -->
> **English** · [한국어](lightning.ko.md)
<!-- /lang-links -->

## In one line

The design system across Salesforce's products. Its distinguishing features are
**axis-separated spacing** and **shipping iOS and Android tokens alongside the web**.

## Tokens

### Spacing

| Token | rem | px |
|-------|-----|-----|
| `SPACING_NONE` | 0 | 0 |
| `SPACING_XXX_SMALL` | 0.125 | 2 |
| `SPACING_XX_SMALL` | 0.25 | 4 |
| `SPACING_X_SMALL` | 0.5 | 8 |
| `SPACING_SMALL` | 0.75 | 12 |
| `SPACING_MEDIUM` | 1 | 16 |
| `SPACING_LARGE` | 1.5 | 24 |
| `SPACING_X_LARGE` | 2 | 32 |
| `SPACING_XX_LARGE` | 3 | 48 |

**It contains the whole common core (`4/8/16/24`) and goes up to 32 and 48.** There is
no 20px or 40px.

### Axis-separated spacing

Separately from the raw scale, it keeps **horizontal- and vertical-specific tokens**.

```
VAR_SPACING_HORIZONTAL_SMALL       0.75rem (12px)
VAR_SPACING_HORIZONTAL_XX_LARGE    3rem    (48px)
VAR_SPACING_VERTICAL_X_SMALL       0.5rem  (8px)
VAR_SPACING_VERTICAL_MEDIUM        1rem    (16px)
VAR_SPACING_VERTICAL_LARGE         1.5rem  (24px)
```

Fluent 2 uses the same approach (`spacingHorizontalM` / `spacingVerticalM`).
**These two are the only axis-separated cases in the sample.**

### Radii

| Token | Value | px |
|-------|-------|-----|
| `BORDER_RADIUS_SMALL` | 0.125rem | 2 |
| `BORDER_RADIUS_MEDIUM` | 0.25rem | 4 |
| `BORDER_RADIUS_LARGE` | 0.5rem | 8 |
| `BORDER_RADIUS_CIRCLE` | 50% | — |
| `BORDER_RADIUS_PILL` | **15rem** | **240** |

**Only three steps, all 8px or under.** A squared-off tone similar to Helios (four
steps at 3, 5, 6 and 8px).

**`PILL` is 15rem (240px).** Unlike every other system's pill expression — Polaris and
Atlassian 9999px, Fluent 10000px, Nord 999px, Paste 100px, Material 3 1000px.
**240px is the smallest pill value in the sample, and an element larger than 240px will
not come out fully pill-shaped.**

### Cross-platform tokens

`design-tokens/dist/` ships per-platform builds alongside.

```
primitive.raw.json      raw tokens
ui-one.ios.json         iOS
transparent-colors.json
ui.aura-tokens.json     the Aura framework
ui.component-tokens.json
```

**It distributes a separate iOS build.** A rare case, alongside Paste (Twilio).

### Typography / colour

Unverified — other files under `design-tokens/dist/` still need checking.

## Components

`ui/components/` and `metadata/components/` hold a directory per component.

### Deep-dive (2026-08-17, `@salesforce-ux/design-system@2.264.0` scss/components)

- **Three-level styling-hook fallback** — the button base alone carries 87
  `--slds-c-button-*` variables, and every property is a three-level chain,
  `var(--slds-c-… , var(--sds-c-… , SCSS default))`. A migration design that keeps the
  new and old namespaces (`slds` / `sds`) coexisting through fallbacks — the same
  family as Polaris's `--pc-*` state fallbacks, but **handling a version transition
  through fallbacks** is SLDS alone.
- **Touch-context tokens** — alongside `$line-height-button: 1.875rem` (30px) there is
  a separate `$button-line-height-touch: 2.65rem` (42.4px). A desktop/touch pair (the
  same concern as Spectrum's medium/large scales, implemented as individual tokens).
- Measured: button line height 30px (small 28px), input height 30px, pill 26px, radius
  4px. 30px sits at the low end of the corpus's button distribution (28–48) — the same
  desktop enterprise camp as Ant's 32.
- The build comment `/*! @css-var-fallback */` — hook generation is tooled.

## Notable decisions

- **It keeps axis-separated spacing.** Horizontal- and vertical-specific tokens exist
  separately from the raw scale. The same family as Fluent 2.
- **Three radius steps, all 8px or under.** A squared-off enterprise tone.
- **The pill radius is 240px.** The smallest in the sample; larger elements do not come
  out as pills.
- **The raw tokens have two layers, `aliases` and `props`.** The same values are
  defined redundantly in both.
- **It ships per-platform builds for iOS, Aura and others.**
- **The package has an `__internal/` directory.** Separating public from internal
  assets.

## Accessibility

~~Unverified~~ → **resolved (2026-08-18, confirmed by headless render).**

Source: https://www.lightningdesignsystem.com/2e1ef8501/p/23a1dd-global-accessibility-standards

- **The baseline is WCAG 2.1 Level AA.** In the original: "At Salesforce, we use WCAG
  2.1 Level AA as our baseline for accessibility across products and platforms."
- **The documentation carries a table mapping regional regulations** — a rare
  arrangement in the sample.

| Region | Regulation / policy | Basis |
|--------|---------------------|-------|
| International | WCAG | W3C |
| United States | Section 508, ADA | WCAG 2.0+ |
| EU | EN 301 549, European Accessibility Act | WCAG 2.1 |
| Canada | ACA, AODA (Ontario) | WCAG 2.0+ |
| United Kingdom | Equality Act 2010, Public Sector Accessibility Regulations | WCAG 2.1 |
| Australia | Disability Discrimination Act (DDA) | WCAG 2.0 |
| Japan | JIS X 8341-3 | aligned with WCAG |
| India | GIGW | WCAG-based |
| China | GB/T 37668 | references WCAG |

- The documentation's conclusion: "If you comply with WCAG 2.1 AA or 2.2 AA, you're in
  good shape globally" — treating **2.2 as an equally acceptable level rather than a
  ceiling.**
- Every component document has a fixed four-tab structure,
  `Usage · Develop · Specifications · Accessibility` (confirmed by rendering the
  sidebar).

## Figma kit — official distribution confirmed (2026-08-18)

Source: https://www.lightningdesignsystem.com/2e1ef8501/p/2963ba-figma-kits

This is the basis for `figma_kit: true`. It distributes **SLDS 2 and SLDS 1 as
separate libraries**, and what stands out is that even the patterns are split into
individual files.

- **SLDS 2** — Foundations: `SLDS 2 Style Guide` · Components:
  `SLDS 2 Web Components UI Library` · Patterns: `SLDS 2 Pattern: Agentic Experience`
  (for generative-AI interfaces), `SLDS 2 Pattern: Builder`
- **SLDS 1** — three Foundations (`SLDS 1 Typography` · `SLDS 1 Color` ·
  `SLDS 1 Icons`) · Components: `Components for Web` · four Patterns
  (`Builder (Beta)` · `Confetti (Beta)` · `Console UI (Beta)` · `Charts`)
- **A case of distributing patterns as Figma files** — unlike the convention of
  publishing only a component library. Even product-specific effects like `Confetti`
  (celebration animation) are kept in the kit.

## Notes

- Repository: https://github.com/salesforce-ux/design-system
- Package: `@salesforce-ux/design-system`
- Tokens: `design-tokens/dist/primitive.raw.json` (raw), `ui.*-tokens.json`
  (per framework)
- **Licence resolved (2026-08-18):** `BSD-3-Clause` — source: github
  salesforce-ux/design-system → `LICENSE.txt` (matching the npm
  `@salesforce-ux/design-system@2.264.0` metadata)
