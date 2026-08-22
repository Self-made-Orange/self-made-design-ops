---
name: SmartHR UI
org: SmartHR
coverage: partial
url: https://smarthr.design
repo: https://github.com/kufu/smarthr-ui
license: MIT
tech: [React, styled-components, Tailwind]
figma_kit: true
tokens_format: [JS]
a11y_target: "WCAG 2.2 참조 (자체 접근성 방침 기준 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm smarthr-ui@99.3.1 → lib/themes/create*.js (99.2.0에서 재검증 갱신)"
---
<!-- lang-links -->
> [English](smarthr.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

일본 HR SaaS의 시스템 — **스페이싱 단위가 "글자 크기"**(1문자 = 16px)이고,
**폰트 크기를 조화수열 산식으로 생성**하며, hover/disabled 색이 값이 아니라
**함수**입니다. 메이저 버전이 **99**입니다.

## 토큰 — 값이 아니라 생성기(create*)

토큰이 JSON이 아니라 `createSpacing()` · `createFontSize()` · `createColor()`
같은 **팩토리 함수**로 배포됩니다. 기본값 호출 결과가 기본 테마입니다.

### 스페이싱 — 글자 크기 단위

```js
charSize = htmlFontSize(16) × 배수
X3S 0.25文字=4px · XXS 0.5=8px · XS 1=16px · S 1.5=24px · M 2=32px
L 2.5=40px · XL 3=48px · XXL 3.5=56px · X3L 4=64px
```

- **여백의 단위가 px·rem이 아니라 "문자 수"입니다** (`createSpacingByChar`).
  일본어 조판의 문자 격자 관행이 토큰 단위로 올라온 표본 유일 사례
- 배수에 **음수 전 구간이 있습니다** (-0.25 ~ -8) — Atlassian에 이어
  음수 스페이싱 두 번째, 전 단계 대칭으로는 표본 유일
- 결과 스케일은 4/8/16/24/32/40/48/56/64 — 코어값 전부 보유

### 폰트 크기 — 조화수열 생성

```js
size = scaleFactor / (scaleFactor + diff) rem   // scaleFactor 기본 6
XXS 6/9=10.67px · XS 6/8=12px · S 6/7=13.71px · M 6/6=16px
L 6/5=19.2px · XL 6/4=24px · XXL 6/3=32px
```

- **등차도 등비도 아닌 조화수열(1/n)입니다** — 표본 유일 생성식.
  Ant(시드+산식)·Tailwind(배수)와 또 다른 세 번째 산식 유형
- **13.71px·19.2px 같은 소수 px를 그대로 둡니다** — TDS(소수 행간)와 같은 진영
- `scaleFactor` 하나로 전 스케일이 재생성됩니다 — 시드 파생 계열

### 컬러 — 상태색이 함수입니다

```js
hoverColor: (value) => darken(0.05, value)
disableColor: (value) => rgba(value, 0.5)
OUTLINE 미지정 시: transparentize(0.5, MAIN)
```

- **hover/disabled가 팔레트에 없고 변환 함수입니다** — 어느 색이든
  "5% 어둡게"가 hover. 상태색을 열거(다수)도 리터럴(Semi)도 아닌
  **산식으로 배포한 표본 유일 사례**
- 회색 8단계가 `GREY_5 6 7 9 20 30 65 100` — 비균등이고,
  전부 **웜 그레이**입니다 (BLACK이 `#030302`, hwb 주석 병기)
- `BLUE_100 #0077c7`(MAIN)과 `BLUE_101 #0071c1`(링크) — **+1 번호가
  "링크용 미세 변형"**입니다. 램프 단계가 아니라 용도 분기입니다
- 시맨틱에 `COLUMN`·`HEAD`(표 전용), `SCRIM`/`OVERLAY` 구분 등
  업무 화면 어휘가 직접 등장합니다

### 버전 — 99.2.0

**메이저 버전이 99입니다** — 표본 최대. 파괴적 변경을 메이저로 올리는
정책을 그대로 둔 결과로, 버전 숫자가 시스템의 변경 빈도를 증언합니다
(Base Web 18, Ant 6과 비교).

## 컴포넌트 심화 — (2026-08-18)

`smarthr-ui@99.3.0`의 `lib/components/`(61개 디렉터리)를 실측했습니다.
**스타일 층이 styled-components가 아니라 tailwind-variants(`tv`) + 자체
Tailwind preset(`shr-` 접두)입니다** — frontmatter의 tech 표기는 구세대 기준.
치수는 `lib/smarthr-ui-preset.cjs`를 node로 실행해 해석했습니다
(spacing 1=16px 문자 단위 · fontSize 조화수열이 preset에 그대로 이식돼 있음).

### 버튼 (`Button`) — 높이 선언 없음, 조화수열이 높이까지 관통

| | M (기본) | S |
|---|:--:|:--:|
| 서체 | 16px(base) / **700** | **13.71px**(sm = 6/7) / 700 |
| 패딩 | 12×16px | 8×8px |
| 보더 | 1px (`border-shorthand`) | 1px |
| 라운드 | `rounded-m` **6px** | 6px |
| **파생 높이** | **42px** (leading-none) | **≈31.7px** (min-h 산식) |

- **높이를 선언하지 않는 MUI 진영**입니다 — M은 `16 + 12×2 + 1×2 = 42px`.
  S는 `min-h: calc(fontSize.sm + spacing.1 + borderWidth.2)` = 13.71+16+2
  ≈ **31.7px 소수 높이** — **조화수열 폰트(6/7=13.71px)가 컴포넌트 높이까지
  관통**한 결과입니다. MUI(36.5px 방임)와 같은 소수 방임 진영 (→ i18n 축 교차:
  CJK 산식 폰트의 파생 치수).
- 변형 6종: primary · secondary · danger · skeleton · text · tertiary —
  **tertiary만 굵기 normal + 링크색**입니다 ("3차 버튼 = 링크"라는 판단을
  굵기로 표현).
- **disabled를 `disabled` 속성이 아니라 `aria-disabled` + 클릭 캔슬러**로
  구현합니다 — 로딩·비활성 중에도 포커스가 유지됩니다. 여기에
  **아이콘 단독 여부(square)를 prop이 아니라 MutationObserver로 런타임
  감시**해 정사각 패딩을 자동 적용합니다 — 표본 유일 수법.
- hover가 `shr-bg-main-darken` 클래스 — 토큰 절의 **상태색 함수(darken 0.05)가
  클래스명으로 구체화**된 형태입니다.

### 입력 (`Input`) — 버튼과 42px 파생 높이 공유

- wrapper `<span>`이 보더 1px·`rounded-m` 6px·px 8px를 들고, 안쪽 input이
  `h-[theme(fontSize.base)]`(16px) + py 12px — **버튼 M과 같은 42px 파생 높이**.
- 상태 스타일이 전부 **`:has()` 셀렉터**입니다 — `has-[[aria-invalid]]`,
  `has-[:disabled]`, `has-[[readonly]]`. readonly는 보더·배경을 표 열색
  (`column`)으로 바꿉니다 — 업무 화면 어휘의 재등장.
- 날짜계 input에 `min-w-[11em/8em/5em]` 매직넘버 — Safari 미지원 대응 주석 병기.

### 다이얼로그 (`Dialog`) — 폭이 그리드 컬럼 별칭

| XS | S | M | L | XL | XXL |
|:--:|:--:|:--:|:--:|:--:|:--:|
| col3 **424px** | col4 576 | col5 728 | col6 880 | col7 1032 | col8 1184 |

- **전용 폭 스케일이 없고 12컬럼 그리드의 col 폭(col n = 120+152(n−1))을
  그대로 씁니다** — Backpack(폭=브레이크포인트)·MUI(폭=브레이크포인트)에 이은
  "다른 축 재사용" 세 번째 유형이며 그리드 재사용은 표본 유일.
- 진입/퇴장 **300ms ease-in-out 페이드** (react-transition-group), 라운드 6px,
  그림자 `layer-3`(0 4px 8px 2px rgba(3,3,2,.3) — 웜 블랙 알파), scrim 변수.
- z-index 토큰: `fixed-menu 100 → overlap-base 10000 → overlap 10500` —
  z-index 토큰화 표본이 하나 더 늘었고, 산법도 또 다릅니다 (2단 대점프).

### 포커스·CJK 기반 (preset 플러그인 층)

- **포커스 링이 이중 구조**입니다: inset 4px 흰 box-shadow + 2px `#0077c7`
  outline(offset −2px) — Tailwind ring의 Firefox 결함을 피해 직접 정의했다는
  주석이 소스에 있습니다. 보더 있는 컴포넌트에서는 4px에서 보더 폭을 차감.
- preflight base에 **`text-spacing-trim: space-all`** — Windows Yu Gothic이
  기호를 과잉 축약하는 문제의 회피. **CJK 조판 속성이 시스템 리셋 CSS에 들어간
  표본 유일 사례**입니다 (→ i18n 축 교차). 기본 행간 1.5.

### 특징적 결정 (심화분)

- **버튼·입력이 42px 파생 높이 공유** — 높이 선언 없음, 산식 정합
- **조화수열 폰트가 컴포넌트 층까지 관통** — S 버튼 31.7px 소수 높이
- **다이얼로그 폭 = 그리드 컬럼 별칭** — 표본 유일
- **aria-disabled 정책 + MutationObserver square 판정** — 표본 유일
- **`text-spacing-trim` 리셋** — CJK 조판의 시스템 기본값화 (i18n)
- styled-components → **tailwind-variants 이행 완료** (v99 시점)

## 특징적 결정

- **스페이싱 단위가 문자 수** (1文字=16px) — 표본 유일, CJK 조판 관행의 토큰화
- **폰트 크기가 조화수열 생성식** — 표본 유일 산식
- **상태색(hover/disabled)이 변환 함수** — 표본 유일
- 음수 스페이싱 전 구간 대칭 (-0.25~-8)
- 웜 그레이 8단계 비균등 + hwb 주석
- 메이저 버전 99 — 표본 최대
- styled-components 테마 + Tailwind 프리셋 동시 배포

## 접근성

~~미확인.~~ → **WCAG 2.2 참조 (2026-08-18 해소).**
출처: `smarthr.design/accessibility/guidelines/` — 자체 「アクセシビリティ方針」이 정한
목표 범위를 덮기 위해 **WCAG 2.2와 그 기법집을 참고해 작성**했다고 밝힙니다.
지침 각 항목에 "関連するWCAG2.2達成基準"이 붙습니다. **WCAG 자체를 목표로 선언하는 대신
자체 방침을 상위에 두는 구조입니다.**

## 참고

- 토큰: `npm pack smarthr-ui@99.2.0` → `lib/themes/`
- 컴포넌트 심화: `smarthr-ui@99.3.0` → `lib/components/*/` (tv 변형 정의) +
  `lib/smarthr-ui-preset.cjs` 실행 (2026-08-18)
- **남은 확인 사항:** ~~컴포넌트 목록~~ (2026-08-18 해소 — 61개 디렉터리, 심화 절),
  Figma 킷, 접근성 목표(운영 가이드가
  smarthr.design에 있으나 프록시 차단), 다크 모드 유무

99.3.0 재검증 — 토큰 값 무변경 (2026-08-18)
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — github kufu/smarthr-ui → `README.md` → `figma.com/community/file/978607227374353992/SmartHR-UI`

- **99.3.1 재검증 — 토큰 값 무변경 (2026-08-18).** `lib/themes/` 전체를 99.3.0과 `diff -rq`로 대조해 차이 0건 확인.
