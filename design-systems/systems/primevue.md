---
name: PrimeVue
org: PrimeTek
coverage: partial
url: https://primevue.dev
repo: https://github.com/primefaces/primevue
license: MIT
tech: [Vue, JS]
figma_kit: unverified
tokens_format: [JS]
a11y_target: "WCAG (no version or level stated — confirmed 2026-08-18)"
platform: web
domain: framework
verified: 2026-08-18
source: "npm primevue@5.0.1 + @primeuix/themes@3.0.0 → dist/aura/{base,datatable,tabs,breadcrumb,panelmenu,menu,toast,message,badge} · npm @primeuix/styles@3.0.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](primevue.ko.md)
<!-- /lang-links -->

## In one line

The third Vue-framework sample — the tokens are separated into **preset packages**
(Aura and others in `@primeuix/themes`), references are **DTCG-style brace strings**
(`"{border.radius.md}"`), and form-field padding is **10/6px**.

## Tokens — the preset structure

The components (`primevue`) and the themes (`@primeuix/themes` — presets such as Aura) ship
separately. A single preset carries all three tiers: primitive → semantic → component.

```js
borderRadius: { none 0 · xs 2 · sm 4 · md 6 · lg 8 · xl 12 }
transitionDuration: "0.2s"        // a single duration
fontSize: "0.875rem"              // a 14px base
formField: { paddingX "0.625rem"(10px), paddingY "0.375rem"(6px) }
focusRing: { width: "1px" }
```

- **References are `"{border.radius.md}"` strings inside JS** — the only sample using the
  W3C DTCG alias syntax as a JS value string rather than in CSS variables
- **A 14px base** — the dense-tooling camp. The 10/6 form padding leaves multiples of 4
  (the same position as Mantine's 10)
- One motion value, `0.2s` — a single duration, even tighter than Ant's seed
- Swapping the preset (Aura, Material and so on) changes the entire skin — the same position
  as Mística's skins, in framework grammar

## Components in depth — (2026-08-18)

Measured from the component tokens in `dist/aura` of `@primeuix/themes@3.0.0` (97
directories) plus the structural CSS in `@primeuix/styles@3.0.0` (a dependency of
primevue@5.0.1).

### Buttons — dimensions reference form.field

| | sm | default | lg |
|---|:--:|:--:|:--:|
| padding (block/inline) | 4/8px | **6/10px** | 8/12px |
| type | 12px | 14px | 16px |
| icon-only width | 28px | **36px** | 42px |

- There is no fixed height, and **padding and type are all `{form.field.*}` references** —
  a structure that makes button and input heights **equal by definition**. Where Backpack and
  Semi align the two by writing the same values side by side, Prime **enforces it by
  reference**. The derived height is ~35px (14 × 1.5 + 12 + a 2px border), and the icon-only
  width of 36px is effectively the reference dimension.
- Radius 6px (`border.radius.md`) — shared by buttons and inputs. Label weight 500.
- The variant matrix: **nine colours** (primary · secondary · success · info · warn ·
  **help** · danger · contrast, plus a plain reserved for outlined/text) ×
  **four forms** (solid · outlined · text · link).
  help (purple) is a signature semantic carried over from the PrimeFaces days.
- **Native CSS functions appear inside the token values**:
  `"light-dark({surface.100}, {surface.800})"`, with a dark hover of
  `color-mix(in srgb, {primary.color}, transparent 96%)`.
  An adoption following Porsche (the sample's first `light-dark()` theme), and
  **mixing DTCG alias strings with `light-dark()` and `color-mix()` in one value** is unique
  in the sample.
- Transition 0.2s — enumerating five properties: background, color, border, outline and
  box-shadow.

### Inputs (inputtext) — zero values of its own

- The inputtext tokens are **entirely `{form.field.*}` references** — there is not a single
  component-specific value. The semantic `formField` is the effective input spec: padding
  10/6px, radius 6px, a 1px surface.300 border, shadow `0 1px 2px rgba(18,18,23,.05)`.
- **The focus grammar is split in two**: the global `focus.ring` is an
  **outline 1px solid primary at offset 2px** (used by the button), while form.field's
  focusRing is **width 0 / style none** — the input gets no ring, **only a coloured border**
  (focusBorderColor = primary). A design that separates button = ring from input = border,
  explicitly, in the tokens.

### Dialogs — no width tokens

| | value |
|---|---|
| radius | 12px (`border.radius.xl`) |
| padding | **18px** (1.125rem) — the same for header, content and footer |
| title | 18px / 600 |
| mask | light rgba(0,0,0,.4) / **dark .6** |
| enter/exit | **300ms `cubic-bezier(.19, 1, .22, 1)`**, scale 0.93 ↔ 1, symmetric |

- **There is no width scale** — the dialog tokens contain no width at all; the consumer
  specifies it. A "width undefined" camp, different from MUI (reused breakpoints), Semi
  (three steps) and Cloudscape (five).
- The mask is heavier in dark (.4 → .6) — the same per-mode intensity correction as HeroUI
  (per-mode hover opacity). The mask transition alone is 0.3s, the only exception to the
  global 0.2s.
- The easing `(.19,1,.22,1)` — an easeOutExpo-family hard deceleration used with the same
  curve and the same 300ms for both enter and exit. A third approach after MUI (asymmetric
  time) and Naive (asymmetric curve): complete symmetry.
- 18px padding — after the 10/6 form values, another departure from multiples of 4, now in
  the overlay.

### Tables (`datatable`) — density arrives as sm/lg token pairs

`@primeuix/themes@3.0.0` `dist/aura/datatable`.

| slot | default | sm | lg |
|---|:--:|:--:|:--:|
| headerCell padding | **0.5 / 0.875rem (8 / 14px)** | **0.125 / 0.375rem (2 / 6px)** | 0.75 / 1.125rem (12 / 18px) |
| bodyCell padding | 8 / 14px | 2 / 6px | 12 / 18px |
| footerCell padding | 8 / 14px | 2 / 6px | 12 / 18px |

- **sm's 2px vertical and 6px horizontal are the floor of the collected sample** (the
  previous floor was Polaris's 6px token). The three densities arrive not as a component prop
  but as **`sm`/`lg` keys inside the token object** — a third form, between Cloudscape
  (density as an axis in the token values) and Radix Themes (a size prop).
- **The rules are `borderWidth: "0 0 1px 0"`** — identical for header, footer and paginator,
  with the colour coming from the single token `datatable.border.color`.
- **`root.transitionDuration: "0s"`** — transitions inside the table are switched off
  explicitly. The same conclusion as Semi ("no transitions"), declared as a token.
- The stripe is `row.stripedBackground: light-dark({surface.50}, {surface.950})` —
  **the `light-dark()` CSS function used directly in a token value.**
- The sort icon is **0.75rem (12px)** — the smallest in the collected sample
  (Semi and Vuetify 16 · Carbon 20 · Naive 15).
- Column resizer width 0.5rem (8px), resize indicator 1px, row toggle button a 1.5rem circle.

### Navigation (`tabs` · `breadcrumb` · `panelmenu` · `menu`)

| item | value |
|---|---|
| tab padding | **0.875 / 1rem (14 / 16px)** · weight **600** · gap 8px |
| **active bar height** | **1px** (`activeBar.height`) |
| tab list border | `0 0 1px 0` |
| tab scroll button width | 2.25rem (36px) |
| tab panel padding | 0.75 / 1 / 1 / 1rem |
| nav item padding | **0.25 / 0.625rem (4 / 10px)** · radius `border.radius.sm` |
| nav list padding / gap | 4px · **2px** |
| hierarchy indent | **1rem (16px)** (`panelmenu.submenu.indent`) |
| breadcrumb | container padding 0.875rem · item gap 0.5rem |
| item transition | **`0s`** (`navigation.item.transitionDuration`) |

- **The active bar is 1px** — the thinnest in the collected sample
  (Vuetify, Carbon, Semi, EUI and Chakra at 2 · Blueprint 3). Being the same thickness as the
  tab list's bottom border (1px), **the line does not thicken; only its colour changes.**
- **Nav items have no height token** — they derive from padding (4/10px) plus line height.
  Unlike buttons and inputs, which reference the `form.field` height, navigation is in the
  derived camp.
- The item transition is stated as `0s` — the same attitude as the table.

### Feedback (`toast` · `message` · `badge`)

| item | value |
|---|---|
| **Toast width** | **22rem (352px)** |
| Toast padding | `overlay.popover.padding` = **0.625rem (10px)** · gap 8px |
| Toast radius / border | `content.border.radius` · **1px** |
| Toast transition | **0.3s** · **`blur: 10px`** |
| Toast icon | 1rem, margin `1px 0 0 0` (a first-line correction) |
| Toast summary / detail | 14px · 500 / **12px** · 500 |
| Close button | a 1.5rem circle, icon 0.875rem |
| **Message padding** | 0.375 / 0.625rem (6 / 10px) · sm 4 / 8 · lg 8 / 12 |
| Message icon | 16px · sm 14 · lg 18 |
| **Badge height** | **1.25rem (20px)** · sm 18 · lg 24 · xl 28 |
| Badge padding / type | `0 0.375rem` · **0.625rem (10px)** / weight **700** |

- **The toast has a `blur` token** (10px) — a case of specifying background blur, and the only
  system in the collected sample to make that axis a token.
- **The state colours are `color-mix(in srgb, {colour}, transparent N%)` combinations** —
  info/success/warn/error, contrast and secondary are built at 5% transparency in light and
  84% in dark, and even the shadows differ per state
  (`0px 4px 8px 0px color-mix(… transparent 96%)`).
- **The badge type is 10px at weight 700** — the smallest and the boldest in the collected
  sample (Chakra and Vuetify 12/500 · Ant 12/normal · Semi 12).
- Message occupies the alert's place, yet **its padding of 6/10px is tighter than the toast's
  (10px)** — presupposing an inline message set beside a form field.

### Characteristic decisions (from the deep pass)

- **Button dimensions reference form.field** — button = input height enforced by reference
- **DTCG aliases with light-dark()/color-mix() in one value** — a combination unique in the
  sample
- **Focus split in two** — an outline ring on buttons, a coloured border on inputs (with
  focusRing width 0 stated)
- Dialog width undefined, with a heavier mask in dark (.4/.6)
- A 300ms easeOutExpo, perfectly symmetric modal motion (1.5× the global 0.2s)

## Characteristic decisions

- **DTCG alias strings as JS values** — unique in the sample
- The theme as a preset in a separate package — token/component separation combined with a
  skin structure
- A single transitionDuration · a 14px base · six radius steps (2–12)

## Accessibility

~~Unverified (a focusRing token exists).~~ → **Claims WCAG compliance (resolved 2026-08-18 —
with no version or level given).** Source: `primevue.org` (the current domain redirects to
`primevue.dev`) — "Accessible by Default. WCAG compliant." The focusRing token corresponds to
this.

## References

- **URL moved (confirmed 2026-08-18):** `primevue.org` → `primevue.dev` (301)

- Tokens: `npm pack @primeuix/themes` → `dist/aura/base/index.mjs`
- Components in depth: `dist/aura/{button,inputtext,dialog}/index.mjs` from the same package
  plus `@primeuix/styles@3.0.0` `dist/{button,inputtext,dialog}/index.mjs` (2026-08-18)
- **Open questions:** ~~a global spacing scale (not found in the base preset — judgement
  reserved since the components were not surveyed exhaustively)~~ (resolved 2026-08-18 —
  all 16 semantic keys checked, **confirmed to have no spacing family**: only typography,
  focusRing, formField, overlay, mask and the like), ~~the component list (90+ reported —
  unverified)~~ (resolved 2026-08-18 — **97** component token directories measured in the aura
  preset), and how values differ between presets (aura, lara, material and nora confirmed to
  exist plus *-compat — no value comparison performed)
