---
name: DSFR (Système de Design de l'État)
org: 프랑스 정부
coverage: partial
url: https://www.systeme-de-design.gouv.fr
repo: https://github.com/GouvernementFR/dsfr
license: Etalab-2.0 (Licence Ouverte 2.0) + 사용 제한 CGU
tech: [CSS, JS]
figma_kit: 미확인
tokens_format: [CSS]
a11y_target: 미확인
platform: web
domain: public
verified: 2026-08-18
source: "npm @gouvfr/dsfr@1.15.2 → dist/dsfr.css (변수 1,086개)"
---
<!-- lang-links -->
> [English](dsfr.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

프랑스 정부 시스템 — **여섯 번째 정부 표본.** 색 토큰 이름에
**라이트·다크 두 모드의 명도 번호가 함께** 들어 있고(`--grey-200-850`),
그 표기가 **`sun`/`moon`**이며, 팔레트 이름이 국가 상징(blue-france ·
red-marianne)과 시적 고유명(émeraude · glycine · tournesol)입니다.

## 토큰 — 1,086개

### 이름이 두 모드를 동시에 부릅니다

```css
--grey-200-850          /* 라이트에서 grey-200, 다크에서 grey-850 */
--grey-1000-50          /* 라이트 1000(흰) ↔ 다크 50(검) — 역전쌍 */
--blue-france-sun-113-625   /* sun = 라이트 기준값 113, 다크 625 */
--green-emeraude-975-75
```

- **다크 모드 여섯 번째 방식입니다** — 테마 파일·클래스·한 토큰 두 값·
  `light-dark()`·병용(`patterns/color.md`)에 이어, **모드 대응을 토큰
  "이름"에 인코딩**합니다. 이름만 보면 두 모드의 명도가 다 읽힙니다
- **`sun`/`moon` 접두** — 라이트/다크를 태양/달로 부르는 표본 유일 어휘
- 시맨틱 층은 `--text-default-grey` → `var(--grey-200-850)` 참조로 조립됩니다

### 팔레트 — 국가 상징 + 시적 고유명 17계열

`blue-france` · `red-marianne`(마리안) + `green-tilleul-verveine`(보리수·버베나) ·
`green-émeraude` · `blue-écume`(물거품) · `pink-macaron` · `yellow-tournesol`(해바라기) ·
`brown-café-crème` · `brown-opéra` … — **색 이름 전체가 프랑스 문화 어휘**입니다.
Auro(브랜드 3벌)·Mística(스킨)와 달리 **한 팔레트 안에서 국가 정체성을 명명으로**
드러냅니다. `background` 계열만 322개로 최다입니다.

### 정부 축 갱신

스페이싱 스케일이 CSS 변수에 없습니다 — **정부 7표본**(GOV.UK 5px · Codex 4x ·
USWDS 8px · KRDS 4계열 · SGDS 16px · 디지털청 없음 · DSFR CSS 변수에 없음)에서
**스페이싱 합의는 여전히 0**이고, 공통 관행은 접근성 구조뿐입니다.

## 컴포넌트

(2026-08-18 확인) `dist/component/`에 **45개** — accordion · alert · badge · breadcrumb ·
button · card · checkbox · consent(쿠키 동의) · header/footer · input · modal ·
navigation · pagination · segmented · stepper · table · tab · tile · tooltip ·
transcription · translate 등. 컴포넌트별 CSS/JS가 개별 파일로도 배포됩니다
(`component/button/button.css` 식) — 정부 표본에서 드문 완전 분할 배포.

## 컴포넌트 심화 — (2026-08-18)

`@gouvfr/dsfr@1.15.2`의 `dist/component/{button,input,form,modal}/*.css`(비압축 배포)를 실측했습니다.

### 버튼 (`.fr-btn`) — 8px 사다리, 전환 없음

| | sm | md (기본) | lg |
|---|:--:|:--:|:--:|
| **min-height** | **32px** | **40px** | 48px |
| 패딩 | 4px 12px | 8px 16px | 8px 24px |
| 서체 | 14 / 24 | 16 / 24 | 18 / 28 |
| 라운드 | 0 | 0 | 0 |
| 굵기 | 500 | 500 | 500 |

- **라운드 0** — 각. 아이콘 전용은 `max-width/height 2.5rem` = 40×40.
- **색 전환이 없습니다** — button.css의 transition은 정렬 화살표 transform(0.3s)뿐.
  hover·active가 즉시 반응하는 무전환형입니다.
- **hover가 `@media (hover: hover) and (pointer: fine)` 안에만 있습니다** —
  core가 전 인터랙티브 요소의 hover 배경을 이 게이트 뒤에서 `--idle/--hover/--active`
  3변수로 일괄 주입합니다. 터치 기기에서 hover 스타일이 원천 차단되는 구조.
- secondary는 배경 투명 + **inset box-shadow 1px** 보더, tertiary(±아웃라인) 별도.
- 보더 0 (기본 버튼은 채움 단색).

### 입력 (`.fr-input`) — Material filled의 프랑스판

- **채움 배경 + 상단만 라운드**: `border-radius: 0.25rem 0.25rem 0 0`(4px 4px 0 0),
  밑줄은 `inset box-shadow 0 -2px` 2px. 보더 요소가 없습니다.
- 16px / 24px, 패딩 8px 16px, 단일행 `max-height: 2.5rem`(40px) — **버튼 md와 40px 정합**.
- 크기 변형이 **없습니다** (1단). placeholder가 **이탤릭**입니다.
- 라벨 별도 블록(`.fr-label`) — 16px / 24px, 입력과 간격 8px. 플로팅 아님.

### 모달 (`.fr-modal`) — 폭을 레이아웃 그리드에 위임

- **컴포넌트 CSS에 폭 단계가 없습니다** (`max-width` 0건) — 다이얼로그가
  `fr-container` + `fr-col-*` 그리드 열로 폭을 잡습니다. 전용 단계(Pajamas)도
  브레이크포인트 재사용(MUI)도 아닌 **그리드 위임 제3형**입니다.
- 모바일: 기본 **하단 정렬**(바텀시트형, `--top` 변형 제공) → 768px 이상: 상하 10%
  스페이서로 중앙, 본문 `max-height: 80vh`.
- 애니메이션: `opacity + visibility` **300ms 페이드만** (transform 없음).
  `prefers-reduced-motion`에서 전면 해제. 스크림 `rgba(22,22,22,.64)`.
- 패딩: 헤더 `16px 16px 8px` → 768px↑ `16px 32px` · 콘텐츠 좌우 16→32px ·
  푸터 **sticky** + `margin-top: -2.5rem` 겹침, 스크롤 중이면 1px 그라디언트 구분선
  (`.fr-scroll-divider`)이 떠오릅니다.
- 제목 22/28 → 768px↑ 24/32 — 컴포넌트 안에 반응형 타이포가 내장.
- 라운드 0, `forced-colors`에서 보더 복원.

### 특징적 결정 (심화분)

- **버튼 라운드 0 + 무전환 + hover의 pointer 게이트** — 상태 표현이 즉시·각·입력장치 인지형
- **입력이 filled + 상단만 4px 라운드** — 라운드가 "열린 방향"을 표시하는 의미적 사용
- **모달 폭의 그리드 위임** — 폭 스케일 없이 12열 시스템이 결정
- 버튼 min-height 32/40/48 — 8px 사다리, 입력 40px과 정합
- 모바일 바텀시트 기본 + 데스크톱 중앙 — 한 컴포넌트가 두 문법을 내장

## 특징적 결정

- **모드 쌍이 토큰 이름에**(`-200-850`) — 다크 여섯 번째 방식, 표본 유일
- **`sun`/`moon` 어휘** — 표본 유일
- 국가 상징·문화 어휘 팔레트 17계열
- 정부 7표본째 — 스페이싱 무합의 유지

## 접근성

미확인 (RGAA 프랑스 접근성 기준 대상이나 패키지에서 수치 미확인).

## 참고

- 토큰: `npm pack @gouvfr/dsfr@1.15.2` → `dist/dsfr.css`
- 컴포넌트 심화: 같은 패키지 `dist/component/{button,input,form,modal}/*.css` (2026-08-18)
- 라이선스: 패키지에 **Etalab-2.0** 명기 (`package.json` + CSS 헤더 "restricted use" 문구.
  frontmatter 반영 — 2026-08-18)
- **남은 확인 사항:** ~~라이선스~~ (2026-08-18 해소 — Etalab-2.0),
  스페이싱(SCSS 소스 미조사 — 컴포넌트 CSS는 rem 리터럴 직접 기입),
  ~~컴포넌트 목록~~ (2026-08-18 해소 — 45개, 위 컴포넌트 절),
  ~~Marianne 서체 규정~~ (2026-08-18 부분 해소 — Marianne woff/woff2 전 굵기(Light·Regular·Medium·Bold)와
  Spectral(serif)이 **패키지에 동봉 배포**, `font-family: "Marianne", arial, sans-serif`.
  사용 규정 문서는 미조사)
- **라이선스 해소 (2026-08-18):** `Etalab-2.0 (Licence Ouverte 2.0) + 사용 제한 CGU` — 출처: github GouvernementFR/dsfr → `LICENSE.md`. 코드는 Etalab 2.0이지만 `doc/legal/cgu.md`가 **행정 외부 주체의 사용과 `.gouv.fr` 도메인 밖 복제를 금지**합니다 — 오픈 라이선스에 사용 주체 제한이 얹힌 표본입니다
