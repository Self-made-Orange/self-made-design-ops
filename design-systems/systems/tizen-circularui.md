---
name: Tizen Wearable CircularUI
org: Samsung
coverage: partial
url: https://samsung.github.io/Tizen.CircularUI
repo: https://github.com/Samsung/Tizen.CircularUI
license: Apache-2.0
tech: [Xamarin.Forms, C#]
figma_kit: false
tokens_format: [docs, API defaults]
a11y_target: unverified
platform: wearable
domain: os
verified: 2026-08-17
source: "github Samsung/Tizen.CircularUI@master → README.md + doc/design/part01~16 (archived — frozen 2023-04, documentation is in Korean)"
---
<!-- lang-links -->
> **English** · [한국어](tizen-circularui.ko.md)
<!-- /lang-links -->

## In one line

The UI for Samsung Galaxy Watch (Tizen) — the **second wearable sample**. It defines
the content area as **"the square inscribed in the circle"**, takes **bezel rotation**
as an input axis, and pins **a 3000ms default toast duration into an API default** —
the corpus's **first sample of a toast duration**.

## The geometry of a round screen — a different answer from Wear OS

```
TwoButtonPage: "takes the square area inscribed in the Circle as the Contents area"
             + an Overlap option (whether content may overlap the buttons)
CircleStackLayout: lays children out linearly within the circular area
CircleImage: crops an image to a circle
```

- **Google's Wear OS avoids clipping by setting margins as percentages; Samsung
  defines the safe area geometrically, as the inscribed square** — two companies with
  different solutions to the same round-screen problem (cross-reference
  `systems/wear-os.md`)
- Control names are **twenty `Circle*`-prefixed types** (CircleListView ·
  CircleScrollView · CircleDateTimeSelector · CircleProgressBar…) — handling round
  screens is the component namespace itself

## Bezel rotation — a hardware input axis

`BezelInteractionPage` · `CircleSliderSurfaceItem` ("responds to bezel actions") —
**rotating the watch bezel is the scroll and value-adjustment input.** Samsung's
answer in the same slot as Apple's crown, and it adds **bezel rotation** to the input
axis (`platforms.md`).

## Toast — the first duration sample

```csharp
public static void DisplayText(string text, int duration = 3000)
```

**The 3000ms (3 second) default is stated as a default value in the API signature.**
The "toast duration — absent from every sample" gap in `patterns/feedback.md` was
first filled here. It dismisses itself once the time elapses.

## Other

- `CircleDateTimeSelector` is **inline in the page rather than a popup** — an explicit
  departure from the Xamarin default (a popup). A judgement that avoids stacking
  modals on a small screen
- `TwoButtonPage/Popup` — standardises the two-button layout for a round screen as a
  page type
- **The design documents are in Korean** (`doc/design/*.md`) — the corpus's only
  non-Korean company with Korean as the primary documentation language
- Status: built on Xamarin.Forms (legacy since Galaxy Watch moved to Wear OS — the
  repository's activity status is unverified)

## Notable decisions

- **The second wearable sample** — a round safe area as an inscribed square
  (contrasting with Wear OS's percentages)
- **Bezel rotation as an input axis** — the only hardware input of its kind in the
  sample
- **A 3000ms toast default** — the corpus's first toast-duration sample
- Date selection inline (avoiding a popup)
- Twenty types in the `Circle*` namespace

## Accessibility

Unverified.

## Notes

- Source: `git clone --depth 1 Samsung/Tizen.CircularUI` (cloning is the workaround
  when raw.githubusercontent is temporarily 429ing — `HARVESTING.md`)
- **Still to confirm:** dimensional specifications (the documentation carries no px
  values — they are screenshot-based), the current system on Galaxy Watch (after the
  move to Wear OS), and the relationship to One UI Watch
