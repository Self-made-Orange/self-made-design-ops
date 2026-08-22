---
name: Pluralsight Design System
org: Pluralsight
coverage: partial
url: https://design-system.pluralsight.com
repo: https://github.com/pluralsight/design-system
license: Apache-2.0
tech: [React, CSS]
figma_kit: true
tokens_format: [CSS, TS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @pluralsight/ps-design-system-core@10.0.4 → src/css/{layers,layout,type}.css · npm button@24.1.2 · textinput@12.1.2 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](pluralsight.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Pluralsight(교육)의 시스템 — z-index를 **`layers`로 부르고 화면 영역 이름
(`global-sidenav` 930 / `global-topnav` 950)으로 열거**합니다.
**접근성 요소(`skip-to-content-banner` 1600)가 최상위**입니다.

## 토큰

### `layers` — 영역 이름 z-index, 7번째 산법

```css
--ps-layers-main: 0;
--ps-layers-global-sidenav: 930;
--ps-layers-global-topnav: 950;
--ps-layers-dropdown: 1000;
--ps-layers-skip-to-content-banner: 1600;
```

- **z-index 토큰화 일곱 번째 시스템이고 산법도 일곱 번째**입니다
  (Chakra 100등차 / Bootstrap 1000대+5 / Open Props 서수 / Forma 36 10ⁿ /
  Vibes 불규칙 / Solid 100등차 / **Pluralsight 930·950 같은 10 단위 미세 배치**)
- **930/950은 1000 아래 여유를 남긴 값**입니다 — 상단 내비와 사이드 내비 사이에
  20의 틈을 두어 그 사이 요소를 끼울 수 있게 합니다
- **`skip-to-content-banner`(1600)가 최상위** — Chakra의 `skipNav`(1600)와
  **정확히 같은 값**입니다. 두 시스템이 독립적으로 같은 숫자를 골랐거나
  한쪽이 참조한 것이며, 소스에 언급은 없습니다.
  접근성 건너뛰기 링크에 전용 층위를 주는 사례가 2건이 됐습니다
- 이름이 `zIndex`가 아니라 **`layers`** — Open Props(`--layer-*`)와 같은 어휘

### 스페이싱 — T셔츠 7단계

```
xxsmall 4 · xsmall 8 · small 12 · medium 16 · large 24 · xlarge 48 · xxLarge 64
```

- **32px이 없습니다** (24→48) — 32 예외 목록에 합류
- **`xxLarge`만 대문자 L**입니다 (`xxsmall`~`xlarge`는 전부 소문자) —
  케이스 불일치가 토큰 이름에 남아 있습니다

### 타이포 — 100 단위 12단계 + `base`

```
100:12 · 200:14 · 300:16 · 400:18 · 500:20 · 600:24 · 700:28 ·
800:34 · 900:40 · 1000:56 · 1100:72 · 1200:88
base: 16px
```

- **번호가 100 단위이고 값과 무관합니다** (`300`이 16px) — 순번 ×100
- **최대 88px** — Artsy(102) 다음입니다
- 34px 같은 비관행 중간값 포함
- `base`를 별도 토큰으로 둡니다 (300과 같은 16px) — EUI의 base 중간 배치 계열

서체가 `PS TT Commons Roman` 자체 서체 + `Gotham SSm` 폴백,
코드 서체는 `DM Mono`입니다.

## 컴포넌트 심화 — (2026-08-18)

컴포넌트가 `@pluralsight/ps-design-system-<이름>` 개별 패키지이며,
각 패키지가 **일반 CSS(`src/css/index.css`) + React + vars(변형 열거 TS)**
3층으로 배포됩니다. `button@24.1.2` · `textinput@12.1.2` · `dialog@15.0.12`
+ `core@10.0.4`로 실측했습니다. 컴포넌트마다 메이저 버전이 제각각
(24 vs 12 vs 15)인 **독립 버저닝**입니다.

### 버튼 — 8px 사다리, 자간이 크기에 반비례

| | xSmall | small | medium | large |
|---|:--:|:--:|:--:|:--:|
| **height** | **24px** | 32px | 40px | 48px |
| 서체 | 12px | 14px | 16px | 18px |
| 자간 | +0.025em | +0.025em | +0.01em | 0 |
| 패딩 | 4/8 | 6/12 | 10/16 | 12/20 |

- 높이 24/32/40/48 — 깨끗한 8px 사다리 (HSDS의 5px 혼합과 대극).
  라운드 3px, 굵기 500.
- **자간이 크기에 반비례합니다** — 작은 버튼일수록 `looser`(+0.025em),
  large는 0. 자간 토큰(tighter~looser 5단 + all-caps)을 크기 축에 매핑한
  표본 유일 사례입니다.
- **누르면 `scale(0.98)`로 줄어듭니다** — transform 프레스 피드백.
  전환은 background 200ms / transform **100ms** 2속도.
- appearance 4종: primary / secondary / stroke(2px 보더) / flat.
- **모든 컴포넌트 CSS에 `psds-theme--dark`·`--light` 클래스가 병기**됩니다 —
  테마가 CSS 변수 스왑이 아니라 **클래스 이중 배포**이고, dark가 기본값
  쪽입니다 (교육 플랫폼의 다크 UI). 포커스 링도 테마별로 파랑 단계가
  다릅니다 (dark: blue-4 / light: blue-8, `box-shadow 0 0 0 2px`).

### 입력 (textinput) — 라운드 2px, 배포물에 `NaNpx`

- 높이 **40px**(medium) / 32px(small), min-width **192px**, 보더 1px,
  라운드 **2px** — **버튼(3px)과 라운드가 다릅니다**. 서체 14px,
  라벨은 위 블록 12px/500.
- 에러 아이콘이 필드 **바깥 오른쪽**(absolute, `right: −32px`)에 붙습니다 —
  필드 안 아이콘 다수 진영과 갈리는 배치.
- **배포 CSS에 `padding: 0 NaNpx ...`가 그대로 남아 있습니다**
  (small + 아이콘 정렬 조합 2곳) — 빌드 시 calc 산식이 실패한 채 출하된
  실측 흔적. small에서 아이콘 패딩이 무효값이 됩니다.

### 다이얼로그 — 툴팁 꼬리와 모달 스크림이 한 컴포넌트

- **한 컴포넌트가 두 역할**입니다: `tailPosition`(6방향)을 주면 **14px
  회전 정사각 꼬리**가 달린 포인터 다이얼로그, `modal`이면
  `rgba(0,0,0,.5)` 스크림 중앙 모달. 표본에서 popover/modal을 한 몸으로
  배포한 유일 사례입니다.
- **폭 스케일이 없습니다** — `inline-flex` 내용 크기, 모달 상한만
  `100% − 48px`. Asphalt(fit-content)와 같은 무스케일 진영.
- 라운드 2px, 그림자 `0 1px 2px rgba(0,0,0,.5)` — 좁고 진한 그림자.
- 진입: **fade + translateY(8px→0), 200ms ease-out** (keyframes).
  닫기 버튼 32px, hover 시 `rgba(0,116,171,.5)` 3px 헤일로.
- 내용 패딩 24px, 서체 14px/500.

### 모션·타이포 토큰 (심화로 확보)

- **모션 5단이 ×100 등차**입니다: xfast 100 / fast 200 / normal 300 /
  slow 400 / xslow 500ms. **이징 토큰은 없습니다** — ease-out 등 리터럴.
- 행간 토큰이 **고정 px 4단 이름형**: tight 20 / standard 24 / extra 32 /
  huge 40. 타이포 100단위 스케일(위 절)과 별개 축입니다.
- **굵기 토큰 이름이 값 그대로**입니다 — `--ps-type-font-weight-500: 500`
  (500~900) + 의미명 2개(default 400, strong 600)가 병존. 수치명과
  의미명을 한 사전에 둔 절충형입니다.

### 특징적 결정 (심화분)

- **자간을 버튼 크기에 반비례 매핑** — 표본 유일
- **테마가 클래스 이중 배포**(`psds-theme--dark`/`--light`) — 변수 스왑 아님
- **popover+modal 겸용 다이얼로그** (14px 꼬리 ↔ 스크림)
- 버튼 3px / 입력·다이얼로그 2px — 라운드 비공유
- 프레스 `scale(0.98)`, 모션 ×100 등차 5단 (이징 무토큰)
- 배포 CSS의 **`NaNpx`** — 빌드 산출물 실측이 잡아낸 출하 결함

## 특징적 결정

- **z-index를 `layers`로, 화면 영역 이름으로 열거** — 산법 7번째
- **`skip-to-content-banner` 1600이 Chakra `skipNav`와 동일 값**
- 930/950 미세 배치로 사이 여유 확보
- 스페이싱에 32px 없음, `xxLarge` 케이스 불일치
- 타이포 100 단위 12단계 + 별도 `base`

## 접근성

- 건너뛰기 링크 전용 z-index 층위(최상위)
- 그 외 미확인

## 참고

- 토큰: `npm pack @pluralsight/ps-design-system-core@10.0.4` → `src/css/`
  (`motion.css`·`type.css`는 2026-08-18 심화에서 추가 확인)
- 컴포넌트: `@pluralsight/ps-design-system-button@24.1.2` ·
  `-textinput@12.1.2` · `-dialog@15.0.12` → `src/css/index.css`
  (2026-08-18 심화에 사용)
- **남은 확인 사항:** 컬러 팔레트(`colors.css` 미조사), 브레이크포인트,
  ~~라이선스~~ (2026-08-18 해소 — 컴포넌트 패키지 LICENSE·package.json
  모두 **Apache-2.0** — frontmatter 반영 2026-08-18), 컴포넌트 목록
- **라이선스 해소 (2026-08-18):** `Apache-2.0` — 출처: github pluralsight/design-system → pluralsight/classic-design-system 리다이렉트 → `LICENSE` (npm `@pluralsight/ps-design-system-core@10.0.4` 메타와 일치)
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `design-system.pluralsight.com` → `figma.com/design/ZmH4XsZS5WnKeo28ylM5x1/Pando-UI-kit-(Web)`
