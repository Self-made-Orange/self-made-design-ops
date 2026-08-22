---
name: LINE Design System (LDSG · LDSM)
org: LY Corporation (Japan)
coverage: partial
url: https://designsystem.line.me
repo: null (private — npm carries only the line-seed-* typefaces)
license: "viewing only (about/terms-en — no copying, modification or redistribution. This entry records only the facts of the values, plus sources)"
tech: [iOS, Android, Web — no code or token distribution]
figma_kit: unverified
tokens_format: [documentation-layer sample — Gatsby page-data JSON + spec images]
a11y_target: unverified
platform: [mobile, web]
domain: messaging
verified: 2026-08-18
source: "designsystem.line.me /page-data/**/page-data.json (Gatsby) + reading the spec images — a documentation-layer sample"
---
<!-- lang-links -->
> **English** · [한국어](line.ko.md)
<!-- /lang-links -->

## In one line

A **two-tier system** covering the LINE messenger (LDSM) and the global family
services' web (LDSG) — the corpus's first **documentation-layer sample** (no tokens or
code are distributed; values were measured from the official documentation's
structured JSON). **The brand green has different values per OS**
(#06C755 / #4CC764), and the rule for producing pressed-state colours is written down
**as an HSV conversion formula**.

> **A note on the documentation-layer sample.** This entry's values came from the
> official documentation's data rather than from npm or a repository. The
> re-verification route is `/page-data/<path>/page-data.json`. For LDSM detail, the
> default slug (`-en`) is 403 (internal) and **the `-ex-en` suffixed edition is the
> public one**.

## Colour — roughly 170 hexes, with state colours as a formula

- **LINE Green is split by OS**: iOS and web `#06C755` / Android `#4CC764` — an
  explicit rule specifying a different brand primary per platform (the opposite
  direction from Persona's borrowing of Apple green — here the brand bends to the
  platform's convention).
- **LINE Gray in 19 steps**: White · 100–900 (with fine intermediate steps like 650,
  750, 770, 850 and 870 — a grey axis for dark mode) · Black. `#FCFCFC` to `#111111`.
- Every hex of the Rainbow set obtained, **16 hue groups × 7–12 steps**. What stands
  out is that each hue group has **a separate hex with a `p` (pressed) suffix**
  (`600p`, `500p`…) — a third approach, distinct from M3's state layer (alpha
  compositing) and Polaris's state fallbacks: **the pressed colour is baked into the
  palette in advance.**
- **The formula for producing state colours is written down**: Pressed = convert to
  HSV, then V≤32% → V+45 / 33–86% → V−20 / ≥87% → V−35. Opacity states (LDSG):
  Normal 100 / Hover 70 / Pressed 50%, Disabled `#E4E4E4`. Samples that define state
  colour as **a function** rather than a value are rare in the corpus (the same family
  as Gestalt's press-scale formula — that one for size, this one for colour).
- LINE Navy in seven steps, with usage comments attached ("iOS Navigation bar" and so
  on).

## Spacing — 15 steps, named in hundreds

```
ldsg-spacing-50=2 · 100=4 · 200=8 · 300=12 · 400=16 · 500=20 · 600=24
· 700=28 · 800=32 · 900=36 · 1000=40 · 1100=44 · 1200=48 · 1300=52 · 1400=56
```

Multiples of 4px plus a single 2px exception (`-50`, a half step). Naming in hundreds
where **100 = one step of 4px** is the same rule as Polaris (`space-100` = 4px) — two
systems arriving at the same notation independently.

## Typography — LDSM has a pt scale, LDSG publishes only the token grammar

- **LDSM (pt, system font)**: Heading 1–4 = Heavy 24 / Bold 17 / Bold 14 / Regular 13 ·
  Title 1–5 = 23/19/16/15/14 · Body 1–4 = 16/14/13/12. **Below 12pt is explicitly
  discouraged.** A per-language typeface mapping accompanies the scale (iOS SF Pro ·
  JP Hiragino W3/W6/W7 · ZH PingFang · TH Thonburi · KO Apple SD Gothic Neo) —
  crossing the language axis in `i18n/README.md`.
- **LDSG**: only the token grammar is published — `$ldsg-en-title-xxl-200` =
  **language (EN/JP/TC/TH) × type × size (XS–XXL) × weight (100/200/300)**. The sample
  where language is a first-class axis in the token name. The per-step px and
  line-height table is not published (only the example Title XXL = 38px Bold was
  confirmed).

## Radii · borders · shadows (LDSG)

```
radius  100=3 · 200=5 · 300=7 · 400=12px · circle=50%
border  50=0.5 · 100=1 · 200=2px
```

- **Radii progress through odd numbers, 3, 5 and 7** — a value choice that diverges
  from the even 4/8/12 camp (an unconventional-radius sample alongside Persona's 7 and
  22px).
- 0.5px borders — the same sub-pixel hairline camp as Polaris's 0.66px.
- Six shadows obtained as raw CSS values (3 on-white + 3 on-gray — **separate shadow
  sets per background colour**): on-white-100
  `0 0 2px rgba(0,0,0,.07), 0 1px 2px rgba(0,0,0,.07)` through on-gray-300
  `0 1px 15px rgba(0,0,0,.04)`.

## Grid · component samples

- LDSG: 4 columns at 375px (columns 76–77 / gutter 12 / margin 16px).
- LDSM: a common 16pt side margin; 2 columns 167/9/16 · 3 columns 109/8/16 ·
  4 columns 82/5/16 (column width / gutter / margin).
- Capsule Button height **42pt** (16pt horizontal padding) · FAB diameter 54pt ·
  a 24×24px icon grid (2px padding · 1.3/1.5/1.8pt strokes · 45° angles).

## Notable decisions

- **The corpus's first documentation-layer sample** — admitted on documentation data
  alone, with no token distribution
- The brand primary split by OS (#06C755 / #4CC764)
- A dedicated `p` pressed palette plus an HSV state-colour formula — the third
  approach to state colour
- A language axis in the token names (LDSG `-en-`, `-jp-`…)
- A two-tier structure (LDSG/LDSM) crossed with two documentation editions
  (`-en` internal / `-ex-en` public)

## Accessibility

Unverified (only the 12pt minimum size and the 70% lower bound on text opacity were
confirmed).

## Notes

- **Basis for figma_kit (unverified):** an internal Figma library is presumed to exist

- Documentation: https://designsystem.line.me (LDSG / LDSM)
- Terms of use: https://designsystem.line.me/about/terms-en — **viewing only.** The
  documentation text and images may not be redistributed; this entry records only the
  facts of the figures
- npm: only the `line-seed-*` typeface packages exist (JP/KR/TH — not tokens)
- **Still to confirm:** LDSG's full type scale in px (only the token grammar is
  published), real breakpoint values (tablet 8 columns and PC 16 columns are only
  announced), many component dimensions (dependent on the spec images), the
  accessibility target, and the Figma kit
