---
name: Panda CSS
org: Chakra team (Segun Adebayo and others)
coverage: minimal
url: https://panda-css.com
repo: https://github.com/chakra-ui/panda
license: MIT
tech: [build-time CSS-in-JS, TypeScript]
figma_kit: false
tokens_format: [JS preset]
a11y_target: unverified
platform: web
domain: framework
verified: 2026-08-17
source: "npm pack @pandacss/preset-base@1.12.0 + @pandacss/preset-panda@1.12.0 → dist/index.mjs"
---
<!-- lang-links -->
> **English** · [한국어](panda-css.ko.md)
<!-- /lang-links -->

## In one line

The Chakra team's build-time style engine. Its default token set (`preset-panda`)
**enumerates Tailwind's values verbatim** while **adding half-steps (4.5, 5.5) and a
`2xs`**. Where Tailwind is "one base plus generation", Panda **enumerates the same
values as tokens** — a direct sample of the generate-versus-enumerate contrast on
the GLOSSARY's "three systems with no spacing scale" axis.

## Tokens (preset-panda)

| Axis | Values |
|------|--------|
| Spacing | identical to Tailwind's enumeration (0.125rem steps) + **added half-steps 4.5 (18px) and 5.5 (22px)** |
| Font size | xs–9xl with **`2xs` (8px) added** — a bottom step Tailwind does not have |
| Radii | identical to Tailwind (2–32px + full 9999px) |
| Easing | `default (0.4,0,0.2,1)` + in/out/in-out — **the M3 Legacy curves as-is** |
| Duration | **seven steps, 50–500ms** (fastest–slowest) — an axis Tailwind does not ship |
| Breakpoints | identical to Tailwind (640–1536) |
| Container | **twelve steps** (320–1440px) |
| Aspect ratio | square · landscape · portrait · wide · ultrawide · **golden (1.618)** |

- This is the **third shipped form of the Tailwind value lineage** — Tailwind
  (generates) → shadcn (inherits) → **Panda (enumerates and extends)**. What was
  added (half-steps, `2xs`, durations) doubles as a list of where the original fell
  short in practice.
- `preset-base` ships **utility definitions** (75KB) rather than values, distributed
  separately from the value layer (`preset-panda`).

## Where it sits in this corpus

**Ark UI (behaviour) and Panda (style) come from the same team** — the Chakra v3
ecosystem decomposed into Zag (state machines) → Ark (components) → Panda (style
engine). It is the second instance of a "behaviour and style split across a product
line", after the Headless UI / Tailwind pair from Tailwind Labs.

## Notable decisions

- Re-ships Tailwind's values in enumerated form, extended with half-steps
- Seven duration steps — filling the motion axis Tailwind leaves out
- A golden (1.618) aspect-ratio token — the only one in the sample
- Build-time generation, so no runtime CSS-in-JS cost

## Accessibility

Unverified.

## Notes

- **Still to confirm:** the real values in the semantic token layer
  (`semanticTokens`), which recipes ship by default, and whether values are shared
  with Chakra v3 proper
