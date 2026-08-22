---
name: Auro
org: Alaska Airlines (Alaska Air Group)
coverage: partial
url: https://auro.alaskaair.com
repo: https://github.com/AlaskaAirlines/AuroDesignTokens
license: Apache-2.0
tech: [Web Components, CSS]
figma_kit: false
tokens_format: [CSS, SCSS, JSON, JS]
a11y_target: "WCAG 2.0 AA — 부분 준수(partially conformant) 자체 선언 (2026-08-18 확인)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @aurodesignsystem/design-tokens@9.3.3 → dist/web/{alaska,hawaiian,atmos}.min.css, JSONVariablesNested--atmos.json · npm @aurodesignsystem/auro-button@12.3.2 · @aurodesignsystem/auro-input@4.3.4 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](auro.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Alaska Air Group의 시스템. **항공사 브랜드 3벌**(alaska · hawaiian · atmos)이
**같은 290개 키에 값 162개만 교체**됩니다 — 합병이 토큰 계약으로 표현된 사례입니다.

## 토큰 — 브랜드 3벌, 키 동일

| 테마 | 성격 |
|------|------|
| `alaska` | Alaska Airlines 본 브랜드 |
| **`hawaiian`** | **Hawaiian Airlines** (2024년 인수) |
| `atmos` | 통합 로열티 프로그램 |

```
공통 키 290 / 값이 다른 키 162 (56%)
```

**Paste(SendGrid 멀티브랜드) · Helios(제품별 색) · Atlassian(rovo) 계열의
다중 브랜드 축**인데, Auro는 **인수한 타사 브랜드를 같은 토큰 계약에 얹은**
유일한 사례입니다. 컴포넌트는 그대로 두고 CSS 파일만 바꾸면 항공사가 바뀝니다.

**포커스 색까지 브랜드별입니다** — `state-focused`가 alaska `#463c8f`(보라) /
hawaiian `#101d2c`(남색). Radix Themes가 포커스를 강조색에서 분리해 고정하는 것과
반대로, Auro는 포커스가 브랜드를 따라갑니다.

### 계층 — `basic` / `advanced` 2층

```
basic.color    89개   (texticon · surface 등 기본 시맨틱)
advanced.color 165개  (header · dropdown · interactive 등 컴포넌트 근접)
basic.type     36개
```

원시/시맨틱이 아니라 **시맨틱을 깊이로 2등분**한 구조입니다 —
`advanced`가 Astro UXDS의 component 층에 가까운 자리입니다.

### 타이포그래피 — 세리프 디스플레이

| 계열 | 서체 |
|------|------|
| display | **Teodor (세리프)** — 폴백 Georgia |
| heading · body · accent | AS Circular (전용 산세리프) |

**디스플레이만 세리프입니다.** 표본에서 세리프를 토큰 계열로 두는 것은
Carbon(IBM Plex Serif)과 Auro 둘이며, Auro는 디스플레이 전용입니다.

`brand-*` 접두 계열(`brand-family-primary` 등)이 일반 계열과 별도로 있습니다 —
Atlassian의 Charlie(브랜드 서체 분리)와 같은 구조입니다.

자간이 **accent 0.05em / accent2 0.10em** 두 단계 양수입니다.
행간에 비율(1.3)과 rem(1.625rem)이 **섞여 있습니다** — 계열별로 단위가 다릅니다.

## 컴포넌트

`@aurodesignsystem/auro-*` Web Components 패키지군(Lit).
→ 버튼·입력·다이얼로그는 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`@aurodesignsystem/auro-button@12.3.2` · `@aurodesignsystem/auro-input@4.3.4` · `auro-dialog@4.2.0` dist 번들의
임베디드 CSS를 파싱하고, 버튼은 소스 SCSS(`AlaskaAirlines/auro-button`
`src/styles/{style,shapeSize}.scss`)로 교차 확인했습니다.

### 버튼 — shape × size 매트릭스 (`@aurodesignsystem/auro-button@12.3.2`)

크기가 컴포넌트 개별값이 아니라 **`$sizeMap` × `$shapeConfig` 생성 매트릭스**입니다
(shape 6종 rounded·pill·pill-left·pill-right·circle·square × size 5단 = 30 클래스).

| size | 시각 높이 | pill 라운드 | 좌우 여백(contentWrapper) |
|---|:--:|:--:|:--:|
| xs | 24px | 12px | 12px |
| sm | 36px | 18px | 16px |
| **md (기본)** | **48px** | 24px | **24px** |
| lg | 56px | 28px | 32px |
| xl | 72px | 36px | 40px |

- **높이가 min-height와 max-height 동시 지정 — 완전 고정**입니다. CSS는
  content-box라 클래스에는 `높이 − 2×보더`가 적힙니다 (md rounded = 44px + 2px×2).
  보더 변형(default 2px / thin 1px / simple 0)마다 min/max를 재계산해
  **시각 높이를 불변으로 유지**합니다.
- **좌우 여백이 패딩이 아닙니다** — `.auro-button`의 `padding`을 `padding-inline:unset`으로
  지운 뒤 내부 `.contentWrapper`의 `margin-inline`으로 크기별 여백을 줍니다.
- 라운드: rounded **6px**(xs만 4px) · pill = 높이/2 · circle 50%. 기본 shape는 rounded.
- 서체: size별 타입 클래스 매핑 — sm `body-sm`(14) / **md `body-default`(16px/24px)** /
  lg·xl `body-lg`(18). 굵기는 body 계열 공통 **450**. 아이콘 전용은 heading 계열로 전환.
- **min-width 없음** (circle/square만 min/max-width = 높이+보더).
- active가 `transform: scale(0.95)` — 눌림을 축소로 표현.
- 포커스: outline이 아니라 **inset box-shadow**, 두께가 variant×shape×size 맵으로
  개별 지정 — lg circle primary는 **3.33px** 같은 소수 두께까지 있습니다.
- 색은 전부 `--ds-auro-button-*` → `--ds-advanced-color-button-*` 폴백 체인 —
  토큰 절의 **`advanced` 층이 컴포넌트 색의 실제 공급원**임이 확인됩니다.
- 변형: primary(기본) · secondary · tertiary · ghost · flat + `ondark`/`appearance=inverse`.

### 입력 (`@aurodesignsystem/auro-input@4.3.4`) — 내장 플로팅 라벨

| | 값 |
|---|---|
| **높이** | min·max **58px** 고정 (`--ds-size-700`(56px) + `--ds-size-25`(2px)) |
| 패딩 | 상 32px(라벨 몫) / 하 4px / 좌우 0 |
| 기본 모양 | **상하 1px 보더**(밑줄형) — `bordered` 속성 시 1px 전체 보더 + 라운드 6px(`--ds-border-radius: 0.375rem`) |
| 라벨 | absolute 플로팅 — 중앙 → 상단 2px·12px 축소, `all 300ms cubic-bezier(0.215, 0.61, 0.355, 1)` |

- 크기 변형이 없습니다 — 58px 단일. 버튼 매트릭스(5단)와 대조적.
- **font-size에 사이즈 토큰(`--ds-size-200`, 1rem)을 씁니다** — 타이포 토큰이 아니라
  치수 토큰을 글자 크기에 쓰는 드문 표기.
- 컴포넌트 CSS 폴백에서 **`--ds-size-*` 번호 체계가 드러납니다** — 50=4px ·
  100=8px · 150=12px · 200=16px · 300=24px … **번호 = rem×200** (Helios·KRDS 계열).
  토큰 절의 "스페이싱 미노출" 공백을 컴포넌트 층이 메웁니다.

### 다이얼로그 (`auro-dialog@4.2.0`) — 데스크톱 다이얼로그 / 모바일 바텀시트

| size | <768px (max-height) | ≥768px (max-width) | ≥1024px (max-width) |
|---|:--:|:--:|:--:|
| sm | 30% | 40% | **740px** |
| md | 50% | 70% | **986px** |
| 기본 | 90% | 80% | **986px** |

- **모바일에서 다이얼로그가 아니라 바텀시트입니다** — `bottom:-100% → 0` 슬라이드업,
  `opacity/visibility/bottom 300ms ease-in-out`. 크기 속성이 데스크톱에선 폭을,
  모바일에선 **높이**(30/50/90%)를 바꿉니다.
- 데스크톱 폭 상한이 986px(md·기본 공유)로, 단계 실질 2개(740/986)뿐입니다.
  별도 `lg` 속성은 폭이 아니라 **sm/md의 max-height를 80~90%로 되올리는 높이 수정자**입니다.
- 패딩: 데스크톱 `0 64px 64px`(`--ds-size-800`) / sm은 48px / 모바일 `0 32px 32px`.
  헤더 padding-top 64px. **라운드 선언 없음(0)** — 각진 모달.
- 오버레이 전환이 `cubic-bezier(.4, 0, .2, 0)`·`(.4, 0, .5, 0)` — **y2=0인 비표준
  커브**입니다 (Material `(.4,0,.2,1)`과 마지막 좌표만 다름. 의도인지 오기인지는 미확인).

### 특징적 결정 (심화분)

- **shape×size 생성 매트릭스 + 보더 두께별 높이 재계산** — 시각 높이 불변 원칙
- **여백을 패딩이 아니라 내부 margin-inline으로** — 표본 드묾
- **포커스 링 두께가 variant×shape×size 3축 맵** (3.33px 소수 포함)
- **모바일 = 바텀시트 전환** — 같은 컴포넌트가 뷰포트로 패턴을 바꿈
- 버튼 굵기 450 — 볼드 진영(Backpack·Thumbprint 700)과 미디엄 진영 사이

## 특징적 결정

- **인수 브랜드를 같은 토큰 계약에 통합** — 290키 고정, 값 56% 교체. 표본 유일
- **포커스 색이 브랜드를 따라갑니다**
- **`basic`/`advanced` 시맨틱 2층** — 원시/시맨틱 분리와 다른 축
- **세리프 디스플레이** (Teodor) + 전용 산세리프(AS Circular)
- 행간 단위가 계열별로 혼재 (비율 / rem)

## 접근성

~~미확인.~~ → **해소 (2026-08-18, 헤드리스 렌더).**
브랜드별 `state-focused` 토큰이 있으나 대비 수치는 여전히 없습니다.

Auro는 코퍼스에서 드물게 **독립된 접근성 성명 페이지**를 둡니다 —
`/a11y-statement`, **W3C Accessibility Statement Generator Tool**로 2020-12-03 작성.

| 항목 | 내용 |
|------|------|
| 준수 목표 | **WCAG 2.0 Level AA** |
| 준수 상태 | **partially conformant (부분 준수)** — "some parts of the content do not fully conform" |
| 평가 방식 | **Self-evaluation (자체 평가)** — 외부 감사 없음 |
| 의존 기술 | HTML · WAI-ARIA · CSS · JavaScript |
| 피드백 | GitHub 이슈, **48시간 내 응답** 목표 |

두 가지가 특이합니다. 첫째, **2.1/2.2가 아니라 2.0**입니다 —
코퍼스에서 가장 낮은 버전 목표입니다(Backpack 2.2 AA · Canvas 2.1 A/AA와 대비).
둘째, **"부분 준수"를 문서에 명시**합니다. 대부분의 시스템이 목표만 적고
달성 여부를 말하지 않는 것과 달리, 미달을 성명에 적어 둔 사례입니다.

출처: https://auro.alaskaair.com/a11y-statement (렌더 확인, 2026-08-18)

## 참고

- 토큰: `npm pack @aurodesignsystem/design-tokens@9.3.3` → `dist/web/`
- 컴포넌트 심화: `@aurodesignsystem/auro-button@12.3.2` · `@aurodesignsystem/auro-input@4.3.4` ·
  `auro-dialog@4.2.0` (dist 번들 CSS + GitHub 소스 SCSS 교차 확인, 2026-08-18)
- 라이선스: 컴포넌트 패키지 package.json에 **Apache-2.0** 명기 — frontmatter 반영 (2026-08-18)
- **남은 확인 사항:** ~~스페이싱·라운드(변수에 미노출)~~ (2026-08-18 부분 해소 —
  컴포넌트 CSS 폴백에서 `--ds-size-*` = rem×200 체계·`--ds-border-radius` 6px 확인.
  단 design-tokens 패키지 자체의 전체 사이즈 스케일은 여전히 미확인),
  atmos 테마의 용도 상세, ~~라이선스~~ (Apache-2.0 — 2026-08-18),
  ~~figma_kit·a11y_target~~ (2026-08-18 해소/부재 확정)
- **Figma 킷 — 부재 확정 (2026-08-18, `figma_kit: false`)**:
  문서 사이트를 렌더해도 **Figma 킷·링크가 하나도 없습니다.**
  좌측 내비가 `Welcome / Design philosophy / Status / Releases / Support /
  Getting started(Engineering · Developer support · Design tokens · WCSS) /
  Contributing / CSS guidelines / Color / Typography / Icons / Voice and tone /
  Components / CSS / Dev resources`로 **전 구간이 엔지니어링 축**이고,
  디자이너용 섹션이나 킷 배포 안내가 존재하지 않습니다.
  사이트 전체 DOM에서 `figma.com` 링크 0건.
  → 토큰·웹컴포넌트는 npm으로 공개하지만 **디자인 소스는 공개하지 않는** 유형 (C 분류).
  렌더 확인: https://auro.alaskaair.com/ · https://auro.alaskaair.com/design-philosophy ·
  https://auro.alaskaair.com/a11y-statement (2026-08-18)
- **문서 사이트가 브랜드 3벌 테마 스위처를 노출합니다** (2026-08-18 렌더) —
  헤더에 `Site Theme: Alaska / Hawaiian / Atmos` 선택기가 있어,
  토큰에서 관찰한 3벌 구조가 문서 UI에도 그대로 드러납니다.
- **라이선스 해소 (2026-08-18):** `Apache-2.0` — 출처: github AlaskaAirlines/AuroDesignTokens → `LICENSE` (npm `@aurodesignsystem/design-tokens@9.3.3` 메타와 일치)
