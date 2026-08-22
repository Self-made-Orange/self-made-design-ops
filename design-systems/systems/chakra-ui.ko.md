---
name: Chakra UI
org: Chakra UI (오픈소스)
coverage: partial
url: https://chakra-ui.com
repo: https://github.com/chakra-ui/chakra-ui
license: MIT
tech: [React]
figma_kit: 미확인
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: framework
verified: 2026-08-18
source: "npm @chakra-ui/react@3.36.1 → dist/esm/theme/tokens/*.js (18개 파일) · dist/esm/theme/recipes/{table,tabs,alert,toast,badge}.js + layer-styles.js (표·내비·피드백 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](chakra-ui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

React 컴포넌트 라이브러리. **토큰 계열이 18종으로 표본에서 가장 넓고**,
`z-index`·`cursor`·`aspect-ratio`를 1급 토큰으로 둡니다.

## 토큰 — 18개 계열

```
animations · aspect-ratios · blurs · borders · colors · cursor · durations ·
easings · font-sizes · font-weights · fonts · keyframes · letter-spacing ·
line-heights · radius · sizes · spacing · z-indices
```

**`defineTokens.<계열>()` 형태로 계열마다 파일이 분리돼 있습니다.**

### z-index — 표본에서 가장 상세합니다

| 토큰 | 값 |
|------|:---:|
| `hide` | **-1** |
| `base` | 0 |
| `docked` | 10 |
| `dropdown` | 1000 |
| `sticky` | 1100 |
| `banner` | 1200 |
| `overlay` | 1300 |
| `modal` | 1400 |
| `popover` | 1500 |
| **`skipNav`** | **1600** |
| `toast` | 1700 |
| `tooltip` | 1800 |
| `max` | **2147483647** |

**13단계이고 이름이 전부 용도입니다.** `dropdown` 1000부터 `tooltip` 1800까지 100 등차입니다.

**`hide: -1`과 `skipNav: 1600`이 특이합니다.** `skipNav`는 스크린리더용
"본문으로 건너뛰기" 링크이며, **toast·tooltip보다 아래이고 popover보다 위**입니다.

`max`가 `2147483647`(int32 최댓값)입니다 — Open Props의 `--layer-important`와 정확히 같은 값입니다.

### cursor — Radix Themes와 값이 갈립니다

| 토큰 | Chakra UI | Radix Themes |
|------|:---:|:---:|
| **`button`** | **`pointer`** | **`default`** |
| **`switch`** | **`pointer`** | **`default`** |
| `checkbox` | `default` | `default` |
| `radio` | `default` | `default` |
| `option` / `menuitem` | `default` | `default` (`menu-item`) |
| `slider` | `default` | `default` |
| `disabled` | `not-allowed` | `not-allowed` |

**버튼과 스위치에서 정면으로 반대입니다.** Chakra는 `pointer`, Radix Themes는 `default`입니다.
나머지 6개는 일치합니다.

Radix Themes에는 `--cursor-link: pointer`가 있는데 **Chakra에는 링크 토큰이 없습니다** —
대신 버튼이 `pointer`입니다. 두 시스템이 "손가락 커서를 어디까지 쓰는가"에서 갈립니다.

`slider-thumb`은 Radix Themes에만 있습니다 (`slider-thumb` · `slider-thumb-active`).

### 스페이싱 — 34단계

```
2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 ·
52 · 56 · 60 · 64 · 72 · 80 · 96 · 112 · 128 · 144 · 160 · 176 · 192 · 208 ·
224 · 240 · 256 · 288 · 320 · 384
```

**키가 `rem × 4` 숫자입니다** — `4`가 `1rem`(16px), `0.5`가 `0.125rem`(2px).
**소수 키가 있습니다** (`0.5` · `1.5` · `2.5` · `3.5` · `4.5`).

`tokens/scales.md`의 `16px을 부르는 이름` 표에서 **Chakra는 `4`**입니다 —
Tailwind의 `p-4`와 같고 Radix Themes의 `--space-4`(16px, 4번째 단계)와도 우연히 같습니다.

**2~20px 구간이 2px 등차로 10단계**입니다 (Base Web·Canvas와 같은 촘촘함).
20px 위로는 4px 등차, 64px 위로는 불규칙합니다.

코어 `4/8/16/24`와 `32` 전부 있습니다.

### 라운드 — `2xs`가 1px입니다

| 토큰 | 값 | px |
|------|:---:|:---:|
| `none` | 0 | 0 |
| **`2xs`** | **0.0625rem** | **1** |
| `xs` | 0.125rem | 2 |
| `sm` | 0.25rem | 4 |
| `md` | 0.375rem | 6 |
| `lg` | 0.5rem | 8 |
| `xl` | 0.75rem | 12 |
| `2xl` | 1rem | 16 |
| `3xl` | 1.5rem | 24 |
| `4xl` | 2rem | 32 |
| `full` | 9999px | — |

**1px 라운드는 표본에서 Chakra뿐입니다.** Spectrum이 3~10px을 1px 단위로 두지만
1px 자체는 없습니다.

`xs`~`4xl`은 Tailwind와 값이 정확히 같습니다 (2/4/6/8/12/16/24/32) —
**Chakra가 `2xs`(1px)를 앞에 하나 더 붙인 형태입니다.**

### 보더 — 복합 단축 속성

| 토큰 | 값 |
|------|-----|
| `xs` | **`0.5px solid`** |
| `sm` | `1px solid` |
| `md` | `2px solid` |
| `lg` | `4px solid` |
| `xl` | `8px solid` |

**두께가 아니라 `border` 단축 속성 전체가 값입니다** (`solid` 포함).
Atlassian의 `border.width`가 두께만 두는 것과 다릅니다.

**`xs`가 0.5px 서브픽셀입니다** — Polaris의 `0.66px`에 이어 두 번째 사례입니다.
`8px`까지 있어 표본에서 가장 두껍습니다 (Primer·Spectrum은 4px까지).

### 타이포그래피

크기 14단계 — `2xs` 0.625rem(10) · `xs` 12 · `sm` 14 · `md` 16 · `lg` 18 · `xl` 20 ·
`2xl` 24 · `3xl` 30 · `4xl` 36 · `5xl` 48 · `6xl` 60 · `7xl` 72 · `8xl` 96 · `9xl` 128.

**`xs`~`9xl` 13단계가 Tailwind와 정확히 같습니다.** Chakra가 `2xs`(10px)를 추가했습니다.

행간 5단계는 **이름이 다릅니다.**

| Chakra | 값 | Tailwind 대응 |
|--------|:---:|------|
| `shorter` | 1.25 | `tight` |
| `short` | 1.375 | `snug` |
| **`moderate`** | 1.5 | `normal` |
| `tall` | 1.625 | `relaxed` |
| `taller` | 2 | `loose` |

**값은 5개 전부 Tailwind와 같고 이름만 다릅니다.**
Chakra는 비교급(`shorter`/`short`/`tall`/`taller`), Tailwind는 형용사입니다.

**Chakra의 중간값 이름이 `moderate`입니다** — `normal`이 아닙니다.
"기본값"이라는 함의를 피한 형태입니다.

자간 5단계 — `tighter` -0.05em · `tight` -0.025em · `wide` 0.025em ·
`wider` 0.05em · `widest` 0.1em. **Tailwind와 값이 같지만 `normal`(0em)이 없습니다.**

굵기 9단계 (100~900) — Tailwind와 동일.

### 컬러 — 10색 × 단계

`gray` · `red` · `orange` · `yellow` · `green` · `teal` · `blue` · `cyan` ·
`purple` · `pink` **10색**. 토큰 선언 136개입니다.

**Tailwind(26색)·Radix Themes(33색)보다 훨씬 적습니다.**
`slate`·`zinc`·`stone` 같은 무채 변형이 없고 `gray` 하나입니다.

### 모션

| 계열 | 값 |
|------|-----|
| **`durations`** | `fastest` 50 · `faster` 100 · `fast` 150 · `moderate` 200 · `slow` 300 · `slower` 400 · `slowest` 500ms |
| **`easings`** | `ease-in` · `ease-out` · `ease-in-out` + **`ease-in-smooth`** |
| `animations` · `keyframes` | 별도 계열 |

**지속시간 7단계가 50·100·150·200·300·400·500ms입니다.**
200 다음이 250이 아니라 300으로 뜁니다 — Atlassian(250ms)·Cloudscape(250ms)와 갈립니다.

**이름이 행간과 같은 비교급 방식입니다** (`fastest`~`slowest`).
중간값이 여기서도 `moderate`입니다.

`ease-in-smooth`가 `cubic-bezier(0.32, 0.72, 0, 1)`입니다 — CSS 표준 3종 외의 추가 곡선입니다.

### 그 외 계열

| 계열 | 값 |
|------|-----|
| **`aspect-ratios`** | `square` 1/1 · `landscape` 4/3 · `portrait` 3/4 · `wide` 16/9 · `ultrawide` 18/5 · **`golden` 1.618/1** |
| `blurs` | 4 · 8 · 12 · 16 · 24 · 40 · 64px (7단계) |
| **`sizes`** | 스페이싱 + **분수 25종** (`1/2` 50% · `1/3` · `1/12` … `11/12`) |

**`aspect-ratios`에 황금비(1.618)가 있습니다.** Open Props도 `--ratio-golden`을 두며,
**두 시스템의 6개 비율 이름과 값이 정확히 같습니다** (`ultrawide` 18/5 포함).

`blurs` 7단계가 Tailwind와 정확히 같습니다.

**`sizes`에 분수 25종이 있습니다** — `1/2`부터 `11/12`까지.
12분할 그리드를 토큰으로 표현한 형태입니다.

## 컴포넌트

`theme/recipes/` 아래 레시피 파일로 정의됩니다 — `kbd` · `color-swatch` ·
`tree-view` 등이 확인됩니다. 전체 개수는 세지 않았습니다.

**`recipes` 개념을 씁니다** — Panda CSS의 레시피 시스템 기반입니다.
컴포넌트 스타일을 토큰과 별도 계층으로 둡니다.

## 컴포넌트 심화 — (2026-08-18)

출처: `@chakra-ui/react@3.36.1` → `dist/esm/theme/recipes/*.js`.
**레시피 파일이 75개**입니다 (단일 recipe와 슬롯 recipe 혼재).
치수는 spacing 토큰 키(rem×4)를 px로 해석해 적습니다.

### 버튼 — 7단계, 최소 너비 = 높이

| | 2xs | xs | sm | md(기본) | lg | xl | 2xl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 높이 | 24 | 32 | 36 | **40** | 44 | 48 | 64px |
| 최소 너비 | 24 | 32 | 36 | 40 | 44 | 48 | 64px |
| 좌우 패딩 | 8 | 10 | 14 | 16 | 20 | 20 | 28px |
| 서체 | 12 | 12 | 14 | 14 | 16 | 16 | 18px |

- **`minW`가 높이와 같습니다** — 텍스트가 짧아도 정사각 이하로 좁아지지 않습니다
  (Blueprint도 같은 판단 — `min-width: $height`).
- **7단계입니다** (2xs~2xl) — Garden·Bootstrap·Blueprint의 3단계보다 훨씬 넓습니다
  (전 표본 최다 여부는 대조하지 않았습니다).
- **`lg`와 `xl`의 좌우 패딩이 20px로 같습니다** — 높이만 4px 벌립니다.
- 라운드가 시맨틱 `l2`입니다 — `semantic-tokens/radii.js`의
  **`l1`/`l2`/`l3` 3층**(= `xs` 2px / `sm` 4px / `md` 6px)에서 옵니다.
  실값 **4px**. 원시 라운드를 직접 쓰지 않고 층위 이름으로 한 번 감쌉니다.
- 보더 1px(전 변형), 굵기 `medium`(500), 행간 1.2 고정,
  전환 `moderate` = **200ms**.

### 입력 — 버튼과 높이를 공유하되 최소 크기만 다릅니다

높이가 `--input-height` CSS 변수로 나가고, 값은 `sizes.N` 참조입니다.

| | 2xs | xs | sm | md(기본) | lg | xl | 2xl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 높이 | **28** | 32 | 36 | **40** | 44 | 48 | 64px |
| 좌우 패딩 | 8 | 8 | 10 | **12** | 16 | 18 | 20px |

- **`2xs`만 갈립니다** — 버튼 24px, 입력 28px. 나머지 6단계는 높이가 동일합니다.
- **같은 `md`에서 좌우 패딩이 버튼 16px, 입력 12px**입니다 — 높이는 공유하고
  패딩은 따로 갑니다.
- 변형 3종: `outline`(기본) · `subtle` · `flushed`. **`flushed`는 밑줄만 남기고
  라운드 0 · 패딩 0**입니다.
- 라운드는 버튼과 같은 `l2`(4px).

### 다이얼로그 — 폭 5단계 + cover/full, 이름이 한 단계 어긋납니다

| size | maxW 토큰 | px |
|:---:|:---:|:---:|
| xs | `sm` (24rem) | 384 |
| sm | `md` (28rem) | 448 |
| md(기본) | `lg` (32rem) | **512** |
| lg | `2xl` (42rem) | 672 |
| xl | `4xl` (56rem) | 896 |
| cover / full | — | 전면 |

- **다이얼로그 size명과 `sizes` 토큰명이 정확히 한 단계 어긋납니다**
  (`md` 다이얼로그 = `lg` 토큰). 컴포넌트 크기명을 토큰명과 독립시킨 대가입니다.
- **z-index가 `modal`(1400)이 아니라 `popover`(1500)입니다** —
  `--dialog-z-index: zIndex.popover` + `--layer-index` 가산으로 **중첩 다이얼로그를
  변수 연산으로 처리**합니다. 13단계 토큰을 두고도 자기 `modal` 층을 안 씁니다.
- **기본 배치가 `center`가 아니라 `top`입니다** — 상하 여백 `spacing.16` = 64px.
- 패딩: 좌우 24px 균일. header 위 24 · 아래 16, body 위 8 · 아래 24,
  footer 위 8 · 아래 16px. 라운드 `l3` = 6px. 제목 18px semibold.
- 배경막 `blackAlpha.500` = **`rgba(0, 0, 0, 0.36)`** — Bootstrap(0.5) ·
  Blueprint(0.7)보다 옅습니다.

애니메이션 (기본 `motionPreset: scale`):

| | 열기 | 닫기 |
|---|---|---|
| 콘텐츠 | `scale-in`(0.95→1) + `fade-in`, **200ms** | `scale-out` + `fade-out`, **100ms** |
| 배경막 | `fade-in` 300ms | `fade-out` 200ms |

- **닫기가 열기의 절반입니다** (200/100ms). 배경막은 콘텐츠보다 느립니다 (300ms).
- **이징을 지정하지 않습니다** — 브라우저 기본 `ease`로 돌아갑니다.
  drawer만 `ease-in-smooth`(`cubic-bezier(0.32, 0.72, 0, 1)`)를 명시하고
  **열기 500ms / 닫기 400ms**로 표본에서 가장 느린 축입니다.

### 표 (`recipes/table.js`) — 루트에 `tabular-nums`가 기본입니다

`@chakra-ui/react@3.36.1` `dist/esm/theme/recipes/table.js`.

| size | 헤더 셀 패딩 | 본문 셀 패딩 | 서체 |
|:---:|:--:|:--:|:--:|
| sm | 8 / 8px (`px-2 py-2`) | 8 / 8px | `sm` |
| **md (기본)** | **12 / 12px** | **12 / 12px** | `sm` |
| lg | **16 / 12px** | 16 / 12px | `md` |

- **`root`에 `fontVariantNumeric: "lining-nums tabular-nums"`가 무조건 붙습니다.**
  옵션이 아니라 기본값입니다 — Mantine이 `data-tabular-nums` 속성으로 켜야 하는
  것과 다릅니다. 배지 레시피에도 `fontVariantNumeric: "tabular-nums"`가 들어 있습니다.
- 고정 헤더가 **`top: var(--table-sticky-offset, 0)` + `z-index: 1`**입니다.
  오프셋을 변수로 두는 방식이 shadcn/ui·Mantine과 같고, 변수 이름까지
  Mantine(`--table-sticky-header-offset`)과 거의 같습니다.
- 변형이 **`line`(기본) / `outline` 둘**입니다 — `line`은 셀 하단 보더 1px,
  `outline`은 `box-shadow: 0 0 0 1px {colors.border}` 링 + 헤더 배경 `bg.muted`.
- 줄무늬가 `&:nth-of-type(odd) td { bg: bg.muted }`이고, **`interactive` 변형을
  따로 켜야 hover가 생깁니다** (`colorPalette.subtle`). hover가 기본이 아닌 사례입니다.
- 열 경계선은 `showColumnBorder` 변형에서만(`:not(:last-of-type)` 1px).
- 선택 행이 `_selected: { bg: colorPalette.subtle }`로 **hover와 같은 색**입니다.

### 내비게이션 (`recipes/tabs.js`)

| size | 탭 높이(`--tabs-height`) | 트리거 패딩 | 콘텐츠 패딩 |
|:---:|:--:|:--:|:--:|
| sm | **36px** (`sizes.9`) | 4 / 12px | 12px |
| **md (기본)** | **40px** (`sizes.10`) | 8 / 16px | 16px |
| lg | **44px** (`sizes.11`) | 8 / 18px | 18px |

- 활성 표시가 **레이어 스타일 `indicator.bottom`**이고 기본 두께가
  `var(--indicator-thickness, 2px)`입니다. `line` 변형에서 오프셋 `-1px`을 주어
  리스트 하단 보더(1px) 위에 겹칩니다.
- **변형이 4종**입니다 — `line`(밑줄) · `subtle`(배경) · `enclosed`(높이 −4px 알약) ·
  `outline`(1px 선 + 오프셋). 확보 표본에서 활성 표시 변형이 가장 많습니다.
- `enclosed`가 `minH: calc(var(--tabs-height) - 4px)`로 **컨테이너 안쪽에
  2px씩 물려 들어갑니다** — 알약이 리스트 배경 위에 뜨는 구조입니다.
- 인디케이터 슬라이드용 `--tabs-indicator-bg` / `-shadow`(`shadows.xs`) 토큰이
  루트에 있습니다.

### 피드백 (`recipes/alert.js` · `toast.js` · `badge.js`)

| 항목 | 값 |
|---|---|
| **Alert 패딩** | sm 12px · **md 16px** · lg 16px (사방 동일) |
| Alert 간격 | 8 / 12 / 12px · 라운드 `l3` |
| **Alert 아이콘** | **`width: 1em; height: 1em`** (서체 상대) |
| Alert 상태 | info·warning·success·error + **`neutral`** 5종 |
| Alert 변형 | subtle(기본) · surface · outline · solid |
| **Toast 패딩** | 세로 16px · 좌 16px / **우 24px** (닫기 버튼 자리) |
| Toast 간격·아이콘 | 12px · 20px(`boxSize: 5`) |
| **Toast 전환** | `translate 400ms, scale 400ms, opacity 400ms, height 400ms, box-shadow 200ms` |
| Toast 이징 | 진입 `cubic-bezier(0.21, 1.02, 0.73, 1)` / 퇴장 `cubic-bezier(0.06, 0.71, 0.55, 1)` |
| Toast 액션 버튼 | 높이 32px · 좌우 12px · 보더 1px |
| **Badge 높이** | xs 16 · **sm 20(기본)** · md 24 · lg 28px |
| Badge 패딩·서체 | 4 / 6 / 8 / 10px · 굵기 medium · **`tabular-nums`** |

- **얼럿 아이콘이 `1em` 정사각**입니다 — 크기를 px이 아니라 서체에 묶습니다.
  Radix Themes(아이콘 높이 = 행간)와 같은 방향의 다른 구현이고,
  shadcn/ui(16px 고정 + 2px 이동 보정)와 갈립니다.
- **토스트 전환에 `height 400ms`가 들어 있습니다** — 스택이 재배치될 때
  높이가 보간됩니다. Atlassian `motion.flag.reposition`(250ms)과 같은 축이며,
  진입·퇴장과 **같은 지속시간**을 씁니다.
- **퇴장에서 `opacity`만 200ms로 짧아집니다** (translate·scale은 400ms 유지).
- 상태 배경이 `orange.solid` / `green.solid` / `red.solid`이고 **`info`에는
  배경 지정이 없습니다** — info 토스트는 중립 패널색 그대로입니다.
- 얼럿에 **`neutral` 상태가 있습니다** — 확보 표본에서 의미 축 4종 밖의
  중립 상태를 둔 사례입니다.

## 특징적 결정

- **토큰 계열이 18종으로 표본에서 가장 넓습니다.**
- **z-index를 13단계 용도 이름으로 토큰화합니다.** `skipNav`(1600)가 접근성 요소용으로
  따로 있고 `hide`(-1)·`max`(int32 최댓값)까지 둡니다
- **커서 토큰의 값이 Radix Themes와 반대입니다** — `button`·`switch`가 `pointer`입니다
- **라운드 `2xs`가 1px입니다.** 표본에서 유일합니다
- **보더가 `1px solid` 복합 단축 속성입니다.** 두께만 두지 않습니다.
  `xs`가 0.5px, `xl`이 8px로 표본에서 가장 넓은 범위입니다
- **행간·지속시간 이름이 비교급입니다** (`shorter`~`taller` · `fastest`~`slowest`).
  중간값이 둘 다 `moderate`이며 `normal`이 아닙니다
- **값의 다수가 Tailwind와 같고 이름만 다릅니다** — 라운드 8단계, 크기 13단계,
  자간 5단계, blur 7단계가 값이 일치합니다. **컬러만 10색 대 26색으로 크게 다릅니다**
- **황금비를 aspect-ratio 토큰으로 둡니다** (Open Props와 값·이름 일치)
- **`sizes`에 12분할 분수 25종을 둡니다**

## 접근성

- **`skipNav` z-index 토큰**을 별도로 둡니다 — 표본에서 접근성 요소용 층위 토큰은
  Chakra뿐입니다
- `cursor.disabled: not-allowed`
- 명시적 WCAG 목표는 토큰 파일에서 확인되지 않았습니다

## 참고

- 문서: https://chakra-ui.com
- 저장소: https://github.com/chakra-ui/chakra-ui
- 토큰: `npm pack @chakra-ui/react@3.36.1` → `package/dist/esm/theme/tokens/*.js`
- 레시피: `package/dist/esm/theme/recipes/*.js`
- 컴포넌트 심화: `package/dist/esm/theme/recipes/{button,input,dialog,drawer}.js` ·
  `semantic-tokens/radii.js` · `text-styles.js` (2026-08-18, @chakra-ui/react@3.36.1)
- **남은 확인 사항:** 컬러 단계 수, 그림자, `animations`·`keyframes` 전체 실값
  (~~컴포넌트 레시피 개수~~ → 75개 확인, ~~`semanticTokens` 유무~~ → `semantic-tokens/`
  디렉터리 확인 — colors·radii·shadows 3계열)
