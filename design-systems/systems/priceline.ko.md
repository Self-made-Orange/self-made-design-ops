---
name: Priceline Design System
org: Priceline
coverage: partial
url: https://priceline.github.io/design-system
repo: https://github.com/priceline/design-system
license: MIT
tech: [React, styled-system]
figma_kit: 미확인
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: commerce
verified: 2026-08-18
source: "npm pcln-design-system@6.29.0 → dist/esm/theme/theme.js"
---
<!-- lang-links -->
> [English](priceline.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Priceline의 시스템 — 스페이싱이 **순수 2배 등비 7단계**(0·4·8·16·32·64·128)이고,
라운드가 **3단계(0·2·6)**뿐이며, **브레이크포인트가 `em` 단위**입니다.

## 토큰 — 이름 없는 배열 (styled-system 규약)

```js
space      = [0, 4, 8, 16, 32, 64, 128]          // px
fontSizes  = [12, 14, 16, 20, 24, 32, 40, 56, 72]
radii      = [0, 2, 6]
lineHeights = { standard: 1.4, display: 1.25 }
breakpoints = [32, 40, 48, 64, 80].map(n => n + 'em')
```

- **스페이싱이 4부터 순수 2배**입니다 — 12·20·24·40·48이 전부 없습니다.
  Thumbprint(32 이후 배가)·Mantine(5단계)보다 이른 지점(4)부터 배가하며,
  **전 구간 등비는 표본 유일**입니다. 중간값이 필요하면 조합해야 합니다
- **라운드 3단계(0/2/6)** — 표본 최소. 4px이 없고 2→6입니다
- **브레이크포인트가 `em`**입니다 — 32em(512px) ~ 80em(1280px).
  px(다수) · rem(일부)에 이은 세 번째 단위이며, 사용자 글꼴 확대에
  브레이크포인트가 함께 반응합니다 (`em`은 부모 기준이라 루트에서는 rem과 동일)
- 배열 인덱스 참조 — Evergreen · Strapi와 같은 **무명 배열 진영 세 번째**
- 행간이 `standard`(1.4) / `display`(1.25) 둘 — Radix Themes의
  본문/제목 분리와 같은 판단의 최소 형태
- `duration-100/200` 밀리초 토큰 별도

## 컴포넌트 심화 — (2026-08-18)

같은 `pcln-design-system@6.29.0`의 `lib/{Button,Input,Dialog}/*.js`
(styled-components 템플릿이 소스 그대로 배포됨)에서 실측했습니다.

### 버튼 — 작은 버튼은 알약, 큰 버튼은 12px

| | small | medium | large | extraLarge |
|---|:--:|:--:|:--:|:--:|
| 서체 | 12px | 14px | 16px | 16px |
| 상하 패딩 | 7px | **9.5px** | 12px | 16px |
| 좌우 패딩 | 12px | 18px | 22px | 22px |
| 라운드 | `action-sm` = **9999px** | `action-md` = **9999px** | `action-lg` = 12px | 12px |
| **파생 높이** | 32px | **40px** | 48px | 56px |

- **라운드에 `action-*` 시맨틱 별칭층**이 있습니다 (`action-sm/md` = 9999px,
  `action-lg/xl` = 12px) — 원시 3단(0/2/6)과 별개로, **크기에 따라 알약↔모서리가
  갈리는 판단을 토큰 이름에 박은** 구조입니다. 결과적으로 small·medium은 필,
  large·extraLarge는 12px.
- **medium 상하 패딩이 9.5px 반픽셀**입니다 — 행간 1.5로 14×1.5=21px이 홀수라
  총 높이 40px 정수를 만드는 보정 (MUI 입력 8.5/16.5px과 동일 수법, 여기는 버튼).
- 서체는 무명 배열 인덱스(`fontSizes.0/1/2`)로 참조 — 토큰 절의 배열 규약이
  컴포넌트 층까지 관통합니다. 굵기 bold(700), 행간 1.5.
- `border-width: 0` — outline 변형은 보더가 아니라 `inset box-shadow 2px`입니다.
- 크기 **4단**(small~extraLarge) — 32/40/48/56, 8px 등차.

### 입력 — 상하 패딩이 1px 비대칭

| | sm | md | lg (기본) | xl |
|---|:--:|:--:|:--:|:--:|
| 패딩 (상/하) | 6 / **7** | 10 / **11** | 14 / 14 | 18 / **19** |
| 좌우 패딩 | 12px | 12px | 12px | 12px |

- **상단보다 하단이 1px 큽니다** (lg만 대칭) — 광학 보정으로 보이나 근거 주석은
  없습니다. Helios("Figma −1px" 주석)와 달리 무언의 비대칭.
- 기본 서체가 **반응형 배열 `fontSize: [2, null, 1]`** = **mobile 16px → desktop
  14px** — iOS 자동 줌 방지를 prop 기본값으로 내장 (Nord의 미디어 쿼리 승급과
  같은 목적, 반대 방향의 구현).
- 라운드 기본 `lg` = 12px (버튼 large와 같은 값), 보더 1px.

### 다이얼로그 (Radix + motion) — 폭이 브레이크포인트 계열 재사용

| size | 폭 |
|------|-----|
| sm | calc(min(400px, 100vw) − 32px) |
| md (기본) | calc(min(**640px**, 100vw) − 32px) |
| lg | calc(min(960px, 100vw) − 32px) |
| xl | calc(min(**1280px**, 100vw) − 32px) + 고정 높이 |
| full | 100% × 100% |

- **640 = 40em·1280 = 80em** — `em` 브레이크포인트의 px 환산값이 다이얼로그 폭으로
  재등장합니다 (MUI의 "폭 = 브레이크포인트"와 같은 재사용, 단 부분적).
- 기본 라운드 **`2xl` = 24px** — 표본 상위권의 둥근 모달.
- **스크림이 3단 토큰**입니다: 같은 `#001833` 베이스에 dark 0.75 / medium 0.5 /
  light 0.25 — 스크림 농도를 시맨틱 스케일로 노출한 표본 드문 사례.
- 진입/퇴장 비대칭: **enter 250ms easeOut**(`scale 0.9→1` + `y 64→0`) /
  **exit 150ms easeIn**(`y 0→32` — 들어온 거리의 절반만 내려가며 사라짐).
  구현은 `@radix-ui/react-dialog` + `motion`(framer-motion 후속) 12.x.
- sheet 변형이 같은 컴포넌트의 prop(`sheet`) — 바텀시트 진입은 `y 40%→0`.

### 특징적 결정 (심화분)

- **`action-*` 라운드 별칭층** — 크기→형태(필↔12px) 정책을 토큰 이름에 인코딩
- **버튼 medium 9.5px 반픽셀 보정** (높이 40px 정수화) vs **입력 하단 +1px 비대칭**
- 입력 기본 서체가 반응형 배열(mobile 16/desktop 14) — iOS 줌 방지 내장
- 다이얼로그 폭이 em 브레이크포인트 px 환산값 재사용 + 스크림 3단 토큰
- 진입 250/퇴장 150ms 비대칭 + 퇴장 이동거리 절반

## 특징적 결정

- **스페이싱 전 구간 2배 등비** (4→128) — 표본 유일
- **라운드 3단계** — 표본 최소
- **`em` 브레이크포인트** — 표본 유일 단위
- 무명 배열 토큰 (styled-system 규약) — 세 번째 사례
- 행간 2종(본문/전시)

## 접근성

미확인.

## 참고

- 토큰: `npm pack pcln-design-system@6.29.0` → `dist/esm/theme/theme.js`
- 컴포넌트 심화: 같은 패키지 `lib/{Button,Input,Dialog}/*.js` (2026-08-18).
  `lib/` 디렉터리 84개 중 유틸(theme·utils·stories 등) 제외 **컴포넌트 약 79개** 확인
  (Accordion~Tooltip, Chat* 계열 포함)
- **남은 확인 사항:** 컬러 팔레트, 다크 모드,
  `em` 브레이크포인트 선택의 근거. ~~컴포넌트 목록~~ → 디렉터리 열거로 해소(위)
