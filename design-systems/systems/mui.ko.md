---
name: MUI (Material UI)
org: MUI
coverage: partial
url: https://mui.com
repo: https://github.com/mui/material-ui
license: MIT
tech: [React, Emotion]
figma_kit: 미확인
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: framework
verified: 2026-08-18
source: "npm @mui/material@9.3.1 → styles/{createTypography,createThemeNoVars}.js"
---
<!-- lang-links -->
> [English](mui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

가장 널리 쓰이는 React 컴포넌트 프레임워크 — 본문 기본이 **14px**인데
**rem 환산에 `fontSize/14` 보정 계수**를 곱해, 기준 크기를 바꾸면
**전 스케일이 비례 재계산**됩니다. Material 혈통이면서 M3의 토큰 구조는 쓰지 않습니다.

## 토큰 — 함수 생성 테마

```js
htmlFontSize = 16      // 루트 (브라우저 기본)
fontSize     = 14      // MUI 본문 기본
coef = fontSize / 14   // 기준을 바꾸면 이 계수가 전 크기에 곱해짐
pxToRem = size => `${size / htmlFontSize * coef}rem`
fontWeightLight 300 · Medium 500
```

- **`coef`가 표본 유일한 형태의 보정입니다** — `fontSize: 16`으로 바꾸면
  `coef = 16/14 ≈ 1.143`이 되어 **모든 타이포가 14%씩 커집니다**.
  런타임 배율(Mantine `--mantine-scale`)과 목적은 같은데,
  **기준 크기 변경이 곧 배율이 되는** 구조입니다
- **본문 14px** — 밀집 엔터프라이즈 진영(Ring UI·Siemens iX·Naive UI·PrimeVue…).
  Material 3의 Body Large(16)가 아니라 Body Medium(14) 쪽을 기본으로 삼았습니다
- **`rem` 변환 함수(`pxToRem`)를 테마에 노출**합니다 — 토큰 값이 아니라
  **변환기를 배포**하는 방식이며 SmartHR(상태색 함수)·Naive UI(색 합성)와
  같은 "함수 배포" 진영입니다
- `spacing`이 입력값(`spacingInput`)을 받는 함수입니다 — 기본 8px 배수이며,
  `theme.spacing(2)` = 16px 형태로 씁니다. Tailwind와 같은
  **base×배수 생성** 방식인데 런타임 함수 호출입니다
- 굵기에 `300`(Light)이 있습니다 — Yoga와 같은 소수 진영

## 컴포넌트

`@mui/material` 본체 + `@mui/icons-material` · `@mui/styled-engine` 등 분할.
목록 미조사. → 버튼·입력·다이얼로그는 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`@mui/material@9.3.1` dist의 emotion 스타일 JS(`Button/Button.js` 등)를 파싱하고,
`createTheme()`을 **실제로 실행해** 기본 테마 값을 확정했습니다
(react·@emotion/react·@emotion/styled 설치 후 node로 평가).

### 테마 기본값 (createTheme() 실행 결과)

| 항목 | 값 |
|------|-----|
| `shape.borderRadius` | **4px** |
| 브레이크포인트 | 0 / 600 / 900 / 1200 / 1536 |
| `spacing(1)` | 8px |
| 지속시간 | 150 / 200 / 250 / 300 / 375ms + **enter 225 / exit 195ms** |
| 이징 | `easeInOut (0.4,0,0.2,1)` · `easeOut (0.0,0,0.2,1)` · `easeIn (0.4,0,1,1)` · `sharp (0.4,0,0.6,1)` |
| primary | `#1976d2` |

### 버튼 — 높이를 고정하지 않습니다

높이 선언이 없고 **`서체 × 행간 1.75 + 상하 패딩`으로 파생**됩니다.

| | small | medium | large |
|---|:--:|:--:|:--:|
| 서체 | 13px | 14px | 15px |
| 상하 패딩 (contained) | 4px | 6px | 8px |
| 좌우 패딩 (contained) | 10px | 16px | 22px |
| 좌우 패딩 (outlined) | 9px | 15px | 21px |
| 좌우 패딩 (text) | 5px | 8px | 11px |
| **파생 높이** | **30.75px** | **36.5px** | **42.25px** |

- **버튼 높이가 소수점입니다** — 행간이 1.75 무단위 배수라 13×1.75=22.75px처럼
  정수가 안 나옵니다. 36·40px 정수 높이 진영과 근본적으로 다른 층입니다.
- **outlined 패딩이 contained보다 각 1px 작습니다** — 1px 보더를 패딩에서
  차감해 세 변형의 총 치수를 맞춥니다 (Garden의 `height−2px` 행간 역산과 같은 의도).
- 최소 너비 **64px**, 라운드 `shape.borderRadius` = **4px**.
- 서체는 **uppercase 강제** + 굵기 500 + 자간 0.02857em(=0.4px/14px 역산).
- 전환: background·shadow·border·color를 **250ms `(0.4,0,0.2,1)`**.

### 입력 (TextField/OutlinedInput) — 반픽셀 패딩

| | small | medium |
|---|:--:|:--:|
| 내용 행 높이 | 1.4375em (**23px**) | 23px |
| 상하 패딩 | **8.5px** | **16.5px** |
| 좌우 패딩 | 14px | 14px |
| **파생 높이** | **40px** | **56px** |

- **상하 패딩이 8.5/16.5px 반픽셀입니다** — 내용 행이 23px(홀수)이라
  총 높이를 40/56px 정수로 만들기 위한 보정입니다. 버튼(36.5px)은 보정하지 않고
  입력만 보정합니다.
- **라벨이 입력 안에 떠 있다가 축소 이동합니다** (outlined):
  `translate(14px, 16px) scale(1)` → `translate(14px, -9px) scale(0.75)` —
  16px 라벨이 75%로 줄어 12px이 되고 보더 노치에 얹힙니다.
  표본 다수(라벨 상단 고정 블록)와 갈리는 Material 혈통의 플로팅 라벨입니다.
- 변형 3종: outlined · filled(`25px 12px 8px` — 라벨 몫을 상단 패딩에 포함) ·
  standard(`4px 0 5px`, 보더 없는 밑줄형).

### 다이얼로그 — 폭 단계가 곧 브레이크포인트

| maxWidth prop | 실폭 |
|------|-----|
| `xs` | **max(브레이크포인트 xs, 444px) = 444px** |
| `sm` | 600px |
| `md` | 900px |
| `lg` | 1200px |
| `xl` | 1536px |

- **전용 폭 스케일이 없습니다** — 브레이크포인트 값을 그대로 씁니다
  (Cloudscape의 전용 5단계 320~1280과 대극). 유일한 예외가 xs의 **444px**
  하한 — 코드에 `Math.max(theme.breakpoints.values.xs, 444)`로 박혀 있습니다.
- 여백: 사방 **32px** margin, `maxWidth: calc(100% − 64px)` 상한.
- 라운드 4px(Paper 상속), 그림자 **elevation 24** — 25단계 그림자 스케일의 최상단을
  다이얼로그에 배정.
- 애니메이션: Fade(불투명도만), **진입 225ms / 퇴장 195ms**, `(0.4,0,0.2,1)` —
  **비대칭 진입/퇴장 지속시간이 `enteringScreen`/`leavingScreen` 토큰으로**
  테마에 있습니다.
- 내부 패딩: 제목 `16px 24px` · 본문 `20px 24px` · 액션 `8px`.

### 특징적 결정 (심화분)

- **버튼 높이 소수점(36.5px) 방임 vs 입력 반픽셀 패딩(16.5px) 보정** —
  같은 시스템 안에서 파생 높이를 한쪽만 정수로 교정하는 비대칭
- **다이얼로그 폭 = 브레이크포인트 재사용** + 444px 단일 예외
- **진입/퇴장 비대칭 지속시간(225/195ms)을 토큰화** — 표본에서 드묾
- **outlined 패딩 1px 차감** — 보더 몫을 패딩에서 상쇄
- v9도 emotion 런타임이지만 **변형 색을 `--variant-containedBg` 등 CSS 변수
  간접층**으로 조립 — CSS-in-JS 안에 CSS 변수 아키텍처가 들어온 형태

## 특징적 결정

- **`coef = fontSize/14` 보정 계수** — 기준 변경이 전역 배율이 되는 표본 유일 구조
- 본문 14px (M3 Body Medium 계열)
- 토큰이 아니라 **변환 함수(`pxToRem`)와 생성기(`createTheme`)를 배포**
- 스페이싱이 함수 호출(`theme.spacing(n)`) — 목록 없음.
  `tokens/scales.md`의 "열거하지 않음" 진영 세 번째(Tailwind·Ring UI 다음)

## 접근성

미확인.

## 참고

- 토큰: `npm pack @mui/material@9.3.1` → `styles/createTypography.js`
- 컴포넌트 심화: 같은 패키지의 `Button/Button.js` · `OutlinedInput/OutlinedInput.js` ·
  `InputLabel/InputLabel.js` · `Dialog/Dialog.js` + `createTheme()` 실행 (2026-08-18)
- **남은 확인 사항:** ~~브레이크포인트, shape(라운드) 기본값~~ (2026-08-18 해소 — 심화 절),
  기본 팔레트 전체 실값(primary `#1976d2`만 확인), M3 지원(`@mui/material-next` 계열) 여부,
  컴포넌트 목록
