---
name: Unify
org: Tokopedia (GoTo)
coverage: partial
url: https://unify.tokopedia.com
repo: null
license: MIT
tech: [React, Android]
figma_kit: 미확인
tokens_format: [JS, XML]
a11y_target: 미확인
platform: [web, mobile]
domain: commerce
verified: 2026-08-18
source: "npm unify-tokens@0.0.4 → build/{spacing,typography,color,grid}.{js,xml} · npm unify-react-desktop@0.24.2 · unify-react-mobile@3.40.13 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](unify.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Tokopedia의 시스템 — **동남아 두 번째 표본**입니다.
같은 토큰을 **JS와 Android XML 두 형식으로 동시 배포**하고(px ↔ dp 변환 포함),
서체를 **플랫폼 5종별로 지정**하며(iOS SF Pro / Android Roboto),
스페이싱과 레이아웃을 `sp`/`ly` 접두로 나눕니다.

## 토큰 — JS + Android XML 이중 형식

```js
// build/spacing.js
spacing = { sp2: 2px, sp4, sp8, sp16, sp24, sp32, sp40, sp48 }
layout  = { ly8, ly24, ly32, ly40, ly48, ly64, ly96, ly128 }
```

```xml
<!-- build/spacing.xml — 같은 값의 Android 리소스 -->
<dimen name="spacing.sp2" category="spacing">2dp</dimen>
```

- **웹용 JS와 안드로이드용 XML을 같은 소스에서 함께 냅니다** — `px`이
  `dp`로 바뀝니다. 표본에서 Android 리소스 XML을 배포하는 것은 Unify뿐입니다
  (TDS·Yoga는 RN 패키지이지 네이티브 리소스가 아닙니다)
- **`sp`(컴포넌트) / `ly`(레이아웃) 접두 분리** — Tegel(element/layout) ·
  Vanilla(strip) · Pharos(gutter)에 이은 레이아웃 여백 분리 진영.
  둘 다 8단계 대칭입니다
- 이름이 값 그대로 (`sp16` = 16px) — Primer식
- 스페이싱에 **12·20이 없습니다** (2·4·8·16·24·32·40·48) — 코어 준수

### 타이포 — 플랫폼 5종 서체 + 값-이름

```js
fontType = { stackHeading: 'Nunito Sans', desktop: 'Open Sans',
             lite: 'Open Sans', ios: 'SF Pro Text', android: 'Roboto' }
fontSize = { fz10 … fz38 }   // 10·12·14·16·18·20·24·28·34·38
lineHeight = { lh16 … lh44 }
fontWeight = { regular 400, bold 700, extraBold 800 }
```

- **서체를 플랫폼·용도 5종으로 지정합니다** — `ios`/`android`가 각 OS
  시스템 서체이고, `lite`는 경량 웹(저사양 기기용 Tokopedia Lite) 전용입니다.
  **저사양 기기용 별도 서체 슬롯은 표본 유일**이며, 동남아 시장의
  기기 스펙 분포가 토큰에 반영된 자리입니다
- 크기가 **10~38px 10단계**, 34·38 같은 비관행 상단값
- 굵기에 **800(extraBold)**이 있고 500·600이 없습니다

### 컬러 — N0~N700 + 램프 접두 1글자

```js
Neutral = { N0: #FFFFFF, N50, N75, N100, N150, N200, …, N700 }
Red = { R100, R200, R300, … }
```

**색 이름이 한 글자 접두 + 번호**입니다 (`N`eutral · `R`ed).
중립에 `N50`·`N75`·`N150` 같은 **중간 삽입 단계**가 있어 램프가 비균등합니다.

### 그리드 — 브레이크포인트 + 거터 쌍

```xml
breakpoint.mobile 768dp · tablet 1024dp · desktop 1200dp
gutter.mobile 8dp · tablet 12dp · desktop 16dp
```

Yoga(폭+마진+거터 묶음)와 같은 판단 — 브레이크포인트와 거터를 함께 둡니다.

## 특징적 결정

- **동남아 두 번째 표본** (Gojek Asphalt 다음, 둘 다 GoTo 그룹)
- **JS + Android XML 이중 배포** (px ↔ dp) — 표본 유일
- **저사양 기기용(`lite`) 서체 슬롯** — 표본 유일
- `sp`/`ly` 스페이싱 8:8 분리
- 굵기 400/700/800 (중간 굵기 없음)
- 색 이름 한 글자 접두 + 비균등 중립 램프

## 컴포넌트 심화 — (2026-08-18)

`unify-react-desktop@0.24.2`(빌드 디렉터리 59개) · `unify-react-mobile@3.40.13`
(86개) — react-emotion CSS-in-JS. 실측은 `build/<Component>/style.js`의
styled 직렬화 문자열입니다.

**컴포넌트가 소비하는 토큰은 `unify-tokens`(0.0.4)가 아니라 별개 단수형
패키지 `unify-token@3.0.0`입니다** (`build/v2/` 체계). 서체부터 다릅니다 —
desktop이 Open Sans가 아니라 **'Open Sauce One'** (0.0.4는 구세대 스냅샷으로
보입니다). 그리고 `unify-token`에는 **색맹 3종 대응 CSS**(deuteranopia ·
protanopia · tritanopia 별도 파일)가 배포됩니다 — 색각 이상 팔레트를 토큰
층에서 배포하는 표본 첫 사례. 크기 스케일은 10~38px 10단계로 동일합니다
(이름만 `fz16` → `fontSizeLv4` 레벨식으로 변경).

### 버튼 — 높이 4단, 굵기 800 단일

| micro | small | 기본 | large |
|:--:|:--:|:--:|:--:|
| 24px | 32px | **40px** | 48px |

- 라운드 8px · 패딩 0 16px · **font-weight 800(extraBold) 단일** —
  토큰의 800이 버튼 기본값입니다 (700이 아니라).
- 폰트 12/14/16px(소/중/대), transition **300ms cubic-bezier(0.63,0.01,0.29,1)**
  (`durationDefault`·`easeDefault`).
- 모바일 버튼은 `:before` radial-gradient **리플 효과** — 안드로이드 관행의
  웹 이식. 변형 어휘가 main/transaction × filled/ghost (+primary·secondary
  구세대 별칭) 2축입니다.

### 입력 (TextFieldV2) — 플로팅 라벨

- 라벨이 값/포커스에서 **14px→12px로 축소돼 떠오르는** Material식 플로팅
  라벨입니다 (전환 300ms ease-in-out).
- input 자체는 border 0 · 패딩 12px 0 · 14px Regular/행간 20px —
  보더는 래퍼가 담당합니다.

### 모달 — 폭 프리셋 없음

- desktop `Modal`: 폭·높이·min이 전부 prop — **프리셋 0단계**
  (Backpack 2단·Cloudscape 5단의 반대극). 라운드 8px, 콘텐츠 패딩
  24px 32px 32px, 그림자 0 1px 4px rgba(#7C8597,.4), 닫기 버튼 32px.
- mobile `Dialog`: 중앙 카드 + 일러스트 180px/아이콘 80px 슬롯,
  패딩 (30|24)px 16px 16px.

### 포커스 — 점선 보라

`:focus-visible` → **outline 2px dotted #9342ED(PN500) offset 3px** —
점선(dotted) 포커스는 표본 희귀, 색은 브랜드 보라 계열입니다.

## 접근성

~~미확인.~~ → 토큰 층에 **색맹 3종(적록 2종+청황) 대응 팔레트 CSS**가
있습니다 (`unify-token@3.0.0` — 위 심화 절). 그 외 목표 기준은 미확인.

## 참고

- 토큰: `npm pack unify-tokens` (0.0.4) → `build/` — 단,
  **실사용 토큰은 `unify-token@3.0.0`** (위 심화 절, 2026-08-18)
- 컴포넌트: `unify-react-desktop@0.24.2` · `unify-react-mobile@3.40.13` ·
  `unify-icons` (별도 배포) — ~~컴포넌트 목록~~ → 실측 완료 (위 심화 절)
- **남은 확인 사항:** 컬러 전체 램프, ~~버전이 0.0.4인 이유~~ → 컴포넌트가
  `unify-token`(단수형, v3)을 소비하므로 `unify-tokens`는 부차 배포로 확인.
  라운드·그림자 토큰은 `unify-token@3.0.0`의 `build/v2/`에도 없음
  (colors·grids·motions·spacings·typographies뿐) — 라운드 8px는
  컴포넌트에 하드코드
