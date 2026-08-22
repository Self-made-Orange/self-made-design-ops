---
name: Strapi Design System
org: Strapi
coverage: partial
url: https://design-system.strapi.io
repo: https://github.com/strapi/design-system
license: MIT
tech: [React, styled-components]
figma_kit: false
tokens_format: [JS]
a11y_target: null
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @strapi/design-system@2.2.4 → dist (spaces·fontSizes·themes)"
---
<!-- lang-links -->
> [English](strapi.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

헤드리스 CMS Strapi의 관리자 UI 시스템 — 폰트 크기가 **10px-rem 환산 전제**
(`1.4rem`=14px)로 배포되고, 스페이싱이 **이름 없는 배열**(Evergreen 계열)입니다.

## 토큰

### 타이포 — 62.5% 트릭이 토큰 값에 내장

```js
fontSizes: ["1.1rem","1.2rem","1.4rem","1.6rem","1.8rem","2rem","2.8rem","3.2rem"]
```

**`html { font-size: 62.5% }`(1rem=10px) 전제의 값입니다** — 실제 크기는
11/12/14/16/18/20/28/32px. rem 값이 브라우저 기본(16px)으로 읽으면
17.6px 등으로 깨집니다. **루트 재정의 전제가 토큰 값에 박힌 표본 유일
사례**이며, Stacks(13분수 rem)와 함께 "rem 기준 불일치" 위험의 실증입니다.

### 스페이싱 — 이름 없는 배열 12단계

```js
spaces: ['0px','4px','8px','12px','16px','20px','24px','32px','40px','48px','56px','64px']
```

인덱스로 참조하는 배열 토큰 — **Evergreen과 같은 무명 배열 진영**입니다.
4px 등차 후 32부터 8px 등차, 코어값 전부 보유.

### 테마

`lightTheme` / `darkTheme` 오브젝트 쌍(테마 파일 분리 방식) +
`extendTheme` 확장 함수. 버튼 변형에 `success-light`/`danger-light` 같은
**변형×톤 조합 이름**, 크기는 `XS/S/M/L` 4단계입니다.

## 컴포넌트 심화 — (2026-08-18)

`@strapi/design-system@2.2.4`의 `dist/index.mjs` 번들(styled-components 템플릿
리터럴이 평문으로 남음)을 파싱했습니다. 컴포넌트 46개.
**아래 rem은 전부 10px 전제**입니다 (토큰 절의 62.5% 트릭이 컴포넌트 치수까지 관통).

### 버튼 — 높이가 브레이크포인트의 함수

`theme.sizes.button`이 값이 아니라 **반응형 맵**입니다:

| 크기 | 기본(모바일) | ≥768px |
|------|:--:|:--:|
| S | 4rem (40px) | 3.2rem (32px) |
| M | 4.4rem (44px) | 3.6rem (36px) |
| L | 4.8rem (48px) | 4rem (40px) |

- **모바일이 8px 더 크고 데스크톱에서 줄어듭니다** — 관리자 UI인데 터치 우선.
  컴포넌트 높이 토큰 자체가 미디어쿼리를 낳는 구조는 표본에서 처음 확인됩니다.
- 크기 4단 XS/S/M/L(기본 S), 라운드 4px 단일, 좌우 패딩 `spaces[4]`=16px,
  gap `spaces[2]`=8px.
- 변형 8종 = 변형×톤 조합: default(primary) · secondary · tertiary · ghost ·
  danger · success + **success-light · danger-light** (600 채움 ↔ 100 배경/700 글자).
  primary 채움색은 `buttonPrimary600`(#4945ff) — **팔레트의 `primary600`과 같은 값을
  버튼 전용 별칭으로 한 번 더** 배포합니다.
- 전환: 배경·글자 120ms easeOutQuad + 보더 200ms — 그리고 **전환 선언 전체가
  `@media (prefers-reduced-motion: no-preference)` 안에만** 있습니다.
  모션 축소를 기본값 쪽에 둔 가드 방식.

### 입력 (TextInput/Field) — 서체도 반응형

- 서체 1.6rem(16px) → ≥768px에서 1.4rem(14px), 행간 2.4rem→2.2rem —
  **모바일 16px은 iOS 포커스 줌 방지 관례**를 토큰화한 형태입니다.
- 파생 높이(행간+패딩+보더 1px×2): M **데스크톱 40px / 모바일 50px**,
  S 32px / 42px. 버튼과 같은 40/36/32 계열로 수렴합니다.
- 래퍼(`Field`)가 보더 1px `neutral200` 소유, 라운드 4px.
  포커스: 보더 `primary600`(#4945ff) + **동일색 `box-shadow 0 0 0 2px`**.
  에러는 두 속성 다 `danger600`.

### 모달 — 스크림이 표본 최저 농도

| | Modal | Dialog |
|---|:--:|:--:|
| max-width | **83rem (830px)** | 42rem (420px) |
| 라운드 | 4px | 4px |

- 진입 `modalPopIn` scale 0.8→1 **200ms `authenticMotion`**(=Material
  `(0.4,0,0.2,1)` — 이 이름으로 배포), 퇴장 **120ms easeOutQuad** — 비대칭
  진입/퇴장 (MUI 225/195ms와 같은 진영).
- **스크림이 `neutral800`(#32324d) 20%** — JS에서 헥스 문자열에 알파 바이트를
  이어붙여(`Math.floor(0.2×255).toString(16)`) 만듭니다. eBay 0.7 · Vuetify 0.32
  대비 표본에서 가장 옅은 축입니다.
- z-index가 시맨틱 7단 토큰: navigation 100 · overlay 300 · modal 310 ·
  dialog 320 · popover 500 · notification 700 · tooltip 1000.

### 이징 26종 — 카탈로그와 실사용의 괴리

Penner easing 전 계열(Sine~Back × In/Out/InOut)을 cubic-bezier로 배포하는데,
**InOut 7종(Sine·Quad·Cubic·Quart·Quint·Expo·Circ)의 값이 Out과 동일**합니다
(Back만 진짜 InOut 값) — 복붙 흔적이 dist에 그대로 남은 사례입니다.
실사용은 easeOutQuad와 authenticMotion 정도이고, 지속시간 토큰은
120/200/320ms 3개뿐입니다.

### 특징적 결정 (심화분)

- **버튼 높이·입력 서체가 브레이크포인트의 함수** — 컴포넌트 치수의 반응형 토큰화
- **스크림 `neutral800` 20%** — 표본 최저 농도 축
- 이징 26종 배포 + InOut 7종 값 중복 — 검증 안 된 카탈로그의 표본
- 전환을 reduced-motion 가드 안에서만 선언
- 62.5% rem 전제가 모달 폭(83rem)까지 관통 — 오독 시 1328px

## 특징적 결정

- **10px-rem(62.5%) 전제가 토큰 값에 내장** — 표본 유일, 이식 시 주의
- 이름 없는 배열 스페이싱 — Evergreen 계열 두 번째
- 라이트/다크 테마 오브젝트 쌍 + `extendTheme`
- 관리자(백오피스) 전용 도메인 — Strapi CMS의 어드민 UI

## 접근성

~~미확인~~ → **해소 (2026-08-18, 헤드리스 렌더 확인).**
**단, 목표 등급은 부재 확정입니다.**

출처: https://design-system.strapi.io/iframe.html?id=foundations-accessibility--docs&viewMode=docs
(Storybook 문서는 iframe 안에서 렌더되므로 `iframe.html?id=…&viewMode=docs`를
직접 열어야 본문이 읽힙니다.)

- **WCAG를 한 번도 언급하지 않습니다.** 렌더 결과에 `WCAG` 문자열 0회 —
  버전·등급·대비 수치가 전부 없습니다. **C 분류 확정**입니다.
- **달성이 아니라 지향으로 선언합니다** — 표본에서 드문 태도입니다.
  원문: "Its not completely true for now, but it's an objective we're
  aiming for." (`## An inclusive usability` 절)
  다른 시스템이 "우리는 AA를 지킨다"고 쓰는 자리에 Strapi는
  **"아직 아니다"**라고 씁니다.
- 대상 장애 범주만 열거합니다 — vision · hearing · cognitive · mobility.
- **실제 구현 지침은 대체 텍스트 한 줄뿐입니다** (`## Coding standards`):
  링크·드롭다운·CTA처럼 행동을 유발하거나 정보를 주는 자산에
  대체 텍스트를 붙인다.
- **접근성을 컴포넌트 사용으로 환원합니다** ("Using our components is a way
  to improve accessibility and consistency") — 규격 준수 대신
  **라이브러리 채택을 수단으로 제시**하는 구성입니다.
- 마지막 절이 오류 신고 요청입니다: "If we've made any mistakes in this
  style guide, please reach out by creating a GitHub issue."
- 참고로 패키지에는 접근성 전용 유틸리티가 있습니다 —
  Storybook 인덱스의 `utilities-accessible-icon--docs`(AccessibleIcon),
  `FocusTrap`, `VisuallyHidden`, `LiveRegions`.

### Figma 킷 부재 — 렌더 확인 (2026-08-18)

`figma_kit: false`의 근거입니다. Storybook 인덱스
(https://design-system.strapi.io/index.json, 항목 285개)에 Figma 관련 항목이
없고, Welcome 문서
(`iframe.html?id=getting-started-welcome--docs&viewMode=docs`) 렌더에도
`figma` 문자열이 0회입니다. 사이드바 최상위는 Getting Started ·
Foundations · Utilities · Primitives · Inputs · Components 6군이며
디자인 자산 항목이 없습니다.

## 참고

- 토큰: `npm pack @strapi/design-system@2.2.4`
- 컴포넌트 심화: 같은 패키지 `dist/index.mjs` 번들 파싱 (2026-08-18)
- **남은 확인 사항:** ~~컬러 팔레트~~(라이트 테마 실값 확인 — primary600 `#4945ff` ·
  danger600 `#d02b20` · neutral 0~1000 12단 + `buttonPrimary*` 별칭),
  ~~컴포넌트 목록~~(46개), ~~라인하이트 체계~~(무단위 배열
  `[1.14, 1.22, 1.25, 1.33, 1.43, 1.45, 1.5]` — 굵기는 400/500/600, semiBold=500),
  ~~Figma 킷~~(2026-08-18 렌더 — 부재 확정, 위 절), ~~접근성 목표~~(부재 확정, 위 절)
- 문서 사이트: https://design-system.strapi.io (Storybook — curl은 빈 셸,
  헤드리스 렌더로 해소. 본문은 `iframe.html?id=…&viewMode=docs` 경유)
