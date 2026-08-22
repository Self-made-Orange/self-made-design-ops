---
name: EUI (Elastic UI)
org: Elastic
coverage: partial
url: https://eui.elastic.co
repo: https://github.com/elastic/eui
license: SSPL-1.0 / Elastic-2.0 듀얼 (일부 파일은 Apache-2.0 호환)
tech: [React]
figma_kit: 미확인
tokens_format: [JS/TS]
a11y_target: "WCAG 2.1 (레벨 미명시 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @elastic/eui-theme-common@10.0.0 → lib/esm/global_styling/variables/size.d.ts · npm @elastic/eui-theme-borealis@8.0.0 (컴포넌트·levels, 2026-08-18) · npm @elastic/eui@119.0.0 → es/components/{table,datagrid,tabs,breadcrumbs,toast,call_out,badge} (표·내비·피드백 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](eui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Elastic(Elasticsearch·Kibana)의 데이터 분석 도구용 디자인시스템.
**스케일 한가운데에 `base`라는 이름의 단계를 둡니다.**

## 토큰

### 사이즈 / 스페이싱

| 토큰 | 값 |
|------|-----|
| `xxs` | 2px |
| `xs` | 4px |
| `s` | 8px |
| `m` | 12px |
| **`base`** | **16px** |
| `l` | 24px |
| `xl` | 32px |
| `xxl` | 40px |
| `xxxl` | 48px |
| `xxxxl` | 64px |

**`2 / 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64` — 공통 코어를 전부 포함합니다.**
20px과 6px이 없고, 상단이 64px에서 끝납니다.

출처: `@elastic/eui-theme-common@10.0.0` → `lib/esm/global_styling/variables/size.d.ts`
(타입 정의의 JSDoc `@default` 주석에 실값이 적혀 있습니다)

### 명명 — `base`가 중간에 있습니다

```
xxs · xs · s · m · base · l · xl · xxl · xxxl · xxxxl
```

T셔츠 사이즈 순서 중간에 `base`가 끼어 있습니다.
`m`(12px)과 `l`(24px) 사이가 `base`(16px)입니다.

Backpack도 `BASE`를 쓰지만 위치가 다릅니다 — Backpack은 `MD`(8px) **위**에 `BASE`(16px)를 둡니다.
**두 시스템 모두 T셔츠 순서만으로는 크기를 짐작할 수 없습니다.**

### 라운드 / 타이포그래피 / 컬러

~~미확인 — `variables/borders.js`, `variables/typography.js`에 있습니다.~~
→ 라운드·타이포는 아래 심화 절에서 해소 (2026-08-18). 컬러 팔레트 전체는 여전히 미확인.

## 컴포넌트

`global_styling/variables/`에 `buttons` · `states` · `levels` · `components` 등
컴포넌트 관련 변수 파일이 있습니다. ~~목록·개수는 미확인입니다.~~
→ `@elastic/eui@119.0.0`의 `lib/components/` 디렉터리 90개 (2026-08-18).
버튼·입력·모달은 아래 심화 절.

## 컴포넌트 심화 — (2026-08-18)

`@elastic/eui@119.0.0`의 emotion 스타일 JS(`lib/**/*.styles.js` · `mixins/_button.js`)를
파싱하고, 값 참조는 **기본 테마 패키지 `@elastic/eui-theme-borealis@8.0.0`**의
변수 JS로 해석했습니다. 주의 — 토큰 절의 `.d.ts` JSDoc 함정(HARVESTING 교훈 2)과 달리,
**테마 실값은 borealis의 런타임 JS(`lib/esm/variables/_*.js`)에 평문으로 있습니다.**
`eui-theme-common`은 타입·유틸이고, 실값이 필요하면 테마 패키지를 여는 쪽이 빠릅니다.

### 기본 테마 (borealis) 확정값

| 항목 | 값 |
|------|-----|
| 라운드 | `small` = `medium` = **4px** (둘 다 `base×0.25` 산식) |
| 보더 | thin 1px · thick 2px |
| 서체 | Inter / 굵기 300 · 400 · **450(medium)** · 500(semiBold) · 600(bold) |
| 타이포 스케일 | 9 · 11 · 12 · 14 · 16 · 20 · 24 · 30px (Major Third 근사) · 본문 `s`(**14px**) |
| 지속시간 | 90 · 150 · 250 · 350 · 500ms (`extraFast`~`extraSlow`) |
| 이징 | `bounce (.34,1.61,.7,1)` · `resistance (.32,.72,0,1)` **2개뿐** |
| 브레이크포인트 | 0 / 575 / 768 / 992 / 1200 |

- **라운드 토큰이 2개인데 값이 같습니다** — small=medium=4px. 이름만 남고
  단계는 소멸한 단일 라운드 시스템입니다.
- **굵기 450** — 100 단위를 벗어난 굵기는 표본에서 Apple SF(590)와 EUI(450)
  정도입니다. Inter 가변 서체 전제의 값입니다.

### 버튼 (`mixins/_button.js` `euiButtonSizeMap` + `_button_display.styles.js`)

| | xs | s | m(기본) |
|---|:--:|:--:|:--:|
| **height** | 24px (`size.l`) | 32px (`size.xl`) | 40px (`size.xxl`) |
| 좌우 패딩 | 6px (`size.m`÷2) | 8px (`size.s`) | 12px (`size.m`) |
| **min-width** | 96px (`base×6`) | 96px | **112px (`base×7`)** |
| 라운드 | 4px | 4px | 4px |
| 서체 | 12px | 14px | 14px |

- 높이가 **스페이싱 토큰 그대로**입니다(l/xl/xxl) — 전용 컨트롤 높이 토큰이 없습니다.
- `line-height: 높이` 단일행 정렬, 굵기 450(medium).
- **최소 너비가 토큰이 아니라 `base×6/7` 산식**입니다. 96px는 Fluent 2 medium과
  같은 값이지만(`patterns/button.md`), Fluent는 상수·EUI는 곱셈입니다.
- 색은 `components.buttons.*` 전용 토큰층(색 7종 × base/fill/empty × 기본/hover/active)
  에서 꺼내며, **base·empty 변형의 hover는 배경 교체가 아니라 `::before` 오버레이**를
  얹습니다(fill만 배경 직접 교체).

### 입력 (`form.styles.js` `euiFormVariables`)

| | 기본 | compressed |
|---|:--:|:--:|
| **height** | **40px** (`size.xxl`) | 32px (`size.xl`) |
| 패딩(4방) | 12px (`size.m`) | 8px (`size.s`) |
| 라운드 | 4px | 4px |
| 최대 너비 | **400px (`base×25`)** | 동일 |

- 기본 높이 40px이 **버튼 m과 같은 토큰**(`size.xxl`)입니다 — 버튼·입력 높이 정합.
- **입력에 기본 `max-width: 400px`가 걸려 있습니다** — 폼 폭을 토큰으로 제한하는
  드문 결정입니다.
- 좌우 패딩이 **아이콘 개수 CSS 변수로 가산**됩니다:
  `calc(12px + 24px × var(--euiFormControlLeftIconsCount, 0))`. 아이콘 슬롯을
  DOM 계측 없이 카운터 변수로 푸는 방식입니다.
- 라벨은 별도 블록 요소 — 타이틀 `xxxs`(12px) + 굵기 500(semiBold),
  라벨-필드 간격 4px(`size.xs`), 행 간 16px(`size.base`).
- 그룹(prepend/append) 안에서는 input 높이를 **컨트롤−2px**로 줄여 보더 몫을 뺍니다.
- 전환: 150ms(`animation.fast`) ease-in.

### 모달 (`modal.styles.js`)

| 항목 | 값 |
|------|-----|
| **min-width** | **400px — 입력 `maxWidth` 재사용** (`euiFormVariables().maxWidth`) |
| 기본 max-width | `min(768px(브레이크포인트 m), 100vw − 16px)` |
| 라운드 | 4px (`radius.medium`) |
| max-height | 75vh · 768px 미만 자동 전체화면 |
| 진입 | **translateY(40px)→0 + 페이드, 350ms `bounce (.34,1.61,.7,1)`** |
| 패딩 | 헤더 `24 40 16 24`(우측 40 = 닫기 아이콘 몫) · 본문 24/8 · 푸터 24/16~24, gap 16 |
| 스크림 | rgba(72, 89, 117, 0.7) — blueGrey100 70% |

- **폼의 max-width(400px)가 모달의 min-width입니다** — 한 값 두 역할.
  Backpack(모달 폭=브레이크포인트)·MUI(다이얼로그 폭=브레이크포인트)와 같은
  재사용 진영이며, EUI는 재사용 대상이 폼 토큰이라는 점이 다릅니다.
- **기본 진입 이징이 bounce입니다** — y2=1.61로 `patterns/motion.md` 오버슈트
  순위에서 TDS `back`(1.56)을 웃돌고 Spindle(2.05) 아래입니다. 밀집
  엔터프라이즈 도구가 모달마다 튀는 곡선을 쓰는 드문 조합입니다.
- 스크림이 검정이 아니라 **청회색 70%**입니다 — Evergreen(rgba(67,90,111,.7))과
  거의 같은 색·같은 농도입니다. 데이터 도구 두 표본이 독립적으로 같은 결정.

### 표 (`basic_table` · `datagrid`) — 두 컴포넌트가 다른 좌표계

| 항목 | 값 |
|---|---|
| **basic table 셀 패딩** | `size.s` = **8px** · compressed `size.xs` = **4px** |
| basic table 셀 최소 높이 | `size.l` = **24px** |
| 체크박스 열 폭 | `size.xl` = **32px** |
| 모바일 액션 열 폭 | `size.xxl` = 40px · 오프셋 = 셀 패딩 × 2 |
| **datagrid 기본 행 높이** | **34px** (`DEFAULT_ROW_HEIGHT`) |

- **한 시스템에 표가 둘입니다** — `EuiBasicTable`(문서형, 콘텐츠 높이)과
  `EuiDataGrid`(가상 스크롤, **고정 34px**). Blueprint(20px)에 이어
  가상 스크롤용 고정 행 높이를 실제로 제공하는 두 번째 사례이고, 값은 14px 더 큽니다.
- **모바일에서 `thead`·`tfoot`을 `display: none`으로 지웁니다**
  (`table.styles.js`) — 셀을 세로 카드로 재배치하는 반응형 표입니다.
  확보 표본에서 표의 모바일 레이아웃을 CSS로 규정한 사례입니다.
- 셀 정렬 3종(left 기본 / right / center)에서 **right일 때만 아이콘·라벨 순서가
  `flex-direction` 반전**되지 않고 `justify-content: flex-end` + 논리 정렬로 처리합니다.
- 액션 셀만 간격이 갈립니다 — 표준 액션 `size.xs`(4px), 커스텀 `size.s`(8px).

### 내비게이션 (`tabs` · `breadcrumbs`) · z-index 층위

| 항목 | 값 |
|---|---|
| 탭 좌우 패딩 | `size.xs` = **4px** · 아이콘-라벨 간격 8px |
| 탭 높이(행간 파생) | s **32px**(`size.xl`) · m **40px**(`size.xxl`) · l `size.xl + size.s` = 40px |
| 탭 굵기 | `font.weight.semiBold` |
| 탭 인디케이터 | `border.width.thick`(**2px**), 고대비 모드에서 **×2 = 4px** |
| 탭 리스트 | 하단 `border.thin` |
| 브레드크럼 간격 | `size.xs` = **4px** |

- **탭 높이를 `height`가 아니라 `line-height`로 만듭니다** — 상하 패딩이 0이고
  행간이 곧 높이입니다. `l` 단계가 `xl + s` = 40px로 `m`(xxl = 40px)과
  **같은 값에 다른 식으로 도달**합니다 (서체 크기만 다릅니다).
- **고대비 모드에서 인디케이터가 2배(4px)로 굵어집니다.** 확보 표본에서
  활성 표시 두께를 고대비 모드에 연동한 유일 사례입니다.
- **z-index를 용도명 9단으로 토큰화합니다** (`levels.js`):

```
toast 9000 · modal 8000 · mask 6000 · navigation 6000
menu 2000 · header 1000 · flyout 1000 · maskBelowHeader 1000 · content 0
```

  **`toast`가 `modal`보다 위**이고, `navigation`이 `mask`와 같은 6000입니다.
  `maskBelowHeader`(1000)가 따로 있어 **헤더를 덮지 않는 마스크**를 별도 층위로 둡니다.

### 피드백 (`toast` · `call_out` · `badge`)

| 항목 | 값 |
|---|---|
| **토스트 리스트 폭** | `base × 27.5` = **440px** (소스 주석: *"results in 360px toast width"*) |
| 리스트 패딩 | `size.base` = 16px 사방 · 항목 간 하단 여백 16px |
| 위치 | `bottom: 0` + `side` 기본 **`'right'`** → **우하단** |
| z-index | `levels.toast` = **9000** |
| 진입 | `translateY(size.l = 24px) scale(.9)` → 0/1, `animation.normal` + `animation.resistance` |
| 퇴장 | **250ms** (`TOAST_FADE_OUT_MS`) |
| "모두 지우기" 노출 | 토스트 **3개**부터 (`CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT`) |
| 모바일 | `m` 브레이크포인트 이하에서 `left: 0; width: 100%` |
| **CallOut 패딩** | s **12 / 16px** · m **16px 사방** |
| CallOut 좌측 강조 | `border.thin + border.thick` = **3px** (`::before`, 상하 −1px 확장) |
| CallOut 간격 | s 8px / m 12px · wide 레이아웃 40px |
| **Badge** | 행간 `base + thin×2` = **18px** · 패딩 `0 (size.s − 1px = 7px)` · 라운드 `size.l`(24px, 알약) · 보더 1px 투명 · 굵기 medium |

- **배지가 보더 몫을 패딩·행간에서 뺍니다** — 소스 주석이 이유를 남깁니다
  (*"Account for the (usually transparent) border so that the visual padding is
  of size s"*). `patterns/button.md`의 "보더 몫을 패딩에서 빼는 관행"이
  배지에서도 확인되며, **이유를 주석으로 남긴 사례**입니다.
- **토스트가 기본 우하단입니다** — `side: 'right'` + `bottom: 0`.
- CallOut 좌측 강조선이 `border-inline-start`이고 컨테이너 위아래로 1px씩
  삐져나오게(`block-size: calc(100% + 2px)`) 그려 **라운드 모서리와 맞춥니다.**

### 특징적 결정 (심화분)

- **컨트롤 전용 치수 토큰이 없습니다** — 높이(스페이싱)·최소 너비(`base×n`)·
  모달 min-width(폼 maxWidth) 전부 기존 값의 재사용·산식입니다.
- 라운드가 실질 1단(4px) — 크기 변형·컴포넌트를 통틀어 4px 하나.
- 이징 토큰이 bounce·resistance 2개뿐이고 표준 ease 계열이 없습니다.
- 입력 아이콘 패딩을 CSS 카운터 변수로 가산.
- 버튼 hover를 오버레이 의사 요소로 처리(base/empty).

## 특징적 결정

- **`base`를 스케일 중간에 둡니다.** 기준값을 이름으로 명시하는 방식입니다.
  T셔츠 사이즈만 쓰는 시스템(Fluent·Ant·Cloudscape)과 다릅니다.
- **10단계로 상단이 64px에서 끝납니다.** 레이아웃 여백을 이 스케일로 다루지 않습니다.
- **토큰이 타입 정의에 있습니다.** `.d.ts`의 JSDoc 주석이 실값 출처입니다.
  런타임 JS에는 테마 팩토리만 있어, **정적 스캐너로는 값을 찾기 어렵습니다.**
- **테마 패키지가 분리돼 있습니다.** `@elastic/eui-theme-common`(공통) 외에
  `@elastic/eui-theme-borealis` 같은 테마별 패키지가 따로 배포됩니다.
- **`vis_color_store`가 별도로 있습니다.** 데이터 시각화용 색 팔레트를 시스템 레벨에서 관리합니다.
  분석 도구 특성이 반영된 구조입니다.

## 접근성

~~미확인.~~ → **WCAG 2.1 (2026-08-18 해소 — 레벨 표기는 없습니다).**
출처: `eui.elastic.co/docs/getting-started/accessibility/` — "The components provided
strive to meet WCAG 2.1 guidelines on semantics, keyboard functionality, color
contrast". 카피 가이드(`docs/content/accessibility/`)는 별도로 WCAG 2.0을 기준으로 듭니다.

## 참고

- 저장소: https://github.com/elastic/eui
- 패키지: `@elastic/eui-theme-common`, `@elastic/eui-theme-borealis`
- **주의:** 메인 패키지 `@elastic/eui`가 아니라 **`-theme-common`에 토큰이 있습니다.**
  값은 `.d.ts` JSDoc에서 읽어야 합니다.
- **정정(2026-08-18):** 실값은 **기본 테마 패키지 `@elastic/eui-theme-borealis`의
  런타임 JS**(`lib/esm/variables/_*.js`)에도 평문으로 있습니다. `.d.ts` JSDoc은
  theme-common 쪽 경로이고, 테마 실값이 필요하면 borealis를 여는 쪽이 빠릅니다.
- 컴포넌트 심화: `@elastic/eui@119.0.0` → `lib/global_styling/mixins/_button.js` ·
  `lib/components/button/button_display/_button_display.styles.js` ·
  `lib/components/form/form.styles.js` · `lib/components/modal/modal*.styles.js`
  + `@elastic/eui-theme-borealis@8.0.0` 변수 JS 교차 (2026-08-18)
- 라이선스: 패키지 LICENSE.txt에 **SSPL v1 / Elastic License 2.0 이중**
  (파일별 Apache-2.0 호환 예외 병기) — frontmatter 반영 (2026-08-18)
- **라이선스 해소 (2026-08-18):** `SSPL-1.0 / Elastic-2.0 듀얼 (일부 파일은 Apache-2.0 호환)` — 출처: github elastic/eui → `LICENSE.txt`. 파일 헤더가 우선하며 기본값이 듀얼입니다. npm `@elastic/eui-theme-common@10.0.0` 메타는 `SEE LICENSE IN LICENSE.txt`
