---
name: Bolt Design System
org: Pega (Bolt DS)
coverage: partial
url: https://boltdesignsystem.com
repo: https://github.com/bolt-design-system/bolt
license: MIT
tech: [Web Components, Twig, SCSS]
figma_kit: 미확인
tokens_format: [SCSS, CSS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @bolt/core-v3.x@5.8.0 → styles/01-settings/settings-spacing/_settings-spacing.scss · npm components-button@5.8.0 · components-form@5.8.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](bolt.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Bolt의 시스템 — **가로·세로 스페이싱 베이스가 다르고 둘 다 정수가 아닙니다**
(`x: 1.55` / `y: 1.35`). 축별 무리수 같은 베이스에 배수를 곱해
**4px 격자와 무관한 값**(24.8px · 21.6px)을 만듭니다. 표본 유일 구조입니다.

## 토큰 — 축별 베이스 × 배수, 전부 `calc()`

```scss
$bolt-spacing-system: ('x': 1.55, 'y': 1.35);   // 단위 없음(의도적)
$bolt-spacing-multiplier-system: (
  xxsmall .125 · xsmall .25 · small .5 · medium 1 ·
  large 2 · xlarge 4 · xxlarge 8 · xxxlarge 16
);
$bolt-spacing-x-system: (
  'medium': calc(var(--bolt-spacing-x) * var(--bolt-spacing-multiplier-medium) * 1rem)
);
```

px 환산 (루트 16px):

| 단계 | 가로(x) | 세로(y) |
|------|:---:|:---:|
| xxsmall | 3.1 | 2.7 |
| small | 12.4 | 10.8 |
| **medium** | **24.8** | **21.6** |
| large | 49.6 | 43.2 |
| xlarge | 99.2 | 86.4 |

- **어떤 값도 4·8px 격자에 없습니다.** 격자 이탈 목록(Kaizen 6px ·
  Artsy 10px · GOV.UK 5px · Grommet 24약수)과도 성격이 다릅니다 —
  **격자가 아예 없고 비율만 있는** 유일 사례입니다
- **가로가 세로보다 15% 넓습니다** (1.55 vs 1.35). Lightning·Vanilla가
  축을 분리하면서도 같은 격자 값을 쓴 것과 달리, **축마다 다른 베이스**입니다.
  가로 여백을 더 주는 조판 관행이 베이스에 박혀 있습니다
- **베이스를 무단위로 둔 이유가 주석에 있습니다** — "순수 수학을 가능하게
  하려고"(`rem` 대신 `em`을 쓰는 경우 등 `* 1em`으로 바꿔 끼울 수 있게).
  Braid(격자 배수)·PIE(단위 없는 global)에 이은 **무단위 토큰 세 번째**이며,
  이유가 소스에 적힌 것은 여기뿐입니다
- 배수가 `.125`부터 **2배 등비 8단계**입니다 — Priceline(값 자체가 등비)과
  같은 판단을 배수 층에서 합니다
- 토큰 값이 전부 `calc(var() * var() * 1rem)` **공식 문자열**입니다 —
  주석에 "베이스와 배수만 바꾸면 갱신되도록 공식으로 유지"라고 적혀 있습니다

## 컴포넌트 심화 — (2026-08-18)

컴포넌트가 `@bolt/components-*` 개별 패키지(Web Components + SCSS)로
배포됩니다. `components-button@5.8.0` · `components-form@5.8.0` ·
`components-modal@5.8.2`의 `src/*.scss`를 `core-v3.x@5.8.0` 설정값으로
해석했습니다. 배포물이 컴파일 CSS가 아니라 **SCSS 원본**이라
설계 주석까지 읽힙니다.

### 먼저, 심화로 해소된 토큰 층 (backlog 해소)

- **타이포**: 0.7 / 0.8 / 0.9 / 1 / 1.15 / 1.4 / 1.75 / 2.35rem 8단 —
  px로 11.2 / 12.8 / 14.4 / 16 / 18.4 / 22.4 / 28 / 37.6. **스페이싱과
  마찬가지로 격자 무관**입니다. 행간은 크기별 배수(1.25~1.55) + 별도
  multiplier(tight 0.77 / regular 1 / loose 1.2).
- **굵기**: light 300 / regular 400 / semibold 600 / **bold 800** —
  **500과 700이 없습니다**. 700을 건너뛰고 800을 bold로 쓰는 표본 유일 사례.
- **라운드**: small **3px** / large **0.75em** / full 100em — 3단뿐이고
  large가 **em 상대값**입니다 (무단위 베이스와 같은 "소비 시점 결정" 철학).
- **전환**: `--bolt-transition: ease-in-out 200ms` 단일 토큰.
- 브레이크포인트: 320~1920px 9단 (`xxsmall`~`xxxxlarge`).

### 버튼 — 파생 높이도 전부 비정수

높이 선언이 없고 **서체 × 행간 + 상하 패딩(= y스페이싱 ÷ 2)**로 파생됩니다.

| | xsmall | small | medium | large | xlarge |
|---|:--:|:--:|:--:|:--:|:--:|
| 서체 | 12.8px | 12.8px | **12.8px** | 16px | 18.4px |
| 상하 패딩 | 2.7px | 5.4px | 10.8px | 10.8px | 21.6px |
| **파생 높이** | **≈25.3px** | **≈30.7px** | **≈41.5px** | **≈48.4px** | **≈72.8px** |

- **패딩이 스페이싱 시스템의 직결 산식**입니다 —
  `calc(var(--bolt-spacing-y-medium) / 2)` 상하 + `--bolt-spacing-x-medium`
  좌우. 1.55/1.35 축별 베이스가 버튼 치수까지 그대로 흘러들어,
  **어느 크기도 정수 높이가 아닙니다** (MUI 소수점 방임의 극단형).
- **기본(medium) 버튼 서체가 xsmall(12.8px)** — 본문(16px)보다 작습니다.
  Backpack(본문 크기 그대로 700)과 정반대 극. medium과 large가 패딩을
  공유하고 서체만 다릅니다.
- **hover가 리프트입니다** — `translate3d(0, −2px, 0)` + 겹쳐 둔
  ::before(회색 `0 0.2em 0.75em` @0.8) / ::after(**자기 primary색**
  `0 0.4em 1.5em` @0.4) 두 그림자의 크로스페이드. **그림자 오프셋이
  em 단위**라 서체 크기에 비례합니다. 표본에서 hover에 위치 이동을 쓰는
  유일 사례입니다.
- text-transform이 **클래스 변형**(uppercase/lowercase/capitalize)으로
  배포됩니다 — MUI(uppercase 강제)와 달리 선택제.
- 라운드 3px(small), 굵기 semibold 600, 포커스 `outline: var(--bolt-focus-ring)`
  + offset 2px.

### 입력 (form) — 보더 1px을 패딩에서 차감, 그 이유가 주석에

- 패딩 `calc(var(--bolt-spacing-y-medium) / 2 − 1px)` — 주석:
  **"행간은 버튼과 맞추고, 1px은 입력의 보더를 상쇄한다"**. 버튼(무보더)과
  입력(1px 보더)의 높이 정합 산식이 소스에 문장으로 남은 사례.
- **모바일에서 서체를 16px로 강제**합니다 — 주석: "16px 미만이면 iOS
  Safari가 포커스 시 확대한다". 접근성·UX 보정이 코드에 명시된 형태.
- 플로팅 라벨: scale **0.8** 축소, `--bolt-transition`(200ms) 재사용.
  입력 배경은 **테마를 따르지 않고 항상 흰 배경**입니다 (주석 명시).
- **체크박스·라디오 전환이 `cubic-bezier(0.45, 1.8, 0.5, 0.75)`** —
  두 번째 제어점 **1.8**의 오버슈트 바운스. 체크마크가
  `rotate(45deg) scale(0.1→1)`로 튀어나옵니다. 본류 ease-in-out 200ms와
  분리된 **마이크로인터랙션 전용 커브**입니다.

### 모달 — 폭 옵션에 `75ch`, 오버레이에 light 변형

| width 옵션 | 값 |
|------|-----|
| regular | `clamp(200px, 100%의 10/12, 1400px)` |
| **optimal** | **75ch** |
| full | 100% − 여백 |

- **`optimal`이 문자 단위(75ch)입니다** — 모달 폭을 "본문 가독폭"으로
  정의한 표본 유일 사례. regular는 12열 그리드의 10열 + 브레이크포인트
  xxlarge(1400px) 상한 clamp.
- 진입: **scale 0.95→1 + 페이드**, 200ms ease-in-out (`$bolt-modal-animation-scale`
  변수로 노출). max-height 80vh, 라운드 3px.
- 오버레이가 navy-xdark **@0.8** 기본에 **`--overlay-light`(흰색) 변형**이
  따로 있습니다 — 밝은 스크림을 옵션으로 둔 드문 사례.
- **600px 미만에서 전체화면 전환** + 오버레이 제거. iOS Safari 보정
  (`-webkit-fill-available`, 150vh 스필, `@supports (-webkit-touch-callout:
  none)` 사파리 타게팅)이 버그 트래커 링크 주석과 함께 남아 있습니다.

### 특징적 결정 (심화분)

- **버튼 파생 높이 전부 비정수**(≈25.3~72.8px) — 축별 비정수 베이스가
  컴포넌트까지 관통
- **기본 버튼 서체 12.8px** — 본문보다 작은 버튼 텍스트
- **hover 리프트(−2px) + em 그림자 크로스페이드** — 표본 유일
- 굵기 **300/400/600/800** — 500·700 부재
- 모달 폭 **`75ch`** 옵션 + **light 오버레이** 변형
- 체크박스 바운스 커브 `(0.45, 1.8, 0.5, 0.75)` — 용도 분리형 이징
- 정합 산식·브라우저 보정의 **이유가 주석으로 배포됨** — SCSS 원본 배포의
  부산물

## 특징적 결정

- **축별 비정수 베이스**(x 1.55 / y 1.35) — 표본 유일. 4px 격자 완전 무관
- **무단위 베이스 + 이유 주석** — 단위를 소비 시점에 결정
- 배수 2배 등비 8단계, 토큰 값이 `calc()` 공식
- v2 패키지가 v3를 `@import`로 위임 + deprecation `@warn` —
  마이그레이션이 코드에 노출된 사례 (Spindle·Mística·Vibes 계열)

## 접근성

미확인.

## 참고

- 토큰: `npm pack @bolt/core-v3.x@5.8.0` → `styles/01-settings/`
  (`@bolt/core@2.30.3`는 v3로 위임만 합니다)
- 컴포넌트: `@bolt/components-button@5.8.0` · `-form@5.8.0` ·
  `-modal@5.8.2` → `src/*.scss` (2026-08-18 심화에 사용)
- **남은 확인 사항:** ~~타이포·라운드 설정~~ (2026-08-18 해소 — 심화 절),
  컬러 팔레트 실값, 컴포넌트 목록 전수,
  1.55/1.35 선택의 근거(문서 사이트 프록시 차단)
