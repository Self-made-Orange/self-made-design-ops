---
name: Primer
org: GitHub
coverage: full
url: https://primer.style
repo: https://github.com/primer/primitives
license: MIT
tech: [React, Rails/ViewComponent, CSS]
figma_kit: true
tokens_format: [JSON, CSS]
a11y_target: "WCAG 2.2 AA (stated — primer.style/guides/accessibility, confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "github primer/primitives@dccf2af9db → src/tokens/base · npm @primer/primitives@11.10.0 → src/tokens/base/{color,typography} · src/tokens/functional/{color,typography} · dist/css/functional/themes/*.css · dist/internalCss/*.css"
---
<!-- lang-links -->
> **English** · [한국어](primer.ko.md)
<!-- /lang-links -->

## In one line

The design system behind GitHub's products, built around screens peculiar to developer
tooling — code views, diagrams and the like.

## Tokens

### Size / spacing

**The token key is the px figure** — the key `16` holds the value `16px`. Nothing needs
interpreting, at the cost of a structure where changing the scale means changing the keys too.
(The final name form once built into CSS variables is unverified.)

```
2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 64, 80, 96, 112, 128
```

The increment pattern: 2px steps → 4px steps (from 8 to 48) → 16px steps (after 48).

### The negative scale

Primer provides **negative tokens as first-class.**

```
-2, -4, -6, -8, -12, -16, -20, -24, -28, -32, -36, -40, -44, -48
```

Exactly symmetric with the positive scale up to 48. There are no negatives beyond 64.

Source: `src/tokens/base/size/size.json5`

### Border widths

| token | value |
|------|-----|
| `borderWidth.thin` | 1px |
| `borderWidth.thick` | 2px |
| `borderWidth.thicker` | 4px |
| `borderWidth.default` | → `thin` (1px) |

Source: `src/tokens/functional/size/border.json5`

### Typography

~~Unverified — `src/tokens/base/typography` needs checking~~ → **resolved (2026-08-18,
`@primer/primitives@11.10.0`).**

**The base tier — six sizes (rem), four weights, five line heights (unitless)**
(`src/tokens/base/typography/typography.json5`)

| `base.text.size` | rem | px | the source's description |
|------|:---:|:---:|------|
| `xs` | 0.75 | 12 | captions and dense UI |
| `sm` | 0.875 | **14** | **the UI's default body** |
| `md` | 1 | 16 | larger body and small headings |
| `lg` | 1.25 | 20 | medium headings and subheadings |
| `xl` | 2 | 32 | large headings and page headings |
| `2xl` | 2.5 | 40 | hero display |

**After 20px comes 32px directly** — there is no 24 and no 28.

| `base.text.weight` | value |
|------|:---:|
| `light` | 300 |
| `normal` | 400 |
| `medium` | 500 |
| `semibold` | **600** (the maximum) |

**There is no 700 (bold).** The weight ceiling is 600.

| `base.text.lineHeight` | value |
|------|:---:|
| `tight` | 1.25 |
| `snug` | 1.375 |
| `normal` | 1.5 |
| `relaxed` | 1.625 |
| `loose` | 1.75 |

**Each line-height token records in its `$description` when to use it** —
`normal` says "use this if you are not sure which", while `loose` says "reserve it for very
small type or where maximum legibility is needed". **The selection rule, not just the value,
ships with the token.**

**The functional tier — eight roles** (`src/tokens/functional/typography/typography.json5`)

| role | size | line height | weight | typeface |
|------|:---:|:---:|:---:|------|
| `display` | 40px (`2xl`) | 1.375 | 500 | sansSerifDisplay |
| `title-large` | 32px (`xl`) | 1.5 | 600 | sansSerifDisplay |
| `title-medium` | 20px (`lg`) | 1.625 | 600 | sansSerifDisplay |
| `title-small` | 16px (`md`) | 1.5 | 600 | sansSerif |
| `subtitle` | 20px (`lg`) | 1.625 | 400 | sansSerifDisplay |
| `body-large` | 16px (`md`) | 1.5 | 400 | sansSerif |
| `body-medium` | **14px (`sm`)** | 1.5 | 400 | sansSerif |
| `body-small` | 12px (`xs`) | 1.625 | 400 | sansSerif |
| `caption` | 12px (`xs`) | 1.25 | 400 | sansSerif |
| `codeBlock` | **0.8125rem (13px)** | 1.5 | 400 | monospace |
| `codeInline` | **0.9285em** | — | 400 | monospace |

- `codeInline` is in **`em`** — proportional to its parent. It has no line-height token.
- `codeBlock`'s 13px is not in the base scale (specified directly in the functional tier).
- The `title-medium` comment says in the source that **20 × 1.625 = a 32px line height that
  matches the medium control height** — a rare case of the rationale for aligning leading to
  a control height being written down.
- The `caption` comment says **"it is too small to pass accessibility requirements, so use it
  only in single-line situations"** — a token stating its own limits.

**There are CSS `font` shorthand tokens.**

```css
--text-body-shorthand-medium:
  var(--text-body-weight) var(--text-body-size-medium)
  / var(--text-body-lineHeight-medium) var(--fontStack-sansSerif);
```

All eleven roles have a `*-shorthand` token, and **the individual property tokens are exposed
alongside.** Unlike Atlassian's literal strings, which cannot be decomposed, Primer's
shorthand is a composition of `var()`s, so **both are usable.**

Four font stacks. `system`, `sansSerif` and `sansSerifDisplay` **hold completely identical
values** (`"Mona Sans VF", -apple-system, BlinkMacSystemFont, "Segoe UI",
"Noto Sans Backtick Fix", "Noto Sans", Helvetica, Arial, sans-serif,
"Apple Color Emoji", "Segoe UI Emoji"`) and differ only in name — a source comment states
that `sansSerifDisplay` is "the same as sansSerif but semantically distinct". Only
`monospace` actually differs.
There are no tracking tokens.

### Colour

~~Unverified — `src/tokens/functional/color` needs checking~~ → **resolved (2026-08-18).**
The full hex list is not reproduced (`../SCHEMA.md`) — only the structure.

**Three tiers, and the bottom one is excluded from the public distribution.**

| tier | source | public CSS |
|------|------|------|
| base ramps | `src/tokens/base/color/{light,dark}/*.json5` | **none** — only in `dist/internalCss/` |
| functional roles | `src/tokens/functional/color/*.json5` (8 files) | `dist/css/functional/themes/*.css` |
| component | `src/tokens/component/` | included in the theme files above |

The preamble of `dist/css/primitives.css` states the rule:
**"Never use raw values (hex, px). Use only semantic tokens."**
The public theme CSS contains **zero** `--base-color-*` variables; they exist only in
`dist/internalCss/` (for internal use).

#### The base ramps — 8 hues × 10 steps, plus a 14-step neutral

`blue` · `green` · `yellow` · `orange` · `red` · `purple` · `pink` · `coral` each run
**10 steps, 0–9**, and `neutral` alone runs **14, 0–13**.
Four more stand apart: `black` · `white` · `transparent` (alpha 0) · `inset`
(an alias of `neutral.0`). `neutral.0` = white and `neutral.13` = black, so both ends are
aliases.

**There is no separate alpha ramp** — where it parts from Polaris
(`blackAlpha`/`whiteAlpha`) and Spectrum (`transparent-black/white`).

Colour values record **HSL components alongside the hex** —
`{colorSpace: 'hsl', components: [213.3, 12.7, 13.9], hex: '#1f2328'}`.
This notation (naming the colour space and giving the hex too) is Primer's alone in the
corpus.

Light and dark hold **different ramp values** (`blue-5` is `#0969da` in light and `#1f6feb`
in dark) — the same ramp is not reused.

#### The functional tier — eight role families

`bgColor` · `fgColor` · `borderColor` · `control` · `selection` ·
`data-vis` · `display` · `syntax` (prettylights).

One light theme comes to **959 tokens.** The distribution across the top-level families:

| family | count |
|------|:---:|
| `display-*` | **285** |
| `label-*` | 133 |
| `button-*` | 68 |
| `color-*` (prettylights and others) | 47 |
| `prettylights-*` | 42 |
| `control-*` | 38 |
| `buttonKeybindingHint-*` | 35 |
| `data-*` | 34 |
| `bgColor-*` | 33 |
| `borderColor-*` | 30 |
| `border-*` | 30 |
| `diffBlob-*` | 21 |
| `fgColor-*` | 20 |
| `codeMirror-*` | 19 |
| `contribution-*` | 18 |

**The product-specific families are large** — `diffBlob` (code diffs), `codeMirror` (the
editor), `contribution` (the contribution graph) and `prettylights` (syntax highlighting)
exceed 100 tokens between them.
The 285 `display-*` are derivatives of a 21-hue display palette
(`src/tokens/base/color/{light,dark}/display-*.json5`).

**The role tokens (`bgColor`, `fgColor`, `borderColor`) number only 83**, with the remaining
876 reserved for components and product screens.

#### Fourteen themes

```
light · light-high-contrast · light-colorblind · light-colorblind-high-contrast
       · light-tritanopia · light-tritanopia-high-contrast
dark  · dark-dimmed · dark-high-contrast · dark-colorblind
       · dark-colorblind-high-contrast · dark-tritanopia
       · dark-tritanopia-high-contrast · dark-dimmed-high-contrast
```

**There are three axes**: mode (light/dark) × colour vision (default/colorblind/tritanopia) ×
contrast (default/high-contrast), with `dimmed` added on the dark side only.
The base sources are five (`light` · `light.high-contrast` · `dark` · `dark.dimmed` ·
`dark.high-contrast`), and the nine colour-vision variants are generated at build time.

The theme CSS selectors combine
`[data-color-mode="auto"][data-light-theme="light"]` with
`@media (prefers-color-scheme: dark)` — data attributes and a media query together.

### Radius

~~Unverified~~ → **resolved (2026-08-18, `dist/css/functional/size/radius.css`).**

| token | rem | px |
|------|-----|-----|
| `--borderRadius-small` | 0.1875 | 3 |
| `--borderRadius-medium` | 0.375 | 6 |
| `--borderRadius-large` | 0.75 | 12 |
| `--borderRadius-default` | → `medium` | 6 |
| `--borderRadius-full` | **624.9375** | 9999 |

Only three steps, with a `default` alias pointing at medium (6px). `full` is
9999px converted to rem as `624.9375rem` (the same notation as the Polaris WC bundle).

## Components

~~Unverified~~ → **the `@primer/css@22.3.0` deep pass (2026-08-17).** A legacy CSS line
(the current lines are Primer React and ViewComponents), but the component SCSS is on npm.

- Buttons have no height token and derive from padding: the default is `5px/16px` with a 20px
  line height (≈32px including the border), and small is `3px/12px` (≈28px) — the same
  derived family as GOV.UK
- **The large button is em-driven**: `padding: $em-spacer-6 1.5em; font-size: inherit` —
  a design in which raising the type size scales the whole button proportionally.
  A **type-relative sizing** axis, unlike the fixed-px camp
- A comment on the 20px line height notes that it is "declared so as not to inherit the body
  default" — deliberately separating global leading from control leading

## Characteristic decisions

- **Negative spacing is promoted to a token.** Most systems do not tokenise negative
  whitespace and handle it with arbitrary values. Primer folds it into the scale, so overlap
  layouts are handled inside the system too.
- **The token name is the actual px.** The opposite philosophy from Polaris
  (`space-400` = 16px). More legible, at the risk that a rebrand or rescale turns every name
  into a lie.
- **It keeps `default` aliases.** With `borderWidth.default → thin`, the default is stated as
  a token, so "what do I get if I don't choose?" is answered at the token layer rather than in
  code.
- **There are many theme variants.** Beyond light and dark it provides high-contrast and
  colour-vision variants as separate themes.
  → **Measured at 14 (2026-08-18)**: 2 modes × 3 colour-vision (default, colorblind,
  tritanopia) × 2 contrast, plus 2 dark-only `dimmed`. **Primer is the only system in the
  corpus to raise colour vision into a theme axis** (Unify has three types but does not
  multiply them as an axis, `../patterns/color.md`).

- **The raw ramps were pulled out of the public distribution** (2026-08-18). `--base-color-*`
  exists only in `dist/internalCss/`, with zero occurrences in the public theme CSS.
  The preamble of `primitives.css` writes the rule as "no raw values, semantics only".
  **A way of enforcing the token hierarchy through the build artefact rather than the
  documentation.**

- **The weight ceiling is 600.** `bold` (700) is not in the base scale.

- **Usage rules ship with the line-height and tracking tokens.** `lineHeight.normal` says
  "use this if you are not sure" and `caption` says "it falls short of accessibility
  requirements, so single lines only" — in the `$description`.

## Accessibility

Three colour-vision axes and high-contrast themes are provided at the token level (see
"Fourteen themes" above).
The conformance target is stated as **WCAG 2.2 AA** (the frontmatter's `a11y_target`,
confirmed 2026-08-18).

## The component token tier — `src/tokens/component/` (confirmed 2026-08-18)

The last tier left on the TODO. **27 files, 364 tokens**
(color 354 / shadow 5 / dimension 4 / border 1) — the component tier is
**effectively colour-only**, with dimensions handled by the functional tier: a division of
labour.

```
avatar · avatarStack · button · card · codeMirror · contribution · counter ·
dashboard · diffBlob · focus · header · headerSerach · highlight · label ·
menu · overlay · page · progressBar · reactionButton · selectMenu · sideNav ·
skeletonLoader · timelineBadge · tooltip · topicTag · treeView · underlineNav
```

- **The dark overrides are inlined inside the tokens** — the dark value sits alongside in
  `$extensions`' `org.primer.overrides.dark` (76 of them in the button file alone).
  A way of **writing both modes at the point of the token's definition**, unlike the
  separate-theme-file majority.
- **Figma Variables synchronisation metadata is embedded in the tokens** —
  `org.primer.figma` (collection · group · scopes) is attached to every token, so the token
  files describe their own code→Figma variable publishing. The only sample in the corpus to
  put Figma synchronisation information into the token schema.
- `focus` is a `$type: border` **composite type** (colour + style + width in one value) —
  a real use of a DTCG composite type. A 2px outline.
- Every reference goes to the functional tier (`{control.*}` and so on) — the three-tier
  discipline of never touching base directly is upheld in the component tier too.
- **A typo in a file name, `headerSerach.json5`, survives in the distribution** — the only
  typo embalmed in a namespace in the sample (a demonstration of the irreversibility of token
  names: fixing the name would break consumers).

## References

- Repository: https://github.com/primer/primitives
- Token package: `@primer/primitives`
- Build: Style Dictionary generating CSS variables from JSON
