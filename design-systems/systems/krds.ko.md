---
name: KRDS (Korea Responsive Design System)
org: 대한민국 정부 (한국지능정보사회진흥원 NIA)
coverage: partial
url: https://www.krds.go.kr
repo: https://github.com/KRDS-uiux/krds-uiux
license: "ISC (npm krds-uiux package.json 선언, 2026-08-18 — 디자인 자산·문서의 라이선스는 별도 미확인)"
tech: [HTML, CSS]
figma_kit: true
tokens_format: [JSON, CSS]
a11y_target: 미확인 (고대비 모드 제공 — 아래 참조)
platform: web
domain: public
verified: 2026-08-18
source: "npm krds-uiux@1.1.0 → tokens/transformed_tokens.json (768개), figma_token.json. 메인테이너 uiux@nia.or.kr"
---
<!-- lang-links -->
> [English](krds.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

대한민국 디지털 정부 디자인시스템. **본문 17px**(Apple 이후 두 번째),
**여백 이름이 콘텐츠 관계**(`h1-h2` · `title-body`)이며, PC/모바일이 **토큰 모드**입니다.

**첫 한국 표본이자 공공 도메인 4번째입니다.** 메인테이너가 `uiux@nia.or.kr`
(한국지능정보사회진흥원)로 확인된 공식 패키지입니다.

## 토큰 — 768개, 6개 모드

| 그룹 | 토큰 수 | 성격 |
|------|:---:|------|
| `primitive` | 242 | 원시 (숫자 스케일 · 색 · 서체) |
| `mode-light` | **190** | 라이트 시맨틱 색 |
| **`mode-high-contrast`** | **190** | **고대비 — 라이트와 토큰 수 동일** |
| **`responsive-pc`** | 49 | PC 크기·여백 |
| **`responsive-mobile`** | 49 | 모바일 크기·여백 — PC와 동일 구조 |
| `semantic` | 48 | gap · padding · size-height · radius |

**뷰포트가 토큰 모드입니다.** Spectrum이 토큰마다 desktop/mobile 값을 `sets`로
두는 것과 같은 축이며 (`tokens/scales.md`), KRDS는 모드 그룹으로 분리합니다.

**고대비 모드가 라이트와 같은 190개입니다** — Atlassian의 `increased-contrast`가
일반 테마와 같은 466개인 것과 같은 구조입니다 (`patterns/color.md`).
구조가 같아 값 교체만으로 전환됩니다.

### 루트가 10px입니다 (`62.5%` 트릭)

CSS에서 `font-size: 62.5%`를 확인했습니다 — **`1rem` = 10px**입니다.
`primitive.number.*`가 `0.1rem` 단위이므로 아래 px 환산이 성립합니다.

**표본에서 10px 루트를 쓰는 시스템은 KRDS뿐입니다.** 다른 rem 기반 시스템의 값을
그대로 가져오면 1.6배 어긋납니다 — **rem 값을 시스템 간 복사하면 안 되는 실증 사례입니다.**

### 스페이싱 프리미티브 — 22단계

```
1 · 2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 · 56 · 64 · 72 · 80 · 96  (+ max 1000)
```

코어 `4/8/16/24` + `32` 전부 있습니다. 2~12px 구간이 2px 단위로 촘촘합니다.

시맨틱 `gap`은 12단계로 추립니다 — `2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80`.
**프리미티브 22단계에서 시맨틱 12단계로 좁히는 2층 구조**입니다.

### 여백 이름이 콘텐츠 관계입니다 — 표본에서 유일합니다

`gap-layout` 그룹이 **어떤 요소 쌍 사이인지**로 명명됩니다.

| 토큰 | PC | 모바일 |
|------|:---:|:---:|
| `h1-h2` | 48 | 32 |
| `h2-h2` | 64 | 40 |
| `h2-h3` | 40 | 24 |
| `h3-h3` | 56 | 32 |
| `h4-h5` | 16 | 12 |
| `title-body-small` | 16 | 8 |
| `title-body-large` | 24 | 20 |
| `text-text-small` | 12 | 10 |
| `image-text-large` | 32 | 24 |
| `breadcrumb-h1` | 40 | 32 |
| `contents-footer` | 64 | 40 |

**"h2와 h3 사이는 40px"이 토큰입니다.** 표본의 다른 시스템은 여백 크기를 주고
어디 쓸지는 사용자가 정합니다 — KRDS는 **배치 규칙 자체를 토큰화**했습니다.
`patterns/`에서 "판단 지침은 문서 사이트에만 있다"고 반복해 적었는데,
**KRDS는 판단의 일부를 토큰에 넣은 첫 사례입니다.**

**같은 레벨 반복(`h2-h2`)이 레벨 전환(`h2-h3`)보다 넓습니다** — 64 vs 40.
새 섹션 시작이 하위 항목 진입보다 크게 벌어집니다. 이 규칙이 h3·h4·h5에서도 유지됩니다.

### 타이포그래피 — 본문 17px, 홀수 스케일

| 계열 | PC | 모바일 |
|------|-----|-----|
| Display | 60 · 44 · 36 | **44 · 32 · 28** |
| Heading | 40 · 32 · 24 · 19 · 17 · 15 | 24~ (large 24) |
| **Body** | **19 · 17 · 15 · 13** | **동일** |
| Label | 19 · 17 · 15 · 13 | 동일 |

- **`body.medium`이 17px입니다.** 표본에서 17을 본문 기본으로 쓰는 것은
  **Apple iOS(17pt)에 이어 두 번째이고, 웹 시스템으로는 처음**입니다.
  `patterns/typography.md`의 "17은 Apple만" 결론이 수정됩니다
- **본문 스케일이 전부 홀수입니다** — 13 · 15 · 17 · 19.
  짝수 그리드(12/14/16/18)를 쓰는 표본 다수와 정확히 한 칸 어긋납니다
- **Display·Heading만 모바일에서 줄고 Body·Label은 동일합니다** —
  Pajamas가 h1~h3만 유동으로 두는 것과 같은 판단입니다 (`patterns/typography.md`)

서체는 **Pretendard GOV** 단일입니다 — Pretendard의 정부 파생판입니다.
자간 토큰은 `0`과 `0.1rem`(1px) 둘뿐입니다.

### 라운드 — 이름에 번호가 붙습니다

```
xsmall1·2·3 = 2px   small1·2·3 = 4px   medium1·2 = 6px
medium3·4 = 8px     large1·2 = 10px    xlarge1·2 = 12px    max = 1000px
```

**같은 값에 번호 변형이 여러 개입니다** — `xsmall1`~`3`이 전부 2px.
Atlassian이 `selected`/`focused`를 같은 값의 별도 토큰으로 두는 것과 같은 패턴로,
나중에 갈라질 자리를 미리 나눠 둔 형태입니다.

**10px 라운드가 있습니다** (`large`) — 표본에서 드문 값입니다 (Spectrum 외).

## 컴포넌트

`html/` 디렉터리에 HTML 컴포넌트로 배포됩니다 (`React` 아님).
~~목록·치수는 확인하지 않았습니다.~~ → 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

같은 `krds-uiux@1.1.0` 패키지에 **컴포넌트 마크업·CSS가 있음을 확인**했습니다
(tokens만 수집된 상태였음): `resources/scss/component/` SCSS 42파일 +
`html/code/` 마크업 샘플 **74개** (button·input·modal 외 masthead·identifier·
skip_link·critical_alerts 같은 정부 사이트 골격 포함). 값은 SCSS의 시맨틱 토큰
참조를 `krds_tokens.css`(루트 10px)로 끝까지 해석했습니다.

### 버튼 — 5단 8px 사다리, 기본이 large

| | xsmall | small | medium | **large(기본)** | xlarge |
|---|:--:|:--:|:--:|:--:|:--:|
| **height** | **32px** | 40px | 48px | **56px** | 64px |
| 좌우 패딩 | 10px | 12px | 16px | 20px | 24px |
| 라운드 | 4px | 6px | 6px | **8px** | 8px |
| 서체 | 15px | 15px | 17px | 19px | 19px |

- **크기 클래스가 없으면 large(56px)입니다** — 다수 시스템의 medium 기본과 갈리는,
  기본값을 큰 쪽에 둔 선택입니다 (아래 입력·모달도 동일).
- **높이가 `size-height` 토큰 직결 고정 + 세로 패딩 0** — 파생 높이 진영과 대극.
- **라운드가 크기를 따라 4→6→8px로 커집니다** — 번호 변형 라운드
  (`medium1·2` 6px / `medium3·4` 8px)의 소비처가 이것이었습니다. Backpack이
  입력 large에서만 라운드를 키우는 것을 KRDS는 5단 전체에 적용합니다.
- 폰트는 5단에 3값만 (15·15·17·19·19) — label 스케일(홀수) 소비.

### 입력 — xlarge가 80px입니다

| | small | medium | **large(기본)** | xlarge |
|---|:--:|:--:|:--:|:--:|
| **height** | 40px | 48px | **56px** | **80px** |
| 라운드 | 6px | 6px | 8px | 10px |

- **xlarge 입력이 80px + heading-medium 서체 + 볼드**입니다 — 메인 검색창을
  입력의 크기 변형으로 흡수한 형태 (표본에서 검색창 전용 크기는 KRDS뿐).
- 보더 1px → **포커스에서 border-width가 2px로 굵어집니다.** outline도
  box-shadow도 없습니다 — 포커스를 보더 두께 변화만으로 표시하는 표본 유일
  형태입니다 (NYSDS는 반대로 두께를 안 바꾸려 outline을 덧그림).
- 좌우 패딩 16px 공통, 상태색은 `--krds-input--*` 중간 변수층 경유.

### 모달 — 3단 폭, 기본 760px

| 항목 | 값 |
|------|-----|
| 폭 | sm **400** / md **560** / lg **760px** (기본 lg) |
| 라운드 · 패딩 | **12px** (`xlarge1`) · **40px** |
| 헤더 상단 패딩 | **56px** |
| min-height | 264px |
| 전환 | visibility/opacity **0.2s**만 (keyframe 없음) |
| 모바일 | `calc(100% − 32px)` 폭 전환 |

- 기본이 최대 폭(760px)인 것도 버튼·입력과 같은 패턴 — **KRDS는 기본값을
  전부 큰 쪽에 둡니다.**
- 푸터 버튼 min-width 78px.

### 특징적 결정 — 전역 트랜지션 1개

리셋 CSS가 폼 요소에 `transition: var(--krds-transition-base)` = **`.4s ease-in-out`**
하나를 전역 적용합니다. 이징 분화가 없는 단일 곡선이라는 점이 Audi UI(전역 이징
1개)와 같은 극단이고, 값이 keyword 리터럴(`ease-in-out`)이라는 점은 Backpack
본류와 같습니다.

### 특징적 결정 (심화분)

- **기본 크기가 전부 large** — 버튼 56 · 입력 56 · 모달 760px
- **높이 5단 8px 사다리(32~64) 고정 + 세로 패딩 0**
- **라운드가 크기 연동** (4→6→8→10) — 번호 변형 라운드의 실사용처
- **포커스 = 보더 두께 변화** (1→2px, 링 없음)
- **입력 xlarge 80px** — 검색창의 크기 변형 흡수
- **전역 트랜지션 `.4s ease-in-out` 단일**

## 특징적 결정

- **본문 17px** — Apple 이후 두 번째, 웹 첫 사례. 본문 스케일 전체가 홀수(13/15/17/19)
- **여백 이름이 콘텐츠 관계입니다** (`h1-h2` · `title-body` · `image-text`).
  배치 판단을 토큰화한 표본 유일 사례
- **PC/모바일이 토큰 모드입니다** — 같은 49개 구조 두 벌. Body는 안 줄고 Display만 줍니다
- **고대비 모드가 라이트와 동수(190)입니다**
- **루트 10px(62.5%)** — 표본 유일. rem 값 이식 불가의 실증
- **공공 4표본째이며 GOV.UK와 또 갈립니다** — 4px 계열 프리미티브입니다.
  공공 4개의 베이스: GOV.UK 5px / Codex 4px 배수 / USWDS 8px / **KRDS 4px 계열** —
  **5px는 끝까지 GOV.UK 단독입니다**
- **같은 값에 번호 변형 라운드** (`xsmall1·2·3`) — 분화 자리 예약
- 서체가 **Pretendard GOV** 단일 — CJK 시스템의 첫 서체 확인

## 접근성

- **고대비 모드 190개** — 일반 모드와 동일 구조
- 패키지 설명이 반응형·접근성을 명시합니다 ("반응형, 접근성을 갖춘 UI/UX")
- WCAG/KWCAG 목표 수치는 토큰·패키지에서 미확인 (문서 사이트 미접근)

## 참고

- 문서: https://www.krds.go.kr (프록시 차단)
- 저장소: https://github.com/KRDS-uiux/krds-uiux
- 토큰: `npm pack krds-uiux@1.1.0` → `tokens/transformed_tokens.json` ·
  `tokens/figma_token.json` (Figma 토큰 별도 배포)
- CSS: `resources/css/token/krds_tokens.css`
- 컴포넌트 심화: 같은 패키지 `resources/scss/component/*.scss` +
  `html/code/*.html` 74종 (2026-08-18)
- **남은 확인 사항:** 컬러 팔레트 구조(190개 상세), ~~`size-height` 시맨틱~~
  ~~컴포넌트 목록~~ (2026-08-18 해소 — 심화 절: size-height 1~11 = 8~80px,
  SCSS 42파일·마크업 74종), KWCAG 목표, 라이선스(`package.json`은 ISC 표기이나
  보일러플레이트 가능성 — 저장소·문서 확인 필요)
