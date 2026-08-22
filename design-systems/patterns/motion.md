<!-- lang-links -->
> **English** · [한국어](motion.ko.md)
<!-- /lang-links -->

# Motion

**Motion measurements are held for 83 systems** (re-synthesised 2026-08-18) —
**73 at the component deep-pass layer** plus **10 obtained only at the token or
documentation layer** (Atlassian · Cloudscape · Tailwind · Material 3 · Radix Themes ·
Mantine · shadcn/ui · Apple (confirmed to have no figures) · TDS · Open Props).

The individual values are in the "components in depth" section of each `systems/*.md`; this
document carries **only the distribution and the cross-system conclusions**.
The tables below were written from an initial sample of 34 (of which nine held motion tokens
— Atlassian · Cloudscape · Canvas · Codex · Orbit · Nord · Backpack · Tailwind ·
Material Web), and the re-verification against the 83 is in the "re-synthesis across 83
samples" section — **where the two disagree, the re-synthesis takes precedence.**

> In Radix Themes, Mantine and shadcn/ui the values are **driven directly into component CSS
> and classes.**
>
> This document was **written without the documentation sites.** The durations, easings and
> keyframes are all values from token files and component source.
> Guidance such as "when should you add animation?" was resolved in the "guidance" section.
>
> **The preface's verdict that "motion is the least tokenised axis" is overturned across the
> 83 samples** — see the first item of the re-synthesis section.

## Depth of tokenisation — it parts into five levels

| depth | systems | contents |
|:---:|--------|------|
| **0. none** | Radix Themes · Mantine · shadcn/ui · Apple · Material 3 (Figma) | literals in CSS and classes |
| **1. duration only** | **Orbit · Backpack · Nord** | three steps |
| **2. duration + easing** | **Canvas · Tailwind** | separate families |
| **3. + keyframes + properties** | **Codex · Cloudscape** | down to the list of transitioned properties |
| **4. per-component composite tokens** | **Atlassian** | 68 tokens. duration + curve + keyframes + delay + fill |

**Level 0 is the largest in the sample.** All three framework-family systems are here —
**motion is the least tokenised axis.**

## Duration

### Step counts and values

| system | steps | values |
|--------|:---:|-----|
| **Canvas** | **20** | 50 · 100 · 150 … 1000ms (**an even 50ms step**) |
| **Atlassian** | **8** | 0 · 50 · 100 · 150 · 200 · 250 · 400 · 600ms |
| **Cloudscape** | **6** | 115 · 165 · 250ms plus three per component |
| Codex (transitions) | 2 | 100 · 250ms |
| Codex (animations) | 3 | 1000 · 1600 · 2000ms |
| **Orbit** | 3 | 150 · 300 · 400ms |
| **Backpack** | 3 | 50 · 200 · 400ms |
| **Nord** | 3 | 50 · 200 · 400ms |
| Tailwind | 1 | 150ms (`--default-transition-duration`) |

**Backpack and Nord are exactly the same** — 50 / 200 / 400ms.
Unrelated systems (flight search / healthcare), and their three steps coincide.

**Canvas overwhelms at 20 steps.** It fills up to 1000ms in even 50ms increments — the same
disposition as keeping spacing dense in 2px units (`tokens/scales.md`).

### The short end — clustering at 50–150ms

| value | systems |
|:---:|--------|
| **0ms** | **Atlassian** (`instant`) · **Cloudscape** (its whole `disabled` mode) |
| 50ms | Atlassian (`xxshort`) · Canvas · Backpack (`xs`) · Nord (`quickly`) |
| 100ms | Atlassian (`xshort`) · Canvas · **Codex** (`transition-duration-base`) |
| **115ms** | **Cloudscape** (`responsive`) |
| 150ms | Atlassian (`short`) · Canvas · **Tailwind** (its default) · Orbit (`fast`) |
| **165ms** | **Cloudscape** (`expressive`) |

**Only Cloudscape uses values that are not multiples of 5** — 115ms and 165ms.
Everything else is a multiple of 50ms.

**Only Atlassian and Cloudscape keep a `0ms` token.**
Atlassian's is `motion.duration.instant`; Cloudscape's is an entire accessibility mode (see
below).

### The long end — the purpose parts

| value | systems | purpose |
|:---:|--------|------|
| 400ms | Atlassian (`xlong`) · Orbit (`slow`) · Backpack (`base`) · **Nord** (`mobile`) | |
| 600ms | Atlassian (`xxlong`) | |
| **1000–2000ms** | **Codex** | **looping animation** (spinners) |
| **1200ms** | Cloudscape | the avatar loading dots |
| **3600ms** | **Cloudscape** | **the AI avatar gradient** |

**Codex's and Cloudscape's long values are for looping animation, not transitions.**
Codex keeps `animation-duration-*` (1000–2000ms) as **a separate family** from
`transition-duration-*` (100 and 250ms) — it does not mix the two concepts.

**Cloudscape's 3600ms is the sample maximum**, dedicated to the AI avatar gradient.

### Nord — `mobile` is a separate value

| token | value |
|------|-----|
| `n_transition_quickly` | `0.05s ease` |
| `n_transition_slowly` | `0.2s ease` |
| **`n_transition_mobile`** | **`0.4s ease`** |

**The mobile transition is twice the desktop's (`slowly` 0.2s).**
Nord is the only system in the sample to split duration by platform.

**The easing is included in the value** (`0.2s ease`) — duration and easing are not
separated.
The opposite of Atlassian keeping `duration` and `curve` as separate tokens.

## Easing

### Counts and naming schemes

| system | count | naming |
|--------|:---:|------|
| **Canvas** | **6** (+ 6 raw) | **purpose × character** (`quick`/`purposeful` × `standard`/`acceleration`/`deceleration`) |
| **Atlassian** | **5** | direction × strength (`in`/`out`/`inout` × `practical`/`bold`) + `spring` |
| **Cloudscape** | **5** | **expression** (`responsive` · `sticky` · `expressive` plus two per component) |
| Tailwind | 3 | the CSS standard (`in` · `out` · `in-out`) |
| **Codex** | 2 | **agency** (`system` · `user`) |
| Nord · Orbit · Backpack | 0 | an `ease` literal or nothing (Backpack settled as literal `ease-in-out` in the main line — 2026-08-18, `systems/backpack.md`. Orbit's absence settled too — a single convergence on Tailwind's default `ease-in-out`, 2026-08-18, `systems/orbit.md`) |

### Canvas — two families × three characters

| | standard | acceleration | deceleration |
|---|---|---|---|
| **quick** | `cubic-bezier(0.2, 0, 0.2, 1)` | `cubic-bezier(0.4, 0, 0.95, 0.8)` | `cubic-bezier(0.05, 0.4, 0.3, 1)` |
| **purposeful** | `cubic-bezier(0.35, 0, 0.05, 1)` | `cubic-bezier(0.4, 0, 0.8, 0.3)` | `cubic-bezier(0, 0.4, 0.2, 1)` |

**The raw tokens (`base-easing-a-*` / `b-*`) are separate from the semantic ones
(`sys-motion-easing-*`).**
The `a` family is `quick` and the `b` family `purposeful` —
the same structure as colour's two layers of `scale/` plus `semantic/`.

**Canvas is the only system in the sample with a semantic layer over its easings.**

### Atlassian — direction × strength

| token | value |
|------|-----|
| `motion.easing.in.practical` | `cubic-bezier(0.6, 0, 0.8, 0.6)` |
| `motion.easing.out.practical` | `cubic-bezier(0.4, 1, 0.6, 1)` |
| `motion.easing.inout.bold` | `cubic-bezier(0.4, 0, 0, 1)` |
| `motion.easing.out.bold` | `cubic-bezier(0, 0.4, 0, 1)` |
| **`motion.easing.spring`** | **a `linear()` with 65 stops** |

**The combination is incomplete.** There is no `in.bold` or `inout.practical` —
not 3 directions × 2 strengths = 6, but only 4.
**Only the combinations actually used are tokenised.**

#### It approximates `spring` with `linear()`

```css
motion.easing.spring = linear(
  0, 0.021, 0.058, 0.107, 0.164, 0.227, 0.292, 0.359, 0.425, 0.49,
  … , 1.024, 1.024, 1.024, 1.024, 1.023, … , 0.999, 0.999, 1
)
```

**Sixty-five stops.** They hold an overshoot that `cubic-bezier()` cannot express.

| segment | value |
|------|-----|
| maximum overshoot | **1.024** (around the 24th stop, held for four in a row) |
| undershoot | **0.999** (the last four stops) |
| end | 1 |

**It overshoots by 2.4%, undershoots by 0.1% and finishes.**

It is used in **exactly one place**, `motion.avatar.hovered` (250ms, `transform`).
Sixty-five stops were defined for a single token.

#### Expressing a spring — three approaches in the sample

> This was first recorded as "the `linear()` spring is Atlassian's alone", but with the
> arrival of Open Props (five steps) and TDS (physical parameters) it became **three
> approaches**.

| approach | systems | character |
|------|--------|------|
| a `linear()` of 65 stops × 1 | Atlassian | one curve pre-computed and fixed into CSS |
| a multi-stop `linear()` × 5 steps (`--ease-spring-1~5`) | Open Props | likewise, in five strengths |
| **eight physical-parameter presets** (`stiffness`/`damping`/`mass`) | **TDS (Toss)** | **computed at runtime** — a `getSpringEasing` function ships with it |

TDS keeps presets from `basic {200/30}` to `rapid {1000/55}` and `bounce {300/15}`,
**stiffness 70–1000 and damping 15–55** (`systems/toss-tds.md`).
The CSS camp (Atlassian, Open Props) **pre-computes and fossilises the curve**, and the JS
camp (TDS) **ships the physics and resolves it at runtime** — the same spring, distributed
at different layers.

#### The bezier overshoot ranking

| system | curve | overshoot |
|--------|------|:---:|
| **Spindle** | `ease-out-bounce (0.55, 2.05, 0.65, 0.75)` | **y2 = 2.05** |
| TDS | `back (0.34, 1.56, 0.64, 1)` | y2 = 1.56 |
| Atlassian | the `spring` linear()'s maximum | 1.024 |

**Spindle's (Ameba's) 2.05 is the sample maximum.** Atlassian approximates a spring
precisely and stops at a 2.4% overshoot, while the bezier camp floats the control point far
out to make elasticity.
Spindle lays **View Transitions API page-transition tokens** (unique in the sample) on top
of that — `systems/spindle.md`.

### Cloudscape — it names by expression

| token | value | `$description` (included in the package) |
|------|-----|------|
| `motion-easing-responsive` | `cubic-bezier(0, 0, 0, 1)` | "visual feedback that is responsive yet smooth" |
| `motion-easing-sticky` | `cubic-bezier(1, 0, 0.83, 1)` | "for sticking an element to a particular state" |
| `motion-easing-expressive` | `cubic-bezier(0.84, 0, 0.16, 1)` | "expressively drawing attention" |

**`sticky`'s `cubic-bezier(1, 0, 0.83, 1)` starts extremely slowly** (x1 = 1).
`responsive`'s `cubic-bezier(0, 0, 0, 1)` starts extremely fast (x1 = 0).
**The two are exact opposites.**

**Cloudscape attaches a `$description` to every token.** Only Cloudscape and Pajamas include
token descriptions in the package.

### Codex — it divides by agency

| token | value |
|------|-----|
| `transition-timing-function-system` | `ease` |
| `transition-timing-function-user` | **`ease-out`** |

**Motion the system initiated and motion the user initiated get different easings.**
A response to user input is `ease-out` (starting fast); an automatic system change is `ease`.

**Codex is the only system in the sample to make agency an axis of motion.**

## Systems that tokenise the transitioned properties — two

The very list of CSS properties to animate is kept as a token.

### Codex

| token | properties |
|------|------|
| `transition-property-base` | `background-color, color, border-color, box-shadow` |
| `transition-property-fade` | `opacity` |
| `transition-property-icon` | `color` |
| `transition-property-icon-css-only` | `background-color` |
| **`transition-property-toast`** | **`opacity, transform`** |
| **`transition-property-toggle-switch-grip`** | **`background-color, border-color, transform`** |

**The property lists are tokens per component.** `toast` and `toggle-switch-grip` are in the
names.

### Atlassian — the `properties` field of a composite token

```js
motion.listitem.hovered = {
  duration: 50, curve: '…out.practical',
  properties: ['background-color','border-color','color','text-decoration-color'],
}
motion.button.hovered = {
  duration: 150, curve: '…out.practical',
  properties: ['background-color','border-color'],
}
```

**Both are structures for avoiding `transition: all`.**
`all` animates layout properties too and creates performance problems.

**shadcn/ui makes the same judgement in classes** — `transition-[color,box-shadow]`.
Not a token, but the properties are stated. Only the Button uses `transition-all`.

| system | method |
|--------|------|
| Codex | the property list is a **token** |
| Atlassian | a **field** of a composite token |
| shadcn/ui | a Tailwind **class** (`transition-[color,box-shadow]`) |
| Mantine | `transition-property` in the component CSS |

## Keyframes — three systems tokenise them

| system | count | naming |
|--------|:---:|------|
| **Atlassian** | **16** | **the value is in the name** (`ScaleIn80to100`) |
| Cloudscape | 4 | a hash suffix (`awsui-fade-in-35003c`) |
| Tailwind | 4 | the standard animations (`spin` · `ping` · `pulse` · `bounce`) |

### Atlassian — the value is in the name

| family | token name → CSS keyframe |
|------|------|
| fade | `fade.in` → **`FadeIn0to100`** |
| scale (medium) | `scale.in.medium` → **`ScaleIn80to100`** |
| scale (small) | `scale.in.small` → **`ScaleIn95to100`** |
| slide (short) | `slide.in.top.short` → **`SlideInTop8px`** |
| slide (half) | `slide.in.left.half` → **`SlideIn50PercentLeft`** |

**The token names are abstract (`small`/`medium`/`short`/`half`) and the CSS keyframe names
concrete (`95to100`/`8px`/`50Percent`).**
The two layers are separate, so the token name survives a change of value.

#### Entry and exit travel different distances

| direction | keyframe | travel |
|------|----------|:---:|
| entry | `SlideIn50PercentLeft` | **50%** |
| exit | `SlideOut15PercentLeft` | **15%** |

**It comes in from further away.** It leaves with a short movement.
The token name `slide.out.left.half` actually points at 15% —
**the one place where the name (`half`) and the value (15%) disagree.**

#### Six keyframes are used without tokens

Referenced by component tokens but having no `motion.keyframe.*` token:

```
ScaleXIn80to100 · ScaleXOut100to0            (label-only, the X axis alone)
SlideIn100PercentLeft / Right                (panel · sidenav)
SlideOut100PercentLeft / Right
```

**`ScaleXOut100to0` shrinks the X axis to 0** — it disappears completely.
Different from `ScaleOut100to80` (which stops at 80). It is the label (tag chip) folding
horizontally.

**The 100% slide is not a token.** It is the full-width movement of the panel and side
navigation, yet only `slide.*.half` (50%) and `slide.*.short` (8px) are tokens; 100% is not.

### Cloudscape — the keyframe bodies measured (2026-08-18)

The bodies of the four `motion-keyframes-*` were obtained from
`@cloudscape-design/components@3.0.1348`'s
`internal/base-component/styles.scoped.css` (where the hash-suffixed names in the token
values are defined):

| keyframe | body |
|----------|------|
| `awsui-fade-in` | `opacity 0 → 1` |
| `awsui-fade-out` | `opacity 1 → 0` |
| `awsui-scale-popup` | `scale 0.95 → 1` |
| **`awsui-status-icon-error`** | **`translateX -5px → +5px → 0`** (a shake) |

- **scale-popup's 0.95 matches the sample's majority value** — the same as Atlassian's
  `ScaleIn95to100` and shadcn/ui's `zoom-in-95`.
  The two fades are generic and unremarkable
- **Only status-icon-error is composite** — a single side-to-side shake as the error icon
  appears, and **the easing differs by segment**: the first half (−5→+5) is `linear` and the
  second (+5→0) returns on `--motion-easing-refresh-only-a`
  (`cubic-bezier(0,0,0,1)`, a sharp deceleration). The only sample that changes
  `animation-timing-function` inside a keyframe

## Per-component motion — only Atlassian has it

**Thirty-nine component tokens** (of the 68) are defined as composite objects.

```js
motion.modal.enter = {
  duration: 250,
  curve: 'cubic-bezier(0.4, 0, 0, 1)',      // inout.bold
  keyframes: ['ScaleIn95to100'],
  fill: 'backwards',
}
```

The eleven components covered: `avatar` · `blanket` · `button` · `flag` · `label` ·
`listitem` · `modal` · `panel` · `popup` · `sidenav` · `spotlight`.

### Entry against exit — exit is shorter

| component | entry | exit | difference |
|----------|:---:|:---:|:---:|
| `avatar` | 150 | 100 | -50 |
| `blanket` | 250 | 200 | -50 |
| `flag` | 250 | 200 | -50 |
| `label` | 150 | 100 | -50 |
| `modal` | 250 | 200 | -50 |
| `panel` | 250 | 200 | -50 |
| `popup` | 150 | 100 | -50 |
| `sidenav` | 250 | 200 | -50 |
| `spotlight` | 250 | 200 | -50 |
| **`panel.content`** | **150** (+ a 100 delay) | **50** | **-100** |

**Nine of the ten pairs differ by exactly 50ms.**
Only `panel.content` differs by 100ms, and its entry carries a `delay: 100`.

> **Correction.** `systems/atlassian.md` and `button.md` first recorded that "all nine
> components are 50ms shorter, without exception". `panel.content` was missed — that pair is
> 150ms against 50ms, **a 100ms difference.** The table above is correct.

**The entry duration is either 150 or 250ms.**

| 150ms (fast) | 250ms (slow) |
|---|---|
| `avatar` · `label` · `popup` · `panel.content` | `blanket` · `flag` · `modal` · `panel` · `sidenav` · `spotlight` |

**Small, incidental elements take 150ms; things that cover the screen or occupy a large area
take 250ms.**

### `panel.content`'s delay — a sequential arrival

```js
motion.panel.enter.right      = { duration: 250, keyframes: ['SlideIn100PercentRight'] }
motion.panel.content.enter    = { duration: 150, delay: 100, keyframes: ['FadeIn0to100'] }
```

**While the panel is still sliding (at the 100ms mark) the content begins to fade in, and
both finish at 250ms.** The container's and content's timings aligned by token.

On exit the order reverses and the content goes first — `content.exit` at 50ms against
`panel.exit` at 200ms.

**Atlassian is the only system in the sample to put `delay` in a token.**

### Easing assignment — there is a rule

| easing | where it is used |
|------|-----------|
| **`out.practical`** | `avatar.enter` · `button.*` · `label.enter` · `listitem.*` · `panel.content.*` · `popup.enter.*` |
| **`in.practical`** | `avatar.exit` · `blanket.exit` · `flag.exit` · `label.exit` · `modal.exit` · `popup.exit.*` · `sidenav.exit.*` · `spotlight.exit` |
| `inout.bold` | `blanket.enter` · `modal.enter` · `spotlight.enter` · `flag.reposition` |
| **`out.bold`** | `flag.enter` · **`panel.enter.*` · `panel.exit.*`** · `sidenav.enter.*` |
| `spring` | `avatar.hovered` |

**Entry takes the `out` family and exit the `in` family by default** — decelerating in,
accelerating out.

**There are two exceptions.**

1. **`panel.exit.*` is `out.bold`** — the only component that leaves on an `out` easing
2. **`panel.content.exit` is `out.practical`** — an exception for the same reason

**The `bold` family is used only on large areas** — blanket · modal · spotlight · panel ·
sidenav · flag.
Small elements such as buttons and list items are all `practical`.

### State transitions — the duration differs per component

| token | duration | properties transitioned |
|------|:---:|:---:|
| **`listitem.hovered`** | **50ms** | 4 |
| `listitem.pressed` | 100ms | 4 |
| `listitem.selected` | 100ms | 4 |
| `button.hovered` | 150ms | 2 |
| `button.pressed` | 150ms | 2 |
| `avatar.hovered` | 250ms (`spring`) | 1 (`transform`) |

**List-item hover is a third of button hover** (50 vs 150ms).
**Even within `listitem`, hover (50) differs from pressed (100).**

**Avatar hover is the longest at 250ms** — the only one on a `spring` easing, transitioning
`transform` alone. It is size that moves, not colour.

### `fill` — entry and exit are consistent

| direction | `fill` |
|------|--------|
| entry | `backwards` |
| exit | `forwards` |

**Without exception.** Before entering it holds the first frame's state; after leaving it
holds the last frame's.

**Atlassian is the only system in the sample to put `animation-fill-mode` in a token.**

## Accessibility — `prefers-reduced-motion`

| system | handling |
|--------|------|
| **Cloudscape** | **a `disabled` mode in the tokens.** Every `motion-duration-*` becomes `0ms` |
| Atlassian | only a `motion.duration.instant: 0ms` token |
| GitLab (Pajamas) | a runtime check, `window.matchMedia('(prefers-reduced-motion)')` |
| **Mantine** | **a double opt-in** — `data-respect-reduced-motion` (off by default) plus `data-reduce-motion` (see the Mantine section below) |
| **Helios** | a media query taking the SideNav's duration variable to 0 (component CSS) |
| the rest | unverified |

### Cloudscape — the values come in two sets

```json
"motion-duration-responsive": {
  "$value": { "default": "115ms", "disabled": "0ms" },
  "$description": "The duration for making the motion feel quick and responsive."
}
```

**All six `motion-duration-*` tokens carry a `disabled: 0ms`.**
The easings and keyframes hold the same values — **only the duration goes to 0.**

The same structure as keeping two sets of spacing tokens, `scaled` and `static`
(`tokens/scales.md`) — **Cloudscape makes mode an axis of the token values.**

**Cloudscape is the only system in the sample to put its accessibility response at the token
level.**
Elsewhere the implementation has to handle it with a media query.

## Looping animation

| system | tokens |
|--------|------|
| **Tailwind** | `spin` 1s linear · `ping` 1s · `pulse` 2s · `bounce` 1s |
| **Codex** | `animation-duration-fast/medium/slow` 1000 · 1600 · 2000ms plus `iteration-count-base: infinite` |
| **Cloudscape** | `avatar-loading-dots` 1200ms · `avatar-gen-ai-gradient` 3600ms |

### Codex — it offsets the phase with negative delays

| token | value |
|------|-----|
| `animation-delay-none` | 0ms |
| **`animation-delay-medium`** | **-160ms** |
| **`animation-delay-slow`** | **-320ms** |

**A negative `animation-delay` starts an animation partway through.**
Giving a spinner's three dots 0 / -160 / -320ms offsets their phase into a sequence.

**Codex is the only system in the sample to tokenise a negative delay.**
`-160` and `-320` are exactly 2:1, and are a tenth and a fifth of
`animation-duration-medium` (1600ms).

### Tailwind — the easing is inside the animation definition

```css
--animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
--animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
--animate-bounce: bounce 1s infinite;
```

**It writes the values directly rather than referring to the `--ease-*` tokens.**
`ping`'s `cubic-bezier(0, 0, 0.2, 1)` is the same value as `--ease-out`, and it is not
reused.

`pulse`'s `cubic-bezier(0.4, 0, 0.6, 1)` is not among any of the three `--ease-*`.

`bounce` changes `animation-timing-function` inside its keyframes —
`cubic-bezier(0.8, 0, 1, 1)` ↔ `cubic-bezier(0, 0, 0.2, 1)`.

## Systems without tokens — they do have values

### Radix Themes

Driven into the CSS as literals.

| value | where it is used |
|:---:|-----------|
| 30 · 40ms | fine transitions |
| 100ms | `background-color` |
| **120ms** | `box-shadow` · `transform` |
| **140ms** | `transform` + `box-shadow` (`cubic-bezier(0.45, 0.05, 0.55, 0.95)`) |
| 160ms | animations |
| 800ms · 5s | Skeleton · Progress |

It enumerates different values per property, as in
**`transition-duration: 120ms, 140ms, 140ms, 140ms`** — only the first property is 120ms.

The keyframes are `rt-slide-from-top` and the like, and **the travel is 4px plus
`scale(0.97)`** — half Atlassian's (8px plus `scale 0.95`).

| system | popup entry travel | scale |
|--------|:---:|:---:|
| **Radix Themes** | **4px** | **0.97** |
| Atlassian | 8px | 0.95 |
| shadcn/ui | 8px (`slide-in-from-top-2`) | 0.95 (`zoom-in-95`) |

**shadcn/ui matches Atlassian** — 8px / 95%.
Only Radix Themes is at half. shadcn/ui uses Radix Primitives but **does not follow Radix
Themes' motion values.**

### shadcn/ui

| value | where it is used |
|:---:|-----------|
| **200ms** | Dialog (`duration-200`) |
| unstated | everything else (Tailwind's default of 150ms) |

It states the transitioned properties in classes — `transition-[color,box-shadow]` (in three
places) · `transition-shadow` · `transition-opacity` · `transition-colors` ·
`transition-all` (the Button).

**Only the Button uses `transition-all`.** Other components narrow the properties.

### Mantine

| value | where it is used |
|:---:|-----------|
| 100ms | `border-color` · `color` |
| 150ms | `background-color` |
| 200ms | some components |
| 300ms | Burger (the default) |
| **0ms !important** | **AppShell's `[data-resizing]`** — not accessibility (see below) |

**It keeps a separate CSS variable per component** —
`--app-shell-transition-duration` · `--burger-transition-duration` ·
`--sc-transition-duration` · `--progress-transition-duration`.

**There is no global motion token, only per-component variables.**
It resembles Atlassian's per-component tokens on the surface, but
**with no raw duration scale at the centre the values are arbitrary per component.**

#### The selector on the `0ms !important` — it was not reduced-motion (2026-08-18)

Confirmed in `@mantine/core@9.5.1`'s `styles/AppShell.css`:

```css
.m_89ab340[data-resizing] {
  --app-shell-transition-duration: 0ms !important;
}
```

**It is a device for switching the transition off while the sidebar width is being dragged**
— a fix for the animation failing to keep up with the cursor during a resize, and unrelated
to accessibility. The actual reduced-motion handling is separate, in `global.css`:

```css
@media (prefers-reduced-motion: reduce) {
  [data-respect-reduced-motion] [data-reduce-motion] {
    transition: none;
    animation: none;
  }
}
```

**A double opt-in** — `data-respect-reduced-motion` has to be on at the root (the theme
setting `respectReducedMotion`, off by default) and the individual element must carry
`data-reduce-motion`. **In its default state it ignores the OS setting** — unlike Cloudscape
(two sets of tokens) and Radix Themes (wrapping in a media query), the consumer has to turn
it on explicitly.

## Helios — it has motion tokens, but all of them are component-specific (2026-08-18)

`@hashicorp/design-system-tokens@5.1.0` (`dist/products/css/tokens.css`) was compared against
`@hashicorp/design-system-components@6.5.0`'s CSS.

**The answer: the 0.2s, 0.6s and three beziers are indeed tokens — but component-scoped
ones.**
The token package's motion-related declarations are these six in full:

| token | value |
|------|-----|
| `--token-form-radiocard-transition-duration` | 0.2s |
| `--token-form-toggle-transition-duration` | 0.2s |
| `--token-form-toggle-transition-timing-function` | `cubic-bezier(0.68, -0.2, 0.265, 1.15)` (an overshoot) |
| `--token-tabs-indicator-transition-duration` | **0.6s** |
| `--token-tabs-indicator-transition-function` | `cubic-bezier(0.5, 1, 0.89, 1)` (a deceleration) |
| `--token-tooltip-transition-function` | `cubic-bezier(0.54, 1.5, 0.38, 1.11)` (a strong overshoot) |

- **There is no global duration or easing scale** — zero `duration-*` or `easing-*`
  families.
  An intermediate form between Mantine (no tokens, only component variables) and Atlassian
  (a global eight-step scale plus 68 component tokens): **a token pipeline exists, but with
  a component layer and no raw layer.**
- The component package carries plenty of literals that refer to no token —
  `0.3s` (the accordion chevron and so on) · `0.25s ease-in-out` (the sidebar width) ·
  `text-decoration-color 0.25s ease-in` (links). **Token references and literals are mixed
  inside the same package**, so half the values cannot be redefined
- Only SideNav keeps its own CSS variable set — `--hds-app-side-nav-animation-duration:
  200ms` and `easing: cubic-bezier(0.65, 0, 0.35, 1)`, and it takes the duration to 0 under
  `@media (prefers-reduced-motion)` — the package's only reduced-motion handling
- The three easings are all different and two overshoot (containing a term > 1) — the toggle
  thumb and the tooltip spring, and only the tab indicator is a pure deceleration

## Material 3 — ten easings plus two spring sets (the androidx source)

The set left unverified because `m3.material.io` is blocked was obtained from **generated
code in the androidx repository**
(`compose/material3/…/tokens/MotionTokens.kt`, a sparse clone — `HARVESTING.md`).

### Easing — three families × (standard, accelerate, decelerate) plus linear

| family | standard | accelerate (exit) | decelerate (entry) |
|------|------|------|------|
| **Emphasized** | `(0.2, 0, 0, 1)` | `(0.3, 0, 0.8, 0.15)` | `(0.05, 0.7, 0.1, 1)` |
| **Standard** | `(0.2, 0, 0, 1)` | `(0.3, 0, 1, 1)` | `(0, 0, 0, 1)` |
| Legacy (M2) | `(0.4, 0, 0.2, 1)` | `(0.4, 0, 1, 1)` | `(0, 0, 0.2, 1)` |

- **Emphasized's standard and Standard's standard are the same curve**, `(0.2, 0, 0, 1)` —
  the two families differ only in their accelerate and decelerate variants. Emphasized's
  decelerate `(0.05, 0.7, 0.1, 1)` has y1 = 0.7, a sharp deceleration covering 70% of the
  distance almost at once.
- **Legacy is Tailwind's and Material 2's `(0.4, 0, 0.2, 1)`** — confirming by value that
  the Tailwind default easing shadcn/ui uses originates here.
- Atlassian's `inout.bold (0.4, 0, 0, 1)` and M3's Standard `(0.2, 0, 0, 1)` are different
  curves — **they share only the "come to a complete stop at the end" shape (x2 = 0).**

### Duration — four families × four steps = 16 tokens

```
Short      50 · 100 · 150 · 200
Medium    250 · 300 · 350 · 400
Long      450 · 500 · 550 · 600
ExtraLong 700 · 800 · 900 · 1000
```

An even 50ms step (Short–Long) then an even 100ms step (ExtraLong) — **the most steps in the
corpus (16).**
For comparison: Atlassian three, Cloudscape six, Canvas five.

### M3 Expressive — a move from easings to springs

The newest scheme tokens (`ExpressiveMotionTokens.kt` · `StandardMotionTokens.kt`) are
**spring parameters** rather than beziers. They separate `Spatial` (position) from `Effects`
(colour and opacity):

| set | axis | Default | Fast | Slow |
|------|----|---------|------|------|
| Expressive | Spatial (damping/stiffness) | 0.8 / 380 | **0.6 / 800** | 0.8 / 200 |
| Standard | Spatial | 0.9 / 700 | 0.9 / 1400 | 0.9 / 300 |
| both | Effects | 1.0 / 1600 | 1.0 / 3800 | 1.0 / 800 |

- **Effects is identical across both sets at damping 1.0 (no oscillation)** — colour and
  opacity never bounce, and only position bounces by set (Expressive Fast at damping 0.6).
- Apple (prose) → no values, Ant Design (a bezier approximation) → a `linear()` polyline,
  M3 → raw damping/stiffness. **The three-approach sample for expressing a spring is now
  complete** (cross-referencing "expressing a spring — three approaches" above).

### Material Web's dialog — multi-layer orchestration measured (2026-08-18)

The real values of `DIALOG_DEFAULT_OPEN/CLOSE_ANIMATION` in `@material/web` 2.5.0's
`dialog/internal/animations.js`. In one modal, **five layers move on different timings**:

| layer | entry | exit |
|--------|------|------|
| the dialog body | translateY(-50→0px) · 500ms · Emphasized | translateY(0→-50px) · **150ms** · EmphasizedAccelerate |
| scrim | opacity 0→**0.32** · 500ms · linear | 0.32→0 · 150ms |
| container | height 35→100% · 500ms plus opacity 50ms | height 100→35% · 150ms |
| headline and content | opacity 0→1 · 250ms (offset 0.2) | opacity 1→0 · 100ms |
| actions | opacity 0→1 · 300ms (offset 0.5) | the same |

- **Entry 500 / exit 150ms — the corpus's largest asymmetry (3.3×).**
  An entirely different order from the web samples (half the entry to equal).
- The rule of the content disappearing before the overlay (100 vs 150ms) matches Radix
  Themes (cross-referenced in `modal.md`).
- The scrim target of 0.32 matches the ContainerOpacity in androidx's `ScrimTokens.kt` —
  cross-verification through an independent channel.
- Two compromises the source comments reveal: the container growth is 0→100% per the spec
  but is 35%→100% to simplify clipping, and `EMPHASIZED = (.3, 0, 0, 1)` is stated to be
  **"an approximation of unknown accuracy"** (androidx's original is `(0.2, 0, 0, 1)`).

## Guidance — when to add it and when to leave it out (documentation layer, measured 2026-08-18)

The motion principles pages of five systems (M3 · Carbon · Spectrum · Atlassian ·
Cloudscape) were read directly. **All five point the same way in their own language — "leave
it out by default and add it only when there is a reason."**

- **Atlassian codifies a decision test** — *"Before adding motion ask,
  if I remove this, does the user lose information or context?"* If nothing is lost, do not
  add it. Additional rules: remove it if it only adds waiting · no simultaneous multiple
  animations · **an interaction triggered dozens of times a day must be under 150ms.**
- **Carbon settles "when" with a dual system** — productive (task-focused: button states,
  dropdowns, tables) and expressive (**reserved for "occasional, important moments"**: a new
  page, a primary action, a notification appearing). Bounce, stretch and abrupt-stop easings
  are forbidden ("IBM motion is essential and efficient").
- **M3 states both the scheme choice and when to leave it out** — Expressive is the default
  recommendation ("hero moments and key interactions") and Standard is for utility products.
  **"When pure efficiency is paramount, a jump cut (no animation) is better"** (a
  productivity app's menu) — the only sample to codify omitting an animation. The container
  transform is reserved for hero moments and shallow hierarchies, and is "excessive" for
  deep-hierarchy navigation.
- **Spectrum makes the ceiling a principle** — *"just enough to get the intention across and
  no more"*. Animation without a purpose (connection, attention, feedback) is excluded,
  animation beside a paragraph of text is forbidden, and building a custom component just to
  follow the animation guide is forbidden (native first).
- **Cloudscape binds the accessibility constraints in with it** — purposeful and restrained
  use plus respecting `prefers-reduced-motion` plus no flashing more than three times a
  second plus **no conveying information through motion alone.**
- A shared reduced-mode rule: M3's "subtle fades instead of strong slides and scales;
  disable decorative effects such as parallax and shape morphing" — the documentation-layer
  counterpart of the token-level handling in the "accessibility" section above (Cloudscape's
  `disabled: 0ms`).

## Not yet filled in

- ~~When to add animation~~ → **resolved (2026-08-18)** — the "guidance" section above
- ~~Apple's and Material 3's motion~~ — **the M3 side is resolved** (the section above).
  Apple was confirmed to have no figures even on the HIG motion page — the figures live at
  the SwiftUI API layer
- ~~Material Web's dialog animation~~ → **resolved (2026-08-18)** —
  the "Material Web's dialog — multi-layer orchestration measured" section above
  (`@material/web` 2.5.0)
- ~~Helios's motion~~ → **resolved (2026-08-18)** — settled as **component-scoped tokens**
  (all six declarations in `design-system-tokens@5.1.0` compared against `components@6.5.0`,
  with the absence of a global scale and the coexistence of literals confirmed). The
  "Helios" section above
- ~~Mantine's `0ms !important`~~ → **resolved (2026-08-18) — it is not reduced-motion.**
  It is AppShell's `[data-resizing]` (blocking transitions during a resize), and
  accessibility is handled separately by the double opt-in in `global.css` (9.5.1). The
  Mantine section above
- ~~The actual keyframe definitions of Cloudscape's four `motion-keyframes-*`~~ →
  **resolved (2026-08-18)** — two fades · a 0.95 scale · an error-icon shake
  (`components@3.0.1348`). The "keyframe bodies measured" section above
- ~~**Backpack's easing** — it has three duration steps and no easing token could be
  found~~ →
  **resolved (2026-08-18) — the absence settled.** Zero `easing` or `cubic-bezier`
  occurrences across every file of `bpk-foundations-web@24.7.0`. At the component layer
  (`@skyscanner/backpack-web@43.19.0`) the literal `ease-in-out` is the main line (42
  occurrences at 200ms, 13 at 400ms), and three hand-written cubic-beziers are entering only
  in newer components (the chat family and ModalV3) —
  `(0.4,0,0.2,1)` the Material standard · `(0.2,0,0,1)` matching M3 standard · `(0.5,0,0,1)`
  ModalV3.
  Details in the deep-pass section of `systems/backpack.md`
- ~~**Orbit's easing** — the same~~ → **resolved (2026-08-18) — the absence settled.**
  Zero `easing` or `cubic-bezier` occurrences across the whole dist of
  `@kiwicom/orbit-design-tokens@11.0.0` (only three durations).
  `@kiwicom/orbit-tailwind-preset@7.4.0` overrides `transitionDuration` alone and leaves
  `transitionTimingFunction` at Tailwind's default. At the component layer
  (`@kiwicom/orbit-components@27.7.0`) the literal distribution is
  **`ease-in-out` 52 · `ease-linear` 1 · nothing else** — effectively a single convergence
  on Tailwind's default `ease-in-out` = `cubic-bezier(0.4, 0, 0.2, 1)` (the same value as
  the Material standard). From the same absence of tokens, Backpack drifted into three
  hand-written curves and Orbit converged on the framework default — two endings from one
  branch.
  Details in the deep-pass section of `systems/orbit.md`
- ~~Cloudscape is the only one to put the accessibility response at the token level~~ →
  **corrected (2026-08-18)** —
  at least 13 systems handle it, at six different layers.
  See the "reduced-motion" item of the re-synthesis section below

## Re-synthesis across 83 samples — component measurements (2026-08-18)

The `partial` deep pass raised the motion measurements to 83 systems (73 at the component
deep-pass layer plus 10 at the token or documentation layer), and this document's conclusions
were re-verified against that sample.
**Seven conclusions are overturned, the preface's premise among them.**

### Holding motion tokens — it is not "the least tokenised axis"

> **Correction.** The earlier "only 9 of the 34 samples hold motion tokens — motion is the
> least tokenised axis" was the result of a sample weighted towards the framework family.
> **Across the 83, more than 40 systems ship a named duration or easing.**
> The token-less camp is the minority, and even within it the values almost always exist.

Redistributing the tokenisation depths across the 83 gives this:

| depth | systems |
|:---:|--------|
| **0. none — literals only** | Radix Themes · Mantine · shadcn/ui · Apple · **Astro** (zero motion among 636 tokens across three layers) · **Pajamas** (a single literal, 53 times) · **Semi** (30 transition declarations in 20,602 lines) · **Evergreen** (hardcoded per file) · **Grommet** (a JS constant of 200, outside the theme) · Ring UI · NYSDS · Vanilla · DSFR · Protocol · Origami · **Odyssey** (MUI's `transitions` not injected) |
| **1. duration only** | **Orbit** 3 (easing absence settled) · **Backpack** 3 (easing absence settled) · **Pluralsight** 5 (even ×100) · **Intergalactic** 1 (modal-only, a unitless `"200"`) · **KRDS** 1 (a global `.4s ease-in-out`) · **Bolt** 1 (a single composite) · **Yoga** 2 (**an unnamed array**, `duration: [200, 500]`) |
| **2. duration + easing** | Canvas · Tailwind · MUI · EUI · Cedar · Forma 36 · Thumbprint · Tegel · Kaizen · Clarity · eBay · Seed · Porsche · PIE · Park UI · Pharos · Stacks · Strapi · Nord (easing inside the value) · Braid · Base Web · Chakra · Naive UI · Vuetify · LeafyGreen · Shoelace · Spindle · HSDS · Material 3 |
| **3. + keyframes · property lists** | Codex · Cloudscape · **Vitamin** (the whole `animation` shorthand is a token) · **Siemens iX** (CSS variables → consumed by JS via `getComputedStyle`) |
| **4. per-component composite tokens** | **Atlassian** 68 · **Helios** 6 (**a component layer with no raw layer**) |

**Depth 2 dominates.** Naming duration and easing separately and letting components combine
them is the convention. Depth 0 splits between the framework family and **systems that
deliberately exclude motion** (Astro — a control-room UI · Semi — instant state-colour
swaps).

### Duration — three steps is the mode, and there are five naming axes

```
16–20 steps  Canvas 20 (even 50ms) · Material 3 16 (4 families × 4)
9–10 steps   eBay 10 (a frame grid) · Clarity 9
7–8 steps    Atlassian 8 · Tegel 7 · Park UI 7
6 steps      Cloudscape · Kaizen · Thumbprint · Seed · Cedar
5 steps      EUI · MUI · Pluralsight · Siemens iX
3 steps      Orbit · Backpack · Nord · Pharos · Forma 36 · Strapi        ← the mode
1–2 steps    Codex 2 (+3 looping) · Yoga 2 · Braid 2 · Tailwind 1 · Bolt 1 ·
             KRDS 1 · Intergalactic 1
```

| naming axis | systems |
|---------|--------|
| size (fast/slow) | Orbit · Backpack · Pluralsight · Tegel · Thumbprint · EUI (`extraFast`–`extraSlow`) |
| **character (as felt)** | **Kaizen** `instant/immediate/rapid/fast/slow/deliberate` · **Clarity** `instant/quickest/quicker/quick/secondary/primary/slow/slower/slowest` |
| **a frame grid** | **eBay** — 17/50/83/167/250/333/500/667/833/1000ms = **1/3/5/10/15/20/30/40/50/60 frames.** `instant` is exactly one frame (17ms) |
| an even numeric step | Canvas (50ms × 20) · Seed `d1`–`d6` · Cedar `1-x`–`6-x` · Material 3 |
| **an unnamed array** | **Yoga** — accessed by index, as `duration[1]`. The purpose of each slot is not in the source |

> **Correction.** "Only Cloudscape uses values that are not multiples of 5" is wrong.
> **eBay** (17/83/167/333/667/833 — frame multiples) · **MUI** (225/195/375) ·
> **Evergreen** (80/240) · **Semi** (90) · **Braid** (125/175) · **Strapi** (120/320) ·
> **Thumbprint** (75) · **Vuetify** (280) · **Kaizen** (**201** — a literal, one millisecond
> above `rapid` (200) to avoid an opacity bug in Chrome/Blink 102.x, with the Jira number in
> the source) are all off any multiple of 5. **Only eBay's frame grid has an answer to "why
> not a multiple of 5"** — its base is frames, not milliseconds.

> **Correction.** `systems/nord.md`'s "a 50ms transition — the fastest in the sample" does
> not hold either.
> **Shoelace is 50ms too** (`--sl-transition-x-fast`), **Canvas shortens 120ms to 40ms on
> `hover:active`**, and **eBay's `instant` is 17ms.**

**The systems keeping a `0ms` token have grown to six** (the earlier record was two,
Atlassian and Cloudscape) — Kaizen's `instant` · Tegel's `instant` · Clarity's `instant` ·
**Siemens iX's `short` (a 0ms fallback)**.
Only in Siemens iX is "instant" **the first step of the scale rather than an accessibility
value.**

### The easing catalogue — the bigger it is, the less it is used

| system | shipped | actually used |
|--------|:---:|--------|
| **Strapi** | **26** (the whole Penner family) | easeOutQuad · authenticMotion, **about two** |
| **HSDS** | the whole Penner set plus three of its own (`bounce` · `boop` · `elastic`) | the modal uses `boop` |
| **Stacks** | 8 (all matching Penner's constants) | **three** — the `back` family is used zero times |
| eBay | 7 | — |
| Material 3 | 10 plus two spring sets | — |
| Kaizen | 6 | — |
| Canvas · Atlassian · Cloudscape · Tegel | 5–6 | — |
| PIE · MUI · Seed | 4 | — |
| Porsche · Thumbprint · Park UI | 3 | — |
| Cedar · EUI · Forma 36 · Codex | 2 | — |

**Strapi's 26 are an unverified catalogue** — the values of the seven `InOut` curves (Sine ·
Quad · Cubic · Quart · Quint · Expo · Circ) are **identical to the `Out` ones** (only Back
has a real InOut value). The copy-paste survives in the dist, and the actual duration tokens
number three (120/200/320ms).

**The number of easings has no correlation with a system's maturity.** Atlassian has 68
component tokens and five easings, and even those combine incompletely (no `in.bold` or
`inout.practical` — only the combinations actually used are tokenised).

**Two more naming axes appeared** — to the existing four (direction × strength, Atlassian ·
purpose × character, Canvas · expression, Cloudscape · agency, Codex) are added
**onomatopoeia (HSDS's `boop` · `bounce` · `elastic`)** and
**a brand name (Tegel's `--tds-motion-easing-scania`)**.
Tegel's curve itself is `(0.4, 0, 0, 1)`, of the M3 emphasized family.

**There are two cases where the name and the value are inverted.** **Porsche**'s `ease-in`
is a deceleration curve (`(0, 0, 0.2, 1)`, the Material easeOut shape) and its `ease-out` an
acceleration — the result of naming by "the curve used on entry (in)". **Base Web** shipped a
semantic renaming whose four new names are used zero times, with the old `easeOutCurve`
remaining the main line.

### Overshoot — Spindle's 2.05 is not the maximum

| system | curve | overshoot | actually used |
|--------|------|:---:|:---:|
| **HSDS `elastic`** | `(0.68, −1.5, 0.265, 2.5)` | **y₂ 2.5** (plus a y₁ **−1.5** undershoot) | unverified |
| Spindle `ease-out-bounce` | `(0.55, 2.05, 0.65, 0.75)` | y₁ 2.05 | — |
| **Bolt** | `(0.45, 1.8, 0.5, 0.75)` | y₁ 1.8 | **checkbox and radio entry** |
| HSDS `bounce` | `(0.68, −0.65, 0.265, 1.65)` | y₂ 1.65 (plus an undershoot) | — |
| **EUI `bounce`** | `(.34, 1.61, .7, 1)` | y₁ 1.61 | **the modal's default entry** |
| TDS `back` | `(0.34, 1.56, 0.64, 1)` | y₁ 1.56 | — |
| **Braid `touchable`** | `(0.02, 1.505, 0.745, 1.235)` | y₁ 1.505 | **button press** |
| Clarity `easing-secondary` | `(0, 1.5, 0.5, 1)` | y₁ 1.5 | — |
| **Helios (tooltip)** | `(0.54, 1.5, 0.38, 1.11)` | y₁ 1.5 | **tooltips** |
| **Semi** | `(0, 0, 0.26, 1.38)` | y₂ 1.38 | **modal entry** |
| eBay `bounce` | `(0.3, 0, 0, 1.25)` | y₂ 1.25 | — |
| **Kaizen `bounce-in`** | `(0.485, 0.155, 0.24, 1.245)` | y₂ 1.245 | **modal entry** |
| **HSDS `boop`** | `(0.175, 0.885, 0.325, 1.2)` | y₂ 1.2 | **modal entry** |
| **Helios (toggle)** | `(0.68, −0.2, 0.265, 1.15)` | y₂ 1.15 | **the toggle thumb** |
| **Blueprint** | `(0.54, 1.12, 0.38, 1.11)` | y₁ 1.12 | **modal entry** |
| Atlassian `spring` | a `linear()` of 65 stops | 1.024 | `avatar.hovered` |
| **Vapor** | `(.45, 1.005, 0, 1.005)` | 1.005 | **modal entry** |

> **Correction.** "Spindle's (Ameba's) 2.05 is the sample maximum" is wrong —
> **HSDS's `elastic` is 2.5**, and **the only curves with a negative control point (an
> undershoot) are HSDS's two.**
> HSDS's `elastic` could not be confirmed in actual use, though
> (the same catalogue problem as Stacks' `back` family being used zero times).

> **Correction.** `systems/blueprint.md` and `systems/kaizen.md` each recorded that "it is
> the only one actually applying an overshoot to a modal entry", and **both are wrong** —
> Blueprint · Kaizen · EUI · Semi · HSDS · Vapor · Clarity · eBay, at least eight, use an
> overshoot on modal entry. **An overshoot is not a value that exists only as a token and
> goes unused.**

**Where the overshoot is assigned parts** — modal entry (the eight above) vs
**button press** (Braid) vs **checkbox** (Bolt — `rotate(45deg) scale(0.1→1)`) vs
**toggle thumb and tooltip** (Helios) vs **avatar hover** (Atlassian).
**Braid stands out** — a sample that assigns elasticity to **input feedback** rather than
entry.

**The spring-physics camp gained a sample** — **Paste** uses `@react-spring/web` with
`{ mass: 0.5, tension: 370, friction: 26 }` on modal entry.
The same layer as TDS (eight stiffness/damping presets), and **the only modal in the sample
with no notion of duration at all** is Paste's.

### The layer at which motion executes — six branches

| layer | systems |
|----|--------|
| CSS `transition`/`keyframes` | the majority |
| **modern CSS** (`@starting-style` + `transition: display allow-discrete`) | eBay · LeafyGreen · PIE · Skeleton · Spindle |
| **WAAPI** | **Clarity** (an `internal/motion` runner reading its options from CSS custom properties) · **Vuetify** (the container-transform hero transition) |
| **a JS animation library** | **Siemens iX** (animejs) · **Priceline** (`motion` 12.x) · **smarthr** (react-transition-group) · **Forma 36** (react-modal class transitions) |
| **spring physics** | **Paste** (react-spring) |
| **a JS registry** | **Shoelace** — keyframes are registered with `setDefaultAnimation()` and the consumer swaps them per component and direction with `setAnimation()`. **Even the RTL-specific keyframes are in the registry** |

**The premise that "motion values live in CSS" does not hold across the 83 samples.**
Clarity and Siemens iX have **JS read** their CSS custom properties and execute, and Shoelace
has no keyframes in CSS at all. That is why Siemens iX blocks `prefers-reduced-motion` **at
the JS layer** too.

**Vuetify's duration is not a constant** — it stretches **1–1.5× with the distance
travelled** from the trigger element to the dialog's final position
(`speed = min(1.5, (distance ratio − 0.12) × 10 + 1)`).
The only sample in which duration is a function of distance.

### Drift between CSS and JS constants — observed in the flesh

| system | where they disagree |
|--------|-------------|
| **Braid** | CSS entry **125ms** vs the JS cleanup timer `ANIMATION_DURATION` **300ms** |
| **Charcoal** | a source comment requires *"the duration must match the JS constant"* — the contract is a comment and nothing more |
| **Evergreen** | Dialog panel 200ms vs Overlay, SideSheet and Toast 240ms — hardcoded per file |
| **Vibe** | the token enter `(0, 0, 0.35, 1)` vs the modal's literal `(0, 0, 0.4, 1)` — **close but not equal** |
| **Backpack** | with easing untokenised, three curves are entering newer components by hand |
| **Intergalactic** | the component's inline fallback disagrees with the theme value (radius 14 vs 12px) |

**The causes converge on one thing — the value is written down in two layers.**
The opposite pole is **Pajamas**: it has zero tokens, and yet one curve
`cubic-bezier(.22,.61,.36,1)` **appears 53 times** with nowhere out of step.
**Having no tokens is not itself drift** — just as Backpack (three scattered curves) and
Orbit (a single convergence, `ease-in-out` 52 times) are two endings from the same absence.

### reduced-motion — not Cloudscape alone but six layers

| layer | systems |
|----|--------|
| **two sets of token values** | **Cloudscape** (`disabled: 0ms`) |
| only a `0ms` token provided | Atlassian · Kaizen · Tegel · Clarity · Siemens iX |
| a media query taking the duration near 0 | **Pajamas** (`.01ms !important`, built into the component CSS) · **Spindle** (0.1ms) · **Helios** (SideNav only) · **DSFR** (released across the board) |
| wrapping the animation definitions themselves | **Radix Themes** — even the keyframes inside `no-preference` |
| **a global kill switch** | **Porsche** (one variable each, `--p-transition-duration`/`--p-animation-duration`) · **Canvas** (a global `.wd-no-animation` class) · HeroUI (`motion-reduce`) |
| **blocking at the JS layer** | **Siemens iX** — an `Animation` utility takes every step to 0 |
| **inverted into an opt-in** | **Strapi** — every transition declaration exists **only inside** a `prefers-reduced-motion` guard (the default is no motion) · **Mantine** — a double opt-in of `data-respect-reduced-motion` + `data-reduce-motion` (off by default) |
| **two-track reduction** | **Clarity** — the fast durations (quickest–primary) go **to 0** and the slow ones (slow–slowest) are **stretched to a uniform 2s.** Transitions off, loops **slower** |
| **providing an alternative animation** | **Vuetify** — the hero transition is replaced by a 125/85ms fade |

> **Correction.** "Cloudscape is the only system in the sample to put its accessibility
> response at the token level; elsewhere the implementation has to handle it with a media
> query" is wrong.
> **At least 13 systems handle it, at six different layers.**
> Among them **Clarity's two-track handling** (transitions to 0, loops stretched to 2s) and
> **Strapi's inverted opt-in** (no motion by default) go a step beyond Cloudscape's "only
> the duration to 0" — **because a looping animation cannot be made 0ms.**
> **Mantine is the exception in the other direction**: being a double opt-in, it ignores the
> OS setting in its default state.

### The camp that splits motion by viewport or platform — not Nord alone

| system | how it splits |
|--------|-------------|
| **Nord** | `transition_mobile` 0.4s = **twice** the desktop `slowly` 0.2s |
| **Braid** | drawer entry at **300ms on mobile / 175ms on tablet** — mobile is longer |
| **Orbit** | **entry motion is mobile-only** — the desktop modal has no animation |
| **Thumbprint** | `transition:none` on the desktop / a slide-up on mobile only |
| **HeroUI** | an 80px slide-exit on mobile / a 103% scale-exit on the desktop |

> **Correction.** "Decide whether to split by platform. Only Nord sets `mobile` at twice the
> desktop. Being the only case in the sample, it is not a convention" is only half right.
> **Two systems lengthen the duration, Nord and Braid, and the other three change whether
> there is motion at all or what kind it is.**
> What they share is **moving more on mobile** — the desktop gets a scale or no motion, and
> mobile a full-height slide-up.

## Implementation defaults

**Duration — start with five steps.**

```
0     instant (the accessibility mode)
50    fine state transitions (list-item hover)
100   a fast exit
150   entry (small elements) · the default transition
250   entry (large areas · modals · panels)
```

**Three steps is enough too** (corrected 2026-08-18). The earlier edition recommended five,
but **the mode across the 83 samples is three** (Orbit · Backpack · Nord · Pharos ·
Forma 36 · Strapi).
Grow to five once the component kinds have multiplied — even Atlassian (eight) and Clarity
(nine) end up concentrating actual use on two or three values.

The sample majority uses multiples of 50ms. **"Only Cloudscape is the exception" is not
true, though** (corrected 2026-08-18) — eBay (a frame grid) · MUI 225/195 · Evergreen 80/240
· Braid 125/175 · Strapi 120/320 · Thumbprint 75 · Kaizen 201 are outside it too.
**If you break the multiple of 5, leave the reason in the value** — eBay took frames as its
base, and Kaizen drove its browser-bug rationale into a source comment with a Jira number.

**Do not make 20 steps in even 50ms increments as Canvas does.** Unlike spacing, motion has
few steps a person can distinguish — 150 and 200ms are distinguishable, but there is rarely
a reason for a value between them.

**Keep a `0ms` token.** The accessibility mode needs somewhere to point.
Six of the 83 samples have one — Atlassian · Cloudscape · Kaizen · Tegel · Clarity ·
Siemens iX.
**Putting `0ms` as the first step of the scale (`short`), as Siemens iX does, makes "instant"
a design option** — a different use from keeping it as an accessibility-only value.

**Make the exit shorter than the entry.**

```
entry 250 → exit 200
entry 150 → exit 100
```

**Nine of Atlassian's ten pairs differ by exactly 50ms.** The one exception is
`panel.content`, and even there the intent is clear — the content disappears before its
container.

**But `-50ms` is a rule inside Atlassian, not a rule of the sample** (a caveat added
2026-08-18). Across the 83 samples the asymmetry ratio spreads from 1.15× (MUI 225/195) to
**3.3× (Material Web 500/150)**, and **the symmetric camp numbers 12** (the re-synthesis
section of `modal.md`).
**Take 2:1 as the ceiling** — Park UI fossilised that value in its animation token names
(`dialog-in` 400 / `dialog-out` 200).

**Split the entry duration by element size.**

| element | entry |
|------|:---:|
| small and incidental (avatars · chips · popovers) | **150ms** |
| covering the screen or a large area (modals · panels · side navigation · overlays) | **250ms** |

**Easing — start with four.**

```
entry      the ease-out family   cubic-bezier(0.4, 1, 0.6, 1)   decelerating in
exit       the ease-in family    cubic-bezier(0.6, 0, 0.8, 0.6) accelerating out
large area inout                 cubic-bezier(0.4, 0, 0, 1)
looping    linear
```

**Entry on `out` and exit on `in` is the sample's default pattern.**
Atlassian keeps this rule across 39 component tokens with just two exceptions (the panel).

**Choose one naming axis.** Six have appeared in the sample (extended 2026-08-18).

| axis | example | suited to |
|----|-----|-------------|
| direction × strength | Atlassian (`out.practical`) | when there are many components and entry/exit are clear |
| purpose × character | Canvas (`quick.deceleration`) | when you already use raw and semantic layers |
| expression | Cloudscape (`responsive` · `expressive`) | when designers pick the tokens directly |
| **agency** | **Codex (`system` · `user`)** | **when input responsiveness matters** |
| **onomatopoeia** | **HSDS (`boop` · `bounce` · `elastic`)** | a consumer product where character matters more than the value |
| **a brand name** | **Tegel (`easing-scania`)** | when the signature curve is settled on one |

**Codex's `system`/`user` split makes a practical axis with the fewest tokens** — just two.

**Do not name a curve the opposite of its value.** In Porsche, `ease-in` is a
**deceleration** curve and `ease-out` an **acceleration** — the result of naming by "the
curve used on entry (in)", and the exact reverse of the CSS standard keywords, so anyone
reading it will get it wrong.

**Do not ship 26 easings** (added 2026-08-18). The larger the catalogue, the lower the rate
of use — **two of Strapi's 26 are used** (and a copy-paste error, the seven `InOut` values
identical to the `Out` ones, survives in the dist), **three of Stacks' eight** (the `back`
family zero times).
**Four to six is the practical ceiling.**

**Decide carefully whether to build a `spring` as a `linear()`.**
Atlassian defined 65 stops and uses them in **one place** (`avatar.hovered`).
Unless there are several places to use it, the cost is high.
**If you render in JS, shipping the physical parameters directly is better** — TDS (eight
stiffness/damping presets) and Paste (`{ mass, tension, friction }`) do exactly that.

**If you use an overshoot, decide where it goes first.** Across the 83 samples the confirmed
uses split five ways — modal entry (eight) · button press (Braid) · checkboxes (Bolt) ·
toggles and tooltips (Helios) · avatar hover (Atlassian). **Do not put it in the global
easing set and use it anywhere** — an overshoot signals "this matters", so it only works when
its territory is narrow.

**State the transitioned properties.**

```
❌ transition: all 150ms
✅ transition: background-color 150ms, border-color 150ms
```

`all` animates layout properties too.
**Keep the property list as a token, as Codex does**, or as a field of a composite token, as
Atlassian does, or at the very least state it in the class as shadcn/ui does.

Using only `transform` and `opacity` is the cheapest — there is no repaint.

**Keyframe travel**

```
popovers and tooltips  8px  plus scale 0.95
modals                 scale 0.95 only (no travel)
panels and side nav    100% (the full width)
flags (toasts)         entry 50% / exit 15%
```

**Consider giving entry and exit different travel.**
Atlassian uses 50% in and 15% out — it comes in from further away.
**Priceline applies the same rule to modals** — `y 64→0` in and `y 0→32` out, leaving by half
the distance it arrived.

**The 8px for popovers and tooltips holds** (Atlassian · shadcn/ui, with only Radix Themes at
4px).
**Modals are of a different order** (corrected 2026-08-18) — across the 83 samples modal
travel spreads from `-10px` (Nord) to `25vh` (Porsche), and **`-50px` (the Bootstrap lineage)
and `64px` (Park UI, Priceline) are the common values.** Use 8px on a modal and the movement
is invisible.

**Accessibility — handle it at the token level.**

Cloudscape's way is the safest — **keep a `disabled: 0ms` value alongside the duration token
and switch by mode.** There is then no need to repeat a media query in every component.

```json
"duration-short": { "default": "150ms", "disabled": "0ms" }
```

**Leave the easings and keyframes alone and take only the duration to 0.** Cloudscape does
exactly that — at `0ms` any easing gives the same result, so there is no need for two sets.

**A looping animation, though, cannot be made 0ms** (added 2026-08-18).
Set a spinner to 0ms and it does not disappear; its frames jump endlessly.
**Handle it on two tracks, the Clarity way** — transitions (quickest–primary) to 0, loops
(slow–slowest) **stretched to a uniform 2s.** Clarity is the only system in the 83 to make
that distinction.

**Decide which side the default sits on too.** The 83 samples hold two extremes —
**Strapi** puts every transition declaration **only inside** a `prefers-reduced-motion`
guard, so its default is no motion, while **Mantine**'s double opt-in
(`data-respect-reduced-motion` + `data-reduce-motion`, off by default) means it
**ignores the OS setting in its default state.**
**Do not follow Mantine here** — it overrides a setting the user stated explicitly with a
library default.

**Keeping one global kill switch is valid too** — Porsche's two variables,
`--p-transition-duration` and `--p-animation-duration`, switch off all motion.
Canvas does the same thing with a global `.wd-no-animation` class.

**Decide whether to split by platform or viewport** (extended 2026-08-18). Two systems
lengthen the duration — Nord (mobile 0.4s = twice the desktop) and Braid (a drawer at 300 on
mobile / 175ms on tablet) — and **three change whether there is motion at all or what kind**
— Orbit (entry motion is mobile-only) · Thumbprint (`transition:none` on the desktop) ·
HeroUI (a slide on mobile / a scale on the desktop).
**What they share is moving more on mobile** — the desktop gets a scale or no motion, and
mobile a full-height slide-up.

**Keep looping animation as a family separate from transitions.**
Codex separates `transition-duration-*` (100 and 250ms) from `animation-duration-*`
(1000–2000ms) — mixing them into one scale turns eight steps into 20.

**When several elements have to move in sequence, as in a spinner, use a negative
`animation-delay`** (the Codex way). Setting it to an integer fraction of the duration
offsets the phases evenly.
