---
name: Canvas
org: Workday
coverage: partial
url: https://canvas.workday.com
repo: https://github.com/Workday/canvas-tokens
license: Apache-2.0
tech: [React, CSS]
figma_kit: false
tokens_format: [CSS]
a11y_target: "WCAG 2.1 A/AA (명시 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @workday/canvas-tokens-web@4.4.0 → css/base/_variables.css · npm @workday/canvas-kit-react@16.0.6 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](canvas.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Workday의 HR·재무 업무 제품용 디자인시스템.
스케일이 **2px 단위로 매우 촘촘한** 것이 특징입니다.

## 토큰

### 사이즈 / 스페이싱

| 토큰 | rem | px |
|------|-----|-----|
| `--cnvs-base-size-0` | 0 | 0 |
| `--cnvs-base-size-25` | 0.125 | 2 |
| `--cnvs-base-size-50` | 0.25 | 4 |
| `--cnvs-base-size-75` | 0.375 | 6 |
| `--cnvs-base-size-100` | 0.5 | 8 |
| `--cnvs-base-size-125` | 0.625 | 10 |
| `--cnvs-base-size-150` | 0.75 | 12 |
| `--cnvs-base-size-175` | 0.875 | 14 |
| `--cnvs-base-size-200` | 1 | 16 |
| `--cnvs-base-size-225` | 1.125 | 18 |
| `--cnvs-base-size-250` | 1.25 | 20 |
| `--cnvs-base-size-300` | 1.5 | 24 |
| `--cnvs-base-size-350` | 1.75 | 28 |
| `--cnvs-base-size-400` | 2 | 32 |
| `--cnvs-base-size-450` | 2.25 | 36 |
| `--cnvs-base-size-500` | 2.5 | 40 |
| `--cnvs-base-size-600` | 3 | 48 |
| `--cnvs-base-size-700` | 3.5 | 56 |
| `--cnvs-base-size-800` | 4 | 64 |

**2~20px 구간이 2px 단위로 전부 채워져 있습니다** (2·4·6·8·10·12·14·16·18·20).
20px 이후로 4px 단위, 40px 이후로 8px 단위로 넓어집니다.

### 베이스라인 배수

큰 값은 `--cnvs-base-baseline` 변수의 배수로 정의됩니다.

```css
--cnvs-base-size-1600: calc(var(--cnvs-base-baseline) * 16.00)
--cnvs-base-size-3200: calc(var(--cnvs-base-baseline) * 32.00)
```

베이스라인 하나를 바꾸면 대형 사이즈가 함께 움직입니다.

기본 폰트 크기는 `--cnvs-base-font-size: 1rem` (16px)입니다.

출처: `@workday/canvas-tokens-web@4.4.0` → `css/base/_variables.css`

### 라운드 / 컬러 / 타이포

~~미확인.~~ → **라운드는 해소 (2026-08-18 심화 절)** — `css/legacy/system.css`의
shape 스케일: sm 4 / md 8 / lg 12 / xl 16 / xxl 24 / xxxl 32px / **full 65rem(알약)**.
타이포는 심화 절에서 subtext.md(12/16)·subtext.lg(14/20)·body.sm(16/24)만 확인.
전체 타이포 스케일·컬러 팔레트는 미확인 유지.

## 컴포넌트

~~미확인.~~ → 버튼·입력·모달은 아래 심화 절 (2026-08-18).
패키지에 `sana` 테마가 별도로 존재합니다.

## 컴포넌트 심화 — (2026-08-18)

컴포넌트 값은 `@workday/canvas-kit-react@16.0.6`에서 실측했습니다. 이 패키지는
빌드 산출물이 아니라 **`.tsx` 소스를 그대로 배포**하므로 스텐실(`createStencil`)
선언을 직접 읽을 수 있습니다. 토큰 참조는 `@workday/canvas-tokens-web@4.4.0`의
`css/legacy/{system,base}.css`·`css/base/_variables.css`로 끝까지 해석했습니다.

**킷 v16이 소비하는 네임스페이스가 `system.legacy.*`입니다** — tokens v4가
신 스케일(`--cnvs-sys-space-x1~x20`, `--cnvs-base-unit: 0.25rem` 배수) 위에
구 이름(`size-md`·`padding-lg`…)을 별칭 층으로 얹어 두었고, 현행 컴포넌트가
그 별칭을 쓰는 **세대 교체 중간 상태**입니다.

### 버튼 (BaseButton) — 4단 · 알약 · 절대 최소 너비

| | extraSmall | small | medium (기본) | large |
|---|:--:|:--:|:--:|:--:|
| **높이** | 24px | 32px | **40px** | 48px |
| 좌우 패딩 | 8px | 12px | 16px | 20px |
| **최소 너비** | auto | **72px** | **88px** | **104px** |
| 서체 | 12/16 | 14/20 | 14/20 | 16/24 |

- **라운드가 `shape.full` = 65rem(1040px) — 전 변형 알약입니다.**
  Primary·Secondary·Tertiary 모두 같은 값을 명시 지정합니다.
  Cloudscape(20px 알약)와 같은 진영이고, MUI(4px)·Backpack(8px)과 갈립니다.
- **px 절대 최소 너비가 크기별 3단(72/88/104)입니다.** 문서 층 조사에서
  절대값 min-width 표본이 0이었는데(`patterns/button.md` — Spectrum만 높이×2.25
  비례식), 코드 층은 Fluent(64/96)·MUI(64)에 이어 세 번째이며 **폭이 가장 큽니다.**
- **아이콘 쪽 패딩을 토큰 한 단계 줄입니다** — medium에서 icon-start면
  좌 12px·우 16px (compound modifier로 start/end/only 9조합 선언).
  icon-only는 패딩 0 + `min-width = 높이`(정사각형)입니다.
- 서체 굵기 500, 보더 1px(색만 변형별), 전환 **120ms linear**
  (box-shadow·border·background·color), `hover:active`에서 **40ms로 단축**.
- 포커스가 이중 링입니다: 2px 흰 내륜 + 4px 브랜드 외륜 box-shadow.

### 입력 (TextInput) — 단일 40px · min-width 280px

| 항목 | 값 |
|------|-----|
| 높이 | **40px** (`size.md`) — **크기 변형 없음** |
| 패딩 | 8px 사방 (`padding.xs`, 주석 "Compensate for border") |
| 보더 / 라운드 | 1px / **12px** (`shape.lg`) |
| **최소 너비** | **280px** (`px2rem(280)` 하드코딩) |
| 서체 | 14/20 (subtext.lg) |

- **버튼은 4단인데 입력은 단일 40px입니다** — 스텐실 modifier가 grow·error뿐.
- **min-width 280px** — `patterns/form.md`는 "입력 최소 너비 — 어느 시스템에도
  없습니다"라고 기록했는데, **Canvas가 그 첫 반례**입니다. 라벨(아래)도
  min-width 180px.
- 라벨은 플로팅이 아니라 **별도 블록**(FormField.Label) — 14px·굵기 500,
  세로 배치 시 라벨-입력 gap 4px, 가로 배치용 라벨 min-width 180px.
  FormField 자체가 margin-bottom 24px(`gap.lg`)를 가집니다.
- 포커스: 보더가 브랜드색 + **inset 1px box-shadow**로 2px 두께 효과.
  에러는 inset 2px, caution까지 **2단 에러 변형**(error/caution)입니다.

### 모달 — 440px 단일 폭 · 라운드 32px

| 항목 | 값 |
|------|-----|
| 폭 | **440px 하나뿐** (`px2rem(440)`, 크기 prop 없음) |
| 마진 / 최대 높이 | 40px / `calc(100dvh − 40px)` (기본 오프셋) |
| 라운드 | **32px** (`shape.xxxl` — 주석 "modals and large containers") |
| 패딩 | 24px (`padding.xl`, Popup.Card 상속) |
| 그림자 | `depth-6` = 0 6px 24px 13% + 0 12px 48px 9% (oklch) |
| 스크림 | 페이드 인 **300ms** (keyframes, 이징 미지정=ease) |
| 카드 진입 | placement 방향 translate→0 + **150ms ease-out** |

- **Modal이 Popup.Card의 확장입니다** — Dialog·Modal·Popup이 한 스텐실 계보를
  공유하고, Modal은 폭·마진·radius만 덮어씁니다. 폭 단계가 없는 단일 440px은
  Mantine 기본값 `md`=440px과 정확히 같은 값입니다 (`patterns/modal.md`).
- 내부 패딩: 제목 `8px 8px 4px` · 본문 `4px 8px 8px` (카드 24px 안쪽).
- ≤768px에서 **바텀 시트로 전환**됩니다 (`alignItems: end` + 마진·패딩 16px).
- **`.wd-no-animation` 전역 클래스로 애니메이션을 끄는 탈출구**가 스텐실에
  박혀 있습니다 — 모션 감소를 토큰이 아니라 클래스로 제공하는 방식.
- 홀수 뷰포트에서 컨테이너 폭을 `calc(100vw − 1px)`로 짝수화하는
  **서브픽셀 센터링 보정**이 코드에 있습니다 (Chrome flexbox 이슈 주석).

### 특징적 결정 (심화분)

- **전 버튼 알약(65rem) + 크기별 절대 최소 너비 3단(72/88/104px)** —
  두 규정의 조합은 코퍼스에서 Canvas가 유일한 것으로 보입니다
- **버튼 4단 vs 입력 단일 40px** — 컨트롤 높이 정책이 컴포넌트별로 비대칭
- **입력 min-width 280px · 라벨 min-width 180px** — 폼 치수까지 절대값 규정
- **모달 폭 440px 단일** — 폭 스케일 자체를 두지 않음 (Cloudscape 5단과 대극,
  Backpack 2단보다도 적음)
- **`system.legacy.*` 소비** — 신 토큰 스케일 위 별칭 층을 현행 킷이 쓰는
  세대 교체 중간 상태. `.tsx` 소스 배포라 스텐실 선언이 곧 문서 역할

## 특징적 결정

- **하단 구간이 2px 단위로 촘촘합니다.** 2~20px 사이에 10단계가 있습니다.
  Ant Design(4·8·12·16·20 — 5단계)의 두 배입니다.
  세밀한 조정이 가능한 대신, "10px과 12px 중 무엇을 쓸 것인가"를 매번 판단해야 합니다.
- **`size`라는 단일 이름으로 스페이싱과 크기를 함께 다룹니다.**
  여백 전용 스케일을 따로 두지 않습니다. Polaris가 `size`에서 space와 radius를
  파생시킨 것과 비슷하지만, Canvas는 파생 없이 하나만 씁니다.
- **rem이 원본 단위입니다.** Backpack과 같습니다.
- **대형 값에 baseline 배수를 씁니다.** 소형은 고정 rem, 대형은 변수 배수라
  두 체계가 한 스케일에 섞여 있습니다.

## 접근성

~~미확인.~~ → **WCAG 2.1 A/AA (2026-08-18 해소).**
출처: `canvas.workday.com/accessibility` — "guided by the Web Content Accessibility
Guidelines (WCAG) 2.1 A/AA". **레벨을 A와 AA 병기로 적는 드문 표기입니다.**

2026-08-18 헤드리스 렌더로 원문 재확인 —
https://canvas.workday.com/guidelines/accessibility/overview
("We are guided by the Web Content Accessibility Guidelines (WCAG) 2.1 A/AA").
같은 페이지가 POUR(Perceivable · Operable · Understandable · Robust) 4범주를
그대로 채택하고, 접근성 하위 문서를 **Overview / For Designers / For Developers 탭**으로
쪼개 둡니다 — 단 `Accessible Forms` 등 일부는 **For Designers 탭이 internal 전용**입니다.

## 참고

- 저장소: https://github.com/Workday/canvas-tokens
- 패키지: `@workday/canvas-tokens-web@4.4.0` (토큰) ·
  `@workday/canvas-kit-react@16.0.6` (컴포넌트 — 2026-08-18 심화에 사용:
  `button/lib/BaseButton.tsx` · `text-input/lib/TextInput.tsx` ·
  `form-field/lib/FormFieldLabel.tsx` · `modal/lib/ModalCard.tsx` ·
  `popup/lib/PopupCard.tsx`)
- 라이선스: canvas-kit-react `package.json`에 **Apache-2.0** (frontmatter와 일치)
- **Figma 킷 — 부재 확정 (2026-08-18, `figma_kit: false`)**:
  문서 사이트를 헤드리스로 렌더해도 **공개 Figma 킷이 없습니다.**
  루트 내비게이션이 `Get Started → Introduction / For Developers / For Contributors`뿐이고
  **`For Designers`가 공개 내비에 없습니다.** Next.js 라우트 매니페스트에는
  `get-started` 아래 `for-designers` 노드가 존재하지만
  `https://canvas.workday.com/get-started/for-designers`는 **404**이고,
  업그레이드 가이드·접근성 문서의 `For Designers` 탭도 `"internal": true`로 표시됩니다.
  사이트 전체에서 "figma"는 `for-developers/resources` 페이지의 **검색 태그 문자열 한 곳**에만
  등장하며 figma.com 링크는 하나도 없습니다.
  → **디자이너/Figma 문서를 사내 전용으로 게이팅한 시스템**입니다 (C 분류).
  렌더 확인: https://canvas.workday.com/ · https://canvas.workday.com/get-started/introduction ·
  https://canvas.workday.com/get-started/for-developers/resources (2026-08-18)
- **남은 확인 사항:** 전체 타이포 스케일·컬러 팔레트 실값, `sana` 테마의 차이
