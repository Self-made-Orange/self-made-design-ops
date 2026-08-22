---
name: Wear OS Design (M3 Expressive)
org: Google
coverage: partial
url: https://developer.android.com/design/ui/wear
repo: null
license: "docs CC BY 2.5 · code samples Apache 2.0 (developer.android.com/license, confirmed 2026-08-18)"
tech: [Compose for Wear OS]
figma_kit: true
tokens_format: [docs]
a11y_target: unverified
platform: wearable
domain: os
verified: 2026-08-17
source: "developer.android.com/design/ui/wear/guides — {adaptive-design, type-scale-tokens, screen-sizes, apps/layouts} (measured from the HTML)"
---
<!-- lang-links -->
> **English** · [한국어](wear-os.ko.md)
<!-- /lang-links -->

## In one line

**The corpus's first `wearable` sample.** Because the screen is round it **prescribes
defining margins as percentages rather than px**, **forbids user scaling on text at
20sp and above**, and has an **`Arc` typography category** that flows along the curve.

## Screen — 192–240+dp, breakpoint at 225dp

```
Small: 192 – 224dp   |   Large: 225 – 240+dp   (round, measured by diameter)
Dense layouts are verified at 192dp with the large-font setting
```

- **There is a single breakpoint (225dp)** — unlike the web (five to eight steps) or
  mobile, there are only small and large. The fewest breakpoints in the sample
- The screen value itself is a **diameter** — one dimension rather than width and
  height. The round premise

## Margins — percentages are the rule

> "Define outer margins as percentages rather than absolute values, so that margins
> can scale proportionally on round screens and avoid clipping any UI elements."

**Defining outer margins as percentages rather than absolute values (px/dp) is the
official rule** — on a round screen, margins have to scale with the diameter to avoid
clipping at the edges. It is **the only case in the whole sample of percentages being
prescribed as the margin unit** (the fifth unit type, after px in most, rem, character
count (SmartHR) and grid multiples (Braid)).

## Typography — 21 styles + `Arc` + a scaling ceiling

- **21 M3 Expressive styles**, with **Roboto Flex** (variable) as the default typeface
- **The `Arc` category** — text that flows along the curve at the edge of a round
  screen (clock displays, curved labels). It uses **a dedicated font axis that
  compensates for letter spacing opening up along the curve at the top of the
  screen.** The only typography category of its kind in the sample
- **The user font-scaling rule splits by role:**

| Category | Scaling allowed |
|----------|:---:|
| Display · Numeral | **forbidden** |
| Title · Body | allowed |
| Label | Medium/Small allowed · **Large forbidden** |

- **"No scaling on text at 20sp and above" holds across every category** — the screen
  is too small to grow large text further. **The exact opposite extreme from TDS**
  (which remaps iOS Dynamic Type up to 310%), and it settles both ends of the
  accessibility-scaling axis: wearable imposes a ceiling, while mobile web follows all
  the way to 3×
- Tabular/mono spacing is recommended for scrolling and changing numerals (pickers and
  the like)

## Notable decisions

- **The first `wearable` sample** — closing the second-to-last platform gap
- **Percentage margins as a rule** — the only unit type of its kind in the sample
  (avoiding round-screen clipping)
- **The `Arc` curved-typography category plus a dedicated font axis** — unique in the
  sample
- **No scaling at 20sp and above** — the ceiling extreme of accessibility scaling
  (symmetric with TDS)
- One breakpoint (225dp), with the screen dimension being a diameter
- Scaling permission split by typographic role (Display forbidden / Body allowed)

## Accessibility

- User font scaling supported differentially by role and size (detailed in the body)
- Contrast and touch-target figures are unverified on these pages

## Notes

- **Basis for figma_kit (true):** a Design kits page exists — not yet examined

- Documentation: developer.android.com/design/ui/wear (confirmed to pass the proxy —
  measured from the HTML)
- The previous-generation guide (`m2-5/`) still lives at its URL alongside this one —
  a case of migration being left visible (the documentation equivalent of the Vibes
  and HSDS family)
- **Still to confirm:** per-component figures (the m3 spec pages for buttons, cards
  and so on), the contents of the Figma design kits, real colour-token values, and the
  minimum touch target
