---
name: Bootstrap
org: Bootstrap (오픈소스)
coverage: partial
url: https://getbootstrap.com
repo: https://github.com/twbs/bootstrap
license: MIT
tech: [CSS, Sass]
figma_kit: 미확인
tokens_format: [Sass, CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "npm bootstrap@5.3.8 → scss/_variables.scss, _variables-dark.scss, mixins/_transition.scss"
---
<!-- lang-links -->
> [English](bootstrap.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

가장 오래된 CSS 프레임워크. 토큰이 **Sass 변수**이며,
**`$enable-*` 빌드 플래그 17개**로 기능 자체를 켜고 끕니다 — 표본에서 유일한 축입니다.

## 토큰 — Sass 변수 + `--bs-` CSS 변수

```scss
$prefix: bs- !default;   // CSS 변수 접두사
```

빌드 시 Sass 변수에서 `--bs-*` CSS 커스텀 프로퍼티를 생성합니다.
**`!default` 플래그가 붙어 있어 `@import` 전에 재정의하면 덮어씁니다** —
런타임 배율(Mantine·Radix Themes)이 아니라 **빌드 타임 오버라이드** 방식입니다.

### 스페이싱 — 6단계, 32px이 없습니다

```scss
$spacer: 1rem !default;
$spacers: (
  0: 0,
  1: $spacer * .25,   // 4px
  2: $spacer * .5,    // 8px
  3: $spacer,         // 16px
  4: $spacer * 1.5,   // 24px
  5: $spacer * 3,     // 48px
);
```

| 키 | 값 |
|:---:|:---:|
| 0 | 0 |
| 1 | 4px |
| 2 | 8px |
| 3 | **16px** |
| 4 | 24px |
| 5 | **48px** |

**코어 `4/8/16/24`는 전부 있고 `32`가 없습니다.** 24 다음이 48로 뜁니다 —
`tokens/scales.md`에서 32px이 빠진 두 번째 사례입니다 (Nord에 이어).

**`12`·`20`도 없습니다.** 표본에서 Protocol(6단계)·Mantine(5단계)과 함께
가장 성긴 스케일입니다.

**`$spacer` 하나에서 배수로 파생시킵니다** — Tailwind의 `--spacing` 방식과 같되
**결과를 유한한 맵으로 내보냅니다** (Tailwind는 목록을 만들지 않습니다).

`$enable-negative-margins`가 **기본 `false`**입니다 — 음수 여백이 옵트인입니다.
Primer·Atlassian이 음수 스페이싱을 기본 제공하는 것과 다릅니다.

### 라운드 — `pill`이 50rem입니다

| 토큰 | 값 | px |
|------|:---:|:---:|
| `$border-radius-sm` | .25rem | 4 |
| **`$border-radius`** | **.375rem** | **6** |
| `$border-radius-lg` | .5rem | 8 |
| `$border-radius-xl` | 1rem | 16 |
| `$border-radius-xxl` | 2rem | 32 |
| **`$border-radius-pill`** | **50rem** | **800** |

**기본값이 6px입니다** — Ant Design(6px)과 같습니다.
`12`·`20`·`24`가 없어 8 다음이 16입니다.

**`pill`이 50rem = 800px입니다.** 완전한 원 표현 방식의 여덟 번째 형태입니다
(`tokens/scales.md`).

| 방식 | 값 | 시스템 |
|------|:---:|--------|
| 큰 상수 | 9999px | Polaris · Atlassian |
| | 10000px | Fluent 2 |
| | 999px | Nord |
| | **`1e5px`** | **Open Props** |
| | **50rem (800px)** | **Bootstrap** |
| 고정 px | 100px | Paste |
| | **15rem (240px)** | **Lightning** |
| 비율 | 50% · 0.5 | Paste · Gestalt · Nord · Spectrum |
| 컨테이너 쿼리 | 50cqmin | Material 3 |

**`rem` 단위를 쓰는 것은 Bootstrap뿐입니다** — 루트 글자 크기가 커지면 값도 커집니다.
800px이므로 그보다 큰 요소에서는 알약이 되지 않습니다 (Lightning 240px과 같은 한계).

`$enable-rounded`가 **`true`**이며, `false`로 두면 전 컴포넌트 라운드가 사라집니다.

### 보더 — 1~5px

| 토큰 | 값 |
|------|:---:|
| `$border-widths` 1~5 | 1 · 2 · 3 · 4 · 5px |
| `$border-width` (기본) | 1px |
| `$border-color-translucent` | `rgba($black, .175)` |

**1px 등차 5단계입니다.** 표본 다수(1/2/4)보다 촘촘하고 3·5px이 있습니다.

**`$border-color-translucent`가 알파 보더입니다** — 다크 모드에서 표면색과
무관하게 동작합니다. shadcn/ui가 다크에서만 알파로 바꾸는 것과 목적이 같습니다
(`patterns/color.md`).

### 타이포그래피 — 제목이 배수 파생

```scss
$font-size-base: 1rem !default;      // 16px
$h1-font-size: $font-size-base * 2.5;    // 40px
$h2-font-size: $font-size-base * 2;      // 32px
$h3-font-size: $font-size-base * 1.75;   // 28px
$h4-font-size: $font-size-base * 1.5;    // 24px
$h5-font-size: $font-size-base * 1.25;   // 20px
$h6-font-size: $font-size-base;          // 16px
```

| 단계 | 배수 | px |
|:---:|:---:|:---:|
| h1 | 2.5 | 40 |
| h2 | 2 | 32 |
| h3 | 1.75 | 28 |
| h4 | 1.5 | 24 |
| h5 | 1.25 | 20 |
| h6 | 1 | **16** |

**`h6`가 본문과 같습니다.** Mantine도 `h6`(14px)가 본문 `sm`과 같은 구조입니다
(`patterns/typography.md`).

**배수 간격이 좁아집니다** — 0.5 / 0.25 / 0.25 / 0.25 / 0.25.
`h1`만 큰 폭으로 벌어집니다.

**본문 16px이며 14px 단계가 없습니다.**

행간 3단계 — `base` 1.5 · `sm` 1.25 · `lg` **2**.
제목은 `$headings-line-height: 1.2`로 별도이며 **본문 최소값(1.25)보다 좁습니다.**

`$headings-font-weight: 500`입니다 — 제목 굵기를 하나로 통일하는 네 번째 사례이고
**값이 가장 작습니다.**

| 시스템 | 제목 굵기 |
|--------|:---:|
| **Bootstrap** | **500** |
| Pajamas | 600 |
| Atlassian | 653 |
| Mantine | 700 |

**네 값이 전부 다릅니다** (`patterns/typography.md`).

`$enable-rfs`(Responsive Font Sizes)가 **`true`**입니다 — 뷰포트에 따라 크기가 변합니다.
Pajamas의 `clamp()`와 목적이 같고 **Sass 믹스인으로 구현**됩니다.

### 브레이크포인트 · 컨테이너 — 12칼럼 그리드

| 브레이크포인트 | 값 | 컨테이너 최대폭 |
|:---:|:---:|:---:|
| `xs` | **0** | — |
| `sm` | 576px | 540px |
| `md` | 768px | 720px |
| `lg` | 992px | 960px |
| `xl` | 1200px | 1140px |
| `xxl` | 1400px | 1320px |

**`xs`가 0으로 명시돼 있습니다** — 모바일 퍼스트 기준점입니다.
빌드 시 `_assert-starts-at-zero`로 검증합니다.

**컨테이너가 브레이크포인트보다 항상 좁습니다** (-36 / -48 / -32 / -60 / -80px).
차이가 일정하지 않습니다.

| 항목 | 값 |
|------|:---:|
| `$grid-columns` | **12** |
| `$grid-gutter-width` | 1.5rem (24px) |
| `$grid-row-columns` | 6 |

**칼럼 수를 토큰으로 두는 것은 Bootstrap뿐입니다.**
Chakra UI가 `sizes`에 12분할 분수를 두지만 칼럼 수 자체는 토큰이 아닙니다.

`768px`·`992px`·`1200px`이 Mantine의 `48em`·`62em`·`75em`과 정확히 같은 px입니다
(`systems/mantine.md`).

### z-index — 9단계

| 토큰 | 값 |
|------|:---:|
| `$zindex-dropdown` | 1000 |
| `$zindex-sticky` | 1020 |
| `$zindex-fixed` | 1030 |
| **`$zindex-offcanvas-backdrop`** | 1040 |
| `$zindex-offcanvas` | **1045** |
| `$zindex-modal-backdrop` | 1050 |
| `$zindex-modal` | **1055** |
| `$zindex-popover` | 1070 |
| `$zindex-tooltip` | 1080 |

**`dropdown` 1000에서 시작합니다** — Chakra UI · Open Props와 같습니다.

**증분이 10~20이고 오버레이는 5입니다.** `offcanvas-backdrop`(1040)과
`offcanvas`(1045), `modal-backdrop`(1050)과 `modal`(1055)이 각각 5 차이입니다 —
**배경과 콘텐츠를 인접 값으로 붙여 사이에 다른 것이 끼지 못하게 합니다.**

Chakra UI가 100 등차 13단계인 것과 대조됩니다.

| 시스템 | 단계 | 범위 | 배경/콘텐츠 분리 |
|--------|:---:|:---:|:---:|
| **Chakra UI** | 13 | -1 ~ int32 max | 없음 |
| **Bootstrap** | 9 | 1000~1080 | **있음 (+5)** |
| Open Props | 5 + 1 | 1~5, int32 max | 없음 |

### 그림자 — 4단계, 기본 꺼짐

| 토큰 | 값 |
|------|-----|
| `$box-shadow-sm` | `0 .125rem .25rem rgba(black, .075)` |
| `$box-shadow` | `0 .5rem 1rem rgba(black, .15)` |
| `$box-shadow-lg` | `0 1rem 3rem rgba(black, .175)` |
| `$box-shadow-inset` | `inset 0 1px 2px rgba(black, .075)` |

**`$enable-shadows`가 기본 `false`입니다.** 그림자가 정의돼 있어도 컴포넌트에 적용되지 않습니다.

알파가 0.075 → 0.15 → 0.175로 커지고, **블러가 4px → 16px → 48px로 3배씩** 커집니다.

### 모션 — 전환이 목적별입니다

| 토큰 | 값 |
|------|-----|
| `$transition-base` | `all .2s ease-in-out` |
| `$transition-fade` | `opacity .15s linear` |
| **`$transition-collapse`** | **`height .35s ease`** |
| **`$transition-collapse-width`** | **`width .35s ease`** |

**속성·시간·이징이 한 값에 묶여 있습니다** — Nord(`0.2s ease`)와 같은 구조입니다.

**`collapse`가 0.35s로 가장 깁니다.** 높이·너비 애니메이션을 별도 토큰으로 두고
전환 속성을 명시합니다 — `all`을 피하는 Codex·Atlassian과 같은 판단입니다
(`patterns/motion.md`).

`$transition-base`만 `all`입니다.

## `$enable-*` 빌드 플래그 17개 — 표본에서 유일한 축

토큰이 아니라 **기능 스위치**입니다. 빌드 시 CSS 출력 자체가 달라집니다.

| 플래그 | 기본값 | 내용 |
|--------|:---:|------|
| `$enable-rounded` | `true` | 라운드 전체 |
| **`$enable-shadows`** | **`false`** | 그림자 전체 |
| **`$enable-gradients`** | **`false`** | 그라디언트 |
| `$enable-transitions` | `true` | 전환 |
| **`$enable-reduced-motion`** | **`true`** | **`prefers-reduced-motion` 대응** |
| `$enable-smooth-scroll` | `true` | `scroll-behavior` |
| **`$enable-button-pointers`** | **`true`** | **버튼에 `cursor: pointer`** |
| `$enable-rfs` | `true` | 반응형 글자 크기 |
| **`$enable-negative-margins`** | **`false`** | 음수 여백 |
| `$enable-dark-mode` | `true` | 다크 모드 |
| `$enable-grid-classes` | `true` | 그리드 유틸리티 |
| **`$enable-cssgrid`** | **`false`** | CSS Grid (실험) |
| `$enable-container-classes` | `true` | 컨테이너 |
| `$enable-caret` | `true` | 드롭다운 화살표 |
| `$enable-validation-icons` | `true` | 폼 검증 아이콘 |
| `$enable-important-utilities` | `true` | `!important` 유틸리티 |
| `$enable-deprecation-messages` | `true` | 빌드 경고 |

**`$enable-button-pointers`가 Chakra UI ↔ Radix Themes의 불일치를 설정으로 만듭니다.**

| 시스템 | 버튼 커서 |
|--------|:---:|
| Chakra UI | `pointer` (토큰 고정) |
| Radix Themes | `default` (토큰 고정) |
| **Bootstrap** | **`pointer` (플래그로 끌 수 있음)** |

**세 번째 답입니다** — 값을 정하지 않고 선택을 넘깁니다.

**`$enable-reduced-motion`이 플래그입니다.** `mixins/_transition.scss`에서
`@media (prefers-reduced-motion: reduce)`를 감쌉니다.

| 접근성 모션 처리 | 시스템 |
|------------------|--------|
| 토큰 값에 `disabled: 0ms` | Cloudscape |
| 애니메이션 블록을 `no-preference`로 감쌈 | Radix Themes |
| **빌드 플래그 + 믹스인** | **Bootstrap** |

**세 방식이 다 다릅니다** (`patterns/motion.md` · `patterns/modal.md`).

**`shadows`·`gradients`가 기본 꺼짐입니다.** 값은 정의돼 있고 적용은 옵트인입니다 —
**"토큰이 있다"와 "쓰인다"가 분리된 유일한 사례입니다.**

## 컴포넌트

Sass 파일 기준으로 확인됩니다 — `_spinners.scss` · `_progress.scss` ·
`_offcanvas.scss` · `_modal.scss` 등. 전체 개수는 세지 않았습니다.

## 컴포넌트 심화 — (2026-08-18)

출처: `bootstrap@5.3.8` → `scss/_variables.scss` · `_buttons.scss` · `_modal.scss`.

### 버튼·입력 — 치수가 같은 변수에서 갈라집니다

**`$input-btn-*` 공유 변수 층이 있습니다.** `$btn-padding-y: $input-btn-padding-y`,
`$input-padding-y: $input-btn-padding-y` — 버튼과 입력의 패딩·서체·행간·보더·포커스가
전부 한 변수군에서 파생됩니다. Blueprint·Mantine이 높이 **값**을 공유한다면,
Bootstrap은 **변수 구조로 정렬을 강제**합니다 (`patterns/form.md` 계열의 세 번째 방식).

**높이 토큰이 없습니다** — 높이는 `패딩×2 + 서체×행간 + 보더×2`의 파생값입니다.

| | sm | 기본 | lg |
|---|:--:|:--:|:--:|
| 높이(파생) | 31 | **38** | 48px |
| 상하 패딩 | 4 | 6 | 8px |
| 좌우 패딩 | 8 | 12 | 16px |
| 서체 | 14 | 16 | 20px |
| 라운드 | 4 | 6 | 8px |

- 행간 1.5 고정 — 높이 계산: 기본 `16×1.5 + 6×2 + 1×2 = 38px`.
  **기본 높이 38px은 표본의 40px 다수파에서 2px 벗어난 값**이며 선언이 아니라
  계산의 결과입니다. 입력도 같은 식이라 `$input-height`가
  `add()` 계산식으로만 존재합니다 (`add($input-line-height * 1em, …)`).
- **최소 너비가 없습니다** — Chakra(minW=높이)·Blueprint(min-width=높이)와 갈립니다.
- **버튼 굵기가 400**(`$font-weight-normal`)입니다 — 500~600 다수파보다 가늡니다.
- 전환: `color, background-color, border-color, box-shadow` 각 `.15s ease-in-out` —
  **4속성 명시 나열**로 `all`을 피합니다.
- 5.3부터 `.btn`이 **`--bs-btn-*` CSS 변수 15개를 재선언**합니다 —
  Sass 변수(빌드) 위에 CSS 변수(런타임) 이중층입니다.
- 커서는 `$enable-button-pointers` 플래그를 그대로 탑니다
  (`cursor: if($enable-button-pointers, pointer, null)`).

### 모달 — 폭 4단계, transform과 opacity가 다른 시간축입니다

| 크기 | 폭 |
|:---:|:---:|
| `$modal-sm` | 300px |
| **기본(`md`)** | **500px** |
| `$modal-lg` | 800px |
| `$modal-xl` | 1140px |

- **기본 폭 500px** — Blueprint의 단일 폭 500px과 같은 값입니다.
  `xl` 1140px은 자기 컨테이너 `xl` 최대폭과 동일합니다.
- 패딩 `$modal-inner-padding: $spacer` = **16px** (header·body).
  **푸터만 `16px − gap(8px)×0.5 = 12px`입니다** — 버튼 사이 gap의 절반을
  패딩에서 빼는 보정이 `calc()`로 들어 있습니다 (`_modal.scss` 166행).
- 라운드 `lg`(8px), **안쪽 라운드는 `subtract(바깥, 보더)`로 계산**합니다 —
  보더 두께만큼 안쪽 반경을 줄이는 보정을 변수 층에서 합니다.
- 상하 여백 8px, `sm` 브레이크포인트부터 28px(`1.75rem`).
- 배경막 `$black` 불투명도 **0.5**.

애니메이션:

| 속성 | 값 |
|------|-----|
| 진입 transform | `translate(0, -50px)` → `none`, **`.3s ease-out`** |
| opacity (`.fade`) | `.15s linear` |
| static 배경막 거부 모션 | `scale(1.02)` |

- **transform(300ms)과 opacity(150ms)가 분리된 시간축입니다** — 드롭인이
  페이드보다 2배 깁니다. 한 전환 토큰에 묶는 Nord 방식과 반대입니다.
- **위에서 떨어지는 -50px 드롭인**입니다 — scale 진입(Chakra 0.95 · Blueprint 0.5)과
  갈리는 이동 계열입니다.
- **static backdrop의 "닫기 거부" 모션이 변수로 있습니다**
  (`$modal-scale-transform: scale(1.02)`) — 배경 클릭이 막힌 모달이 살짝 커졌다
  돌아오는 피드백입니다. 거부 모션을 변수로 둔 사례는 표본에서 처음 확인됩니다.

## 특징적 결정

- **`$enable-*` 빌드 플래그 17개.** 토큰이 아니라 기능 스위치이며 표본에서 유일합니다
- **`shadows`·`gradients`·`cssgrid`·`negative-margins`가 기본 꺼짐입니다.**
  값 정의와 적용이 분리됩니다
- **버튼 커서를 플래그로 둡니다** — Chakra(`pointer`)·Radix Themes(`default`)의
  대립에 대한 세 번째 답입니다
- **`prefers-reduced-motion`을 빌드 플래그 + Sass 믹스인으로 처리합니다**
- **스페이싱 6단계에 32px이 없습니다** (0/4/8/16/24/48). Nord에 이어 두 번째
- **음수 여백이 옵트인입니다** — Primer·Atlassian은 기본 제공
- **`pill`이 50rem(800px)입니다.** `rem` 단위 원 표현은 Bootstrap뿐입니다
- **제목 굵기 500** — 통일 사례 4개 중 가장 작습니다 (Pajamas 600 · Atlassian 653 · Mantine 700)
- **`h6`가 본문과 같은 크기입니다** (16px)
- **제목 행간(1.2)이 본문 최소값(1.25)보다 좁습니다**
- **z-index에서 배경과 콘텐츠를 +5로 붙입니다** (`modal-backdrop` 1050 / `modal` 1055)
- **`$grid-columns: 12`** — 칼럼 수를 토큰으로 두는 유일한 사례
- **보더가 1px 등차 5단계입니다** (3·5px 포함)
- **전환 토큰이 속성·시간·이징 복합입니다** (`height .35s ease`).
  `collapse`가 0.35s로 가장 깁니다
- **`!default` 기반 빌드 타임 오버라이드입니다** — 런타임 CSS 변수 배율이 아닙니다

## 접근성

- **`$enable-reduced-motion`** — `prefers-reduced-motion: reduce` 대응을
  `mixins/_transition.scss`에서 감쌉니다. `_spinners.scss` · `_progress.scss` ·
  `_reboot.scss`에도 같은 미디어 쿼리가 있습니다
- `$enable-validation-icons` — 폼 검증에 아이콘을 함께 씁니다
  (색만으로 상태를 표현하지 않음)
- `$enable-smooth-scroll` — `scroll-behavior`도 reduced-motion에서 해제됩니다
- ~~명시적 WCAG 목표는 변수 파일에서 확인되지 않았습니다~~ →
  **준수 목표 선언이 없음을 확인했습니다 (2026-08-18 — frontmatter `null`)**
  출처: `getbootstrap.com/docs/5.3/getting-started/accessibility/` — "it should be
  perfectly possible to create websites and applications with Bootstrap that fulfill
  WCAG 2.2 (A/AA/AAA), Section 508". **"달성 가능"이라고만 적고 자체 준수는 선언하지
  않습니다.** 오히려 기본 팔레트가 WCAG 2.2 대비(본문 4.5:1 · 비텍스트 3:1)에
  미달할 수 있다고 스스로 경고합니다 — 표본에서 자기 미달을 명시한 유일한 사례입니다.

## 참고

- 문서: https://getbootstrap.com
- 저장소: https://github.com/twbs/bootstrap
- 토큰: `npm pack bootstrap@5.3.8` → `package/scss/_variables.scss`
- 다크 모드: `package/scss/_variables-dark.scss`
- reduced-motion 믹스인: `package/scss/mixins/_transition.scss`
- 컴포넌트 심화: `package/scss/_buttons.scss` · `_modal.scss` ·
  `_variables.scss` 786~931행(input-btn·btn·form-input) · 1500~1541행(modal)
  (2026-08-18, bootstrap@5.3.8)
- **남은 확인 사항:** 컬러 팔레트 단계, 컴포넌트 전체 개수,
  `_variables-dark.scss`의 오버라이드 범위, RFS 믹스인의 실제 계산식
