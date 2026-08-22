---
name: Open Props
org: Adam Argyle (open source)
coverage: partial
url: https://open-props.style
repo: https://github.com/argyleink/open-props
license: MIT
tech: [CSS]
figma_kit: false
tokens_format: [CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "npm open-props@1.7.23 → open-props.min.css (603 CSS custom properties)"
---
<!-- lang-links -->
> **English** · [한국어](open-props.ko.md)
<!-- /lang-links -->

## In one line

It ships **CSS custom properties alone**, with no components.
**603 of them, the most in the sample**, and its **113 easings** and **fluid whitespace** are
axes no other system has.

## Tokens — 603 of them

There is no framework and no build step. `@import` the CSS file and the variables exist.

It occupies a similar position to Tailwind, except that **it generates no utility classes** —
it provides values only, and you apply them in your own CSS.

### Space and size — four parallel families

| family | steps | unit | purpose |
|------|:---:|:---:|------|
| `--size-*` | 15 (+`00`) | rem | general |
| **`--size-fluid-*`** | **10** | `max(min())` | **fluid** |
| **`--size-relative-*`** | 17 (+`00`) | **`ch`** | character-based |
| `--size-content-*` · `--size-header-*` | 3 · 3 | `ch` | body and heading widths |

The base scale (px):

```
4 · 8 · 16 · 20 · 24 · 28 · 32 · 48 · 64 · 80 · 120 · 160 · 240 · 320 · 480
```

**There is no `12`** — after 8 comes 16. The core `4/8/16/24` and `32` are all present.

`--size-00` is **−4px**. **Negatives are expressed with a `00` suffix** — the same rule
applies to `--font-size-00`, `--font-lineheight-00`, `--size-px-00` and
`--size-relative-00`. The same purpose as Atlassian's `space.negative.*`, in a different
notation.

#### Fluid whitespace — unique in the sample

```css
--size-fluid-1:  max(.5rem,  min(1vw,  1rem));
--size-fluid-2:  max(1rem,   min(2vw,  1.5rem));
--size-fluid-5:  max(4rem,   min(5vw,  5rem));
--size-fluid-10: max(20rem,  min(40vw, 30rem));
```

**Ten steps of the form `max(floor, min(viewport, ceiling))`.**

Pajamas makes **typography** fluid with `clamp()` (`tokens/scales.md`), but
**Open Props is the only system to make whitespace fluid.**

`clamp(a, b, c)` and `max(a, min(b, c))` give the same result; Open Props uses the latter.

#### The `ch` family — proportional to character width

```css
--size-relative-3:  1ch;      /* corresponding to the general scale's --size-3: 1rem */
--size-content-2:   45ch;     /* body width */
--size-header-2:    25ch;     /* heading width */
```

**It keeps a second copy of the 15-step general scale in `ch`** (`--size-relative-*`, 17
steps).

`--size-content-*` is `20ch · 45ch · 60ch` — **the readable measure, tokenised.**
`--size-header-*` is `20ch · 25ch · 35ch`, narrower than the body's.

**Open Props is the only system in the sample to use `ch`.**
A different direction from Codex merging whitespace and layout widths into one `size` scale —
**Open Props adds families by changing the unit.**

It connects directly to the text-expansion problem in `i18n/README.md` — a width based on
`ch` changes in actual px when the typeface or language changes.

### Radius — `1e5px`

| token | value |
|------|:---:|
| `--radius-1` | 2px |
| `--radius-2` | **5px** |
| `--radius-3` | 1rem (16) |
| `--radius-4` | 2rem (32) |
| `--radius-5` | 4rem (64) |
| `--radius-6` | 8rem (128) |
| **`--radius-round`** | **`1e5px`** (100,000) |

**Only six steps, doubling from the third** (16 → 32 → 64 → 128).
The `4`, `8` and `12` most of the sample uses are **absent** — after 2px comes 5px.

**The 5px joins the odd-radius cases, with Helios and Spectrum.**

**The `1e5px` exponential notation is unique in the sample.** As a way of expressing a full
circle it is the **seventh form**, after `9999px` (Polaris, Atlassian) · `10000px` (Fluent) ·
`999px` (Nord) · `50%` · `0.5` · `50cqmin` (Material 3).

There are `--radius-blob-*` and `--radius-conditional-*` families too
(~~values unverified~~ → **measured and resolved 2026-08-18**, source
<https://unpkg.com/open-props@1.7.23/open-props.min.css>).

**`--radius-blob-*`, five of them — eight-value `border-radius` shorthands making organic
blobs**

```css
--radius-blob-1: 30% 70% 70% 30% / 53% 30% 70% 47%;
--radius-blob-2: 53% 47% 34% 66% / 63% 46% 54% 37%;
--radius-blob-3: 37% 63% 56% 44% / 49% 56% 44% 51%;
--radius-blob-4: 63% 37% 37% 63% / 43% 37% 63% 57%;
--radius-blob-5: 49% 51% 48% 52% / 57% 44% 56% 43%;
```

All are **eight percentage values (four horizontal / four vertical)**, and the corresponding
pairs on each axis **interlock to 100%** — `30/70` against `70/30` — so left and right, top
and bottom push against each other into an asymmetric curve. `blob-5` (49/51 · 48/52 …) is
closest to a circle and `blob-1` (30/70) the most distorted.

**`--radius-drawn-*`, six of them — an eight-value px family with a hand-drawn feel** ships
alongside.

```css
--radius-drawn-1: 255px 15px 225px 15px / 15px 225px 15px 255px;
--radius-drawn-2: 125px 10px 20px 185px / 25px 205px 205px 25px;
--radius-drawn-3: 15px 255px 15px 225px / 225px 15px 255px 15px;
--radius-drawn-4: 15px 25px 155px 25px / 225px 150px 25px 115px;
--radius-drawn-5: 250px 25px 15px 20px / 15px 80px 105px 115px;
--radius-drawn-6: 28px 100px 20px 15px / 150px 30px 205px 225px;
```

Where blob is in percentages and so stretches with the element's size, drawn is in
**fixed px**, so a small element comes out almost circular and a large one reads as a sketch
with rounded corners.

**`--radius-conditional-*`, six of them — conditional tokens that fold the radius to 0 once
the container fills the viewport width**

```css
--radius-conditional-1: clamp(0px, calc(100vw - 100%) * 1e5, var(--radius-1));
/* …-2 through -6 share the structure, differing only in the last argument, --radius-2 to -6 */
```

`calc(100vw - 100%)` is **0** when the element spans the full viewport and positive
otherwise. Multiplying by `1e5` inflates it to an extreme and `clamp` cuts it, so the result
is **0px at full width and the corresponding radius step otherwise** — a CSS trick that
implements "remove the radius when a card fills the screen on mobile" without a media query.
The same exponential notation seen earlier in `1e5px` (`--radius-round`)
**is reused here as a multiplier.**

### Typography

| token | value |
|------|:---:|
| `--font-size-00` | 0.5rem (8) |
| `--font-size-0` | 0.75rem (12) |
| `--font-size-1` | 1rem (16) |
| `--font-size-2` | **1.1rem** (17.6) |
| `--font-size-3` | 1.25rem (20) |
| `--font-size-4` | 1.5rem (24) |
| `--font-size-5` | 2rem (32) |
| `--font-size-6` | 2.5rem (40) |
| `--font-size-7` | 3rem (48) |
| `--font-size-8` | 3.5rem (56) |

**There is a `1.1rem` (17.6px)** — the only fractional-rem body size in the sample.
There is **no 14px step** (after 12 comes 16).

Seven line heights — `00` 0.95 · `0` 1.1 · `1` 1.25 · `2` 1.375 · `3` 1.5 · `4` 1.75 · `5` 2.

**`0.95` is below 1.** The leading is tighter than the type size, so lines overlap —
Open Props is the only sample with a sub-1 line height.

Eight tracking steps — `0` **−0.05em** · `1` 0.025 · `2` 0.05 · `3` 0.075 · `4` 0.15 ·
`5` **0.5em** · `6` 0.75em · `7` **1em**.

**One negative, seven positive, with a maximum of 1em** — **ten times** Tailwind's maximum
(`widest` 0.1em), and by far the most extreme in the sample.

Nine weights (100–900), keyed as ordinals `1`–`9`.

### Borders — up to 25px

| token | value |
|------|:---:|
| `--border-size-1` | 1px |
| `--border-size-2` | 2px |
| `--border-size-3` | **5px** |
| `--border-size-4` | **10px** |
| `--border-size-5` | **25px** |

**The thickest in the sample.** Of the common 1/2/4, `4` is missing, and it goes 5, 10, 25 —
more than three times thicker than Chakra UI's maximum (8px).

### z-index — `--layer-*`

| token | value |
|------|:---:|
| `--layer-1` – `--layer-5` | 1 · 2 · 3 · 4 · 5 |
| **`--layer-important`** | **2147483647** |

**Ordinals rather than role names**, in contrast to Chakra UI's 13 steps named by role
(`dropdown`, `modal`, `toast`).

**`--layer-important` holds exactly the same value as Chakra's `max`** (int32's maximum).

### Easings — 113 of them, in 33 families

Overwhelming, in sample terms. Atlassian has 5, Canvas 6, Cloudscape 5.

| family | count | contents |
|------|:---:|------|
| `--ease-1`–`5` | 5 | the basics |
| `--ease-in-*` · `out-*` · `in-out-*` | 15 | direction × 5 |
| **`--ease-elastic-*`** | 5 | elastic |
| `--ease-elastic-in/out/in-out-*` | 15 | elastic × direction |
| **`--ease-squish-*`** | 5 | squish (aliases of `elastic-in-out`) |
| **`--ease-spring-*`** | 5 | **`linear()` multi-stop** |
| **`--ease-bounce-*`** | 5 | bounce |
| **`--ease-step-*`** | 5 | **`steps(n)`** |
| the Penner curves | 33 | `quad` · `cubic` · `quart` · `quint` · `sine` · `expo` · `circ` × in/out/in-out |

**`--ease-spring-3` is a multi-stop `linear()`.**

```css
--ease-spring-3: linear(0, 0.009, 0.035 2.1%, 0.141 4.4%, 0.723 12.9%, 0.938 16.7%, 1.017, …);
```

**The same technique as Atlassian's, except Open Props keeps five spring steps.**
Atlassian has one 65-stop curve, used in a single place (`patterns/motion.md`).

**`--ease-step-3: steps(4)`** — a stepped easing as a token. Unique in the sample.

**There are alias families** — `--ease-elastic-3` is `var(--ease-elastic-out-3)`, and
`--ease-squish-2` is `var(--ease-elastic-in-out-2)`.
**Short names as aliases, abbreviating the common combinations.**

### Shadow — recomposed at runtime

```css
--shadow-color: 220 3% 15%;
--shadow-strength: 1%;
--shadow-1: 0 1px 2px -1px hsl(var(--shadow-color) / var(--shadow-strength-10));
```

**Colour and strength are separated and combined through HSL.**
Change `--shadow-color` and the tint of all six shadow steps follows.

The same purpose as Radix Themes referencing a grey token through
`color-mix(in oklab, …)`, except **Open Props assembles the HSL channels directly**
(working without an `@supports` branch).

There is a separate `--inner-shadow-*` family (for `inset` only).

### Everything else

| family | count | contents |
|------|:---:|------|
| `--gradient-*` | **31** | finished gradients |
| **`--noise-*`** | **4** | **SVG noise textures (data URIs)** |
| `--ratio-*` | 6 | `golden` 1.618 · `square` · `portrait` · `landscape` · `ultrawide` 18/5 · `widescreen` 16/9 |
| `--animation-*` | 6 | `spin` · `ping` · `blink` · `float` · `pulse` · `bounce` |
| palettes | 13 hues × 13 steps | `jungle` · `camo` · `sand` · `stone` and others |

**`--noise-*` holds SVG filter noise as data URIs.**
Open Props is the only system in the sample to tokenise texture.

**The six `--ratio-*` match Chakra UI's `aspect-ratios` exactly in name and value**
(including `golden` 1.618 and `ultrawide` 18/5) — a coincidence between two unrelated
systems.

**`--animation-*` references `--ease-*`** — `--animation-bounce` is
`bounce 2s var(--ease-squish-2) infinite`.
Unlike Tailwind, which pins `cubic-bezier` directly into its animation definitions
(`patterns/motion.md`).

The palette hue names are unusual — `jungle` · `camo` · `sand` · `stone` · `choco` and so on.
A `-hsl` variant file ships per hue (`teal.min.css` · `camo-hsl.min.css`).

## Components

**None.** It ships variables only.
There are optional files such as `buttons.min.css`, but it is not a component library.

## Characteristic decisions

- **603 CSS custom properties, the most in the sample**, with no build step
- **It makes whitespace fluid** (`--size-fluid-*`, 10 steps, `max(min())`).
  Unique in the sample — Pajamas makes only typography fluid
- **It keeps a parallel `ch` family** (`--size-relative-*`, 17 steps, plus `content` and
  `header`), tokenising the readable measure (45ch, 60ch)
- **Negatives are written with a `00` suffix** (`--size-00` = −4px)
- **113 easings in 33 families** — 18× the runner-up (Canvas's 6).
  `elastic` · `squish` · `spring` · `bounce` · `step` plus every Penner curve
- **A `steps(n)` stepped easing as a token**
- **Five spring steps as `linear()`** (Atlassian has one)
- **Alias families among the easings** (`--ease-elastic-3` → `--ease-elastic-out-3`)
- **Shadows recomposed from HSL channels** (`--shadow-color` + `--shadow-strength`)
- **SVG noise textures tokenised** (`--noise-1`–`4`)
- **A sub-1 line height** (`--font-lineheight-00: 0.95`)
- **Tracking reaching 1em** — ten times Tailwind's maximum
- **Borders up to 25px** — the thickest in the sample
- **No 4, 8 or 12px in the radii** (2 → 5 → 16 → 32 → 64 → 128)
- **A circle expressed as `1e5px`, in exponential notation**
- **z-index as five ordinals** — in contrast to Chakra's 13 by role.
  `--layer-important` holds the same value as Chakra's `max`

## Accessibility

There is no accessibility target at the token or CSS level.
`--size-content-*` (45ch, 60ch) is a readable-measure specification and so is indirectly
related, but the file gives no rationale.

## References

- **Basis for the Figma kit (false):** no UI kit — only JSON for the Figma Tokens plugin is
  distributed, and the installation instructions are community-written, confirmed 2026-08-18

- Documentation: https://open-props.style
- Repository: https://github.com/argyleink/open-props
- Tokens: `npm pack open-props@1.7.23` → `package/open-props.min.css`
- Per-hue files: `package/<hue>.min.css` · `<hue>-hsl.min.css`
- **Open questions:** ~~the actual values of `--radius-blob-*` and
  `--radius-conditional-*`~~ (resolved 2026-08-18 — see the radius section, with the six
  `--radius-drawn-*` measured alongside), the 31 `--gradient-*`, every step of the 13-hue
  palette, and the full values of the six `--shadow-*` steps
- **Figma kit confirmed absent (2026-08-18):** `figma_kit: false` — source
  <https://open-props.style>. In the documentation site's full text (about 50,000
  characters once scripts are stripped) **Figma appears three times**, all about the
  Figma Tokens distribution files — `open-props.figma-tokens.json` and
  `open-props.figma-tokens.sync.json`, downloaded from unpkg and **fed to the Figma Tokens
  plugin** — and even the setup instructions are marked
  "**Community created setup instructions**".
  **There is no Figma UI kit containing components or styles** — consistent with its being a
  token-only system with no components in the first place.
  Sketch and Adobe are mentioned zero times
- **The absence of an accessibility target re-confirmed (2026-08-18):** the strings
  `accessib` and `WCAG` appear **zero times** in the documentation site's full text.
  Instead it tokenises `prefers-contrast`, `prefers-reduced-transparency`, `forced-colors`
  and `inverted-colors` as `@custom-media`, **providing the user-preference queries** while
  declaring no conformance target (`a11y_target: null` retained)
