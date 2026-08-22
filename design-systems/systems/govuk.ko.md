---
name: GOV.UK Design System
org: UK Government (GDS)
coverage: full
url: https://design-system.service.gov.uk
repo: https://github.com/alphagov/govuk-frontend
license: MIT
tech: [Nunjucks, HTML/CSS]
figma_kit: true
tokens_format: [SCSS]
a11y_target: "WCAG 2.2 AA (접근성 성명 fully compliant 선언, 2026-08-18 확인)"
platform: web
domain: public
verified: 2026-08-16
source: "npm govuk-frontend@6.4.0 → dist/govuk/settings/_spacing.scss"
---
<!-- lang-links -->
> [English](govuk.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

영국 정부 서비스 전반을 위한 디자인시스템. 접근성과 저사양 환경 대응이 설계의 출발점입니다.

## 토큰

### 스페이싱 — 5px 베이스

**지금까지 수집한 시스템 중 유일하게 4/8 배수가 아닙니다.**

| 포인트 | 값 |
|--------|-----|
| 0 | 0 |
| 1 | 5px |
| 2 | 10px |
| 3 | 15px |
| 4 | 20px |
| 5 | 25px |
| 6 | 30px |
| 7 | 40px |
| 8 | 50px |
| 9 | 60px |

1~6은 5px 등간격, 7 이후로 10px 간격으로 넓어집니다.

출처: `govuk-frontend@6.4.0` → `dist/govuk/settings/_spacing.scss` (`$govuk-spacing-points`)

### 반응형 스페이싱

스케일과 별개로 **브레이크포인트별 값을 갖는 반응형 스페이싱 맵**을 제공합니다.
`govuk-responsive-margin` / `govuk-responsive-padding` 믹스인으로 접근하며,
모바일(`null` 브레이크포인트)·태블릿·데스크톱에 각각 다른 값을 지정할 수 있습니다.

소스 주석은 "가능한 한 이 맵을 쓰라"고 명시합니다. 즉 **고정 스페이싱보다 반응형 스페이싱이 기본**입니다.

### 타이포그래피 / 컬러 / 라운드

미확인.

## 컴포넌트

~~미확인~~ → **컴포넌트 SCSS 심화 (2026-08-17, govuk-frontend 6.4.0
`dist/govuk/components/` — 30여 컴포넌트 소스 전체가 npm에 있습니다).**

### 버튼 — 그림자가 물리 버튼입니다

```scss
box-shadow: 0 2px 0 shade-50;   // 하단 2px 진한 띠 (s0)
&:active { top: 2px; }          // 누르면 몸체가 그림자 위로 2px 내려앉음
```

- **높이 토큰이 없습니다** — 서체 19px/행간 19px + 패딩
  `spacing(2)−2px(보더)`로 높이가 파생됩니다. 하단 패딩은 그림자 몫
  (`shadow/2`)을 추가로 뺍니다 — **그림자를 시각 높이의 일부로 계산**하는
  주석이 소스에 있습니다.
- 누름 상태가 `translateY`가 아니라 `top: 2px` — **버튼이 제 그림자 위로
  주저앉는 물리 은유**. 코퍼스에서 shadcn `active:translate-y-px`(1px)의
  2배 이동이고 그림자 소멸이 결합됩니다.
- 라운드 **0** (직각 진영), hover/그림자 색이 배경색의 `shade-25`/`shade-50`
  함수 파생 — 변형(secondary·warning·inverse)마다 같은 산식.
- 포커스 = 노란 배경 + `box-shadow 0 2px 0 focus-text` — GDS 노랑 이중 링의
  버튼판.

### 폼 컨트롤 — 40px 대형 진영

| 컨트롤 | 값 |
|--------|-----|
| 입력·셀렉트 높이 | **40px** (`px-to-rem`), 패딩 5px, 보더 **2px** |
| 체크박스·라디오 | **시각 40px** + 터치 타겟 44px(40+거터 4) · small 24px |
| 체크 표시 | CSS 보더로 그림 (23×12px, `border-width: 0 0 5px 5px`) |
| 셀렉트 최소 폭 | `11.5em` (선정 이유 주석 포함) |
| 라디오 포커스 링 | **3px+1px = 4px** — "곡면 가장자리에서 기본 폭이 얇아 보인다"는 주석과 함께 곡률 보정 |

**체크박스 40px은 코퍼스 수렴값(16px)의 2.5배**입니다 — 저시력·운동 제약
사용자 전제의 정부 서비스 설계가 컨트롤 크기 자체를 키운 사례로,
"체크박스 16px 수렴"이 **소비자·엔터프라이즈 웹의 수렴**이지 보편이 아님을
보여줍니다 (`patterns/form.md` 교차).

## 특징적 결정

- **5px 베이스.** 4px·8px 그리드가 사실상 업계 표준인 상황에서 홀로 5를 씁니다.
  5·10·15·20은 8px 그리드와 어떤 지점에서도 맞지 않으므로, 다른 시스템의 컴포넌트를
  그대로 가져다 섞을 수 없습니다.
- **반응형 스페이싱이 1급 개념입니다.** 대부분의 시스템은 단일 값을 주고 브레이크포인트 대응은
  구현자에게 맡깁니다. GOV.UK는 스페이싱 자체에 브레이크포인트를 내장했습니다.
- **스케일 이름이 순번입니다.** `govuk-spacing(4)` 형태로, 값이 아니라 단계를 참조합니다.
  사용하는 쪽에서는 5px 베이스라는 것이 드러나지 않습니다.
- **상단이 60px에서 끝납니다.** 다른 시스템(96~160px)보다 낮습니다.

## 접근성

접근성이 이 시스템의 핵심 동기로 알려져 있으나, 구체적 준수 목표와 검증 방식은
문서 사이트에 있어 현재 확인 불가입니다.

## 참고

- 저장소: https://github.com/alphagov/govuk-frontend
- 패키지: `govuk-frontend`
