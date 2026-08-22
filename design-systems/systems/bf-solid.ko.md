---
name: Solid
org: BuzzFeed
coverage: partial
url: https://www.buzzfeed.com/static-assets/solid-docs/index.html
repo: https://github.com/buzzfeed/solid
license: ISC
tech: [SCSS]
figma_kit: 미확인
tokens_format: [SCSS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm bf-solid@2.11.2 → _lib/solid-helpers/_variables.scss"
---
<!-- lang-links -->
> [English](bf-solid.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

BuzzFeed의 CSS 유틸리티 시스템 — 스페이싱 번호가 **8px 기준**이라
`$space-1`이 4px이 아니라 **8px**이고, 그 아래를 **`05`**(=0.5)로 부릅니다.
z-index는 100 등차 4단계입니다.

## 토큰

```scss
$space-05: .25rem  //  4px  ← 이름이 "0.5"
$space-1:  .5rem   //  8px  ← 1이 8px
$space-2:  1rem    // 16px
$space-3:  1.5rem  // 24px
$space-4:  2rem    // 32px
$space-5:  3rem    // 48px
$space-6:  4.5rem  // 72px
$z1~$z4: 100 · 200 · 300 · 400
$border-radius: 3px
```

- **번호 1이 8px입니다** — 대부분의 순번 스케일에서 1은 4px(또는 2·1px)인데,
  Solid는 8px 격자를 1단위로 봅니다. 4px이 필요해지자 **`05`라는 소수 이름**을
  끼웠습니다 — PIE의 `a-small`과 같은 삽입 문제의 다른 해법입니다
- 상단이 48→72px로 1.5배 점프 (`$space-6`) — 4·8 격자에서 벗어난 유일 단계
- **z-index 100 등차 4단계** — z-index 토큰화 **여섯 번째** 시스템이고,
  산법도 여섯 번째입니다 (Chakra 100등차+용도명 / Bootstrap 1000대+5 /
  Open Props 서수 / Forma 36 10ⁿ / Vibes 불규칙 / **Solid 100등차 서수**)
- 라운드 3px — 홀수 라운드 진영
- 보더가 **`1px solid rgba(0,0,0,.2)` 전체 축약값**입니다 — 색·두께·스타일을
  한 토큰에 (Ring UI duration+easing, Siemens iX font와 같은 축약형 진영)

## 컴포넌트 심화 — (2026-08-18)

**"유틸리티라 컴포넌트가 없다"는 가정은 틀렸습니다** — `bf-solid@2.11.2`의
`_lib/solid-components/`에 7파일(messaging · button-groups · modals · tags ·
cards · pagination · popovers)이 있습니다. 단 **버튼과 폼은 컴포넌트가 아니라
`solid-utilities/`에** 있습니다 — 이 시스템의 분류에서 버튼은 유틸리티입니다.
그리고 버튼·폼의 **전 선언에 `!important`**가 붙어 있습니다 (유틸리티 우선권
관행을 컴포넌트급 규칙에도 적용).

### 버튼 (`.button` — solid-utilities/_buttons.scss)

| | 기본 | small |
|---|:--:|:--:|
| **파생 높이** | **42px** (행간 24 + 패딩 8×2 + 보더 2) | 32px (20+5×2+2) |
| 패딩 | .5rem / .875rem (8/14px) | 5/10px |
| 서체 | 16px (`$text-4`) | 14px (`$text-5`) |
| 라운드 | 3px | 3px |

- **상태색이 토큰이 아니라 Sass 함수입니다** — hover = `darken($fill, 20%)`,
  active = `darken($fill, 35%)`. 빌드 타임에 색을 유도하므로 hover 토큰이
  아예 없습니다. 행간도 `$line-height-form: 1.5rem` — 폼 전용 행간 토큰.
- secondary = 보더 반전형(투명 배경 + 1px 보더, hover에서 채움).
  변형: 기본(파랑 #0f65ef) · negative(빨강) · white · transparent.
- **소셜 버튼 11종이 시스템 변형입니다** — facebook · twitter · google ·
  linkedin · pinterest · tumblr · youtube · instagram · sms · rss ·
  apple-news. 브랜드 채움색 변수(`$fill-facebook` 등)까지 토큰층에 —
  미디어 회사 DNA가 변형 목록에 드러난 표본.
- disabled는 `$opacity-disabled: .3`. 전환 `background-color .1s ease`
  (hover 진입은 .15s — 진입/이탈 비대칭의 소형 사례).

### 폼 (solid-utilities/_forms.scss)

- `.text-input` · `.textarea` · `.select`가 같은 레시피: 서체 16px, 행간
  1.5rem, 패딩 .5rem/.75rem, 보더 1px `$fill-gray-light`, 라운드 3px —
  **버튼과 같은 파생 42px** (좌우 패딩만 12 vs 14px). small은 32px.
- select 화살표는 `svg-background()` 함수로 **인라인 SVG를 배경에** —
  Backpack(base64 배경)과 같은 계열의 Sass 함수판.
- radio/checkbox는 네이티브를 `visuallyhidden`으로 숨기고 `label:before`
  12px 박스로 재구성. radio 선택 = **`border: 4px solid` 파랑** (도넛 방식).

### 모달 (solid-components/_modals.scss)

- **스크림이 흰색입니다** — `rgba(255, 255, 255, .9)`. 어두운 스크림 관행의
  정반대로, 표본 유일입니다 (기사 위 라이트박스 문법 — 콘텐츠 사이트 도메인).
- 콘텐츠: 흰 배경 + `$border`(1px rgba(0,0,0,.2) — 토큰 절의 축약값 그대로) +
  라운드 3px + 패딩 `$space-4`(32px). **폭 제약이 없습니다**(margin 0 auto뿐).
- 진입: `scale3d(.6)` → 1, **150ms**, keyframes 50% 지점에서 불투명도 1 도달
  (형태보다 페이드가 먼저 끝나는 수제 2트랙). 표시 상태는 **body의
  `.js-show-modal` 클래스** — jQuery 시대의 상태 채널이 그대로.
- z-index `$z4`(=400) — 토큰 4단의 최상단을 모달에 배정.

### 특징적 결정 (심화분)

- **버튼이 components가 아니라 utilities로 분류** + 전 선언 `!important`
- **상태색 = `darken()` 산출** — 상태 토큰 부재를 함수로 대체
- **흰 스크림 0.9** — 표본 유일
- 소셜 브랜드 변형 11종 — 도메인이 변형 축이 된 사례
- 버튼·입력 파생 42px 공유 (Welcome UI의 42px과 우연 일치 — 산출 경로는 다름)

## 특징적 결정

- **순번 1 = 8px** + `05` 소수 이름 삽입 — 표본 유일 조합
- z-index 토큰 6번째, 산법 6번째 (100 등차 서수)
- 보더 전체 축약값 토큰
- CSS 유틸리티 배포(클래스) + `!default` 전면

## 접근성

미확인.

## 참고

- **URL 이전 (2026-08-18 확인):** `solid.buzzfeed.com` → buzzfeed.com 정적 자산 경로 (301)

- 토큰: `npm pack bf-solid@2.11.2` → `_lib/solid-helpers/_variables.scss`
- 컴포넌트 심화: 같은 패키지 `_lib/solid-utilities/{_buttons,_forms}.scss` ·
  `_lib/solid-components/_modals.scss` (2026-08-18)
- **남은 확인 사항:** 컬러 팔레트 전체, ~~타이포 스케일~~(부분 —
  `$text-4` 16px · `$text-5` 14px · `$line-height-form` 1.5rem 확인, 전 단계 미조사),
  유틸리티 클래스 목록(디렉터리 구조만 확인 — block-grid · borders · buttons ·
  colors · flexbox · forms · grid · layout · svg-icons · tables · typography),
  유지보수 상태(최신 버전 2.11.2)
