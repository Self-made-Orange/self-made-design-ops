---
name: Solid
org: BuzzFeed
coverage: partial
url: https://www.buzzfeed.com/static-assets/solid-docs/index.html
repo: https://github.com/buzzfeed/solid
license: ISC
tech: [SCSS]
figma_kit: unverified
tokens_format: [SCSS]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-18
source: "npm bf-solid@2.11.2 → _lib/solid-helpers/_variables.scss"
---
<!-- lang-links -->
> **English** · [한국어](bf-solid.ko.md)
<!-- /lang-links -->

## In one line

BuzzFeed's CSS utility system — the spacing numbers are **based on 8px**, so
`$space-1` is **8px** rather than 4px, and the step below it is called **`05`** (as in
0.5). z-index is four steps of 100.

## Tokens

```scss
$space-05: .25rem  //  4px  ← named "0.5"
$space-1:  .5rem   //  8px  ← 1 is 8px
$space-2:  1rem    // 16px
$space-3:  1.5rem  // 24px
$space-4:  2rem    // 32px
$space-5:  3rem    // 48px
$space-6:  4.5rem  // 72px
$z1~$z4: 100 · 200 · 300 · 400
$border-radius: 3px
```

- **Number 1 is 8px** — in most index scales 1 is 4px (or 2, or 1), but Solid treats
  the 8px grid as its unit. When 4px became necessary it inserted **a fractional name,
  `05`** — a different solution to the same insertion problem as PIE's `a-small`
- The top jumps 1.5× from 48 to 72px (`$space-6`) — the only step off the 4/8 grid
- **Four z-index steps of 100** — the **sixth** system to tokenise z-index, with the
  sixth scheme (Chakra steps of 100 plus purpose names / Bootstrap 1000s plus 5 /
  Open Props ordinals / Forma 36 powers of ten / Vibes irregular / **Solid ordinals in
  steps of 100**)
- 3px radius — the odd-number radius camp
- The border is **a whole shorthand value, `1px solid rgba(0,0,0,.2)`** — colour, width
  and style in one token (the same shorthand camp as Ring UI's duration+easing and
  Siemens iX's font)

## Component deep-dive — (2026-08-18)

**The assumption that "a utility system has no components" is wrong** —
`bf-solid@2.11.2` has seven files under `_lib/solid-components/` (messaging ·
button-groups · modals · tags · cards · pagination · popovers). But **buttons and
forms are in `solid-utilities/`, not components** — in this system's taxonomy a button
is a utility. And **every declaration in buttons and forms carries `!important`**
(applying the utility-precedence convention to component-level rules too).

### Buttons (`.button` — solid-utilities/_buttons.scss)

| | Default | small |
|---|:--:|:--:|
| **Derived height** | **42px** (24 line height + 8×2 padding + 2 border) | 32px (20+5×2+2) |
| Padding | .5rem / .875rem (8/14px) | 5/10px |
| Type | 16px (`$text-4`) | 14px (`$text-5`) |
| Radius | 3px | 3px |

- **State colours are Sass functions rather than tokens** — hover =
  `darken($fill, 20%)`, active = `darken($fill, 35%)`. Colours are induced at build
  time, so there are no hover tokens at all. The line height too:
  `$line-height-form: 1.5rem` — a form-specific line-height token.
- secondary is the inverted-border form (transparent background plus a 1px border,
  filling on hover). Variants: default (blue #0f65ef) · negative (red) · white ·
  transparent.
- **Eleven social buttons are system variants** — facebook · twitter · google ·
  linkedin · pinterest · tumblr · youtube · instagram · sms · rss · apple-news. Even
  the brand fill colours are in the token layer (`$fill-facebook` and so on) — a sample
  where the media company's DNA surfaces in the variant list.
- disabled uses `$opacity-disabled: .3`. Transition `background-color .1s ease`
  (hover entry is .15s — a small case of asymmetric enter/exit).

### Forms (solid-utilities/_forms.scss)

- `.text-input`, `.textarea` and `.select` share one recipe: 16px type, 1.5rem line
  height, .5rem/.75rem padding, 1px `$fill-gray-light` border, 3px radius — **the same
  derived 42px as the button** (only the horizontal padding differs, 12 vs 14px).
  small is 32px.
- The select arrow uses an `svg-background()` function to put **inline SVG in the
  background** — the Sass-function edition of the same family as Backpack (base64
  background).
- radio and checkbox hide the native control with `visuallyhidden` and rebuild it as a
  12px `label:before` box. A selected radio is **`border: 4px solid` blue** (the
  doughnut approach).

### Modals (solid-components/_modals.scss)

- **The scrim is white** — `rgba(255, 255, 255, .9)`. The exact opposite of the dark
  scrim convention, and unique in the sample (lightbox grammar over an article — a
  content-site domain trait).
- Content: white background + `$border` (the 1px rgba(0,0,0,.2) shorthand from the
  token section, as-is) + 3px radius + `$space-4` (32px) padding. **There is no width
  constraint** (only margin 0 auto).
- Entry: `scale3d(.6)` → 1 over **150ms**, with opacity reaching 1 at the 50% keyframe
  (a hand-built two-track where the fade finishes before the shape). The visible state
  is **a `.js-show-modal` class on the body** — a jQuery-era state channel, intact.
- z-index `$z4` (= 400) — the top of the four-step scale assigned to modals.

### Notable decisions (deep-dive)

- **Buttons classified under utilities rather than components** plus `!important` on
  every declaration
- **State colours produced by `darken()`** — a function standing in for absent state
  tokens
- **A white 0.9 scrim** — unique in the sample
- Eleven social brand variants — a case of the domain becoming the variant axis
- Buttons and inputs sharing a derived 42px (coinciding with Welcome UI's 42px — by a
  different derivation)

## Notable decisions

- **Index 1 = 8px** plus the inserted fractional name `05` — a combination unique in
  the sample
- The sixth z-index tokenisation, with the sixth scheme (ordinals in steps of 100)
- A whole-shorthand border token
- Distributed as CSS utilities (classes) with `!default` throughout

## Accessibility

Unverified.

## Notes

- **URL moved (confirmed 2026-08-18):** `solid.buzzfeed.com` → the buzzfeed.com static
  asset path (301)

- Tokens: `npm pack bf-solid@2.11.2` → `_lib/solid-helpers/_variables.scss`
- Component deep-dive: the same package,
  `_lib/solid-utilities/{_buttons,_forms}.scss` · `_lib/solid-components/_modals.scss`
  (2026-08-18)
- **Still to confirm:** the full colour palette, ~~the type scale~~ (partial —
  `$text-4` 16px, `$text-5` 14px and `$line-height-form` 1.5rem confirmed, the full
  set not examined), the utility class list (only the directory structure was
  confirmed — block-grid · borders · buttons · colors · flexbox · forms · grid ·
  layout · svg-icons · tables · typography), and maintenance status (latest version
  2.11.2)
