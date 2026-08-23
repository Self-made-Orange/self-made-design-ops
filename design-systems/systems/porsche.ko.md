---
name: Porsche Design System
org: Porsche
coverage: partial
url: https://designsystem.porsche.com
repo: https://github.com/porsche-design-system/porsche-design-system
license: code: Apache-2.0, assets: Porsche Design System Assets License Agreement
tech: [Web Components, React, Angular, Vue]
figma_kit: true
tokens_format: [CSS]
a11y_target: "WCAG 2.2 AA"
platform: web
domain: consumer
verified: 2026-08-23
source: "npm @porsche-design-system/components-js@4.6.0 → stylesheets/variables.css"
---
<!-- lang-links -->
> [English](porsche.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Porsche의 브랜드 웹 시스템. **표본 첫 `light-dark()` CSS 함수 테마**이며,
스페이싱이 **fluid/static 쌍**이고 모션 최소 단위가 **250ms**로 표본에서 가장 느립니다.

## 토큰

### 다크 모드 — `light-dark()` 함수, 네 번째 방식

```css
:root {
  color-scheme: light;
  --p-color-canvas: light-dark(#fff, hsl(225 66.7% 1.2%));
  --p-color-primary: light-dark(hsl(225 66.7% 1.2%), hsl(225 100% 99%));
}
```

**모든 색 토큰이 `light-dark(라이트값, 다크값)` 한 줄입니다.**
`color-scheme` 속성만 바꾸면 브라우저가 값을 고릅니다 — 테마 파일도,
`.dark` 클래스도, 중복 선언도 없습니다.

| 다크 모드 방식 | 시스템 |
|----------------|--------|
| 테마 파일 분리 | Apple · Material 3 · Atlassian · Pajamas · Codex |
| CSS 클래스 오버라이드 | shadcn/ui · Radix Themes |
| 한 토큰에 두 값 (쉼표) | visionOS |
| **`light-dark()` 함수** | **Porsche — 표본 유일** |

visionOS의 "한 토큰에 두 값"을 **표준 CSS 문법으로 실현**한 형태입니다 —
visionOS 방식의 단점(파싱·도구 연동)이 브라우저 지원으로 해소됩니다.

### `frosted` — 재질 색 계열

```css
--p-color-frosted:        light-dark(hsl(240 5% 70% / .148), …);
--p-color-frosted-soft / -strong
--p-color-info-frosted / …상태색에도 frosted 변형
```

**반투명 유리 배경 전용 계열입니다.** Apple iOS가 `Labels - Vibrant`로 재질 위
요소를 별도 색으로 두는 것과 같은 축이며 (`patterns/color.md`),
**웹 시스템에서 재질 색 계열은 Porsche가 처음입니다.**
상태색(`info` 등)에도 `-frosted` 변형이 붙습니다.

### 대비 램프 — 알파 5단계

```
contrast-higher .8 / high .7 / medium .6 / low .5 / lower .32
```

**텍스트·보조 요소 대비를 불투명도 5단계 시맨틱으로 둡니다.**
Astro UXDS의 `color-text` 계열, Apple의 Labels 4단계와 같은 축이되
이름이 명시적 비교급(`higher`~`lower`)입니다.

### 스페이싱 — fluid / static 쌍

```css
--p-spacing-fluid-md:  clamp(16px, 1.25vw + 12px, 36px);
--p-spacing-static-md: 16px;
```

| 단계 | static | fluid (min → max) |
|:---:|:---:|------|
| xs | 4 | 4 → 8 |
| sm | 8 | 8 → 16 |
| md | 16 | 16 → **36** |
| lg | 32 | 32 → **76** |
| xl | 48 | 48 → 96 |

**Pajamas가 타이포에 둔 fluid/fixed 쌍을 여백에 둡니다** — 모든 단계에
정적 짝이 있습니다. Open Props의 fluid 여백에는 짝이 없습니다
(`tokens/scales.md`).

**fluid 상한이 static의 2~2.4배입니다** — `lg`가 32→76px까지 늘어납니다.

**static 스케일이 `4/8/16/32/48`입니다 — 12와 24가 없습니다.**
24 부재는 Mantine·Garden에 이어 셋째입니다. 5단계 T셔츠 명명입니다.

### 모션 — 최소가 250ms

| 토큰 | 값 |
|------|:---:|
| `--p-duration-sm` | **250ms** |
| `--p-duration-md` | 400ms |
| `--p-duration-lg` | 600ms |
| `--p-duration-xl` | **1200ms** |

**가장 빠른 단계가 250ms입니다** — 표본 다수의 "느린 축"(Atlassian `long`,
Cloudscape `complex`)이 Porsche의 시작점입니다. 50~150ms 구간이 아예 없습니다
(`patterns/motion.md`의 "미세 상태 전환 50ms" 권고와 정반대 좌표).

## 컴포넌트

Web Components 기반 (`components-js` + React/Angular/Vue 래퍼).
`stylesheets/cn/` — **중국 전용 스타일시트가 별도 배포됩니다**
(폰트 페이스 분리). 표본에서 지역별 스타일시트 배포는 Porsche뿐입니다.
→ 버튼·입력·모달은 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

**npm 패키지에는 컴포넌트 스타일이 없습니다** — `components-js@4.5.0`은
CDN 로더이고, 실제 컴포넌트는 `cdn.ui.porsche.com`의 Stencil 청크
(`porsche-design-system.button.<해시>.js` 등, JSS 런타임 스타일)로만
배포됩니다. 아래 값은 로더가 가리키는 v4.5.0 청크의 스타일 객체를
직접 해석해 실측했습니다.

### 버튼 (`p-button`) — 두 상태가 1차식 하나

```js
padding:        calc(28px   * (var(--_p-button-a) - 0.64285714) + 6px)   // 상하
                calc(33.6px * (var(--_p-button-a) - 0.64285714) + 16px)  // 좌우
gap(아이콘-텍스트): calc(11.2px * (var(--_p-button-a) - 0.64285714) + 4px)
```

| | 기본 (`s=1`) | compact (`s=0.64285714`) |
|---|:--:|:--:|
| 상하 패딩 | **16px** | 6px |
| 좌우 패딩 | 28px | 16px |
| gap | 8px | 4px |
| 라운드 | **12px** (`--p-radius-xl`) | 8px (lg) |
| 서체 | 1rem / **400** / `calc(6px + 2.125ex)` | 동일 |

- **기본/compact 두 상태를 두 선언이 아니라 스케일 변수 1개짜리 1차식으로
  배포합니다** — `s`(0.64285714=9/14 또는 1)만 바뀌면 패딩·gap이 함께 보간됩니다.
  표본 유일 구조입니다.
- 크기 변형이 없습니다 — `compact` 불리언뿐. 높이 선언도 없어
  **행간+패딩 파생**입니다 (아래 입력의 고정 3.5rem과 대조).
- **버튼 굵기가 400(normal)입니다** — Backpack 700·MUI 500과 갈리는,
  본문과 같은 레귤러 버튼.
- 모든 버튼 root에 `backdrop-filter: blur(32px)`(`--p-blur-frosted`)가
  깔립니다 — secondary 배경이 `frosted-strong` 반투명이라
  **버튼 자체가 재질(frosted) 컴포넌트**입니다.
- 아이콘 전용은 라운드가 `--p-radius-full` = **`calc(infinity * 1px)`**.
- 전환은 전부 `var(--p-transition-duration, var(--p-duration-sm))` 형태 —
  **`--p-transition-duration`/`--p-animation-duration` 전역 변수 하나로
  모든 모션을 끌 수 있는 킬스위치**가 내장돼 있습니다. hover조차 250ms.

### 입력 (`p-input-text`) — 높이가 3.5rem 고정

| | 기본 | compact |
|---|:--:|:--:|
| **height** | `calc(s × 3.5rem)` = **56px** | 36px |
| 좌우 패딩 | 16px | 8px |
| 보더 | 1px | 동일 |
| 라운드 | 12px | 8px |

- **56px은 표본 최대급**입니다 (MUI medium 56px과 동좌표) —
  compact가 다수 시스템의 기본(36px)에 해당합니다.
- **포커스가 아웃라인이 아니라 보더 색 교체**입니다 (`:focus-within`에서
  상태색으로) — 아웃라인은 forced-colors 모드에서만 나타납니다.
  버튼의 포커스는 2px `--p-color-focus`(#1a44ea) 아웃라인 — 컴포넌트마다
  포커스 문법이 다릅니다.
- 내부 행간이 `calc(var(--p-leading-normal) + 6px)` — 아래 ex 행간 참조.

### 모달 (`p-modal`) — 폭 단계가 없음

| 항목 | 값 |
|------|-----|
| width | `var(--p-modal-width, auto)` — **무단계, 내용 폭** |
| min / max | 276px / **1535.5px** |
| 상하 마진 | `var(--p-modal-spacing-top/bottom, clamp(16px, 10vh, 192px))` |
| 좌우 마진 | `max(22px, 10.625vw - 12px)` |
| 라운드 | **24px** (`--p-radius-3xl`) + `clip-path: inset(0 round 24px)` |
| 진입 | `translate3d(0,25vh,0)`→0 + 페이드, **400ms**(md)/ease-in |
| 퇴장 | 250ms(sm)/ease-out — 비대칭 |

- **폭 스케일이 아예 없습니다** — Cloudscape 5단·MUI 브레이크포인트 재사용과
  또 다른 세 번째 답. `--p-modal-width` 등 **공개 CSS 변수 3종**이 유일한
  조절축입니다 (`--p-*` 공개 vs `--_p-*` 내부의 이름 규약).
- **네이티브 `::backdrop`을 `display:none`으로 죽이고**, `<dialog>` 자신을
  100dvw/dvh 레이어로 만들어 `--p-color-backdrop`(hsl 240 5.3% 14.9% / .5) +
  `blur(32px)`를 칠합니다 — **frosted 유리 스크림**. 닫힘은 width/height 0px
  트릭으로 전환 종료 후 숨깁니다.
- 콘텐츠 패딩: 상 `--p-spacing-fluid-md`(16→36), 하 `calc(24px + fluid-md)` —
  **하단 패딩에 라운드 몫(24px)을 더해** 곡률 안으로 내용이 파고들지 않게 합니다.

### 토큰 backlog 해소 (variables.css 재실측)

| 축 | 값 |
|----|-----|
| 라운드 | 2 / 4 / 6 / 8 / 12 / 16 / 24 / 32 + full=`calc(infinity*1px)` (8단+full) |
| 타이포 | 2xs 12 · xs 14 · sm 16 **정적**, md~5xl은 `clamp()` **fluid** |
| 이징 | `ease-in-out (0.25,0.1,0.25,1)` · `ease-in (0,0,0.2,1)` · `ease-out (0.4,0,0.5,1)` |
| 행간 | `--p-leading-normal: calc(6px + 2.125ex)` |
| 포커스 | `light-dark(#1a44ea, #1a44ea)` — 라이트/다크 동일값 |

- **이징 이름이 통념과 반대입니다** — `ease-in`이 감속 곡선(Material의
  easeOut 형태), `ease-out`이 가속 곡선입니다. "진입(in)할 때 쓰는
  곡선"이라는 용법 명명으로 읽어야 맞습니다.
- **행간이 `ex`(x-height) 파생입니다** — `calc(6px + 2.125ex)`. 폰트의
  실제 소문자 높이에 행간이 반응하는 표본 유일 구조입니다. 스페이싱
  fluid(vw 반응)와 함께, 고정값 대신 파생식을 배포하는 일관된 성향입니다.

### 특징적 결정 (심화분)

- **스케일 변수 1개 + 1차식으로 기본/compact를 보간** — 상태별 선언 없음
- **버튼=파생 높이 vs 입력=고정 3.5rem** — 같은 시스템 안의 두 철학
- **모달 폭 무단계** + 공개 오버라이드 변수(`--p-modal-*`)
- **네이티브 backdrop을 끄고 dialog 자체를 frosted 스크림으로**
- **ex 기반 행간** · **infinity 라운드** · **전역 모션 킬스위치 변수**
- **컴포넌트 스타일이 npm에 없음** — 버전드 CDN 청크 전용 배포

## 특징적 결정

- **`light-dark()` 함수 테마** — 다크 모드 네 번째 방식, 표본 유일
- **`frosted` 재질 색 계열** — 웹 시스템 첫 재질 축, 상태색에도 변형 존재
- **스페이싱 fluid/static 쌍** — Pajamas의 타이포 패턴을 여백에 적용
- **static 스케일에 12·24 없음** (4/8/16/32/48)
- **모션 최소 250ms** — 표본에서 가장 느린 좌표계
- **대비 램프 5단계 비교급 명명** (`contrast-higher`~`lower`)
- **중국 전용 스타일시트(`cn/`) 분리 배포** — 지역화가 토큰 층위에 있는 유일 사례.
  `i18n/README.md`의 서체·지역 축과 직결됩니다
- 색이 전부 **HSL**입니다 (shadcn/ui의 OKLCH, 다수의 헥스와 또 다른 선택)

## 접근성

`color-scheme` 기반이라 OS 다크 설정을 자동 존중합니다.
~~대비 램프가 시맨틱으로 노출되나 목표 수치는 미확인.~~ → **해소 (2026-08-18, 헤드리스 렌더).**

**목표는 WCAG 2.2 AA입니다** — "meet the official WCAG 2.2 AA standards"라고
직접 씁니다. 설계·개발 단계마다 "compliant with the latest WCAG 2.2 standards"를
확인하고 스냅샷 테스트를 돌린다고 밝히며, **텍스트 200% 확대 지원**을 의무
항목으로 못박습니다 ("it is mandatory for web content to support text resizing
up to at least 200%").
출처: https://designsystem.porsche.com/v4/must-know/accessibility/introduction/
(2026-08-18 헤드리스 렌더)

접근성 성명에서도 "accessibility standards based on WCAG 2.2 AA"로 재확인되고,
자동·수동 정기 테스트와 상시 모니터링을 서술합니다.
출처: https://designsystem.porsche.com/v4/accessibility-statement/ (2026-08-18 렌더)

## 참고

- 문서: https://designsystem.porsche.com — **2026-08-18 헤드리스 렌더로 열람 성공**
  (이전의 "프록시 차단" 기록은 무효. SPA라 curl로는 빈 셸만 옵니다)
- 토큰: `npm pack @porsche-design-system/components-js@4.5.0` → `stylesheets/variables.css`
- 컴포넌트 심화: `cdn.ui.porsche.com/porsche-design-system/components/`
  `porsche-design-system.{button,input-text,modal}.<해시>.js` — v4.5.0 로더가
  가리키는 청크를 받아 JSS 스타일 객체 해석 (2026-08-18)
- 라이선스: 패키지 `LICENSE.md`에 **Apache-2.0** 명기 — frontmatter 반영 (2026-08-18)
- **남은 확인 사항:** ~~타이포 스케일~~ ~~라운드~~ ~~이징 곡선~~ ~~라이선스~~
  ~~Figma 킷~~ ~~접근성 목표~~
  (2026-08-18 해소 — 타이포·라운드·이징은 같은 variables.css에 있었음, 심화 절 참조),
  `cn/` 차이 상세
- **Figma 킷 해소 (2026-08-18, 헤드리스 렌더):** **있습니다.** "We regularly update the
  Design System Library in Figma, which includes all essential components and styles" —
  사내 디자이너는 Porsche Figma 엔터프라이즈 스페이스에서 라이브러리가 이미 활성화된
  상태로 받고, **외부 협력자용 "Public Library" 링크**가 따로 있습니다.
  진실의 원천은 코드 쪽입니다 — "The coded components serve as the single source of
  truth for both design and development. The Figma library is kept in sync but may
  occasionally diverge in minor details" (루트 FAQ).
  출처: https://designsystem.porsche.com/v4/designing/introduction/ ·
  https://designsystem.porsche.com/
- **라이선스 해소 (2026-08-18):** `code: Apache-2.0, assets: Porsche Design System Assets License Agreement` — 출처: github porsche-design-system/porsche-design-system → `LICENSE.md`. 폰트·아이콘·마크 등 브랜드 에셋은 별도 계약입니다
