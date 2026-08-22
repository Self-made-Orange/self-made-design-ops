---
name: NASA Web Design System
org: NASA
coverage: partial
url: https://nasa.github.io/nasawds-site
repo: https://github.com/nasa/nasawds
license: CC0-1.0
tech: [SCSS]
figma_kit: 미확인
tokens_format: [SCSS]
a11y_target: 미확인 (USWDS 상속 추정 금지 — 미확인으로 둠)
platform: web
domain: aerospace
verified: 2026-08-18
source: "npm nasawds@4.0.70 → src/theme/_uswds-theme.scss (@uswds/uswds ^3.1.0 의존)"
---
<!-- lang-links -->
> [English](nasa-wds.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**`aerospace` 두 번째 표본** — 그러나 Astro UXDS와 달리 관제용 자체 체계가
아니라 **USWDS 3.x의 설정 오버레이**입니다. 항공우주라는 도메인이 같아도
"우주 기관의 웹사이트"와 "우주선 관제 UI"는 전혀 다른 시스템을 낳습니다.

## 구조 — USWDS 설정 덮어쓰기

```scss
$theme-color-primary:  'blue-warm-60v',   // NASA 파랑
$theme-color-secondary: 'red-50v',        // NASA 빨강
$theme-font-type-lang:  'helvetica',
$theme-h3-font-size: 10, $theme-h4-font-size: 8,  // USWDS 크기 인덱스
```

- **자체 토큰이 없습니다** — `@uswds/uswds`를 의존성으로 두고
  `$theme-*` 변수만 바꿉니다. SGDS(Bootstrap 포크)와 같은 자리의
  **USWDS판**이며, 포크가 아니라 **설정 파일 한 장**이라는 점이 다릅니다
- 색 지정이 USWDS 색 이름(`blue-warm-60v`)입니다 — 상속 시스템의 어휘로 말합니다
- ~~서체를 USWDS 기본(Public Sans)에서 Helvetica로 교체합니다~~
  (2026-08-18 정정 — **헤딩만 Helvetica**, 본문은 Source Sans Pro 유지.
  아래 심화 절)

## `aerospace` 도메인 질문의 답

Astro UXDS(관제·상태색 어휘)가 도메인 경향인지 단독인지 가리는 두 번째
표본이었는데 — **답은 "비교 불가"입니다.** NASA WDS는 웹사이트용 USWDS
오버레이라서 Astro의 등급색·관제 어휘와 만나는 지점이 없습니다.
`aerospace` 도메인 안에 **관제 UI(Astro)와 기관 웹(NASA WDS)** 두 층이
있다는 것이 이 표본의 결론입니다.

## 컴포넌트 심화 — (2026-08-18)

같은 `nasawds@4.0.70`에서 오버라이드 전수를 확인하고, 동봉된 컴파일 산출물
`src/css/styles.css`(**USWDS 3.13.0으로 빌드** — 주석에 버전 명기)에서
버튼·입력·모달의 해석 결과를 실측했습니다.

### 오버라이드 전수 — 컴포넌트 층 0건 확인

테마 전체가 **설정 17개 + 커스텀 SCSS 194줄**입니다:

- `_uswds-theme.scss` (22줄): 색 10개 (`$theme-color-primary: 'blue-warm-60v'` 등)
  + 타이포 7개 (`$theme-font-type-lang: 'helvetica'` ·
  `$theme-h3-font-size: 10` · `$theme-h4-font-size: 8` 등)
- `_uswds-theme-custom-styles.scss` (194줄): 다크 헤더 변형(`usa-header--dark`)
  대부분 + h1·h2 자간 `letter-spacing(-2)` + hero/section `ink` 배경
- **`$theme-button-*` · `$theme-input-*` · `$theme-modal-*` 계열 0건** —
  버튼·입력·모달 치수/라운드/모션에 손댄 곳이 없습니다.
  **컴포넌트 배포 없음 + 컴포넌트 설정 오버라이드 없음 확인.**

### 컴파일 실측 — USWDS 3.13.0 기본값이 그대로 나옵니다

uswds.md 심화(같은 3.13.0)의 소스 판독을 **빌드 결과물로 교차 확인**한 값들:

| | 실측 (styles.css) |
|---|-----|
| 버튼 | 패딩 **12/20px** · 라운드 **4px** · **700** · 17px(1.06rem) · 행간 0.9 · `#0050d8` |
| 입력 | **height 40px** · 보더 **1px** `#565c65` · 라운드 0 · max-width 30rem |
| 모달 | max-width **480px** / lg **880px** · 라운드 **8px** · 패딩 32px |
| 모달 진입 | **불투명도 페이드만, .15s ease-in-out** (transform 없음) |

- 버튼 색 `#0050d8`이 **NASA가 고른 유일한 컴포넌트 차이**입니다 —
  `blue-warm-60v`라는 USWDS 색 이름의 해석 결과.
- 텍스트 입력 보더는 **1px**로 컴파일됩니다 — uswds.md에 기록한
  `$theme-input-select-border-width: 2px`는 이름과 달리 체크박스·라디오
  계열에 적용되는 변수임이 빌드 결과에서 드러납니다 (uswds.md 각주 후보).
- 모달 진입이 페이드뿐이라 GOV.UK·NHS의 "모달 없음"과 나란히 놓으면
  정부 계열의 모달 보수성 스펙트럼이 됩니다: 없음(GDS·NHS) → 페이드만(USWDS).

### 서체 — "Helvetica 교체"의 실제 범위

~~서체를 USWDS 기본에서 Helvetica로 교체~~ (기존 절 서술 정정) —
**Helvetica는 헤딩 전용**입니다. `$theme-font-type-lang: 'helvetica'`로
`lang` 서체 유형을 정의하고 `$theme-font-role-heading: 'lang'`으로 **헤딩
역할에만** 배정했습니다. 컴파일 결과: 본문·버튼·입력은
`Source Sans Pro Web` 유지, `usa-modal__heading` 등 헤딩만
`Helvetica Neue, Helvetica, …`. 브랜드 개입이 표제 층에만 있는 구조입니다.

### 특징적 결정 (심화분)

- **컴포넌트 오버라이드 0건** — 파생 스펙트럼의 극단:
  NHS(값 교체 포크) > SGDS(변수 수정) > **NASA WDS(색·헤딩만)**
- **Helvetica는 헤딩 전용** — 본문은 USWDS 기본 유지
- 컴파일 산출물 동봉 — 소스가 아닌 **빌드 결과로 검증 가능한 배포 형태**

## 특징적 결정

- **의존성 + 설정 한 장** — 상속 방식 중 최소 형태 (포크보다 얇음)
- 도메인이 같아도 용도(관제 vs 웹)가 체계를 가름 — `domain` 축의 한계 실증
- USWDS 어휘로 지정된 브랜드 색

## 접근성

미확인 — USWDS의 접근성 구조를 쓰는지 검증하지 않았습니다.

## 참고

- 토큰: `npm pack nasawds@4.0.70` → `src/theme/`
- 컴포넌트 심화: 같은 패키지 `src/theme/_uswds-theme*.scss` +
  `src/css/styles.css` (USWDS 3.13.0 컴파일 산출물, 2026-08-18)
- **남은 확인 사항:** nasawds-site 문서(프록시 차단),
  ~~라이선스~~ (2026-08-18 해소 — package.json에 **CC0-1.0** 명기.
  frontmatter "명시 없음"은 오기였으며 2026-08-18 반영),
  ~~오버라이드 전수~~ (2026-08-18 해소 — 설정 17개 + 커스텀 194줄, 심화 절)
- **라이선스 해소 (2026-08-18):** `CC0-1.0` — 출처: npm `nasawds@4.0.70` → `package.json`. 저장소(nasa/nasawds → bruffridge/nasawds로 리다이렉트)에는 LICENSE 파일이 없습니다
