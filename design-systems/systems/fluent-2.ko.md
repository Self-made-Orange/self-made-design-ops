---
name: Fluent 2
org: Microsoft
coverage: full
url: https://fluent2.microsoft.design
repo: https://github.com/microsoft/fluentui
license: MIT
tech: [React, Web Components, Windows, iOS, Android]
figma_kit: true
tokens_format: [JS, CSS]
a11y_target: "WCAG 2.1 AA (명시 — 2026-08-18 확인)"
platform: [web, desktop, mobile]
domain: enterprise
verified: 2026-08-18
source: "npm @fluentui/tokens@1.0.0-alpha.24 → lib/global"
---
<!-- lang-links -->
> [English](fluent-2.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Microsoft 제품 전반(Office, Teams, Windows)을 위한 디자인시스템. 다중 플랫폼 커버리지가 넓습니다.

## 토큰

### 스페이싱

**T셔츠 사이즈 명명**을 쓰며, 축(가로/세로)을 분리해 토큰을 제공합니다.

| 이름 | 값 |
|------|-----|
| `none` | 0 |
| `xxs` | 2px |
| `xs` | 4px |
| `sNudge` | 6px |
| `s` | 8px |
| `mNudge` | 10px |
| `m` | 12px |
| `l` | 16px |
| `xl` | 20px |
| `xxl` | 24px |
| `xxxl` | 32px |

원시 `spacings` 객체는 **의도적으로 export하지 않습니다.** 소비자는 반드시 축이 붙은 형태를 씁니다.

```
spacingHorizontalM / spacingVerticalM   (= 12px)
```

출처: `@fluentui/tokens@1.0.0-alpha.24` → `lib/global/spacings.js`

### 라운드

| 토큰 | 값 |
|------|-----|
| `borderRadiusNone` | 0 |
| `borderRadiusSmall` | 2px |
| `borderRadiusMedium` | 4px |
| `borderRadiusLarge` | 6px |
| `borderRadiusXLarge` | 8px |
| `borderRadius2XLarge` | 12px |
| `borderRadius3XLarge` | 16px |
| `borderRadius4XLarge` | 24px |
| `borderRadius5XLarge` | 32px |
| `borderRadius6XLarge` | 40px |
| `borderRadiusCircular` | 10000px |

출처: `lib/global/borderRadius.js`

### 타이포그래피 / 컬러

미확인 — `lib/global/` 내 `fontSizes.js`, `brandColors.js` 확인 필요.

## 컴포넌트

~~미확인~~ → **버튼 심화 (2026-08-17, `@fluentui/react-button@9.11.0` —
Griffel CSS-in-JS의 직렬화 원자 클래스를 빌드 산출물에서 파싱).**

- **버튼 최소 폭 토큰이 있습니다** — small 64px / medium **96px**
  (아이콘 전용은 24/32/40 정사각). Carbon 176px에 이어 **버튼 최소 폭
  규격의 두 번째 표본** — 값은 절반 수준입니다.
- 높이가 고정값이 아니라 **행높이 변수 + 세로 패딩 파생**입니다
  (`--lineHeightBase200/300/400` + 3/5/8px) — GOV.UK·Primer와 같은
  파생 계열을 CSS-in-JS로 구현.
- 스타일이 **원자 단위로 직렬화**됩니다 (`.fneth5b{padding:3px …}` —
  클래스 하나 = 선언 하나). Atlassian Compiled과 같은 아토믹 컴파일 진영.

## 특징적 결정

- **가로/세로 스페이싱을 분리했습니다.** `spacingHorizontalM`과 `spacingVerticalM`이
  현재 값은 같지만 별도 토큰입니다. 나중에 축별로 다르게 조정할 여지를 남긴 설계입니다.
  대부분의 시스템은 단일 스페이싱 스케일만 두므로 뚜렷한 차이점입니다.
- **원시 스케일을 export하지 않습니다.** `spacings`에 주석으로
  "Intentionally not exported"라고 못박아 두고, 축이 붙은 토큰만 공개합니다.
  잘못된 사용을 API 레벨에서 차단하는 방식입니다.
- **"Nudge" 중간 단계가 있습니다.** `sNudge`(6px), `mNudge`(10px)로 짝수 2px 간격을 메웁니다.
  아이콘 정렬처럼 표준 단계로는 안 맞는 경우를 위한 탈출구입니다.
- **라운드 단계가 많습니다.** 11단계로, 현재까지 확인한 시스템 중 가장 세분화돼 있습니다
  (Polaris 10단계). Carbon·Primer는 미확인이라 비교 대상에서 제외했습니다.

## 접근성

~~미확인.~~ → **WCAG 2.1 AA (2026-08-18 해소).**
출처: `fluent2.microsoft.design/accessibility/` — "components meet or surpass WCAG 2.1
AA standards". 색은 별도로 "must pass WCAG AA contrast ratios"(본문 4.5:1)를 명시합니다.

## 참고

- 저장소: https://github.com/microsoft/fluentui
- 토큰 패키지: `@fluentui/tokens`
