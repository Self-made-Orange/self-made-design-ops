<!-- lang-links -->
> [English](motion.md) · **한국어**
<!-- /lang-links -->

# Motion

**모션 실측이 확보된 시스템은 83개입니다** (2026-08-18 재종합) —
**컴포넌트 심화 층 73개** + **토큰·문서 층에서만 확보된 10개**
(Atlassian · Cloudscape · Tailwind · Material 3 · Radix Themes · Mantine ·
shadcn/ui · Apple(수치 부재 확인) · TDS · Open Props).

개별 값은 각 `systems/*.md`의 "컴포넌트 심화" 절에 있고, 이 문서는 **분포와 교차 결론**만 담습니다.
아래 표들은 초기 표본 34개(그중 모션 토큰 보유 9개 — Atlassian · Cloudscape · Canvas ·
Codex · Orbit · Nord · Backpack · Tailwind · Material Web)로 작성된 것이며,
83표본 기준 재검증은 "83표본 재종합" 절에 있습니다 —
**둘이 어긋나면 재종합 절이 우선입니다.**

> Radix Themes · Mantine · shadcn/ui는 값이 **컴포넌트 CSS·클래스에 직접 박혀** 있습니다.
>
> 이 문서는 **문서 사이트 없이 작성됐습니다.** 지속시간·이징·키프레임은 전부
> 토큰 파일과 컴포넌트 소스에 있는 값입니다.
> "언제 애니메이션을 넣는가" 같은 판단 지침은 "판단 지침" 절에서 해소됐습니다.
>
> **머리말의 "모션은 토큰화가 가장 덜 된 축"이라는 판정은 83표본에서 뒤집힙니다** —
> 재종합 절의 첫 항목을 보세요.

## 토큰화 깊이 — 5단계로 갈립니다

| 깊이 | 시스템 | 내용 |
|:---:|--------|------|
| **0. 없음** | Radix Themes · Mantine · shadcn/ui · Apple · Material 3(Figma) | CSS·클래스에 리터럴 |
| **1. 지속시간만** | **Orbit · Backpack · Nord** | 3단계 |
| **2. 지속시간 + 이징** | **Canvas · Tailwind** | 별개 계열 |
| **3. + 키프레임 + 속성** | **Codex · Cloudscape** | 전환 속성 목록까지 |
| **4. 컴포넌트별 복합 토큰** | **Atlassian** | 68개. duration + curve + keyframes + delay + fill |

**단계 0이 표본에서 가장 많습니다.** 프레임워크 계열 3개가 전부 여기입니다 —
**모션은 토큰화가 가장 덜 된 축입니다.**

## 지속시간

### 단계 수와 값

| 시스템 | 단계 | 값 |
|--------|:---:|-----|
| **Canvas** | **20** | 50 · 100 · 150 … 1000ms (**50ms 등차**) |
| **Atlassian** | **8** | 0 · 50 · 100 · 150 · 200 · 250 · 400 · 600ms |
| **Cloudscape** | **6** | 115 · 165 · 250ms + 컴포넌트 3 |
| Codex (전환) | 2 | 100 · 250ms |
| Codex (애니메이션) | 3 | 1000 · 1600 · 2000ms |
| **Orbit** | 3 | 150 · 300 · 400ms |
| **Backpack** | 3 | 50 · 200 · 400ms |
| **Nord** | 3 | 50 · 200 · 400ms |
| Tailwind | 1 | 150ms (`--default-transition-duration`) |

**Backpack과 Nord가 정확히 같습니다** — 50 / 200 / 400ms.
서로 무관한 시스템(항공 검색 / 의료)인데 3단계 값이 일치합니다.

**Canvas가 20단계로 압도적입니다.** 50ms 등차로 1000ms까지 채웁니다 —
스페이싱을 2px 단위로 촘촘하게 두는 방식과 같은 성향입니다 (`tokens/scales.md`).

### 짧은 쪽 — 50~150ms에 몰립니다

| 값 | 시스템 |
|:---:|--------|
| **0ms** | **Atlassian** (`instant`) · **Cloudscape** (`disabled` 모드 전체) |
| 50ms | Atlassian(`xxshort`) · Canvas · Backpack(`xs`) · Nord(`quickly`) |
| 100ms | Atlassian(`xshort`) · Canvas · **Codex**(`transition-duration-base`) |
| **115ms** | **Cloudscape**(`responsive`) |
| 150ms | Atlassian(`short`) · Canvas · **Tailwind**(기본값) · Orbit(`fast`) |
| **165ms** | **Cloudscape**(`expressive`) |

**Cloudscape만 5의 배수가 아닌 값을 씁니다** — 115ms · 165ms.
나머지는 전부 50ms 배수입니다.

**`0ms` 토큰을 두는 것은 Atlassian과 Cloudscape뿐입니다.**
Atlassian은 `motion.duration.instant`, Cloudscape는 접근성 모드 전체입니다 (아래 참조).

### 긴 쪽 — 용도가 갈립니다

| 값 | 시스템 | 용도 |
|:---:|--------|------|
| 400ms | Atlassian(`xlong`) · Orbit(`slow`) · Backpack(`base`) · **Nord**(`mobile`) | |
| 600ms | Atlassian(`xxlong`) | |
| **1000~2000ms** | **Codex** | **반복 애니메이션** (스피너) |
| **1200ms** | Cloudscape | 아바타 로딩 점 |
| **3600ms** | **Cloudscape** | **AI 아바타 그라디언트** |

**Codex와 Cloudscape의 긴 값은 전환이 아니라 반복 애니메이션용입니다.**
Codex는 `animation-duration-*`(1000~2000ms)를 `transition-duration-*`(100·250ms)와
**별개 계열**로 둡니다 — 두 개념을 섞지 않습니다.

**Cloudscape의 3600ms는 표본 최댓값**이며 AI 아바타 그라디언트 전용입니다.

### Nord — `mobile`이 별도 값입니다

| 토큰 | 값 |
|------|-----|
| `n_transition_quickly` | `0.05s ease` |
| `n_transition_slowly` | `0.2s ease` |
| **`n_transition_mobile`** | **`0.4s ease`** |

**모바일 전환이 데스크톱(`slowly` 0.2s)의 2배입니다.**
표본에서 지속시간을 플랫폼으로 나눈 것은 Nord뿐입니다.

**이징이 값에 포함돼 있습니다** (`0.2s ease`) — 지속시간과 이징이 분리되지 않습니다.
Atlassian이 `duration`과 `curve`를 별도 토큰으로 두는 것과 반대입니다.

## 이징

### 개수와 명명 방식

| 시스템 | 개수 | 명명 |
|--------|:---:|------|
| **Canvas** | **6** (+ 원시 6) | **용도 × 성격** (`quick`/`purposeful` × `standard`/`acceleration`/`deceleration`) |
| **Atlassian** | **5** | 방향 × 강도 (`in`/`out`/`inout` × `practical`/`bold`) + `spring` |
| **Cloudscape** | **5** | **표현** (`responsive` · `sticky` · `expressive` + 컴포넌트 2) |
| Tailwind | 3 | CSS 표준 (`in` · `out` · `in-out`) |
| **Codex** | 2 | **주체** (`system` · `user`) |
| Nord · Orbit · Backpack | 0 | `ease` 리터럴 또는 없음 (Backpack은 `ease-in-out` 리터럴 본류로 확정 — 2026-08-18, `systems/backpack.md`. Orbit도 부재 확정 — Tailwind 기본 `ease-in-out` 단일 수렴, 2026-08-18, `systems/orbit.md`) |

### Canvas — 2계열 × 3성격

| | standard | acceleration | deceleration |
|---|---|---|---|
| **quick** | `cubic-bezier(0.2, 0, 0.2, 1)` | `cubic-bezier(0.4, 0, 0.95, 0.8)` | `cubic-bezier(0.05, 0.4, 0.3, 1)` |
| **purposeful** | `cubic-bezier(0.35, 0, 0.05, 1)` | `cubic-bezier(0.4, 0, 0.8, 0.3)` | `cubic-bezier(0, 0.4, 0.2, 1)` |

**원시 토큰(`base-easing-a-*` / `b-*`)과 시맨틱 토큰(`sys-motion-easing-*`)이 분리돼 있습니다.**
`a` 계열이 `quick`, `b` 계열이 `purposeful`입니다 —
컬러의 `scale/` + `semantic/` 2계층과 같은 구조입니다.

**표본에서 이징에 시맨틱 계층을 둔 것은 Canvas뿐입니다.**

### Atlassian — 방향 × 강도

| 토큰 | 값 |
|------|-----|
| `motion.easing.in.practical` | `cubic-bezier(0.6, 0, 0.8, 0.6)` |
| `motion.easing.out.practical` | `cubic-bezier(0.4, 1, 0.6, 1)` |
| `motion.easing.inout.bold` | `cubic-bezier(0.4, 0, 0, 1)` |
| `motion.easing.out.bold` | `cubic-bezier(0, 0.4, 0, 1)` |
| **`motion.easing.spring`** | **`linear()` 65 정지점** |

**조합이 불완전합니다.** `in.bold` · `inout.practical`이 없습니다 —
방향 3종 × 강도 2종 = 6개가 아니라 4개만 있습니다.
**실제로 쓰이는 조합만 토큰화한 형태입니다.**

#### `spring`을 `linear()`로 근사합니다

```css
motion.easing.spring = linear(
  0, 0.021, 0.058, 0.107, 0.164, 0.227, 0.292, 0.359, 0.425, 0.49,
  … , 1.024, 1.024, 1.024, 1.024, 1.023, … , 0.999, 0.999, 1
)
```

**정지점 65개.** `cubic-bezier()`로는 표현할 수 없는 오버슈트를 담습니다.

| 구간 | 값 |
|------|-----|
| 최대 오버슈트 | **1.024** (24번째 정지점 부근, 4개 연속 유지) |
| 언더슈트 | **0.999** (막판 4개 정지점) |
| 종료 | 1 |

**오버슈트 2.4% 후 0.1% 언더슈트하고 끝납니다.**

쓰이는 곳은 **`motion.avatar.hovered` 한 곳**입니다 (250ms, `transform`).
토큰 하나를 위해 65개 정지점을 정의했습니다.

#### 스프링 표현 — 표본 3방식

> 초기에는 "`linear()` 스프링은 Atlassian뿐"으로 기록했으나, Open Props(5단계)와
> TDS(물리 파라미터)가 들어오며 **3방식**이 됐습니다.

| 방식 | 시스템 | 성격 |
|------|--------|------|
| `linear()` 65 정지점 × 1개 | Atlassian | 곡선 하나를 미리 계산해 CSS에 고정 |
| `linear()` 다단 × 5단계 (`--ease-spring-1~5`) | Open Props | 〃 강도별 5벌 |
| **물리 파라미터 8프리셋** (`stiffness`/`damping`/`mass`) | **TDS(Toss)** | **런타임 계산** — `getSpringEasing` 함수 동봉 |

TDS는 `basic {200/30}`부터 `rapid {1000/55}` · `bounce {300/15}`까지
**강성 70~1000, 감쇠 15~55**를 프리셋으로 둡니다 (`systems/toss-tds.md`).
CSS 진영(Atlassian·Open Props)은 곡선을 **미리 계산해 박제**하고,
JS 진영(TDS)은 **물리값을 배포해 런타임에 풉니다** — 같은 스프링을 놓고
배포 층위가 갈린 사례입니다.

#### 베지어 오버슈트 순위

| 시스템 | 곡선 | 오버슈트 |
|--------|------|:---:|
| **Spindle** | `ease-out-bounce (0.55, 2.05, 0.65, 0.75)` | **y2 = 2.05** |
| TDS | `back (0.34, 1.56, 0.64, 1)` | y2 = 1.56 |
| Atlassian | `spring` linear() 최대값 | 1.024 |

**Spindle(Ameba)의 2.05가 표본 최대입니다.** Atlassian은 스프링을 정밀 근사해
2.4% 오버슈트에 그치는 반면, 베지어 진영은 제어점을 크게 띄워 탄성을 만듭니다.
Spindle은 여기에 **View Transitions API 페이지 전환 토큰**(표본 유일)을
얹습니다 — `systems/spindle.md`.

### Cloudscape — 표현으로 명명합니다

| 토큰 | 값 | `$description` (패키지에 포함) |
|------|-----|------|
| `motion-easing-responsive` | `cubic-bezier(0, 0, 0, 1)` | "반응적이면서 부드러운 시각 피드백" |
| `motion-easing-sticky` | `cubic-bezier(1, 0, 0.83, 1)` | "요소를 특정 상태에 붙이는" |
| `motion-easing-expressive` | `cubic-bezier(0.84, 0, 0.16, 1)` | "표현적으로 주의를 끄는" |

**`sticky`의 `cubic-bezier(1, 0, 0.83, 1)`는 시작이 극단적으로 느립니다** (x1=1).
`responsive`는 `cubic-bezier(0, 0, 0, 1)`로 시작이 극단적으로 빠릅니다 (x1=0).
**두 값이 정반대입니다.**

**Cloudscape는 모든 토큰에 `$description`을 붙입니다.** 표본에서 토큰 설명을
패키지에 포함하는 사례는 Cloudscape와 Pajamas뿐입니다.

### Codex — 주체로 나눕니다

| 토큰 | 값 |
|------|-----|
| `transition-timing-function-system` | `ease` |
| `transition-timing-function-user` | **`ease-out`** |

**시스템이 시작한 모션과 사용자가 시작한 모션을 다른 이징으로 처리합니다.**
사용자 입력에 대한 반응은 `ease-out`(빠르게 시작), 시스템 자동 변화는 `ease`입니다.

표본에서 **모션의 주체(agency)를 축으로 삼은 것은 Codex뿐입니다.**

## 전환 속성을 토큰화하는 시스템 — 2개

애니메이션할 CSS 속성 목록 자체를 토큰으로 둡니다.

### Codex

| 토큰 | 속성 |
|------|------|
| `transition-property-base` | `background-color, color, border-color, box-shadow` |
| `transition-property-fade` | `opacity` |
| `transition-property-icon` | `color` |
| `transition-property-icon-css-only` | `background-color` |
| **`transition-property-toast`** | **`opacity, transform`** |
| **`transition-property-toggle-switch-grip`** | **`background-color, border-color, transform`** |

**컴포넌트별 속성 목록이 토큰입니다.** `toast` · `toggle-switch-grip`이 이름에 들어 있습니다.

### Atlassian — 복합 토큰의 `properties` 필드

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

**둘 다 `transition: all`을 피하려는 구조입니다.**
`all`은 레이아웃 속성까지 애니메이션해 성능 문제를 만듭니다.

**shadcn/ui도 같은 판단을 클래스로 합니다** — `transition-[color,box-shadow]`.
토큰은 아니지만 속성을 명시합니다. Button만 `transition-all`입니다.

| 시스템 | 방식 |
|--------|------|
| Codex | 속성 목록이 **토큰** |
| Atlassian | 복합 토큰의 **필드** |
| shadcn/ui | Tailwind **클래스** (`transition-[color,box-shadow]`) |
| Mantine | 컴포넌트 CSS의 `transition-property` |

## 키프레임 — 3개 시스템이 토큰화합니다

| 시스템 | 개수 | 명명 |
|--------|:---:|------|
| **Atlassian** | **16** | **값이 이름에** (`ScaleIn80to100`) |
| Cloudscape | 4 | 해시 접미사 (`awsui-fade-in-35003c`) |
| Tailwind | 4 | 표준 애니메이션 (`spin`·`ping`·`pulse`·`bounce`) |

### Atlassian — 값이 이름에 들어 있습니다

| 계열 | 토큰 이름 → CSS 키프레임 |
|------|------|
| 페이드 | `fade.in` → **`FadeIn0to100`** |
| 스케일 (중) | `scale.in.medium` → **`ScaleIn80to100`** |
| 스케일 (소) | `scale.in.small` → **`ScaleIn95to100`** |
| 슬라이드 (짧음) | `slide.in.top.short` → **`SlideInTop8px`** |
| 슬라이드 (절반) | `slide.in.left.half` → **`SlideIn50PercentLeft`** |

**토큰 이름은 추상적이고(`small`/`medium`/`short`/`half`)
CSS 키프레임 이름은 구체적입니다(`95to100`/`8px`/`50Percent`).**
두 층이 분리돼 있어, 값이 바뀌어도 토큰 이름은 유지됩니다.

#### 진입과 퇴장의 이동량이 다릅니다

| 방향 | 키프레임 | 이동량 |
|------|----------|:---:|
| 진입 | `SlideIn50PercentLeft` | **50%** |
| 퇴장 | `SlideOut15PercentLeft` | **15%** |

**들어올 때 더 멀리서 옵니다.** 나갈 때는 짧게 빠집니다.
`slide.out.left.half`라는 토큰 이름이 실제로는 15%를 가리킵니다 —
**이름(`half`)과 값(15%)이 어긋나는 유일한 자리입니다.**

#### 토큰 없이 쓰이는 키프레임이 6개 있습니다

컴포넌트 토큰에서 참조되지만 `motion.keyframe.*` 토큰이 없는 것:

```
ScaleXIn80to100 · ScaleXOut100to0            (label 전용, X축만)
SlideIn100PercentLeft / Right                (panel · sidenav)
SlideOut100PercentLeft / Right
```

**`ScaleXOut100to0`은 X축을 0까지 줄입니다** — 완전히 사라집니다.
`ScaleOut100to80`(80까지)과 다릅니다. label(태그 칩)이 가로로 접히는 동작입니다.

**100% 슬라이드가 토큰이 아닙니다.** 패널·사이드내비의 전체 폭 이동인데
`slide.*.half`(50%)와 `slide.*.short`(8px)만 토큰이고 100%는 없습니다.

### Cloudscape — 키프레임 본문 실측 (2026-08-18)

`motion-keyframes-*` 4개의 본문을 `@cloudscape-design/components@3.0.1348`
`internal/base-component/styles.scoped.css`에서 확보했습니다
(토큰 값의 해시 접미사 이름이 여기 정의돼 있습니다):

| 키프레임 | 본문 |
|----------|------|
| `awsui-fade-in` | `opacity 0 → 1` |
| `awsui-fade-out` | `opacity 1 → 0` |
| `awsui-scale-popup` | `scale 0.95 → 1` |
| **`awsui-status-icon-error`** | **`translateX -5px → +5px → 0`** (흔들기) |

- **scale-popup의 0.95가 표본 다수값과 일치합니다** — Atlassian
  `ScaleIn95to100` · shadcn/ui `zoom-in-95`와 같은 값입니다.
  fade 2종도 범용 페이드라 특이점이 없습니다
- **status-icon-error만 복합입니다** — 에러 아이콘 등장 시 좌우 1회
  흔들기이며, **구간마다 이징이 다릅니다**: 전반(−5→+5)은 `linear`,
  후반(+5→0)은 `--motion-easing-refresh-only-a`(`cubic-bezier(0,0,0,1)`,
  급감속)로 되돌아옵니다. 키프레임 안에
  `animation-timing-function`을 바꿔 넣는 표본 유일 사례입니다

## 컴포넌트별 모션 — Atlassian만 있습니다

**39개 컴포넌트 토큰**(전체 68개 중)이 복합 객체로 정의됩니다.

```js
motion.modal.enter = {
  duration: 250,
  curve: 'cubic-bezier(0.4, 0, 0, 1)',      // inout.bold
  keyframes: ['ScaleIn95to100'],
  fill: 'backwards',
}
```

대상 11종: `avatar` · `blanket` · `button` · `flag` · `label` · `listitem` ·
`modal` · `panel` · `popup` · `sidenav` · `spotlight`.

### 진입 대 퇴장 — 퇴장이 짧습니다

| 컴포넌트 | 진입 | 퇴장 | 차이 |
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
| **`panel.content`** | **150** (+ delay 100) | **50** | **-100** |

**10개 쌍 중 9개가 정확히 50ms 차이입니다.**
`panel.content`만 100ms 차이이며, 진입에 `delay: 100`이 붙어 있습니다.

> **정정.** `systems/atlassian.md`와 `button.md`에 처음 "9개 컴포넌트 전부 50ms 짧습니다,
> 예외 없습니다"라고 적었습니다. `panel.content`를 빠뜨렸습니다 —
> 이 쌍은 150ms 대 50ms로 **100ms 차이**입니다. 위 표가 정확합니다.

**진입 지속시간은 150 또는 250ms 둘 중 하나입니다.**

| 150ms (빠름) | 250ms (느림) |
|---|---|
| `avatar` · `label` · `popup` · `panel.content` | `blanket` · `flag` · `modal` · `panel` · `sidenav` · `spotlight` |

**작고 부수적인 요소가 150ms, 화면을 덮거나 큰 영역을 차지하는 것이 250ms입니다.**

### `panel.content`의 지연 — 순차 등장

```js
motion.panel.enter.right      = { duration: 250, keyframes: ['SlideIn100PercentRight'] }
motion.panel.content.enter    = { duration: 150, delay: 100, keyframes: ['FadeIn0to100'] }
```

**패널이 슬라이드하는 중(100ms 지점)에 내용이 페이드인을 시작해
250ms에 함께 끝납니다.** 컨테이너와 내용의 타이밍을 토큰으로 맞춘 형태입니다.

퇴장은 반대로 내용이 먼저 사라집니다 — `content.exit` 50ms 대 `panel.exit` 200ms.

**표본에서 `delay`를 토큰에 담은 것은 Atlassian뿐입니다.**

### 이징 배정 — 규칙이 있습니다

| 이징 | 쓰이는 곳 |
|------|-----------|
| **`out.practical`** | `avatar.enter` · `button.*` · `label.enter` · `listitem.*` · `panel.content.*` · `popup.enter.*` |
| **`in.practical`** | `avatar.exit` · `blanket.exit` · `flag.exit` · `label.exit` · `modal.exit` · `popup.exit.*` · `sidenav.exit.*` · `spotlight.exit` |
| `inout.bold` | `blanket.enter` · `modal.enter` · `spotlight.enter` · `flag.reposition` |
| **`out.bold`** | `flag.enter` · **`panel.enter.*` · `panel.exit.*`** · `sidenav.enter.*` |
| `spring` | `avatar.hovered` |

**진입은 `out`, 퇴장은 `in` 계열이 기본입니다** — 감속으로 들어오고 가속으로 나갑니다.

**예외가 둘 있습니다.**

1. **`panel.exit.*`가 `out.bold`입니다** — 유일하게 `out` 이징으로 퇴장하는 컴포넌트입니다
2. **`panel.content.exit`가 `out.practical`입니다** — 같은 이유로 예외입니다

**`bold` 계열은 큰 영역에만 쓰입니다** — blanket · modal · spotlight · panel · sidenav · flag.
버튼·목록 항목 같은 작은 요소는 전부 `practical`입니다.

### 상태 전환 — 시간이 컴포넌트마다 다릅니다

| 토큰 | 지속시간 | 전환 속성 수 |
|------|:---:|:---:|
| **`listitem.hovered`** | **50ms** | 4 |
| `listitem.pressed` | 100ms | 4 |
| `listitem.selected` | 100ms | 4 |
| `button.hovered` | 150ms | 2 |
| `button.pressed` | 150ms | 2 |
| `avatar.hovered` | 250ms (`spring`) | 1 (`transform`) |

**목록 항목 hover가 버튼 hover의 3분의 1입니다** (50 vs 150ms).
**같은 `listitem`에서도 hover(50)와 pressed(100)가 다릅니다.**

**아바타 hover가 250ms로 가장 깁니다** — 유일하게 `spring` 이징이고
`transform`만 전환합니다. 색이 아니라 크기가 움직입니다.

### `fill` — 진입/퇴장이 일관됩니다

| 방향 | `fill` |
|------|--------|
| 진입 | `backwards` |
| 퇴장 | `forwards` |

**예외 없습니다.** 진입 전에는 첫 프레임 상태를 유지하고,
퇴장 후에는 마지막 프레임 상태를 유지합니다.

**표본에서 `animation-fill-mode`를 토큰에 담은 것은 Atlassian뿐입니다.**

## 접근성 — `prefers-reduced-motion`

| 시스템 | 처리 |
|--------|------|
| **Cloudscape** | **토큰에 `disabled` 모드.** 모든 `motion-duration-*`가 `0ms` |
| Atlassian | `motion.duration.instant: 0ms` 토큰만 제공 |
| GitLab (Pajamas) | `window.matchMedia('(prefers-reduced-motion)')` 런타임 검사 |
| **Mantine** | **이중 옵트인** — `data-respect-reduced-motion`(기본 꺼짐) + `data-reduce-motion` (아래 Mantine 절) |
| **Helios** | 미디어 쿼리로 SideNav 지속시간 변수를 0으로 (컴포넌트 CSS) |
| 나머지 | 미확인 |

### Cloudscape — 값이 두 벌입니다

```json
"motion-duration-responsive": {
  "$value": { "default": "115ms", "disabled": "0ms" },
  "$description": "The duration for making the motion feel quick and responsive."
}
```

**6개 `motion-duration-*` 토큰 전부에 `disabled: 0ms`가 있습니다.**
이징과 키프레임은 값이 같습니다 — **지속시간만 0으로 만듭니다.**

`scaled`/`static` 두 벌의 스페이싱 토큰을 두는 것과 같은 구조입니다
(`tokens/scales.md`) — **Cloudscape는 모드를 토큰 값의 축으로 삼습니다.**

**표본에서 접근성 대응을 토큰 레벨에 넣은 것은 Cloudscape뿐입니다.**
나머지는 구현이 미디어 쿼리로 처리해야 합니다.

## 반복 애니메이션

| 시스템 | 토큰 |
|--------|------|
| **Tailwind** | `spin` 1s linear · `ping` 1s · `pulse` 2s · `bounce` 1s |
| **Codex** | `animation-duration-fast/medium/slow` 1000 · 1600 · 2000ms + `iteration-count-base: infinite` |
| **Cloudscape** | `avatar-loading-dots` 1200ms · `avatar-gen-ai-gradient` 3600ms |

### Codex — 음수 지연으로 위상을 어긋냅니다

| 토큰 | 값 |
|------|-----|
| `animation-delay-none` | 0ms |
| **`animation-delay-medium`** | **-160ms** |
| **`animation-delay-slow`** | **-320ms** |

**음수 `animation-delay`는 애니메이션을 중간 지점에서 시작시킵니다.**
스피너의 점 세 개에 0 / -160 / -320ms를 주면 위상이 어긋나 순차 동작이 됩니다.

**표본에서 음수 지연을 토큰화한 것은 Codex뿐입니다.**
`-160`과 `-320`이 정확히 2배 관계이고, `animation-duration-medium`(1600ms)의
10분의 1과 5분의 1입니다.

### Tailwind — 이징이 애니메이션 정의에 들어 있습니다

```css
--animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
--animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
--animate-bounce: bounce 1s infinite;
```

**`--ease-*` 토큰을 참조하지 않고 값을 직접 씁니다.**
`ping`의 `cubic-bezier(0, 0, 0.2, 1)`는 `--ease-out`과 같은 값인데 재사용하지 않습니다.

`pulse`의 `cubic-bezier(0.4, 0, 0.6, 1)`는 `--ease-*` 3개 어디에도 없는 값입니다.

`bounce`는 키프레임 안에서 `animation-timing-function`을 바꿉니다 —
`cubic-bezier(0.8, 0, 1, 1)` ↔ `cubic-bezier(0, 0, 0.2, 1)`.

## 토큰이 없는 시스템 — 값은 있습니다

### Radix Themes

CSS에 리터럴로 박혀 있습니다.

| 값 | 쓰이는 곳 |
|:---:|-----------|
| 30 · 40ms | 미세 전환 |
| 100ms | `background-color` |
| **120ms** | `box-shadow` · `transform` |
| **140ms** | `transform` + `box-shadow` (`cubic-bezier(0.45, 0.05, 0.55, 0.95)`) |
| 160ms | 애니메이션 |
| 800ms · 5s | Skeleton · Progress |

**`transition-duration: 120ms, 140ms, 140ms, 140ms`** 처럼 속성별로 다른 값을 나열합니다.
첫 속성만 120ms입니다.

키프레임은 `rt-slide-from-top` 등이며 **이동량이 4px + `scale(0.97)`**입니다 —
Atlassian(8px + `scale 0.95`)의 절반입니다.

| 시스템 | 팝업 진입 이동 | 스케일 |
|--------|:---:|:---:|
| **Radix Themes** | **4px** | **0.97** |
| Atlassian | 8px | 0.95 |
| shadcn/ui | 8px (`slide-in-from-top-2`) | 0.95 (`zoom-in-95`) |

**shadcn/ui가 Atlassian과 같습니다** — 8px / 95%.
Radix Themes만 절반입니다. shadcn/ui는 Radix Primitives를 쓰지만
**Radix Themes의 모션 값을 따르지 않습니다.**

### shadcn/ui

| 값 | 쓰이는 곳 |
|:---:|-----------|
| **200ms** | Dialog (`duration-200`) |
| 명시 없음 | 나머지 (Tailwind 기본값 150ms) |

전환 속성을 클래스로 명시합니다 — `transition-[color,box-shadow]`(3곳) ·
`transition-shadow` · `transition-opacity` · `transition-colors` · `transition-all`(Button).

**Button만 `transition-all`입니다.** 다른 컴포넌트는 속성을 좁힙니다.

### Mantine

| 값 | 쓰이는 곳 |
|:---:|-----------|
| 100ms | `border-color` · `color` |
| 150ms | `background-color` |
| 200ms | 일부 컴포넌트 |
| 300ms | Burger (기본값) |
| **0ms !important** | **AppShell `[data-resizing]`** — 접근성 아님 (아래) |

**컴포넌트마다 CSS 변수를 따로 둡니다** —
`--app-shell-transition-duration` · `--burger-transition-duration` ·
`--sc-transition-duration` · `--progress-transition-duration`.

**전역 모션 토큰이 없고 컴포넌트별 변수만 있습니다.**
Atlassian의 컴포넌트별 토큰과 겉보기는 비슷하지만,
**중앙에 원시 지속시간 스케일이 없어 값이 컴포넌트마다 임의입니다.**

#### `0ms !important`의 셀렉터 — reduced-motion이 아니었습니다 (2026-08-18)

`@mantine/core@9.5.1` `styles/AppShell.css` 확인:

```css
.m_89ab340[data-resizing] {
  --app-shell-transition-duration: 0ms !important;
}
```

**드래그로 사이드바 폭을 조절하는 동안 전환을 끄는 장치**입니다 —
리사이즈 중 애니메이션이 커서를 따라오지 못하는 문제의 해법이며,
접근성과 무관합니다. 실제 reduced-motion 처리는 `global.css`에 따로 있습니다:

```css
@media (prefers-reduced-motion: reduce) {
  [data-respect-reduced-motion] [data-reduce-motion] {
    transition: none;
    animation: none;
  }
}
```

**이중 옵트인**입니다 — 루트에 `data-respect-reduced-motion`을 켜고
(테마 설정 `respectReducedMotion`, 기본 꺼짐) 개별 요소에
`data-reduce-motion`이 있어야 작동합니다. **기본 상태에서는 OS 설정을
무시합니다** — Cloudscape(토큰 두 벌)·Radix Themes(미디어 쿼리 감싸기)와
달리 사용하는 쪽이 명시적으로 켜야 하는 구조입니다.

## Helios — 모션 토큰은 있지만 전부 컴포넌트 전용입니다 (2026-08-18)

`@hashicorp/design-system-tokens@5.1.0`(`dist/products/css/tokens.css`)과
`@hashicorp/design-system-components@6.5.0` CSS를 대조했습니다.

**답: 0.2s·0.6s·베지어 3종은 토큰이 맞습니다 — 단 컴포넌트 스코프 토큰입니다.**
토큰 패키지의 모션 관련 선언은 다음 6개가 전부입니다:

| 토큰 | 값 |
|------|-----|
| `--token-form-radiocard-transition-duration` | 0.2s |
| `--token-form-toggle-transition-duration` | 0.2s |
| `--token-form-toggle-transition-timing-function` | `cubic-bezier(0.68, -0.2, 0.265, 1.15)` (오버슈트) |
| `--token-tabs-indicator-transition-duration` | **0.6s** |
| `--token-tabs-indicator-transition-function` | `cubic-bezier(0.5, 1, 0.89, 1)` (감속) |
| `--token-tooltip-transition-function` | `cubic-bezier(0.54, 1.5, 0.38, 1.11)` (강한 오버슈트) |

- **전역 지속시간·이징 스케일이 없습니다** — `duration-*`·`easing-*` 계열 0건.
  Mantine(토큰 없음, 컴포넌트 변수만)과 Atlassian(전역 8단계 + 컴포넌트 68토큰)
  사이의 중간형: **토큰 파이프라인은 있는데 원시 층 없이 컴포넌트 층만** 있습니다
- 컴포넌트 패키지에는 토큰을 참조하지 않는 리터럴이 다수 병존합니다 —
  `0.3s`(아코디언 셰브론 등) · `0.25s ease-in-out`(사이드바 폭) ·
  `text-decoration-color 0.25s ease-in`(링크) 등. **같은 패키지 안에서
  토큰 참조와 리터럴이 섞여 있어**, 값의 절반은 재정의 불가능합니다
- SideNav만 자체 CSS 변수 세트를 둡니다 — `--hds-app-side-nav-animation-duration:
  200ms` · `easing: cubic-bezier(0.65, 0, 0.35, 1)`, 그리고
  `@media (prefers-reduced-motion)`에서 지속시간을 0으로 만듭니다 —
  패키지에서 유일한 reduced-motion 처리입니다
- 이징 3종이 전부 다르고 2종이 오버슈트(>1 항 포함)입니다 — 토글 썸과
  툴팁이 튀어오르는 성격, 탭 인디케이터만 순수 감속

## Material 3 — 이징 10종 + 스프링 2세트 (androidx 소스)

`m3.material.io`가 차단이라 미확인이던 세트를 **androidx 저장소의 생성 코드**
(`compose/material3/…/tokens/MotionTokens.kt`, sparse-clone — `HARVESTING.md`)에서
확보했습니다.

### 이징 — 3계열 × (기본·가속·감속) + linear

| 계열 | 기본 | 가속(퇴장) | 감속(진입) |
|------|------|------|------|
| **Emphasized** | `(0.2, 0, 0, 1)` | `(0.3, 0, 0.8, 0.15)` | `(0.05, 0.7, 0.1, 1)` |
| **Standard** | `(0.2, 0, 0, 1)` | `(0.3, 0, 1, 1)` | `(0, 0, 0, 1)` |
| Legacy (M2) | `(0.4, 0, 0.2, 1)` | `(0.4, 0, 1, 1)` | `(0, 0, 0.2, 1)` |

- **Emphasized 기본과 Standard 기본이 같은 곡선입니다** `(0.2, 0, 0, 1)` —
  두 계열의 차이는 가속·감속 변형에만 있습니다. Emphasized 감속
  `(0.05, 0.7, 0.1, 1)`은 y1=0.7로 시작하자마자 70%를 이동하는 급감속 곡선.
- **Legacy가 Tailwind/Material 2의 `(0.4, 0, 0.2, 1)`** — shadcn/ui가 쓰는
  Tailwind 기본 이징의 출처가 여기임이 값으로 확인됩니다.
- Atlassian `inout.bold (0.4, 0, 0, 1)`와 M3 Standard `(0.2, 0, 0, 1)`는
  다른 곡선입니다 — **"끝에서 완전 정지(x2=0)" 형태만 공유**합니다.

### 지속시간 — 4계열 × 4단계 = 16토큰

```
Short   50 · 100 · 150 · 200
Medium 250 · 300 · 350 · 400
Long   450 · 500 · 550 · 600
ExtraLong 700 · 800 · 900 · 1000
```

50ms 등차(Short~Long) 후 100ms 등차(ExtraLong) — **코퍼스 최다 단계(16)**입니다.
비교: Atlassian 3단계, Cloudscape 6단계, Canvas 5단계.

### M3 Expressive — 이징이 아니라 스프링으로 이행

최신 스킴 토큰(`ExpressiveMotionTokens.kt` · `StandardMotionTokens.kt`)은
베지어가 아니라 **스프링 파라미터**입니다. `Spatial`(위치)과 `Effects`(색·투명도)
를 분리합니다:

| 세트 | 축 | Default | Fast | Slow |
|------|----|---------|------|------|
| Expressive | Spatial (damping/stiffness) | 0.8 / 380 | **0.6 / 800** | 0.8 / 200 |
| Standard | Spatial | 0.9 / 700 | 0.9 / 1400 | 0.9 / 300 |
| 둘 다 | Effects | 1.0 / 1600 | 1.0 / 3800 | 1.0 / 800 |

- **Effects는 damping 1.0(무진동)으로 두 세트가 동일**합니다 — 색·투명도는
  절대 튕기지 않고, 위치만 세트에 따라 튕깁니다(Expressive Fast damping 0.6).
- Apple(산문) → 값 없음, Ant Design(베지어 근사) → `linear()` 폴리라인,
  M3 → damping/stiffness 원값. **스프링 표현 3방식 표본이 완성**됐습니다
  (위 "스프링 표현 — 표본 3방식"과 교차).

### Material Web dialog — 다층 오케스트레이션 실측 (2026-08-18)

`@material/web` 2.5.0 `dialog/internal/animations.js`의
`DIALOG_DEFAULT_OPEN/CLOSE_ANIMATION` 실값입니다. 모달 하나에
**5개 레이어가 각자 다른 타이밍**으로 움직입니다:

| 레이어 | 진입 | 퇴장 |
|--------|------|------|
| dialog 본체 | translateY(-50→0px) · 500ms · Emphasized | translateY(0→-50px) · **150ms** · EmphasizedAccelerate |
| scrim | opacity 0→**0.32** · 500ms · linear | 0.32→0 · 150ms |
| container | height 35→100% · 500ms + opacity 50ms | height 100→35% · 150ms |
| headline·content | opacity 0→1 · 250ms (offset 0.2) | opacity 1→0 · 100ms |
| actions | opacity 0→1 · 300ms (offset 0.5) | 같음 |

- **진입 500 / 퇴장 150ms — 코퍼스 최대 비대칭(3.3배)**입니다.
  웹 표본(진입의 절반~같음)과 완전히 다른 자릿수.
- 콘텐츠가 오버레이보다 먼저 사라지는 규칙(100 vs 150ms)은
  Radix Themes와 같습니다 (`modal.md` 교차).
- scrim 목표 0.32는 androidx `ScrimTokens.kt`의 ContainerOpacity와 일치 —
  독립 채널 교차 검증.
- 소스 주석이 밝히는 타협 2건: container 성장은 스펙상 0→100%이나
  클리핑 단순화로 35%→100%, `EMPHASIZED = (.3, 0, 0, 1)`은
  **"정확도 불명의 근사"**라고 명시돼 있습니다 (androidx 원값은 `(0.2, 0, 0, 1)`).

## 판단 지침 — 언제 넣고 언제 빼는가 (문서 층 실측, 2026-08-18)

5개 시스템(M3 · Carbon · Spectrum · Atlassian · Cloudscape)의 모션
원칙 페이지를 직접 읽었습니다. **다섯 시스템이 각자 다른 언어로 같은
방향을 가리킵니다 — "기본은 빼고, 이유가 있을 때만 넣어라."**

- **Atlassian이 판단 테스트를 명문화합니다** — *"Before adding motion ask,
  if I remove this, does the user lose information or context?"* 잃는 게
  없으면 넣지 않습니다. 추가 규칙: 대기시간만 늘리면 제거 · 동시 다중
  애니메이션 금지 · **하루 수십 번 트리거되는 인터랙션은 150ms 미만.**
- **Carbon은 이원 체계로 "언제"를 정합니다** — productive(과업 집중:
  버튼 상태·드롭다운·테이블)와 expressive(**"occasional, important
  moments"에 예약**: 새 페이지·주 액션·알림 등장). 바운스·스트레치·급정지
  이징 금지("IBM motion is essential and efficient").
- **M3는 스킴 선택 + 빼는 경우를 명시합니다** — Expressive가 기본
  권고("hero moments and key interactions"), Standard는 유틸리티 제품용.
  **"순수 효율이 최우선이면 점프컷(무애니메이션)이 낫다"**(생산성 앱 메뉴) —
  애니메이션 생략을 규정한 유일 표본. Container transform은 히어로
  모먼트·얕은 계층에 예약, 깊은 계층 내비에는 "excessive".
- **Spectrum은 상한을 원칙화합니다** — *"just enough to get the intention
  across and no more"*. 목적(연결·주의·피드백) 없는 애니메이션 배제,
  텍스트 문단 옆 애니메이션 금지, 애니메이션 가이드 준수를 위한 커스텀
  컴포넌트 제작 금지(네이티브 우선).
- **Cloudscape는 접근성 제약을 같이 묶습니다** — 목적적·절제적 사용 +
  `prefers-reduced-motion` 존중 + 초당 3회 초과 플래시 금지 +
  **모션에만 의존한 정보 전달 금지.**
- 공통 감속 모드 규정: M3 "강한 슬라이드·스케일 대신 미세한 페이드,
  패럴랙스·셰이프 모핑 같은 장식 효과 비활성" — 위 "접근성" 절의
  토큰 레벨 처리(Cloudscape `disabled: 0ms`)와 짝이 되는 문서 층 규정.

## 아직 못 채운 것

- ~~언제 애니메이션을 넣는가~~ → **해소 (2026-08-18)** — 위 "판단 지침" 절
- ~~Apple·Material 3 모션~~ — **M3 쪽 해소** (위 절). Apple은 HIG motion
  페이지에도 수치가 없음을 확인 — 수치는 SwiftUI API 층에 있는 구조
- ~~Material Web dialog 애니메이션~~ → **해소 (2026-08-18)** —
  위 "Material Web dialog — 다층 오케스트레이션 실측" 절 (`@material/web` 2.5.0)
- ~~Helios 모션~~ → **해소 (2026-08-18)** — **컴포넌트 스코프 토큰**으로 확정
  (`design-system-tokens@5.1.0` 6선언 전수 + `components@6.5.0` 대조,
  전역 스케일 부재·리터럴 병존 확인). 위 "Helios" 절
- ~~Mantine의 `0ms !important`~~ → **해소 (2026-08-18) — reduced-motion이
  아님.** AppShell `[data-resizing]`(리사이즈 중 전환 차단)이고, 접근성은
  `global.css`의 이중 옵트인 별도 처리 (9.5.1). 위 Mantine 절
- ~~Cloudscape `motion-keyframes-*` 4개의 실제 키프레임 정의~~ →
  **해소 (2026-08-18)** — fade 2종 · scale 0.95 · 에러 아이콘 흔들기
  (`components@3.0.1348`). 위 "키프레임 본문 실측" 절
- ~~**Backpack 이징** — 지속시간 3단계만 있고 이징 토큰을 찾지 못했습니다~~ →
  **해소 (2026-08-18) — 토큰 부재 확정.** `bpk-foundations-web@24.7.0` 전 파일에서
  `easing`/`cubic-bezier` 0건. 컴포넌트 층(`@skyscanner/backpack-web@43.19.0`)은
  `ease-in-out` 리터럴이 본류(200ms 42회·400ms 13회)이고, 신규 컴포넌트
  (chat 계열·ModalV3)에만 손글씨 cubic-bezier 3종이 유입 중입니다 —
  `(0.4,0,0.2,1)` Material 표준 · `(0.2,0,0,1)` M3 standard 일치 · `(0.5,0,0,1)` ModalV3.
  상세는 `systems/backpack.md` 심화 절
- ~~**Orbit 이징** — 같음~~ → **해소 (2026-08-18) — 토큰 부재 확정.**
  `@kiwicom/orbit-design-tokens@11.0.0` dist 전체에서 `easing`/`cubic-bezier`
  0건 (지속시간 3개뿐). `@kiwicom/orbit-tailwind-preset@7.4.0`도
  `transitionDuration`만 덮고 `transitionTimingFunction`은 Tailwind 기본값을
  방치. 컴포넌트 층(`@kiwicom/orbit-components@27.7.0`) 리터럴 분포는
  **`ease-in-out` 52회 · `ease-linear` 1회 · 그 외 0회** — 사실상 Tailwind
  기본 `ease-in-out` = `cubic-bezier(0.4, 0, 0.2, 1)`(Material 표준과 같은 값)
  단일 수렴입니다. 같은 무토큰이라도 Backpack은 손글씨 곡선 3종으로
  드리프트, Orbit은 프레임워크 기본값으로 수렴 — 두 갈래 결말.
  상세는 `systems/orbit.md` 심화 절
- ~~접근성 대응을 토큰 레벨에 넣은 것은 Cloudscape뿐~~ → **정정 (2026-08-18)** —
  최소 13개 시스템이 각기 다른 층에서 처리하고 방식이 6개 층으로 갈립니다.
  아래 재종합 절의 "reduced-motion" 항목

## 83표본 재종합 — 컴포넌트 실측 (2026-08-18)

`partial` 수집 심화로 모션 실측이 83개 시스템(컴포넌트 심화 73 + 토큰·문서 층 10)으로 늘어,
이 문서의 결론을 그 표본으로 재검증했습니다.
**머리말의 전제를 포함해 결론 일곱 개가 뒤집힙니다.**

### 모션 토큰 보유 — "가장 덜 토큰화된 축"이 아닙니다

> **정정.** 기존 "표본 34개 중 9개만 모션 토큰을 갖고 있습니다 — 모션은 토큰화가
> 가장 덜 된 축입니다"는 프레임워크 계열에 치우친 표본의 결과였습니다.
> **83표본에서는 지속시간 또는 이징을 이름 붙여 배포하는 시스템이 40개 이상**입니다.
> 무토큰 진영이 소수파이고, 그 안에서도 값 자체는 거의 다 존재합니다.

토큰화 깊이를 83표본으로 재배치하면 이렇습니다.

| 깊이 | 시스템 |
|:---:|--------|
| **0. 없음 — 리터럴만** | Radix Themes · Mantine · shadcn/ui · Apple · **Astro**(토큰 3계층 636개에 모션 0개) · **Pajamas**(단일 리터럴 53회) · **Semi**(전환 선언이 20,602줄 중 30회) · **Evergreen**(파일별 하드코딩) · **Grommet**(JS 상수 200, 테마 밖) · Ring UI · NYSDS · Vanilla · DSFR · Protocol · Origami · **Odyssey**(MUI `transitions` 미주입) |
| **1. 지속시간만** | **Orbit** 3(이징 부재 확정) · **Backpack** 3(이징 부재 확정) · **Pluralsight** 5(×100 등차) · **Intergalactic** 1(모달 전용, 단위 없는 `"200"`) · **KRDS** 1(전역 `.4s ease-in-out`) · **Bolt** 1(복합 1개) · **Yoga** 2(**무명 배열** `duration: [200, 500]`) |
| **2. 지속시간 + 이징** | Canvas · Tailwind · MUI · EUI · Cedar · Forma 36 · Thumbprint · Tegel · Kaizen · Clarity · eBay · Seed · Porsche · PIE · Park UI · Pharos · Stacks · Strapi · Nord(값에 이징 포함) · Braid · Base Web · Chakra · Naive UI · Vuetify · LeafyGreen · Shoelace · Spindle · HSDS · Material 3 |
| **3. + 키프레임 · 속성 목록** | Codex · Cloudscape · **Vitamin**(`animation` 쇼트핸드 전체가 토큰) · **Siemens iX**(CSS 변수 → JS가 `getComputedStyle`로 소비) |
| **4. 컴포넌트별 복합 토큰** | **Atlassian** 68개 · **Helios** 6개(**원시 층 없이 컴포넌트 층만**) |

**깊이 2가 압도적입니다.** 지속시간과 이징을 각각 이름 붙여 두고 컴포넌트가
조합해 쓰는 형태가 관행입니다. 깊이 0은 프레임워크 계열과 **모션을 의도적으로
배제한 시스템**(Astro — 관제 UI · Semi — 상태색 즉시 스왑)으로 갈립니다.

### 지속시간 — 3단계가 최빈, 명명 축이 다섯입니다

```
16~20단  Canvas 20(50ms 등차) · Material 3 16(4계열 × 4)
9~10단   eBay 10(프레임 격자) · Clarity 9
7~8단    Atlassian 8 · Tegel 7 · Park UI 7
6단      Cloudscape · Kaizen · Thumbprint · Seed · Cedar
5단      EUI · MUI · Pluralsight · Siemens iX
3단      Orbit · Backpack · Nord · Pharos · Forma 36 · Strapi        ← 최빈
1~2단    Codex 2(+반복 3) · Yoga 2 · Braid 2 · Tailwind 1 · Bolt 1 ·
         KRDS 1 · Intergalactic 1
```

| 명명 축 | 시스템 |
|---------|--------|
| 크기(fast/slow) | Orbit · Backpack · Pluralsight · Tegel · Thumbprint · EUI(`extraFast`~`extraSlow`) |
| **성격(체감)** | **Kaizen** `instant/immediate/rapid/fast/slow/deliberate` · **Clarity** `instant/quickest/quicker/quick/secondary/primary/slow/slower/slowest` |
| **프레임 격자** | **eBay** — 17/50/83/167/250/333/500/667/833/1000ms = **1/3/5/10/15/20/30/40/50/60프레임**. `instant`가 정확히 1프레임(17ms) |
| 숫자 등차 | Canvas(50ms×20) · Seed `d1`~`d6` · Cedar `1-x`~`6-x` · Material 3 |
| **무명 배열** | **Yoga** — `duration[1]` 식 인덱스 접근. 슬롯 용도가 소스에 없음 |

> **정정.** "Cloudscape만 5의 배수가 아닌 값을 씁니다"는 틀렸습니다.
> **eBay**(17/83/167/333/667/833 — 프레임 배수) · **MUI**(225/195/375) ·
> **Evergreen**(80/240) · **Semi**(90) · **Braid**(125/175) · **Strapi**(120/320) ·
> **Thumbprint**(75) · **Vuetify**(280) · **Kaizen**(**201** — Chrome/Blink 102.x의
> 불투명도 버그를 피하려 `rapid`(200) 대신 1ms 더한 리터럴. 소스에 Jira 번호 명기)이
> 전부 5의 배수 밖입니다. **eBay의 프레임 격자만 "왜 5의 배수가 아닌가"에 답을
> 가진 체계**입니다 — 기준이 ms가 아니라 프레임입니다.

> **정정.** `systems/nord.md`의 "전환 50ms — 표본 최속"도 유지되지 않습니다.
> **Shoelace도 50ms**(`--sl-transition-x-fast`)이고, **Canvas는 `hover:active`에서
> 120ms를 40ms로 단축**하며, **eBay `instant`는 17ms**입니다.

**`0ms` 토큰을 두는 곳이 6개로 늘었습니다** (기존 기록은 Atlassian·Cloudscape 둘) —
Kaizen `instant` · Tegel `instant` · Clarity `instant` · **Siemens iX `short`(폴백 0ms)**.
Siemens iX만 **"즉시"가 접근성용이 아니라 스케일의 1단**입니다.

### 이징 카탈로그 — 클수록 안 씁니다

| 시스템 | 배포 개수 | 실사용 |
|--------|:---:|--------|
| **Strapi** | **26종** (Penner 전 계열) | easeOutQuad · authenticMotion **2종 정도** |
| **HSDS** | Penner 전 세트 + 자체 3종(`bounce`·`boop`·`elastic`) | 모달이 `boop` |
| **Stacks** | 8종 (전부 Penner 상수와 일치) | **3종** — `back` 계열은 0회 |
| eBay | 7종 | — |
| Material 3 | 10종 + 스프링 2세트 | — |
| Kaizen | 6종 | — |
| Canvas · Atlassian · Cloudscape · Tegel | 5~6종 | — |
| PIE · MUI · Seed | 4종 | — |
| Porsche · Thumbprint · Park UI | 3종 | — |
| Cedar · EUI · Forma 36 · Codex | 2종 | — |

**Strapi의 26종은 검증되지 않은 카탈로그입니다** — `InOut` 7종(Sine·Quad·Cubic·
Quart·Quint·Expo·Circ)의 값이 `Out`과 **동일**합니다(Back만 진짜 InOut 값).
복붙 흔적이 dist에 그대로 남았고, 실제 지속시간 토큰은 3개(120/200/320ms)뿐입니다.

**이징 개수와 시스템 성숙도는 상관이 없습니다.** Atlassian은 컴포넌트 토큰이 68개인데
이징은 5종이고, 그나마 조합이 불완전합니다(`in.bold`·`inout.practical` 부재 —
실제로 쓰이는 조합만 토큰화).

**이름 붙이는 축이 둘 늘었습니다** — 기존 4축(방향×강도 Atlassian · 용도×성격 Canvas ·
표현 Cloudscape · 주체 Codex)에 **의성어(HSDS `boop`·`bounce`·`elastic`)**와
**브랜드명(Tegel `--tds-motion-easing-scania`)**이 추가됩니다.
Tegel의 곡선 자체는 `(0.4, 0, 0, 1)`로 M3 emphasized 계열입니다.

**이름과 값이 뒤집힌 사례가 둘 있습니다.** **Porsche**의 `ease-in`이 감속 곡선
(`(0, 0, 0.2, 1)` — Material easeOut 형태)이고 `ease-out`이 가속 곡선입니다.
"진입(in)에 쓰는 곡선"으로 이름을 붙인 결과입니다. **Base Web**은 시맨틱 리네이밍을
배포했는데 신명 4종의 사용이 0회이고 구명 `easeOutCurve`가 본류입니다.

### 오버슈트 — Spindle 2.05가 최대가 아닙니다

| 시스템 | 곡선 | 넘김 | 실사용 |
|--------|------|:---:|:---:|
| **HSDS `elastic`** | `(0.68, −1.5, 0.265, 2.5)` | **y₂ 2.5** (+ y₁ **−1.5** 언더슛) | 미확인 |
| Spindle `ease-out-bounce` | `(0.55, 2.05, 0.65, 0.75)` | y₁ 2.05 | — |
| **Bolt** | `(0.45, 1.8, 0.5, 0.75)` | y₁ 1.8 | **체크박스·라디오 진입** |
| HSDS `bounce` | `(0.68, −0.65, 0.265, 1.65)` | y₂ 1.65 (+ 언더슛) | — |
| **EUI `bounce`** | `(.34, 1.61, .7, 1)` | y₁ 1.61 | **모달 기본 진입** |
| TDS `back` | `(0.34, 1.56, 0.64, 1)` | y₁ 1.56 | — |
| **Braid `touchable`** | `(0.02, 1.505, 0.745, 1.235)` | y₁ 1.505 | **버튼 누름** |
| Clarity `easing-secondary` | `(0, 1.5, 0.5, 1)` | y₁ 1.5 | — |
| **Helios (툴팁)** | `(0.54, 1.5, 0.38, 1.11)` | y₁ 1.5 | **툴팁** |
| **Semi** | `(0, 0, 0.26, 1.38)` | y₂ 1.38 | **모달 진입** |
| eBay `bounce` | `(0.3, 0, 0, 1.25)` | y₂ 1.25 | — |
| **Kaizen `bounce-in`** | `(0.485, 0.155, 0.24, 1.245)` | y₂ 1.245 | **모달 진입** |
| **HSDS `boop`** | `(0.175, 0.885, 0.325, 1.2)` | y₂ 1.2 | **모달 진입** |
| **Helios (토글)** | `(0.68, −0.2, 0.265, 1.15)` | y₂ 1.15 | **토글 썸** |
| **Blueprint** | `(0.54, 1.12, 0.38, 1.11)` | y₁ 1.12 | **모달 진입** |
| Atlassian `spring` | `linear()` 65 정지점 | 1.024 | `avatar.hovered` |
| **Vapor** | `(.45, 1.005, 0, 1.005)` | 1.005 | **모달 진입** |

> **정정.** "Spindle(Ameba)의 2.05가 표본 최대입니다"는 틀렸습니다 —
> **HSDS `elastic`이 2.5**이고, **음수 제어점(언더슛)을 가진 것도 HSDS 두 곡선뿐**입니다.
> 다만 HSDS `elastic`의 실사용은 확인하지 못했습니다
> (Stacks의 `back` 계열 0회와 같은 카탈로그 문제).

> **정정.** `systems/blueprint.md`와 `systems/kaizen.md`가 각각 "모달 진입에 오버슈트를
> 실제 적용한 것은 자기뿐"이라고 적었는데 **둘 다 틀렸습니다** —
> Blueprint · Kaizen · EUI · Semi · HSDS · Vapor · Clarity · eBay 최소 8곳이
> 모달 진입에 오버슈트를 씁니다. **오버슈트는 토큰만 있고 안 쓰는 값이 아닙니다.**

**오버슈트를 어디에 배정하느냐가 갈립니다** — 모달 진입(위 8곳) vs
**버튼 누름**(Braid) vs **체크박스**(Bolt — `rotate(45deg) scale(0.1→1)`) vs
**토글 썸·툴팁**(Helios) vs **아바타 hover**(Atlassian).
**Braid가 특히 눈에 띕니다** — 탄성을 진입이 아니라 **입력 피드백**에 배정한 표본입니다.

**스프링 물리 진영에 표본이 하나 늘었습니다** — **Paste**가 `@react-spring/web`으로
`{ mass: 0.5, tension: 370, friction: 26 }`을 모달 진입에 씁니다.
TDS(stiffness/damping 8프리셋)와 같은 층이고, **지속시간 개념이 아예 없는 모달**은
표본에서 Paste뿐입니다.

### 모션의 실행 층 — 6갈래

| 층 | 시스템 |
|----|--------|
| CSS `transition`/`keyframes` | 다수 |
| **최신 CSS** (`@starting-style` + `transition: display allow-discrete`) | eBay · LeafyGreen · PIE · Skeleton · Spindle |
| **WAAPI** | **Clarity**(`internal/motion` 러너가 CSS 커스텀 프로퍼티에서 옵션을 읽음) · **Vuetify**(container-transform 히어로 전환) |
| **JS 애니메이션 라이브러리** | **Siemens iX**(animejs) · **Priceline**(`motion` 12.x) · **smarthr**(react-transition-group) · **Forma 36**(react-modal 클래스 전환) |
| **스프링 물리** | **Paste**(react-spring) |
| **JS 레지스트리** | **Shoelace** — `setDefaultAnimation()`에 keyframes를 등록하고 소비자가 `setAnimation()`으로 컴포넌트·방향 단위 교체. **RTL 전용 keyframes까지 레지스트리에** |

**"모션 값이 CSS에 있다"는 전제가 83표본에서는 성립하지 않습니다.**
Clarity·Siemens iX는 CSS 커스텀 프로퍼티를 **JS가 읽어** 실행하고, Shoelace는 CSS에
keyframes가 아예 없습니다. Siemens iX가 `prefers-reduced-motion`도 **JS 층에서**
차단하는 이유가 이것입니다.

**Vuetify는 지속시간이 상수가 아닙니다** — 트리거 요소에서 다이얼로그 최종 위치까지의
**이동 거리에 따라 1~1.5배로 늘립니다**(`speed = min(1.5, (거리비 − 0.12) × 10 + 1)`).
표본에서 지속시간이 거리의 함수인 유일 사례입니다.

### CSS와 JS 상수의 드리프트 — 실물로 관측됩니다

| 시스템 | 어긋난 자리 |
|--------|-------------|
| **Braid** | CSS 진입 **125ms** vs JS 정리 타이머 `ANIMATION_DURATION` **300ms** |
| **Charcoal** | 소스 주석이 *"duration은 JS 상수와 일치시킬 것"*을 요구 — 계약이 주석뿐 |
| **Evergreen** | Dialog 패널 200ms vs Overlay·SideSheet·Toast 240ms — 파일별 하드코딩 |
| **Vibe** | 토큰 enter `(0, 0, 0.35, 1)` vs 모달 리터럴 `(0, 0, 0.4, 1)` — **근사하지만 불일치** |
| **Backpack** | 이징 무토큰 상태에서 신규 컴포넌트에 곡선 3종이 손글씨로 유입 |
| **Intergalactic** | 컴포넌트 인라인 폴백과 테마 값이 어긋남(라운드 14 vs 12px) |

**원인이 하나로 모입니다 — 값이 두 층에 이중 기재됩니다.**
반대 극이 **Pajamas**입니다: 토큰이 0개인데 `cubic-bezier(.22,.61,.36,1)` **한 곡선이
53회** 등장하고 어긋난 곳이 없습니다. **무토큰이 곧 드리프트는 아닙니다** —
Backpack(곡선 3종 산포)과 Orbit(`ease-in-out` 52회 단일 수렴)이
같은 무토큰의 두 갈래 결말인 것과 같습니다.

### reduced-motion — Cloudscape뿐이 아니라 6개 층입니다

| 층 | 시스템 |
|----|--------|
| **토큰 값 두 벌** | **Cloudscape** (`disabled: 0ms`) |
| `0ms` 토큰만 제공 | Atlassian · Kaizen · Tegel · Clarity · Siemens iX |
| 미디어쿼리로 지속시간을 0 근처로 | **Pajamas**(`.01ms !important`, 컴포넌트 CSS 내장) · **Spindle**(0.1ms) · **Helios**(SideNav만) · **DSFR**(전면 해제) |
| 애니메이션 정의 자체를 감싸기 | **Radix Themes** — 키프레임까지 `no-preference` 안에 |
| **전역 킬스위치** | **Porsche**(`--p-transition-duration`/`--p-animation-duration` 변수 하나) · **Canvas**(`.wd-no-animation` 전역 클래스) · HeroUI(`motion-reduce`) |
| **JS 층 차단** | **Siemens iX** — `Animation` 유틸이 전 단계를 0으로 |
| **옵트인으로 반전** | **Strapi** — 전환 선언 전체가 `prefers-reduced-motion` 가드 **안에서만** 존재(기본값 쪽이 무모션) · **Mantine** — `data-respect-reduced-motion` + `data-reduce-motion` 이중 옵트인(기본 꺼짐) |
| **감속을 이원 처리** | **Clarity** — 빠른 지속시간(quickest~primary)은 **0으로**, 느린 것(slow~slowest)은 **일괄 2s로 연장**. 전환은 끄고 루프는 **느리게** |
| **대체 애니메이션 제공** | **Vuetify** — 히어로 전환을 페이드 125/85ms로 교체 |

> **정정.** "표본에서 접근성 대응을 토큰 레벨에 넣은 것은 Cloudscape뿐입니다.
> 나머지는 구현이 미디어 쿼리로 처리해야 합니다"는 틀렸습니다.
> **최소 13개 시스템이 처리하고, 방식이 6개 층으로 갈립니다.**
> 그중 **Clarity의 이원 처리**(전환은 0 · 루프는 2s로 연장)와
> **Strapi의 옵트인 반전**(기본이 무모션)은 Cloudscape의 "지속시간만 0"보다
> 한 단계 더 나간 설계입니다 — **루프 애니메이션은 0ms로 만들 수 없기 때문**입니다.
> **Mantine은 반대 방향의 예외**입니다: 이중 옵트인이라 기본 상태에서 OS 설정을 무시합니다.

### 뷰포트·플랫폼으로 모션을 나누는 진영 — Nord만이 아닙니다

| 시스템 | 나누는 방식 |
|--------|-------------|
| **Nord** | `transition_mobile` 0.4s = 데스크톱 `slowly` 0.2s의 **2배** |
| **Braid** | 드로어 진입이 **모바일 300ms / 태블릿 175ms** — 모바일이 더 김 |
| **Orbit** | **진입 모션이 모바일 전용** — 데스크톱 모달은 애니메이션 없음 |
| **Thumbprint** | 데스크톱 `transition:none` / 모바일만 슬라이드업 |
| **HeroUI** | 모바일 slide-exit 80px / 데스크톱 scale-exit 103% |

> **정정.** "플랫폼별로 나눌지 정하세요. Nord만 `mobile`을 데스크톱의 2배로 둡니다.
> 표본에서 유일한 사례이므로 관행은 아닙니다"는 절반만 맞습니다.
> **지속시간을 늘리는 것은 Nord·Braid 둘이고, 나머지 셋은 모션의 유무나 종류를 바꿉니다.**
> 공통점은 **모바일에서 더 크게 움직인다**는 것 — 데스크톱은 스케일이거나 무모션,
> 모바일은 전체 높이 슬라이드업입니다.

## 구현 시 기본값

**지속시간 — 5단계로 시작합니다.**

```
0     즉시 (접근성 모드)
50    미세 상태 전환 (목록 항목 hover)
100   빠른 퇴장
150   진입 (작은 요소) · 기본 전환
250   진입 (큰 영역 · 모달 · 패널)
```

**3단계로도 충분합니다** (2026-08-18 정정). 이전 판은 5단계를 권했는데,
**83표본 최빈은 3단계**입니다 (Orbit · Backpack · Nord · Pharos · Forma 36 · Strapi).
5단계는 컴포넌트 종류가 많아진 뒤에 늘리세요 — Atlassian(8단)·Clarity(9단)도
결국 실사용은 두세 값에 몰립니다.

표본 다수가 50ms 배수를 씁니다. **다만 "Cloudscape만 예외"는 아닙니다**
(2026-08-18 정정) — eBay(프레임 격자) · MUI 225/195 · Evergreen 80/240 ·
Braid 125/175 · Strapi 120/320 · Thumbprint 75 · Kaizen 201도 밖에 있습니다.
**5의 배수를 깨려면 이유를 값에 남기세요** — eBay는 프레임 수를 기준으로 삼았고,
Kaizen은 브라우저 버그 회피 근거를 소스 주석에 Jira 번호로 박았습니다.

**Canvas처럼 20단계(50ms 등차)를 만들지 마세요.** 스페이싱과 달리
모션은 사람이 구분할 수 있는 단계가 적습니다 — 150과 200ms는 구분되지만
150과 200 사이에 값을 둘 이유가 잘 없습니다.

**`0ms` 토큰을 두세요.** 접근성 모드에서 참조할 자리가 필요합니다.
83표본에서 6곳이 둡니다 — Atlassian · Cloudscape · Kaizen · Tegel · Clarity · Siemens iX.
**Siemens iX처럼 `0ms`를 스케일의 1단(`short`)으로 두면 "즉시"가 디자인 선택지가 됩니다** —
접근성 전용 값으로만 두는 것과 다른 용법입니다.

**퇴장을 진입보다 짧게 하세요.**

```
진입 250 → 퇴장 200
진입 150 → 퇴장 100
```

**Atlassian의 10개 쌍 중 9개가 정확히 50ms 차이입니다.** 예외는 `panel.content`
하나이고, 그것도 "내용이 컨테이너보다 먼저 사라진다"는 의도가 분명합니다.

**다만 `-50ms`는 Atlassian 안의 규칙이지 표본의 규칙이 아닙니다** (2026-08-18 단서).
83표본에서 비대칭 비율은 1.15배(MUI 225/195)에서 **3.3배(Material Web 500/150)**까지
벌어지고, **대칭 진영도 12곳**입니다(`modal.md` 재종합 절).
**2:1을 상한으로 잡으세요** — Park UI가 그 값을 애니메이션 토큰 이름으로 박제했습니다
(`dialog-in` 400 / `dialog-out` 200).

**진입 시간을 요소 크기로 나누세요.**

| 요소 | 진입 |
|------|:---:|
| 작고 부수적 (아바타 · 칩 · 팝오버) | **150ms** |
| 화면을 덮거나 큰 영역 (모달 · 패널 · 사이드내비 · 오버레이) | **250ms** |

**이징 — 4개로 시작합니다.**

```
진입   ease-out 계열   cubic-bezier(0.4, 1, 0.6, 1)   감속으로 들어옴
퇴장   ease-in 계열    cubic-bezier(0.6, 0, 0.8, 0.6)  가속으로 나감
큰 영역 inout          cubic-bezier(0.4, 0, 0, 1)
반복    linear
```

**진입은 `out`, 퇴장은 `in`이 표본의 기본 패턴입니다.**
Atlassian이 39개 컴포넌트 토큰에서 예외 2건(패널)만 두고 이 규칙을 지킵니다.

**명명 축을 하나 고르세요.** 표본에서 6가지가 나왔습니다 (2026-08-18 보강).

| 축 | 예 | 적합한 경우 |
|----|-----|-------------|
| 방향 × 강도 | Atlassian (`out.practical`) | 컴포넌트가 많고 진입/퇴장이 분명할 때 |
| 용도 × 성격 | Canvas (`quick.deceleration`) | 원시-시맨틱 2계층을 이미 쓸 때 |
| 표현 | Cloudscape (`responsive`·`expressive`) | 디자이너가 토큰을 직접 고를 때 |
| **주체** | **Codex (`system`·`user`)** | **입력 반응성이 중요할 때** |
| **의성어** | **HSDS (`boop`·`bounce`·`elastic`)** | 성격이 값보다 중요한 소비자 제품 |
| **브랜드명** | **Tegel (`easing-scania`)** | 시그니처 곡선이 하나로 정해져 있을 때 |

**Codex의 `system`/`user` 구분이 가장 적은 토큰으로 실용적인 축을 만듭니다** — 2개뿐입니다.

**이름을 값과 반대로 붙이지 마세요.** Porsche는 `ease-in`이 **감속** 곡선이고
`ease-out`이 **가속** 곡선입니다 — "진입(in)에 쓰는 곡선"으로 이름을 붙인 결과이고,
CSS 표준 키워드와 정반대라 읽는 사람이 반드시 틀립니다.

**이징을 26종 배포하지 마세요** (2026-08-18 추가). 카탈로그가 클수록 실사용률이
떨어집니다 — **Strapi 26종 중 실사용 2종**(게다가 `InOut` 7종의 값이 `Out`과 동일한
복붙 오류가 dist에 남아 있습니다), **Stacks 8종 중 3종**(`back` 계열 0회).
**4~6종이 실무 상한**입니다.

**`spring`을 `linear()`로 만들지는 신중하게 결정하세요.**
Atlassian은 65개 정지점을 정의해 **한 곳**(`avatar.hovered`)에만 씁니다.
쓸 자리가 여러 곳이 아니면 비용이 큽니다.
**JS로 렌더한다면 물리 파라미터를 그대로 배포하는 쪽이 낫습니다** —
TDS(stiffness/damping 8프리셋)와 Paste(`{ mass, tension, friction }`)가 그렇게 합니다.

**오버슈트를 쓸 거면 어디에 쓸지 먼저 정하세요.** 83표본에서 실사용이 확인된
자리가 다섯으로 갈립니다 — 모달 진입(8곳) · 버튼 누름(Braid) · 체크박스(Bolt) ·
토글·툴팁(Helios) · 아바타 hover(Atlassian). **전역 이징 세트에 넣고 아무 데나
쓰지 마세요** — 오버슈트는 "여기가 중요하다"는 신호이므로 자리를 좁혀야 작동합니다.

**전환 속성을 명시하세요.**

```
❌ transition: all 150ms
✅ transition: background-color 150ms, border-color 150ms
```

`all`은 레이아웃 속성까지 애니메이션합니다.
**Codex처럼 속성 목록을 토큰으로 두거나**, Atlassian처럼 복합 토큰의 필드로 두거나,
최소한 shadcn/ui처럼 클래스에 명시하세요.

`transform`과 `opacity`만 쓰는 것이 가장 저렴합니다 — 리페인트가 없습니다.

**키프레임 이동량**

```
팝오버 · 툴팁    8px  + scale 0.95
모달             scale 0.95만 (이동 없음)
패널 · 사이드내비  100% (전체 폭)
플래그(토스트)    진입 50% / 퇴장 15%
```

**진입과 퇴장의 이동량을 다르게 두는 것을 검토하세요.**
Atlassian은 진입 50% / 퇴장 15%입니다 — 들어올 때 더 멀리서 옵니다.
**Priceline이 같은 규칙을 모달에 적용합니다** — 진입 `y 64→0`, 퇴장 `y 0→32`로
들어온 거리의 절반만 내려가며 사라집니다.

**팝오버·툴팁의 8px은 유지됩니다** (Atlassian · shadcn/ui, Radix Themes만 4px).
**모달은 자릿수가 다릅니다** (2026-08-18 정정) — 83표본에서 모달 이동량은
`-10px`(Nord)에서 `25vh`(Porsche)까지 벌어지고, **`-50px`(Bootstrap 계보)과
`64px`(Park UI·Priceline)이 흔한 값**입니다. 8px을 모달에 그대로 쓰면
움직임이 보이지 않습니다.

**접근성 — 토큰 레벨에서 처리하세요.**

Cloudscape 방식이 가장 안전합니다 — **지속시간 토큰에 `disabled: 0ms` 값을 함께 두고
모드로 전환**합니다. 미디어 쿼리를 컴포넌트마다 반복하지 않아도 됩니다.

```json
"duration-short": { "default": "150ms", "disabled": "0ms" }
```

**이징과 키프레임은 그대로 두고 지속시간만 0으로 만드세요.** Cloudscape가 그렇게 합니다 —
`0ms`면 어떤 이징이든 결과가 같으므로 두 벌을 만들 필요가 없습니다.

**단, 루프 애니메이션은 0ms로 만들 수 없습니다** (2026-08-18 추가).
스피너를 0ms로 두면 사라지는 게 아니라 프레임이 무한히 튑니다.
**Clarity 방식으로 이원 처리하세요** — 전환(quickest~primary)은 0으로,
루프(slow~slowest)는 **일괄 2s로 늘립니다.** 83표본에서 이 구분을 한 것은 Clarity뿐입니다.

**기본값을 어느 쪽에 둘지도 정하세요.** 83표본에 두 극단이 있습니다 —
**Strapi**는 전환 선언 전체를 `prefers-reduced-motion` 가드 **안에서만** 둬
기본값이 무모션이고, **Mantine**은 이중 옵트인(`data-respect-reduced-motion` +
`data-reduce-motion`, 기본 꺼짐)이라 **기본 상태에서 OS 설정을 무시**합니다.
**Mantine 쪽을 따라 하지 마세요** — 사용자가 명시한 설정을 라이브러리 기본값으로 덮습니다.

**전역 킬스위치를 하나 두는 것도 유효합니다** — Porsche의
`--p-transition-duration`/`--p-animation-duration` 변수 둘이면 전 모션이 꺼집니다.
Canvas는 같은 일을 `.wd-no-animation` 전역 클래스로 합니다.

**플랫폼·뷰포트별로 나눌지 정하세요** (2026-08-18 보강). 지속시간을 늘리는 것은
Nord(모바일 0.4s = 데스크톱의 2배)와 Braid(드로어 모바일 300 / 태블릿 175ms) 둘이고,
**모션의 유무나 종류를 바꾸는 쪽이 셋**입니다 —
Orbit(진입 모션이 모바일 전용) · Thumbprint(데스크톱 `transition:none`) ·
HeroUI(모바일 슬라이드 / 데스크톱 스케일).
**공통점은 모바일에서 더 크게 움직인다는 것입니다** — 데스크톱은 스케일이거나 무모션,
모바일은 전체 높이 슬라이드업입니다.

**반복 애니메이션은 전환과 별개 계열로 두세요.**
Codex가 `transition-duration-*`(100·250ms)와 `animation-duration-*`(1000~2000ms)를
분리합니다 — 한 스케일에 섞으면 8단계가 20단계가 됩니다.

**스피너처럼 여러 요소가 순차 동작해야 하면 음수 `animation-delay`를 쓰세요**
(Codex 방식). 지속시간의 정수 분수로 두면 위상이 균등하게 어긋납니다.
