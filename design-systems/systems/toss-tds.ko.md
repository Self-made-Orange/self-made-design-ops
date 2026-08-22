---
name: TDS (Toss Design System)
org: Toss (Viva Republica)
coverage: full
url: https://tossmini-docs.toss.im
repo: null
license: 미표기 (본체 패키지 license 필드·LICENSE 파일 없음 — tds-react-native만 Apache-2.0, 2026-08-18 확인)
tech: [React, React Native]
figma_kit: 미확인
tokens_format: [JS, CSS]
a11y_target: 미확인 (iOS Dynamic Type 대응 내장 — 아래 참조)
platform: [web, mobile]
domain: consumer
verified: 2026-08-17
source: "npm @toss/tds-colors@0.1.0 + @toss/tds-typography@0.0.3 + @toss/tds-easings@0.0.1 + @toss/tds-mobile@2.5.1. 미니앱용 @toss/tds-mobile-ait 별도"
---
<!-- lang-links -->
> [English](toss-tds.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

토스의 디자인시스템 — **미니앱(앱인토스) SDK 공개와 함께 npm에 분할 배포**됐습니다.
**스프링을 물리 파라미터로 토큰화**하고, **접근성 글자 배율별 크기 재매핑 표**를 내장하며,
타이포가 **11~42px 연속 1px 32단계**입니다.

> **기록 정정.** 이 코퍼스는 앞서 "Toss는 npm 토큰 패키지 없음"으로 두 번 기록했습니다
> (`@toss/tds` 단일명 probe 결과). **틀렸습니다** — `@toss/tds-colors` ·
> `-typography` · `-easings` · `-spring-easing` · `-mobile` · `-react-native` ·
> **`-mobile-ait`**(Apps-in-Toss 전용)로 **분할 배포**돼 있었습니다.
> 단일명 probe의 한계이며, `HARVESTING.md`에 교훈으로 기록했습니다.

## 토큰

### 모션 — 스프링이 물리 파라미터입니다

```js
spring: {
  basic:  { stiffness: 200,  damping: 30, mass: 1 },
  small:  { stiffness: 480,  damping: 50, mass: 1 },
  quick:  { stiffness: 800,  damping: 55, mass: 1 },
  medium: { stiffness: 270,  damping: 25, mass: 1 },
  large:  { stiffness: 100,  damping: 15, mass: 1 },
  slow:   { stiffness: 70,   damping: 20, mass: 1 },
  rapid:  { stiffness: 1000, damping: 55, mass: 1 },
  bounce: { stiffness: 300,  damping: 15, mass: 1 },
}
```

**표본 세 번째 스프링 표현이며 유일한 물리 기반입니다.**

| 방식 | 시스템 | 성격 |
|------|--------|------|
| `linear()` 65 정지점 × 1개 | Atlassian | 곡선 근사를 미리 계산 |
| `linear()` 5단계 | Open Props | 〃 |
| **물리 파라미터 8프리셋** | **TDS** | **런타임 계산** (`getSpringEasing` 함수 동봉) |

**stiffness 70~1000, damping 15~55 — 8프리셋이 강성·감쇠 공간을 커버합니다.**
`bounce`(300/15)는 감쇠가 낮아 여러 번 튕기고, `rapid`(1000/55)는 즉시 정착합니다.
요소 크기별 프리셋(`small`/`medium`/`large`)을 두는 것은 Atlassian이 컴포넌트별
지속시간을 나눈 것과 같은 판단을 스프링 공간에서 한 것입니다.

베지어도 5종 있습니다 — `expo`가 `(0.16, 1, 0.3, 1)`로 **Radix Themes의 다이얼로그
이징과 동일 곡선**이고, `back`(0.34, 1.56, 0.64, 1)은 1.56 오버슈트입니다.

### 타이포그래피 — 11~42px 연속 1px, 크기마다 4요소 동반

```js
fixedTypographySizeMap["17"] = {
  text:  { fontSize: 17, lineHeight: 25.5 },
  icon:  { height: 19 },
  badge: { fontSize: 10, padding: [3,7], borderRadius: 9 },
  link:  { verticalPadding: 0, horizontalPadding: 4,
           borderRadius: 4, lightThickness: 0.7, boldThickness: 1 },
}
```

- **크기가 `11`~`42` 연속 32단계입니다** — 1px 촘촘함의 표본 최대
  (Seed Design 18단계 / USWDS 12~18 구간을 크게 넘어섭니다).
  한국 시스템 두 곳(Seed·TDS)이 1px 단위 진영의 1·2위입니다
- **행간이 전 단계 정확히 ×1.5입니다** (11→16.5, 17→25.5).
  소수 행간을 그대로 둡니다 — 4px 격자(Atlassian)와 정반대 선택
- **크기마다 아이콘 높이·배지 규격·링크 밑줄까지 동반**합니다 —
  "이 글자 크기 옆의 아이콘은 19px" 같은 **동반 요소 규격**을 토큰화한 표본 유일 사례
- **링크 밑줄 두께가 토큰입니다** — `lightThickness: 0.7` / `boldThickness: 1`.
  0.7px 서브픽셀 밑줄. 표본 유일

역할 계층은 `t1`~`t7` + `st1`~`st13` **20단계**이며, CSS 변수 폴백 체인으로
고정 크기에 매핑됩니다 (`var(--tds-t-t1-text-fontSize, --tds-t-f30-text-fontSize)`).

### 접근성 글자 배율 — 재매핑 표 내장

```js
iosFontScales: { Large: 100, xLarge: 110, xxLarge: 120, xxxLarge: 135,
                 A11y_Medium: 160, … A11y_xxxLarge: 310 }
iosTypographyRules: {
  Large:  [30,29,28,…,11],   // 기본
  xLarge: [32,31,30,…,13],   // 전 단계 +2
  …
}
```

**iOS Dynamic Type의 9개 배율 단계마다 20개 역할의 px를 재매핑하는 표**를
토큰으로 배포합니다 — 최대 310%.

Apple이 OS 레벨에서 하는 일을 **웹/RN 토큰 층위로 옮긴 표본 유일 사례**입니다.
"접근성 대응"이 고대비 테마(Atlassian·KRDS)나 모션 감소(Cloudscape)가 아니라
**글자 크기 재매핑**으로 나타난 첫 데이터이기도 합니다.

### 컬러 — 다크에서 램프가 뒤집힙니다

```
--blue50:  #e8f3ff  →  --darkThemeBlue50:  #202c4d   (밝음 → 어두움)
--blue900: #194aa6  →  --darkThemeBlue900: #c8e7ff   (어두움 → 밝음)
```

**라이트의 50~900 명암 방향이 다크 테마에서 정확히 역전됩니다** —
`darkThemeBlue900`이 하늘색입니다. "숫자가 클수록 진하다"가 모드에 따라
뒤집히는 구조를 그대로 노출한 표본 유일 사례입니다 (다수는 시맨틱 층에서 흡수).

배경이 **레벨 체계**입니다 — `darkThemeBackgroundLevel01/02/B01` ·
`FloatBackground` · `LayeredBackground`. 다크 표면을 층수로 관리합니다
(Mantine의 `dark` 램프, Cloudscape 컨텍스트와 또 다른 세 번째 방식).

## 배포 — 미니앱 SDK와 한 몸

| 패키지 | 용도 |
|--------|------|
| `@toss/tds-mobile` (5MB) | 모바일 웹 컴포넌트 |
| **`@toss/tds-mobile-ait`** | **Apps-in-Toss(미니앱) 전용 빌드** |
| `@toss/tds-react-native` | RN |
| `@apps-in-toss/framework` · `@granite-js/react-native` | 미니앱 프레임워크 (Granite) |

**미니앱 생태계 개방이 디자인시스템 공개를 견인한 구조입니다** —
서드파티가 토스 안에서 앱을 만들려면 TDS가 필요하므로 npm에 나왔습니다.
`@toss/tds-migration`의 설명에 구 스코프(`@toss-design-system/*`)가 보입니다 —
사내 스코프에서 공개 스코프로 이전 중임이 패키지에서 읽힙니다.

## 컴포넌트 — 107개 export (2.5.1 dist 실측, 2026-08-18)

`dist/esm/index.js`의 대문자 export가 107개입니다. 범용 컴포넌트 외에
**도메인이 이름 공간에 그대로 드러나는 것**이 특징:

- **금융·인증 특화**: `AlphabetKeypad`·`NumberKeypad`·`FullSecureKeypad`
  (보안 키패드 3종) · `CodeAuthModule` · `AgreementModule`
  (약관 동의가 BottomSheet/FloatButton/FullPage/Gradient 변형 + V3/V4 세대 병존)
- **CTA 계층이 세분**: `BottomCTA` · `FixedBottomCTA` · `CTAButton` ·
  `PointCTAOverlay` — 하단 전환 버튼이 4가지 자리로 규격화
- **차트 내장**: `BarChart` · `Doughnut(Chart/Label)` — 코퍼스에서
  차트를 코어에 포함하는 드문 사례
- **접근성 유틸이 1급**: `FontScaleLimit` · `ColorSchemeArea` ·
  `GlobalConfigProvider` — 배율 재매핑(본문 상세)의 컴포넌트 짝
- 표준 세트: Button·TextField·Modal·Toast·Tooltip·Tab·Switch·Checkbox·
  List(Row/Header/Footer)·TopNavigation(+3버튼)·Wheel(DatePicker/DateSheet) 등

RN판(`tds-react-native`) 문서는 Button·Dialog·Dropdown·Carousel·Navbar 등
40+ 컴포넌트: https://tossmini-docs.toss.im/tds-react-native/

## 특징적 결정

- **스프링 물리 파라미터 8프리셋** — 표본 유일의 런타임 스프링
- **접근성 배율별 크기 재매핑 표** (9단계 × 20역할, 최대 310%) — 표본 유일
- **11~42px 연속 1px 32단계** — 촘촘함 표본 최대. 행간 전 단계 ×1.5
- **동반 요소 규격**(아이콘/배지/링크 밑줄)을 글자 크기에 묶음 — 표본 유일
- **밑줄 두께 0.7px 토큰** — 표본 유일
- **다크에서 컬러 램프 숫자-명암 역전을 그대로 노출**
- 미니앱 SDK(`-ait`)가 공개 배포의 동인 — 한국 첫 대형 소비자 앱 표본

## 접근성

- iOS Dynamic Type 9단계 재매핑 내장 (본문 상세)
- 고대비·대비 수치는 이 패키지들에서 미확인

## 참고

- 미니앱 문서: https://tossmini-docs.toss.im (프록시 차단)
- 토큰: `npm pack @toss/tds-colors @toss/tds-typography @toss/tds-easings`
- ~~스페이싱·라운드 체계 — tds-mobile 내부 미조사~~ → **조사함 (2.5.1 빌드).**
  `@toss/tds-mobile` 2.5.1 dist(2.5MB)에서 **중앙 스페이싱 토큰 객체가
  검출되지 않습니다** — 패딩·갭이 전부 인라인 리터럴이고, 분포는
  **8(28회) > 24(15) > 4(12) > 16(11)**입니다. 코퍼스 최강값 8·16에
  24가 끼어드는 형태. 라운드는 4~16이 **거의 연속값**(4·5·6·7·8·9·10·11·
  12·13·14·16)으로 나타나 배율 스케일의 흔적이 없습니다 — 컴포넌트별
  개별 조율로 읽힙니다. 단 빌드 산출물이므로 소스 쪽 토큰이 인라인화됐을
  가능성은 배제 못 합니다(그 경우에도 값 분포 자체는 실측).
- ~~컴포넌트 목록~~ → **해소 (2026-08-18)** — 위 "컴포넌트 — 107개 export" 절.
- ~~웹용 패키지 유무~~ → **범용 웹 패키지 없음 확정 (2026-08-18).**
  `@toss/tds-web`·`@toss/tds`·`@toss/tds-desktop`·`@toss/tds-react` 전부
  npm 404. 단 `@toss/tds-mobile`이 **사실상 React DOM(웹) 패키지**입니다 —
  공식 설치 명령이 `react-dom` 요구 (용도는 토스 앱 내 WebView 한정).
  번들의 `LEGACY_TDS_WEB_BUTTON_CLASS_NAME` export가 "tds-web" 전신의 흔적.
  구 사내 스코프 `@toss-design-system/web`도 npm 404 (비공개 유지).
- ~~라이선스~~ → **본체 미표기 확정 (2026-08-18).** `tds-mobile`(+-ait ·
  colors · typography · easings · css-utils) 전부 license 필드·LICENSE 파일
  없음. **예외: `@toss/tds-react-native` 2.0.5만 Apache-2.0.**
- ~~Granite와의 결합 방식~~ → **peerDependencies로 확정 (2026-08-18).**
  `@toss/tds-react-native`의 peerDeps가 `@granite-js/native` ·
  `@granite-js/react-native` — **RN판 TDS는 Granite(토스의 RN 마이크로서비스
  프레임워크, Apache-2.0, github.com/toss/granite) 위에서만 동작**합니다.
  미니앱 2트랙 구조: WebView = tds-mobile(+-ait) / RN = Granite + tds-react-native.
  설정 파일은 `granite.config.ts` → `apps-in-toss.config.ts`로 이행 중.
