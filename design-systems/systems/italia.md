---
name: Design System Italia (design-tokens-italia)
org: Italian Government (Dipartimento per la trasformazione digitale)
coverage: partial
url: https://designers.italia.it
repo: https://github.com/italia/design-tokens-italia
license: BSD-3-Clause
tech: [DTCG JSON, CSS, SCSS]
figma_kit: unverified
tokens_format: [DTCG JSON ($value/$type/$description), CSS, SCSS]
a11y_target: unverified
platform: web
domain: government
verified: 2026-08-18
source: "npm pack design-tokens-italia@1.3.3 → tokens/{global,semantic,specific}.json · npm bootstrap-italia@2.18.3 · design-react-kit@5.10.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](italia.ko.md)
<!-- /lang-links -->

## In one line

The Italian government — the **ninth government sample**. The corpus's first government
case of tokens distributed in the **W3C DTCG draft format**
(`$value` / `$type` / `$description`), and its colour ramps have **different step numbers
per hue** — the numbers are not grades but **measured lightness**, so every ramp is
graduated differently.

## Colour — the step number is the lightness

```
blue:     20 · 25 · 30 · 40 · 48 · 57 · 67 · 77 · 87 · 97
seagreen: 10 · 14 · 19 · 24 · 39 · 54 · 69 · 76 · 84 · 92
gray:     10 · 15 · 25 · 32 · 45 · 64 · 83 · 90 · 96 · 98
```

**The step numbers differ per ramp.** Rather than a uniform graduation like 100/200/300
(most of the sample), **each colour's lightness value is the step name itself** —
`blue.40` does not mean "roughly the fourth" but a lightness around 40%. You can read the
lightness from the number alone, at the cost of losing any "same step" mapping between
hues. On GLOSSARY's name-to-value axis, this is a new type: **"the name is the
measurement"**. The base blue is `blue.40 = #0066cc`.

## Layers — three DTCG tiers

```
global.json → semantic.json (color · theme · spacing · elevation) → specific.json (per component)
```

**Using the W3C Design Tokens Community Group draft syntax as-is** is rare in the corpus
(`$value` / `$type` / `$description` — every token carries a description field). Among
government systems it is the only one.

## Figures

| Axis | Value |
|------|-------|
| Spacing | **twelve steps of 4px multiples**, named by the multiplier (`1x`–`24x`) — the government edition of Braid-style grid-multiple naming |
| Font size | eleven steps, 12–56px (12·14·16·18·20·24·28·32·40·48·56) |
| Line height | **five steps, 110–150%, written as percentages** |
| Tracking | `-1px · -1.3px · -2px` — **negative px tracking** (tightening for headings) |
| Radii | smooth 4 / rounded 40 / circle 80 — a three-step jump |
| Border | 1 · 2 · 4 · 8px |
| Typefaces | **Titillium Web** (sans) · Lora (serif) · Roboto Mono |

- The spacing reinforces the **government 4px camp** (NHS, USWDS, KRDS, SGDS…), with only
  GOV.UK's 5px standing apart — eight of the nine government samples are in the 4px family.
- Titillium Web is the Italian government's brand typeface — the same axis as other
  government-specific typeface programmes (France's Marianne, the Netherlands' and others).
- The tracking is fixed negative px — the second px-tracking sample alongside Persona
  (±0.2–0.8px), except that this one only tightens.

## Notable decisions

- **The ninth government sample** — the only government adoption of the DTCG format
- Colour step numbers as measured lightness (each ramp graduated differently)
- A `$description` on every token — descriptions required by the distribution's schema
- 4px multiples with multiplier naming for spacing
- Three steps of negative px tracking

## What the three tiers actually hold — semantic and specific (2026-08-18)

- **global** — the structural foundation: border · color ·
  font(-size/-leading/-tracking/-weight) · radius · spacing · sizing · shadow. Colours are
  numeric steps of `blue (20–97)`, seagreen, slate, gray, red, emerald, orange and teal.
- **semantic** — reusable design decisions: `color` (background/text/border — state pairs
  moving one notch along the ramp, as in `background.primary = {color.blue.40}` and
  `-hover = {color.blue.30}`), `theme`, `spacing` (**t-shirt aliases `3xs`–`3xl` all
  referencing the global multipliers** — 3xs = {1x}, s = {4x}, m = {6x}, l = {8x},
  3xl = {24x}), `elevation`.
- **specific** — exhaustive per-element expressions: `heading-1-font-size(-l)` ·
  `code-font` · `icon` and so on. Responsiveness is folded into the layer as a token suffix
  (`-l`).
- The pipeline: Figma (Tokens Studio) → DTCG JSON → Style Dictionary →
  `dist/css/variables.css` and `dist/scss/_variables.scss` (prefixed `$it-`).

### Agreement with bootstrap-italia — colours match, spacing does not (compared against v2.18.3)

- The dependencies include `design-tokens-italia ^1.3.3`, but **the token import is
  commented out** — the real values are hard-coded HSL/HSB with the token names alongside
  in comments (85 places).
- Colour comparison: `$primary` #0066cc = blue.40 · `$red` #cc334d = red.50 ·
  `$orange` #995c00 = orange.30 · `$green` #008055 = emerald.25 ·
  `$gray-100`–`900` = gray.96–10, **all matching**. Four cases in the slate family and
  others differ by ±1–2 RGB from rounding (conversion error from integer HSL notation) and
  are **deliberately the same value**.
- The spacing **does not reflect the token scheme** — it is Bootstrap's default map as-is
  ($spacer 1rem, 0/4/8/16/24/48px). That fits a 4px grid, but the 12/20/32/40/56/64/96px
  utilities of the 1x–24x steps are missing.
- In summary: **colours are value-synchronised with the tokens (manually), spacing is not,
  and direct consumption is disabled.**

## Component deep-dive — (2026-08-18)

The token distribution has no components, but **bootstrap-italia@2.18.3 is the component
layer**, and `design-react-kit@5.10.0` (49 React components, peer
`bootstrap-italia ^2.18.0`) consumes the same CSS. Below is measured from
`dist/css/bootstrap-italia.min.css` plus `src/scss` — since it is a BS5 theme, **only what
changed from the Bootstrap defaults** is recorded.

### Buttons — only the shape is Italianised

| | bootstrap-italia | BS5 default |
|---|:--:|:--:|
| font-weight | **600** | 400 |
| border | **0** | 1px |
| Radius | **4px** (by setting $border-radius itself to 4px) | 6px |
| Padding | .375/.75rem | same |

- A `$btn-text-transform: uppercase` variable exists but **is not applied to the compiled
  `.btn`** — the 29 uppercase instances are all in localised components such as the cookie
  bar.

### Inputs — an underline style

- `border: 0` · `border-radius: 0 !important` · min-height **2.5rem (40px)**.
- The actual border is **only on the bottom, 1px** — an exhaustive `input[type=…]` selector
  applies `border-bottom: 1px solid hsl(210,17%,44%)`. `.input-group-text` and appended
  `.btn` take the same underline, so **the whole group runs as one continuous line**. The
  furthest departure from the Bootstrap default (a border on four sides plus a radius).
- The focus ring: `0 0 0 .25rem rgba(0,102,204,.25)` — **the base blue blue.40 (#0066cc) at
  25% alpha**. The token base colour reappears in focus.

### Modals — Bootstrap widths, different density and scrim

| | bootstrap-italia | BS5 default |
|---|:--:|:--:|
| Width | 500px (sm 300 / lg 800 / xl 1140) | same |
| Radius | 8px | same |
| Inner padding | **1.5rem** | 1rem |
| Header border | **0** | 1px |
| Backdrop | opacity **0.8** | 0.5 |

### Keyboard focus — an achromatic double ring plus JS input-method detection

- `:focus:not([data-focus-mouse=true])` → `box-shadow: 0 0 0 2px #fff, 0 0 0 5px #000` —
  **a 2px white gap plus 3px black**. The achromatic edition of the same double-ring
  structure as GOV.UK (yellow) and WMN (purple)
  (`$focus-outline-color-in: $white / -out: $black`).
- **It does not draw a ring for mouse-click focus** — `track-focus.js` marks the input
  method as `data-focus-mouse` (a `track-focus` bundle ships with design-react-kit too).

## Accessibility

Unverified (a theme axis exists in the semantic layer — details unexamined). The
keyboard/mouse focus separation and the achromatic double ring are covered in the component
deep-dive above.

## Notes

- Related distributions: `bootstrap-italia` (a BS5 theme) · `design-react-kit` ·
  `design-angular-kit` — a structure where three framework packages share these tokens.
  Button, input and modal measurements are in the "Component deep-dive" section above
  (2026-08-18)
- ~~Detail on the semantic/specific tiers and agreement with bootstrap-italia values~~ →
  **resolved (2026-08-18)** — see "What the three tiers actually hold" above
- **Still to confirm:** dark and high-contrast themes, and the accessibility target (do not
  presume EU EN 301 549 — unverified)
