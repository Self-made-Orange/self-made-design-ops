---
name: Lightning Design System
org: Salesforce
coverage: full
url: https://www.lightningdesignsystem.com
repo: https://github.com/salesforce-ux/design-system
license: BSD-3-Clause
tech: [Aura, LWC, CSS]
figma_kit: true
tokens_format: [JSON, SCSS, CSS]
a11y_target: "WCAG 2.1 AA (Salesforce 전 제품 기준선 — 2026-08-18 확인)"
platform: [web, mobile]
domain: enterprise
verified: 2026-08-18
source: "npm @salesforce-ux/design-system@2.264.0 → design-tokens/dist/primitive.raw.json"
---
<!-- lang-links -->
> [English](lightning.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Salesforce 제품 전반을 위한 디자인시스템. **축 분리 스페이싱**과
**iOS·Android 토큰 동시 배포**가 특징입니다.

## 토큰

### 스페이싱

| 토큰 | rem | px |
|------|-----|-----|
| `SPACING_NONE` | 0 | 0 |
| `SPACING_XXX_SMALL` | 0.125 | 2 |
| `SPACING_XX_SMALL` | 0.25 | 4 |
| `SPACING_X_SMALL` | 0.5 | 8 |
| `SPACING_SMALL` | 0.75 | 12 |
| `SPACING_MEDIUM` | 1 | 16 |
| `SPACING_LARGE` | 1.5 | 24 |
| `SPACING_X_LARGE` | 2 | 32 |
| `SPACING_XX_LARGE` | 3 | 48 |

**공통 코어(`4/8/16/24`)를 전부 포함하고 32·48까지 갑니다.** 20px과 40px이 없습니다.

### 축 분리 스페이싱

원시 스케일과 별개로 **가로·세로 전용 토큰**을 둡니다.

```
VAR_SPACING_HORIZONTAL_SMALL       0.75rem (12px)
VAR_SPACING_HORIZONTAL_XX_LARGE    3rem    (48px)
VAR_SPACING_VERTICAL_X_SMALL       0.5rem  (8px)
VAR_SPACING_VERTICAL_MEDIUM        1rem    (16px)
VAR_SPACING_VERTICAL_LARGE         1.5rem  (24px)
```

Fluent 2가 같은 방식을 씁니다 (`spacingHorizontalM` / `spacingVerticalM`).
**표본에서 축 분리는 이 둘뿐입니다.**

### 라운드

| 토큰 | 값 | px |
|------|-----|-----|
| `BORDER_RADIUS_SMALL` | 0.125rem | 2 |
| `BORDER_RADIUS_MEDIUM` | 0.25rem | 4 |
| `BORDER_RADIUS_LARGE` | 0.5rem | 8 |
| `BORDER_RADIUS_CIRCLE` | 50% | — |
| `BORDER_RADIUS_PILL` | **15rem** | **240** |

**3단계뿐이고 전부 8px 이하입니다.** Helios(3·5·6·8px 4단계)와 비슷한 각진 톤입니다.

**`PILL`이 15rem(240px)입니다.** 다른 시스템의 알약 표현과 전부 다릅니다 —
Polaris·Atlassian 9999px, Fluent 10000px, Nord 999px, Paste 100px, Material 3 1000px.
**240px은 표본에서 가장 작은 알약 값이며, 요소가 240px보다 크면 완전한 알약이 되지 않습니다.**

### 크로스 플랫폼 토큰

`design-tokens/dist/`에 플랫폼별 빌드가 함께 있습니다.

```
primitive.raw.json      원시 토큰
ui-one.ios.json         iOS
transparent-colors.json
ui.aura-tokens.json     Aura 프레임워크
ui.component-tokens.json
```

**iOS 빌드를 별도 배포합니다.** Paste(Twilio)와 함께 드문 사례입니다.

### 타이포그래피 / 컬러

미확인 — `design-tokens/dist/` 내 다른 파일 확인 필요.

## 컴포넌트

`ui/components/`와 `metadata/components/`에 컴포넌트별 디렉터리가 있습니다.

### 심화 (2026-08-17, `@salesforce-ux/design-system@2.264.0` scss/components)

- **스타일링 훅 3단 폴백** — 버튼 base 하나에 `--slds-c-button-*` 변수가
  87개이고, 모든 속성이 `var(--slds-c-… , var(--sds-c-… , SCSS 기본값))`
  3단 체인입니다. 신·구 이름 공간(`slds`/`sds`)을 폴백으로 공존시키는
  마이그레이션 설계 — Polaris `--pc-*` 상태 폴백과 같은 계열이지만
  **버전 이행까지 폴백으로** 처리하는 건 SLDS뿐입니다.
- **터치 컨텍스트 토큰** — `$line-height-button: 1.875rem`(30px) 옆에
  `$button-line-height-touch: 2.65rem`(42.4px)이 따로 있습니다.
  데스크톱/터치 이중값(Spectrum medium/large 스케일과 같은 문제의식,
  구현은 개별 토큰).
- 실측: 버튼 행높이 30px(small 28px), 입력 높이 30px, 알약 26px, 라운드 4px.
  30px은 코퍼스 버튼 분포(28~48)의 아래쪽 — Ant 32와 같은 데스크톱
  엔터프라이즈 진영.
- 빌드 주석 `/*! @css-var-fallback */` — 훅 생성이 도구화돼 있음.

## 특징적 결정

- **축 분리 스페이싱을 둡니다.** 가로·세로 전용 토큰이 원시 스케일과 별도로 존재합니다.
  Fluent 2와 같은 계열입니다.
- **라운드가 3단계, 전부 8px 이하입니다.** 각진 엔터프라이즈 톤입니다.
- **알약 반경이 240px입니다.** 표본 중 가장 작습니다. 큰 요소에서는 알약이 되지 않습니다.
- **원시 토큰에 `aliases`와 `props` 두 계층이 있습니다.** 같은 값이 양쪽에 중복 정의돼 있습니다.
- **iOS·Aura 등 플랫폼별 빌드를 함께 배포합니다.**
- **패키지에 `__internal/` 디렉터리가 있습니다.** 공개·내부 자산을 구분합니다.

## 접근성

~~미확인~~ → **해소 (2026-08-18, 헤드리스 렌더 확인).**

출처: https://www.lightningdesignsystem.com/2e1ef8501/p/23a1dd-global-accessibility-standards

- **기준선은 WCAG 2.1 Level AA입니다.** 원문: "At Salesforce, we use
  WCAG 2.1 Level AA as our baseline for accessibility across products
  and platforms."
- **지역 규격 대응표를 문서에 싣습니다** — 표본에서 드문 구성입니다.

| 지역 | 규격/정책 | 근거 |
|------|-----------|------|
| 국제 | WCAG | W3C |
| 미국 | Section 508, ADA | WCAG 2.0+ |
| EU | EN 301 549, European Accessibility Act | WCAG 2.1 |
| 캐나다 | ACA, AODA (온타리오) | WCAG 2.0+ |
| 영국 | Equality Act 2010, Public Sector Accessibility Regulations | WCAG 2.1 |
| 호주 | Disability Discrimination Act (DDA) | WCAG 2.0 |
| 일본 | JIS X 8341-3 | WCAG 정렬 |
| 인도 | GIGW | WCAG 기반 |
| 중국 | GB/T 37668 | WCAG 참조 |

- 문서의 결론: "If you comply with WCAG 2.1 AA or 2.2 AA, you're in good
  shape globally" — **2.2를 상한이 아니라 동등 허용치로** 둡니다.
- 컴포넌트 문서마다 `Usage · Develop · Specifications · Accessibility`
  4탭이 고정으로 붙습니다(사이드바 렌더로 확인).

## Figma 킷 — 공식 배포 확인 (2026-08-18)

출처: https://www.lightningdesignsystem.com/2e1ef8501/p/2963ba-figma-kits

`figma_kit: true`의 근거입니다. **SLDS 2와 SLDS 1을 각각 별도 라이브러리로**
배포하며, 패턴까지 파일 단위로 쪼갠 게 특징입니다.

- **SLDS 2** — Foundations: `SLDS 2 Style Guide` · Components:
  `SLDS 2 Web Components UI Library` · Patterns: `SLDS 2 Pattern: Agentic
  Experience`(생성형 AI 인터페이스용), `SLDS 2 Pattern: Builder`
- **SLDS 1** — Foundations 3벌(`SLDS 1 Typography` · `SLDS 1 Color` ·
  `SLDS 1 Icons`) · Components: `Components for Web` · Patterns 4벌
  (`Builder (Beta)` · `Confetti (Beta)` · `Console UI (Beta)` · `Charts`)
- **패턴을 Figma 파일로 배포하는 사례** — 컴포넌트 라이브러리만 내는 관행과
  다릅니다. `Confetti`(축하 연출)처럼 제품 고유 연출까지 킷으로 둡니다.

## 참고

- 저장소: https://github.com/salesforce-ux/design-system
- 패키지: `@salesforce-ux/design-system`
- 토큰: `design-tokens/dist/primitive.raw.json` (원시), `ui.*-tokens.json` (프레임워크별)
- **라이선스 해소 (2026-08-18):** `BSD-3-Clause` — 출처: github salesforce-ux/design-system → `LICENSE.txt` (npm `@salesforce-ux/design-system@2.264.0` 메타와 일치)
