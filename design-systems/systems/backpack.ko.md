---
name: Backpack
org: Skyscanner
coverage: partial
url: https://backpack.github.io
repo: https://github.com/Skyscanner/backpack
license: Apache-2.0
tech: [React, React Native]
figma_kit: true
tokens_format: [JSON, SCSS]
a11y_target: "WCAG 2.2 AA (명시 — 2026-08-18 헤드리스 렌더 확인)"
platform: [web, mobile]
domain: consumer
verified: 2026-08-18
source: "npm @skyscanner/bpk-foundations-web@24.7.0 → tokens/base.raw.json · npm @skyscanner/backpack-web@43.19.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](backpack.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Skyscanner의 여행 검색 서비스를 위한 디자인시스템. 웹과 React Native를 함께 다룹니다.

## 토큰

### 스페이싱 — rem 기반 T셔츠 사이즈

| 토큰 | rem | px |
|------|-----|-----|
| `SPACING_NONE` | 0 | 0 |
| `SPACING_XXS` | 0.0625 | 1 |
| `SPACING_XS` | 0.125 | 2 |
| `SPACING_SM` | 0.25 | 4 |
| `SPACING_MD` | 0.5 | 8 |
| `SPACING_BASE` | 1 | 16 |
| `SPACING_LG` | 1.5 | 24 |
| `SPACING_XL` | 2 | 32 |
| `SPACING_XXL` | 2.5 | 40 |
| `SPACING_XXXL` | 4 | 64 |
| `SPACING_XXXXL` | 6 | 96 |

**12px이 없습니다.** 8 다음이 바로 16입니다.

출처: `@skyscanner/bpk-foundations-web@24.7.0` → `tokens/base.raw.json`

### 용도별 별칭

| 토큰 | 값 |
|------|-----|
| `SPACING_ICON_TEXT` | 0.5rem (8px) |
| `CALENDAR_DAY_SPACING` | 0.5rem (8px) |

### 자간 (letter-spacing)

스페이싱과 별개로 **자간 토큰을 제공**합니다.

| 토큰 | 값 |
|------|-----|
| `LETTER_SPACING_TIGHT` | -0.02em |
| `LETTER_SPACING_HERO` | -0.04em |
| `LETTER_SPACING_DISPLAY` | -0.05em |

### 타이포그래피 / 컬러

미확인.

### 라운드 — T셔츠 5단 + 별칭 (2026-08-18 확보)

| 토큰 | rem | px |
|------|-----|-----|
| `$bpk-border-radius-xs` | 0.25 | 4 |
| `$bpk-border-radius-sm` | 0.5 | 8 |
| `$bpk-border-radius-md` | 0.75 | 12 |
| `$bpk-border-radius-lg` | 1.5 | 24 |
| `$bpk-border-radius-xl` | 2.5 | 40 |
| `$bpk-border-radius-full` | — | 100% |

컴포넌트 별칭이 따로 있습니다 — `$bpk-button-border-radius: 0.5rem` ·
`$bpk-select-border-radius: 0.5rem` · `$bpk-border-radius-nav-tabs: 1.125rem`(18px) ·
`$bpk-flare-corner-radius: 1.3125rem`(21px). **md(12) 다음이 lg(24)로 배가 뜁니다.**

출처: `@skyscanner/bpk-foundations-web@24.7.0` → `tokens/base.default.scss`

## 컴포넌트

~~미확인 — 문서 사이트 미확인.~~ → 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

컴포넌트가 개별 `bpk-component-*` 패키지에서 **`@skyscanner/backpack-web@43.19.0`
단일 패키지로 통합**돼 있습니다 (구 unscoped `bpk-component-*`는 정지).
아래 값은 전부 이 패키지의 `bpk-component-*/src/*.module.css`에서 실측했습니다.

### 버튼 (`bpk-component-button`)

| | 기본 | large |
|---|:--:|:--:|
| **min-height** | **2.25rem (36px)** | 3rem (48px) |
| 상하 패딩 | 6px | 12px |
| 좌우 패딩 | 16px | 16px |
| 아이콘 전용 좌우 | 10px | 12px |
| 라운드 | 8px (`--bpk-private-button-dimension-radius`) | 8px |
| 서체 | 16px / 24px / **700** | 동일 |

- **높이가 `height`가 아니라 `min-height`입니다** — 내용이 넘치면 늘어납니다.
  **최소 너비는 없습니다** (`min-width` 0회).
- **버튼 서체가 16px 굵기 700입니다** — 본문 크기 그대로 볼드만 얹는 방식.
  14px·500~600 다수 진영과 갈립니다.
- 크기 변형이 **2단뿐**입니다 (기본·large). small이 없습니다.
- 모든 색·치수가 `--bpk-private-button-*` CSS 변수 + 폴백 체인입니다 —
  이름에 **`private`를 박아** 소비자 오버라이드용이 아님을 표시한 내부 테마 주입층.
  SLDS 훅·Cloudscape `--awsui-style-*` 같은 "오버라이드 환영" 계열과 정반대 신호입니다.
- 변형: primary · secondary · destructive · featured · link · link-underlined
  + on-dark/on-light 3종. **link-underlined는 밑줄을 `background-size` 전환(200ms ease)으로**
  긋고 지웁니다 — `text-decoration`이 아닙니다.

### 입력 (`bpk-component-input`)

| | 기본 | large |
|---|:--:|:--:|
| **height** | **2.25rem (36px)** | 3rem (48px) |
| 패딩 | 8px | 좌우 16px |
| 라운드 | 8px | **12px** |
| 보더 | 1px `#c1c7cf` | 동일 |

- 버튼과 같은 36/48px 2단 — **버튼은 min-height, 입력은 고정 height**입니다.
- **large에서 라운드가 8→12px로 커집니다** — 크기 변형이 라운드까지 바꾸는 드문 사례.
- 라벨은 플로팅이 아니라 **별도 블록 요소**(`bpk-component-label`) —
  12px / 16px / 700, 입력 위에 놓입니다.
- valid/invalid 아이콘을 **base64 SVG를 `background`로 인라인** — DOM 요소가 아닙니다.
- `--docked` 변형이 첫/중간/끝 라운드를 접어 **검색바 조합**(항공검색 폼)을 만듭니다.

### 모달 (`bpk-component-modal`) — V1·V2·V3 3세대 병존

| | V1 | V2 (`<dialog>`) |
|---|---|---|
| 폭 | max-width **32rem (512px)** | width 32rem |
| wide 변형 | 64rem (1024px) | 64rem |
| 라운드 | 8px (`--bpk-radius-sm`) | **12px** (`--bpk-radius-md`) |
| 진입 | scale(0.9)→1 + 페이드, **200ms ease-in-out** | 동일 (keyframes) |
| 내용 패딩 | 16px | 16px |

- **폭 단계가 512 / 1024px 둘뿐**입니다 (+모바일 전체화면). Cloudscape 5단계와 대극.
- 뷰포트 `32rem` 이하에서 자동 전체화면 — **모달 폭과 브레이크포인트가 같은 값**입니다.
- 스크림 `rgba(0,0,0,.7)`, 200ms 페이드. V2는 네이티브 `<dialog>` + `::backdrop`.
- V3는 400ms `cubic-bezier(0.5, 0, 0, 1)` — 아래 이징 절 참조.

### 이징 — 토큰이 없음을 확정 (backlog 해소)

`bpk-foundations-web@24.7.0` 전 파일(raw.json·scss·js)에서 `easing`/`cubic-bezier`
**0건**. 토큰은 지속시간 3개뿐입니다 (`$bpk-duration-xs/sm/base` = 50/200/400ms).

컴포넌트 층(backpack-web 43.19.0 전체 CSS 실측)의 이징 사용 분포:

| 이징 | 사용 횟수 | 어디에 |
|------|:---:|------|
| `ease-in-out` 리터럴 | 42회(200ms)+13회(400ms) | 모달·카드·폼 등 대부분 |
| `ease` 리터럴 | 13회 | 링크 밑줄 등 |
| `cubic-bezier(0.4, 0, 0.2, 1)` | 8회 | chatbot-input · chat-thought-bubble |
| `cubic-bezier(0.5, 0, 0, 1)` | 5회 | **ModalV3** |
| `cubic-bezier(0.2, 0, 0, 1)` | 2회 | chat-bubble |

- **본류는 `ease-in-out` 리터럴 + 지속시간 토큰** 조합입니다
  (`transition: opacity $bpk-duration-sm ease-in-out`).
- **신규 컴포넌트(챗·ModalV3)에서 Material 곡선이 손글씨로 유입 중입니다** —
  `(0.4,0,0.2,1)`은 Material 표준, `(0.2,0,0,1)`은 M3 standard와 일치.
  서로 다른 곡선 3종이 토큰 없이 5개 파일에 흩어져 있습니다 — 이징을
  토큰화하지 않은 시스템에서 드리프트가 시작되는 표본입니다.

### 특징적 결정 (심화분)

- **버튼·입력이 36/48px 2단 공유** — small 부재, 컴포넌트 간 높이 정합
- **버튼 서체 16px·700** — 본문 크기에 볼드
- **`--bpk-private-*` 변수층** — 오버라이드 금지를 이름으로 선언
- **이징 무토큰 + 리터럴 본류 + 신규 컴포넌트의 Material 곡선 유입**
- **모달 폭 = 브레이크포인트(32rem)** — 한 값이 두 역할

## 특징적 결정

- **8px과 16px 사이가 비어 있습니다.** 12px을 제공하지 않습니다.
  표본에서 12px이 없는 시스템은 Backpack과 Protocol뿐입니다.
- **스페이싱을 rem으로 정의합니다.** px이 아니라 rem이 원본 단위입니다.
  사용자 폰트 크기 설정에 여백이 함께 반응하는데, 접근성 면에서는 유리하지만
  고정 픽셀 그리드와는 맞추기 어렵습니다.
- **하단이 1px까지 내려갑니다.** `SPACING_XXS`가 0.0625rem(1px)입니다.
  보더 두께 수준의 값을 스페이싱 스케일에 포함시킨 드문 사례입니다.
- **자간을 토큰화했습니다.** 대부분의 시스템은 자간을 타이포 스타일 안에 숨기지만,
  Backpack은 독립 토큰으로 노출합니다. 셋 다 음수입니다.
- **`BASE`라는 이름을 씁니다.** T셔츠 사이즈 한가운데에 `MD`가 아니라 `BASE`를 두고,
  `MD`(8px)는 그 아래에 있습니다. 이름만 보고 크기를 짐작하기 어렵습니다.

## 접근성

rem 기반 스페이싱은 사용자 폰트 설정에 반응한다는 점에서 접근성에 유리합니다.

~~명시적 준수 목표는 미확인.~~ → **해소 (2026-08-18, 헤드리스 렌더).**
문서 사이트가 준수 목표를 명시합니다 — "We aim for all components to meet the
Web Content Accessibility Guidelines (**WCAG 2.2 AA**) and all design decisions to be inclusive."

코퍼스에서 드물게 **2.1이 아닌 2.2**를 목표로 잡은 사례입니다. 함께 명시된 대비 기준:
본문 텍스트 **4.5:1**, 큰 텍스트(굵고 큰 글자) **3:1**, UI 컴포넌트 **3:1**
(장식용 텍스트·비활성 상태는 예외). Product Design 스와치 팔레트에는
`AA` 심볼이 붙어 있고, **심볼이 없는 색은 텍스트와 함께 쓰도록 의도되지 않았습니다.**

접근성 문서가 **역할별로 4갈래**(Product Designers · Engineers · Content Designers ·
Product Owners)로 나뉘어 있는 것도 특징입니다.

출처: https://www.skyscanner.design/latest/accessibility/for-product-designers-q334fp0Q
(역할별 분기는 https://www.skyscanner.design/latest/accessibility/overview-8grGx1o6)

## 참고

- 저장소: https://github.com/Skyscanner/backpack
- 패키지: `@skyscanner/bpk-foundations-web` (토큰) ·
  `@skyscanner/backpack-web@43.19.0` (컴포넌트 통합 — 2026-08-18 심화에 사용)
- 라이선스: 컴포넌트 CSS 헤더에 **Apache-2.0** 명기 — frontmatter 반영 (2026-08-18)
- **Figma 킷 (2026-08-18 해소 — `figma_kit: true`)**: 문서에 "Backpack in Figma"
  절이 따로 있고, **Figma Libraries로 foundations · components · patterns를 배포**한다고
  명시합니다. 소유 구분도 문서화돼 있습니다 — 디자인은 Backpack Designers,
  코드는 Web=Clover Squad · Apps=Donburi Squad. 패턴은 각 프로덕트 디자이너/스쿼드 소유.
  페이지에서 `figma.com/file/yN0hFyZlKL0Jwbpi0rEKYT/Backpack-Beta` 파일을 링크합니다
  (사내 접근 권한 필요 — 킷의 존재는 확인, 공개 열람 여부는 별개).
  출처: https://www.skyscanner.design/latest/getting-started/backpack-in-figma/foundations-components-and-patterns-4b5yBAjl
- **문서 사이트 실제 호스트 (2026-08-18)**: frontmatter의 `https://backpack.github.io`는
  루트만 응답하고 하위 경로는 전부 404입니다. 실제 문서는
  **https://www.skyscanner.design/latest** (Supernova 호스팅)에서 서비스되며,
  `backpack.github.io/`가 이 사이트와 동일한 셸을 반환합니다(DOM 64,804B 동일).
  이 문서의 2026-08-18 렌더 출처는 모두 `www.skyscanner.design` 기준입니다.
- **라이선스 해소 (2026-08-18):** `Apache-2.0` — 출처: github Skyscanner/backpack → `LICENSE` (npm `@skyscanner/bpk-foundations-web@24.7.0` 메타와 일치)
