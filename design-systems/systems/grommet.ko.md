---
name: Grommet
org: HPE (Hewlett Packard Enterprise)
coverage: partial
url: https://v2.grommet.io
repo: https://github.com/grommet/grommet
license: Apache-2.0
tech: [React, styled-components]
figma_kit: 미확인
tokens_format: [JS]
a11y_target: "WCAG 2.1 (레벨 미명시 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm grommet@2.56.1 → es6/themes/base.js (generate 함수) · themes/base.js의 dataTable·sidebar·tab·menu·notification 토큰 (표·내비·피드백 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](grommet.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

HPE의 시스템 — **테마 전체가 숫자 하나(`baseSpacing: 24`)에서 생성**되고,
기본 본문이 **18px로 표본 최대**이며, **글줄 최대 폭을 폰트 크기 × 24로
산출**합니다 (출처 주석이 UX StackExchange).

## 토큰 — `generate(baseSpacing, scale)` 하나가 전부

```js
generate(baseSpacing = 24, scale = 6)
baseFontSize = 24 × 0.75        // 18px
fontScale    = 24 / 6           // 4
size         = 18 + factor × 4  // 단계당 4px
height       = 24 + factor × 4  // 행간
maxWidth     = 24 × size        // 글줄 최대 폭
```

**스페이싱·보더·폰트·행간·글줄 폭이 전부 24 하나에서 나옵니다** —
시드 파생 계열(Ant·Tailwind·SmartHR)에서 **파생 범위가 가장 넓은** 사례입니다.

### 스페이싱 (edgeSize) — 나눗셈 파생

```
none 0 · hair 1px · xxsmall 2 · xsmall 24/8=3 · small 24/4=6
medium 24/2=12 · large 24 · xlarge 48
```

> **정정 (2026-08-18).** 위 표는 **`breakpoints.small`(≤768px) 오버라이드**의
> 값입니다. `base.js`를 실행해 확인한 **기본(데스크톱) 스케일**은 한 단계씩
> 큽니다: `xxsmall 3 · xsmall 6 · small 12 · medium 24 · large 48 · xlarge 96`.
> 768px 아래에서 edgeSize·borderSize·size 전 스케일이 절반 계열로 교체됩니다
> (모바일용 밀도 스위치 — 이름은 같고 값만 절반). 24의 약수 격자라는 관찰
> 자체는 그대로 유효합니다.

- **3px·6px·12px** — 4px 격자가 아니라 **24의 약수 격자**입니다.
  Garden(곱수 1·2·3·5…)에 이어 4/8/16 코어를 전부 비켜 가는 두 번째 시스템
- `hair`(1px) — Charcoal에도 있던 헤어라인 이름
- 보더도 같은 방식: 1 · 2 · 24/6=4 · 24/2=12 · 24

### 타이포 — 본문 18px, 표본 최대

- **기본 폰트 18px** — 표본의 본문 기본값 축(13·14·15·16·17)을 넘는 최대값.
  단계는 18 + factor×4 등차입니다
- **글줄 최대 폭이 토큰입니다** — `maxWidth = 24 × fontSize`
  (18px 본문이면 432px). 소스 주석: "~50 characters wide,
  see ux.stackexchange.com/a/34125" — **근거 링크가 코드에 박힌** 표본 유일 사례.
  Charcoal(단락 폭 고정 토큰 9종)에 이어 글줄 폭 데이터 두 번째이며,
  Charcoal은 열거하고 Grommet은 산출합니다

## 컴포넌트

같은 패키지에 포함 — `components/` 아래 **약 95개** (Box·Layer·DataTable·
Chart·Diagram·WorldMap 등 시각화까지). 테마 파일에 `hacktoberfest2022` 같은
이벤트 테마가 같이 배포됩니다.

## 컴포넌트 심화 — (2026-08-18)

`grommet@2.56.0`의 `themes/base.js`를 **node로 실제 실행**해 테마 객체를 덤프하고
(`grommet-icons`·`styled-components` 등 피어 의존성 설치 후),
`components/Button/StyledButton.js` · `components/Layer/StyledLayer.js`의
스타일 산식과 대조했습니다.

### 버튼 — 높이를 고정하지 않고 text 스케일을 그대로 씁니다

`StyledButton.js`의 `fontStyle()`이 **`theme.text[size]`를 그대로 참조**합니다 —
버튼 전용 서체 없이 본문 타이포 스케일 공유.

| | small | medium(기본) | large |
|---|:--:|:--:|:--:|
| 서체/행간 (`text` 공유) | 14/20px | **18/24px** | 22/28px |
| 상하 패딩 | 4px | 4px | 8px |
| 좌우 패딩 | 20px | 22px | 32px |
| 보더 | 2px | 2px | 2px |
| 라운드 | 18px | 18px | **24px** |
| **파생 높이** | **32px** | **36px** | **48px** |

- **라운드 = 파생 높이의 절반입니다** — medium 36/2=18, large 48/2=24.
  고정값으로 적혀 있지만 실질은 **필 버튼**입니다 (small은 18>16이라 클램프).
- **보더가 2px입니다** — 1px 다수 진영과 갈리는 값. 기본(비활성) 상태부터 2px.
- 버튼 본문이 **18px** — 본문 최대값(18px)이 버튼에도 그대로.
- 전환 100ms `ease-in-out` (색·배경·보더·그림자 4종) · disabled **opacity 0.3**.
- 최소 너비 없음 (skeleton 변형에만 min 100px).

### 입력 — 패딩 산식에 보더 차감이 코드로 박혀 있습니다

```js
// base.js
input.padding = baseSpacing/2 − controlBorderWidth  // 12 − 1 = 11px
```

| | 값 |
|---|---|
| 패딩 | **11px** 사방 (= 12−보더 1px 산식) |
| 보더 / 라운드 | `global.control`: 1px / **4px** |
| 서체 | text 스케일 공유 (기본 18/24px) · **굵기 600** |
| **파생 높이** | 24 + 22 + 2 = **48px** |

- **입력값 서체가 세미볼드(600)입니다** — 대부분의 시스템이 400인 자리.
- **버튼(18px)과 입력(4px)의 라운드가 다른 층에 삽니다** — 버튼은
  `button.size[*].border.radius`, 입력은 `global.control.border.radius`.
- 라벨(FormField)은 별도 블록 — margin 세로 `xsmall`(6px)/가로 `small`(12px),
  필드 보더는 **bottom만** (`position: inner, side: bottom` — 밑줄형).

### Layer(모달) — 폭 단계가 없습니다

| | 값 |
|---|---|
| 폭 | **단계 없음 — 내용 크기** (`full`·`margin`·position으로만 제어) |
| 라운드 | 4px (`layer.border.radius`) |
| 오버레이 | rgba(0,0,0,0.5) |
| 진입 | 중앙: **scale 0.8→1** · 가장자리: 슬라이드 (위치별 키프레임 8세트) |
| 지속/이징 | **200ms ease-in-out forwards** — `animationDuration = 200` **하드코딩 상수** |
| 반응형 | `responsiveBreakpoint: small`(768px) 이하 전체화면 |

- 모달 폭 스케일이 아예 없는 표본 — Cloudscape 5단·MUI 브레이크포인트
  재사용과 또 다른 제3의 축입니다. 폭이 필요하면 사용자가 `width`를 직접.
- 지속시간이 테마 밖 JS 상수라 **테마로 못 바꿉니다** — 전 테마가 시드에서
  파생되는 시스템에서 모션만 파생 밖에 있습니다.

### 시드 파생 추가 확인 — 브레이크포인트·다크 모드

- **브레이크포인트도 시드 파생입니다**: small = 24×32 = **768** ·
  medium = 24×64 = **1536**. "파생 범위 표본 최대" 관찰이 반응형까지 확장됩니다.
- **다크 모드가 테마 파일이 아니라 색 토큰 안의 쌍입니다** —
  `text: {dark:'#f8f8f8', light:'#444444'}` 식으로 색마다 `{dark, light}` 객체.
  적용은 배경색 맥락(Box의 `dark` prop)별로 갈립니다. 테마 교체 진영(Clarity 등)과
  구분되는 **토큰 내 쌍(pair-in-token)** 방식.
- focus 색이 **#6FFFB0**(형광 민트) 단일값 — 브랜드 보라(#7D4CDB)와 무관한
  고시인성 전용색.

### 표 (`dataTable`) — 값이 아니라 t-shirt 이름만 있습니다

`grommet@2.56.0` `themes/base.js`. 표 토큰이 **전부 스케일 이름 참조**입니다.

| 항목 | 값 |
|---|---|
| 컨테이너 간격 | `gap: 'xsmall'` = **6px** |
| 정렬 아이콘 간격 | `sort.gap: 'xsmall'` = 6px |
| 열 리사이즈 | 보더 `color: 'border'`, `side: 'end'` · 패딩 세로 `xsmall`(6px) |
| 확장 토글 | `expand.size: 'xxsmall'` = 3px |
| 그룹 끝 경계 | `border.side: 'bottom'` |
| 고정 헤더·푸터 | 배경 `opacity: 'strong'` |
| 헤더 primary 열 | `weight: 'bold'` |
| 검색 필드 | 좌측 패딩 `small`(12px) |

- **셀 패딩·행 높이 토큰이 없습니다.** 표 셀이 `Box` pad 규칙을 그대로 쓰므로
  값이 표 토큰 층에 존재하지 않습니다 — 버튼·입력에서 본 "높이를 고정하지 않는"
  태도가 표에서도 이어집니다.
- **고정(pinned) 헤더·푸터를 색이 아니라 `opacity: 'strong'`으로 처리합니다** —
  배경 불투명도를 올려 아래 행이 비치지 않게 하는 방식이고, 확보 표본에서
  고정 영역을 불투명도로 규정한 유일 사례입니다.
- 열 선택·순서 변경 UI(`dataTableColumns`)가 별도 토큰 그룹으로 있습니다 —
  탭 패딩 `small`(12px), 선택 목록 세로 패딩 `small`, 간격 `xsmall`(6px).

### 내비게이션 (`sidebar` · `tab` · `menu`)

| 항목 | 값 |
|---|---|
| Sidebar | `gap: 'large'`(**48px**) · `pad: 'small'`(**12px**) — **폭 토큰 없음** |
| Tab 활성 표시 | `border.side: 'bottom'`, `size: 'small'` = **2px** |
| Tab 색 | 기본 `control`, 활성 `text`, hover 흑/백 |
| Tab 간격 | `gap: 'small'` = 12px |
| Menu 그룹 | 세로 패딩 `xsmall`(6px) · 구분선 `size: 'xsmall'`(1px 계열) |
| Menu 구분선 패딩 | 가로 `small`(12px) |
| skipLinks | 위치 `top` · 라운드 `small` · 패딩 `medium`(24px) |

- **사이드바에 폭 값이 없습니다** — 확보한 내비 표본 10개 중 사이드바 폭을
  정하지 않는 유일 사례입니다 (나머지는 200~280px). `Box` 폭 규칙에 위임합니다.
- **탭 hover 색이 라이트에서 검정, 다크에서 흰색**으로 명시돼 있습니다
  (`{dark: 'white', light: 'black'}`) — 활성 보더 색도 같은 쌍입니다.
- 건너뛰기 링크(`skipLinks`)를 테마 토큰으로 둔 표본입니다.

### 피드백 (`notification`)

| 항목 | 값 |
|---|---|
| **Toast 폭** | `container.width: 'medium'` = **384px** |
| **Toast 지속시간** | **8000ms** (`notification.toast.time`) |
| Toast 위치·여백 | `layer.position: 'top'` · `margin: 'medium'`(24px) · elevation medium |
| 인라인 컨테이너 | 라운드 `xsmall` · 패딩 가로 `small`(12px) / 세로 `xsmall`(6px) |
| **global 배너** | 라운드 **`none`** · 패딩 가로 `large`(**48px**) / 세로 `xsmall`(6px) |
| 구성 요소 간격 | `gap: 'small'`(12px) · 아이콘 우측 `small` · 텍스트 간격 `medium`(24px) |
| 제목 | `weight: 'bold'` |
| 액션 | 우측 여백 `xsmall`(6px) |

- **8000ms는 확보한 코드 층 지속시간 표본 중 가장 깁니다**
  (Naive·Ant message 3000 · Sonner 4000 · Ant notification 4500 ·
  Blueprint 5000). 문서 층에서 Atlassian이 규정한 8초와 같은 값입니다.
- **인라인·글로벌·토스트 3종이 컨테이너 규격만 다릅니다** — 내용 구조
  (아이콘·제목·본문·액션)는 공유하고, `container`(라운드·패딩)와 `layer`만
  분기합니다. 글로벌 배너는 **라운드 0 + 좌우 48px**로 화면 폭을 채우는 전제입니다.
- 상태별 아이콘이 `critical`·`warning`·`normal`·`unknown` 등으로 열거되며
  각각 아이콘 컴포넌트 + 배경색 쌍입니다.

### 특징적 결정 (심화분)

- **버튼 서체 = 본문 text 스케일 그대로** (18px) — 버튼 전용 타이포 부재
- **라운드가 높이 절반과 일치하는 실질 필 버튼** + 보더 2px
- **입력 패딩에 보더 차감 산식**(12−1) — MUI·Codex와 같은 수법을 산식으로
- **입력값 굵기 600**
- **모달 폭 단계 없음** + 지속시간 200ms가 테마 밖 상수
- **768px 아래에서 스페이싱·보더·사이즈 전 스케일이 절반으로 교체**

## 특징적 결정

- **단일 시드(24)가 스페이싱·보더·타이포·행간·글줄 폭까지 파생** — 파생 범위 표본 최대
- **본문 18px** — 표본 최대 기본 크기
- **글줄 폭 = 폰트 크기 × 24 산식** + 근거 링크 주석 — 표본 유일
- 스페이싱이 24의 약수 격자 (3/6/12) — 코어값 이탈 두 번째 사례
- `generate()` 공개 — 사용자가 시드를 바꿔 전 테마 재생성 가능

## 접근성

~~미확인.~~ → **WCAG 2.1 (2026-08-18 해소 — 레벨 표기는 없습니다).**
출처: `v2.grommet.io/accessibility` — "grommet provides support for W3c's WCAG 2.1 spec".

## 참고

- **2.56.1 재검증 — 기록 값 무변경 (2026-08-18).** 이 항목이 기록한 토큰 절
  (`dataTable`·`sidebar`·`tab`·`menu`·`notification`)을 절별로 대조해 **전부 동일**
  확인. 변경은 두 가지 — **`dateTimeInput` 컴포넌트 토큰 신규 추가**와
  **SPDX 헤더 삽입**(`SPDX-License-Identifier: Apache-2.0` — 라이선스가 파일 헤더로
  명시되기 시작했습니다).

- 토큰: `npm pack grommet@2.56.0` → `es6/themes/base.js`
- 컴포넌트 심화: 같은 패키지 `themes/base.js` 실행 +
  `components/Button/StyledButton.js` · `components/Layer/StyledLayer.js` (2026-08-18)
- **남은 확인 사항:** ~~컬러 팔레트 구조~~ ~~컴포넌트 목록~~ ~~다크 모드~~
  (2026-08-18 해소 — 심화 절: 색은 `{dark, light}` 쌍 구조·전 팔레트 실값은
  미열거, 컴포넌트 약 95개, 다크는 토큰 내 쌍 방식),
  HPE 전용 테마(`grommet-theme-hpe`)와의 관계
