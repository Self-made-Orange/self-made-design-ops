---
name: Astro UXDS
org: Rocket Communications
coverage: partial
url: https://astrouxds.com
repo: https://github.com/RocketCommunicationsInc/astro
license: 퍼블릭 도메인(미국 정부 발주) + 무제한 무상 라이선스
tech: [Web Components, React, Angular, Vue]
figma_kit: true
tokens_format: [JSON, SCSS, CSS]
a11y_target: 미확인
platform: web
domain: aerospace
verified: 2026-08-18
source: "npm @astrouxds/tokens@1.14.0 → dist/json/{base.reference,base.system,base.component,theme.light}.json · npm @astrouxds/astro-web-components@8.0.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](astro-uxds.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**우주 관제(mission control)용** 디자인시스템.
**보안 등급 색을 토큰으로 두고** 다크를 기본으로 하며, 토큰이 **3계층**입니다.

> **`domain: aerospace`를 새로 추가했습니다.** 기존 값(enterprise · consumer ·
> commerce · os · public · health · data · framework)으로 담을 수 없습니다 —
> 이 시스템의 결정 다수가 **위성·발사체 관제라는 사용 맥락**에서 나옵니다.

## 토큰 — 3계층

| 파일 | 토큰 수 | 층 |
|------|:---:|------|
| `base.reference.json` | **306** | 원시 (팔레트 · 서체 조합) |
| `base.system.json` | **50** | 시맨틱 (배경 · 텍스트 · 상태 · **등급**) |
| `base.component.json` | **280** | 컴포넌트별 |
| `theme.light.json` | **67** | 라이트 테마 오버라이드 |

**`reference` → `system` → `component`** 순서입니다.
표본에서 컴포넌트 층까지 토큰으로 두는 것은 Astro UXDS뿐입니다
(Cloudscape는 컨텍스트 오버라이드, Atlassian은 모션만 컴포넌트 단위입니다).

Seed Design의 `scale` / `static` / `semantic` 3계층과 층 수는 같지만
**세 번째 층의 성격이 다릅니다** — Seed는 고정값, Astro는 컴포넌트입니다.

`component` 층 280개의 분포:

| 컴포넌트 | 토큰 수 |
|----------|:---:|
| `push-button` | **30** |
| `notification-banner` | 25 |
| **`status-symbol`** | **20** |
| `button-color` | 14 |
| `button-padding` | 12 |
| `select-color` · `radio-control` · `button-icon` | 8 · 7 · 7 |

**`status-symbol`이 20개입니다** — 관제 화면의 상태 표시 아이콘 전용입니다.

### 다크가 기본입니다

**`theme.light.json`만 있습니다** (67개). 다크 테마 파일이 없습니다 —
`base.system.json`의 값이 이미 다크입니다.

```
color-background-base-default    = #101923   ← 거의 검정
color-background-surface-default = #1b2d3e
color-background-base-header     = #172635
```

표본에서 다크를 기본으로 두는 것은 **visionOS**와 Astro UXDS 둘입니다
(`patterns/color.md`). visionOS는 공간 UI라서, Astro는 **어두운 관제실**이라서입니다 —
다만 후자의 근거는 토큰 파일에 적혀 있지 않습니다.

**라이트 테마가 오버라이드 67개뿐입니다.** 시맨틱 50 + 일부 컴포넌트만 덮어씁니다.

## 보안 등급 색 — 표본에서 유일합니다

| 토큰 | 값 | 색 |
|------|:---:|------|
| `color-classification-unclassified` | `#007a33` | 녹 |
| `color-classification-cui` | `#502b85` | 자 |
| `color-classification-confidential` | `#0033a0` | 청 |
| `color-classification-secret` | `#c8102e` | 적 |
| `color-classification-topsecret` | `#ff8c00` | 주 |
| `color-classification-topsecretsci` | `#fce83a` | 황 |

**미국 정부 문서 분류 표시 규격을 토큰으로 옮긴 것입니다.**
`CUI`는 Controlled Unclassified Information, `SCI`는 Sensitive Compartmented Information입니다.

**색 순서가 심각도 램프가 아닙니다** — 녹 → 자 → 청 → 적 → 주 → 황입니다.
Cloudscape의 심각도(적→주→황)나 상태색(성공 녹 / 위험 적) 관행과 무관하게,
**외부 규격이 정한 색을 그대로 씁니다.**

**이게 도메인 제약이 토큰을 결정한 사례입니다.** 차량 플랫폼의
24sp 최소 폰트·64dp 터치 타겟과 같은 종류입니다 (`platforms.md`) —
디자인 판단이 아니라 **외부 요구사항**입니다.

## 상태색 — 6단계, 관제 어휘

| 토큰 | 값 |
|------|:---:|
| `color-status-critical` | `#ff3838` |
| `color-status-serious` | `#ffb302` |
| `color-status-caution` | `#fce83a` |
| `color-status-normal` | `#56f000` |
| **`color-status-standby`** | `#2dccff` |
| **`color-status-off`** | `#a4abb6` |

**`critical` → `serious` → `caution` → `normal`이 심각도 램프입니다** (적→주→황→녹).
Cloudscape의 `critical/high/medium/low`와 단계 수가 같고 **이름이 관제 어휘**입니다.

**`standby`와 `off`가 추가로 있습니다.** 장비 상태 표현이며,
표본의 다른 시스템에는 "대기 중"·"꺼짐"에 해당하는 상태색이 없습니다.

| 시스템 | 상태색 축 |
|--------|-----------|
| **Astro UXDS** | **심각도 4 + 장비 상태 2** (`standby` · `off`) |
| Cloudscape | 의미 4 + 심각도 5 |
| Atlassian | danger · warning · success · discovery · information |
| shadcn/ui | `destructive` 하나 |

**`normal`이 `#56f000`으로 형광 녹색입니다.** 어두운 배경 대비를 전제한 값이며,
일반 웹 시스템의 성공 색(Cloudscape `#00802f`)보다 훨씬 밝습니다.

## 데이터 시각화 색 — 8색, 전부 한색 계열

```
#00c7cb · #938bdb · #4dacff · #70dde0 · #c9c5ed · #92cbff · #a1e9eb · #b7dcff
```

**청록·연청·연자 계열만 있습니다.** 적·주·황·녹이 **의도적으로 빠져 있습니다** —
그 색들이 상태·등급에 배정돼 있기 때문입니다.

**표본에서 차트 팔레트가 상태색과 색상 영역을 나눠 쓰는 것은 Astro UXDS뿐입니다.**

| 시스템 | 차트 색 전략 |
|--------|-------------|
| Atlassian | 색상 구분 (`categorical` 16) |
| Cloudscape | 대비 비율 단계 (8색 × 10) |
| shadcn/ui | 단색 명도 램프 (5) |
| **Astro UXDS** | **한색 8색 — 상태색과 충돌 회피** |

관제 화면에서 차트 색이 경보 색과 겹치면 오독이 생기므로 분리한 형태입니다 —
**다만 그 근거는 토큰 파일에 없습니다.**

## 타이포그래피 — 복합 토큰 144개

`reference` 층의 서체 토큰이 계열별로 조합돼 있습니다.

| 계열 | 토큰 수 |
|------|:---:|
| `font-heading-*` | **56** |
| `font-body-*` | **48** |
| `font-display-*` | 16 |
| **`font-control-*`** | **16** |
| `font-monospace-*` | 8 |

**`font-control-*` 계열이 별도입니다** — 버튼·입력 같은 컨트롤 전용 텍스트입니다.
표본에서 컨트롤용 타이포 계열을 분리한 것은 Astro UXDS뿐입니다
(Helios가 `Code`를 분리하는 것과 같은 발상, 다른 대상).

한 스타일이 `font-family` · `font-size` · `font-weight` · `line-height` ·
`letter-spacing`으로 쪼개져 있어 토큰 수가 큽니다 —
`font-body-1-font-family` · `font-body-1-bold-font-family` 처럼
**굵기 변형까지 별도 토큰**입니다.

**서체는 전부 Roboto 폴백 스택입니다** — 계열이 5종인데 서체는 하나입니다.
Material 3과 같은 서체입니다.

크기 10단계 (`reference`):

| 토큰 | 값 | px |
|------|:---:|:---:|
| `xs` | 0.75rem | 12 |
| `sm` | 0.875rem | 14 |
| `base` | 1rem | 16 |
| `lg` | 1.125rem | 18 |
| `xl` | 1.25rem | 20 |
| `2xl` | 1.5rem | 24 |
| `3xl` | **1.75rem** | **28** |
| `4xl` | **2.125rem** | **34** |
| `5xl` | 3rem | 48 |
| `6xl` | 3.75rem | 60 |

**`4xl`이 2.125rem = 34px입니다.** 32도 36도 아닙니다 —
표본에서 34px은 Apple Large Title(34pt)과 같은 값입니다.

행간이 **크기와 별도 계열 9단계**입니다 — `2xs` 0.875rem(14) · `xs` 1rem(16) ·
`sm` 1.25(20) · `base` 1.5(24) · `lg` 1.75(28) · `xl` 2(32) · `2xl` 2.5(40) ·
`3xl` 3.5(56) · `4xl` **4.375rem(70)**.

**행간 단계 수가 크기보다 적습니다** (9 대 10) — Evergreen처럼
크기 배열과 행간 배열이 분리돼 조합을 구현이 결정합니다 (`patterns/typography.md`).

## 그 외

| 토큰 | 값 |
|------|:---:|
| `opacity-disabled` | **40%** |
| `border-width-focus-default` | **1px** |
| `spacing-focus-default` | 0.125rem (2px) |
| `color-border-focus-default` | **`#da9ce7`** (연자) |
| `color-background-transparent` | `#00000000` (8자리 헥스) |

**`opacity-disabled`가 40%로 Atlassian(0.4)과 같습니다** (`systems/atlassian.md`).

**포커스 보더가 1px입니다** — 표본에서 가장 얇습니다
(다수 2px, shadcn/ui 3px — `patterns/button.md`).
대신 `spacing-focus-default` 2px 간격을 둡니다.

**포커스 색이 연자색(`#da9ce7`)입니다** — 등급색 6종·상태색 6종과 겹치지 않는
색을 골랐습니다. Radix Themes가 `--focus-*`를 강조색과 독립적으로 두는 것과
같은 판단입니다 (`patterns/form.md`).

**스페이싱 스케일이 `system` 층에 없습니다.** `spacing-focus-default` 하나뿐이며,
여백은 `component` 층(`button-padding` 12개 등)에 컴포넌트별로 들어 있습니다.

## 컴포넌트

`@astrouxds/astro-web-components@8.0.0`으로 배포됩니다 (Web Components).
React · Angular · Vue 래퍼가 별도로 있습니다.

`component` 층 토큰에서 확인되는 것: `push-button` · `notification-banner` ·
`status-symbol` · `select` · `radio-control` · `button-icon`.
~~전체 목록은 확인하지 않았습니다.~~ → **45종 전수 확인** (아래 심화 절, 2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`@astrouxds/astro-web-components@8.0.0`의 `dist/collection/components/*/​*.css`에서
실측했습니다 (Stencil 빌드 — 컴포넌트별 CSS가 평문으로 남습니다). 디렉터리 45종:
버튼·폼·다이얼로그 외에 `rux-clock` · `rux-log` · `rux-monitoring-icon` ·
`rux-timeline` · `rux-global-status-bar` 같은 **관제 전용 컴포넌트**가 다수입니다.

### 버튼 (`rux-button`) — 높이 파생, 좌우 패딩은 고정

| | small | 기본 | large |
|---|:--:|:--:|:--:|
| 상하 패딩 | 4px | 8px | 12px |
| 좌우 패딩 | **16px** | **16px** | **16px** |
| 서체 | 16px / 20px / **400** | 동일 | 동일 |
| **파생 높이** | **28px** | **36px** | **44px** |

- 높이 선언이 없고 **행간 20px + 상하 패딩으로 파생**됩니다. 최소 너비도 없습니다.
- **크기 변형이 세로 패딩만 바꿉니다** — 좌우 16px은 3단 공통. 크기축을
  한 방향으로만 쓰는 드문 형태입니다.
- **서체가 16px·굵기 400 그대로입니다** — 컨트롤에 볼드를 얹지 않습니다
  (`font-control-body-1` 소비). Backpack의 16px·700과 정반대 판단입니다.
- 라운드 **3px** (`--radius-base`) — 토큰 파일의 값이 컴포넌트에서 실사용 확인.
- secondary 변형의 보더가 `border`가 아니라 **`box-shadow: … 0 0 0 1px inset`**입니다.
- 모든 값이 `var(--토큰, 폴백)` 쌍 — 3계층 토큰의 `component` 층이
  실제로 이 폴백 체인으로 배포됩니다.

### 입력 (`rux-input`) — 버튼과 같은 3단 파생

| | small | medium | large |
|---|:--:|:--:|:--:|
| 패딩 | 4px / 8px | 8px | 12px / 8px |
| **파생 높이** | **28px** | **36px** | **44px** |

- 내부 `<input>`이 **높이 20px 고정**(`--line-height-sm`)이고 래퍼 패딩이 크기를
  만듭니다 — 버튼과 정확히 같은 28/36/44 시스템입니다.
- 보더도 버튼 secondary처럼 **inset box-shadow 1px**(`#2b659b` muted)입니다 —
  hover 시 색만 `#92cbff`로 바뀝니다. 시스템 전체가 보더를 그림자로 긋습니다.
- 포커스가 토큰 그대로 **1px outline + 2px offset** (`#da9ce7`) — 버튼과 동일.
- 라운드 3px, 배경이 base 색(`#101923`) — 서피스보다 어둡게 파인 형태.

### 다이얼로그 (`rux-dialog`) — 448px 단일, 라운드 0

| 항목 | 값 |
|------|-----|
| 폭 | **28rem (448px) 고정** — 크기 변형 없음 |
| 라운드 | **없음 (0)** |
| 스크림 | rgba(0,0,0,.5) |
| 진입 | **fadeIn 0.5s** (페이드만) |
| 헤더 | `font-heading-2` 24px, 배경 `#172635` (본문 `#1b2d3e`와 분리) |
| 내용 패딩 | 16px |

- **폭이 한 단계뿐이고 모서리가 직각입니다** — Backpack 2단·MUI 5단과 대극인
  최소 구성. 헤더가 본문과 다른 배경색의 **밴드**로 분리됩니다.
- 0.5s 페이드는 표본 모달 중 가장 느린 축입니다 (Backpack 200ms · MUI 225ms).

### 특징적 결정 1 — `rux-classification-marking`

보안 등급 토큰 6종의 **소비처가 전용 컴포넌트**로 존재합니다.

- banner 변형: `min-height: 24px`, `position: sticky`, **uppercase 강제**, 굵기 700.
  화면 상단/하단에 고정되는 등급 표시 띠입니다.
- tag 변형: 14px·700, 패딩 4/12px, 라운드 3px — 인라인 등급 표.
- `top-secret`(주황)·`top-secret-sci`(황) 배경에서는 **텍스트가 검정으로 반전**됩니다 —
  밝은 등급색의 대비 확보가 컴포넌트 층에 하드코딩돼 있습니다.

### 특징적 결정 2 — 이징 토큰이 없습니다

버튼 CSS에 `transition` 선언이 없고 (hover가 즉시 전환), 다이얼로그는 `fadeIn 0.5s`
리터럴입니다. 토큰 3계층 636개에 모션 토큰이 0개인 것과 정합합니다 —
**모션을 사실상 시스템 밖에 둔** 형태입니다 (관제 UI에서 장식 모션 배제로 읽히나
근거 문서는 미확인).

### 특징적 결정 (심화분)

- **버튼·입력이 28/36/44px 파생 높이를 공유** — 내용 20px + 패딩 4/8/12
- **크기 변형이 세로만 바꿈** — 좌우 패딩 16px 3단 공통
- **컨트롤 서체 무볼드(400)** — `font-control-*` 분리의 실체는 굵기가 아니라 행간
- **보더를 inset box-shadow로 통일** (입력·버튼 secondary)
- **다이얼로그 448px 단일 + 라운드 0 + 0.5s 페이드**
- **등급 표시가 전용 컴포넌트** — 밝은 등급색의 검정 텍스트 반전 내장

## 특징적 결정

- **보안 등급 색 6종을 토큰으로 둡니다** (`unclassified` ~ `topsecretsci`).
  표본에서 유일하며, **외부 규격이 색을 정한** 사례입니다
- **`domain: aerospace`** — 기존 도메인 값으로 담을 수 없어 추가했습니다
- **다크가 기본입니다.** `theme.light.json`만 있고 다크 파일이 없습니다.
  visionOS와 함께 둘뿐입니다
- **토큰이 3계층이고 세 번째가 컴포넌트 층입니다** (280개).
  Seed Design의 3계층(`scale`/`static`/`semantic`)과 성격이 다릅니다
- **차트 색이 한색 8색으로 상태색과 색상 영역을 분리합니다.**
  적·주·황·녹을 차트에 쓰지 않습니다
- **상태색에 `standby`·`off`가 있습니다** — 장비 상태 표현.
  표본의 다른 시스템에 없습니다
- **`font-control-*` 계열을 분리합니다** — 컨트롤 전용 타이포
- **타이포 토큰이 144개입니다** — 굵기 변형까지 별도 토큰이라 수가 큽니다
- **포커스 보더가 1px로 표본 최소입니다** (+ 2px 간격)
- **포커스 색이 등급색·상태색과 겹치지 않는 연자색입니다**
- **스페이싱 스케일이 시맨틱 층에 없습니다** — 여백이 컴포넌트 층에 있습니다
- **`status-symbol` 컴포넌트에 토큰 20개**를 씁니다 — 관제 화면의 핵심 요소입니다

## 접근성

- `opacity-disabled: 40%`
- 포커스 보더 1px + 간격 2px + 전용 색
- **등급색·상태색이 색만으로 구분됩니다** — 토큰 레벨에서 아이콘·텍스트 병기 규정을
  확인하지 못했습니다. `status-symbol` 컴포넌트가 그 역할일 가능성이 있으나
  토큰만으로는 확정할 수 없습니다
- 명시적 WCAG 목표는 패키지에서 확인되지 않았습니다

## 참고

- 문서: https://astrouxds.com
- 저장소: https://github.com/RocketCommunicationsInc/astro
- 토큰: `npm pack @astrouxds/tokens@1.14.0` → `package/dist/json/*.json`
- 컴포넌트 심화: `npm pack @astrouxds/astro-web-components@8.0.0` →
  `dist/collection/components/*/​*.css` (2026-08-18)
- **`@astrouxds/design-tokens@2.0.0-beta.18`이 별도로 있습니다** — 차기 버전으로 보이며
  확인하지 않았습니다
- 라이선스: `package.json`은 **MIT**, 동봉 `LICENSE`는 Rocket Communications의
  자체 안내문(미 정부 계약 하 개발 명시) — 두 표기가 다릅니다.
  **frontmatter는 LICENSE 원문 기준으로 반영했습니다 (2026-08-18)**
- **남은 확인 사항:** ~~라이선스~~ ~~컴포넌트 목록~~ (2026-08-18 해소 — 심화 절),
  스페이싱 체계(컴포넌트 층 전수), `theme.light.json` 67개의 오버라이드 범위,
  등급 표시의 색 외 구분 수단(배너 컴포넌트가 텍스트 병기임은 확인)
- **라이선스 해소 (2026-08-18):** `퍼블릭 도메인(미국 정부 발주) + 무제한 무상 라이선스` — 출처: github RocketCommunicationsInc/astro → `LICENSE` — 미국 정부 발주 저작물로 미국 내 퍼블릭 도메인, 저작권 고지 유지 조건의 무상·전세계 라이선스
