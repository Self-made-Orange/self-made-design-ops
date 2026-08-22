---
name: Design System Italia (design-tokens-italia)
org: 이탈리아 정부 (Dipartimento per la trasformazione digitale)
coverage: partial
url: https://designers.italia.it
repo: https://github.com/italia/design-tokens-italia
license: BSD-3-Clause
tech: [DTCG JSON, CSS, SCSS]
figma_kit: 미확인
tokens_format: [DTCG JSON ($value/$type/$description), CSS, SCSS]
a11y_target: 미확인
platform: web
domain: government
verified: 2026-08-18
source: "npm pack design-tokens-italia@1.3.3 → tokens/{global,semantic,specific}.json · npm bootstrap-italia@2.18.3 · design-react-kit@5.10.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](italia.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

이탈리아 정부 — **정부 9번째 표본**. 토큰이 **W3C DTCG 초안 형식**
(`$value`/`$type`/`$description`)으로 배포되는 코퍼스 첫 정부 사례이고,
색 램프의 **단계 숫자가 색상마다 다릅니다** — 숫자가 등급이 아니라
**명도 실측치**라서 램프마다 눈금이 다른 구조입니다.

## 색 — 단계 숫자가 명도입니다

```
blue:     20 · 25 · 30 · 40 · 48 · 57 · 67 · 77 · 87 · 97
seagreen: 10 · 14 · 19 · 24 · 39 · 54 · 69 · 76 · 84 · 92
gray:     10 · 15 · 25 · 32 · 45 · 64 · 83 · 90 · 96 · 98
```

**램프마다 단계 숫자가 다릅니다.** 100/200/300 같은 균일 눈금(표본 다수)이
아니라 **각 색의 명도값이 그대로 단계 이름**입니다 — `blue.40`은 "4번째쯤"이
아니라 명도 40%대라는 뜻. 숫자만 보고 명도를 알 수 있는 대신, 색상 간
"같은 단계" 매핑이 사라집니다. GLOSSARY의 이름-값 관계 축에서 **"이름=측정값"**
이라는 새 유형입니다. 기준 파랑 `blue.40 = #0066cc`.

## 계층 — DTCG 3층

```
global.json → semantic.json (color·theme·spacing·elevation) → specific.json (컴포넌트별)
```

**W3C Design Tokens Community Group 초안 문법을 그대로 쓰는** 코퍼스 드문
사례입니다 (`$value`/`$type`/`$description` — 모든 토큰에 설명 필드 동반).
정부 시스템 중에서는 유일합니다.

## 수치

| 축 | 값 |
|----|-----|
| 스페이싱 | **4px 배수 12단계**, 이름이 배수(`1x~24x`) — Braid식 격자배수 명명의 정부판 |
| 폰트 크기 | 12~56px 11단계 (12·14·16·18·20·24·28·32·40·48·56) |
| 행간 | **110~150% 5단계, % 표기** |
| 자간 | `-1px · -1.3px · -2px` — **음수 px 자간** (제목용 압축) |
| 라운드 | smooth 4 / rounded 40 / circle 80 — 3단 점프 |
| 보더 | 1 · 2 · 4 · 8px |
| 서체 | **Titillium Web**(sans) · Lora(serif) · Roboto Mono |

- 스페이싱은 GOV.UK 5px 단독을 제외한 **정부 4px 진영**(NHS·USWDS·KRDS·SGDS…)
  을 강화합니다 — 정부 표본 9개 중 8개가 4px 계열.
- Titillium Web은 이탈리아 정부 브랜드 서체 — 정부 전용 서체 노선
  (프랑스 Marianne, 네덜란드 등)과 같은 축.
- 자간이 px 음수 고정값 — Persona(±0.2~0.8px)와 함께 px 자간 2번째 표본,
  단 방향이 압축 전용입니다.

## 특징적 결정

- **정부 9번째 표본** — DTCG 형식 채택은 정부 중 유일
- 색 단계 숫자 = 명도 실측치 (램프마다 눈금 상이)
- 모든 토큰에 `$description` — 설명이 스키마 필수인 배포
- 4px 배수 + 배수 명명 스페이싱
- 음수 px 자간 3단계

## 3층의 실제 내용 — semantic·specific (2026-08-18)

- **global** — 구조적 기초: border·color·font(-size/-leading/-tracking/-weight)·
  radius·spacing·sizing·shadow. 색은 `blue(20~97)`·seagreen·slate·gray·red·
  emerald·orange·teal 숫자 스텝.
- **semantic** — 재사용 설계 결정: `color`(background/text/border —
  `background.primary = {color.blue.40}` · `-hover = {color.blue.30}`처럼
  상태 쌍이 램프 한 칸 이동), `theme`, `spacing`(**`3xs~3xl` 티셔츠 별칭이
  전부 global 배수 참조** — 3xs={1x}, s={4x}, m={6x}, l={8x}, 3xl={24x}),
  `elevation`.
- **specific** — 요소 단위 전수 표현: `heading-1-font-size(-l)`·`code-font`·
  `icon` 등. 반응형이 토큰 접미(`-l`)로 층에 편입돼 있습니다.
- 파이프라인: Figma(Tokens Studio) → DTCG JSON → Style Dictionary →
  `dist/css/variables.css`·`dist/scss/_variables.scss`(접두 `$it-`).

### bootstrap-italia 값 일치 — 색 일치, 스페이싱 미반영 (v2.18.3 대조)

- 의존성에 `design-tokens-italia ^1.3.3`이 있으나 **토큰 import는 주석 처리**
  상태 — 실값은 HSL/HSB 하드코딩 + 토큰명 주석 병기(85곳).
- 색 표본 대조: `$primary` #0066cc=blue.40 · `$red` #cc334d=red.50 ·
  `$orange` #995c00=orange.30 · `$green` #008055=emerald.25 ·
  `$gray-100~900` = gray.96~10 **전부 일치**. slate 계열 등 4건은
  ±1~2 RGB 반올림 편차(HSL 정수 표기 변환 오차)로 **의도적 동일값**.
- 스페이싱은 **토큰 체계 미반영** — Bootstrap 기본 맵($spacer 1rem,
  0/4/8/16/24/48px) 그대로. 4px 격자에는 부합하나 1x~24x 스텝의
  12/20/32/40/56/64/96px 유틸리티가 없습니다.
- 요약: **색은 토큰과 값 동기화(수동), 스페이싱은 비동기, 직접 소비는 비활성.**

## 컴포넌트 심화 — (2026-08-18)

토큰 배포에는 컴포넌트가 없지만 **bootstrap-italia@2.18.3이 컴포넌트 층**이고,
`design-react-kit@5.10.0`(React 49 컴포넌트, peer `bootstrap-italia ^2.18.0`)이
같은 CSS를 소비합니다. 아래는 `dist/css/bootstrap-italia.min.css` + `src/scss`
실측 — BS5 테마이므로 **Bootstrap 기본값에서 바꾼 것만** 적습니다.

### 버튼 — 형태만 이탈리아화

| | bootstrap-italia | BS5 기본 |
|---|:--:|:--:|
| font-weight | **600** | 400 |
| border | **0** | 1px |
| 라운드 | **4px** ($border-radius 자체를 4px로) | 6px |
| 패딩 | .375/.75rem | 동일 |

- `$btn-text-transform: uppercase` 변수가 있으나 **컴파일된 `.btn`엔 미적용** —
  uppercase 29곳은 쿠키바 등 국소 컴포넌트뿐입니다.

### 입력 — 언더라인 스타일

- `border: 0` · `border-radius: 0 !important` · min-height **2.5rem(40px)**.
- 실제 보더는 **아래쪽 1px뿐** — `input[type=…]` 전수 셀렉터로
  `border-bottom: 1px solid hsl(210,17%,44%)`. `.input-group-text`·append `.btn`도
  같은 밑줄이라 **그룹 전체가 한 줄로 이어집니다**. BS 기본(4면 보더 + 라운드)에서
  가장 멀리 간 변경입니다.
- focus 링: `0 0 0 .25rem rgba(0,102,204,.25)` — **기준 파랑 blue.40(#0066cc)의
  25% 알파**. 토큰 기준색이 포커스에서 재등장합니다.

### 모달 — 폭은 BS 그대로, 밀도·스크림이 다름

| | bootstrap-italia | BS5 기본 |
|---|:--:|:--:|
| 폭 | 500px (sm 300 / lg 800 / xl 1140) | 동일 |
| 라운드 | 8px | 동일 |
| 내부 패딩 | **1.5rem** | 1rem |
| 헤더 보더 | **0** | 1px |
| 백드롭 | opacity **0.8** | 0.5 |

### 키보드 포커스 — 무채색 이중 링 + JS 입력수단 판별

- `:focus:not([data-focus-mouse=true])` → `box-shadow: 0 0 0 2px #fff, 0 0 0 5px #000`
  — **흰 갭 2px + 검정 3px**. GOV.UK(노랑)·WMN(퍼플)과 같은 이중 링 구조의
  무채색판입니다 (`$focus-outline-color-in: $white / -out: $black`).
- **마우스 클릭 포커스엔 링을 그리지 않습니다** — `track-focus.js`가 입력수단을
  `data-focus-mouse`로 마킹 (design-react-kit에도 `track-focus` 번들 동봉).

## 접근성

미확인 (semantic 층에 theme 축 존재 — 상세 미조사).
키보드/마우스 포커스 분리 + 무채색 이중 링은 위 컴포넌트 심화 절 참조.

## 참고

- 관련 배포: `bootstrap-italia`(BS5 테마) · `design-react-kit` ·
  `design-angular-kit` — 프레임워크 3벌이 이 토큰을 공유하는 구조.
  버튼·입력·모달 실측은 위 "컴포넌트 심화" 절 (2026-08-18)
- ~~semantic/specific 층 상세·bootstrap-italia 값 일치~~ → **해소 (2026-08-18)** —
  위 "3층의 실제 내용" 절
- **남은 확인 사항:** 다크·고대비 테마, 접근성 목표(EU EN 301 549 추정 금지 — 미확인)
