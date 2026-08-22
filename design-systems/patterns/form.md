<!-- lang-links -->
> **English** · [한국어](form.ko.md)
<!-- /lang-links -->

# Form

**A cross-system comparison of the input controls (Input · Select · Checkbox · Radio).**

> **This document only became writable once the three framework-family systems
> (shadcn/ui · Mantine · Radix Themes) came in.** All three publish their component CSS and
> source, so **heights, padding, radii and state colours can be read as values.**
>
> Before that the evidence was a handful of Cloudscape's `space-field-*` tokens
> (see "what remains to be written" in `README.md`).
>
> **Guidance such as label position, required marking and when to show errors still lives
> only on the documentation sites.**
> What follows is only what could be confirmed from tokens and source.

## Input field height

| system | values | default |
|--------|-----|:---:|
| **Mantine** | 30 / 36 / 42 / 50 / 60px | **36 (`sm`)** |
| **Radix Themes** | 24 / 32 / 40px | 32 (size 2) |
| **shadcn/ui** | **a single 36px** | 36 |
| Ant Design | 32px (the `controlHeight` seed) | 32 |
| **Cloudscape** | **`size-vertical-input` 32px / compact 28px** | 32 |
| **Apple iOS (search field)** | **top 44 / bottom 48pt** | — |

**Apple's search-field height parts by position on screen** — 44pt at the top, 48pt at the
bottom. Exactly the same pattern as its button touch targets of top 44 / bottom 48
(`button.md`).
**Apple is the only system in the sample to split input height by screen position.**

The search field is 190pt wide in both positions, with three states: `Placeholder` /
`Typing` / `Value`. The iPad search accessory is 820 × 44 with `Show Filters` True/False
variants.

### Does it share heights with the button?

| system | Button | Input | match |
|--------|--------|-------|:---:|
| **Mantine** | 30/36/42/50/60 | 30/36/42/50/60 | **a complete match** |
| Radix Themes | 24/32/40/**48** | 24/32/40 | matching to three steps, **no 48** |
| **shadcn/ui** | 24/32/36/40 | **a single 36** | only the default matches |

**Only Mantine matches completely.** `--button-height-*` and `--input-height-*` hold the
same values, and so does `--section-height-*`. Placing a button beside an input in a form,
the same `size` prop aligns them.

**Radix Themes has no size 4 (48px) for inputs.** The button has four steps and the input
three. Put `<Button size="4">` next to `<TextField size="4">` and the heights disagree.

**shadcn/ui has no input size variants at all.** The button has four steps while the input
is a single 36px. Only the Select trigger has a 32px variant via `data-[size=sm]:h-8` —
**it differs per component.**

| shadcn/ui control | size variants |
|------------------|-----------|
| Button | 4 (24/32/36/40) |
| Select trigger | 2 (32/36) |
| **Input** | **1 (36)** |
| Checkbox | 1 (16) |

## Input padding

| system | inline | block |
|--------|:---:|:---:|
| **shadcn/ui** | 12 (`px-3`) | 4 (`py-1`) |
| **Radix Themes** (size 1) | **5** (`calc(space-1 * 1.5 - 1px)`) | — |
| **Radix Themes** (size 2) | **7** (`calc(space-2 - 1px)`) | — |
| **Radix Themes** (size 3) | **11** (`calc(space-3 - 1px)`) | — |
| **Cloudscape** | **12px** (`space-field-horizontal`) | **5px** / compact **3px** (`space-field-vertical`) |

### Cloudscape — only the vertical responds to density

| token | comfortable | compact |
|------|:---:|:---:|
| `space-field-vertical` | **5px** | **3px** |
| `space-field-horizontal` | 12px | **12px** (unchanged) |
| `size-vertical-input` | 32px | 28px |

**The horizontal padding is 12px regardless of density.** Only the vertical shrinks from 5
to 3px, taking the field height from 32 to 28px.

**5px and 3px are odd numbers** — rare values in the sample.
`32 − 5×2 − 2 border = 20px` becomes the text area, which matches the 20px line height of
Cloudscape's body (14px). **The source gives no rationale.**

**Cloudscape's 12px horizontal padding is exactly shadcn/ui's (12px).**

### Radix Themes subtracts the border width from the padding

```css
--text-field-padding: calc(var(--space-2) - var(--text-field-border-width));
/*                          8px          -  1px  = 7px */
```

**It subtracts the 1px border to keep the visual inner margin at 8px.**
In a variant where `--text-field-border-width` is `0px` (`variant="soft"`) it stays 8px.

**Radix Themes is the only system in the sample to account for the border width in its
padding computation.** The others leave it to `box-sizing: border-box` and keep padding
constant.

Mantine does a similar back-computation — except its target is **the line height**.

```css
--input-line-height: calc(var(--input-height) - calc(0.125rem * var(--mantine-scale)));
/*                        36px               -  2px  = 34px */
```

**It uses the height minus 1px of border top and bottom as the line height.**
The text is centred vertically within the field by `line-height` (rather than `padding`).

### Radix Themes' `text-field.css` — the left inset is a `text-indent`, not padding

Four practical accommodations confirmed in the full component CSS:

- **`text-indent`**: the left inset is given as `text-indent` rather than `padding-left` —
  a choice, as the source comment says, "so a long value is not clipped when the cursor is
  at the end". Date and time inputs revert to padding because of a Safari bug —
  **the per-browser exception is stated in the source.**
- **The focus ring is drawn on the Root (the wrapper) rather than the input** —
  `:has(.rt-TextFieldInput:focus)` (with a `:focus-within` fallback on unsupporting
  browsers, branched with `@supports selector()`). The ring wraps the left and right slots
  (icons, buttons) too.
- **Slot placement is independent of DOM order** — combining `order: -1` with sibling
  selectors, two slots without a specified side are divided automatically between left and
  right.
- **A 0.5px sub-pixel correction**: `padding-bottom: 0.5px` on size 2 alone — a 1px baseline
  jitter guard matched to "Chrome computing the input's text box as 16.5px on an @2x
  display" (the source comment even states the observation date, November 2023).
- The inner radius is `calc(outer radius − border width)` — the same principle as the
  padding back-computation applied to radius (the nested-radius formula).

## Radius

| system | value |
|--------|-----|
| **shadcn/ui** | 8px (`rounded-md`) — the same as the button |
| **Radix Themes** | **`max(var(--radius-2), var(--radius-full))`** |
| Mantine | the global scale (default `md` 8px) |
| Ant Design | a single global 6px |

### Radix Themes' `max()` — it becomes a pill in the `full` theme

```css
--text-field-border-radius: max(var(--radius-2), var(--radius-full));
```

With `data-radius="full"`, `--radius-full: 9999px`, so **the input field becomes a complete
pill**; otherwise it is `--radius-2` (4px × the factor).

**It picks the larger of two values with `max()`**, handling it on one theme axis without a
conditional branch. Progress and Slider follow the same pattern.

## Checkbox size

| system | values | default | indicator |
|--------|-----|:---:|:---:|
| **Mantine** | 16 / 20 / 24 / 30 / 36px | **20 (`sm`)** | unverified |
| **Radix Themes** | **14 / 16 / 20px** | 16 (size 2) | **9 / 10 / 12px** |
| **shadcn/ui** | **a single 16px** | 16 | 14 (`size-3.5`) |

**The three meet at 16px.** Mantine `xs`, Radix size 2 and shadcn/ui's single value are all
16px. Carbon is 16px too (measured in `@carbon/styles`, 2026-08-17).

**GOV.UK breaks this convergence at 40px** — 40px visually plus a 44px touch target (a 4px
gutter), with even the small variant at 24px. The check mark is drawn not as an image but
with a CSS border (23×12px, `border-width: 0 0 5px 5px`). The radio even applies **a
curvature correction** to its focus ring, at 3px + 1px. The "convergence on 16px" is a
convergence of consumer and enterprise web; a government service premised on low vision and
motor constraints **enlarges the control itself by 2.5×**
(`systems/govuk.md`).

### Radix Themes derives the checkbox from spacing tokens

```css
--checkbox-size: calc(var(--space-4) * 0.875);   /* 16 × 0.875 = 14 */
--checkbox-size: var(--space-4);                 /* 16 */
--checkbox-size: calc(var(--space-4) * 1.25);    /* 16 × 1.25 = 20 */
```

**It multiplies one base, `--space-4` (16px), by 0.875 / 1 / 1.25.**
The same method as the button heights being `--space-5`–`8` — **every component dimension
comes out of the spacing tokens.**

The radius is a factor too — `calc(var(--radius-1) * 0.875)` / `var(--radius-1)` /
`calc(var(--radius-1) * 1.25)`. **Size and radius grow together at the same ratio.**

### In shadcn/ui only the checkbox radius is a literal

```
peer size-4 shrink-0 rounded-[4px] border border-input
```

**`rounded-[4px]`** — the only place that does not ride the `--radius` factor system.
Every other control is `rounded-md` (8px). An 8px radius on a 16px element approaches a
semicircle, hence the hardcoded value — but **the source does not record the reason.**

The indicator (the check icon) is 14px, 87.5% of its 16px container —
far larger than Radix Themes' 9/16 = 56% and 10/16 = 62.5%.

| system | container | indicator | ratio |
|--------|:---:|:---:|:---:|
| **shadcn/ui** | 16 | **14** | **87.5%** |
| Radix Themes (size 2) | 16 | 10 | 62.5% |
| Radix Themes (size 1) | 14 | 9 | 64% |

**shadcn/ui's check mark is relatively far larger.**

## Radio · Switch — measured in Mantine (`Radio.css` · `Switch.css`)

The real values of the two neighbouring controls that use the same series as the checkbox
(the checkbox indicator itself remains unverified — `CheckboxIndicator` injects an SVG).

### Radio — five steps plus a pop animation

| axis | xs / sm / md / lg / xl |
|----|------|
| container | 16 / **20 (default)** / 24 / 30 / 36px |
| dot | 6 / 8 / 10 / 14 / 16px (33–47% of the container) |

The dot enters with **`scale(0.2) + translateY` → `scale(1)`** — a **double transition** of
opacity over 100ms and transform over 200ms, so it grows and keeps moving late: a pop
effect. A case of using transitions alone, with no keyframes, for a state change.

The `outline` variant does not fill the background when checked; only the border and dot
take colour.

### Switch — five axes, each enumerated over five steps

| axis | xs / sm / md / lg / xl |
|----|------|
| height | 16 / **20 (default)** / 24 / 30 / 36px |
| width | 32 / 38 / 46 / 56 / 72px |
| thumb | 12 / 14 / 18 / 22 / 28px |
| in-track label type | **5 / 6 / 7 / 9 / 11px** |
| thumb-to-track gap | 2 / 2.5 / 3 / 3 / 3.5px |

- The width/height ratio is not constant (xs 2.0 → xl 2.0, but md 1.92) —
  **traces of each size having been tuned separately.**
- **It presumes on/off labels inside the track**, hence type tokens of 5–11px — the
  smallest type values in the corpus.
- The thumb moves by an `inset-inline-start` transition (150ms ease) —
  **a logical property** rather than a `transform` move, so RTL follows for free.
- The input is laid over the whole area at `opacity: 0` (not hidden by clipping) —
  a comment states that it is "visually hidden without removing it from the accessibility
  tree".
- The Radio size and the Switch height are **the same series** (16/20/24/30/36) —
  the vertical rhythm of the form controls is unified on one scale. The default is `sm`
  (20px) in both — **Mantine puts its default size low on the scale rather than in the
  middle.**

## Textarea — three systems measured (2026-08-18)

| system | min-height | auto-grow | block padding |
|--------|:---:|------|:---:|
| **Mantine** 9.5.1 | **the same as the input** (`min-height: var(--input-height)` — 36px by default) | the `autosize` prop (`minRows`/`maxRows` have no defaults) | multiline-specific 4.5 / **5.5** / 7 / 9.5 / 13px |
| **Radix Themes** 3.3.0 | **48 / 64 / 80px** (size 1–3) | none (only a `resize` prop) | `calc(space - 1px)`, the border back-computed (the same principle as the input) |
| **shadcn/ui** | **64px** (`min-h-16`) | **`field-sizing-content`** (growth in CSS alone) | 8 (`py-2`) |

- **In Mantine the Textarea's minimum height equals a single-line input's** —
  `data-multiline` releases `--input-size: auto` and leaves only `min-height`. The line
  height also reverts to the fixed line height (`--mantine-line-height`) (a single-line
  input uses a `height - 2px` line height)
- **Radix Themes states a minimum height per size step** — size 1 `--space-8` (48), size 2
  `--space-9` (64), and size 3 alone a literal 80px. The spacing tokens end at 9, so the
  last step steps outside the tokens (`text-area.css`)
- **shadcn/ui does auto-growth without JS, with CSS `field-sizing: content`** — unique in
  the sample. On unsupporting browsers it behaves as a fixed 64px
- **None of the three has a row-count spec** — they specify only a minimum height in px

### A contrast — M3's Switch grows its handle by state

androidx generated tokens (2026-08-17): the track is a fixed 52×32dp while **the handle goes
from 16 unselected to 24 selected to 28dp pressed.** The exact opposite of Mantine, which
has a size axis (five steps) but is state-invariant —
**what parts is whether the "size axis" or the "state axis" drives the handle size in the
same component.** It also overlays **a 40dp StateLayer** on the 18dp Checkbox and 20dp
Radio, separating visual size from touch target (`systems/material-3.md`).

## Error and validation state — three approaches

| system | method | hook |
|--------|------|-----|
| **shadcn/ui** | **an ARIA attribute** | `aria-invalid:border-destructive` |
| **Mantine** | **a dedicated colour token** | `--input-bd: var(--mantine-color-error)` |
| **Radix Themes** | **no error selector (confirmed)** — the user's code | zero `invalid`/`error` selectors across the whole of 3.3.0's CSS |
| Atlassian | border width (selected and focused only) | `border.width.focused` |

### shadcn/ui — `aria-invalid` is the style hook

```
aria-invalid:border-destructive
aria-invalid:ring-destructive/20
dark:aria-invalid:ring-destructive/40
```

**There is no `error` prop.** Attach the ARIA attribute and the styling follows.

| advantage | cost |
|------|------|
| the accessibility attribute and the visual state cannot come apart | there is no way to show a visual-only error |
| one fewer prop | a warning that is not announced to a screen reader cannot be expressed |

**shadcn/ui is the only system in the sample to make an accessibility attribute the sole
source of a visual state.** The same rule applies across Button, Input, Select and Checkbox.

In dark mode the ring alpha goes from 20% to 40% — 20% is invisible against a dark
background.

### Mantine — both `error` and `success` are tokens

```css
--input-bd: var(--mantine-color-error);
--input-bd: var(--mantine-color-success);
```

**Mantine is the only one to keep a `success` state as a token.**
shadcn/ui's only state colour is `destructive`, so it has no token with which to express a
success state (see `color.md`).

Mantine changes the text colour too — `--input-color: var(--mantine-color-error)`.
**The border and the text change together.**

Mantine also attaches `aria-invalid: true` automatically when the `error` prop is present
(`Input.tsx`, `withAria` defaulting to true) — the visual hook is a token, but the
accessibility attribute ends up the same as shadcn/ui's.

### Radix Themes — there is no error state at all (confirmed 2026-08-18)

Searching the whole CSS of `@radix-ui/themes@3.3.0` (`src/` and `styles/`) returns **zero**
`data-invalid`, `:invalid`, `:user-invalid` or `error` selectors.
The absence of an error colour variable among the `--text-field-*` is not accidental —
**the structure leaves error indication itself outside the component, to the user's code.**
For colour alone there is only the workaround of changing the accent with a `color="red"`
prop; the notion of a validation state is absent from the style layer.

## Focus indication

| system | method | value |
|--------|------|-----|
| **shadcn/ui** | border colour + **a 3px ring** | `border-ring` + `ring-[3px] ring-ring/50` |
| **Radix Themes** | **border colour only** | `--text-field-focus-color: var(--accent-8)` |
| **Mantine** | **border colour only** | `--input-bd-focus: var(--mantine-primary-color-filled)` |
| Atlassian | **a 2px border width** | `border.width.focused` |
| Cloudscape | only the radius confirmed | `border-radius-control-default-focus-ring` 4px |

**Mantine and Radix Themes draw no ring and change only the border colour.**
The layout does not shift, but **it is less noticeable against a low-contrast background.**

**Radix Themes branches its focus colour three ways.**

| variant | focus colour |
|------|-----------|
| default | `--accent-8` (the accent) |
| under a `data-*` condition | `--focus-8` (**a dedicated focus colour family**) |
| the grey variant | `--gray-8` |

**`--focus-*` is a colour family independent of the accent.** Change the accent to yellow
and the focus indication does not turn yellow — Radix Themes is the only system in the
sample with a focus-specific colour family.

**Mantine goes the other way and uses the primary colour directly**
(`--mantine-primary-color-filled`). The brand colour is the focus colour.

## Cursor — only Radix Themes tokenises it

| token | value |
|------|-----|
| `--cursor-checkbox` | `default` |
| `--cursor-radio` | `default` |
| `--cursor-switch` | `default` |
| `--cursor-disabled` | `not-allowed` |
| `--cursor-link` | `pointer` |

**Checkbox, radio and switch are all `default`.** Not `pointer`.
`pointer` is used on links alone.

Mantine does not tokenise it but **divides the cursor by input kind** —
`--input-cursor: text` (text inputs) / `pointer` (Select and other choosers).

| system | form control cursor |
|--------|----------------|
| **Radix Themes** | `default` (a token) |
| **Mantine** | `text` / `pointer` (per component) |
| shadcn/ui | `default` (only `disabled:cursor-not-allowed` is stated) |

**All three differ.** Only the disabled state agrees, on `not-allowed`.

## The Select dropdown

**Only shadcn/ui's values are confirmed.**

| item | value |
|------|:---:|
| trigger height | 36 (`default`) / 32 (`sm`) |
| trigger padding | inline 12 / block 8 |
| content min-width | 128 (`min-w-[8rem]`) |
| content max-height | `--radix-select-content-available-height` (runtime) |
| **item padding** | **left 8 / right 32 / block 6** |
| label | inline 8 / block 6 / 12px text |
| check icon | 14 (`size-3.5`), 8 from the right |
| icon | 16 (`size-4`) |

**An item's right padding (32) is four times its left (8)** — the space for the check mark.
The check icon is 14px, yet 32px is cleared for it.

**The maximum height is a runtime value** — `--radix-select-content-available-height` is
injected by Radix Primitives after measuring the viewport. It is not fixed as a token.

Four directional entrance animations — `data-[side=bottom]:slide-in-from-top-2` (an 8px
move).
**The same structure as Atlassian's `motion.popup.enter.{top,bottom,left,right}`**, except
that Atlassian tokenises the duration (150ms) and easing too (shadcn/ui has them baked into
the classes).

## Guidance at the documentation layer — measured (2026-08-18)

In an environment where the documentation sites were reachable, the guidance pages of eight
systems (M3 · Atlassian · Spectrum · Polaris · Carbon · Primer · Cloudscape · GOV.UK) were
read directly.
"No rule" means the page was read and the absence confirmed.

### Label position — "above" in 6 of 8; only M3 defaults to floating

| camp | systems |
|------|--------|
| **above** | Carbon ("the only placement offered") · Atlassian (above, left-aligned) · GOV.UK · Cloudscape · Primer (vertical by default; horizontal is checkbox-only) · Spectrum (the default — side is for when vertical space is short) |
| floating | **M3 alone by default** (on selection the label moves from the centre to the top, always visible) |
| no rule | Polaris current (web components) — only visible/hidden options |

**Zero systems default to placing the label on the left.** Only Spectrum permits it as an
option and states the reason ("when vertical space is limited"). Carbon even records the
grounds, that top-aligned is "ideal for forms where minimising errors matters".

### Required marking — three camps, with asterisks both banned and mandated

| camp | systems | detail |
|------|--------|------|
| **`*` on required** | Atlassian · M3 · Primer | Atlassian uses a red `*` and **even fixes the legend at the top of the form** ("Required fields are marked with an asterisk \*"). M3 likewise requires explaining what the asterisk means |
| **mark optional only** | GOV.UK · Cloudscape | GOV.UK says **"Never mark mandatory fields with asterisks"** — an explicit prohibition. Cloudscape appends "- optional" |
| **mark the minority** | Carbon · Spectrum | mark whichever is less frequent in the form (if 85% are optional, mark only required). Spectrum forbids using `*` to mark optional |

**These are rules in head-on collision on the same question** — Atlassian mandates the
asterisk and GOV.UK forbids it. There is no cross-system recommended value on this axis, so
choose by product domain (government and public = the GOV.UK camp / enterprise = the
asterisk camp).

### When errors appear — blur in the majority; only GOV.UK codifies submit-only

| timing | systems |
|------|--------|
| **on blur** | Carbon (client validation "as soon as the field loses focus") · Cloudscape (the default; plus re-validation on every keystroke while an error is being corrected) · Atlassian (the accessibility guide: "Validate field onBlur") |
| **on submit** | **GOV.UK — "Do not validate when the user moves away from a field"** (both blur and live validation forbidden; an error summary is required even for a single error) · Primer (respecting the web's default behaviour, with a Banner summary at the top from three errors up) |
| while typing | Polaris ("as they type, not just after they submit") |
| no rule | M3 · Spectrum (confirmed) |

- **"Re-validate while typing only for fields already in an invalid state"** is a rule
  Cloudscape and Primer arrived at independently — clearing an error is immediate, raising
  one waits for blur.
- Shared prohibitions: validating on first visit (Cloudscape) · disabling the submit button
  (Atlassian's "Never disable a submit button", the same in Cloudscape; Carbon permits it
  for short forms only).

## Not yet filled in

- ~~Label position / required marking / when errors appear~~ → **resolved (2026-08-18)** —
  the "guidance at the documentation layer" section above. When to attach `aria-invalid` is
  still the user's code (it is not in the shadcn/ui source)
- ~~Help-text and error-message spacing~~ → **resolved (2026-08-18)** —
  `--input-bottom-section-height: 28px` is **not** help text: it is the slot for Textarea's
  `bottomSection` prop, an area laid out absolutely at the bottom **inside** the border
  (`Input.module.css` `.bottomSection`).
  The actual input-to-error/description gap is `--input-margin-top/bottom:
  calc(var(--mantine-spacing-xs) / 2)` = **5px** (applied conditionally by wrapper order,
  `get-input-offsets.ts`). The error and description type is `sm - 2px` = 12px at a line
  height of 1.2 with zero margin of its own (`@mantine/core@9.5.1`)
- ~~Radio and Switch dimensions~~ → **resolved** — the "Radio · Switch — measured in
  Mantine" section above (re-confirmed identical in 9.5.1's `Radio.css` and `Switch.css`:
  containers 16/20/24/30/36 and so on)
- ~~Radix Themes' error state~~ → **resolved (2026-08-18) — the absence of attribute
  selectors settled.**
  Zero `invalid`/`error` selectors across the whole of 3.3.0's CSS. See "Radix Themes —
  there is no error state at all" above
- ~~Textarea~~ → **resolved (2026-08-18)** — the "Textarea — three systems measured" section
  above.
  Minimum heights: Mantine 36 (the same as the input) / Radix 48, 64, 80 / shadcn 64px.
  The absence of a row-count spec confirmed in all three
- ~~Input minimum width — no system has one~~ → **corrected (2026-08-18)**:
  it is confirmed in 13 or more (Canvas 280 · Codex/Protocol 256 · Yoga a fixed 320 ·
  NYSDS makes width the size axis · EUI a max-width of 400). See the re-synthesis section
  below
- **Multilingual support** — shadcn/ui's Input `text-base md:text-sm` (16 on mobile / 14 on
  the desktop) is the only responsive handling. No system has a form spec relating to CJK or
  RTL

## Re-synthesis across 78 samples — component measurements (2026-08-18)

The `partial` deep pass raised the input measurements to 78 systems, and this document's
conclusions were re-verified against that sample.

### Button ↔ input height alignment — the majority align them (the recommendation now has grounds)

| relationship | systems |
|------|--------|
| **fully shared** (the same ladder) | Asphalt · Astro · Bootstrap (structurally) · Braid · DSFR · Evergreen · **Gestalt** · Helios · HeroUI · Kontur · LeafyGreen · Naive UI · Nord · Pajamas · Paste · Ring UI · Semi · SGDS · Shoelace · Siemens iX · Skeleton · SmartHR · Tegel · Thumbprint · Vanilla · Vapor · Vibe · Vibes · Vitamin · Welcome UI |
| partly shared (one step apart) | Backpack · Base Web · bf-solid · Blueprint · Chakra (2xs only) · Charcoal · EUI · Intergalactic · NYSDS · Park UI (a 2xs added on the input) · Pharos (input = the large button) · Spindle · Strapi |
| **misaligned** | Auro a single 58 vs 5 button steps · Canvas a single 40 vs 4 steps · Cedar 40 vs 38 · HSDS 42 vs 40 · Kaizen 48 vs 40 · MUI 40/56 vs 36.5 · Orbit a single 44 vs 3 steps · **Origami 44 vs 28 (a 16px gap)** · Stacks 5 steps vs 3 · Vuetify density only vs size × density |

**About 30 systems align their button and input heights** — the earlier recommendation
("use the same scale as the button") came from four observations, and across 78 samples it is
**confirmed as the majority practice.**

The ways of producing that alignment part three ways:

- **A shared declaration**: **Gestalt** is the strongest — the button and the input declare
  their `min-height` through *the same CSS class* (`layout.small/medium/large`). It is not
  that the values match; there is one declaration.
  **Shoelace** keeps no button-specific height token at all and uses `--sl-input-height-*`
  directly.
- **A shared variable layer**: **Bootstrap and SGDS**'s `$input-btn-*` — padding, type, line
  height, border and focus all derive from one variable group, so the alignment is enforced
  **structurally rather than by value.**
- **Enforced reference**: **PrimeVue**'s button dimension tokens are all `{form.field.*}`
  references, so they cannot diverge by definition.

**Origami's 16px gap is useful as a failure case** — the button refers to the old type scale
and the input to the new foundation, so **a generational fault line in the tokens survives
into the distribution.**

### Input minimum and default width — "no system has one" was wrong

| method | systems |
|------|--------|
| **min-width** | Canvas 280 · Codex 256 · Protocol 256 (back-computed from a content-width token) · Pluralsight 192 · Asphalt 160 · Braid — |
| **a fixed default width** | Yoga 320 · Mística 328 · Nord 240 (widened by an opt-in `expand`) · Vibes four width presets 64/112/176/384 · NYSDS **makes width the size axis** (88/200/384) · Ring UI 96/240/400 |
| **max-width** | EUI 400 (`base×25`) · Serendie `min(100%, 300px)` |

> **Correction.** The earlier "input minimum width — no system has one" is **refuted by 13
> or more systems.** In particular **NYSDS has no height variants and makes width the size
> axis**, and **Vibes tokenises control width as t-shirt sizes.** It also emerged that the
> response to i18n text expansion parts in both directions, a minimum width (Canvas 280) and
> a maximum width (EUI 400).

### The camp that separates the border into a dedicated layer

**HSDS (`BackdropUI`) · Intergalactic (`SOutline`) · Orbit (`fake-input`) ·
Thumbprint (`inputStyles`)** — four systems independently arrived at a structure in which
**the actual `<input>` is left transparent and a sibling or parent layer draws the border,
background and focus.**
The shared motive is keeping the border a single layer even when icons and buttons are
embedded inside the field.

The camp using an **inset box-shadow** instead of a `border` is wider — Pajamas · Paste ·
Skeleton · Vapor · Vitamin · Cedar · Astro · Blueprint · Braid · Seed · Kontur.
**Pajamas restores a real border only under `forced-colors: active`** (since shadows
disappear in high-contrast mode) — the only sample to handle the point this camp most easily
misses.

### Preventing iOS auto-zoom — one problem, seven solutions

Below 16px, iOS Safari zooms the page on focus, and each system solves it differently:

| solution | systems |
|------|--------|
| promote the type to 16px on mobile | Bolt (forced globally) · Nord (a `≤480px` media query) · Strapi (a responsive token, 16→14px) · Priceline (a prop default of `[2,null,1]`) |
| make the input type larger than the body outright | Orbit 16px (body 15px) |
| branch on iOS alone with `@supports` | Stacks (re-correcting the padding too) |
| **render at 16px, then shrink** | **Charcoal — `transform: scale(0.875)` for a visual 14px, with every dimension back-corrected as `calc(…/0.875)`** |

**Charcoal's solution is the only one that satisfies both the "CJK 14px" convention and the
"iOS 16px" rule** — the rest give up one or the other.

### Focus — avoiding layout shift is a design axis

Six systems block the problem of a thickening border shifting the element on focus, each
differently:

- **NYSDS**: leaves the border and draws an `outline` over it
- **eBay, Park UI, Nord**: border colour plus a same-coloured `box-shadow 0 0 0 1px` for a
  visual 2px
- **Seed**: lays down an `::after` 2px border in advance and turns on **only the colour** on
  focus
- **Base Web**: keeps the border at 2px always and swaps only the colour
- **Kontur**: the token value itself is `calc(2px - 1px)` — the intent of subtracting the
  border from the ring driven into the value

**KRDS, conversely, is the only sample to change the border width from 1 to 2px**, and
**Intergalactic makes the focus ring colour depend on state** (green when valid, red when
invalid) — an exception to the "focus = blue" convention.

### Labels — "a separate block" is overwhelming at the code layer too

Separate block elements: Backpack · Base Web · Braid · Canvas · Cedar · Clarity · Codex ·
DSFR · EUI · Evergreen · Forma 36 · Gestalt · Grommet · Orbit · Origami · Pajamas ·
Pharos · Protocol · Ring UI · Stacks · Thumbprint · Vanilla · Vibe · Vitamin.
Floating: **Audi · Auro · Bolt · Mística · MUI · Unify · Vuetify · Yoga** (eight).

**The documentation-layer conclusion (only M3 defaults to floating) agrees with the code
layer.** The implementations part, though — a `<fieldset>/<legend>` notch (**Yoga,
Vuetify**) against an absolutely positioned shrink (**MUI, Mística, Unify**).
**In Mística the shrink factor is not a constant 0.75 but the division `label size ÷ value
size`**, so it differs per skin.
**Odyssey uses MUI while switching the floating label off in code**, reverting to a fixed
block above.

### Radius — the camp that deliberately differs between button and input

| system | button | input |
|--------|:---:|:---:|
| **Kontur** | 8px | **2px** |
| **Charcoal** | 999999px (a pill) | **4px** |
| **PIE** | 50rem (a pill) | **12px** |
| **Grommet** | 18px (half the height) | **4px** |
| Pluralsight | 3px | 2px |

**"Round for what you press, square for what you write into"** — Kontur keeps separate
radius tokens by size and yet sets all three to 8px, revealing that the axis that parts is
not size but **component kind.**

## Implementation defaults

**Input height — use the same scale as the button.**

```
desktop web    40  (the mode of the 78 sample — the same value as the button. Corrected from 36px in the previous edition)
dense screens  32  (the default in Codex, Pajamas, Semi and Vapor · Ant · Radix size 2)
touch          48  and above (Braid uses a 48px touch-target token as the single source of its control heights)
```

**Setting the button and the input to the same value is the majority practice** — around 30
of the 78 samples share a height ladder (the re-synthesis section above).

**A structure in which Button, Input and Section share the same height variable, as in
Mantine, is recommended.**
Radix Themes has a 48px step on Button alone, so `size="4"` falls out of step —
**differing step counts per component cause accidents in composition.**

**Decide early whether inputs get size variants.** shadcn/ui keeps Input at a single 36px
while Button has four steps, so sizes cannot be matched within the same form.

**Padding**

```
inline 12  block 4–8   (at a height of 36)
```

**Decide whether to subtract the border width from the padding.** Radix Themes does
(`calc(var(--space-2) - 1px)`). The visual inset becomes constant, but the computation
grows.
Leaving it to `box-sizing: border-box` and using constant padding is simpler.

**Decide whether to centre the text vertically with `line-height` or with `padding`.**
Mantine does it with `line-height: calc(height - 2px)` — which follows automatically when
the height changes.

**Checkbox**

```
16px  (with a 10–14px indicator)
```

**The three systems meet at 16px.** If you want size variants, multiplying `--space-4` by a
factor (0.875 / 1 / 1.25) as Radix Themes does keeps them in step with the spacing scale.

**Make the radius proportional to the size.** An 8px radius on a 16px element approaches a
semicircle. That is why shadcn/ui uses a literal `4px` in this one place — **with a
proportional rule there is no need to make an exception** (the Radix Themes method:
`calc(var(--radius-1) * 0.875)`).

**Error state — using `aria-invalid` as the hook is recommended** (the shadcn/ui approach).
The accessibility attribute and the visual state cannot come apart.

**If you need a `success` state, though, keep a separate token.** Mantine is the only case
with a `--mantine-color-success`, and shadcn/ui has no token with which to express it.

**Focus indication — draw a ring.**

```
a 2px ring + a border colour change
```

**Changing only the border colour, as Mantine and Radix Themes do, is less noticeable
against a low-contrast background.**
shadcn/ui's 3px is the thickest in the sample; 2px is the majority.

**Decide whether to separate the focus colour from the accent.** Only Radix Themes keeps an
independent `--focus-*` family — so changing the brand colour does not shake focus
visibility along with it.

**Cursor**

```
text inputs   text
choosers      pointer  or  default
disabled      not-allowed
```

**Whether to use `pointer` on checkboxes and switches is contested.** Radix Themes uses
`default`, Mantine uses `pointer` on choosers. **Decide once and apply it to every control.**

**The Select dropdown**

```
min-width 128px
item padding: left 8 / right 32 / block 6
max-height measured at runtime (against the viewport)
```

**Do not fix the maximum height as a constant.** It gets clipped for a trigger near the
bottom of the viewport.
Using a runtime measurement like Radix Primitives'
`--radix-select-content-available-height` is the only solution in the sample.

**Clear the space for the check mark in advance.** That is the 32px right padding.
If the padding changes with the selected state, items shift left and right.
