---
name: Vibes
org: freee
coverage: partial
url: https://vibes.freee.co.jp
repo: https://github.com/freee/vibes
license: Apache-2.0
tech: [React, SCSS]
figma_kit: false
tokens_format: [JS, SCSS]
a11y_target: "freee 접근성 가이드라인 준거 — WCAG 2.1 기반, 등급 목표는 명시 없음 (2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @freee_jp/vibes@100.1.0 → dist/constants/{Color,Size,Font,ZIndex}.js + vibes_2021.css"
---
<!-- lang-links -->
> [English](vibes.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

일본 회계 SaaS freee의 시스템 — **구세대·2021세대 팔레트가 한 파일에 병존**하고,
폰트 토큰 이름에 **rem 값이 4자리로 인코딩**(`FontSize0875`)돼 있으며,
z-index를 토큰화한 **다섯 번째** 시스템입니다. 메이저 버전 **100**.

## 토큰 — JS 상수 + BEM CSS

CSS에 커스텀 프로퍼티가 **0개**입니다 — 값은 전부 리터럴이고,
토큰은 JS 상수(`dist/constants/`)로만 배포됩니다 (Semi의 절단면과 유사).

### 컬러 — 두 세대 병존

```js
// 구세대
VibesBase1Color: '#efede8'   // 웜 베이지
VibesPrimaryCorpColor: '#4575b4'  // 회계(Corp) 제품
VibesPrimaryHrColor:   '#338650'  // 인사(HR) 제품
// 2021세대
Colors2021P01~P10, S01~S10, RE·OR·YE… (희소 램프)
```

- **구세대와 "2021" 세대가 같은 상수 파일에 병존합니다** — 파일명도
  `vibes_2021.css`. Spindle(서체 version-1/2)·Mística(`-new` 스킨)에 이어
  **마이그레이션 노출 세 번째**, 규모는 최대입니다
- **제품군별 프라이머리** (Corp 파랑 / HR 초록) — Charcoal의 brand-color
  5종과 같은 멀티 제품 구조
- 2021 램프가 **희소합니다** — `RE02·04·05·07·10`처럼 쓰는 단계만 둡니다.
  10단계를 채우는 다수와 다른 선택

### 타이포 — 값이 이름에 인코딩

```js
FontSize0875 = '0.875rem'  // 14dp — design-token (직접 쓰지 말 것)
CaptionFontSize = FontSize0750  // semantic-token (이걸 쓸 것)
```

- **이름이 rem 소수 4자리입니다** (`0875` = 0.875rem) — Primer(px 실값
  이름)의 rem 판. 주석으로 design-token/semantic-token 층을 구분하고
  **"컴포넌트에서 직접 쓰지 마세요" 경고가 주석에** 있습니다
- 실사용 분포: **14px ×27 · 12px ×25 · 16px ×18** — 14px 지배.
  일본 업무 SaaS가 중화권(Ant·Semi)과 같은 14px 진영입니다

### z-index — 다섯 번째 토큰화, 다섯 번째 산법

```
Overlay 100 · FormActions 200 · Floating 500 · Modal 1000 · MessageModal 1500
Popup 2000 · PopupMessage 3000 · FixedMessage 4000 · Max 2147483647
```

Chakra(100 등차)·Bootstrap(1000대+5)·Open Props(서수)·Forma 36(10ⁿ)에 이어
**불규칙 점프(100→4000) 방식**입니다 — 5개 시스템이 5가지 산법.
`Popup`(2000)이 `Modal`(1000)보다 위라는 순서도 다른 시스템과 어긋납니다.

### 사이즈 — 웹인데 주석 단위가 dp

```js
XSmallSize '0.25rem' // 4dp … FormControlHeight '2.25rem' // 36dp
MobileBoundaryWidth '48rem'  // iPhone 8との境界
```

rem 값에 **dp 주석**을 답니다 — 웹 시스템이 모바일 어휘로 스스로를
설명하는 표본 유일 사례. 브레이크포인트 주석에 iPhone 8이 명시돼 있습니다.
컨트롤 높이 36px(기본)/24/48은 Blueprint(30px)과 다른 자리입니다.

## 컴포넌트 심화 — (2026-08-18)

`@freee_jp/vibes@100.1.0`의 `vibes_2021.css`(BEM `vb-` 접두)를 실측했습니다.
컴포넌트 계층이 **`dist/lv1`(단품 — 16카테고리, 버튼만 14종) /
`dist/lv2`(조합 — 56 디렉터리)로 파일 시스템에 노출**돼 있습니다 —
atomic 계층을 배포 구조가 증언하는 형태.

### 버튼 (`.vb-button`) — 행간이 높이−2px

| | small | 기본 | large |
|---|:--:|:--:|:--:|
| **height (고정)** | 1.5rem (**24px**) | 2.25rem (**36px**) | 3rem (48px) |
| 행간 | calc(24px−2px) | **calc(36px−2px)** | calc(48px−2px) |
| 서체 | 12px | 14px | 16px |
| 좌우 패딩 | 8px | 16px | 16px |
| 라운드 | 8px | 8px | 8px |

- **`line-height: calc(높이 − 2px)`** — 보더 1px×2 몫을 행간에서 차감해
  텍스트를 수직 중앙에 놓습니다. Garden의 역산 행간과 같은 수법인데,
  **보더가 없는 primary에도 같은 식을 적용**해 변형 간 텍스트 위치를
  맞춥니다. 기본 36px는 토큰 절의 `FormControlHeight 2.25rem // 36dp`와 일치.
- appearance 3종(primary `#285ac8` · secondary 흰+보더 · tertiary 투명) ×
  **danger는 변형이 아니라 수식어**(`--danger`)로 조합합니다. 전 변형 bold.
- min-width가 기본 없음 + **옵트인 수식어**(`--hasMinWidth`): 96/80/176px.
- 전환 0.2s (background-color · color · box-shadow · border-color).

### 포커스 — 흰·파랑·흰 3겹 샌드위치 링

```
box-shadow: 0 0 0 1px #fff, 0 0 0 3px #2864f0, 0 0 0 4px #fff
```

- 배경색과 무관하게 링을 분리하는 **3겹 구조** — 버튼·select에만 걸립니다.
- **텍스트 입력에는 커스텀 링이 없습니다** (브라우저 기본 위임) — 대신
  `lv1/a11y/FocusHighlight` 래퍼 컴포넌트를 따로 배포해 임의 요소에
  같은 링을 씌울 수 있게 했습니다 — 포커스 링을 컴포넌트로 배포한 드문 사례.
- placeholder가 **focus 시 opacity 0으로 사라집니다** (0.3s) — 유지파 다수와
  갈리는 선택.

### 입력 (`.vb-textField`) — 폭 프리셋 4단

- 높이 3단 **24/36/48px + 라운드 8px를 버튼과 그대로 공유** — 폼 행에서
  버튼·입력이 같은 격자에 앉습니다. 보더 `#dcdcdc`, error 시 보더뿐 아니라
  **입력 텍스트·placeholder까지 `#dc1e32`**.
- **폭 프리셋 4단**: XSmall 4rem(64) · Small 7rem(112) · Medium 11rem(176) ·
  Large 24rem(384px) — 컨트롤 폭을 T셔츠로 토큰화한 드문 사례.
- disabled 배경 `#f0eded` + `cursor: not-allowed`.

### 다이얼로그 — 폭이 단계가 아니라 범위

- TaskDialog·MessageDialog 공통: **min-width 40rem(640px) · max-width
  70rem(1120px)** — 고정 폭 단계 없이 **min/max 범위로만 규정**합니다.
  내용이 폭을 정하는 방식으로, 단계형(Charcoal 336/440/648) 다수와 갈립니다.
- `dialogBase` 라운드 **1.5rem(24px)** — 업무 SaaS인데 표본 상위 라운드.
  헤더/푸터 패딩 24px, 본문 상하 보더 `#e9e7e7`.
- scrim `rgba(0,0,0,.5)` z 999 → dialog z 1000 → message z 1500 —
  **다이얼로그 z값(1000·1500)이 JS 상수(`ZIndex.js`의 Modal·MessageModal)와
  일치**합니다. 커스텀 프로퍼티 0개 체제라 CSS 리터럴과 JS 상수의 이중
  기재를 수작업 동기화로 버티는 구조입니다 (scrim 999는 CSS에만 있음).
- `max-height: calc(100svh − 2rem)` — svh 병기 (구형 fallback 100vh).

### 서체 스택 — 일본어 서체명 이중 등재 (i18n 축 교차)

모든 룰에 스택이 리터럴로 반복되는데(변수 0개의 귀결), 일본어 서체가
**한자 표기와 로마자 표기로 이중 등재**돼 있습니다:

```
"ヒラギノ角ゴ ProN", Hiragino Kaku Gothic ProN, …, "メイリオ", Meiryo
```

구형 브라우저·OS의 폰트명 해석 차이 대응 — CJK 시스템 특유의 방어책입니다.
폼 기본이 `font: normal 0.875rem/1.5` — **14px·행간 1.5**로 CJK 14px 진영을
컴포넌트 층에서도 재확인합니다.

### 특징적 결정 (심화분)

- **행간 = 높이−2px 산식**을 보더 없는 변형까지 일괄 적용
- **3겹 샌드위치 포커스 링** + 입력은 무링 — 포커스 링의 컴포넌트화(FocusHighlight)
- **다이얼로그 폭이 범위(640~1120px) 규정** — 단계형 다수와 대극
- **입력 폭 토큰 4단** (64/112/176/384px)
- 일본어 서체명 이중 등재 + placeholder 소멸형 focus

## 특징적 결정

- **팔레트 두 세대 병존 + 연도 파일명** — 마이그레이션 노출 표본 최대
- **rem 값 인코딩 이름**(`FontSize0875`) + 사용 경고 주석
- **z-index 토큰화 5번째** — 산법도 5번째 (불규칙 점프)
- 제품군별(Corp/HR) 프라이머리 분기
- 희소 램프 (쓰는 단계만)
- 실사용 14px 지배 — 일본 SaaS의 14px 진영 합류
- 메이저 버전 100 — SmartHR(99)을 넘는 표본 최대

## 접근성

~~미확인 (lv0에 `_focus.scss` 존재 — 미조사)~~ → 포커스 체계 실측 (2026-08-18):
3겹 샌드위치 링 + FocusHighlight 래퍼 컴포넌트 (심화 절).

~~명시적 준수 목표는 여전히 미확인.~~ → **해소 (2026-08-18, 헤드리스 렌더).**

Vibes는 **자체 준수 목표를 쓰지 않고 모회사 가이드라인에 위임**합니다.
Storybook Readme가 "スクリーンリーダーに関しては
**アクセシビリティー・ガイドラインの標準環境**に準じます"라고 적고
**freee 접근성 가이드라인**(freeeアクセシビリティー・ガイドライン,
https://a11y-guidelines.freee.co.jp/)을 링크합니다.

그 가이드라인은 "**Web Content Accessibility Guidelines (WCAG) 2.1 に基づいて策定**"
(WCAG 2.1에 기반해 책정)이라고 밝히지만, **"AA 준수" 같은 등급 선언은 하지 않습니다.**
대신 자체 항목마다 WCAG 2.1 달성기준·레벨 대응표를 별도 문서로 제공합니다
("WCAG 2.1の各達成基準と当ガイドラインの項目との対応" ·
"当ガイドラインとWCAG 2.1の各達成基準のレベル").
문서 버전은 `Ver. 202603.0-RELEASE+7.0.0`, 라이선스는 **CC BY 4.0**입니다.

**검증 환경도 명시돼 있습니다** (Vibes Readme):

| 항목 | 내용 |
|------|------|
| 스크린리더 기준 | **Windows + Chrome + NVDA** 동작 확인 기준 |
| 보조 | 간이 테스트용으로 **VoiceOver 병용** |
| 브라우저 | Chrome · Edge(Chromium) · Firefox · Safari |
| 예외 | "일부 브라우저에서만 발생하는 결함은 버그로 대응하지 않는 판단을 할 수 있음" |

**등급 대신 검증 환경을 계약으로 적은** 유형입니다.

출처: https://vibes.freee.co.jp/iframe.html?id=doc-readme--docs&viewMode=docs (렌더 확인) ·
https://a11y-guidelines.freee.co.jp/intro/index.html (2026-08-18)

## 참고

- 토큰: `npm pack @freee_jp/vibes@100.1.0` → `dist/constants/`
- 컴포넌트 심화: 같은 패키지 `vibes_2021.css` + `dist/lv1`·`dist/lv2` (2026-08-18)
- **디자인 소스는 Figma가 아니라 Sketch입니다 (2026-08-18, `figma_kit: false`)** —
  Storybook Readme가 "コーディングをせずに画面デザインを行う場合には
  **Sketch を使用してください**。vibes の Library ファイルは **Sketch Cloud** で
  配布しています。必要な場合は **UX チームにお問い合わせください**"라고 적습니다.
  즉 ① 도구가 Sketch, ② 배포처가 Sketch Cloud, ③ **사내 요청 기반 비공개**입니다.
  같은 문단이 "vibes のコンポーネントには、**Figma では表現しきれない制約**が
  存在しています"라며 Figma를 언급하지만, 이는 **킷 제공이 아니라 한계 경고**이고
  "사양은 Storybook에서 확인하라"로 이어집니다.
  코퍼스에서 **Sketch를 현역 배포 도구로 명시한 드문 사례**입니다 (C 분류 — Figma 킷 부재).
  출처: https://vibes.freee.co.jp/iframe.html?id=doc-readme--docs&viewMode=docs (렌더 확인, 2026-08-18)
- **남은 확인 사항:** ~~컴포넌트 목록(lv1/lv2 구조)~~ (2026-08-18 해소 — 심화 절),
  다크 모드, ~~접근성 목표~~ (2026-08-18 해소 — 위 접근성 절),
  구세대→2021 마이그레이션 상태
