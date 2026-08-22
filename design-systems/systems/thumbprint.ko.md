---
name: Thumbprint
org: Thumbtack
coverage: partial
url: https://thumbprint.design
repo: https://github.com/thumbtack/thumbprint
license: Apache-2.0
tech: [React, Sass]
figma_kit: 미확인
tokens_format: [SCSS, JS, Android]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @thumbtack/thumbprint-tokens@13.0.1 → dist/scss/_index.scss · npm @thumbtack/thumbprint-scss@4.0.3 · @thumbtack/thumbprint-react@14.18.2 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](thumbprint.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Thumbtack(홈서비스 마켓플레이스)의 시스템. 스페이싱 상단이 **32 이후 순수 배가**
(64→128→**256**)이고, 원형 표현을 **`full`(50%)과 `sides`(9999px) 두 토큰**으로 나눕니다.

## 토큰

### 스페이싱 — 8단계, 32 위는 배가

```
$tp-space__1: 4    __2: 8    __3: 16    __4: 24
$tp-space__5: 32   __6: 64   __7: 128   __8: 256
```

- 코어 `4/8/16/24/32` **전부 보유** — 12·48이 없습니다
- **32 다음이 64·128·256 순수 배가입니다.** Mantine이 라운드에서 한 것(2~32 배가)을
  스페이싱 상단에서 합니다
- **256px은 열거형 스페이싱 최대값입니다** (Base Web 192 · Pajamas 704은 인덱스
  불규칙 확장, Open Props 480은 별도 성격) — 표본 비교는 `tokens/scales.md`
- 키가 `__1`~`__8` **순번**입니다 (BEM 스타일 밑줄 표기)

### 라운드 — 원형이 두 토큰입니다

```
base: 4px   big: 6px   full: 50%   sides: 9999px
```

**`full`(50% — 정사각형이면 원)과 `sides`(9999px — 알약)를 구분합니다.**
Paste가 `circle`/`pill`을 나눈 것과 같은 판단이며 (`tokens/scales.md`),
이름이 기하학적 결과("옆면이 둥근")를 가리킵니다.

단계형 라운드는 4·6 두 개뿐입니다 — Ant(6 단일)·Blueprint(4 단일) 계열의 최소주의.

## 컴포넌트

토큰 패키지에는 없습니다. `dist/`가 SCSS · JS(cjs/es) · TypeScript ·
**Android**로 배포됩니다 — 크로스 플랫폼 토큰입니다 (Paste·Material 3 계열).
→ 컴포넌트는 별도 패키지. 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

컴포넌트 CSS는 `@thumbtack/thumbprint-scss@4.0.3`(클래식 CSS, 최종 발행 2022-05),
React 래퍼는 `@thumbtack/thumbprint-react@14.18.2`(최종 발행 2024-04, 컴포넌트 35개).
**React 버튼이 scss의 `.tp-button` 클래스를 그대로 씁니다** — 값의 원천은 scss 쪽입니다.

### 버튼 (`button.css`)

| | 기본 | small |
|---|:--:|:--:|
| **min-height** | **52px** | 40px |
| 패딩 | 12px 22px | 상하 8px (좌우 22px 유지) |
| 보더 | **2px** (투명 포함 상시) | 동일 |
| 라운드 | 4px | 4px |
| 서체 | 16px / 24px / **700** | 14px / 20px |

- **최소 너비 없음** (`min-width` 0회). 높이는 `min-height` + `box-sizing:border-box`
  (24행간 + 24패딩 + 4보더 = 52).
- **버튼 서체 16px·700** — Backpack과 같은 "본문 크기에 볼드" 진영. 52px은 표본 상위권 높이.
- 변형 7종: primary(`#009fd9`) · secondary · tertiary · caution · solid · line · clear.
  **포커스가 링이 아니라 `text-decoration: underline` + 배경 변색**입니다 (`outline:none`).
- small이 좌우 패딩을 안 줄입니다 — 상하만 12→8px.

### 입력 (`input.css` · react `TextInput`)

| | large (기본) | small |
|---|:--:|:--:|
| 패딩 | 13px 15px (react는 13px 16px) | 9px 15px |
| 보더 | 1px `#d3d4d5` | 동일 |
| 라운드 | 4px | 4px |
| 서체 | 16px / 24px | 14px / 20px |
| **파생 높이** | **52px** | **40px** |

- **파생 높이가 버튼 min-height와 정확히 일치합니다** (52/40) — 높이 선언 없이
  행간+패딩 산식으로 정합을 맞춘 사례 (버튼은 보더 2px, 입력은 1px+react 래퍼 1px 패딩로 보정).
- 라벨은 별도 블록(`.tp-label`) — **굵기 700, margin-bottom 4px**, 크기 상속.
- react `TextInput`은 보더를 input이 아니라 **절대배치 `.inputStyles` 레이어**에 그립니다 —
  아이콘·버튼을 끼워도 보더가 한 겹으로 유지되는 구조.

### 모달 (react `Modal/index.module.scss`)

| | narrow | medium (기본) | wide |
|---|:--:|:--:|:--:|
| max-width | 416px | 632px | **1400px** |

- 높이 변형이 따로 있습니다 — `heightMedium` 600px / `heightTall` 900px.
  **폭 3단 × 높이 2단**으로 분리한 표본 드문 구조.
- 진입 300ms(`$tp-duration__5`) / 퇴장 250ms(`$tp-duration__4`),
  이징 `$tp-ease__in-out` = `cubic-bezier(0.45, 0, 0.40, 1)`.
- **데스크톱(≥481px)에서 모달 자체는 `transition:none`** — 커튼(`rgba(0,0,0,.8)`)만
  페이드하고 본체는 즉시 나타납니다. 모바일(<481px)에서만 전체화면 +
  `translate(0,100%)→0` 슬라이드업. 브레이크포인트 `$tp-breakpoint__small: 481px`.
- 내용 패딩 20px(모바일) / 좌우 32px(`$tp-space__5`)·하단 40px(데스크톱).
  헤더(닫기 버튼 행) min-height 56px / 64px(`$tp-space__6`). 라운드 선언 없음(0).

### 모션 토큰 (thumbprint-tokens@13.0.1)

지속시간 6단 `75/150/200/250/300/350ms` + 이징 3종 —
`in (0.50,0,1,1)` · `out (0,0,0.40,1)` · `in-out (0.45,0,0.40,1)`.
**Material 곡선이 아니라 자체 커브입니다** (Material은 (0.4,0,0.2,1)).

### 특징적 결정 (심화분)

- **버튼·입력 파생 높이 52/40px 정합** — 한쪽은 min-height, 한쪽은 산식
- **버튼 서체 16px·700** — Backpack과 동일 진영
- **포커스 = 밑줄** (링 없음) — 표본 드묾
- **데스크톱 모달 무전환** (커튼만 페이드) + 모바일 슬라이드업
- **모달 폭 3단과 높이 2단을 직교 분리**

## 특징적 결정

- **스페이싱 상단 순수 배가 → 256px** — 열거형 최대
- **원형 표현 이원화** (`full` 50% / `sides` 9999px)
- **12·48 없음** — 4/8/16/24/32 코어만 정확히 갖춘 8단계
- **Android 빌드 동시 배포** — 소비자 앱 이중 플랫폼
- 키가 밑줄 순번 (`__1`) — 표본 유일 표기

## 접근성

미확인.

## 참고

- 문서: https://thumbprint.design (프록시 차단)
- 토큰: `npm pack @thumbtack/thumbprint-tokens@13.0.1` → `dist/scss/_index.scss`
- 컴포넌트 심화: `@thumbtack/thumbprint-scss@4.0.3`(button/input/label.css) ·
  `@thumbtack/thumbprint-react@14.18.2`(`dist/es/components/{Modal,TextInput}/index.module.scss`) (2026-08-18)
- 라이선스: 두 컴포넌트 패키지 모두 package.json에 **Apache-2.0** 명기 — frontmatter 반영 (2026-08-18)
- **남은 확인 사항:** 타이포 스케일 전체 · 컬러 팔레트(버튼 실색 일부만 확인),
  ~~컴포넌트 목록~~ (react 35개 확인 — 2026-08-18), ~~라이선스~~ (Apache-2.0 — 2026-08-18)
- **라이선스 해소 (2026-08-18):** `Apache-2.0` — 출처: github thumbtack/thumbprint → `LICENSE` (npm `@thumbtack/thumbprint-tokens@13.0.1` 메타와 일치)
