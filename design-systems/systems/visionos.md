---
name: visionOS Design Resources
org: Apple
coverage: partial
url: https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos
repo: null
license: "unverified (attempted 2026-08-18: developer.apple.com/design/resources renders via JS, so the terms text could not be extracted — checking the Figma community file description is left to a local session)" (Apple Design Resources)
tech: [SwiftUI, RealityKit]
figma_kit: true
tokens_format: [Figma Variables]
a11y_target: unverified
platform: spatial
domain: os
verified: 2026-08-16
source: "Figma 'Apple Design Resources - visionOS (Community)' → the Drop Downs page"
---
<!-- lang-links -->
> **English** · [한국어](visionos.ko.md)
<!-- /lang-links -->

## In one line

Apple Vision Pro's spatial UI guidance. **The only spatial-computing platform in the
sample**, and although it uses the same SF Pro as iOS, **the numbers differ.**

## Tokens

### Typography — SF Pro, with different values from iOS

| Style | visionOS | iOS 26 | Difference |
|-------|:---:|:---:|---|
| Title 2 | 22 / 28 · tracking **0** | 22 / 28 · tracking **-0.26** | same size, **different tracking** |
| Title 3 | **19** / 24 · tracking **0** | **20** / 25 · tracking **-0.45** | size, leading and tracking all differ |

**Same typeface, same style name, different values.**

- **Title 3 is 19px.** On iOS it is 20px. A rare instance of an odd-numbered size.
- **All tracking is 0.** iOS uses negative values in this range (-0.26 to -0.45).
  **One could read this as not tightening tracking on a screen viewed at a distance,
  but the kit gives no reason.**
- **The default weight is Bold (700).** The same styles on iOS default to Regular (400).

Only two styles were confirmed. The full scale is unverified.

### Colour — two values joined by a comma

| Token | Value |
|-------|-------|
| `Text/Primary` | `#FFFFFF` |
| `Text/Secondary` | `#FFFFFF, #545454` |
| `Text/Tertiary` | `#FFFFFF, #5E5E5E` |
| `Controls/Hover` | `#FFFFFF, #5E5E5E` |
| `Controls/Disabled` | `#FFFFFF, #5E5E5E` |
| `Colors/Black` | `#000000` |
| `Colors/Gray` | `#98989D` |

**Most tokens hold two colours joined by a comma.** Only `Text/Primary` and
`Colors/*` are single-valued. What the two values mean (a gradient, per mode, above
and below a material) could not be determined from the kit.

**`Text/Primary` is white.** That means dark by default, unlike iOS (which has both
light and dark themes).

### Spacing / radii

Unverified.

## Component detail

### Drop Down Button — it has a Hover state

| State | Size |
|-------|------|
| Idle (**No Platter**) | 120 × 44 |
| **Hover** | 120 × 44 |
| Selected | 120 × 44 |
| Disabled | 120 × 44 |

**The touch-target height of 44pt matches the iOS top toolbar.**

Two things diverge from iOS and Android.

- **A `Hover` state exists.** The iOS kit has none. visionOS points at things with
  gaze, so there is a "being looked at" state before the tap. **The only case of hover
  on a platform with no mouse.**
- **It uses the state name `No Platter`.** A platter in visionOS is the glass panel
  laid behind a control. A default state of "no platter" means the background is
  optional.

## Components

Confirmed from the Drop Downs page: Drop Down Button (4 states). Other pages are
unverified.

## Notable decisions

- **It uses the same typeface and style names as iOS with different values.**
  Title 3 at 19px vs 20px, tracking 0 vs -0.45.
  **This is the evidence for not treating "the Apple design system" as one thing.**
- **Tracking is uniformly 0.** In contrast to iOS, which traces a U-curve across sizes.
- **Dark by default.** `Text/Primary` is white.
- **Colour tokens hold two values.** No other sample has this structure.
- **A Hover state is defined.** Because of gaze input, which sets it apart from
  touch-only platforms.
- **The default weight is Bold.** Both confirmed styles default to Bold (700).

## Accessibility

Unverified.

## Notes

- Documentation: https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos
  (blocked from this environment)
- Figma: "Apple Design Resources - visionOS (Community)"
- **Still to confirm:** the full type scale, spacing, radii, depth (z-axis) tokens,
  and components on pages other than Drop Downs
