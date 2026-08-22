---
name: Odyssey
org: Okta
coverage: partial
url: https://odyssey.okta.com
repo: https://github.com/okta/odyssey
license: Apache-2.0
tech: [React, MUI]
figma_kit: 미확인
tokens_format: [SCSS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @okta/odyssey-design-tokens@1.66.1 → dist/index.scss ($ 변수 225개) · npm @okta/odyssey-react-mui@1.66.1 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](odyssey.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Okta의 시스템 — 스페이싱이 **`0.28571429rem` 같은 7분수**입니다.
**루트 폰트 14px 전제**이며(×14 = 4·8·12·16·24·32·40·48·56px),
16px로 읽으면 4.57px이 됩니다. rem 기준 불일치 **세 번째 사례**.

## 토큰 — 225개

```scss
$spacing-1: 0.28571429rem;  // = 2/7 rem → 14px 기준 4px
$spacing-4: 1.14285714rem;  // = 16/14 rem → 16px
$spacing-9: 4rem;           // 56px
```

- **분모가 7입니다** — 4/14 = 2/7. 목표값이 px 4배수인데 rem 표기가
  14px 기준이라 순환소수가 됩니다. Strapi(62.5% → 10px 기준) ·
  Stacks(13px 기준)에 이어 **rem 루트 전제가 다른 세 번째 시스템**이며,
  세 시스템의 전제가 각각 10 / 13 / 14px으로 전부 다릅니다
- 결과 스케일은 `4·8·12·16·24·32·40·48·56` — **값 자체는 코어 준수**입니다.
  이름은 서수 0~9
- 자간에 `em`을 씁니다 (`letter-spacing-overline: .05em`) — 크기 비례

**`GLOSSARY.md`의 "rem을 옮길 때" 항목에 세 번째 사례로 기록했습니다.**
토큰 값만 복사하면 12% 어긋납니다 (16 vs 14 기준).

## 컴포넌트 심화 — (2026-08-18)

`@okta/odyssey-react-mui@1.66.1` — **MUI v5 파생 확정**입니다
(`@mui/material ^5.18.0` 의존, `createTheme()`에 components/palette/shape/
spacing/typography 주입). 아래는 **MUI 기본값과의 차이만** 기록합니다.
토큰 실값은 `@okta/odyssey-design-tokens@1.66.1`에서 해석했습니다.

### 14px 루트 전제 — 코드로 명시 확인 (backlog 해소)

- `CssBaseline`이 `html { font-size: calc((14/16)*100%) }` = **87.5%를 강제**하고,
  테마의 `pxToRem = px => px/14`, 토큰 `TypographySizeBase = 87.5%`.
  토큰 절의 "루트 14px 전제"가 추정이 아니라 **배포 코드의 명시 사양**입니다 —
  아래 px 환산은 전부 14px 루트 실값.
- MUI `transitions`는 **미주입** — Dialog 등의 진입/퇴장은 MUI 기본
  (Fade 225/195ms, `(0.4,0,0.2,1)`)이 그대로 남습니다.
- `theme.spacing`이 MUI의 "8px×배수 함수"가 아니라 **10원소 배열**(Spacing0~9) —
  `spacing(3)`이 24px이 아니라 12px(서수 인덱스)입니다.

### 버튼 (MuiButton 오버라이드)

| | small | medium (기본) | large | MUI 기본 |
|---|:--:|:--:|:--:|---|
| **height** | **32px** (`Spacing6`) | **40px** (`Spacing7`) | 48px (`Spacing8`) | 없음(파생 30.75~42.25px) |
| 패딩 상하/좌우 | 8/12px | 12/16px | 16/16px | 6/16px 등 |
| min-width | **unset** | ← | ← | 64px |
| 라운드 | 6px (`BorderRadiusMain`) | ← | ← | 4px |
| 서체 | 14px(1rem)/500/1.2 · Aeonik | ← | ← | 14px/500/1.75 · uppercase |
| 전환 | **100ms linear** | ← | ← | 250ms `(0.4,0,0.2,1)` |

- **MUI의 파생 높이(소수점)를 버리고 스페이싱 토큰으로 높이를 고정**합니다 —
  높이 전용 토큰 없이 `Spacing6/7/8`을 그대로 높이에 씁니다.
- **variant 축 자체를 교체** — contained/outlined/text 폐기, `primary`(기본) ·
  secondary · danger · dangerSecondary · floating · floatingAction.
  uppercase 해제, `disableElevation` 기본, 텍스트 `button` 변형은 `undefined`로 삭제.
- 전환이 **linear 100ms** — MUI 곡선 진영에서 이탈한 표본 드문 선택.
- 포커스: `0 0 0 2px 흰색, 0 0 0 4px #546be7` 이중 링.

### 입력 (MuiInputBase 오버라이드) — 플로팅 라벨 폐기

- **MUI의 플로팅 라벨을 끕니다** — `MuiInputLabel`에 `disableAnimation` +
  `shrink:false` + `transform:none/position:initial` → **상단 고정 블록 라벨**.
  Material 혈통의 상징을 제거한 사례 (MUI 절의 플로팅 라벨 항목과 대구).
- 패딩: 상하 `calc(Spacing3 − 1px)` = **11px** / 좌우 12px — 보더 1px 차감식
  (MUI는 16.5px 반픽셀 보정). outlined의 fieldset 노치 대신 **직접 보더 + 라운드 6px**.
- `height:auto` — 파생 높이 ≈ **40.8px** (14×1.2 행간 16.8 + 22 + 2). 크기 변형 없음.
- 포커스: 보더색 + `0 0 0 1px` box-shadow 겹침. 전환 100ms.

### 다이얼로그 (MuiDialog 오버라이드) — 폭이 글자 수 기준

- **폭 단계를 쓰지 않습니다** — paper `maxWidth: calc(55ch + 64px)`
  (`TypographyLineLengthMax 55ch` + `Spacing6`×2). MUI의 xs~xl 5단(=브레이크포인트)을
  **최대 행길이 파생 단일 상한**으로 대체 — 표본에서 모달 폭을 `ch`로 정한 유일 사례.
- 라운드 **12px**(`BorderRadiusOuter` — 내부 6px의 2배 외곽값), compact 쿼리에서 0.
- `box-shadow` 대신 **`drop-shadow` 필터 3중첩**.
- 패딩: 본문 좌우 32px(`Spacing6`) · 액션 상하 24px(`Spacing5`) · 제목은 `h5`(18px)를
  `h1` 요소로 렌더. 진입/퇴장은 MUI 기본 225/195ms 상속(위 참조).

### 특징적 결정 (심화분)

- **14px 루트를 CssBaseline이 강제** — rem 불일치가 사고가 아니라 설계
- **버튼 높이 = 스페이싱 토큰**(32/40/48) — MUI 파생 높이 정책 기각
- **플로팅 라벨 제거** — MUI 파생이면서 Material 문법을 골라서 폐기
- **다이얼로그 폭 = 55ch** — 타이포그래피 기준 폭, 표본 유일
- **전환 100ms linear 단일화** vs MUI 곡선·비대칭 지속시간

## 특징적 결정

- **14px 루트 전제** — rem 기준 불일치 세 번째, 값은 7분수 순환소수
- px 환산하면 코어값 완전 준수 (4~56)
- MUI 기반(`odyssey-react-mui`) — 프레임워크 위에 얹은 기업 시스템

## 접근성

미확인 — **문서 사이트가 로그인 뒤에 있어 헤드리스 렌더로도 열 수 없습니다
(2026-08-18 확인).**

`https://odyssey.okta.com/`을 헤드리스로 열면 문서가 아니라 **Okta SSO 로그인
화면**이 나옵니다("Supernova SAML에 액세스하려면 귀하의 계정으로 로그인하십시오"
— Okta FastPass/사용자 이름 입력). 즉 문서가 **Supernova에 호스팅된 사내 전용**
이고, 대체 후보인 `https://odyssey.okta.design/`도 같은 로그인 화면,
`https://okta.github.io/odyssey/`는 GitHub Pages 404입니다.
**표본에서 문서 사이트 자체가 인증 뒤에 있는 사례**로 기록합니다 —
SPA 렌더링 문제가 아니라 접근 권한 문제라, 이 시스템의 접근성 목표·Figma 킷은
공개 자료(npm 패키지)로만 좁혀야 합니다.
확인 URL: https://odyssey.okta.com/ · https://odyssey.okta.design/ ·
https://okta.github.io/odyssey/ (2026-08-18 헤드리스 렌더)

## 참고

- 토큰: `npm pack @okta/odyssey-design-tokens@1.66.1` → `dist/index.scss`
- 컴포넌트 심화: `@okta/odyssey-react-mui@1.66.1` →
  `dist/cjs/theme/{components/{Button,Input,Dialog,CssBaseline},typography,spacing,shape,pxToRem}.cjs`
  + `@okta/odyssey-design-tokens@1.66.1` `dist/index.cjs` 실행 해석 (2026-08-18)
- 문서 사이트: **인증 필요**(Okta SSO / Supernova 호스팅) — 2026-08-18 헤드리스
  렌더로 확인. `figma_kit`·`a11y_target`은 문서 사이트 경로로는 해소 불가이며,
  남은 길은 npm 패키지·저장소(README, `@okta/odyssey-react-mui` 소스)뿐입니다
- ~~컬러·타이포 전체~~ → **전수 해소 (2026-08-18, `@okta/odyssey-design-tokens@1.66.1`
  — 총 206토큰: Hue 91 · Typography 40 · Palette 36 · Border 15 · Spacing 10 ·
  Focus 7 · Depth 3 · Shadow 2 · Transition 2).**
  - 타이포 스케일 **13단계**(Scale0~12, 12~51px @14px 루트), 텍스트 색 역할 10종,
    Overline `0.7142857143rem`(=10/14 — 순환소수 판독법 재확인)
  - **전역 트랜지션이 `100ms linear` 단 1쌍** — Audi(이징 1개)와 같은
    최소주의 진영이되 linear라 더 극단
  - **`BorderWidthHeavy: 1.5px`** — 비정수 보더 두께 토큰은 표본 유일
  - `BorderRadiusRound: 1.5em` — em 라운드(서체 비례)도 희귀 표본
  - **Depth 3단계와 ShadowScale 2단계가 병존** — 값이 거의 같아
    이행 중간 상태로 읽힘 (Atlassian radius 폴백 공존과 같은 유형)
- ~~컴포넌트 목록 전수~~ → **확인 (2026-08-18, `@okta/odyssey-react-mui@1.66.1`
  dist/esm 실측 ≈95종)** — Accordion·Autocomplete·Badge·Banner·Breadcrumbs·
  Callout·Card·DataTable·DatePickers·Dialog·Drawer·EmptyState·Field 계열…
  + labs(UserProfile 등). MUI 래핑 구조 재확인.
- **남은 확인 사항:**
  접근성 목표·Figma 킷(문서 사이트 SSO 비공개 — npm 경로로는 확인 불가 확정),
  ~~루트 14px 전제의 명시 여부~~ (2026-08-18 해소 — CssBaseline `font-size: 87.5%` +
  `pxToRem = px/14` 코드 명시. 심화 절 참조)
