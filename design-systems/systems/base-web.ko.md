---
name: Base Web
org: Uber
coverage: partial
url: https://baseweb.design
repo: https://github.com/uber/baseweb
license: MIT
tech: [React]
figma_kit: true
tokens_format: [JS]
a11y_target: "명시 없음 확인 (2026-08-18 — 런타임 axe-core 검증기만 제공, WCAG 버전·등급 목표 부재)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm baseui@18.2.0 → themes/shared/sizing.js (16.1.1에서 재검증 — 사이징 토큰 변화 없음)"
---
<!-- lang-links -->
> [English](base-web.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Uber의 디자인시스템. 배차·배달 등 소비자 서비스와 내부 도구를 함께 다룹니다.

## 토큰

### 사이즈 / 스페이싱 — 2px 단위 촘촘함

| 토큰 | 값 |
|------|-----|
| `scale0` | 2px |
| `scale100` | 4px |
| `scale200` | 6px |
| `scale300` | 8px |
| `scale400` | 10px |
| `scale500` | 12px |
| `scale550` | 14px |
| `scale600` | 16px |
| `scale650` | 18px |
| `scale700` | 20px |
| `scale750` | 22px |
| `scale800` | 24px |
| `scale850` | 28px |
| `scale900` | 32px |
| `scale950` | 36px |
| `scale1000` | 40px |
| `scale1200` | 48px |
| `scale1400` | 56px |
| `scale1600` | 64px |
| `scale2400` | 96px |
| `scale3200` | 128px |
| `scale4800` | 192px |

**2~24px 구간이 2px 단위로 전부 채워져 있습니다** (2·4·6·8·10·12·14·16·18·20·22·24).
Canvas(Workday)가 20px까지 채운 것보다 더 멀리 갑니다.

출처: `baseui@18.2.0` → `themes/shared/sizing.js`

### 번호 체계의 불규칙성

번호가 값과 일정한 비례 관계가 아닙니다.

| 구간 | 번호 간격 | 값 간격 |
|------|:---:|:---:|
| `scale0` → `scale100` | 100 | 2px |
| `scale500` → `scale550` | 50 | 2px |
| `scale800` → `scale850` | 50 | 4px |
| `scale1000` → `scale1200` | 200 | 8px |
| `scale3200` → `scale4800` | 1600 | 64px |

**같은 50 간격이 어디서는 2px, 어디서는 4px입니다.** `550`·`650`·`750`·`850`·`950` 같은
중간 번호가 존재합니다. Spectrum(`85`, `350`)에서도 같은 불균등이 나타납니다.

### 라운드 (2026-08-18, `themes/shared/borders.js`)

| 토큰 | 값 |
|------|-----|
| `radius100` | 2px |
| `radius200` | 4px |
| `radius300` | 8px |
| `radius400` | 12px |
| `radius500` | 16px |

원시 5단계 위에 **컴포넌트 지정 토큰**이 얹혀 있습니다:
`buttonBorderRadius` 8 · `inputBorderRadius` 8 (mini 4) · `popoverBorderRadius` 8 ·
`tagBorderRadius` 24 · **`checkboxBorderRadius` 0** · **`surfaceBorderRadius` 0**
(Card·Datepicker·Drawer가 사용 — 컨트롤은 둥글고 서피스는 각진 이중 체계.
단 Modal은 이 토큰이 아니라 `radius500`을 직접 씁니다).

### 모션 토큰 (2026-08-18, `themes/shared/animation.js`)

지속시간 **17단계** (0 · 100~1000ms 100 단위 + 150/250 · 1500 · 3000 · 5000 ·
7000ms) — Canvas(20단계, `patterns/motion.md`) 다음으로 많고, 상한 7000ms는
표본 최대입니다 (Canvas 상한 1000ms · Codex 2000ms).

이징은 **신·구 두 벌 명명이 같은 파일에 병존**합니다:

| 신명(시맨틱) | 구명(곡선명) | 값 |
|------|------|-----|
| `easeLinear` | `linearCurve` | `cubic-bezier(0, 0, 1, 1)` |
| `easeDecelerate` | `easeOutQuinticCurve` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `easeAccelerate` | `easeInQuinticCurve` | `cubic-bezier(0.64, 0, 0.78, 0)` |
| `easeAccelerateDecelerate` | — | `cubic-bezier(0.83, 0, 0.17, 1)` |
| `easeResponsiveAccelerate` | — | `cubic-bezier(0.11, 0, 0.5, 0)` |
| — | `easeOutCurve` | `cubic-bezier(.2, .8, .4, 1)` |
| — | `easeInCurve` | `cubic-bezier(.8, .2, .6, 1)` |
| — | `easeInOutCurve` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| — | `easeInOutQuinticCurve` | `cubic-bezier(0.86, 0, 0.07, 1)` |

**컴포넌트 실사용은 구명에 몰려 있습니다** (18.2.0 전 컴포넌트 grep):
`easeOutCurve` 28회 · `easeOutQuinticCurve` 7회 · `linearCurve` 6회 ·
`easeInOutQuinticCurve` 4회, **신명 4종은 0회** — 시맨틱 리네이밍 층이
토큰 파일에만 있고 컴포넌트에 침투하지 못한 상태입니다.

### 타이포그래피 / 컬러

`themes/shared/typography.js`: `font100`~`font1050` 숫자 스케일 위에
`ParagraphSmall`·`LabelMedium`·`HeadingLarge` 식 시맨틱 별칭 2계층.
Label 계열은 전부 굵기 500, Paragraph 계열은 normal.
컬러는 미확인 — light/dark 테마별 오버라이드 구조만 확인.

## 컴포넌트

~~미확인.~~ → 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`baseui@18.2.0`의 컴포넌트별 `styled-components.js`(JS 객체 스타일)를
파싱하고, 참조된 `$theme.sizing/typography/borders` 토큰을 실값까지
해석했습니다.

### 버튼 (`button/styled-components.js`) — 높이 무선언, 스케일과 정합

높이 선언이 없고 **라벨 행간 + 상하 패딩으로 파생**됩니다.

| | mini | compact | **default** | large |
|---|:--:|:--:|:--:|:--:|
| 서체 (Label*) | 12/16 | 14/16 | 16/20 | 18/24 |
| 상하 패딩 | 6px | 10px | 14px | 16px |
| 좌우 패딩 | 8px | 12px | 16px | 20px |
| **파생 높이** | **28px** | **36px** | **48px** | **56px** |
| min-width (fill 전용) | 52px | 60px | 72px | 80px |

- **파생 높이가 sizing 스케일과 정확히 일치합니다** — 28/36/48/56 =
  `scale850/950/1200/1400`. MUI가 파생 높이를 소수점(36.5px)으로 방임하는
  것과 달리, Base Web은 행간·패딩을 역산해 **스케일 값에 맞춰 설계**했습니다.
  같은 값이 `minHeight` 토큰으로도 선언돼 두 경로가 상호 검증됩니다.
- **기본 높이가 48px** — 데스크톱 웹 다수(32~36)가 아니라 터치 타겟
  진영입니다. Orbit 44px과 같은 이유 구조(승차·배달 = 모바일 B2C).
- 절대 px 최소 너비(52~80 = 높이+24)가 있지만 **`widthType="fill"`일 때만**
  적용됩니다 — hug(기본)에서는 없음. `patterns/button.md`의 "코드 층 최소
  폭 보유" 계열(Carbon 176 · Fluent 64/96 · MUI 64)에 조건부 표본으로 추가.
- **`minHitArea="tap"` prop**: 시각 크기를 바꾸지 않고 투명 `::before`
  의사요소를 **48px**(`scale1200`)로 늘려 히트 영역만 확장합니다.
  시각 크기와 터치 타겟을 분리하는 발상은 M3 StateLayer(40dp,
  `patterns/form.md`)와 같되, M3는 항상 적용이고 Base Web은 **opt-in
  prop**(기본값 `click` = 확장 없음)이라는 점이 갈립니다.
- 서체는 전 크기 굵기 **500**, uppercase 없음. 라운드 8px 전 크기 동일
  (`buttonBorderRadiusMini` 4px 토큰이 있으나 **사용처 0회** — 죽은 토큰).
  pill=999px, circle/square 아이콘 전용 변형 별도.
- kind 6종: primary/secondary/tertiary × danger 3종. selected 상태는
  보더가 아니라 **2겹 box-shadow**(inset 2px + outer 2px)로 그리며, 그
  두께로 `sizing.scale0`(2px)을 재사용합니다 — 스페이싱 토큰이 보더
  두께를 겸하는 표본.
- 전환: background만 **200ms `linearCurve`**.

### 입력 (`input/styled-components.js`) — 2px 보더

| | mini | compact | **default** | large |
|---|:--:|:--:|:--:|:--:|
| 서체 (font100~400) | 12/20 | 14/20 | 16/24 | 18/28 |
| 상하 패딩 | 4px | 6px | 10px | 14px |
| 좌우 패딩 | 14px | 14px | 14px | 14px |
| 보더 | 2px | 2px | 2px | 2px |
| **파생 높이** | **32px** | **36px** | **48px** | **60px** |

- **보더가 2px입니다** — 1px 다수 진영(Backpack·Orbit 등)과 갈립니다.
  포커스 시 색만 바꾸면 되므로 두께 점프로 인한 레이아웃 이동이 없습니다.
- **좌우 패딩이 전 크기 14px(`scale550`) 고정** — 수직만 크기를 탑니다.
- 기본 입력 48px = 기본 버튼 48px 정합. compact 36도 버튼 compact와 일치.
- 서체 굵기 normal(400) — 버튼(500)과 위계 차등.
- 라운드 8px, **mini만 4px** (`inputBorderRadiusMini` — 버튼의 mini 토큰과
  달리 이쪽은 실사용됩니다).
- 라벨(`form-control`): `font250`(14/16/500) 별도 블록, 캡션 `font100`(12px).
- 보더 전환 **200ms `easeOutCurve`**.

### 모달 (`modal/styled-components.js`) — 명명 폭 1단계

| size | 값 |
|------|-----|
| `default` | **500px** |
| `full` | 100% |
| `auto` | auto |
| (숫자 prop) | 임의 px |

- **명명 폭이 500px 하나뿐입니다** — `patterns/modal.md`의 1단계 진영
  (shadcn/ui 512px)에 두 번째 표본으로 추가. 512 vs 500, 12px 차.
  다단이 필요하면 숫자를 직접 넘기는 설계로, Cloudscape·Mantine·Orbit의
  px 5단계와 대극입니다.
- 라운드 **16px**(`radius500` 직접 참조 — `surfaceBorderRadius` 0px 토큰을
  쓰지 않는 예외).
- 애니메이션: 스크림 페이드 + 다이얼로그 **페이드 & translateY(20px→0)**,
  둘 다 **400ms `easeOutCurve`**. MUI(225/195 비대칭)와 달리 진입·퇴장 대칭.
- 내부 여백이 패딩이 아니라 **자식 마진**입니다: 제목(`font550` 20/28/700)
  mt 32 · ms 24 · me 32(닫기 버튼 몫으로 끝쪽이 8px 더 넓음) · 본문 mx 24 ·
  푸터 mx 24 + py 12. 닫기 버튼 24×24, 우상단 12px.
- 스크림 `rgba(0, 0, 0, 0.5)`.

### 특징적 결정 (심화분)

- **파생 높이 = sizing 스케일 정합** (28/36/48/56) — 행간·패딩을 스케일에
  역산해 맞춘 설계. MUI의 소수점 방임과 정반대
- **`minHitArea` 의사요소 히트 확장** — 시각 불변 48px 터치 타겟 opt-in
- **이징 시맨틱 리네이밍이 미침투** — 신명 4종 사용 0회, 구명 `easeOutCurve` 본류
- **입력 보더 2px** + 좌우 패딩 고정 14px
- **모달 명명 폭 1단계(500px) + 임의 숫자 escape hatch**
- **`scale0`(2px)이 보더 두께를 겸함** — 0이 아닌 최소 스페이싱 토큰의 재사용
- **checkbox 라운드 0px 토큰** — 컨트롤(8px) 사이에서 체크박스만 각지게 고정

## 특징적 결정

- **2px 단위를 24px까지 유지합니다.** 12단계로, 수집한 시스템 중 하단 구간이 가장 촘촘합니다.
  Canvas(20px까지 10단계)보다 넓습니다.
- **번호와 값의 비례가 깨져 있습니다.** `scale550`(14px)과 `scale850`(28px)은
  둘 다 앞 단계에서 50을 더한 것인데 값 증가폭은 각각 2px·4px입니다.
  **번호만 보고 값을 계산할 수 없습니다.**
- **`scale0`이 0이 아니라 2px입니다.** 0 값 토큰이 없습니다.
  대부분의 시스템이 `space-0: 0`을 두는 것과 다릅니다.
- **상단이 192px까지 갑니다.** Carbon(160px)보다 큽니다.
  스페이싱과 레이아웃 크기를 `sizing` 하나로 다룹니다.
- **테마별 오버라이드 구조입니다.** `themes/shared/` 외에 `themes/move-theme/` 등이 있어
  브랜드별로 타이포 등을 교체할 수 있습니다.

## 접근성

~~미확인.~~ → **부재 확정 (2026-08-18, 헤드리스 렌더).**

문서 사이트를 렌더해도 **WCAG 버전·등급 목표를 어디에서도 선언하지 않습니다.**
홈에는 "Built-in accessibility — components are built with accessibility being a
first-class citizen"이라는 문장만 있고 준수 기준이 없으며,
Guides 내비(Internationalization · Bidirectionality · Theming · Styling ·
Overrides · Colors)에 **접근성 가이드 자체가 없습니다.**

대신 **런타임 검증 컴포넌트**를 제공하는 접근이 특징입니다 —
`Unstable_A11y`(`import { Unstable_A11y } from 'baseui/a11y'`, Utility 카테고리)가
**axe-core** 라이브러리로 렌더된 트리를 실행 중에 검사합니다.
"Experimental utility for validating accessibility at runtime"로 소개되며
아직 `Unstable_` 접두사가 붙어 있습니다.

**목표를 문서로 선언하는 대신 검사 도구를 코드로 배포한** 사례로,
`선언형`이 아니라 `검증형` 접근입니다 (C 분류 — 준수 목표 비공개).

출처: https://baseweb.design/ (홈 "Built-in accessibility" 절) ·
https://baseweb.design/components/unstable-a11y/ (렌더 확인, 2026-08-18)

## 참고

- 저장소: https://github.com/uber/baseweb
- 패키지: `baseui` (컴포넌트 패키지에 테마·토큰 동봉)
- **주의:** 토큰이 별도 패키지가 아니라 `baseui` 안의 `themes/shared/*.js`에 있습니다.
  범용 스캐너로 `.json`/`.css`를 훑으면 발견되지 않습니다.
- 컴포넌트 심화 (2026-08-18): `baseui@18.2.0` →
  `button/styled-components.js` · `input/styled-components.js` ·
  `form-control/styled-components.js` · `modal/styled-components.js` ·
  `modal/constants.js` + `themes/shared/{animation,borders,typography}.js`
- **Figma 킷 (2026-08-18 해소 — `figma_kit: true`)**: 홈의 "Figma Community" 절에
  "You can find all the Base Web components on Figma Community"라고 명시합니다.
  **Uber의 Figma Community 프로필(https://www.figma.com/@uber)** 에 공개된
  **"Base Gallery"** 파일을 사용자가 Duplicate해 쓰는 방식이고,
  2020-02-13 블로그 "Base Web on Figma Communities"에 절차가 적혀 있습니다.
  코퍼스에서 드물게 **사내 라이브러리가 아니라 Figma Community 공개 갤러리**로
  배포하는 형태입니다.
  출처: https://baseweb.design/blog/base-figma-community/ (렌더 확인, 2026-08-18)
