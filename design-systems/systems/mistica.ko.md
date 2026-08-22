---
name: Mística
org: Telefónica
coverage: partial
url: https://mistica-web.vercel.app
repo: https://github.com/Telefonica/mistica
license: MIT
tech: [React]
figma_kit: false
tokens_format: [JS]
a11y_target: "명시 없음 확인 (2026-08-18 — 스토리북 135개 엔트리에 접근성 유틸만 있고 WCAG 목표 문서 부재)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @telefonica/mistica@17.1.0 → dist-es/skins/*.js (16.44.1에서 재검증 — 아래 정정 참조)"
---
<!-- lang-links -->
> [English](mistica.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Telefónica(통신 그룹)의 시스템 — **브랜드 스킨 8종**(movistar · o2 · vivo ·
vivo-evolution · blau · telefonica · esimflag)이 한 패키지에 들어 있고,
라운드가 **컴포넌트 시맨틱 전용**입니다.
**16.44.1에 있던 고대비(HC) 원시 토큰이 17.1.0에서 사라졌습니다** —
코퍼스가 버전 간 토큰 변화를 잡은 첫 사례입니다.

## 토큰 — 스킨(skin) 단위 배포

`skins/` 디렉터리에 브랜드별 전체 토큰 세트가 있습니다 (17.1.0):
`movistar` · `o2` · `vivo` · `vivo-evolution` · `blau` · `telefonica` ·
`esimflag` (+ `defaults`). **Auro(3벌)를 넘는 표본 최다 멀티 브랜드**입니다.
16.44.1에는 `movistar-new`·`o2-new`·`vivo-new` 쌍이 있었습니다 —
리브랜딩 이행기의 신구 병행이었고 지금은 정리됐습니다.

### 고대비(HC) 토큰이 17.1.0에서 사라졌습니다

> **버전 간 변화 — 코퍼스가 실제로 잡은 첫 사례.**
> 16.44.1에는 원시 팔레트에 `HC`(High Contrast) 변형이 병기돼 있었습니다:
> ```js
> movistarBlue: "#0B9CEA"  ·  movistarBlueHC: "#066FCB"  ·  movistarBlueHC55: "#055EAC"
> ```
> **17.1.0에는 `HC` 토큰이 하나도 없습니다** (`movistarBlue` 단일).
> 고대비를 원시 램프의 형제 값으로 두는 방식(당시 표본 유일 배치)이
> **버전 업에서 제거**됐습니다. 어디로 갔는지는 이 패키지에서 확인되지 않습니다 —
> 시맨틱 층으로 옮겼는지, 기능을 뺀 것인지 미확정입니다.
>
> **스킨 목록도 바뀌었습니다** — `-new` 접미 쌍(`movistar-new`·`o2-new`·`vivo-new`)이
> 사라지고 `vivo-evolution`이 생겼습니다. 리브랜딩 이행이 끝난 형태입니다.
> `tag` 라운드도 24px → **0px**으로 변경됐습니다.

현재(17.1.0) 스킨 8종: `movistar` · `o2` · `vivo` · **`vivo-evolution`** ·
`blau` · `telefonica` · `esimflag` (+ `defaults`).

### 라운드 — 전부 컴포넌트 시맨틱

```js
avatar: "50%" · bar: "999px" · button: 4 · checkbox: 4 · input: 12
container: 16 · popup: 8 · sheet: 16 · chip: 24 · indicator: 24 · tag: 0  ← 17.1.0에서 24→0
```

**크기 스케일(s/m/l) 없이 컴포넌트 이름 13개가 전부입니다** —
Cloudscape의 시맨틱 라운드를 끝까지 밀어붙인 형태.
`avatar 50%`/`bar 999px`는 알약/정원 이원화(`GLOSSARY.md`)를
컴포넌트 층위에서 하는 것입니다.

### 텍스트 프리셋 — 컴포넌트별 + 뷰포트 쌍

```js
chipLabel: { size: { desktop: 16, mobile: 14 }, lineHeight: { desktop: 24, mobile: 20 } }
```

**컴포넌트 텍스트마다 desktop/mobile 값 쌍**을 둡니다 — Spindle(스페이싱
파일 3벌)·Spectrum(sets)과 같은 뷰포트 이원화가 타이포에 적용된 사례.
desktop 16 / mobile 14의 방향은 Serendie(expanded 16/compact 14)와 같습니다.

## 컴포넌트 심화 — (2026-08-18)

`@telefonica/mistica@17.1.0`의 vanilla-extract 산출물을 실측했습니다 —
`dist-es/*.css-mistica.js`(클래스·계약 export) + `dist-es/style.css`(컴파일 CSS)
+ `dist-es/skins/*.js`(스킨별 실값). 해시 변수는 `skins/skin-contract.css-mistica.js`의
시맨틱 매핑으로 역추적해 전부 해석했습니다.

### 버튼 — 보더가 1.5px입니다

| | default | small |
|---|:--:|:--:|
| **min-width** | **104px** | 80px |
| 보더 | **1.5px** solid | 동일 |
| 상하 패딩 | `calc(12px − 1.5px)` = **10.5px** | `calc(6px − 1.5px)` = 4.5px |
| 좌우 패딩 | 스킨 슬롯 − 1.5px (movistar: 16−1.5 = 14.5px) | 동일식 |
| 서체 | Text3: mobile **16/24** · desktop 18/24 | 14/20 |
| **파생 높이** | **48px** (24 + 10.5×2 + 1.5×2) | 32px |

- **보더 두께가 1.5px — 표본 유일의 소수 보더**입니다. 그리고 모든 패딩이
  `calc(값 − 1.5px)`로 보더를 차감합니다 (MUI −1px·Helios −1px과 같은 원리를
  소수점으로).
- **라운드만 브랜드가 갈립니다**: 같은 48px 지오메트리에 movistar·blau는 **4px**,
  o2·vivo·vivo-evolution·telefonica·esimflag는 **32px**(사실상 알약) —
  스킨 8종의 버튼 인상 차이가 라운드 하나로 만들어집니다.
- min-width 104/80px — 명시 최소 폭 진영(MUI 64px)이되 값이 훨씬 큽니다.
- 로딩 상태가 **텍스트↔스피너 수직 스왑**입니다: 두 층이 `translateY(±2rem)`으로
  엇갈려 300ms `cubic-bezier(.77, 0, .175, 1)` — 색 전환(100ms ease-in-out)과
  다른 전용 곡선입니다.

### 입력 (TextField) — 높이가 없고 전부 패딩 산식

| | 값 |
|---|---|
| 기본 폭 | **328px** (`DEFAULT_WIDTH`) |
| 값 서체 | 16px / 22px (`inputValue` — mobile·desktop 동일) |
| 라벨 | desktop 14px / mobile 12px — 축소 배율 = **`calc(라벨 ÷ 값)`** = desktop 0.875 / mobile 0.75 |
| 좌우 패딩 | 좌 **11px** / 우 **15px** (비대칭 리터럴) |
| 상하 패딩 | `라벨행간 + calc(inputPadding − 1px)` — mobile 9px / desktop 3px 이중값 |
| 라운드 | 스킨 `input` 슬롯 − 1px (movistar 12px → 내부 11px) |

- 플로팅 라벨의 축소 배율이 상수(0.75 관행)가 아니라 **`라벨크기 ÷ 값크기`
  나눗셈**으로 스킨마다 계산됩니다.
- `inputPadding`이 mobile 9 / desktop 3으로 갈려 **모바일에서 더 큰 터치 타깃**이
  토큰 층에서 만들어집니다 (토큰 절의 슬롯별 이중값이 실제로 쓰이는 지점).
- 컨테이너에 고정 높이 선언이 없습니다 — 라벨·패딩·행간 합산 파생.

### 다이얼로그 — 데스크톱 폭이 680px 하나

| | 기본 | 대화면 |
|---|---|---|
| 폭 | `calc(100vw − 48px)` | **680px 고정** |
| 패딩 | 24px (아이콘 버튼 영역 별도) | **40px** |
| 라운드 | `container` 슬롯 (movistar 16px · blau 8 · telefonica 4) | 동일 |

- **폭 단계가 없습니다** — 680px 단일 + 유동. Cloudscape 5단·Helios 3단과
  대극의 최소주의입니다.
- 대화면 분기가 **`min-width: 1024px` AND `min-height: 550px`** — 폭만이 아니라
  **높이까지 게이트**로 거는 표본 드문 미디어 쿼리입니다.
- 진입: 오버레이 페이드 + 콘텐츠 `scale(0.8)→1`, **200ms ease-in-out**
  (`ANIMATION_DURATION_MS = 200` — 지속시간이 JS 상수로도 export됩니다).
- 다이얼로그 라운드가 전용 값 없이 **`container` 슬롯 재사용** — 카드와 같은 라운드.

### 특징적 결정 (심화분)

- **1.5px 보더 + 전 패딩의 −1.5px 차감** — 표본 유일 소수 보더
- **브랜드 분기가 라운드·패딩 슬롯에 국한** — 지오메트리(48px)는 8스킨 공통,
  버튼 라운드 4↔32px가 인상을 가름
- 플로팅 라벨 배율이 나눗셈 파생(0.875) — 상수 아님
- 다이얼로그 폭 680px 단일 — 표본 최소 단계
- 로딩 스왑 전용 이징 `(.77, 0, .175, 1)` — 색 전환과 곡선 분리

## 특징적 결정

- **브랜드 스킨 8종 단일 패키지** — 표본 최다 멀티 브랜드
- **고대비(HC)가 16.44.1에서는 원시 램프 안에 있었고 17.1.0에서 제거됨** —
  코퍼스가 버전 간 토큰 변화를 잡은 첫 사례
- **라운드가 컴포넌트 시맨틱 13개뿐** — 크기 스케일 없음
- 컴포넌트 텍스트의 desktop/mobile 값 쌍
- `-new` 스킨 쌍이 17.1.0에서 정리되고 `vivo-evolution`으로 대체 — 이행 완료
- 램프 단계에 15·55 — 비균등 표본 유일 조합 (16.44.1 기준)

## 접근성

- **16.44.1**: 고대비 값이 원시 팔레트에 내장 (HC 계열)
- **17.1.0**: HC 토큰 없음 — ~~고대비 대응 위치 미확인~~ → **문서 사이트에도 없음
  확정 (2026-08-18, 헤드리스 렌더)**

**준수 목표(WCAG 버전·등급)는 공개하지 않습니다.** 문서 사이트가 스토리북 한 벌이고,
엔트리 **135개**(`index.json` 실측)에 접근성 문서가 없습니다. 렌더한 페이지 전체에서
`WCAG` 문자열 **0회**, 고대비(high contrast) 관련 문서도 **0건**입니다 —
17.1.0에서 사라진 HC 토큰의 행선지는 **원천 저장소에 이어 문서 사이트에서도
확인되지 않습니다**(C 확정).

대신 **접근성 유틸을 컴포넌트로 제공합니다** — 스토리북에
`Utilities/Accesibility/FocusTrap` · `Utilities/Accesibility/ScreenReaderOnly`
(디렉터리 철자가 스페인어 영향으로 `Accesibility`, s 하나입니다)와
`Components/SkipLink`가 있습니다. ScreenReaderOnly 스토리는 "There is a hidden
message in this screen that's only accessible to screen readers"라는 실동 예시로
확인됩니다.
출처: https://mistica-web.vercel.app/ ·
https://mistica-web.vercel.app/?path=/story/utilities-accesibility-screenreaderonly--default
(2026-08-18 헤드리스 렌더)

## 참고

- 토큰: `npm pack @telefonica/mistica@17.1.0` → `dist-es/skins/*.js`
  (`check-sources.mjs`가 16.44.1 → 17.1.0 major 드리프트를 보고해 재수집했고,
  실제로 HC 토큰 제거·스킨 목록 변경을 확인했습니다)
- ~~HC 토큰이 옮겨간 곳~~ → **원천에서도 사라진 것 확인 (2026-08-17).**
  디자인 토큰의 원천 저장소(`Telefonica/mistica-design` `tokens/*.json`,
  2026-08-15 커밋 기준)를 열었더니 **`contrast` 계열 키가 전무**합니다 —
  npm 패키징 문제가 아니라 **업스트림에서 제거**된 것입니다.
- **원천 토큰 보너스 확보:** 스페이싱이 스케일이 아니라 **컴포넌트 슬롯별**
  (`buttonDefaultPadding` · `cardDefaultPadding`…)이고 **mobile/desktop 이중값**
  입니다 — `inputPadding` 상하가 mobile 9 / desktop 3으로 갈리는 식.
  라운드도 역할별 열거(button·checkbox 4 / popup 8 / input 12 /
  container·sheet 16 / chip·indicator 24 / tag 0 / bar 999)로,
  npm에서 본 값들의 출처가 이 구조입니다.
- 컴포넌트 심화: 같은 패키지 `dist-es/{button,text-field-base,dialog}.css-mistica.js` +
  `dist-es/style.css` + `skins/*.js` (2026-08-18)
- **Figma 킷 — 부재 확정 (2026-08-18, 헤드리스 렌더):** 렌더링해도 이 시스템은
  Figma 킷을 공개하지 않습니다. 스토리북 전체 렌더에서 "Figma" 문자열이 **0회**이고,
  Welcome 문서가 안내하는 디자인 도구는 **Playroom**입니다 — "For quick prototyping
  using Mística components, use the Mística Playroom … you can simultaneously design
  across a variety of themes and screen sizes, powered by JSX and Mística components
  library". **디자인 도구 자리를 코드 기반 플레이룸이 대신하는 배치**입니다.
  외부 링크도 `github.com/Telefonica/mistica`(디자인 토큰 원천) ·
  `mistica-web#getting-started` 둘뿐입니다.
  출처: https://mistica-web.vercel.app/?path=/story/welcome--welcome (2026-08-18 렌더)
- **남은 확인 사항:** ~~접근성 목표~~ ~~Figma 킷~~ (2026-08-18 — 문서 사이트 렌더로
  둘 다 부재 확정), 컴포넌트 목록 전수, 다크 모드 상세,
  RN 패키지(`mistica-react-native`). ~~라이선스~~ → package.json에 **MIT** 명기
  확인 — frontmatter 반영 (2026-08-18)
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github Telefonica/mistica-web → `LICENSE` (npm `@telefonica/mistica@17.1.0` 메타와 일치). frontmatter의 `repo`(Telefonica/mistica)에는 LICENSE 파일이 없습니다
