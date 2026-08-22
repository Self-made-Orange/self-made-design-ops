---
name: Helios
org: HashiCorp
coverage: partial
url: https://helios.hashicorp.design
repo: https://github.com/hashicorp/design-system
license: MPL-2.0
tech: [Ember, CSS]
figma_kit: 미확인
tokens_format: [CSS, SCSS]
a11y_target: "WCAG 2.2 AA (명시 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @hashicorp/design-system-tokens@5.1.0 → dist/products/css/tokens.css · npm @hashicorp/design-system-components@6.5.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](helios.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

HashiCorp의 인프라 제품군(Terraform, Vault, Consul 등)을 위한 디자인시스템.

## 토큰

### 라운드 — 홀수 값 중심

| 토큰 | 값 |
|------|-----|
| `--token-border-radius-x-small` | **3px** |
| `--token-border-radius-small` | **5px** |
| `--token-border-radius-medium` | 6px |
| `--token-border-radius-large` | 8px |

**4px·8px 배수 관행에서 벗어난 3px·5px을 씁니다.**
단계도 4개뿐으로, 수집한 시스템 중 가장 적습니다.

### 타이포그래피

세 계열로 분리돼 있습니다.

| 계열 | 토큰 | 값 |
|------|------|-----|
| Display | `display-100` | 13px |
| | `display-200` | 16px |
| | `display-300` | 18px |
| | `display-400` | 24px |
| | `display-500` | 30px |
| Body | `body-100` | 13px |
| | `body-200` | 14px |
| | `body-300` | 16px |
| Code | `code-100` | 13px |
| | `code-200` | 14px |
| | `code-300` | 16px |

**Body와 Code가 같은 크기 3단계(13/14/16)를 공유합니다.**

### 스페이싱

**미확인.** `--token-*` 접두사 목록을 확인했으나 일반 스페이싱 스케일이 발견되지 않았습니다.
컴포넌트별 토큰(`--token-badge-padding`, `--token-badge-gap` 등)은 존재합니다.

Cloudscape처럼 원시 스페이싱 스케일 없이 컴포넌트 토큰만 노출하는 구조일 가능성이 있으나,
확인되지 않았으므로 단정하지 않습니다.

### 컬러

제품별 브랜드 컬러 토큰이 존재합니다 (`--token-color-consul` 등).

출처: `@hashicorp/design-system-tokens@5.1.0`

## 컴포넌트

토큰 이름에서 확인: badge, app-header, app-side.
→ 버튼·입력·모달 치수는 아래 심화 절 (2026-08-18).
모션(컴포넌트 스코프 토큰 6개·전역 스케일 부재)은 `patterns/motion.md`의 Helios 절 참조.

## 컴포넌트 심화 — (2026-08-18)

`@hashicorp/design-system-components@6.5.0` (Ember)의 배포 CSS
`dist/styles/@hashicorp/design-system-components.css` (390KB, 토큰 정의 내장)에서
실측했습니다. 치수 위주 — 모션은 `patterns/motion.md`에 기록돼 중복하지 않습니다.

### 버튼 (`.hds-button`)

| | small | medium | large |
|---|:--:|:--:|:--:|
| **min-height** | **1.75rem (28px)** | 2.25rem (36px) | 3rem (48px) |
| 상하 패딩 | 6px | 9px | 11px |
| 좌우 패딩 | **11px** | **15px** | **19px** |
| 서체 | 13px / 14px | 14px / 16px | 16px / 24px |
| 아이콘 | 12px | 16px | 24px |
| 라운드 | 5px (`border-radius-small`) | 동일 | 동일 |

- **패딩이 전부 4px 그리드에서 1px 모자랍니다** (11=12−1, 15=16−1, 19=20−1) —
  1px 보더를 차감한 값입니다. 입력 토큰 옆에 근거 주석이 배포 CSS에 그대로 남아
  있습니다: `--token-form-control-padding: 7px; /** Notice: we have to take in
  account the border, so it's 1px less than in Figma. */` — **"Figma 값 − 보더"
  원칙을 주석으로 문서화**한 표본 유일 사례입니다 (MUI outlined −1px과 같은 의도).
- 버튼 서체가 타이포 토큰과 정합합니다: 13/14/16 = display-100 = body-100/200/300.
- 포커스 링이 `::before`를 −4px로 띄우고 3px 보더를 그리는 이중 구조 —
  라운드도 `calc(5px + 3px)`로 따라갑니다.
- **오용 경고가 CSS에 들어 있습니다**: `button.hds-button[href]`이면 빨간 배경 +
  `::after`로 "you should use an @href argument" 경고 문구를 화면에 주입합니다 —
  런타임 린트를 CSS로 하는 표본 유일 장치.

### 입력 (`.hds-form-text-input`)

| | 값 |
|---|---|
| 패딩 | **7px** (`form-control-padding` — 위 주석의 그 토큰) |
| 보더 | 1px, 라운드 **5px** (`form-control-border-radius`) |
| 서체 | 14px / 20px (body-200 — 템플릿이 타이포 클래스를 주입) |
| **파생 높이** | **36px** (= 버튼 medium과 정합) |

- 기본 `box-shadow: elevation-inset` — 입력만 안쪽 그림자를 얹습니다.
- focus: 보더색 + `outline: 3px solid` (offset 0) — 버튼(::before)과 다른 메커니즘.
- 파생 클래스인 filter-bar 검색 입력만 패딩 3px·13px 서체로 축소됩니다.

### 모달 (`.hds-modal`) — 네이티브 `<dialog>`

| size | 폭 |
|------|-----|
| small | min(400px, 95vw) |
| medium | **min(600px, 95vw)** |
| large | min(800px, 95vw) |

- 400/600/800 — 200px 등차 3단. 라운드 **8px**(`border-radius-large` — 스케일 최상단을
  모달에 배정), max-height 95vh.
- 네이티브 `<dialog>`이지만 `::backdrop`을 `display:none`으로 끄고 **별도 오버레이
  요소**(neutral-700 팔레트색, opacity 0.5)를 씁니다 — z-index 50/49 리터럴.
- 헤더·푸터가 본문과 다른 배경(`surface-faint`) + 1px 구분선 — "액자형" 3분할.
  패딩: 헤더 16px 24px · 본문 24px · 푸터 16px 24px.
- warning/critical 색 변형이 헤더 배경·보더만 바꿉니다.

### 배포 CSS의 저작권 표기

6.5.0 배포 CSS·소스 헤더 102곳이 전부 **`Copyright IBM Corp. 2021, 2025`**입니다
(라이선스는 MPL-2.0 유지) — 2025년 IBM의 HashiCorp 인수가 디자인시스템 산출물
헤더에 반영된 것입니다. 코퍼스에서 조직 변동이 배포물에 나타난 첫 사례.

### 특징적 결정 (심화분)

- **"Figma 값 − 1px 보더" 패딩 원칙을 주석으로 명문화** — 버튼·입력 전체 일관 적용
- 버튼 28/36/48 3단 + 입력 36px 정합, 서체는 body 스케일 재사용
- **CSS로 오용 경고 주입** (`[href]` 가드) — 표본 유일
- 네이티브 `<dialog>` + 자체 오버레이 병용, 모달 폭 400/600/800 등차
- 저작권 표기가 IBM으로 이행 (MPL-2.0 유지)

## 특징적 결정

- **라운드에 3px·5px을 씁니다.** 대부분의 시스템이 2·4·6·8을 쓰는 가운데 홀수를 택했습니다.
  Spectrum(3·5·7·9px 포함)과 함께 드문 사례입니다.
- **라운드가 4단계뿐입니다.** 3·5·6·8px으로 모두 8px 이하입니다.
  큰 라운드가 아예 없어, 각진 인프라 도구 톤을 유지합니다.
  Material 3(48px까지)과 정반대 축입니다.
- **본문과 코드 타이포 크기가 동일합니다.** 13/14/16px을 공유합니다.
- **기본 본문이 14px대입니다.** `body-100`이 13px, `body-200`이 14px입니다.
  16px 기본인 서구권 관행보다 작으며, Ant Design(14px)과 비슷합니다.
- **제품별 컬러 토큰을 둡니다.** Terraform·Vault·Consul 등 제품마다 브랜드 컬러가 있습니다.
- **이메일용 토큰을 별도 배포합니다** (`dist/cloud-email/`).

## 접근성

~~미확인.~~ → **WCAG 2.2 AA (2026-08-18 해소).**
출처: `helios.hashicorp.design/about/accessibility-statement` — "formalizing our
commitment to WCAG 2.2 AA conformance with an internal policy". **접근성 성명을
별도 페이지로 두고 사내 정책으로 규정한 표본입니다.**

## 참고

- 저장소: https://github.com/hashicorp/design-system
- 패키지: `@hashicorp/design-system-tokens`
- 컴포넌트 심화: `@hashicorp/design-system-components@6.5.0` →
  `dist/styles/@hashicorp/design-system-components.css` (2026-08-18)
- 라이선스: components 패키지 **MPL-2.0** 명기 — frontmatter 반영 (2026-08-18)
- **스페이싱 스케일 확인이 남아 있습니다.** 컴포넌트 CSS도 리터럴 px(8·16·24)로
  패딩을 쓰고 있어, 원시 스페이싱 토큰이 없다는 정황이 강화됐습니다 — 단 단정은 보류.
- **라이선스 해소 (2026-08-18):** `MPL-2.0` — 출처: github hashicorp/design-system → `LICENSE` (npm `@hashicorp/design-system-tokens@5.1.0` 메타와 일치)
