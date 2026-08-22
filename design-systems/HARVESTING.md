<!-- lang-links -->
> **English** · [한국어](HARVESTING.ko.md)
<!-- /lang-links -->

# How to harvest

A practical document on how this corpus gets filled. **Read it before adding a new
entry.** This environment has network constraints in particular, so simply opening a
documentation site does not work.

> **⚠ The constraints below depend on the environment (confirmed 2026-08-18).** The
> proxy blocking table in this document describes a **container (cloud) session**. In a
> local macOS session, measurement showed that **every domain is open** —
> `carbondesignsystem.com` · `m3.material.io` · `spectrum.adobe.com` ·
> `atlassian.design` · `ui.shadcn.com` · `api.github.com` and the rest. The judgement
> guidance (prose) for the nine pattern axes was harvested during that open window.
> If you need documentation-layer harvesting, do it from a local session. The
> workarounds (DocC JSON · androidx sparse-clone · parsing build output) remain valid
> for container sessions.

## Network constraints in this environment

**Official documentation sites for design systems are blocked at the egress proxy.**
Confirmed cases alone:

| Domain | Status |
|--------|--------|
| `carbondesignsystem.com` | blocked |
| `m3.material.io` | blocked |
| `primer.style` | blocked |
| `polaris.shopify.com` | blocked |
| `github.com` / `raw.githubusercontent.com` | **open** |
| `registry.npmjs.org` (npm) | **open** (on the proxy bypass list) |
| `pypi.org` | **open** (on the proxy bypass list) |
| **`developer.android.com`** | **open** |
| **`developer.apple.com`** | **open** (but the HIG is JS-rendered) |
| **`figma.com` / `api.figma.com`** | **blocked** (though **Figma MCP works over a separate channel**) |

Measuring 25 domains, **only two were open: `developer.apple.com` and
`developer.android.com`.** The rest (`spectrum.adobe.com` · `atlassian.design` ·
`orbit.kiwi` · `eui.elastic.co` · `nordhealth.design` · `seed-design.io` ·
`design.gitlab.com` and so on) are all blocked.

### Scraping tools do not help

Scrapling and Playwright were actually installed and tested. **The block happens before
the request.**

```
curl:      CONNECT tunnel failed, response 403
Chromium:  net::ERR_TUNNEL_CONNECTION_FAILED
```

The proxy refuses the CONNECT tunnel itself, so header spoofing, JS rendering and
anti-bot evasion are all beside the point. **This is not a tool problem; it is a network
allowlist.**

Even on an open domain, browser rendering resets separately —
`developer.apple.com` returns 200 to curl but `ERR_CONNECTION_RESET` in Chromium. So the
Apple HIG (JS-rendered) still cannot be read.

### Three kinds of error tell the causes apart

Opening three hosts in the same Chromium produces different errors.

| Host | Error | Cause |
|------|-------|-------|
| `github.com` | `ERR_CERT_AUTHORITY_INVALID` | Chromium does not trust the proxy CA |
| `developer.apple.com` | `ERR_CONNECTION_RESET` | allowed, but the rendering request is reset |
| `ui.shadcn.com` · `figma.com` | **`ERR_TUNNEL_CONNECTION_FAILED`** | **policy refusal (CONNECT 403)** |

**The third cannot be worked around.** The browser goes through `HTTPS_PROXY` inside the
container, so anything blocked for curl is blocked for Chrome.

**Chrome extensions and Figma plugins are not a way in either.**
`figma.com` is blocked, the browser profile is created fresh on every run so there is no
logged-in session, and Figma plugins run inside the Figma app rather than as browser
extensions. **Figma access works only over the MCP channel** (see the section below).

The first error (the certificate) could be fixed, but there is nothing to gain —
`raw.githubusercontent.com` is already readable with curl and that is enough for source
harvesting.

### Apple's documentation JSON API

`developer.apple.com` exposes framework documentation as JSON.

```
https://developer.apple.com/tutorials/data/documentation/<framework>.json
```

`carplay.json` opens with a 200 (125KB). **But it is framework API documentation, and the
HIG design guidance is not on this path** — the HIG is a separate content system.

In short: **the route that reads documentation and writes it up is blocked, and the route
that reads the token sources is open.**

That turned out to be the better way round. Copying values out of documentation prose
risks typos and stale versions, whereas a token file is the system's actual source and is
therefore accurate. On copyright, token values are factual data and safe to record.

## Route 1 — GitHub source (first choice)

For systems whose tokens are committed to the repository. Polaris and Primer are of this
kind.

1. Check the directory structure first. Guessing filenames and hitting raw URLs only
   produces repeated 404s. Open
   `https://github.com/<org>/<repo>/tree/<branch>/<path>` and look at the file list.
2. Once you find the file, fetch it raw:
   `https://raw.githubusercontent.com/<org>/<repo>/<branch>/<path>`

### Caution: resolving references

Token files often reference other files. You have to follow the reference all the way
down to reach a real value.

Polaris is typical.

```
themes/base/space.ts    space-400: size[400]      ← reference
src/size.ts             '400': '16px'             ← actual value
```

Recording `space-400: size[400]` as-is is useless. **Resolve it to `16px` and write that.**

## Route 2 — published npm packages (second choice)

For systems where **the tokens are build output and are not in the repository**. Carbon
and Fluent are of this kind.

Carbon's `packages/layout/scss/_spacing.scss` only forwards `./generated/spacing`, and the
`generated/` directory is gitignored, so it cannot be seen on GitHub. It is in the
published package.

```bash
npm pack @carbon/layout --silent
tar -xzf carbon-layout-*.tgz
grep -E '^\$' package/scss/generated/_spacing.scss
```

### Confirmed token packages

Packages confirmed to exist on npm. Where **the path is confirmed too**, the file path is
recorded alongside.

| System | Package | Token path |
|--------|---------|------------|
| Carbon | `@carbon/layout`, `@carbon/type`, `@carbon/colors`, **`@carbon/themes`** | `scss/generated/_spacing.scss`, `scss/_scale.scss`, **`scss/_styles.scss`** (34 type styles), **`@carbon/colors` `index.scss`** (247 raw), **`@carbon/themes` `js/generated/themes/*.js`** (235 semantic × 4) + `js/generated/component-tokens/*.js` |
| Fluent 2 | `@fluentui/tokens` | `lib/global/spacings.js`, `lib/global/borderRadius.js` |
| Spectrum | `@adobe/spectrum-tokens` | `src/layout.json` (core), `src/<component>.json`, **`src/typography.json`**, **`src/color-palette.json`** (369 raw) · **`src/semantic-color-palette.json`** (94) · **`src/color-aliases.json`** (170) |
| Spectrum (CSS build) | `@spectrum-css/tokens` | |
| Primer | `@primer/primitives` | `src/tokens/base/size/size.json5`, **`src/tokens/base/typography/typography.json5`**, **`src/tokens/base/color/{light,dark}/*.json5`**, **`dist/css/functional/**/*.css`** (public), **`dist/internalCss/*.css`** (the raw ramps — only here) |
| Polaris | `@shopify/polaris-tokens` | `src/size.ts`, `src/themes/base/*.ts` — **the npm build has no `src/`; `dist/cjs/src/**` corresponds** (`colors.js` · `themes/base/{color,font,text}.js`) |
| Cloudscape | `@cloudscape-design/design-tokens` | `index.scss` (light fallback values) + **`index-visual-refresh.json`** (dark, density and motion axes · 8 colour contexts) |
| Ant Design | `antd` | `lib/theme/themes/seed.js`, `.../genSizeMapToken.js` |
| GOV.UK | `govuk-frontend` | `dist/govuk/settings/_spacing.scss` |
| Backpack | `@skyscanner/bpk-foundations-web` | `tokens/base.raw.json` |
| Canvas | `@workday/canvas-tokens-web` | `css/base/_variables.css` |
| Paste | `@twilio-paste/design-tokens` | `dist/tokens.custom-properties.css` |
| Codex | `@wikimedia/codex-design-tokens` | `theme-wikimedia-ui-mode-*.json` |
| Vapor UI | `@vapor-ui/core` | `dist/components/*.css.ts.vanilla.css` |
| Material 3 | `@material/web` | `md-shape-tokens.css` (**radius only**) |
| Atlassian | `@atlaskit/tokens` | `figma/atlassian-spacing.json` · `figma/atlassian-shape.json` · **`dist/cjs/artifacts/tokens-raw/*.js` (type, colour, motion — see below)** |
| **Tailwind CSS** | **`tailwindcss`** | **`theme.css`** (the whole theme in 459 lines) |
| **Mantine** | **`@mantine/core`** | **`styles.css`** + `styles/<Component>.css` (101 files) |
| **Radix Themes** | **`@radix-ui/themes`** | **`styles.css`** + `src/components/*.css` (54 files) |
| **shadcn/ui** | **not on npm → GitHub** | **`apps/v4/app/globals.css`** · `apps/v4/registry/new-york-v4/ui/*.tsx` |
| Elastic EUI | **`@elastic/eui-theme-common`** | `lib/esm/global_styling/variables/size.d.ts` (**in JSDoc comments**) |
| Nordhealth | **`@nordhealth/tokens`** | `lib/tokens.json` (not `@nordhealth/themes`) |
| HashiCorp | `@hashicorp/design-system-tokens` | `dist/products/css/tokens.css` (**no spacing**) |
| Salesforce | `@salesforce-ux/design-system` | `design-tokens/dist/primitive.raw.json` |
| Base Web | `baseui` | `themes/shared/sizing.js` (**a JS object — scanners miss it**) |
| Gestalt | `gestalt` | `dist/gestalt.css` (tokens shipped inside the component package) |
| Orbit | `@kiwicom/orbit-design-tokens` | `dist/index.js` (**a JS object, `var space = {…}`**) |
| GitLab | `@gitlab/ui` | `src/tokens/build/json/tokens.json` (**`src/scss/tokens.scss` is a shell**) |
| Mozilla | `@mozilla-protocol/core` | `protocol/css/includes/_themes-sass.scss` |
| Segment | `evergreen-ui` → **GitHub `src/`** | `src/themes/default/tokens/*.js` (absent from npm's `esm/`) |
| Seed (Karrot) | `@seed-design/stylesheet` · **`@seed-design/design-token`** | `global.css` · `lib/vars/scale/*.js` |

**Confirmed not to exist:** `@toss/tds`, `@linecorp/design-tokens`, `@daangn/seed-design`,
`@grafana/tokens`, `@segment/evergreen-ui`, `@material-design/tokens`

### Packages whose token path was not found

The following exist on npm but their token files were not located in this pass. A generic
scanner such as `extract.py` sweeping `.json`/`.css`/`.scss` did not surface them.

**There are none.** All 30 candidate packages had their paths pinned down.

The last two followed the same pattern.

- **GitLab Pajamas** — `src/scss/tokens.scss` is a shell importing
  `../tokens/build/css/tokens`, which sent the search the wrong way. The real values are
  in `src/tokens/build/json/tokens.json`. The vendored Bootstrap file was irrelevant.
- **Evergreen** — the npm package's `esm/` holds only components; the tokens are in
  `src/themes/default/tokens/`. They have to be read from GitHub.

### Cases solved and how — this is the important part

| System | Problem | Solution |
|--------|---------|----------|
| Base Web | tokens are a **JS object**, not `.json`/`.css` | open `themes/shared/sizing.js` directly |
| Orbit | same problem | `var space = {…}` in `dist/index.js` |
| Nord | wrong package name | `@nordhealth/themes` → **`@nordhealth/tokens`** |
| Elastic EUI | same, plus values live **only in the type definitions** | the `size.d.ts` JSDoc in `@elastic/eui-theme-common` |
| Seed (Karrot) | the package is split by purpose | both `stylesheet` (values) and `design-token` (references) are needed |
| Salesforce | deep directory | `design-tokens/dist/primitive.raw.json` |
| GitLab | `tokens.scss` is an **import shell** | `src/tokens/build/json/tokens.json` |
| Evergreen | tokens **missing** from the npm build | GitHub `src/themes/default/tokens/` |

**Lessons (15 as of 2026-08-18):**

1. **Generic scanners miss JS-object tokens.** Sweeping only `.json`/`.css`/`.scss` is not
   enough. Open the `.js` files under `themes/` · `tokens/` · `dist/` directly.
2. **Sometimes the values are only in `.d.ts` JSDoc.** Elastic is like this — the runtime
   JS holds only a theme factory, and the real values are written in `@default` annotations.
3. **Do not guess the package name; probe several candidates.** Try every combination of
   `-tokens` · `-theme-common` · `-design-token` · `-stylesheet`.
4. **Do not be fooled by a file containing only `@import`/`@forward`.** Carbon and GitLab
   were the same trap. If `_spacing.scss` or `tokens.scss` opens to a single import line,
   follow that path.
5. **Tokens can be missing from the npm build.** Evergreen is like this — `src/` is
   excluded from the `files` field, so it has to be read from GitHub.
6. **Before writing something off as "path not found", list the files with `find`.**
   Six of 26 candidates were recorded as "not found", and **every one of them was simply
   never opened.**
7. **Do not assume the `figma/` directory has all the values.** Atlassian is like this —
   `figma/atlassian-typography.json` holds only family and weight, with **no sizes or line
   heights.** The real values are in
   `dist/cjs/artifacts/tokens-raw/atlassian-typography.js`. Looking only at the Figma JSON
   and writing "type scale unverified" would be wrong.
8. **Tokens can exist even when the package name says nothing about tokens.**
   `tailwindcss` · `@mantine/core` · `@radix-ui/themes` are like this — each carries the
   whole theme in the main package's `styles.css` / `theme.css`. **Probing only for a
   `-tokens` suffix misses the entire framework line.**
9. **Never call something absent on the strength of a single-name probe — use the search
   API.** `@toss/tds` came back NONE, and "Toss has no npm package" was recorded; searching
   `registry.npmjs.org/-/v1/search?text=toss+tds` returned `@toss/tds-colors` ·
   `-typography` · `-easings` · `-mobile` · `-mobile-ait` — it was **split across
   packages**. The search API is inside the allowlist:
   ```
   curl "https://registry.npmjs.org/-/v1/search?text=<query>&size=12"
   ```
   Internal systems are sometimes published at the moment a mini-app or SDK opens up
   (traces of a move from the old `@toss-design-system/*` scope are visible in the
   packages), so past "absent" verdicts need periodic re-searching.
10. **Some systems are not on npm at all.** shadcn/ui is **distributed as copied source**
   and has no package. The `.tsx` files have to be read directly from
   `raw.githubusercontent.com` — **and they carry more information than tokens do**
   (variants, states, padding and animation are all in the code).
11. **When there is no `src/`, `dist/cjs/` corresponds** (2026-08-18, Polaris).
   `@shopify/polaris-tokens@9.4.2` ships only `dist/` in `files`, but
   **`dist/cjs/src/themes/base/color.js` maps 1:1 to `src/themes/base/color.ts`**. There
   was no need to go out to GitHub as with Evergreen — **it ends inside npm.**
   Note that `require`-ing `themes/index.js` needs `deepmerge`, so read the individual
   `base/*.js` files directly or run `npm i deepmerge` first.
12. **`index.scss` may not carry dark** (2026-08-18, Cloudscape).
   The SCSS holds only the CSS-variable fallbacks (i.e. light); the **dark, density
   (comfortable/compact) and motion (default/disabled) axes are in the same package's
   `index-visual-refresh.json`** as `$value: {light, dark}`. **The 8 colour contexts are
   only in that JSON too.** Looking at the SCSS alone and writing "dark unverified" would
   be wrong.
13. **Lesson 4 again — this time via `@forward`** (2026-08-18, `@carbon/themes`).
   `index.scss` merely `@forward`s `scss/config` · `scss/theme` · `scss/tokens` ·
   `scss/component-tokens`, and **the real values are in `js/generated/themes/*.js`**.
   After `_spacing.scss` (lesson 4), Carbon sets **the same trap a second time**.
14. **Some systems deliberately keep the raw tier out of the published build**
   (2026-08-18, Primer). `dist/css/functional/themes/*.css` contains **zero**
   `--base-color-*`; they exist only in `dist/internalCss/`. Sweeping the public CSS alone
   leads to writing "no raw ramp" — **always look at auxiliary directories such as
   `internalCss`, `docs` and `figma`** (`dist/docs/*.json` is the easiest to parse).
15. **JSON5 cannot be read with the Python standard library.** Primer uses `.json5`.
   Parse it with node after `npm i json5`, or go around it via the build output
   (`dist/docs/*.json` · `dist/css/**`).

### Atlassian — two sets of tokens in the same package

| Location | Contents | Values |
|----------|----------|--------|
| `figma/atlassian-typography.json` | family · **9** weights | **no** sizes or line heights |
| **`dist/cjs/artifacts/tokens-raw/atlassian-typography.js`** | **23** | **sizes and line heights included** |

```bash
node -e "
const m=require('./dist/cjs/artifacts/tokens-raw/atlassian-typography.js');
const arr=m.default||Object.values(m)[0];
arr.forEach(t=>console.log(t.name,'=',JSON.stringify(t.value)));
"
```

There are 14 files under `tokens-raw/` — 12 colour themes plus typography, spacing and
motion. **The 68 motion tokens come out as zero from `figma/atlassian-motion.json`**
(value extraction fails because they are composite objects).

### Probe commands for the framework line

```bash
for p in tailwindcss @mantine/core @radix-ui/themes; do
  npm pack "$p" --silent
done
# tailwindcss → package/theme.css      (the whole theme in one file)
# @mantine/core → package/styles.css   + package/styles/*.css
# @radix-ui/themes → package/styles.css + package/src/components/*.css

# shadcn/ui has no npm package — go straight to GitHub raw
curl -sS https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/app/globals.css
curl -sS https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/button.tsx
```

**`ui.shadcn.com/r/registry.json` is blocked by the proxy with a CONNECT 403.**
The component list was extracted from `apps/v4/registry/__index__.tsx` (1MB).

**Watch for filename collisions when fetching several files with curl.**
Saving `apps/v4/app/globals.css` and `apps/www/styles/globals.css` by `basename` lets the
second (a 404 body) overwrite the first. That actually happened during this work.

### When a package does not carry the whole token set

`@material/web` is Material 3's **web implementation** and contains only shape tokens.
There is no spacing or type scale. A package existing does not mean all the tokens are
there, so **do not guess at missing values — leave them `unverified`.**

## Figma MCP — the page list is incomplete

**MCP is a separate channel that does not go through `HTTPS_PROXY`.** Even with
documentation sites blocked at the proxy, reading Figma variables works (`figma.com` and
`api.figma.com` themselves are blocked for curl and Chrome).

### Confirmed limits

```
get_metadata(fileKey)               → page list: 1 entry, "Cover"
get_metadata(fileKey, "507:25993")  → returns the whole "Toolbars" page ✅
```

**Called without a `nodeId`, it does not enumerate all pages.**
In the iOS 26 kit the list reported one page when at least two
exist, and they read fine when the node ID is supplied directly.

**This is what led to the early-session conclusion that other pages could not be queried.**
It is not a file-structure problem but **an omission in the list API**, with rate limiting
compounding it separately.

**Workarounds attempted (all verified against the macOS kit, 2026-08-17):**

| Attempt | Result |
|---------|--------|
| calling the page list again | still only Cover (reconfirmed) |
| REST API (`api.figma.com/v1/files/...`) | **blocked by the proxy** + no token configured |
| link nodes inside the Cover page | none (just one image) |
| probing sequential page IDs (`207:14502` etc.) | failed — page IDs are not consecutive |
| hyperlinks on the Header instance | they only go **outward** (developer.apple.com) |
| `search_design_system` | searches only libraries the file subscribes to — not the kit itself |

**First conclusion: there is no page-enumeration API. However —**

### Probing adjacent IDs does work (settled 2026-08-17)

When the user supplied three page URLs, the pattern showed: **page IDs are odd numbers in
the same band** (`207:14475` · `14481` · `14495` …). Probing the odd numbers within the
band **discovered 7 pages unaided** (Combo Boxes 14473 · Forms 14477 · Buttons 14487 ·
Search Fields 14491 · Sheets 14493 · Steppers 14497 · Lists and Tables 14499 ·
Tooltips 14503). IDs that do not exist return a clear not-found error, so they are easy to
tell apart.

**Procedure: as soon as you have even one page URL, probe the odd numbers around that ID
within ±30.** Pages in the same file tend to be created in one session and share an ID
band (not always — this file's Cover is 131:8996, in a different band).

What the Header links did yield instead: **the HIG DocC JSON channel** (see below).

### Procedure

1. `get_metadata(fileKey)` — do not believe the pages it returns are all of them
2. Try the `node-id` from a URL the user gave you first
3. Collect child node IDs from the returned XML and pick out the frames of interest
4. Read variables with `get_variable_defs(fileKey, nodeId)` — it returns **only the
   variables that node actually uses**, not a full variable dump
5. For type and colour you have to find and point at **a frame that uses the style in
   question**

### The shape of variable values

```
"Headline/Regular": "Font(family: \"SF Pro\", style: Semibold, size: 17,
                     weight: 590, lineHeight: 22, letterSpacing: -0.43)"
"Liquid Glass/Refraction": "100"
"Fills/Secondary": "#78788029"
```

**Typography comes as a composite `Font(...)` string** — the same structure as
Atlassian's CSS `font` shorthand. **Eight-digit hex (with alpha) comes through as-is**
(`#78788029`).

### Do not mistake the kit's own variables for product tokens

```
"Component Fill": "#f5f5f5"
"Component Stroke": "#6155f5"
```

**Both are for the kit's annotations and frame markers**, not iOS design tokens. That
purple (`#6155f5`) is not in Apple's palette.

### Check which kits are reachable with `get_libraries` first

Called against any one file, it returns **every community and organisation library that
account could add**, along with library keys. The list comes back independent of the file.

The list confirmed while working on this repository:

| Library | Platform axis | Corpus status |
|---------|---------------|---------------|
| **macOS 26 / macOS 27** | **`desktop`** | **0 samples** |
| **watchOS 26** | **`wearable`** | **0 samples** |
| visionOS 26 | `spatial` | harvested |
| iOS and iPadOS 26 | `mobile` | harvested |
| **iOS and iPadOS 27** | `mobile` | **newer than the corpus** |
| Material 3 Design Kit | — | harvested |
| **Simple Design System** (Figma's own) | `web` | **not harvested** |

`tvOS` is not on the list.

### A library key alone is not enough to read assets

```
search_design_system(includeLibraryKeys: [the macOS 26 key])  → { variables: [], styles: [] }
```

**In the "available to add" state (`libraries_available_to_add`), search comes back empty.**
It has to be in `libraries_added_to_file` to be searchable.

**So reading a kit requires a file** — duplicate it from the community and get a
`/design/<fileKey>/...` URL.

### `search_design_system` searches the account's libraries, not the file you queried

Searching `button` with the Material 3 kit's fileKey returned **the user's team product
libraries** — two of them, named for products that are not this repository's business. The `fileKey` is
context only, not the search scope.

### Do not record a duplicated kit's `fileKey`

A community kit read this way is **your duplicate**, not the community original, and its
`fileKey` points into your own account. That is not a credential — opening the file still
needs permission — but Figma's oEmbed endpoint answers **without authentication**:

```
GET https://www.figma.com/api/oembed?url=https://www.figma.com/design/<fileKey>/x
→ {"title":"macOS 26 (Community)","folder_name":"<your team folder>","thumbnail_url":…}
```

So a key pasted into a public `source:` field hands out the file's title, its thumbnail, and
**the name of the team folder it sits in**. Two Apple kit keys were recorded here that way and
were removed on 2026-08-22; the entries now name the community file and say the duplicate's
key is withheld. Vendor kits linked from a system's own documentation site (LeafyGreen,
Pluralsight, NYSDS) are a different case — those URLs are published by the vendor and stay.

> **⚠ Scope rule.** **Product libraries surfaced this way are not harvested into this
> repository.** This repository holds shared assets only; product-specific data belongs in
> that product's own repository (the principle in `README.md`). Nothing is copied over,
> component names and dimensions included.

### Check the plan's harvest depth

Check with `whoami` first — rate limits and available tools split along harvest depth.
`list_file_components_for_code_connect` requires Enterprise.

## Route 3 — reconstructing algorithmic scales

Some systems define a scale **as a function rather than a list of values**. In that case
you have to actually run the function to get the values. Working it out by eye gets it
wrong.

Carbon's type scale is like this (`_scale.scss` in `@carbon/type`).

```scss
@function get-type-size($step) {
  @if $step == 1 { @return 12px; }
  @return get-type-size($step - 1) + (math.floor(($step - 2) * 0.25) + 1) * 2;
}
```

```python
v = [0] * 24
v[1] = 12
for n in range(2, 24):
    v[n] = v[n-1] + ((n - 2) // 4 + 1) * 2
```

→ `12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92, 102, 112, 122, 132, 144, 156`

Values reconstructed this way **must be noted in the entry as reconstructed**, because the
range the documentation officially supports and the range the function generates can
differ (Carbon documents 12–92px; the function generates up to 156px).

## Recording rules

- **Resolve references all the way.** `16px`, not `size[400]`.
- **Leave what you could not confirm empty.** Mark it `unverified`. Filling in a plausible
  value makes the whole corpus untrustworthy.
- **Record the source path.** Writing down which package and which file it came from is
  what lets the next person re-verify it.
- **Record the version.** If it came from npm, write the package version alongside.

## Still unsolved

- **Information that exists only on documentation sites** — component usage guidance,
  design rationale and accessibility prose are not in token files. They cannot be harvested
  on the current routes. Either the documentation domains have to be added to the proxy
  allowlist, or they have to be harvested separately from an environment with open network
  access.
- **Systems that do not publish tokens** — cases like the Apple HIG, with documentation but
  no token distribution. `index.md` should mark the harvest difficulty of such entries
  separately.


## Discovery channel — Apple HIG DocC JSON (2026-08-17)

**The note that the HIG cannot be scraped because it is JS-rendered is no longer true.**
The documentation pages' data backend passes through the proxy:

```
https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json
```

- Path rule: a HIG URL's `/design/human-interface-guidelines/sidebars` →
  `/tutorials/data/design/human-interface-guidelines/sidebars.json`
  (`/tutorials/data/documentation/...` 404s — without `documentation`)
- Contents: the full body text in the `primaryContentSections` tree (recursively flatten
  text/heading/codeVoice nodes)
- Yield: a 24pt menu bar · a 1280×720pt default window · sidebar and menu judgement
  guidance (added to `systems/macos.md`). **CarPlay's own numbers are now harvestable
  through this channel too**
- The flattening snippet is in the session scratchpad (a recursive flatten branching on
  each dict's type)

## Discovery channel — developer.android.com design guides (2026-08-17)

The `developer.android.com/design/ui/{wear,tv}` family passes through the proxy and is
**server-rendered HTML**, so it scrapes directly (extract `<article>`, strip tags).

- Wear OS: the `guides/get-started` page carries the whole guide index (92 links).
  `styles/typography/type-scale-tokens` and `foundations/adaptive-design` are the densest
  in numbers
- Android TV: 9 links on the hub — `components/cards` (widths by count) and
  `components/buttons` (focus specifications)
- Yield: `systems/wear-os.md` · `systems/android-tv.md` (completing the seven platform axes)
- An older generation of the guides coexists under `m2-5/` — keep current and legacy URLs
  apart

## Discovery channel — androidx sparse-clone (M3 generated token code, 2026-08-17)

`m3.material.io` is blocked, but **the generator code for M3's component and motion tokens
is in the androidx repository** — closer to the source than the documentation site is.

```
git clone --depth 1 --filter=blob:none --sparse https://github.com/androidx/androidx.git
cd androidx
git sparse-checkout set compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens
```

- It is an enormous repository, so **`--filter=blob:none --sparse` is essential** — with
  that combination it finishes in seconds
- The `tokens/` directory holds many per-component token files (`*Tokens.kt`, marked
  `// GENERATED CODE` plus a `// VERSION: v0_103`-style version)
- Yield: `MotionTokens.kt` (10 easings · 16 duration tokens),
  `ExpressiveMotionTokens.kt` and `StandardMotionTokens.kt` (spring sets)
  → `patterns/motion.md` · `systems/material-3.md`
- The clone route works even when raw.githubusercontent returns 429 (reconfirming an
  existing rule)

## Discovery channel — Gatsby page-data JSON (documentation-layer samples, 2026-08-18)

Even a system with no token distribution **exposes its entire content as structured JSON
if its documentation site runs on Gatsby**:

```
https://<site>/page-data/<page path>/page-data.json
```

- First applied for real on LINE (designsystem.line.me) —
  `pageContext.standaloneComponents` held the whole colour palette, ~170 hexes, as raw data
  (data, not images). → the corpus's first **documentation-layer sample**
  (`systems/line.md`)
- **A 403 may signal a slug variant rather than closure** — for LINE's LDSM the default
  slug (`-en`) is internal and 403s, while **the `-ex-en` (external) suffix is the public
  edition**. Finding the slug pattern via the Wayback CDX gets you through.
- Documentation-layer samples require a licence check — LINE is view-only, so **only the
  factual record of values and the source** are included (no redistribution of the text or
  images).

## Discovery channel — parsing CSS-in-JS build output (2026-08-17)

The styled-components, Griffel and Compiled families **leave their values in the npm dist
too** — grep the build output rather than the source.

| System | Package | Where the values are |
|--------|---------|----------------------|
| Fluent 2 | `@fluentui/react-button` | `lib/**/*.styles.js` — Griffel's serialised strings (`".f…{min-width:96px;}"`) |
| Atlassian | `@atlaskit/button` | `dist/cjs/**` — the old button uses a JS expression (`32/14 + "em"`), the new one `*.compiled.css` |
| Orbit | `@kiwicom/orbit-design-tokens` | `dist/index.js` — follow the reference chain two levels (`formBox* → size.*`) |
| Garden | `@zendeskgarden/css-buttons` | classic CSS lines are shipped separately — no need to work around CSS-in-JS at all |

- Write the regex assuming serialised strings: catch **inside the quotes**, e.g.
  `"[^"]*min-width[^"]*"`
- Expression values (`32/14`) usually have a comment next to them (`// 32px`) — capture the
  comment too
- With this, all 20 of the `full` harvest were deepened to the component layer (2026-08-17)
