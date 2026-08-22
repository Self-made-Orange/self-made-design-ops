---
name: Fleet (Boston Patterns)
org: City of Boston (Digital Team)
coverage: partial
url: https://patterns.boston.gov
repo: https://github.com/CityOfBoston/patterns
license: "a dual structure — code CC0-1.0 (stated in package.json) / reuse of the city's marks and trade dress forbidden (stated in the README)"
tech: [Stylus, PostCSS, Fractal, Stencil web components]
figma_kit: unverified
tokens_format: [Stylus variables, measured from the public CSS]
a11y_target: unverified
platform: web
domain: government(municipal)
verified: 2026-08-18
source: "patterns.boston.gov/css/public.css (184,235B — confirmed byte-identical to the repo's develop branch) + CityOfBoston/patterns stylesheets/variables/*.styl"
---
<!-- lang-links -->
> **English** · [한국어](fleet-boston.ko.md)
<!-- /lang-links -->

## In one line

The City of Boston's pattern library — a municipal sample **whose colour names are local
identity** (Charles Blue · Freedom Trail Red · Optimistic Blue). Its typography pairs
Montserrat and Lora with **`calc()` fluid formulas** (pre-clamp-generation fluid
typography — a rare sample in the corpus), it belongs to the **border-radius 0 camp**
(no decorative radius at all), and its button hover **swaps brand colours**, blue to red.
The repository was pushed 2026-04 — **active**.

## Source status · the dual licence structure

- The repository `CityOfBoston/patterns`: created 2016-06, **last pushed 2026-04-16
  (active)**, default branch develop. The GitHub API license field is None, but
  **package.json states `"license": "CC0-1.0"`**.
- The README opens with a contrary clause: this project contains the marks and trade
  dress of the City of Boston's digital assets and **may not be reused without the city's
  express permission** — **the code is public domain, the identity is locked**. An
  explicit sample of dual licensing in government (contrasting with the single licences
  of uswds and govuk).
- Two verification routes for the values: the live `css/public.css` (184,235B) is
  byte-identical to the scratch harvest, and the originals in the repo's
  `stylesheets/variables/*.styl` were compared against it.

## Colour — the names are geography

The named palette in `variables/_colors.styl` (**20 distinct hexes** measured in
public.css):

| Name | Hex | Note |
|------|-----|------|
| Charles Blue | #091F2F | the primary dark — the Charles River. Appears 167 times in the css |
| Optimistic Blue (light/dark) | **#1871BD (identical)** | the comments distinguish light from dark yet **the real values match** — a trace of a 2019-01 renaming refactor |
| Optimistic Blue SR | #28A7DF | "screen readers" — a comment stating outright that **a contrast failure was patched with a colour** |
| Optimistic Blue hover | #175182 | |
| Freedom Trail Red light/dark | #FB4D42 / #D22D23 | light for dark backgrounds · dark for text on white — **split by contrast direction** |
| Yellow | #FCB61A | hover is the formula `darken($yellow, 20)` (emitting #AE7902) |
| Body Text | #58585B | body grey |
| Grey 000–300 | #F3F3F3 · #E0E0E0 · #C8C8C8 · #828282 | four steps |

- **-light and -dark are not a lightness ramp but an axis of "text on which background"**
  — the comments attach usage like clauses (focus = Optimistic light · error border =
  Freedom light · error text = Freedom dark).
- There is no separate semantic palette — errors and focus reuse brand colours under new
  designations.

## Typography — calc() fluid formulas (a rare sample)

Typefaces: **Montserrat** (Arial fallback — display, buttons, uppercase) plus **Lora**
(Georgia fallback — a body serif). A serif body is an unusual choice in government.

**The fluid typography uses `calc()` plus media-query bounds rather than `clamp()`** (the
formulas verbatim, measured from public.css):

```css
.h1  { font-size: calc(30px + 45 * ((100vw - 480px) / 960)); }  /* 30→75px between 480 and 1440px */
@media (min-width:1440px) { .h1 { font-size: 75px } }            /* the ceiling pinned */
.btn { font-size: calc(14px + 2 * ((100vw - 480px) / 960)); }    /* 14→16px */
.hro-t--l { font-size: calc(45px + 45 * ((100vw - 420px) / 860)); } /* hero 45→90px */
```

- The pattern is `calc(min + increment * ((100vw − start vp) / vp width))` — **linear
  interpolation unrolled by hand**. A specimen of the pre-clamp() (standardised 2020)
  generation of fluid typography, alive on a live site → crossing the "fluid scale"
  section of `patterns/typography.md` (Pajamas clamp() · Mantine/Radix runtime scaling) as
  its **third form**. rem-based formulas coexist too
  (`calc(.875rem + .125 * ((100vw - 30rem) / 60))`).
- The fixed scale is the eight steps in `_fonts.styl`: 12/14/16/18/20/25 (1.4rem "fixed")/
  ~26.7 (1.6667rem)/45px (2.8125rem) — the comment's "~20px" is an error
  (1.6667rem ≈ 26.7px). The largest fixed px measured is 75px (the h1 ceiling), with only
  the hero extension reaching 90px.
- Eight line heights (1/1.1/1.2/1.32/1.5/2/2.5/3.5) · eight border widths (0–10px, with
  fractional rems like 0.222rem wedged in) · twelve spacing steps (0–4rem, with
  **intermediate insertions like 275 and 450** — the name-value inversion family in
  GLOSSARY).

## Components — the radius-0 camp, hover swapping brand colours

- **Zero decorative border-radius** — the only radii in public.css are 0, 50% and 100%
  (circles). The municipal sample of the square-cornered government camp, with govuk and
  nysds.
- Buttons: Montserrat 700 uppercase with 1px letter-spacing · 1.25rem padding · no radius ·
  **base blue (#1871BD) → Freedom Trail Red (#FB4D42) on hover** — a rare rule where hover
  is **a swap to the second brand colour** rather than a lightness change.
- Four colour variants (default blue · `--w` white/blue · `--y` yellow · `--c` Charles
  Blue) plus a `--br` 3px outlined form plus hover overrides (`--r-hov` / `--w-hov`) —
  each variant specifies its own hover colour (yellow darkens to #AE7902; the white form
  becomes a white background with red text).
- Seven breakpoints (480/768/840/980/1280/1300 plus the 1440 typography ceiling) —
  **unconventional values like 840, 980 and 1300** (content-fitted boundaries).
- The build is Stylus → PostCSS, the documentation is Fractal, and new components are
  Stencil web components (alongside in `web-components/`) — a cross-section of a CSS
  library migrating to web components.

## Notable decisions

- Colour names as city geography and history (Charles Blue · Freedom Trail Red) — a sample
  where the naming doubles as the branding document
- calc() linear-interpolation fluid typography — a pre-clamp specimen, with the formulas
  captured verbatim
- -light/-dark defined by **contrast direction rather than lightness**, plus a
  screen-reader-specific colour
- Radius 0 plus hover swapping brand colours — a square, vivid municipal identity
- Dual licensing: CC0 code, forbidden trade dress
- Montserrat plus Lora — a serif body, unusual in government

## Accessibility

No stated target confirmed. The clues: a `-SR` (screen reader) colour variable, a comment
stating that the `-dark` variants exist "to strengthen contrast against white", and a
specified focus-indicator colour.

## Notes

- Documentation: https://patterns.boston.gov (Fractal — the page title is
  "Overview | Fleet")
- CSS: https://patterns.boston.gov/css/public.css (184KB)
- Repository: https://github.com/CityOfBoston/patterns (develop, pushed 2026-04)
- **Still to confirm:** tokens in the Stencil web-component layer (a separate build),
  a Figma/Sketch kit, a stated accessibility target (only a wiki working-agreement link
  was found), real grid-system values (`stylesheets/grid/` not harvested), and whether
  Optimistic Blue light and dark holding the same value is intentional (possibly an
  unfinished renaming refactor)
