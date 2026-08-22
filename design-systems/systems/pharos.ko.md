---
name: Pharos
org: ITHAKA (JSTOR)
coverage: partial
url: https://pharos.jstor.org
repo: https://github.com/ithaka/pharos
license: MIT
tech: [Web Components, Lit]
figma_kit: false
tokens_format: [CSS]
a11y_target: "전사 목표 명시 없음 확인 (2026-08-18 — 컴포넌트별 Accessibility 절만 있고 WCAG 버전·등급 목표는 부재)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @ithaka/pharos@14.25.0 → lib/styles/variables.css"
---
<!-- lang-links -->
> [English](pharos.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

JSTOR의 시스템 — 스페이싱 이름이 **분수·배수 산문**(`one-eighth-x` ·
`one-and-a-half-x` · `three-and-a-half-x`)입니다. **Cedar(REI)와 같은 체계**로,
"표본 유일"로 기록해 둔 명명 방식이 **2표본 패턴**이 됐습니다.

## 토큰

### 스페이싱 — `x`의 분수·배수, 기준 1rem

```
one-eighth-x    0.125rem (2px)     1-x   1rem  (16px)
one-quarter-x   0.25rem  (4px)     2-x   2rem  (32px)
one-half-x      0.5rem   (8px)     3-x   3rem  (48px)
three-quarters-x 0.75rem (12px)    3.5-x 3.5rem(56px)
one-and-a-half-x 1.5rem  (24px)    5-x · 7-x · 10-x (80·112·160px)
gutter = 3-x
```

- **기준 `x` = 1rem = 16px**입니다. Cedar는 루트가 미확정이었는데
  Pharos가 같은 체계에서 기준을 명시하므로, **산문 배수 명명 진영의
  첫 확정 기준값**이 됩니다 (`tokens/scales.md`)
- px 환산하면 `2·4·8·12·16·24·32·48·56·80·112·160` — 코어값 준수
- **`gutter`가 별칭으로 있습니다** — 레이아웃 여백을 스케일 안에서
  이름으로 고정 (Vanilla `strip`, Braid `space.gutter`와 같은 판단)

### 타이포 — 순번 14단계 + 역할 별칭

```
type-scale-1 0.75rem … type-scale-3 1rem(base) … type-scale-14 4.25rem
font-size-base = type-scale-3 · micro = 1 · small = 2 · large = 5 · xlarge = 6
```

- **순번 스케일과 역할 별칭을 분리**합니다 — EUI(base 중간 배치)와 같은 구조를
  두 계층으로 명시한 형태
- 굵기 **400/700 둘뿐** — CJK 4표본과 같은 구성이 **서구 시스템에서** 나옵니다.
  "CJK 공통 관행" 가설의 반례로, 2굵기는 CJK 전용 특징이 아닙니다
- 라운드 기본 `0.125rem`(2px) — 표본 최소 라운드 계열

## 컴포넌트 심화 — (2026-08-18)

같은 패키지 `@ithaka/pharos@14.25.0`의 `lib/components/*/pharos-*.css.js`
(Lit 생성 CSS) 실측. 토큰과 컴포넌트가 단일 패키지 동거 — Backpack 통합형과 같은 배포.

### 버튼 (`pharos-button`)

| | 기본 | `large` |
|---|:--:|:--:|
| **파생 높이** | **34px** (24행간+4×2+1×2) | 42px (상하 8px) |
| 패딩 | 4px 12px (`one-quarter-x` / `three-quarters-x`) | 8px 12px |
| 보더 | 1px | 1px |
| 라운드 | **2px** (`--pharos-radius-base-standard`) | 2px |
| 서체 | **16px / 24px / 700** + 자간 −2% | 동일 |

- **높이 무선언 파생**(34px) + **min-width 없음** — 표본 최저권 높이.
- **hover/active에서 보더가 1→2px로 두꺼워지고 패딩이 각 −1px 보정**됩니다
  (`calc(var(--pharos-spacing-one-quarter-x) - 1px)`) — 총 치수 불변.
  보더 차감 계열(MUI·LeafyGreen·Odyssey)이 정적 보정이라면 Pharos는 **상태 전이 보정**.
- 자간이 리터럴이 아니라 **`calc(font-size × −0.02)` 비례식** — 전 컴포넌트 공통.
- 전환 `border-color/background/color 250ms ease-in-out`
  (`--pharos-transition-duration-default`). 지속시간 토큰 3단: 100/250/500ms.
- 변형: primary(기본) · secondary · subtle · overlay + `on-background`·`icon` 속성.
- **버튼 서체 16px·700** — Backpack·Thumbprint와 같은 "본문 크기에 볼드" 진영.

### 입력 (`pharos-text-input`)

| | 값 |
|---|---|
| **파생 높이** | **42px** (24행간 + 8×2 + 1×2) — **large 버튼과 정합** |
| 패딩 | 8px 12px |
| 보더 · 라운드 | 1px · 2px |
| 서체 | 16px / 24px / 400 + 자간 −2% |

- 크기 변형 없음 — 42px 단일. 기본 버튼(34px)이 아니라 **large 버튼과 높이가 맞습니다**.
- 라벨은 별도 블록 — **14px(`type-scale-2`) / 700 / `text-transform: uppercase`**,
  margin-bottom 4px. 라벨을 대문자로 강제하는 표본 드문 선택.
- 전환에 `--pharos-transition-base` = `250ms cubic-bezier(0.17, 0.67, 0.83, 0.67)` —
  duration 토큰과 별개로 **커브 포함 복합 토큰**이 하나 더 있습니다 (근사 선형 S곡선).

### 모달 (`pharos-modal`)

| size | 폭 |
|---|---|
| small | 28rem (448px) |
| **medium (기본)** | **39rem (624px)** |
| large | 48rem (768px) |

- **모달 자체는 진입 애니메이션이 없습니다** — `visibility` 토글뿐이고,
  오버레이(`rgba(0,0,0,.5)`)만 250ms ease-in-out 페이드. Thumbprint 데스크톱과 같은
  "커튼만 전환" 진영.
- <570px에서 전체화면 전환 + `top 500ms`(`transition-duration-long`) 슬라이드 —
  **570px 리터럴 브레이크포인트** (토큰 아님).
- 패딩: 헤더·푸터 **32px**(`--pharos-modal-spacing-base` = `spacing-2-x`),
  본문 좌우 32px. 푸터 버튼 간격 margin-left 16px(`1-x`).
- 라운드 **2px** — 버튼~모달까지 시스템 전체가 단일 최소 라운드.
- max-height `calc(100vh − 32px)`, 그림자 `--pharos-elevation-level-5`.

### 특징적 결정 (심화분)

- **hover 보더 증가(1→2px) + 패딩 −1px 상태 전이 보정** — 표본 유일 형태
- **자간 −2% calc 비례식이 버튼·입력·모달 본문까지 관통**
- **라운드 2px 단일값의 전면 적용** — 모달까지 각지게
- 입력(42px)이 기본 버튼이 아니라 large 버튼과 정합 — 폼 행 높이 우선
- 라벨 uppercase 강제 — 아카이브(JSTOR) 성격의 타이포 선택

## 특징적 결정

- **산문 분수·배수 명명** — Cedar와 같은 체계, 기준 x=1rem 확정
- **굵기 400/700** — 서구 시스템의 2굵기 사례(CJK 전용 가설 반증)
- 순번 타이포 14단계 + 역할 별칭 2계층
- `gutter` 별칭을 스케일에 포함
- Web Components(Lit) — Shoelace·PIE·Siemens iX와 같은 진영

## 접근성

~~미확인.~~ → **부분 해소 (2026-08-18, 헤드리스 렌더).**

**전사 준수 목표(WCAG 버전·등급)는 공개하지 않습니다.** 사이트 내비가
Getting started · Help · FAQs · Documentation · Development / Logos·Typography·
Color… / 컴포넌트 / 디자인 토큰으로만 구성돼 있고, **접근성 전용 문서가
없습니다** (루트·getting-started·faqs·help 렌더 확인).

대신 **컴포넌트 문서마다 `Accessibility` 절이 붙습니다.** Button 기준으로
"What's built in"(기본 제공)과 사용 시 주의로 나뉩니다 —
"Ensures component uses the correct semantic element",
"Provides built-in focus styles that **meet WCAG contrast and visibility
requirements**", 키보드 조작(Enter/Space), 필요한 경우 ARIA 속성 추가.
주의 쪽은 "Click here" 같은 모호한 레이블 금지, **`disabled` 상태 남용 경계**
(포커스 순서에서 빠지고 인지 부담이 는다 — 대신 활성 상태를 유지하고 인라인
메시지로 가용성을 알리라고 권합니다), 아이콘 전용 버튼의 레이블 주석 필수.
API에도 `a11y-label`(aria-label) · `a11y-expanded`(aria-expanded)처럼
**접두사 `a11y-`를 붙인 속성 계열**이 있습니다.
출처: https://pharos.jstor.org/components/button (2026-08-18 헤드리스 렌더)

즉 **"목표 등급은 없고 컴포넌트별 보장 항목만 있는" 유형**입니다 —
WCAG는 대비·포커스 가시성의 근거로만 인용됩니다.

## 참고

- 토큰: `npm pack @ithaka/pharos@14.25.0` → `lib/styles/variables.css`
- 컴포넌트 심화: 같은 패키지 `lib/components/{button,text-input,modal}/pharos-*.css.js`
  + `base/form-element.css.js` (2026-08-18)
- 라이선스: package.json에 **MIT** 명기 — frontmatter 반영 (2026-08-18)
- **Figma 킷 — 부재 확정 (2026-08-18, 헤드리스 렌더):** 렌더링해도 이 시스템은
  Figma 킷을 공개하지 않습니다. 루트 · getting-started · faqs · help ·
  컴포넌트 문서를 렌더한 결과 "Figma" 문자열이 **0회**이고, 디자인 도구 관련
  내비 항목도 없습니다. 디자인 산출물 대신 **Web Components 스토리북**
  (`/storybooks/wc/` · `/storybooks/react/`)을 전면에 둡니다.
  출처: https://pharos.jstor.org/ · https://pharos.jstor.org/getting-started
  (2026-08-18 렌더)
- **남은 확인 사항:** ~~접근성 목표~~ ~~Figma 킷~~ (2026-08-18 — 문서 사이트 렌더로
  각각 부분 해소·부재 확정), 컬러 팔레트, ~~컴포넌트 목록~~ (2026-08-18 확인 —
  `lib/components/` 40여 개: alert·breadcrumb·coach-mark·combobox·image-card·
  multiselect-dropdown·sheet·sidenav·table·toast 등), ~~라이선스~~ (MIT — 2026-08-18),
  다크 모드
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github ithaka/pharos → `LICENSE` (npm `@ithaka/pharos@14.25.0` 메타와 일치)
