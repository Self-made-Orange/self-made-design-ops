---
name: Tegel
org: Scania
coverage: partial
url: https://tegel.scania.com
repo: https://github.com/scania-digital-design-system/tegel
license: MIT
tech: [Web Components, Stencil, React, Angular]
figma_kit: true
tokens_format: [CSS]
a11y_target: "WCAG 2.1 AA (명시 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-23
source: "npm @scania/tegel@1.62.0 → dist/collection/**/*.css"
---
<!-- lang-links -->
> [English](tegel.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Scania(상용차)의 시스템 — 스페이싱이 **`element`(2~48px)와 `layout`(8~160px)
두 계열로 완전 분리**되고, 컴포넌트마다 **`mode-variant` primary/secondary
축**이 있습니다. 라이트/다크와 **직교하는 두 번째 표면 축**입니다.

## 토큰

### 스페이싱 — element / layout 이원화

```
element: 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48        (10단계)
layout:  8 · 16 · 24 · 32 · 48 · 64 · 72 · 96 · 128 · 160    (10단계)
```

- **컴포넌트 내부 여백과 레이아웃 여백을 같은 수의 별도 계열로 둡니다** —
  겹치는 구간(8~48)에서도 이름이 다릅니다. Vanilla(`strip` 3단계) ·
  Pharos·Braid(`gutter` 별칭 1개)가 레이아웃 여백을 몇 개만 둔 것과 달리
  **대칭 10:10 분리는 Tegel뿐**입니다
- 이름이 px 실값 (`element-16`) — Primer식 값-이름
- 양쪽 다 코어값(4/8/16/24/32) 보유. element 최소 2px, layout 최대 160px

### `mode-variant` — 라이트/다크와 직교하는 축

```css
.tds-mode-variant-primary   tds-accordion { --tds-accordion-background: …primary-default }
.tds-mode-variant-secondary tds-accordion { --tds-accordion-background: …secondary-default }
```

**모든 컴포넌트가 `primary`/`secondary` 모드 변형을 갖습니다** —
다크 모드와 별개로, **같은 테마 안에서 표면 위계**를 고르는 축입니다
(카드 위에 얹힌 카드 같은 상황). 표본에서 라이트/다크에 직교하는
두 번째 표면 축을 전 컴포넌트에 두는 것은 Tegel뿐입니다.
TDS(Toss)의 `BackgroundLevel01/02` · Mantine의 `dark` 램프가 값으로
층을 나눈 자리를 **컴포넌트 API 축**으로 올린 형태입니다.

컬러 참조는 3층입니다 — `--tds-<컴포넌트>-<속성>` →
`--component-<컴포넌트>-<속성>-<변형>-<상태>` → `--color-<의미>`.
컴포넌트 전용 층을 별도로 두는 것은 Cloudscape의 컨텍스트와 다른 방식의
같은 문제 해결입니다.

### 접두어 충돌 주의

**`--tds-*`가 Toss TDS와 같은 접두어입니다** (Tegel Design System /
Toss Design System). 두 시스템의 토큰을 한 프로젝트에서 쓰면 충돌합니다 —
`GLOSSARY.md`에 기록했습니다.

## 컴포넌트 심화 — (2026-08-18)

`@scania/tegel@1.61.0`의 `dist/collection/components/{button,text-field,modal}/*.css`
+ `dist/tegel/tegel.css`(토큰 원본)를 실측했습니다. 가장 큰 발견:
**`mode-variant` 축 외에 `.scania` / `.traton` 브랜드 축이 한 파일에 병존**합니다
(`:root`가 Scania 기본, TRATON 상용차 그룹 브랜드가 클래스로 스위치).

### 토큰이 단위 없는 숫자, 단위는 사용처가 곱함

```css
--scania-unit-4: 4;            /* 단위 없음 */
border-radius: calc(var(--component-button-border-radius-default) * 1px);
background: color-mix(in srgb,
  var(--component-overlay-background-default)
  calc(var(--component-overlay-opacity-default) * 1%), transparent);
```

길이는 `× 1px`, 불투명도는 `× 1%` — **차원 부여를 사용처의 calc가 담당**합니다.
plain 숫자라 브랜드 테마가 어느 차원으로든 재해석할 수 있습니다.

### 버튼 — 기본이 56px, 브랜드에 따라 각 vs 필

| | xs | sm | md | lg (기본) |
|---|:--:|:--:|:--:|:--:|
| height | 24px | 40px | 48px | **56px** |
| 패딩 | 4/8px | 12px | 16px | 20px |
| 서체 | 12px | `detail-02` 14px/16px | 동일 | 동일 |

- **기본 크기가 lg(56px)입니다** — 표본 최대 기본 버튼. 산업 장비·차량
  환경(장갑 낀 손) 좌표로 읽힙니다.
- **라운드가 브랜드 축입니다** — `--component-button-border-radius-default`가
  Scania `4`(px), **TRATON `56`(=높이와 같은 풀 필)**. 같은 컴포넌트가
  브랜드 클래스 하나로 각진 버튼 ↔ 알약 버튼으로 갈립니다. 멀티브랜드
  병존(HSDS newBrand 등)이 **형태 차원까지 간 표본 유일 사례**입니다.
- 서체도 브랜드 축: Scania Sans Semi Condensed(자간 −0.14px) ↔
  TRATON Type Text(자간 0). 굵기는 둘 다 normal — 볼드 버튼이 아닙니다.
- 포커스 2중: `:focus` 1px, `:focus-visible` **2px 아웃라인 + 1px 섀도 링**
  (offset 1px) — 마우스/키보드를 굵기로 구분합니다.

### 입력 (`tds-text-field`) — 보더 4면이 각각 토큰

| | sm | md | lg (기본) |
|---|:--:|:--:|:--:|
| height | 40px | 48px | **56px** — 버튼과 동일 3단 |

- **어느 면에 보더가 있는지가 브랜드 토큰입니다** — width top/right/bottom/left,
  radius 4귀퉁이가 전부 개별 변수. Scania는 **하단 보더 1px만 + 하단 라운드 0**
  (언더라인·filled 필드), TRATON은 **4면 1px + 4귀퉁이 4px**(박스 필드).
  입력의 해부학 자체가 테마로 스위치되는 표본 유일 구조입니다.
- 라벨 inside/outside 2모드 (inside는 absolute 배치, 플로팅 아님).
- 전환: `border-color 200ms ease` 리터럴 — 모션 토큰(`--tds-motion-*`)이
  있는데 컴포넌트가 안 쓰는 지점도 있습니다 (버튼은
  `fast-02(150ms)+easing-scania` 토큰 사용 — 혼용 상태).

### 모달 — Carbon 브레이크포인트 + 뷰포트 % 폭

| 뷰포트 | xs | sm | md | lg |
|------|:--:|:--:|:--:|:--:|
| ≥672px | 50% | 62.5% | 75% | 100% |
| ≥1056px | 31.25% | 43.75% | 62.5% | 75% |
| ≥1584px | 25% | 37.5% | 50% | 75% |

- **폭이 px가 아니라 뷰포트 %**이고 값이 16분할 그리드 분수(25=4/16,
  31.25=5/16, 62.5=10/16…)입니다. 브레이크포인트가
  **320/672/1056/1312/1584 — Carbon(IBM)과 5값 전부 동일**합니다.
  그리드 체계를 Carbon에서 차용한 흔적입니다.
- max-height **85vh**, 라운드 4(×1px), 헤더 sticky, 액션 영역 패딩
  `24px 16px 16px` + gap 16px.
- 스크림이 위의 `color-mix` 식 — 색과 불투명도가 별도 토큰이라
  브랜드가 따로 조절합니다. CSS 진입 애니메이션은 없습니다.

### 모션 토큰 (신규 확보)

```
duration: instant 0 · fast 100/150 · moderate 200/300 · slow 400/500
easing:   scania (0.4,0,0,1) · enter (0.1,0.9,0.2,1) · exit (0.7,0,1,0.5)
          · easy (0.33,0,0.67,1) · linear
```

**이징에 브랜드 이름이 붙어 있습니다** (`--tds-motion-easing-scania`) —
표본에서 시그니처 곡선을 브랜드명으로 명명한 유일 사례입니다.
곡선 자체는 M3 emphasized 계열 (0.4,0,0,1)입니다.

### 특징적 결정 (심화분)

- **단위 없는 숫자 토큰 + 사용처 `calc(×1px/×1%)`** — 차원 분리
- **브랜드 축이 형태까지** — 버튼 라운드 4 vs 56(필), 입력 언더라인 vs 박스
- **기본 버튼·입력 56px** — 표본 최대 기본 밀도
- **모달 = Carbon 브레이크포인트 + 16분할 % 폭** — px 폭 진영과 대극
- **이징에 브랜드명**(`easing-scania`) · 포커스 1px/2px 2중

## 특징적 결정

- **element/layout 스페이싱 10:10 대칭 분리** — 표본 유일
- **전 컴포넌트 `mode-variant` 축** (라이트/다크와 직교) — 표본 유일
- 컬러 3층 참조(컴포넌트 전용 층 보유)
- `--tds-` 접두어가 Toss TDS와 충돌
- Web Components(Stencil) + React/Angular 래퍼 — Siemens iX와 같은 진영

## 접근성

~~미확인.~~ → **WCAG 2.1 Level AA (2026-08-18 해소).**
출처: `tegel.scania.com/accessibility` — "We follow the WCAG 2.1 Level AA standard".
유럽 접근성법(EAA) 적용 여부와 무관하게 최소 이 수준을 목표로 한다고 명시합니다.

## 참고

- **Figma 킷 (true) 근거:** 사내 전용 Figma UI Library — Scania 전 Figma 사용자에게 기본 배포, 외부 공개 없음, 2026-08-18 확인

- 토큰: `npm pack @scania/tegel@1.61.0` → `dist/collection/**/*.css`
- 컴포넌트 심화: 같은 패키지 `dist/collection/components/{button,text-field,modal}/` +
  `dist/tegel/tegel.css` (2026-08-18)
- **남은 확인 사항:** ~~다크 모드 방식~~ (2026-08-18 해소 — `.tds-mode-light`/
  `.tds-mode-dark` 클래스 오버라이드이며 `.scania`/`.traton` 브랜드 클래스와
  직교 조합), 타이포 스케일 전체(`detail-02` 14px/16px 등 부분 확보 — 심화 절),
  컬러 원시값(`--tds-grey-*` 램프 존재 확인, 전수 미기록),
  `mode-variant`의 설계 근거(~~문서 사이트 프록시 차단~~ → 2026-08-18 접근 성공)
- **Figma 킷 해소 (2026-08-18):** `figma_kit: true` — 출처
  <https://tegel.scania.com/faq-design/getting-started-design>.
  "**Scania의 모든 Figma 사용자는 기본적으로 Tegel UI Library에 접근할 수
  있다** — Figma 좌상단 `Assets` 탭에서 찾아 바로 쓰면 된다"고 명시합니다.
  라이브러리는 컴포넌트·스타일·아이콘이 **자주 갱신되며, 갱신은 요청 없이
  전 디자이너에게 자동 반영**됩니다. 사용 전제로 **Scania Sans 서체 최신본
  설치**를 요구합니다. 즉 공식 킷은 존재하되 **Scania 조직 계정 안에서만
  유통되고 외부에는 공개되지 않습니다** — Figma 관련 문서 서술도 그리드
  토글(`Menu › View › Layout Grids`, `Ctrl+G` / `Ctrl+Shift+4`) 같은
  사내 디자이너용 조작 안내입니다
- **문서 사이트 렌더 주의 (2026-08-18):** `tegel.scania.com`은 CloudFront
  앞단이 **헤드리스 Chrome 기본 UA를 403으로 차단**합니다(`Request
  blocked`). 일반 브라우저 UA를 붙이면 Next.js SSR HTML이 그대로 나와
  렌더링 없이 본문을 읽을 수 있습니다

## 드리프트 기록 — 1.61.0 → 1.62.0 (2026-08-23)

`dist/collection/` 아래 6개 파일이 다르고 **전부 tabs**입니다. 이 항목이 기록하지 않는
컴포넌트 층이라 **기록 값 변경 없음**. tabs를 수확할 때의 기준점으로 남깁니다:

- **`navigation-tabs` gap 16px → 24px** — 유일한 실제 값 이동
- `inline-tabs`는 `gap: 16px`을 빼고
  `border-bottom: 1px solid var(--tds-inline-tabs-horizontal-divider-background)`를 얻었습니다
- **컴포넌트 간 토큰 누수 수정** — `inline-tabs`·`navigation-tabs`가
  `--tds-folder-tabs-scroll-btn-*`를 읽고 있었고, 이제 각자 자기 접두사를 읽습니다.
  위의 "주의할 접두사 충돌" 절이 말하는 `tds-` 접두사 위험이 패키지 내부에서 실제로 드러난 사례입니다
- `top/bottom/left/right: 3px` → `inset: 3px` — 축약형, 값은 동일
