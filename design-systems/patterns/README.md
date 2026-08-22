<!-- lang-links -->
> **English** · [한국어](README.ko.md)
<!-- /lang-links -->

# patterns/ — cross-system comparison by component axis

Where `systems/` organises the material **by system**, this organises it **across
components**. This is the side you actually open when building UI.

> **All nine written.** Every planned pattern document has been filled in.
>
> | file | evidence |
> |------|------|
> | `typography.md` | type scales — obtained from most of the sample |
> | `color.md` | palette **structure** (the full hex values are left to the source links) |
> | `button.md` | tokens + Figma measurements + the shadcn/ui source |
> | `form.md` | the component CSS and source of three frameworks + Cloudscape's density tokens |
> | `motion.md` | motion tokens from nine systems (Atlassian 68 · Cloudscape 15 · Canvas · Codex and others) |
> | `modal.md` | six systems (three frameworks + Atlassian's motion + Cloudscape + Apple's sheet) |
> | `table.md` | four systems (three frameworks + Cloudscape's density and contexts) |
> | **`navigation.md`** | **six systems** (shadcn/ui's 21KB `sidebar.tsx` + Cloudscape's contexts + Apple and CarPlay) |
> | **`feedback.md`** | **six systems** (Cloudscape's five severity steps and four contexts + Atlassian's `motion.flag.*`) |
>
> **The last six only became writable once the framework family came in.**
> Before that they were entries recorded as "not started, the evidence being two or three
> lines".
>
> **What filled the gaps:**
>
> | resource | what it opened |
> |------|-----------|
> | **published component source** (shadcn/ui) | variants, states, padding, focus rings, animation, `:has()` conditional layout |
> | **shipped component CSS** (Radix Themes · Mantine) | dimensional variables, `max()` and `calc()` derivation rules, practical accommodations such as sticky and `dvh` |
> | **source comments** | the `border-collapse` × `sticky` collision (Mantine), the overlay unmount trick (Radix Themes) |
> | **a second token axis** (Cloudscape) | density (`comfortable`/`compact`) · eight context overrides · contrast ratios |
> | **composite motion tokens** (Atlassian) | per-component entry, exit and repositioning, delay, `fill`, transitioned properties |
>
> **In an environment where the documentation sites are blocked, systems that ship only
> tokens have clear limits.**
> Systems that publish their source or component CSS open far more axes.
>
> **What still cannot be filled — all of it "judgement guidance".**
>
> - does a modal close on a backdrop click
> - how many primary buttons per screen
> - is an error shown while typing or on blur
> - how is the sort UI displayed
> - how many seconds does a toast show, and where on screen
> - sidebar or top navigation
> - label above or to the left
>
> **The values are in the code and the judgements only in the documentation.** Each document
> states them item by item in its **"not yet filled in"** section.

## Written — nine

| file | axes covered |
|------|----------|
| `typography.md` | default body size, tracking direction and unit, how the scale is defined, line height, emphasis, family separation, per-language typefaces |
| `color.md` | layer structure, state handling, dark mode, high contrast, contrast ratios, colour spaces (OKLCH, P3), chart colours |
| `button.md` | height and touch target, radius, padding, icon size, the state set, the focus ring, transition durations |
| `form.md` | input height, padding, checkbox dimensions, the error-state hook, focus indication, cursor, the Select dropdown |
| `motion.md` | the five levels of tokenisation depth, duration, easing naming axes, transitioned properties, keyframes, per-component motion, accessibility |
| `modal.md` | width, padding, radius, screen margin, the overlay, animation, the close button, the footer's mobile layout |
| `table.md` | the three density methods, cell padding, row height, how boundary lines are expressed, sticky headers, the hover touch branch, numeric alignment |
| **`navigation.md`** | **sidebar width, item height and state persistence, tab active markers and tracking correction, breadcrumbs, the top-navigation context** |
| **`feedback.md`** | **the two severity axes, alert dimensions, icon alignment, toast motion (`reposition`), badges, contextual alpha adjustment** |

There is no `spacing.md` — **`../tokens/scales.md` already covers it.**

## What to extend next

Every pattern axis is open; what remains are the **"not yet filled in"** items of each
document. Those with evidence already in hand were written up first.

| target | what is needed |
|------|-------------|
| ~~shadcn/ui's 24 style variants~~ | **resolved** — `apps/v4/styles/` was build output (gitignored), and the eight sources `registry/styles/style-*.css` were analysed. From the same code the default button ranges 28–40px, the radius splits three ways (pill/middle/square), and a `min()`-clamped radius was found. `systems/shadcn-ui.md`, "what actually differs between the eight styles" |
| ~~shadcn/ui's unverified components~~ | **resolved** — all six confirmed in the v4 style CSS. Sheet `w-3/4` with a `max-w-sm` ceiling, the Drawer overlay `black/10` plus a blur, NavigationMenu's eight direction-aware slide rules, Empty's dashed border, and Pagination assembled from Button. `systems/shadcn-ui.md` |
| ~~Mantine's component CSS~~ | **resolved** — five files analysed. Notification's 6px colour bar (inset by the radius), Switch's five axes × five steps (5–11px type for the track labels), Radio's pop transition (opacity 100 / transform 200ms), ModalBase's sticky header plus a 5px scrollbar correction. Folded into `feedback.md`, `form.md` and `modal.md` |
| ~~Radix Themes' component CSS~~ | **resolved** — `text-field.css` (adopting text-indent, a focus ring on the Root, a 0.5px jitter correction) and `tab-nav.css` plus `base-tab-list.css` (reserving the width against a weight change with a transparent duplicate label; Tabs and TabNav sharing a base). Folded into `form.md` and `navigation.md` |
| ~~Cloudscape's remaining contexts~~ | **resolved** — `app-layout-toolbar` re-declares 563 tokens with exactly one real difference (`color-background-layout-main`, half a step). All eight contexts confirmed. `feedback.md` |
| **Apple's motion** / ~~M3's easings~~ | Apple: there is no motion in the Figma kit and **the HIG motion page was confirmed to have no figures either** — the figures are at the SwiftUI API layer. **M3 is resolved** — ten easings, 16 duration tokens and the Expressive spring sets obtained from androidx's `MotionTokens.kt` (`motion.md`) |
| ~~The z-index scale~~ | **resolved** — Chakra (13 purpose-named steps) · Bootstrap · Open Props · Forma 36 · Vibes · Solid (BuzzFeed) · Pluralsight — **seven tokenise it, with seven arithmetics.** See `systems/chakra-ui.md`. The **ordering** of the levels contradicts between systems, though |
| ~~Toast duration~~ | **a first sample obtained** — Tizen CircularUI's `Toast.DisplayText(text, duration = 3000)`. **3000ms is the API default** (`systems/tizen-circularui.md`). The position is still unobtained |

## Format

```markdown
# <component>

## <decision axis>
| system | <option A> | <option B> |
|--------|---------|---------|

→ a line or two interpreting the convergence or divergence.

## Implementation defaults
```

## Rules

- **Take as an axis a decision that genuinely parts.** What everyone does the same way cannot
  be an axis.
  "A button has a hover state" is not an axis; "does hover change the background or the
  shadow?" is.
- **Do not leave a table on its own.** Without interpretation it is merely transcribed
  material.
  Write what converges and what parts, and if it parts, why.
- **`Implementation defaults` is the point.** The other sections are the evidence for that
  conclusion.
- **State the sample size.** Something observed in four systems and something observed in 20
  differ in confidence.

## The collected defaults

**`implementation-defaults.md`** — a single file collecting the "implementation defaults"
sections of the nine pattern documents. The evidence and cross-system comparisons are in each
document.
