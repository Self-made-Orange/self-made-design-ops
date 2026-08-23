---
name: Android TV Design
org: Google
coverage: partial
url: https://developer.android.com/design/ui/tv
repo: null
license: "docs CC BY 2.5 · code samples Apache 2.0 (developer.android.com/license, confirmed 2026-08-18)"
tech: [Compose for TV]
figma_kit: unverified
tokens_format: [docs]
a11y_target: unverified
platform: tv
domain: os
verified: 2026-08-17
source: "developer.android.com/design/ui/tv/guides/foundations/design-for-tv · guides/components/{buttons, cards, navigation-drawer} (measured from the HTML; paths re-pointed 2026-08-23 — the old flat `guides/{…}` addresses now 404)"
---
<!-- lang-links -->
> **English** · [한국어](android-tv.ko.md)
<!-- /lang-links -->

## In one line

**The corpus's first `tv` sample — the last platform gap closed.** It assumes a
**3m (10ft) viewing distance**, makes **D-pad focus the primary state** (no hover, no
touch), specifies focus feedback as **scaling the container 1.1×**, and **enumerates
card width by how many are visible** (1 card 844dp to 5 cards 124dp).

## The premise — a 10ft UI

- **3m viewing distance** — the maximum on the corpus's distance axis
  (wearable 20–30cm → mobile 25–40 → desktop 50–70 → automotive 60–90 → **tv 300cm**)
- **The D-pad (four directions plus select) is the only input** — the requirement is
  "immediate and obvious feedback"
- **A shared device** — exposure of personal information is stated as a design
  consideration. The only sample in which privacy is documented as a platform
  characteristic

## States — `Default · Focused · Pressed`

**There is no hover, and `Focused` is the primary state.** Every component (buttons,
cards, lists) enumerates these three. It completes the platform state-vocabulary
table:

| Platform | Pre-tap state | Mechanism |
|----------|---------------|-----------|
| web | hover | mouse |
| spatial (visionOS) | Hover | **gaze** |
| desktop (macOS) | not enumerated in the kit / Focused in search | keyboard |
| **tv** | **Focused** | **D-pad movement** |
| mobile · wearable | none | straight to touch |

**Focus feedback is a numeric specification** — "the container scales **1.1×** on
focus, keeping its inner padding". Outline buttons scale and switch stroke and fill
colour. Expressing focus through size is unique in the sample (the web uses colour and
rings).

## Cards — width enumerated by how many are visible

```
1 card 844dp · 2 cards 412 · 3 cards 268 · 4 cards 196 · 5 cards 124
Ratios: 1:1 (people, logos) · 2:3 (books) · 16:9 (video)
```

**"How many are visible on screen" sets the width** — the TV edition of the same
**count-enumeration camp** as iOS page dots (+16 each), macOS tabs (+44 each) and
CarPlay (a template count limit). **Specifying the content ratio per use** is a
characteristic of the media domain.

## Navigation — both drawer states are visible

- **collapsed (a rail: icons only) ↔ expanded (icons plus text), with both present on
  screen** — unlike a mobile drawer (hidden ↔ shown), collapsed is the default visible
  state
- When expanded, standard pushes the content aside while modal overlays a scrim
- Button radius 12dp (wide/image button containers)

## Notable decisions

- **The first `tv` sample — all seven platform axes are now filled**
- 3m viewing distance — the maximum on the distance axis
- **`Focused` as the primary state plus a 1.1× scale specification** — focus expressed
  through size
- Card width enumerated by count (844→124dp) plus ratios specified per use
- Shared-device privacy written into the design considerations — unique in the sample
- A collapsed drawer that is a rail rather than hidden

## Accessibility

Unverified (the D-pad premise is itself a focus-navigation specification).

## Notes

- Documentation: developer.android.com/design/ui/tv (confirmed to pass the proxy —
  measured from the HTML)
- **Still to confirm:** type scale figures, overscan safe-area values, colour tokens,
  code-level values in Compose for TV, and cross-comparison with tvOS (Apple)

## Source check — the documentation moved (2026-08-23)

The flat `developer.android.com/design/ui/tv/guides/{design-for-tv, buttons, cards,
navigation-drawer}` addresses this entry recorded now return **404**. The pages exist, split
into two tiers:

| page | now at |
|------|--------|
| design-for-tv | `guides/foundations/design-for-tv` |
| buttons · cards · navigation-drawer | `guides/components/{…}` |

`guides` itself 404s; `design/ui/tv` answers 200. The `source:` field is re-pointed. **No
value was re-measured** — this is an address correction, so `verified:` stays 2026-08-17 and
the recorded measurements are still the 2026-08-17 ones. A re-measure against the moved pages
is a separate job.
