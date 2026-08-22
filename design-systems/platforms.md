<!-- lang-links -->
> **English** · [한국어](platforms.ko.md)
<!-- /lang-links -->

# The platform axis

Where `domain` (enterprise · commerce · public sector …) divides systems by **who they are
for**, `platform` divides them by **where they run**.

There is one reason this axis is needed — **different platforms have different token
structures outright.** Values diverge even within one company using one typeface.

## Classification

| Platform | Input | Viewing distance | Samples |
|----------|-------|------------------|:---:|
| `web` | mouse · keyboard · touch | 40–70cm | **95** |
| `mobile` | touch | 25–40cm | 1 |
| **`desktop`** | mouse · keyboard | 50–70cm | **1** |
| `spatial` | gaze · hand gesture | variable (unbounded) | **1** |
| **`wearable`** | touch (small) · crown · **bezel rotation** (Tizen) | 20–30cm | **2** |
| **`tv`** | remote control (focus movement) | **3m** | **2** |
| `automotive` | touch · physical controls · voice | 60–90cm | **2** |

## Why it has to be split — the evidence

### 1. Whether spacing tokens exist splits along platform

| Platform | Spacing scale |
|----------|---------------|
| 30 `web` systems | **27 have one** (Evergreen and Seed Design do not · shadcn/ui inherits) |
| `mobile` (Apple HIG) · `[web, mobile]` (Material 3) | **neither has one** |

**Neither mobile OS tokenises spacing.** On web, 27 of 30 do.

This was first written up as "a trait of mobile operating systems", which **does not
hold** — Evergreen (`web`) and Seed Design (`[web, mobile]`) have no spacing tokens
either. What they share is not a platform but **an implementation approach: putting
spacing directly on the components**.

**There are two kinds of "none".**

| Kind | Systems | Detail |
|------|---------|--------|
| **Does not define them** | Apple HIG · Material 3 · Seed Design · Evergreen | spacing specified directly on components |
| **Inherits them** | **shadcn/ui** | uses Tailwind's `--spacing` as-is |
| **Does not enumerate them** | **Tailwind** | generated from one base by `calc()` multiplication |

**shadcn/ui is not "has no spacing" but "does not redefine it".** The distinction became
necessary when the framework line arrived — where there is a dependency, an absent token
is a consequence of the layering, not a design judgement.

**In practice — do not go looking for a spacing scale in an iOS or Android kit. There
isn't one.**

### 2. Same company, same typeface, different values

Apple's iOS 26 and visionOS both use SF Pro, and the style names match.

| Style | iOS 26 | visionOS |
|-------|:---:|:---:|
| Title 2 | 22 / 28 · tracking **−0.26** | 22 / 28 · tracking **0** |
| Title 3 | **20** / 25 · tracking **−0.45** | **19** / 24 · tracking **0** |
| Default weight | Regular (400) | **Bold (700)** |

**"The Apple design system" must not be treated as one thing.**
visionOS sets tracking to 0 throughout, and Title 3 differs by 1px in size as well.

### 3. The set of states depends on the input method

| Platform | Hover | Notes |
|----------|:---:|-------|
| `web` | yes | mouse |
| `mobile` | no | touch has no hover |
| **`spatial`** | **yes** | **gaze** |
| **`desktop`** | **yes** (confirmed in Menus) | a `Clicked` vocabulary + a combined **`Hover + Key`** state + an **`Active Window`** axis (`systems/macos.md`) |
| **`tv`** | **`Focused` is the primary state** | D-pad movement. Focus feedback specified as **1.1× enlargement** (`systems/android-tv.md`) |

**visionOS has hover with no mouse.** Because you point at a target with your gaze, a
pre-tap stage exists. Porting a component designed for touch alone leaves that state empty.

**On macOS, search has `Focused` as a separate state** — the iOS kit's search has three
states (Placeholder/Typing/Value) while macOS adds **keyboard focus**. State names differ
by platform even within Apple — iOS `Selected`/`Tinted` · visionOS `Hover` · macOS
`Clicked`/`Focused` (`systems/macos.md`).

**Correction — desktop does have hover.** The initial "not enumerated in the kit" came from
looking only at the Toolbars page; the Menus page has `Hover` and **`Hover + Key`** (mouse
and keyboard at once). Beyond that, the **`Active Window` axis** (how things change when the
window is inactive) is a variation dimension that exists only on desktop, which presumes
multiple windows.

### 4. Touch targets split by platform and by position

| | Value |
|---|:---:|
| Material 3 (`mobile`) | a single 48dp |
| Apple iOS top toolbar | 44pt |
| Apple iOS bottom toolbar | 48pt |
| visionOS dropdown | 44pt |
| **Apple macOS controls** | **24pt (Medium) / 36pt (XL)** |

### 5. Desktop is half of mobile's coordinate system

Control heights in the macOS 26 kit (the first `desktop` sample) are **Medium 24 / XL 36**.
That is **45–55% of the dimensions** of the same company's 44/48pt touch targets — a mouse
pointer is more precise than a finger, so half the target suffices. Title bars are 22–32pt
too, less than half the iPhone bar (54–84pt).

By contrast, **the seven Liquid Glass material parameters are exactly the same as iOS's** —
what the platform splits is dimensions and state vocabulary, while the material's physical
values are invariant (`systems/macos.md`).

## How each platform was captured

### `automotive` — filled, and it revealed a different axis

Two systems were harvested: Android Automotive and CarPlay.
**Automotive platforms specify a different *kind* of thing than any other platform.**

### The two automotive platforms split on touch targets

| Platform | Touch target | Spacing between targets | Minimum font |
|----------|:---:|:---:|:---:|
| **Android Automotive** | **64dp** | **24dp** | **24sp** |
| **CarPlay** | 44pt (the general iOS value) | unverified | unverified |

**A factor of 1.45.** Two companies answered the same question differently.
Android Automotive's 64dp is the largest across the 34 samples, and 1.33× mobile's 48dp.

### Three constraints unique to automotive

Kinds of constraint found nowhere in the other 33 systems.

**1. Time constraints**

| Item | Limit |
|------|:---:|
| Button response | within 2 seconds |
| App launch | within 10 seconds |
| Content loading | within 10 seconds |

Elsewhere, time is the province of motion tokens, and "how fast it must be" is not part of
any specification.

**2. A constraint on the number of task steps**

Android Automotive requires a task to complete in **five screens or fewer** (`AC-1`).
It is the only case that counts and caps interaction depth.

**3. A constraint on how many items appear per screen**

| System | How it is enforced |
|--------|--------------------|
| Android Automotive | stated as a requirement (5 map annotations, 3 legend entries) |
| **CarPlay** | **enforced by the template API** (Grid 8, POI 12, Tab 5) |

**CarPlay is template-based, so developers do not compose the layout.**
It is the only system in the corpus that hands over finished screen templates rather than
components to combine.

### The platform blocks UI at runtime

Android Automotive OS **automatically blocks use of unoptimised apps while driving.**
That is an enforced capability, not design guidance. No other platform has the concept.

### Neither system has tokens of its own

Android Automotive inherits from Material 3 and CarPlay from iOS, each **adding only the
vehicle-specific requirements**. Neither distributes tokens.

## The framework line does not divide along the platform axis

All four of Tailwind · shadcn/ui · Mantine · Radix Themes are **`web`**.
They add nothing new to the platform axis.

**What they do instead is disprove things established on this axis.**

| Initial observation | Disproved by |
|---------------------|--------------|
| "runtime scaling is Vapor UI alone" | Mantine · Radix Themes · shadcn/ui use it too (four) |
| "the spacing core `4/8/16/24` has no exceptions" | **Mantine has no 4, 8 or 24** |
| "a high-contrast theme is addable once there is a semantic tier" | the three frameworks with a semantic tier all ship none |

**It was `domain` that split them, not `platform`.** Even with the same runtime
environment, judgements diverge when **the system's purpose** differs (for one's own
product versus as a tool for others).

That is why `domain: framework` was added (`SCHEMA.md`).

### Remaining automotive candidates

From `index.md`: Audi UI (80) · Volkswagen (81) · BMW (82) · Mercedes-Benz (83).
**Tesla OS has no public design system** — screenshots exist, but no tokens or
specifications are published. COVESA (formerly GENIVI) is an industry consortium and has
not been checked yet.

### `wearable` — filled (Wear OS)

Two samples: Google Wear OS (`systems/wear-os.md`) and **Samsung Tizen CircularUI**
(`systems/tizen-circularui.md`). **They answer the same round-screen problem
differently** — Google specifies margins as percentages to avoid clipping, while Samsung
defines the content area as **a square inscribed in the circle**. Input diverges too —
a crown (Apple) versus **bezel rotation** (Samsung). Wear OS's ban on scaling above 20sp
and its Arc curved typography still stand. The watchOS kit is on hold for lack of a public
link.

### `tv` — filled (Android TV)

Two samples: Android TV (`systems/android-tv.md`) and **tvOS** (`systems/tvos.md` — via
the HIG DocC JSON). **Independent convergence is confirmed** — both platforms enumerate
"number shown → width", and their two-column baselines are close (tvOS 860pt vs Android TV
844dp). They quantify different axes and so complement each other: Android TV gives the
1.1× focus enlargement, tvOS the overscan insets (asymmetric 60/80pt) and focus spacing
(60pt centre to centre).

### `desktop` — filled (macOS 26, 12 kit pages measured)

After the Toolbars measurement (evidence 5), **probing adjacent IDs** from three URLs the
user supplied yielded 12 pages — Combo Boxes · Forms · Buttons · Search Fields · Sheets ·
Steppers · Lists and Tables · Tooltips — giving five control steps (16–36) · the
`Active Window` axis · `Hover + Key` · a dissection of the click (Up/Down · Field/Button)
(`systems/macos.md`). Outstanding: the type-scale page (not in the band) and cursor
specifications.

**All seven platform axes are now filled** — web · mobile · desktop · spatial ·
wearable · tv · automotive.

## Harvest priorities (reinforcing cross-comparison)

1. **CarPlay's own numbers** — **now possible, since the HIG DocC JSON channel opened**
   (`developer.apple.com/tutorials/data/design/human-interface-guidelines/*.json` —
   bypassing the JS rendering, `HARVESTING.md`)
2. ~~wearable cross-comparison~~ — **done** (Tizen CircularUI). The watchOS kit has no
   public link — on hold
3. ~~tvOS~~ — **done** (HIG DocC JSON)
4. ~~the remaining macOS kit pages~~ — **done** (12 pages measured, by adjacent-ID probing)

## Frontmatter rule

Add a `platform` field to `systems/*.md`.

```yaml
platform: web        # web | mobile | desktop | spatial | wearable | tv | automotive
```

**Systems supporting several platforms take an array.**

```yaml
platform: [web, mobile]      # Material 3 — web, Android, Flutter
```

Do not confuse it with `domain` — `platform` is the runtime environment, `domain` the
audience. Material 3 is `platform: [web, mobile]` and `domain: os`.
