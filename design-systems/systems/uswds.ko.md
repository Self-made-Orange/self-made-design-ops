---
name: USWDS (U.S. Web Design System)
org: 미국 연방정부 (GSA)
coverage: full
url: https://designsystem.digital.gov
repo: https://github.com/uswds/uswds
license: 퍼블릭 도메인(CC0-1.0, 미국 정부 저작물) + 폰트 SIL OFL-1.1 / 아이콘 Apache-2.0
tech: [Sass, CSS]
figma_kit: true
tokens_format: [Sass]
a11y_target: "WCAG 2.1 AA 목표 (법적 기준 2.0 AA 초과 달성 — 2.2·AAA 점진 지향, 2026-08-18 확인)"
platform: web
domain: public
verified: 2026-08-18
source: "npm @uswds/uswds@3.14.0 → packages/uswds-core/src/styles/tokens/{units,font}/*.scss"
---
<!-- lang-links -->
> [English](uswds.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

미국 연방정부 웹 디자인시스템. **8px 베이스**이며,
**브레이크포인트가 스페이싱 맵에서 파생**되고 음수 스페이싱이 **-120px까지** 갑니다.

**GOV.UK의 5px 베이스가 공공 계열 경향이 아니라는 두 번째 증거입니다** —
영·미 두 정부 시스템이 서로 다른 베이스를 씁니다 (GOV.UK 5px / USWDS 8px).

## 토큰

### 스페이싱 — 8px 베이스, `spacing-multiple()`

```scss
"05": spacing-multiple(0.5),   // 4px
1:    spacing-multiple(1),     // 8px
"105": spacing-multiple(1.5),  // 12px
2:    spacing-multiple(2),     // 16px
```

**키가 배수이고 소수는 문자열 인코딩입니다** — `0.5` → `"05"`, `1.5` → `"105"`,
`2.5` → `"205"`. 표본에서 소수점을 문자열로 접는 표기는 USWDS뿐입니다.

| 그룹 | 값 (px) |
|------|---------|
| `smaller` | 1 · 2 |
| `small` | 4 · 8 · 12 · 16 · 20 · 24 |
| `medium` | 32 · 40 · 48 · 56 · 64 · 72 · 80 · 120 |
| `large` | **160 (`card`) · 240 (`card-lg`) · 320 (`mobile`)** |
| `larger` | 480 (`mobile-lg`) · 640 (`tablet`) · 880 (`tablet-lg`) |
| `largest` | 1024 (`desktop`) · 1200 (`desktop-lg`) · 1400 (`widescreen`) |

코어 `4/8/16/24` + `32` 전부 있습니다. Ant Design의 시드 파생과 같은 계열이되
**함수 이름이 `spacing-multiple`로 베이스가 8px임을 드러냅니다.**

**스케일이 그룹 이름으로 계층화돼 있습니다** — `smaller`~`largest` 7그룹.
그리고 **큰 값의 키가 기기 이름입니다** (`mobile` · `tablet` · `desktop` · `widescreen`).

### 브레이크포인트가 스페이싱에서 파생됩니다 — 표본에서 유일합니다

```scss
$system-breakpoints: general.map-collect(
  map.get(spacing.$system-spacing, "large"),
  map.get(spacing.$system-spacing, "larger"),
  map.get(spacing.$system-spacing, "largest")
);
```

**별도 브레이크포인트 스케일이 없습니다.** 스페이싱 맵의 `large`~`largest` 그룹을
그대로 모아 브레이크포인트로 씁니다 — `mobile` 320 · `tablet` 640 ·
`desktop` 1024 · `widescreen` 1400.

Codex가 뷰포트를 `size-viewport-*`로 사이즈 스케일에 넣은 것보다 한 걸음 더 갑니다 —
**여백과 화면 폭이 같은 맵의 다른 구간입니다.**

### 음수 스페이싱 — -120px까지, 표본 최심

`neg-` 접두사로 **양수 스케일의 4~120px 전 구간이 음수로 미러링**됩니다.

| 시스템 | 음수 하한 |
|--------|:---:|
| Atlassian | -32px |
| Primer | -48px |
| **USWDS** | **-120px** |

앞의 둘은 "겹침 배치는 소규모 조정"이라는 판단을 공유했는데
(`systems/atlassian.md`), USWDS는 레이아웃 스케일까지 음수를 엽니다.
`-1px`·`-2px`(`smaller-negative`)도 있습니다.

### 타이포그래피 — 20단계, 12~18px 구간 1px 단위

```
10(micro) · 12 · 13 · 14 · 15 · 16 · 17 · 18 · 20 · 22 · 24 · 28 · 32 · 36 · 40 · 48 · 56 · 64 · 80 · 120
```

**12~18px이 1px 단위 7단계입니다.** Seed Design(10~16px 1px 단위)과 같은 촘촘함이며
구간이 한 칸 위입니다. 홀수 13·15·17이 다 있습니다.

행간 6단계 — `1` 1 · `2` 1.2 · `3` 1.35 · `4` 1.5 · `5` **1.62** · `6` 1.75.
**1.62가 있습니다** — 1.6도 1.625도 아닙니다.

`$project-type-scale`이 별도로 있고 `map-collect`로 시스템 스케일과 합쳐집니다 —
**프로젝트 확장 자리를 토큰 구조에 미리 둡니다** (`$theme-*` 설정 계열의 일부).

### 행폭(measure) — `ex` 단위 6단계

```scss
$system-measure-smaller: 44ex;
$system-measure-base:    64ex;
$system-measure-largest: 88ex;
```

**가독 행폭을 `ex`(x-height) 단위로 토큰화합니다.**
Open Props가 `ch`(글자 폭)로 `20ch/45ch/60ch`를 두는 것에 이어 두 번째 measure 토큰이며,
**단위가 다릅니다** — `ex`는 소문자 높이, `ch`는 `0`의 폭 기준입니다.

| 시스템 | 단위 | 값 |
|--------|:---:|-----|
| Open Props | `ch` | 20 · 45 · 60 |
| **USWDS** | **`ex`** | 44 · 60 · 64 · 68 · 72 · 88 |

## 컴포넌트

`packages/` 아래 `usa-*` 패키지로 분할돼 있습니다 (`usa-type-spacing` 등).

### 심화 (2026-08-17, `@uswds/uswds@3.13.0` packages/usa-button 등)

- **버튼**: 패딩 `units(1.5) units(2.5)`(12/20px), **굵기 bold**, 라운드
  `$theme-button-border-radius: "md"` — 값이 아니라 **설정 변수**입니다.
  치수·색·라운드 전부 `$theme-*` 설정 층을 거칩니다 — USWDS는
  "값을 주는 시스템"이 아니라 **설정으로 조립하는 시스템**임이 소스 구조에서
  분명해집니다 (NASA WDS가 이 설정 층을 덮어써서 만든 오버레이라는
  기존 기록과 맞물립니다).
- **outline 변형이 보더가 아니라 `inset box-shadow` 2px** — 크기 변화 없이
  테두리를 그리는 기법 (`$button-stroke: inset 0 0 0 2px`).
- `@media (forced-colors: active)` 분기가 컴포넌트 소스에 직접 —
  Windows 고대비 대응이 버튼 단위에 박혀 있습니다 (Clarity 계열).
- 입력은 `$theme-input-line-height: 3`(행간 3배) 등 역시 설정 구동.
  ~~`$theme-input-select-border-width: 2px` = GOV.UK·NHS식 2px 보더 관행~~ →
  **정정 (2026-08-18, nasawds 동봉 컴파일 CSS 실측):** 이 변수는
  **체크박스·라디오(select 계열) 전용**이고, 텍스트 입력의 실제 보더는
  **1px**입니다. GOV.UK·NHS(텍스트 입력 2px)와 같은 관행이 아닙니다.

## 특징적 결정

- **8px 베이스입니다.** GOV.UK(5px)와 정면으로 갈립니다 — 공공 도메인 3표본
  (GOV.UK · Codex · USWDS) 중 5px는 GOV.UK 하나입니다
- **브레이크포인트가 스페이싱 맵의 부분집합입니다.** 표본에서 유일합니다
- **큰 스페이싱의 이름이 기기입니다** (`card` · `mobile` · `tablet` · `desktop`)
- **음수 스페이싱이 -120px까지** — 표본 최심입니다
- **소수 키를 문자열로 인코딩합니다** (`"05"` = 0.5배)
- **12~18px 타이포가 1px 단위입니다** — Seed Design과 같은 촘촘함, 구간이 다름
- **행폭을 `ex` 단위로 토큰화합니다** — measure 토큰 두 번째 사례, 첫 `ex` 사용
- **`$project-*` 확장 슬롯이 토큰 구조에 내장돼 있습니다**

## 접근성

~~명시 목표는 패키지 소스에서 확인되지 않았습니다 (문서 사이트 미접근).
연방 조달 요건(Section 508) 관련 서술은 문서에 있을 것이나 **미확인**입니다.~~
→ **2026-08-18 해소** — 문서 사이트
<https://designsystem.digital.gov/documentation/accessibility/>에서 실측했습니다.

**Section 508과 WCAG의 관계를 문서가 직접 설명합니다.** 1973년 재활법
Section 508은 1998년 개정으로 연방기관의 정보기술 접근성을 의무화했고,
**2018년에 WCAG 2.0 Level AA 성공 기준을 편입**했습니다. 즉 법적 준수의
기준선이 2.0 AA입니다.

USWDS는 그 기준선 **위를 목표로 잡습니다**:

- "2.0 AA가 법적 준수의 기준선이지만, USWDS는 더 높은 기준인 **WCAG 2.1
  AA**를 달성하도록 노력한다 — 2.1 AA도 법적 요건을 충족한다"
- 2023년 10월 공개된 **WCAG 2.2는 현재 법적 요건이 아니지만** 최신 성공
  기준을 가능한 한 많이 달성하려 하며, **점진적으로 AAA를 지향**한다고
  적습니다
- 준수 입증 수단으로 **VPAT(Voluntary Product Accessibility Template)**
  기반 ACR을 발행합니다 — WCAG 2.0 기준 테스트를 **2025년 3월** 수행,
  보고서를 **2025년 5월** 공개했습니다
- 다만 "우리가 테스트한다고 당신 프로젝트의 준수가 보장되는 것은 아니다 —
  전면 WCAG 준수를 위해서는 직접 연구·테스트하라"는 책임 경계를 명시합니다

디자인 자산 쪽에도 같은 문구가 있습니다 — "모든 디자인은 WCAG 2.0 AA
가이드라인을 충족하며 재활법 Section 508을 준수한다"
(<https://designsystem.digital.gov/documentation/getting-started-for-designers/>).

컴포넌트별로는 `/components/<이름>/accessibility-tests/` 페이지가 **컴포넌트
수만큼(사이트맵 257개 URL 중 다수)** 별도로 존재합니다 — 접근성 테스트를
컴포넌트 문서와 동급의 URL 층으로 둔 표본 유일 구조입니다.

## 참고

- **3.14.0 재검증 — 기록 값 무변경 (2026-08-18).** 3.13.0과 토큰 디렉터리 전체를
  `diff -rq`로 대조: 차이는 2파일뿐입니다. `font/stacks.scss`는 **줄바꿈만 바뀐 포맷
  변경**(서체 스택 값 동일)이고, `color/assignments-theme-color.scss`는
  **`"ink"` 매핑이 `$theme-color-base-darkest` → `$theme-color-base-ink`로 실변경**입니다.
  후자는 이 항목이 아직 수집하지 않은 컬러 층이라 기록 값에는 영향이 없으나,
  **컬러를 수집할 때 이 변경 이후 값을 기준으로 삼아야 합니다.**

- **Figma 킷 (true) 근거:** 공식 Figma 디자인 킷 — 2024-11부터 제공, Sketch 병행 / Adobe XD 중단, 2026-08-18 확인

- 문서: https://designsystem.digital.gov (~~프록시 차단~~ → 2026-08-18 로컬 세션에서 접근 성공)
- 토큰: `npm pack @uswds/uswds@3.13.0` →
  `packages/uswds-core/src/styles/tokens/units/spacing.scss` · `font/type-scale.scss`
- **남은 확인 사항:** 컬러(공식 색상 팔레트 `$system-colors`) · 라운드 · 컴포넌트 치수 ·
  `$theme-*` 설정 전체 · ~~Section 508 서술~~ (2026-08-18 해소 — 접근성 절 참조)
- **Figma 킷 해소 (2026-08-18):** `figma_kit: true` — 출처
  <https://designsystem.digital.gov/documentation/getting-started-for-designers/>.
  "USWDS 3 디자인 자산은 **Figma와 Sketch** 형식으로 유지되며, **2024년
  11월부터 공식 USWDS Figma 디자인 킷을 제공**한다"고 명시합니다. 배포는
  두 경로 — GitHub(`uswds/uswds-for-designers` 리포)의 **Figma+Sketch 킷
  ZIP 17.6MB** 또는 **Figma 커뮤니티에서 직접 설치**. 2025-01-08 변경
  이력에 "**서드파티 Figma 킷 링크를 제거**했다"고 적혀 있어, 공식 킷
  도입과 함께 비공식 킷을 문서에서 걷어낸 것이 확인됩니다.
  **Adobe XD 자산은 유지 중단**(Adobe가 XD를 더는 지원하지 않아서)입니다
- **라이선스 해소 (2026-08-18):** `퍼블릭 도메인(CC0-1.0, 미국 정부 저작물) + 폰트 SIL OFL-1.1 / 아이콘 Apache-2.0` — 출처: github uswds/uswds → `LICENSE.md`. GSA 수정분은 CC0, 번들 폰트(Source Sans Pro·Merriweather·Public Sans)는 OFL-1.1, Material Icons 파생분은 Apache-2.0입니다
