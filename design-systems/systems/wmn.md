---
name: WMN Design System
org: West Midlands Network (UK transport authority)
coverage: partial
url: https://designsystem.tfwm.org.uk
repo: https://github.com/wmcadigital/wmn-design-system
license: unspecified — effectively all rights reserved (no LICENSE file, no package.json license field, no mention in the README, GitHub API license null — confirmed 2026-08-18)
tech: [SCSS, Nunjucks patterns]
figma_kit: unverified
tokens_format: [CSS, JSON (pattern data)]
a11y_target: unverified
platform: web
domain: transit
verified: 2026-08-18
source: "npm pack wmn-design-system@2.4.0 → build/json/merged.njk.json + build/css/wmnds.min.css"
---
<!-- lang-links -->
> **English** · [한국어](wmn.ko.md)
<!-- /lang-links -->

## In one line

The UK's West Midlands transport authority — the **transit domain sample**. Its colour
taxonomy has **mode of transport (`modal`: bus · metro · railway · susTravel · roads)**
as a first-class axis, and it distributes **task patterns like "buy a ticket"** rather
than components.

## Colour — mode of transport is a taxonomy axis

```
brand:          primary/secondary (purple)
modal:          bus · metro · railway · susTravel · roads   ← colour per transport mode
web:            text · cta · error · warning · success · information
backgroundOnly: plannedDisruption · disable · background
```

- **`modal` here means transport modality, not a dialog** — a case of terminology
  collision in the corpus (a GLOSSARY candidate). The convention of route-map colours
  raised into a token system — the **transit edition** of the domain-specific colour
  family axis (charts, sidebars and the like).
- `plannedDisruption` exists separately as a **background-only colour** — a case of a
  transport service's state vocabulary reaching the token names.

## Distributed as patterns

What ships is **task-pattern HTML** rather than a component list:

```
buy-a-ticket · live-departures · find-a-timetable · find-a-stop-or-station ·
travel-updates · question-form · feedback-loop · cookies …
```

GOV.UK's pattern orientation (centred on service tasks) moved into the transit
domain — a system where **the unit is the journey, not the component.**

## Figures (measured from min.css)

- Focus: `0 0 0 2px #fff, 0 0 0 4px #9d5baf` — **a double ring, a 2px white gap plus
  4px purple** (the same structure as GOV.UK's double yellow ring, in the brand purple)
- 16px root (1rem) with 1rem dominant in body text — padding runs 0.25–3rem
  (multiples of 4px predominate, with a few outliers like `0.7rem`)

## Notable decisions

- **The first transit domain sample** — transport mode on the colour axis, service
  disruption in the state vocabulary
- Distributed as task patterns (domain specialisation of the GOV.UK lineage)
- A double focus ring (inheriting the UK government convention)
- The `modal` terminology collision — the same spelling meaning different things in
  different systems

## Component deep-dive — (2026-08-18)

There is a component layer inside the same package (`wmn-design-system@2.4.0`) —
**21 Nunjucks macros** under `build/njk/components/` plus
`build/css/wmnds-components.min.css` (consolidated into wmnds.min.css). The form
elements sit under form-elements (checkbox, radio, date/number/text-input, textarea,
dropdown, file upload), exactly as GOV.UK arranges them. **There is no modal or dialog
component** — an exhaustive grep of the `.wmnds-*` classes turns up nothing in the
modal/dialog/overlay/popup family except `branded-banner__modal` (a sub-element of the
banner, not a dialog). Fitting for a system whose unit is the journey, it has no
overlay UI at all.

### Buttons (`.wmnds-btn`)

- **min-height 50px** — a large target. Padding is only 4px 8px, with flex vertical
  centring filling the height. 5px radius · 1rem/**700**/1.3rem line height ·
  transition 0.2s ease-in-out.
- The base form is `justify-content: space-between` — a layout that **assumes an icon
  on the right** (the macro has iconLeft/iconRight/loading-spinner slots).
- Colours: base **#1d7bbf blue** (hover #145686 · active/focus #0f3e60) ·
  primary #3c1053 (brand purple) · secondary a purple outline ·
  **start #00703c · destructive #d4351c — GOV.UK's button green and red verbatim.**
  The colour lineage is split in two, a brand axis (purple, blue) and a borrowed
  GOV.UK axis (green, red).

### Inputs (`.wmnds-fe-input`)

- 12px padding · **1px purple #3c1053 border** (a brand-colour border rather than
  grey) · radius 0 (square-cornered — the GOV.UK lineage) · 1rem / 1.5rem line height ·
  width 100%.
- Errors: a 2px #d4351c border plus **a 5px red bar on the left** of the group
  (`fe-group--error`) — GOV.UK's error grammar verbatim.

### Focus — one global rule

A single selector, `[class*=wmnds-] :focus`, covers every component —
`0 0 0 2px #fff, 0 0 0 4px #9d5baf` (the same values as the double ring in the token
section). A **one-global-rule** approach that defines almost no per-component focus;
only buttons additionally lay a #0f3e60 background over focus and active.

## Accessibility

Unverified (the double focus ring is the GOV.UK family's high-contrast pattern — the
one-global-rule application is covered in the deep-dive above).

## Notes

- **URL moved (confirmed 2026-08-18):** `designsystem.wmnetwork.co.uk` →
  `designsystem.tfwm.org.uk` (301, following an organisation rename)

- ~~Licence~~ → **confirmed unspecified (2026-08-18).** No LICENSE file (the root was
  checked exhaustively) · no license field in package.json · zero mentions in the
  README · GitHub API `license: null`. **Effectively all rights reserved** — reusing
  the code or patterns requires asking WMCA first. (Derivative repositories in the same
  org are MIT, but that does not apply to this one. The repository is active — last
  pushed 2026-06-01.)
- **Still to confirm:** the full set of real colour values (the JSON holds only
  varName — real values for the button and error families were partly obtained from
  min.css in the deep-dive), the full type scale, and the WCAG target
