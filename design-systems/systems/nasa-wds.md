---
name: NASA Web Design System
org: NASA
coverage: partial
url: https://nasa.github.io/nasawds-site
repo: https://github.com/nasa/nasawds
license: CC0-1.0
tech: [SCSS]
figma_kit: unverified
tokens_format: [SCSS]
a11y_target: unverified (do not presume it inherits USWDS's — left unverified)
platform: web
domain: aerospace
verified: 2026-08-18
source: "npm nasawds@4.0.70 → src/theme/_uswds-theme.scss (depends on @uswds/uswds ^3.1.0)"
---
<!-- lang-links -->
> **English** · [한국어](nasa-wds.ko.md)
<!-- /lang-links -->

## In one line

**The second `aerospace` sample** — but unlike Astro UXDS this is not a mission-control
scheme of its own, it is **a configuration overlay on USWDS 3.x**. Even within one
domain, "a space agency's website" and "a spacecraft control UI" produce entirely
different systems.

## Structure — overwriting USWDS settings

```scss
$theme-color-primary:  'blue-warm-60v',   // NASA blue
$theme-color-secondary: 'red-50v',        // NASA red
$theme-font-type-lang:  'helvetica',
$theme-h3-font-size: 10, $theme-h4-font-size: 8,  // USWDS size indices
```

- **There are no tokens of its own** — it takes `@uswds/uswds` as a dependency and
  changes only the `$theme-*` variables. The **USWDS edition** of the same position as
  SGDS (a Bootstrap fork), differing in that this is **a single settings file** rather
  than a fork
- Colours are specified with USWDS colour names (`blue-warm-60v`) — it speaks in the
  inherited system's vocabulary
- ~~It replaces the typeface from the USWDS default (Public Sans) with Helvetica~~
  (corrected 2026-08-18 — **headings only are Helvetica**; body keeps Source Sans Pro.
  See the deep-dive below)

## An answer to the `aerospace` domain question

This was to be the second sample settling whether Astro UXDS (mission control, status
colour vocabulary) reflects a domain tendency or stands alone — and **the answer is
"not comparable".** NASA WDS is a USWDS overlay for a website, so it meets Astro's
severity colours and control-room vocabulary nowhere. This sample's conclusion is that
the `aerospace` domain contains **two layers, control UI (Astro) and agency web
(NASA WDS)**.

## Component deep-dive — (2026-08-18)

The full set of overrides was checked in the same `nasawds@4.0.70`, and the resolved
button, input and modal values were measured from the bundled compiled output
`src/css/styles.css` (**built with USWDS 3.13.0** — the version is stated in a comment).

### The full set of overrides — zero at the component layer

The whole theme is **17 settings plus 194 lines of custom SCSS**:

- `_uswds-theme.scss` (22 lines): 10 colours (`$theme-color-primary: 'blue-warm-60v'`
  and so on) plus 7 typography settings (`$theme-font-type-lang: 'helvetica'` ·
  `$theme-h3-font-size: 10` · `$theme-h4-font-size: 8`)
- `_uswds-theme-custom-styles.scss` (194 lines): mostly a dark header variant
  (`usa-header--dark`), plus `letter-spacing(-2)` on h1 and h2 and `ink` backgrounds on
  hero and section
- **Zero instances of the `$theme-button-*`, `$theme-input-*` or `$theme-modal-*`
  families** — nothing touches button, input or modal dimensions, radii or motion.
  **Confirmed: no component distribution and no component-setting overrides.**

### Compiled measurements — USWDS 3.13.0's defaults come through unchanged

Values cross-checking the source reading in the uswds.md deep-dive (the same 3.13.0)
**against the build output**:

| | Measured (styles.css) |
|---|-----|
| Button | padding **12/20px** · radius **4px** · **700** · 17px (1.06rem) · line height 0.9 · `#0050d8` |
| Input | **height 40px** · border **1px** `#565c65` · radius 0 · max-width 30rem |
| Modal | max-width **480px** / lg **880px** · radius **8px** · padding 32px |
| Modal entry | **opacity fade only, .15s ease-in-out** (no transform) |

- The button colour `#0050d8` is **the only component-level difference NASA chose** —
  the resolved result of the USWDS colour name `blue-warm-60v`.
- The text input border compiles to **1px** — the build output reveals that
  `$theme-input-select-border-width: 2px`, recorded in uswds.md, is despite its name a
  variable applying to the checkbox and radio family (a candidate footnote for
  uswds.md).
- The modal entry being a fade only puts it alongside GOV.UK's and NHS's "no modal" to
  form a spectrum of government-family modal conservatism: none (GDS, NHS) → fade only
  (USWDS).

### Typeface — the actual scope of the "Helvetica replacement"

~~It replaces the typeface from the USWDS default with Helvetica~~ (correcting the
description in the section above) — **Helvetica is for headings only.**
`$theme-font-type-lang: 'helvetica'` defines the `lang` font type and
`$theme-font-role-heading: 'lang'` assigns it **to the heading role only**. In the
compiled output, body, buttons and inputs keep `Source Sans Pro Web`, and only headings
such as `usa-modal__heading` get `Helvetica Neue, Helvetica, …`. A structure where the
brand intervenes only at the display layer.

### Notable decisions (deep-dive)

- **Zero component overrides** — the far end of the derivation spectrum:
  NHS (a fork replacing values) > SGDS (editing variables) > **NASA WDS (colour and
  headings only)**
- **Helvetica for headings only** — body keeps the USWDS default
- The compiled output bundled — **a distribution form verifiable from the build result**
  rather than the source

## Notable decisions

- **A dependency plus one settings file** — the thinnest form of inheritance (lighter
  than a fork)
- Purpose (control room vs web) divides the scheme even within one domain — a
  demonstration of the `domain` axis's limits
- Brand colours specified in USWDS vocabulary

## Accessibility

Unverified — whether it uses USWDS's accessibility structure was not verified.

## Notes

- Tokens: `npm pack nasawds@4.0.70` → `src/theme/`
- Component deep-dive: the same package's `src/theme/_uswds-theme*.scss` plus
  `src/css/styles.css` (the USWDS 3.13.0 compiled output, 2026-08-18)
- **Still to confirm:** the nasawds-site documentation (blocked by the proxy),
  ~~the licence~~ (resolved 2026-08-18 — package.json states **CC0-1.0**; the
  frontmatter's "not stated" was an error, corrected 2026-08-18),
  ~~the full set of overrides~~ (resolved 2026-08-18 — 17 settings plus 194 custom
  lines, see the deep-dive)
- **Licence resolved (2026-08-18):** `CC0-1.0` — source: npm `nasawds@4.0.70` →
  `package.json`. The repository (nasa/nasawds, redirecting to bruffridge/nasawds) has
  no LICENSE file
