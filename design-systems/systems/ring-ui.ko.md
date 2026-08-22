---
name: Ring UI
org: JetBrains
coverage: partial
url: https://jetbrains.github.io/ring-ui
repo: https://github.com/JetBrains/ring-ui
license: Apache-2.0
tech: [React, CSS]
figma_kit: true
tokens_format: [CSS]
a11y_target: "WCAG 등급 선언 없음 — 자체 최저 텍스트 대비 4.0:1 (AA 4.5:1 미만), 2026-08-18 확인"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @jetbrains/ring-ui-built@7.0.123 → components/style.css"
---
<!-- lang-links -->
> [English](ring-ui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

JetBrains(IDE 웹 UI)의 시스템 — **모든 색 토큰이 RGB 채널 삼중항과 완성색의
쌍**이고, `--ring-unit`(8px) 하나를 **437곳에서 calc()로 곱해** 치수를 만들며,
지속시간과 이징이 **한 토큰에 합쳐져** 있습니다.

## 토큰

### 컬러 — 채널 삼중항 이원 체계

```css
--ring-main-components: 51,105,214;              /* 채널만 */
--ring-main-color: rgb(var(--ring-main-components));  /* 완성색 */
```

**전 색 토큰이 `-components`(R,G,B 나열) + `-color`(rgb() 완성) 쌍입니다** —
어느 색이든 `rgba(var(--ring-*-components), 0.5)`로 알파를 걸 수 있게 한
구조. 표본에서 채널 분리를 **전 팔레트에** 적용한 유일 사례입니다
(shadcn/ui의 OKLCH 직접 기입과 다른 방식으로 같은 문제를 풉니다).

상태가 색 이름에 직접 들어갑니다 — `border-hover` · `border-disabled` ·
`border-selected-disabled` · `border-disabled-active` 같은 **복합 상태 조합**까지
열거합니다 (macOS 킷의 `Value+Disabled` 조합 열거와 같은 판단).

### 치수 — 단위 하나 × calc

```css
--ring-unit: 8px          /* style.css 내 사용 437회 */
--ring-input-m: calc(var(--ring-unit)*30)   /* 240px */
```

개별 스페이싱 토큰이 없고 **`--ring-unit` 곱셈이 스케일을 대신합니다** —
Tailwind(빌드 타임 생성)와 달리 **런타임 calc() 곱셈**입니다.
unit을 바꾸면 컴포넌트 전체가 즉시 재배율됩니다.

### 타이포 — 14px, 굵기 500/600

```
font-size: 12 / 14 / 16px    line-height: 16 / 18 / 20 / 24px
font-weight: medium 500 · bold 600
```

- **기본 14px** — 개발 도구 밀도. Blueprint(Palantir)·Siemens iX와 함께
  엔터프라이즈 밀집 UI의 14px 진영입니다
- **`bold`가 700이 아니라 600입니다** — 이름-값 어긋남 계열
  (`GLOSSARY.md` 이름-값 역전에 해당)

### 모션 — 지속시간+이징 합성 토큰

```css
--ring-ease: 0.3s ease-out
--ring-fast-ease: 0.15s ease-out
```

**duration과 easing이 한 토큰입니다** — Atlassian(복합 토큰의 필드)·
Siemens iX(font 축약형)와 같은 "축약형 토큰" 진영. `transition: color
var(--ring-ease)`처럼 그대로 꽂는 용법입니다.

### 라운드 — 좌우 분리

`2 / 4 / 8px` 3단계에 더해 **`--ring-button-border-radius-left/right`가
별도 토큰**입니다 — 버튼 그룹의 끝단 라운드를 방향별로 제어합니다.

다크 모드는 `.ring-ui-theme-dark` 클래스 오버라이드이며
`prefers-color-scheme` 분기는 없습니다.

## 컴포넌트 심화 — (2026-08-18)

`@jetbrains/ring-ui-built@7.0.123`의 `components/style.css`(CSS 모듈이 평문
클래스로 빌드됨 — `ring-button-heightS` 식)와 `_helpers/*.classes.js` ·
`global/configuration.js`에서 실측했습니다. 컴포넌트 디렉터리는 86개입니다.

### 버튼 (`button/`)

| | S | M (기본) | L |
|---|:--:|:--:|:--:|
| **height** | **24px** (unit×3) | **28px** (unit×3.5) | **32px** (unit×4) |
| 상하 패딩 | 4px | 4px | 6px |
| 좌우 패딩 | 16px (unit×2) | 16px | 16px |
| 아이콘 전용 패딩 | 6px | 6px | 8px |
| 서체 | 12px / 16px | 14px / 20px | 14px / 20px |
| 라운드 | 4px (좌/우 분리 토큰) | 동일 | 동일 |

- **높이가 삼중으로 정합합니다** — 고정 `height`·`line-height`·상하 패딩이 전부
  명시돼 있고 세 값이 계산으로 맞습니다 (20+4×2=28). **최소 너비는 없습니다.**
- **보더가 border가 아니라 `inset box-shadow` 1px입니다** — `border:0`으로 두고
  `box-shadow:inset 0 0 0 1px`을 보더로 씁니다. 레이아웃에 안 잡히는 보더.
- **기본 크기가 prop이 아니라 React 컨텍스트입니다** — `ControlsHeightContext`,
  전역 기본 M(28px). 폼·영역 단위로 S/M/L을 일괄 전환하는 구조입니다.
- **상태 진입은 즉시, 복귀만 애니메이트합니다** — 기본 rule에 `transition:
  color/background/box-shadow var(--ring-ease)`(0.3s ease-out)를 걸고
  `:hover`·`:active`·`:focus-visible`에서 `transition:none`을 선언합니다.
- 변형: primary·success·error·secondary·ghost·danger + inline(텍스트형).
  flat 계열은 전부 보더 변수 투명화로 파생됩니다.

### 입력 (`input/`)

| | S | M | L |
|---|:--:|:--:|:--:|
| **파생 높이** | 24px | 28px | 32px |
| 상하 패딩 | **1px** | **3px** | **5px** |
| 좌우 패딩 | 8px (unit) | 8px | 8px |
| 서체 | 14px / 20px 공통 | | |
| 라운드 | 4px | | |

- **버튼과 같은 24/28/32 사다리를 다른 방식으로 만듭니다** — 버튼은 고정
  height + box-shadow 보더, 입력은 **실보더 1px + 패딩 파생**
  (20+2×패딩+2×1). 홀수 패딩(1/3/5)이 보더 몫을 흡수합니다.
- 너비는 별도 축입니다 — sizeS 96px(unit×12) · M 240px(×30) · L 400px(×50) · FULL.
- 라벨은 별도 블록(`control-label`) — 14px/20px, 아래 여백 4px.
  보조 라벨(12px/16px 회색)이 같은 컴포넌트에 내장돼 있습니다.

### 다이얼로그 (`dialog/`) — 폭 1단계 · 무애니메이션

| 항목 | 값 |
|------|-----|
| 폭 | **464px (unit×58) 단일** |
| min-height | 120px (unit×15) |
| 라운드 | 8px (`--ring-border-radius-large` = unit) |
| 스크림 | rgba(0,0,0,**0.4**) — 다크 테마 **0.7** |
| 애니메이션 | **없음** — dialog 관련 keyframes·transition 0건 |

- **폭 단계가 없습니다** — 464px 하나 (+뷰포트 상한 `100dvw−64px`).
  MUI(브레이크포인트 5단 재사용)·Backpack(2단)과 대극인 극단입니다.
- 컨테이너는 island(카드) 재사용 — 헤더 24px/28px 서체 + 패딩 상 32px,
  푸터(panel) 패딩 `16 32 32`. dense 변형이 상단을 16px로 접습니다.
- **오버레이 z-index가 5입니다** (`--ring-overlay-z-index`) — F36의 10⁴~10⁵
  로그 스케일과 대극인 한 자리 수.
- **스크림 불투명도가 테마 축입니다** — 라이트 0.4 / 다크 0.7.

### 특징적 결정 (심화분)

- **버튼 높이 삼중 정합** (height = line-height + 2×패딩) — 입력은 같은
  사다리를 실보더 파생으로 만드는 이원 구현
- **보더를 inset box-shadow로** — Cedar와 같은 수법 (같은 날 심화에서 재발견)
- **크기 변형이 React 컨텍스트** (`ControlsHeightContext`) — F36의
  `useDensity()`와 같은 "트리 단위 밀도/크기" 진영
- **상태 진입 즉시·복귀만 0.3s** — `transition:none`을 상태 셀렉터에 거는 방식
- **다이얼로그 폭 1단계 + 무애니메이션 + z-index 5**

## 특징적 결정

- **전 팔레트 채널 삼중항 + 완성색 쌍** — 표본 유일
- **단일 unit × calc 437회** — 열거 없는 런타임 곱셈 스케일
- **duration+easing 합성 토큰** — 표본 유일
- `bold` = 600 — 이름-값 어긋남
- 복합 상태(`selected-disabled` 등)까지 색 이름으로 열거
- 버튼 라운드 좌/우 분리 토큰

## 접근성

~~미확인.~~ → **WCAG 적합성 등급을 선언하지 않습니다. 대신 자체 최저 텍스트
대비 4.0:1을 둡니다 (2026-08-18 해소).**

Storybook(`jetbrains.github.io/ring-ui`)에는 접근성 문서가 없습니다 — 헤드리스
렌더한 사이드바 목차는 `Getting Started · Contributing · Changelog · License`
넷뿐입니다(a11y 애드온 `sb-addons/a11y-2`는 설치돼 있습니다). 별도 디자인
가이드라인 사이트 <https://www.jetbrains.com/help/ring-ui/welcome.html> 목차에도
Accessibility 항목이 없고, `/help/ring-ui/accessibility.html`은 404입니다.

접근성 관련 서술은 **컬러 페이지 한 곳**에 모여 있습니다
(<https://www.jetbrains.com/help/ring-ui/color.html>, 최종 수정 2023-03-16).

- **최저 텍스트 대비 4.0:1** — "RingUI에서 텍스트의 최소 대비 요구치는
  **4.0:1**"이라고 못 박습니다. **WCAG AA의 4.5:1보다 낮은 자체 기준**이며,
  표본에서 WCAG 수치를 의도적으로 하향 조정해 명문화한 유일 사례입니다.
  검증 도구로 WebAIM Contrast Checker와 Figma contrast 플러그인을 지목합니다
- **면제 두 가지** — ① 부수적·장식적이며 본질적 목적이 없는 텍스트
  (다만 "그런 요소는 아예 빼는 게 낫다"고 덧붙입니다) ② **비활성화된
  컴포넌트의 텍스트**(비활성 상태면 본질적 목적을 갖지 않는다는 논리)
- **색 단독 전달 금지** — 색으로 정보를 전달하면 텍스트나 아이콘 등 추가
  단서를 반드시 붙이라며, 여기서만 WCAG(Use of Color)를 참조 링크로 겁니다
- **적/황/녹의 의미 고정** — 빨강=치명(오류·실패·위험), 노랑=경고(주의·조치
  필요), 초록=성공(확인·가용). 다르게 쓰면 실제 치명 상황의 주목도가
  떨어진다는 근거를 답니다

즉 **적합성 목표가 아니라 "베스트 프랙티스" 층위의 규칙**만 있습니다.

## 참고

- 토큰: `npm pack @jetbrains/ring-ui-built@7.0.123` → `components/style.css`
- 컴포넌트 심화: 같은 패키지의 `components/style.css` +
  `_helpers/button.classes.js` · `global/configuration.js` (2026-08-18)
- **남은 확인 사항:** 다크 팔레트 값(오버레이 0.7만 확인), ~~컴포넌트 목록~~
  (2026-08-18 해소 — 디렉터리 86개, 버튼·입력·다이얼로그는 심화 절),
  IDE 제품(YouTrack 등)과의 관계, ~~접근성 목표~~ (2026-08-18 해소 —
  WCAG 등급 선언 부재 확정, 자체 대비 4.0:1)
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — github JetBrains/ring-ui → `README.md` → `figma.com/design/j7UivSrGze5xCDKrqzR7Fa/RingUI--Community`
