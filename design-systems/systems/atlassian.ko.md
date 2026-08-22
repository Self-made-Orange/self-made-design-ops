---
name: Atlassian Design System
org: Atlassian
coverage: full
url: https://atlassian.design
repo: https://bitbucket.org/atlassian/atlassian-frontend-mirror
license: Apache-2.0
tech: [React]
figma_kit: true
tokens_format: [JSON, CSS, JS]
a11y_target: "디자인시스템 문서엔 명시 없음 확인 (회사 차원 표준은 WCAG 2.1 AA — atlassian.com/trust, 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-17
source: "npm @atlaskit/tokens@16.7.0 → figma/*.json (15개), dist/cjs/artifacts/tokens-raw/*.js (14개 테마)"
---
<!-- lang-links -->
> [English](atlassian.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Jira·Confluence 등 Atlassian 제품군을 위한 디자인시스템.
**모션을 컴포넌트 단위로 토큰화**하고, **테마당 466개 토큰을 14벌** 배포합니다.

## 토큰

배포 구조 — 축별로 파일이 분리됩니다.

| 파일 | 토큰 수 | 내용 |
|------|:---:|------|
| `atlassian-light.js` 외 **컬러 테마 10벌** | 각 466 | 색 · 엘리베이션 · 불투명도 |
| `atlassian-typography.js` | 23 | 서체 · 크기 · 굵기 |
| `atlassian-spacing.js` | 23 | 여백 (음수 포함) |
| `atlassian-shape.js` | 11 | 라운드 · 보더 두께 |
| `atlassian-motion.js` | **68** | 지속시간 · 이징 · 키프레임 · **컴포넌트별 모션** |

컬러 테마 10벌: `light` · `dark` · `light-future` · `dark-future` ·
`light-increased-contrast` · `dark-increased-contrast` ·
`light-new-input-border` · `dark-new-input-border` · `legacy-light` · `legacy-dark`.
(`light-brand-refresh` · `dark-brand-refresh`가 추가로 있어 총 12벌입니다.)

### 스페이싱

| 토큰 | 값 |
|------|-----|
| `space.0` | 0 |
| `space.025` | 2px |
| `space.050` | 4px |
| `space.075` | 6px |
| `space.100` | 8px |
| `space.150` | 12px |
| `space.200` | 16px |
| `space.250` | 20px |
| `space.300` | 24px |
| `space.400` | 32px |
| `space.500` | 40px |
| `space.600` | 48px |
| `space.800` | 64px |
| `space.1000` | 80px |

이름의 숫자는 **8px 기준 배수**입니다 (`space.100` = 8px).
Polaris(4px 기준)와 같은 방식이되 기준값이 다릅니다.

### 음수 스페이싱

| 토큰 | 값 |
|------|-----|
| `space.negative.025` | -2px |
| `space.negative.050` | -4px |
| `space.negative.075` | -6px |
| `space.negative.100` | -8px |
| `space.negative.150` | -12px |
| `space.negative.200` | -16px |
| `space.negative.250` | -20px |
| `space.negative.300` | -24px |
| `space.negative.400` | -32px |

양수 스케일의 32px 이하 구간과 정확히 대칭입니다. 40px 이상의 음수는 없습니다.

### 라운드

| 토큰 | 값 |
|------|-----|
| `radius.xsmall` | 2px |
| `radius.small` | 4px |
| `radius.medium` | 6px |
| `radius.large` | 8px |
| `radius.xlarge` | 12px |
| `radius.xxlarge` | 16px |
| `radius.full` | 9999px |
| `radius.tile` | **25%** |

### 보더 두께 — 상태별 시맨틱

| 토큰 | 값 |
|------|-----|
| `border.width` | 1px |
| `border.width.selected` | 2px |
| `border.width.focused` | 2px |

### 타이포그래피 — CSS `font` 단축 속성 한 줄

값이 개별 속성이 아니라 **CSS `font` 단축 속성 문자열**입니다.

```
font.heading.large = "normal 653 24px/28px \"Atlassian Sans\", ui-sans-serif, …"
                      │      │   │    │
                      style  weight size line-height
```

| 토큰 | 굵기 | 크기 | 행간 | 비율 |
|------|:---:|:---:|:---:|:---:|
| `font.heading.xxlarge` | 653 | 32px | 36px | 1.125 |
| `font.heading.xlarge` | 653 | 28px | 32px | 1.143 |
| `font.heading.large` | 653 | 24px | 28px | 1.167 |
| `font.heading.medium` | 653 | 20px | 24px | 1.2 |
| `font.heading.small` | 653 | 16px | 20px | 1.25 |
| `font.heading.xsmall` | 653 | 14px | 20px | 1.429 |
| `font.heading.xxsmall` | 653 | 12px | 16px | 1.333 |
| `font.body.large` | 400 | 16px | 24px | 1.5 |
| **`font.body.[default]`** | 400 | **14px** | 20px | 1.429 |
| `font.body.small` | 400 | 12px | 16px | 1.333 |
| `font.metric.large` | 653 | 28px | 32px | 1.143 |
| `font.metric.medium` | 653 | 24px | 28px | 1.167 |
| `font.metric.small` | 653 | 16px | 20px | 1.25 |
| `font.code.[default]` | 400 | **0.875em** | **1** | — |

**본문 기본이 14px입니다.** Ant Design · Material 3 (Body Medium) · Helios · Evergreen ·
Seed(100)와 같은 진영입니다 (`patterns/typography.md`).

**행간이 4px 격자에 맞습니다** — 16 · 20 · 24 · 28 · 32 · 36. 예외 없습니다.
비율은 1.125~1.5로 흔들리지만 절대값은 항상 4의 배수입니다.

**제목 굵기가 전부 653입니다.**

| 토큰 | 값 |
|------|:---:|
| `font.weight.regular` | 400 |
| `font.weight.medium` | 500 |
| `font.weight.semibold` | 600 |
| **`font.weight.bold`** | **653** |

**100 단위가 아닌 굵기값은 표본에서 Atlassian(653)과 Apple(590) 둘입니다.**
가변 서체(Atlassian Sans / SF Pro)의 실제 굵기를 그대로 쓴 값이며,
어느 쪽 소스에도 그 값을 고른 근거는 적혀 있지 않습니다.

| 시스템 | 서체 | 값 | 스타일 |
|--------|------|:---:|------|
| Atlassian | Atlassian Sans | **653** | `bold` |
| Apple | SF Pro | **590** | Semibold |

Apple은 Bold가 700으로 표준값이고 Semibold만 어긋납니다.
Atlassian은 `bold`만 653이고 `semibold`는 600입니다 — **둘 다 한 단계만 비표준입니다.**

`font.metric.*` 계열이 별도로 있습니다 — 크기·굵기가 `heading`과 겹치지만
(28/32 · 24/28 · 16/20) 이름이 분리돼 있습니다.

`font.code.[default]`만 **상대 단위**입니다 — `0.875em/1`.
주변 텍스트 크기에 비례하고 행간이 1입니다.

### 서체 — 브랜드 계열이 분리돼 있습니다

| 토큰 | 서체 |
|------|------|
| `font.family.heading` | Atlassian Sans |
| `font.family.body` | Atlassian Sans |
| `font.family.code` | Atlassian Mono |
| **`font.family.brand.heading`** | **Charlie Display** |
| **`font.family.brand.body`** | **Charlie Text** |

**제품 UI 서체(Atlassian Sans)와 브랜드 서체(Charlie)가 분리돼 있습니다.**
Charlie는 Display / Text 두 벌로 나뉩니다 — Evergreen의 SF UI Display / SF UI Text 분리와
같은 구조입니다 (`patterns/typography.md`).

### 컬러 — 테마당 466개

| 그룹 | 개수 |
|------|:---:|
| `color.background` | **208** |
| `color.chart` | **100** |
| `color.text` | 49 |
| `color.border` | 39 |
| `color.icon` | 23 |
| `elevation.surface` | 13 |
| `color.rovo` | 11 |
| `elevation.shadow` | 5 |
| `color.link` | 4 |
| `color.blanket` | 3 |
| `elevation.rovo` | 3 |
| `color.interaction` | 2 |
| `color.skeleton` | 2 |
| `opacity` | 2 |
| `utility` | 2 |

#### 배경 — 4계층 × 3상태 구조

```
color.background.accent.blue.subtlest.[default]
color.background.accent.blue.subtlest.hovered
color.background.accent.blue.subtlest.pressed
                            └─ subtler · subtle · bolder
```

**농도 4단계**(`subtlest` · `subtler` · `subtle` · `bolder`) **× 상태 3종**
(`[default]` · `hovered` · `pressed`) = 색상당 12개.
`accent`에 10색이 있어 **120개**입니다.

**Orbit이 명도 3단계 × 상태 3종 + darker = 10개인 것과 같은 구조**이며
(`patterns/color.md`), Atlassian은 농도가 4단계입니다.

**농도 이름이 비교급입니다** — `subtle`의 더 약한 쪽이 `subtler`, 그보다 약한 쪽이 `subtlest`.
`bold` 계열은 `bolder` 하나뿐이라 **비대칭**입니다.

#### 상태색 — `discovery`가 있습니다

배경 기준 각 10개씩:

| 그룹 | 개수 |
|------|:---:|
| `danger` | 10 |
| `warning` | 10 |
| `success` | 10 |
| **`discovery`** | **10** |
| `information` | 10 |
| `brand` | 9 |
| `neutral` | 9 |
| `code` | 7 |
| `selected` | 6 |
| `input` | 3 |
| `inverse` | 3 |
| `disabled` | 1 |

**`discovery`가 1급 상태색입니다.** Evergreen이 `success`·`warning`·`danger`·`none` 4종인 것,
shadcn/ui가 `destructive` 하나인 것과 비교해 가장 넓습니다.

#### 차트 — 100개 토큰

| 계열 | 개수 |
|------|:---:|
| `categorical` | **16** |
| 색상별 (`lime`·`red`·`orange`·`yellow`·`green`·`teal`·`blue`·`purple`·`magenta`·`gray`) | 각 6 |
| 상태별 (`danger`·`warning`·`success`·`discovery`·`information`) | 각 4 |
| `neutral` · `brand` | 각 2 |

**`categorical` 16개가 있습니다** — 범주형 데이터용 색 순서입니다.
shadcn/ui의 차트 5색이 단색 명도 램프인 것과 반대로, Atlassian은 **색상 구분**을 씁니다.

표본에서 차트 전용 토큰을 100개 두는 것은 Atlassian뿐입니다.

#### `rovo` — 제품별 색 계열

`color.rovo.*` 11개 + `elevation.rovo.*` 3개.
`border`·`icon`에 `lime` · `saffron` · `blue` · `purple` 4색이 있습니다.

**Helios가 Terraform·Vault·Consul 제품별 브랜드 색을 두는 것과 같은 구조**입니다
(`patterns/color.md`).

#### 엘리베이션 — 표면과 그림자가 별도 계열

| 계열 | 토큰 |
|------|------|
| `elevation.surface.*` | `[default]` · `container` · `raised` · `overlay` (각 3상태) + `sunken` |
| `elevation.shadow.*` | `overflow.[default]` · `overflow.perimeter` · `overflow.spread` · `overlay` · `raised` |

**표면 색과 그림자가 분리돼 있습니다.** `raised`는 양쪽에 다 있어
"올라간 표면 색"과 "올라간 그림자"를 따로 씁니다.

`elevation.shadow.overflow.*`가 3개입니다 — 스크롤 넘침 표시용 그림자를
`perimeter` · `spread`로 나눕니다.

#### 불투명도 · 유틸리티

| 토큰 | 값 |
|------|:---:|
| `opacity.disabled` | **0.4** |
| `opacity.loading` | 0.2 |
| `utility.UNSAFE.transparent` | `transparent` |
| `utility.elevation.surface.current` | `#FFFFFF` (light) |

**비활성 불투명도가 0.4입니다.** shadcn/ui는 0.5(`opacity-50`)입니다.

**`utility.UNSAFE.transparent`** — 토큰 이름에 `UNSAFE`가 들어 있습니다.
표본에서 토큰 이름으로 사용 위험을 표시하는 것은 Atlassian뿐입니다.

## 모션 — 컴포넌트 단위 토큰 68개

표본에서 **가장 깊게 토큰화된 모션 시스템**입니다.

### 지속시간 8단계

| 토큰 | 값 |
|------|:---:|
| `motion.duration.instant` | 0ms |
| `motion.duration.xxshort` | 50ms |
| `motion.duration.xshort` | 100ms |
| `motion.duration.short` | 150ms |
| `motion.duration.medium` | 200ms |
| `motion.duration.long` | 250ms |
| `motion.duration.xlong` | 400ms |
| `motion.duration.xxlong` | 600ms |

증분 **50 / 50 / 50 / 50 / 50 / 150 / 200** — 250ms까지 50ms 등차입니다.

### 이징 5종

| 토큰 | 값 |
|------|-----|
| `motion.easing.in.practical` | `cubic-bezier(0.6, 0, 0.8, 0.6)` |
| `motion.easing.out.practical` | `cubic-bezier(0.4, 1, 0.6, 1)` |
| `motion.easing.inout.bold` | `cubic-bezier(0.4, 0, 0, 1)` |
| `motion.easing.out.bold` | `cubic-bezier(0, 0.4, 0, 1)` |
| **`motion.easing.spring`** | **`linear()` 65개 정지점** |

**`practical` / `bold` 두 계열로 나뉩니다.**

**`spring`이 CSS `linear()` 함수로 정의됩니다** — 65개 정지점을 열거해
스프링 곡선을 근사합니다. 최대 오버슈트가 1.024이고 마지막에 0.999로 살짝 언더슈트합니다.

```
linear(0, 0.021, 0.058, …, 1.024, 1.024, …, 0.999, 1)
```

표본에서 `linear()` 다단 정지점으로 스프링을 표현한 사례는 Atlassian뿐입니다.

### 키프레임 18개 — 이름 붙은 애니메이션

| 계열 | 토큰 |
|------|------|
| 페이드 | `FadeIn0to100` · `FadeOut100to0` |
| 스케일 | `ScaleIn80to100` · `ScaleIn95to100` · `ScaleOut100to80` · `ScaleOut100to95` |
| 슬라이드 (8px) | `SlideInTop8px` · `SlideInBottom8px` · `SlideInLeft8px` · `SlideInRight8px` (+ Out 4종) |
| 슬라이드 (비율) | `SlideIn50PercentLeft` · `SlideOut15PercentLeft` · `SlideIn100PercentLeft/Right` (+ Out) |

**값이 이름에 들어 있습니다** — `ScaleIn80to100`은 80%→100%입니다.

**진입과 퇴장의 이동량이 다릅니다** — `SlideIn50PercentLeft`(50%) 대 
`SlideOut15PercentLeft`(15%). 들어올 때 더 멀리서 옵니다.

### 컴포넌트별 모션 — 표본에서 유일합니다

컴포넌트마다 진입·퇴장·상태 모션이 **복합 토큰**으로 정의됩니다.

```js
motion.modal.enter = {
  duration: 250,
  curve: 'cubic-bezier(0.4, 0, 0, 1)',   // inout.bold
  keyframes: ['ScaleIn95to100'],
  fill: 'backwards',
}
motion.panel.content.enter = {
  duration: 150, curve: '…out.practical',
  keyframes: ['FadeIn0to100'], delay: 100, fill: 'backwards',
}
```

대상 컴포넌트: `avatar` · `blanket` · `button` · `flag` · `label` · `listitem` ·
`modal` · `panel` · `popup` · `sidenav` · `spotlight`.

방향별로 나뉘는 것: `popup.enter.{top,bottom,left,right}` ·
`panel.enter.{left,right,[default]}` · `sidenav.enter.{left,right}`.

#### 진입 대 퇴장 — 퇴장이 더 빠릅니다

| 컴포넌트 | 진입 | 퇴장 | 차이 |
|----------|:---:|:---:|:---:|
| `avatar` | 150ms | 100ms | -50 |
| `blanket` | 250ms | 200ms | -50 |
| `flag` | 250ms | 200ms | -50 |
| `label` | 150ms | 100ms | -50 |
| `modal` | 250ms | 200ms | -50 |
| `panel` | 250ms | 200ms | -50 |
| `popup` | 150ms | 100ms | -50 |
| `sidenav` | 250ms | 200ms | -50 |
| `spotlight` | 250ms | 200ms | -50 |
| **`panel.content`** | **150ms** (+ `delay: 100`) | **50ms** | **-100** |

**10개 쌍 중 9개가 정확히 50ms 차이입니다.**
`panel.content`만 100ms 차이이며, 진입에 지연 100ms이 붙습니다 —
패널이 슬라이드하는 중에 내용이 페이드인해 함께 끝나고,
퇴장은 내용이 먼저(50ms) 사라진 뒤 패널이 나갑니다(200ms).

**진입 시간이 150 또는 250ms 둘 중 하나입니다.**
작고 부수적인 요소(`avatar`·`label`·`popup`)가 150ms,
화면을 덮거나 큰 영역을 차지하는 것(`blanket`·`modal`·`panel`·`sidenav`·`spotlight`·`flag`)이 250ms입니다.

교차 비교는 `patterns/motion.md`에 있습니다.

#### 상태 전환 — 속성까지 지정합니다

```js
motion.listitem.hovered = {
  duration: 50, curve: '…out.practical',
  properties: ['background-color', 'border-color', 'color', 'text-decoration-color'],
}
motion.button.hovered = {
  duration: 150, curve: '…out.practical',
  properties: ['background-color', 'border-color'],
}
```

**`listitem` hover가 50ms, `button` hover가 150ms입니다** — 3배 차이입니다.
`listitem`은 전환 속성이 4개(텍스트 색·밑줄 색 포함), `button`은 2개입니다.

`panel.content.enter`만 `delay: 100`을 갖습니다 — 패널이 열린 뒤 내용이 나타납니다.

**`fill` 값이 진입은 `backwards`, 퇴장은 `forwards`로 예외 없이 일관됩니다.**

**이징 배정에도 규칙이 있습니다** — 진입은 `out` 계열, 퇴장은 `in` 계열입니다.
예외는 `panel.exit.*`(`out.bold`)와 `panel.content.exit`(`out.practical`) 둘뿐입니다.
`bold` 계열은 큰 영역(blanket · modal · spotlight · panel · sidenav · flag)에만 쓰입니다.

## 컴포넌트

미확인 — 문서 사이트 접근이 프록시에서 차단됩니다.
모션 토큰이 다루는 컴포넌트 11종은 위에 있습니다.

## 특징적 결정

- **모션을 컴포넌트 단위로 토큰화합니다.** 68개 토큰이 지속시간·이징·키프레임·전환 속성·
  지연·`fill`까지 복합 객체로 담습니다. 표본에서 이 깊이는 Atlassian뿐입니다.
- **퇴장이 진입보다 짧습니다.** 10개 쌍 중 9개가 정확히 50ms 차이이고,
  `panel.content`만 100ms입니다 (내용이 컨테이너보다 먼저 사라짐).
- **`spring` 이징을 CSS `linear()` 65 정지점으로 정의합니다.**
- **타이포 토큰이 CSS `font` 단축 속성 문자열입니다.** 개별 속성 토큰이 없어
  크기만 따로 쓸 수 없습니다.
- **굵기 `bold`가 653입니다.** 100 단위가 아닌 사례는 표본에서 이것과 Apple Semibold(590) 둘뿐입니다.
- **행간이 항상 4의 배수입니다** (16~36). 비율은 1.125~1.5로 흔들립니다.
- **브랜드 서체(Charlie)와 제품 서체(Atlassian Sans)가 분리돼 있습니다.**
- **배경색이 농도 4단계 × 상태 3종 구조입니다.** 이름이 비교급(`subtle`→`subtler`→`subtlest`)
  이고 `bold` 쪽은 `bolder` 하나뿐인 비대칭 구조입니다.
- **`discovery`가 1급 상태색입니다.** danger·warning·success·information과 나란히 10개씩 있습니다.
- **차트 전용 토큰 100개.** `categorical` 16색 순서를 포함합니다.
- **음수 스페이싱을 제공합니다.** Primer에 이어 두 번째로 확인된 사례이며,
  양쪽 다 양수 스케일의 하위 구간과 대칭입니다 (Atlassian -32px, Primer -48px까지).
- **`radius.tile`이 25%입니다.** 비율 기반 라운드인데 50%(원형)가 아니라 25%입니다.
  **수집한 시스템 중 25% 라운드는 이것뿐입니다.**
- **보더 두께가 상태별로 시맨틱합니다.** `border.width.selected`와 `border.width.focused`가
  값은 같지만(2px) 별도 토큰입니다.
  Primer가 `thin`/`thick`처럼 크기로 이름 붙인 것과 대조적입니다.
- **표면 색과 그림자가 별도 계열입니다** (`elevation.surface` 13 · `elevation.shadow` 5).
- **토큰 이름에 `UNSAFE`를 넣습니다** (`utility.UNSAFE.transparent`).
- **Figma용 토큰 파일을 npm으로 배포합니다.** 패키지의 `figma/` 디렉터리에
  디자인 도구용 JSON 15개가 들어 있습니다.
- **레거시·실험 테마를 함께 배포합니다.** `legacy-light` · `adg3` (구버전),
  `future` · `new-input-border` · `brand-refresh` (예정). 총 12벌입니다.
- **`increased-contrast` 테마가 라이트·다크 양쪽에 있습니다.**
  Material 3만 중간 대비를 두는데(`patterns/color.md`), Atlassian은 고대비 1단계입니다.

## 버튼 심화 (2026-08-17, `@atlaskit/button@25.1.0` 빌드 산출물)

한 패키지에 **신·구 버튼이 병존**하며 치수 표현이 다릅니다:

- **old-button**: 높이가 `32/14em`(≈2.28571em) · compact `24/14em` —
  **em 순환소수**로 32/24px 의도를 역산 (Garden·Stacks와 같은 현상).
  패딩은 `gridSize(8) + gridSize/4` = 10px 산식.
- **new-button**: Compiled(아토믹 CSS-in-JS)로 정적 컴파일 —
  높이 **32/24px 직접값**, 좌우 패딩 12/6px, 라운드 `--ds-radius-medium`(6px).
  같은 값을 em 산식 → 토큰 참조로 옮긴 **세대 교체가 한 패키지 안에**
  있습니다.
- 컴파일된 CSS에 `--ds-radius-small` 폴백이 **3px와 4px 두 값으로 공존** —
  라운드 토큰 이행의 중간 상태가 산출물에 그대로 보입니다.

## 접근성

- `light-increased-contrast` · `dark-increased-contrast` **고대비 테마 2벌**.
  일반 테마와 토큰 수가 같습니다(466개) — 구조가 동일하고 값만 다릅니다
- `border.width.focused`를 별도 토큰으로 관리 (2px)
- `opacity.disabled` = 0.4
- 명시적 WCAG 준수 목표는 패키지에서 확인되지 않았습니다.
  대비 비율 수치도 토큰에 없습니다

## 참고

- 문서: https://atlassian.design
- 패키지: `@atlaskit/tokens@16.7.0`
- Figma 토큰: 패키지 내 `figma/*.json` (15개)
- 원시 토큰(값 포함): `dist/cjs/artifacts/tokens-raw/*.js` (14개)
- **수집 방법:** `figma/atlassian-typography.json`에는 서체·굵기만 있고
  **크기·행간은 `dist/cjs/artifacts/tokens-raw/atlassian-typography.js`에만** 있습니다.
  Figma용 JSON만 보면 타이포 스케일이 없는 것처럼 보입니다 —
  `HARVESTING.md` 교훈 6(경로 미발견으로 넘기기 전에 파일 목록 먼저 보기)에 해당합니다.
- **남은 확인 사항:** 컴포넌트 목록·치수, 라이선스,
  `light-future` / `brand-refresh` 테마와 현행 테마의 값 차이
- **라이선스 해소 (2026-08-18):** `Apache-2.0` — 출처: npm `@atlaskit/tokens@16.7.0` → `package.json` (`license`). 저장소는 Bitbucket 미러라 LICENSE 파일 직조회 불가
