---
name: Primer
org: GitHub
coverage: full
url: https://primer.style
repo: https://github.com/primer/primitives
license: MIT
tech: [React, Rails/ViewComponent, CSS]
figma_kit: true
tokens_format: [JSON, CSS]
a11y_target: "WCAG 2.2 AA (명시 — primer.style/guides/accessibility, 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "github primer/primitives@main → src/tokens/base · npm @primer/primitives@11.10.0 → src/tokens/base/{color,typography} · src/tokens/functional/{color,typography} · dist/css/functional/themes/*.css · dist/internalCss/*.css"
---
<!-- lang-links -->
> [English](primer.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

GitHub 제품 전반을 위한 디자인시스템. 코드 뷰·다이어그램 등 개발자 도구 특유의 화면을 전제로 합니다.

## 토큰

### 사이즈 / 스페이싱

**토큰 키가 곧 px 수치**입니다 — 키 `16`의 값이 `16px`입니다. 해석이 필요 없는 대신
스케일을 바꾸면 키까지 같이 바뀌어야 하는 구조입니다.
(CSS 변수로 빌드됐을 때의 최종 이름 형태는 미확인입니다.)

```
2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 64, 80, 96, 112, 128
```

증분 패턴: 2px 단위 → 4px 단위(8~48 구간) → 16px 단위(48 이후).

### 음수 스케일

Primer는 **음수 토큰을 1급으로 제공합니다.**

```
-2, -4, -6, -8, -12, -16, -20, -24, -28, -32, -36, -40, -44, -48
```

양수 스케일의 48 이하 구간과 정확히 대칭입니다. 64 이상 음수는 없습니다.

출처: `src/tokens/base/size/size.json5`

### 보더 두께

| 토큰 | 값 |
|------|-----|
| `borderWidth.thin` | 1px |
| `borderWidth.thick` | 2px |
| `borderWidth.thicker` | 4px |
| `borderWidth.default` | → `thin` (1px) |

출처: `src/tokens/functional/size/border.json5`

### 타이포그래피

~~미확인 — `src/tokens/base/typography` 확인 필요~~ → **해소 (2026-08-18,
`@primer/primitives@11.10.0`).**

**base 층 — 크기 6단(rem) · 굵기 4단 · 행간 5단(무단위)**
(`src/tokens/base/typography/typography.json5`)

| `base.text.size` | rem | px | 소스 설명 |
|------|:---:|:---:|------|
| `xs` | 0.75 | 12 | 캡션·촘촘한 UI |
| `sm` | 0.875 | **14** | **UI 기본 본문** |
| `md` | 1 | 16 | 큰 본문·작은 제목 |
| `lg` | 1.25 | 20 | 중간 제목·부제 |
| `xl` | 2 | 32 | 큰 제목·페이지 헤딩 |
| `2xl` | 2.5 | 40 | 히어로 디스플레이 |

**20px 다음이 바로 32px입니다** — 24·28이 없습니다.

| `base.text.weight` | 값 |
|------|:---:|
| `light` | 300 |
| `normal` | 400 |
| `medium` | 500 |
| `semibold` | **600** (최대) |

**700(bold)이 없습니다.** 굵기 상한이 600입니다.

| `base.text.lineHeight` | 값 |
|------|:---:|
| `tight` | 1.25 |
| `snug` | 1.375 |
| `normal` | 1.5 |
| `relaxed` | 1.625 |
| `loose` | 1.75 |

**행간 토큰마다 언제 쓰는지가 `$description`에 적혀 있습니다** —
`normal`은 "어느 쪽인지 모르겠으면 이걸 쓰라", `loose`는 "아주 작은 글자나
최대 가독성이 필요할 때만 아껴 쓰라"는 식입니다. 값이 아니라 **선택 규칙이
토큰에 동봉**됩니다.

**functional 층 — 역할 8종** (`src/tokens/functional/typography/typography.json5`)

| 역할 | 크기 | 행간 | 굵기 | 서체 |
|------|:---:|:---:|:---:|------|
| `display` | 40px (`2xl`) | 1.375 | 500 | sansSerifDisplay |
| `title-large` | 32px (`xl`) | 1.5 | 600 | sansSerifDisplay |
| `title-medium` | 20px (`lg`) | 1.625 | 600 | sansSerifDisplay |
| `title-small` | 16px (`md`) | 1.5 | 600 | sansSerif |
| `subtitle` | 20px (`lg`) | 1.625 | 400 | sansSerifDisplay |
| `body-large` | 16px (`md`) | 1.5 | 400 | sansSerif |
| `body-medium` | **14px (`sm`)** | 1.5 | 400 | sansSerif |
| `body-small` | 12px (`xs`) | 1.625 | 400 | sansSerif |
| `caption` | 12px (`xs`) | 1.25 | 400 | sansSerif |
| `codeBlock` | **0.8125rem (13px)** | 1.5 | 400 | monospace |
| `codeInline` | **0.9285em** | — | 400 | monospace |

- `codeInline`이 **`em`**입니다 — 부모 크기에 비례합니다. 행간 토큰이 없습니다.
- `codeBlock` 13px은 base 스케일에 없는 값입니다 (functional 층에서 직접 지정).
- `title-medium` 주석: 20 × 1.625 = **32px 행간이 중간 컨트롤 높이와 맞는다**고
  소스에 적혀 있습니다 — 활자 행간을 컨트롤 높이에 맞춘 근거가 명시된 드문 사례입니다.
- `caption` 주석은 **"크기가 작아 접근성 요건을 통과하지 못하므로 한 줄
  상황에만 쓰라"**고 적습니다 — 토큰이 자기 한계를 명시합니다.

**CSS `font` 단축 토큰이 있습니다.**

```css
--text-body-shorthand-medium:
  var(--text-body-weight) var(--text-body-size-medium)
  / var(--text-body-lineHeight-medium) var(--fontStack-sansSerif);
```

11개 역할 전부에 `*-shorthand` 토큰이 있고, **개별 속성 토큰도 함께 노출**됩니다.
Atlassian이 리터럴 문자열이라 분해가 불가능한 것과 달리 Primer는 단축이
`var()` 조합이라 **둘 다 쓸 수 있습니다.**

서체 스택 4종. `system` · `sansSerif` · `sansSerifDisplay` **셋의 값이 완전히 동일**
(`"Mona Sans VF", -apple-system, BlinkMacSystemFont, "Segoe UI",
"Noto Sans Backtick Fix", "Noto Sans", Helvetica, Arial, sans-serif,
"Apple Color Emoji", "Segoe UI Emoji"`)하고 이름만 다릅니다 —
소스 주석이 `sansSerifDisplay`를 "sansSerif와 같지만 의미적으로 구분됨"이라고
명시합니다. `monospace`만 실제로 다릅니다.
자간 토큰은 없습니다.

### 컬러

~~미확인 — `src/tokens/functional/color` 확인 필요~~ → **해소 (2026-08-18).**
전체 헥스 나열은 하지 않습니다 (`../SCHEMA.md`) — 구조만 적습니다.

**3계층이고, 맨 아래 층은 공개 배포에서 제외됩니다.**

| 계층 | 소스 | 공개 CSS |
|------|------|------|
| base 램프 | `src/tokens/base/color/{light,dark}/*.json5` | **없음** — `dist/internalCss/`에만 |
| functional 역할 | `src/tokens/functional/color/*.json5` (8파일) | `dist/css/functional/themes/*.css` |
| component | `src/tokens/component/` | 위 테마 파일에 포함 |

`dist/css/primitives.css` 머리말이 규칙을 명시합니다:
**"원시 값(헥스·px)을 절대 쓰지 말 것. 시맨틱 토큰만 쓸 것."**
공개 테마 CSS에 `--base-color-*` 변수가 **0개**이고,
`dist/internalCss/`(내부용)에만 들어 있습니다.

#### base 램프 — 8색 × 10단 + neutral 14단

`blue` · `green` · `yellow` · `orange` · `red` · `purple` · `pink` · `coral`
각 **0~9 10단**, `neutral`만 **0~13 14단**입니다.
`black` · `white` · `transparent`(알파 0) · `inset`(= `neutral.0` 별칭) 4개 별도.
`neutral.0` = white, `neutral.13` = black으로 양끝이 별칭입니다.

**알파 램프가 따로 없습니다** — Polaris(`blackAlpha`/`whiteAlpha`)·
Spectrum(`transparent-black/white`)과 갈리는 지점입니다.

색 값은 **HSL 성분 + 헥스를 함께** 적습니다 —
`{colorSpace: 'hsl', components: [213.3, 12.7, 13.9], hex: '#1f2328'}`.
표기 형식(색공간 명시 + 헥스 병기)은 코퍼스에서 Primer뿐입니다.

라이트/다크가 **서로 다른 램프 값**을 가집니다 (`blue-5` 라이트 `#0969da` /
다크 `#1f6feb`) — 같은 램프를 재사용하지 않습니다.

#### functional 층 — 역할 8계열

`bgColor` · `fgColor` · `borderColor` · `control` · `selection` ·
`data-vis` · `display` · `syntax`(prettylights).

라이트 테마 한 벌이 **959개 토큰**입니다. 상위 계열 분포:

| 계열 | 개수 |
|------|:---:|
| `display-*` | **285** |
| `label-*` | 133 |
| `button-*` | 68 |
| `color-*`(prettylights 등) | 47 |
| `prettylights-*` | 42 |
| `control-*` | 38 |
| `buttonKeybindingHint-*` | 35 |
| `data-*` | 34 |
| `bgColor-*` | 33 |
| `borderColor-*` | 30 |
| `border-*` | 30 |
| `diffBlob-*` | 21 |
| `fgColor-*` | 20 |
| `codeMirror-*` | 19 |
| `contribution-*` | 18 |

**제품 고유 계열이 큽니다** — `diffBlob`(코드 diff) · `codeMirror`(에디터) ·
`contribution`(잔디 그래프) · `prettylights`(구문 강조)가 합쳐서 100개를 넘습니다.
`display-*` 285개는 21색 디스플레이 팔레트의 파생입니다
(`src/tokens/base/color/{light,dark}/display-*.json5`).

**역할 토큰(`bgColor`·`fgColor`·`borderColor`)은 83개뿐**이고, 나머지 876개가
컴포넌트·제품 화면 전용입니다.

#### 테마 14벌

```
light · light-high-contrast · light-colorblind · light-colorblind-high-contrast
       · light-tritanopia · light-tritanopia-high-contrast
dark  · dark-dimmed · dark-high-contrast · dark-colorblind
       · dark-colorblind-high-contrast · dark-tritanopia
       · dark-tritanopia-high-contrast · dark-dimmed-high-contrast
```

**축이 3개입니다**: 명암(light/dark) × 색각(기본/colorblind/tritanopia) ×
대비(기본/high-contrast), 그리고 다크에만 `dimmed`가 추가됩니다.
base 소스는 5벌(`light` · `light.high-contrast` · `dark` · `dark.dimmed` ·
`dark.high-contrast`)이고, 색각 변형 9벌은 빌드에서 생성됩니다.

테마 CSS 셀렉터가 `[data-color-mode="auto"][data-light-theme="light"]` +
`@media (prefers-color-scheme: dark)` 조합입니다 — 데이터 속성과 미디어쿼리를
함께 씁니다.

### 라운드

~~미확인~~ → **해소 (2026-08-18, `dist/css/functional/size/radius.css`).**

| 토큰 | rem | px |
|------|-----|-----|
| `--borderRadius-small` | 0.1875 | 3 |
| `--borderRadius-medium` | 0.375 | 6 |
| `--borderRadius-large` | 0.75 | 12 |
| `--borderRadius-default` | → `medium` | 6 |
| `--borderRadius-full` | **624.9375** | 9999 |

3단뿐이고 `default` 별칭이 medium(6px)을 가리킵니다. `full`은
9999px를 rem으로 환산한 `624.9375rem`입니다 (Polaris WC 번들과 같은 표기).

## 컴포넌트

~~미확인~~ → **`@primer/css@22.3.0` 심화 (2026-08-17).** 레거시 CSS 라인
(현행은 Primer React/ViewComponents)이지만 컴포넌트 SCSS가 npm에 있습니다.

- 버튼이 높이 무토큰·패딩 파생: 기본 `5px/16px` + 행높이 20px(보더 포함
  ≈32px), small `3px/12px`(≈28px) — GOV.UK와 같은 파생 계열
- **large 버튼이 em 구동**: `padding: $em-spacer-6 1.5em; font-size: inherit`
  — 글자 크기를 키우면 버튼이 통째로 비례 확대되는 설계.
  px 고정 진영과 다른 **서체 상대 크기** 축입니다
- 행높이 20px에 "body 기본을 상속하지 않도록 명시"라는 주석 —
  전역 행간과 컨트롤 행간을 의도적으로 분리

## 특징적 결정

- **음수 스페이싱을 토큰으로 승격했습니다.** 대부분의 시스템은 음수 여백을 토큰화하지 않고
  임의 값으로 처리합니다. Primer는 이를 스케일에 편입시켜 겹침 배치도 시스템 안에서 다룹니다.
- **토큰 이름이 실제 px입니다.** Polaris(`space-400` = 16px)와 정반대 철학입니다.
  가독성은 높지만 리브랜딩·리스케일 시 이름 전체가 거짓말이 될 위험이 있습니다.
- **`default` 별칭을 둡니다.** `borderWidth.default → thin` 처럼 기본값을 토큰으로 명시해서,
  "안 정하면 뭐가 되는가"를 코드가 아니라 토큰 레이어에서 답하게 했습니다.
- **테마 변형이 많습니다.** light/dark 외에 고대비·색각이상 대응 변형을 별도 테마로 제공합니다.
  → **실측 14벌 (2026-08-18)**: 명암 2 × 색각 3(기본·colorblind·tritanopia) ×
  대비 2 + 다크 전용 `dimmed` 2. 코퍼스에서 **색각 축을 테마 축으로 세운 것은
  Primer뿐**입니다(Unify는 유형 3종을 두되 축 곱셈은 아님, `../patterns/color.md`).

- **원시 램프를 공개 배포에서 뺐습니다** (2026-08-18). `--base-color-*`는
  `dist/internalCss/`에만 있고 공개 테마 CSS에는 0개입니다.
  `primitives.css` 머리말이 "원시 값 금지, 시맨틱만"이라고 규칙을 적습니다.
  **토큰 계층을 문서가 아니라 배포 산출물로 강제하는 방식**입니다.

- **굵기 상한이 600입니다.** `bold`(700)가 base 스케일에 없습니다.

- **행간·자간 토큰에 사용 규칙이 동봉됩니다.** `lineHeight.normal`은
  "모르겠으면 이걸", `caption`은 "접근성 요건 미달이니 한 줄에만"이라고
  `$description`에 적혀 있습니다.

## 접근성

색각이상(colorblind) 3축 · 고대비 테마를 토큰 레벨에서 제공합니다 (위 "테마 14벌").
준수 목표는 **WCAG 2.2 AA** 명시 (frontmatter `a11y_target`, 2026-08-18 확인).

## 컴포넌트 토큰 층 — `src/tokens/component/` (2026-08-18 확인)

TODO에 남아 있던 마지막 층입니다. **27파일 · 토큰 364개**
(color 354 / shadow 5 / dimension 4 / border 1) — 컴포넌트 층은
**사실상 색 전용**이고 치수는 functional 층이 담당하는 분업입니다.

```
avatar · avatarStack · button · card · codeMirror · contribution · counter ·
dashboard · diffBlob · focus · header · headerSerach · highlight · label ·
menu · overlay · page · progressBar · reactionButton · selectMenu · sideNav ·
skeletonLoader · timelineBadge · tooltip · topicTag · treeView · underlineNav
```

- **다크 오버라이드가 토큰 안에 인라인**입니다 — `$extensions`의
  `org.primer.overrides.dark`에 다크 값을 병기 (button 한 파일에 76건).
  테마 파일 분리(다수 표본)와 다른, **토큰 정의 지점에서 모드를 함께 쓰는**
  방식입니다.
- **Figma Variables 동기화 메타데이터가 토큰에 내장** —
  `org.primer.figma`(collection · group · scopes)가 모든 토큰에 붙어
  코드→Figma 변수 발행을 토큰 파일이 스스로 기술합니다. 코퍼스에서
  Figma 동기화 정보를 토큰 스키마에 넣은 유일 표본.
- `focus`는 `$type: border` **복합 타입**(color+style+width 한 값) —
  DTCG 복합 타입 실사용 사례. 아웃라인 2px.
- 참조는 전부 `{control.*}` 등 functional 층으로 — base를 직접 만지지 않는
  3층 규율이 컴포넌트 층에서도 지켜집니다.
- 파일명에 **`headerSerach.json5` 오타가 배포본에 그대로** 있습니다 —
  이름 공간에 박제된 오타는 표본에서 이것뿐 (이름을 고치면 소비자가 깨지는
  토큰 이름의 비가역성을 보여주는 사례).

## 참고

- 저장소: https://github.com/primer/primitives
- 토큰 패키지: `@primer/primitives`
- 빌드: Style Dictionary로 JSON → CSS 변수 생성
