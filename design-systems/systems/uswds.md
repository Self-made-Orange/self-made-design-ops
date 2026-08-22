---
name: USWDS (U.S. Web Design System)
org: U.S. federal government (GSA)
coverage: full
url: https://designsystem.digital.gov
repo: https://github.com/uswds/uswds
license: Public domain (CC0-1.0, a U.S. government work) + fonts SIL OFL-1.1 / icons Apache-2.0
tech: [Sass, CSS]
figma_kit: true
tokens_format: [Sass]
a11y_target: "Targets WCAG 2.1 AA (exceeding the legal baseline of 2.0 AA — moving gradually toward 2.2 and AAA, confirmed 2026-08-18)"
platform: web
domain: public
verified: 2026-08-18
source: "npm @uswds/uswds@3.14.0 → packages/uswds-core/src/styles/tokens/{units,font}/*.scss"
---
<!-- lang-links -->
> **English** · [한국어](uswds.ko.md)
<!-- /lang-links -->

## In one line

The U.S. federal government's web design system. **An 8px base**, with
**breakpoints derived from the spacing map** and negative spacing reaching **−120px**.

**The second piece of evidence that GOV.UK's 5px base is not a public-sector tendency** —
the British and American government systems use different bases (GOV.UK 5px / USWDS 8px).

## Tokens

### Spacing — an 8px base and `spacing-multiple()`

```scss
"05": spacing-multiple(0.5),   // 4px
1:    spacing-multiple(1),     // 8px
"105": spacing-multiple(1.5),  // 12px
2:    spacing-multiple(2),     // 16px
```

**The key is the multiple, with fractions encoded as strings** — `0.5` → `"05"`,
`1.5` → `"105"`, `2.5` → `"205"`. USWDS is the only system in the sample that folds the
decimal point into a string.

| group | values (px) |
|------|---------|
| `smaller` | 1 · 2 |
| `small` | 4 · 8 · 12 · 16 · 20 · 24 |
| `medium` | 32 · 40 · 48 · 56 · 64 · 72 · 80 · 120 |
| `large` | **160 (`card`) · 240 (`card-lg`) · 320 (`mobile`)** |
| `larger` | 480 (`mobile-lg`) · 640 (`tablet`) · 880 (`tablet-lg`) |
| `largest` | 1024 (`desktop`) · 1200 (`desktop-lg`) · 1400 (`widescreen`) |

The core `4/8/16/24` plus `32` are all present. The same family as Ant Design's seed
derivation, except **the function name `spacing-multiple` reveals the 8px base.**

**The scale is stratified by group name** — seven groups, `smaller` through `largest`.
And **the keys of the large values are device names** (`mobile` · `tablet` · `desktop` ·
`widescreen`).

### The breakpoints derive from the spacing — unique in the sample

```scss
$system-breakpoints: general.map-collect(
  map.get(spacing.$system-spacing, "large"),
  map.get(spacing.$system-spacing, "larger"),
  map.get(spacing.$system-spacing, "largest")
);
```

**There is no separate breakpoint scale.** The `large`–`largest` groups of the spacing map
are collected as the breakpoints — `mobile` 320 · `tablet` 640 · `desktop` 1024 ·
`widescreen` 1400.

It goes a step further than Codex putting viewports into its size scale as
`size-viewport-*` — **whitespace and screen width are different stretches of the same map.**

### Negative spacing — down to −120px, the deepest in the sample

A `neg-` prefix **mirrors the whole 4–120px positive range into negatives.**

| system | negative floor |
|--------|:---:|
| Atlassian | −32px |
| Primer | −48px |
| **USWDS** | **−120px** |

The first two share the judgement that "overlap is a small-scale adjustment"
(`systems/atlassian.md`); USWDS opens negatives up to the layout scale.
There are `-1px` and `-2px` too (`smaller-negative`).

### Typography — 20 steps, with 12–18px in 1px increments

```
10(micro) · 12 · 13 · 14 · 15 · 16 · 17 · 18 · 20 · 22 · 24 · 28 · 32 · 36 · 40 · 48 · 56 · 64 · 80 · 120
```

**12–18px is seven steps at 1px each.** The same density as Seed Design (10–16px in 1px
steps), one band higher. The odd 13, 15 and 17 are all present.

Six line heights — `1` 1 · `2` 1.2 · `3` 1.35 · `4` 1.5 · `5` **1.62** · `6` 1.75.
**There is a 1.62** — neither 1.6 nor 1.625.

A separate `$project-type-scale` merges with the system scale through `map-collect` —
**a slot for project extension built into the token structure** (part of the `$theme-*`
settings family).

### Measure — six steps in `ex`

```scss
$system-measure-smaller: 44ex;
$system-measure-base:    64ex;
$system-measure-largest: 88ex;
```

**The readable line length is tokenised in `ex` (x-height) units.**
The second measure token after Open Props's `20ch/45ch/60ch` (character widths), and
**the unit differs** — `ex` is the lowercase height, `ch` the width of a `0`.

| system | unit | values |
|--------|:---:|-----|
| Open Props | `ch` | 20 · 45 · 60 |
| **USWDS** | **`ex`** | 44 · 60 · 64 · 68 · 72 · 88 |

## Components

Split into `usa-*` packages under `packages/` (`usa-type-spacing` and so on).

### The deep pass (2026-08-17, `@uswds/uswds@3.13.0` packages/usa-button and others)

- **Buttons**: padding `units(1.5) units(2.5)` (12/20px), **weight bold**, radius
  `$theme-button-border-radius: "md"` — **a settings variable rather than a value.**
  Dimensions, colours and radii all pass through a `$theme-*` settings layer — the source
  structure makes clear that USWDS is not "a system that gives you values" but
  **a system you assemble through settings** (dovetailing with the existing record that
  NASA's WDS is an overlay built by overriding this settings layer).
- **The outline variant uses a 2px `inset box-shadow` rather than a border** — a technique
  for drawing an edge without changing the size (`$button-stroke: inset 0 0 0 2px`).
- A `@media (forced-colors: active)` branch sits directly in the component source —
  Windows high-contrast support pinned at the button level (the Clarity family).
- Inputs are likewise settings-driven, with `$theme-input-line-height: 3` (a line height of
  3×) and the rest.
  ~~`$theme-input-select-border-width: 2px` = the GOV.UK/NHS 2px border convention~~ →
  **corrected (2026-08-18, measured against the compiled CSS bundled with nasawds):**
  that variable is **specific to checkboxes and radios (the select family)**, and a text
  input's actual border is **1px**. It is not the same convention as GOV.UK and NHS
  (2px on text inputs).

## Characteristic decisions

- **An 8px base.** Squarely at odds with GOV.UK (5px) — among the three public-sector samples
  (GOV.UK · Codex · USWDS), only GOV.UK uses 5px
- **The breakpoints are a subset of the spacing map.** Unique in the sample
- **The large spacing values are named after devices** (`card` · `mobile` · `tablet` ·
  `desktop`)
- **Negative spacing down to −120px** — the deepest in the sample
- **Fractional keys encoded as strings** (`"05"` = 0.5×)
- **12–18px typography in 1px steps** — the same density as Seed Design, in a different band
- **The measure tokenised in `ex`** — the second measure-token case, and the first use of `ex`
- **A `$project-*` extension slot built into the token structure**

## Accessibility

~~No stated target was found in the package sources (the documentation site was
unreachable). There is presumably documentation about the federal procurement requirement
(Section 508), but it is **unverified**.~~
→ **Resolved 2026-08-18** — measured from the documentation site
<https://designsystem.digital.gov/documentation/accessibility/>.

**The documentation explains the relationship between Section 508 and WCAG directly.**
Section 508 of the Rehabilitation Act of 1973, amended in 1998, obliges federal agencies to
make information technology accessible, and **in 2018 it incorporated the WCAG 2.0 Level AA
success criteria.** The legal baseline is therefore 2.0 AA.

USWDS **aims above that baseline**:

- "While 2.0 AA is the baseline for legal conformance, USWDS strives to meet the higher
  standard of **WCAG 2.1 AA** — which also satisfies the legal requirement"
- It records that **WCAG 2.2, published in October 2023, is not currently a legal
  requirement**, but that it tries to meet as many of the newest success criteria as
  possible, **moving gradually toward AAA**
- As evidence of conformance it publishes an ACR based on a
  **VPAT (Voluntary Product Accessibility Template)** — testing against WCAG 2.0 was carried
  out in **March 2025** and the report published in **May 2025**
- It also draws a boundary of responsibility: "our testing does not guarantee your project's
  conformance — for full WCAG conformance, do your own research and testing"

The same wording appears on the design-assets side — "all designs meet the WCAG 2.0 AA
guidelines and conform to Section 508 of the Rehabilitation Act"
(<https://designsystem.digital.gov/documentation/getting-started-for-designers/>).

Per component, a `/components/<name>/accessibility-tests/` page exists separately
**for as many components as there are** (a large share of the sitemap's 257 URLs) — the only
structure in the sample that puts accessibility testing at the same URL tier as the component
documentation.

## References

- **3.14.0 re-verified — recorded values unchanged (2026-08-18).** The whole token directory
  was compared against 3.13.0 with `diff -rq`: only two files differ.
  `font/stacks.scss` is **a formatting change, line breaks only** (the font-stack values are
  identical), while `color/assignments-theme-color.scss` carries **a real change: the `"ink"`
  mapping moves from `$theme-color-base-darkest` to `$theme-color-base-ink`.**
  The latter is in a colour layer this entry has not yet collected, so the recorded values are
  unaffected — but **when colour is collected, the post-change values must be the baseline.**

- **Basis for the Figma kit (true):** an official Figma design kit — provided since 2024-11,
  alongside Sketch, with Adobe XD discontinued, confirmed 2026-08-18

- Documentation: https://designsystem.digital.gov (~~blocked by the proxy~~ → access
  succeeded from a local session, 2026-08-18)
- Tokens: `npm pack @uswds/uswds@3.13.0` →
  `packages/uswds-core/src/styles/tokens/units/spacing.scss` · `font/type-scale.scss`
- **Open questions:** colour (the official palette `$system-colors`) · radius ·
  component dimensions · the full `$theme-*` settings ·
  ~~the Section 508 description~~ (resolved 2026-08-18 — see the accessibility section)
- **Figma kit resolved (2026-08-18):** `figma_kit: true` — source
  <https://designsystem.digital.gov/documentation/getting-started-for-designers/>.
  It states that USWDS 3's design assets are maintained in **Figma and Sketch** formats and
  that **an official USWDS Figma design kit has been provided since November 2024.**
  There are two distribution routes — a **17.6MB ZIP of the Figma + Sketch kits** from GitHub
  (the `uswds/uswds-for-designers` repo), or **installing directly from Figma Community.**
  The 2025-01-08 changelog entry says "**removed links to third-party Figma kits**",
  confirming that unofficial kits were cleared from the documentation when the official one
  arrived.
  **Adobe XD assets have been discontinued** (Adobe no longer supports XD)
- **Licence resolved (2026-08-18):** `Public domain (CC0-1.0, a U.S. government work) +
  fonts SIL OFL-1.1 / icons Apache-2.0` — source: github uswds/uswds → `LICENSE.md`.
  GSA's modifications are CC0, the bundled fonts (Source Sans Pro, Merriweather, Public Sans)
  are OFL-1.1, and the Material Icons derivatives are Apache-2.0
