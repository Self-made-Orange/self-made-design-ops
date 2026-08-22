---
name: SGDS (Singapore Government Design System)
org: Singapore Government (GovTech)
coverage: partial
url: https://www.designsystem.tech.gov.sg
repo: https://github.com/govtechsg/sgds
license: MIT
tech: [Web Components, Sass]
figma_kit: unverified
tokens_format: [Sass, CSS]
a11y_target: unverified
platform: web
domain: public
verified: 2026-08-18
source: "npm @govtechsg/sgds@2.3.6 → sass/_variables.scss"
---
<!-- lang-links -->
> **English** · [한국어](sgds.ko.md)
<!-- /lang-links -->

## In one line

Singapore's government system. The first sample **whose Bootstrap ancestry is
confirmable from the tokens**, and in forking it **restored the 32px that Bootstrap
lacked** to its spacers.

## Tokens

### Ancestry — the Bootstrap fingerprints are intact

```scss
$spacer: 1rem !default;
$border-radius-pill: 50rem !default;   // a Bootstrap-specific value
$grid-breakpoints: (xs: 0, …);
$negative-spacers: if($enable-negative-margins, negativify-map($spacers), null);
```

Derivation from `$spacer` · the `$enable-*` flags · `negativify-map` · **the `50rem`
pill** — all of it is Bootstrap's structure (`systems/bootstrap.md`).
**The only case in the sample where being a fork of another system is provable from the
token source.**

### Spacers — what the fork fixed

```scss
$spacers: (0, .25, .5, 1, 1.5, 2, 2.5, 3, 3.5) × $spacer
        = 0 · 4 · 8 · 16 · 24 · 32 · 40 · 48 · 56
```

| | Bootstrap | SGDS |
|---|-----|-----|
| Steps | 6 | **9** |
| 32px | **absent** | **present** |
| Top | 48 | 56 |

**The fork restored the 32px (a core value) the original skipped.** Because the
multipliers step by 0.5, there is still no 20px. It holds the entire core
`4/8/16/24/32` — the fifth public-sector sample, and its base differs again (multiples
of a 16px `$spacer` — unlike GOV.UK's 5, USWDS's 8 or the KRDS 4 family).

### Radii — the default is 5px

```scss
$border-radius:     .3125rem;   // 5px
$border-radius-sm:  .2rem;      // 3.2px
$border-radius-lg:  .3rem;      // 4.8px
$border-radius-xl:  1rem;       // 16
$border-radius-2xl: 2rem;       // 32
```

**A 5px default** — changed from Bootstrap's 6px. It joins the odd-number radius camp
(Helios, Spectrum, Open Props, Semi), and **`sm` (3.2px) and `lg` (4.8px) are fractional
px** — SGDS is the only sample with deliberately fractional px radii (the same family as
Polaris's 0.66 border).

**`lg` (4.8px) is smaller than the default (5px)** — the only case where the name order
and the value order disagree.

### Typography

h1–h6: 40 · 32 · 24 · 18 · **16 · 16** — **h5 and h6 are the same** (Bootstrap has
20/16). Body stays at 16px.

## Components

~~Web Components (`sgds-*`). List unverified.~~ Corrected 2026-08-18: this package
(`@govtechsg/sgds` v2) is **a CSS/Sass framework**. The Web Components are split into a
separate package, `@govtechsg/sgds-web-component` (currently 3.26.0), not yet harvested.

## Component deep-dive — (2026-08-18)

Measured in the same `@govtechsg/sgds@2.3.6`. Since the component SCSS is one
`@import "~bootstrap/scss/buttons"` line plus a few additions (**depending on bootstrap
~5.2.0**), **every component dimension is decided by editing variables in the vendored
`_variables.scss`** — the fork's point of intervention is the variable layer, not the
CSS.

### Buttons and inputs — a 2.0 line height straightens the height ladder

Two key edits: **`$line-height-base: 1.5 → 2`** and
**`$input-btn-padding-y: 6px → 7px`** (horizontal 12 → 16px). Because heights are
derived (Bootstrap's way, unchanged), those two change the entire ladder:

| Derived height | sm | default | lg |
|---|:--:|:--:|:--:|
| Bootstrap | 31px | 38px | 48px |
| **SGDS** | **38px (14×2+8+2)** | **48px (16×2+14+2)** | **58px (20×2+16+2)** |

- **The irregular 31/38/48 is realigned to an even 10px step, 38/48/58.** The default
  lands on exactly 48px — Bootstrap's lg becoming SGDS's default, a ladder pushed up one
  rung.
- **A body line height of 2.0 is the highest in the sample** (most are 1.4–1.6). In
  Bootstrap's structure, buttons, inputs and body share the same variable, so deciding a
  reading line height *is* deciding control heights — both a side effect of the shared
  variable layer and a lever on it.
- Radii: default 5px · sm 3.2px · lg 4.8px (the fractional px from the token section
  applied as-is).
- **A 2px focus ring** (`$input-btn-focus-width: .25rem → .125rem`) — half of
  Bootstrap's 4px. The alpha-0.25 ring approach is kept.
- Button weight 400 and a `.15s ease-in-out` transition across four properties —
  Bootstrap's defaults kept. Input border 1px `$gray-400`, with the same 48px height as
  the button (a shared variable).
- Checkbox `1.125em` = **18px** (enlarged from Bootstrap's 1em = 16px).

### Modals — original widths, only padding and radius changed

| | Bootstrap 5.2 | SGDS |
|---|:--:|:--:|
| Width steps | 300/500/800/1140px | **identical** (unchanged) |
| Inner padding | 16px | **24px** (`$modal-inner-padding: 1.5rem`) |
| Radius | 8px (`$border-radius-lg: .5rem`) | **4.8px** (fallout from the `.3rem` redefinition) |
| Footer | has a border | **transparent border plus padding-top 0** |
| Entry | `translate(0,-50px)` + `.3s ease-out` | identical |
| Scrim | black 50% | identical |

- **The 4.8px modal radius** was not chosen directly; changing `$border-radius-lg` to
  4.8px flowed through the modal variable's reference. A place where the path of a
  fractional px radius propagating into components is visible.
- The additions are minor — removing the footer padding within a `.sgds.modal` scope,
  the close-button size. The `centered-align-icon` variant (a header with a centred
  icon) is its own addition.

### Notable decisions (deep-dive)

- **A global 2.0 line height** — the highest in the sample, governing control heights
  too
- **The height ladder realigned to an even 10px step** (38/48/58) — a 48px default
- **Intervention only at the variable layer** — the component SCSS is one import line
  (the Bootstrap edition of NASA WDS's single settings file, an even thinner layer than
  NHS's "replace the values")
- A halved focus ring (2px) · the 4.8px modal radius fallout · an 18px checkbox

## Notable decisions

- **Bootstrap fork ancestry provable from the tokens** — unique in the sample
- **The fork restored a core gap in the original (32px)** — a record of a derived system
  overturning the original's judgement
- **A 5px default radius plus fractional px steps (3.2/4.8)** — including the `lg` <
  default inversion
- h5 = h6 = 16px
- The fifth public-sector sample, with all five bases different (5px / multiples of 4 /
  8 / the 4px family / multiples of 16)

## Accessibility

Unverified.

## Notes

- Tokens: `npm pack @govtechsg/sgds@2.3.6` → `sass/_variables.scss`
- Component deep-dive: the same package's `sass/_{buttons,forms,modal}.scss` plus
  `_variables.scss` (depending on bootstrap ~5.2.0, 2026-08-18)
- ~~Licence~~ a LICENSE is bundled in the package — **MIT** (with an appended clause
  excluding the Singapore state crest and public-agency insignia, confirmed 2026-08-18) ·
  reflected in the frontmatter (2026-08-18)
- **Still to confirm:** colour · the component list (the Web Components edition
  `@govtechsg/sgds-web-component@3.26.0` is not harvested) · the full set of changes
  against Bootstrap
- **Licence resolved (2026-08-18):** `MIT` — source: npm `@govtechsg/sgds@2.3.6` →
  `package.json`. The repository root (GovTechSG/sgds) has no LICENSE file
