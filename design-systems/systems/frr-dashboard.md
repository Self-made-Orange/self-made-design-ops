---
name: Relocation Planner Design System (FRR Dashboard)
org: private (the owner's own product)
coverage: internal
url: not public (a private repository · a custom-domain deployment is confirmed but the address is not recorded)
repo: not public (a private repository · address withheld)
license: not stated
tech: [two static HTML+CSS pages, Cloudflare Workers + D1, a build script added after 2026-08-18]
figma_kit: false
tokens_format: [CSS variables]
a11y_target: unverified (focus-visible rings, aria-pressed and role usage confirmed · the segment target went 32 → 42px in v1.1)
platform: web
domain: personal (a private single-user dashboard — the subject matter is not recorded)
verified: 2026-08-19
source: "a private repository (address withheld)@ab02c82 → design-system/index.html (492 lines) + dashboard/index.html (4,815 lines)"
---
<!-- lang-links -->
> **English** · [한국어](frr-dashboard.ko.md)
<!-- /lang-links -->

> **An internal sample.** The design system of a product the owner owns; it is **not**
> counted in the public corpus total (116). It is here for comparison against its upstream,
> since it derives from TDS.
>
> **The repository address and what the product is about are deliberately not recorded** —
> it is private, and the subject matter is the owner's. What is recorded is the design system:
> tokens, structure and the derivation from TDS. Commit hashes are kept because they let the
> owner re-verify, and they identify nothing on their own.

## In one line

A **private single-user planning dashboard** (v1.1 · 2026.08.18) — two single HTML pages (the dashboard plus a design system
catalogue). It **takes one tone each out of the TDS raw ramps and compresses them into 11
semantic tokens** (five greys plus blue500/600 and red500 that match TDS **down to the
digit**), while green and yellow were swapped for values of its own. None of TDS's heavier
tiers — dark mode, springs, the 32-step type scale — were adopted.

## Update history

| Date | Commit | State |
|------|--------|-------|
| 2026-08-18 | `0905b88` | first harvest — v1.0, 437 + 3,497 lines, no build and no dependencies |
| 2026-08-19 | `ab02c82` | v1.1 re-check — 23 commits on, 492 + 4,815 lines |

The repository changed character after `0905b88`. With `worker/index.js` (381 lines),
`worker/news-live.js` (298 lines), D1 migrations, Google OAuth, a 15-minute cron and
`scripts/build-site.mjs` arriving, **"two static pages with no build" is no longer true**.
The design system itself is still hand-written CSS variables rather than build output,
though (`tokens_format` unchanged).

## Structure

| File | Role |
|------|------|
| `design-system/index.html` | the catalogue — Foundations (colour, type) plus seven sections: actions, inputs, data display, charts, feedback |
| `dashboard/index.html` | the operational UI — five views: home/finance/schools/resources/news |

The tokens are declared as `:root` CSS variables in each file separately (no build). They are
**not duplicates**, though — the catalogue declares 11 colours + 2 radii + 1 shadow + 1
typeface, while **the dashboard's `:root` has only 10 colours and no radius, shadow or
typeface tokens.** Nowhere in the repository is Toss or TDS mentioned — the derivation shows
up only by comparing values.

## Colour — 11 semantic tokens

| Token | Value | Against TDS (@toss/tds-colors 0.1.0) |
|-------|-------|--------------------------------------|
| `--bg` | #F5F6F8 | **no match** — between greyBackground #F2F4F6 and grey50 #F9FAFB |
| `--surface` | #FFFFFF | same as white (tells us nothing) |
| `--surface-2` | #F4F6F8 | no match (not a value in TDS) |
| `--chip-active` | #E5E8EB | **= grey200** — new in v1.1. An alias of the same value as `--border` |
| `--text` / `--ink` | #191F28 | **= grey900** |
| `--muted` | #6B7684 | **= grey600** |
| `--border` | #E5E8EB | **= grey200** |
| `--blue` | #3182F6 | **= blue500** |
| `--green` | #00A875 | **no match** — TDS green500 is #03B26C. Not in any TDS palette |
| `--yellow` | #D99000 | **no match** — not in the TDS yellow ramp (#FFC342 and kin). A dark ochre, for text contrast on a light background |
| `--red` | #F04452 | **= red500** |

TDS values also turn up in literals outside the tokens — #8B95A1 (**= grey500**),
#D1D6DB (**= grey300**), #1B64DA (**= blue600**, links and hover).
**Eight values match a TDS hex exactly**, the same as in v1.0 — the new `--chip-active`
reuses the existing grey200, so no new hex was added. Against that, the tooltip background
#17202C, the dark surface #263344 and the watch badge text #8A6400 are values of its own.

### The six chart colours — hardcoded outside the tokens

A JS array at `dashboard/index.html:3436` bypasses the semantic tokens.

```js
const colors = ["#3478f6", "#00a874", "#e5575f", "#d39a1f", "#7657d5", "#536271"];
```

The first four are **close to the tokens but do not match** — `#3478f6` ≠ `--blue #3182F6`,
`#00a874` ≠ `--green #00A875` (**off by one in the last digit**), `#e5575f` ≠ `--red #F04452`,
`#d39a1f` ≠ `--yellow #D99000`. The last two (#7657D5 · #536271) have no token counterpart.
A colour token system established and then a separate palette held for charts alone: the
largest token departure in this sample.

## Typography — 32 steps compressed into 5 roles

```
Display 30 / 1.25 · Heading 21 / 1.3 · Section 17 / 1.35 · Body 14 · Caption 12
```

- Typeface: **Pretendard** → Inter → the system fallback. No brand typeface
- **All tracking is explicitly pinned to 0** ("all tracking is 0 and the type does not scale
  up with viewport width" — the catalogue's own wording). A deliberate refusal of responsive
  type scaling
- Weights 500 · 600 · 650 · 700 · 750 — **fractional variable-font weights (650/750)** in
  real use
- The segment font size went 12 → 13px in v1.1

## Spacing, radius and shadow

- Radius: only two tokens, `--radius-sm: 5px` and `--radius-md: 8px`, while the most common
  literal is 7px — a **token-to-literal drift** (still unresolved in v1.1)
- Shadow: `--shadow-float: 0 12px 32px rgba(15,23,42,.16)` (the catalogue) against the same
  shape at `.22` in the dashboard — a small inconsistency between the two files (still
  unresolved in v1.1)
- Control heights (the catalogue): button 38 · input/select 42 · **segment 42 (was 32)** ·
  header 56px
- Container `min(1440px, 100% - 40px)`; breakpoints 980/680 in the catalogue against
  1080/760/560/390 in the dashboard — the two files break at different points

## Components (as carried in the catalogue)

Four button variants (primary/secondary/ghost/danger) plus icon · a segmented control ·
**a chip group (multi-select)** · **Panel Save** · four badge states
(official/planning/watch/risk — **evidence state as a first-class concept**) ·
inputs (text/number/select/range/checkbox, **with ticks at both ends of the range**) ·
metric cards · data rows · tables (**with a totals row**) · SVG charts (line = assets,
bars = monthly flow, dashed = the caution threshold) · three notice levels · a CSS-only
tooltip (a `data-tip` attribute plus `::after`).

- **The primary button flipped from `var(--text)` (grey900) to `var(--blue)` in v1.1** —
  v1.0's largest departure from TDS returned to the original convention
- Dark mode: **none** — pinned to `color-scheme: light`
- Motion: two transitions (120ms/150ms ease) — effectively a motionless system

## v1.0 → v1.1 changes

| Item | v1.0 | v1.1 |
|------|------|------|
| primary button | filled with `var(--text)` | **filled with `var(--blue)`** |
| segments | 32px buttons inside a pill wrapper (bg + padding 3) | **the wrapper removed, 42px standalone buttons** |
| selected state | `--surface` + box-shadow | **a flat `--chip-active` fill** |
| multi-select | none | **`.chip-group` added** |
| range input | the range explained in `field-help` text | **`.range-scale` ticks at both ends** |
| saving | none | **`.save-bar-demo` + an `aria-live` status** |
| tables | no totals | **a highlighted `.portfolio-total` row** |
| hover | no segment hover | **hover added on unselected items** |

## Against TDS

### Borrowed (8 identical hex values)

grey900 · grey600 · grey500 · grey300 · grey200 plus blue500 · blue600 · red500.
**The grey skeleton and the action and danger colours are TDS as-is** — Toss's sense of
text and border gradation lifted wholesale. v1.1's `--chip-active` reuses grey200 as well,
so the borrowing widened.

### Changed

| Item | TDS | FRR |
|------|-----|-----|
| green | #03B26C (green500) | **#00A875, its own** |
| yellow | #FFC342 (yellow500) | **#D99000** — a dark warning colour (for text contrast in a light UI) |
| background | greyBackground #F2F4F6 | **#F5F6F8** — lightened very slightly |
| primary button | a blue fill | ~~a grey900 fill~~ → **back to blue in v1.1 (departure resolved)** |

### Not adopted (its own decisions)

- **The ramp structure itself was not taken** — 10 steps × 9 colours of raw ramp → 11
  semantic tokens. A "cross-section" derivation that keeps the tones sampled and discards
  the ramps
- **No dark mode** — TDS's inverted ramps and background-level scheme were not adopted
- **The 8 spring presets were not adopted** — two eases. A complete break from TDS's motion
  assets
- **Type 11–42px in 32 steps → 5 roles** · a fixed ×1.5 line-height rule → variable 1.25–1.5
- The accessibility scaling remap table (TDS's unique asset in the corpus) was not adopted —
  in its place, the declaration that tracking is 0 and sizes are fixed

## Catalogue-to-implementation drift (widened in v1.1)

The v1.1 rework **was applied to the catalogue and never reflected in the dashboard.**
The most notable thing about this sample has moved from the colour derivation to this drift.

| Item | Catalogue | Dashboard |
|------|-----------|-----------|
| `:root` tokens | 11 colours + 2 radii + 1 shadow + 1 typeface | **10 colours only** — no radius, shadow or typeface tokens |
| `--chip-active` | declared and used | **the token does not exist** |
| chart colours | uses the semantic tokens | **a hardcoded JS array of six** (see above) |
| segments | 42px buttons, no wrapper | **the old pill form kept** (wrapper bg, gap 3, padding 7 · 10, radius 6) |
| selected state | flat `--chip-active` | `--surface` + box-shadow (the old form) |
| `.chip-group` | present | **absent** (0 uses) |
| button scheme | four `.button` variants | **no `.button` class at all** — `.export-button`, `.save-button`, `.compact-button` and `.more-menu-button` defined individually |

A structure that used to "declare the tokens twice, once per file" produced, in v1.1, its
first **token that exists on only one side**. If the catalogue is the norm and the dashboard
the implementation, the implementation is currently one version behind the norm.

## Accessibility

- `:focus-visible` rings — 3px/blue 26% in the catalogue against 2px/blue 35% in the
  dashboard (**the two files disagree**, still unresolved in v1.1), generated with
  `color-mix`
- `aria-pressed` segments, `role="group"`, and charts with `role="img"` + `aria-label`
- v1.1 introduced `aria-live="polite"` on the save status
- The segment minimum height went 32 → 42px — the touch target grew, but **there is still no
  stated target standard**
- **`--yellow` #D99000 is 2.64:1 against white** — short of the WCAG AA text threshold
  (4.5:1). The sample's recorded intent, "for text contrast on a light background", does not
  match the measurement (`agents/case-studies/frr-dashboard-review.md`, measured headlessly)
- Beyond that, contrast targets and verification figures are unverified

## References

- Re-check commit: `ab02c82` (2026-08-18, "Update relocation news feed")
- First harvest commit: `0905b887b5c9008f6799cdc6f5a08b12e664a0b6` (2026-08-18,
  "Add standalone dashboard design system")
- Design-system-related commits: `7ec8e9c` "Refresh design system patterns",
  `1fa4c2d` "Unify sidebar chip controls", `62a2324` "Add dashboard overflow menu"
- The TDS comparison basis: a direct grep of `npm @toss/tds-colors@0.1.0` dist plus
  `systems/toss-tds.md`
- Prior measurement: `agents/case-studies/frr-dashboard-review.md` (measured headlessly
  against `74fab8e` — this update reflects all four "corpus sample corrections" from that
  report)
- **Remaining checks:** where green #00A875 and yellow #D99000 came from (possibly borrowed
  from another system), a full survey of per-component dimensions on the 4,815-line dashboard
  side, whether the catalogue-to-dashboard drift is a deliberate staged rollout or an
  omission, and the rationale for flipping the primary button colour
