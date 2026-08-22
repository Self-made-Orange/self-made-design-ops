---
name: Cedar
org: REI
coverage: partial
url: https://cedar.rei.com
repo: https://github.com/rei/rei-cedar
license: code: MIT, tokens: ISC
tech: [Vue]
figma_kit: true
tokens_format: [SCSS, CSS, JS, JSON, iOS, Android, Figma]
a11y_target: "WCAG 2.2 AA (명시 — 2026-08-18 확인)"
platform: web
domain: commerce
verified: 2026-08-18
source: "npm @rei/cdr-tokens@14.0.2 → dist/{rei-dot-com,docsite}/scss/foundations/*.scss · npm @rei/cedar@17.1.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](cedar.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

REI(아웃도어 리테일)의 시스템. 스페이싱을 **기준 단위 `x`의 분수·배수 이름**으로 부르고,
**inset에 `squish`/`stretch` 변형**을 두며, **사이트별 토큰 빌드 두 벌**을 배포합니다.

## 토큰

### 스페이싱 — `x`의 분수·배수 명명

```scss
$cdr-space-eighth-x:         0.2rem;
$cdr-space-half-x:           0.8rem;
$cdr-space-one-x:            1.6rem;   // 기준 단위
$cdr-space-one-and-a-half-x: 2.4rem;
$cdr-space-two-x:            3.2rem;
$cdr-space-three-x:          4.8rem;
$cdr-space-four-x:           6.4rem;
```

**이름이 산문입니다** — `one-and-a-half-x`. 표본에서 배수를 영어 서수로 완전 표기하는
유일한 사례입니다 (Polaris `space-150`, USWDS `"105"`가 같은 1.5배를 숫자로 접는 자리).

값이 `1.6rem` 계열이라 **10px 루트 관행이면 2/8/16/24/32/48/64px**입니다 —
~~루트 선언은 토큰 패키지에 없어 **px 환산은 미확정**입니다. KRDS처럼 62.5% 루트를
쓰는 두 번째 시스템일 가능성이 있으나 소스로 확인하지 못했습니다.~~
→ **해소 (2026-08-18):** 컴포넌트 패키지 `@rei/cedar@17.1.0`의 `cdr-reset.css`가
`html{font-size:10px}`를 선언합니다 — 62.5%가 아니라 **10px 리터럴**입니다.
px 환산 확정: one-x = 16px.

### inset — `squish` / `stretch` 변형

```scss
$cdr-space-inset-eighth-x:         0.2rem;           // 사방 균등
$cdr-space-inset-eighth-x-squish:  0 0.2rem;         // 세로 0
$cdr-space-inset-eighth-x-stretch: 0.4rem 0.2rem;    // 세로 2배
```

**패딩 조합을 3형으로 토큰화합니다** — 균등 / squish(세로 축소) / stretch(세로 확대).
각 형마다 `-top-bottom` / `-left-right` 분해 토큰까지 있습니다.

Cloudscape가 컴포넌트별 가로·세로 토큰(`space-button-horizontal/vertical`)으로
풀던 문제를 Cedar는 **범용 인셋 문법**으로 풉니다 — 표본 유일입니다.

### 그림자 — `prominence`, 부품 분해

```scss
$cdr-prominence-elevated: 0 0.4rem 0.4rem 0 rgba(46,46,43,0.2);
$cdr-prominence-elevated-x / -y / -blur / -spread / -color   // 부품별 토큰
```

이름이 `flat` / `raised` / `elevated` / `floating` 계열이고,
**완성 값과 x·y·blur·spread·color 부품 토큰을 동시 배포합니다.**
Material 3이 조합·개별 타이포 토큰을 병행하는 것과 같은 구조를 그림자에 적용했습니다.
그림자 색이 전 단계 동일(`rgba(46,46,43,0.2)`) — **회갈색**(순검정 아님)입니다.

### 배포 — 사이트 두 벌 × 플랫폼 8종

```
dist/rei-dot-com/   dist/docsite/     ← 사이트별 빌드
  css scss js json ios android figma types
```

**`rei-dot-com`(프로덕션)과 `docsite`(문서 사이트)가 각각 전체 빌드를 갖습니다.**
컴포넌트별 토큰 JSON(`cdr-tab.json` 등)도 양쪽에 있으며 목록이 동일합니다.
표본에서 소비 사이트 단위로 토큰을 나눠 빌드하는 것은 Cedar뿐입니다.

**iOS·Android·Figma 빌드 동시 배포** — Paste·Material 3·Thumbprint 계열의
크로스 플랫폼 토큰이며 Figma 빌드까지 넣은 것은 Atlassian(figma/*.json)과 Cedar입니다.

## 컴포넌트

컴포넌트별 토큰 JSON으로 존재 확인: tab · link · toggle-button · message · table 외.
~~치수 미확인.~~ → 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`@rei/cedar@17.1.0`(Vue 컴포넌트 패키지)의 `dist/style/cdr-{button,input,modal}.css`
실측. px 환산은 같은 패키지 `cdr-reset.css`의 `html{font-size:10px}` 기준입니다.

### 버튼 (`cdr-button`)

| | small | medium (기본) | large |
|---|:--:|:--:|:--:|
| 패딩 | 6×12 | 8×16 | 12×24 |
| 서체 | 14/18 | 16/22 | 16/22 |
| **파생 높이** | **30px** | **38px** | **46px** |

- 높이 선언이 없고 **행간+패딩 파생 30/38/46px** — 등차 8인데 **8의 배수가 아닌**
  값들입니다. 아이콘 전용 버튼만 8+24+8 = **40px**로 정수 격자에 앉습니다.
  **min-width는 없습니다.**
- 라운드 4px(`$cdr-radius-softer`), 굵기 500, 자간 −0.08px.
- **보더가 `inset box-shadow 0.1rem`입니다** — `border:none`. Ring UI와 같은 수법
  (같은 날 심화에서 두 번째 관찰).
- **클래스명에 패키지 버전이 접미돼 있습니다** — `.cdr-button--large_17-1-0`.
  전 컴포넌트의 전 클래스가 버전 스탬프를 달아, **서로 다른 버전이 한 페이지에
  공존해도 CSS가 충돌하지 않습니다.**
- **size prop이 브레이크포인트 조합을 받습니다** — `small@xs` · `medium@md` 식.
  크기 3종 × 브레이크포인트 4종(@xs/@sm/@md/@lg)의 클래스가 전부
  프리컴파일돼 있습니다.
- 전환 0.2s `cubic-bezier(0.15, 0, 0.15, 0)` = `$cdr-timing-function-ease` +
  `$cdr-duration-2-x` — 지속시간 토큰도 `1-x`~`6-x`(100~600ms)로
  스페이싱과 같은 **x 명명**입니다. 이징은 2종뿐
  (`ease-out: cubic-bezier(0.32, 0.94, 0.60, 1)` 포함).

### 입력 (`cdr-input`)

| | 기본 | large |
|---|:--:|:--:|
| **height** | **40px 고정** | 48px |
| 패딩 | 8px | 좌 8px |
| 서체 | 16/22 · 500 | 18/32 |
| 라운드 | 4px | 4px |

- **버튼은 파생 38px, 입력은 고정 40px** — 기본 크기끼리 나란히 놓으면 2px
  어긋나는 두 층입니다 (Backpack의 36/48 공유 정합과 대비).
- 보더 역시 `inset box-shadow 0.1rem` — 버튼과 동일 수법.
- 배경이 `#f7f5f326` — **모래빛 틴트에 알파**를 건 값입니다 (흰색/투명 관행과 다름).
- 라벨은 별도 블록(`cdr-label-standalone`) — 14/18 · 400. 헬퍼 텍스트가 같은
  서체의 회색으로 위(라벨 아래 2px)와 아래(입력 아래 4px) 두 자리를 갖습니다.

### 모달 (`cdr-modal`)

| 항목 | 값 |
|------|-----|
| 폭 | **max-width 640px 단일** (모바일 전체화면) |
| 라운드 | 4px |
| 그림자 | `0 16px 16px rgba(46,46,43,0.2)` — 회갈 |
| 오버레이 | **`#f7f5f3d9` 라이트 스크림 + backdrop blur 16px** |
| 애니메이션 | 페이드 **2단 시퀀스** — 오버레이 0.15s → 콘텐츠 0.15s(+0.15s 지연) |

- **스크림이 검정이 아니라 밝은 모래색**(#F7F5F3, 알파 85%)이고 `backdrop-filter:
  blur(1.6rem)`를 겹칩니다 — 이번 심화 표본(Backpack `rgba(0,0,0,.7)` ·
  Ring UI 검정 0.4/0.7 · F36 남색 0.75)과 반대 방향의 라이트 스크림입니다.
- **진입이 스태거드**입니다 — 오버레이가 먼저 뜨고 콘텐츠가 0.15s 뒤에 페이드인.
  닫을 때는 역순(콘텐츠 먼저), 0.3s 시점에 visibility/z-index 전환.
- 제목이 **Stuart 세리프** 24/30 — 본문 Graphik 산세리프와 서체 이원 구성.
- 내용 패딩 24px(모바일 16), 헤더 아래 여백 16px, z-index **9999** 하드코딩.

### 특징적 결정 (심화분)

- **클래스 버전 스탬프**(`_17-1-0`) — 버전 공존형 CSS 격리
- **size prop의 브레이크포인트 문법**(`small@md`) — 반응형 크기 변형 프리컴파일
- **라이트 스크림 + 블러** 모달 오버레이 — 검정 스크림 관행의 역방향
- 모달 페이드 **2단 스태거** (열기: 오버레이→콘텐츠, 닫기: 역순)
- 버튼 파생 30/38/46 vs 입력 고정 40/48 — 정합하지 않는 두 층
- `html{font-size:10px}` 리터럴 루트 — 토큰층 rem 환산의 전제가
  컴포넌트 패키지 reset에 있음

## 특징적 결정

- **배수 산문 명명** (`one-and-a-half-x`) — 표본 유일
- **inset squish/stretch 3형 문법** — 패딩 조합의 범용 토큰화, 표본 유일
- **그림자 부품 분해 배포** (x/y/blur/spread/color 개별)
- **사이트별 토큰 빌드 2벌** — 표본 유일
- 그림자 색이 회갈색 고정 — 브랜드 톤이 그림자에 들어간 사례
- `prominence`라는 이름 — `elevation`(다수)·`shadow`와 다른 세 번째 어휘

## 접근성

~~미확인.~~ → **WCAG 2.2 Level AA (2026-08-18 해소).**
출처: `cedar.rei.com/guidelines/accessibility` — "Web Content Accessibility
Guidelines (WCAG) 2.2 Level AA".

## 참고

- 토큰: `npm pack @rei/cdr-tokens@14.0.2` → `dist/rei-dot-com/scss/foundations/`
- 컴포넌트 심화: `npm pack @rei/cedar@17.1.0` → `dist/style/cdr-*.css` ·
  `dist/cdr-reset.css` (2026-08-18)
- 라이선스: `@rei/cedar` LICENSE·`license` 필드 모두 **MIT** — frontmatter 반영 (2026-08-18)
- **남은 확인 사항:** ~~루트 폰트 크기(px 환산 확정)~~ (2026-08-18 해소 —
  `cdr-reset.css`의 `html{font-size:10px}` 리터럴), 타이포·컬러 스케일,
  quarter-x 존재 여부, docsite 빌드와의 값 차이, ~~라이선스~~ (MIT)

> 재검증 (2026-08-17): 14.0.1 → 14.0.2 diff — 토큰 값 변경 없음 (italic·strong-weight 선언 위치 이동 + figma.json에 동일 토큰 추가만).
- **라이선스 해소 (2026-08-18):** `code: MIT, tokens: ISC` — 출처: github rei/rei-cedar → `LICENSE`(MIT) / github rei/rei-cedar-tokens → `LICENSE`(ISC). **컴포넌트와 토큰 저장소의 라이선스가 다릅니다**
