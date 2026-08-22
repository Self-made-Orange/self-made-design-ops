---
name: SGDS (Singapore Government Design System)
org: 싱가포르 정부 (GovTech)
coverage: partial
url: https://www.designsystem.tech.gov.sg
repo: https://github.com/govtechsg/sgds
license: MIT
tech: [Web Components, Sass]
figma_kit: 미확인
tokens_format: [Sass, CSS]
a11y_target: 미확인
platform: web
domain: public
verified: 2026-08-18
source: "npm @govtechsg/sgds@2.3.6 → sass/_variables.scss"
---
<!-- lang-links -->
> [English](sgds.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

싱가포르 정부 시스템. **Bootstrap 포크임이 토큰에서 확인되는** 첫 표본이며,
포크하면서 **Bootstrap에 없던 32px을 스페이서에 되살렸습니다.**

## 토큰

### 혈통 — Bootstrap 지문이 그대로입니다

```scss
$spacer: 1rem !default;
$border-radius-pill: 50rem !default;   // Bootstrap 고유값
$grid-breakpoints: (xs: 0, …);
$negative-spacers: if($enable-negative-margins, negativify-map($spacers), null);
```

`$spacer` 파생 · `$enable-*` 플래그 · `negativify-map` · **`50rem` 알약** —
전부 Bootstrap의 구조입니다 (`systems/bootstrap.md`).
**표본에서 다른 시스템의 포크임이 토큰 소스로 증명되는 유일한 사례입니다.**

### 스페이서 — 포크하며 고친 것

```scss
$spacers: (0, .25, .5, 1, 1.5, 2, 2.5, 3, 3.5) × $spacer
        = 0 · 4 · 8 · 16 · 24 · 32 · 40 · 48 · 56
```

| | Bootstrap | SGDS |
|---|-----|-----|
| 단계 | 6 | **9** |
| 32px | **없음** | **있음** |
| 상단 | 48 | 56 |

**원본이 건너뛴 32px(코어 값)을 포크가 복구했습니다.** 0.5 등차 곱수라
20px은 여전히 없습니다. 코어 `4/8/16/24/32` 전부 보유 — 공공 5표본째이며
베이스는 또 다릅니다 (16px `$spacer` 배수 — GOV.UK 5 / USWDS 8 / KRDS 4계열과 상이).

### 라운드 — 기본이 5px입니다

```scss
$border-radius:     .3125rem;   // 5px
$border-radius-sm:  .2rem;      // 3.2px
$border-radius-lg:  .3rem;      // 4.8px
$border-radius-xl:  1rem;       // 16
$border-radius-2xl: 2rem;       // 32
```

**기본 5px** — Bootstrap의 6px을 바꿨습니다. 홀수 라운드 진영(Helios·Spectrum·
Open Props·Semi) 합류이며, **`sm`(3.2px)·`lg`(4.8px)는 소수 px**입니다 —
표본에서 의도적 소수 px 라운드는 SGDS뿐입니다 (Polaris 0.66 보더와 같은 계열).

**`lg`(4.8px)가 기본(5px)보다 작습니다** — 이름 서열과 값 서열이 어긋난 유일 사례입니다.

### 타이포그래피

h1~h6: 40 · 32 · 24 · 18 · **16 · 16** — **h5와 h6가 같습니다** (Bootstrap은 20/16).
본문 16px 유지.

## 컴포넌트

~~Web Components (`sgds-*`). 목록 미확인.~~ 2026-08-18 정정: 이 패키지
(`@govtechsg/sgds` v2)는 **CSS/Sass 프레임워크**입니다. Web Components는
별도 패키지 `@govtechsg/sgds-web-component`(현행 3.26.0)로 이원화돼
있습니다 (미수집).

## 컴포넌트 심화 — (2026-08-18)

같은 `@govtechsg/sgds@2.3.6`에서 실측. 컴포넌트 SCSS가
`@import "~bootstrap/scss/buttons"` 한 줄 + 소수 덧댐 구조라 (**bootstrap
~5.2.0 의존**), **컴포넌트 치수는 전부 vendored `_variables.scss`의 변수 수정으로
결정됩니다** — 포크의 개입 지점이 CSS가 아니라 변수 층입니다.

### 버튼·입력 — 행간 2.0이 높이 사다리를 등차로 폅니다

핵심 수정 두 개: **`$line-height-base: 1.5 → 2`** ·
**`$input-btn-padding-y: 6px → 7px`** (좌우 12→16px). 높이가 파생이라
(Bootstrap 방식 그대로) 이 둘로 사다리 전체가 바뀝니다:

| 파생 높이 | sm | 기본 | lg |
|---|:--:|:--:|:--:|
| Bootstrap | 31px | 38px | 48px |
| **SGDS** | **38px (14×2+8+2)** | **48px (16×2+14+2)** | **58px (20×2+16+2)** |

- **불규칙한 31/38/48이 등차 10px의 38/48/58로 재정렬**됩니다. 기본이
  정확히 48px — Bootstrap의 lg가 SGDS의 기본이 된 모양새로, 한 단계씩
  위로 민 사다리입니다.
- **본문 행간 2.0은 표본 최대**입니다 (다수 1.4~1.6). 버튼·입력·본문이
  같은 변수를 쓰는 Bootstrap 구조라, 가독 행간 결정이 곧 컨트롤 높이 결정이
  됩니다 — 공유 변수 층의 부작용이자 지렛대.
- 라운드: 기본 5px · sm 3.2px · lg 4.8px (토큰 절의 소수 px 그대로 적용).
- **포커스 링 2px** (`$input-btn-focus-width: .25rem → .125rem`) — Bootstrap
  4px의 절반. 알파 0.25 링 방식은 유지.
- 버튼 굵기 400·전환 `.15s ease-in-out` 4속성 — Bootstrap 기본 유지.
  입력 보더 1px `$gray-400`, 높이도 버튼과 동일 48px (공유 변수).
- 체크박스 `1.125em` = **18px** (Bootstrap 1em=16px에서 확대).

### 모달 — 폭은 원본, 패딩·라운드만 수정

| | Bootstrap 5.2 | SGDS |
|---|:--:|:--:|
| 폭 단계 | 300/500/800/1140px | **동일** (수정 없음) |
| 내부 패딩 | 16px | **24px** (`$modal-inner-padding: 1.5rem`) |
| 라운드 | 8px (`$border-radius-lg: .5rem`) | **4.8px** (`.3rem` 재정의의 파급) |
| 푸터 | 보더 있음 | **보더 transparent + padding-top 0** |
| 진입 | `translate(0,-50px)` + `.3s ease-out` | 동일 |
| 스크림 | 검정 50% | 동일 |

- **모달 라운드 4.8px** — 직접 고른 값이 아니라 `$border-radius-lg`를
  4.8px로 바꾼 것이 모달 변수의 참조를 타고 흘러든 값입니다. 소수 px
  라운드가 컴포넌트까지 전파되는 경로가 보이는 자리.
- 덧댐은 `.sgds.modal` 스코프의 푸터 패딩 제거·닫기 버튼 크기 등 소품 수준.
  `centered-align-icon` 변형(아이콘 중앙 정렬 헤더)이 자체 추가분입니다.

### 특징적 결정 (심화분)

- **행간 2.0 전역** — 표본 최대, 컨트롤 높이까지 지배
- **높이 사다리 등차 10px 재정렬** (38/48/58) — 기본 48px
- **개입이 변수 층에만** — 컴포넌트 SCSS는 import 한 줄 (NASA WDS 설정
  한 장의 Bootstrap판, NHS의 "값 교체"보다도 얇은 층)
- 포커스 링 절반(2px) · 모달 라운드 4.8px 파급 · 체크박스 18px

## 특징적 결정

- **Bootstrap 포크 혈통이 토큰으로 증명됨** — 표본 유일
- **포크가 원본의 코어 구멍(32px)을 복구** — 파생 시스템이 원본 판단을 뒤집은 기록
- **기본 라운드 5px + 소수 px 단계(3.2/4.8)** — `lg` < 기본 역전 포함
- h5 = h6 = 16px
- 공공 5표본째, 베이스 5종 전부 상이 (5px/4px배수/8px/4px계열/16px배수)

## 접근성

미확인.

## 참고

- 토큰: `npm pack @govtechsg/sgds@2.3.6` → `sass/_variables.scss`
- 컴포넌트 심화: 같은 패키지 `sass/_{buttons,forms,modal}.scss` +
  `_variables.scss` (bootstrap ~5.2.0 의존, 2026-08-18)
- ~~라이선스~~ 패키지에 LICENSE 동봉 — **MIT** (싱가포르 국장·공공기관 표장
  제외 조항 부기, 2026-08-18 확인) · frontmatter 반영 (2026-08-18)
- **남은 확인 사항:** 컬러 · 컴포넌트 목록(웹 컴포넌트판
  `@govtechsg/sgds-web-component@3.26.0` 미수집) · Bootstrap 대비 변경 전량
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: npm `@govtechsg/sgds@2.3.6` → `package.json`. 저장소(GovTechSG/sgds) 루트에는 LICENSE 파일이 없습니다
