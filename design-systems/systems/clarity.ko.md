---
name: Clarity Design System
org: VMware
coverage: partial
url: https://clarity.design
repo: https://github.com/vmware-clarity/core
license: MIT
tech: [Web Components, Angular, React]
figma_kit: false
tokens_format: [CSS]
a11y_target: "명시 없음 확인 (2026-08-18 — 문서에 'WCAG-informed' 표현뿐, 버전·등급 목표 부재)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @cds/core@6.17.0 → global.css, styles/theme.{dark,high-contrast,low-motion}.css"
---
<!-- lang-links -->
> [English](clarity.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

VMware의 시스템 — **모션 감소를 테마 파일로 배포**하고(`theme.low-motion.css`),
고대비 테마에서 **CSS 시스템 색(`Canvas`·`CanvasText`)으로 전환**하며,
스페이싱·타이포가 전부 **`calc(n × 내부 배율)`**입니다.

## 접근성 — 테마가 세 축입니다

```
styles/theme.dark.css          — 다크
styles/theme.high-contrast.css — 고대비 (+ forced-colors 대응)
styles/theme.low-motion.css    — 모션 감소
```

- **모션 감소를 별도 테마 파일로 배포한 표본 유일 사례입니다.**
  다수는 `prefers-reduced-motion` 미디어쿼리 안에서 처리하고
  (Cloudscape는 duration을 0으로, Spindle은 View Transition 해제),
  Clarity는 **테마 교체와 같은 층위**에 둡니다
- **고대비 테마가 `Canvas`/`CanvasText` 같은 CSS 시스템 색을 씁니다** —
  OS 강제 색 모드(forced-colors)에 값을 넘기는 방식.
  브랜드 색을 포기하고 OS 설정을 따르는 선택이며 표본 유일입니다
- 다크/고대비가 같은 alias 토큰(`--cds-alias-object-app-background`)을
  각자 다른 값으로 덮습니다 — 테마 파일 분리 진영

## 토큰 — 전부 `calc()` 배율

```css
--cds-global-space-3:  calc(4 * var(--cds-internal-scale-2));   /* 4단위 */
--cds-global-space-9?: … space-1(1) 2 4 6 8 12 16 24 32 36 48 64 72 96
--cds-global-typography-font-size-4: calc(14 * var(--cds-internal-scale-3));
```

- **모든 치수가 내부 배율 변수와의 곱**입니다 — 배율 하나로 전 시스템이
  재스케일됩니다. 런타임 배율 진영(Mantine·Radix·Vapor·Ring UI·Stacks)의
  **가장 철저한 형태**이며, 스페이싱과 타이포에 **서로 다른 배율 변수**
  (`scale-2` / `scale-3`)를 쓰는 것은 표본 유일입니다
- 스페이싱 단계값 `1·2·4·6·8·12·16·24·32·36·48·64·72·96` — 36 포함, 코어 준수
- 폰트 크기 **10·11·12·13·14·16·20·24…** — 13px 포함(Stacks와 같은 값),
  하단이 1px 단위로 촘촘합니다

## 컴포넌트 심화 — (2026-08-18)

`@cds/core@6.17.0`의 컴포넌트별 스타일 모듈(`button/button.element.scss.js` ·
`input/input.element.scss.js` · `modal/modal.element.scss.js` ·
`internal-components/overlay/overlay.element.scss.js`)과
`internal/motion/`의 애니메이션 정의를 파싱했습니다. Lit `css` 템플릿 문자열이라
빌드 산출물에서 CSS가 그대로 읽힙니다 (HARVESTING.md CSS-in-JS 절과 같은 수법).

> **단위 표기.** 아래 숫자는 토큰의 계수입니다. 실값은 전부
> `계수 × (1rem / --cds-global-base)`이고 base 기본이 **20**이므로,
> **루트 폰트 20px(=125%) 전제에서 계수가 곧 px**입니다.
> 기본 16px 루트에서는 전부 ×0.8로 렌더링됩니다. `[cds-base-font="16"]`
> 속성으로 base를 16으로 바꾸는 스위치가 global.css에 있습니다.

### 버튼 (`cds-button`)

| | 기본 | sm |
|---|:--:|:--:|
| **높이(고정)** | **36** | **25** (= space-9 24 + space-1 1) |
| 패딩 | 12 − 보더(1) = 11 | 세로 6 / 가로 12 |
| **min-width** | **64** (space-13) | — |
| 라운드 / 보더 | 4 / 1 | 동일 |
| 서체 | **12 · 600 · uppercase · 자간 0.12em** | 동일 |

- **uppercase + 자간 0.12em** — MUI(uppercase·0.02857em)와 같은 대문자 진영이되
  자간이 4배 이상 넓습니다. 12px 소형 서체를 자간으로 벌려 읽히는 구성.
- **min-width 64** — MUI와 같은 숫자. (patterns/button.md의 "절대값 최소 너비
  표본 0"은 문서 층 지침 기준 — 코드 층에서는 MUI·Clarity·Fluent가 절대값을 둡니다.)
- sm 높이 25 = 24+1 — 스페이스 토큰 두 개의 합으로 홀수 높이를 만듭니다.
- 배경을 요소가 아니라 **`::after` 의사요소(inset −1, z-index:−1)**에 깔고,
  outline/inverse의 호버·포커스를 그 레이어의 `opacity: .1`로 처리합니다.
- 패딩의 보더 차감(12−1)이 `calc()`로 코드에 — MUI·Codex·Grommet과 같은 수법.

### 입력 (`cds-input`) — 밑줄형이 기본

| | 값 |
|---|---|
| 형태 | **보더 0 + 밑줄(border-bottom) 1 + 라운드 0** |
| 높이 | 입력 요소 height = line-height = **24** (+밑줄 1 = 25) |
| 패딩 | `2 6 0 6` |
| 서체 | **13** (font-size-3) |
| 포커스 | 그라디언트 `background-size` **0%→100% 스윕, 0.2s ease** (`duration-quick`) |

- **박스형이 아니라 Material 혈통의 밑줄형**입니다. 포커스 시 파란 밑줄이
  가운데 확산이 아니라 **가로 스윕**으로 차오릅니다 — `linear-gradient`의
  `background-size` 전환으로 그립니다 (Backpack의 background-size 밑줄과 같은 기술,
  용도는 링크가 아니라 입력 포커스).
- **입력 높이 25 = 버튼 sm 높이 25** — 홀수 높이가 컴포넌트 간 정합.
- 라벨은 별도 블록 — **13 · 400**, 기본 레이아웃은 horizontal(라벨 좌측)이며
  라벨 폭 상한 = 컨트롤 기본 폭 = **192**(= layout-space-xxxl 64 × 3).

### 모달 (`cds-modal`) — 폭 전 단계가 스페이스 토큰 하나의 배수

| size | 폭 | 산식 |
|---|:--:|---|
| sm | 288 | **4 × space-14(72)** |
| 기본 | 576 | **8 × 72** |
| lg | 864 | **12 × 72** |
| xl | 1152 | **16 × 72** |

- **폭 스케일이 `--cds-global-space-14`(72) 하나에서 4·8·12·16배로 파생**됩니다.
  전용 폭 토큰 진영(Cloudscape)도 브레이크포인트 재사용 진영(MUI)도 아닌
  **스페이싱 토큰 배수** 방식.
- 본문 max-height **70vh** (가로 태블릿 55vh) · ≤**576px** 전체화면+라운드 0 —
  기본 모달 폭(576)과 전체화면 브레이크포인트(576px)가 같은 숫자입니다
  (Backpack의 "모달 폭 = 브레이크포인트 32rem"과 같은 패턴).
- 라운드 4 / 보더 1 / 백드롭 rgba(0,0,0,0.6).
- 애니메이션(WAAPI — CSS 전환이 아니라 `internal/motion` 러너가
  CSS 커스텀 프로퍼티에서 옵션을 읽습니다):
  진입 = 백드롭 fade **0.5s**(`duration-slow`) + 다이얼로그 fade+슬라이드
  (translateY −15rem→0) **0.4s**(`duration-primary`), 퇴장 **0.3s**(`duration-secondary`) —
  진입>퇴장, patterns/modal.md의 다수 패턴에 합류. 미정의 시 폴백 300ms linear.
- 이징 `easing-primary` = **cubic-bezier(0, 0.99, 0, 0.99)** — 사실상 즉시 도달 후
  정착하는 극단 감속 곡선. `easing-secondary` = cubic-bezier(0, 1.5, **0.5, 1**) —
  y=1.5의 오버슈트 곡선(TDS `back`·Seed 오버슈트 계열과 같은 축).

### 내부 배율·모션 토큰 — backlog 해소분

- **내부 배율의 실체**: `--cds-internal-scale-N = (1rem / base) × 사용자 배율`.
  base 기본 **20**, 사용자 배율(`--cds-global-scale-*`) 기본 **1**.
- 배율 축은 2종이 아니라 **3종**입니다 — `scale-1`(layout-space) ·
  `scale-2`(space) · `scale-3`(typography). 토큰 절의 "2종" 관찰은 유지하되
  layout 축이 하나 더 있습니다.
- 지속시간 토큰 9개: instant 0 / quickest 0.1 / quicker 0.15 / quick 0.2 /
  secondary 0.3 / primary 0.4 / slow 0.5 / slower 0.7 / slowest 0.8s.
- **low-motion 테마의 실제 동작**: 빠른 지속시간(quickest~primary)은 **0**으로,
  느린 것(slow~slowest)은 **일괄 2s로 늘립니다** — 전환은 끄고,
  루프(스피너류)는 끄는 대신 **느리게** 만드는 이원 처리입니다.

### 특징적 결정 (심화분)

- **모달 폭 = 스페이스 토큰(72) × 4/8/12/16** — 폭 스케일 파생의 제3 방식
- **버튼 uppercase + 자간 0.12em** — 대문자 진영 중 최대 자간
- **입력이 밑줄형 + background-size 스윕 포커스**
- **버튼 sm·입력이 25 홀수 높이로 정합**
- **low-motion이 '끄기'와 '늦추기'를 나눠 적용**
- 진입 0.4s / 퇴장 0.3s 비대칭 + 극단 감속 이징 (0,.99,0,.99)

## 특징적 결정

- **모션 감소 테마 파일** — 표본 유일
- **고대비에서 CSS 시스템 색(forced-colors)** — 표본 유일
- 치수 축별 배율 변수 2종(`scale-2`/`scale-3`) — 표본 유일
- 전 토큰이 `calc()` 곱 — 런타임 배율의 최대 적용 범위
- 폰트 크기 10~13 1px 단위

## 접근성

- 고대비 테마 + forced-colors 시스템 색 대응
- 모션 감소 테마
- ~~WCAG 목표 수치는 미확인~~ → **부재 확정 (2026-08-18, 헤드리스 렌더 확인).**

### WCAG 목표 부재 — 렌더 확인 (2026-08-18)

렌더링해도 Clarity는 **WCAG 목표 수치(버전·등급)를 공개하지 않습니다.**

- https://clarity.design/ — 접근성 카드 문구가
  "Follow our **WCAG-informed** accessibility guidelines to ensure your
  application is inclusive and usable for all."뿐입니다.
  **"WCAG-informed"(참조함)이지 "conformant"(준수)가 아닙니다.**
- https://clarity.design/pages/accessibility — 본문은 목표 선언이 아니라
  **애플리케이션 쪽 실무 지침 2건**입니다.
  - **ARIA Live Region:** "Clarity components will not make any announcements
    out of the box." — 라이브 영역 알림은 **컴포넌트가 아니라 앱이** 단일
    `aria-live` 영역으로 조율해야 한다고 못 박고, `@angular/cdk`의
    `LiveAnnouncer` 사용을 권합니다. 유일한 예외는 오류 상태를 알리는
    `clr-accordion`이며 "향후 버전에서 고쳐질 것"이라고 적혀 있습니다.
  - **autocomplete 속성:** `clr-date-container` · `clr-password-container` ·
    `clr-input-container` 등은 `input` 요소를 **밖에서 프로젝션**받으므로
    `autocomplete` 값 설정은 앱 책임입니다.
  - 인용된 외부 링크는 W3C `aria-live`, MDN, WHATWG, **W3C WCAG21 기법
    H98** — 기법 문서 링크일 뿐 준수 등급 선언이 아닙니다.
- 첫 문장이 범위를 스스로 좁힙니다: "Clarity tries to cover as many best
  practices for accessibility out of the box. However, some things are too
  application-specific for Clarity to provide."

**C 분류 확정**입니다 — 고대비·모션 감소 테마라는 *구현*은 있으나
*목표 수치*는 시스템이 공개하지 않습니다.

### Figma 킷 부재 — 렌더 확인 (2026-08-18)

`figma_kit: false`의 근거입니다. 문서 사이트 렌더 결과에
**`figma` 문자열이 0회**입니다(루트 · `/pages/accessibility` ·
`/pages/designing` 세 페이지 모두). 디자이너용 자산 페이지
(https://clarity.design/pages/designing)가 제공하는 것은
**Metropolis 폰트 파일**과 **아이콘 SVG zip** 둘뿐입니다 —
"Clarity provides assets that help designers get started"의 실체가
컴포넌트 라이브러리가 아니라 **폰트와 아이콘 원본**입니다.

## 참고

- 토큰: `npm pack @cds/core@6.17.0` → `global.css`, `styles/theme.*.css`
- 컴포넌트 심화: 같은 패키지의 `*/**.element.scss.js` + `internal/motion/` (2026-08-18)
- **남은 확인 사항:** ~~내부 배율 기본값~~ ~~컴포넌트 목록~~ (2026-08-18 해소 —
  base 20·배율 1·3축은 심화 절, 컴포넌트는 패키지 최상위 약 35개 요소:
  accordion·alert·badge·breadcrumb·button 5종(action/expand/handle/inline/sort)·
  card·checkbox·datalist·date·divider·dropdown·file·forms·grid·icon·input·
  list·modal·navigation·pagination·password·progress-circle·radio·range·
  search·select·selection-panels·signpost·table·tag·textarea·time·toggle·tree-view),
  컬러 팔레트 전체 실값(`construction`은 청회색 뉴트럴 계열로 확인 —
  100 `#e3eaed` · 600 `#4f6169` · 900 `#21333b` 등), 접근성 목표 수치
