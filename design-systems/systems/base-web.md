---
name: Base Web
org: Uber
coverage: partial
url: https://baseweb.design
repo: https://github.com/uber/baseweb
license: MIT
tech: [React]
figma_kit: true
tokens_format: [JS]
a11y_target: "Confirmed to state none (2026-08-18 — only a runtime axe-core validator is provided, with no WCAG version or level target)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm baseui@18.2.0 → themes/shared/sizing.js (re-verified against 16.1.1 — no change to the sizing tokens)"
---
<!-- lang-links -->
> **English** · [한국어](base-web.ko.md)
<!-- /lang-links -->

## In one line

Uber's design system, covering consumer services (rides, delivery) and internal tools alike.

## Tokens

### Size / spacing — dense at 2px steps

| token | value |
|------|-----|
| `scale0` | 2px |
| `scale100` | 4px |
| `scale200` | 6px |
| `scale300` | 8px |
| `scale400` | 10px |
| `scale500` | 12px |
| `scale550` | 14px |
| `scale600` | 16px |
| `scale650` | 18px |
| `scale700` | 20px |
| `scale750` | 22px |
| `scale800` | 24px |
| `scale850` | 28px |
| `scale900` | 32px |
| `scale950` | 36px |
| `scale1000` | 40px |
| `scale1200` | 48px |
| `scale1400` | 56px |
| `scale1600` | 64px |
| `scale2400` | 96px |
| `scale3200` | 128px |
| `scale4800` | 192px |

**The 2–24px range is filled completely at 2px steps** (2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 ·
18 · 20 · 22 · 24) — going further than Canvas (Workday), which fills up to 20px.

Source: `baseui@18.2.0` → `themes/shared/sizing.js`

### The irregularity of the numbering

The numbers bear no constant proportion to the values.

| interval | number gap | value gap |
|------|:---:|:---:|
| `scale0` → `scale100` | 100 | 2px |
| `scale500` → `scale550` | 50 | 2px |
| `scale800` → `scale850` | 50 | 4px |
| `scale1000` → `scale1200` | 200 | 8px |
| `scale3200` → `scale4800` | 1600 | 64px |

**The same gap of 50 is 2px in one place and 4px in another.** Intermediate numbers like
`550`, `650`, `750`, `850` and `950` exist. The same unevenness appears in Spectrum
(`85`, `350`).

### Radius (2026-08-18, `themes/shared/borders.js`)

| token | value |
|------|-----|
| `radius100` | 2px |
| `radius200` | 4px |
| `radius300` | 8px |
| `radius400` | 12px |
| `radius500` | 16px |

Above the five raw steps sit **component-specific tokens**:
`buttonBorderRadius` 8 · `inputBorderRadius` 8 (mini 4) · `popoverBorderRadius` 8 ·
`tagBorderRadius` 24 · **`checkboxBorderRadius` 0** · **`surfaceBorderRadius` 0**
(used by Card, Datepicker and Drawer — a dual system with round controls and square surfaces.
Modal, however, uses `radius500` directly rather than this token).

### Motion tokens (2026-08-18, `themes/shared/animation.js`)

**Seventeen durations** (0 · 100–1000ms in hundreds, plus 150/250 · 1500 · 3000 · 5000 ·
7000ms) — the second most after Canvas (20 steps, `patterns/motion.md`), and the 7000ms
ceiling is the highest in the sample (Canvas tops out at 1000ms, Codex at 2000ms).

The easings carry **two naming generations coexisting in the same file**:

| new name (semantic) | old name (curve name) | value |
|------|------|-----|
| `easeLinear` | `linearCurve` | `cubic-bezier(0, 0, 1, 1)` |
| `easeDecelerate` | `easeOutQuinticCurve` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `easeAccelerate` | `easeInQuinticCurve` | `cubic-bezier(0.64, 0, 0.78, 0)` |
| `easeAccelerateDecelerate` | — | `cubic-bezier(0.83, 0, 0.17, 1)` |
| `easeResponsiveAccelerate` | — | `cubic-bezier(0.11, 0, 0.5, 0)` |
| — | `easeOutCurve` | `cubic-bezier(.2, .8, .4, 1)` |
| — | `easeInCurve` | `cubic-bezier(.8, .2, .6, 1)` |
| — | `easeInOutCurve` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| — | `easeInOutQuinticCurve` | `cubic-bezier(0.86, 0, 0.07, 1)` |

**Actual component use clusters on the old names** (grepping every component in 18.2.0):
`easeOutCurve` 28 times · `easeOutQuinticCurve` 7 · `linearCurve` 6 ·
`easeInOutQuinticCurve` 4, with **the four new names at zero** — the semantic renaming layer
exists only in the token file and has not penetrated the components.

### Typography / colour

`themes/shared/typography.js`: two tiers — a numeric scale `font100`–`font1050` with semantic
aliases such as `ParagraphSmall`, `LabelMedium` and `HeadingLarge` above it.
The Label family is all weight 500; the Paragraph family is normal.
Colour is unverified — only the per-theme light/dark override structure is confirmed.

## Components

~~Unverified.~~ → see the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

Parsed from the per-component `styled-components.js` (JS object styles) of `baseui@18.2.0`,
with the referenced `$theme.sizing/typography/borders` tokens resolved to real values.

### Buttons (`button/styled-components.js`) — no declared height, aligned to the scale

No height is declared; it **derives from the label's line height plus block padding.**

| | mini | compact | **default** | large |
|---|:--:|:--:|:--:|:--:|
| type (Label*) | 12/16 | 14/16 | 16/20 | 18/24 |
| block padding | 6px | 10px | 14px | 16px |
| inline padding | 8px | 12px | 16px | 20px |
| **derived height** | **28px** | **36px** | **48px** | **56px** |
| min-width (fill only) | 52px | 60px | 72px | 80px |

- **The derived heights match the sizing scale exactly** — 28/36/48/56 =
  `scale850/950/1200/1400`. Unlike MUI, which tolerates fractional derived heights (36.5px),
  Base Web **back-calculated line heights and padding to land on the scale values.**
  The same values are also declared as `minHeight` tokens, so the two paths cross-check.
- **The default height is 48px** — not the desktop-web majority (32–36) but the touch-target
  camp. The same reasoning structure as Orbit's 44px (rides and delivery = mobile B2C).
- There are absolute px minimum widths (52–80 = height + 24), but **only when
  `widthType="fill"`** — with hug (the default) there are none. Added as a conditional sample
  to `patterns/button.md`'s "has a minimum width at the code layer" family (Carbon 176 ·
  Fluent 64/96 · MUI 64).
- **The `minHitArea="tap"` prop**: without changing the visual size, it stretches a transparent
  `::before` pseudo-element to **48px** (`scale1200`), expanding the hit area alone.
  Separating visual size from touch target is the same idea as M3's StateLayer (40dp,
  `patterns/form.md`), except M3 applies it always and Base Web makes it an **opt-in prop**
  (defaulting to `click`, no expansion).
- The type is weight **500** at every size, with no uppercase. The radius is 8px at every size
  (a `buttonBorderRadiusMini` 4px token exists but is **used zero times** — a dead token).
  pill = 999px, with separate circle/square icon-only variants.
- Six kinds: primary/secondary/tertiary × three danger variants. The selected state is drawn
  not with a border but with **two stacked box-shadows** (inset 2px + outer 2px), reusing
  `sizing.scale0` (2px) as that thickness — a sample of a spacing token doubling as a border
  width.
- Transition: background only, **200ms `linearCurve`**.

### Inputs (`input/styled-components.js`) — a 2px border

| | mini | compact | **default** | large |
|---|:--:|:--:|:--:|:--:|
| type (font100–400) | 12/20 | 14/20 | 16/24 | 18/28 |
| block padding | 4px | 6px | 10px | 14px |
| inline padding | 14px | 14px | 14px | 14px |
| border | 2px | 2px | 2px | 2px |
| **derived height** | **32px** | **36px** | **48px** | **60px** |

- **The border is 2px** — parting from the 1px majority (Backpack, Orbit and others).
  Since focus only changes the colour, there is no layout shift from a thickness jump.
- **Inline padding is fixed at 14px (`scale550`) across every size** — only the vertical
  tracks the size.
- The default input's 48px aligns with the default button's 48px, and compact's 36 matches the
  button's compact too.
- The type weight is normal (400) — a hierarchy step below the button's 500.
- Radius 8px, **4px only at mini** (`inputBorderRadiusMini` — unlike the button's mini token,
  this one is actually used).
- Labels (`form-control`): a separate block in `font250` (14/16/500), with captions in
  `font100` (12px).
- The border transitions over **200ms `easeOutCurve`**.

### Modals (`modal/styled-components.js`) — one named width

| size | value |
|------|-----|
| `default` | **500px** |
| `full` | 100% |
| `auto` | auto |
| (a numeric prop) | an arbitrary px |

- **There is only one named width, 500px** — added as the second sample to the one-step camp
  in `patterns/modal.md` (shadcn/ui at 512px). 512 vs 500, a 12px difference.
  If you need more steps you pass a number, the opposite pole from the five px steps of
  Cloudscape, Mantine and Orbit.
- Radius **16px** (referencing `radius500` directly — the exception that does not use the
  `surfaceBorderRadius` 0px token).
- Animation: the scrim fades while the dialog **fades and translates Y (20px→0)**, both over
  **400ms `easeOutCurve`**. Unlike MUI (225/195 asymmetric), enter and exit are symmetric.
- The inner space comes not from padding but **from the children's margins**: the title
  (`font550` 20/28/700) mt 32 · ms 24 · me 32 (8px wider at the end, for the close button) ·
  the body mx 24 · the footer mx 24 plus py 12. The close button is 24×24, 12px from the top
  right.
- Scrim `rgba(0, 0, 0, 0.5)`.

### Characteristic decisions (from the deep pass)

- **Derived heights aligned to the sizing scale** (28/36/48/56) — line heights and padding
  back-calculated to hit the scale. The opposite of MUI's tolerance for fractions
- **The `minHitArea` pseudo-element hit expansion** — an opt-in 48px touch target with an
  unchanged visual size
- **The semantic easing renaming has not penetrated** — the four new names used zero times,
  with `easeOutCurve` as the mainline
- **A 2px input border** plus inline padding fixed at 14px
- **One named modal width (500px) plus an arbitrary-number escape hatch**
- **`scale0` (2px) doubling as a border width** — reusing the smallest non-zero spacing token
- **A checkbox radius token of 0px** — the checkbox alone kept square among 8px controls

## Characteristic decisions

- **It keeps 2px steps all the way to 24px.** Twelve steps, the densest lower range among the
  systems collected — wider than Canvas (ten steps to 20px).
- **The proportion between number and value is broken.** `scale550` (14px) and `scale850`
  (28px) both add 50 to the previous step, yet the value increases by 2px and 4px
  respectively. **You cannot compute the value from the number.**
- **`scale0` is 2px, not 0.** There is no zero-valued token, unlike most systems, which keep a
  `space-0: 0`.
- **The top reaches 192px**, larger than Carbon's (160px).
  Spacing and layout sizes are handled by the single `sizing` scale.
- **The structure is per-theme overrides.** Besides `themes/shared/` there are
  `themes/move-theme/` and others, so typography and the rest can be swapped per brand.

## Accessibility

~~Unverified.~~ → **Confirmed absent (2026-08-18, headless render).**

Even rendered, the documentation site **declares no WCAG version or level target anywhere.**
The home page has only the sentence "Built-in accessibility — components are built with
accessibility being a first-class citizen", with no conformance criterion, and the Guides
navigation (Internationalization · Bidirectionality · Theming · Styling · Overrides · Colors)
**contains no accessibility guide at all.**

What it offers instead is characteristic: **a runtime validation component** —
`Unstable_A11y` (`import { Unstable_A11y } from 'baseui/a11y'`, in the Utility category)
inspects the rendered tree at runtime with the **axe-core** library.
It is introduced as an "Experimental utility for validating accessibility at runtime" and
still carries the `Unstable_` prefix.

A case of **shipping an inspection tool as code instead of declaring a target in
documentation** — a `verification` approach rather than a `declaration` one
(classified C — conformance target not published).

Sources: https://baseweb.design/ (the home page's "Built-in accessibility" section) ·
https://baseweb.design/components/unstable-a11y/ (render confirmed, 2026-08-18)

## References

- Repository: https://github.com/uber/baseweb
- Package: `baseui` (the theme and tokens ship inside the component package)
- **Note:** the tokens are not a separate package but live in `themes/shared/*.js` inside
  `baseui`. A general-purpose scanner sweeping for `.json`/`.css` will not find them.
- Components in depth (2026-08-18): `baseui@18.2.0` →
  `button/styled-components.js` · `input/styled-components.js` ·
  `form-control/styled-components.js` · `modal/styled-components.js` ·
  `modal/constants.js` plus `themes/shared/{animation,borders,typography}.js`
- **Figma kit (resolved 2026-08-18 — `figma_kit: true`)**: the home page's
  "Figma Community" section states "You can find all the Base Web components on Figma
  Community."
  The **"Base Gallery"** file published on **Uber's Figma Community profile
  (https://www.figma.com/@uber)** is duplicated by the user, with the procedure described in
  the 2020-02-13 blog post "Base Web on Figma Communities".
  A rare form in the corpus: distribution through **a public Figma Community gallery rather
  than an internal library.**
  Source: https://baseweb.design/blog/base-figma-community/ (render confirmed, 2026-08-18)
