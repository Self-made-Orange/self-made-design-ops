---
name: Digital Agency Design System (デジタル庁)
org: Government of Japan (Digital Agency)
coverage: partial
url: https://design.digital.go.jp
repo: https://github.com/digital-go-jp/design-tokens
license: MIT
tech: [CSS]
figma_kit: true
tokens_format: [CSS]
a11y_target: unverified
platform: web
domain: public
verified: 2026-08-18
source: "npm @digital-go-jp/design-tokens@2.0.1 → dist/tokens.css · npm @digital-go-jp/tailwind-theme-plugin@1.0.1 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](digital-go-jp.ko.md)
<!-- /lang-links -->

## In one line

Japan's government system. **Line height is eight pure ratios from 1 to 1.75** (the most in
the sample), weight is **just 400/700**, and the scale contains **17px** — the first sample
to fill in the CJK typography gap.

## Tokens — 241 of them

`--color` 198 · `--font` 19 · `--line` 8 · `--elevation` 8 · `--border` 8.
**There are no spacing tokens** — the fifth in the Apple HIG / Material 3 / Seed / Evergreen
family.

## Typography — the first CJK measurements

15 size steps (the name is the px value):

```
14 · 16 · 17 · 18 · 20 · 22 · 24 · 26 · 28 · 32 · 36 · 45 · 48 · 57 · 64
```

- **17px is present** — the third after Apple (17pt Body) and KRDS (body.medium 17px).
  **All three are CJK contexts** (iOS globally / Korea's government / Japan's government).
  The tokens assign no roles, so whether it is the body default is undetermined
- **45 and 57 are exactly Material 3's Display Medium/Large** — the top of the scale,
  36/45/57, matches M3. The source mentions no relationship
- The 14–28px stretch is dense, in 2px steps (with 17 as the exception)

**Line height — eight pure ratios, the most in the sample:**

```
1 · 1.2 · 1.3 · 1.4 · 1.5 · 1.6 · 1.7 · 1.75
```

Most of the sample either fixes line height in px per size or offers one to three ratios
(`patterns/typography.md`). **Only the Digital Agency goes to eight, down to a step as
loose as 1.7** — Japanese body-text practice (looser leading) showing up as the width of
the scale, though the source gives no rationale.

**Weight — only 400 and 700:**

Exactly KRDS's composition (Regular/Bold). **Both CJK government systems ship two
weights** — the opposite extreme from nine weights in hundreds (Tailwind, Chakra). This
lines up with how many real weight files CJK typefaces ship, but no rationale is recorded.

Typefaces: **Noto Sans JP** / Noto Sans Mono.

### Colour — four families

```
primitive 151 · neutral 26 · key 13 · semantic 8
```

**The `key` family stands apart** — 13 core brand colours sitting between the semantic
layer (8) and the primitives (151). The same position as Seed's three-tier `static`, under
a different name.

### Radius — the name is the px value

```
--border-radius-4/6/8/12/16/24/32 + full (624.9375rem = 9999px)
```

Primer's value-as-name approach. **Converting `full` into rem** (9999px ÷ 16) is a notation
unique in the sample.

### Elevation — eight steps of doubled shadow

`--elevation-1` through `8`, every step a **pair: a diffuse shadow plus a close one**.

## Components

~~Not in the token package.~~ → Not on npm, but **shipped from the official GitHub
repository** — see the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

There is no component package on npm (confirmed via the search API — the `@digital-go-jp`
scope holds only design-tokens, tailwind-theme-plugin and abr-*), and the official
components are **`digital-go-jp/design-system-example-components-react` v2.7.0** (GitHub,
MIT, most recent commit 2026-08-05) plus an `-html` edition of the same content. 46
components (Accordion through UtilityLink, plus deprecated/v1). The implementation is not
a CSS distribution but an **export of Tailwind class strings** (presupposing
`@digital-go-jp/tailwind-theme-plugin@1.0.1`) — a government edition of shadcn's
copy-the-source distribution.

### Buttons — four steps, and small ones get a 44px hit area from a pseudo-element

| | lg | md | sm | xs |
|---|:--:|:--:|:--:|:--:|
| min-height | **56px** | 48px | 36px | 28px |
| min-width | 136px | 96px | 80px | 72px |
| radius | 8px | 8px | 6px | 4px |
| padding (x/y) | 16/12px | 16/8 | 12/2 | 8/2 |
| type | 16px · 700 · line-height 1 | same | same | **14px** · 700 |

- **sm and xs stretch an `after:` pseudo-element vertically to guarantee a 44px hit
  area** — a button 28px tall visually still has a 44px touch target. This is WCAG 2.5.5 /
  Apple's 44pt implemented in code, and a rare case in the sample of separating visual size
  from target size.
- Three variants — solid-fill / outline / text — and **all three add an underline on
  hover** (state is not signalled by colour alone).
- The solid-fill border is **4px double, in the background colour** — invisible normally,
  it survives as an outline in forced-colors mode.

### Inputs — the type forbids placeholders

Three heights, `sm/md/lg` = **40/48/56px, with lg (56px) as the default**. Radius 8px,
border 1px (solid-gray-600), turning black on hover.

- **`placeholder?: never`** — the TypeScript type forbids the placeholder prop outright.
  "Use a label" enforced by the type system; unique in the sample.
- Read-only is distinguished by a **dashed border** (a border style, not a background
  colour).

### Modals — a native dialog plus container queries

- The `<dialog>` element with `::backdrop`. Content radius 8px, **a 1px black border**,
  min-width `min(30rem, 100cqw - 2rem)` — a width floor set in container-query units (cqw).
- There are no width presets — a `--modal-dialog-width` variable (default fit-content).
- The dialog itself is `color-scheme: dark` while the content box is light — a dual colour
  scheme that darkens only the scrim and the scrollbars.
- `shrink-[9999]` spacers above and below (120px by default, 16px minimum) — an elastic
  structure where overflow eats the whitespace first.
- Closing is not an icon alone but **an X alongside the text "閉じる"**.

### Focus — a double ring, yellow inside and black outside

Common to every component: `ring 2px yellow-300` (hugging the element) plus
`outline 4px black offset 2px` outside it. The same yellow-and-black pairing as the GOV.UK
family, except **the black is on the outside**. On the text variant of the button, focus
turns the background itself yellow.

Source: measured from `src/components/*/*.tsx` in the repository; the actual values behind
the radius and type classes were resolved from `dist/index.es.js` in
`@digital-go-jp/tailwind-theme-plugin@1.0.1` (`rounded-8` = 8px, `oln-16B-100` = 16px/700/
line-height 1, `std-16N-170` = 16px/400/1.7).

## Characteristic decisions

- **Eight pure line-height ratios** — the most in the sample; the first data on the CJK
  leading axis
- **Weights 400/700** — the same two steps as KRDS. A shared CJK-government pattern
  (2 of 2 in the sample)
- **17px present** — the third, and all three are CJK contexts
- The top of the scale (36/45/57) **matches Material 3's Display**
- **No spacing tokens** — the fifth
- The `key` colour family — a brand layer between primitive and semantic
- Sixth public-sector sample: counting the missing spacing scale, the only thing the public
  sector reliably shares is still **its accessibility structure**

## Accessibility

This package carries no high-contrast or colour-contrast tokens. The JIS/WCAG target is
unverified.

## References

- Tokens: `npm pack @digital-go-jp/design-tokens@2.0.1` → `dist/tokens.css`
- Components: GitHub `digital-go-jp/design-system-example-components-react`
  v2.7.0 (MIT) — the deep pass above (2026-08-18)
- **Open questions:** the role assigned to each size (confirming the body default), the
  colour primitive structure, the Figma kit in detail, the licence (of the token package —
  the component repository is confirmed MIT)
- **Licence resolved (2026-08-18):** `MIT` — source: github digital-go-jp/design-tokens →
  `LICENSE` (matching the npm metadata for `@digital-go-jp/design-tokens@2.0.1`)
