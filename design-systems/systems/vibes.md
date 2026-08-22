---
name: Vibes
org: freee
coverage: partial
url: https://vibes.freee.co.jp
repo: https://github.com/freee/vibes
license: Apache-2.0
tech: [React, SCSS]
figma_kit: false
tokens_format: [JS, SCSS]
a11y_target: "Governed by freee's accessibility guidelines — based on WCAG 2.1, with no level target stated (confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @freee_jp/vibes@100.1.0 → dist/constants/{Color,Size,Font,ZIndex}.js + vibes_2021.css"
---
<!-- lang-links -->
> **English** · [한국어](vibes.ko.md)
<!-- /lang-links -->

## In one line

The system of freee, a Japanese accounting SaaS — **an old-generation and a 2021-generation
palette coexist in one file**, the type token names **encode their rem value in four digits**
(`FontSize0875`), and it is the **fifth** system to tokenise z-index. Major version **100**.

## Tokens — JS constants plus BEM CSS

The CSS contains **zero** custom properties — every value is a literal, and the tokens ship
only as JS constants (`dist/constants/`), a cut similar to Semi's.

### Colour — two generations coexisting

```js
// the old generation
VibesBase1Color: '#efede8'   // a warm beige
VibesPrimaryCorpColor: '#4575b4'  // the accounting (Corp) product
VibesPrimaryHrColor:   '#338650'  // the HR product
// the 2021 generation
Colors2021P01~P10, S01~S10, RE·OR·YE… (a sparse ramp)
```

- **The old and the "2021" generations coexist in the same constants file** — even the file
  is named `vibes_2021.css`. After Spindle (typeface version-1/2) and Mística (a `-new`
  skin), this is the **third exposed migration**, and the largest in scale
- **A primary per product family** (Corp blue / HR green) — the same multi-product structure
  as Charcoal's five brand-colors
- **The 2021 ramp is sparse** — it keeps only the steps in use, as in
  `RE02 · 04 · 05 · 07 · 10`. A different choice from the majority, who fill all ten steps

### Type — the value encoded in the name

```js
FontSize0875 = '0.875rem'  // 14dp — a design token (do not use directly)
CaptionFontSize = FontSize0750  // a semantic token (use this one)
```

- **The name is the rem value to four decimal places** (`0875` = 0.875rem) — the rem edition
  of Primer's (px-value names). Comments distinguish the design-token and semantic-token
  tiers, and **the warning "do not use this directly in components" is in a comment**
- Actual distribution: **14px ×27 · 12px ×25 · 16px ×18** — 14px dominates.
  A Japanese business SaaS joining the same 14px camp as the Chinese-language systems
  (Ant, Semi)

### z-index — the fifth tokenisation, the fifth arithmetic

```
Overlay 100 · FormActions 200 · Floating 500 · Modal 1000 · MessageModal 1500
Popup 2000 · PopupMessage 3000 · FixedMessage 4000 · Max 2147483647
```

After Chakra (arithmetic in 100s), Bootstrap (1000s + 5), Open Props (ordinals) and
Forma 36 (10ⁿ), this is **irregular jumps (100→4000)** — five systems, five arithmetics.
The ordering also differs from others, with `Popup` (2000) above `Modal` (1000).

### Sizes — a web system with dp in the comments

```js
XSmallSize '0.25rem' // 4dp … FormControlHeight '2.25rem' // 36dp
MobileBoundaryWidth '48rem'  // the boundary with the iPhone 8
```

The rem values carry **dp comments** — the only sample in which a web system explains itself
in mobile vocabulary. The breakpoint comment names the iPhone 8 explicitly.
The control heights of 36px (default), 24 and 48 sit elsewhere than Blueprint's (30px).

## Components in depth — (2026-08-18)

Measured from `vibes_2021.css` (BEM with a `vb-` prefix) in `@freee_jp/vibes@100.1.0`.
The component hierarchy is **exposed in the file system as `dist/lv1` (single parts — 16
categories, with 14 buttons alone) and `dist/lv2` (compositions — 56 directories)** — the
atomic hierarchy attested by the distribution structure.

### Buttons (`.vb-button`) — a line height of height − 2px

| | small | default | large |
|---|:--:|:--:|:--:|
| **height (fixed)** | 1.5rem (**24px**) | 2.25rem (**36px**) | 3rem (48px) |
| line height | calc(24px−2px) | **calc(36px−2px)** | calc(48px−2px) |
| type | 12px | 14px | 16px |
| inline padding | 8px | 16px | 16px |
| radius | 8px | 8px | 8px |

- **`line-height: calc(height − 2px)`** — the 1px × 2 border's share is subtracted from the
  line height to centre the text vertically. The same technique as Garden's back-calculated
  line height, except **the same formula is applied to primary, which has no border**, so the
  text sits identically across variants. The default 36px matches the token section's
  `FormControlHeight 2.25rem // 36dp`.
- Three appearances (primary `#285ac8` · secondary white with a border · tertiary
  transparent) × **danger as a modifier rather than a variant** (`--danger`). Every variant is
  bold.
- No min-width by default plus **an opt-in modifier** (`--hasMinWidth`): 96/80/176px.
- Transition 0.2s (background-color · color · box-shadow · border-color).

### Focus — a three-layer white/blue/white sandwich ring

```
box-shadow: 0 0 0 1px #fff, 0 0 0 3px #2864f0, 0 0 0 4px #fff
```

- **A three-layer structure** that separates the ring from any background colour — applied to
  buttons and selects only.
- **Text inputs get no custom ring** (delegated to the browser default) — instead a
  `lv1/a11y/FocusHighlight` wrapper component ships separately so the same ring can be put
  around any element. A rare case of shipping a focus ring as a component.
- The placeholder **disappears to opacity 0 on focus** (0.3s) — a choice that parts from the
  keep-it-visible majority.

### Inputs (`.vb-textField`) — four width presets

- Three heights, **24/36/48px, with the 8px radius shared with the button exactly** — buttons
  and inputs sit on the same grid within a form row. Border `#dcdcdc`, and on error not just
  the border but **the input text and placeholder turn `#dc1e32`**.
- **Four width presets**: XSmall 4rem (64) · Small 7rem (112) · Medium 11rem (176) ·
  Large 24rem (384px) — a rare case of tokenising control width as a t-shirt scale.
- disabled background `#f0eded` plus `cursor: not-allowed`.

### Dialogs — a width range rather than steps

- Shared by TaskDialog and MessageDialog: **min-width 40rem (640px) · max-width 70rem
  (1120px)** — no fixed width steps, **only a min/max range**.
  Content decides the width, parting from the step-based majority (Charcoal 336/440/648).
- `dialogBase` radius **1.5rem (24px)** — a business SaaS with a radius at the top of the
  sample. Header and footer padding 24px, with `#e9e7e7` borders above and below the body.
- scrim `rgba(0,0,0,.5)` at z 999 → dialog z 1000 → message z 1500 —
  **the dialog z values (1000, 1500) match the JS constants** (Modal and MessageModal in
  `ZIndex.js`). With zero custom properties, the CSS literals and the JS constants are kept
  in sync by hand (the scrim's 999 exists only in the CSS).
- `max-height: calc(100svh − 2rem)` — svh alongside a legacy 100vh fallback.

### The font stack — Japanese typefaces listed twice (crossing the i18n axis)

The stack repeats as a literal in every rule (the consequence of having no variables), and the
Japanese typefaces are **listed twice, in kanji and in roman letters**:

```
"ヒラギノ角ゴ ProN", Hiragino Kaku Gothic ProN, …, "メイリオ", Meiryo
```

A defence against differences in how older browsers and operating systems resolve font names
— a precaution characteristic of CJK systems.
The form default is `font: normal 0.875rem/1.5` — **14px with a 1.5 line height**, confirming
the CJK 14px camp at the component layer too.

### Characteristic decisions (from the deep pass)

- **The line height = height − 2px formula** applied even to border-less variants
- **A three-layer sandwich focus ring**, with no ring on inputs — and the ring itself shipped
  as a component (FocusHighlight)
- **A dialog width specified as a range (640–1120px)** — the opposite pole from the
  step-based majority
- **Four input width tokens** (64/112/176/384px)
- Japanese typefaces listed twice, plus a disappearing-placeholder focus

## Characteristic decisions

- **Two palette generations coexisting, with the year in the file name** — the largest
  exposed migration in the sample
- **Names encoding the rem value** (`FontSize0875`) plus usage warnings in comments
- **The fifth z-index tokenisation** — and the fifth arithmetic (irregular jumps)
- A primary branched per product family (Corp/HR)
- A sparse ramp (only the steps in use)
- 14px dominant in practice — a Japanese SaaS joining the 14px camp
- Major version 100 — above SmartHR's 99, the highest in the sample

## Accessibility

~~Unverified (`_focus.scss` exists in lv0 — not surveyed)~~ → the focus system measured
(2026-08-18): a three-layer sandwich ring plus a FocusHighlight wrapper component (the deep
pass).

~~The explicit conformance target is still unverified.~~ → **Resolved (2026-08-18, headless
render).**

Vibes **does not write a conformance target of its own; it delegates to the parent company's
guidelines.** The Storybook Readme says that "スクリーンリーダーに関しては
**アクセシビリティー・ガイドラインの標準環境**に準じます" and links
**freee's accessibility guidelines** (freeeアクセシビリティー・ガイドライン,
https://a11y-guidelines.freee.co.jp/).

Those guidelines state they were "**Web Content Accessibility Guidelines (WCAG) 2.1 に基づいて
策定**" (formulated on the basis of WCAG 2.1), but **make no level declaration such as
"conforms to AA".** Instead they supply separate mapping documents from each of their own
items to WCAG 2.1 success criteria and levels
("WCAG 2.1の各達成基準と当ガイドラインの項目との対応" ·
"当ガイドラインとWCAG 2.1の各達成基準のレベル").
The document version is `Ver. 202603.0-RELEASE+7.0.0` and the licence is **CC BY 4.0**.

**The verification environment is stated too** (the Vibes Readme):

| item | content |
|------|------|
| screen-reader baseline | verified on **Windows + Chrome + NVDA** |
| supplementary | **VoiceOver used alongside** for quick testing |
| browsers | Chrome · Edge (Chromium) · Firefox · Safari |
| exception | "defects occurring only in some browsers may be judged not to warrant a bug fix" |

The type that **writes down a verification environment as the contract, in place of a level.**

Sources: https://vibes.freee.co.jp/iframe.html?id=doc-readme--docs&viewMode=docs (render
confirmed) · https://a11y-guidelines.freee.co.jp/intro/index.html (2026-08-18)

## References

- Tokens: `npm pack @freee_jp/vibes@100.1.0` → `dist/constants/`
- Components in depth: `vibes_2021.css` plus `dist/lv1` and `dist/lv2` from the same package
  (2026-08-18)
- **The design source is Sketch, not Figma (2026-08-18, `figma_kit: false`)** —
  the Storybook Readme says "コーディングをせずに画面デザインを行う場合には
  **Sketch を使用してください**。vibes の Library ファイルは **Sketch Cloud** で
  配布しています。必要な場合は **UX チームにお問い合わせください**".
  That is: ① the tool is Sketch, ② distribution is through Sketch Cloud, ③ it is
  **private and request-based, internally.**
  The same paragraph does mention Figma — "vibes のコンポーネントには、**Figma では表現しきれ
  ない制約**が存在しています" — but as **a warning about limitations, not a kit offer**, and it
  continues "check the specification in Storybook".
  A rare case in the corpus of naming **Sketch as the working distribution tool**
  (classified C — no Figma kit).
  Source: https://vibes.freee.co.jp/iframe.html?id=doc-readme--docs&viewMode=docs
  (render confirmed, 2026-08-18)
- **Open questions:** ~~the component list (the lv1/lv2 structure)~~ (resolved 2026-08-18 —
  the deep pass), dark mode, ~~the accessibility target~~ (resolved 2026-08-18 — the
  accessibility section above), and the state of the old → 2021 migration
