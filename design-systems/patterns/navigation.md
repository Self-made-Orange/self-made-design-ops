<!-- lang-links -->
> **English** · [한국어](navigation.ko.md)
<!-- /lang-links -->

# Navigation

**Comparing the dimensions and structure of sidebars, tabs and breadcrumbs.**

> **Sixteen systems carry evidence** (updated 2026-08-18) — to shadcn/ui ·
> Radix Themes · Mantine · Cloudscape · Apple (toolbars measured) · CarPlay (a count
> limit), **ten were added: Carbon · Vuetify · Ant Design · Chakra UI · PrimeVue · Semi ·
> Naive UI · EUI · Blueprint · Grommet**.
>
> shadcn/ui's `sidebar.tsx` is the single largest piece of evidence in this document — its
> **21KB of source** covers widths, states, keyboard shortcuts and persistence.
>
> The earlier part of this document rests on **the initial six samples**. **The
> re-verification against 16 is in the "re-synthesis across 16 samples" section, and where
> the two disagree that section takes precedence.**
>
> **"Sidebar or top navigation?" and "how many levels of hierarchy?" live only on the
> documentation sites.**

## Sidebar width

| system | expanded | collapsed (icon) | mobile |
|--------|:---:|:---:|:---:|
| **shadcn/ui** | **256px** (16rem) | **48px** (3rem) | **288px** (18rem) |
| **Cloudscape** | unverified | **52px** (`size-side-navigation-collapsed-width`) | — |
| Mantine | injected by prop (`AppShell` `navbar.width`) | — | — |

**The collapsed width is 48px in shadcn/ui and 52px in Cloudscape** — a 4px difference.
Two unrelated systems arrived at nearly the same value.

**In shadcn/ui the mobile width is wider than the desktop's** (288 vs 256px).
On mobile the sidebar opens as a sheet covering the screen, so it takes more room.

**Only Cloudscape's collapsed width does not ride the density axis.**

| token | comfortable | compact |
|------|:---:|:---:|
| `size-side-navigation-item-height` | 28px | **24px** |
| `size-side-navigation-item-collapsed` | 30px | **28px** |
| `size-side-navigation-collapsed-width` | 52px | **52px** (unchanged) |

**The item height shrinks and the width holds** — the same "reduce the vertical, keep the
horizontal" pattern seen in `table.md`.

## Sidebar item height

| system | value |
|--------|-----|
| **shadcn/ui** | **28 / 32 / 48px** (`sm` / `default` / `lg`) |
| **Cloudscape** | **28px** / compact 24px |
| Radix Themes · Mantine | unverified |

**Two meet at 28px** — shadcn/ui's `sm` and Cloudscape's `comfortable`.

The elements inside shadcn/ui's sidebar:

| element | height | type |
|------|:---:|:---:|
| group label | 32 (`h-8`) | 12 (`text-xs`) |
| **menu button `default`** | **32 (`h-8`)** | 14 |
| menu button `sm` | 28 (`h-7`) | 12 |
| menu button `lg` | **48 (`h-12`)** | 14 |
| submenu item | 28 (`h-7`) | 12–14 |
| badge | 20 (`h-5`, `min-w-5`) | 12 |
| skeleton | 32 (`h-8`) | — |
| search input | 32 (`h-8`) | — |

**The menu button's padding is 8px on all sides (`p-2`) and the icon-to-label gap is 8px
(`gap-2`).**
The icon is fixed at 16px (`size-4`).

**In the collapsed state the menu button becomes a square** —
`group-data-[collapsible=icon]:size-8!` (32×32), with an `!important` attached.

**Only `lg` takes its padding to 0 when collapsed**
(`group-data-[collapsible=icon]:p-0!`) — a 48px button equals the 48px collapsed width, so
there is no room for padding.

**The badge is `tabular-nums`** — the digit width is fixed so it does not shift as the count
changes (the same property Mantine uses in tables, `table.md`).

## Sidebar state — persistence and shortcuts

Only shadcn/ui has this.

| item | value |
|------|-----|
| cookie name | `sidebar_state` |
| cookie lifetime | **7 days** (`60*60*24*7`) |
| keyboard shortcut | **`Cmd/Ctrl + B`** |
| side | `side=left` / `side=right` (the border follows) |
| collapse mode | `collapsible=icon` / `offcanvas` |

**The expanded/collapsed state is stored in a cookie.** Server rendering can then draw the
correct state from the first frame, so there is no flash — impossible with `localStorage`.

**`Cmd+B` is hardcoded.** shadcn/ui's sidebar is the only component in the sample that
registers a global keyboard shortcut.

**With `side=right` the border moves to the other side** —
`group-data-[side=left]:border-r group-data-[side=right]:border-l`.
The icon flips too, with `group-data-[side=right]:rotate-180`.

### Padding is added to the collapsed-width computation

```
group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]
group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]
```

**48px + 16px = 64px**, and the layer with a border is **+2px = 66px**.
`--sidebar-width-icon` (48px) is **the content width**; the actual container is 64–66px.

**It uses Tailwind's `--spacing(4)` function syntax** — computing the spacing base × 4
inside a `calc()` (`systems/tailwind.md`).

## Tabs

### Dimensions

| system | list height | item padding | type | weight |
|--------|:---:|:---:|:---:|:---:|
| **shadcn/ui** | **36px** (`h-9`) | 8 / 4 (`px-2 py-1`) | 14 | 500 |
| **Radix Themes** | **32 / 40px** (`--space-6`/`7`) | 8 / 16 (by size) | — | — |
| **Cloudscape** | unverified | vertical 4px / compact 2px | **16px** | **700** |

**Cloudscape's tabs are larger than its body (14px)** — 16px at weight 700.
`font-weight-tabs-disabled` is 700 too — **an inactive tab keeps the same weight.**

**Radix Themes' tab height is a spacing token** (`--space-6` 32 / `--space-7` 40) — the same
method as the button heights being `--space-5`–`8` (`form.md`).

### Radix Themes — it tightens the tracking of the active tab

| token | value |
|------|:---:|
| `--tab-inactive-letter-spacing` | **0em** |
| **`--tab-active-letter-spacing`** | **-0.01em** |
| `--tab-inactive-word-spacing` | 0em |
| `--tab-active-word-spacing` | 0em |

**When the active tab goes bold the letters widen and the tab's width changes.**
Tightening the tracking by -0.01em cancels that increase.

**Radix Themes is the only system in the sample to change tracking by state.**
There are `word-spacing` tokens too, but both values are 0em — **a slot prepared and left
empty.**

**Structural machinery** is confirmed in the component CSS
(`_internal/base-tab-list.css`) as well:

- **A transparent duplicate label**: each tab renders its label twice —
  `TriggerInnerHidden` occupies the width with `visibility: hidden` and **the active (bold)
  type**, and the visible label is laid over it with `position: absolute`.
  If the tracking correction (-0.01em) is a fine adjustment, this is the fundamental
  measure: **reserving the width itself against the bold state.** The two devices are used
  together.
- **Tabs (buttons) and TabNav (links) share the same base CSS** — panel switching and page
  navigation are visually the same tab.
- The active marker is a `::before` 2px bottom bar (`--accent-indicator`), replaced by
  `--accent-12` in high-contrast mode.
- The list is `overflow-x: auto` but **hides its scrollbar**
  (`scrollbar-width: none`) — it scrolls when it overflows, with no indication.

### Active marking — two approaches

| system | method |
|--------|------|
| **shadcn/ui `default`** | a pill background plus `shadow-sm` |
| **shadcn/ui `line`** | **an underline** (`after:h-0.5`, `bottom-[-5px]`) |
| **Radix Themes** | `--tab-inner-border-radius` (the inner element's radius) |
| Cloudscape | `border-radius-tabs-focus-ring: 20px` (only the focus ring confirmed) |

**shadcn/ui keeps both variants in one component** — `variant=default` (pill) /
`variant=line` (underline). In `line` the list radius goes to 0 and the shadow disappears.

**The underline is 2px thick and positioned at `bottom-[-5px]`** — drawn 5px below the tab,
overlapping the list container's boundary line.

**Vertical orientation is supported too.**

| orientation | marker position | size |
|------|-----------|:---:|
| horizontal | `inset-x-0 bottom-[-5px]` | 2px tall |
| **vertical** | **`inset-y-0 -right-1`** | **2px wide** |

It branches on `group-data-[orientation=vertical]/tabs` —
**in vertical tabs the underline becomes a vertical line on the right.**

The transition is an `after:opacity` fade — not a positional animation.

### Radix Themes' `tab-nav.css` — the only difference is the content panel (confirmed 2026-08-18)

`tab-nav.css` (3.3.0) was opened — **it is five lines in total**: an import of
`base-tab-list.css` plus `.rt-TabNavItem { display: flex }`.
`tabs.css` adds only `.rt-TabsContent` (an `outline: 2px var(--focus-8)` on focus) to the
same import. So **the two components' visual specs are 100% shared** and only the role
parts — Tabs switches panels (buttons plus content), TabNav navigates pages (links). The
previous section's "sharing the same base CSS" is now settled from the full source. The
heights (32/40), the tracking correction, the transparent duplicate label and the 2px
indicator are all the business of the single file `_internal/base-tab-list.css`.

### Radix Themes' segmented control — the indicator moves

| token | value |
|------|-----|
| `--segmented-control-transition-duration` | **100ms** |
| `--segmented-control-indicator-background-color` | `--color-background` / `--gray-a3` |
| `--segmented-control-border-radius` | `max(--radius-2, --radius-full)` |

**The indicator slides as a background** (a `transform` transition of 100ms).
There is also `transition: opacity calc(0.8 * var(--segmented-control-transition-duration))`,
so **opacity takes 80ms and the movement 100ms.**

The `max(--radius-2, --radius-full)` pattern is the same as the input field's (`form.md`) —
with `data-radius="full"` it becomes a pill.

## Dropdown-style top navigation — two shadcn/ui components (2026-08-18, main@8a7701e)

The same "horizontal bar plus dropdown", differing in **where the content is drawn**:

| | `navigation-menu.tsx` | `menubar.tsx` |
|---|---|---|
| primitive | Radix NavigationMenu | Radix Menubar |
| trigger | height 36 (`h-9`) · padding 16/8 · 14px medium · a 12px chevron (rotating 180° when open, 300ms) | padding 8/4 (`px-2 py-1`) · 14px medium |
| container | the bar itself has no background (`max-w-max`) | **a 36-tall bordered box** (`h-9 rounded-md border p-1`) |
| dropdown | **one shared viewport** — every menu is drawn in a single panel whose size transitions via `--radix-navigation-menu-viewport-width/height` | an independent popup per menu (`min-w-[12rem]`, `sideOffset=8`) |
| transition | **a horizontal slide** when moving between menus (`from-start/from-end` 52 × 4px) plus a viewport size animation | the standard popup zoom 0.95 plus an 8px directional slide |
| link item | `p-2` plus vertical layout (`flex-col gap-1`) — a title-and-description card | menu item `px-2 py-1.5` plus support for checks, radios and submenus |
| focus ring | 3px on the trigger (`ring-[3px]`) | none (only `focus:bg-accent`) |

- **The shared viewport is navigation-menu's core** — the dropdown is not a per-menu popup
  but a single panel on screen, and moving the trigger does not close it: **the contents
  slide sideways** and the size is interpolated through runtime variables.
  Turning it off with `viewport={false}` demotes it to per-menu popups (the menubar way)
- On mobile (<768px) the content releases to `w-full` and non-absolute layout
  (`md:absolute md:w-auto`) — the source reveals it as a desktop-only pattern
- menubar is a port of the desktop application menu bar — down to a shortcut-notation slot
  (`MenubarShortcut`, `ml-auto text-xs tracking-widest`), checkbox and radio items and
  nested submenus, with item padding to the same spec as the dropdown menu
  (`dropdown-menu`)

## Pagination — shadcn/ui's `pagination.tsx` (2026-08-18)

**A component with no styling of its own** — it assembles button variants:

- The page link is
  `buttonVariants({ variant: isActive ? "outline" : "ghost", size: "icon" })` —
  **outline for the current page only, ghost for the rest.** A 36×36 square
- The active marker is `aria-current="page"` plus `data-active` — the state is
  ARIA-attribute-based
- Previous/Next use `size="default"` plus a 16px chevron, with the label at
  `hidden sm:block` (icon only on mobile)
- The ellipsis (`…`) is a 16px icon in a 36×36 cell, `aria-hidden` plus an `sr-only`
  "More pages"
- The container is a semantic `<nav aria-label="pagination">` plus a `<ul>`, with `gap-1`
  (4px) between items

Because it matches the button scale exactly, there is no dimensional axis of its own —
the `icon` (36) variant of `button.md` becomes the page cell as-is.

## Breadcrumbs

**Only shadcn/ui is confirmed.**

| item | value |
|------|-----|
| item gap | **6px** (`gap-1.5`) → **10px** (`sm:gap-2.5`) |
| type | 14 (`text-sm`) |
| colour | `text-muted-foreground` |
| separator icon | **14px** (`size-3.5`) |
| gap inside a link | 6px (`gap-1.5`) |
| ellipsis (`…`) | **36×36** (`size-9`) |
| wrapping | `flex-wrap` plus `break-words` |

**The gap is tighter on mobile** (6px → 10px). This is the only case in the sample of
splitting breadcrumb spacing by viewport.

**The ellipsis is a 36px square** — the same as the button's `default` height.
Far larger than the text items (14px), securing a touch target.

**There is a `flex-wrap`** — a long path wraps.
The same direction as "do not rely on truncation" in `i18n/README.md`.

Cloudscape has colour tokens only — `color-text-breadcrumb-current` (the current location)
and `color-text-breadcrumb-icon` (the separator). **The current location gets its own
colour.**

## Top navigation — Cloudscape's context override

The `top-navigation` context overrides **182 tokens**.

```
color-background-button-normal-default : { light: #ffffff, dark: #161d26 }
                                       → { light: #161d26, dark: #161d26 }
```

**The `light` value is overwritten with the `dark` value** — the top area renders in the
dark theme even in light mode. The `header` context does the same with 183 tokens.

**Rather than making a "dark variant" of every component, it is absorbed at the token
layer** (the same structure as `compact-table` in `table.md`).

There is a separate `color-text-top-navigation-title`, so the title alone gets an exception
colour.

### The `app-layout-toolbar` context

**There is only one difference** — `color-background-layout-main` goes from
`#ffffff` to `#fcfcfd` (light) and `#161d26` to `#131920` (dark).

**It darkens the main area's background very slightly.** It applies only when a toolbar is
present.

## The layout toggle button — only Cloudscape has tokens

The button that opens and closes sidebars and panels.

| token | light | dark |
|------|-----|-----|
| `color-background-layout-toggle-default` | `#424650` | `#424650` |
| `color-background-layout-toggle-hover` | `#656871` | `#656871` |
| `color-background-layout-toggle-selected-default` | `#006ce0` | `#42b4ff` |
| `color-text-layout-toggle` | `#ffffff` | `#ffffff` |

**The default and hover colours are the same in light and dark.** Only the selected state
parts — **the toggle button is a dark grey regardless of mode.**

## Mantine's AppShell — an offset variable structure

| variable | purpose |
|------|------|
| `--app-shell-header-offset` | pushes the body down by the header height |
| `--app-shell-navbar-offset` | pushes the body across by the sidebar width |
| `--app-shell-aside-offset` | the right-hand panel |
| `--app-shell-footer-offset` | the footer |
| `--app-shell-border-color` | light `gray-3` / dark `dark-4` |
| `--app-shell-transition-duration` | (the transition time) |

**Four directional offsets are kept as variables and switched off with `0rem !important`.**
When a region is absent its offset becomes 0 and the body takes the whole space.

**The width and height values are not in the source** — they are injected by prop.
The same pattern as `--table-vertical-spacing` in `table.md` — **Mantine hands values to
the consumer.**

There is an `--app-shell-transition-duration: 0ms !important`, but the selector under which
it applies could not be confirmed.

## The platform axis — automotive and mobile

| platform | constraint |
|--------|------|
| **CarPlay** | **a Tab Bar of five or fewer** (enforced by the API) |
| Android Automotive | five screens or fewer per task |
| Apple iOS top toolbar | 44pt |
| Apple iOS bottom toolbar | **48pt** |

**In CarPlay the tab count is an API constraint** — six cannot be inserted
(`systems/carplay.md`). Web systems have no notion of a count limit.

**Apple's 44 and 48pt are the touch targets of the buttons inside the toolbar.**
The toolbar container's height is separate, and its values part more widely.

| toolbar container | width | default height | Large Title |
|------|:---:|:---:|:---:|
| Top — iPhone | 402 | **54** | 125 |
| Top — iPad | 820 | **54** | 131 |
| Top — Sheet | 402 | **70** | 136 |
| **Bottom — iPhone** | 402 | **84** | — |
| Bottom — iPad | 500 | **58** | — |

**The iPhone bottom is 1.56× the top** (84 vs 54). On iPad, at 58, it is nearly the same.

**Only the iPad top toolbar has variants by the presence of a tab bar** — eight
`Tab Bar=True/False` variants.
`Title 2 Line Left` is 98 with a tab bar and 54 without — **a 44pt difference.**

The widths of symbol buttons by count are tokenised too (`button.md`).

**The page control (dots) is a per-count symbol too** — 36 variants over 2–8 dots ×
selected position. One dot is 8×8pt, and the container widths are
2 dots 72 · 3 dots 88 · 4 dots 104 · 5 dots 120 · 6 dots 136 · 7 dots 152 · 8 or more 168pt
(**an even 16pt step**).

The segmented control button is 126 × 36pt, in four variants: `Selected` True/False ×
Light/Dark.

## Guidance at the documentation layer — measured (2026-08-18)

The navigation guidance of seven systems (M3 · Atlassian · Spectrum · Polaris · Carbon ·
Cloudscape · GOV.UK) was read directly.

### Sidebar vs top — the majority position is "a division of roles", not "a choice"

- **The division-of-roles camp**: Atlassian (top = actions and utilities / side = product
  structure) · Cloudscape (side = IA / top = utilities and global search — **"do not put
  account, settings and log-out in the side nav; users expect them at the top"**) · Carbon
  (the Header is the top level and the left panel is secondary — with a numeric criterion,
  **"a left panel when there are more than five secondary items or switching is frequent"**)
- **Defined by breakpoint**: M3 — Compact = a bottom bar, Medium = bar or rail by space
  priority, Expanded and up = a rail. **"No navigation bar on desktop"** is explicit.
  Beyond five destinations, a modally expanding rail
- **Mandated**: Polaris — a sidebar in the admin, a header on mobile (no choice)
- **Navigation minimalism**: GOV.UK — top navigation only for repeat use, multiple tasks
  and non-linear journeys. **"For a linear journey, do not use navigation links at all —
  use a task list"** — "simplify the journey first"
- Cloudscape's three-composition criteria table is directly usable in practice: hierarchy +
  utilities = both / no utilities needed = side plus breadcrumbs / a single page = top only

### Hierarchy depth — the stated ceiling is two or three levels

| ceiling | systems |
|------|--------|
| **three levels** | Spectrum ("beyond that the indentation cannot be distinguished — a serious usability problem") |
| **two levels** | Carbon ("the left panel does not support three levels — go to in-page tabs below that") |
| no figure | Atlassian ("keep it minimal; a go back is required when nested") · M3 (a drawer is recommended beyond two levels) · Cloudscape (composition rules only, such as "no sections with two links") · GOV.UK ("navigation is not a sitemap") |

Count limits go separately: M3 bar 3–5 · rail 3–7, Polaris truncates beyond seven with a
View more, Cloudscape's collapsibles are for fewer than ten.
That shadcn/ui's `SidebarMenuSub` has only one level is consistent with Carbon's ceiling.

### Current location — only GOV.UK defines parent highlighting

- **GOV.UK alone defines two states**: `current` (this very page) vs
  `active` (inside this page's **group** — parent/section highlighting). current takes
  precedence, and the implementation is `aria-current` plus `<strong>`
- **M3 says the opposite**: "only one destination is ever active" — two simultaneous
  indicators are forbidden, spelled out as a Do/Don't. The active icon is the filled version
- Cloudscape uses **expansion** instead of highlighting: moving to a page inside a group
  expands that group automatically, and only the active item is bold
- Atlassian, Spectrum, Carbon and Polaris: no rule on parent highlighting (confirmed)

## Re-synthesis across 16 samples — component measurements (2026-08-18)

To resolve the problem of the navigation axis having zero new samples, ten systems that
actually ship sidebars, tabs and breadcrumbs were newly read
(Carbon `@carbon/styles@1.113.0` `ui-shell` · Vuetify `4.1.10` ·
Ant `antd@6.6.1` · Chakra `@chakra-ui/react@3.36.1` ·
PrimeVue `@primeuix/themes@3.0.0` · Semi `@semi-bot/semi-theme-default@1.0.0` ·
Naive UI `2.45.0` · EUI `@elastic/eui@119.0.0` ·
Blueprint `@blueprintjs/core@6.18.0` · Grommet `2.56.0`).
Cloudscape's unverified values were filled in from
`@cloudscape-design/components@3.0.1348`.

### Expanded sidebar width — 200–280px, with 256 the mode

```
280   Cloudscape         (the AppLayout navigationWidth default — resolving the earlier "unverified")
272   Naive UI           (LayoutSider width)
256   shadcn/ui · Carbon (mini-units(32)) · Vuetify   ← three samples agree
240   Semi
200   Ant Design         (Sider width)
none  Grommet (delegated to the Box width) · Mantine (injected by prop)
```

**Three unrelated systems gather at 256px.** The whole range falls within 200–280px, and
**eight samples are confined to an 80px band** — the clearest convergence among the
navigation values held.

### Collapsed (rail) width — 48–60px, with one exception, Ant

```
48   shadcn/ui · Carbon (mini-units(6)) · Naive UI      ← three samples agree
52   Cloudscape (token) / 54 (the AppLayout default)
56   Vuetify (railWidth)
60   Semi
80   Ant Design (Menu collapsedWidth = controlHeightLG × 2)
```

**The earlier edition's "collapsed width is 48–52px" holds, but the ceiling rises** —
48–60px covers seven of eight samples, and **only Ant's 80px departs far**
(32px on each side of a 16px icon).

**In Cloudscape the token (52px) and the component default (54px) differ by 2px.**
Which is the actual rendered value could not be confirmed.

### Sidebar item height — 28–42px

```
24    Cloudscape compact
28    shadcn/ui sm · Cloudscape comfortable
32    Carbon (mini-units(4)) · shadcn/ui default · Vuetify compact
36    Semi · Vuetify comfortable
40    Ant Design (controlHeightLG) · Vuetify default
42    Naive UI (itemHeight)
48    Carbon large · shadcn/ui lg · Vuetify single-line default
derived  PrimeVue (4/10px padding plus the line height)
```

The earlier edition's recommendation (28–32px, 32 by default) is **a dense-console value.**
Across all 16 samples they gather more around **32–40px.** Systems with a density axis
(Cloudscape, Vuetify) come down to 24–32px.

### Level indent — three camps at 16 / 20 / 32

| value | systems |
|:---:|--------|
| **16px** | **Vuetify** (`$list-indent-size`, accumulating per level) · **PrimeVue** (`panelmenu.submenu.indent`) |
| **20px** | **Cloudscape** (`space-l`) |
| **32px** | **Carbon** (`mini-units(4)`) · **Semi** (`item-indent`) · **Naive UI** (`indent`) |

- **Carbon jumps to 72px at the second level when an icon is present**
  (`mini-units(9)`) — the icon column's width is added into the indent.
- **Only Naive UI indents the root differently from the children** (root 24 / children
  32px).
- Semi's third-level text is at 44px.
- **The 32px camp is the largest at three samples**, which is consistent with the earlier
  documentation-layer synthesis of a "two- or three-level ceiling" — three levels at 32px
  each is 96px, more than a third of the sidebar's width.

### Active marking — the underline is the majority, and 2px dominates for thickness

| thickness | systems |
|:---:|--------|
| **1px** | **PrimeVue** (`activeBar.height` — the same thickness as the tab list's bottom border, so only the colour changes) |
| **2px** | **Vuetify · Carbon · Semi · EUI · Chakra · Radix Themes · shadcn/ui (line) · Grommet** |
| **3px** | **Blueprint** (tabs) · **Carbon** (the side navigation's left vertical bar) |
| 4px | EUI in high-contrast mode (2px × 2) |

**2px dominates at eight samples.** The extremes are PrimeVue's 1px and Blueprint's 3px.

**There are four marker positions:**

| method | systems |
|------|--------|
| a bottom underline | PrimeVue · Vuetify · Carbon · Semi · EUI · Blueprint (horizontal) · Chakra (`line`) · shadcn/ui (`line`) · Grommet |
| a pill background | shadcn/ui (`default`) · Chakra (`subtle`, `enclosed`) · Blueprint (**vertical tabs**) · Vuetify (`inset`) |
| **a left vertical bar** | **Carbon's side navigation** (a 3px `::before`) |
| a vertical line on the right | shadcn/ui vertical tabs · Vuetify vertical tabs (both 2px) |

- **Blueprint underlines horizontal tabs and pills vertical ones — it changes the method by
  orientation.** shadcn/ui and Vuetify keep the same method (a line) when the orientation
  changes and only turn the axis.
- **Chakra has the most active-marking variants, at four**
  (`line` · `subtle` · `enclosed` · `outline`).

### The camp that keeps a line of the same thickness on inactive items too

**Carbon** (`$tab-underline-color: 2px solid $border-subtle`) ·
**Semi** (hover 2px `fill-0`, active 2px `fill-1`) ·
**PrimeVue** (a 1px list bottom border = a 1px active bar) make sure
**the line's thickness does not change on becoming active.**

The earlier document covered "tightening the tracking to cancel the width change when the
active tab goes bold" (Radix Themes); **the same problem and the same solution exist on the
line-thickness side too.**

### Tab height — 32–48px, with 36 and 40 the modes

```
30      Blueprint (made from the line height)
32/40   Radix Themes (--space-6/7) · EUI (line-height xl/xxl) · Ant card SM/default
36      shadcn/ui · Chakra sm · Vuetify compact
40      Chakra md (default) · Ant card default · EUI m
44/48   Chakra lg 44 · Vuetify default 48 · Ant card LG 48
ladder  Carbon (inherited from layout.size, 24–80)
derived Semi (16/4/14 padding) · PrimeVue (14/16 padding) · Naive UI (6/10/14 padding)
```

**Carbon's tab has no height of its own and inherits it from the context via
`layout.use('size', …)`** — the same mechanism as the table.

**Semi's tab block padding is asymmetric** (16 above / 14 below) — the 2px below is taken by
the active underline, so this is a correction to centre it visually. The only case in the
sample held of making that correction.

### Gap between tabs — 20–36px

```
20   Blueprint (column-gap)
24   Semi
32   Ant Design (horizontalItemGutter)
36   Naive UI (tabGap*Line / *Bar / *Card, all identical)
 4   Naive UI's card variant alone
```

The card variant's gap drops sharply to 4px (Naive UI) — because the tabs become abutting
cards.

### Indicator movement — three samples implement a slide

| system | duration | method |
|--------|:---:|------|
| **Radix Themes** segmented | **100ms** | a `transform` slide (opacity at 80ms) |
| **Blueprint** tabs | **200ms** | a separate wrapper (`.bp6-tab-indicator-wrapper`) moved by `transform`, interpolating `height` and `width` at once |
| Chakra | unverified | only the `--tabs-indicator-bg` and `-shadow` (`shadows.xs`) tokens confirmed |

**Blueprint can switch the slide off with a `.bp6-no-animation` class** — the place to stop
the indicator flying in on the initial render.

### Breadcrumbs — gaps of 4–10px, with weight parting

```
 4    EUI (size.xs) · Semi
 6→10 shadcn/ui (mobile → desktop)
 8    Carbon (spacing-03) · Ant (marginXS) · PrimeVue · Vuetify (separator 0 8px)
```

- **Only Blueprint sets breadcrumb type larger than the body (14px), at 16px**, with a
  30px container height.
- **Naive UI does not bold the current location** (`fontWeightActive: 400`) — it
  distinguishes by colour alone. The same direction as Cloudscape keeping
  `color-text-breadcrumb-current` as a separate token.
- **Vuetify's breadcrumb has three density steps (`0/-1/-2`)** — the only case in the sample
  held of a density axis on a breadcrumb.

### Two implementations of fixing the top area dark

| method | systems |
|------|--------|
| **a token context override** | **Cloudscape** — the `top-navigation` context overwrites the `light` values of 182 tokens with the `dark` values |
| **colour literals in the component tokens** | **Ant Design** — `siderBg: '#001529'` · `triggerBg: '#002140'` · `headerBg: '#001529'` (bypassing the seed and alias layers) |

**The same aim, opposite implementations.** In Ant the sider is dark even in the light
theme, and using a white sider requires swapping in a separate `lightSiderBg` token.

### Tokenised z-index — now eight systems

> **Correction — "seven systems tokenise z-index" is updated.**
> **EUI** ships nine purpose-named steps in
> `global_styling/variables/levels.js`:
>
> ```
> toast 9000 · modal 8000 · mask 6000 · navigation 6000
> menu 2000 · header 1000 · flyout 1000 · maskBelowHeader 1000 · content 0
> ```
>
> **`toast` sits above `modal`**, and `navigation` shares 6000 with `mask`.
> Keeping `maskBelowHeader` (1000) separate expresses **a mask that does not cover the
> header** as its own level. It is **an eighth arithmetic** after the existing seven
> (Chakra · Bootstrap · Open Props · Forma 36 · Vibes · Solid · Pluralsight), and because
> the ordering still contradicts between systems there is no cross-system recommended value.

### Other single observations

- **Grommet has no sidebar width value** — the only such case among the navigation samples
  held (there is only `gap: 'large'` 48px and `pad: 'small'` 12px; the width is delegated to
  `Box`).
  Only the tab hover colour is stated per mode, as `{dark: 'white', light: 'black'}`.
- **Carbon's side-navigation active marker is a 3px vertical bar on the left** — a fourth
  method alongside the underline, pill and background.
- **Semi's 60px collapsed sidebar width is back-computed from a 36px square logo.**
- **PrimeVue switches navigation item transitions off at `0s`**
  (`navigation.item.transitionDuration`) — the same attitude as in tables.
- **Ant's card tab padding is back-computed from the height** —
  `(cardHeight − fontHeight) / 2 − lineWidth`. It ships as a formula rather than a value.
- **Blueprint's 50px navbar** is a remnant of that system's 10px grid
  (`systems/blueprint.md`).

## Not yet filled in

- ~~Criteria for sidebar vs top / hierarchy depth limits / current-location marking~~ →
  **resolved (2026-08-18)** — the "guidance at the documentation layer" section above
- ~~Cloudscape's expanded sidebar width~~ → **resolved (2026-08-18)** —
  the `AppLayout` `navigationWidth` default of **280px** (the tools panel 290px).
  The collapsed width is 52px by token and 54px by component default — **a 2px
  disagreement**, still unresolved
- **Mantine AppShell's default width and height** — the prop defaults could not be confirmed
- ~~Radix Themes' `tab-nav` component~~ → **resolved (2026-08-18)** — five lines in total,
  its visual spec 100% shared with tabs (`base-tab-list.css`), differing only in role (links
  vs panels).
  See "`tab-nav.css` — the only difference is the content panel" above
- ~~shadcn/ui's `navigation-menu`~~ → **resolved (2026-08-18)** — a single shared viewport
  plus a slide transition between menus. See "dropdown-style top navigation" above
- ~~`menubar`~~ → **resolved (2026-08-18)** — the same section (independent popups per menu,
  a port of the desktop application menu bar)
- **The mobile bottom tab bar** — none of the 16 samples has a bottom tab bar component for
  the web.
  Apple's 48pt bottom toolbar is the only evidence (Vuetify has a `VBottomNavigation`
  component, but its dimensions could not be read)
- **The gap between tabs in Chakra, PrimeVue and Grommet** — could not be confirmed
- **Ant's side menu level indent** — the item height (40px) and collapsed width (80px) were
  confirmed, but the indent value could not be read
- **The z-index scale** — the initial "no system tokenises it" was **wrong**.
  Chakra (13 purpose-named steps, `dropdown` 1000 to `tooltip` 1800 in even hundreds) ·
  Bootstrap · Open Props · Forma 36 · Vibes (freee) · Solid (BuzzFeed) · Pluralsight
  (`layers`, named by region) · **EUI** (`levels.js`, nine purpose names, `toast` 9000 >
  `modal` 8000) all tokenise it — **eight systems, eight arithmetics**. **A dedicated level
  of 1600 for the skip link is shared between Chakra's `skipNav` and Pluralsight's
  `skip-to-content-banner`.**
  The ordering contradicts between systems, though, so there is no cross-system recommended
  value (`systems/chakra-ui.md` · `systems/eui.md`)

## Implementation defaults

**Sidebar width**

```
expanded  256px  (16rem)
collapsed  48px  (icon only) + 16px inline padding = a 64px container
mobile    288px  (opens as a sheet)
```

**Across the 16 samples the expanded width falls entirely within 200–280px, and three
samples (shadcn/ui · Carbon · Vuetify) agree on 256px** (updated 2026-08-18).

**The collapsed width is 48–60px** (ceiling updated 2026-08-18). 48 is the mode at three
samples (shadcn/ui · Carbon · Naive UI), and **only Ant's 80px departs far.** It is decided
by a 16–24px icon plus inline padding.

**Set the mobile width wider than the desktop's.** It becomes a sheet covering the screen,
so there is no reason to narrow it.

**Item height**

```
dense console    28–32px
ordinary         32–40px  (36 by default)
```

**Across the 16 samples they gather more around 32–40px** (updated 2026-08-18) —
Carbon 32 · Semi 36 · Vuetify 40 · Ant 40 · Naive UI 42.
28px is the dense-console value of Cloudscape and shadcn/ui's `sm`, and with a density axis
it comes down to 24px (Cloudscape compact).

**Make the item square in the collapsed state** — setting the width equal to the height
centres the icon.

**Store the state in a cookie.** `localStorage` cannot be read during server rendering, so
the first frame is drawn in the wrong state. shadcn/ui uses a seven-day cookie.

**If you attach a keyboard shortcut, `Cmd/Ctrl+B` is the only precedent in the sample.**

**Level indent — 16–32px per level** (added 2026-08-18).

```
tight    16px  (Vuetify · PrimeVue)
middle   20px  (Cloudscape)
wide     32px  (Carbon · Semi · Naive UI)
```

**Three levels at 32px each is 96px, more than a third of the sidebar's width** — the
numbers line up with the "two- or three-level ceiling" confirmed at the documentation layer
(Spectrum 3 · Carbon 2). If you plan to support three levels or more, choose the 16–20px
side.

**Tabs**

```
list height    36–40px
item padding   inline 8–16 / block 4–8
type           14px / weight 500–600
active marker  a 2px underline  or  a pill background plus a shadow
```

**The underline thickness converges firmly on 2px** — eight of the 16 samples (the extremes
being PrimeVue's 1px and Blueprint's 3px). It is not a value worth agonising over.

**Pick one of the two active-marking methods.** shadcn/ui keeps `default` (pill) and `line`
(underline) in one component — **do not mix them.**

**Consider tightening the tracking when the active tab goes bold** (Radix Themes -0.01em).
A weight change alone alters the tab's width and pushes its neighbours.

**The alternative is to keep the active and inactive weights the same** — Cloudscape sets
both `font-weight-tabs` and `font-weight-tabs-disabled` to 700.

**The same problem exists for line thickness. Keep a line of the same thickness on inactive
tabs too** (added 2026-08-18) — Carbon
(`$tab-underline-color: 2px solid $border-subtle`) · Semi (2px on hover and active) ·
PrimeVue (a 1px list border = a 1px active bar) make it so
**only the colour changes and the thickness does not.** Drawing the line only when active
makes the tab height wobble by 2px.

**If the active marker must support multiple orientations (horizontal/vertical), decide
whether to unify the method.**
Blueprint underlines horizontal tabs and pills vertical ones — **it changes the method
itself.**
shadcn/ui and Vuetify keep the same line and only turn the axis — the latter is predictable.

**If you support vertical tabs, the marker's orientation has to change too** — an underline
horizontally (2px tall) and a vertical line on the right (2px wide).

**Slide the indicator on a segmented control** (100ms `transform`).
Keeping opacity shorter than that (80ms) makes the movement clearer.

**Breadcrumbs**

```
item gap        6px → 10px (mobile → desktop)
separator icon  14px
ellipsis        36×36 (a touch target)
wrapping        allowed (flex-wrap)
```

**Give the current location its own colour** (Cloudscape's
`color-text-breadcrumb-current`).
If the links and the current location share a colour, clickability cannot be told apart.

**Allow wrapping rather than relying on truncation** —
path lengths change greatly across languages (`i18n/README.md`).

**If you fix the top navigation dark, handle it at the token layer.**
Cloudscape's `top-navigation` context overwrites the `light` values of 182 tokens with the
`dark` values — **fewer omissions than making a dark variant of every component.**

**Keep the layout offsets as variables** (Mantine's four `--app-shell-*-offset`).
Setting them to 0 when the header, sidebar or footer is absent lets the body fill the space
automatically.

**If you support automotive or mobile, check the count limits first.**
CarPlay's five tabs are an API constraint — it has to be settled at the design stage.
