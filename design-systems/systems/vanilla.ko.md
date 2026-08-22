---
name: Vanilla Framework
org: Canonical (Ubuntu)
coverage: partial
url: https://vanillaframework.io
repo: https://github.com/canonical/vanilla-framework
license: LGPL-3.0
tech: [SCSS]
figma_kit: true
tokens_format: [SCSS]
a11y_target: "WCAG 2.2 AA (명시 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm vanilla-framework@4.57.0 → scss/_settings_{spacing,font}.scss"
---
<!-- lang-links -->
> [English](vanilla.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Canonical(Ubuntu)의 시스템 — 텍스트 스타일마다 **베이스라인 보정값(`nudge`)을
토큰으로** 두고, 행간을 **8px 격자의 정수배**로만 정의하며, 스페이싱이
Lightning처럼 **수직/수평 분리**입니다.

## 토큰 — SCSS 변수 + 스타일별 맵

### 타이포 — 베이스라인 격자와 `nudge`

```scss
$settings-text-h1: (
  nudge: 0.55rem,          // 베이스라인 보정
  line-height: 6 * $sp-unit,  // 48px — 8px 격자 정수배
  font-size: 2.5,          // rem
  sp-after: $spv--x-large, // 요소 뒤 여백
  sp-before: $spv--x-large,
)
```

- **`nudge`** — 텍스트를 베이스라인 격자에 맞추기 위한 광학 보정값을
  스타일마다 토큰으로 둡니다 (display 0.35rem, h1 0.55rem…). **표본 유일.**
  "행간은 격자 정수배 + 서체 메트릭 오차는 nudge로 흡수"라는 구조입니다
- **행간이 전부 `n × 8px`** (display 88px, h1 48px…) — 행간을 격자
  정수배로만 두는 표본 유일 강제. 소수 행간(TDS)의 정반대 극단
- **스타일 맵에 `sp-before`/`sp-after`(전후 여백)가 포함**됩니다 —
  텍스트 스타일이 자기 마진을 데리고 다니는 구조 (TDS의 동반 요소 규격과
  같은 "묶음 배포" 판단, 대상이 여백)
- `$ms-ratio: 16/14` — 모듈러 스케일 비율을 소수가 아니라 **분수로 표기**
- `$increase-font-size-on-larger-screens: true` — 큰 화면에서 기본 크기를
  1.125배로 올리는 **뷰포트 조건 스위치** (Bootstrap `$enable-*` 계열의
  타이포판)

### 스페이싱 — 수직/수평 분리 + 스트립 계열

```scss
$sp-unit: 0.5rem (8px)
$spv--*  : 수직 (x-small 4 · small 8 · medium 12 · large 16 · x-large 24)
$sph--*  : 수평 (x-small 4 · small 8 · large 16 · x-large 24)
$spv--strip-shallow/regular/deep: 24 / 64 / 128px
```

- **`spv`(수직)/`sph`(수평) 접두 분리** — Lightning의 축 분리와 같은 판단.
  수평에는 medium이 없는 비대칭입니다
- **`strip` 계열** — 페이지 섹션(스트립) 전용 수직 여백 3단계 (24/64/128).
  레이아웃 층위의 여백을 컴포넌트 여백과 다른 이름 공간에 둡니다

## 컴포넌트

CSS 프레임워크형 배포(클래스 기반). ~~목록 미조사.~~
(2026-08-18 해소) `scss/_patterns_*.scss` **66개 패턴** — accordion · badge · buttons ·
card · chip · contextual-menu · forms · modal · navigation · notification · pagination ·
search-box · side-navigation · strip · table · tabs · tooltips 등.

## 컴포넌트 심화 — (2026-08-18)

`vanilla-framework@4.57.0`의 scss를 dart-sass로 **실제 컴파일해** 출력 CSS로 검증했습니다
(`@include vanilla` 전체 빌드, 14,237줄).

### 버튼 (`.p-button`) — 높이가 어디에도 안 적혀 있습니다

| | 기본 | small | dense |
|---|:--:|:--:|:--:|
| **파생 높이** | **36px** | ≈23px | 28px |
| 상하 패딩 | `calc(0.375rem − 1.5px)` = **4.5px** | `calc(0.05rem − 1.5px)` = **−0.7px** → 0 클램프 | 0.5px |
| 좌우 패딩 | 16px | 8px | 16px |
| 보더 | **1.5px** | 1.5px | 1.5px |
| 서체 | 16px / 24px / 400 | 14px / 20px | 동일 |
| 라운드 | **0** | 0 | 0 |

- **세로 패딩이 전부 `calc(nudge − border)` 산식입니다** — 토큰 층의 베이스라인
  `nudge`가 컴포넌트 패딩까지 지배합니다. 36px이라는 높이는 소스 어디에도 없고
  24(행간) + 4.5×2 + 1.5×2의 결과일 뿐입니다.
- **small의 세로 패딩이 계산상 음수(−0.7px)입니다** — small 텍스트의 nudge(0.05rem=0.8px)가
  보더(1.5px)보다 작아서. CSS 사용값에서 0으로 클램프되어 동작하지만, nudge 시스템이
  보더 두께와 충돌하는 모서리 사례입니다.
- **버튼이 자기 마진을 소지합니다** — `margin: 0 16px 20px 0`. 텍스트 스타일의
  `sp-before/after`와 같은 "여백 동반" 판단이 컴포넌트에도 적용된 형태입니다.
- **전환이 ease-in(가속) 곡선입니다** — `snap`(100ms) + `in` = `cubic-bezier(0.55, 0.055, 0.675, 0.19)`.
  컴파일 출력 전체에서 `in` 곡선은 버튼 기본 스타일 **1회뿐**이고 나머지 22회는 전부
  `out`입니다. `:active`에서는 `transition-duration: 0s`로 즉시 반응.
- 변형: plain(기본) · positive · negative · base(투명) + brand(폐기 예정). 최소 너비 없음.

### 입력 — 밑줄만 보더입니다

- 파생 높이 **36px** (버튼과 같은 패딩 산식 `%bordered-text-vertical-padding` 공유) —
  버튼·입력이 같은 높이에 도달하는 경로 자체가 공유 플레이스홀더입니다.
- **보더가 아래에만 보입니다** — `border-bottom: 1.5px solid`, 상단은 **투명 1.5px**
  (높이 보존용), 좌우 0. `border-radius: 0` 명시. 채움 배경 + hover 배경 변화
  (fast 165ms `out`) — Material filled의 각진 사촌 격입니다.
- `margin-bottom: 20px` 동반, `min-width: 8em`.
- 라벨은 별도 블록 — line-height 24px, `padding-top: 6px`(자기 nudge), 아래 10px.
  필수 표시는 `.is-required::before { content: '* ' }`.

### 모달 (`.p-modal`) — 폭 단계도 애니메이션도 없습니다

- **폭 단계가 없습니다**: `width: auto` + `max-width: 80rem(1280px)` = 그리드 최대폭.
  콘텐츠가 폭을 결정하고 상한만 레이아웃 값입니다.
- 패딩 16px — 카드와 같은 `%vf-card-padding`을 그대로 확장. 헤더는 sticky
  (padding-top 16px, 아래 8px), 푸터 상단 보더 + 16px.
- **진입 애니메이션이 없습니다** — 모달 스타일에 transition·keyframes 0건. 즉시 출현.
- 라운드 0, z-index 150, 스크림 `$color-dark` 알파 85%.
- 제목이 heading-4 상속 — 24px / 32px / **굵기 275** (Ubuntu variable의 라이트 축).

### 특징적 결정 (심화분)

- **컴포넌트 높이가 토큰이 아니라 nudge 산식의 파생값** — 36px은 기록되지 않은 결과물
- **1.5px 보더** — 버튼·입력 공통. 정수 px 보더 다수 진영과 갈리는 소수(小數) 보더
  (이번 표본에서는 FT Origami o3의 입력 1.5px와 같은 값)
- **버튼만 ease-in 곡선 + :active 0초** — hover는 가속, 누름은 즉시
- **라운드 0 전면** — badge(1rem pill)를 빼면 컴포넌트 층에서 radius가 사실상 부재
- 지속시간 토큰 이름이 snap/fast/brisk/slow/sleepy — 수치 대신 성격 형용사 명명

## 특징적 결정

- **`nudge` 베이스라인 보정 토큰** — 표본 유일
- **행간 = 8px 격자 정수배 강제** — 표본 유일
- 텍스트 스타일이 전후 여백(`sp-before/after`)을 동반
- 수직/수평 스페이싱 분리 (Lightning 계열) + `strip` 레이아웃 여백
- 모듈러 비율을 분수(16/14)로 표기
- 뷰포트 조건 스위치(큰 화면 ×1.125)

## 접근성

~~미확인.~~ → **WCAG 2.2 level AA (2026-08-18 해소).**
출처: `vanillaframework.io/accessibility` — "aim to comply with the Web Content
Accessibility Guidelines (WCAG) 2.2, level AA".

## 참고

- 토큰: `npm pack vanilla-framework@4.57.0` → `scss/_settings_*.scss`
- 컴포넌트 심화: 같은 패키지의 `_base_button.scss` · `_base_forms.scss` ·
  `_patterns_modal.scss` + dart-sass 전체 컴파일 검증 (2026-08-18)
- **남은 확인 사항:** 컬러·테마 구조(`_settings_themes.scss` 미조사),
  ~~컴포넌트 목록~~ (2026-08-18 해소 — 패턴 66개), 다크 모드, 접근성 목표
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `vanillaframework.io` → `figma.com/community/file/1435297834108003391/vanilla-core-component-library`
