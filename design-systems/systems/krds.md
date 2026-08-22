---
name: KRDS (Korea Responsive Design System)
org: Government of the Republic of Korea (NIA, the National Information Society Agency)
coverage: partial
url: https://www.krds.go.kr
repo: https://github.com/KRDS-uiux/krds-uiux
license: "ISC (declared in the package.json of npm krds-uiux, 2026-08-18 — the licence of the design assets and documentation is separately unverified)"
tech: [HTML, CSS]
figma_kit: true
tokens_format: [JSON, CSS]
a11y_target: Unverified (a high-contrast mode is provided — see below)
platform: web
domain: public
verified: 2026-08-18
source: "npm krds-uiux@1.1.0 → tokens/transformed_tokens.json (768 tokens), figma_token.json. Maintainer uiux@nia.or.kr"
---
<!-- lang-links -->
> **English** · [한국어](krds.ko.md)
<!-- /lang-links -->

## In one line

South Korea's digital government design system. **A 17px body** (the second after Apple),
**whitespace named by content relationship** (`h1-h2` · `title-body`), and PC/mobile as
**token modes**.

**The first Korean sample and the fourth in the public-sector domain.** An official package,
with the maintainer confirmed as `uiux@nia.or.kr` (the National Information Society Agency).

## Tokens — 768 of them, in six modes

| group | tokens | character |
|------|:---:|------|
| `primitive` | 242 | raw (numeric scales, colours, typefaces) |
| `mode-light` | **190** | light semantic colours |
| **`mode-high-contrast`** | **190** | **high contrast — the same count as light** |
| **`responsive-pc`** | 49 | PC sizes and whitespace |
| **`responsive-mobile`** | 49 | mobile sizes and whitespace — the same structure as PC |
| `semantic` | 48 | gap · padding · size-height · radius |

**The viewport is a token mode.** The same axis as Spectrum giving each token desktop and
mobile values through `sets` (`tokens/scales.md`), except KRDS separates them into mode
groups.

**The high-contrast mode has the same 190 tokens as light** — the same structure as
Atlassian's `increased-contrast` matching the ordinary theme at 466 (`patterns/color.md`).
Being structurally identical, switching is a matter of swapping values.

### The root is 10px (the `62.5%` trick)

`font-size: 62.5%` was confirmed in the CSS — **`1rem` = 10px.**
Since `primitive.number.*` is in units of `0.1rem`, the px conversions below hold.

**KRDS is the only system in the sample with a 10px root.** Carrying values over from another
rem-based system puts you 1.6× off — **a demonstration that rem values must not be copied
between systems.**

### Spacing primitives — 22 steps

```
1 · 2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 · 56 · 64 · 72 · 80 · 96  (+ max 1000)
```

The core `4/8/16/24` plus `32` are all present, and the 2–12px range is dense at 2px steps.

The semantic `gap` narrows to 12 steps —
`2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80`.
**A two-tier structure narrowing 22 primitive steps to 12 semantic ones.**

### Whitespace named by content relationship — unique in the sample

The `gap-layout` group is named by **which pair of elements the space falls between.**

| token | PC | mobile |
|------|:---:|:---:|
| `h1-h2` | 48 | 32 |
| `h2-h2` | 64 | 40 |
| `h2-h3` | 40 | 24 |
| `h3-h3` | 56 | 32 |
| `h4-h5` | 16 | 12 |
| `title-body-small` | 16 | 8 |
| `title-body-large` | 24 | 20 |
| `text-text-small` | 12 | 10 |
| `image-text-large` | 32 | 24 |
| `breadcrumb-h1` | 40 | 32 |
| `contents-footer` | 64 | 40 |

**"40px between an h2 and an h3" is a token.** Every other system in the sample gives you
whitespace sizes and leaves where to use them to you — KRDS **tokenises the placement rule
itself.**
`patterns/` repeatedly records that "the judgement guidance exists only on the documentation
site"; **KRDS is the first case of putting part of the judgement into the tokens.**

**Repeating the same level (`h2-h2`) is wider than changing level (`h2-h3`)** — 64 vs 40.
Starting a new section opens up more than descending into a sub-item, and the rule holds at
h3, h4 and h5 too.

### Typography — a 17px body, an odd-numbered scale

| family | PC | mobile |
|------|-----|-----|
| Display | 60 · 44 · 36 | **44 · 32 · 28** |
| Heading | 40 · 32 · 24 · 19 · 17 · 15 | 24 and up (large 24) |
| **Body** | **19 · 17 · 15 · 13** | **the same** |
| Label | 19 · 17 · 15 · 13 | the same |

- **`body.medium` is 17px.** In the sample, using 17 as the body default is
  **the second case after Apple iOS (17pt), and the first in a web system.**
  It revises `patterns/typography.md`'s conclusion that "17 is Apple's alone"
- **The whole body scale is odd** — 13 · 15 · 17 · 19.
  Exactly one notch off from the even grid (12/14/16/18) the majority of the sample uses
- **Only Display and Heading shrink on mobile; Body and Label stay** — the same judgement as
  Pajamas making only h1–h3 fluid (`patterns/typography.md`)

The typeface is a single **Pretendard GOV** — a government derivative of Pretendard.
There are only two tracking tokens, `0` and `0.1rem` (1px).

### Radius — the names carry numbers

```
xsmall1·2·3 = 2px   small1·2·3 = 4px   medium1·2 = 6px
medium3·4 = 8px     large1·2 = 10px    xlarge1·2 = 12px    max = 1000px
```

**The same value has several numbered variants** — `xsmall1` through `3` are all 2px.
The same pattern as Atlassian keeping `selected`/`focused` as separate tokens on the same
value: dividing in advance the places that will later diverge.

**There is a 10px radius** (`large`) — a rare value in the sample (outside Spectrum).

## Components

Distributed as HTML components in the `html/` directory (not React).
~~The list and dimensions were not checked.~~ → see the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

**The same `krds-uiux@1.1.0` package was confirmed to contain component markup and CSS**
(only the tokens had been collected): 42 SCSS files in `resources/scss/component/` plus
**74** markup samples in `html/code/` (button, input and modal, alongside government-site
scaffolding such as masthead, identifier, skip_link and critical_alerts). The values were
resolved by following the SCSS's semantic token references through `krds_tokens.css`
(a 10px root).

### Buttons — a five-step 8px ladder, defaulting to large

| | xsmall | small | medium | **large (default)** | xlarge |
|---|:--:|:--:|:--:|:--:|:--:|
| **height** | **32px** | 40px | 48px | **56px** | 64px |
| inline padding | 10px | 12px | 16px | 20px | 24px |
| radius | 4px | 6px | 6px | **8px** | 8px |
| type | 15px | 15px | 17px | 19px | 19px |

- **With no size class you get large (56px)** — a choice to put the default at the large end,
  parting from the medium default of most systems (the inputs and modals below do the same).
- **The height is fixed straight from a `size-height` token with zero block padding** — the
  opposite pole from the derived-height camp.
- **The radius grows with the size, 4→6→8px** — this is what consumes the numbered radius
  variants (`medium1·2` 6px / `medium3·4` 8px). Where Backpack grows the radius only on large
  inputs, KRDS applies it across all five steps.
- The five steps carry only three type values (15 · 15 · 17 · 19 · 19) — consuming the
  (odd-numbered) label scale.

### Inputs — xlarge is 80px

| | small | medium | **large (default)** | xlarge |
|---|:--:|:--:|:--:|:--:|
| **height** | 40px | 48px | **56px** | **80px** |
| radius | 6px | 6px | 8px | 10px |

- **The xlarge input is 80px with heading-medium type in bold** — absorbing the main search
  box into the input's size variants (KRDS is the only sample with a search-box-specific
  size).
- A 1px border → **on focus the border-width thickens to 2px.** There is no outline and no
  box-shadow — the only form in the sample that indicates focus purely by a change in border
  thickness (NYSDS does the reverse, adding an outline precisely to avoid changing thickness).
- Inline padding is 16px throughout, and state colours pass through an intermediate
  `--krds-input--*` variable layer.

### Modals — three widths, defaulting to 760px

| item | value |
|------|-----|
| width | sm **400** / md **560** / lg **760px** (lg by default) |
| radius · padding | **12px** (`xlarge1`) · **40px** |
| header top padding | **56px** |
| min-height | 264px |
| transition | visibility/opacity over **0.2s** only (no keyframes) |
| mobile | switching to a `calc(100% − 32px)` width |

- The default being the widest (760px) follows the same pattern as the buttons and inputs —
  **KRDS puts every default at the large end.**
- Footer buttons have a min-width of 78px.

### A characteristic decision — one global transition

The reset CSS applies a single `transition: var(--krds-transition-base)` =
**`.4s ease-in-out`** to every form element globally. Having no easing differentiation, a
single curve, is the same extreme as Audi UI (one global easing), and the value being a
keyword literal (`ease-in-out`) matches Backpack's mainline.

### Characteristic decisions (from the deep pass)

- **Every default size is large** — buttons 56 · inputs 56 · modals 760px
- **A fixed five-step 8px height ladder (32–64) with zero block padding**
- **Radius tracking size** (4→6→8→10) — where the numbered radius variants are actually used
- **Focus = a change in border thickness** (1→2px, no ring)
- **An 80px xlarge input** — the search box absorbed as a size variant
- **A single global transition, `.4s ease-in-out`**

## Characteristic decisions

- **A 17px body** — the second after Apple and the first on the web. The whole body scale is
  odd (13/15/17/19)
- **Whitespace named by content relationship** (`h1-h2` · `title-body` · `image-text`).
  The only sample to tokenise a placement judgement
- **PC and mobile as token modes** — the same 49-token structure twice. Body does not shrink;
  only Display does
- **The high-contrast mode matches light in count (190)**
- **A 10px root (62.5%)** — unique in the sample, and a demonstration that rem values cannot
  be ported
- **The fourth public-sector sample, and it diverges from GOV.UK again** — its primitives are
  in the 4px family. The four public-sector bases: GOV.UK 5px / Codex multiples of 4 /
  USWDS 8px / **KRDS the 4px family** — **5px remains GOV.UK's alone to the end**
- **Numbered radius variants on the same value** (`xsmall1·2·3`) — reserving the places that
  will diverge
- A single typeface, **Pretendard GOV** — the first confirmed typeface in a CJK system

## Accessibility

- **A 190-token high-contrast mode** — structurally identical to the ordinary mode
- The package description states responsiveness and accessibility explicitly ("a responsive,
  accessible UI/UX")
- WCAG/KWCAG target figures are unverified in the tokens and the package (the documentation
  site was unreachable)

## References

- Documentation: https://www.krds.go.kr (blocked by the proxy)
- Repository: https://github.com/KRDS-uiux/krds-uiux
- Tokens: `npm pack krds-uiux@1.1.0` → `tokens/transformed_tokens.json` ·
  `tokens/figma_token.json` (the Figma tokens ship separately)
- CSS: `resources/css/token/krds_tokens.css`
- Components in depth: `resources/scss/component/*.scss` plus the 74
  `html/code/*.html` samples from the same package (2026-08-18)
- **Open questions:** the colour palette structure (the 190 in detail),
  ~~the `size-height` semantics~~ ~~the component list~~ (resolved 2026-08-18 — the deep
  pass: size-height 1–11 = 8–80px, 42 SCSS files and 74 markup samples), the KWCAG target,
  and the licence (`package.json` says ISC, but it may be boilerplate — the repository and
  documentation need checking)
