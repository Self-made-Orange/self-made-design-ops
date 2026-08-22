---
name: Open Props
org: Adam Argyle (오픈소스)
coverage: partial
url: https://open-props.style
repo: https://github.com/argyleink/open-props
license: MIT
tech: [CSS]
figma_kit: false
tokens_format: [CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "npm open-props@1.7.23 → open-props.min.css (CSS 커스텀 프로퍼티 603개)"
---
<!-- lang-links -->
> [English](open-props.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

컴포넌트 없이 **CSS 커스텀 프로퍼티만** 배포합니다.
**603개로 표본 최대**이며, **이징 113개**와 **유동 여백**이 다른 시스템에 없는 축입니다.

## 토큰 — 603개

프레임워크·빌드 단계가 없습니다. CSS 파일을 `@import`하면 변수가 생깁니다.

Tailwind와 위치가 비슷하되 **유틸리티 클래스를 만들지 않습니다** —
값만 제공하고 적용은 사용자가 직접 CSS로 씁니다.

### 여백 · 크기 — 4계열 병렬

| 계열 | 단계 | 단위 | 용도 |
|------|:---:|:---:|------|
| `--size-*` | 15 (+`00`) | rem | 일반 |
| **`--size-fluid-*`** | **10** | `max(min())` | **유동** |
| **`--size-relative-*`** | 17 (+`00`) | **`ch`** | 글자 기준 |
| `--size-content-*` · `--size-header-*` | 3 · 3 | `ch` | 본문·제목 폭 |

기본 스케일 (px):

```
4 · 8 · 16 · 20 · 24 · 28 · 32 · 48 · 64 · 80 · 120 · 160 · 240 · 320 · 480
```

**`12`가 없습니다** — 8 다음이 16입니다. 코어 `4/8/16/24`와 `32`는 전부 있습니다.

`--size-00`이 **-4px**입니다. **음수를 `00` 접미사로 표현합니다** —
`--font-size-00` · `--font-lineheight-00` · `--size-px-00` · `--size-relative-00`에도
같은 규칙이 적용됩니다. Atlassian의 `space.negative.*`와 목적이 같고 표기가 다릅니다.

#### 유동 여백 — 표본에서 유일합니다

```css
--size-fluid-1:  max(.5rem,  min(1vw,  1rem));
--size-fluid-2:  max(1rem,   min(2vw,  1.5rem));
--size-fluid-5:  max(4rem,   min(5vw,  5rem));
--size-fluid-10: max(20rem,  min(40vw, 30rem));
```

**`max(하한, min(뷰포트, 상한))` 구조로 10단계입니다.**

Pajamas가 `clamp()`로 **타이포**를 유동으로 만들지만
(`tokens/scales.md`), **여백을 유동으로 만드는 것은 Open Props뿐입니다.**

`clamp(a, b, c)`와 `max(a, min(b, c))`는 같은 결과인데, Open Props는 후자를 씁니다.

#### `ch` 단위 계열 — 글자 폭에 비례합니다

```css
--size-relative-3:  1ch;      /* 일반 스케일 --size-3: 1rem 에 대응 */
--size-content-2:   45ch;     /* 본문 폭 */
--size-header-2:    25ch;     /* 제목 폭 */
```

**일반 스케일 15단계를 `ch` 단위로 한 벌 더 둡니다** (`--size-relative-*` 17단계).

`--size-content-*`는 `20ch · 45ch · 60ch`입니다 — **가독 행폭(measure)을 토큰화**한 것입니다.
`--size-header-*`는 `20ch · 25ch · 35ch`로 본문보다 좁습니다.

**표본에서 `ch` 단위를 쓰는 것은 Open Props뿐입니다.**
Codex가 여백·레이아웃 폭을 한 `size` 스케일에 통합한 것과 방향이 다릅니다 —
Open Props는 **단위를 바꿔 계열을 늘립니다.**

`i18n/README.md`의 텍스트 확장 문제와 직접 연결됩니다 —
`ch` 기준 폭은 서체·언어가 바뀌면 실제 px이 따라 변합니다.

### 라운드 — `1e5px`

| 토큰 | 값 |
|------|:---:|
| `--radius-1` | 2px |
| `--radius-2` | **5px** |
| `--radius-3` | 1rem (16) |
| `--radius-4` | 2rem (32) |
| `--radius-5` | 4rem (64) |
| `--radius-6` | 8rem (128) |
| **`--radius-round`** | **`1e5px`** (100,000) |

**단계가 6개뿐이고 3단계부터 배가됩니다** (16 → 32 → 64 → 128).
표본 다수가 쓰는 `4`·`8`·`12`가 **없습니다** — 2px 다음이 5px입니다.

**`5px`는 Helios·Spectrum과 함께 홀수 라운드 사례입니다.**

**`1e5px` 지수 표기는 표본에서 유일합니다.** 완전한 원 표현 방식이
`9999px`(Polaris·Atlassian) · `10000px`(Fluent) · `999px`(Nord) · `50%` · `0.5` ·
`50cqmin`(Material 3)에 이어 **일곱 번째 형태**입니다.

`--radius-blob-*` · `--radius-conditional-*` 계열도 있습니다
(~~값 미확인~~ → **2026-08-18 실측 해소**, 출처
<https://unpkg.com/open-props@1.7.23/open-props.min.css>).

**`--radius-blob-*` 5개 — 유기적 얼룩 모양의 `border-radius` 8값 축약형**

```css
--radius-blob-1: 30% 70% 70% 30% / 53% 30% 70% 47%;
--radius-blob-2: 53% 47% 34% 66% / 63% 46% 54% 37%;
--radius-blob-3: 37% 63% 56% 44% / 49% 56% 44% 51%;
--radius-blob-4: 63% 37% 37% 63% / 43% 37% 63% 57%;
--radius-blob-5: 49% 51% 48% 52% / 57% 44% 56% 43%;
```

전부 **퍼센트 8값(가로 4 / 세로 4)** 형태이고, 각 축의 대응 쌍이
`30/70` · `70/30`처럼 **합 100%로 맞물려** 좌우·상하가 서로를 밀어내는
비대칭 곡선을 만듭니다. `blob-5`(49/51 · 48/52 …)가 가장 원에 가깝고
`blob-1`(30/70)이 가장 일그러집니다.

**`--radius-drawn-*` 6개 — 손그림 느낌의 px 8값** 계열도 함께 있습니다.

```css
--radius-drawn-1: 255px 15px 225px 15px / 15px 225px 15px 255px;
--radius-drawn-2: 125px 10px 20px 185px / 25px 205px 205px 25px;
--radius-drawn-3: 15px 255px 15px 225px / 225px 15px 255px 15px;
--radius-drawn-4: 15px 25px 155px 25px / 225px 150px 25px 115px;
--radius-drawn-5: 250px 25px 15px 20px / 15px 80px 105px 115px;
--radius-drawn-6: 28px 100px 20px 15px / 150px 30px 205px 225px;
```

blob이 비율(%)이라 요소 크기에 따라 늘어나는 반면, drawn은 **고정 px**이라
작은 요소에서는 거의 원, 큰 요소에서는 모서리만 둥근 스케치 느낌이 됩니다.

**`--radius-conditional-*` 6개 — 컨테이너가 뷰포트 폭을 채우면 라운드를
0으로 접는 조건부 토큰**

```css
--radius-conditional-1: clamp(0px, calc(100vw - 100%) * 1e5, var(--radius-1));
/* …-2 ~ -6도 동일 구조, 마지막 인자만 --radius-2 ~ --radius-6 */
```

`calc(100vw - 100%)`는 요소가 뷰포트 전폭이면 **0**, 아니면 양수입니다.
여기에 `1e5`를 곱해 극단으로 부풀린 뒤 `clamp`로 잘라 **전폭이면 0px,
아니면 해당 단계 라운드**가 되도록 만든 CSS 트릭입니다 — 미디어 쿼리 없이
"모바일에서 카드가 화면을 꽉 채우면 라운드 제거"를 구현합니다. 앞서 본
`1e5px`(`--radius-round`)와 **같은 지수 표기가 여기서도 승수로 재사용**됩니다.

### 타이포그래피

| 토큰 | 값 |
|------|:---:|
| `--font-size-00` | 0.5rem (8) |
| `--font-size-0` | 0.75rem (12) |
| `--font-size-1` | 1rem (16) |
| `--font-size-2` | **1.1rem** (17.6) |
| `--font-size-3` | 1.25rem (20) |
| `--font-size-4` | 1.5rem (24) |
| `--font-size-5` | 2rem (32) |
| `--font-size-6` | 2.5rem (40) |
| `--font-size-7` | 3rem (48) |
| `--font-size-8` | 3.5rem (56) |

**`1.1rem`(17.6px)이 있습니다** — 표본에서 소수 rem 본문 크기는 이것뿐입니다.
14px 단계가 **없습니다** (12 다음이 16).

행간 7단계 — `00` 0.95 · `0` 1.1 · `1` 1.25 · `2` 1.375 · `3` 1.5 · `4` 1.75 · `5` 2.

**`0.95`가 1보다 작습니다.** 행간이 글자 크기보다 좁아 줄이 겹칩니다 —
표본에서 1 미만 행간은 Open Props뿐입니다.

자간 8단계 — `0` **-0.05em** · `1` 0.025 · `2` 0.05 · `3` 0.075 · `4` 0.15 ·
`5` **0.5em** · `6` 0.75em · `7` **1em**.

**음수가 1개, 양수가 7개이고 최대가 1em입니다.**
Tailwind 최대(`widest` 0.1em)의 **10배**입니다 — 표본에서 압도적으로 극단적입니다.

굵기 9단계 (100~900) — 키가 `1`~`9` 순번입니다.

### 보더 — 25px까지

| 토큰 | 값 |
|------|:---:|
| `--border-size-1` | 1px |
| `--border-size-2` | 2px |
| `--border-size-3` | **5px** |
| `--border-size-4` | **10px** |
| `--border-size-5` | **25px** |

**표본에서 가장 두껍습니다.** 1/2/4 공통값 중 `4`가 없고 5·10·25로 갑니다.
Chakra UI(최대 8px)보다도 3배 넘게 두껍습니다.

### z-index — `--layer-*`

| 토큰 | 값 |
|------|:---:|
| `--layer-1` ~ `--layer-5` | 1 · 2 · 3 · 4 · 5 |
| **`--layer-important`** | **2147483647** |

**용도 이름이 아니라 순번입니다.** Chakra UI가 `dropdown`·`modal`·`toast`처럼
용도로 13단계를 두는 것과 대조됩니다.

**`--layer-important`가 Chakra의 `max`와 값이 정확히 같습니다** (int32 최댓값).

### 이징 — 113개 / 33계열

표본에서 압도적입니다. Atlassian이 5개, Canvas가 6개, Cloudscape가 5개입니다.

| 계열 | 개수 | 내용 |
|------|:---:|------|
| `--ease-1`~`5` | 5 | 기본 |
| `--ease-in-*` · `out-*` · `in-out-*` | 15 | 방향 × 5 |
| **`--ease-elastic-*`** | 5 | 탄성 |
| `--ease-elastic-in/out/in-out-*` | 15 | 탄성 × 방향 |
| **`--ease-squish-*`** | 5 | 눌림 (`elastic-in-out` 별칭) |
| **`--ease-spring-*`** | 5 | **`linear()` 다단 정지점** |
| **`--ease-bounce-*`** | 5 | 튕김 |
| **`--ease-step-*`** | 5 | **`steps(n)`** |
| Penner 곡선 | 33 | `quad`·`cubic`·`quart`·`quint`·`sine`·`expo`·`circ` × in/out/in-out |

**`--ease-spring-3`이 `linear()` 다단 정지점입니다.**

```css
--ease-spring-3: linear(0, 0.009, 0.035 2.1%, 0.141 4.4%, 0.723 12.9%, 0.938 16.7%, 1.017, …);
```

**Atlassian과 같은 기법인데 Open Props는 스프링을 5단계 둡니다.**
Atlassian은 65 정지점 1개를 한 곳에만 씁니다 (`patterns/motion.md`).

**`--ease-step-3: steps(4)`** — 계단 이징이 토큰입니다. 표본에서 유일합니다.

**별칭 계열이 있습니다** — `--ease-elastic-3`이 `var(--ease-elastic-out-3)`,
`--ease-squish-2`가 `var(--ease-elastic-in-out-2)`입니다.
**짧은 이름을 별칭으로 두어 흔한 조합을 줄여 씁니다.**

### 그림자 — 런타임 재조합

```css
--shadow-color: 220 3% 15%;
--shadow-strength: 1%;
--shadow-1: 0 1px 2px -1px hsl(var(--shadow-color) / var(--shadow-strength-10));
```

**색과 강도를 분리해 HSL로 조합합니다.**
`--shadow-color`를 바꾸면 6단계 그림자의 색조가 전부 따라옵니다.

Radix Themes가 `color-mix(in oklab, …)`으로 회색 토큰을 참조하는 것과 목적이 같고,
**Open Props는 HSL 채널을 직접 조립합니다** (`@supports` 분기 없이 동작).

`--inner-shadow-*` 계열이 별도로 있습니다 (`inset` 전용).

### 그 외

| 계열 | 개수 | 내용 |
|------|:---:|------|
| `--gradient-*` | **31** | 완성된 그라디언트 |
| **`--noise-*`** | **4** | **SVG 노이즈 텍스처 (data URI)** |
| `--ratio-*` | 6 | `golden` 1.618 · `square` · `portrait` · `landscape` · `ultrawide` 18/5 · `widescreen` 16/9 |
| `--animation-*` | 6 | `spin` · `ping` · `blink` · `float` · `pulse` · `bounce` |
| 팔레트 | 13색 × 13단계 | `jungle` · `camo` · `sand` · `stone` 등 |

**`--noise-*`가 SVG 필터 노이즈를 data URI로 담습니다.**
표본에서 텍스처를 토큰화한 것은 Open Props뿐입니다.

**`--ratio-*` 6개가 Chakra UI의 `aspect-ratios`와 이름·값이 정확히 같습니다**
(`golden` 1.618 · `ultrawide` 18/5 포함). 서로 무관한 두 시스템의 일치입니다.

**`--animation-*`이 `--ease-*`를 참조합니다** — `--animation-bounce`가
`bounce 2s var(--ease-squish-2) infinite`입니다.
Tailwind가 애니메이션 정의에 `cubic-bezier`를 직접 박는 것과 다릅니다 (`patterns/motion.md`).

팔레트 색상 이름이 특이합니다 — `jungle` · `camo` · `sand` · `stone` · `choco` 등.
`-hsl` 변형 파일이 색상마다 별도로 배포됩니다 (`teal.min.css` · `camo-hsl.min.css`).

## 컴포넌트

**없습니다.** 변수만 배포합니다.
`buttons.min.css` 같은 선택적 파일이 있으나 컴포넌트 라이브러리는 아닙니다.

## 특징적 결정

- **CSS 커스텀 프로퍼티 603개로 표본 최대입니다.** 빌드 단계가 없습니다
- **여백을 유동으로 만듭니다** (`--size-fluid-*` 10단계, `max(min())`).
  표본에서 유일합니다 — Pajamas는 타이포만 유동입니다
- **`ch` 단위 계열을 병렬로 둡니다** (`--size-relative-*` 17단계 + `content`·`header`).
  가독 행폭(45ch·60ch)을 토큰화합니다
- **음수를 `00` 접미사로 표기합니다** (`--size-00` = -4px)
- **이징 113개 / 33계열.** 2위(Canvas 6개)의 18배입니다.
  `elastic`·`squish`·`spring`·`bounce`·`step` + Penner 곡선 전종
- **`steps(n)` 계단 이징이 토큰입니다**
- **스프링을 `linear()`로 5단계 둡니다** (Atlassian은 1개)
- **이징에 별칭 계열이 있습니다** (`--ease-elastic-3` → `--ease-elastic-out-3`)
- **그림자를 HSL 채널로 재조합합니다** (`--shadow-color` + `--shadow-strength`)
- **SVG 노이즈 텍스처를 토큰화합니다** (`--noise-1`~`4`)
- **행간에 1 미만 값이 있습니다** (`--font-lineheight-00: 0.95`)
- **자간 최대가 1em입니다** — Tailwind 최대의 10배
- **보더가 25px까지 갑니다** — 표본 최대
- **라운드에 4·8·12px이 없습니다** (2 → 5 → 16 → 32 → 64 → 128)
- **`1e5px` 지수 표기로 원을 만듭니다**
- **z-index가 순번 5단계입니다** — Chakra의 용도 13단계와 대조.
  `--layer-important`가 Chakra의 `max`와 값이 같습니다

## 접근성

토큰·CSS 레벨의 접근성 목표는 없습니다.
`--size-content-*`(45ch·60ch)가 가독 행폭 규격이므로 간접적으로 관련되지만
근거는 파일에 없습니다.

## 참고

- **Figma 킷 (false) 근거:** UI 킷 없음 — Figma Tokens 플러그인용 JSON만 배포, 설치 지침은 커뮤니티 작성, 2026-08-18 확인

- 문서: https://open-props.style
- 저장소: https://github.com/argyleink/open-props
- 토큰: `npm pack open-props@1.7.23` → `package/open-props.min.css`
- 색상별 파일: `package/<색>.min.css` · `<색>-hsl.min.css`
- **남은 확인 사항:** ~~`--radius-blob-*` · `--radius-conditional-*` 실값~~
  (2026-08-18 해소 — 라운드 절 참조, `--radius-drawn-*` 6개도 함께 실측),
  `--gradient-*` 31개, 팔레트 13색 전체 단계, `--shadow-*` 6단계 전체 값
- **Figma 킷 부재 확정 (2026-08-18):** `figma_kit: false` — 출처
  <https://open-props.style>. 문서 사이트 전문(스크립트 제거 후 약 5만 자)에
  **Figma는 세 번**만 등장하고, 전부 "Figma Tokens" 배포 파일 이야기입니다 —
  `open-props.figma-tokens.json` · `open-props.figma-tokens.sync.json`을
  unpkg로 내려받아 **Figma Tokens 플러그인에 물리는** 용도이며, 설치
  지침조차 "**Community created setup instructions**"로 명시돼 있습니다.
  **컴포넌트/스타일이 담긴 Figma UI 킷은 존재하지 않습니다** — 애초에
  컴포넌트가 없는 토큰 전용 시스템이라는 성격과 일치합니다.
  Sketch·Adobe 계열 언급은 0건입니다
- **접근성 목표 부재 재확인 (2026-08-18):** 문서 사이트 전문에
  `accessib`·`WCAG` 문자열이 **0건**입니다. 대신 `prefers-contrast` ·
  `prefers-reduced-transparency` · `forced-colors` · `inverted-colors`를
  `@custom-media`로 토큰화해 **사용자 환경설정 질의를 제공**하는 방식이며,
  적합성 목표는 선언하지 않습니다 (`a11y_target: null` 유지)
