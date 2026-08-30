<!-- lang-links -->
> **English** · [한국어](README.ko.md)
<!-- /lang-links -->

# site/ — the GitHub Pages site

Public address: **https://self-made-orange.github.io/self-made-design-ops/**

> **The address changed on 2026-08-24.** The repository moved from the `keepYaoung` account to
> the **`Self-made-Orange`** organisation. GitHub redirects a repository's own URL after a
> transfer but **does not redirect Pages addresses**, so the previous site address —
> `keepyaoung.github.io/self-made-design-ops/` — now returns **404** and whatever had been
> indexed under it is gone. That was the owner's call, taken knowingly rather than discovered
> afterwards. Dated observations elsewhere in this file and in `TODO.md` still name the old
> address because that is where they were made; they are records, not links.
>
> The address now has **one definition**, `OWNER`/`REPO`/`BASE` at the top of
> `site/build.mjs`, and everything generated reads it from there. Before the move it was
> written out by hand in roughly forty places.

A single-page static site that makes the corpus **browsable**. It carries no new facts —
it is entirely an index into the repository's documents, and the evidence for any value is
in the document it links to.

**The website UI supports the six root README languages:** English, Korean, Japanese,
Simplified Chinese, Indonesian and Spanish. The default is English. A banner above the
navigation suggests the device's preferred supported language; an unsupported device language
gets the language selector instead. There is no automatic redirect. A URL `?lang=` takes
precedence over a saved choice, and an explicit choice suppresses further suggestions.
The header menu and footer links change the current page's language, preserving its path,
query parameters and anchor. Catalog search and filters are stored in the URL and restored
after language changes or reloads. Malformed corpus links are skipped during localization
so they cannot interrupt page initialization. Choices persist in local storage; closing a suggestion lasts
for the current tab session. If storage is unavailable, language links still work via the URL.

`site/locales/messages.json` is the translation source; `site/i18n-core.mjs` negotiates locales,
`site/i18n-runtime.js` handles the UI, and `site/build.mjs` generates `docs/assets/i18n.js`.
Messages use numbered child-element slots (`{0}`, `{1}`) to preserve links and live counts
while allowing different word order. The build verifies every locale and placeholder, and
`node --test site/i18n.test.mjs` checks regional tags, preference order and corpus labels.
No translation service, dependency, or device-language request is used.

**The corpus source documents, product names, paths, and executable examples remain in their
original language.** Article pages mark English source content with `lang="en"` and link to
the Korean original where it exists. Their navigation and language notice are translated.
JavaScript is required for translated UI; without it, the prerendered English content remains
readable. Canonical URLs continue to point to the English source pages.

## Structure

| Path | Character |
|------|-----------|
| `site/build.mjs` | the generator. No dependencies |
| `site/check-headlines.mjs` | checks the axis conclusions against the documents they summarise |
| `docs/index.html` | `/` — the kit: take it, what's inside, why the defaults hold |
| `docs/catalog.html` | `/catalog.html` — the evidence: all 116 systems, filterable |
| `docs/assets/site.css` | the shared chrome — tokens, both themes, header, rail, row rhythm |
| `docs/assets/site.js` | the shared behaviour — theme toggle, scrollspy, copy, the one loader |
| `docs/data/corpus.json` | **generated** — do not edit it directly |
| `docs/.nojekyll` | turns off Jekyll processing |

**Two pages, one shell.** Both load the same CSS and the same JS and sit inside the same
248px rail. Only what fills the right-hand column differs. The alternative — two hand-written
pages each with its own header and palette — is exactly the drift this repository exists to
catch, so the chrome was extracted rather than copied.

Deployment is done by **GitHub Actions** (`.github/workflows/pages.yml`). When the relevant
paths are pushed to `main`, it regenerates the data and uploads `docs/` as-is.

> **The snippet handed to agents is tool-neutral** — the wording is generalised so it can be
> pasted into any rules file: `CLAUDE.md` · `AGENTS.md` · `.cursorrules` ·
> `copilot-instructions.md`.

**The site is live at <https://self-made-orange.github.io/self-made-design-ops/>**, with the catalog
at `/catalog.html`.

> **The repository was replaced on 2026-08-22.** After the disclosure audit (`SECURITY.md`)
> the corpus moved to a **new repository seeded from a single clean commit**, and the old one
> was deleted — deletion being the only step that actually removes unreachable objects from
> the host. The address and the Pages URL are unchanged, but the deploy history restarts at
> run 1; the ~107 runs before it belonged to the deleted repository.

> **It had to be switched on by hand once** — Settings → Pages → Build and deployment →
> Source: **GitHub Actions**. That was done; the note is kept because the automated attempt is
> worth recording. Having the workflow switch it on itself was tried with `enablement: true` on
> `actions/configure-pages` and failed (run 32322753388):
> `Create Pages site failed. Error: Resource not accessible by integration`.
> **Granting `pages: write` on `GITHUB_TOKEN` does not confer the right to *create* the
> site.** Calling the REST API directly is blocked by this session's egress proxy.
>
> Reading this note as "still to do" is a mistake I made on 2026-08-22 — the past tense was
> missing, and I reported an open owner-side task that had been closed long before. The state
> of a deployment is checkable in one API call; a sentence in a document is not evidence.

## Updating

After editing the corpus, regenerate and commit together:

```bash
node design-systems/build-data.mjs   # systems/*.md frontmatter → data/systems.json
node site/build.mjs                  # → corpus data + validated UI translation bundle
node site/build-pages.mjs            # → source document pages and shared language controls
node --test site/i18n.test.mjs        # locale negotiation, placeholders, corpus coverage
node site/check-headlines.mjs        # do the axis conclusions still hold?
```

If you forget, `.github/workflows/site.yml` fails the PR.

## Rules about the numbers

- **The system list and its counts** come from `design-systems/data/systems.json`.
  The site does not count anything itself.
- **The sample count per axis** is read from each `patterns/*.md`'s
  `## Re-synthesis across N samples` heading. The generator follows the corpus rule that the
  re-synthesis section wins over any summary earlier in the document
  (`agents/design-review.md`). With no heading it **fails the build** rather than estimating.
- **Only the one-line conclusions** (`AXES[].headline`) are written by a person. They are
  summaries lifted from the "key criteria" table in `agents/design-review.md`, and the
  document is what decides.
- **Those conclusions are checked, not trusted** — `site/check-headlines.mjs` recomputes the
  numbers a headline states from the document's own table, and confirms the values it quotes
  are still in the text. It runs in CI with `--strict`. It does **not** read the prose and
  judge it; a claim with nothing mechanisable in it is reported as **unchecked** rather than
  passed silently, so an axis whose conclusion cannot be verified stays visible. This exists
  because the same failure has now happened three times: a table is reinforced and a summary
  sentence far below it is left behind (typography 13 → 17 and `scales.md` 6 → 8, both caught
  by hand on 2026-08-19; `motion.md`'s reduced-motion table reaching nine layers and 17
  systems while three sentences still said six and 13, caught 2026-08-23).

## This page's own evidence grades

The M/D/A/U convention from `profiles/` is applied to this page too.

| Axis | Grade | Evidence |
|------|-------|----------|
| Spacing 4 · 8 · 12 · 16 · 24 · 32 | **M** | the core recommendation in `tokens/scales.md` |
| Radius 0 · 4 · 8 · 16 | **M** | `tokens/scales.md` |
| 16px body | **M** | the majority web camp in `patterns/typography.md` |
| 40px control height · input = button | **M** | the mode in `patterns/button.md` · `patterns/form.md` |
| 2px focus ring on `:focus-visible` | **M** | the majority in `patterns/button.md` |
| Honouring `prefers-reduced-motion` | **M** | `patterns/motion.md` |
| Radius 6 · 12px | **M** | Primer's `borderRadius` small/large (`systems/primer.md`) |
| 24px background dot grid | **M** | one step of the spacing scale in `tokens/scales.md` (the density and size are A) |
| Code block contrast (commands 17:1 · comments 7:1) | **M** | computed against WCAG — the contrast rule in `agents/design-review.md` |
| **Accent orange `#f97316`** | **A** | the author's choice. Not a corpus value. 7.0:1 against the dark canvas (`#0c0c0c`) / for text in light it is `#c2410c` at 4.9:1 (computed against WCAG) |
| **CTA `#ff5926` with a white label** | **A** | the owner's choice. **White on it is 3.13:1 — under AA**, and the 15px/600 label is not large text, so it does not meet the 3:1 allowance either. Recorded as a deliberate brand call: it is the only value on the page that does not clear AA. `--btn-line #e8481a` carries the boundary at 3.7:1 (WCAG 1.4.11) |
| **Canvas neutrals** | **A** | values the author set. The corpus has no base ramp, so they are not measured. The dark ramp is a **neutral** black — `#0c0c0c`, R=G=B all the way up. It was Primer's blue-tinted set until round 13 |
| **Pretendard as the typeface** | **A** | the author's choice. Not a corpus value — the corpus records typefaces per system but recommends none |
| **Square controls (radius 0)** | **A** | the author's choice. `tokens/scales.md` records a radius-0 camp, so the value is in the sample; picking it is a decision |
| **Light only, no dark theme** | **A** | the corpus treats the six ways of handling dark mode as **permitted branches** (`patterns/color.md`), and shipping none is also a branch — Apple's own kits aside, several samples ship light only |

`word-break: keep-all` is typesetting for the Korean strings that survive in the data, not a
corpus axis (**A**).

## Theme — light by default, dark by choice

> **Superseded on 2026-08-22 (round 12).** A dark theme is back, as an explicit toggle in the
> header. **Light is still the default** — the note below stands as the record of the day the
> page ran light-only, and the palette description two sections down still describes the dark
> set the toggle now restores.
>
> Storage has three states, and they are not the same thing: `'light'`, `'dark'`, or **nothing
> at all**. Nothing means *follow the OS* — including when the OS flips mid-visit, which the
> page listens for. The first click writes an explicit choice and the page stops following the
> OS from then on, which is how an in-page switch is normally expected to beat a system one.
> The choice is read **before first paint** by a four-line inline script in each `<head>`;
> `assets/site.js` is deferred, and a deferred script would flash the wrong theme first.

> **The dark theme and its toggle were removed on 2026-08-21.** The page was light only:
> a single `:root` carries the palette, `color-scheme: light`, no `[data-theme]` block, no
> pre-paint script and no `localStorage`. Verified headlessly under all three conditions that
> used to flip it — a clean visit, a visitor with `theme: 'dark'` still in storage, and an OS
> that prefers dark — all land on `rgb(250,249,247)`.
>
> Two things went with it. **The hero photograph** was a dark-theme asset (hidden in light),
> so its `.hero-media` element, CSS and drift animation are gone and the hero keeps the warm
> CSS bloom; `docs/assets/hero-bg.jpg` and the `fetch-hero` workflow are left in place but are
> now **unreferenced**. **The footer stays a dark slab** — that was never a theme, it is the
> page closing on the corpus's own identity, and it still redefines the palette in its own
> scope.
>
> The sections below are kept as the record of how the themes were built and why the values
> are what they are.

## Theme — how it was built (light by default with a dark toggle)

> This section is a record of the days when the page was **dark only**. A light toggle was
> added in round 6, and **round 7 flipped light to the default** (see below). The palette
> description below still holds as a description **of the dark theme**.

`:root` carries the light values and `[data-theme="dark"]` the dark ones. **The dark
canvas neutrals** were taken with GitHub Primer's dark mode as the reference system (the
"grammar reference" in `agents/system-selection.md`) — `#0d1117`, `#161b22`, `#30363d` and
the rest are **values the author set to match that reference (A)**, since the corpus has no
base ramp. The 6 and 12px radii match Primer's `borderRadius` small and large.

> **Superseded in round 13 (2026-08-22).** Those neutrals are Primer's, and Primer's dark
> canvas is deliberately blue-tinted. The ramp is now neutral — `#0c0c0c` and up, R=G=B. The
> paragraph stays as the record of where the old values came from.

**The primary is orange `#f97316`** (the author's choice, A; 6.75:1 against the canvas). It
is used on the statistics figures, the hero emphasis, links, the brand, focus, the glow and
the Copy button. The 🍊 left of the logo and the favicon are in the orange family too.

**The chips were unified under a single rule** — every data chip (tag, harvest depth,
samples, unverified, filter) uses **the same neutral surface with a white label**, and
**meaning is carried only by a coloured dot and a faint tint**. Harvest depth gets a
step-coloured dot (**`full` orange · `partial` blue `#58a6ff` · `minimal` slate
`#8b98a8`**), samples a teal dot (`#2dd4bf`), unverified a yellow dot (`#e3b341`), and the
eyebrow an orange dot. A solid fill is left to **the button (Copy)** alone, which is what
separates chips from buttons. The chips' white labels are above 12:1 on each tint, and the
dot colours are decorative and so excluded from the contrast requirement. **The Copy
button's label was unified to white as well**, and since white on the bright primary orange
falls short of AA (4.5:1), that button alone sits on **a deeper orange (`#c2410c`)**, which
brings the white label to 5.2:1. All of it is an author decision (A).

**Code blocks** sit on a **panel lighter than the page (`#1c2128`)** with an amber left rail,
and **command lines are nearly white (14.9:1) while comment lines are dropped (5.6:1, AA)**
so there is contrast inside the block itself.

## Layout — referencing sanity.io (editorial framing)

At the user's request, **sanity.io's design language was used as a reference**. The live site
does not open through this session's proxy (`EGRESS_BLOCKED`), so this is not a copy of their
screens but **known motifs applied to a dark canvas**. What was taken:

- **Full-height vertical column rules** — 1px lines the full height of the viewport on either
  side of the content width (`.grid-lines`, fixed). An editorial grid feel.
- **Numbered mono kickers** — a mono upper-case label above each section, `01 — SYSTEMS`, with
  a trailing hairline. Only the number is orange.
- **Large, tight display headlines** — the hero at up to 66px, weight 720, tracking −0.035em.
- **A hover arrow on cards (↗)** — an orange arrow that appears at the top right of a link
  card.

The colour, type and chip systems were kept as they were; only the layout skeleton was raised
to something editorial. All of it is an author decision (A), not a corpus value.

### Round 2 (the user supplied actual sanity screenshots) — correcting "too AI-looking"

The user provided two screenshots of the sanity.io home page (the live site is still blocked
by the proxy). Observation → plan → application:

- **Observation 1 — the accent colour is used tightly, as a full-bleed block.** Sanity puts a
  dark code window inside a solid orange band.
  → **Applied**: "Hand it to an agent" was pulled out of the hero into **a full-width solid
  orange section**. A **dark terminal window** sits on it (three dots in a title bar,
  `agent-rules`, and the snippet), the heading is black ink on orange and the button is
  black. It breaks the grid frame at 100vw.
- **Observation 2 — the cards are not plain boxes but UI panels with character** (a code
  editor, a studio form, history, release cards).
  → **Applied**: the pattern-axis cards became **large measured-number cards**. Each starts
  with a big teal number (77 · 68 · 79 …) plus `SAMPLES`, so that our identity (measurement)
  is what gives the card its character.
  (The 116-system index cards are a browsing feature, so they were not turned into UI mockups
  and kept their data chips.)
- **Observation 3 — the hero drives action with a pair of buttons.**
  → **Applied**: a button row was added to the hero — **an orange-filled "Browse 116
  systems →" and an outlined "Agent guides"**.

The primary button is deep orange (#c2410c) with a white label (AA), and buttons on the
orange band are black with a white label. This came from screenshots, so the details may
differ from the real sanity.

### Round 3 — a hero background and terminal typing animation

- **A hero mood background (a real photograph)** — this started as a CSS gradient, but the
  user wanted **an actual photo**. This container gets a 403 from the proxy for
  `images.unsplash.com`, but **the GitHub Actions runner has open internet**, so
  `fetch-hero.yml` (`workflow_dispatch`, with a `url` input) fetches the image on the runner
  and commits it to the repository. The photo obtained (Unsplash
  `photo-1541701494587-cb58502866ab`, ink diffusing, free under the **Unsplash License**) is
  self-hosted at `docs/assets/hero-bg.jpg` and was finished with **9px blur and 0.72
  brightness** (PIL). In the hero it is positioned so the orange falls on the right, and the
  left (text) and bottom are covered by a dark scrim to protect legibility.
  A very slow 30s scale drift (stopped under reduced-motion).
  **To swap the image**, run the `fetch-hero` workflow again with a different `url`.
- **A white nav on scroll** — over the hero the header is transparent (with a faint dark scrim
  at the top so light labels stay legible), and past the hero **it switches to a solid white
  bar from section 2 onward** with the text going dark (`header.site.scrolled`, a `scroll`
  listener throttled with rAF, threshold = hero height − 64). The transition animates
  background, border and shadow.
  **A bug was caught along the way**: the grid rules (`main, header.site, footer.site
  { position: relative }`) were overriding the header's `sticky` and carrying it up with the
  scroll; taking the header out of that rule restored `sticky`.
- **Terminal typing** — when the section 2 code window scrolls into view it types out one
  character at a time (`IntersectionObserver`, once). When a line finishes, the `git clone`
  keyword highlight is applied and an orange blinking cursor is attached. **Under
  `prefers-reduced-motion` it shows the finished text immediately** with no typing. Pressing
  Copy mid-typing still copies the whole thing, because the full snippet is held in
  `pre[data-full]`.

### Round 4 — unifying buttons as pills

The interactive controls were unified as **full pills (`--r-full`)**, removing the ambiguous
squircle: the hero CTAs (`.btn`), Copy (`.copy`), Reset (`.reset`), GitHub (`.gh`) and the
search input (`#q`). **Containers** such as cards and panels stay squircles (`--r-md`), which
is what distinguishes them from buttons. Chips, harvest-depth and sample badges were already
pills, so nothing changed there.

> **Superseded on 2026-08-21: the controls are square.** The same six now take
> `--r-control: 0px` — the hero CTAs, Copy, Reset, GitHub, the theme toggle and the search
> input. `tokens/scales.md` records a radius-0 camp, so the value is grounded even though the
> choice is the author's (grade A); the input keeps matching the button, so the pair stays a
> pair (`patterns/form.md`). **The chip and badge family keeps `--r-full`** — filter chips are
> `<button>`s, but they are drawn as one family with the non-interactive coverage, sample and
> tag badges, and squaring only the filter would split that family. Containers are unchanged.
> One radius token is the whole knob: change `--r-control` to go back to pills.

The background dots are painted by **`body`'s own `background-image`**
(`background-attachment: fixed`). They used to be on `body::before` with `z-index: -1`, which
**pushed them behind the opaque `html` background so the dots were not visible on the real
page.** Putting the background directly on the body removed that trap. The 24px grid is one
step of the spacing scale in `tokens/scales.md`, and a faint accent glow at the top of the
hero lifts the dark canvas slightly.

### Round 5 — Tailwind showcase editorial framing

The **card sections and background pattern (editorial framing)** of
`tailwindcss.com/showcase` were used as a reference. That site is blocked by the proxy from
this container too, so the actual markup was fetched **on an Actions runner with the
`peek-url` workflow** (the runner has open internet), and the structure was read and carried
over from the real class tree rather than guessed from an image.

- **A card is a framed cell**, not a floating box. Each card carries a thin **vertical side
  rule** (`border-inline`) answering the page's gutter grid, and a horizontal rail
  (`border-top`) runs across the top of the grid to close it like a ledger. Card backgrounds,
  rounded corners and box borders were stripped out to reduce the "AI card" feel. The column
  gap is zero and adjacent card rules overlap via `margin-inline: -1px` to make one stroke.
- **Hover changes colour only** (`transition: background-color`, no lift) — showcase's
  `group hover:bg` plus `transition-colors`, as-is. On link cards the side rule takes a slight
  accent tint; system cards (`div`) get only a faint tint.
- **The whole system card is clickable** (added 2026-08-21). The axis, guide and profile cards
  are each a single `<a>`, but a system card carries three links (corpus entry, official site,
  source) and nesting anchors is invalid HTML — so it stays a `div` and the corpus-entry link
  is stretched over it with `a.entry::after { position: absolute; inset: 0 }`, the card being
  `position: relative`. The other two links sit at `z-index: 1` so they still take their own
  clicks. Verified headlessly: a click on blank card area navigates to the corpus entry, and a
  click on "Official" goes to the system's own site.
- **All four card types share one hover treatment** (2026-08-21). Auditing them after the
  click fix found the system card drifting on every axis: a weaker wash (0.024 vs 0.035), no
  accent tint on the side rule, and no hover arrow. The rules moved from `a.card` to `.card`,
  so axis, guide, profile and system cards now hover identically. The arrow moves to the
  bottom right on a system card, because its top right is taken by the coverage badge, and it
  is `pointer-events: none` so it never intercepts the stretched link.
- **The hover wash is a theme token** (`--card-hover`). It had been a hardcoded
  `rgba(255,255,255,0.035)` — a *white* overlay, which is all but invisible on the light
  canvas (`#faf9f7`), and light is the default theme. It is now ink over light
  (`rgba(20,18,15,0.045)`) and light over dark, so hover reads in both.
- **Diagonal hatching in the gutters** — `.grid-lines::before/::after` fill the left and right
  gutters outside the reading column with very faint repeating 45° stripes, so the body column
  reads as **a framed editorial page** (showcase's side-gutter motif). It fades toward the
  viewport edges with a mask. On mobile (≤640px) it disappears along with `.grid-lines`.

### Round 6 — a light theme toggle

**Dark stayed the default** and light was added as an **opt-in toggle** (left of the header's
GitHub button, the same pill as `.gh`). The choice is stored in `localStorage`, but **the only
value ever stored is `'light'`**, so clearing storage returns to dark. A short inline script in
`<head>` applies the stored choice **before the first paint** so the theme does not flash.

The light palette was **computed against WCAG throughout**, under the same discipline as the
dark one (canvas `#faf9f7`): body 16.8:1 · muted 6.5:1 · dim 4.9:1 · links 4.9:1 · teal 5.2:1 ·
rank-b 4.9:1 · rank-c 5.7:1 · unverified amber 4.6:1.

- **The bright primary `#f97316` is 2.7:1 in light**, so it cannot be used for text. Fills,
  dots and rank-a therefore **keep the bright orange**, while **text alone** goes to the deep
  `#c2410c`.
- The link colour got a new `--link` token and the base rule became `a { color: var(--link) }`.
  It was first done as `[data-theme="light"] a { … }`, but that selector **outranks** `.brand`,
  `.gh` and `.btn-primary`, so the logo and the GitHub button turned orange and **the CTA
  became orange text on an orange background (an invisible label)**. Pushed down into a token,
  the class rules win as they should.
- The hero photo is a dark-only asset, so it is hidden in light and replaced by **a warm
  gradient wash**. The code panel **stays dark in both themes** (the documentation
  convention), with its border darkened in light so it does not appear to float above the
  canvas. The gutter hatching had its ink inverted for light as well.

**Behaviour was verified in a headless browser** — dark by default → light stored on click →
persisted across a reload → back to dark on a second click with the storage entry removed, plus
the computed brand/GitHub/CTA/link colours checked in both themes.

### Round 7 — flipping light to the default, and a dark footer

**The default theme was flipped to light.** In round 6 light was opt-in; now `:root` carries
the light palette and **`[data-theme="dark"]` is the opt-in**. The only value stored is
`'dark'`, so clearing storage returns to light. The toggle icon shows "the theme you will
switch to", hence a moon in light and a sun in dark.

Flipping it **cleared out the per-theme duplicate rules into tokens.** Three new tokens:

- `--accent-text` — the accent's colour **when used as text**. Light `#c2410c` (4.9:1) /
  dark `#f97316`. Five rules used to be overridden individually under `[data-theme="light"]`,
  and one token made all of them disappear. Fills, dots and rank-a still use the bright
  `--accent`.
- `--hatch` — the ink of the gutter's diagonal hatching
- `--hero-glow` — the warm bloom behind the headline

**Only the structural differences** were left under `[data-theme="dark"]` — the hero photo (a
dark-only asset), the hero and header scrims, and the code panel border. The theme overrides
came down from nine rules to four.

**A bug caught while flipping it** — surfaces that are always dark were inheriting the theme
tokens. In light, the title-bar border of the terminal window (on the orange block) was
`var(--border)` and drew as a nearly white line; `.tname` was `var(--text-dim)` (#726c62) and
fell to 2.2:1 on the dark bar; and the `git clone` keyword followed `--accent-fg` down to
`#c2410c` and sank into the black background. The terminal and code panels are **dark in both
themes**, so those values were pinned to fixed colours (the keyword at `#ffa257` — 9.8:1).

**The footer is a dark slab in both themes.** The intent is to close the page on the corpus's
own identity, and rather than pinning a colour on each descendant, **the palette tokens are
redefined in the footer's scope** so the links, code and chips inside inherit the correct dark
values by themselves. Against `#0d1117`: body 6.5:1 · headings 16.0:1 · links 9.5:1 · dim
5.1:1 (dim was raised to `#7d8590` because the dark set's `#6e7681` is 4.1:1 and fails AA).

An **operator credit (StudioSMO)** was added to the footer. The repository has no `LICENSE`
file, so **no specific licence name is stated** — it goes only as far as "open source plus a
link to the public repository", exactly per the corpus discipline of not inventing evidence
that does not exist. Once a licence file is added, the name can be pinned then.

While tidying, four unreferenced tokens (`--surface-2` · `--accent-ink` · `--accent-bg` ·
`--rank-ink`) were deleted. They died when the harvest-depth badges moved to tint-plus-dot and
the code panel gained a fixed surface.

Re-verified headlessly — no `data-theme` by default / body background `rgb(250,249,247)` /
toggle label "Switch to dark theme" / `dark` stored on click / no console errors, plus the hero,
the orange block and the footer rendered in both themes.

### Round 15 — hero motion, and the site gets its own DESIGN.md (2026-08-22)

**A 24px dot field drifts behind the hero.** The right half of the hero is empty at desktop
widths, so that is where the motion lives. The grid step is not invented: 24px is a spacing
step in **27 of 29 systems** (`tokens/scales.md`), so the background is built out of a value
the corpus already carries. The drift is authored (A) — 24s linear — because the corpus holds
no ambient-loop duration to appeal to; the longest thing in `patterns/motion.md` is Codex's
2000ms, a different kind of animal.

It translates exactly one cell and the pattern repeats every 24px, so the loop is seamless
with no fade or reset, and the layer is inset -48px so the moving edge never enters the box. A
radial mask keeps the field out of the reading column.

Two things checked rather than eyeballed:

- **Worst-case text contrast**, assuming a glyph sits directly on a dot core — stricter than
  reality, since the mask removes the dots from the text area entirely: **5.64:1** light and
  **6.01:1** dark, against 6.81 and 7.57 on plain canvas. Both stay over AA.
- **The reduced-motion recipe was wrong.** The global rule set `animation-duration: .01ms`
  without pinning the iteration count. For a *finite* animation that reads as "instant"; for
  an **infinite** one it is not stopped at all, it is a spin at a thousand cycles a second.
  The count is pinned now and the hero field is held still outright. Verified with
  `reducedMotion: 'reduce'` — zero running animations.

---

**The site now ships its own `DESIGN.md`.** This repository asks every product it touches to
produce a build spec with an evidence grade on every value. The site is the first thing it
actually built, so it owed one.

It lives at **`profiles/interpreted/self-made-designops-site.DESIGN.md`**, and the directory
had been empty until now. `profiles/README.md` already described that layer exactly: *"the
author's reading — mostly A, colour filled in."* That is the site precisely, and putting it in
`measured/` would have misfiled a file whose palette is entirely authored.

**It is generated, not written.** `site/design-spec.mjs` reads `docs/assets/site.css` — **64
values** off the stylesheet — and emits the spec in both languages. A hand-written spec beside
a hand-written stylesheet is two sources of truth, which is the failure this whole repository
is about. The generator also **computes** every contrast ratio it prints with the WCAG
formula, so the numbers in the document cannot disagree with the colours in the document, and
it **fails** if a declaration it expects has gone rather than emitting a plausible number —
the rule `site/build.mjs` already follows for the kit inventory.

Grades came out **M4 · D3 · A7 · U0**. A-heavy, which is correct here and would be a
misfiling in `measured/`.

**The linter found the one thing that is actually wrong, and nothing else.**

```
npx @google/design.md@0.4.0 lint profiles/interpreted/self-made-designops-site.DESIGN.md
→ 0 errors, 1 warning
  contrast-ratio: textColor (#ffffff) on backgroundColor (#ff5926) is 3.13:1, below AA 4.5:1
```

That is the CTA, the one deliberate exception, already written into the spec as an A row with
its cost stated. **An independent tool reaching the same conclusion from the artefact alone is
the layer working** — an authored value that costs something announces the cost instead of
hiding inside a palette. Two earlier warnings (`link` and `warning` defined but never
referenced) were real and are fixed: the palette is now wired to components through
`backgroundColor` / `textColor`, and `link` and `notice` were added as components, since the
page genuinely has both.

Wired so it cannot rot: `site/design-spec.mjs` joins the kit inventory (**24 items, 5,640
lines**, both counted from disk), and `.github/workflows/site.yml` regenerates both language
versions on every PR touching `site/`, `docs/` or `profiles/interpreted/` and fails if the
committed files differ.

---

**A third hero button — `Get DESIGN.md`, outlined in the primary.** It links to the spec
above, so the page hands over the artefact it has just spent a section arguing for.

Two colours in it are *not* the fill's `#ff5926`, and the reason is the same both times:
**#ff5926 is 2.97:1 against the light canvas.** On a filled button that is only the edge, and
`--btn-line` was already carrying it. On an **outline** button the boundary *is* the
component, so it cannot be waved through — the stroke takes `--btn-line` (`#e8481a`,
**3.71:1**), the same orange two steps down that already draws the filled button's edge and is
indistinguishable from it at 1px. The label takes `--accent-text` for the same arithmetic:
`#ff5926` as type is 2.97:1, `#c2410c` is **4.92:1** (`#f97316` at 6.98:1 in dark).

Measuring all three buttons at once turned up something worth writing down rather than
quietly changing: **the secondary button's stroke is 1.42:1** against the canvas
(`--border-strong`), far under 3:1. It is left as it is, deliberately — WCAG 1.4.11 covers
visual information *required to identify* a component, and all three buttons carry a text
label at 16.8:1 doing that job. Which means the strictness applied to the outline button's
stroke was belt-and-braces, not a requirement. It cost nothing, so it stays.

Verified in both themes at 1440 / 940 / 390: the three actions sit on one row down to 940 and
stack to three at 390, no horizontal scroll, all three 46px.

### Round 14 — the CTA gets brighter (2026-08-22)

The owner asked for **more saturation and more lightness** on the orange CTA. Raising both
while keeping a white label turns out to be almost impossible: white on the current
`#c2410c` is 5.18:1, and it falls under AA at `#d44a05` — **two points of lightness above
where it already was**. Every orange bright enough to read as "brighter" fails with white on it.

The near-black label was tried across two passes — `#ff8000` at L50, then `#ff8f1a` at L55 —
and the owner did not want it. **The CTA is `#ff5926` with a white label, picked by the
owner**, and it ships that way:

| | was | is |
|---|---|---|
| fill | `#c2410c` · H17 S88 L40 | **`#ff5926`** · H14 S100 L57 |
| label | `#ffffff` · 5.18:1 | `#ffffff` · **3.13:1** |
| hover | `#a83809` | `#f04a15` · 3.69:1 |
| border | (same as fill) | `#e8481a` · 3.71:1 on the light canvas |

**3.13:1 is under the 4.5:1 AA floor**, and the label is 15px/600, which does not qualify as
large text (that needs 18.66px bold or 24px) — so it does not reach the 3:1 large-text
allowance either. This is written down rather than smoothed over: it is **the one value on
this page that trades measured contrast for the look**, a deliberate brand call by the owner,
and everything else in `site.css` clears AA. If it is ever revisited, the cheapest fixes in
order are: raise the label to 19px/700 (clears 3:1 as large text), or take the fill to
`#e8481a` (3.91:1 with white — still short), or go back to a dark label (8.6:1).

What the two dark-label passes did establish, and what stays true: `--accent` (`#f97316`) is
documented as *fills and dots only, never text*, and `--accent-text` (`#c2410c`) is the deep
cut that sets type. The button had been using the deep cut as a **fill**, which is why it
could not get brighter — it was carrying a text colour's constraint for no reason.

**The border is not decoration.** A filled button's boundary against the page has to reach
3:1 under WCAG 1.4.11, and `#ff5926` against the light canvas is **2.97:1** — a hair under,
close enough that eyeballing it would never have caught it. `--btn-line: #e8481a` carries the
boundary instead, at **3.71:1** on the light canvas and 5.01:1 on the dark one. Brightening a
fill on a light background silently costs you that edge; it is the one value worth checking
after any change like this.

`--btn`, `--btn-hover`, `--btn-text` and `--btn-line` are now **theme-independent** — one set
serves both, because a near-black label on a bright orange reads the same either way. The
dark block used to redeclare `--btn` for no gain.

**The headline breaks where the owner broke it** — `Clone it once.<br>Make your DesignOps.` —
and `.hero h1` **lost its `max-width: 17ch`**. With an explicit `<br>`, a ch cap does not limit
anything; it re-wraps the second line and turns two deliberate lines into three, which is
exactly what it did on the first attempt. Counted at 1920 / 1440 / 1200 / 940 / 768 / 560 /
390: **two lines at every one of them**. At 320px it goes to three — "Make your DesignOps."
does not fit in 288px at the 32px floor — with no horizontal scroll, which is acceptable
degradation two sizes below the common phone floor.

Verified in both themes: CTA and Copy both compute `rgb(255, 89, 38)` with an
`rgb(255, 255, 255)` label at 3.13:1, hover at 3.69:1, the border at 3.71:1 against the light
canvas, zero horizontal scroll, zero page errors.

### Round 13 — a neutral black, and the headline the owner wrote (2026-08-22)

**The dark canvas stops being blue.** It had been Primer's `#0d1117` since the first dark
theme, picked because Primer was the grammar reference — but Primer's dark is *deliberately*
blue-tinted, and beside this page's warm light canvas (`#faf9f7`) the two themes read as two
products rather than one product at two times of day. The whole dark ramp is now neutral, at
the owner's request: **every neutral has R=G=B**, so the only hue left in the dark theme is the
orange and the two coverage dots, which carry meaning rather than chrome.

| | was (Primer) | is (neutral) |
|---|---|---|
| canvas | `#0d1117` | `#0c0c0c` |
| sunken | `#010409` | `#070707` |
| surface · code panel | `#161b22` | `#161616` · `#141414` |
| border · strong | `#30363d` · `#444c56` | `#2a2a2a` · `#3d3d3d` |
| text · muted · dim | `#e6edf3` · `#9198a1` · `#7d8590` | `#ededed` · `#a1a1a1` · `#8a8a8a` |
| footer slab | `#0d1117` | `#0c0c0c` |

Re-computed against `#0c0c0c` rather than carried over: **text 16.7:1 · muted 7.6:1 · dim
5.7:1 · link 7.0:1 · warning 10.1:1 · white on the Copy button 5.2:1 · footer links 9.8:1**.
Every one of those went *up*, because a neutral black is darker than Primer's canvas. The code
panel's own colours moved with it — the body was `#f0f6fc` (a blue-tinted white) and the
comment `#9198a1`; they are `#f5f5f5` (16.9:1) and `#949494` (6.1:1), and the comment gained
half a point in the swap.

`--cov-partial` stays `#58a6ff` and `--warn` stays `#e3b341`. Those are **not chrome** — a
coverage dot and a warning marker are the two places on the page where hue is the message, so
neutralising them would have cost information to buy consistency.

**The headline is the owner's**: *"Clone it once. Make your DesignOps."* — replacing "Clone it
once. Your agent stops guessing." It was written `designOps`; it is set as **DesignOps** to
match the brand in the header, the footer and the eyebrow, which would otherwise be the only
four places on the page that disagree about how the word is capitalised.

Verified on both pages, in both themes, at 1440 / 940 / 390: canvas computes to
`rgb(12, 12, 12)`, zero horizontal scroll, zero page errors.

### Round 12 — two pages on one shell, and the dark toggle returns (2026-08-22)

Two mockups were built side by side: **A**, the corpus as a dense catalog, and **B**, the
repository framed as a **DesignOps starter kit** with the corpus as its evidence. The owner
picked the kit framing and then caught the thing that mattered: *"좌우 배치 아니었어?"* — B had
quietly dropped the 248px rail and reverted to a centred marketing page, which made the two
mockups read as two different products rather than two views of one.

So the shell became the constant and the content became the variable:

- **`/` (`docs/index.html`) — the kit.** Hero → three commands → what's inside → nine pattern
  axes → why the defaults hold → principles.
- **`/catalog.html` — the evidence.** The same rail, now carrying search and the platform /
  coverage / domain facets; the right column is the 116-row table with the logo column.

Everything shared moved out of the pages and into **`docs/assets/site.css`** and
**`docs/assets/site.js`**. Both `docs/preview.html` and `docs/preview-kit.html` were deleted —
they were mockups, and a mockup left in the repository becomes a second source of truth.

**The rail cannot drift from the inventory.** Its sub-items are generated from `corpus.json`'s
`kit` groups, the same array the "What's inside" list renders from, so a file added to the kit
appears in both or in neither.

**The dark toggle** is described in the theme section above. What it cost: the dark palette had
to be re-derived for the merged chrome, and the figures are WCAG-computed against `#0d1117`
rather than eyeballed — text 16.0:1 · muted 6.5:1 · dim 5.1:1 · links 6.8:1 · warning 9.7:1 ·
white on the Copy button 5.2:1. The light set was re-measured at the same time and one comment
was **wrong**: it claimed 6.5:1 for `--text-mut`, the real figure is 6.8:1. Corrected in place.

**One defect the screenshots caught.** Below ~620px the header row — brand, two pills and the
toggle — no longer fits, and **a flex row that does not fit widens the document**: 64px of
horizontal scroll on the index at 390px, 22px on the catalog. The GitHub pill is now hidden at
that width; it is the one of the four that is carried elsewhere (the rail and the footer both
link it), while the theme toggle is carried nowhere else. A second, smaller one: the header's
count pill rendered as `Catalog116` — `.ctrl` is an inline-flex box and the count span had no
gap of its own.

Verified headlessly on both pages, in both themes, at 1440 / 940 / 390: **zero horizontal
scroll, zero page errors**, 19 kit rows, 9 axis cards, 116 catalog rows, 17 filter chips, no
`—` placeholder left unfilled, the theme surviving a page-to-page navigation, and hover
visible in both themes (`--hover` is a token per theme, not a hardcoded white overlay — the bug
from round 10).

### Round 11 — the logo column, without holding any logos (2026-08-22)

How does a catalog of hundreds of brands have all those icons? It does not: reading
getdesign.md's markup on a runner shows it hotlinks **`github.com/<org>.png`** and stores
nothing. The handle is the asset.

`docs/preview.html` does the same, and the corpus already has the material — `repo` yields
the org, so no collection step exists at all. **101 of 116 entries carry a handle, 98
distinct, and all 98 resolve 200** (`check-avatars`, 2026-08-22).

- **The match is unanchored on purpose.** Some `repo` fields are prose rather than a bare
  URL ("github.com/nordhealth/design-system — declared in the package"); anchoring the regex
  lost Nord and one other.
- **No repo, no request.** The Apple and Google platform kits, Toss, Gojek and Tokopedia keep
  their monogram — which states something true about them rather than papering over it.
- **`referrerpolicy="no-referrer"`** so a visitor's page URL never reaches GitHub.
- **A hotlinked handle goes stale like a pinned version does** — an org renames, the avatar
  404s, the row quietly drops to a monogram. `check-avatars` resolves every handle monthly
  and reports only failures, the same shape as `check-sources`.

**A bug worth recording.** The first attempt built the probe as a detached
`new Image()` with `loading="lazy"` — and **not one request fired.** A lazy image outside the
document has no viewport to defer against, so the browser waits forever. The `<img>` now goes
into the DOM immediately, transparent above the monogram, and reveals itself on `load`; on
`error` it removes itself. Measured after the fix: 28 requests on first paint, the rest
deferred properly.

### Round 10 — the system browser becomes a catalog, not a card grid (2026-08-22)

116 entries as editorial cards meant a lot of scrolling to compare two systems. The section
is now an **app shell**: a 248px sticky filter rail beside a dense, hoverable index — one row
per system, ruled columns, no card chrome.

**Referenced from getdesign.md**, which solves the same problem (hundreds of entries that
have to stay scannable). Read on an Actions runner with the `peek-url` workflow, since the
site is blocked by this container's proxy. What was taken is the **layout convention** — a
sticky rail beside a dense row index, a column ruler above it, row hover as the only
affordance, and small monospace meta columns. The content, type scale, palette and copy are
this page's own. Grade A, like every other layout decision here.

To read a page that long, `peek-url` gained a `lines` input: the job log only reads back from
the tail, so hundreds of list rows buried the header and hero.

| | before | after |
|---|---|---|
| layout | 3-column card grid | 248px sticky rail + row index |
| per entry | card with title, org line, tag row, three links | one row: name · org · domain · coverage · platform · links |
| filters | chip rows stacked above the grid | vertical facet groups in the rail, each with a mono label |
| entry link | stretched over the whole card | stretched over the whole row (the same `::after` trick) |

Details worth keeping:

- **The name truncates; the markers do not.** `Figma` and `N open` sit beside the name as
  bare monospace annotations rather than pills, and the name takes `flex: 0 1 auto` so it
  ellipsises instead of squeezing them. 12 of 116 names truncate at 1280px, all with the full
  name in the link's `title` alongside the verified date and token formats.
- **Platform shows the primary value and counts the rest** — `web +2`, with the full list on
  hover. The corpus counts a system under the first value of its `platform` array
  (`platforms.md`), so this matches the data rather than spilling a three-value list into the
  next column. Fluent 2 was doing exactly that before the fix.
- **The column ruler disappears below 760px** and a row stacks instead; the rail stops being
  sticky below 900px.

### Round 9 — the hero leads with a finding, not an inventory (2026-08-21)

The hero read like a spec sheet: the eyebrow ("reading the docs was never enough") and the
first line of the lede ("A pile of design-system docs to read was never enough") said the
same thing twice, and the headline — "116 design systems, measured and ready to build with" —
described the inventory rather than giving anyone a reason to care.

It now opens on the corpus's own finding: **"There is no standard button height."** The lede
carries the evidence (40px is the mode across 77 samples and still covers barely a quarter of
them, and no spacing value survives every system, 16px included), then turns to what the
thing is. Both claims are the corpus's, not copy: the button figure is the `button.md`
re-synthesis, and the spacing one is "the value without exceptions has disappeared" in
`tokens/scales.md`.

**Numbers in the hero come from the data.** The sample size beside the button claim is read
from the Buttons axis (`#hero-btn-samples`), and the count in the CTA label from `d.count`
(`#cta-count`), so neither can drift from the corpus the way a typed number would. The
headline's `max-width` went 15ch → 19ch so one declarative sentence sets in two lines rather
than stacking into a column.

**A bug caught in the same pass:** `.btn` is an `inline-flex` row with a gap, so wrapping the
count in a bare `<span>` made it a flex item and opened a gap either side of "116". The label
is one flex item again, with only the arrow separate.

### Round 8 — turning the footer into an ordinary site footer

Through round 7 the footer body was **a note to its own maker** — nearly 200 words of
evidence-grade paragraphs about the spacing scale, control heights, focus ring thickness and
the 24px dot grid. That was at odds with **what a visitor looks for in a footer** (what this
is / who runs it / where the source is / language / anything they need to know), and it
duplicated this document, which already covers the same ground in more detail. It also
contradicted the site's own stated principle that the page is an index carrying no new facts.

**It was replaced with a standard four-column layout plus a bottom bar:**

| Column | Contents |
|--------|----------|
| Brand | the 🍊 logo plus a one-sentence introduction |
| Explore | the five in-page anchors (the same as the header nav) |
| Corpus | the repository · the system index · implementation defaults · the agent procedures · the DESIGN.md profiles · this page's build document |
| Languages | the six README language versions |

The bottom bar keeps `© <year> StudioSMO · Open source` and just two lines a visitor actually
needs (**the documents are English with the Korean original beside them** / **the list and
sample counts are generated and never hand-edited**). The evidence-grade paragraphs were
removed wholesale and replaced by the Corpus column's "How this page is built" link
(`site/README.md`).

**Two errors caught along the way** — both of the kind this corpus forbids:

- **A false claim.** The footer stated that Primer's accent `#1f6feb` was "the only measured
  corpus colour on this page", but `grep -c "1f6feb" docs/index.html` → **1**, and that one
  occurrence was **the sentence saying so**. The colour is nowhere in the stylesheet. It was a
  leftover sentence from before the primary changed to orange, and it was deleted. Of all
  places, it sat inside the paragraph that says values without evidence are not filled in.
- **A broken string.** The last line read `corpus.json — generated from … patterns/*.md
  재종합 절 제목`, a Korean fragment stuck to the end of an English page, looking like debug
  output. Its source, `generated_from` in `site/build.mjs`, was rewritten as an English
  sentence, and the footer now carries **a human-readable sentence in the bottom bar rather
  than printing the generator string verbatim**.

The copyright year is **stamped at runtime** (`new Date().getFullYear()`). Baking a year into a
static page lets it go quietly stale — not a mistake to make in a repository whose point is
catching drift.

Checked on desktop and mobile (390px), in both light and dark — the four columns fold to two at
900px and one at 560px with **no horizontal scrolling**, all 18 footer links resolve to real
paths (file existence checked before committing), and there are no console errors.

## Share cards — captures of the real hero

`docs/assets/og-home.png` and `og-catalog.png` are what Slack, X and LinkedIn show when the
pages are pasted. They are **headless-Chrome captures of each page's own hero**, not artwork:
a card that shows the page cannot promise something the page does not say, and it stays right
by being retaken rather than redrawn.

Both are 2400×1260 — the 1.91:1 card ratio, at 2× for retina. The hero is captured at its
measured height (home 1200×475, catalogue 1200×431 — header included, ending exactly at the
section border) and then padded to the ratio in `--bg` (`#FAF9F7`), so the hero sits centred
with margin rather than being stretched or cropped.

**To retake them** — the heights come from the page, so measure before capturing if the hero
changed:

```bash
cd docs && python3 -m http.server 8797 &
CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1200,475 --virtual-time-budget=5000 \
  --screenshot=assets/og-home.png http://127.0.0.1:8797/
sips --padToHeightWidth 1260 2400 --padColor FAF9F7 assets/og-home.png --out assets/og-home.png
```

The hero height is `document.querySelector('section#start').getBoundingClientRect().top`
at a 1200px viewport (for the catalogue, the `.hero` element's own `bottom`).

`docs/assets/hero-bg.jpg` — the Unsplash photo fetched by `fetch-hero.yml` — is no longer
referenced by anything. It was the share image until 2026-08-24 and is left in place because
the workflow still points at it.

## External dependencies

Just one: **Pretendard Variable 1.3.9** (SIL OFL-1.1). It uses jsDelivr's
`pretendardvariable-dynamic-subset.css`, so the browser downloads **only the Unicode ranges
it actually uses** (16 subsets in local verification). The version and licence were confirmed
with `npm pack pretendard@1.3.9`. It is a variable face, which the page's intermediate weights
(450–720) need, and it carries Hangul, so the footer's language row renders in it rather than
falling through. If it fails to load, the fallback stack (`-apple-system` →
`Apple SD Gothic Neo` / `Noto Sans KR`) renders with no structural change.

> **Verified against the deployed page (2026-08-23).** jsDelivr answers from this session —
> the stylesheet is 55,760 bytes with 92 `@font-face` rules, and a subset woff2 fetches at
> 34,568 bytes. On `keepyaoung.github.io/self-made-design-ops/` itself,
> `document.fonts.status` is `loaded`, `document.fonts.check('16px "Pretendard Variable"')`
> is **true**, and the loaded face reports the variable range **45 920**. The earlier note
> here said jsDelivr was proxy-blocked and that verification had been done on a local copy;
> that was true of the 2026-08-21 session and is not a standing property — recheck rather
> than inherit it.

**A short detour through Satoshi** (2026-08-21). The page ran on Satoshi (Indian Type Foundry,
via Fontshare) for part of a day and was reverted the same day at the owner's request. Two
findings are worth keeping on the record: Fontshare's `?f[]=satoshi@1` is the variable cut (one
`@font-face`, `font-weight: 300 900`, `font-display: swap`), and that response also carries an
unreferenced **Sentient** face — do not read it as "Satoshi only". Satoshi has no Hangul, so
the footer's language row fell through to the system Korean faces while it was in place.
