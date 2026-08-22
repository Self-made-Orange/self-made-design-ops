---
name: PIE
org: Just Eat Takeaway
coverage: partial
url: https://pie.design
repo: https://github.com/justeattakeaway/pie
license: Apache-2.0
tech: [Web Components, Lit]
figma_kit: 미확인
tokens_format: [JSON, CSS, SCSS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @justeat/pie-design-tokens@7.14.3 → dist/tokens.json (리프 1,251개) · npm @justeattakeaway/pie-button@1.14.12 · @justeattakeaway/pie-css@1.5.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](pie.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Just Eat Takeaway의 시스템 — 스페이싱·라운드 별칭이 **알파벳
(`a`·`b`·`c`…`j`)**입니다. 표본에서 T셔츠·숫자·산문이 아닌
**문자 순서 명명은 PIE뿐**입니다.

## 토큰 — global(값) / alias(용도) 2층

```
spacing/global:  0 · 2 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 56 · 64 · 80
spacing/alias:   none · a-small(2) · a(4) · b(8) · c(12) · d(16)
                 e(24) · f(32) · g(40) · h(56) · i(64) · j(80)
radius/alias:    rounded-a(4) · b(8) · c(12) · d(16) · e(50) · f(20) · g(24)
```

- **알파벳 순서 명명** — 크기 이름이 의미를 버리고 순서만 남깁니다.
  T셔츠(xs~xxl)의 단계 확장 한계와 숫자(400 등)의 기준 혼란을 둘 다 피하는
  선택이지만, `f`가 32px인지 20px인지는 계열마다 다릅니다 —
  **라운드 `f`(20)가 `e`(50)보다 작습니다**. 이름-값 순서 어긋남
  (`GLOSSARY.md` 계열)
- **`a-small`(2px)** — a 앞에 끼워 넣은 예외 이름. 알파벳 체계의
  삽입 문제가 노출된 자리입니다
- 스페이싱에 **48이 없고 40→56**으로 갑니다. 코어(4/8/16/24/32)는 보유
- 라운드 `round: 50`은 **단위 없는 50** ~~(=50%)~~ — global 값이 숫자만이라
  단위 해석이 소비자 몫입니다. **CSS 층(pie-css)에서는 `50rem` 알약으로 해석 확정**
  (2026-08-18 심화 — Bootstrap `50rem`과 같은 관행)
- 테마 이름이 `jet`(Just Eat Takeaway) — 멀티 브랜드 대비 구조

행간 대신 **`paragraph-spacing`**(16/14/12) 계열이 있습니다 —
단락 사이 간격을 타이포 토큰으로 두는 것은 Vanilla(`sp-after`)와 같은 진영입니다.

## 컴포넌트 심화 — (2026-08-18)

컴포넌트는 개별 패키지(`@justeattakeaway/pie-button@1.14.12` ·
`pie-text-input@0.30.9` · `pie-modal@1.27.6`, Lit Web Components)로 배포되고,
**실제 치수·스타일은 전부 공용 `@justeattakeaway/pie-css@1.5.0`의 SCSS 믹스인**
(`scss/mixins/components/_button.scss`)에 있습니다. 통합 진입점
`pie-webc@0.11.10`에 **41개 컴포넌트** 확인. 토큰이 단위 없는 숫자라
컴포넌트 층이 **`calc(var(--dt-font-size-20) * 1px)`로 단위를 붙입니다** —
"단위는 소비자 몫" 구조가 자사 컴포넌트에서 그대로 실행되는 모습입니다.

### 버튼 — 알약(50rem) + 서체 20px/800, 크기 5단

높이 선언이 없고 **행간 + 상하 패딩으로 파생**됩니다.

| | xsmall | small-productive | small-expressive | medium | large |
|---|:--:|:--:|:--:|:--:|:--:|
| 서체 | 14px/**700** | 16px/**800** | 20px/**800** | 20px/**800** | 20px/**800** |
| 행간 | 20px | 20px | 24px | 24px | 24px |
| 상하 패딩 | 6px | 10px | 8px | 12px | 16px |
| 좌우 패딩 | 8px (`b`) | 16px (`d`) | 16px (`d`) | 24px (`e`) | 24px (`e`) |
| **파생 높이** | **32px** | **40px** | **40px** | **48px** | **56px** |

- **라운드가 전 크기 `rounded-e` = 50rem 알약**입니다 — 완전 캡슐이 기본형.
  토큰 절의 "50 단위 모호" 질문이 여기서 닫힙니다.
- **버튼 서체가 20px·굵기 800(extrabold)** — 표본 최대급입니다.
  Backpack(16px/700)보다도 크고 굵으며, 14px/500 다수 진영과는 두 단계 갈립니다.
- **small이 두 갈래**입니다 — 같은 40px 높이에서 `productive`(16px 서체)와
  `expressive`(20px 서체)로 나뉩니다. 밀도용/마케팅용 서체 이원화가
  크기 이름에 들어온 표본 유일 사례입니다.
- **`--responsive` 수식어가 >md에서 크기를 한 단계 승급시킵니다**
  (xsmall→small-productive, small→medium, medium→large). GOV.UK·NHS의
  반응형이 패딩·서체 조정이라면, PIE는 **크기 변형 매핑 자체가 반응형**입니다.
- outline 변형은 패딩에서 1px을 차감해 보더 몫을 상쇄합니다 — MUI·Garden과
  같은 의도.
- 포커스: `0 0 0 2px inner + 0 0 0 4px outer` 이중 링 (`p.focus` 공용 믹스인).
- 변형 13종 (primary 3계열·secondary·outline·ghost 4계열·inverse·destructive 2종).

### 입력 (`pie-text-input`) — 버튼과 반대로 고정 높이

| | small | 기본 | large |
|---|:--:|:--:|:--:|
| **height** | **40px** | **48px** | **56px** |
| 상하 패딩 | 8px (`b`) | 12px (`c`) | 16px (`d`) |
| 좌우 패딩 | 16px (`d`) | 16px | 16px |
| 라운드 | 12px (`rounded-c`) | 12px | 12px |
| 보더 | 1px | 1px | 1px |

- **버튼은 파생 높이, 입력은 고정 `height`** — Backpack(버튼 min-height /
  입력 height)과 같은 비대칭을 다른 조합으로 반복합니다. 내부 `input`은 24px 고정.
- **버튼 알약 vs 입력 12px** — 같은 시스템 안 라운드 대비가 표본 최대급입니다.
- hover 배경을 **`color-mix()`로 런타임 연산**합니다 (hsl 성분 변수 폴백 동반) —
  상태색을 토큰이 아니라 수식으로 만드는 계열 (Vitamin의 tint 계열과 같은 자리).

### 모달 (`pie-modal`) — 네이티브 `<dialog>` + `@starting-style`

| | small | medium | large |
|---|:--:|:--:|:--:|
| max-width | **450px** | **600px** | **1080px** |
| 기본 폭 | 75% | 75% | 75% |
| 라운드 | 16px (`rounded-d`) | 동일 | 동일 |

- 진입 애니메이션이 keyframes가 아니라 **`@starting-style` +
  `transition: display/overlay allow-discrete`**입니다 — 최신 CSS 진입/퇴장
  메커니즘을 채택한 표본 첫 사례. `translateY(-40px)`→0 + 페이드.
- **진입 250ms / 퇴장 150ms 비대칭** (스크림 300/200ms) — MUI(225/195)와 같은
  "천천히 들어오고 빨리 나가는" 진영이며, 값은 토큰(`--dt-motion-timing-*`)입니다.
- **이징 토큰 4종이 실재합니다** — `in`(0.8,0,1,1) · `out`(0,0,0.18,0.99) ·
  `persistent-expressive`(0.95,0,0,0.95) · `persistent-functional`(0.45,0,0.55,1).
  모달은 persistent-functional. Backpack(이징 무토큰·리터럴 드리프트)과 대극입니다.
- md 이하에서 large는 자동 전체화면 + 라운드 0. 상하 마진 40px→80px(>md).
- 스크림 `rgb(0,0,0,0.55)`. 스크롤 그림자를 `background-attachment: local, scroll`
  2겹으로 그립니다 — 그림자와 "덮개 그라데이션"이 스크롤을 따라 서로 상쇄되는 기법.
- 헤딩 `margin-block: 16px`에 "deliberately not a custom property" 주석 —
  **테마 주입을 의도적으로 막은 자리**를 주석으로 선언합니다.

### 특징적 결정 (심화분)

- **알약 버튼 + 20px/800 서체** — 브랜드 표현이 컴포넌트 기하·타이포 양쪽에
- **small 2갈래(productive/expressive) + `--responsive` 크기 승급** — 표본 유일
- **무단위 토큰을 컴포넌트 층에서 `calc(×1px)`** — 단위 지연 결정의 실행 형태
- **`@starting-style` 진입 애니메이션** — 최신 CSS 채택 최선두
- **이징 4종·타이밍 6종 토큰화** + 진입/퇴장 비대칭
- 버튼 파생 높이(32~56) vs 입력 고정 높이(40/48/56)

## 특징적 결정

- **알파벳 순서 명명** (`a`~`j`) — 표본 유일
- `a-small` 삽입 예외 — 알파벳 체계의 구조적 한계 노출
- 라운드 별칭에서 `f` < `e` 순서 어긋남
- global(숫자만) / alias(용도) 2층, 단위는 소비자가 붙임
- `paragraph-spacing` 타이포 토큰
- Web Components(Lit) — Shoelace·Siemens iX와 같은 진영

## 접근성

미확인.

## 참고

- 토큰: `npm pack @justeat/pie-design-tokens@7.14.3` → `dist/tokens.json`
  (`metadata/tokensMetadata.json`에 카테고리 정의 동봉)
- 컴포넌트 심화: `@justeattakeaway/pie-css@1.5.0`
  (`scss/mixins/components/_button.scss` · `dist/index.css`) +
  `pie-button@1.14.12` · `pie-text-input@0.30.9` · `pie-modal@1.27.6` ·
  `pie-webc@0.11.10` 각 `src/*.scss` (2026-08-18)
- **남은 확인 사항:** 컬러 1,000여 리프 구조, 다크 모드,
  ~~컴포넌트 목록~~ (2026-08-18 해소 — pie-webc 41개)
