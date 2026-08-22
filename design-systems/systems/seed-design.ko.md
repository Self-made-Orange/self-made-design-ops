---
name: Seed Design
org: 당근 (Karrot)
coverage: partial
url: https://seed-design.io
repo: https://github.com/daangn/seed-design
license: Apache-2.0
tech: [React, CSS]
figma_kit: false
tokens_format: [CSS, JS]
a11y_target: "WCAG 미채택 — APCA(Lc) 기준 자체 채택, 본문 Lc 75+ / 기타 Lc 60+ / placeholder·disabled Lc 30+ (2026-08-18 확인)"
platform: [web, mobile]
domain: commerce
verified: 2026-08-18
source: "npm @seed-design/stylesheet@1.1.2 (global.css) · @seed-design/design-token@1.0.5 · npm @seed-design/css@2.5.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](seed-design.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

당근(Karrot)의 지역 커뮤니티·중고거래 서비스용 디자인시스템.
**한국에서 만들어진 공개 시스템** 중 토큰을 배포하는 사례입니다.

## 토큰

### 타이포그래피 — 18단계, 0.0625rem(1px) 단위

| 토큰 | rem | px |
|------|-----|-----|
| `font-size-10` | 0.625 | 10 |
| `font-size-25` | 0.6875 | 11 |
| `font-size-50` | 0.75 | 12 |
| `font-size-75` | 0.8125 | 13 |
| `font-size-100` | 0.875 | 14 |
| `font-size-150` | 0.9375 | 15 |
| `font-size-200` | 1 | 16 |
| `font-size-300` | 1.125 | 18 |
| `font-size-400` | 1.25 | 20 |
| `font-size-500` | 1.5 | 24 |
| `font-size-600` | 1.625 | 26 |
| `font-size-700` | 2 | 32 |
| `font-size-800` | 2.125 | 34 |
| `font-size-900` | 2.625 | 42 |
| `font-size-1000` | 3 | 48 |
| `font-size-1100` | 3.375 | 54 |
| `font-size-1200` | 3.75 | 60 |
| `font-size-1300` | 4.5 | 72 |

**10~16px 구간이 1px 단위로 전부 채워져 있습니다** (10·11·12·13·14·15·16).
7단계가 6px 범위 안에 들어 있습니다.

**표본에서 가장 촘촘한 타이포 스케일입니다.**
Carbon(12·14·16·18·20 — 5단계) · Material 3(11·12·14·16 — 4단계)과 비교됩니다.

### 자간 — 음수 3단계

| 토큰 | 값 |
|------|-----|
| `letter-spacing-none` | 0em |
| `letter-spacing-narrow-200` | **-0.02em** |
| `letter-spacing-narrow-300` | **-0.03em** |
| `letter-spacing-narrow-400` | **-0.04em** |

**`narrow`만 있고 `wide`가 없습니다.** 좁히는 방향으로만 3단계를 둡니다.

Backpack도 자간을 토큰화하지만 값이 -0.02 / -0.04 / -0.05em으로 다릅니다.
**두 시스템 모두 음수만 제공합니다.**

### 컬러

`@seed-design/stylesheet`의 `global.css`에 색상 계열별로 정의돼 있습니다.

확인된 계열: `gray` · `carrot`(브랜드) · `blue` · `green` · `red` · `pink` · `purple`,
각각에 `-alpha-` 변형이 별도로 있습니다 (`gray-alpha-*` 등).

**알파 변형을 별도 토큰 계열로 둡니다.** 투명도를 색에 미리 적용한 값을 제공하는 방식입니다.

### 토큰 계층

`@seed-design/design-token`이 3계층으로 나뉩니다.

```
scale/      원시 값 (dimension · color · letterSpacing)
static/     고정 값 (color · fontWeight · lineHeight)
semantic/   용도별 (color · typography)
```

JS export는 CSS 변수를 참조하는 래퍼입니다.

```js
export const fontSize100 = "var(--seed-scale-dimension-font-size-100)";
```

**실값은 CSS에, JS는 참조만** 담는 구조입니다.

### 스페이싱 / 라운드 — 없습니다 (v1 stylesheet 기준)

**토큰이 존재하지 않습니다.** `global.css`의 변수 744개를 전수 확인한 결과입니다.
**단, 이 판정은 `stylesheet@1.1.2`(v1) 한정입니다** — 신세대
`@seed-design/css@2.5.0`에는 스페이싱·라운드·모션이 전부 있습니다
(아래 심화 절, 2026-08-18).

카테고리 분포:

| 계층 | 카테고리 | 변수 수 |
|------|----------|:---:|
| semantic | typography-* (label·body·title·subtitle·h·caption) | 342 |
| scale | color-* (7색 + alpha 변형) | 256 |
| scale | letter-spacing | 84 |
| scale | dimension-font-size | 56 |
| static | line-height | 41 |
| static | font-weight | 40 |
| semantic | color-* | 나머지 |

**`dimension` 카테고리에 `font-size`만 있습니다.** 스페이싱·라운드에 해당하는 변수가
어느 계층에도 없습니다.

즉 Seed Design은 **컬러와 타이포그래피만 토큰화한 시스템**입니다.
여백과 모서리는 컴포넌트(`@seed-design/react`)에 직접 들어 있습니다.

표본 34개 중 이런 구조는 Apple HIG·Material 3(모바일 OS)·Seed Design·Evergreen 넷입니다.
**다만 Seed는 `platform: [web, mobile]`이므로, 모바일 OS만의 특성이라고 볼 수 없습니다.**

## 컴포넌트

~~미확인. `@seed-design/react@2.3.0`이 별도 배포됩니다.~~ → 아래 심화 절
(2026-08-18). 컴포넌트 CSS는 stylesheet가 아니라 **`@seed-design/css`**에
있습니다.

## 컴포넌트 심화 — (2026-08-18)

**세대 확인부터.** `@seed-design/stylesheet@1.1.2`에는 컴포넌트 CSS가
없습니다 (`global.css` 단일 파일 — 위 토큰 절의 전수 결과 그대로).
컴포넌트 층은 **신세대 `@seed-design/css@2.5.0`** 에 있습니다:
`all.css`(1.3만 줄) + `recipes/*.css` **92개**. `@seed-design/react@2.3.0`은
동작만 담고(peer dep `@seed-design/css ^2.5.0`), 클래스는 css 패키지의
recipe에서 가져옵니다. 프리미티브는 컴포넌트별 `@seed-design/react-*`
분할 패키지 + Radix 유틸리티입니다.

### v2에서 토큰 체계가 뒤집혔습니다 — 스페이싱·라운드·모션이 생겼습니다

위 절의 "컬러와 타이포만 토큰화" 판정은 **v1(stylesheet 1.1.2) 한정**으로
유지되고, v2(css 2.5.0)는 전 축을 배포합니다:

| 축 | 스케일 |
|----|--------|
| dimension | `x0_5`~`x16` = 2~64px (**4px 배수 `x` 네이밍**, x2_5=10px 등 반단계 포함) |
| radius | `r0_5`~`r6` = 2~24px + full |
| duration | `d1`~`d6` = 50~300ms (50ms 등간격) |
| easing | linear · easing(.35,0,.35,1) · enter(0,0,.15,1) · exit(.35,0,1,1) + **expressive 쌍** |
| 시맨틱 spacing | `spacing-x-global-gutter`(16px) · `spacing-y-screen-bottom`(56px) 등 용도별 |

- 타이포도 `t1`~`t14`(11~48px) **t-스케일로 재편**됐고, **모든 크기가
  `clamp(정적×0.8, 계산값×multiplier, 정적×1.5)`로 감싸져** 있습니다 —
  OS 글자 크기 설정(`--seed-font-size-multiplier`) 대응이 토큰 정의 자체에
  들어간 표본 유일 구조입니다. iOS Dynamic Type을 웹 토큰으로 옮긴 형태.

### 버튼 (ActionButton) — 눌림이 색이 아니라 스케일입니다

| | xsmall | small | medium | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 32px | 36px | 40px | **52px** |
| 라운드 | **full (알약)** | 8px | 8px | 12px |
| 서체 | 13px | 14px | 14px | 18px |
| 좌우 패딩 | 14px | 14px | 16px | 20px |
| **눌림 scale** | **0.95** | 0.97 | 0.97 | **0.98** |

- **active가 `scale` 축소**입니다 (`--seed-scale-s95/s97/s98`,
  150ms 전용 이징). **크기별로 축소율이 다릅니다** — 작을수록 많이
  줄어 시각 변화량을 맞춥니다. `prefers-reduced-motion`에서 세 변수가
  전부 1로 재정의되는 것까지 토큰층에서 처리합니다.
- **xsmall만 알약(full)이고 나머지는 8/12px** — 크기 단이 형태까지 바꿉니다
  (Backpack input의 large 라운드 확대보다 급진적).
- large가 44·48을 건너뛴 **52px** — 모바일 주 CTA 높이로 보입니다.
- 변형: brandSolid(굵기 700)·neutralSolid·neutralWeak·critical* 등,
  브랜드색 계열엔 bold를 함께 겁니다.

### 입력 (TextInput) — "responsive" 크기가 브레이크포인트로 밀도 전환

| | large | medium | responsive |
|---|:--:|:--:|:--:|
| **min-height** | **52px** | 40px | <1280px: 52 → ≥1280px: 40 |
| 라운드 | 12px | 8px | 12 → 8px |
| 서체 | 16px | 14px | 16 → 14px |
| 좌우 패딩 | 16px | 14px | 동조 |

- **`size="responsive"`가 정식 크기 변형**입니다 — 1280px 하나를 경계로
  모바일=large / 데스크톱=medium으로 치수·라운드·서체가 함께 바뀝니다.
  밀도 전환을 토큰 두 벌(Cloudscape)이나 배율(Vapor)이 아니라
  **컴포넌트 크기 변형 안의 미디어쿼리**로 푼 표본 유일 방식.
- 윤곽: 인셋 box-shadow 1px + **`::after` 가상요소 2px 보더**를 겹쳐 두고
  focus에서 색만 켭니다 — 두께 변화로 인한 레이아웃 밀림이 없습니다.
  변형은 outline / underline 2종.

### 다이얼로그 — 272px 모바일 알럿 + 축소 진입

- 콘텐츠 **max-width 272px**, 좌우 마진 32px, 라운드 20px(r5) — 표본 최소
  폭입니다 (Backpack 512, Vapor 500px과 자릿수가 다른 물건 — iOS
  UIAlertController 270pt와 사실상 같은 값).
- **진입이 scale 1.3→1**입니다 — 커진 상태에서 줄며 들어오는 **축소 진입**
  (enter-expressive, 200ms). 확대 진입(0.8~0.9→1) 일색인 표본에서 유일한
  역방향입니다. 퇴장·배경은 100ms.
- 제목 20px·700, 본문 16px·400. 바텀시트는 상단만 24px(r6) 라운드 +
  28px 핸들 + `--seed-safe-area-bottom` 패딩 — 모바일 웹뷰 전제가 CSS에
  드러납니다.

### 특징적 결정 (심화분)

- **모든 타이포 토큰이 clamp() + OS 배율 변수** — 접근성 스케일링의 토큰화
- **눌림 = 크기별 차등 scale 축소** (0.95~0.98) + reduced-motion 토큰 처리
- **`size="responsive"`** — 브레이크포인트 1개(1280px)로 밀도 전환하는 크기 변형
- **다이얼로그 272px · scale 1.3 축소 진입** — iOS 관습의 웹 이식
- **v1→v2에서 토큰 축이 2개→전 축으로** — "컬러·타이포만" 판정은 세대 한정

## 특징적 결정

- **타이포 스케일이 1px 단위입니다.** 10~16px 구간에 7단계가 있습니다.
  표본에서 가장 촘촘하며, 한글 본문 크기 조정 폭이 좁은 것과 관련될 수 있으나
  소스에 근거는 없습니다.
- **자간을 좁히는 방향으로만 둡니다.** `narrow` 3단계, `wide` 없음.
- **알파 색상을 별도 계열로 둡니다.** `gray`와 `gray-alpha-*`가 나란히 있습니다.
- **토큰을 scale / static / semantic 3계층으로 나눕니다.**
  원시-시맨틱 2계층이 흔한 가운데 `static`이 추가된 형태입니다.
- **JS가 CSS 변수 참조 래퍼입니다.** 값의 단일 출처가 CSS입니다.
- **패키지가 용도별로 쪼개져 있습니다** — `design-token` · `stylesheet` · `css` · `react`.
- **컬러와 타이포만 토큰화했습니다.** 스페이싱·라운드가 없습니다.
  모바일 OS(Apple·Material)를 제외하면 표본에서 유일합니다.
  (**v1 한정** — v2 `@seed-design/css`에서 전 축 토큰화로 전환, 심화 절 참조)

## 접근성

~~미확인.~~ → **해소 (2026-08-18, 헤드리스 렌더).**

Seed는 코퍼스에서 **WCAG를 한 번도 언급하지 않는 유일한 사례**입니다.
`/foundations/inclusive-design` 문서 전체에 "WCAG" 문자열이 없고,
대비 기준을 **APCA(Advanced Perceptual Contrast Algorithm)** 의 **Lc 값**으로 씁니다.

### 대비 — 비율(4.5:1)이 아니라 Lc

| 대상 | 기준 |
|------|------|
| 가독성 텍스트 (2줄 이상 본문 · 화면 제목 · 헤드라인 · 입력 필드 · 툴팁) | **최소 Lc 75**, 권장 **Lc 90** |
| 그 외 텍스트 | **최소 Lc 60** (16px 미만이면 bold 사용) |
| placeholder · disabled 텍스트 | **최소 Lc 30** |

WCAG의 `4.5:1`·`3:1` 대신 APCA의 `Lc 75`·`Lc 60`·`Lc 30`을 쓰는 것은
**대비 모델 자체를 교체한** 선택입니다 — 코퍼스에서 이 사례가 유일합니다.

### 타깃 크기 · 상호작용

- 터치 영역 **44×44px 이상이 이상적**, 제약이 있으면 **최소 24×24px 보장**
  (WCAG 2.2의 24×24 최소 기준과 수치는 같지만 WCAG를 근거로 인용하지 않습니다)
- 복잡한 제스처(핀치 줌·드래그)에 **단순 터치 대체 수단 제공** 의무
- 모든 상호작용은 **VoiceOver · TalkBack** 접근 가능해야 함
- 오류는 시각 피드백 + **`aria-live`** 로 보조기술에 알림
- 초당 **3회 이상 점멸 금지**, 3초 이상 자동재생 오디오는 정지·음량 제어 제공

### 근거 문서 (WCAG 아님)

문서 하단 "Related Documents"가 인용하는 것은
**ARIA Authoring Practices Guide (APG)** · **Apple HIG (Accessibility)** ·
**Android Accessibility Best Practices** · **APCA Readability Criterion** 넷뿐입니다.
**표준 준수 선언이 아니라 플랫폼 가이드 + APCA 조합으로 기준을 구성**했습니다.

출처: https://seed-design.io/foundations/inclusive-design (렌더 확인, 2026-08-18)

## 참고

- 문서: https://seed-design.io (**2026-08-18 헤드리스 렌더로 접근 확인** —
  이전 기록의 "이 환경에서 접근 차단"은 curl 기준이었고, 브라우저 렌더는 정상 동작합니다)
- 패키지: `@seed-design/design-token` · `@seed-design/stylesheet` ·
  `@seed-design/css` · `@seed-design/react`
- **존재하지 않는 패키지명:** `@daangn/seed-design` · `@seed-design/token` ·
  `@seed-design/token-web` · `@daangn/seed-design-token`
- 저장소 구조: `packages/{design-token,stylesheet,react-theming,icon,machines}`
  — 값의 단일 출처는 `packages/stylesheet/global.css`입니다 (**v1 기준** —
  v2는 `@seed-design/css`의 `base.css`가 값의 출처)
- 컴포넌트 심화: `@seed-design/css@2.5.0` → `base.css`(토큰) ·
  `recipes/{action-button,text-input,dialog,bottom-sheet}.css` +
  `@seed-design/react@2.3.0`의 의존 구조 확인 (2026-08-18)
- **Figma 킷 — 부재 확정 (2026-08-18, `figma_kit: false`)**:
  Seed는 Figma를 **디자인 배포 채널이 아니라 코드 생성 입력원**으로 씁니다.
  문서 사이트 어디에도 **UI 킷·라이브러리 파일 배포가 없고**,
  Figma 관련 문서는 전부 `AI & Tools` 아래의 도구 계열입니다 —
  `@seed-design/mcp` **Figma MCP 서버**(REST API + PAT 방식 / WebSocket + 플러그인 방식),
  Figma Community **코드젠 플러그인**
  (https://www.figma.com/community/plugin/1496384010980477154),
  `react/developer-tools/figma-integration/codegen`.
  PAT 권한 목록(`library_assets:read` · `team_library_content:read` 등)에서 보이듯
  **팀 라이브러리는 당근 내부 파일을 전제**하며 공개 배포되지 않습니다.
  → **공개 Figma 킷 없음 + Figma→코드 자동화만 공개** (C 분류).
  렌더 확인: https://seed-design.io/get-started ·
  https://seed-design.io/ai-integration/figma-mcp (2026-08-18)
- **남은 확인 사항:** 컬러 실값, ~~컴포넌트 목록~~ (2026-08-18 해소 —
  recipe 92개: accordion·action-button·app-bar·bottom-sheet·callout·chip
  ·dialog·fab·manner-temp(당근 도메인 고유)·pull-to-refresh·snackbar·
  wheel-picker 등), v2 시맨틱 컬러 체계(`--seed-color-bg-brand-solid` 등
  이름만 확인)
- **라이선스 해소 (2026-08-18):** `Apache-2.0` — 출처: github daangn/seed-design → `LICENSE` (npm `@seed-design/stylesheet@1.1.2` 메타와 일치)
