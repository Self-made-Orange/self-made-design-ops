---
name: Paste
org: Twilio
coverage: partial
url: https://github.com/twilio-labs/paste
repo: https://github.com/twilio-labs/paste
license: MIT
tech: [React]
figma_kit: 미확인
tokens_format: [CSS, JSON, JS]
a11y_target: 미확인
platform: [web, mobile]
domain: enterprise
verified: 2026-08-18
source: "npm @twilio-paste/design-tokens@10.15.0 → dist/tokens.custom-properties.css · npm @twilio-paste/button@15.0.2 · @twilio-paste/modal@17.0.1 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](paste.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Twilio의 커뮤니케이션 제품용 디자인시스템.
**스케일이 선형 등차수열**이라는 점이 다른 시스템과 크게 갈립니다.

## 토큰

### 스페이싱 — 4px 등차수열

| 토큰 | rem | px |
|------|-----|-----|
| `--space-0` | 0 | 0 |
| `--space-10` | 0.125 | 2 |
| `--space-20` | 0.25 | 4 |
| `--space-30` | 0.5 | 8 |
| `--space-40` | 0.75 | 12 |
| `--space-50` | 1 | 16 |
| `--space-60` | 1.25 | 20 |
| `--space-70` | 1.5 | 24 |
| `--space-80` | 1.75 | 28 |
| `--space-90` | 2 | 32 |
| `--space-100` | 2.25 | 36 |
| `--space-110` | 2.5 | 40 |
| `--space-120` | 2.75 | 44 |
| `--space-130` | 3 | 48 |

`space-30`(8px) 이후로는 **정확히 4px씩 등차로 증가**하며, `space-300`(7.25rem / 116px)까지
같은 간격으로 이어집니다.

### 라운드

| 토큰 | 값 |
|------|-----|
| `--border-radius-0` | 0 |
| `--border-radius-10` | 2px |
| `--border-radius-20` | 4px |
| `--border-radius-30` | 8px |
| `--border-radius-40` | 12px |
| `--border-radius-50` | 16px |
| `--border-radius-60` | 20px |
| `--border-radius-70` | 24px |
| `--border-radius-80` | 28px |
| `--border-radius-90` | 32px |
| `--border-radius-pill` | 100px |
| `--border-radius-circle` | 50% |

### 타이포그래피

| 토큰 | rem | px |
|------|-----|-----|
| `--font-size-10` | 0.625 | 10 |
| `--font-size-20` | 0.75 | 12 |
| `--font-size-30` | 0.875 | 14 |
| `--font-size-40` | 1 | 16 |
| `--font-size-50` | 1.125 | 18 |
| `--font-size-60` | 1.25 | 20 |
| `--font-size-70` | 1.5 | 24 |
| `--font-size-80` | 1.75 | 28 |
| `--font-size-90` | 2 | 32 |
| `--font-size-100` | 2.5 | 40 |
| `--font-size-110` | 3 | 48 |

디스플레이용 별도 스케일: `--font-size-display-10` 2rem · `-20` 3rem · `-30` 4rem

기준값 `--font-size-base: 100%`

### 다중 브랜드

패키지에 `twilio-dark`, `sendgrid` 등 **브랜드별 테마가 별도 디렉터리**로 존재합니다.
iOS용 토큰(`tokens.ios.json`)도 함께 배포됩니다.

출처: `@twilio-paste/design-tokens@10.15.0`

## 컴포넌트

~~미확인.~~ → 버튼·입력·모달은 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

컴포넌트가 `@twilio-paste/*` 개별 패키지입니다. `button@15.0.2` ·
`input@10.0.2` · `input-box@11.0.2` · `modal@17.0.1`의 dist JS(스타일 객체가
토큰 이름으로 박혀 있음)를 파싱하고, `design-tokens@10.15.0`으로 전부 px 환산했습니다.

### 버튼 (`@twilio-paste/button`)

| | default | small |
|---|:--:|:--:|
| 파생 높이 | **36px** | 28px |
| 상하 패딩 | 8px (`space30`) | 4px (`space20`) |
| 좌우 패딩 | 12px (`space40`) | 8px (`space30`) |
| 라운드 | 8px (`borderRadius30`) | 8px |
| 서체 | 14px / 20px / **600** | 동일 |

- **`border`가 없습니다 — 보더 전부가 `box-shadow`입니다.** 변형·상태 스타일에서
  `shadowBorder*` 참조가 44회, `border` 선언 0회. `--shadow-border: 0 0 0 1px #8B93AA`
  같은 **1px 스프레드 그림자를 보더 토큰으로** 씁니다. 레이아웃에 안 잡히므로
  높이 계산에 보더 몫이 없고(20+8×2=36 정수), 상태 전환이 `box-shadow` 전환
  하나로 통일됩니다 (`transition: … box-shadow 100ms ease-in`).
- 높이 선언이 없고 **행간+패딩 파생**입니다 (MUI와 같은 층, 단 정수로 떨어짐).
  **min-width도 없습니다.**
- 크기 2단(default·small) — Backpack과 같은 2단 진영인데 방향이 아래(36/28)입니다.
- 전환 100ms `ease-in` (버튼) / 토글 버튼만 150ms.
- 변형에 `rounded_small`(pill) · icon · circle 계열이 크기 축에 들어 있습니다 —
  크기와 형태가 한 prop입니다.

### 입력 (`@twilio-paste/input` + `input-box`)

| | 값 |
|---|---|
| 파생 높이 | **36px** (버튼 default와 동일) |
| 패딩 | 8px / 12px (버튼과 동일한 `space30`/`space40`) |
| 서체 | 14px / 20px / **500** |
| 보더 | 래퍼(`InputBox`)에 `shadowBorder` — 역시 box-shadow |
| 라운드 | 래퍼 8px, **내부 input 4px** (`borderRadius20`) |

- **버튼과 입력이 패딩 토큰까지 같은 값**을 씁니다 — 36px 정합이 우연이 아니라
  같은 레시피입니다.
- 보더·배경·상태(hover/focus/error)가 전부 래퍼 `InputBox`에 있고 내부 `<input>`은
  투명·무보더입니다. 래퍼 라운드 8px 안에 내부 라운드 4px이 들어가는 이중 라운드.
- 버튼 600 vs 입력 500 — 굵기만 다릅니다.

### 모달 (`@twilio-paste/modal`) — 스프링 물리, 지속시간 없음

| | default | wide |
|---|:--:|:--:|
| max-width | **38rem (608px)** (`size60`) | 51rem (816px) (`size80`) |
| 라운드 | 8px | 동일 |
| min-height | 170px (리터럴) | 동일 |
| 내부 패딩 | 헤더·푸터 32px (`space90`) · 본문 좌우 32px / 상하 2px | 동일 |

- **진입/퇴장이 react-spring입니다** (`@twilio-paste/animation-library` =
  `@react-spring/web@9.7.5`): `scale(0.675)→1` + 페이드,
  `{ mass: 0.5, tension: 370, friction: 26 }`. **지속시간·이징 토큰이 아예 개입하지
  않는 물리 기반** — 표본에서 모달 진입을 스프링 설정값으로 정의한 유일 사례입니다.
- 폭이 스페이싱과 같은 등차 `size` 스케일에서 나옵니다 — 전용 모달 폭 토큰이 아니라
  범용 사이즈 토큰(`size60`/`size80`) 재사용.
- 스크림 `rgba(6, 3, 58, 0.4)` (`color-background-overlay`) — 검정이 아니라 남색 계열.
- 시맨틱 최소 높이 170px 리터럴 — 토큰 밖의 값이 하나 숨어 있습니다.

### 특징적 결정 (심화분)

- **보더의 box-shadow 전면 대체** — 버튼·입력 공통 아키텍처, 높이 파생식에서 보더 항 제거
- **버튼·입력이 같은 패딩 토큰으로 36px 정합**
- **모달 진입이 스프링 물리(mass/tension/friction)** — 지속시간 개념 부재, 표본 유일
- 크기 축에 형태 변형(pill·circle)이 함께 들어 있음
- 등차 토큰(`space`·`size`)이 컴포넌트 층에서도 그대로 — 전용 컴포넌트 토큰층 없음

## 특징적 결정

- **스페이싱이 등차수열입니다.** 8px 이후 4px씩 균등하게 증가하며 116px까지 갑니다.
  대부분의 시스템은 상단으로 갈수록 간격을 넓히지만(Carbon 96→160, Polaris 96→112→128),
  Paste는 끝까지 4px 간격을 유지합니다.
  **선택지가 매우 많아지므로 "어느 값을 쓸 것인가"의 판단 부담이 큽니다.**
- **`pill`과 `circle`을 구분합니다.** `pill`은 100px 고정, `circle`은 50% 비율입니다.
  다른 시스템이 하나로 뭉뚱그린 것을 두 개념으로 나눴습니다.
- **디스플레이 타이포를 별도 스케일로 둡니다.** 본문 스케일과 겹치는 값이 있지만
  (`font-size-90` 32px vs `font-size-display-10` 32px) 용도로 분리했습니다.
- **다중 브랜드를 전제로 설계됐습니다.** SendGrid 등 별도 브랜드 테마가 함께 배포됩니다.
- **iOS 토큰을 함께 배포합니다.** 웹 전용 시스템이 대부분인 가운데 드문 사례입니다.

## 접근성

미확인.

## 참고

- **문서 사이트 폐지 (2026-08-18 확인):** `paste.twilio.design`이 저장소로 301 — 전용 문서 사이트가 없어졌습니다

- 저장소: https://github.com/twilio-labs/paste
- 패키지: `@twilio-paste/design-tokens`
- 컴포넌트 심화: `@twilio-paste/button@15.0.2` · `input@10.0.2` · `input-box@11.0.2` ·
  `modal@17.0.1` → 각 `dist/index.debug.es.js` + `design-tokens@10.15.0`으로 환산 (2026-08-18)
- 라이선스: 컴포넌트 패키지 package.json에 **MIT** 명기 — frontmatter 반영 (2026-08-18)
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github twilio-labs/paste → `LICENSE` (npm `@twilio-paste/design-tokens@10.15.0` 메타와 일치)
