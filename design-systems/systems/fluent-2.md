---
name: Fluent 2
org: Microsoft
coverage: full
url: https://fluent2.microsoft.design
repo: https://github.com/microsoft/fluentui
license: MIT
tech: [React, Web Components, Windows, iOS, Android]
figma_kit: true
tokens_format: [JS, CSS]
a11y_target: "WCAG 2.1 AA (stated — confirmed 2026-08-18)"
platform: [web, desktop, mobile]
domain: enterprise
verified: 2026-08-18
source: "npm @fluentui/tokens@1.0.0-alpha.24 → lib/global"
---
<!-- lang-links -->
> **English** · [한국어](fluent-2.ko.md)
<!-- /lang-links -->

## In one line

The design system across Microsoft's products (Office, Teams, Windows), with wide
multi-platform coverage.

## Tokens

### Spacing

Uses **t-shirt size naming**, and ships tokens with the axis (horizontal/vertical)
separated.

| Name | Value |
|------|-------|
| `none` | 0 |
| `xxs` | 2px |
| `xs` | 4px |
| `sNudge` | 6px |
| `s` | 8px |
| `mNudge` | 10px |
| `m` | 12px |
| `l` | 16px |
| `xl` | 20px |
| `xxl` | 24px |
| `xxxl` | 32px |

The raw `spacings` object is **deliberately not exported.** Consumers must use the
axis-bearing form.

```
spacingHorizontalM / spacingVerticalM   (= 12px)
```

Source: `@fluentui/tokens@1.0.0-alpha.24` → `lib/global/spacings.js`

### Radii

| Token | Value |
|-------|-------|
| `borderRadiusNone` | 0 |
| `borderRadiusSmall` | 2px |
| `borderRadiusMedium` | 4px |
| `borderRadiusLarge` | 6px |
| `borderRadiusXLarge` | 8px |
| `borderRadius2XLarge` | 12px |
| `borderRadius3XLarge` | 16px |
| `borderRadius4XLarge` | 24px |
| `borderRadius5XLarge` | 32px |
| `borderRadius6XLarge` | 40px |
| `borderRadiusCircular` | 10000px |

Source: `lib/global/borderRadius.js`

### Typography / colour

Unverified — `fontSizes.js` and `brandColors.js` inside `lib/global/` still need
checking.

## Components

~~Unverified~~ → **button deep-dive (2026-08-17, `@fluentui/react-button@9.11.0` —
parsed from the build output of Griffel CSS-in-JS's serialised atomic classes).**

- **There are minimum-width tokens for buttons** — small 64px / medium **96px**
  (icon-only is 24/32/40 square). After Carbon's 176px this is the **second sample of
  a button minimum-width specification** — at about half the value.
- Height is not a fixed value but **derived from a line-height variable plus vertical
  padding** (`--lineHeightBase200/300/400` + 3/5/8px) — the same derived family as
  GOV.UK and Primer, implemented in CSS-in-JS.
- Styles are **serialised atomically** (`.fneth5b{padding:3px …}` — one class, one
  declaration). The same atomic-compilation camp as Atlassian Compiled.

## Notable decisions

- **Horizontal and vertical spacing are separated.** `spacingHorizontalM` and
  `spacingVerticalM` currently hold the same value but are separate tokens — a design
  that leaves room to tune the axes differently later. Most systems keep a single
  spacing scale, so this stands out.
- **The raw scale is not exported.** `spacings` carries a comment pinning it down as
  "Intentionally not exported", and only the axis-bearing tokens are public — blocking
  misuse at the API level.
- **There are "Nudge" intermediate steps.** `sNudge` (6px) and `mNudge` (10px) fill
  the even 2px gaps — an escape hatch for cases like icon alignment that the standard
  steps do not fit.
- **There are a lot of radius steps.** Eleven, the most granular of any system
  confirmed so far (Polaris has ten). Carbon and Primer are unverified and so were
  left out of the comparison.

## Accessibility

~~Unverified.~~ → **WCAG 2.1 AA (resolved 2026-08-18).**
Source: `fluent2.microsoft.design/accessibility/` — "components meet or surpass WCAG
2.1 AA standards". Colour separately states "must pass WCAG AA contrast ratios" (4.5:1
for body text).

## Notes

- Repository: https://github.com/microsoft/fluentui
- Token package: `@fluentui/tokens`
