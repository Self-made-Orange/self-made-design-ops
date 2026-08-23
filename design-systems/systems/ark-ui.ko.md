---
name: Ark UI
org: Chakra 팀 (Segun Adebayo 등)
coverage: partial
url: https://ark-ui.com
repo: https://github.com/chakra-ui/ark
license: MIT
tech: [React, Vue, Solid, Svelte]
figma_kit: false
tokens_format: []
a11y_target: "WCAG (버전·레벨 미명시 — 2026-08-18 확인)"
platform: web
domain: framework
verified: 2026-08-23
source: "npm @ark-ui/react@5.39.0 → package/dist/components (74개), package.json 의존성"
---
<!-- lang-links -->
> [English](ark-ui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**토큰이 하나도 없는 시스템**입니다 — 스타일 없는 헤드리스 프리미티브
68개(`@zag-js/*` 상태 머신)를 컴포넌트 74개로 감싸 배포합니다.
`anatomy`(파트 이름 정의)가 사실상 유일한 공개 계약입니다.

## 왜 코퍼스에 넣는가

**"디자인시스템에 토큰이 없을 수 있다"의 극단**입니다.
`platforms.md`의 "스페이싱 없음 3종"(정의하지 않음 / 상속함 / 열거하지 않음)에
**네 번째 유형 — 아예 스타일 층이 없음**을 추가합니다.

- 토큰 파일이 없고, CSS도 배포하지 않습니다 (`.css` 0개)
- **`anatomy`**를 노출합니다 — 컴포넌트를 구성하는 파트 이름
  (`root`/`trigger`/`content` 등)의 정의이며, 스타일 라이브러리가
  이 이름에 값을 붙입니다. **Park UI(Panda 프리셋) · Chakra v3가
  이 위에 얹힙니다**
- 상태 머신이 `@zag-js/*` **68개 패키지로 분리**돼 있습니다 —
  컴포넌트 동작(포커스 트랩·키보드 내비·ARIA)을 프레임워크와 무관하게 구현
- **React·Vue·Solid·Svelte 4프레임워크 지원** — Siemens iX(Web Components +
  3래퍼)와 함께 배포 폭 최대이며, 이쪽은 상태 머신 공유 방식입니다

## 코퍼스 의존 관계 정리

```
Ark UI (동작·anatomy)
  ├── Park UI      = Ark UI + Panda CSS 프리셋 + Radix Colors 팔레트
  └── Chakra UI v3 = Ark UI 기반으로 재작성 (systems/chakra-ui.md)

Radix Primitives (동작)
  ├── shadcn/ui    = Radix Primitives + Tailwind 토큰
  └── Radix Themes = Radix Primitives + 자체 스타일 레이어
```

**동작 층과 스타일 층이 분리된 계보가 두 갈래**(Ark / Radix Primitives)이고,
각각 위에 스타일 시스템이 2개씩 얹혀 있습니다 — 코퍼스에서 확인된 구조입니다.

## 컴포넌트

**74개** (accordion · angle-slider · carousel · clipboard · collapsible ·
color-picker · combobox · date-picker · file-upload · pin-input ·
qr-code · signature-pad · toast · toc · tour · tree-view 등).
`angle-slider`·`signature-pad`·`tour` 같은 특수 컴포넌트가 있습니다.

## 컴포넌트 심화 — (2026-08-18)

헤드리스이므로 심화의 대상이 시각 값이 아니라 **계약 구조**입니다.
`@ark-ui/react@5.38.2` + 핀 고정된 `@zag-js/*@1.43.1`에서 실측했습니다.

### 시각 값 없음 — 확정

- `.css` 0개 재확인. 패키지 안의 유일한 스타일 문자열은 `frame` 컴포넌트가
  iframe에 주입하는 `margin:0; padding:0; box-sizing:border-box` 리셋뿐 —
  치수·색·서체 값이 **패키지 전체에 하나도 없습니다**. 버튼·입력·모달의
  "값 실측"은 성립하지 않으며, 아래가 그 자리를 차지하는 구조 계약입니다.

### 스타일 계약 — data 속성 3층 문법

`@zag-js/anatomy`의 `createAnatomy(name).parts(…).build()`가 파트마다
`attrs: { "data-scope": "dialog", "data-part": "content" }`와 셀렉터
`[data-scope="dialog"][data-part="content"]`를 생성합니다 — 스타일 라이브러리는
클래스가 아니라 **속성 셀렉터로** 얹힙니다. 상태 어휘는 3층:

| 층위 | 속성 | 값 |
|---|---|---|
| 정체 | `data-scope` / `data-part` | 컴포넌트/파트 이름 (kebab) |
| 이산 상태 | `data-state` | `"open"` / `"closed"` 등 |
| 불리언 상태 | `data-disabled` `data-invalid` `data-readonly` `data-required` … | 값 없는 존재 여부 |

### 모달 자리 — Dialog

- anatomy **7파트**: trigger · backdrop · **positioner** · content · title ·
  description · closeTrigger. positioner가 별도 파트입니다 — 중앙/하단 같은
  **배치를 스타일 층의 책임으로 밀어낸** 설계 (Semi·Naive처럼 CSS가 배치를
  갖는 시스템과 구조적 대비).
- 상태 머신은 **open/closed 2상태**. 동작 옵션: trapFocus · preventScroll ·
  restoreFocus · closeOnEscape · closeOnInteractOutside. `role` prop으로
  dialog/alertdialog 전환, aria-modal·aria-labelledby·aria-describedby 배선 내장.
- 진입/퇴장은 **Presence** 유틸 담당: `data-state` + `unmountOnExit` ·
  `lazyMount` · `skipAnimationOnMount` — 애니메이션 값은 배포하지 않으면서
  **CSS 애니메이션이 끝나기를 기다렸다가 unmount하는 타이밍 훅**만 배포합니다.

### 버튼·입력 자리 — Button 없음, Field

- **버튼 컴포넌트가 없습니다** — 상태 머신이 필요 없는 요소는 만들지 않는다는
  원칙의 증거입니다 (61개 디렉터리에 button 부재, toggle·download-trigger는 있음).
- 입력은 **Field**가 감쌉니다 — **8파트**: root · **input · textarea · select**
  (세 폼 요소를 한 anatomy가 커버) · label · helperText · errorText ·
  requiredIndicator. 상태는 불리언 4종(data-disabled/invalid/readonly/required),
  invalid는 aria-invalid와 이중 각인.

### 규모 재실측

- 의존성 **67개 = `@zag-js/*` 66 + `@internationalized/date` 1** — 전부 상태
  머신 계열, 범용 유틸 0.
- `dist/components` 항목 73개의 내역: **컴포넌트 디렉터리 61 + 배럴 파일 12**
  (anatomy·factory·index 각 4형식). 61개 중 anatomy를 노출하는 것이 **51종**,
  나머지 10개는 portal · presence · focus-trap · client-only · format · frame 등
  동작 유틸입니다.

### 특징적 결정 (심화분)

- **시각 값 0 확정** — 유일한 CSS 문자열이 frame의 iframe 리셋
- 스타일 계약 = **data-scope/part/state 속성 셀렉터** (클래스 아님)
- **positioner 파트** — 배치까지 스타일 층으로 외주
- **버튼 없음** — 상태 머신 없는 요소는 만들지 않음
- Presence — 애니메이션 값 없이 unmount 타이밍만 제공
- Field가 input/textarea/select 셋을 한 anatomy로

## 특징적 결정

- **토큰 0 · CSS 0** — 스타일 층 자체가 없는 유일 표본
- `anatomy`(파트 이름)가 스타일 라이브러리와의 계약
- 상태 머신 68개 패키지 분리(`@zag-js/*`)
- 4프레임워크 지원 — 배포 폭 최대 계열
- Park UI·Chakra v3의 공통 기반

## 접근성

~~키보드·ARIA 동작이 상태 머신에 구현돼 있으나 **목표 수준·검증 방식은 미확인**입니다.~~
→ **WCAG 준수 표방 (2026-08-18 해소 — 버전·레벨 표기는 없습니다).**
출처: github chakra-ui/ark → `README.md` — "WCAG compliant components tested with
real assistive technologies out of the box". 검증은 실제 보조기술 테스트라고만 적고
도구·리포트는 공개하지 않습니다.

## 참고

- 패키지: `npm pack @ark-ui/react@5.38.2` (+ `@zag-js/dialog@1.43.1` ·
  `@zag-js/anatomy@1.43.1` — 2026-08-18 심화에 사용)
- **남은 확인 사항:** ~~컴포넌트 73개의 파트 구조~~ (2026-08-18 부분 해소 —
  심화 절: anatomy 노출 51종 확인, Dialog 7파트·Field 8파트 실측 — 나머지
  49종의 파트 열거는 미실시), 접근성 검증 방식, Chakra v3와의 코드 공유 범위

> 재검증 (2026-08-17): 5.38.1 → 5.38.2 patch — 이 항목은 토큰·CSS가 없는 anatomy 배포라 값 영향 없음. 핀만 갱신.

## 드리프트 기록 — 5.38.2 → 5.39.0 (2026-08-23)

**이번 신선도 패스에서 기록 숫자가 실제로 움직인 첫 minor입니다.** 재실측:

| | 5.38.2 | 5.39.0 |
|---|:---:|:---:|
| `dist/components` 항목 | 73 | **74** |
| — 컴포넌트 디렉터리 | 61 | **62** |
| — 배럴 파일 | 12 | 12 |
| 의존성 | 67 | **69** |
| — `@zag-js/*` | 66 | **68** |
| — 그 외 | `@internationalized/date` | ← |
| 핀 고정된 `@zag-js/*` | 1.43.1 | **1.43.3** |

컴포넌트 하나가 늘었습니다 — **`toc`**. anatomy를 `@zag-js/toc`에서 재수출하는
디렉터리이고(`toc.anatomy.js`는 두 줄), 파트는 nav · list · item · link · content ·
indicator · title · root입니다. 이걸 세면 anatomy를 노출하는 디렉터리는 51 → 52가 되고,
`dist/components` 아래 나머지는 변동 없습니다.

**`@zag-js/*` 패키지는 2개 늘었는데 컴포넌트는 1개뿐입니다** — `@zag-js/hotkeys`에는
**대응하는 컴포넌트 디렉터리가 없습니다.** 위 심화 절의 "범용 유틸 0" 관찰은 5.38.2에서
측정한 것이고 이 항목은 그것을 5.39.0으로 연장하지 않습니다. 여기서 측정한 것은
그 의존성이 존재하고 그에 대한 래퍼가 배포되지 않는다는 사실뿐입니다.

위의 심화 절은 파트 구조를 측정한 버전인 `@ark-ui/react@5.38.2` + `@zag-js/*@1.43.1`에
그대로 핀 고정해 둡니다.
