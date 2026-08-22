---
name: Pajamas
org: GitLab
coverage: partial
url: https://design.gitlab.com
repo: https://gitlab.com/gitlab-org/gitlab-ui
license: MIT
tech: [Vue, SCSS, Tailwind]
figma_kit: true
tokens_format: [JSON, CSS, SCSS, Tailwind]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @gitlab/ui@136.2.0 → src/tokens/build/json/tokens.json (136.1.0에서 재검증 갱신)"
---
<!-- lang-links -->
> [English](pajamas.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

GitLab의 DevOps 플랫폼용 디자인시스템.
**타이포그래피에 `clamp()` 유동 크기를 토큰으로 넣은 유일한 사례**입니다.

## 토큰

### 스페이싱 — 인덱스가 일정한 배수가 아닙니다

하단은 촘촘하고 상단은 성깁니다.

| 인덱스 | rem | px |
|:---:|:---:|:---:|
| `0` | 0 | 0 |
| `px` | — | **1** |
| `1` | 0.125 | 2 |
| `2` | 0.25 | 4 |
| `2-5` | 0.375 | **6** |
| `3` | 0.5 | 8 |
| `4` | 0.75 | 12 |
| `5` | 1 | 16 |
| `6` | 1.5 | 24 |
| `7` | 2 | 32 |
| `8` | 2.5 | 40 |
| `9` | 3 | 48 |
| `10` | 3.5 | 56 |
| `11` | 4 | 64 |
| `11-5` | 4.5 | **72** |
| `12` | 5 | 80 |
| `13` | 6 | 96 |

여기까지는 인덱스가 대략 순차적입니다. 이후로 **인덱스가 튑니다.**

```
15 → 120    18 → 144    20 → 160    26 → 208    28 → 224
30 → 240    31 → 248    33 → 264    34 → 272    37 → 296
48 → 384    62 → 496    75 → 600    80 → 640    88 → 704
```

**상단 값(496·600·704px)은 컨테이너 크기 범위입니다.** 여백인지 레이아웃 폭인지는 소스에 구분돼 있지 않습니다.
Codex(Wikimedia)가 여백과 폭을 하나의 `size` 스케일로 합친 것과 같은 구조이며,
**GitLab은 그 통합 스케일을 704px까지 가져갑니다.**

`2-5`·`11-5` 같은 **소수 인덱스**가 있습니다 (6px·72px). 나중에 끼워 넣은 단계입니다.

SCSS 쪽에는 별도로 `$grid-size: 8px`이 정의돼 있습니다.

출처: `src/tokens/build/json/tokens.json` → `spacing-scale`

### 라운드

| 토큰 | rem | px |
|------|:---:|:---:|
| `none` | — | 0 |
| **`xs`** | — | **1** |
| `sm` | 0.125 | 2 |
| `md` | 0.25 | 4 |
| `lg` | 0.5 | 8 |
| `xl` | 0.75 | 12 |
| `2xl` | 1 | 16 |
| `3xl` | 1.5 | 24 |
| `full` | — | 9999 |
| `default` | → `md` | 4 |

**`xs`가 1px입니다.** 표본에서 가장 작은 라운드 단계이며, 1px 라운드를 토큰으로 둔 것은
Pajamas뿐입니다.

`default` 별칭이 `md`(4px)를 가리킵니다 — Primer가 `borderWidth.default`를 둔 것과 같은 방식입니다.

### 타이포그래피 — `clamp()` 유동 크기

**제목 크기가 뷰포트에 따라 변합니다.** 토큰 값 자체가 `clamp()`입니다.

| 제목 | 값 | 실제 범위 |
|------|-----|-----------|
| `heading.1` | `clamp(1.5rem, 0.8333rem + 1.3889vw, 1.875rem)` | 24 → 30px |
| `heading.2` | `clamp(1.3125rem, 0.8681rem + 0.9259vw, 1.5625rem)` | 21 → 25px |
| `heading.3` | `clamp(1.125rem, 0.9028rem + 0.463vw, 1.25rem)` | 18 → 20px |
| `heading.4` | `1rem` | 16px (고정) |
| `heading.5` | `0.875rem` | 14px (고정) |
| `heading.6` | `0.8125rem` | 13px (고정) |

**h1~h3만 유동이고 h4~h6은 고정입니다.**

`heading.scale.100` ~ `800`으로 8단계 스케일도 별도로 있고,
**각 단계마다 `-fixed` 변형이 쌍으로 존재합니다.**

```
heading.scale.500         clamp(1.125rem, …, 1.25rem)   ← 유동
heading.scale.500-fixed   1.125rem                       ← 고정
```

**유동·고정을 토큰 레벨에서 선택하게 합니다.** 표본에서 유일합니다.

### 복합 토큰 — 제목에 여백과 색이 포함됩니다

`heading.*` 토큰이 단일 값이 아니라 객체입니다.

```js
heading.1 = {
  fontWeight: 600,
  fontSize: 'clamp(...)',
  lineHeight: 1.25,
  letterSpacing: '-0.01em',
  marginTop: '0px',
  marginBottom: '1rem',
  color: '#18171d',
}
```

**`marginTop`·`marginBottom`·`color`까지 타이포 토큰에 들어 있습니다.**
스페이싱 토큰이 따로 있는데도 제목 여백을 타이포 쪽에 넣었습니다.

자간은 h1~h2가 `-0.01em`, h3 이하는 `inherit`입니다.

### 컬러 / 그림자 / 기타

`tokens.json` 최상위 카테고리:

```
border · color · font · heading · line-height · opacity · shadow
spacing-scale · zindex
```

컴포넌트별 토큰도 같은 파일에 있습니다 — `alert` · `avatar` · `badge` · `banner` ·
`breadcrumb` · `broadcast` · `button` · `card` · `chart` · `datepicker` · `drawer` 등.

**라이트/다크가 별도 파일입니다** (`tokens.json` / `tokens.dark.json`).

### 빌드 출력 — 4개 형식

```
build/json/      tokens.json · tokens.dark.json
build/css/       tokens.css · tokens.dark.css
build/tailwind/  tokens.cjs · components.cjs
```

**Tailwind 설정을 토큰에서 생성합니다.** 표본에서 Tailwind 출력을 배포하는 것은 Pajamas뿐입니다.

토큰 원본에 `com.figma.scopes` 확장이 붙어 있어, Figma 변수와 연동되는 구조입니다.

## 컴포넌트

토큰 카테고리에서 확인: alert · avatar · badge · banner · breadcrumb · broadcast ·
button · card · chart · datepicker · drawer 외 다수.

## 컴포넌트 심화 — (2026-08-18)

`@gitlab/ui@136.2.0`의 `dist/index.css`(568KB, 압축)를 규칙 단위로 쪼개 실측했습니다.
Bootstrap(-Vue) 위에 얹힌 시스템이라 `.gl-button.btn-sm`처럼 **Bootstrap 클래스와
gl 클래스가 한 셀렉터에 공존**하고, 모달 애니메이션은 Bootstrap 유산을 그대로 씁니다.

### 버튼 (`.gl-button`)

| | 기본 | small |
|---|:--:|:--:|
| **min-height** | **2rem (32px)** | 1.5rem (24px) |
| **min-width** | **2rem (32px)** | 1.5rem (24px) |
| 상하 패딩 | **0** | 0 |
| 좌우 패딩 | 12px | 8px |
| 라운드 | 8px | 8px |
| 서체 | 14px / 16px | 동일 |
| 보더 | 1px | 1px |

- **상하 패딩이 0이고 높이는 `min-height`가 만듭니다** — 내용이 넘치면 늘어나는
  방임형(Backpack 계열)인데, **`min-width`를 `min-height`와 같은 값으로** 둬서
  아이콘 버튼의 정사각(32×32/24×24)이 자동 보장됩니다. 별도 최소 너비(MUI 64px류)는 없습니다.
- 크기 2단(기본·small)에 **large가 없습니다** — Backpack(기본·large)과 반대 방향의 2단.
  두 크기의 서체가 14px로 같습니다.
- 버튼 텍스트에 `margin: -1px 0` + `padding: 1px 0` 상쇄 트릭 — ellipsis 클리핑 보정.
- 변형: default · confirm · danger · reset 4계열 × (기본·secondary·tertiary) + link + icon
  (CSS 클래스 실측).

### 입력 (`.gl-form-input`)

- `height: auto` — 파생 높이 **32px** (line-height 16px + 상하 패딩 8px×2).
  **버튼 32px와 정합**합니다.
- 패딩 8px / 12px, 라운드 8px, 서체 14px.
- **보더가 `border`가 아니라 `inset box-shadow 1px`입니다** (`border-style: none`).
  hover·focus·error가 전부 box-shadow 링 조합으로 표현되고,
  `@media (forced-colors: active)`에서만 실보더 1px를 복원합니다.
- 라벨은 별도 블록(`.col-form-label`) — 14px / 16px / bold, 입력 위 8px.

### 모달 (`.gl-modal`)

| 단계 | 폭 |
|------|-----|
| sm | 32rem (512px) |
| md | 48rem (768px) |
| lg | **61.875rem (990px)** |
| xl | 98% |

- 라운드 **16px** (`--gl-modal-border-radius` → `radius-2xl`) — 버튼 8px의 두 배.
- 패딩: 헤더 16px(하단만 8px로 축소) · 본문 좌우 16 / 상하 8 (min-height 80px) ·
  푸터 16(상단 8). 575.98px 이하에서 푸터 버튼이 세로 스택으로 전환됩니다.
- 진입 애니메이션은 **Bootstrap 유산 그대로**: `translateY(-50px)→0` 300ms ease-out + 페이드.
  gl 층에서 재정의하지 않았습니다.

### 이징 — 단일 리터럴 53회

dist CSS 전체에서 `cubic-bezier(.22,.61,.36,1)` **한 곡선만 53회** 등장합니다
(버튼 전환 200ms × 5속성 등). 이징 토큰(`--gl-easing-*`·`--gl-duration-*`)은 0개.
Backpack(무토큰 + 곡선 3종 산포)과 같은 무토큰이지만 **드리프트가 없는** 반대 표본입니다.
`prefers-reduced-motion` 대응(`transition-duration: .01ms !important`)이 컴포넌트 CSS에 내장돼 있습니다.

### 특징적 결정 (심화분)

- **라운드 변수가 스페이싱 변수를 참조합니다** — `--gl-border-radius-lg: var(--gl-spacing-scale-3)`,
  `2xl: var(--gl-spacing-scale-5)`. 두 스케일이 CSS 출력층에서 한 계보입니다.
- **버튼 min-width = min-height** — 정사각 하한을 별도 규칙 없이 얻는 구조
- **입력 보더의 box-shadow화** + forced-colors 복원 — 상태 표현을 한 속성에 통합
- **이징 무토큰 + 단일 리터럴 53회** — 무토큰인데 일관 유지
- 버튼 32px·입력 32px 정합, large 부재의 2단

## 특징적 결정

- **`clamp()`를 토큰 값으로 씁니다.** 제목 크기가 뷰포트에 따라 변합니다.
  GOV.UK가 브레이크포인트별 값을 맵으로 둔 것과 목적이 같지만, Pajamas는 CSS 함수 하나로 해결합니다.
- **유동·고정을 쌍으로 제공합니다.** `heading.scale.500` / `-fixed`.
  Cloudscape의 `scaled`/`static` 이중화와 같은 발상입니다.
- **라운드 `xs`가 1px입니다.** 표본에서 유일합니다.
- **스페이싱 인덱스가 불규칙합니다.** 13까지는 순차적이고 이후 15·18·20·26·…·88로 튑니다.
  `2-5`·`11-5` 같은 소수 인덱스도 있습니다.
- **여백과 레이아웃 폭을 한 스케일에 담았습니다.** 704px까지 갑니다. Codex와 같은 구조입니다.
- **타이포 토큰이 복합 객체입니다.** 크기·행간·자간뿐 아니라 마진과 색까지 포함합니다.
- **Tailwind 출력을 배포합니다.** JSON·CSS·SCSS·Tailwind 4개 형식입니다.

## 접근성

미확인.

## 참고

- 문서: https://design.gitlab.com
- 저장소: https://gitlab.com/gitlab-org/gitlab-ui (**GitHub이 아니라 GitLab에 있습니다**)
- 패키지: `@gitlab/ui` (컴포넌트 심화: `@gitlab/ui@136.2.0` → `dist/index.css`, 2026-08-18)
- 토큰: `src/tokens/build/json/tokens.json`
- 라이선스: 패키지 `package.json`에 **MIT** 명기 — frontmatter 반영 (2026-08-18)
- **주의:** `src/scss/tokens.scss`는 `../tokens/build/css/tokens`를 import하는 껍데기입니다.
  실값은 `src/tokens/build/` 아래에 있습니다.
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: npm `@gitlab/ui@136.2.0` → `package.json`. 저장소가 GitLab이라 GitHub API 조회 대상이 아닙니다
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `design.gitlab.com` → `figma.com/community/file/781156790581391771`

## 드리프트 기록 — 136.1.0 → 136.2.0 (2026-08-17)

minor 하나에서 **`nav.item` 색 16개가 실제로 바뀌었습니다** — 선택 상태가
어두운 칩(배경 `#3a383f` + 흰 글자)에서 **밝은 칩(`#dcdcde` + 진한 글자)**으로,
hover/active 배경이 알파(`rgba(5,5,6,.06/.16)`)에서 **불투명 회색**으로.
내비게이션 선택 표현의 방향 전환이며, 참조 구조도 `action.neutral.*` →
`color.neutral.600` 참조로 바뀌었습니다. 신선도 루프가 잡은 **세 번째 실변경**
(Base Web 낡음 · Mística HC 제거에 이어)입니다.
