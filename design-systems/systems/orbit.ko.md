---
name: Orbit
org: Kiwi.com
coverage: full
url: https://orbit.kiwi
repo: https://github.com/kiwicom/orbit
license: MIT
tech: [React]
figma_kit: 미확인
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @kiwicom/orbit-design-tokens@11.0.0 → dist/index.js · npm @kiwicom/orbit-components@27.7.0 (컴포넌트, 2026-08-18 — 최신 27.7.1-alpha.0은 프리릴리스라 안정판 고정)"
---
<!-- lang-links -->
> [English](orbit.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Kiwi.com의 여행 검색·예약 서비스용 디자인시스템.
**컨트롤 크기를 스페이싱과 별도 스케일로 둡니다.**

## 토큰

### 스페이싱

| 토큰 | 값 |
|------|-----|
| `space.50` | 2px |
| `space.100` | 4px |
| `space.150` | 6px |
| `space.200` | 8px |
| `space.300` | 12px |
| `space.400` | 16px |
| `space.500` | 20px |
| `space.600` | 24px |
| `space.700` | 28px |
| `space.800` | 32px |
| `space.1000` | 40px |
| `space.1200` | 48px |
| `space.1300` | **52px** |
| `space.1600` | 64px |

이름의 숫자는 **4px 기준 배수**입니다 (`space.400` = 16px) — Polaris와 같은 방식입니다.

**52px이 있습니다.** 48과 64 사이에 끼어 있으며, 4px 배수이지만 8px 배수는 아닙니다.
표본에서 52px을 갖는 것은 Orbit·Gestalt·Paste 셋입니다.

### 컨트롤 크기 — 별도 스케일

스페이싱과 분리된 `size` 스케일이 있습니다.

| 토큰 | 값 |
|------|-----|
| `size.small` | 16px |
| `size.medium` | 24px |
| `size.large` | 32px |
| `size.extraLarge` | **44px** |
| `size.extraExtraLarge` | **52px** |

**44px과 52px이 스페이싱 스케일에 없는 방식으로 등장합니다** (44는 space에 없고, 52는 있음).
44px은 터치 타겟 최소 권장 크기로 널리 쓰이는 값이지만, 소스에 근거는 적혀 있지 않습니다.

### 라운드

| 토큰 | 값 |
|------|-----|
| `borderRadius.none` | 0 |
| `borderRadius.50` | 2px |
| `borderRadius.100` | 4px |
| `borderRadius.150` | 6px |
| `borderRadius.200` | 8px |
| `borderRadius.300` | 12px |
| `borderRadius.400` | 16px |
| `borderRadius.full` | 9999px |

**스페이싱과 같은 번호 체계를 씁니다** (`400` = 16px 양쪽 동일).
Polaris가 하나의 `size` 맵에서 파생시킨 것과 결과가 같지만, Orbit은 별도 객체로 두고 값을 맞췄습니다.

### 타이포그래피 / 컬러

미확인. 컬러는 색상별로 `dark` / `darkActive` / `darkHover` / `darker` / `light` /
`lightActive` / `lightHover` / `normal` / `normalActive` / `normalHover` **10단계 구조**입니다.
색상 계열은 blue · green · ink · cloud · bundle 등이 확인됩니다.

`elevations` · `boxShadow` · `breakpoint` · `fontSize` · `fontWeight` · `fontFamily`
객체가 함께 있습니다.

### 테마 생성 API

`createTheme` · `createTokens` · `getTokens` · `getCssVars` 함수를 export합니다.
색 변환 유틸(`convertHexToRgba` · `convertRgbaToHex` · `isHex` · `isRgb`)도 포함됩니다.

**토큰 패키지가 값만 담지 않고 테마 생성 로직을 함께 배포합니다.**

## 컴포넌트

~~미확인~~ → **폼 컨트롤 높이 확보 (2026-08-17,
`@kiwicom/orbit-design-tokens@11.0.0` dist).**

```
formBoxSmallHeight  = size.large           = 32px
formBoxNormalHeight = size.extraLarge      = 44px   ← 기본
formBoxLargeHeight  = size.extraExtraLarge = 52px
```

**기본 폼 높이가 44px** — 데스크톱 웹 시스템 다수가 30~36px에 몰리는 것과
달리 Orbit은 **기본값부터 Apple 터치 타겟(44pt)을 충족**합니다. 여행 B2C의
모바일 웹 비중이 값에 그대로 반영된 표본 (`patterns/button.md` 교차 —
"셋 다 44~48을 기본으로 충족하지 못한다"던 프레임워크 3종과 대비).
size 스케일(16/24/32/44/52)이 컨트롤 높이 스케일을 겸합니다.

→ 버튼·입력·모달 실측은 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`@kiwicom/orbit-components@27.7.0` lib 빌드 산출물 +
`@kiwicom/orbit-design-tokens@11.0.0` dist +
`@kiwicom/orbit-tailwind-preset@7.4.0`에서 실측했습니다.

**v27은 styled-components가 아니라 Tailwind 클래스입니다** — HARVESTING.md의
"emotion/styled-components 계열" 기록은 구세대 기준이며, 현 빌드는
`h-form-box-normal px-button-padding-md` 식 유틸리티 문자열입니다.
값은 프리셋(`orbit-tailwind-preset`)이 토큰 패키지에서 주입합니다.
단 `theme.orbit.*`를 읽는 구식 헬퍼(`getSizeToken.js` 등)가 같은 빌드에
**병존**합니다 — 두 층의 값은 일치함을 확인했습니다.

### 버튼 (`Button` / `ButtonPrimitive`)

| | small | normal | large |
|---|:--:|:--:|:--:|
| **높이** | 32px | **44px** | 52px |
| 서체 | 13px | 15px | 16px |
| 좌우 패딩 (텍스트만) | 12px | 16px | 28px |
| 아이콘 쪽 패딩 | 8px | 12px | 16px |
| 라운드 | 8px | 8px | **12px** |

- 높이 = `formBox*Height` = size 스케일(32/44/52) 그대로. 고정 `height`입니다
  (Backpack의 min-height와 다름). **최소 너비 없음** (`min-width` 0회).
- 굵기는 전 크기 **500**(`font-medium`) 고정, `leading-none`.
- **아이콘이 있는 쪽만 패딩이 한 단계 줄어듭니다** — 좌아이콘이면
  `ps`(시작)만 축소. 아이콘 전용은 패딩 0에 **너비 = 높이** 정사각.
- **large만 라운드가 8→12px로 커집니다** — Backpack이 입력 large에서
  8→12로 키운 것과 같은 결정을 Orbit은 버튼에서 합니다.
- 변형 9종: primary · secondary · critical · white + primarySubtle ·
  criticalSubtle + **bundleBasic · bundleMedium · bundleTop** — 마지막 셋은
  Kiwi.com 번들 상품 등급용 그라데이션 버튼입니다. 도메인 상품 체계가
  버튼 변형에 직접 들어온 표본 (Backpack에는 없는 층).

### 입력 (`InputField`)

| | 단일 크기 |
|---|:--:|
| **높이** | **44px** (`h-form-box-normal`) |
| 좌우 패딩 | 12px (`formElementNormalPadding` = `0 space300`) |
| 서체 | **16px** (`formElementLargeFontSize` = fontSize.large) |
| 라운드 | 8px |
| 보더 | 없음 — **inset box-shadow `0 0 0 1px` cloud.dark** |

- **크기 변형이 없습니다** — 버튼은 3단인데 입력은 44px 단일입니다.
  토큰에는 `formBoxSmallHeight`(32)가 있지만 InputField는 size prop 자체가 없습니다.
- **입력 서체가 16px** — 본문(15px)보다 큽니다. iOS Safari가 16px 미만
  입력에서 자동 확대하는 동작과 정합하는 값입니다 (모바일 웹 비중과 일관).
- 시각 박스를 input이 아니라 **절대배치 `fake-input` 오버레이 div**가
  그립니다 (그림자·라운드·전환 전부). input 자체는 투명 — hover/error
  상태 전환을 인접 형제 선택자로 처리하기 위한 구조입니다.
- 라벨은 별도 블록(`FormLabel`): 15px / 500, 아래 여백 4px(`mb-100`).
  플로팅 아님 — Backpack과 같은 진영, MUI와 대극.
- 포커스: 파란 outline 2px (`peer-focus:outline-blue-normal`).

### 모달 (`Modal`)

| 단계 | extraSmall | small | normal | large | extraLarge |
|------|:--:|:--:|:--:|:--:|:--:|
| max-width | 360px | 540px | **740px** | 900px | 1280px |

- **px 5단계 진영의 세 번째 표본**입니다 (`patterns/modal.md` 교차 —
  Mantine 320~780 · Cloudscape 320~1280). 상한 1280은 Cloudscape와 같고,
  기본값 740은 Mantine 기본(440)·shadcn(512)보다 훨씬 넓습니다.
- 라운드 **16px** (`modalBorderRadius` — borderRadius.400과 같은 값).
- **모바일(<576px `lm`)은 바텀시트입니다**: `top-full → top-800`(32px)
  슬라이드, `duration-normal`(300ms) + `ease-in-out`, 스크림 `black/50`.
  데스크톱은 중앙 배치이고 **슬라이드 애니메이션이 없습니다** — 진입
  모션을 모바일에만 두는 비대칭.
- 섹션 패딩: 모바일 `24px/16px`(py-600 px-400) → 데스크톱 **32px**(p-800).
  푸터도 16→32px로 같은 비율.

### 이징 — 토큰 부재 확정 (patterns/motion.md 백로그 해소)

- `@kiwicom/orbit-design-tokens@11.0.0` dist 전체에서 `easing`/`cubic-bezier`
  **0건**. 모션 토큰은 지속시간 3개뿐 (`durationFast/Normal/Slow` = 0.15/0.3/0.4s).
- `orbit-tailwind-preset@7.4.0`은 `transitionDuration`만 토큰으로 덮고
  **`transitionTimingFunction`은 건드리지 않습니다** — Tailwind 기본값이
  그대로 남습니다.
- 컴포넌트 층(27.7.0 lib) 리터럴 분포: **`ease-in-out` 52회 · `ease-linear`
  1회 · `ease-in`/`ease-out`/임의값 0회.** 사실상 단일 곡선이며, Tailwind의
  `ease-in-out` = `cubic-bezier(0.4, 0, 0.2, 1)` — **Material 표준 곡선과
  같은 값**입니다.
- Backpack과의 대비가 선명합니다: 둘 다 이징 무토큰이지만, Backpack은
  Material 곡선이 손글씨로 **드리프트 유입** 중이고(3종 혼재), Orbit은
  프레임워크 기본값을 통해 **단일 곡선으로 수렴**해 있습니다 — 이징을
  토큰화하지 않은 시스템의 두 갈래 결말.

### 특징적 결정 (심화분)

- **버튼 3단 vs 입력 단일 44px** — 폼 요소 크기 선택지를 입력에서 제거
- **입력 서체 16px > 본문 15px** — iOS 자동 확대 임계값 정합
- **번들 상품 등급이 버튼 변형**(bundleBasic/Medium/Top) — 도메인 침투 표본
- **모달 5단계 360~1280, 기본 740** — px 다단 진영 중 기본값 최대
- **진입 모션이 모바일 전용** — 데스크톱 모달은 애니메이션 없음
- **styled-components → Tailwind 전환기** — 구식 theme 헬퍼와 유틸리티
  클래스가 한 빌드에 병존

## 특징적 결정

- **컨트롤 크기를 스페이싱과 분리했습니다.** `size` 스케일 5단계가 별도로 있습니다.
  대부분의 시스템은 컨트롤 높이도 스페이싱 스케일에서 가져옵니다.
- **52px을 씁니다.** 스페이싱과 컨트롤 크기 양쪽에 있습니다.
- **컬러가 색상당 10단계입니다.** `normal` 기준에 `Active`·`Hover` 상태 변형을
  각 명도 단계마다 둡니다. 상태별 색을 토큰에서 해결하는 방식이며,
  Material 3의 State Layer와 목적이 같되 구현이 다릅니다.
- **라운드가 스페이싱과 같은 번호 체계입니다.** `400`이 양쪽에서 16px입니다.
- **테마 생성 함수를 토큰 패키지에 넣었습니다.** 값과 로직을 한 패키지로 배포합니다.
- **토큰이 JS 객체입니다.** `.json`·`.css`가 없어 정적 스캐너로는 발견되지 않습니다.

## 접근성

미확인.

## 참고

- 저장소: https://github.com/kiwicom/orbit
- 패키지: `@kiwicom/orbit-design-tokens`
- **주의:** 토큰이 `dist/index.js`의 JS 객체(`var space = {...}`)로만 존재합니다.
  Base Web과 같은 형태이므로 파일을 직접 열어야 합니다.
- 컴포넌트 심화 (2026-08-18): `@kiwicom/orbit-components@27.7.0` →
  `lib/primitives/ButtonPrimitive/sizes.js` · `lib/InputField/index.js` ·
  `lib/Modal/index.js` · `lib/tailwind.css` +
  `@kiwicom/orbit-tailwind-preset@7.4.0` → `dist/index.cjs` (클래스→토큰 매핑) +
  `@kiwicom/orbit-design-tokens@11.0.0` → `dist/index.js` (실값)
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github kiwicom/orbit → `LICENSE` (npm `@kiwicom/orbit-design-tokens@11.0.0` 메타와 일치)
