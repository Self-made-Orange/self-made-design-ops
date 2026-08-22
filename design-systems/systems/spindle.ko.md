---
name: Spindle
org: CyberAgent (Ameba)
coverage: partial
url: https://spindle.ameba.design
repo: https://github.com/openameba/spindle
license: MIT
tech: [CSS, React]
figma_kit: 미확인
tokens_format: [CSS]
a11y_target: "WCAG 2.1 기반 자체 가이드라인 (Ameba Accessibility Guidelines — 2026-08-18 확인)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @openameba/spindle-tokens@1.10.0 → dist/css/*.css · npm @openameba/spindle-ui@3.3.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](spindle.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Ameba(CyberAgent)의 시스템 — **같은 스페이싱 토큰이 뷰포트별 CSS 파일 3벌로
다른 값을 갖고**, **View Transitions API를 토큰화한 표본 유일 사례**이며,
서체 스택 이름에 **버전 번호가 붙습니다**.

## 토큰

### 스페이싱 — 20단계 × 3뷰포트 × 2계열

`spacing-{desktop,tablet,mobile}.css` 세 파일이 **같은 변수명에 다른 값**을 넣습니다:

| | desktop | mobile |
|---|:---:|:---:|
| `absolute-spacing-lv1` | **4px** | **2px** |
| `absolute-spacing-lv3` | 8px | 6px |
| `absolute-spacing-lv20` | 96px | (축소) |

- **뷰포트가 값을 가르는 스페이싱**입니다 — Spectrum의 desktop/mobile sets와
  같은 판단을 CSS 파일 교체로 구현합니다
- `relative-*`(rem) / `absolute-*`(px) **2계열 병행** — Cloudscape의
  scaled/static과 같은 자리의 구분입니다
- 데스크톱 absolute: `4 6 8 12 14 16 20 24 28 36 40 44 48 56 64 72 80 84 88 96`
  — 14px 등 짝수 전 구간. 84·88 같은 4px 미세 단계가 상단에도 있습니다

### 모션 — 동사 시맨틱 + View Transitions

원시 4이징 + 4지속시간 위에 **동사 시맨틱 층**이 있습니다:

```
move · appear-in · disappear · in-view · out-of-view ·
content-change · scale-up · scale-down (+ -pop / -fast 변형)
```

- `ease-out-bounce: cubic-bezier(0.55, 2.05, 0.65, 0.75)` — **오버슈트 2.05**,
  표본 베지어 중 최대 (TDS `back` 1.56을 넘습니다)
- **`view-transition.css`가 MPA 페이지 전환을 토큰화합니다** — 표본 유일.
  `@view-transition { navigation: auto }` + `::view-transition-old/new(root)`에
  fade+slide 조합 변수를 걸고, `prefers-reduced-motion`에서 전체 해제합니다.
  "페이지 전환"이 디자인 토큰의 관할이 된 첫 표본입니다

### 그림자 — filter와 box-shadow를 구분

```
--drop-shadow-lv2-normal: 0 3.25px 3.875px 0 #08121a1f
--box-shadow-lv2-normal:  0 3.25px 7.75px 0 #08121a1f
```

- **`drop-shadow`(filter용)와 `box-shadow` 두 계열을 따로 둡니다** — 같은
  레벨에서 블러 값이 다릅니다 (3.875 vs 7.75). filter와 box-shadow의 렌더링
  차이를 값으로 보정한 표본 유일 사례
- **블러가 소수 px입니다** (3.25 / 3.875 / 4.75 / 7.125) — 그림자 서브픽셀
- lv2/4/6 × weak/normal/strong 9조합, 색은 `#08121a` 알파 3단계

### 서체 — 스택에 버전 번호

```
--font-font-family-basic-version-1: Meiryo, 'Yu Gothic Medium', system-ui, …
--font-font-family-basic-version-2: 'Helvetica Neue', …, 'Hiragino Sans', …
```

**서체 스택 토큰에 `version-1`/`version-2`가 병존합니다** — 마이그레이션
상태가 토큰 이름에 드러난 사례 (TDS의 구 스코프 흔적과 같은 종류의 신호).

### 없는 것

이 패키지에 **컬러·폰트 크기 토큰이 없습니다** — 스페이싱·그림자·모션·서체
스택만 배포합니다. Semi(색만 배포)와 정반대 절단면입니다.
→ **컬러는 `spindle-ui` 패키지에 동봉**돼 있었습니다 (2026-08-18 확인, 심화 절).
폰트 크기는 UI 패키지에도 토큰이 없고 컴포넌트 em 리터럴뿐입니다.

## 컴포넌트 심화 — (2026-08-18)

`@openameba/spindle-ui@3.3.0`을 실측했습니다 (컴포넌트별 CSS + 통합 `index.css`,
클래스 `spui-` 접두). **토큰 패키지에 없던 컬러가 여기 있었습니다** —
"부분 배포 절단면"의 나머지 반쪽이 UI 패키지의 `index.css` `:root`에
원시+시맨틱 2층으로 동봉돼 있습니다.

### 컬러 (UI 패키지 동봉분) — 절단면 해소

- 원시: `primary-green` 11단(5~100) · gray **솔리드/알파 이중 램프**(각 11단) ·
  focus-blue · highlight-yellow · expressive 7색.
- **서드파티 SNS 브랜드색이 토큰입니다** — facebook·twitter·**x**·instagram·
  apple·youtube·amazon·rakuten·yahoo 각 2색(`--color-third-party-*`).
  소셜 로그인/공유 버튼용 타사 브랜드색을 정식 토큰층에 올린 표본 유일 사례.
- **focus 시맨틱이 2종**: `--color-focus-clarity`(#0091ff 불투명) /
  `--color-focus-ambiguous`(30% 알파) — 포커스 표시를 명확/은은 2단으로 분리.

### 버튼 (`.spui-Button`) — 알약 라운드를 em 산식으로

| | small | medium | large |
|---|:--:|:--:|:--:|
| min-height | 32px | 40px | 48px |
| 서체 | .8125em (13px) | .875em (14px) | 1em (16px) |
| 패딩 | 6×10px | 8×16px | 8×16px |
| 라운드 | **2.46154em** | **2.85714em** | **3em** |

- **라운드가 em 산식**입니다 — 2.46154×13=32, 2.85714×14=40, 3×16=48:
  각 크기에서 정확히 min-height와 같은 px가 나오는 **알약의 em 구현**.
  Charcoal(999999px)과 목적은 같고 수단이 다릅니다.
- outlined·danger가 **2px 보더**를 갖고, small에서만 상하 패딩을 6→5px로
  차감해 보더 몫을 보정합니다 (MUI·Vibes와 같은 의도, 부분 적용).
- **hover가 전부 `@media (hover: hover)` 가드 안**에 있습니다 — 터치 우선.
  `-webkit-tap-highlight-color`를 토큰으로 관리하는 표본 유일 사례.
- disabled opacity .3. IE 고대비 모드용 `height: 1px` 핵이 아직 남아 있습니다.
- 변형 5종: contained · outlined · **lighted**(연초록 채움) · neutral · danger.
  포커스는 outline 2px clarity + offset 1px, `:focus:not(:focus-visible)` 해제 —
  단, **모달 안에서는 box-shadow 링으로 교체**됩니다 (backdrop과의 간섭 회피).

### 입력 (`.spui-TextField`)

- 높이 2단 48/40px (버튼의 32px 단이 없음), 라운드 8px, 보더 1px
  medium-emphasis, 패딩 0 16px, 서체 1em.
- focus = 보더 진하게 + **3px `focus-ambiguous` 알파 링** — 버튼(clarity
  outline)과 다른 쪽 focus 토큰을 씁니다. 2종 분리가 실제로 역할 분담.
- **`:user-invalid` 의사클래스** 사용 — 표본에서 가장 새로운 폼 검증 셀렉터.
  `prefers-reduced-motion`에서 transition을 0.1ms로 축소.

### 다이얼로그·모달 — 네이티브 `<dialog>` + @starting-style

- **`<dialog>` + `@starting-style` + `transition: display allow-discrete`** —
  2024 CSS 3종 세트로 진입/퇴장을 구현한 표본 유일 사례입니다. JS 전환
  라이브러리가 없고, `html:has(:modal)`로 배경 스크롤을 잠급니다.
- Dialog(확인창): 폭 **352px, ≥768px에서 328px** — **데스크톱이 모바일보다
  좁아지는 역전**. 라운드 20px, backdrop `rgba(0,0,0,.8)`,
  진입 .35s / 퇴장 .15s 비대칭, `cubic-bezier(0,0,0,1)`.
- SemiModal: popup/sheet 2형 × 폭 small 480 / medium 840 / large 1024px.
  sheet는 translateY(100%) 슬라이드업. AppealModal(프로모션)은 .5s로 더 느림 —
  용도별 지속시간 차등.
- 그림자 `0 11px 28px rgba(8,18,26,.12)` — 토큰 절의 `#08121a` 그림자색 일치.

### 특징적 결정 (심화분)

- **네이티브 `<dialog>` + @starting-style + allow-discrete** — 표본 유일
- **컬러가 UI 패키지에 동봉** — 토큰 패키지 절단면의 해답이 배포 위치였음
- **em 산식 알약 라운드** (라운드 = min-height)
- **focus 토큰 2종(clarity/ambiguous)의 역할 분담** — 버튼 outline vs 입력 링
- **SNS 브랜드색 토큰** + hover의 `@media (hover:hover)` 전면 가드
- 다이얼로그 폭 역전 (모바일 352 > 데스크톱 328px)

## 특징적 결정

- **뷰포트별 CSS 파일 3벌** — 같은 토큰명, 다른 값 (모바일 lv1=2px, 데스크톱 4px)
- **View Transitions API 토큰화** — 표본 유일, 페이지 전환의 첫 토큰 데이터
- **drop-shadow/box-shadow 이원화 + 소수 px 블러** — 표본 유일
- 오버슈트 2.05 베지어 — 표본 최대
- 서체 스택에 버전 번호 — 마이그레이션이 토큰 이름에
- 동사형 모션 시맨틱 (move/appear/disappear/in-view…)
- 컬러·크기 없음 — 부분 배포 절단면

## 접근성

- `prefers-reduced-motion`에서 View Transition 전체 해제 (토큰 파일에 내장)
- ~~그 외 미확인~~ → **WCAG 2.1 기반 자체 가이드라인 (2026-08-18 해소)**
  출처: `spindle.ameba.design/principles/accessibility/` — "WCAG2.1の内容を簡略化し、
  Amebaのサービスでよくある事例を追加したガイドラインを独自で作成"(Ameba Accessibility
  Guidelines). **SmartHR와 같은 구조입니다** — WCAG를 그대로 목표로 걸지 않고
  자체 가이드라인으로 번역해 둡니다.

## 참고

- 토큰: `npm pack @openameba/spindle-tokens@1.10.0`
- 컴포넌트 심화: `npm pack @openameba/spindle-ui@3.3.0` →
  `index.css` + `<컴포넌트>/*.css` (2026-08-18)
- **남은 확인 사항:** ~~컬러(`spindle-ui` 내부 추정 — 미조사)~~ (2026-08-18 해소 —
  UI 패키지 `index.css`에 동봉, 심화 절), 타이포 크기 토큰(여전히 없음 —
  컴포넌트에 em 리터럴만), Figma 킷,
  `spindle-mcp-server`(MCP 서버를 배포하는 표본 유일 사례 — 미조사)
