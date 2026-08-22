---
name: Human Interface Guidelines (iOS 26 / iPadOS 26)
org: Apple
coverage: full
url: https://developer.apple.com/design/human-interface-guidelines
repo: null
license: "unverified — Apple Design Resources (attempted 2026-08-18: developer.apple.com/design/resources renders in JS, so the terms text could not be extracted; checking the Figma community file's description is left to a local session)"
tech: [SwiftUI, UIKit]
figma_kit: true
tokens_format: [Figma Variables (DTCG export)]
a11y_target: unverified
platform: mobile
domain: os
verified: 2026-08-16
source: "A full variable export of the iOS/iPadOS 26 Figma kit (DTCG JSON) plus measurements from the Toolbars page"
---
<!-- lang-links -->
> **English** · [한국어](apple-hig.ko.md)
<!-- /lang-links -->

## In one line

Apple's design guidance for iOS and iPadOS. **Because no tokens are published to npm or
GitHub**, a variable export of the official Figma kit is the only machine-readable route.

## Tokens

### Typography — SF Pro, 11 steps

| style | size | line height | tracking | default weight |
|--------|:---:|:---:|:---:|:---:|
| Large Title | 34 | 41 | **+0.40** | 400 |
| Title 1 | 28 | 34 | **+0.38** | 400 |
| Title 2 | 22 | 28 | -0.26 | 400 |
| Title 3 | 20 | 25 | -0.45 | 400 |
| Headline | 17 | 22 | -0.43 | **600** |
| Body | 17 | 22 | -0.43 | 400 |
| Callout | 16 | 21 | -0.31 | 400 |
| Subheadline | 15 | 20 | -0.23 | 400 |
| Footnote | 13 | 18 | -0.08 | 400 |
| Caption 1 | 12 | 16 | 0 | 400 |
| Caption 2 | 11 | 13 | **+0.06** | 400 |

**The sign of the tracking flips with size.** At 28px and above it is positive
(+0.38 to +0.40), from 20 down to 13px it is negative (-0.45 to -0.08), it reaches 0 at
12px, and at 11px it returns to positive (+0.06). **A U-shaped curve.**

Headline and Body share size, line height and tracking, and **differ only in weight**
(**590** vs 400).

> **Correction.** When this entry was first written the Headline weight was recorded as 600.
> The kit variable's actual value is **590** —
> `Font(family: "SF Pro", style: Semibold, size: 17, weight: 590, …)`.
> Both nodes (`5726:33474`, `5561:41165`) agree.
> Bold is the standard 700; **only Semibold departs.**
> Two systems in the sample use weights that are not multiples of 100 — Apple (590) and
> Atlassian (653) — and both use variable fonts.

### Line-height variants — Tight / default / Loose

Three sets exist at the same size, differing only in line height.

| | Large Title | Body | Caption 2 |
|---|:---:|:---:|:---:|
| Tight | 39 | — | — |
| default | 41 | 22 | 13 |
| Loose | 43 | 24 | 15 |

**Loose is the default +2px in every style without exception** — identical across all 11.

Each style comes in Regular / Emphasized / Italic / Emphasized Italic combinations, so the
defined text styles total **102**.

Source: `tokens/shared/typography.json`
(the original expresses line height in rem — `2.5625` × 16 = 41px)

### Liquid Glass — iOS 26's material tokens

A family that exists in none of the 22 systems collected.

| token | value |
|------|-----|
| Light Angle | **-45** |
| Opacity | 60 |
| Refraction | 100 |
| Dispersion | 0 |
| Frost — Regular | 7 |
| Frost — Medium | 12 |
| Frost — Large | 14 |
| Depth — Regular | 16 |
| Depth — Medium and Large | 16 |
| Splay — Regular | 6 |
| Splay — Medium and Large | 6 |
| Shadow Blur — BG | 80 |
| Shadow Blur — Layer | 40 |

**Only Frost differs by size** (7 / 12 / 14). Depth and Splay are split by size but hold the
same value. Shadows come in two steps, background (80) and layer (40).

Refraction, dispersion and light angle are handled as tokens. Where other systems stop at
`shadow` and `elevation`, this places **13 optical parameters**.

### Radius

| token | value |
|------|-----|
| Sheet — iPhone top | **34px** |
| Sheet — iPhone bottom | **58px** |
| Sheet — iPad | 38px |

**There is no general radius scale.** Only sheet curvature exists as a token.
On iPhone the top and bottom differ, with the bottom (58px) 1.7 times the top (34px).

### Scroll Edge Effect

| token | value |
|------|-----|
| Blur Radius | 10px |
| Top | 27 |
| Bottom | 62 |

Parameters for the effect applied where content disappears under the toolbar at a scroll
boundary.

### Colour — 79 per theme

| group | count |
|------|:---:|
| Miscellaneous | 23 |
| Accents | 12 |
| Grays | 8 |
| Backgrounds | 6 |
| Backgrounds (Grouped) | 6 |
| Fills | 4 |
| Labels | 4 |
| Labels - Vibrant | 4 |
| Fills - Vibrant | 3 |
| Labels - Vibrant - Controls | 3 |
| Separators | 3 |
| Overlays | 2 |

There are four themes — `light` · `dark` · `ic---light` · `ic---dark` — and their
**structures are completely identical**.

**The same concept is split across three layers** — `Labels` (ordinary) /
`Labels - Vibrant` (over a material) / `Labels - Vibrant - Controls` (over a control).
`Fills` splits into ordinary and Vibrant as well. In other words, elements laid over Liquid
Glass use their own colours.

`Backgrounds` and `Backgrounds (Grouped)` are separated at six each — grouped table
backgrounds get a family of their own.

The full hex values are in `tokens/{light,dark,ic---light,ic---dark}/colors.json`.

### Spacing

**None.** The whole variable export was checked and there is no spacing collection.
Apple does not variabilise whitespace; it is set directly on component frames.
The measurements below stand in for that information.

## Components in detail — measured dimensions

The actual sizes of the Figma frames (the Toolbars page).

### Touch targets — 44pt at the top, 48pt at the bottom

| component | size |
|----------|------|
| top toolbar symbol button | **44 × 44** |
| bottom toolbar symbol button | **48 × 48** |
| sheet toolbar button | 44 × 44 |

**The same icon button differs by position.** The kit does not say why.

Width by number of symbol buttons (top): 1 → 44 · 2 → 104 · 3 → 160 · 4 → 216 · 5 → 272 ·
6 → 328. A constant increment of 56pt (44 + 56×(n−1)). The bottom starts at 48 with
increments of 54–56.

### Toolbars

| component | size |
|----------|------|
| Top · iPhone — Default / Title 2 Line / Compact Large | 402 × 54 |
| Top · iPhone — Large Title | 402 × **125** |
| Bottom · iPhone | 402 × 84 |
| Top · iPad — Default | 820 × 54 |
| Top · iPad — Large Title | 820 × 131 |
| Top · iPad — Title 2 Line (with a tab bar) | 820 × 103 |
| Top · iPad — Title 2 Line Left (with a tab bar) | 820 × 98 |
| Bottom · iPad | 500 × 58 |
| Sheet — Default | 402 × 70 |
| Sheet — Large Title | 402 × 136 |

`402` is the reference iPhone width and `820` the reference iPad width.

**Large Title is 2.3 times the default** (54 → 125). On iPad it is 54 → 131 and on a sheet
70 → 136 — different per container.

### Other controls

| component | size |
|----------|------|
| search — top | 190 × 44 |
| search — bottom | 190 × 48 |
| segmented control button | 126 × 36 |
| text button | 57 × 36 |
| back button | 78 × 36 (light) / **80 × 36** (dark) |
| Grabber | 36 × 5 |
| page dot | 8 × 8 |

**The back button is 2pt wider in dark mode.** The kit does not state why.

## Components

Confirmed on the Toolbars page: top and bottom toolbars (iPhone/iPad/Sheet), symbol, text
and back buttons, search (top and bottom), the segmented control, page control and dots, the
Grabber, and title/subtitle styles.

Other pages are unverified.

## Characteristic decisions

- **It does not tokenise spacing.** One of only two, with Material 3, and both are mobile
  operating systems. Type, colour and material are managed as variables while whitespace
  alone goes directly onto frames.
- **Tracking follows a U-shaped curve.** Positive on large type → negative in the middle →
  positive again on very small type. Different both from Material 3 (positive only on small
  type) and from the systems whose tracking is 0.
- **Line height ships in three sets** (Tight / default / Loose), with Loose fixed at +2px in
  every style. Apple is the only system in the sample that tokenises line-height variants.
- **The touch target differs by position on screen** — 44pt at the top, 48pt at the bottom.
  In contrast to Material 3's single 48dp minimum.
- **Material is tokenised as optical parameters** — 13 of them: refraction, dispersion,
  light angle, frost intensity. A different layer entirely from other systems' shadow and
  elevation.
- **Colour is divided by material layer** — ordinary / Vibrant / Vibrant-Controls, three
  tiers. Elements laid over Liquid Glass get their own colours.
- **Sheet radii are asymmetric top to bottom** — 34px at the top on iPhone, 58px at the
  bottom.

## Accessibility

The 44pt touch target is widely cited as an accessibility benchmark, but no explicit
conformance target was found in this kit.

## References

- Documentation: https://developer.apple.com/design/human-interface-guidelines (blocked in
  this environment)
- Figma: "iOS and iPadOS 26 (Community)" — Apple Design Resources
- Related kits: iOS/iPadOS 27, macOS 26/27, watchOS 26, visionOS 26
- **Open questions:** component dimensions on pages other than Toolbars
