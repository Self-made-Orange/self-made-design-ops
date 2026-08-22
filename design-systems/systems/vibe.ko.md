---
name: Vibe
org: monday.com
coverage: partial
url: https://vibe.monday.com
repo: https://github.com/mondaycom/vibe
license: MIT
tech: [React, SCSS]
figma_kit: false
tokens_format: [CSS]
a11y_target: "명시 없음 확인 (2026-08-18 — WCAG 준용 서술뿐, 버전·등급 목표 부재. 대비 요구치는 텍스트 4.5:1 · 비텍스트 3:1)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm monday-ui-style@0.26.2 → dist/index.css (변수 919개) + @vibe/core@4.5.9"
---
<!-- lang-links -->
> [English](vibe.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

monday.com의 시스템 — 크기 스케일에 **같은 값이 두 번**(10과 20이 모두
14px) 있고, 기본 서체 스택에 **히브리·아랍·일본어 폰트가 포함**되며,
공식 테마에 **`hacker` 이스터에그 테마**가 있습니다.

## 토큰 — 변수 919개 (`monday-ui-style`이 토큰 층)

토큰 CSS(`monday-ui-style`)와 컴포넌트(`@vibe/core`)가 분리 배포됩니다 —
TDS(colors/typography 분리)와 같은 절단면입니다.

### 타이포 — 스케일에 중복 값

```
--font-size-10: 14px   --font-size-40: 18px
--font-size-20: 14px   --font-size-50: 24px
--font-size-30: 16px   --font-size-60: 30px
h1=60(30px) · h2=50(24px) · h3=50(24px) · h4=40(18px)
```

- **`10`과 `20`이 둘 다 14px, `h2`와 `h3`가 둘 다 24px입니다** —
  단계 번호가 값을 보장하지 않는 표본 유일 사례. 역할 통폐합의 흔적이
  스케일에 그대로 남아 있습니다 (`GLOSSARY.md` 이름-값 역전 계열)
- 자간이 **역할×굵기 조합마다 열거**됩니다 (`h1-bold/normal/light` 전부
  -0.5px) — 값이 같은데도 조합을 다 둡니다

### 서체 — 다문자 기본 스택

```
Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif
```

**히브리어·아랍어·일본어 폰트가 기본 스택에 명시된 표본 유일 사례**입니다 —
이스라엘 기업의 RTL 문자권이 서체 토큰에 반영된 형태.
CJK 대응을 폰트 스택에서 처리(Vibe)하는 방식과 굵기·크기 체계로
처리(CJK 4표본)하는 방식이 대비됩니다.

### 스페이싱·라운드

```
spacing: 4 8 16 24 32 48 64 (12 없음)
radius: small 4 · medium 8 · big 16
disabled 불투명도: 0.38
```

12px이 빠진 코어 위주 7단계입니다. `0.38` disabled 값은 M3의 계수와
같은 값입니다 (소스에 관계 언급 없음).

### 테마 — light · black · **hacker**

```scss
.hacker_theme-app-theme {
  --primary-color: #fe78c6;            /* 핑크 */
  --primary-background-color: #282a36; /* 다크 */
}
```

**공식 배포에 장난 테마가 들어 있습니다** — 다크 이름이 `black`이고,
`hacker`는 핑크+다크 배경의 이스터에그입니다. Grommet의
`hacktoberfest2022` 테마와 함께, 테마 슬롯이 놀이 공간으로 쓰인 두 표본입니다.

## 컴포넌트 심화 — (2026-08-18)

`@vibe/core@4.5.8`에서 실측. 이 패키지는 **CSS 파일을 배포하지 않습니다** —
컴포넌트 CSS가 `*.module.scss.js` 안에 **문자열로 동봉되어 런타임에 `<head>`로
주입**됩니다(README 명기, SSR은 `globalThis.injectedStyles` 훅). 아래 값은
각 모듈의 동봉 CSS 문자열을 추출해 읽었습니다. 토큰 참조값은 같은 패키지
`dist/style`(동봉 `@vibe/style` 4.x 빌드)에서 해석했습니다.
컴포넌트 디렉터리는 **약 70종** (`dist/components/`).

### 버튼 (`Button`) — 5단 고정 높이

| | xxs | xs | small | medium(기본) | large |
|---|:--:|:--:|:--:|:--:|:--:|
| **height** | **16px** | 24px | 32px | **40px** | 48px |
| 패딩 | 2px 4px | 4px 8px | 4px 8px | 8px 16px | 12px 24px |
| 서체 | 14px (text2) | 14px | 14px | **16px** (text1) | 16px |
| 행간 | 16px(재정의) | 21px(재정의) | 24px(재정의) | 22px | 22px |

- 라운드 전 크기 공통 **4px**(`--border-radius-small`), **최소 너비 없음**
  (`min-width: auto` — 단 로딩 전환용으로 min-width에 100ms transition).
- **`:active`에서 `scale(0.95)` 눌림 변형** + `--motion-productive-short`(70ms)
  transform 전환 — 모달(Atlassian·shadcn의 0.95)이 아니라 **버튼**에 스케일을
  거는 결정.
- 기본 굵기 **400**(`--font-text*-normal`) — Stacks와 같은 비볼드 진영.
- 포커스 링이 `hsla(209, 100%, 50%, 0.5)` 3px **하드코딩** — 919개 변수 옆에서
  포커스색만 토큰 밖입니다.
- 아이콘 크기가 CSS가 아니라 JS에서 분기: xxs/xs=16, 이외 20.

### 입력 (`TextField`) — 버튼과 같은 32/40/48 축

| | small | medium(기본) | large |
|---|:--:|:--:|:--:|
| **height** (래퍼 고정) | 32px | 40px | 48px |
| 패딩 | block 8px · start 8px | block 8px · **start 12px / end 4px** | medium과 동일 |
| 서체 | 14px (text2) | 16px (text1) | 16px |

- **좌우 패딩이 12/4px 비대칭입니다** — 끝쪽 4px은 아이콘 컨테이너(24×24)
  자리. 보더 1px, 라운드 4px (+`round` 50px · `square` 0 변형).
- **hover 시 보더가 텍스트색(`--primary-text-color`)이 됩니다** — 회색→검정.
  focus는 `--primary-color`. 전환 `border-color 100ms ease-in`(리터럴).
- 라벨(`FieldLabel`)은 별도 블록 — 14px/20 · **굵기 400** · 하단 4px.
  라벨까지 비볼드인 것은 Stacks(라벨 700)와 갈립니다.

### 모달 (`Modal`, v4 신형) — 폭이 뷰포트에 따라 자라는 px

| size | 기본 | ≥1280px | ≥1440px | max-height |
|:---:|:---:|:---:|:---:|:---:|
| small | 460px | 480px | 520px | 50% |
| medium | 540px | 580px | 620px | 80% |
| large | 800px | 840px | 900px | 80% |

(+`fullView` = inset 0, 상단 40px 남김)

- **px 폭 자체가 미디어쿼리로 3단 성장합니다** — px 고정 진영(Mantine·shadcn·
  Cloudscape)과 뷰포트 % 진영(Carbon) 사이의 제3 방식입니다
  (`patterns/modal.md` 폭 절 대조).
- 라운드 **16px**(`--border-radius-big`) — 라운드 스케일 최상단을 모달에 배정.
  패딩: 인라인 32px · 헤더 상단 32px · 콘텐츠 하단 32px · 푸터 `20px 24px`.
- 스크림이 **`rgba(41, 47, 76, 0.7)` — 검정이 아니라 네이비 틴트**입니다
  (black 테마는 `rgba(33,33,33,0.7)`).
- 애니메이션: 진입 **150ms** `cubic-bezier(0, 0, 0.4, 1)` scale 0.8→1 + 페이드,
  퇴장 **100ms** `cubic-bezier(0.6, 0, 1, 1)` — 진입>퇴장 본류
  (anchorPop 200/150 · fullView 250/100ms).
- **키프레임으로 딜레이를 흉내냅니다** — centerPopIn이 `50%, 100%`에서 완료
  (150ms 중 실효 75ms), out은 `0%, 50%` 대기 후 이동. `animation-delay` 0건.
- **모션 타이밍 토큰이 있는데 모달은 리터럴을 씁니다** — 토큰은
  enter `(0, 0, 0.35, 1)` / exit `(0.4, 0, 1, 1)`, 모달 실측은
  `(0, 0, 0.4, 1)` / `(0.6, 0, 1, 1)`로 **근사하지만 불일치**. Backpack 심화의
  "신규 컴포넌트에 손글씨 곡선 유입"과 같은 드리프트 계열입니다.
  참고로 `--motion-timing-transition`은 `(0.4, 0, 0.2, 1)` — Material 표준 곡선.

### 특징적 결정 (심화분)

- **버튼 5단(16~48px)·입력 3단(32~48px)이 한 축 공유** — xxs 16px까지 내려가는
  촘촘한 하단
- **버튼 `:active` scale(0.95)** — 눌림을 스케일로
- **모달 px 폭의 뷰포트 3단 성장** — px 고정도 % 도 아닌 제3 진영
- **네이비 틴트 스크림** (41, 47, 76)
- **모션 토큰 보유 + 모달의 근사-불일치 리터럴** — 이징 드리프트 표본
- CSS 무배포·런타임 주입 아키텍처 (SSR 훅 별도)

## 특징적 결정

- **스케일 중복 값** (10=20=14px, h2=h3) — 단계 번호 신뢰 불가의 표본
- **다문자(히브리·아랍·일본어) 기본 서체 스택** — 표본 유일
- `hacker` 이스터에그 테마 공식 배포
- 자간을 역할×굵기 조합으로 전수 열거
- 토큰/컴포넌트 패키지 분리 (`monday-ui-style` / `@vibe/core`)

## 접근성

~~미확인~~ → **해소 (2026-08-18, 헤드리스 렌더 확인).**
**단, 목표 등급은 부재 확정입니다.**

출처: https://vibe.monday.com/iframe.html?id=foundations-accessibility--docs&viewMode=docs
(Storybook 문서는 iframe 안에서 렌더되므로 `iframe.html?id=…&viewMode=docs`를
직접 열어야 본문이 읽힙니다 — 상위 URL은 사이드바만 나옵니다.)

- **WCAG를 근거로 들되 버전·등급은 명시하지 않습니다.** 본문은 "Web
  Accessibility is based on guidelines published by The World Wide Web
  Consortium (W3C) ... called Web Content Accessibility Guidelines or WCAG"
  까지만 쓰고 `2.1`·`AA` 같은 목표 표기가 없습니다. 페이지 전체에서
  `WCAG`는 이 서술과 "WCAG Quick Reference" 링크 **2회뿐**입니다.
- **대비 요구치는 수치로 못 박습니다** (WCAG AA 임계값과 동일한 숫자):
  - 텍스트: 배경 대비 **4.5:1** 이상. 플레이스홀더·호버·키보드 포커스 시
    표시되는 텍스트까지 포함.
  - 큰 텍스트 예외: 18pt(약 24px) 이상, 또는 14pt(약 18.66px) 볼드는 **3:1**
  - 비텍스트: **3:1** — UI 컴포넌트(입력·라디오·체크박스 테두리, 포커스 표시)와
    내용 이해에 필요한 그래픽 객체
  - 제외: 비활성 UI, 장식(아이콘·일러스트), 로고타입
- **4원칙을 W3C 표준 용어 대신 자체 어휘로 씁니다** — Clear(명확) ·
  Operable(조작 가능) · Understandable(이해 가능) · Robust(견고).
  POUR의 `Perceivable`을 **`Clear`로 바꿔 쓰는** 표본입니다.
- **체크리스트 파일을 다운로드로 배포합니다** ("Get our Accessibility
  checklist"). 문서가 아니라 **배포물로 주는** 사례입니다.
- 이미지: 정보 전달 이미지는 대체 텍스트가 같은 정보를 담아야 하고,
  "graphic" · "An image of" · "A picture of" · "an icon of" 같은 표현을
  **금지어로 명시**합니다. 장식 이미지는 `role="presentation"` 또는 CSS
  배경으로 뺍니다.
- 포커스: 탭 순서상 모든 인터랙티브 요소가 포커스를 받아야 하고,
  동적 컴포넌트가 닫히면 **상호작용이 시작된 지점으로 포커스를 되돌립니다.**
- 보조기술을 제품명까지 열거합니다 — JAWS · NVDA(Windows) · VoiceOver(macOS) ·
  ZoomText(확대) · Dragon Naturally Speaking(음성 인식).
  스크린리더의 Virtual/Browse 모드와 Input/Forms 모드 구분도 설명합니다.

### Figma 킷 부재 — 렌더 확인 (2026-08-18)

`figma_kit: false`의 근거입니다. Storybook 인덱스
(https://vibe.monday.com/index.json, 항목 653개) 어디에도 Figma 관련 항목이
없고, 접근성 문서의 `figma` 언급은 **대비 검사용 "contrast figma plugin"
권장 1회뿐**입니다 — 킷 배포가 아닙니다. 사이드바 최상위도
Getting Started · Catalog · MCP · Playground · Changelog · Migration Guide ·
Contributing · Foundations · Components · Layout · Text · Theming ·
Accessibility · Hooks로, 디자인 자산 항목이 없습니다.

## 참고

- **4.5.9 재검증 — 토큰 소스 무변경 (2026-08-18).** 올라간 것은 컴포넌트 패키지
  (`@vibe/core` 4.5.8 → 4.5.9)뿐이고, **이 항목의 토큰 출처인 `monday-ui-style`은
  0.26.2가 여전히 최신**입니다(registry 확인). 값 재수집 불필요.

- 토큰: `npm pack monday-ui-style@0.26.2` → `dist/index.css`
- 컴포넌트: `@vibe/core@4.5.8` (React ≥16.9)
- 컴포넌트 심화: `@vibe/core@4.5.8`의 `dist/components/button/dist/Button/
  Button.module.scss.js` · `dist/src/components/TextField/TextField.module.scss.js` ·
  `dist/src/components/Modal/**/*.module.scss.js` · `FieldLabel.module.scss.js`
  동봉 CSS 문자열 추출 + `dist/style/dist/index.min.css.js`(토큰 해석) (2026-08-18)
- 접근성 문서: https://vibe.monday.com/iframe.html?id=foundations-accessibility--docs&viewMode=docs
  (헤드리스 렌더, 2026-08-18)
- Storybook 인덱스: https://vibe.monday.com/index.json (항목 653개, 2026-08-18)
- **남은 확인 사항:** 컬러 팔레트 구조, ~~컴포넌트 목록~~ (2026-08-18 해소 —
  심화 절, 약 70종), ~~접근성 목표~~ (2026-08-18 렌더 — WCAG 준용 서술은
  있으나 버전·등급 목표는 부재로 확정), ~~Figma 킷~~ (부재 확정),
  black 테마와 hacker 테마의 값 차이 전수
