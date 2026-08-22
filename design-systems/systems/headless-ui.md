---
name: Headless UI
org: Tailwind Labs
coverage: minimal
url: https://headlessui.com
repo: https://github.com/tailwindlabs/headlessui
license: MIT
tech: [React, Vue]
figma_kit: false
tokens_format: [none — 0 CSS]
a11y_target: unverified (accessibility is the product itself — no stated target found)
platform: web
domain: framework
verified: 2026-08-17
source: "npm pack @headlessui/react@2.2.10 → dist/ (confirmed 0 CSS files)"
---
<!-- lang-links -->
> **English** · [한국어](headless-ui.ko.md)
<!-- /lang-links -->

## In one line

Tailwind Labs' **unstyled behaviour components** — the package ships **0 bytes of
CSS**. Together with Ark UI (0 tokens, 0 CSS, anatomy only) it is the second
sample of a **"system with no style layer"**, and the two sit differently: Ark
ships state machines and anatomy, Headless UI ships **finished behaviour
components** (open/close, keyboard, focus management all implemented).

## Structure

- Roughly 40 component directories — button · checkbox · combobox (split into 7) ·
  dialog · disclosure · field/fieldset · listbox · menu · popover · radio-group ·
  switch · tabs · transition …
- **The styling hooks are `data-*` state attributes** — `data-open` · `data-active` ·
  `data-disabled` and so on, on the assumption that the consumer attaches Tailwind
  classes to them (the same state vocabulary shadcn/ui-style CSS aims at)
- Two implementations, React and Vue; by its own description "designed to integrate
  beautifully with Tailwind CSS"

## Where it sits in this corpus

| Family | Samples | What ships |
|--------|---------|------------|
| Behaviour + style | many (MUI, Mantine…) | components + CSS |
| Behaviour only | **Headless UI** · Radix Primitives | components, 0 CSS |
| Anatomy only | Ark UI | state machines + part names |
| Style only | Tailwind · Open Props | tokens/utilities, 0 behaviour |

**Tailwind Labs ships both ends** — "style only" (Tailwind) and "behaviour only"
(Headless UI). One organisation turning the separation principle into a product line.

## Notable decisions

- 0 bytes of CSS — every visual decision delegated to the consumer
- The `data-*` state vocabulary is the de facto public API (shadcn and others aim at it)
- combobox split into 7 parts

## Accessibility

Unverified — "fully accessible" is the product's slogan, but no explicit WCAG target
ships with the package.

## Notes

- **Still to confirm:** per-component keyboard specifications on the docs site,
  and the v2 anchor positioning API
