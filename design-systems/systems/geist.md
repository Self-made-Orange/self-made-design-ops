---
name: Geist
org: Vercel
coverage: partial
url: https://vercel.com/geist/introduction
repo: null
license: "unverified (neither vercel.com/design.md nor vercel.com/geist/vercel-brand.css carries a licence statement; the font is a separate package — npm geist@1.7.2, SIL OFL-1.1, github.com/vercel/geist-font)"
tech: [React]
figma_kit: "unverified (the typography page states the classes are based on the Geist Core Figma system; whether that file is published was not confirmed)"
tokens_format: [CSS, Tailwind]
a11y_target: "WCAG AA (no version stated — confirmed 2026-09-03)"
platform: web
domain: enterprise
verified: 2026-09-03
source: "vercel.com/geist/{introduction,colors,typography,grid} + vercel.com/geist/vercel-brand.css (108KB) + vercel.com/design.md (369 lines), fetched 2026-09-03"
---
<!-- lang-links -->
> **English** · [한국어](geist.ko.md)
<!-- /lang-links -->

## In one line

Vercel's system — the body scale is **split in two by line count** (`Label` for single
lines, `Copy` for multiple), every colour scale assigns **a fixed role to each of its ten
steps**, and the brand layer is published as **a Markdown file for agents plus a separate
stylesheet**, so the values never enter the model's context.

## Tokens

> **Two sources, two scopes.** The type and colour scales below are the documented Geist
> foundations. The numeric token table further down comes from `vercel-brand.css`, which is
> scoped to **brand report pages**, not the whole product surface. They are not the same
> layer and are recorded separately.

### Typography — three roles, named by pixel size

```
Heading   72 · 64 · 56 · 48 · 40 · 32 · 24 · 20 · 16 · 14
Copy      24 · 20 · 18 · 16 · 14 · 13        (+ mono at 13)
Label     20 · 18 · 16 · 14 · 13 · 12        (+ mono at 14 · 13 · 12)
Button    16 · 14 · 12
```

- **`Label` and `Copy` split the body scale by line count.** The source describes Label as
  designed for single lines with ample line-height for pairing with icons, and Copy as
  designed for multiple lines with a higher line height. The two overlap across 13–20px —
  **the same size exists twice, under two names.**
- **Consumed as Tailwind classes** (`text-copy-16`, `text-label-14-mono`). Each class
  presets `font-size`, `line-height`, `letter-spacing` and `font-weight` together; the
  source states they are based on the "Geist Core Figma system".
- **`<strong>` nested inside a typography class is the Strong modifier** — the weight
  variant is expressed through HTML nesting, not a separate class.
- Tabular numerals are called out on `text-label-13`; mono variants exist only at 14 and
  below.

### Colour — ten scales, and a role fixed per step

Scales: `Backgrounds` · `Gray` · `Gray alpha` · `Blue` · `Red` · `Amber` · `Green` ·
`Teal` · `Purple` · `Pink`. P3 is used on supporting browsers and displays.

| Steps | Stated role |
|-------|-------------|
| 1–3 | component backgrounds — default / hover / active |
| 4–6 | borders — default / hover / active |
| 7–8 | high-contrast backgrounds — base / hover |
| 9–10 | text and icons — secondary / primary |

- **The step number carries the role across every scale.** Step 4 is a default border
  whether the scale is Gray or Blue.
- Page backgrounds are a separate two-value set: Background 1 (default) and Background 2,
  which the source says to use sparingly for subtle differentiation.
- The source states steps 9–10 are designed for accessible text and icons.

### The brand-report token set (`vercel-brand.css`)

120 custom-property declarations, all prefixed `--vbg-`, colours written in **`oklch()`
wrapped in `light-dark()`** so both themes sit in one declaration.

```
space   1..16 → 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 px   (base 4)
type    metadata/label .8125 · compact .875 · body 1 · lede 1.125 · subsection 1.25 ·
        section 1.5 · title 2 · page-title 2.5 · display 3 rem
leading caption 18 · compact 20 · body 24 · subsection 26 · lede 28 · section 32 ·
        title 40 · page-title 48 · display 56 px   (fixed px)
weight  regular 400 · heading 450 · medium 500 · semibold 600
radius  8px · small 6px
```

- **`weight-heading: 450`** — a non-standard variable-font weight sitting between regular
  and medium. It is the only heading weight in the set.
- **Measure and width are tokens, not layout code**: `reading-width 68ch` ·
  `title-measure 24ch` · `compact-title-measure 30ch` · `display-measure 20ch` ·
  `content-width 1200px` · `chart-min-width 640px`.
- **Two control heights**: `control-height 36px` and `control-height-touch 44px`.
- **Spacing is re-exported under semantic flow names** — `flow-tight` → space-2,
  `flow-copy` → space-4, `flow-group` → space-8, `flow-section` → space-16. The raw step
  and the rhythmic role are both addressable.
- Chart series colours (`chart-1`..`chart-6`) resolve to **grays only**
  (`gray-1000/900/800`, repeated). No hue is assigned to a data series by default.

## Components

**72 documented** on the Geist site:

Avatar · Badge · Banner · Book · Breadcrumbs · Browser · Button · Calendar · Checkbox ·
Choicebox · Clearable Input · Code · Code Block · Collapse · Combobox · Command Menu ·
Context Card · Context Menu · Copy Button · Description · Destructive Action Modal ·
Dots Menu · Drawer · Empty State · Entity · Error · Error Card · Feedback · Fieldset ·
File Tree · Gauge · Grid · Input · JSON View · Keyboard Input · Label · Load More Button ·
Loading Dots · Menu · MiddleTruncate · Modal · Multi Select · Note · Pagination · Phone ·
Pill · Progress · Project Banner · Radio · Relative Time Card · Scroller · Search Input ·
Select · Separator · Sheet · Show more · Skeleton · Slider · Snippet · Spinner ·
Split Button · Status Dot · Switch · Table · Tabs · Text With Copy Button · Textarea ·
Theme Switcher · Toast · Toggle · Tooltip · Video

**The components are documented but not distributed.** `@vercel/geist` returns 404 on the
npm registry (checked 2026-09-03); the published `geist` package is **the typeface only**.

> **Not to be confused with `@geist-ui/core`** — a separate community React library at
> `github.com/geist-org/geist-ui`, unrelated to Vercel's Geist.

## Characteristic decisions

- **The body scale is split by line count rather than by size.** Label (single-line) and
  Copy (multi-line) both cover 13–20px, so choosing a text style means first answering how
  many lines it runs to. In the rest of the sample a body scale is a single ladder of
  sizes.
- **Role is attached to the step index, not to a token name.** Steps 1–3 are component
  backgrounds and 4–6 borders in every one of the ten scales, so a semantic layer is
  reached by changing the hue and holding the index.
- **The agent-facing brand layer is split into prose and stylesheet.** `vercel.com/design.md`
  carries judgement and contains almost no numbers; the values live in
  `vercel.com/geist/vercel-brand.css`, which the browser loads at render time. See
  `../INTEROP.md` §6 — **it is a different contract from the Google Labs `DESIGN.md`
  despite the shared filename.**
- **The brand layer names the anti-patterns it rejects.** `design.md` lists roughly
  eighteen recognisable generated-design defaults to avoid — among them decorative
  gradients and glows, centred hero copy above a card grid, cards nested inside cards,
  badges used for ordinary metadata, charts wrapped in dark rounded rectangles, and legends
  that replace direct labels. It then states that avoiding them must not turn into a
  sterile anti-design template.
- **Chart colour is withheld by default.** The six chart series slots all resolve to grays.
  `design.md`'s accessibility section states that colour is never to be relied on alone.
- **The CSS API forbids synonyms.** `design.md` instructs agents to use the exact published
  child class names and gives `vbg-stat-note` for `vbg-stat-detail` as an example of an
  invented name not to use. 133 `.vbg-` classes are published across shell/layout, type and
  evidence, and calculator groups.

## Accessibility

- **Stated target: WCAG AA, with no version given** — `design.md`'s accessibility section
  states the page must meet WCAG AA and never rely on colour alone. No 2.1 or 2.2 appears
  in the file.
- The colours page describes the system as high contrast and accessible, and designates
  steps 9–10 of each scale as the accessible text and icon steps.
- `design.md` further requires landmarks, a single descriptive `h1`, ordered headings, a
  skip link, native controls, semantic tables, visible focus and text alternatives, and
  states that source order is to be treated as reading order.
- Responsive rules stated: give grid and flex children `min-width: 0`, reflow before
  shrinking, and keep the page usable in light and dark without a visible theme switcher.
  `.vbg-skip-link` and `.vbg-visually-hidden` are published classes.

## References

- Geist introduction — https://vercel.com/geist/introduction
- Colours — https://vercel.com/geist/colors
- Typography — https://vercel.com/geist/typography
- Grid — https://vercel.com/geist/grid
- Agent-facing brand file — https://vercel.com/design.md
- Brand stylesheet (token source) — https://vercel.com/geist/vercel-brand.css
- Typeface — `npm geist@1.7.2` (SIL OFL-1.1) · https://github.com/vercel/geist-font
- Announcement — https://vercel.com/blog/how-our-agents-build-on-brand-pages-with-design-md
