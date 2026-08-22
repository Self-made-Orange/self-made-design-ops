---
name: vanilla-extract
org: Open source (out of SEEK — same roots as Braid)
coverage: minimal
url: https://vanilla-extract.style
repo: https://github.com/vanilla-extract-css/vanilla-extract
license: MIT
tech: [build-time CSS-in-TS]
figma_kit: false
tokens_format: [none — ships no values]
a11y_target: not applicable
platform: web
domain: framework
verified: 2026-08-17
source: "npm pack @vanilla-extract/css@1.21.2 → dist/ (confirmed 0 default tokens)"
---
<!-- lang-links -->
> **English** · [한국어](vanilla-extract.ko.md)
<!-- /lang-links -->

## In one line

"Zero-runtime Stylesheets-in-TypeScript" — **token infrastructure that ships no
values at all**. With `createTheme` / `createThemeContract` the consumer declares
their own tokens as types, and the build freezes them into static CSS variables.
If Panda is an engine that hands you values, vanilla-extract is **an engine that
hands you only the vessel for them**.

## Where it sits in this corpus

- The origin sample for the **theme contract** idea — declare the *shape* of the
  tokens first, then fill it with several sets of values (light/dark, per brand).
  Braid (SEEK) is a real consumer and the two projects share roots: Braid's
  grid-multiple tokens stand on this contract.
- It completes the three-way comparison of style engines:

| Engine | Ships values | Approach |
|--------|:---:|----------|
| Tailwind | yes | one base + generation |
| Panda | yes | enumerated preset |
| **vanilla-extract** | **no** | **contract only — values are the consumer's** |

## Notable decisions

- Zero default tokens — the distribution itself proves this is a tool for building
  systems, not a system
- Type-safe token contracts — a missing value is a compile error
- Zero-runtime — the build output is static CSS

## Notes

- Why it is in the corpus: it is the token infrastructure under real samples such as
  Braid, and it samples the tooling end of the "no style layer" classification
  (GLOSSARY)
- **Still to confirm:** how conventionally sprinkles (the utility generator) is used
  with established scales
