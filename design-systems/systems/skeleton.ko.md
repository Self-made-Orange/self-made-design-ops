---
name: Skeleton
org: Skeleton Labs
coverage: partial
url: https://www.skeleton.dev
repo: https://github.com/skeletonlabs/skeleton
license: MIT
tech: [Svelte, Tailwind]
figma_kit: 미확인
tokens_format: [CSS]
a11y_target: 미확인
platform: web
domain: framework
verified: 2026-08-18
source: "npm @skeletonlabs/skeleton@5.0.0 → src/themes/*.css (24종)"
---
<!-- lang-links -->
> [English](skeleton.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**코퍼스 첫 Svelte 생태계 표본.** 테마 24종이 색만이 아니라
**타이포 배율·라운드까지 구조값을 각자 다르게** 갖고, Dracula·Catppuccin 같은
**커뮤니티 컬러스킴이 공식 테마**로 들어와 있습니다.

## 토큰 — 테마 24종, 구조값 포함

```css
/* cerberus */  --text-scaling: 1;     --radius-base: 0.5rem;  --radius-container: 0.5rem;
/* wintry   */  --text-scaling: 1.067; --radius-base: 0.375rem; --radius-container: 0.75rem;
```

- **테마가 색 교체를 넘어 `--text-scaling`(타이포 전역 배율)과 라운드를
  바꿉니다** — 테마 축이 구조까지 건드리는 표본 유일 규모(24종).
  런타임 배율 진영(Mantine 등)의 배율값을 테마가 정하는 형태입니다
- **라운드가 `base`/`container` 2층 시맨틱** — 요소/컨테이너 구분
  (Mística의 컴포넌트 시맨틱보다 거친 2단계)
- `--spacing: 0.25rem` — Tailwind base 상속 (**열거하지 않음 진영 3번째**)
- **Dracula · Catppuccin · Rosé Pine이 공식 테마 목록에** — 개발자
  커뮤니티 컬러스킴이 디자인시스템 공식 배포에 들어온 표본 유일 사례
  (Vibe hacker·Grommet hacktoberfest는 이스터에그 1종, 여기는 체계의 일부)

## 컴포넌트 심화 — (2026-08-18)

같은 `@skeletonlabs/skeleton@5.0.0`의 `src/utilities/*.css`에서 실측했습니다.
이 패키지의 컴포넌트는 **전부 Tailwind v4 `@utility` 클래스**입니다
(`btn`·`input`·`dialog` 등 24파일). 동작(JS)은 `skeleton-svelte`/`skeleton-react`
별도 패키지이고, 시각층은 프레임워크와 무관하게 이 CSS 하나입니다.

### 버튼 (`btn`) — 변수 하나에서 전 치수 파생

```css
--btn-size: var(--text-base);            /* 크기 = 타이포 토큰 */
line-height: var(--btn-size);
padding-block:  calc((var(--btn-size) - 2px) / 2);
padding-inline: calc((var(--btn-size) - 2px) / 2 + 4px);
```

- **크기 파라미터가 `--btn-size` 하나이고, 그 값이 폰트 크기 토큰**입니다.
  높이·패딩이 전부 산식 파생: **높이 = 2×폰트 − 2px** (base 16px → 30px,
  sm 14px → 26px). 보더는 없습니다.
- **크기 변형이 13단**(xs~9xl)으로, **Tailwind 타이포 스케일 전체와 1:1**입니다.
  `btn-9xl`(폰트 8rem, 높이 254px)까지 문법상 존재합니다 — 크기 축을
  타이포 축에 통째로 위임한 표본 유일 구조.
- `btn-icon`은 정사각형 `2×폰트 − 2px` — 파생 공식이 노출된 형태.
- **hover가 색이 아니라 필터**입니다: `brightness(125%)` (다크에서 75%).
  변형별 hover 색 토큰이 0개 — Vapor의 회색 오버레이와 같은
  "hover 상태 무토큰" 진영이지만 수단이 다릅니다 (필터 vs 상태층).
- 색은 별도 `preset-*` 유틸리티 조합: `preset-filled-primary-500` 식.
  **`--color-primary-50-950` 같은 라이트-다크 쌍 토큰**(다크에서 50↔950 반전)
  이 140개 이상이고, 각 쌍에 `-contrast-` 대응 토큰이 따로 있습니다.
- 라운드는 `--radius-base` — 테마 24종이 각자 정합니다 (토큰 절 참조).

### 입력 (`input`)

- 버튼과 **완전히 같은 산식** (`--field-size`, 높이 = 2×폰트 − 2px) —
  base에서 버튼·입력이 30px로 정합됩니다. 크기 변형도 같은 13단(`field-*`).
- **보더 없음** — Tailwind ring(인셋 `box-shadow` 1px)으로 윤곽을 긋고,
  focus에서 ring 색만 `primary-500`으로 바꿉니다.
- 라벨은 별도 블록 `label-text` (xs·medium 굵기) — 플로팅 아님.

### 다이얼로그 (`dialog`) — 네이티브 `<dialog>` + `@starting-style`

| | 값 |
|---|---|
| max-width | **640px** |
| 패딩 / 내부 gap | 16px / 16px |
| 라운드 | `--radius-container` (테마 소유) |
| 스크림 | `color-mix(… surface-50-950 75%, transparent)` |
| 진입/퇴장 | 페이드만, **250ms**, `@starting-style` + `transition … allow-discrete` |

- **JS 없는 모달 전환**입니다 — `<dialog>`의 display 전환을
  `allow-discrete`로 트랜지션하는 최신 CSS 경로. Backpack V2(`<dialog>` +
  keyframes)보다 한 세대 더 나아간 형태입니다.
- 내부 구조를 클래스가 아니라 **시맨틱 요소**(`header`/`article`/`footer`)로
  선택합니다.
- 전체화면 변형(`dialog-fullscreen`)이 변수 재정의만으로 구현됩니다.

### 특징적 결정 (심화분)

- **치수 파라미터가 폰트 토큰 단 하나** — 높이 = 2×폰트 − 2px 산식 파생
- **크기 변형 13단 = 타이포 스케일 전체** — btn-9xl까지 존재
- **hover 무토큰 (brightness 필터)** — 상태색 정의 자체가 없음
- **라이트-다크 쌍 토큰**(`primary-50-950`) 140+ — 다크 모드가 토큰 이름에 내장
- **네이티브 `<dialog>` + `@starting-style`** — JS 없는 모달 전환
- `--corner-shape-base/container` 변수 — squircle(`corner-shape`) 대응 예비층

## 특징적 결정

- **첫 Svelte 표본** — Vue(Vuetify·Naive·PrimeVue)와 함께 비React 축 개통
- 테마가 타이포 배율·라운드 구조값을 소유 — 표본 유일 규모
- Tailwind `--spacing` 상속 — shadcn/ui와 같은 계층 관계
- 커뮤니티 컬러스킴의 공식 편입

## 접근성

미확인.

## 참고

- 토큰: `npm pack @skeletonlabs/skeleton@5.0.0` → `src/themes/`
- 컴포넌트 심화: 같은 패키지 `src/utilities/{buttons,form-inputs,form-core,dialogs,presets}.css` (2026-08-18)
- **남은 확인 사항:** ~~컴포넌트(스벨트 측 패키지)~~ ~~다크 모드 방식~~
  (2026-08-18 해소 — 시각층은 본 패키지 CSS 유틸리티가 전부이고 스벨트/리액트
  패키지는 동작만 담당, 다크는 라이트-다크 쌍 토큰 + `@variant dark`),
  테마별 값 전수
