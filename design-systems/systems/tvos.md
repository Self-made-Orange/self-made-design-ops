---
name: tvOS Design (HIG)
org: Apple
coverage: partial
url: https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos
repo: null
license: "unverified (attempted 2026-08-18: developer.apple.com/design/resources renders via JS, so the terms text could not be extracted — checking the Figma community file description is left to a local session)"
tech: [docs]
figma_kit: false
tokens_format: [docs]
a11y_target: unverified
platform: tv
domain: os
verified: 2026-08-17
source: "developer.apple.com HIG DocC JSON — the tvOS section of layout.json (grid and inset figures)"
---
<!-- lang-links -->
> **English** · [한국어](tvos.ko.md)
<!-- /lang-links -->

## In one line

Apple TV — the **second `tv` sample**, which opened up cross-comparison with Android
TV. The safe area is a **60pt top/bottom, 80pt left/right inset** (against overscan),
and the grid **enumerates unfocused content width per column count** (2 columns 860pt,
3 columns 560pt…). Minimum distance between button centres is **60pt**.

## Specifications (HIG layout)

### Safe area — the overscan inset

```
top/bottom: 60pt   left/right: 80pt
```

The stated reason is "unintended cropping from overscanning on older TVs". **The
overscan figures unavailable in the Android TV documentation were obtained from
Apple's side** — an asymmetric inset, wider horizontally than vertically.

### Grid — the column count sets the width

| Grid | Unfocused content width | Horizontal gap | Minimum vertical gap |
|:---:|:---:|:---:|:---:|
| 2 columns | 860pt | 40pt | 100pt |
| 3 columns | 560pt | 40pt | 100pt |

**Structurally identical to Android TV's enumeration of card widths by count**
(1 card 844dp to 5 cards 124dp) — the two TV platforms independently chose a
"number visible → width" enumeration, and even the two-column values are close
(Apple 860pt vs Google 844dp). **The first confirmed convergence pattern on the tv
platform.**

### Focus spacing

**A minimum of 60pt between button centres** — the spacing that prevents mis-selection
when moving focus with a D-pad or remote. What makes this specific to tv is that it
is a **distance-between-targets specification**, not a target size one (the same kind
as Android Automotive's 24dp between targets, at 2.5× the value).

## Cross-comparison — the two tv samples

| | Android TV | tvOS |
|---|---|---|
| Safe area | not obtained | **60/80pt asymmetric inset** |
| Width enumeration | 1–5 cards, 844→124dp | grid 2–n columns, 860→…pt |
| Focus feedback | **1.1× scale** specified | (figure not obtained) |
| Focus spacing | not obtained | **60pt between centres** |

The two documents quantify different axes, so **combining them completes the tv
specification**.

## Notable decisions

- **The second tv sample** — opened cross-comparison with Android TV
- 60/80pt asymmetric overscan inset — a kind of safe area unique to tv
- Width enumerated per column count — independent convergence with Android TV
  (860 ≈ 844)
- 60pt focus spacing — a distance specification
- No official Figma kit — the documentation is the only source

## Accessibility

Unverified.

## Notes

- **Basis for figma_kit (false):** no official kit in the community — previously
  confirmed

- Source: the HIG DocC JSON channel (`HARVESTING.md`) — the tvOS section of layout.json
- **Still to confirm:** the type scale (tvOS-specific sizes), the focus scale factor,
  the full designing-for-tvos page, and colour and material specifications
