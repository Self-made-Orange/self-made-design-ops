---
name: Charcoal
org: pixiv
coverage: partial
url: https://charcoal-web.pixiv.design
repo: https://github.com/pixiv/charcoal
license: Apache-2.0
tech: [React, CSS]
figma_kit: 미확인
tokens_format: [JSON, CSS, TS]
a11y_target: "명시 없음 확인 (2026-08-18 — 스토리북 문서 70개 엔트리에 접근성 문서 부재, 렌더 페이지 WCAG 언급 0회)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @charcoal-ui/theme@6.0.1 → src/json/{base,pixiv-light,pixiv-dark}.json · npm @charcoal-ui/react@6.0.1 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](charcoal.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

pixiv의 시스템 — **단락 폭(paragraph-width)을 토큰화한 표본 유일 사례**이고,
**라운드가 스페이싱 토큰을 참조**하며, 굵기가 400/700 둘입니다 —
**CJK 2굵기 패턴이 정부를 넘어 소비자 서비스에서도 확인**됐습니다.

## 토큰 — base + 테마 2벌 (pixiv-light / pixiv-dark)

### 단락 폭 — 표본 유일

```
s: 320px   s-compact: 280px   s-cozy: 588px
m: 448px   m-compact: 392px   m-cozy: 616px
l: 672px   l-compact: 588px   l-cozy: 924px
```

**글줄 길이(measure)를 토큰으로 둔 시스템은 표본에서 Charcoal뿐입니다.**
3크기 × 밀도 3종(기본/compact/cozy) 9개. 본문 컨테이너 폭을 정할 때
표본 근거가 처음 생겼습니다 — 기본 m=448px, 최장 l-cozy=924px.

### 스페이싱 — 21단계, 이름이 불투명합니다

```
이름: 0  1 10 15 20 25 30 35 40 43 46 50 55 60 63 66  70  80  90 100 999
값px: 0  2  4  6  8 12 16 20 24 28 32 40 48 64 80 96 104 168 272 440 999999
```

- 4·8·16·24·32 코어값 전부 보유. 상단이 104→168→272→440으로 뜁니다
- **이름 숫자와 값의 관계가 산식이 아닙니다** (`43`=28px, `63`=80px) —
  숫자 이름 체계 중 유일하게 대응 규칙을 추정할 수 없는 사례
- **`999` = `999999px`** — 스페이싱 자리에 알약형 무한값이 있습니다

### 라운드가 스페이싱을 참조합니다

```
xs: {space.1}(2) · s: {space.10}(4) · m: {space.20}(8) · l: {space.25}(12)
xl: {space.30}(16) · xxl: {space.40}(24) · oval: 999999px
```

**라운드 토큰이 자체 값 없이 스페이싱 토큰의 별칭입니다** — 표본 유일.
"라운드와 여백이 같은 스케일에서 나온다"를 구조로 강제한 형태입니다.

### 타이포그래피 — 400/700, 본문 16px

- 크기 15단계: `11 12 14 16 18 20 22 25 28 32 36 40 45 50 60` (25 홀수 포함)
- **굵기 400/700 둘뿐** — KRDS·디지털청과 같은 구성. **CJK 표본 3/3이 됐고,
  정부 공통이 아니라 CJK 공통 후보로 승격**입니다 (pixiv는 소비자 서비스)
- 시맨틱: `body`=16px/행간24, `paragraph`=**같은 16px인데 행간 28** —
  크기가 아니라 **행간으로 본문/단락을 가르는** 구조. 단락 폭 토큰과 세트입니다
- 서체 `Sarasa UI J` — CJK 전용 오픈소스 서체를 시스템 서체로 지정

### 컬러 — 다크 램프에 음수 단계

```
light 램프: 5 10 20 … 90 (10단계)
dark 램프: -10 -5 0 5 10 … 90 (13단계)
```

**다크 램프에만 `-10`·`-5`·`0` 단계가 있습니다** — 배경보다 더 어두운
"음수 명도"를 이름에 그대로 노출한 표본 유일 사례입니다.
시맨틱 152개는 `{color.light/…}` ↔ `{color.dark/…}` 참조 교체로 전환합니다.

`brand-color`에 제품 5종(booth·comic·factory·pixiv·premium)이 병기됩니다 —
한 토큰 파일이 제품군 전체의 브랜드색을 듭니다.

## 컴포넌트 심화 — (2026-08-18)

`@charcoal-ui/react@6.0.1`의 `dist/index.css`(정적 CSS, `charcoal-*` 클래스)를
실측했습니다. 컴포넌트 20종. 색이 전부 `--charcoal-color-*` 변수 참조라
**컴포넌트 CSS에 색 리터럴이 없고**, 테마 JSON(light/dark) 교체가 곧 다크
전환입니다. `layered.css`로 **`@layer charcoal` 래핑판을 병행 배포**합니다.

### 버튼 (`.charcoal-button`) — 전부 알약

| | M (기본) | S |
|---|:--:|:--:|
| height | **40px** | 32px |
| 좌우 패딩 | 24px | 16px |
| 라운드 | **999999px** | 동일 |
| 서체 | **14px / 22px / bold** | 동일 |

- **라운드가 토큰 절의 `oval`(999999px) 그대로** — 전 버튼이 알약입니다.
  스페이싱 자리의 무한값이 컴포넌트 기본값으로 실증된 형태.
- 본문 16px 시스템인데 **버튼 라벨은 14px/22px** — 컴포넌트 라벨만 한 단
  내리는 CJK 표본이 하나 더 (→ i18n 축 교차).
- 상태색이 **default/hover/press 시맨틱 3연조** 변수(`container-primary-default/
  hover/press`)로만 조립됩니다. disabled는 색이 아니라 **opacity 0.32 일괄**.
- 변형 5종: Default(투명) · Primary · **Overlay**(on-img) · **Navigation**(hud) ·
  Danger(negative) — **화면 문맥(이미지 위·HUD 위)이 변형 이름**입니다.
  용도명(primary/secondary) 다수와 갈리는 명명.
- focus-visible: `0 0 0 4px rgba(0,150,250,.32)` 알파 링. `width: min-content` +
  inline-grid 기반.

### 입력 (`.charcoal-text-field`) — 보더 없는 면 채움 + iOS 스케일 핵

- 컨테이너: **높이 40px(버튼 M과 공유)**, 라운드 4px(버튼 알약과 대극),
  **보더 0 — 알파 배경(`container-secondary-default-a`)으로 면을 만듭니다.**
  focus-within = 파랑 4px 알파 링, invalid = `rgba(255,43,0,.32)` 빨강 링 —
  상태 표현이 전부 box-shadow 링.
- **iOS 확대 방지 스케일 핵** (소스 주석 명기): input을 16px로 렌더한 뒤
  `transform: scale(0.875)`로 14px 시각 크기를 만들고, width/height/font-size/
  radius를 전부 `calc(…/0.875)`로 역보정합니다 — iOS Safari가 16px 미만
  입력에서 자동 줌하는 것을 피하면서 14px 본문 밀도를 유지. **표본 유일
  수법**입니다 (→ i18n·모바일 축 교차: CJK 14px 진영이 iOS 16px 규칙과
  충돌하는 지점의 공학적 해소).
- 루트가 disabled면 **전체 opacity 0.32** — 버튼과 같은 일괄 정책.

### 모달 (`.charcoal-modal`) — easeOutQuart 슬라이드업

| S | M (기본) | L |
|:--:|:--:|:--:|
| 336px | **440px** | 648px |

- 라운드 **24px**, 헤더 고정 64px, 제목 16px/24px bold.
- 진입이 페이드가 아니라 **translateY(100%) → 0 슬라이드업, 400ms
  `cubic-bezier(0.25,1,0.5,1)`** — 소스 주석이 곡선명(easeOutQuart)과
  "duration은 JS 상수와 일치시킬 것"을 명기합니다. exiting 중에는
  `pointer-events: none`으로 클릭을 아래로 통과시키는 방어 주석까지.
- **모달 푸터 버튼이 세로 스택**(grid row, gap 8px) — 가로 배열 다수와 갈리는
  모바일 앱 문법. bottom-sheet 변형(`data-bottom-sheet`)이 기본 내장.
- 스크림은 `background-overlay` 변수, 배경 스크롤은 overflow 제어.

### 특징적 결정 (심화분)

- **버튼 알약(999999px) vs 입력 4px** — 원/각 대비를 컴포넌트 종류로 배정
- **iOS 확대 방지 `scale(0.875)` 역보정** — 표본 유일 (i18n·모바일 교차)
- **easeOutQuart 400ms 슬라이드업 + 세로 버튼 스택** — 모바일 문법의 데스크톱 관철
- **disabled = opacity 0.32 일괄** — 색 변형 없이 투명도 한 값
- 변형명이 화면 문맥(on-img · hud) — 용도명 다수와 대극

## 특징적 결정

- **단락 폭 토큰 9종** — 표본 유일. 본문 컨테이너 폭의 첫 데이터
- **라운드가 스페이싱의 별칭** — 표본 유일 구조
- **굵기 400/700** — CJK 3표본째, 첫 비정부 사례
- **다크 램프 음수 단계** (-10/-5) — 표본 유일
- 본문/단락을 크기가 아닌 행간(24 vs 28)으로 구분
- 스페이싱 이름-값 대응이 불투명한 유일 사례 + `999`=999999px
- 테마가 `pixiv-*` 접두 — 멀티 브랜드 테마 구조 (brand-color 5제품)

## 접근성

~~미확인.~~ → **부재 확정 (2026-08-18, 헤드리스 렌더).**

렌더링해도 이 시스템은 접근성 목표를 공개하지 않습니다. 문서 사이트
(**「Charcoal ドキュメント」**, 스토리북 한 벌)의 문서 엔트리 **70개**를
`index.json`으로 전수 확인했으나 접근성 문서가 없습니다. 구성은
README · `foundation/README` · `theme/*` · `styled/*` · `tailwind-config/*` ·
`tailwind-diff/*` · `icons/*` · `react/*`(컴포넌트) · 버전 노트(v4·v5·v6)뿐이고,
렌더한 페이지 전체에서 `WCAG` 문자열이 **0회**입니다.
출처: https://charcoal-web.pixiv.design/ ·
https://charcoal-web.pixiv.design/index.json (2026-08-18 헤드리스 렌더)

접근성 관련 산출물로는 **포커스 링을 토큰·컴포넌트로 노출**한 것이 있습니다 —
`react/FocusRing`와 `tailwind-config/FocusRing` 두 문서가 그것입니다.
**"목표 등급 없이 포커스 가시성만 시스템화한" 형태**로, 같은 CJK 소비자 서비스인
pixiv가 굵기 2단(400/700)을 쓰는 것과 함께 기록해 둡니다.

## 참고

- 토큰: `npm pack @charcoal-ui/theme@6.0.1` → `src/json/*.json`
- 컴포넌트 심화: `npm pack @charcoal-ui/react@6.0.1` → `dist/index.css` (2026-08-18)
- **문서 사이트 렌더 (2026-08-18):** SPA(스토리북)라 curl로는 빈 셸만 오지만
  헤드리스 렌더로 매니저 화면과 문서 목록은 읽힙니다. 다만 **MDX 문서 본문은
  iframe 안에서만 그려져 `--dump-dom`에 잡히지 않습니다** —
  `foundation-readme--docs`를 3회(iframe 직접 2회, 매니저 1회) 시도해 모두
  본문을 얻지 못했습니다. 따라서 위 부재 판정은 **문서 목록·렌더된 페이지 기준**
  이고, MDX 본문 안 언급 여부는 남습니다
- **Figma 킷:** `미확인` 유지. 문서 엔트리 70개에 Figma 관련 항목이 없고 렌더한
  페이지에서 "Figma" 언급도 0회지만, 위 MDX 본문 한계 때문에 **`false`로 확정하지
  않습니다** (2026-08-18, https://charcoal-web.pixiv.design/ 렌더 확인)
- **남은 확인 사항:** ~~접근성 목표~~ (2026-08-18 부재 확정),
  ~~컴포넌트(`@charcoal-ui/react`)~~ (2026-08-18 해소 — 심화 절),
  Figma 킷, pixiv 외 테마 존재 여부, 접근성 목표
