---
name: PIE
org: Just Eat Takeaway
coverage: partial
url: https://pie.design
repo: https://github.com/justeattakeaway/pie
license: Apache-2.0
tech: [Web Components, Lit]
figma_kit: unverified
tokens_format: [JSON, CSS, SCSS]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @justeat/pie-design-tokens@7.14.3 → dist/tokens.json (1,251 leaves) · npm @justeattakeaway/pie-button@1.14.12 · @justeattakeaway/pie-css@1.5.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](pie.ko.md)
<!-- /lang-links -->

## In one line

Just Eat Takeaway's system — the spacing and radius aliases are **letters of the alphabet**
(`a` · `b` · `c` … `j`). In the sample, **PIE alone names by letter order** rather than
t-shirt sizes, numbers or prose.

## Tokens — two layers, global (values) and alias (purpose)

```
spacing/global:  0 · 2 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 56 · 64 · 80
spacing/alias:   none · a-small(2) · a(4) · b(8) · c(12) · d(16)
                 e(24) · f(32) · g(40) · h(56) · i(64) · j(80)
radius/alias:    rounded-a(4) · b(8) · c(12) · d(16) · e(50) · f(20) · g(24)
```

- **Alphabetical naming** — the size names abandon meaning and keep only order. A choice
  that avoids both the extension limit of t-shirt sizes (xs–xxl) and the basis confusion of
  numbers (400 and so on), but whether `f` is 32px or 20px depends on the family —
  **radius `f` (20) is smaller than `e` (50)**. A name-value order mismatch (the
  `GLOSSARY.md` family)
- **`a-small` (2px)** — an exception name wedged in before a. The point where the
  alphabetical scheme's insertion problem shows
- The spacing has **no 48**, going 40 → 56. It holds the core (4/8/16/24/32)
- The radius `round: 50` is **a unitless 50** ~~(= 50%)~~ — since the global values are bare
  numbers, interpreting the unit falls to the consumer. **At the CSS layer (pie-css) it is
  settled as a `50rem` pill** (2026-08-18 deep-dive — the same convention as Bootstrap's
  `50rem`)
- The theme is named `jet` (Just Eat Takeaway) — a structure prepared for multiple brands

Instead of line height it has a **`paragraph-spacing`** family (16/14/12) — keeping the gap
between paragraphs as a typography token, the same camp as Vanilla (`sp-after`).

## Component deep-dive — (2026-08-18)

The components ship as individual packages (`@justeattakeaway/pie-button@1.14.12` ·
`pie-text-input@0.30.9` · `pie-modal@1.27.6`, Lit Web Components), but **the actual
dimensions and styles all live in the shared `@justeattakeaway/pie-css@1.5.0` SCSS mixins**
(`scss/mixins/components/_button.scss`). The unified entry point `pie-webc@0.11.10`
confirms **41 components**. Because the tokens are unitless numbers, the component layer
**attaches the unit with `calc(var(--dt-font-size-20) * 1px)`** — the "the unit is the
consumer's job" structure being carried out by the system's own components.

### Buttons — a pill (50rem) with 20px/800 type, five sizes

No height is declared; it is **derived from line height plus vertical padding**.

| | xsmall | small-productive | small-expressive | medium | large |
|---|:--:|:--:|:--:|:--:|:--:|
| Type | 14px/**700** | 16px/**800** | 20px/**800** | 20px/**800** | 20px/**800** |
| Line height | 20px | 20px | 24px | 24px | 24px |
| Vertical padding | 6px | 10px | 8px | 12px | 16px |
| Horizontal padding | 8px (`b`) | 16px (`d`) | 16px (`d`) | 24px (`e`) | 24px (`e`) |
| **Derived height** | **32px** | **40px** | **40px** | **48px** | **56px** |

- **The radius is `rounded-e` = a 50rem pill at every size** — a full capsule as the base
  form. The token section's "the unit of 50 is ambiguous" question closes here.
- **The button type is 20px at weight 800 (extrabold)** — among the largest in the sample.
  Bigger and heavier than Backpack (16px/700), and two steps away from the 14px/500 majority.
- **small splits in two** — at the same 40px height it divides into `productive` (16px type)
  and `expressive` (20px type). The only sample where a density/marketing type split enters
  the size names.
- **A `--responsive` modifier promotes the size one step above md**
  (xsmall → small-productive, small → medium, medium → large). Where GOV.UK and NHS make
  responsiveness a matter of adjusting padding and type, PIE makes **the size-variant
  mapping itself responsive**.
- The outline variant subtracts 1px from the padding to offset the border — the same intent
  as MUI and Garden.
- Focus: a double ring, `0 0 0 2px inner + 0 0 0 4px outer` (the shared `p.focus` mixin).
- Thirteen variants (three primary families · secondary · outline · four ghost families ·
  inverse · two destructive).

### Inputs (`pie-text-input`) — a fixed height, the reverse of the button

| | small | Default | large |
|---|:--:|:--:|:--:|
| **height** | **40px** | **48px** | **56px** |
| Vertical padding | 8px (`b`) | 12px (`c`) | 16px (`d`) |
| Horizontal padding | 16px (`d`) | 16px | 16px |
| Radius | 12px (`rounded-c`) | 12px | 12px |
| Border | 1px | 1px | 1px |

- **The button derives its height while the input has a fixed `height`** — repeating the
  same asymmetry as Backpack (button min-height / input height) in a different combination.
  The inner `input` is fixed at 24px.
- **A pill button against a 12px input** — among the largest radius contrasts within one
  system in the sample.
- The hover background is **computed at runtime with `color-mix()`** (with an hsl component
  variable fallback) — making state colours by formula rather than token (the same position
  as Vitamin's tint family).

### Modals (`pie-modal`) — a native `<dialog>` plus `@starting-style`

| | small | medium | large |
|---|:--:|:--:|:--:|
| max-width | **450px** | **600px** | **1080px** |
| Default width | 75% | 75% | 75% |
| Radius | 16px (`rounded-d`) | same | same |

- The entry animation is not keyframes but **`@starting-style` plus
  `transition: display/overlay allow-discrete`** — the first sample to adopt the current CSS
  entry/exit mechanism. `translateY(-40px)` → 0 plus a fade.
- **Asymmetric 250ms entry / 150ms exit** (scrim 300/200ms) — the same "come in slowly, leave
  quickly" camp as MUI (225/195), with the values as tokens (`--dt-motion-timing-*`).
- **Four easing tokens genuinely exist** — `in` (0.8,0,1,1) · `out` (0,0,0.18,0.99) ·
  `persistent-expressive` (0.95,0,0,0.95) · `persistent-functional` (0.45,0,0.55,1). The
  modal uses persistent-functional. The opposite pole from Backpack (no easing tokens,
  literal drift).
- At md and below, large goes automatically full-screen with radius 0. Vertical margins
  40px → 80px (above md).
- Scrim `rgb(0,0,0,0.55)`. Scroll shadows are drawn in two layers with
  `background-attachment: local, scroll` — a technique where the shadow and a "cover
  gradient" cancel each other out as you scroll.
- The heading's `margin-block: 16px` carries the comment "deliberately not a custom
  property" — **declaring in a comment the place where theme injection was deliberately
  blocked**.

### Notable decisions (deep-dive)

- **A pill button with 20px/800 type** — brand expression in both the component's geometry
  and its typography
- **small split in two (productive/expressive) plus `--responsive` size promotion** — unique
  in the sample
- **Unitless tokens given units at the component layer with `calc(×1px)`** — deferred unit
  decisions carried out
- **`@starting-style` entry animation** — at the very front of adopting current CSS
- **Four easings and six timings tokenised** plus asymmetric entry and exit
- A derived button height (32–56) against a fixed input height (40/48/56)

## Notable decisions

- **Alphabetical naming** (`a`–`j`) — unique in the sample
- The `a-small` insertion exception — exposing the structural limit of an alphabetical scheme
- An order mismatch in the radius aliases, `f` < `e`
- Two layers, global (bare numbers) and alias (purpose), with the consumer attaching the unit
- A `paragraph-spacing` typography token
- Web Components (Lit) — the same camp as Shoelace and Siemens iX

## Accessibility

Unverified.

## Notes

- Tokens: `npm pack @justeat/pie-design-tokens@7.14.3` → `dist/tokens.json`
  (with the category definitions bundled in `metadata/tokensMetadata.json`)
- Component deep-dive: `@justeattakeaway/pie-css@1.5.0`
  (`scss/mixins/components/_button.scss` · `dist/index.css`) plus
  `pie-button@1.14.12` · `pie-text-input@0.30.9` · `pie-modal@1.27.6` ·
  `pie-webc@0.11.10`, each `src/*.scss` (2026-08-18)
- **Still to confirm:** the structure of the roughly 1,000 colour leaves, dark mode,
  ~~the component list~~ (resolved 2026-08-18 — 41 in pie-webc)
