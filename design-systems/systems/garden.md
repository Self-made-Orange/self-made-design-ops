---
name: Garden
org: Zendesk
coverage: full
url: https://garden.zendesk.com
repo: https://github.com/zendeskgarden/react-components
license: Apache-2.0
tech: [React]
figma_kit: unverified
tokens_format: [JS, CSS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-17
source: "npm @zendeskgarden/react-theming@9.15.7 → dist/index.cjs.js (DEFAULT_THEME). Secondary: @zendeskgarden/css-variables@7.0.0"
---
<!-- lang-links -->
> **English** · [한국어](garden.ko.md)
<!-- /lang-links -->

## In one line

Zendesk's design system. **Its spacing has neither 16px nor 24px** — the multipliers run
`1·2·3·5·8·10·12`, making it **the system that broke the corpus's last unbroken value
(16px)**.

## Tokens

### Spacing — seven multipliers on a base of 4, with no ×4 or ×6

```js
const BASE = 4;
space = {
  xxs: 4,    // ×1
  xs:  8,    // ×2
  sm:  12,   // ×3
  md:  20,   // ×5  ← skips ×4 (16)
  lg:  32,   // ×8  ← skips ×6 (24)
  xl:  40,   // ×10
  xxl: 48,   // ×12
}
```

**The multipliers list as `1 · 2 · 3 · 5 · 8 · 10 · 12`.** The first five (1, 2, 3, 5, 8)
match the Fibonacci sequence — whether that is deliberate is not stated in the source.

**`md` (the middle value) is 20 rather than 16.** It is **the first system among 30
spacing samples with no 16px**, and it lacks 24px as well (the second to omit 24, after
Mantine).

The **same values** were confirmed in the legacy
`@zendeskgarden/css-variables@7.0.0` (dormant since 2024) and the current
`react-theming@9.15.7` (updated 2026-07) — this is not a relic of an old package.

### Derived scales — all multiples of `BASE`

| Family | Definition | Values |
|--------|------------|--------|
| Line height | `BASE × 4–8, 11` | 16 · 20 · 24 · 28 · 32 · 44 |
| Radii | `BASE/2 · BASE · BASE×2` | **2 · 4 · 8** |
| **Breakpoints** | `BASE × 144/192/248/300` | 576 · 768 · **992** · 1200 |

**Even the breakpoints are multiples of the 4px base.** The same family as USWDS
deriving breakpoints from its spacing map, except that Garden makes them **from a single
multiplier**. With multipliers that large — `992 = 4×248` — the values are effectively
arbitrary, but the notation is multiplication.

576/768/992/1200 are **exactly Bootstrap's breakpoints** (`systems/bootstrap.md` —
sm through xl).

### Typography

| Token | Value |
|-------|:---:|
| `xs` | 10px |
| `sm` | 12px |
| **`md`** | **14px** |
| `lg` | 18px |
| `xl` | 22px |
| `xxl` | 26px |
| `xxxl` | 36px |

**The 14px body camp** (`patterns/typography.md` — the eighth).
**16px is missing from the font scale too** — 14 is followed by 18.

**The legacy css-variables has monospace-specific sizes** — `11 / 13 / 17px`,
**each 1px smaller than the proportional sizes (12/14/18).** The only sample to keep a
separate size scale for monospace (Helios shares the sizes and changes only the
typeface). No size separation is confirmed in the current theming package, so it may be
legacy-only.

Weights cover all nine steps from 100 to 900; icon sizes come in three (12/16/26).

### Opacity — twelve even steps

```
100: 0.08 → 1200: 0.96  (steps of 0.08)
```

**The finest opacity scale in the sample** (denser than Gestalt's
`--opacity-0~500`). Being 0.08 × n, the names (`100`–`1200`) are proportional to the
values.

### Borders · shadows

| Family | Values |
|--------|--------|
| Border width | 1 · **3px** |
| Shadow width | 1 · 2 · 3px |
| Shadow | **a function** — `xs: color => \`0 0 0 1px ${color}\`` |

**The border widths are 1 and 3** — there is no 2px. The only composition of its kind in
the sample.

**The shadow tokens are functions rather than values.** They take a colour as an
argument and assemble the result — the same purpose as Open Props recomposing through
`--shadow-color` / `--shadow-strength` CSS variables, achieved by Garden through a **JS
function call**.

## Components

Distributed split across the `@zendeskgarden/react-*` packages.

### Button deep-dive (2026-08-17, `@zendeskgarden/css-buttons@9.0.1` — the classic CSS line)

| | sm | default | lg |
|---|:--:|:--:|:--:|
| Height | 32 | **40** | 48px |
| Type | 12 | 14 | 14px |
| Horizontal padding | `.91667em` | `1.07143em` | `1.35714em` |

- **The horizontal padding is a repeating decimal in em** — `1.07143em` = 15px ÷ 14px.
  Traces of back-computing an intended px value into em (the same phenomenon as Stacks's
  repeating rem decimals and Atlassian's `32/14em`, the third sample). It carries the
  side effect that changing the type size grows the padding with it.
- `line-height = height − 2px` — back-computing the border's share (identical to
  Mantine's line-height back-computation).
- Radius 4px, a `--pill` variant at 9999px, icon-only at a 40px square.
- This package is the classic CSS line while the current one is styled-components
  (react-*) — used here to trace the values' lineage.

## Notable decisions

- **There is no 16px in the spacing.** The first among 30 samples, which brought
  **the count of spacing values with no exception to zero** (`tokens/scales.md`)
- **The multipliers are 1·2·3·5·8·10·12** — a curated list omitting ×4, ×6, ×7, ×9 and ×11
- **The middle value `md` is 20px** — the slot most systems give to 16px
- **Even the breakpoints are notated as BASE multiplications** — the values match
  Bootstrap
- **The font scale has no 16 either** (14 → 18)
- **Monospace sizes are 1px smaller than the proportional ones** (confirmed in the legacy
  package)
- **Borders are 1 and 3px** — the only composition without 2px
- **Shadows are functions taking a colour**
- **Twelve opacity steps of 0.08** — the most in the sample

## Accessibility

No stated target confirmed. The opacity and shadow structure (the `0 0 0 Npx` used for
focus rings) reads as being used for focus expression, but no specification figures are
in the source.

## Notes

- Documentation: https://garden.zendesk.com (blocked by the proxy)
- Tokens: `npm pack @zendeskgarden/react-theming@9.15.7` → `dist/index.cjs.js`
- Legacy CSS variables: `@zendeskgarden/css-variables@7.0.0` (dormant since 2024)
- **Still to confirm:** the colour palette (the `palette` / `colors` structure), the
  component list, the licence, and whether the current package has monospace sizes
- **Licence resolved (2026-08-18):** `Apache-2.0` — source: github
  zendeskgarden/react-components → `LICENSE.md` (matching the npm
  `@zendeskgarden/react-theming@9.15.7` metadata)
