---
name: Nord
org: Nordhealth
coverage: partial
url: https://nordhealth.design
repo: "github.com/nordhealth/design-system — @nordhealth/css·icons package.json에 선언되나 접근 시 인증 요구(비공개 또는 삭제), 2026-08-18 확인"
license: 독점 (Nordhealth 사내 사용 한정 — 재배포 금지)
tech: [Web Components, Vue, React]
figma_kit: 미확인
tokens_format: [JSON, CSS]
a11y_target: "WCAG 2.1 AA (명시 — 접근성 성명, 2026-08-18 확인)"
platform: web
domain: health
verified: 2026-08-18
source: "npm @nordhealth/tokens@9.0.4 → lib/tokens.json · npm @nordhealth/components@5.3.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](nord.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Nordhealth의 의료 소프트웨어용 디자인시스템.
**수집한 시스템 중 유일한 의료 도메인**입니다.

## 토큰

### 스페이싱 — 6단계, 배수가 불규칙

| 토큰 | 값 | 앞 단계 대비 |
|------|-----|:---:|
| `n_space_xs` | 4px | — |
| `n_space_s` | 8px | ×2 |
| `n_space_m` | 16px | ×2 |
| `n_space_l` | 24px | ×1.5 |
| `n_space_xl` | 36px | ×1.5 |
| `n_space_xxl` | 72px | ×2 |

**×2 → ×2 → ×1.5 → ×1.5 → ×2** 로 배수가 오르내립니다.
36px과 72px은 4px 배수이긴 하지만 8px 배수는 아니며, 다른 시스템에서 드문 값입니다.

### 아이콘 크기 — 별도 스케일

| 토큰 | 값 |
|------|-----|
| `n_size_icon_xxs` | 8px |
| `n_size_icon_xs` | 10px |
| `n_size_icon_s` | 12px |
| `n_size_icon_m` | 16px |
| `n_size_icon_l` | 24px |
| `n_size_icon_xl` | 36px |
| `n_size_icon_xxl` | 72px |

스페이싱과 상단 네 단계(16·24·36·72)를 공유하고, 하단에 8·10·12px을 따로 둡니다.

### 라운드

| 토큰 | 값 |
|------|-----|
| `n_border_radius_sharp` | **0.02em** |
| `n_border_radius_s` | 3px |
| `n_border_radius` | 5px |
| `n_border_radius_pill` | 999px |
| `n_border_radius_circle` | 50% |

**`sharp`가 0이 아니라 `0.02em`입니다.** 폰트 크기에 비례하는 극소 라운드입니다.

### 기타

`n_size_top_bar: 52px` 같은 레이아웃 상수, `n_index_*`(z-index) 12개,
`n_line_*` 6개, `n_transition_*` 3개, `n_font_*` 16개, 컬러 60개가 함께 배포됩니다.

고대비 테마가 별도 파일로 존재합니다 (`color-nord-high-contrast.json`,
`color-vet-dark-high-contrast.raw.json`).

출처: `@nordhealth/tokens@9.0.4` → `lib/tokens.json`

## 컴포넌트

~~미확인.~~ → 버튼·입력·모달은 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`@nordhealth/components@5.3.0` (Lit 웹 컴포넌트 — CSS가 JS에 내장)에서 실측,
`@nordhealth/tokens@9.0.4`로 환산했습니다. 필요한 토큰 실값:
`--n-font-size-s/m/l` = 12/14/16px · `--n-line-height-form` = **20px 고정** ·
`--n-transition-quickly` = **0.05s ease** · `--n-font-weight` = 400.

### 버튼 (`nord-button`) — 높이가 스페이싱 토큰의 산술식

| | s | 기본(m) | l |
|---|:--:|:--:|:--:|
| **min-block-size** | `calc(l + xs)` = **28px** | `space-xl` = **36px** | `calc(xxl − l)` = **48px** |
| 상하 패딩 | `calc(xs − 1px)` = 3px | `calc(s / 1.6)` = **5px** | (파생) |
| 좌우 패딩 | `calc(s + 1px)` = 9px | `calc(m / 1.2)` = **13.33px** | `calc(l / 1.3)` = **18.46px** |
| 라운드 | 3px | 3px | **5px** |
| 서체 | 12px | 14px / 20px / **400** | 16px / **500** |

- **전용 컴포넌트 치수 토큰이 없고, 6단 스페이싱 스케일을 산술해서 만듭니다** —
  높이 48px은 `72 − 24`, 28px은 `24 + 4`, 패딩은 `16/1.2` 같은 **분수 나눗셈**.
  토큰 수를 6개로 유지하는 대가를 calc()가 치르는 구조로, 표본 유일입니다.
- **기본 굵기가 400입니다** — 500~700 관행에서 벗어난 최저값. large만 500.
- 전환 **50ms** (`transition-quickly`) — 표본 최속. Backpack 200ms, MUI 250ms 대비
  1/4~1/5입니다.
- 모든 속성이 `--_n-button-*: var(--n-button-*, var(--n-토큰))` 이중층입니다 —
  **공개 오버라이드 훅(`--n-button-*`)을 전 속성에 깔아 둔** 형태로, Backpack
  `--bpk-private-*`(오버라이드 금지 선언)와 정반대 신호입니다.
- 배경에 `linear-gradient(to bottom, #0000 50%, rgba(0,0,0,.013) 100%)` —
  1.3% 불투명도의 미세 그라데이션을 기본 탑재합니다.

### 입력 (`nord-input`)

| | s | 기본(m) | l |
|---|:--:|:--:|:--:|
| block-size | (파생 28px) | **36px** (`space-xl`) | 48px (`calc(xxl − l)`) |
| 상하 패딩 | 3px | `calc(h/2 − 20/2 − 1px)` = **7px** | 동일식 |
| 좌우 패딩 | `xs×1.6` = 6.4px | `s×1.6` = **12.8px** | 12.8px |
| 서체 | 12px | 14px / 20px | 16px |

- **기본 폭이 240px 고정입니다** (`--n-input-inline-size: 240px`) —
  `width:100%` 관행과 달리 옵트인 `expand`로 늘립니다.
- 상하 패딩이 값이 아니라 **높이 역산식**입니다: `높이/2 − 행간/2 − 보더 1px`.
  버튼·입력이 같은 36/48을 공유하되, 버튼은 나눗셈 상수, 입력은 역산식으로 도달합니다.
- **뷰포트 ≤480px에서 서체가 m(14)→l(16)로 자동 승급**됩니다 — iOS 자동 줌 방지를
  미디어 쿼리로 컴포넌트에 내장한 사례.
- focus가 보더색 변경 + `box-shadow: 0 0 0 1px 같은 색` — 2px 링을 보더+그림자
  합성으로 만듭니다.

### 모달 (`nord-modal`)

| size | max-inline-size |
|------|-----|
| s | 440px |
| 기본(m) | **620px** |
| l | 940px |
| xl | none (전폭) |

- 라운드 5px, 진입 `translateY(-10px) scale(0.97)` + 페이드, **0.2s ease**
  (`transition-slowly`).
- 백드롭 상단 패딩이 `clamp(24px, min(10vh, 10vw) − 1em, 80px)` —
  **모달을 수직 중앙이 아니라 상단 쪽에 클램프**로 앉힙니다.
- 헤더 하단 1px 보더 + 전용 배경(`--n-color-header`), 본문 패딩 상 24 / 하 36px 비대칭.
- 닫기 버튼 36×36px(`space-xl` 재사용)에 `::after { inset: -8px }`로
  **히트 영역만 52×52로 확장** — 시각 크기와 터치 타깃을 분리합니다.
- 반응형 분기가 **`min-width: 489px`** — 480도 488도 아닌 홀수 경계값입니다
  (입력의 480px 분기와도 다름).

### 특징적 결정 (심화분)

- **치수 = 스페이싱 토큰 산술(`calc(xxl − l)`, `/1.2 /1.6 /1.3`)** — 전용 치수 토큰 0개
- **전환 50ms** — 표본 최속
- **버튼 기본 굵기 400** · 기본 입력 폭 240px 고정
- **전 속성 공개 오버라이드 훅** (`--n-button-*` 계열) — Backpack private층과 대극
- 모바일 서체 자동 승급(≤480px) · 모달 상단 클램프 배치

## 특징적 결정

- **완전한 0 라운드가 없습니다.** 가장 각진 값이 `0.02em`입니다.
  16px 기준 약 0.32px로 사실상 0이지만, **폰트 크기에 비례**한다는 점이 다릅니다.
  텍스트가 커지면 모서리도 미세하게 둥글어집니다. 표본에서 유일한 방식입니다.
- **라운드가 3px·5px입니다.** Helios(HashiCorp)와 같이 홀수를 씁니다.
  기본값이 5px로, 4px·8px 관행에서 벗어나 있습니다.
- **스페이싱 배수가 불규칙합니다.** ×2와 ×1.5를 섞습니다.
  대부분의 시스템은 일정한 배수나 등차를 유지하는데, Nord는 구간마다 다릅니다.
- **36px·72px을 씁니다.** 32px·64px 대신입니다.
  36은 12의 배수, 72는 36의 2배로, 4px 배수이면서 8px 그리드와는 맞지 않습니다.
- **고대비 테마를 1급으로 배포합니다.** 기본·수의(vet) 테마 각각에 대해 제공합니다.
- **`n_` 접두사를 전 토큰에 붙입니다.**

## 접근성

고대비 테마를 테마 레벨에서 제공합니다 (기본·수의(vet) 테마 각각).
명시적 준수 목표는 미확인.

## 참고

- 패키지: `@nordhealth/tokens` (`@nordhealth/themes`가 아니라 이쪽에 토큰이 있습니다)
- 관련: `@nordhealth/css`
- 컴포넌트 심화: `@nordhealth/components@5.3.0` → `lib/{Button,Input,Modal}.js` +
  `TextField-*.js` 공유 청크 (Lit 내장 CSS), 환산은 `@nordhealth/tokens@9.0.4` (2026-08-18)
- 라이선스: components 패키지가 **Nordhealth 자체 라이선스**입니다
  (`SEE LICENSE IN LICENSE.md` — 오픈소스 라이선스 아님) — frontmatter 반영 (2026-08-18)
- **라이선스 해소 (2026-08-18):** `독점 (Nordhealth 사내 사용 한정 — 재배포 금지)` — 출처: npm `@nordhealth/tokens@9.0.4` → `LICENSE.md`. "solely for the purpose of performing your duties for and on behalf of Nordhealth" — **공개 npm에 올라와 있지만 오픈소스가 아닙니다**
