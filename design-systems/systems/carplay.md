---
name: CarPlay (Human Interface Guidelines)
org: Apple
coverage: partial
url: https://developer.apple.com/design/human-interface-guidelines/carplay
repo: null
license: "unverified (attempted 2026-08-18: developer.apple.com/design/resources renders via JS, so the terms text could not be extracted — checking the Figma community file description is left to a local session)"
tech: [CarPlay framework, SwiftUI]
figma_kit: unverified
tokens_format: []
a11y_target: unverified
platform: automotive
domain: os
verified: 2026-08-17
source: "developer.apple.com HIG (via search results — the page itself renders with JS and cannot be parsed directly)"
---
<!-- lang-links -->
> **English** · [한국어](carplay.ko.md)
<!-- /lang-links -->

## In one line

Apple CarPlay's in-vehicle UI guidance. It is **template-based**: developers do not
build layouts themselves, they put content into templates Apple defines.

> **Harvesting constraint.** Apple's HIG documents render with client-side JS, and
> browser rendering is blocked by the proxy in this environment
> (`ERR_CONNECTION_RESET`). curl returns only the JS shell (156 characters). What
> follows was **confirmed via search results** and is not as precise as the Android
> Automotive entry.

## Specifications

### Touch target — 44×44pt

| Item | Value |
|------|:---:|
| Minimum tap area | **44 × 44 pt** |

**This is the general iOS and iPadOS guidance rather than a CarPlay-specific value.**
Whether a CarPlay-specific figure exists separately could not be confirmed.

Compared with Android Automotive (64dp), **CarPlay is 20dp smaller.** The two
automotive platforms diverge on touch target.

| Platform | Touch target |
|----------|:---:|
| Android Automotive | **64dp** |
| **CarPlay** | **44pt** (the general iOS value) |

### Templates — the count limit is the specification

In CarPlay a developer cannot build screens freely; **only the defined templates** are
used.

| Template | Limit |
|----------|-------|
| **Grid** | **8 items or fewer** |
| **Point of Interest** | **12 POIs or fewer** on the map |
| **Tab Bar** | **5 tabs or fewer** |
| **Contact** | **4 buttons or fewer** |
| **Information** | **3 buttons or fewer** |
| Action Sheet | message plus buttons |
| Alert | a short message plus buttons |
| List | a hierarchical menu list |
| Map | supports panning and route information |
| Now Playing | playback information |
| Search | shows results while typing |

**The number of pieces of information is pinned into the template definition.** The
purpose matches Android Automotive limiting counts through per-category requirements
(5 map annotations, 3 legend entries), but **CarPlay enforces it at the API level.**

### Safe area

It uses the iOS and iPadOS `safe area` concept — the region not covered by the
navigation bar, tab bar and toolbar, nor by the status bar, home indicator or Dynamic
Island.

CarPlay-specific safe-area figures could not be confirmed.

### Screen sizes and orientation — obtained from the HIG DocC JSON (2026-08-17)

Screen size and aspect ratio differ per vehicle, and **both landscape and portrait must
be supported**. Four official screen specifications were confirmed (carplay.json):

| Resolution (px) | Aspect ratio |
|:---:|:---:|
| 800×480 | 5:3 |
| 960×540 | 16:9 |
| 1280×720 | 16:9 |
| **1920×720** | **8:3** |

- **An 8:3 ultra-wide is in the official specification** — the widest aspect ratio in
  the entire sample, and the place where the shape diversity of vehicle dashboard
  displays is written into a specification (a symmetric extreme to Wear OS's "a single
  dimension, the diameter")
- App icons: @2x 120×120 / @3x 180×180px
- 1280×720 matches macOS's default window size (1280×720pt) numerically — the units
  differ (px vs pt) and the source makes no connection between them

### Typography / colour / spacing

Unverified. Whether it inherits the SF Pro scale from the iOS 26 kit could not be
confirmed either.

## Components

The eleven templates above are effectively the component list.

## Notable decisions

- **It is template-based.** Developers do not compose layouts. Of the 34 samples, it is
  the only one to provide **finished screen templates** rather than a component kit.
- **The number of items is pinned into the template.** Grid 8, POI 12, Tab 5. The API
  will not accept more.
- **The touch target, at 44pt, is smaller than Android Automotive's 64dp.** The same
  platform category, with a 1.45× difference. Two companies answered the same question
  differently.
- **It ships no tokens of its own.** The same as Android Automotive — both automotive
  platforms inherit their parent system's tokens.

## Accessibility

Unverified.

## Notes

- HIG: https://developer.apple.com/design/human-interface-guidelines/carplay
- Framework documentation:
  https://developer.apple.com/tutorials/data/documentation/carplay.json
  (**reachable as a JSON API** — this is the framework API documentation, not the
  design guidance)
- **Still to confirm:** CarPlay-specific touch-target and safe-area figures, the type
  scale, and colour specifications (the four screen specifications and the icon sizes
  were obtained)
- **Harvesting method (correction):** "the HIG renders with JS and cannot be fetched
  statically" is **no longer true** — the DocC JSON backend
  (`/tutorials/data/design/human-interface-guidelines/carplay.json`) passes the proxy.
  See the channels section of `HARVESTING.md`.
