---
name: Aurora Design System (GCTools)
org: Government of Canada (GCTools / Digital Collaboration Division)
coverage: partial
url: https://design.gccollab.ca
repo: https://github.com/gctools-outilsgc/aurora-design-system (MIT)
license: MIT (the repository) — the documentation site's content licence is not separately stated
tech: [A Bootstrap 4.1.3 skin, a Gatsby v1 documentation site]
figma_kit: false
tokens_format: [A documentation-layer sample — measured from server-rendered HTML; no token distribution]
a11y_target: "WCAG 2.1 (version stated — colour contrast requires AA and recommends AAA, confirmed 2026-08-18)"
platform: web
domain: government
verified: 2026-08-18
source: "design.gccollab.ca /component/{colour,typography,buttons,grids-and-spacing}/ measured from server-rendered HTML — the second documentation-layer sample"
---
<!-- lang-links -->
> **English** · [한국어](aurora-gc.ko.md)
<!-- /lang-links -->

## In one line

The design guidance of the Government of Canada's collaboration tools (GCTools) — **the
second documentation-layer sample** (after LINE). There is no token or code distribution,
only documentation, but **because it is a static Gatsby v1 site the server-rendered HTML can
simply be scraped**, so no workaround was needed (a different texture from LINE's page-data
JSON). The components are **a skin over Bootstrap 4.1.3** and so have no dimensions of their
own; the substance of the system is its colour swatches and typographic rules.
A government legacy sample whose **repository has been frozen since 2019-06-13**.

> **A note on documentation-layer samples.** The values in this entry come not from npm or a
> repository but from the official documentation HTML. Re-verification route:
> `design.gccollab.ca/component/<page>/` (Gatsby v1 — the body is in the HTML with no JS.
> Without the trailing slash you get a 301). The repository is MIT, so there is no
> read-only restriction as there is with LINE.

## The state of the source — frozen since 2019-06

- The repository `gctools-outilsgc/aurora-design-system`: last pushed **2019-06-13**
  (the final commits delete old files and add personas). Not archived — abandoned.
- The documentation site's code, `gctools-outilsgc/design-system-code`: `gatsby ^1.9.277`
  plus `bootstrap ^4.1.3` (measured from package.json) — being **Gatsby v1** it has no
  `/page-data/*.json` channel as LINE does (that is v2+); the HTML itself is complete instead.
- As of 2026-08 the site still returns 200 — the lifespan curve peculiar to government
  samples, where only the code dies and the documentation lives on (the exact opposite of
  Rakuten ReX, where the documentation died and the npm package remains).

## Colour — six swatch families × five hexes

The substance of the system. The model is that a team picks two or three swatches to compose
its palette — **a catalogue of swatch families, not a single enforced palette**.

| family | five hexes |
|--------|----------|
| **Aurora Borealis** (the main palette) | #002D42 · #137991 · #6DD2DA · #15A3A6 · #92CC6F |
| Canada.ca Theme | #333000 · #26374A · #AF3C43 · #F5F5F5 · #FFFFFF |
| Thunder and Lightning | #002D42 · #4D5D6C · #96A8B2 · #CECECE · #FEC04F |
| Blue Complimentary | #0D467D · #137991 · #6DD2DA · #FF9F40 · #FEC04F |
| Triad | #7E0C33 · #024571 · #5DC1BE · #F6CF22 · #EDDB7C |
| Green and Blue | #0278A4 · #4E4741 · #83C3F2 · #C9DF61 · #C1D699 |

- Canada.ca Theme's #26374A and #AF3C43 are **the point of contact with the Canadian federal
  web standard colours** (the Canada.ca header navy and signature red).
- Aurora Borealis exists in the documentation as raw data — a **full palette of 30 hexes**,
  five swatches × six shades (a brightness ramp of the form #002D42→#F3F8FA) — plus the
  source of four CSS gradients.

### Four semantic colours (each with dark text, the colour itself, and a pale background)

```
Error    #923534 · #D3080C · #F3E9E8
Warning  #66512C · #FF9900 · #F9F4D4
Success  #2B542C · #278400 · #D8EECA
Info     #245269 · #269ABC · #D7FAFF
```

- Interface colours: text #252525 (off-black) · #FFFFFF · muted #666666.
  Light theme #CCCCCC/#F5F5F5/#FAFAFA/#FFFFFF · dark theme
  #000000/#212121/#303030/#424242 — a sample in which **a four-step dark theme was already
  specified in a 2019 government document**.

## Type — Rubik and Nunito Sans, on a pt scale

The roles are split: **Rubik for titles and headings / Nunito Sans for subheadings, buttons
and body** (both open-source from Google Fonts — with a Calibri fallback stated in writing
for environments that block web fonts).

```
H1  Rubik Light    36pt        H4  Rubik Regular       21pt (1.3125em)
H2  Rubik Regular  28pt (1.75em)   H5  Nunito Sans Regular 18pt (1.125em)
H3  Rubik Medium   24pt (1.5em, tracking 10)   H6  Nunito Sans Bold 16pt (1em)
body Nunito Sans Regular 16pt / leading 24pt
```

- **A two-typeface scale where the face changes from H5 down** — the hierarchy axis is the
  family, not just the size (the same family as Fleet's Montserrat/Lora role split).
- Pull quotes in full: 50px indent · a 4px vertical rule · 8px between rule and text ·
  1.25em/200% — the documentation supplies even the inline style source.
- A stated target body measure of "about 60 characters".

## Components — a Bootstrap 4.1.3 skin (no dimensions of its own)

- The button documentation exposes **eight Bootstrap classes as they are**, `btn btn-primary`
  through `btn-dark`, plus btn-sm/lg/block — there are no dimensions or radius rules of its
  own.
- The grid is likewise Bootstrap's 12 columns by way of WET (Canada's Web Experience
  Toolkit) — no breakpoints of its own.
- In other words **this system's own contribution is the colour, type and content-guidance
  layer**, and the component layer is borrowed. An explicit corpus sample of the
  "design system = framework skin" type (in contrast to government systems like GOV.UK that
  implement their own).

## Characteristic decisions

- **The second documentation-layer sample** — but unlike LINE (closed JSON, read-only), it
  is the opposite extreme: **static HTML plus an MIT repository**, with no barrier to
  collection
- It does not impose a palette but offers **a catalogue of six swatch families** — a
  government system that presupposes variation across a product suite (GCTools)
- A two-typeface hierarchy (Rubik/Nunito Sans, changing over at H5)
- The whole component layer delegated to Bootstrap 4.1.3
- Frozen in 2019-06 — a living site with a dead repository

## Accessibility

The colour page states in writing that **AA contrast or better is required and AAA
recommended**. The button page forbids conveying meaning by colour alone and gives
`.sr-only` alternative-text guidance.
~~No other target declaration confirmed.~~ → **Resolved 2026-08-18 — the version of the
standard is stated as `WCAG 2.1`.**

Source <https://design.gccollab.ca/overview/introduction> — it says that using Aurora
**complements the Web Experience Toolkit (WET), the Canada.ca style guide, the Federal
Identity Program (FiP) and WCAG 2.1**. That is, Aurora does not claim conformance itself but
**positions itself as a complement to four federal standards**, and no level (A/AA/AAA) is
attached to that sentence — the levels appear only in the colour page's contrast requirement
(AA required, AAA recommended).

The home page carries a principle-level statement too: Aurora **"follows Government of Canada
obligations such as official languages and accessibility"** (under the Diverse heading).
**There is no separate accessibility page, VPAT or conformance statement** (2026-08-18,
measured from the server-rendered HTML of <https://design.gccollab.ca/> — the site's entire
navigation is just four axes: Overview · Components · Content · Data).

## References

- **Basis for the Figma kit (false):** no Figma kit — the official UI Kit is produced in
  Adobe Illustrator and prototyped in Adobe XD, and the site mentions Figma zero times,
  confirmed 2026-08-18

- Documentation: https://design.gccollab.ca (bilingual EN/FR)
- Repository: https://github.com/gctools-outilsgc/aurora-design-system (MIT, created
  2017-12, last pushed 2019-06-13) · the site's code is in `design-system-code`
- **Open questions:** whether the UI Kit (.ai/.xd) bundled in the repository matches the
  documentation's figures, how the FR content differs, the source of the icon set
  (presumed FontAwesome — to be confirmed from the site code's dependencies), and whether
  the GCTools products actually used this skin
- **Figma kit confirmed absent (2026-08-18):** `figma_kit: false` — source
  <https://design.gccollab.ca/overview/download>. There are only two official downloads
  (a compiled CSS/JS bundle and the UI kit), and the UI kit is stated to have been
  **"created in Adobe Illustrator"**, with each component exportable
  **"into Adobe XD to make an interactive prototype"**. The Introduction page repeats that
  **"downloading the UI kit (for Adobe Illustrator)"** gives you sketches of every component.
  Across the home, Download, Introduction and Components pages the string **Figma appears
  zero times, Sketch zero times**. This matches the timing — **the 2019-06 freeze predates
  Figma becoming a corporate standard.** Even when rendered, this system publishes no Figma
  kit
- **Confirmed no render needed (2026-08-18):** although it is a Gatsby static site,
  **the body is present in the server-rendered HTML**, so the full text can be read with
  curl alone (no headless render required). Note that `sitemap.xml` is a 404, so the page
  list has to be followed through internal links
