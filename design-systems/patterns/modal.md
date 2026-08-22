<!-- lang-links -->
> **English** · [한국어](modal.ko.md)
<!-- /lang-links -->

# Modal / Dialog

**Modal measurements are held for 79 systems** (re-synthesised 2026-08-18).
The individual values are in the "components in depth" section of each `systems/*.md`; this
document carries **only the distribution and the cross-system conclusions**.
The tables below were written from the initial six samples (shadcn/ui · Radix Themes ·
Mantine · Atlassian (motion) · Cloudscape (colour and radius) · Apple (sheet radius)), and
the re-verification against the 79 is in the "re-synthesis across 79 samples" section —
**where the two disagree, the re-synthesis takes precedence.**

> The three frameworks' values were read from component CSS and source.
> **Behavioural rules such as "does clicking the backdrop close it?" still live only on the
> documentation sites** — they are defaults of the primitive (Radix Primitives), not
> confirmed decisions of the design system.
>
> **The modal is the only axis in the corpus on which all 79 systems have a position** —
> either they have values (76), or they were confirmed not to ship the component at all
> (NHS · WMN), or they ship behaviour and timing hooks without values (ark-ui).

## Width — the number of steps parts

| system | steps | values | default |
|--------|:---:|-----|:---:|
| **Mantine** | **5** | 320 · 380 · **440** · 620 · 780px | **440 (`md`)** |
| **shadcn/ui** | **1** | **512px** (`sm:max-w-lg`) | 512 |
| Radix Themes | unverified | not in the component CSS (it does not expose a `max-width`) | — |
| **Carbon** | size × breakpoint | **48% / 60% / 84% of the viewport** | — |
| **Cloudscape** | **5** | **320 · 600 · 820 · 1024 · 1280px** (+ `--awsui-modal-custom-width`) | — |

**Only Carbon uses viewport percentages rather than px** (measured in `@carbon/styles`,
2026-08-17) — the modal width grows with the screen. A new axis separating the fixed-px camp
(Mantine, shadcn) from the proportional camp.

**Cloudscape is the second sample in the five-step px camp** (2026-08-17) —
its 320–1280px range is far wider at the top than Mantine's (320–780), it switches to
`100vw − 24px` on mobile, and it drills **a custom-width CSS variable hook** besides —
a premise of the data-dense modals (wizards and tables included) of a console product.

**Mantine and shadcn/ui differ greatly.** Mantine's default of 440px is 72px narrower than
shadcn/ui's (512px), and Mantine's `lg` (620) and `xl` (780) exceed 512.

| Mantine | value | against shadcn/ui |
|---------|:---:|:---:|
| `xs` | 320 | -192 |
| `sm` | 380 | -132 |
| **`md`** | **440** | **-72** |
| `lg` | 620 | +108 |
| `xl` | 780 | +268 |

**shadcn/ui's 512px sits between Mantine's `md` and `lg`.**

The increments: 320 → 380 → 440 → 620 → 780. **+60 / +60 / +180 / +160** — the gap between
`md` and `lg` opens wide, the point where form modals (≤440) part from content modals
(≥620).

## Padding — whether it tracks the size parts

| system | value |
|--------|-----|
| **shadcn/ui** | **a fixed 24px** (`p-6`) |
| **Radix Themes** | **12 / 16 / 24 / 32px** (size 1–4, `--space-3`–`6`) |
| Mantine | `--mb-padding`, defaulting to `--mantine-spacing-md` (16px) — obtained from `ModalBase.css` |

### Radix Themes — padding and radius grow together

| size | padding | radius |
|:---:|:---:|:---:|
| 1 | `--space-3` (12) | `--radius-4` (8) |
| 2 | `--space-4` (16) | `--radius-4` (8) |
| 3 | `--space-5` (24) | `--radius-5` (12) |
| 4 | `--space-6` (32) | `--radius-5` (12) |

**The radius is bundled two steps at a time** — sizes 1 and 2 at 8px, 3 and 4 at 12px.
The padding differs at all four steps.

**The padding refers to the spacing tokens directly.** The same method as the button heights
being `--space-5`–`8` (`form.md`) — **Radix Themes derives every component dimension from
spacing.**

**shadcn/ui's 24px equals Radix Themes size 3.**

## Radius

| system | value |
|--------|-----|
| shadcn/ui | **10px** (`rounded-lg` = `--radius`) |
| Radix Themes | 8 / 8 / 12 / 12px (by size) |
| Mantine | `--mantine-radius-default` (8px), and **0** when full-screen |
| Cloudscape | `border-radius-popover` 8px (a modal-specific token is unverified) |
| **Apple (sheet)** | **top 34px / bottom 58px** |

**The web systems cluster at 8–12px.**

**Apple's sheet is of a different order.** The iPhone sheet is 34px at the top and 58px at
the bottom — three to seven times a web modal's (8–12px). **The bottom is 1.7× the top, an
asymmetry** (`systems/apple-hig.md`).

**Only Mantine forces the radius to 0 in full-screen mode.**

```css
[data-full-screen] { --modal-border-radius: 0 !important; }
```

There is an `!important` — a user-supplied `radius` prop is ignored.

## Screen margin — the mobile handling parts

| system | method |
|--------|------|
| **shadcn/ui** | `max-w-[calc(100%-2rem)]` → `sm:max-w-lg` |
| **Radix Themes** | padding on a scroll container (`--space-6` top / `max(--space-6, 6vh)` bottom / `--space-4` inline) |
| **Mantine** | **a `5dvh` / `5vw` offset** |

### shadcn/ui — it switches at a breakpoint

```
w-full max-w-[calc(100%-2rem)] sm:max-w-lg
```

| viewport | width |
|--------|------|
| < 640px | `100% - 32px` (16px of margin on each side) |
| ≥ 640px | **a fixed 512px** |

**Below 640px it stretches with the screen width; above, it is fixed.**

### Mantine — viewport-unit offsets

```css
--modal-y-offset: 5dvh;
--modal-x-offset: 5vw;
max-height: calc(100dvh - var(--modal-y-offset) * 2);
```

**It uses `dvh` (dynamic viewport height)** — the height follows as a mobile browser's
address bar hides and reappears. `vh` does not.

**Mantine is the only system in the sample to use `dvh`.**

In full-screen mode the offsets go to 0 and the height to `100dvh`.

### Radix Themes — the scroll container is a separate layer

```
BaseDialogOverlay          position: fixed; inset: 0
  BaseDialogScroll         overflow: auto; position: absolute; inset: 0
    BaseDialogScrollPadding  padding-top: space-6
                             padding-bottom: max(space-6, 6vh)
                             padding-left/right: space-4
      BaseDialogContent      margin: auto; overflow: auto
```

**A four-layer structure.** Overlay / scroll region / scroll padding / content.

**The bottom padding is `max(var(--space-6), 6vh)`** — the greater of 32px and 6% of the
viewport height. It keeps the modal off the bottom on a large screen.

**The content itself is `overflow: auto` too** — scrolling is possible at two layers.
When the modal is longer than the screen the outer scrolls; when the content is longer than
the modal the inner does.

Alignment parts by class rather than by `--modal` —
`rt-r-align-start` (`margin-top: 0`) / `rt-r-align-center` (`margin-top: auto`).
**They are wrapped in `@breakpoints`, so the alignment can change by viewport.**

## The overlay (backdrop)

| system | token |
|--------|------|
| Radix Themes | `--color-overlay` |
| Atlassian | **three** `color.blanket` plus `motion.blanket.enter/exit` |
| shadcn/ui (Drawer) | **`bg-black/10` + `backdrop-blur-xs`** — 10% black reinforced with a blur |
| Mantine | `Overlay.css`, a separate component |

**Only Atlassian tokenises the overlay as an independent concept** —
three `color.blanket` values (default, selected, danger and so on) plus two motion tokens.

shadcn/ui's Drawer (the v4 style CSS) uses **a blur instead of darkness** —
10% black is the lightest overlay in the sample, and `backdrop-blur` reinforces the
separation from the background (with a `supports-backdrop-filter:` guard — unsupporting
browsers keep only the 10%).

Radix Themes lays the background on a `::before` pseudo-element and **keeps the overlay
itself transparent.**

```css
.rt-BaseDialogOverlay::before {
  position: fixed; inset: 0;
  background-color: var(--color-overlay);
}
```

**The reason for the pseudo-element is animation separation** — the overlay element manages
only the mount state, and the background fade is the `::before`'s business (see below).

## Shadow

| system | value |
|--------|-----|
| **Radix Themes** | **`--shadow-6`** (the maximum of six steps) |
| shadcn/ui | `shadow-lg` (the seventh of Tailwind's nine) |
| Atlassian | `elevation.shadow.overlay` |

**Both use a step near the maximum.** The modal consumes the top of the shadow scale.

## Animation

### Duration — entry is long and exit short

| system | entry | exit | difference |
|--------|:---:|:---:|:---:|
| **Radix Themes** (content) | **200ms** | **100ms** | **-100** |
| Radix Themes (overlay) | 200ms | 160ms | -40 |
| **Atlassian** | **250ms** | **200ms** | **-50** |
| **shadcn/ui** | **200ms** | 200ms | **0** |

**Only shadcn/ui has entry and exit the same** (`duration-200` applied to both).

**In Radix Themes the content's and overlay's exit durations differ** — content 100ms,
overlay 160ms. **The content disappears first and the background follows.**

Atlassian's `motion.modal.enter/exit` are 250/200ms and its `blanket` (overlay) is 250/200ms
too — **the same** — so the two elements move together.

| | content exit | overlay exit | order |
|---|:---:|:---:|---|
| **Radix Themes** | 100ms | 160ms | **content first** |
| Atlassian | 200ms | 200ms | together |

### Keyframes — scale and travel

| system | entry | exit |
|--------|------|------|
| **Radix Themes** | `translateY(5px)` + `scale(0.97)` → 0/1 | 0/1 → `translateY(5px)` + **`scale(0.99)`** |
| **shadcn/ui** | `fade-in-0` + `zoom-in-95` | `fade-out-0` + `zoom-out-95` |
| **Atlassian** | `ScaleIn95to100` (**no travel**) | `ScaleOut100to95` |

**Radix Themes' entry and exit scales are asymmetric** — it comes in from 0.97 and **leaves
at 0.99.** The size change on exit is a third of the entry's.

**Atlassian has no travel.** Only the scale, 95%→100%.
`popup` has `SlideIn*8px` while `modal` does not — **an element at the centre of the screen
does not move.**

**shadcn/ui and Atlassian agree on a 95% scale.** Only Radix Themes is at 97%.

| system | entry scale | travel |
|--------|:---:|:---:|
| Atlassian | 0.95 | none |
| shadcn/ui | 0.95 | none |
| **Radix Themes** | **0.97** | **5px** |

### Easing

| system | value |
|--------|-----|
| **Radix Themes** | **`cubic-bezier(0.16, 1, 0.3, 1)`** (identical throughout) |
| Atlassian (entry) | `cubic-bezier(0.4, 0, 0, 1)` (`inout.bold`) |
| Atlassian (exit) | `cubic-bezier(0.6, 0, 0.8, 0.6)` (`in.practical`) |
| shadcn/ui | unstated (Tailwind's default `cubic-bezier(0.4, 0, 0.2, 1)`) |

**Radix Themes uses the same easing for entry, exit and the overlay.**
`cubic-bezier(0.16, 1, 0.3, 1)` is a curve with y1 = 1 that decelerates sharply right after
the start.

**Atlassian splits by direction** — `inout.bold` on entry, `in.practical` on exit.
The modal is a large-area component and so takes the `bold` family (`motion.md`).

### Mantine's ModalBase — a sticky header, with a scrollbar-width correction

Measured in `ModalBase.css`:

| element | value |
|------|-----|
| header | **`position: sticky; top: 0`**, `min-height: 60px`, `z-index: 1000` |
| padding | `--mb-padding`, defaulting to `--mantine-spacing-md` (16px) |
| shadow | `--mantine-shadow-xl` |
| body | `padding-top: 0` when there is a header (`:not(:only-child)`) |

Two practical accommodations are driven into the source:

- **The title stays pinned as the modal body scrolls** — a sticky header is confirmed in
  Mantine alone among the six samples.
- **A scrollbar-width correction**: `:has([data-mantine-scrollbar])` detects the appearance
  of a custom scrollbar, increases the header's right padding by 5px (0.3125rem) and applies
  `transition: padding-inline-end 100ms` to that change — absorbing the layout jump at the
  moment the scrollbar appears into an animation.

### Accessibility — only Radix Themes wraps the whole animation

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes rt-dialog-content-show { … }
  .rt-BaseDialogContent[data-state='open'] { animation: … }
}
```

**The animation definitions themselves are inside the media query.**
For a user with `prefers-reduced-motion: reduce`, the keyframes do not exist.

| system | accessibility handling |
|--------|-------------|
| **Radix Themes** | **the whole animation block wrapped in `no-preference`** |
| Cloudscape | `disabled: 0ms` on the duration tokens (`motion.md`) |
| shadcn/ui · Atlassian · Mantine | unverified for modals |

**The difference between the two:** Radix Themes removes the animation, Cloudscape runs it
at 0ms. The latter still fires an `animationend` event.

### The `no-op` keyframe — an unmount timing trick

```css
@keyframes rt-dialog-overlay-no-op { from { opacity: 1 } to { opacity: 1 } }

.rt-BaseDialogOverlay[data-state='closed'] {
  animation: rt-dialog-overlay-no-op 160ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

**An animation that changes nothing.** A comment records the reason —
*"Keep the overlay mounted until the children have animated"*.

The overlay element is treated as animating for 160ms and so is not removed from the DOM,
during which its children (content at 100ms, `::before` at 160ms) finish leaving.

**Radix Themes is the only system in the sample with this trick in its source.**
It is the reason `Dialog.Overlay` is not itself an animation target and the background was
handed to `::before`.

## Apple's sheet — the grabber and the toolbar

Values measured on the Toolbars page (`507:25993`) of the iOS 26 kit.

| element | size |
|------|:---:|
| **Grabber (the drag handle)** | **36 × 5** |
| sheet toolbar — default | 402 × **70** |
| sheet toolbar — Large Title | 402 × **136** |

**The handle is 36×5pt.** Light and Dark are separate symbols of the same size.

**The sheet toolbar is taller than an ordinary toolbar.**

| toolbar | width | default | Large Title |
|------|:---:|:---:|:---:|
| Top — iPhone | 402 | 54 | 125 |
| Top — iPad | 820 | 54 | 131 |
| **Top — Sheet** | 402 | **70** | **136** |
| Bottom — iPhone | 402 | **84** | — |
| Bottom — iPad | 500 | 58 | — |

**The sheet's top toolbar is 16pt taller than the iPhone's top (54)** — the handle's space.

**Large Title differs across the three containers, at 125 / 131 / 136.**
The same style name, a different height per container.

**The bottom toolbar is 1.56× the top** (84 vs 54, on iPhone).
On iPad the bottom is 58, almost the same as the top (54) — **only on iPhone is the bottom
much taller.**

The sheet toolbar's buttons have two states, `Preferred` and `Default`, and are 44×44 —
different names from the ordinary toolbar's `Selected`/`Tinted` (`button.md`).

### Detents — two system-defined plus custom (the HIG sheets DocC JSON, 2026-08-18)

- The system-defined detents are **two, `large` (full height) and `medium` (about half)**.
  They are described as proportions rather than exact pt values, and **custom detents can be
  added.**
- `large` is supported automatically. Adding `medium` makes it rest at two heights, and
  **specifying `medium` alone blocks full expansion.**
- The HIG's rule for medium: **progressive disclosure** — starting at half, as a share sheet
  does, and expanding by scrolling or dragging the grabber.
- There are two resize triggers: **scrolling the content or dragging the grabber.**
- Modality is a platform axis: **sheets on macOS, tvOS, visionOS and watchOS are always
  modal**, and only iOS and iPadOS permit a non-modal sheet (Notes' formatting sheet is the
  official example).
- Background treatment: iPadOS page and form sheets, the macOS parent window and the
  visionOS parent window all **prescribe dimming only.** watchOS uses a translucent material
  with blur and reduced saturation.
  **The old iOS effect of scaling the parent view back is not in the current HIG text** —
  the answer to "is there a background scale-back effect?" is "not in the current rules".

## The close button

**Only shadcn/ui's values are confirmed.**

| item | value |
|------|:---:|
| position | top right, `top-4 right-4` (16 / 16) |
| icon | 16 (`size-4`) |
| radius | `rounded-xs` (2px) |
| default opacity | **0.7** |
| hover opacity | 1 |
| focus ring | **`ring-2` + `ring-offset-2`** |

**The focus ring differs from the other controls'.** Every other shadcn/ui component uses
`ring-[3px]` with no offset (`button.md`). **The close button alone is 2px plus a 2px
offset.**

**Its default opacity is 0.7** — faint at rest, sharpening on hover.
This is the only case in the sample of leaving a close button translucent by default.

**The button's position (16px) is inside the inner padding (24px)** — it does not line up
with the content's alignment.

## Header and footer — they flip on mobile

**Only shadcn/ui is confirmed.**

| element | classes |
|------|--------|
| header | `flex flex-col gap-2 text-center sm:text-left` |
| footer | `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` |
| description | `text-sm text-muted-foreground` |
| element gap | `gap-4` (16px) |

**The header is centred on mobile and left-aligned on the desktop.**

**The footer is `flex-col-reverse` on mobile** — vertical, with the order reversed.
With a DOM order of `[Cancel][Confirm]`, Confirm moves to the top on mobile.

| viewport | footer layout |
|--------|-----------|
| < 640px | vertical, **reversed** (the primary action on top) |
| ≥ 640px | horizontal, right-aligned (the primary action on the right) |

**It is not a layout that puts the primary action where the thumb falls** — it is at the
top.
On mobile the lower button becomes Cancel, so a mis-tap lands on the non-destructive side.

## Container colour

| system | token |
|--------|------|
| Radix Themes | `--color-panel-solid` |
| **Cloudscape** | **`color-background-dialog`** `#f0fbff` (light) / `#001129` (dark) |
| shadcn/ui | `bg-background` |
| Atlassian | `elevation.surface.overlay` |

**Only Cloudscape's dialog background is not white** — `#f0fbff` is a pale blue.
`color-border-dialog` is `#006ce0` (blue) too.

**Cloudscape has no `modal` token, only `dialog` and `popover`.**
Whether `color-background-dialog` is the modal's background or an inline emphasis region
could not be settled.

Radix Themes' `--color-panel-solid` connects to the `data-panel-background` theme axis —
a choice between `solid` and `translucent`, of which **the modal forces `solid`.**

## Guidance — Apple's HIG (obtained as DocC JSON)

The kind of guidance said until now to "live only in the documentation" arrived for the
first time (modality.json · alerts.json):

- **Because a modal always requires an act of dismissal, use one only when focus is
  needed** — "always provide a clear way to dismiss" is codified
- **If dismissal could lose user-generated content, explain the situation and offer a way
  out** (applying equally to a gesture or a button) — Apple's answer to "does clicking the
  backdrop close it?" is "whatever the means of dismissal, confirm on data loss"
- Sub-views inside a modal should follow **a single path** — do not place a button that
  could be confused with the close
- The visionOS alert accessory view: **a maximum height of 154pt and a 16pt radius** (a
  numeric rule)

Being one sample's guidance (Apple's), it is not yet a cross-system recommendation.

## Guidance — web systems at the documentation layer, measured (2026-08-18)

In an environment where the documentation sites were reachable, the modal guidance of eight
systems was read directly.
GOV.UK **has no modal component at all** (confirmed against its list of 35 — the absence is
a position).

### Does the backdrop close it — those with a rule say yes, and the exceptions are precise

| position | systems |
|------|--------|
| **closes** | Atlassian ("anywhere on the blanket") · Cloudscape (an onDismiss reason of `overlay`) |
| **branching by variant** | **Carbon** — only the passive modal closes on an outside click; transactional, acknowledgment and progress do not |
| **closes by default, with an exception** | **Primer** — "when it holds a form with possible unsaved changes, it does not close on the backdrop (regardless of the form's state)" |
| no rule | M3 · Spectrum · Polaris current (confirmed) |

**Putting Carbon's "a modal demanding an action does not close on an outside click" together
with Primer's "unsaved-form exception" gives a practical rule** — close for read-only, block
while input or confirmation is in progress. Consistent with Apple's "confirm on data loss"
(the section above).

### ESC — unanimously closes, across the six systems with a rule

M3 (codified in its a11y table) · Atlassian · Spectrum ("equivalent to Cancel/OK
confirmation") · Carbon (all four variants) · Primer (**"must dismiss"** plus a mandatory
return of focus to the trigger) · Cloudscape. Zero rules to the contrary. Note: Spectrum
defines ESC as "equivalent to cancel", so closing with ESC must not execute a destructive
default action.

### Nested modals — forbidden 4 : conditionally allowed 2

| position | systems | condition |
|------|--------|------|
| **forbidden** | Atlassian ("inaccessible and confusing") · Spectrum · Carbon ("if the task depends on a confirmation modal, do not do it in a modal in the first place") · Cloudscape ("Never" plus a prohibition on modal chains — multi-step goes to a multipage flow) | |
| **conditionally allowed** | M3 | **only over a full-screen dialog** — the unsaved-changes confirmation on close is the official pattern |
| | Primer | **up to two layers under focus-management conditions** (three or more not recommended). When stacked, ESC and an outside click must close only the topmost |

**The earlier record that "there is no rule on nesting" was wrong** — it was merely absent
from the token and source layers; at the documentation layer six systems have explicit
rules. The finding is that both conditional allowances hinge on the same point (an
unsaved-changes confirmation).

## Not yet filled in

- ~~Does the backdrop close it / ESC behaviour / a modal inside a modal (nesting)~~ →
  **resolved (2026-08-18)** — the "guidance — web systems at the documentation layer"
  section above
- **Focus-trap implementation** — it is the business of Radix Primitives and React Aria, and
  is not in tokens or CSS
- **Radix Themes' modal width** — it does not expose a `max-width` in its component CSS.
  The `size` prop changes only padding and radius
- ~~Mantine's modal padding~~ → **resolved (2026-08-18)** — the whole of
  `@mantine/core@9.5.1`'s `ModalBase.css` was checked: the padding is `--mb-padding`,
  defaulting to `--mantine-spacing-md` (**16px**, shared by header and body), with the sticky
  header, the 60px min-height and the body's `padding-top: 0` in the "Mantine ModalBase"
  section above.
  On the `Modal.css` side, only the sizes (320–780), the offsets (5dvh/5vw) and the
  full-screen radius of 0 — no padding, re-confirmed
- **Atlassian's modal dimensions** — only the motion tokens exist; the width and padding are
  in the component package
- **Cloudscape's modal-specific tokens** — there are only `dialog` and `popover`, no `modal`
- ~~Apple's sheet detents and the background scale-back effect~~ → **resolved
  (2026-08-18)** —
  the Detents subsection of "Apple's sheet". Two steps, large/medium, plus custom; the
  scale-back is not a current rule
- ~~**The mobile transition (modal → bottom sheet)** — there is no rule for the transition
  breakpoint~~ →
  **corrected (2026-08-18)** — it is merely absent from shadcn/ui; **at least 20 systems
  prescribe a value.**
  See the "mobile transition" section of "re-synthesis across 79 samples" below. The
  shadcn/ui measurements stand as recorded:
  - `drawer` (vaul-based, with touch gestures): in the bottom direction `max-h-[80vh]` with a
    radius on the top only, **a 100×8px grabber** (shown only when bottom — 2.8× the width
    of Apple's 36×5), and 75% width plus `sm:max-w-sm` (384px) in the side directions
  - `sheet` (Radix Dialog-based, no gestures): side defaults to `right`, width 75% with a
    384px ceiling, **a 500ms entry / 300ms exit slide** — an order of magnitude apart from
    the same library's dialog (200/200). The overlay is the same `bg-black/50` as the dialog
  - For the same "panel that comes in from the side" it **selects the primitive by whether
    touch gestures are needed** (vaul vs Radix) — the transition criterion is the input
    method, not the viewport width

## Re-synthesis across 79 samples — component measurements (2026-08-18)

The `partial` deep pass raised the modal measurements to all 79 systems, and this document's
conclusions were re-verified against that sample.
**Six of the conclusions drawn from the initial six samples are overturned.**

### How the width is decided — six camps

| method | systems |
|------|--------|
| **px steps (a dedicated scale)** | Backpack 2 · Paste 2 · NASA WDS 2 · Strapi 2 · Auro 2 · Helios 3 · KRDS 3 · LeafyGreen 3 · PIE 3 · Gestalt 3 · Forma 36 3 · Pharos 3 · Semi 3 · Welcome UI 3 · Charcoal 3 · Thumbprint 3 · eBay 3 · Spindle 3 · Vapor 3 · Vibe 3 · Nord 4 · Braid 4 · Bootstrap 4 · Italia 4 · SGDS 4 · Pajamas 4 · Clarity 4 · Mantine 5 · Cloudscape 5 · Orbit 5 · Siemens iX 5 · Chakra 5 · smarthr 6 · HeroUI 10 |
| **a single width** | Seed 272 · Serendie 408 · NYSDS 439 · Canvas 440 · Naive UI 446 · Astro 448 · Ring UI 464 · Shoelace 496 · Blueprint 500 · Base Web 500 · shadcn/ui 512 · Codex 512 · Evergreen 560 · Yoga 580 · Vitamin 600 · Stacks 600 · Kaizen 600 (a ceiling) · Cedar 640 · Skeleton 640 · Mistica 680 · HSDS 680 · Protocol 1200 (a ceiling) |
| **no steps — the content decides** | Asphalt (`fit-content`) · Porsche (`auto`, 276–1535.5) · Vanilla (`auto`, a 1280 ceiling) · Grommet · Vuetify · Kontur · PrimeVue · Origami (**JS measures the viewport**) · Pluralsight · Unify · digital-go-jp · Intergalactic |
| **reusing another axis** | MUI and Priceline (breakpoints) · Backpack (breakpoint = modal width) · Braid (`contentWidth`) · smarthr (a 12-column col width) · Paste (the general `size` tokens) · HeroUI (inheriting Tailwind's ten `max-w-*`) · Clarity (`space-14` (72) × 4/8/12/16) · EUI (**the form `maxWidth` of 400 = the modal `min-width`**) · DSFR (delegated to the grid — zero width steps) |
| **viewport %** | Carbon 48/60/84 · **Tegel 25–100%** (sixteenths, with five breakpoint values identical to Carbon's) · Audi 62.5% (a 1200 ceiling) |
| **character count · a range** | **Odyssey `calc(55ch + 64px)`** · **Bolt's `optimal` = 75ch** · **Vibes uses a range rather than steps** (min 640 / max 1120) |

**"Modal width" comes out of a different axis in each system.** Keeping a dedicated scale is
the majority, but **twelve systems do not decide the width at all**, and among them Origami
has zero `max-width` in CSS and measures at runtime in JS. The opposite extreme is **Vibe** —
its px width itself grows in three steps by media query (small 460 → 480 → 520). Neither
fixed px nor viewport %, but a third method.

### Default width — 450–520px is the mode, and 512 is right in the middle

```
450–520  ~14   Ring UI 464 · NASA WDS 480 · Shoelace 496 · Blueprint, Base Web,
               Bootstrap, Italia, SGDS and Vapor 500 · shadcn/ui, Backpack, Chakra
               and Codex 512 · Forma 36 520
540–600  ~12   Vibe 540 · Evergreen 560 · Clarity 576 · Yoga 580 ·
               Helios, LeafyGreen, PIE, Vitamin, Stacks, Welcome UI, Kaizen and
               Siemens iX 600
608–680  ~11   Paste 608 · eBay 616 · Nord 620 · Pharos 624 · Thumbprint 632 ·
               Cedar, Skeleton and Priceline 640 · Braid 660 · Mistica and HSDS 680
400–448   ~9   Serendie 408 · NYSDS 439 · Canvas, Mantine and Charcoal 440 ·
               Naive UI 446 · Astro, Semi and HeroUI 448
700 and up ~8  Gestalt 720 · smarthr 728 · Orbit 740 · KRDS 760 · Strapi 830 ·
               Auro 986 · Protocol 1200 · Vanilla 1280 (a ceiling)
below       1  Seed 272 — iOS's `UIAlertController` 270pt ported to the web
```

**The earlier "512px is an unobjectionable default" holds across the 79 samples.** It is in
the middle of the modal band (450–520), and four systems use that very value (shadcn/ui ·
Backpack · Chakra · Codex).
**The 440s and the 500s are two points of convergence** — the former for confirmation
dialogs, the latter for form modals.

**NYSDS's 439px stands out** — a literal 1px off the 4px grid, and not a token.

### Radius — it is not a "cluster at 8–12px"

```
0–4px    ~20   Astro, Auro, DSFR, Origami, Protocol, Thumbprint and Vanilla 0 ·
               Codex, Pharos and Pluralsight 2 · Blueprint, Cedar, Clarity, EUI, MUI,
               Siemens iX, Strapi, Tegel and Vuetify 4 · SGDS 4.8
5–8px    ~20   Nord 5 · Chakra, Forma 36 and smarthr 6 · Kaizen 7 ·
               Bootstrap, Italia, Helios, NYSDS, Paste, Ring UI, Stacks, Vapor,
               Vitamin, Unify, digital-go-jp, Serendie, Evergreen, NASA WDS and Cloudscape 8
10–14px  ~10   shadcn/ui 10 · Radix Themes 8 and 12 · Backpack V2, KRDS, Odyssey,
               PrimeVue, Semi and Welcome UI 12 · HeroUI 14 · Intergalactic 12/14
16–32px  ~19   Asphalt, Base Web, Gestalt, Kontur, Orbit, Pajamas, PIE, Vibe and Yoga 16 ·
               Seed and Spindle 20 · Braid, Charcoal, eBay, LeafyGreen, Porsche,
               Priceline and Vibes 24 · Canvas 32
```

> **Correction.** The earlier "the web systems cluster at 8–12px" was an observation of six
> samples.
> Across the 79, **the 0–4px camp and the 16–32px camp are each as thick as the 8–12px
> band** — not a cluster but **three groups.** And since **Canvas's modal is 32px**, "Apple's
> sheet (34px at the top) is of a different order, so do not bring it to the web" does not
> hold either.
> The difference between those two values is 2px. The "implementation defaults" below have
> been corrected accordingly.

**A camp that separates the radius by role is confirmed** — NYSDS (buttons 12 / modals 8 /
inputs 4) · Semi (controls 2 vs modals 12) · LeafyGreen (buttons and inputs 6 vs modals 24) ·
Pajamas (buttons 8 vs modals 16) · Asphalt (actions 6 vs containers 16, **with the token
names split by purpose**). Conversely, **Pharos and Codex unify everything from buttons to
modals on a single minimum radius** (2px).

**Mistica has no modal-specific radius value** — it reuses the same `container` slot as the
card, so it parts into 16/8/4px by skin.

### The overlay — it is not all black

> **Correction.** The earlier "the sample is entirely of the black family (the lightest being
> shadcn/ui's 10% black plus a blur)" is wrong. **There is a light-scrim camp of five:**
> **bf-solid at 90% white** · **Codex at 65% white** (light mode only; dark is 65% black) ·
> **Park UI's `white.a10` plus a 4px blur** · **Cedar's sand `#f7f5f3d9` plus a 16px blur** ·
> **Bolt's `--overlay-light` variant** (0.8 black is the default, white is the option).

The density distribution:

```
0.2–0.32   Origami and Strapi .2 · Welcome UI ≈.23 (assembled by color-mix) · Kontur .24 ·
           Vapor and Vuetify .32
0.4–0.5    Braid (light) · Ring UI (light) · Paste · PrimeVue (light) .4 ·
           Shoelace 33% grey · Astro, Bootstrap, SGDS, Grommet, Kaizen, Orbit,
           Pharos, Pluralsight, Vibes and HeroUI .5
0.55–0.7   Siemens iX .549 · PIE .55 · Semi, LeafyGreen, Braid (dark) and
           PrimeVue (dark) .6 · DSFR .64 · Codex .65 (white) ·
           Backpack, EUI, Evergreen, NYSDS, eBay, Vibe and Ring UI (dark) .7
0.75–0.9   Forma 36 and Skeleton .75 · Asphalt, Gestalt, Italia, Bolt, Thumbprint,
           Vitamin and Spindle .8 · Cedar, Protocol and Vanilla .85 · bf-solid .9 (white)
```

**0.5 is the mode, and the whole range from 0.2 to 0.9 is filled.** There is no "standard
density".

**At least ten use a tinted scrim rather than pure black** — eBay's ink `rgb(17 24 32)` ·
NYSDS's `#1b1b1b` · EUI's and Evergreen's blue-grey (two data tools independently at nearly
the same value) · Paste's navy `#06033a` · Vibe's navy `rgb(41 47 76)` · Yoga's plum
`#231B22` · Priceline's `#001833` · Strapi's `#32324d` · Asphalt's `#32333a` · Semi's
`rgb(22 22 26)`.

**Four ways of making scrim density an axis:**

| axis | systems |
|----|--------|
| colour mode | Braid .4/.6 · Ring UI .4/.7 · PrimeVue .4/.6 · Codex white/black · Park UI white/black · Vitamin (the hsl components of the inverse background) |
| **three semantic tokens** | **Priceline** — the same `#001833` at dark .75 / medium .5 / light .25 |
| **nesting depth** | **Intergalactic** — the scrim of a modal over a modal damps automatically to `overlay-secondary` |
| shared with another concept | **Vapor** — scrim 0.32 = disabled 0.32 (a system-wide "damping constant") |

**Five use a blur alongside** — shadcn/ui's Drawer · Cedar's 16px · Park UI's 4px ·
**Porsche's 32px** · HeroUI (a `blur` backdrop as a first-class variant). Porsche kills the
native `::backdrop` with `display:none` and makes the `<dialog>` itself the frosted layer.

### The native `<dialog>` — ten systems, five of them with `@starting-style`

| level of adoption | systems |
|-----------|--------|
| `<dialog>` + `::backdrop` | Asphalt · Backpack V2 · digital-go-jp · Helios · Porsche |
| **`<dialog>` + `@starting-style` + `transition: display allow-discrete`** | **eBay · LeafyGreen · PIE · Skeleton · Spindle** |
| turning `::backdrop` off for their own overlay | **Helios** (`display:none` plus a separate element) · **Porsche** (the dialog itself is the scrim) |

**The camp handling entry and exit without JS using 2024+ CSS has grown to five** — a place
where each system's documentation, unaware of the others, records itself as "the first case
in the sample".

### Entry against exit — the majority is a longer entry, but exceptions are real

| relationship | systems |
|------|--------|
| **entry > exit** | Semi 120/90 · Vibe 150/100 · Chakra, Radix Themes and Seed 200/100 · Strapi 200/120 · Vuetify 225/125 · MUI 225/195 · Atlassian 250/200 · PIE 250/150 · Priceline 250/150 · Kaizen 300/200 · Thumbprint 300/250 · Spindle 350/150 · Park UI 400/200 · Clarity 400/300 · Porsche 400/250 · Material Web 500/150 |
| **symmetric** | LeafyGreen 150/150 · shadcn/ui, Evergreen, Forma 36 and Naive UI 200/200 · Codex, Skeleton and Shoelace 250/250 · smarthr and PrimeVue 300/300 · Base Web and Gestalt 400/400 |
| **exit > entry** | **Stacks** — entry opacity 100ms / **exit opacity 200ms** |
| **a two-stage choreography making the total jump** | **Audi** — a 0.4s fade plus **a 0.4s delay = 0.8s in total** (only the morph variant has no delay) |

> **Correction.** The earlier "entry is long and exit short" was an observation of four
> samples.
> Across the 79, **entry > exit remains the majority (18)**, but **the symmetric camp is 12**,
> so it is not "the whole sample". And **Stacks' exit is twice its entry**, a clear
> inversion, while **Audi spends 0.8s on entry alone**, the slowest modal in the sample.

**The ceiling on the asymmetry ratio is Material Web's 3.3× (500/150)** — an order apart from
the web samples (1.0–2.0×). **Only Park UI has fossilised its 2:1 asymmetry in the animation
token names** (`animations.dialog-in/out` = 400/200ms).

**Even within the symmetric camp the axis of adjustment parts** — Naive UI is symmetric only
in time and asymmetric in curve (easeOut in, easeIn out), while PrimeVue is completely
symmetric down to the curve (`cubic-bezier(.19,1,.22,1)` at 300ms both ways).

### Entry scale — the mode is not 0.95 but 0.8

```
0.5    Blueprint · Kaizen
0.6    bf-solid (`scale3d(.6)`) · Stacks (0.6 plus translateY 30%)
0.675  Paste (spring physics)
0.7    Semi
0.75   eBay
0.8    Braid · Evergreen · Mistica · HSDS · Shoelace · Grommet · Strapi · Vibe   ← the mode, eight
0.85   Forma 36
0.9    Backpack · Naive UI · Vapor · Priceline
0.93   PrimeVue
0.95   Atlassian · shadcn/ui · Bolt · Chakra · Cloudscape (keyframes)
0.97   Radix Themes · Nord
1.3    Seed — **a shrinking entry** (coming down from larger). The only reversal in the sample
```

> **Correction.** "A 95% scale is the sample's majority value" is wrong. **The mode is 0.8
> (eight)** and 0.95 is five. **There is even a camp going down to 0.5** (Blueprint,
> Kaizen). Ninety-five per cent is not "the sample majority" but **the value of the systems
> using Material-family curves.**

**Only HeroUI's exit goes the other way** — on the desktop it **grows to 103%** as it
disappears. It parts from the shrinking-exit majority (Semi 0.7 · Naive 0.9 · PrimeVue
0.93).

### Travel — "a centred modal does not move" was the minority

> **Correction.** The earlier "a modal at the centre of the screen does not move" was an
> observation of two samples, Atlassian and shadcn/ui. **Across the 79, using travel as well
> is the larger side.**

| direction | systems |
|------|--------|
| coming down from above | Bootstrap, Pajamas and SGDS `-50px` · **Clarity `-15rem`** · PIE `-40px` · Nord `-10px` · Siemens iX `-40px` (its default placement is the top) |
| rising from below | Base Web 20px · EUI 40px · Park UI and Priceline 64px · **Porsche `25vh`** · Pluralsight 8px · Stacks `30%` |
| a whole slide-up (a bottom sheet) | Charcoal · Thumbprint (mobile) · Orbit (mobile) · Auro (mobile) · Spindle's sheet · Seed's bottom sheet |
| **flying from the trigger** | **Vuetify** — a container-transform (hero) transition, **stretching the duration 1–1.5× with the distance travelled** |
| no travel (scale only) | Atlassian · shadcn/ui · Chakra · Bolt · Backpack · Braid · Evergreen · Mistica · HSDS · Shoelace · Grommet · Strapi · Vapor · Semi · Kaizen · Blueprint · Forma 36 · PrimeVue |

**Bootstrap's `-50px` drop-in founds a lineage** — Pajamas and SGDS do not redefine it in
their gl/sgds layers and inherit it as-is. What emerges here is that **the widest diffusion
path for modal entry motion is framework inheritance.**

### The camp with no entry motion at all — ten systems

**NYSDS** (zero transitions or keyframes) · **Vanilla** · **Yoga** · **Vitamin** ·
**Ring UI** · **Tegel** (no CSS entry animation) · **Gestalt** (only the scrim fades, over
400ms linear; the panel is instant) · **Pharos** (only the overlay, 250ms) · **Thumbprint**
(`transition:none` on the desktop, only the curtain fades) · **Orbit** (no motion on the
desktop; a slide on mobile only).

**"Move only the curtain and place the body instantly" is an independent convention** —
Gestalt, Pharos and Thumbprint arrived at the same decision. It loads the perceptual cost of
a modal's arrival onto the scrim alone.

### Systems that actually use an overshoot on modal entry — eight

| system | curve | overshoot |
|--------|------|:---:|
| **EUI** | `bounce (.34, 1.61, .7, 1)` — the default entry easing | y₁ 1.61 |
| **Clarity** | `easing-secondary (0, 1.5, 0.5, 1)` | y₁ 1.5 |
| **Semi** | `(0, 0, 0.26, 1.38)` | y₂ 1.38 |
| **eBay** | `bounce (0.3, 0, 0, 1.25)` | y₂ 1.25 |
| **Kaizen** | `bounce-in (0.485, 0.155, 0.24, 1.245)` | y₂ 1.245 |
| **HSDS** | `boop (0.175, 0.885, 0.325, 1.2)` | y₂ 1.2 |
| **Blueprint** | `(0.54, 1.12, 0.38, 1.11)` | y₁ 1.12 |
| **Vapor** | `(.45, 1.005, 0, 1.005)` | 1.005 |

**`systems/blueprint.md` and `systems/kaizen.md` each recorded that "it is the only one
actually applying an overshoot to a modal entry", and both are wrong** — there are at least
eight. The detailed ranking is in the re-synthesis section of `motion.md`.

### The mobile transition — it is not that there is no rule; the values are all different

| breakpoint | system · transition |
|:---:|--------|
| 480px | NYSDS — a `column-reverse` footer below it |
| **481px** | Thumbprint — full screen plus a slide-up below it |
| **570px** | Pharos — full screen plus a `top 500ms` slide (a literal, not a token) |
| **575.98px** | Pajamas — the footer buttons stack vertically |
| 576px | Orbit (a bottom sheet) · **Clarity** (full screen plus radius 0) |
| 600px | Asphalt (a bottom sheet in CSS alone) · Bolt (full screen plus **removing the overlay**) |
| 512px (32rem) | Backpack — full screen |
| 640px (`sm`) | shadcn/ui |
| 768px | Canvas (a bottom sheet) · Auro (a bottom sheet) · EUI (full screen) · DSFR (**bottom-aligned by default below it**) |
| **1024 × 550** | **Mistica** — gating on **width and height together** |
| swapping the component | Gestalt (`SheetMobile`) · Seed (a separate bottom sheet) · HeroUI (`placement: auto`) · Priceline (a `sheet` prop) · Serendie (**reversing only the button order under a media condition**) |

> **Correction.** The earlier "no sample anywhere prescribes a transition breakpoint" was an
> observation of one system, shadcn/ui. **At least 20 systems prescribe a value** — the
> problem is not the absence of a rule but that they are **all different: 481 · 570 · 575.98
> · 576 · 600 · 640 · 768px.**

**Two systems are confirmed to set the transition point to the same value as the modal's
default width** —
**Backpack** (a 32rem modal width = a 32rem full-screen breakpoint) and
**Clarity** (a default modal width of 576 = a 576px full-screen breakpoint). One number
serves two roles, so they cannot fall out of step.

### Modal width and beyond the scrim — three practical devices surfaced this time

- **Two systems provide close-refusal feedback by default** —
  **Bootstrap** (`$modal-scale-transform: scale(1.02)`, exposed as a variable) ·
  **Shoelace** (`denyClose`: a scale 1 → 1.02 → 1 pulse over 250ms, included in the default
  animation set).
  Two systems independently arrived at **the same 1.02 factor.**
- **One system announces "outside click = close" with the cursor** — only **Gestalt** changes
  the scrim cursor to `zoom-out` when `closeOnOutsideClick`.
- **A sticky header is not Mantine's alone** — **Tegel and Vanilla** also make the modal
  header sticky. **DSFR makes the footer sticky** with a `margin-top: -2.5rem` overlap and a
  1px gradient divider that appears only while scrolling (`.fr-scroll-divider`).

## Implementation defaults

**Width — start with three steps.**

```
sm   400  (confirmation dialogs · short forms)
md   512  (the default. shadcn/ui's value)
lg   640  (content · tables)
```

**512px is an unobjectionable default** (re-confirmed 2026-08-18). Across the 79 samples
**the modal band for default width is 450–520px (about 14)**, 512 is in the middle of it, and
four systems use that value (shadcn/ui · Backpack · Chakra · Codex).

**The 440s and the 500s are two points of convergence.** Confirmation dialogs sit in the
440s (Canvas, Mantine and Charcoal 440 · Naive UI 446 · Astro, Semi and HeroUI 448), form
modals in the 500s. **Leaving the middle empty is fine** — it is why Mantine's increment
jumps from +60 to +180 between `md` and `lg`.

**Having no width steps at all is a majority choice too** — across the 79, 22 have a single
width and 12 have none. **If you do have steps, three to five is the convention**, and ten
(HeroUI) appears only when a utility scale is inherited.

**Padding**

```
24px  (fixed, regardless of the modal's size)
```

shadcn/ui is a fixed 24px and Radix Themes size 3 is the same value.

**If you tie it to the size, refer to the spacing tokens** (the Radix Themes way) —
`--space-3`–`6` (12/16/24/32). The radius may be bundled two steps at a time.

**Radius — choose from among the three groups** (corrected 2026-08-18).

```
0–4px    ~20  dense working, control-room and government (Clarity · EUI · MUI · Siemens iX · Tegel · Vuetify · DSFR · Astro)
5–8px    ~20  the general-purpose default (Bootstrap · Helios · NYSDS · Paste · Ring UI · Stacks · Vapor · Cloudscape)
10–14px  ~10  the framework family (shadcn/ui 10 · Radix Themes 8 and 12 · Semi · KRDS · HeroUI)
16–32px  ~19  consumer services and mobile grammar (Orbit · PIE · Pajamas · Braid · eBay · LeafyGreen · Canvas 32)
```

**The earlier edition said "the web systems cluster at 8–12px", from six observations.**
Across the 79 the **8–12px band is in fact the thinnest group**, with 0–4px and 16–32px each
twice its size.
**There is no "industry standard modal radius"** — choose by the character of the product.

**Apple's sheet (34/58px) is not of a different order from the web either** (corrected
2026-08-18).
**Canvas's modal is 32px**, 2px from Apple's sheet top (34px).
**Only Apple, though, differs between top and bottom**, so do not port the asymmetric radius.

**Decide first whether it differs from buttons and inputs.** A camp that separates by role
(NYSDS buttons 12 / modals 8 / inputs 4 · Semi controls 2 vs modals 12 ·
LeafyGreen controls 6 vs modals 24) parts from a camp that unifies everything (Pharos and
Codex at 2px).

**If you have a full-screen mode, force the radius to 0** (Mantine's `!important`).
Rounded corners left at the screen's edge look like clipping. Clarity, PIE and Bolt also
return the radius to 0 on going full screen.

**Screen margin — decide mobile first.**

```
inline  keep 16px of margin (max-width: calc(100% - 32px))
block   5dvh  or 32px
```

**Use `dvh`, not `vh`** (the Mantine way). `vh` does not update as a mobile browser's address
bar hides and reappears, and the modal gets clipped.

**Consider setting the bottom margin as `max(32px, 6vh)`** (the Radix Themes way).
The modal then does not stick to the bottom on a large screen.

**Put scrolling on two layers.**

```
outer (the overlay region)  when the modal is longer than the screen
inner (the content)         when the content is longer than the modal
```

Radix Themes puts `overflow: auto` on both `BaseDialogScroll` and `BaseDialogContent`.
With only one layer, a long modal either scrolls its header and footer along with it or gets
clipped outright.

**The overlay**

```
the black family at 50%   (the mode across the 79 samples)
```

**The whole range from 0.2 to 0.9 is filled — there is no "standard density".** Start at
0.5, and lower it when the context behind the modal has to stay legible (Kontur 0.24 ·
Origami and Strapi 0.2).

**Using a brand ink colour instead of pure black is nearer the majority** —
eBay's `rgb(17 24 32)` · Paste's navy · Vibe's navy · Yoga's plum · EUI's and Evergreen's
blue-grey.
**Tinting it in the same family as the background makes the scrim read as "a covered screen"
rather than "a switched-off one".**

**Decide whether to split the density by colour mode.** Braid .4/.6 · Ring UI .4/.7 ·
PrimeVue .4/.6 all go **darker in dark mode.** A black scrim over a dark background is simply
invisible if left alone.

**If you allow nested modals, damp the inner scrim automatically** (the Intergalactic way).
Two layers of the same density are effectively opaque.

**Animation**

```
entry    200ms   scale 0.8–0.95 → 1 plus a fade
exit     100ms   scale 1 → 0.97 plus a fade
overlay  entry 200ms / exit 160ms
```

**Set the exit at half the entry** (re-confirmed 2026-08-18). Across the 79 samples
**entry > exit is the majority at 18** — Radix Themes 200/100 · Chakra 200/100 ·
Seed 200/100 · Vibe 150/100. Since **the symmetric camp is 12**, though, it is not "a rule of
the whole sample".
**Keep the ratio to 2:1 at most** — Material Web's 3.3× (500/150) is an order apart from the
web samples.

**The modal scale across the 79 samples is 0.8** (corrected 2026-08-18). The earlier edition
recorded 95% as "the sample majority value", when it was **the value of five systems using
Material-family curves.**
Eight use 0.8 (Braid · Evergreen · Mistica · HSDS · Shoelace · Grommet · Strapi · Vibe).
**The smaller the confirmation dialog, the deeper the shrink can be** — Blueprint and Kaizen
come in from 0.5.

**Whether to add travel is not a matter of taste but the majority practice** (corrected
2026-08-18).
The earlier edition's "a modal at the centre of the screen does not move" was an observation
of two samples, and across the 79 **using travel as well is the larger side.** The values
part — −50px from above (the Bootstrap lineage) · +64px from below (Park UI, Priceline) ·
`25vh` (Porsche).
**If you add it, reduce the travel along with the scale** (Priceline: 64px in / 32px out —
it leaves by half the distance it arrived).

**Putting no motion on the modal body is a valid choice too** — ten systems across the 79.
Gestalt, Pharos and Thumbprint independently arrived at **"fade only the curtain (the scrim)
and place the body instantly"**. It loads the perceptual cost onto the scrim alone.

**Consider close-refusal feedback.** For a modal that does not close on a backdrop click,
Bootstrap and Shoelace independently arrived at the same value — **a `scale(1.02)` pulse.**

**Make the content disappear before the overlay** (Radix Themes: 100ms vs 160ms).
If the background lifts first, there is a frame in which the modal hangs in mid-air.

**To get the unmount timing right, consider a `no-op` animation.**
Radix Themes applies an `opacity: 1 → 1` animation to the overlay to keep it in the DOM until
the children have finished leaving.

**Accessibility — wrap the animation in `prefers-reduced-motion`.**

```css
@media (prefers-reduced-motion: no-preference) { /* the keyframes and their application */ }
```

The Radix Themes way. There is also Cloudscape's method of taking the duration to 0ms, but
**0ms is safer if any code depends on the animation-completion event** — the event still
fires.

**The close button**

```
top right, 16 / 16
a 16px icon
the same focus ring as the other controls
```

**shadcn/ui giving the close button a different focus ring is a consistency problem**
(`ring-2 ring-offset-2` against `ring-[3px]` elsewhere). Do not copy it.

**Setting the default opacity to 0.7 needs thought.** It lowers the contrast, so setting the
icon colour to `muted-foreground` and keeping the opacity at 1 is safer.

**The footer — set the mobile layout explicitly.**

```
< 640px   vertical, reversed (the primary action on top)
≥ 640px   horizontal, right-aligned (the primary action on the right)
```

shadcn/ui's `flex-col-reverse` → `sm:flex-row`.
**Putting the DOM order as `[secondary][primary]` makes both layouts line up automatically**
— the primary action on the right on the desktop, on top on mobile.

**Decide the breakpoint at which the modal becomes a bottom sheet** (corrected 2026-08-18).
The earlier edition said "no sample anywhere has a rule", when **at least 20 systems
prescribe a value** — all different, though: 481 · 570 · 575.98 · 576 · 600 · 640 · 768px.

**The cleanest solution is to set the transition point to the same value as the modal's
default width** — as Backpack (a 32rem width = a 32rem full screen) and Clarity (a 576 width
= a 576px full screen) do.
One number serves two roles, so they cannot fall out of step, and "the moment the modal grows
wider than the screen" becomes the transition point by definition.

**The transition method parts three ways.**

```
a shape change in CSS alone   Asphalt · Canvas · Orbit · Auro · DSFR · HeroUI
a full-screen transition      Backpack · Bolt · Clarity · EUI · Pharos · Thumbprint · PIE
swapping the component        Gestalt (SheetMobile) · Seed · shadcn/ui (dialog ↔ drawer/sheet)
```

**The larger side is the same component changing shape by viewport.** Splitting the component
(shadcn/ui) hands the transition decision to the consumer, and shadcn/ui in fact
**selects the primitive by whether touch gestures are needed** (vaul vs Radix) — its
criterion is the input method, not the viewport width.

**Decide whether to remove the overlay when going full screen.** Only Bolt removes it
explicitly — once the screen is fully covered the scrim is invisible and only its paint cost
remains.
