---
name: Spectrum
org: Adobe
coverage: full
url: https://spectrum.adobe.com
repo: https://github.com/adobe/spectrum-tokens
license: Apache-2.0
tech: [Web Components, React, CSS]
figma_kit: false
tokens_format: [JSON]
a11y_target: "명시 없음 확인 (2026-08-18 — 접근성 문서에 WCAG 일반 언급뿐, 버전·등급 목표 부재)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @adobe/spectrum-tokens@15.0.0 → src/layout.json · src/typography.json · src/color-palette.json · src/semantic-color-palette.json · src/color-aliases.json"
---
<!-- lang-links -->
> [English](spectrum.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Adobe 크리에이티브 제품 전반을 위한 디자인시스템.
**모든 토큰이 desktop/mobile 두 값을 가질 수 있는 구조**가 가장 큰 특징입니다.

## 토큰

### 스페이싱

| 토큰 | 값 |
|------|-----|
| `spacing-25` | 1px |
| `spacing-50` | 2px |
| `spacing-75` | 4px |
| `spacing-85` | 6px |
| `spacing-100` | 8px |
| `spacing-200` | 12px |
| `spacing-300` | 16px |
| `spacing-350` | 20px |
| `spacing-400` | 24px |
| `spacing-500` | 32px |
| `spacing-600` | 40px |
| `spacing-700` | 48px |
| `spacing-800` | 64px |
| `spacing-900` | 80px |
| `spacing-1000` | 96px |

번호가 균등 간격이 아닙니다 — `85`, `350` 같은 중간 번호가 나중에 끼워 넣어진 흔적입니다.

### 라운드 — 1px 단위 세분화

| 토큰 | 값 |
|------|-----|
| `corner-radius-0` | 0px |
| `corner-radius-75` | 3px |
| `corner-radius-100` | 4px |
| `corner-radius-200` | 5px |
| `corner-radius-300` | 6px |
| `corner-radius-400` | 7px |
| `corner-radius-500` | 8px |
| `corner-radius-600` | 9px |
| `corner-radius-700` | 10px |
| `corner-radius-800` | 16px |
| `corner-radius-1000` | 0.5 (비율) |

**3px부터 10px까지 1px 단위로 제공합니다.** 수집한 시스템 중 가장 세분화된 라운드 스케일입니다.

`corner-radius-1000`은 px이 아니라 `0.5` — 요소 크기의 50%를 뜻하며, 완전한 원형입니다.
큰 상수(9999px) 대신 비율을 쓰는 방식입니다.

### 보더 두께

`border-width-100` 1px · `border-width-200` 2px · `border-width-400` 4px

출처: `@adobe/spectrum-tokens@15.0.0` → `src/layout.json`

### 타이포그래피

~~미확인 — `src/typography.json` 확인 필요~~ → **해소 (2026-08-18,
`@adobe/spectrum-tokens@15.0.0` → `src/typography.json` 외 역할별 파일).**

**크기 스케일 18단이 전부 desktop/mobile 2벌**입니다. 스페이싱과 같은 `sets` 구조입니다.

| 토큰 | desktop | mobile | 짝 행간(desktop) | 짝 행간(mobile) |
|------|:---:|:---:|:---:|:---:|
| `font-size-25` | 10px | 12px | 12px | 14px |
| `font-size-50` | 11px | 13px | 14px | 16px |
| `font-size-75` | 12px | 15px | 16px | 20px |
| `font-size-100` | **14px** | **17px** | 18px | 22px |
| `font-size-200` | 16px | 19px | 20px | 24px |
| `font-size-300` | 18px | 22px | 22px | 26px |
| `font-size-400` | 20px | 24px | 24px | 28px |
| `font-size-500` | 22px | 27px | 26px | 32px |
| `font-size-600` | 25px | 31px | 30px | 36px |
| `font-size-700` | 28px | 34px | 32px | 40px |
| `font-size-800` | 32px | 39px | 36px | 44px |
| `font-size-900` | 36px | 44px | 42px | 50px |
| `font-size-1000` | 40px | 49px | 46px | 56px |
| `font-size-1100` | 45px | 55px | 52px | 64px |
| `font-size-1200` | 51px | 62px | 58px | 72px |
| `font-size-1300` | 58px | 70px | 66px | 80px |
| `font-size-1400` | 65px | 79px | 74px | 90px |
| `font-size-1500` | 73px | 88px | 84px | 102px |

- 기본 본문은 `font-size-100` = 데스크톱 14px · 모바일 17px입니다.
- 모바일 값이 데스크톱의 약 1.2배입니다 (10→12 · 14→17 · 36→44 · 73→88).
  소스에 배율 상수는 적혀 있지 않고 값만 나열돼 있습니다.
- **크기 단계마다 px 행간 토큰이 짝으로 있습니다** (`line-height-font-size-*`,
  같은 18단 × desktop/mobile). 비율 토큰(`line-height-100` 1.3 ·
  `line-height-200` 1.5)과 **px 행간이 둘 다 존재**합니다.

**굵기 토큰의 값이 숫자가 아니라 이름입니다.**

| 토큰 | 값 |
|------|-----|
| `light-font-weight` | `light` |
| `regular-font-weight` | `regular` |
| `medium-font-weight` | `medium` |
| `bold-font-weight` | `bold` |
| `extra-bold-font-weight` | `extra-bold` |
| `black-font-weight` | `black` |

숫자 매핑(300/400/500…)은 토큰 파일에 없습니다 — 가변 서체
`Adobe Clean Spectrum VF`의 인스턴스 이름을 그대로 값으로 씁니다.

서체: `sans-serif-font-family` = **Adobe Clean Spectrum VF**,
`serif-font-family` = Adobe Clean Serif, `cjk-font-family` = **Adobe Clean Han**.
자간은 `letter-spacing` = `0em` 하나이고, `detail` 역할만 `0.06em`으로 따로 둡니다.
스타일(`normal`/`italic`)·정렬(`start`/`center`/`end`)도 토큰입니다.

#### 역할 스케일 — 라틴/CJK 2벌

역할별 파일(`heading.json` 98 · `detail.json` 69 · `body.json` 47 ·
`title.json` 45 · `code.json` 31)이 있고, **모든 역할에 `-cjk-` 쌍이 있습니다** —
서체·굵기·행간·크기 전부 별도 값입니다.

| 역할 크기 | 라틴 (desktop) | CJK (desktop) |
|------|:---:|:---:|
| `heading-size-xxs` | 14px | 14px |
| `heading-size-xs` | 18px | 16px |
| `heading-size-s` | 20px | 18px |
| `heading-size-m` | 22px | 20px |
| `heading-size-l` | 28px | 25px |
| `heading-size-xl` | 36px | 32px |
| `heading-size-xxl` | 45px | 40px |
| `heading-size-xxxl` | 58px | 51px |
| `heading-size-xxxxl` | 73px | 65px |
| `body-size-xxs` | 11px | 10px |
| `body-size-xs` | 12px | 11px |
| `body-size-s` | 14px | 12px |
| `body-size-m` | 16px | 14px |
| `body-size-l` | 18px | 16px |
| `body-size-xl` | 20px | 18px |
| `body-size-xxl` | 22px | 20px |
| `body-size-xxxl` | 25px | 22px |

**CJK 크기가 같은 역할에서 스케일 한 단계 아래입니다** (`body-size-m` 16px ↔
`body-cjk-size-m` 14px = `font-size-100`). 행간은 반대로 올립니다:

| | 라틴 | CJK |
|---|:---:|:---:|
| `heading-line-height` | 1.3 | **1.5** |
| `body-line-height` | 1.5 | **1.7** |

`title`·`code`·`detail`은 xs~xl 5단(`title`만 xxl·xxxl 추가)이고 같은 구조입니다.
제목 굵기는 라틴·CJK 모두 `extra-bold`입니다.

### 컬러

~~미확인 — `src/color-*.json` 확인 필요~~ → **해소 (2026-08-18).**
전체 헥스 나열은 하지 않습니다 (`../SCHEMA.md`) — 구조만 적습니다.

**3계층입니다.**

| 계층 | 파일 | 토큰 수 |
|------|------|:---:|
| 원시 팔레트 | `src/color-palette.json` | **369** |
| 시맨틱 램프 | `src/semantic-color-palette.json` | 94 |
| 역할 별칭 | `src/color-aliases.json` | 170 |

#### 원시 팔레트 — 18색 × 16단

- **유채색 18계열**(blue · brown · celery · chartreuse · cinnamon · cyan ·
  fuchsia · green · indigo · magenta · orange · pink · purple · red · seafoam ·
  silver · turquoise · yellow) 각 **16단**(100~1600, 100 간격) = 288개.
- `gray`만 **13단**입니다 — 하단에 25 · 50 · 75를 추가하고 이후 100~1000.
- **알파 계열이 따로 있습니다**: `transparent-black-*` · `transparent-white-*`
  각 13단(25~1000). `transparent-black-100`이 `rgba(0,0,0,0.09)`,
  `-1000`이 완전 불투명입니다.
- **테마 무관 계열 `static-*` 11계열 40개** — 라이트/다크에서 값이 같습니다
  (`static-blue`는 900·1000 2단만, `static-fuchsia`·`static-indigo`·
  `static-magenta`·`static-red`는 5단). 그 외는 400/600/800 3단.
- `black` · `white` 2개.

#### 테마 3벌 — light / dark / **wireframe**

색 토큰의 `sets`가 **`light`·`dark`·`wireframe`** 셋입니다
(스페이싱의 `desktop`/`mobile`과 같은 메커니즘). 팔레트 369개 중 301개가
3벌을 갖고, 나머지 68개(`static-*`·`transparent-*`·`black`·`white`)는 단일 값입니다.

**단계 번호가 명도가 아니라 "배경으로부터의 거리"입니다.**

| 토큰 | light | dark |
|------|-------|------|
| `gray-25` | `rgb(255,255,255)` | `rgb(17,17,17)` |
| `gray-1000` | `rgb(0,0,0)` | `rgb(255,255,255)` |

같은 단계가 라이트에서는 밝고 다크에서는 어둡습니다 — **다크 테마에서 램프
방향이 통째로 뒤집힙니다.** 소비자는 같은 토큰 이름을 쓰고 테마가 방향을 결정합니다.

#### 시맨틱 램프 — 램프 통째로 별칭

`semantic-color-palette.json`은 **개별 토큰이 아니라 16단 램프 전체를 별칭**합니다.

```
accent-color-100 … accent-color-1600      → {blue-100} … {blue-1600}
informative-color-*  → blue-*      negative-color-*  → red-*
notice-color-*       → orange-*    positive-color-*  → green-*
```

5개 의미 × 16단 = 80개 + `*-subtle-background-color-default` 5개 +
`icon-color-*` 5종(informative · negative · neutral · notice · positive) +
`negative-subdued-background-color-*` 4상태 = 94개.

**의미 하나에 색 하나가 아니라 램프 하나를 배정하는 방식입니다.**

#### 역할 별칭 — 상태를 이름에 넣습니다

`color-aliases.json` 170개. 상태 접미가 `-default` · `-hover` · `-down` ·
`-key-focus` · `-selected`입니다 (`down`은 눌린 상태, `key-focus`는 키보드 포커스).

| 계열 | 예 |
|------|-----|
| 배경 층 | `background-base-color` · `background-layer-1-color` · `background-layer-2-color` · `background-elevated-color` · `background-pasteboard-color` |
| 의미 | `accent-*` · `negative-*` · `positive-*` · `informative-*` · `notice-*` · `neutral-*` |
| 색상별 | 18색 각각 `{색}-background-color-default` · `{색}-subtle-background-color-default` · `{색}-visual-color` |
| 고정 대비 | `static-black-*` · `static-white-*` (텍스트·포커스링·트랙) |
| 비활성 | `disabled-background-color` · `disabled-border-color` · `disabled-content-color` + `static-black`/`static-white` 판 |
| 그림자 | `drop-shadow-*` 16개 (elevated · emphasized · dragged · transition) |
| 불투명도 | `background-opacity-*` 4상태 · `opacity-disabled` · `overlay-opacity` |

**색 값 표기가 `rgb()`/`rgba()` 함수 문자열입니다** — 헥스가 아닙니다
(`"rgb(142, 185, 252)"`). 코퍼스에서 원시 팔레트를 헥스가 아닌 함수 표기로
배포하는 것은 Spectrum과 Polaris입니다.

## 컴포넌트

토큰 파일 구조에서 확인된 컴포넌트(일부): accordion, action-bar, action-button, alert-banner,
alert-dialog, avatar, breadcrumbs, button, card, checkbox, coach-mark, color-picker 계열,
combo-box, contextual-help, date-field, date-picker, divider, drop-zone, field, help-text,
floating-action-button, form-item.

토큰이 컴포넌트별 JSON 파일로 분리돼 있어, 파일 목록 자체가 컴포넌트 목록에 가깝습니다.

### 심화 (2026-08-17, `@spectrum-css/button@14.2.0` + `@spectrum-css/tokens@16.0.2`)

**플랫폼 스케일 2벌의 실값이 확보됐습니다** — 컴포넌트 공용 높이 스케일
`--spectrum-component-height-*`가 medium(데스크톱)/large(터치) 두 파일로
배포됩니다:

| 단계 | 75 | 100(버튼 기본) | 200 | 300 | 400 | 500 |
|------|:--:|:--:|:--:|:--:|:--:|:--:|
| medium | 24 | **32** | 40 | 48 | 56 | 64 |
| large | 30 | **40** | 50 | 60 | 70 | 80 |

- **터치 스케일 = 데스크톱 × 정확히 1.25** — 전 단계 일괄 배율입니다.
  SLDS(개별 터치 토큰)·Polaris(브레이크포인트 분기)와 같은 문제를
  **스케일 통째 교체**로 푸는 세 번째 방식.
- 높이가 컴포넌트 토큰이 아니라 **공용 `component-height` 스케일 참조**
  — Carbon의 컨텍스트 크기와 같은 "공유 높이 눈금" 계열.
- 오버라이드 층이 3단: `--mod-button-*`(소비자 공개) →
  `--spectrum-button-*`(컴포넌트) → 전역 토큰. SLDS 훅과 같은 구조를
  `mod` 접두로 명시합니다.

## 특징적 결정

- **토큰마다 desktop/mobile 값을 따로 가질 수 있습니다.** `sets` 구조로 표현됩니다.

  ```
  base-padding-horizontal-medium  [desktop] 12px  [mobile] 10px
  accordion-top-to-text-spacious-medium  [desktop] 13px  [mobile] 15px
  ```

  플랫폼 분기를 구현이 아니라 **토큰 레이어에서** 해결합니다. GOV.UK가 브레이크포인트를,
  Cloudscape가 밀도를 토큰에 내장한 것과 같은 계열의 발상이되, 적용 범위가 훨씬 넓습니다.

- **컴포넌트 토큰에 홀수 값이 대량으로 등장합니다.** 3·5·7·9·11·13·15·17·19px이
  `base-padding-vertical-*`, `accessory-gap-*` 등에 쓰입니다. 공개 스페이싱 스케일
  (1·2·4·6·8·12·16…)과 맞지 않습니다. **Spectrum은 원시 스케일을 강제하지 않습니다.**

- **라운드가 1px 단위입니다.** 3~10px 구간을 8단계로 나눕니다.
  대부분의 시스템이 2·4·8·12·16으로 성기게 두는 것과 정반대입니다.

- **원형을 비율(0.5)로 표현합니다.** Polaris(9999px)·Fluent(10000px)의 큰 상수 방식과 다릅니다.

- **모바일 값이 데스크톱보다 큰 경우가 있습니다.** `accordion-top-to-text-spacious-medium`은
  desktop 13px, mobile 15px입니다.

- **CJK를 서체 교체가 아니라 스케일 2벌로 다룹니다** (2026-08-18). 모든 타이포
  역할에 `-cjk-` 쌍이 있고, **크기는 한 단계 낮추고 행간은 올립니다**
  (본문 16→14px, 행간 1.5→1.7). 코퍼스의 다른 CJK 대응 표본은 서체 매핑이나
  행간 분기 한 축만 건드리는데, Spectrum은 크기·행간·굵기·서체 전부를 별도 축으로 둡니다.

- **다크 테마에서 램프 방향이 뒤집힙니다.** `gray-25`가 라이트에서 흰색,
  다크에서 `rgb(17,17,17)`입니다. 단계 번호가 명도가 아니라 배경으로부터의 거리입니다.

- **의미(semantic)에 색이 아니라 램프를 배정합니다.** `accent-color-100`~`1600`
  16단 전체가 `blue-*` 램프의 별칭입니다. 시맨틱 층이 보통 "역할 → 색 한 개"인
  것과 다릅니다.

- **굵기 토큰 값이 숫자가 아니라 이름입니다** (`extra-bold` · `black`).
  가변 서체 인스턴스 이름을 그대로 값으로 쓰고, 숫자 매핑은 토큰에 없습니다.

## 접근성

`accordion-focus-indicator-gap: 2px` 등 포커스 인디케이터 관련 토큰이 컴포넌트별로 존재합니다.
~~명시적 준수 목표는 미확인.~~ → **부재 재확인 (2026-08-18, 문서 사이트 헤드리스 렌더).**

접근성 문서에 해당하는 **Inclusive design** 페이지를 렌더해 전문을 읽었습니다.
원칙(Assume nothing is perfect · Make room to adapt · Give people a choice ·
Avoid distractions · Be consistent · Involve marginalized users)과 체크포인트
(구조·색·Windows 고대비 모드·애니메이션·인터랙션·대체 텍스트·서체와 텍스트·
오류 예방·키보드 등가)로 구성돼 있고, **준수 등급(AA/AAA)이나 목표 버전을 선언한
문장은 없습니다.** WCAG는 근거로만 인용됩니다 — 대체 텍스트 예외를
"Guideline 1.1 Text Alternatives in the **WCAG 2.1** standards"로 참조하고,
자료 목록에 WCAG와 "Techniques for WCAG 2.1"을 겁니다.
구체 수치로는 **웹 페이지 폭 320px까지 대응**, 한 줄 최대 **50–75자**
(한 열 폭은 80자 / **CJK 40자**), **초당 3회 이상 점멸 금지**가 있습니다.
출처: https://spectrum.adobe.com/page/inclusive-design/ (2026-08-18 헤드리스 렌더)

## 참고

- 저장소: https://github.com/adobe/spectrum-tokens
- 패키지: `@adobe/spectrum-tokens` (토큰 원본), `@spectrum-css/tokens` (CSS 빌드)
- 문서 사이트: https://spectrum.adobe.com — SPA라 curl로는 빈 셸만 오지만
  **2026-08-18 헤드리스 렌더로 본문 열람 성공** (`/page/inclusive-design/` ·
  `/page/ui-kits/`)
- **디자인 킷 — 확인 필요 (2026-08-18, 헤드리스 렌더):** `/page/ui-kits/`는
  **"These UI kits are available as XD files and contain resources for both scales
  (desktop and mobile) and all color themes"**라고 씁니다. 루트의 다운로드 묶음도
  **Adobe XD 플러그인 · UI 킷(XD) · 폰트 · 아이콘**이고, 문서 사이트에서 Figma
  킷을 안내하는 문구는 나오지 않습니다(사이트 CMS에 `patterns_figma_url` 필드가
  있지만 렌더한 페이지들에서 값이 `null`).
  → **정정 완료 (2026-08-18).** `figma_kit`을 `true` → **`false`**로 고쳤습니다.
  근거 3가지: ① UI 킷 페이지가 "available as **XD files**"라고 명시,
  ② 사이트 CMS의 `patterns_figma_url` 필드가 `null`,
  ③ 다운로드 목록이 XD 플러그인·XD 킷·폰트·아이콘뿐.
  기존 `true`는 출처 없이 들어가 있던 값입니다.
  **주의:** 이는 공식 문서 사이트 기준 판정입니다 — 사내·커뮤니티 Figma 킷의
  존재 여부까지 부정하는 것은 아닙니다.
  **부수 관찰:** 코퍼스의 USWDS 항목은 "Adobe가 XD를 더는 지원하지 않아
  XD 자산을 중단했다"고 기록합니다. Spectrum이 여전히 XD 킷을 1차 배포로
  두는 것과 나란히 놓으면, **도구 제공자 본인이 자사 단종 도구에 남아 있는
  상태**로 읽힙니다 — 다만 Adobe의 XD 정책 자체는 이 코퍼스에서 확인하지
  않았으므로 관찰로만 적습니다.
  자사 도구(XD)를 쓰는 조직이라 표본 안에서도 예외적인 자리입니다.
  출처: https://spectrum.adobe.com/page/ui-kits/ · https://spectrum.adobe.com/
