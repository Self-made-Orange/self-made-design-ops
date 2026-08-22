---
name: macOS 26 (Apple Design Resources)
org: Apple
coverage: partial
url: https://www.figma.com/community (the official macOS 26 kit)
repo: null
license: "unverified (attempted 2026-08-18: developer.apple.com/design/resources renders via JS, so the terms text could not be extracted — checking the Figma community file description is left to a local session)"
tech: [Figma Kit]
figma_kit: true
tokens_format: [Figma Variables]
a11y_target: unverified
platform: desktop
verified: 2026-08-17
source: "Figma community file 'macOS 26' (Apple Design Resources), read from a local duplicate — the duplicate's fileKey is deliberately not recorded, see HARVESTING.md → 12 pages measured (207:14473–14503 — 3 URLs from the user plus 7 found by ID probing) + developer.apple.com HIG DocC JSON"
domain: os
---
<!-- lang-links -->
> **English** · [한국어](macos.ko.md)
<!-- /lang-links -->

## In one line

**The corpus's first `desktop` sample — 12 kit pages measured.** Control sizes come in
**five steps, 16/20/24/28/36**, a coordinate system half the size of mobile touch targets
(44/48pt); **window active/inactive (`Active Window`) is a variant axis** (unique in the
sample); and **the seven Liquid Glass parameters are identical to iOS 26**.

> **Two corrections.** (1) An early record said controls came in two steps, Medium 24 and
> XL 36, but that was **toolbar-only** — Combo Box and Search Field revealed five steps,
> 16/20/24/28/36. (2) "Hover is not enumerated in the desktop kit" was also wrong —
> **the Menus page has Hover, and even a `Hover + Key` combined state.**

## Measured — the Toolbars and Titlebars page

### Control heights — two steps, 24 and 36

| Component | Medium | XL |
|-----------|:---:|:---:|
| Button | 36×**24** | 36×**36** |
| Segmented Control | h**24** | h**36** |
| Button Group | h24 | h36 |
| Search | 130×24 | 130×36 |
| Pull Down Button | 39×24 | 50×36 |
| Pop-Up Button | 57×24 | 63×36 |

**Every control shares the same two heights.** They are named `Medium` and `XL`, with no
Small or Large on this page.

**The same Apple, at half the coordinate system:**

| | macOS (desktop) | iOS (mobile) |
|---|:---:|:---:|
| Base control | **24pt** | 44pt (touch target) |
| Large control | **36pt** | 48pt (bottom) |
| Title/toolbar | **22–32pt** | 54–84pt |

The most extreme case of "the platform divides the values" in `platforms.md` — **a mouse
pointer premise produces dimensions 45–55% of touch**.

### Title bars — two steps by window type

| Window | Title bar height |
|--------|:---:|
| Standard Window | **32** |
| **Utility Panel** | **22** |

A utility panel (a palette window) is 10pt shorter than a standard window — the window's
rank expressed through chrome height. Read together with iPhone (54), sheets (70) and the
bottom (84), **Apple's bar heights vary fourfold, 22 to 84pt, on container type alone.**

### Enumeration by count — the desktop edition of the iOS pattern

**Segmented Control: `Size × Buttons (2–6) × Selected (1–N plus None)`** — 55+ variants.

| Item | Medium | XL |
|------|:---:|:---:|
| Width at 6 buttons | 235 (≈39 each) | 203 (≈34 each) |
| Width at 2 buttons | 79 | 71 |

**There is a `Selected=None` variant** — a state iOS segments do not have. On macOS, no
selection is a valid state for a segment (toolbar mode switching versus command buttons).

**XL (36pt) is narrower per button than Medium (24pt)** (34 vs 39 each) — the width
shrinking as the height grows, the reverse direction. The kit gives no reason.

**Utility Panel Tabs: `Tabs (2–6) × Selected`** — widths 88/132/176/220/264, stepping by
**exactly +44pt per tab**. Height 29. The same count-enumeration approach as the iOS page
control (+16 per dot) (`patterns/navigation.md`).

### State vocabulary — `Clicked`, and the anatomy of a click

```
Base:      Idle · Clicked · Disabled (+ Selected)
Menus:     Idle · Hover · Hover + Key · Disabled     ← Hover exists (corrected)
Steppers:  Clicked - Up / Clicked - Down             ← click position separated
Combo box: Field Clicked / Button Clicked            ← click region separated
Search:    Placeholder · Value · Typing · Focused (+ Disabled combinations)
```

- **It is `Clicked`, not `Pressed`** — after iOS (`Selected`/`Tinted`) and visionOS
  (`Hover`), **the third case of state names differing per platform within Apple**
- **Menus have Hover, and `Hover + Key` separately** — distinguishing the mouse being over
  something from "mouse over plus keyboard navigation in progress". **The only sample to
  enumerate a simultaneous state across two input devices** (present on the Submenu type
  only, not on Action)
- **The click is dissected** — steppers have upper and lower halves
  (`Clicked - Up/Down`) and combo boxes have field and button regions
  (`Field/Button Clicked`) as separate states. A precision contrasting with most of the web
  collapsing this into a single `pressed`
- **Search has `Focused` and `Typing` separately** — keyboard focus added
  (`platforms.md`: web hover / spatial gaze / desktop keyboard focus)
- **Combined states like `Value + Disabled`** are kept as explicit variants

### The `Active Window` axis — a variant dimension unique to desktop

**Push Button (7 styles × On/Off × 3 states), Stepper and selected List rows all carry an
`Active Window=True/False` variant** — the desktop behaviour of controls sinking into
greyscale when the window loses focus, **enumerated as a variant axis**. Lists have
**`Selected Inactive`** in addition to `Selected`. An axis absent from all six other
platforms, none of which assume multiple windows.

### Five control steps — 16 · 20 · 24 · 28 · 36

Combo Box and Search Field share **the same five steps**. Form controls are smaller still —
Switch 36×16 · radio and checkbox 16 · table rows **20** · menu items 24 · sidebar items
24/32/40. The half-size desktop coordinate system is confirmed across all five steps.

### Figures obtained per page (12 pages)

| Page | Key figures |
|------|-------------|
| Menu Bar and Dock | menu bar symbols 34 (items 24 — the HIG documentation says 24pt) · dock icons 36 · app icons 72 × Default/**Dark**, some 40 kinds · template 1512×982 |
| Menus | items 160×24 · separators h11 · shortcuts h16 · menu widths 190–250 |
| Combo Boxes | **five steps 16/20/24/28/36** · Field/Button Clicked |
| Forms | **16 system colours enumerated** (Mint · Teal · Cyan · Indigo…) · 12 accessories · only Form Stepper has `Focused` |
| Buttons | Push Button in **7 styles** (Bordered Neutral/Colored/Destructive/Secondary · Default/Preferred · Borderless ×2) × On/Off × 3 states × Active Window = 84 variants · arrow buttons 16–36 |
| Search Fields | five steps plus **4 Contexts** (Content Area/Over-glass × whether in a Form) |
| Sheets | sheet symbol 300×300 |
| Sidebars | items in 3 sizes (24/32·34/40) × **indent Level 0–4** · section headers 34/39/43 · width 240 |
| Steppers | 20×24 · Clicked Up/Down · No/Inside/Outside Field, 3 placements |
| Lists and Tables | **rows 20** · column headers 28 · Selected/**Selected Inactive**/Alternating Gray · tree Level 0–4 |
| Toolbars | (measured earlier — see the section above) |
| Tooltips | 97×18 |

**The `Over-glass` context axis** — a search field takes "is it on top of Liquid Glass?" as
a variant. The only sample where a material becomes a component variant axis, solving the
same problem as Cloudscape's context overrides through variant enumeration.

**Sidebar Level 0–4 versus the HIG's "up to two levels"** — the kit provides five indent
levels while the documentation recommends two. A real instance of a tool's range differing
from its guidance.

## HIG documentation supplement — a 24pt menu bar, a 1280×720 default window

Where enumerating the Figma kit's pages was blocked, the gaps were filled from **the HIG's
DocC JSON backend**
(`developer.apple.com/tutorials/data/design/human-interface-guidelines/*.json` — which
passes the proxy):

| Item | Value | Source |
|------|:---:|--------|
| **Menu bar height** | **24pt** | the-menu-bar.json |
| **Default window size** | **1280×720pt** | windows.json |

That completes the chrome axis — **utility panel 22 · menu bar 24 · standard title bar
32pt**. The menu bar (24) is shorter than the title bar (32).

Judgement guidance came through the same channel (a kind absent from the kit): sidebar
hierarchy should go **at most two levels** (deeper calls for a split view) · a sidebar
should not be hidden by default · sidebar icons follow the system accent colour, and so on
(the originals are preserved in `scratchpad/hig/*.txt`).

## Variables — Liquid Glass is identical to iOS

```
Liquid Glass/Refraction 100 · Dispersion 0 · Light Angle -45
Frost - Regular 7 · Depth - Regular 16 · Splay - Regular 6
```

**All seven parameters hold the same values as the iOS 26 kit** (`systems/apple-hig.md`).
Unlike typography (the 590 weight) and dimensions, which diverge per platform,
**the material's physical values are managed as platform-invariant constants**.

`Labels/Primary` is `#000000d9` (black at 85%) — the same eight-digit hex with built-in
alpha as iOS.

**The Vibrant group names carry blend-mode instructions** —
`Labels - Vibrant (Use Plus Lighter | Darker)`. **The only sample with usage pinned into a
token name.**

## Notable decisions

- **The first `desktop` sample** — five control steps, 16–36pt, half the mobile coordinate
  system
- **The `Active Window` variant axis** — window active/inactive, a dimension unique in the
  sample
- **The `Hover + Key` combined state** — simultaneous state across two input devices,
  unique in the sample
- The anatomy of a click (Up/Down · Field/Button) — click position and region as state
- **The `Over-glass` context axis** — whether it sits on a material becomes a component
  variant
- **The seven Liquid Glass parameters identical to iOS** — the material is invariant, the
  dimensions vary
- **The `Clicked` state vocabulary** — the third state-name set across Apple platforms
- **`Focused` as a separate search state** — the keyboard premise added to the state set
- **A `Selected=None` segment** — a valid state iOS does not have
- Utility panels with shorter chrome than standard windows (22 vs 32)
- Tab widths stepping by +44, and the per-button width inversion on XL segments
- Blend-mode instructions inside a token group name

## Accessibility

Unverified.

## Notes

- Kit: Figma Community "macOS 26" (Apple official)
- **Harvesting method:** `get_metadata`'s page listing reports only "Cover", but pointing
  directly at node IDs reads them (the Figma MCP section of `HARVESTING.md`)
- **Harvesting method settled:** the page-enumeration API is blocked, but **given one page
  URL you can find the rest by probing adjacent odd IDs** — starting from the three pages
  the user supplied, seven more were discovered by probing (Combo Boxes · Forms · Buttons ·
  Search Fields · Sheets · Steppers · Lists · Tooltips) (`HARVESTING.md`)
- **The 12 system accent colours, real values (variables on the Forms page):**
  ```
  Red #ff383c · Orange #ff8d28 · Yellow #ffcc00 · Green #34c759
  Mint #00c8b3 · Teal #00c3d0 · Cyan #00c0e8 · Blue #0088ff
  Indigo #6155f5 · Purple #cb30e0 · Pink #ff2d55 · Brown #ac7f5e
  ```
  (Black, two greys and White sit outside the accent variables — not obtained)
- **Still to confirm:** the type scale page (not in this range), cursor specifications, and
  the licence
