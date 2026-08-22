---
name: Android for Cars / Automotive OS
org: Google
coverage: full
url: https://developer.android.com/docs/quality-guidelines/car-app-quality
repo: null
license: "docs CC BY 2.5 · code samples Apache 2.0 (developer.android.com/license, confirmed 2026-08-18)"
tech: [Car App Library, Android]
figma_kit: unverified
tokens_format: []
a11y_target: unverified
platform: automotive
domain: os
verified: 2026-08-17
source: "developer.android.com → docs/quality-guidelines/car-app-quality (including the requirement IDs)"
---
<!-- lang-links -->
> **English** · [한국어](android-automotive.ko.md)
<!-- /lang-links -->

## In one line

Quality requirements for Android Automotive OS and Android Auto apps. **The only
automotive platform in the sample**, carrying a kind of constraint no other system has.

## Tokens

**It distributes no design tokens.** It inherits Material 3's tokens and specifies
vehicle-specific **quality requirements** on top of them.

Each requirement carries an ID, making it verifiable (`UX-1`, `DR-2` and so on).

## Specifications — at a different layer from other platforms

### Touch target — 64dp

| Item | Value | ID |
|------|:---:|:---:|
| Minimum touch-target size | **64dp** | `UX-1` |
| Minimum spacing between targets | **24dp** | `UX-2` |
| Minimum distance from the screen edge | **24dp** | `UX-2` |

**64dp is the largest in the sample.** For comparison:

| Platform | Touch target |
|----------|:---:|
| **Android Automotive** | **64dp** |
| Material 3 (mobile) | 48dp |
| Apple iOS bottom toolbar | 48pt |
| Apple iOS top toolbar | 44pt |
| visionOS dropdown | 44pt |

That is **1.33×** mobile's 48dp.

**This is the only system to specify the spacing between targets.** Others state only the
touch-target size and leave spacing to the spacing scale. In a vehicle, 24dp of spacing is
a requirement.

### Minimum font size — 24sp

| Item | Value | ID |
|------|:---:|:---:|
| Minimum font size | **24sp** | `UX-3` |

**Overwhelmingly large for the sample.**

| System | Body default |
|--------|:---:|
| **Android Automotive (minimum)** | **24sp** |
| Apple iOS (Body) | 17pt |
| Canvas · Paste · Material 3 Body Large | 16px |
| Ant Design · Material 3 Body Medium · Helios | 14px |
| Evergreen (caption) | 10px |

The vehicle's minimum size is larger than **any other system's largest body size**. In
Material 3 terms it corresponds to `Headline Small` (24px).

### Time constraints — an axis no other system has

| Item | Limit | ID |
|------|:---:|:---:|
| Button response time | **within 2 seconds** | `DR-1` |
| App launch time | **within 10 seconds** | `DR-2` |
| Content loading time | **within 10 seconds** | `DR-3` |

**It specifies response time as a design requirement.** Unique among the 34 samples.
Elsewhere, time is the territory of motion and transition tokens
(`transition`, `motion`), and "how fast it must be" is not in the specification.

### Task-depth constraint

| Item | Limit | ID |
|------|:---:|:---:|
| Screens to complete a task | **5 or fewer** | `AC-1` |

**It counts and limits screens.** The only case of pinning interaction depth into a
specification.

### Information-quantity constraints (examples per app category)

| Item | Limit | ID |
|------|:---:|:---:|
| Weather-map annotations (per view) | 5 or fewer | `WE-5` |
| Map tile legends | 3 or fewer | `WE-2` |
| Colours when there are several legends | 3 or fewer | `WE-2` |

**It limits even how many pieces of information a screen may carry.**

### While-driving constraints (UX Restrictions)

Android Automotive OS has **a built-in facility that automatically blocks app use while
driving**.

- Apps must not include activities that are not distraction-optimized
- The `distractionOptimized` metadata is used only when declaring a `CarAppActivity`
  built with the Car App Library. It is not attached to other activities

**The platform blocks the UI at runtime.** A concept no other platform has.

### App harvesting depth

The requirements are divided by harvesting depth.

| Depth | Name |
|:---:|------|
| 1 | Car differentiated |
| 2 | Car optimized |

Different requirements apply per category — Media · Navigation · POI · Weather · Video ·
Games · Browsers.

## Components

Template-based, from the Car App Library. The list is unverified.

## Notable decisions

- **The touch target is 64dp, the largest in the sample.** 1.33× mobile's.
- **It specifies spacing between targets (24dp) and distance from the screen edge (24dp).**
  Other systems leave spacing to the spacing scale.
- **The minimum font is 24sp.** Larger than any other system's largest body size.
- **It puts response time in the specification** (button 2 seconds, launch and loading 10).
  The only sample to specify a time constraint.
- **It limits the number of task steps** (5 screens or fewer). Counting and capping
  interaction depth.
- **It limits how much information a screen carries** (5 map annotations, 3 legends).
- **The platform blocks the UI at runtime while driving.** An enforced facility, not
  design guidance.
- **It has no tokens of its own.** It inherits Material 3 and adds only specifications.
- **Every requirement has an ID** (`UX-1` · `DR-2` · `AC-1`). A structure that can be
  verified and audited.

## Accessibility

Unverified. That said, the 24sp minimum font and 64dp touch target far exceed
accessibility standards.

## Notes

- Quality requirements:
  https://developer.android.com/docs/quality-guidelines/car-app-quality
- Automotive OS overview:
  https://developer.android.com/training/cars/platforms/automotive-os
- AOSP driver-distraction guidelines:
  https://source.android.com/docs/automotive/driver_distraction/guidelines
  (`source.android.com` is blocked in this environment)
- **Still to confirm:** the Car App Library template list, how colour and typography
  tokens are inherited, and the day/night luminance switching specification
