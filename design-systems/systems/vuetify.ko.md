---
name: Vuetify
org: 오픈소스 (Vuetify)
coverage: partial
url: https://vuetifyjs.com
repo: https://github.com/vuetifyjs/vuetify
license: MIT
tech: [Vue, SCSS]
figma_kit: true
tokens_format: [SCSS]
a11y_target: "명시 없음 확인 (2026-08-18 — 접근성 문서에 WAI-ARIA 구현 안내만, WCAG 버전·등급 목표 부재)"
platform: web
domain: framework
verified: 2026-08-18
source: "npm vuetify@4.1.10 → lib/styles/settings/_variables.scss · lib/components/*/_variables.scss · dist/vuetify.min.css (표·내비·피드백 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](vuetify.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**코퍼스 첫 Vue 표본** — 기록돼 있던 "Vue·Svelte 계열 0개" 편향이 여기서 풀립니다.
`$spacer: 4px` 시드에 배수 0~16으로 스페이싱을 만드는 Material 혈통 프레임워크입니다.

## 토큰 — SCSS 변수

```scss
$spacer: 4px !default;           // Bootstrap($spacer: 1rem)과 같은 이름, 다른 값
$font-size-root: 1rem !default;  // 16px
$border-radius-root: 4px !default;
$body-font-family: var(--v-font-body, 'Roboto', sans-serif) !default;
$grid-columns: 12 !default;
```

- **`$spacer`가 Bootstrap과 같은 이름인데 값이 16px이 아니라 4px입니다** —
  같은 관용구, 다른 시드. 유틸리티는 `ma-0`~`ma-16`(×4px)으로 열거됩니다.
  코어값(4/8/16/24/32) 전부 생성됩니다
- 본문 16px(root) · Roboto — Material 혈통이 서체·라운드에 그대로
- `!default` 전면 사용 — Bootstrap과 같은 "전부 덮어쓰기 가능" 계약

## 컴포넌트 심화 — (2026-08-18)

`vuetify@4.1.10`의 `lib/components/` — 컴포넌트 102개가 각각
`_variables.scss`(산식) + 빌드 CSS(실값) 쌍으로 배포됩니다. VBtn · VField/VInput ·
VDialog + `transitions/dialog-transition.js` 실측.

### 버튼 (VBtn) — 기하가 비율 산식

| | x-small | small | default | large | x-large |
|---|:--:|:--:|:--:|:--:|:--:|
| **height** | 20px | 28px | **36px** | 44px | 52px |
| min-width | 36px | 50px | 64px | 78px | 92px |
| 좌우 패딩 | 8px | 12px | 16px | 20px | 24px |
| 서체 | 10px | 12px | 14px | 16px | 18px |

- **min-width = height × 16⁄9, 패딩 = height ÷ 2.25** — `$button-width-ratio:
  math.div(16, 9)` · `$button-padding-ratio: 2.25`로 다섯 크기가 전부 산식
  파생입니다 (64 = 36×16/9). MUI(행간 파생 높이)와 다른 **비율 파생** 방식.
- **크기 5단 × 밀도 3단 직교** — density가 height에 0/−8/−12px을 더합니다
  (아이콘 버튼은 +12/0/−8). 크기와 밀도를 독립 축으로 둔 Material 밀도
  시스템의 실측 표본입니다.
- 기본 변형이 **elevated**(그림자 있음), 라운드 4px, 굵기 500,
  자간 0.0071em(=0.1px/14px) — **M3 label-large 규격 그대로**인데
  `$button-text-transform: none`으로 **uppercase 전통은 폐기**했습니다.
- 상태가 `.v-btn__overlay` 요소 + `calc(var(--v-hover-opacity) ×
  var(--v-theme-overlay-multiplier))` — **상태층 불투명도에 테마 배수를
  곱합니다** (다크 테마가 배수 하나로 상태 강도를 조절). eBay(:after
  state-layer)와 같은 패턴의 요소 구현.
- 전환 `0.28s cubic-bezier(0.4, 0, 0.2, 1)`, 비활성 opacity 0.26.

### 입력 (VField) — 크기 축이 없고 밀도만

- 높이 56/48/40px (default/comfortable/compact) — **버튼은 크기5×밀도3,
  입력은 밀도 3단만**. 같은 시스템 안에서 두 컴포넌트의 변형 축이 다릅니다.
- outlined 보더 1px→포커스 2px, 서체 16px, 라운드 4px, filled 오버레이 4%.
- 라벨 축소 scale 0.75 (MUI와 같은 플로팅) — 단 **노치를 fieldset이 아니라
  `__outline__start`(12px)/`__notch`/`__end` 3분할 div의 보더로** 조립합니다.
  같은 Material 노치의 두 번째 구현 방식.

### 다이얼로그 (VDialog) — 폭 스케일이 없다

- **고정 폭 단계가 아예 없습니다** — `width: calc(100% − 48px)` + margin 24px뿐,
  max-width는 소비자가 지정합니다. MUI(브레이크포인트 재사용)·Cloudscape(전용
  5단)에 이은 세 번째 태도: **폭 스케일 자체를 갖지 않음**.
- 스크림 `#000` 0.32. 콘텐츠 라운드 4px, 그림자는 key+ambient **2층 합성**
  (`--v-shadow-key-opacity` 0.3 / `-ambient-` 0.15) — M3 elevation 문법.
- **진입 애니메이션이 CSS가 아니라 WAAPI(JS)입니다** — 트리거 요소(`target`)의
  박스에서 다이얼로그 최종 위치까지 translate+scale로 날아오는
  **container-transform(히어로) 전환**을 프레임워크가 기본 제공합니다.
  225ms 감속 진입 / 125ms 가속 퇴장 비대칭에, **이동 거리에 따라 지속시간을
  1~1.5배로 늘립니다** (`speed = min(1.5, (거리비 − 0.12) × 10 + 1)`) —
  지속시간이 거리의 함수인 표본 유일 사례. reduced-motion이면 페이드
  125/85ms로 대체.

### 표 (VTable · VDataTable) — 밀도가 CSS 변수 2개로 압축됩니다

`vuetify@4.1.10` `lib/components/VTable/_variables.scss` + `dist/vuetify.min.css` 실측.

| 밀도 | 헤더 높이 | 행 높이 |
|---|:--:|:--:|
| default | **56px** | **52px** |
| comfortable | 48px | 44px |
| compact | **40px** | **36px** |

- **밀도가 `--v-table-header-height` · `--v-table-row-height` 두 변수뿐**입니다.
  셀 패딩(`0 16px`)·서체는 밀도와 무관하게 고정 — Cloudscape가 43개 토큰에
  밀도 축을 두는 것과 정반대의 최소 구현입니다.
- 밀도 계수는 `('default': 0, 'comfortable': -2, 'compact': -4)`이고 결과가
  56→48→40 / 52→44→36으로 **한 단계 −8px 등차**입니다.
- **셀 패딩이 세로 0 / 가로 16px**입니다 — 높이를 `height`로 직접 잡으므로
  세로 패딩이 필요 없습니다. 확보 표본 중 세로 패딩이 0인 유일 사례.
- **고정 헤더가 `box-shadow: inset 0 -1px` + `z-index: 1`**입니다
  (`border-collapse` 회피는 Radix Themes·Mantine과 같은 해법, z는 1로 가장 낮음).
  고정 열은 `z-index: 1`, 고정 열 ∩ 고정 헤더 교차 셀만 **2**로 올립니다.
- **줄무늬가 배경색이 아니라 `background-image: linear-gradient()`**입니다
  (`striped-even` / `striped-odd` 두 변형). 배경색을 비워 두어 선택·hover
  배경과 겹칠 수 있게 한 구조입니다.
- **hover도 배경색이 아니라 `td::after` 오버레이**입니다 — 버튼의
  `.v-btn__overlay`와 같은 상태층 방식이 표에도 적용됩니다.
- **정렬 아이콘이 미정렬 상태에서 `opacity: 0`, hover·focus에서 `0.5`**입니다
  (`$data-table-header-sort-icon-default-opacity` / `-hover-opacity`).
  Carbon의 "미정렬 화살표는 hover에서만" 규정과 코드 층에서 일치합니다.
  정렬 순번 배지는 20px(`$data-table-header-sort-badge-size`).
- 경계선은 `--v-border-color` × `--v-border-opacity`의 알파 합성이며,
  `gridlines-vertical` / `-horizontal` / `-all` 3변형입니다.

### 내비게이션 (VNavigationDrawer · VTabs · VList · VBreadcrumbs)

| 항목 | 값 |
|---|---|
| 드로어 폭 | **256px** (`width` prop 기본) |
| 레일(접힘) 폭 | **56px** (`railWidth` 기본) |
| 드로어 전환 | 0.2s, 스크림 불투명도 0.2 |
| 탭 리스트 높이 | **48 / 44 / 36px** (default/comfortable/compact) |
| 탭 최소·최대 폭 | 90px / 360px |
| 탭 인디케이터 | **2px** (`$tab-slider-size`), 가로=하단 / 세로=우측 |
| 리스트 항목 최소 높이 | **40 / 36 / 32px** (밀도 3단) · 1줄 변형은 48 / 44 / 40 |
| 리스트 항목 패딩 | 4px / 16px |
| 계층 들여쓰기 | **16px** (`$list-indent-size`, 단계마다 누적) |
| 브레드크럼 구분자 패딩 | 0 8px · 항목 패딩 0 4px · 컨테이너 16/12px |

- **레일 폭 56px은 확보 표본에서 가장 넓은 축**입니다 (shadcn/ui·Carbon 48 ·
  Cloudscape 52~54 · Semi 60 · Ant 80). 아이콘 24px + 좌우 16px 전제입니다.
- **탭 인디케이터가 세로 방향에서 높이·폭이 뒤바뀝니다** — 가로 탭은
  `height: 2px; bottom: 0`, 세로 탭은 `width: 2px; top: 0`.
  shadcn/ui의 가로 2px / 세로 2px 분기와 같은 구조입니다.
- **`inset` 변형에서는 인디케이터가 선이 아니라 배경 알약이 됩니다**
  (`inset: 0; z-index: -1; border-radius: $tab-inset-radius`) — 밑줄과 알약을
  같은 요소로 처리합니다.
- 브레드크럼도 밀도 3단(`0/-1/-2`)을 갖습니다 — 표본에서 브레드크럼에
  밀도 축을 둔 유일 사례입니다.

### 피드백 (VAlert · VSnackbar · VBadge)

| 컴포넌트 | 값 |
|---|---|
| **Alert** 패딩 | **16px 사방** · 밀도 3단(`0/-1/-2`) |
| Alert 보더 | 기본 0, `border` prop 지정 시 **8px** (`$alert-border-thin-width`) |
| Alert 아이콘 | **1.75rem(28px)**, 우측 여백 16px |
| Alert 제목 | `headline-small` 규격, 행간 1.75rem |
| **Snackbar** 폭 | **min 344px / max 672px**, 최소 높이 48px |
| Snackbar 패딩 | **14px 16px** · 래퍼 마진 8px |
| Snackbar 진입 | scale **0.8** → 1, elevation 2, z-index **10000** |
| **Badge** 높이 | **1.25rem(20px)**, min-width 20px, 라운드 10px |
| Badge 패딩·서체 | 4px 6px · 12px / 굵기 500 |
| Badge dot | 9×9px, 보더 1.5px |

- **얼럿 강조 보더가 8px**입니다 — 확보 표본에서 가장 두껍습니다
  (Carbon 6px · EUI 3px · Cloudscape 2px · Mantine 1px). 색은 `currentColor`에
  불투명도 0.38.
- **배지 테두리가 2px + `scale(1.05)`**입니다 — 배경 위에 얹힐 때 아바타·아이콘과
  분리하기 위해 보더를 확대합니다. 확보 표본에서 배지에 스케일 보정을 넣은 유일 사례.
- Snackbar에 **최소 폭(344px)과 최대 폭(672px)이 둘 다** 있습니다.
  다른 표본은 대부분 고정 폭 하나(Sonner 356 · PrimeVue 352 · Ant 384)입니다.

### 특징적 결정 (심화분)

- **버튼 min-width 16:9 · 패딩 ÷2.25** — 치수 목록이 아니라 비율 산식
- **크기 × 밀도 직교** (버튼 15조합) vs 입력은 밀도만 — 축 비대칭
- **다이얼로그 히어로 전환 + 거리 가변 지속시간** — WAAPI 구현
- 상태층 불투명도 = 토큰 × 테마 배수 곱셈
- M3 label-large 수치를 따르면서 uppercase는 폐기 — Material 혈통의 선택적 이탈

## 특징적 결정

- **첫 Vue 프레임워크 표본** — React 편중(프레임워크 7/7)이 처음 깨짐
- `$spacer` 이름 재사용 + 값 변경 — `GLOSSARY.md` 이름-값 함정 계열
- Material 혈통 기본값 (Roboto·radius 4)

## 접근성

~~미확인.~~ → **부재 확정 (2026-08-18, 헤드리스 렌더).**

접근성 전용 문서(`/en/features/accessibility/`)가 있는데도
**WCAG 버전·등급 목표를 선언하지 않습니다.** 문서는 전부 "무엇을 구현해 뒀는가"입니다:

- **activator 슬롯이 a11y 속성을 내려보냅니다.** `v-menu`·`v-dialog` 등의
  `activator` 슬롯 스코프로 `props`를 넘기면, 렌더된 `v-btn`에
  `aria-expanded` · `aria-haspopup` · `role="button"`이 자동으로 붙습니다.
- **`v-list-item`이 `v-menu` 안에서는 `role="menuitem"`으로 자동 전환**됩니다.
- 키보드 상호작용은 마우스 동작 전부에 대응하며, `v-menu`는 ↑/↓ 이동을 지원합니다.

"Additional Resources"로 외부 링크(W3C WAI · WAI-ARIA Authoring Practices ·
The A11Y Project)를 걸어 두는 것으로 준수 기준을 대신합니다.

**목표(선언) 없이 기법(구현)만 문서화한** 유형입니다 — Base Web과 같은 계열이나,
Base Web이 axe-core 런타임 검증기를 제공하는 반면 Vuetify는 **컴포넌트 API 차원의
ARIA 자동 주입**으로 처리합니다 (C 분류 — 준수 목표 비공개).

출처: https://vuetifyjs.com/en/features/accessibility/ (렌더 확인, 2026-08-18)

## 참고

- 토큰: `npm pack vuetify@4.1.9` → `lib/styles/settings/`
- 컴포넌트 심화: `vuetify@4.1.10` → `lib/components/{VBtn,VField,VInput,VDialog,
  VOverlay}/` + `lib/components/transitions/dialog-transition.js` (2026-08-18)
- **남은 확인 사항:** ~~컴포넌트 목록~~(102개), ~~테마 구조~~(`--v-theme-*`
  rgb 트리플릿 + `--v-hover-opacity` 등 상태 불투명도 + `--v-theme-overlay-multiplier`
  배수 — 심화 절), Material 3 대응 여부(타이포 역할명 `label-large`·2층 그림자 등
  M3 문법은 확인 — 공식 M3 준수 선언은 미확인),
  ~~figma_kit·a11y_target~~ (2026-08-18 해소/부재 확정)
- **Figma 킷 (2026-08-18 해소 — `figma_kit: true`)**: **무료**입니다.
  전용 문서 페이지 `/en/resources/ui-kits/`가 있고, 배포 경로가 셋입니다 —
  ① **Figma 플러그인**(권장), ② **Figma Community 파일**
  (https://www.figma.com/community/file/1266515419060480209),
  ③ **Vuetify Store 직접 다운로드**
  (https://store.vuetifyjs.com/products/vuetify-ui-kit-figma →
  `vuetify-figma-ui-kit.zip` 안의 `vuetify3-ui-light-kit.fig`를 Import).
  파일명이 `-light-`인 데서 보이듯 **라이트 테마 한 벌만** 배포됩니다.
  출처: https://vuetifyjs.com/en/resources/ui-kits/ (렌더 확인, 2026-08-18)

4.1.10 재검증 — 토큰 값 무변경 (2026-08-18)
