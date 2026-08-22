<!-- lang-links -->
> [English](color.md) · **한국어**
<!-- /lang-links -->

# Color

**팔레트 구조를 비교합니다.** 전체 헥스값은 각 시스템 원문에 있고, 여기서는
**어떻게 조직했는가**를 봅니다 — 이게 실제로 참조하는 정보입니다.

**색 실측이 컴포넌트 층까지 확보된 시스템은 79개입니다** (2026-08-18 재종합).
개별 값은 각 `systems/*.md`의 "컴포넌트 심화" 절에 있고, 이 문서는 **분포와 교차 결론**만 담습니다.
아래 표들은 초기 표본(토큰 층·프레임워크 계열 중심)으로 작성된 것이며,
79표본 기준 재검증은 "79표본 재종합" 절에 있습니다 —
**둘이 어긋나면 재종합 절이 우선입니다.**

## 규모 — 토큰 수와 테마 수

| 시스템 | 테마당 토큰 | 테마 수 | 총량 |
|--------|:---:|:---:|:---:|
| **Primer** | **959** | **14** | **~13,400** |
| **Material 3** | **197** | **32** | ~6,300 |
| **Atlassian** | **466** | **12** | **~5,600** |
| **Spectrum** | **633** (원시 369 + 시맨틱 94 + 별칭 170) | 3 (light · dark · **wireframe**) | ~1,900 |
| **Cloudscape** | **407** | 2 (light/dark) **× 색 컨텍스트 8** | 814 + 컨텍스트 |
| **Carbon** | 235 (+ 원시 247 · 컴포넌트 78) | 4 (white · g10 · g90 · g100) | 940 |
| **Polaris** | 226 (+ 원시 224) | 4 (다크·고대비는 **부분**) | 226 + 49 오버라이드 |
| **Radix Themes** | 색상당 24 × 33색 | 2 (light/dark) × 2 (sRGB/P3) | **2,973 선언** |
| Apple iOS | 79 | 4 | 316 |
| Seed Design | ~470 (컬러 부분) | 1 | ~470 |
| **Tailwind** | **288** | 1 (원시 색만) | 288 |
| **Mantine** | 270 | 1 | 270 |
| Nord | 60 | 4+ (고대비 포함) | 240+ |
| **shadcn/ui** | **~50** | 2 (light/dark) | ~100 |
| Orbit | 색상당 10단계 | 미확인 | |
| visionOS | 7 (확인분) | 미확인 | |

**Material 3과 Atlassian이 규모에서 갈립니다.** Material 3은 테마 수(32),
Atlassian은 테마당 토큰 수(466)로 총량을 만듭니다.

**→ 정정 (2026-08-18): Primer가 두 축 모두에서 위입니다.** 테마당 959개 ×
14벌 = 약 13,400으로 Material 3의 두 배입니다. 다만 959개 중 범용 역할 토큰
(`bgColor`·`fgColor`·`borderColor`)은 83개뿐이고 나머지는 컴포넌트·제품 화면
전용입니다 — **테마당 토큰 수를 시스템 간에 그대로 비교하면 안 되는 이유**입니다
(아래 "시맨틱 층의 크기" 절).

**shadcn/ui가 가장 적습니다** (~50). 시맨틱 토큰만 두고 원시 팔레트는
Tailwind에서 가져오기 때문입니다.

### 규모가 전략을 드러냅니다

| 전략 | 시스템 | 방식 |
|------|--------|------|
| **완성 테마를 많이 배포** | Material 3 (32) · Atlassian (12) | 조합을 미리 계산해 내보냄 |
| **축을 배포하고 런타임 조합** | **Radix Themes** | 26색 × 5회색 × 5밀도 × 5라운드 × 2패널 = **6,500** |
| **원시 색만 배포** | **Tailwind** | 시맨틱 계층 없음. 사용자가 만듦 |
| **시맨틱만 배포** | **shadcn/ui** | 원시 색은 Tailwind에서 가져옴 |

**Tailwind와 shadcn/ui가 서로의 빈 자리를 채우는 구조입니다.**
Tailwind는 원시 286색 + 시맨틱 0, shadcn/ui는 원시 0 + 시맨틱 ~50입니다.

**Radix Themes만 조합 수를 런타임으로 미룹니다.** Material 3의 32개 테마와
방향이 정반대입니다 — 배포량은 작고 가능한 결과는 훨씬 많습니다.

## 계층 구조

### 3계층 — Seed Design

```
scale/     원시 (color-gray-100 …)
static/    고정 (color-static-*)
semantic/  용도 (color-paper · color-ink · color-danger …)
```

원시-시맨틱 2계층이 흔한 가운데 **`static`이 추가**된 형태입니다.

### 1계층 — Tailwind (시맨틱이 없습니다)

```
--color-blue-500   원시 색. 이것뿐입니다
```

**`text-primary` · `surface` · `border` 같은 용도 토큰이 없습니다.**
286개 원시 색만 제공하고 용도 계층은 사용자가 만듭니다.

표본에서 시맨틱 계층이 없는 것은 Tailwind뿐입니다.
**고대비 테마를 나중에 추가하기가 거의 불가능한 구조**입니다 (아래 "고대비" 참조).

### 시맨틱만 — shadcn/ui

```
--primary: oklch(0% 0 0);            시맨틱
--color-blue-500                      Tailwind에서 상속
--chart-1: var(--color-blue-300);     시맨틱이 원시를 참조
```

**Tailwind의 빈 계층을 정확히 채웁니다.** 원시 팔레트를 다시 만들지 않고
시맨틱 토큰만 정의합니다.

### 원시-알파 2벌 × 라이트/다크 × sRGB/P3 — Radix Themes

```
--blue-1  … --blue-12      불투명 12단계
--blue-a1 … --blue-a12     알파 12단계
```

여기에 라이트/다크 × sRGB/P3가 곱해져 **색 리터럴 선언이 2,973개**입니다.
`--accent-*`가 선택된 강조색을 가리키는 별칭 계층으로 얹힙니다.

### 상태 레이어를 1급으로 — Material 3

| 그룹 | 개수 | 비중 |
|------|:---:|:---:|
| **State Layers** | **147** | **75%** |
| Schemes | 49 | 25% |
| Add-ons | 1 | — |

**토큰의 4분의 3이 상태 표현입니다.** 각 색 역할마다 hover·press 등
투명도 레이어를 별도 토큰으로 둡니다.

`Schemes`는 `Primary` / `On Primary` / `Primary Container` / `On Primary Container`
**4쌍 구조**를 역할마다 반복합니다.

### 농도 4단계 × 상태 3종 — Atlassian

```
color.background.accent.blue.subtlest.[default]
                              subtler   hovered
                              subtle    pressed
                              bolder
```

**농도 4단계 × 상태 3종 = 색상당 12개.** `accent`에 10색이 있어 **120개**입니다.
테마당 `color.background`가 208개인 것의 대부분이 여기입니다.

**이름이 비교급입니다.** `subtle` → `subtler` → `subtlest`로 약해지는데,
진한 쪽은 `bolder` 하나뿐입니다 — **비대칭 구조**입니다.

Orbit이 명도 3단계 × 상태 3종 + `darker`로 10개인 것과 같은 구조이며,
Atlassian은 농도가 한 단계 더 많습니다.

### 명도 단계에 상태를 곱하기 — Orbit

색상 하나가 10단계입니다.

```
normal · normalActive · normalHover
light  · lightActive  · lightHover
dark   · darkActive   · darkHover
darker
```

**명도 3단계 × 상태 3종 + darker.** Material이 상태를 별도 레이어 토큰으로 뺀 것과
목적이 같지만, Orbit은 **색 이름 안에 상태를 넣습니다.**

### 재질 층위로 나누기 — Apple iOS

| 그룹 | 개수 |
|------|:---:|
| Labels | 4 |
| **Labels - Vibrant** | 4 |
| **Labels - Vibrant - Controls** | 3 |
| Fills | 4 |
| **Fills - Vibrant** | 3 |

**같은 개념을 3층으로 나눕니다** — 일반 / 재질(Liquid Glass) 위 / 컨트롤 위.
유리 재질 위에 얹히는 요소가 별도 색을 갖습니다.

표본에서 **재질을 색 계층의 축으로 삼은 것은 Apple뿐입니다.**

### 알파를 별도 계열로 — Seed Design · Radix Themes

```
scale-color-gray-*         불투명        (Seed Design)
scale-color-gray-alpha-*   투명도 적용본

--blue-1  … --blue-12      불투명        (Radix Themes)
--blue-a1 … --blue-a12     알파
```

Seed Design은 `gray` · `carrot` · `blue` · `green` · `red` 5색에 `-alpha-` 계열을 둡니다.
**Radix Themes는 33색 전부에 예외 없이** 둡니다 — 색상당 24개입니다.

**투명도를 런타임 계산이 아니라 미리 적용한 값으로** 제공합니다.

| | 알파 계열 대상 | 단계 |
|---|---|:---:|
| Seed Design | 5색 | 미확인 |
| **Radix Themes** | **33색 전부** | **12** |

### 알파를 리터럴로 쓰는 방식 — shadcn/ui · Mantine

미리 계산하지 않고 **사용 지점에서 알파를 붙입니다.**

```
bg-primary/90        Tailwind 문법. 알파 90%
ring-ring/50
oklch(1 0 0 / 10%)   토큰 값 자체에 알파
```

**토큰 수가 늘지 않는 대신 디자인 도구와 값이 일치하지 않습니다.**
Figma에는 `primary/90`이라는 변수가 없습니다.

세 방식이 갈립니다.

| 방식 | 시스템 | 대가 |
|------|--------|------|
| 미리 계산해 토큰화 | Seed Design · **Radix Themes** | 토큰 수 2배 |
| 사용 지점에서 계산 | **shadcn/ui** · **Mantine** | 디자인 도구와 불일치 |
| 상태 레이어 토큰 | Material 3 | 토큰 수 4배 |

### 제품별 브랜드 색 — Helios · Atlassian

Helios는 Terraform · Vault · Consul 등 **제품마다 브랜드 컬러 토큰**이 있습니다
(`--token-color-consul` 등).

**Atlassian은 `color.rovo.*` 11개 + `elevation.rovo.*` 3개**를 둡니다.
`border`·`icon`에 `lime` · `saffron` · `blue` · `purple` 4색이 있습니다.

| 시스템 | 제품 계열 |
|--------|-----------|
| Helios | Terraform · Vault · Consul 등 |
| **Atlassian** | **`rovo`** (14개 토큰) |

한 시스템이 여러 제품을 감싸는 구조입니다.

### 레이아웃 영역별 색 계열 — shadcn/ui

| 계열 | 토큰 수 |
|------|:---:|
| **`sidebar`** | **7** (`sidebar` · `-foreground` · `-primary` · `-primary-foreground` · `-accent` · `-accent-foreground` · `-border` · `-ring`) |
| **`code`** | **4** (`code` · `-foreground` · `-highlight` · `-number`) |
| `selection` | 2 |

**표본에서 특정 레이아웃 영역에 전용 컬러 계열을 두는 것은 shadcn/ui뿐입니다.**
`sidebar`가 `background`·`primary`·`accent`·`border`·`ring`을 전부 자기 것으로 갖습니다.

`::selection`도 토큰으로 제어합니다 (`--selection` · `--selection-foreground`).

### 배경/전경 짝 규칙 — Material 3 · shadcn/ui

| 시스템 | 표기 |
|--------|------|
| Material 3 | `Primary` / **`On Primary`** |
| **shadcn/ui** | `--primary` / **`--primary-foreground`** |

**같은 구조에 이름만 다릅니다.** shadcn/ui는 12개 색에 짝이 있습니다 —
`background` · `card` · `popover` · `primary` · `secondary` · `muted` · `accent` ·
`destructive` · `sidebar` · `surface` · `code` · `selection`.

짝이 없는 단독 토큰: `border` · `input` · `ring` · `chart-1..5`.

**"이 배경 위에는 이 전경"을 토큰 이름으로 강제하는 방식**이며,
대비 비율을 값이 아니라 짝짓기로 보장합니다.

### 색상 별칭 계층 — Mantine · Radix Themes

```css
--mantine-primary-color-6: var(--mantine-color-blue-6);   /* Mantine */
--accent-9: var(--blue-9);                                /* Radix Themes */
```

**주 색상을 한 곳에서 갈아끼웁니다.** 컴포넌트는 별칭만 참조하므로
브랜드 색 변경이 토큰 한 줄입니다.

Mantine은 `primary-color-0`~`9` + `-filled` · `-light` · `-outline` 계열 전부에 별칭이 있습니다.
Radix Themes는 `--accent-1`~`12` + `--accent-a1`~`a12`입니다.

**Radix Themes는 회색 계열에도 같은 별칭을 둡니다** — `data-gray-color`로
`mauve` · `olive` · `sage` · `sand` · `slate` 중 고릅니다.
표본에서 무채 계열을 사용자 선택 축으로 노출하는 것은 Radix Themes뿐입니다.

### Radix Themes `--accent-9` 실값 — 26색 전수 (2026-08-18)

`data-accent-color`로 고를 수 있는 26색의 9단계(솔리드 자리) sRGB 헥스입니다.
실값의 출처는 `@radix-ui/colors@3.0.0`(themes 3.3.0의 의존)이며, 각 파일에
P3 값이 `@supports` 분기로 병기돼 있습니다. 전 단계 헥스는 원문으로 갈음하고
(SCHEMA 규칙) **컴포넌트 솔리드 색인 9단계만** 기록합니다.

| 색 | `-9` | 색 | `-9` | 색 | `-9` |
|----|------|----|------|----|------|
| gray | `#8d8d8d` (다크 `#6e6e6e`) | tomato | `#e54d2e` | indigo | `#3e63dd` |
| gold | `#978365` | red | `#e5484d` | blue | `#0090ff` |
| bronze | `#a18072` | ruby | `#e54666` | cyan | `#00a2c7` |
| brown | `#ad7f58` | crimson | `#e93d82` | teal | `#12a594` |
| yellow† | `#ffe629` | pink | `#d6409f` | jade | `#29a383` |
| amber† | `#ffc53d` | plum | `#ab4aba` | green | `#30a46c` |
| orange | `#f76b15` | purple | `#8e4ec6` | grass | `#46a758` |
| lime† | `#bdee63` | violet | `#6e56cf` | mint† | `#86ead4` |
| sky† | `#7ce2fe` | iris | `#5b5bd6` | | |

- **9단계는 라이트/다크에서 값이 같습니다 — gray만 예외** (`#8d8d8d` →
  `#6e6e6e`). 26색 전수 대조 결과이며, "솔리드 브랜드 색은 모드 불변"이라는
  설계가 값으로 드러납니다. 1~8·10~12단계는 모드별로 다릅니다
- **† 5색(yellow·amber·lime·mint·sky)은 `--*-contrast`(9단계 위 텍스트
  색)가 흰색이 아니라 짙은 회색**입니다 (`#21201c`(sand 12) ·
  `#1d211c`(olive 12) · `#1a211e`(sage 12) · `#1c2024`(slate 12)) —
  밝은 강조색의 대비 문제를 색상별 contrast 토큰으로 풉니다.
  나머지 21색은 전부 `white`

### 의도(intent)를 독립 계열로 — Evergreen

```
colors.js    일반 색
fills.js     배경 채움 전용
intents.js   success · warning · danger · none
```

**상태색을 `color` 안이 아니라 별도 파일·개념으로 분리**합니다.

## 램프 단계 수 — 10 · 12 · 16으로 갈립니다 (2026-08-18)

`full` 수집 대형 5종(Spectrum · Polaris · Primer · Cloudscape · Carbon)의 토큰 경로가
해소되면서 **원시 램프의 단계 수**를 나란히 볼 수 있게 됐습니다.

| 시스템 | 유채색 램프 | 단계 수 | 번호 규칙 | 회색 |
|--------|:---:|:---:|------|------|
| **Spectrum** | **18색** (silver 포함) | **16** | 100~1600 (100 간격) | `gray` 13단 (하단에 25·50·75 추가) |
| **Polaris** | 11색 | **16** | **1~16 (1 간격)** | `gray` 16단 |
| **Radix Themes** | 26색 | 12 (+ 알파 12) | 1~12 | `gray` 등 5종 |
| **Tailwind** | 26색 (회색 계열 포함) | 11 | 50 · 100~900 · 950 | 26색 안에 포함 |
| **Carbon** | 9색 | **10** | 10~100 (10 간격) | **3벌**(gray · cool-gray · warm-gray) 각 10단 |
| **Primer** | 8색 | **10** | 0~9 | `neutral` **14단** |
| **Mantine** | 14색 (회색 계열 포함) | 10 | 0~9 | `gray` · `dark` 각 10 |
| **Orbit** | — | 10 | 명도 3 × 상태 3 + darker | — |
| **Cloudscape** | **없음** | — | — | **없음** |

(회색 램프는 별도 열입니다 — Polaris는 여기에 `blackAlpha`·`whiteAlpha` 2계열이,
Spectrum은 `transparent-black`·`transparent-white`와 `static-*` 11계열이 더 붙습니다.)

**세 진영입니다.**

| 단계 수 | 시스템 | 특징 |
|:---:|--------|------|
| **16** | Spectrum · Polaris | 램프 하나로 라이트·다크·경계·텍스트를 다 커버 |
| 11~12 | Radix Themes · Tailwind | 각 단계에 용도가 배정됨 |
| **10** | Carbon · Primer · Orbit · Mantine | 가장 흔한 값 |
| **0** | **Cloudscape** | 원시 램프 자체가 없음 |

- **Cloudscape만 원시 램프가 없습니다.** 색 407개 중 번호 램프는
  차트 팔레트(155개)뿐이고, 제품 UI 색 236개는 전부 시맨틱 이름입니다.
  **라운드에 일반 스케일이 없는 것과 같은 방침**이 색에도 적용된 것입니다.
- **번호 간격이 제각각입니다** — Spectrum 100 · Carbon 10 · Polaris 1 · Primer 0-베이스.
  `blue-500`이 Spectrum에서는 16단 중 5번째, Carbon에서는 10단 중 5번째,
  Tailwind에서는 11단 중 5번째로 **셋의 위치가 다릅니다.**
- **회색만 단계를 늘리는 시스템이 둘입니다** — Spectrum(`gray` 13단, 하단에
  25·50·75 추가) · Primer(`neutral` 14단, 유채색은 10단). 표면 층을 더 잘게
  나누려는 자리에서 회색만 촘촘해집니다.
- **회색을 여러 벌 두는 시스템도 둘입니다** — Carbon(중립·한색·난색 3벌) ·
  Mantine(`gray` + `dark`). Carbon은 색조 선택, Mantine은 모드 대응으로 이유가 다릅니다.

### 알파 램프 유무

| 있음 | 없음 |
|------|------|
| **Spectrum** (`transparent-black-*` · `transparent-white-*` 각 13단) · **Polaris** (`blackAlpha` · `whiteAlpha` 각 16단) · Radix Themes (색상마다 알파 12단) · Seed Design | **Primer** · **Carbon** (전부 불투명 헥스) · Tailwind |

**Carbon은 알파를 원시 팔레트에 두지 않고 시맨틱 층에서만 씁니다**
(`overlay: rgba(0,0,0,0.6)`). Primer도 base 램프는 전부 불투명입니다.

### 테마 무관 계열

Spectrum의 `static-*` 11계열 40개는 **라이트/다크에서 값이 같습니다** —
Seed Design의 `static/` 계층과 같은 발상입니다.
`static-blue`는 900·1000 2단만, `static-red`·`static-indigo`·`static-magenta`·
`static-fuchsia`는 5단, 나머지는 400/600/800 3단으로 **계열마다 단계 수가 다릅니다.**

## 시맨틱 계층 깊이 — 1층에서 3층까지 (2026-08-18)

| 시스템 | 층 수 | 구성 |
|--------|:---:|------|
| **Spectrum** | **3** | 원시 369 → **시맨틱 램프** 94 → 역할 별칭 170 |
| **Primer** | **3** | base 램프(**비공개**) → functional 959 → component |
| **Carbon** | **3** | `@carbon/colors` 247 → `@carbon/themes` 235×4 → 컴포넌트 78 |
| **Polaris** | 2 | 원시 램프 224 → 시맨틱 226 (컴포넌트 층 없음) |
| **Cloudscape** | **1** | 시맨틱 407만 (원시 없음) |
| Tailwind | 1 | 원시만 (시맨틱 없음) |

**Tailwind와 Cloudscape가 양끝에서 만납니다** — 둘 다 1층인데
Tailwind는 원시만, Cloudscape는 시맨틱만입니다.

### Spectrum — 의미에 색이 아니라 램프를 배정합니다

```
accent-color-100 … accent-color-1600   →  {blue-100} … {blue-1600}
negative-color-*  → red-*     positive-color-* → green-*
notice-color-*    → orange-*  informative-color-* → blue-*
```

**5개 의미 × 16단 = 80개.** 시맨틱 층이 보통 "역할 하나 → 색 하나"인 것과 달리,
Spectrum은 **램프 통째로 별칭**합니다. 브랜드색을 바꾸면 `accent` 램프 16단이
한 번에 따라옵니다.

### Primer — 아래층을 배포에서 뺍니다

`--base-color-*` 변수가 공개 테마 CSS에 **0개**이고 `dist/internalCss/`에만 있습니다.
`primitives.css` 머리말이 **"원시 값(헥스·px)을 절대 쓰지 말 것. 시맨틱 토큰만"**
이라고 규칙을 적습니다.

**계층 규율을 문서가 아니라 배포 산출물로 강제하는 유일한 표본입니다.**
다른 시스템은 원시 램프를 공개하고 "쓰지 말라"고 권고만 합니다.

### 시맨틱 층의 크기가 제품 성격을 드러냅니다

| 시스템 | 시맨틱 토큰 | 그중 제품 고유 |
|--------|:---:|------|
| **Primer** | **959** | `diffBlob` 21 · `codeMirror` 19 · `contribution` 18 · `prettylights` 42 (코드·에디터·잔디) |
| **Carbon** | 235 | `syntax*` **88** (37%) · `ai*` 21 · `chat*` 21 |
| **Cloudscape** | 407 | `charts*` **155** (38%) |
| **Polaris** | 226 | `avatar*` 16 · `video*` 3 |
| Spectrum | 264 (94+170) | — (색상별 별칭이 다수) |

**Primer·Carbon·Cloudscape 셋 다 전체의 3분의 1 이상이 한 가지 화면 유형 전용**입니다 —
GitHub은 코드 뷰, IBM은 구문 강조와 AI UI, AWS는 차트입니다.
"범용 시맨틱 토큰"의 비율은 생각보다 작습니다.

## 그룹 분류 — Apple iOS가 가장 세분화

| 그룹 | 개수 |
|------|:---:|
| Miscellaneous | 23 |
| Accents | 12 |
| Grays | 8 |
| Backgrounds | 6 |
| **Backgrounds (Grouped)** | **6** |
| Fills | 4 |
| Labels | 4 |
| Labels - Vibrant | 4 |
| Fills - Vibrant | 3 |
| Labels - Vibrant - Controls | 3 |
| Separators | 3 |
| Overlays | 2 |

**`Backgrounds`와 `Backgrounds (Grouped)`가 각각 6개로 분리**돼 있습니다 —
그룹 테이블(설정 화면 같은) 배경을 별도 계열로 둡니다.

## 다크 모드 처리 방식

| 방식 | 시스템 |
|------|--------|
| 테마 파일 분리 | Apple (`light`/`dark`/`ic---light`/`ic---dark`) · Material 3 (32종) · Pajamas (`tokens.json`/`tokens.dark.json`) · Codex (모드별 JSON) · **Atlassian** (12벌) · Siemens iX · Strapi · Shoelace |
| **CSS 클래스 오버라이드** | **shadcn/ui** (`.dark { … }`) · **Radix Themes** (`.dark` + `data-*`) · Ring UI · Vibe |
| **한 토큰에 두 값** | **visionOS** (`#FFFFFF, #545454`) |
| 다크 기본 | visionOS (`Text/Primary` = 흰색) |
| **다크에서 알파로 전환** | **shadcn/ui** (`--border: oklch(1 0 0 / 10%)`) |
| **`light-dark()` CSS 함수** | **Porsche** (`light-dark(#fff, hsl(…))` 한 줄) |
| 클래스 + 미디어쿼리 병용 | **Stacks** (`.theme-dark` + `prefers-color-scheme`, 556 분기) |
| **토큰 이름에 모드 쌍 인코딩** | **DSFR**(프랑스 정부) — `--grey-200-850` · `--blue-france-sun-113-625` |
| 알파 표 재합성 | **Naive UI** — 베이스 색만 교체하면 중립색 전체가 다시 합성됩니다 |
| **토큰 `sets` 축** | **Spectrum** — 색 토큰마다 `sets: {light, dark, wireframe}`. 스페이싱의 `desktop`/`mobile`과 **같은 메커니즘**을 색에 재사용 |
| **한 JSON에 `$value: {light, dark}`** | **Cloudscape** — 563토큰 중 409개가 두 값. 같은 파일이 `comfortable`/`compact`(43) · `default`/`disabled`(모션 15) 축도 함께 담습니다 |
| **완전한 테마 파일 4벌** | **Carbon** — white · g10 · g90 · g100 각 235개, 구조 동일. 235 중 **223개가 다릅니다** |
| **부분 오버라이드** | **Polaris** — 다크가 226 중 **40개만** 덮고 이름에 `-experimental` |

**여섯 가지 방식이 됐습니다.** 특히 두 극단이 흥미롭습니다 —
**DSFR는 이름에 두 모드 값을 박아** 토큰 하나로 모드 전환을 표현하고,
**Naive UI는 색을 저장하지 않고 알파 상수로 재계산**합니다.
전자는 값을 두 배로 열거하고, 후자는 팔레트를 아예 두지 않습니다.

**shadcn/ui는 다크 모드에서 보더를 알파로 바꿉니다.**

| 토큰 | 라이트 | 다크 |
|------|--------|------|
| `--border` | `oklch(0.922 0 0)` (불투명) | **`oklch(1 0 0 / 10%)`** |
| `--input` | `oklch(0.922 0 0)` | **`oklch(1 0 0 / 15%)`** |

라이트는 불투명 회색, 다크는 **흰색 10~15% 알파**입니다.
표면 색이 여러 단계일 때 보더가 각 표면에 맞춰 따라옵니다.
표본에서 모드에 따라 색 표현 방식(불투명↔알파)을 바꾸는 것은 shadcn/ui뿐입니다.

**Mantine은 `dark`를 색상 계열로 둡니다** — `--mantine-color-dark-0`~`9`.
`gray`와 별도의 10단계 램프이며, 다크 모드 표면색을 색상처럼 다룹니다.

**visionOS만 토큰 하나에 두 색을 쉼표로 묶습니다.** 두 값의 의미(그라디언트 / 모드별 /
재질 위·아래)는 킷에서 확인하지 못했습니다.

**visionOS는 다크가 기본입니다** — `Text/Primary`가 흰색입니다.
iOS가 라이트·다크 양쪽 테마를 두는 것과 다릅니다.

## 접근성 — 고대비 테마

| 시스템 | 제공 방식 |
|--------|-----------|
| **Material 3** | `light-medium-contrast` · `light-high-contrast` · `dark-medium-contrast` · `dark-high-contrast` **4종** |
| **Atlassian** | `light-increased-contrast` · `dark-increased-contrast` **2종** (각 466토큰) |
| **Nord** | 기본·수의(vet) 테마 각각에 고대비 |
| **Primer** | 고대비 + **색각이상(colorblind)** 변형 → **실측 14벌 (2026-08-18)**: 명암 2 × 색각 3(기본 · colorblind · tritanopia) × 대비 2 + 다크 전용 `dimmed` 2 |
| Codex | 모드별 테마 파일 |
| **Polaris** | `light-high-contrast-experimental` **1종** — 226개 중 **8개만** 오버라이드 (텍스트 3 · 보더 3 · 아이콘 1 · 표면 1) |
| **Carbon · Cloudscape · Spectrum** | 고대비 테마 **없음** (Carbon은 컴포넌트 SCSS에서 `forced-colors` 시스템 색으로 대응 — `systems/carbon.md`) |
| **Tailwind · shadcn/ui · Mantine · Radix Themes** | **없음** |

**Material 3만 중간 대비(medium-contrast)를 둡니다.** 대부분은 고대비만 제공합니다.

**Primer만 색각이상 대응 테마를 토큰 레벨에서 제공합니다.**
→ **정정 (2026-08-18): Unify가 두 번째이고, 유형을 3종으로 나눈 것은 Unify뿐입니다.**
아래 "79표본 재종합 — 고대비·강제 색 모드" 절 참조.

**Atlassian의 고대비 테마는 일반 테마와 토큰 수가 같습니다** (466개).
구조가 동일하고 값만 다르므로 교체가 파일 스위치 하나입니다.

### 프레임워크 4개 전부 고대비 테마가 없습니다

이것이 **시맨틱 계층을 두는 실질적 이유**를 역으로 보여줍니다.

| 시스템 | 시맨틱 계층 | 고대비 추가 난이도 |
|--------|:---:|------|
| Atlassian · Material 3 | O | 값만 교체 |
| shadcn/ui · Radix Themes · Mantine | O | **가능하나 미제공** |
| **Tailwind** | **✗** | **거의 불가능** |

**Tailwind는 구조적으로 어렵습니다.** 코드에 `bg-gray-100`처럼 원시 색이 직접 박히므로,
고대비 모드에서 바꿀 중간 지점이 없습니다.

**shadcn/ui·Radix Themes·Mantine은 시맨틱 계층이 있어 가능한데도 제공하지 않습니다.**
구조 문제가 아니라 범위 문제입니다.

**Radix Themes는 `--scaling`(밀도)은 축으로 노출하면서 대비는 축으로 두지 않았습니다.**
테마 축 5개 중 접근성 축은 없습니다.

## 알고리즘 생성

| 시스템 | 방식 |
|--------|------|
| **Ant Design** | `colorAlgorithm.js` — 시드 색에서 팔레트 생성 |
| **Material 3** | `material-color-utilities` 기반 동적 색 (미확인) |
| Orbit | `convertHexToRgba` 등 색 변환 유틸을 토큰 패키지에 포함 |

**Ant Design은 시드 색 하나에서 전체 팔레트를 계산합니다.**
스페이싱을 `sizeUnit`·`sizeStep`에서 파생시키는 것과 같은 철학입니다.

## 특수 색 값

| 값 | 시스템 | 용도 |
|----|--------|------|
| `rgba(0,0,0,0)` | Pajamas | `border.color.transparent` — "보더는 있지만 안 보임" |
| **`transparent`** | **Atlassian** | **`utility.UNSAFE.transparent`** — 이름에 `UNSAFE` |
| `#7676801f` | Apple | `Fills/Tertiary` — 8자리 헥스(알파 포함) |
| **`oklch(0% 0 0)`** | **shadcn/ui** | 검정을 `oklch`의 명도 0%로 |
| **`color-mix(in oklab, …)`** | **Radix Themes** | 그림자 색을 런타임 혼합 |
| `0.02em` | Nord | `border-radius-sharp` (색은 아니지만 같은 계열의 극단값) |

**Pajamas는 투명 보더에 설명을 붙입니다** —
"보더가 존재해야 하지만 시각적으로 인지되지 않아야 할 때".
레이아웃 유지용 투명 보더를 토큰화한 사례입니다.

**Atlassian은 토큰 이름에 `UNSAFE`를 넣습니다** — `utility.UNSAFE.transparent`.
Pajamas가 설명으로 주의를 주는 자리에, Atlassian은 **이름으로** 줍니다.
표본에서 토큰 이름으로 사용 위험을 표시하는 것은 Atlassian뿐입니다.

**Radix Themes는 그림자 색을 런타임 혼합합니다.**

```css
--shadow-2: 0 0 0 1px color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%), … ;
```

`@supports (color: color-mix(in oklab, white, black))` 안에서만 이 값을 쓰고,
지원하지 않으면 `var(--gray-a3)`를 그대로 씁니다.
**그림자가 회색 계열 토큰을 참조하므로 `data-gray-color`를 바꾸면 그림자 색조도 따라옵니다.**

### 색 공간 — OKLCH·P3

| 시스템 | 색 표기 |
|--------|---------|
| 대부분 | 헥스 (`#0052CC`) 또는 `rgba()` |
| **shadcn/ui** | **`oklch()` 전용** |
| **Radix Themes** | 헥스 + **`display-p3` 대체 팔레트** (1,579회) |
| Radix Themes (그림자) | `color-mix(in oklab, …)` |

**shadcn/ui만 전 색 토큰이 `oklch()`입니다.**
`oklch(0.577 0.245 27.325)` 형태로, 명도·채도·색상각이 분리돼 있어
명도만 조정하는 작업이 값 한 자리 수정입니다.

**Radix Themes만 광색역(P3) 대체 팔레트를 토큰 레벨에 둡니다.**
`@supports (color: color(display-p3 …))` 안에서 색을 다시 정의합니다.

**두 시스템이 현대 CSS 색 기능을 서로 다른 목적으로 씁니다** —
shadcn/ui는 **색 조작 편의**, Radix Themes는 **디스플레이 대응**입니다.

### 차트 색 — 세 방향으로 갈립니다

| 시스템 | 개수 | 방식 |
|--------|:---:|------|
| **Atlassian** | **100** | `categorical` 16색 + 색상별 6단계 × 10색 + 상태별 4 × 5 |
| **Cloudscape** | **90** | 8색 × 10단계, **단계 이름이 대비 비율** |
| **shadcn/ui** | **5** | `blue` 300 · 500 · 600 · 700 · 800 — **단색 명도 램프** |

**Atlassian과 shadcn/ui가 정반대입니다.** Atlassian은 색상으로 범주를 구분하고,
shadcn/ui는 명도로 구분합니다.

| | 장점 | 대가 |
|---|------|------|
| 색상 구분 (Atlassian) | 범주가 많아도 구분됨 | 색각이상에서 혼동 가능 |
| 명도 램프 (shadcn/ui) | 색각이상에 강함 | 5개를 넘기면 구분이 어려움 |
| **대비 기준 단계** (Cloudscape) | **필요 대비를 값에서 고름** | 색상 수가 8개로 제한 |

**Atlassian의 `categorical` 16개는 범주형 데이터의 색 사용 순서까지 정한 것입니다.**

## 대비 비율 — Cloudscape만 값으로 명시합니다

Cloudscape 차트 팔레트의 단계 번호가 **대비 비율**입니다.

```json
"color-charts-red-300": {
  "$value": { "light": "#ea7158", "dark": "#d63f38" },
  "$description": "Color from the 'red' data visualization palette at a contrast ratio of 3:1"
}
```

| 토큰 단계 | 대비 비율 |
|:---:|:---:|
| `300` | 3:1 |
| `400` | 4:1 |
| `500` | 5:1 |
| … | … |
| `1200` | 12:1 |

**단계 번호 ÷ 100 = 대비 비율입니다.** 8색(`red` · `orange` · `yellow` · `green` ·
`teal` · `blue` · `purple` · `pink`) × 10단계 = **90개 토큰**
(`blue`만 20개로 두 벌 있습니다).

**대비 비율을 토큰 이름과 설명에 담은 것은 Cloudscape뿐입니다.**
"WCAG AA(4.5:1)를 만족하는 빨강"이 `color-charts-red-500`으로 바로 특정됩니다.

**Primer가 색각이상 테마를 제공하고 Material 3이 중간 대비 테마를 두는 것과
층위가 다릅니다** — 저쪽은 테마를 통째로 바꾸고, Cloudscape는 **필요 대비를
토큰 하나 단위로 고르게** 합니다.

`$description`이 패키지에 포함돼 있어 **도구가 읽을 수 있습니다** —
Style Dictionary·Figma 플러그인이 설명을 그대로 노출합니다.

### 대비 비율이 없는 자리

**Cloudscape도 차트 팔레트에만 있습니다.** 일반 UI 색
(`color-text-*` · `color-background-*`)에는 대비 비율 표기가 없습니다.

**나머지 33개 시스템에는 어떤 색에도 대비 비율 수치가 없습니다.**

## 79표본 재종합 — 컴포넌트 실측 (2026-08-18)

`partial` 수집 심화로 색 실측이 79개 시스템으로 늘어, 이 문서의 결론을 그 표본으로 재검증했습니다.
**이 절도 헥스 나열은 하지 않습니다**(`SCHEMA.md` 규칙) — 값이 아니라
**색을 만드는 방식·색을 쓰는 자리**만 담습니다. 실값은 각 `systems/*.md`에 있습니다.

### 상태색을 만드는 방식 — 여섯 갈래입니다

| 방식 | 시스템 |
|------|--------|
| **열거** (hover·press 색을 토큰으로 나열) | **Charcoal**(default/hover/press 3연조 변수) · **EUI**(색 7종 × base/fill/empty × 기본/hover/active 전용 토큰층) · Semi(리터럴, 전환 없이 즉시 스왑) · Shoelace(램프 단계 이동 600→500→600) · Atlassian(농도 × 상태) · **LINE**(`p` 접미 pressed 헥스를 팔레트에 미리 구움 — 문서 층) |
| **빌드 타임 함수** | **bf-solid** `darken($fill, 20%)`/`darken($fill, 35%)` · **SmartHR** `hoverColor = darken(0.05, value)` · Stacks(LESS `darken()`) · Fleet(`darken($yellow, 20)` — 토큰 층) · **Origami**(색 + 배경맥락 2변수 함수로 생성, 열거 없음) |
| **런타임 CSS 함수** | **PIE**(hover 배경을 `color-mix()`로 연산, hsl 성분 폴백 동반) · **PrimeVue**(`color-mix(in srgb, {primary.color}, transparent 96%)`) · Tegel·Welcome UI·Skeleton(스크림) · Radix Themes(그림자) · **Blueprint**(`oklch(from …)` 상대 색상 문법) |
| **알파 합성·상태층** | Material 3(state layer — 토큰 층) · **Vapor**(gray-900 α0.08/0.16 오버레이 하나로 전 변형) · **Vuetify**(상태층 불투명도 × 테마 배수) · Naive UI(검정 알파 .05/.09/.13) · Serendie(`::after` 오버레이) · Clarity(`::after` opacity .1) · **Yoga**(`hexToRgb(primary, .75)`) · shadcn/ui(`bg-primary/90`) · Radix Themes(알파 12단) |
| **필터** | **Skeleton** — hover가 `brightness(125%)`(다크 75%). **변형별 hover 색 토큰이 0개**입니다 |
| **수식** | **LINE** — Pressed를 HSV 변환 후 명도 구간별 가감으로 규정(V≤32% → +45 / 33~86% → −20 / ≥87% → −35). 문서 층 표본 |

> **정정.** 기존 "구현 시 기본값"의 상태 처리 표는 네 방식(상태 레이어 · 농도×상태 ·
> 이름에 상태 포함 · 사용 지점 알파)이었는데, **색을 함수로 유도하는 두 진영
> (빌드 타임 Sass/LESS · 런타임 `color-mix()`/상대 색상)과 필터 진영이 빠져 있었습니다.**
> 79표본에서 이 셋을 합치면 15개 이상이며, 소수 취향이 아니라 하나의 축입니다.
> 아래 "구현 시 기본값" 절의 표를 이에 맞게 고쳤습니다.

**함수 진영의 공통 대가는 같습니다** — hover·press 색이 토큰으로 존재하지 않으므로
**디자인 도구에 대응 변수가 없고, 개별 상태만 예외 처리하기 어렵습니다.**
bf-solid·Skeleton이 이 진영의 양 끝입니다: 전자는 빌드 결과가 고정 헥스로 남고,
후자는 끝까지 색이 아니라 필터입니다.

### 스크림 — 농도가 0.1에서 0.9까지 벌어집니다

```
~0.2 이하   shadcn/ui Drawer 0.1(+블러) · Origami 0.2 · Strapi 0.2 ·
            Welcome UI ≈0.23(color-mix 조립) · Kontur 0.24
0.3대       Material 3 0.32(토큰 층) · Vapor 0.32 · Vuetify 0.32 · Shoelace 0.33
0.4~0.5     Braid 라이트 0.4 · Ring UI 라이트 0.4 · Paste 0.4 · Yoga 0.48 ·
            Astro · Base Web · Kaizen · SGDS · Stacks · Pluralsight · HeroUI ·
            Orbit · Priceline(medium) 0.5 · Siemens iX 0.549 · PIE 0.55
0.6대       Semi 0.6 · LeafyGreen 0.6 · Braid 다크 0.6 · DSFR 0.64
0.7         Blueprint · Backpack · EUI · Evergreen · eBay · NYSDS ·
            Ring UI 다크 · Vibe · Priceline(dark) 0.75 · Skeleton 0.75
0.8 이상    Asphalt ≈0.8 · Gestalt 0.8 · Vitamin 0.8 · Vanilla 0.85 ·
            Protocol 0.85(내부 패널 0.9)
```

**최빈은 0.5 언저리지만 축 전체가 0.1~0.9로 벌어져 "관행값"이 없습니다.**
양 끝이 서로 다른 전략입니다 — **shadcn/ui Drawer 0.1과 Park UI는 어둡기 대신
블러로 분리**하고, **Vitamin 0.8·Protocol 0.85는 스크림을 배경 제거 수단으로** 씁니다.
Blueprint의 0.7은 폭 단계도 없는 단일 다이얼로그와 짝입니다.

**스크림 색을 순검정으로 두지 않는 진영이 큽니다.** 무채색 관행의 예외가 아니라
거의 절반입니다 — EUI(청회색) · Evergreen(청회색) · eBay(네이비 잉크) ·
**Vibe**(네이비 틴트) · Paste(남색) · Forma 36(남색) · NYSDS(순검정이 아닌 잉크색 기반) ·
Semi · DSFR · Stacks · Strapi · Shoelace(회색) · Priceline(단일 베이스 3단) ·
**Yoga**(자주 기운 다크).
**EUI와 Evergreen이 거의 같은 청회색 70%에 독립 수렴**한 것이 이 축의
가장 강한 신호입니다 — 데이터 도구 두 표본이 서로를 참조하지 않고 같은 값에 도달했습니다.

**스크림 반전(밝은 스크림)이 다섯 표본입니다** — **bf-solid** 흰색 0.9 ·
**Codex** 라이트 흰색 0.65(다크 검정 0.65) · **Cedar** 모래색 0.85 + `backdrop-filter: blur(16px)` ·
**Park UI** 라이트 흰색 알파10 + blur(4px) · **Bolt**(navy 0.8 기본에 `--overlay-light` 흰색 변형).
**넷 중 셋이 블러를 함께 씁니다** — 밝은 스크림만으로는 배경이 분리되지 않기 때문으로 보이며,
Cedar·Park UI가 그 조합을 명시적으로 둡니다.

**농도를 축으로 노출한 표본이 셋입니다** — **Ring UI**(라이트 0.4 / 다크 0.7) ·
**Braid**(라이트 0.4 / 다크 0.6)는 **컬러 모드**를 축으로, **Priceline**은
같은 베이스색의 dark 0.75 / medium 0.5 / light 0.25 **3단 시맨틱 토큰**으로 둡니다.
**Vapor는 스크림 불투명도와 disabled 불투명도를 같은 0.32 상수**로 묶습니다 —
"감쇠"를 한 값으로 통일한 표본입니다.
모달 쪽 교차 비교는 `modal.md`에 있습니다.

### disabled — 색이 아니라 불투명도입니다

```
0.26   Vuetify (최저)
0.3    Audi 0.30 · bf-solid · Grommet · Kaizen · Spindle
0.32   Charcoal · Vapor
0.38   Vitamin(`--vtmn-opacity_disabled-state`) · Vibe — 둘 다 M3 계수
0.4    Astro(`opacity-disabled` 40%) · Atlassian(`opacity.disabled`)
0.5    shadcn/ui(`opacity-50`) · Shoelace · HeroUI(`disabledOpacity`) · Naive UI(`alphaDisabled`)
```

**색 교체가 아니라 불투명도 한 값으로 비활성을 표현하는 것이 다수입니다.**
`Charcoal`은 루트가 disabled면 **자식 전체에 0.32를 일괄** 적용하고,
`Vitamin`은 그 값에 토큰 이름까지 붙였습니다.
**두 배 이상 벌어진 축**(0.26 ~ 0.5)이므로 시스템 간 이식 시 그대로 옮기면 안 됩니다.

**불투명도를 쓰지 않는 예외가 셋입니다.**

- **Welcome UI** — 비활성이 회색조가 아니라 **대각 빗금**입니다
- **Vibes** — 배경색 교체(밝은 회색) + `cursor: not-allowed`
- **디지털청** — 상태 표시를 색 변화에만 의존하지 않도록 두고,
  solid-fill 보더를 **배경과 동색 4px double**로 깔아 강제 색 모드에서 윤곽이 살아나게 합니다

**불투명도 방식의 알려진 대가**는 **텍스트 대비가 함께 무너진다**는 것인데,
표본에서 이를 값으로 관리한 시스템은 확인되지 않았습니다.

### 포커스 링 색 — "브랜드색"이 기본값이 아닙니다

| 정책 | 시스템 |
|------|--------|
| **브랜드색 그대로** | Naive UI(초록 문법 전면) · Strapi · Odyssey · Unify(브랜드 보라, **점선**) · **Welcome UI**(브랜드 노랑이 포커스 링까지) · Vibe(다만 919개 변수 중 **포커스색만 하드코딩**) |
| **브랜드에서 분리한 전용 색** | **Asphalt**(브랜드 그린과 분리된 파랑 `--interactive-focus`) · **Astro**(등급색 6종·상태색 6종과 겹치지 않는 연자색) · **Grommet**(브랜드 보라와 무관한 형광 민트 단일값) · NYSDS(inverted 모드 전용 색 별도) |
| **무채색 이중 링** | **Italia**(흰 안 + 검정 바깥, `$focus-outline-color-in/-out`) · **디지털청**(노랑 안 + **검정 바깥**) · GOV.UK 계열(노랑) · **WMN**(흰 갭 + 퍼플, 전역 1규칙) · Odyssey(흰 + 브랜드) · Canvas(흰 내륜 + 브랜드 외륜) · SmartHR(inset 흰 4px + 파랑 2px) · **Vibes**(흰·파랑·흰 **3겹 샌드위치**, `FocusHighlight` 컴포넌트로 배포) |
| **상태 종속** | **Intergalactic** — valid면 초록 링, invalid면 빨강 링. **HSDS**도 error/warning/success 링 색 변형을 입력과 공유 |
| **테마 종속** | Pluralsight(테마별 파랑 단계) · **Auro**(브랜드별 — alaska 보라 / hawaiian 남색) · Kaizen(reversed 3종은 링이 한 단계 밝게) |
| **색이 아닌 표현** | **Thumbprint** — 링 없이 `text-decoration: underline` + 배경 변색(`outline: none`) · **KRDS** — 보더 두께 1→2px · **Porsche** — 입력은 보더 색 교체(아웃라인은 `forced-colors`에서만) |

**"포커스 = 브랜드색"은 관행이 아니라 여섯 정책 중 하나입니다.**
가장 정보량이 큰 것은 **전용 색 진영의 이유**입니다 — Astro는 등급색·상태색이
이미 12색을 점유해서, Asphalt·Grommet은 브랜드색이 상태 신호와 겹치지 않게 하려고
**의도적으로 팔레트 밖 색**을 골랐습니다. 색 체계가 조밀할수록 포커스색이 밖으로 나갑니다.

**무채색·이중 링 진영의 동기는 배경 독립성입니다** — 어떤 표면 위에서도
링이 사라지지 않게 흰 갭을 끼웁니다. **Vibes는 이 구조를 컴포넌트로 배포**해
임의 요소에 같은 링을 씌울 수 있게 했습니다.

**Intergalactic·HSDS의 상태 종속 링은 반대 방향의 결정**입니다 —
포커스가 색 하나를 더 소비하는 대신, 검증 상태를 링에서도 읽게 합니다.

### 고대비·강제 색 모드 — 값이 아니라 "색을 포기하는 층"에서 갈립니다

기존 "접근성 — 고대비 테마" 절을 79표본으로 다시 보면 두 갈래가 더 있습니다.

- **CSS 시스템 색으로 넘기는 방식** — **Clarity**가 고대비 테마에서
  `Canvas`·`CanvasText` 같은 **OS 강제 색 키워드**로 전환합니다.
  **Carbon**도 컴포넌트 소스에 `border: 1px solid ButtonBorder`를 직접 둡니다.
  값을 정의하는 대신 OS에 위임하는 쪽입니다
- **`forced-colors`에서 잃는 것을 되살리는 방식** — inset box-shadow로 보더를
  긋는 진영은 강제 색 모드에서 윤곽이 사라집니다. **Pajamas**(`forced-colors: active`에서
  실보더 복원) · **DSFR**(보더 복원) · **Stacks**(2px 투명 outline을 미리 깔아 둠) ·
  **디지털청**(배경 동색 4px double 보더) · **Porsche**(아웃라인을 이 모드에서만 표시)가
  각각 다른 수단으로 같은 문제를 처리합니다

고대비 테마 자체의 표본도 늘었습니다 — **KRDS의 `mode-high-contrast`는
라이트와 토큰 수가 같은 190개**로, Atlassian(466개 동수)과 같은
"구조 동일·값만 교체" 구조입니다. 반대 방향의 사례가 **Mística**로,
16.44.1에 원시 램프 안에 있던 고대비(HC) 토큰이 **17.1.0에서 제거**됐습니다.

> **정정.** "Primer만 색각이상 대응 테마를 토큰 레벨에서 제공합니다"는
> **Unify로 반증**됩니다. `unify-token@3.0.0`이 **deuteranopia · protanopia ·
> tritanopia 3종을 각각 별도 CSS 파일**로 배포합니다 — 색각이상 대응을
> 유형별로 나눈 것은 표본에서 Unify가 유일합니다.

### 색을 팔레트 밖에서 가져오는 자리

- **Spindle** — facebook · twitter · **x** · instagram · apple · youtube ·
  amazon · rakuten · yahoo의 **서드파티 SNS 브랜드색을 각 2색씩 정식 토큰층**에 올립니다
  (`--color-third-party-*`). bf-solid도 `$fill-facebook` 등 브랜드 채움색을 토큰층에 둡니다
- **WMN** — 브랜드 축(퍼플·파랑)과 **GOV.UK 차용 축(초록 `start` · 빨강 `destructive`)이
  한 버튼 팔레트에 공존**합니다. 색 계보가 두 갈래인 것이 값에 드러납니다
- **Kontur** — primary가 브랜드색이 아니라 **잉크색**(`shape-bold-accent`)이고,
  success·danger 옆에 **결제 전용 색**(`btnPayBg`)이 나란히 있습니다
- **Park UI** — 색을 명시하지 않으면 **회색**입니다(`colorPalette: gray` 기본).
  강조색은 `solid` 변형에만 기본 적용되고 outline·ghost·subtle은 회색에서 출발합니다

**팔레트가 브랜드 하나로 닫히지 않는다**는 것이 공통점입니다 —
소셜 로그인·정부 표준 계승·도메인 전용 액션(결제·구매 전환)이 각각
브랜드 밖 색을 요구하고, 네 시스템 모두 그것을 예외가 아니라 **토큰**으로 처리했습니다.
Vitamin의 `conversion`(구매 전환 전용 강조색)도 같은 자리입니다.

## 구현 시 기본값

**계층** — 2계층으로 시작합니다.

```
scale/     원시 색 (gray-100 … gray-900)
semantic/  용도 (text-primary · surface · border · danger …)
```

**시맨틱 계층을 건너뛰지 마세요.** Tailwind가 원시 색만 두는 유일한 사례이고,
그 대가로 **고대비 테마 추가가 거의 불가능**합니다.
`bg-gray-100`이 코드에 직접 박히면 나중에 바꿀 중간 지점이 없습니다.

Tailwind를 쓰면서 시맨틱 계층을 얹는 방법이 shadcn/ui의 구조입니다 —
`--primary` → `--color-primary` → `bg-primary`로 한 단계를 끼웁니다.

Seed Design의 `static` 3계층은 원시와 시맨틱 어느 쪽도 아닌 값이 실제로 생겼을 때 추가합니다.

**배경/전경 짝 규칙을 쓰세요.** Material 3(`On Primary`)과 shadcn/ui(`-foreground`)가
같은 구조입니다. **대비 비율을 값으로 검사하지 않고 짝짓기로 보장**하는 방식이며,
"이 배경에 어떤 글자색을 쓰지"라는 결정을 토큰 이름이 대신합니다.

**주 색상 별칭을 두세요.** Mantine의 `--mantine-primary-color-*`,
Radix Themes의 `--accent-*`처럼 한 곳에서 갈아끼우는 계층입니다.
브랜드 색 변경이 토큰 한 줄이 됩니다.

**상태 처리** — **여섯 방식** 중 하나를 초기에 고르세요 (2026-08-18 정정 — 이전 판은
네 방식이었습니다). 나중에 바꾸기 매우 비쌉니다.

| 방식 | 예 | 장단 |
|------|-----|------|
| 상태 레이어 토큰 | Material 3 · **Vapor** · **Vuetify** | 조합 자유. 토큰 수 4배 |
| **농도 × 상태 조합** | **Atlassian** · **EUI** · **Charcoal** | 명시적. 색상당 12개 (농도 4 × 상태 3) |
| 색 이름에 상태 포함 | Orbit · Mantine · **LINE**(`p` 접미) | 직관적. 색상 추가 시 10개씩 늘어남 |
| **사용 지점에서 알파** | **shadcn/ui** (`bg-primary/90`) · **Yoga** | 토큰 수 0. **디자인 도구와 불일치** |
| **빌드 타임 함수** | **bf-solid**(`darken()`) · **SmartHR** · Stacks · Origami | 토큰 수 0, 결과는 고정값. **상태별 예외 처리 불가** |
| **런타임 CSS 함수** | **PIE**·**PrimeVue**(`color-mix()`) · **Blueprint**(`oklch(from …)`) | 테마 교체에 자동 추종. **폴백 필요** |

> **정정 (2026-08-18).** 기존 4방식 표에는 **색을 함수로 유도하는 진영이 빠져
> 있었습니다.** 79표본에서 빌드 타임 함수 5개 + 런타임 CSS 함수 6개 이상이
> 확인됩니다. **Skeleton은 그보다 더 나가 상태색 정의 자체를 두지 않고
> `brightness()` 필터로 처리**합니다 — 변형별 hover 색 토큰이 0개입니다.

**`bg-primary/90` 방식이 가장 싸지만 Figma에 대응 변수가 없습니다.**
디자인-코드 일치를 중시하면 Radix Themes처럼 알파를 미리 계산해 토큰화하세요
(색상당 24개가 됩니다).

**함수 진영(빌드·런타임·필터)은 전부 같은 대가를 치릅니다** — hover·press 색이
토큰으로 존재하지 않아 디자인 도구에 옮길 값이 없고, "이 변형만 hover를 다르게"가
불가능합니다. **브랜드가 하나이고 변형이 적을 때만 권합니다.**

**상태색 범위** — 표본이 크게 갈립니다.

| 시스템 | 상태색 |
|--------|--------|
| **Atlassian** | danger · warning · success · **discovery** · information (각 10개) |
| Evergreen | success · warning · danger · none |
| **shadcn/ui** | **`destructive` 하나** |

**`success`·`warning`을 안 두는 선택도 실제로 존재합니다** (shadcn/ui).
다만 나중에 추가할 때 시맨틱 계층이 없으면 어렵습니다.

**최소 4개(danger · warning · success · info)로 시작**하고,
"새 기능 안내" 같은 자리가 있으면 Atlassian의 `discovery`를 참고하세요.
**79표본에서도 이 권고는 유지됩니다** — 반대쪽 끝인 **PrimeVue가 9종**
(primary · secondary · success · info · warn · **help** · danger · contrast 등),
**Vapor가 6종**입니다. `help`처럼 도메인 어휘가 붙는 자리는 시스템마다 다르므로
**4개를 깔고 도메인 색을 나중에 얹는 순서**가 안전합니다.

**도메인이 상태색 어휘를 바꾸는 사례를 확인해 두세요.** **Astro**는 관제
도메인이라 `standby`·`off`가 1급 상태색이고, **Vitamin**은 커머스라
`conversion`(구매 전환 전용)이 변형 이름에 들어가며, **Kaizen**은 오류가 아닌
경고 단계로 `caution` 필드 상태와 로딩용 `pending` 색을 따로 둡니다.
**"성공/경고/오류" 3분법이 도메인에 따라 부족해지는 지점이 실제로 있습니다.**

**다크 모드** — 테마 파일 분리 또는 CSS 클래스 오버라이드를 권합니다.

| 방식 | 시스템 | 적합한 경우 |
|------|--------|-------------|
| 테마 파일 분리 | Atlassian · Material 3 · Pajamas · **Clarity** · **Codex** | 테마가 3개 이상 |
| CSS 클래스 (`.dark`) | shadcn/ui · Radix Themes · **Vibe** · **Ring UI** | 라이트/다크 2개 |
| **`light-dark()` 한 줄** | **Porsche** · **PrimeVue** | 값이 한 자리에 붙어 있길 원할 때 |

visionOS식 "한 토큰에 두 값"은 파싱·도구 연동이 까다롭습니다.
**Grommet의 색별 `{dark, light}` 객체 쌍도 같은 자리**인데, 적용이 배경색 맥락
(`Box`의 `dark` prop)에 달려 있어 테마 교체 진영과 디버깅 난이도가 다릅니다
(2026-08-18 추가).

**`light-dark()`는 79표본에서 두 시스템이 채택했습니다** — 선언 수가 절반이 되고
클래스 토글이 필요 없지만, **모드별 값을 도구로 추출하려면 파싱이 필요**합니다.
PrimeVue는 여기에 `color-mix()`까지 한 값에 섞어 정적 추출을 사실상 포기했습니다.

**다크에서 보더를 알파로 바꾸는 것을 검토하세요** (shadcn/ui 방식).
표면 색이 여러 단계일 때 보더가 각 표면에 맞춰 따라옵니다 —
`oklch(1 0 0 / 10%)`가 어느 어두운 표면 위에서도 동작합니다.

**고대비** — 처음부터 넣지 않아도 되지만, **시맨틱 계층이 있으면 나중에 추가가 쉽고
없으면 거의 불가능**합니다. 이게 시맨틱 계층을 두는 실질적 이유입니다.

프레임워크 4개가 전부 고대비를 제공하지 않으므로, **프레임워크를 기반으로 쓰면
고대비는 직접 만들어야 합니다.** Atlassian처럼 일반 테마와 **같은 토큰 집합에
값만 다른 파일**을 두는 구조가 관리하기 쉽습니다 —
**KRDS도 같은 구조**입니다(`mode-high-contrast` 190개 = 라이트와 동수, 2026-08-18 추가).

**값을 직접 정하기 어려우면 OS에 넘기는 방법이 있습니다** (2026-08-18 추가).
Clarity는 고대비 테마에서 `Canvas`·`CanvasText` 같은 **CSS 시스템 색 키워드**로
전환하고, Carbon은 컴포넌트 소스에 `ButtonBorder`를 직접 씁니다.
팔레트를 한 벌 더 만들지 않아도 되는 대신, 디자인 통제권을 포기합니다.

**보더를 inset box-shadow로 긋고 있다면 `forced-colors` 대책을 함께 넣으세요.**
강제 색 모드에서 그림자는 사라지고 요소 윤곽이 통째로 없어집니다.
확인된 수단은 넷입니다 — 실보더 복원(**Pajamas** · **DSFR**) ·
투명 outline 미리 깔기(**Stacks**) · 배경 동색 double 보더(**디지털청**) ·
아웃라인을 이 모드에서만 표시(**Porsche**).

**색각이상은 고대비와 별개 축입니다.** 토큰 층에서 확인된 것은 둘뿐이고
(Primer의 colorblind 변형 · **Unify**의 deuteranopia/protanopia/tritanopia
**3종 별도 CSS**), **유형별로 나눈 것은 Unify가 유일**합니다.
자체 구현할 계획이면 "색각이상 1벌"이 아니라 **적록·청황을 나눌지**를 먼저 정하세요.

**색 공간** — `oklch()`를 검토하세요.

```css
--primary: oklch(0.577 0.245 27.325);   /* 명도 채도 색상각 */
```

명도만 조정하는 작업이 값 한 자리 수정입니다. 헥스는 3채널을 전부 다시 계산해야 합니다.
표본에서 shadcn/ui만 쓰지만, 브라우저 지원은 충분합니다.

**P3 대체 팔레트는 필요할 때 추가하세요.** Radix Themes가 유일한 사례이고
선언이 1,579개로 늘어납니다. `@supports`로 감싸면 폴백이 자동입니다.

**스크림** — 색과 농도를 따로 정하세요 (2026-08-18 추가).

```
농도   0.5 근처에서 시작        (79표본 최빈 구간 — 다만 축이 0.1~0.9로 벌어져 표준값 없음)
색     순검정 대신 잉크·네이비  (표본의 거의 절반이 유채색 틴트)
```

**농도만 정하고 색을 검정으로 두면 표본 다수와 어긋납니다.** EUI·Evergreen이
독립적으로 같은 청회색 70%에 도달했고, eBay·Vibe·Paste·NYSDS·Yoga가 각각
자기 잉크색을 씁니다. **배경 표면색과 같은 계열의 어두운 값**을 쓰는 편이
검정보다 잘 붙습니다.

**밝은 스크림을 쓸 거면 블러를 함께 넣으세요.** 반전 표본 5개 중 셋
(Cedar · Park UI · shadcn/ui Drawer)이 `backdrop-filter`를 동반합니다 —
밝은 스크림만으로는 배경이 분리되지 않습니다.

**라이트/다크에서 농도를 다르게 둘지 초기에 정하세요.** Ring UI(0.4/0.7) ·
Braid(0.4/0.6)가 다크에서 짙게 갑니다. 시맨틱 3단으로 노출하는 방법도 있습니다
(Priceline dark/medium/light). 모달 쪽 값 비교는 `modal.md`를 보세요.

**disabled** — 색이 아니라 불투명도 한 값으로 두는 것이 다수 관행입니다
(2026-08-18 추가).

```
0.35~0.4 에서 시작   (Astro·Atlassian 0.4 · Vitamin·Vibe 0.38 — 표본 중앙 부근)
```

**79표본의 축이 0.26(Vuetify)~0.5(shadcn/ui·Shoelace·HeroUI·Naive UI)로
두 배 가까이 벌어집니다** — 다른 시스템 값을 그대로 옮기지 마세요.
**Vapor처럼 스크림 불투명도와 같은 값으로 묶으면** 감쇠 상수가 하나가 되어
관리가 단순해집니다(0.32).

**불투명도만으로 비활성을 표현하면 텍스트 대비가 함께 무너집니다.**
표본에서 이를 값으로 관리한 시스템은 확인되지 않았으므로 **직접 검사해야 합니다.**
색에 의존하지 않는 표현을 함께 두는 사례가 참고가 됩니다 —
Welcome UI(대각 빗금) · Vibes(배경색 교체 + `not-allowed` 커서).

**포커스 링 색** — 브랜드색을 기본으로 잡지 말고 **팔레트 충돌부터 확인하세요**
(2026-08-18 추가).

```
색 체계가 단순      브랜드색 그대로      (Naive UI · Strapi · Welcome UI)
상태색이 많음        팔레트 밖 전용 색    (Astro 연자색 · Grommet 형광 민트 · Asphalt 파랑)
배경이 다양함        무채색 이중 링        (Italia · Canvas · Odyssey · WMN · Vibes 3겹)
```

**등급색·상태색이 이미 색상환을 많이 점유한 시스템일수록 포커스색이 팔레트 밖으로
나갑니다.** Astro가 등급 6종 + 상태 6종을 피해 연자색을 고른 것이 가장 명확한 사례입니다.

**어두운 표면과 밝은 표면을 모두 지원할 계획이면 흰 갭을 낀 이중 링을 권합니다.**
링 색 하나로는 어느 한쪽에서 반드시 묻힙니다. **Vibes처럼 링을 컴포넌트로 빼두면**
버튼 밖 요소에도 같은 규격을 씌울 수 있습니다.

**포커스색을 토큰 밖에 두지 마세요** — Vibe는 CSS 변수 919개를 두고도
포커스 링 색만 리터럴로 박혀 있어 테마 교체에서 빠집니다.

**차트 색** — 범주 수로 결정합니다.

| 범주 수 | 방식 | 예 |
|:---:|------|-----|
| ~5개 | 단색 명도 램프 | shadcn/ui (`blue` 300~800) |
| 6개 이상 | 색상 구분 + 사용 순서 지정 | Atlassian (`categorical` 16) |

**명도 램프가 색각이상에 강합니다.** 5개를 넘길 계획이 없으면 이쪽을 권합니다.
색상으로 구분할 거면 **사용 순서까지 토큰으로 정하세요** — 그러지 않으면
차트마다 색 순서가 달라집니다.

**레이아웃 영역 전용 계열** — 사이드바·코드블록처럼 톤이 확실히 다른 영역이 있으면
shadcn/ui처럼 전용 계열을 두는 것을 검토하세요. 시맨틱 토큰을 오버라이드하는
것보다 명시적입니다.

## 아직 못 채운 것

- **전체 헥스값** — 의도적으로 담지 않습니다 (`SCHEMA.md` 규칙). 원문 링크로 갈음
- ~~WCAG AA/AAA 준수 목표~~ → **문서 층에서 해소 (2026-08-18).** 10개 시스템
  접근성 문서를 직접 확인한 결과:

  | 명시 | 목표 |
  |------|------|
  | Primer | **WCAG 2.2 AA** ("GitHub aims for…") |
  | GOV.UK | **WCAG 2.2 AA** (접근성 성명 "fully compliant") |
  | Nord | **WCAG 2.1 AA** |
  | USWDS | **WCAG 2.1 AA** (법적 기준 2.0 AA 초과 — 2.2·AAA 점진 지향 명문) |
  | Carbon | **WCAG AA** (IBM Checklist 기반 · 대비는 "2.1 AA" 명시) |
  | Polaris | 2.1 A+AA — **구 문서에만** (현행 shopify.dev에서 문구 소실, Wayback 확인) |
  | M3 · Spectrum · Cloudscape | **명시 없음 확인** (WCAG 일반 언급뿐) |
  | Atlassian | 디자인시스템 문서엔 없음 — 회사 차원 표준만 2.1 AA (atlassian.com/trust) |

  **경향: 정부·정부납품 계열(GOV.UK·USWDS·Carbon)과 최근 갱신 시스템
  (Primer 2.2)은 명시하고, 고대비 테마를 제공하는 시스템(M3·Atlassian·
  Spectrum)이 오히려 목표 등급을 안 적습니다** — 구현은 있는데 선언이 없는
  형태. 토큰에 목표 등급을 적는 시스템은 여전히 0개이고, 대비 비율
  수치는 Cloudscape가 유일하게 명시합니다 (위 "대비 비율" 절).
- ~~상태색 생성 방식이 네 가지뿐인지~~ → **해소 (2026-08-18)** — 79표본에서
  **여섯 갈래**가 확인됩니다. 위 "상태색을 만드는 방식" 절
- ~~스크림 농도·색의 분포~~ → **해소 (2026-08-18)** — 위 "스크림" 절
  (농도 0.1~0.9 · 유채색 틴트가 거의 절반 · 반전 표본 5개)
- ~~disabled 표현 방식~~ → **해소 (2026-08-18)** — 위 "disabled" 절
  (불투명도 0.26~0.5 · 비불투명도 예외 3건)
- ~~포커스 링 색 정책~~ → **해소 (2026-08-18)** — 위 "포커스 링 색" 절 (6정책)
- ~~**Spectrum · Polaris · Primer · Cloudscape · Carbon 컬러** — 토큰 경로 미확인~~
  → **전건 해소 (2026-08-18)**. 경로는 전부 npm 배포본 안에 있었습니다:
  `@adobe/spectrum-tokens@15.0.0` `src/color-palette.json`·`semantic-color-palette.json`·
  `color-aliases.json` / `@shopify/polaris-tokens@9.4.2`(동결) `dist/cjs/src/colors.js`·
  `themes/base/color.js`(npm에 `src/`가 없어 `dist/cjs/`에서 읽음) /
  `@primer/primitives@11.10.0` `src/tokens/base/color/**`·`functional/color/*`
  + **`dist/internalCss/`**(원시 램프는 여기에만) /
  `@cloudscape-design/design-tokens@3.0.107` **`index-visual-refresh.json`**
  (`index.scss`는 라이트 값만 — 다크는 JSON에) /
  `@carbon/colors@11.56.0` + **`@carbon/themes@11.79.0`**(`index.scss`는 `@forward`
  껍데기, 실값은 `js/generated/themes/*.js`).
  결과는 위 "램프 단계 수" · "시맨틱 계층 깊이" 절과 각 `systems/*.md`.
  (Atlassian은 앞서 해결 — `dist/cjs/artifacts/tokens-raw/atlassian-light.js`, 466개)
- ~~**shadcn/ui 8개 스타일 변형**(`luma`~`vega`) — `styles/` 디렉터리 미확인~~ →
  **경로는 해소 (2026-08-18)**: `apps/v4/styles/`는 gitignore 대상 빌드 산출물이고
  소스는 `apps/v4/registry/styles/style-*.css` 8개였습니다 (`systems/shadcn-ui.md`).
  **다만 실측된 차이는 라운드·높이·서체·패딩이고, 8스타일 간 컬러 차이 여부는
  별도로 확인하지 않았습니다.**
- ~~Radix Themes 26색의 실제 값~~ → **9단계 한정 해소 (2026-08-18)** —
  위 "`--accent-9` 실값 — 26색 전수" 표 (`@radix-ui/colors@3.0.0`).
  라이트/다크 동일(gray만 예외) + contrast 색 5개 예외까지 확인.
  나머지 단계(1~8·10~12)는 여전히 원문 갈음
- **Mantine 다크 모드 매핑 규칙** — `dark-0`~`9` 램프가 어떤 시맨틱 자리에 들어가는지 미확인
- **차량 색 규격** — 주야간 휘도 전환이 Android Automotive에 있을 것으로 보이나 미확인
