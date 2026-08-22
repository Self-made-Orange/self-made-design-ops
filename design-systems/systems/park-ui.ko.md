---
name: Park UI
org: 오픈소스 (Christian Schröter)
coverage: partial
url: https://park-ui.com
repo: https://github.com/cschroeter/park-ui
license: MIT
tech: [Panda CSS, Ark UI, React/Vue/Solid]
figma_kit: true
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: framework
verified: 2026-08-18
source: "npm @park-ui/panda-preset@0.43.1 → dist/{index.js,options-*.d.ts}"
---
<!-- lang-links -->
> [English](park-ui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Panda CSS 프리셋형 프레임워크 — 테마가 **강조색 26종 × 회색 6종 × 라운드 7단계
= 1,092 조합**이고, **강조색 팔레트가 Radix Colors 이름 그대로**입니다
(tomato·ruby·jade·iris…). 라운드가 **프리셋 옵션(선택값)**입니다.

## 토큰 — 프리셋 생성 옵션

```ts
interface PresetOptions {
  accentColor: ColorPalette;   // 26종
  grayColor: ColorPalette;     // 6종
  radius: Radius;              // 7단계
}
accentColors = [neutral, tomato, red, ruby, crimson, pink, plum, purple,
                violet, iris, indigo, blue, cyan, teal, jade, green, grass,
                bronze, gold, brown, orange, amber, yellow, lime, mint, sky]
grayColors   = [neutral, mauve, olive, sage, sand, slate]
radii        = [none, xs, sm, md, lg, xl, 2xl]
```

- **26 × 6 × 7 = 1,092 테마 조합**입니다 — Radix Themes(5축 6,500조합) 다음
  규모이며, **라운드를 테마 축에 넣은 것은 Radix·Park UI 두 곳**입니다
- **강조색 이름이 Radix Colors와 동일합니다** (tomato·ruby·crimson·iris·jade·
  grass·bronze·mint 등 26종, 회색 6종도 mauve·olive·sage·sand·slate 일치).
  **Radix Colors 팔레트를 Panda CSS 위로 옮긴 형태**이고, Skeleton(Tailwind 상속)·
  shadcn(Tailwind+Radix Primitives)에 이은 **상속 관계 세 번째 유형** —
  이쪽은 색 팔레트를 상속합니다
- `radii: createRadii(radius)` — 선택한 라운드 단계에서 **전체 라운드 스케일을
  생성**합니다. 라운드가 값이 아니라 **테마 파라미터**인 구조입니다
- 라운드 원시값에 `0.0625rem`(1px)이 있습니다 — 서브픽셀급 최소 단계
- 컴포넌트 프리미티브는 **Ark UI**(Zag.js 상태 머신)를 씁니다 —
  shadcn/Radix Themes가 Radix Primitives를 쓰는 자리와 같은 층입니다

## 컴포넌트 심화 — (2026-08-18)

`@park-ui/panda-preset@0.43.1` → `dist/index.js`의 Panda recipe 정의에서
추출했습니다 (recipe 주석으로 원소스 경로가 남아 있음 — `src/theme/recipes/*.ts`
57개 + 자체 토큰 정의 포함). 값은 같은 파일의 spacing/radii/textStyles
토큰으로 해석했습니다.

### 버튼 (recipe `button`) — minW가 높이와 같습니다

| | xs | sm | md | lg | xl | 2xl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| **height** | 32px | 36px | **40px** | 44px | 48px | 64px |
| min-width | 32px | 36px | 40px | 44px | 48px | 64px |
| 좌우 패딩 | 12px | 14px | 16px | 18px | 20px | 28px |
| 서체 | 12/18 | 14/20 | 14/20 | 16/24 | 16/24 | 18/28 |

- **`minW` = 높이**입니다 — 어떤 버튼도 정사각형보다 좁아지지 않습니다.
  최소 너비를 별도 값(MUI 64px)이 아니라 높이로 묶은 표본 유일 방식.
- 크기 6단(xs~2xl)에 xl→2xl에서 48→64px로 배 뛰는 점프. 기본 md 40px.
- 서체는 `textStyle` 참조(고정 행간 페어) — sm·md가 같은 14px을 공유합니다.
- 굵기 semibold(600), 라운드 **`l2`** (아래 라운드 층 참조), 전환 200ms.
- 변형 5종: solid·outline·ghost·link·subtle. outline·ghost·subtle은
  기본 `colorPalette: gray` — **색을 명시하지 않으면 회색**이고, solid만
  프리셋의 accentColor를 탑니다. focus는 outline 2px + offset 2px.
- 패딩 18px(4.5)이 recipe에 실사용됩니다 — Tailwind에 없는 4.5 단계를
  Park UI가 스페이싱에 추가한 이유가 컴포넌트 층에서 확인됩니다.

### 입력 (recipe `input`)

| | 2xs | xs | sm | md | lg | xl | 2xl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **height** | 28px | 32px | 36px | **40px** | 44px | 48px | 64px |
| 좌우 패딩 | 6px | 8px | 10px | 12px | 14px | 16px | 18px |

- 버튼과 같은 4px 계단 + md 40px 정합이지만, **입력에만 2xs(28px)가 더 있고**
  같은 크기에서 좌우 패딩이 버튼보다 얇습니다 (md: 12 vs 16px).
- 보더 1px, focus에서 보더 색 + **같은 색 1px box-shadow를 겹쳐** 2px 두께로
  보이게 합니다. 라운드는 버튼과 같은 `l2`.

### 라운드 시맨틱층 `l1/l2/l3` — 프리셋 옵션이 창을 밉니다

```
radius 옵션 "md" 선택 시:  l1=sm(4px)  l2=md(6px)  l3=lg(8px)
radius 옵션 "xl" 선택 시:  l1=lg(8px)  l2=xl(12px) l3=2xl(16px)
```

- 컴포넌트는 원시 라운드를 직접 쓰지 않고 **l1(소)·l2(컨트롤)·l3(컨테이너)**
  3층만 씁니다. 프리셋의 radius 옵션은 이 3층이 원시 스케일
  (2xs 1px~3xl 24px) 위에서 **±1칸씩 미끄러지는 창**입니다.
  Skeleton의 base/container 2층보다 한 층 많고, 테마 축과 결합돼 있습니다.

### 다이얼로그·드로어 (slot recipe)

| | dialog | drawer |
|---|---|---|
| 폭 | min-width **384px** (`sizes.sm`) | 384px (모바일 100vw) |
| 라운드 | `l3` | — (전체 높이) |
| 스크림 | **blur(4px)** + 라이트 `white.a10` / 다크 `black.a10` | 동일 |
| 진입 | translateY 64px→0 + 페이드, **400ms** `emphasized-in` | translateX 100%→0, 400ms |
| 퇴장 | **200ms** `emphasized-out` | 200ms |

- **진입 400 / 퇴장 200ms — 2:1 비대칭**이 애니메이션 토큰
  (`animations.dialog-in/out`)으로 정의돼 있습니다 (MUI 225/195보다 큰 격차).
- **스크림이 라이트 모드에서 흰색**(white 알파10)입니다 — 검정 스크림
  대다수 진영에서 이탈. 배경 blur 4px 동반.
- 다이얼로그 제목 semibold 18px, 본문 14px. 드로어는 header/body/footer를
  CSS grid 영역으로 고정합니다.

### 모션 토큰 — 이징이 Material 3 곡선입니다

| 토큰 | 값 | 일치 |
|------|-----|------|
| `default` | `cubic-bezier(0.2, 0, 0, 1.0)` | **M3 standard** |
| `emphasized-in` | `(0.05, 0.7, 0.1, 1.0)` | **M3 emphasized-decelerate** |
| `emphasized-out` | `(0.3, 0.0, 0.8, 0.15)` | **M3 emphasized-accelerate** |
| 지속시간 | 50~500ms 7단 (`fastest`~`slowest`) | |

- **색은 Radix, 프리미티브는 Ark UI(Zag), 모션은 Material 3** — 세 혈통을
  층별로 갈라 채택한 혼혈 구조가 확정됩니다. Backpack(무토큰 드리프트)과
  달리 이쪽은 M3 곡선을 **토큰으로 정식 편입**했습니다.

### 특징적 결정 (심화분)

- **버튼 minW = 높이** — 정사각형 하한, 표본 유일
- **라운드 3층(l1/l2/l3) 슬라이딩 창** — 테마 파라미터가 시맨틱층을 통째로 이동
- **진입/퇴장 400/200ms 2:1 비대칭** 애니메이션 토큰
- **라이트 모드 흰색 스크림 + blur** — 스크림 색 반전 표본
- **M3 이징의 정식 토큰 편입** — 혈통 혼합의 세 번째 층
- outline·ghost·subtle의 기본색이 회색 — 강조색은 solid에만 기본 적용

## 특징적 결정

- **테마 1,092 조합**(강조 26 × 회색 6 × 라운드 7) — Radix 다음 규모
- **Radix Colors 팔레트를 그대로 채택** — 색 팔레트 상속 사례
- **라운드가 테마 파라미터**(값이 아니라 선택값) — Radix Themes와 같은 판단
- Panda CSS 프리셋 배포 + Ark UI 프리미티브 — 3층 의존 구조
  (Park UI → Panda CSS + Ark UI + Radix Colors)

## 접근성

미확인 (Ark UI 프리미티브의 접근성에 의존 — 미검증).

## 참고

- 토큰: `npm pack @park-ui/panda-preset@0.43.1`
- 프리미티브: `@ark-ui/react@5.38.1` (Vue·Solid 버전 존재)
- 컴포넌트 심화: 같은 패키지 `dist/index.js`의 recipe·토큰 정의 +
  `dist/chunk-LS3ONKWL.js`(createRadii) (2026-08-18)
- **남은 확인 사항:** ~~스페이싱·타이포 스케일(Panda CSS 기본 상속 여부)~~
  ~~컴포넌트 목록~~ (2026-08-18 해소 — 스페이싱·타이포·라운드·이징 전부
  **프리셋이 자체 정의**하며 `@pandacss/preset-base` 위에 extend, 스페이싱은
  Tailwind 호환 + 0.5~4.5 반단계, 폰트 2xs 8px~9xl 128px; recipe 57개),
  Radix Colors와의 라이선스·출처 표기, `createPreset` 옵션 3종이 전부
  필수(기본값 없음)인 점은 확인
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `park-ui.com/docs/figma` → `figma.com/community/file/1268615283036362769`
