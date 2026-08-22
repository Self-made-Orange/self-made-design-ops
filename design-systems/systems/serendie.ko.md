---
name: Serendie Design System
org: Mitsubishi Electric (+ Takram)
coverage: partial
url: https://serendie.design
repo: https://github.com/serendie/serendie
license: MIT
tech: [CSS, React, Panda CSS]
figma_kit: true
tokens_format: [CSS, JS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @serendie/design-token@1.4.6 → dist/tokens.css (--sd-* 802개) · npm @serendie/ui@3.7.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](serendie.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

미쓰비시전기의 시스템(Takram 협업) — **타이포 스케일이 expanded/compact 2벌**이고,
엘리베이션이 그림자가 아니라 **불투명도 스케일**이며, 시맨틱 컬러 계열 이름이
**`impression`**입니다. CJK 2굵기(400/700) **4표본째**.

## 토큰 — 802개, reference/system 2계층

M3의 ref/sys와 같은 자리의 **`reference`(원시) / `system`(용도) 2계층**입니다.
계층 이름까지 M3 구조와 일치하지만 소스에 관계 언급은 없습니다.

### 타이포 — 크기 스케일이 2벌

| 단계 | expanded | compact |
|------|:---:|:---:|
| small | 14 | 12 |
| **medium** | **16** | **14** |
| large | 18 | 16 |
| 5XL | 64 | 56 |

- **10~64px 12단계와 10~56px 10단계, 두 벌 전체를 배포합니다** —
  Spectrum(desktop/mobile sets)·Serendie(expanded/compact)로,
  **밀도별 타이포 2벌**은 표본 두 번째이자 CJK 첫 사례
- ~~compact의 medium이 **14px** — 중화권 2표본(Ant·Semi)의 14px 본문과 같은 값이
  일본 기업의 "압축" 모드로 나타납니다. expanded는 16px~~
  → **해석 정정 (2026-08-18, 컴포넌트 심화에서 확인):** 위 값은 reference 층
  램프이고, **실사용(system 층)에서는 방향이 반대입니다** — compact가
  모바일(<768px)이고 본문 16px, expanded가 데스크톱이고 본문 **14px**.
  `body.medium_compact`가 compact 램프의 **large**(16px)를,
  `body.medium_expanded`가 expanded 램프의 **small**(14px)을 참조하는
  교차 참조 구조입니다. 14px 본문 진영에 서는 것은 데스크톱 쪽입니다
- 21·26·43·37 같은 **비정수배 값** — 등차·등비 어느 쪽도 아닙니다
- **굵기 regular 400 / bold 700 둘뿐** — KRDS·디지털청·Charcoal에 이어
  **CJK 4표본 전부 2굵기**입니다
- **`fontFamily-primary: inherit`** — 시스템 서체를 지정하지 않고 페이지에서
  상속받는 표본 유일 선택 (모노스페이스만 Noto Sans Mono 지정)

### 엘리베이션 — 그림자가 아니라 불투명도

```
--sd-reference-elevation-opacity-scale-0~10: 0 ~ 1 (0.1 등차)
```

**`elevation`이 그림자 프리셋이 아니라 불투명도 11단계입니다** —
디지털청(그림자 2겹 8단계)과 정반대 해석. `GLOSSARY.md`의
"elevation 다의성"에 세 번째 뜻(불투명도)이 추가된 표본입니다.

~~그림자 아님~~ → **보완 (2026-08-18):** 불투명도는 reference 층이고, system
층에는 `elevation-shadow-level1~5`(**drop-shadow** — box-shadow가 아니라
filter 계열, Spindle의 이원화와 교차)와 `elevation-zIndex`(deepDive **−1000** ·
base 0 · docked 10 · dropdown 500 · modal 1000 · toast 2000)가 있습니다.
elevation이 불투명도·그림자·z-index를 **한 카테고리로 묶는 상위 개념**이며,
z-index 토큰화 표본이 또 하나(음수 단계 포함은 표본 유일) 늘었습니다.

### 컬러 — `impression` 계열 + 차트 전용 240개+

```
--sd-system-color-impression-primary / onPrimary / primaryContainer / onPrimaryContainer …
```

- **`primary`/`onPrimary`/`Container` 조합이 M3 어휘 그대로**인데 계열명이
  `impression`(인상)입니다 — M3 구조 차용에 자체 이름을 붙인 형태 (180개)
- **차트 전용 컬러가 240개+** — `chart-mark-multi` 60,
  `chart-mark-{primary,positive,notice,negative}` 각 36, `chart-component` 36.
  데이터 시각화 토큰 비중이 표본 최대입니다 (Cloudscape 차트 토큰을 넘어섭니다)

### 스페이싱·라운드

- 스페이싱: T셔츠 12단계 `4 8 12 16 20 24 32 40 48 64 80` + none —
  코어값(4/8/16/24/32) 전부 보유
- 원시 `dimension-scale`은 순번 0~18 (0·1·2·4·8·…·96)
- 라운드: `2 4 8 12 16 + full(9999px)`

## 컴포넌트 심화 — (2026-08-18)

`@serendie/ui@3.7.0`을 실측했습니다 — **Panda CSS 레시피(cva/sva) +
Ark UI headless 기반**입니다 (Park UI와 같은 조합의 기업판).
`@serendie/design-token@1.4.5`가 dist에 번들돼 있고, 값은 번들 토큰과
`styled-system/tokens`에서 해석했습니다. compact/expanded의 실체가 여기서
확정됐습니다: **`expanded` = `min-width: 768px` 미디어 조건**입니다.

### 버튼 (`Button`) — 라벨이 볼드가 아닙니다

| | medium (기본) | small |
|---|:--:|:--:|
| height | **48px** | 32px |
| 패딩 | 24×12px | 12×4px |
| 라운드 | **full (9999px)** | 동일 |
| 라벨 | label.large — compact **14px**/expanded 13px, **400**, 행간 1 | label.medium 12px/400 |

- **2단 48/32px — 40px 단이 없습니다.** 기본이 48px로 표본 상위(터치 우선),
  Spindle(48/40/32)·Charcoal(40/32)과 한 값씩 어긋납니다.
- **버튼 라벨 굵기가 400입니다** — 일본 5표본 중 유일하게 버튼이 볼드가
  아닙니다 (SmartHR·Vibes·Charcoal·Spindle 전부 bold). 2굵기(400/700)
  시스템에서 버튼을 regular 쪽에 배정한 선택 (→ i18n 축 교차: 라벨 행간 1.0,
  본문 행간 1.6 — CJK 행간을 역할로 가르는 구조).
- styleType 4종: filled · ghost · outlined · **rectangle** — rectangle은
  outlined에서 **라운드만 8px로 바꾼 변형**입니다. "모양"이 변형 축이 된
  표본 유일 사례.
- filled의 hover가 색 교체가 아니라 **`::after` 오버레이 상태층**입니다 —
  M3 state layer 문법 (impression 어휘와 일관된 M3 차용의 컴포넌트 층 증거).
- 라벨 textStyle이 compact/expanded 조건부로 걸려 있어 **밀도 2벌이 컴포넌트
  안까지 관통**합니다 — 라벨은 compact(모바일) 14px > expanded(데스크톱)
  13px로 모바일이 더 큽니다.

### 입력 (`TextField`) — 보더 대신 outline, @layer 양보

- 단일 **48px** 높이(사이즈 변형 없음), 라운드 8px, **border가 아니라
  outline 1px** → focus 시 **outline 2px(thick) + primary 색** — 상태를
  두께 변화로 표현합니다. invalid는 negative outline + 경고 아이콘,
  값이 있으면 **clear 버튼 내장**.
- 기본 폭 `min(100%, 300px)`을 **`@layer components`로 선언** — 소비자
  CSS가 무조건 이기도록 우선순위를 양보한다는 주석이 소스에 있습니다.
- 우측 아이콘 터치 타깃이 **compact 48px / expanded 44px** — 밀도 전환이
  타이포뿐 아니라 **터치 타깃 크기까지** 바꿉니다.

### 모달 (`ModalDialog`) — 단일 폭 408px

- Ark UI dialog 조합. **maxWidth 408px 단일 — 사이즈 변형이 없습니다**
  (실폭 = `100% − spacing.large×2`). 라운드 8px(모달도 medium —
  Charcoal·Spindle의 20~24px 대라운드와 갈림), 그림자 `shadow.level5`
  (drop-shadow 0 8px 24px #00000033), scrim 토큰, `zIndex.modal` 1000.
- **버튼 순서가 밀도로 뒤집힙니다** — 기본(모바일) submit이 앞, expanded에서
  `flex-direction: row-reverse` + 우측 정렬. 플랫폼별 버튼 순서 논쟁을
  미디어 조건 하나로 처리한 표본 유일 구현.
- 컴포넌트 라이브러리가 **i18n 번역층(`useTranslations`)을 내장**합니다 —
  close 라벨 등이 다국어 리소스에서 나옵니다.

### 테마 — 일본 전통색 4벌

`data-panda-theme` 교체로 asagi(浅葱 `#006066`) · kurikawa(栗皮 `#8F3D15`) ·
sumire(菫 `#7C3694`) · tsutsuji(躑躅 `#9B2657`) 4테마가 배포됩니다 —
**멀티 브랜드가 아니라 한 조직의 취향 선택지**로 테마를 쓰는 드문 사례.

### 특징적 결정 (심화분)

- **버튼 라벨 400** — 일본 5표본 중 유일한 비(非)볼드 버튼
- **compact/expanded의 실체 확정** — 768px 미디어 조건, 모바일 본문 16 /
  데스크톱 14px (토큰 절의 해석 정정)
- **rectangle styleType** — 라운드가 변형 축, 표본 유일
- **터치 타깃도 밀도를 따라 48→44px** — 밀도 이원화의 전면 관철
- **모달 버튼 순서가 미디어 조건으로 반전** — 표본 유일
- Ark UI + Panda CSS — headless 조합의 기업 채택 사례

## 특징적 결정

- **타이포 크기 스케일 2벌** ~~(expanded 16px / compact 14px 본문)~~
  (모바일 compact 16px / 데스크톱 expanded 14px 본문 — 2026-08-18 정정) —
  CJK 첫 밀도 이원화
- **elevation = 불투명도 스케일** ~~— 그림자 아님, 표본 유일 해석~~
  (reference 층 한정 — system 층에 그림자 5단·z-index 병존, 2026-08-18 보완)
- **`impression` 계열** — M3 어휘 구조 + 자체 계열명
- **차트 컬러 240개+** — 데이터 시각화 토큰 표본 최대
- `fontFamily-primary: inherit` — 서체 미지정 표본 유일
- **굵기 400/700** — CJK 4표본 전부 2굵기 확정
- reference/system 2계층 — M3 ref/sys와 같은 구조

## 접근성

미확인.

## 참고

- 토큰: `npm pack @serendie/design-token@1.4.6` → `dist/tokens.css`
- Panda CSS 프리셋(`panda-tokens.js`) 동봉 — 프레임워크 통합 배포
- 컴포넌트 심화: `npm pack @serendie/ui@3.7.0` → `dist/components/*` +
  `dist/recipes/*` + 번들된 `@serendie/design-token@1.4.5` (2026-08-18)
- **남은 확인 사항:** ~~컴포넌트(`@serendie/ui`)~~ ~~expanded/compact 전환
  기준~~ (2026-08-18 해소 — 심화 절: 768px 미디어 조건), Figma 킷,
  다크 모드 방식(4테마는 확인 — 라이트 계열만인지 미확인)
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `serendie.design` → `figma.com/community/file/1433690846108785966/serendie-ui-kit`
