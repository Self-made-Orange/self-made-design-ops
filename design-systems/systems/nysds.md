---
name: New York State Design System (NYSDS)
org: New York State Government (ITS-HCD)
coverage: partial
url: https://designsystem.ny.gov
repo: https://github.com/ITS-HCD/nysds
license: MIT
tech: [Web Components, DTCG JSON]
figma_kit: true
tokens_format: [DTCG JSON, CSS]
a11y_target: "WCAG 2.2 AA (stated — confirmed 2026-08-18)"
platform: web
domain: government
verified: 2026-08-18
source: "npm pack @nysds/tokens@1.20.0 → src/tokens.json · npm @nysds/components@1.20.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](nysds.ko.md)
<!-- /lang-links -->

## In one line

New York State government — the **tenth government sample** (a state layer distinct from
the US federal USWDS). Its spacing step names are **percentages with 8px as 100**, and
its `round` radius value is **`1776px`** ("Ever upward!" — the year of the Declaration of
Independence), planting the state's identity in the slot for an infinite radius.

## Spacing — percentage naming with 8px = 100

```
50 = 4px   100 = 8px   150 = 12px   200 = 16px   250 = 20px   300 = 24px
400 = 32px 500 = 40px  600 = 48px   700 = 56px   800 = 64px   1200 = 96px
```

The step numbers are **`px ÷ 8 × 100`** — naming from which the value can be
back-computed (the same family as Braid's grid multiples and Italia's `1x–24x`, with
8px percentages as the basis). The values themselves are 12 steps of multiples of 4px,
reinforcing the **government 4px camp** once again.

## Radii — 1776px

```json
"round": { "$value": "1776px", "$description": "Ever upward!" }
```

Into the slot for the excess value that produces a pill (the corpus's samples: `9999px` ·
`999px` · `calc(infinity*1px)` — the pill section of GLOSSARY) it puts **the New York
State motto and the year of the Declaration of Independence**. Functionally identical to
9999px, but **the only sample with a cultural signature inside a token value**. The rest
are six steps of 1/2/4/8/12/16px.

## Other

- The tokens use DTCG syntax (`$value` / `$type` / `$description`) — one of the two
  government DTCG samples, with Italia
- Five typeface families: sans **Proxima Nova** (commercial) · serif Noto Serif ·
  **alt Oswald** · mono · **agency** — there is a separate typeface slot per agency
- `form.width` sm/md/lg = 88/200/384px — form widths tokenised (the Cloudscape family)
- Distribution: Web Components (`@nysds/components`) plus Angular plus **an MCP server**
  (`@nysds/mcp-server`) — **the first sample of a design system officially distributing
  an MCP server**

## Component deep-dive — (2026-08-18)

Measured from `@nysds/components@1.20.0` — Lit web components, with the styles inside CSS
strings in the `dist/nysds.es.js` bundle. **All 48 tags were confirmed exhaustively**
from `custom-elements.json` (including government-site skeleton components like
`nys-skipnav` · `nys-processlist` · `nys-stepper` · `nys-unavheader`).

### Variable architecture — private and public hooks at once

Every value is a **three-level fallback chain**: `--_nys-button-*` (the underscore
convention for private) ← `--nys-button-*` (a public override hook) ← `--nys-*` (a global
token). Unlike Backpack, which forbids overrides with `--bpk-private-*`, this
**distributes a private layer and a public hook in the same component** — a
"do not touch" marking and a "welcome" marking cohabiting.

### Buttons (`nys-button`) — fixed heights of 40/48/56

| | sm | md (default) | lg |
|---|:--:|:--:|:--:|
| **height** | **40px** | **48px** | **56px** |
| Padding | `calc(8−2)` / `calc(16−2)` | 12/20 −2px | 16/24 −2px |
| Radius | **12px** (`--nys-radius-xl`) | same | same |
| Type | 16px / 24px / **600** Proxima Nova | same | same |

- Heights are **fixed directly to the size tokens** `--nys-size-500/600/700` — not
  derived.
- A permanent 2px border plus **the border subtracted from the padding**
  (`calc(space − border)`) — the same dimension-preserving arithmetic as Kaizen, showing
  up in a government system too.
- Five variants: `filled / outline / ghost / text` plus **`strong`**.
- Focus: 2px `#004dd1` (`--nys-color-focus`) with a 2px offset.

### Inputs (`nys-textinput`) — the size axis is width, not height

| Item | Value |
|------|-------|
| **height** | **a single 40px** (`--nys-size-500`) |
| Width variants | **sm 88 / md 200 / lg 384px / full** (`--nys-form-width-*`) |
| Radius | **4px** (`--nys-radius-md`) |
| Border | 1px `#909395` |
| Padding · type | 8px · 16px/24px/400, tracking **0.044px** |

- **There are no height variants, only width variants** — the token section's
  `form.width` (88/200/384) turns out to be this component's size axis. The input's 40px
  aligns only with the small button (out of step with the 48px default).
- Hover **draws an additional 1px black outline** so the border appears to thicken —
  without changing the border width, so there is no layout shift.
- A `0.044px` tracking token — a rare case of tokenising sub-pixel tracking.
- The `inverted` mode has its own focus colour, `#7aa5e7`.

### Modals (`nys-modal`) — 439px

| Item | Value |
|------|-------|
| Width | **439px** (min 320px) |
| Radius · border | 8px (`--nys-radius-lg`) · 1px |
| Padding · gap | 24px · 16px |
| Scrim | **rgba(27,27,27,.7)** — based on an ink colour (#1b1b1b) rather than pure black |
| Animation | **none** (zero transitions or keyframes) |

- **The width is 439px** — a value 1px off a 4px grid, hard-coded (not a token, a literal
  `--_nys-modal-width: 439px`). A precise figure of unknown origin.
- The footer buttons are `column-reverse` on mobile (the primary action on top) and
  `row` from 480px.
- NYSDS is the only modal in the sample with no entry motion at all (Astro at least has
  a fade).

### Notable decisions (deep-dive)

- **Three radii by role** — button 12 / modal 8 / input 4px. The more control-like, the
  rounder
- **The input's size axis is width** (88/200/384) — a single 40px height
- **A dual variable layer, private (`--_`) plus public hooks** — prohibition and welcome
  cohabiting
- **A 439px modal literal plus no animation**
- **Hover as an added outline** — emphasis without layout change

## Notable decisions

- 8px = 100 percentage spacing naming — added to the list of naming types
- `1776px` — a cultural signature in a token value
- A government system officially distributing an MCP server (assuming agent consumption)
- A two-layer US federal (USWDS) / state (NYSDS) sample composition

## Accessibility

~~Unverified.~~ → **WCAG 2.2 AA (resolved 2026-08-18).**
Source: `designsystem.ny.gov/foundations/accessibility/` — "Our standard is WCAG 2.2 AA".
**A rare case of statutory deadlines being written in alongside** — it states that New
York State technology law (STL §103-d) requires WCAG 2.2 AA from 2027-01, and a US
Department of Justice rule requires WCAG 2.1 AA from 2027-04-26.

## Notes

- Component deep-dive: `npm pack @nysds/components@1.20.0` → `dist/nysds.es.js` plus
  `custom-elements.json` (2026-08-18)
- **Still to confirm:** colour palette detail, ~~the component list~~ (resolved
  2026-08-18 — all 48 tags, see the deep-dive), the relationship to USWDS (an
  independent implementation or a derivative), the MCP server's contents, and the origin
  of the modal's 439px
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — `designsystem.ny.gov` →
  `figma.com/community/file/1574803287825265318/new-york-state-design-system`
  (the team file is `figma.com/design/U2QpuSUXRTxbgG64Fzi9bu`)
