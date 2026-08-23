<!-- lang-links -->
> **English** · [한국어](UNVERIFIED.ko.md)
<!-- /lang-links -->

# Classifying the unverified items

This document splits the `unverified` marks in `systems/*.md` into **resolvable now /
requires a precondition / structurally impossible**.

Marking honestly is a virtue, but **428 unclassified items are a number, not information.**
"I have not opened it yet" and "that system does not publish it at all" are completely
different facts, and the single word `unverified` puts them in the same box. This document
pulls them apart.

**Written and checked in full: 2026-08-18.** For the update procedure, see "Recheck
procedure" at the end.

> **On the marker itself.** The counts below were taken against the Korean originals, where
> the mark reads `미확인`. In the English primaries the same mark reads `unverified`; the
> `.ko.md` versions keep the Korean word. When recounting, grep for both.

## Totals

| | before 8/18 | after the first pass | after the B-1 render | **recounted 2026-08-23** |
|---|:---:|:---:|:---:|:---:|
| open `unverified` marks | 428 | 359 | 308 | **212** |
| unverified frontmatter fields | — | — | 118 | **109** |
| — `a11y_target` | — | — | 59 | **57** |
| — `figma_kit` | — | — | 49 | **48** |
| — `license` | — | — | 9 | **4** |
| — `repo` | — | — | 1 | **0** |

> **The 308 was never reproducible, and the recount procedure is why.** The command this
> document gave had two defects, both now fixed in "Recheck procedure" below: it globbed
> `systems/*.md`, which sweeps the `.ko.md` twins in as well and counts every entry twice —
> **the same bug found in `check-sources.mjs` on 2026-08-21**, which had turned 185 sources
> into 370 — and it matched `unverified` case-sensitively, missing every sentence-initial
> **`Unverified`** in the English primaries. The stated command still returns 367 today; the
> corrected one returns **212**. The `license` and `repo` figures had simply not been
> recounted since those items were resolved.

**120 marks disappeared across two passes** — 66 fields in the first (re-searching sources)
and 64 items in the second (**the B-1 headless render**, 37 systems across four parallel
teams: 27 resolved · 37 confirmed absent).

> **The numbers are a snapshot at the time of measurement.** Recount them with the two lines
> in step 1 of "Recheck procedure".

## The B-1 render result — the classification itself was an overcount (2026-08-18)

Checking all 37 systems headlessly showed that **B-1 (an SPA, so rendering is required) was
an overcount**:

| Actual state | Detail |
|---|---|
| **it was static/SSR** | most of them — the body came straight out of curl and no rendering was needed at all (8 of the 10 W4 handled) |
| genuinely an SPA | values captured by rendering (Base Web · Canvas · Cloudscape · artsy-palette and others) |
| **not an SPA but behind authentication** | **Odyssey** — `odyssey.okta.com` is an Okta SSO login screen. Not B-1 but **B-4 (login required)** |
| nothing there even after rendering | many → **confirmed C**. Turning "I do not know, I have not looked" into "I looked, and it is absent" is the real yield of this pass |

**Read the classification as a confidence level** — the first pass, split purely on the
length of the curl body, was an **upper bound** on "rendering may be required", not a
settled figure.

### Practical rendering notes (for whoever goes next)

- **Chrome hangs after `--dump-dom` instead of exiting.** The DOM is written correctly, so
  kill it with a watchdog — macOS has no `timeout`, so use
  `perl -e 'alarm shift; exec @ARGV' 150 ...`. **It is worse in parallel** — running
  sequentially is stable.
- **`sed 's/<[^>]*>//g'` alone leaves inline CSS behind** — strip `<script>` and `<style>`
  blocks first (most of Carbon's 2.8MB was CSS).
- **CloudFront 403s the default headless UA** (canvas.workday.com · tegel) — spoof
  `--user-agent`.
- **Storybook sites give only the sidebar at the top-level URL** — the body is at
  `iframe.html?id=<id>&viewMode=docs`, and the story list at `/index.json` via curl.
- **zeroheight sites use hash paths** (lightning) — render the root and extract the `href`s
  first.
- **Cleaning up processes afterwards is mandatory** (the cleanup section in
  `agents/design-review.md`) — zombies keep holding memory.

## A / B / C distribution — as classified in the first pass (before the B-1 render)

| Class | Count | Meaning |
|:---:|:---:|---------|
| **A. resolvable now** | **123** | the source is open and only the path needs digging out |
| **B. conditional** | **136** | there is a precondition — a browser, an account, a URL update |
| **C. structurally impossible** | **45** | the system does not publish or distribute the value — **the absence is the fact** |

**B-1 (87 items) was consumed by the render pass above.** What remains under B are the
non-SPA conditions (login · site gone · Figma kits), and C **grew** as a result of the
render (37 absences confirmed).

The classification is **measured, not guessed**. All 100 systems' `url`s were opened and the
HTTP code, redirect destination and post-tag-stripping body length were measured; the split
follows from that.

## A. Resolvable now — 123 items

| Sub-type | Count | Fields |
|----------|:---:|--------|
| the documentation site reads as HTML — needs further path exploration | 87 | `a11y_target` 31 · `## Accessibility` 29 · `figma_kit` 25 |
| an npm or GitHub path already exists — an unexplored stretch | 36 | token and component body sections (the lesson-6 type in `HARVESTING.md`) |

**37 systems whose documentation site reads** — the home page and the accessibility page in
the sitemap were swept, but no WCAG or Figma string turned up. Deeper paths remain
(`/foundations/*` · `/about/*` · `/resources/*`):

> ant-design · astro-uxds · bolt · bootstrap · braid · chakra-ui · codex · digital-go-jp ·
> eui · evergreen · fleet-boston · garden · grommet · headless-ui · helios · heroui ·
> intergalactic · italia · mui · nasa-wds · nhs · pajamas · panda-css · park-ui · pie ·
> priceline · protocol · semi · serendie · sgds · shoelace · skeleton · spindle · stacks ·
> thumbprint · tizen-circularui · welcome-ui

**31 systems with npm/GitHub left unexplored** — the package path is already recorded in the
frontmatter `source`, and files inside that package remain unopened:

> ant-design · astro-uxds · atlassian · audi-ui · auro · backpack · base-web · blueprint ·
> canvas · carbon · codex · eui · fluent-2 · gestalt · govuk · helios · heroui · italia ·
> lightning · material-3 · open-props · orbit · origami · persona · primer · protocol ·
> semi · serendie · tizen-circularui · vapor · vuetify

**Read the 15 lessons in `HARVESTING.md` before starting.** Most of these 36 are of the
"fooled by a one-line `@import` file" (lessons 4 and 13) · "never looked at `dist/cjs/`"
(lesson 11) · "skipped the auxiliary directories (`internalCss` · `docs` · `figma`)"
(lesson 14) variety.

## B. Conditional — 136 items

### B-1. The documentation site is an empty SPA shell — 87 items (37 systems)

curl returns 200, but strip the tags and the body is **0–500 characters**. The values exist
but **cannot be read without browser rendering.**

| Body length | Systems |
|:---:|---------|
| 0 chars | base-web |
| 4–40 chars | naive-ui · artsy-palette · clarity · mistica · strapi · lightning · vibes · kaizen · vuetify · pharos · charcoal · vibe |
| 50–500 chars | ebay-skin · porsche · backpack · seed-design · auro · blueprint · persona · odyssey · yoga |
| (cross samples) | aurora-gc · canvas · carbon · cloudscape · open-props · polaris · radix-themes · shadcn-ui · siemens-ix · spectrum · tailwind · tegel · uswds · vapor · ring-ui |

**Condition for resolution:** a headless browser (a local session). Follow the zombie-process
cleanup rule in the design-review guidance under `agents/` along with it.

### B-2. The documentation site is gone or moved — 15 items (6 systems)

| System | Measured result |
|--------|-----------------|
| `paste` | `paste.twilio.design` → **redirects to github.com/twilio-labs/paste** (documentation site retired) |
| `bf-solid` | `solid.buzzfeed.com` → moved to a static asset path on `buzzfeed.com` |
| `audi-ui` | `github.com/audi/audi-ui` **HTTP 404** (repository deleted) |
| `wmn` | `designsystem.wmnetwork.co.uk` → `designsystem.tfwm.org.uk` (organisation renamed) |
| `primevue` | `primevue.org` → `primevue.dev` |
| `krds` | repository and documentation both SPAs. The npm `krds-uiux` is a third-party republication |

**Condition for resolution:** the frontmatter `url` and `repo` have to be updated first.
Re-harvesting without updating them runs into the same 404 again.

### B-3. The documentation site does not respond or is blocked — 13 items (4 systems)

`hsds` (HTTP 000) · `kontur` (000) · `orbit` (000) · `dsfr` (403).
They did not open from a local macOS session either — this is the site's problem, not a
network constraint.

### B-4. The documentation site requires a login — 11 items (4 systems)

| System | Measured result |
|--------|-----------------|
| `gestalt` | **an Okta login wall** — "You need to sign in to access internal pages" |
| `origami` | `origami.ft.com` → **a Google/Okta SSO redirect** |
| `vitamin` | `decathlon.design` → `/login` |
| `pluralsight` | `design-system.pluralsight.com` → `pando.zeroheight.com` (a zeroheight account) |

**That Pinterest took Gestalt's public documentation down and made it internal is a fact this
check turned up.** The corpus's Gestalt entry is based on the npm package and remains valid,
but the documentation layer can no longer be filled.

### B-5. Requires access to a Figma kit — 6 items (4 systems)

`apple-hig` (component list · typography) · `visionos` (spacing/radius) ·
`carplay` (typography/colour/spacing) · `android-automotive` (component list).

**Condition for resolution:** Figma MCP plus access to the kit in question. The
"adjacent-ID probe" procedure in `HARVESTING.md` (page IDs are odd numbers in the same band)
applies as written.

### B-6. Other — 4 items

`repo` for `nord` and `vapor` (2) · `url` for `vapor` (1) · `license` for `krds` (1).
`krds` has no LICENSE file in its repository, and the `license` on npm `krds-uiux@1.1.0` is
`ISC`, which is the `npm init` default and therefore **cannot be taken as the licence of
KRDS itself** — so it stays unverified.

## C. Structurally impossible — 45 items · **these are findings**

Cases where `unverified` does not mean "I have not looked" but **"I looked, and that system
does not publish this value."** The absence is itself corpus information.

### C-1. Distributed only as platform documentation and Figma kits — 26 items (8 systems)

`apple-hig` · `carplay` · `tvos` · `visionos` · `macos` · `android-tv` ·
`android-automotive` · `wear-os`.

- **`license`, 8 items — there is no repository, so there is no LICENSE file.**
  Apple and Google do not distribute design resources as code, only as documentation and
  Figma kits. No SPDX identifier turns up by any npm or GitHub route.
- **`a11y_target`, 8 items — they do not declare a WCAG compliance target.**
  Both companies publish accessibility documentation, but **neither commits to a conformance
  target at the design-system level.** This is where they part from the web samples — on
  web, most state a target.
- **`## Accessibility`, 7 items** — for the same reason.

**`platforms.md`'s conclusion, that different platforms have different token structures,
repeats at the metadata layer.** For mobile, automotive and TV operating systems, neither
the licence nor the accessibility target is a unit of distribution.

### C-2. Private or taken in-house — 19 items (7 systems)

| System | State |
|--------|-------|
| `line` | LINE Design System — not public. On npm only the typeface, `line-seed-*` |
| `rakuten-rex` | `rex.rakuten.design` **403 (internal)**. The `github.com/rakuten-rex` org survives but has zero public repositories |
| `toss-tds` | only the mini-app documentation is public. The split `@toss/tds-*` packages are the effective source |
| `unify` | Tokopedia Unify — repository not public |
| `asphalt` | Gojek Asphalt — repository not public |
| `nord` | **it is on npm, but it is not open source** (see below) |
| `frr-dashboard` | a private repository (an internal sample, excluded from the public count) |

### C-3. Two items resolved this pass by confirming absence

**Confirming an absence is a resolution too.** These moved from `unverified` (not looked at)
to `null`/`false` (looked at, not there).

| System | Field | What was settled |
|--------|-------|------------------|
| `mantine` | `figma_kit: false` | "Design is not a part of the development process – **there are no official Figma or Sketch design files**" — **the only sample to put an absence in writing** |
| `bootstrap` | `a11y_target: null` | It describes WCAG 2.2 A/AA/AAA only as **achievable** and declares no compliance of its own. It goes further and **warns that its own default palette may fall short of WCAG contrast** — the only sample to state its own shortfall |

## The 66 items resolved this pass

Every one records the actual value, the source path and the package@version, and the file's
`verified` date was updated.

### `license`, 34 items — 44 → 9

| Value | Systems |
|-------|---------|
| MIT | digital-go-jp · evergreen · forma-36 · hsds · mistica · orbit · pajamas · paste · pharos · semi · sgds · vapor |
| Apache-2.0 | atlassian · auro · backpack · blueprint · garden · gestalt · pluralsight · seed-design · thumbprint |
| MPL-2.0 | helios · protocol |
| BSD-3-Clause | lightning |
| GPL-2.0-or-later | codex |
| CC0-1.0 | nasa-wds |

**The 8 that do not end at a plain SPDX identifier matter more:**

| System | Value | Why it matters |
|--------|-------|----------------|
| `polaris` | custom (the MIT text plus a Shopify-integration-only condition) | **Writing MIT would be wrong** — a restriction to "applications that integrate or interoperate with Shopify" is attached |
| `nord` | proprietary (Nordhealth internal use only — redistribution prohibited) | **It is on public npm but it is not open source** |
| `dsfr` | Etalab-2.0 plus restrictive terms of use | An open licence with **a restriction on who may use it** (not outside government · limited copying beyond `.gouv.fr`) |
| `eui` | dual SSPL-1.0 / Elastic-2.0 | The file header takes precedence; the default is the dual licence |
| `porsche` | code: Apache-2.0, assets: separate agreement | The code and the brand assets are licensed differently |
| `cedar` | code: MIT, tokens: ISC | **The component repository and the token repository have different licences** |
| `astro-uxds` · `uswds` | public-domain family | US government commissioned works. USWDS mixes in OFL-1.1 for fonts and Apache-2.0 for icons |

### `a11y_target`, 18 items — 104 → 85

| Value | Systems |
|-------|---------|
| WCAG 2.2 AA | cedar · helios · nhs · nysds · vanilla |
| WCAG 2.1 AA | fluent-2 · forma-36 · tegel |
| WCAG 2.1 A/AA | canvas (**an unusual notation giving both levels, A and AA**) |
| WCAG 2.1 (level unstated) | eui · grommet |
| WCAG AA (version unstated) | siemens-ix |
| WCAG 2.1 + Section 508 | leafygreen (the original mixes the two standards — quoted as-is) |
| WCAG (version and level unstated) | ark-ui · primevue |
| an in-house policy above it | smarthr (referencing WCAG 2.2) · spindle (an Ameba guideline based on WCAG 2.1) |
| no declaration → `null` | bootstrap |

**Two things the cross-comparison brought out:**

1. **Stating both version and level is the minority.** Only 9 of the 18 carry `2.x + AA`;
   the rest omit the level (2) · omit the version (1) · omit both (2) · substitute an
   in-house policy (2) · declare nothing (1).
2. **The two Japanese systems (SmartHR · Spindle) use the same structure** — rather than
   adopting WCAG as the target directly, they **translate it into an in-house guideline
   placed above it**, and tag each item with the WCAG success-criterion number.
3. **Only `nysds` records a statutory deadline alongside** — New York State technology law
   (STL §103-d) requires WCAG 2.2 AA by 2027-01, and a US Department of Justice rule
   requires WCAG 2.1 AA by 2027-04-26. It is the only sample whose target **originates in
   regulation**.

### `figma_kit`, 14 items — 92 → 78

`true`, 13 items — evergreen · forma-36 · heroui · intergalactic · leafygreen · nysds ·
pajamas · park-ui · pluralsight · ring-ui · serendie · smarthr · vanilla
(all confirmed by a `figma.com` link in the official documentation site or the repository
README. The link URL is recorded in each file's `## References`)

`false`, 1 item — mantine (see C-3 above)

**Cases with only a `figma.com/@org` profile link were not resolved** — the existence of a
profile does not mean an official library is published. `forma-36`, `intergalactic` and
`evergreen` were resolved because, beyond the profile, **the body text separately announces
the library**.

## The repository channel for `a11y_target` is exhausted (2026-08-23)

Every `a11y_target: unverified` entry that carries a github `repo` was swept in one pass —
**44 repositories**, fetching `README.md`, `docs/README.md`, `ACCESSIBILITY.md` and
`docs/accessibility.md` from `main` and then `master`, and matching for WCAG level statements,
Section 508, EN 301 549 and "level AA".

| Result | Count |
|--------|:---:|
| **states a level in the repository** | **1** |
| the repository is silent on it | 39 |
| no readable README at the paths tried | 3 (Bolt · Odyssey · Origami) |
| 14 of the 58 carry no github `repo` at all | — |

The single hit is **Codex**, now resolved: the README lists *"Web accessibility compliant
(Web Content Accessibility Guidelines 2.1 level AA)"* among what its components are for
(`wikimedia/design-codex`, `main@5a4ff8980f`).

**What this closes, and what it does not.** It closes the cheap channel: for these 44 systems
the answer is not in the repository, so nobody needs to look there again. It does **not**
license reclassifying the other 43 as C. A design system stating its conformance target on its
documentation site and not in its README is the ordinary case, not evidence of absence — the
`figma_kit` overcount recorded above is the same mistake in the other direction, and it is why
this section reports a channel result rather than a verdict. The remaining route is the
documentation-site channel (B-1), system by system.

## The repository channel for `figma_kit`, swept the same way (2026-08-23)

The same sweep was run for `figma_kit: unverified`, over the **41** entries that carry a
github repo, reading `README.md`, `docs/README.md`, `CONTRIBUTING.md`, `docs/index.md` and
`.github/README.md`. The match was deliberately narrow: **a `figma.com/file`,
`figma.com/design` or `figma.com/community/file` URL**, never a bare mention of the word
Figma — "we design in Figma" is not a kit.

| Result | Count |
|--------|:---:|
| **links a Figma file** | **1** |
| no such link in the repository | 35 |
| no readable README at the paths tried | 4 (Bolt · Nord · Odyssey · Origami) |
| 8 of the 49 carry no github repo at all | — |

**Kaizen, and it is the interesting one.** The 2026-08-18 documentation-site render had
concluded that a kit was *implied but not published*, and left the field unverified on that
basis. `CONTRIBUTING.md` line 165 links it outright — `figma.com/file/eZKEE5kXbEMY3lx84oz8iN`,
the file named "💜 UI Kit: Heart" — in a file a documentation-site render never reaches.
Resolved to `true` on the Backpack reading: the address answers 302, so what is confirmed is
**that the kit exists**, not that anyone can open it. The file key is recorded in the entry,
because a kit that cannot be re-identified cannot be rechecked.

**The lesson is about channels, not about Kaizen.** A render of the documentation site and a
read of the repository are different channels, and this corpus had been treating the first as
though it covered the second. Where a value is still unverified after a site render, the
repository is worth one pass before the item is called blocked.

## Recheck procedure

The order for whoever picks this up next.

1. **Recount the current state**
   ```bash
   cd design-systems/systems
   # English primaries only — the .ko.md twins would double every count — and
   # case-insensitive, or sentence-initial "Unverified" is missed.
   FILES=$(ls *.md | grep -v '\.ko\.md')
   echo "$FILES" | tr '\n' '\0' | xargs -0 grep -ohiE "unverified|미확인" | wc -l          # total
   echo "$FILES" | tr '\n' '\0' | xargs -0 grep -ohiE "~~[^~]*(unverified|미확인)[^~]*~~" | wc -l   # struck
   ```
   The difference is the count of **open unverified items**. Update the "Totals" table in
   this document. The frontmatter figures come from the generated data instead, which cannot
   drift:
   ```bash
   node -e 'const d=require("./design-systems/data/systems.json");
     const U=v=>typeof v==="string"&&/^(unverified|미확인)/i.test(v);
     for (const k of ["a11y_target","figma_kit","license","repo"])
       console.log(k, d.systems.filter(s=>U(s[k])).length)'
   ```

2. **Update the classification by measurement** — open the documentation sites, remeasure
   the HTTP code, redirects and body length, and re-split A/B/C. **Under 900 characters of
   body counts as an SPA, i.e. B-1.** Site states change often (this pass alone turned up
   Gestalt going internal, Paste being retired and audi-ui 404ing).

3. **Order of attack**
   1. **A / the 36 unexplored npm and GitHub items** — they need no network access and the
      `HARVESTING.md` lessons apply directly
   2. **A / the 87 documentation-site items** — from a local session, starting with the
      sitemap's `accessibility` and `figma` paths
   3. **B-2 (6 URL updates)** — fix `url` and `repo` before digging for values
   4. **B-1 (87 browser items)** — headless rendering. Observe the cleanup rule
   5. **B-5 (6 Figma kit items)** — the adjacent-ID probe

4. **Notation on resolution** (unchanged)
   - frontmatter: `unverified` → the actual value. **Do not use strikethrough** — it breaks
     the YAML
   - body: `unverified` → `~~unverified~~ → **actual value (resolved YYYY-MM-DD).**` plus the
     source path
   - the source in the form `npm <package>@<version> → <file path>` or
     `github <org>/<repo> → <file>`
   - update `verified:` to that day's date
   - **If you confirmed an absence, write `null`/`false` and leave the evidence in the body.**
     Leaving it `unverified` sends the next person to the same site again

5. **No speculation, as always.** If you could not confirm it, leave the value empty and
   update only the classification (`SCHEMA.md`, principle 3).

## Related documents

- `HARVESTING.md` — harvest routes and the 15 lessons. **Required reading before starting on
  class A**
- `SCHEMA.md` — frontmatter field definitions and the `null` vs `unverified` distinction
- `freshness.md` — source version freshness (generated by `check-sources.mjs`)
- `index.md` — the system list and harvest depth
