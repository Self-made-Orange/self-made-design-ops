---
name: Material Design 3
org: Google
coverage: full
url: https://m3.material.io
repo: https://github.com/material-components/material-web
license: Apache-2.0
tech: [Web Components, Android, Flutter]
figma_kit: true
tokens_format: [CSS, Figma Variables (DTCG export)]
a11y_target: "명시 없음 확인 (2026-08-18 — 접근성 문서에 WCAG 일반 언급뿐, 버전·등급 목표 부재)"
platform: [web, mobile]
domain: os
verified: 2026-08-16
source: "Material 3 Design Kit 변수 전체 export (DTCG JSON) + npm @material/web@2.5.0"
---
<!-- lang-links -->
> [English](material-3.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Google의 크로스 플랫폼 디자인시스템. Android·웹·Flutter를 아우르며,
**32개 테마 변형**을 같은 토큰 구조로 배포합니다.

## 토큰

### 타이포그래피 — Roboto, 15단계

5계열 × Large/Medium/Small 구조입니다.

| 계열 | 단계 | 크기 | 행간 | 자간 | 기본 굵기 |
|------|------|:---:|:---:|:---:|:---:|
| **Display** | Large | 57 | 64 | **-0.25** | Regular |
| | Medium | 45 | 52 | 0 | Regular |
| | Small | 36 | 44 | 0 | Regular |
| **Headline** | Large | 32 | 40 | 0 | Regular |
| | Medium | 28 | 36 | 0 | Regular |
| | Small | 24 | 32 | 0 | Regular |
| **Title** | Large | 22 | 28 | 0 | Regular |
| | Medium | 16 | 24 | +0.15 | **Medium** |
| | Small | 14 | 20 | +0.10 | **Medium** |
| **Body** | Large | 16 | 24 | +0.50 | Regular |
| | Medium | 14 | 20 | +0.25 | Regular |
| | Small | 12 | 16 | +0.40 | Regular |
| **Label** | Large | 14 | 20 | +0.10 | **Medium** |
| | Medium | 12 | 16 | +0.50 | **Medium** |
| | Small | 11 | 16 | +0.50 | **Medium** |

**자간이 크기와 반비례합니다.** 57px에서 -0.25, 그 위로는 0, 22px 이하로 내려가며
+0.10 → +0.25 → +0.50으로 커집니다. **작을수록 벌립니다.**

모든 스타일에 `Weight-emphasized`가 별도로 있습니다 —
Regular 계열은 → Medium, Medium 계열은 → SemiBold로 한 단계씩 올립니다.

**같은 크기가 계열마다 다른 자간을 갖습니다.**

| 크기 | Title | Body | Label |
|:---:|:---:|:---:|:---:|
| 16 | +0.15 | +0.50 | — |
| 14 | +0.10 | +0.25 | +0.10 |
| 12 | — | +0.40 | +0.50 |

14px만 해도 Title 0.10 · Body 0.25 · Label 0.10으로 갈립니다.
**크기가 아니라 용도로 자간을 정합니다.**

출처: `tokens/shared/typescale.json`

### 라운드 (shape corner)

| 토큰 | 값 |
|------|-----|
| None | 0px |
| Extra-small | 4px |
| Small | 8px |
| Medium | 12px |
| Large | 16px |
| Large-increased | 20px |
| Extra-large | 28px |
| Extra-large-increased | 32px |
| Extra-extra-large | 48px |
| **Full** | **1000px** |

출처: `tokens/shared/shape.json`

**출처 간 불일치가 있습니다.** Figma 킷은 `Full = 1000px`이고,
npm `@material/web@2.5.0`의 `--md-sys-shape-corner-full`은 **`50cqmin`**입니다.
같은 개념을 디자인 도구는 큰 상수로, 웹 구현은 컨테이너 쿼리 단위로 표현합니다.
나머지 9단계는 두 출처가 정확히 일치합니다.

### 컬러 — 테마당 197개

| 그룹 | 개수 |
|------|:---:|
| State Layers | **147** |
| Schemes | 49 |
| Add-ons | 1 |

**State Layers가 Schemes의 3배입니다.** 각 색 역할마다 상태별 투명도 레이어를
별도 토큰으로 둡니다.

`Schemes`는 `Primary` / `On Primary` / `Primary Container` / `On Primary Container` 식의
4쌍 구조를 색 역할마다 반복합니다.

### 테마 — 32개

```
색상 16종 × light/dark:
  blue · chartreuse · cyan · green · indigo · monochrome · orange
  pink · purple · red · rose · teal · yellow  (+ -lt / -dt)

기본:      light · dark
대비 변형:  light-medium-contrast · light-high-contrast
           dark-medium-contrast · dark-high-contrast
```

**모든 테마가 같은 197개 토큰 구조를 갖습니다.** 색만 교체됩니다.

폰트 테마는 별도로 `baseline`과 `wireframe` 2종이 있습니다.

### 스페이싱

**없습니다.** 변수 export 전체(`typescale` · `shape` · `shadows` · `typography` ·
`m3` · `font-theme`)를 확인했으나 스페이싱 컬렉션이 존재하지 않습니다.
npm 패키지에도 없습니다.

Material 3의 4dp 그리드는 문서상 개념이며, **두 출처 어디에도 토큰으로 배포되지 않습니다.**

## 컴포넌트

미확인 — 복제본에서 컴포넌트 페이지를 확인하지 못했습니다.

## 특징적 결정

- **스페이싱을 토큰화하지 않습니다.** Apple HIG와 같습니다.
  두 모바일 OS 모두 여백을 변수로 두지 않는다는 점이 웹 시스템들과 갈리는 지점입니다.
- **자간을 용도로 정합니다.** 같은 14px이 Title에서 0.10, Body에서 0.25입니다.
  크기만으로 자간을 결정하는 시스템들과 다릅니다.
- **모든 스타일에 강조 굵기를 쌍으로 둡니다.** `Weight` / `Weight-emphasized`.
  Regular→Medium, Medium→SemiBold로 한 단계씩 올립니다.
- **State Layer를 1급 토큰으로 둡니다.** 테마당 147개로 전체의 75%입니다.
  hover·press 등 상태 표현을 구현이 아니라 토큰에서 해결합니다.
- **테마를 32개 배포합니다.** 색상 16종 × 명암 2종 + 대비 변형 4종.
  표본에서 가장 많은 테마 수입니다.
- **`increased` 변형을 둡니다.** `Large`(16) 사이에 `Large-increased`(20),
  `Extra-large`(28) 뒤에 `Extra-large-increased`(32).
  Fluent의 `Nudge`와 같은 문제에 대한 다른 해법입니다.
- **라운드가 큽니다.** `Extra-extra-large` 48px로 수집한 시스템 중 최대입니다.
  Carbon(0 지향)·Helios(최대 8px)와 정반대 축입니다.

## 모션 — androidx 소스에서 확보 (2026-08-17)

`m3.material.io` 차단으로 미확인이던 모션 토큰을 **androidx 저장소의 생성 코드**
(`MotionTokens.kt` v0_103, `ExpressiveMotionTokens.kt`·`StandardMotionTokens.kt`
v0_14_0)에서 확보했습니다:

- 이징 **Emphasized/Standard/Legacy 3계열 × 기본·가속·감속** — 값 전체는
  `patterns/motion.md` "Material 3 — 이징 10종 + 스프링 2세트" 절
- 지속시간 **Short~ExtraLong 4계열 × 4단계 = 16토큰** (50~1000ms) — 코퍼스 최다
- 최신 Expressive 스킴은 베지어가 아니라 **스프링(damping/stiffness)**이며
  `Spatial`(위치, 튕김 허용)과 `Effects`(색·투명도, damping 1.0 무진동)를 분리

## 컴포넌트 치수 — androidx 생성 토큰 (Expressive 세대, 2026-08-17)

모션과 같은 채널(`tokens/*.kt`)에서 컴포넌트 치수가 확보됐습니다.

### 버튼 5단계 (v0_11_0)

| | XSmall | Small(기본) | Medium | Large | XLarge |
|---|:---:|:---:|:---:|:---:|:---:|
| 높이 | 32 | **40** | 56 | **96** | **136dp** |
| 아이콘 | 20 | 20 | 24 | 32 | 40 |
| 좌우 패딩 | 16 | 16 | 24 | 48 | 64 |

- **XLarge 136dp는 코퍼스 버튼 높이 최대값**입니다 (기존 분포 28~48px).
  Expressive 세대가 히어로 CTA를 버튼 스케일 안으로 끌어들인 것.
- **모양이 상태로 바뀝니다** — `ContainerShapeRound`(full)/`Square`(medium~XL) 2계열에
  **`PressedContainerShape`가 한 단계 작은 라운드**로 따로 있습니다.
  누르면 모서리가 조여지는 **셰이프 모프**가 토큰 층에 규격화된 유일 표본.

### 그 외 실측

| 컴포넌트 | 값 |
|----------|-----|
| Checkbox | 18dp, **StateLayer 40dp** (시각 18 / 터치층 40 분리) |
| RadioButton | 20dp, StateLayer 40dp |
| Switch | 트랙 52×32, **핸들이 상태별 크기**: 미선택 16 → 선택 24 → 누름 28dp |
| Slider | 핸들 **4×44dp** 세로 바 (Expressive), 트랙 16dp |
| FAB | Small 40 / Medium 80 / Large 96dp |
| Badge(dot) | 6dp |
| AppBar Small · NavigationBar | 64dp |
| 상태층 알파 | hover 0.08 · focus/pressed 0.10 · dragged 0.16 |

- **Switch 핸들이 상태에 따라 커지는 시스템은 M3뿐**입니다 — Mantine은
  5단계 크기 축이지만 상태 불변(`patterns/form.md` 교차).
- Shape 스케일 실값(4/8/12/16/20/28/32/48 + Increased 20/32)이 코드에서
  재확인됐습니다 — **Figma 킷 수집값과 일치** (독립 채널 교차 검증 성립).

## 엘리베이션·스크림 — androidx 생성 토큰 (2026-08-18)

`shadows.json`(Figma 변수 export의 shadows 컬렉션)에 해당하는 원천이
androidx `ElevationTokens.kt`(v0_103)로 확인됐습니다:

```
Level0  0dp   Level1  1dp   Level2  3dp
Level3  6dp   Level4  8dp   Level5 12dp
```

- **`ShadowTokens.kt`는 존재하지 않습니다** (`tokens/` 디렉터리 실측 0건) —
  M3는 그림자를 색·블러 값이 아니라 **6단계 고도(dp)로만 토큰화**하고,
  실제 그림자 렌더링은 플랫폼(Android elevation API)에 위임하는 구조입니다.
  그림자를 box-shadow 값 목록으로 배포하는 웹 시스템들과 갈리는 지점.
- 스크림: `ScrimTokens.kt`(v0_117) — 색 역할 `Scrim` + **불투명도 0.32** 고정.
  `@material/web` dialog 애니메이션의 scrim 목표값(0.32)과 일치합니다
  (독립 채널 교차 검증 — `patterns/motion.md`).
- 서체 원천: `TypefaceTokens.kt`(v0_103) — Brand/Plain 모두 `SansSerif`,
  굵기 Regular/Medium/Bold 3단. **서체 지정이 추상 패밀리라는 것**이
  Roboto를 하드코딩하지 않는 생성 코드 층의 특징입니다.

## 접근성

`light-medium-contrast` · `light-high-contrast` · `dark-medium-contrast` ·
`dark-high-contrast` 4종을 테마 레벨에서 제공합니다. **명시적 준수 목표는
없음을 확인** (2026-08-18 — 접근성 문서에 WCAG 일반 언급뿐, 버전·등급 부재).
구현 층: **시각 18~20dp 컨트롤에 StateLayer 40dp** — 터치 타겟을 상태층
크기로 보장하는 구조가 생성 토큰에 있습니다.

## 참고

- 저장소: https://github.com/material-components/material-web
- 패키지: `@material/web` (**shape 토큰만** 포함)
- Figma: Material 3 Design Kit (Community) — 변수 export가 가장 완전합니다
- ~~컴포넌트 목록·치수~~ → **해소 (2026-08-17)** — androidx `tokens/` 120파일에서
  추출. 위 "컴포넌트 치수" 절.
- ~~TypeScale 실값~~ → **해소.** 15역할 × Emphasized 쌍 = 30. Display 57/45/36 ·
  Headline 32/28/24 · Title 22/16/14 · Body 16/14/12 · Label 14/12/11sp,
  행간은 크기+8(대형은 +7). **Emphasized 변형의 규칙이 "굵기 ↑ + 자간 ↓"**입니다 —
  BodyLarge가 Regular/자간 0.5 → Medium/자간 0.15로. Radix Themes 활성 탭의
  자간 보정(-0.01em)과 같은 원리가 **타입 스케일 전체에 시스템화**된 형태
  (`patterns/typography.md` · `navigation.md` 교차).
- ~~`shadows.json` 내용~~ → **해소 (2026-08-18)** — 위 "엘리베이션·스크림" 절.
  M3의 그림자는 6단계 고도 토큰(0/1/3/6/8/12dp)이며 별도 그림자 값 파일이 없습니다.
