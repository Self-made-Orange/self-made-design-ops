<!-- lang-links -->
> [English](typography.md) · **한국어**
<!-- /lang-links -->

# Typography

**표본 34개 중 타이포 스케일이 확인된 것만 다룹니다.**
토큰에서 확인된 값만이며, 사용 지침(어느 스타일을 언제 쓰는가)은 문서 사이트에만 있습니다.

**컴포넌트 층까지 서체 실측이 확보된 시스템은 68개입니다** (2026-08-18 재종합).
개별 값은 각 `systems/*.md`의 "컴포넌트 심화" 절에 있고, 이 문서는 **분포와 교차 결론**만 담습니다.
위 표들은 초기 표본(토큰 층 중심)으로 작성된 것이며, 68표본 기준 재검증은
"68표본 재종합" 절에 있습니다 — **둘이 어긋나면 재종합 절이 우선입니다.**
특히 **토큰 스케일과 컨트롤 실사용값은 자주 어긋납니다** (아래 shadcn/ui 절).

## 본문 기본 크기 — 6개 진영으로 갈립니다

| 크기 | 시스템 |
|:---:|--------|
| **24sp (최소)** | **Android Automotive** |
| **18px** | **Grommet** (24 × 0.75 파생) |
| **17pt/px** | **Apple iOS** (Body) · **KRDS** (body.medium) · **디지털청**(日, 스케일 보유) |
| 16px | Canvas · Paste · Material 3 (Body Large) · Codex · **Tailwind** · **Radix Themes** · **Mantine** · **Charcoal**(pixiv) · **Serendie**(expanded) · SmartHR(M) |
| **14px** | **Ant Design · Material 3 (Body Medium) · Helios · Evergreen · Seed(100) · Atlassian · shadcn/ui · Ring UI · Siemens iX(ms-0) · Serendie(compact) · Vibes(freee, 실사용 ×27) · Naive UI · PrimeVue** · **Primer**(`base.text.size.sm`) · **Cloudscape**(`body-m`) · **Carbon**(`body-short-01`) · **Spectrum**(`font-size-100` 데스크톱) |
| **13px** | Helios (`body-100`) · **Stacks**(`--fs-base`, 기본값으로는 표본 유일) · **Polaris**(`text-body-md`) |

**16px은 웹 관행일 뿐 보편이 아닙니다.** 축의 양끝이 13(Stacks)과 18(Grommet)로 벌어졌습니다.

**→ 보강 (2026-08-18, `full` 수집 대형 5종 토큰 경로 해소).**
Spectrum · Primer · Cloudscape · Carbon **넷 다 14px**이고 Polaris만 13px입니다 —
**엔터프라이즈 밀집 도구 진영의 14px 수렴이 대형 시스템에서도 확인됩니다.**
Stacks 단독이던 13px 진영에 Polaris가 합류해 2표본이 됐습니다.

**Spectrum은 본문 기본이 두 값입니다** — `font-size-100`이
데스크톱 **14px** / 모바일 **17px**입니다. 이 표에서 한 칸에 들어가지 않는
유일한 표본이며, Apple·KRDS의 17과 밀집 도구의 14를 **한 토큰이 둘 다** 갖습니다.

- **차량이 압도적으로 큽니다.** Android Automotive의 **최소** 24sp는
  다른 시스템의 **최대** 본문보다 큽니다. Material 3 기준 `Headline Small`(24px)에 해당합니다
- **17이 세 시스템** — Apple(Body 17pt) · KRDS(body.medium 17px) ·
  일본 디지털청(스케일 보유, 용도 미확정). **셋 다 CJK 문맥입니다.**
  KRDS는 본문 스케일 전체가 홀수(13/15/17/19)입니다. 근거는 어느 소스에도 없습니다
- **굵기 2단계(400/700)는 CJK 4표본 전부**입니다 — KRDS · 디지털청 ·
  **Charcoal(pixiv) · Serendie(三菱電機)**. 정부 2/2에서 정부+민간 4/4로 확대됐습니다.
  **다만 "CJK 전용"은 아닙니다** — Pharos(JSTOR·미국)도 400/700 둘뿐입니다.
  CJK에서 예외가 없다는 것과, CJK 밖에서도 나타난다는 것이 함께 성립합니다.
  100 단위 9굵기(Tailwind·Chakra)의 반대 극단입니다
- **중화권 세 표본이 모두 본문 14px입니다** — Ant(시드 14) · Semi(실사용 14px ×92회) · Naive UI(fontSize 14).
  일본은 갈립니다 — Serendie가 compact 14 / expanded 16 양쪽을 두고,
  Charcoal은 16입니다. **14px 진영의 나머지는 밀집 엔터프라이즈 도구**
  (Ring UI·Siemens iX·Atlassian·Helios)입니다:
  **중화권 14 · 한국(정부) 17 · 일본 14/16 병행 · 서구 웹 16/14 · 밀집 도구 13/14**
- **14px 진영이 가장 큽니다.** 열세 시스템이 여기 있습니다.
  일본 업무 도구 둘(Serendie compact·Vibes)이 중화권과 같은 14에 서면서
  "일본 17" 단정은 성립하지 않게 됐습니다 — 디지털청 17은 정부 스케일의 한 값일 뿐입니다

Material 3은 `Body Large`(16)와 `Body Medium`(14)을 둘 다 두어 선택을 미룹니다.

### 토큰 기본값과 컴포넌트 실사용값이 다른 경우

**shadcn/ui가 그렇습니다.** Tailwind 토큰의 기본은 `text-base`(16px)인데,
컴포넌트는 전부 `text-sm`(14px)을 씁니다.

| 컴포넌트 | 크기 |
|----------|:---:|
| Button (전 변형, `xs` 제외) | 14 (`text-sm`) |
| Select 트리거 · 항목 | 14 |
| Table 전체 | 14 |
| Dialog 설명 | 14 |
| Badge · Button `xs` · Select 라벨 | 12 (`text-xs`) |
| **Input** | **16 → `md` 이상 14** |

**Input만 뷰포트로 갈립니다** (`text-base md:text-sm`).
iOS Safari가 16px 미만 입력 필드에서 자동 확대하는 동작과 관련되지만,
**소스에 그 이유는 적혀 있지 않습니다.**

**"토큰 기본값"과 "실제로 화면에 보이는 값"을 구분해야 합니다.**
Tailwind 문서만 보면 16px 시스템으로 읽히는데, shadcn/ui로 만든 화면은 14px입니다.

### Atlassian은 토큰 이름에 기본값을 박습니다

```
font.body.[default] = 14px/20px
font.body.large     = 16px/24px
font.body.small     = 12px/16px
```

**`[default]`가 이름에 들어 있습니다.** Material 3이 `Body Large`·`Body Medium`을
나란히 두어 선택을 미루는 것과 반대로, 어느 쪽이 기본인지 토큰이 명시합니다.

## 자간 — 방향이 시스템마다 반대입니다

### 부호 패턴

| 시스템 | 큰 글자 | 중간 | 작은 글자 | 패턴 |
|--------|:---:|:---:|:---:|------|
| **Apple iOS** | +0.40 | -0.45 | +0.06 | **U자** |
| **Material 3** | -0.25 | 0 | +0.50 | **단조 증가** |
| **visionOS** | 0 | 0 | 0 | **전부 0** |
| Backpack | -0.05em | — | -0.02em | 음수만 |
| Seed Design | — | -0.04em | -0.02em | 음수만 |
| **Evergreen** | -0.2px | 0 | **+0.6px** | 음수·양수 모두 |
| Pajamas | -0.01em (h1~h2) | inherit | inherit | 큰 글자만 |

**Apple과 Material 3이 정면으로 반대입니다.** 큰 글자에서 Apple은 벌리고(+0.40)
Material은 좁힙니다(-0.25). 작은 글자에서만 둘 다 양수로 만나지만,
**Material(+0.50)이 Apple(+0.06)의 8배**입니다.

**크로스 플랫폼에서 자간을 한 값으로 통일하면 양쪽 다 어긋납니다.**
플랫폼별로 나누는 것 외에 방법이 없습니다.

### 세 번째 곡선 — Radix Themes

| 단계 | 크기 | 자간 |
|:---:|:---:|:---:|
| 1 | 12 | **+0.0025em** |
| 2 · 3 | 14 · 16 | 0 |
| 4 | 18 | -0.0025em |
| 5 | 20 | -0.005em |
| 6 | 24 | -0.00625em |
| 7 | 28 | -0.0075em |
| 8 | 35 | -0.01em |
| 9 | 60 | **-0.025em** |

**크기가 커질수록 단조 감소합니다.** Material 3(작을수록 양수로 증가)과
방향은 같지만, Material은 용도별로 값이 갈리고 Radix Themes는 **크기 하나로 결정**됩니다.

곡선이 세 종류가 됐습니다.

| 패턴 | 시스템 |
|------|--------|
| **U자** | Apple iOS |
| **단조 증가** (작을수록 양수) | Material 3 · **Radix Themes** |
| 음수만 | Backpack · Seed Design · Pajamas |
| 전부 0 | visionOS |
| **크기와 무관** | **Tailwind** (6단계 독립 유틸리티) |
| **토큰 없음** | **Atlassian · Mantine · Primer · Spectrum**(전역 `letter-spacing: 0em` 하나, `detail` 역할만 0.06em) |

**Tailwind는 자간을 크기와 분리합니다** — `tracking-tight`(-0.025em)를
어떤 크기에도 붙일 수 있습니다. 스케일 안에 자간이 내장되지 않으므로
**크기를 바꿀 때 자간이 따라오지 않습니다.**

**Atlassian·Mantine은 자간 토큰이 아예 없습니다.** 서체 기본 자간을 그대로 씁니다.
**Primer도 없고, Spectrum은 전역 `0em` 하나만 둡니다** (2026-08-18) —
Spectrum은 `detail` 역할에만 `0.06em`을 따로 줍니다.

### 대형 5종의 자간 방향 (2026-08-18)

| 시스템 | 방향 | 값 |
|--------|------|------|
| **Cloudscape** | **크기 ↑ → 음수 ↓** | `heading-xs` `normal` → `-0.005` → `-0.010` → `-0.015` → `-0.02` → `display` **-0.03em**. 본문에는 자간 토큰 없음 |
| **Polaris** | 같은 방향, **px 단위** | 20px 이상에서만 음수: `-0.2` → `-0.3` → **-0.54px**. 그 이하는 0 |
| **Carbon** | **반대 — 작을수록 벌림** | 12px `0.32px` → 14px `0.16px` → 16px 이상 `0` |
| Primer · Spectrum | 토큰 없음 / 0 고정 | — |

**Carbon만 방향이 반대입니다.** Material 3·Radix Themes와 같은
"작을수록 양수" 진영이고, Cloudscape·Polaris는 "클수록 음수" 진영입니다.
**둘은 배타적이지 않습니다** — Material 3은 두 방향을 U자로 잇는데,
Carbon은 0에서 멈추고 Cloudscape는 `normal`에서 시작합니다.
**`em` vs `px`도 갈립니다** — Cloudscape는 `em`(크기에 비례),
Polaris·Carbon은 `px`(크기와 무관한 절대량)입니다.

### 굵기와 자간의 연동 — M3 Emphasized (androidx, 2026-08-17)

M3 타입 스케일은 15역할 전부에 **Emphasized 쌍**이 있고, 규칙이 일관됩니다:
**굵기 한 단계 ↑ (Regular→Medium) + 자간 ↓** (BodyLarge 0.5→0.15sp).
Radix Themes가 활성 탭 하나에서 하던 "굵어지면 좁힌다"(-0.01em) 보정이
**타입 스케일 전체의 시스템 규칙**으로 올라간 형태입니다 —
굵기 변화가 시각 폭을 바꾼다는 문제 인식을 두 시스템이 공유합니다
(`patterns/navigation.md` 탭 절 교차).

### px 자간 — 2026-08 추가 표본 2개

Persona(Privy)가 `±0.2~0.8px`, Italia가 `-1 ~ -2px` — **em이 아니라 px 고정**
자간입니다 (Evergreen과 함께 3표본). px 자간은 글자 크기가 변해도 따라
늘지 않으므로, 대형 제목 전용(Italia 압축) 또는 크기 고정 전제(Persona 버튼)
에서만 성립하는 선택입니다.

### 단위도 갈립니다

| 단위 | 시스템 |
|------|--------|
| px (소수) | Apple · Material 3 |
| **px (고정)** | **Evergreen** |
| em | Backpack · Seed Design · Pajamas · **Tailwind** · **Radix Themes** |

**Evergreen만 px 고정입니다.** 글자가 커져도 자간이 비례하지 않습니다.
`em`을 쓰는 셋은 비례합니다.

### 크기가 아니라 용도로 정하는 경우

**Material 3만 그렇습니다.** 같은 크기가 계열마다 다릅니다.

| 크기 | Title | Body | Label |
|:---:|:---:|:---:|:---:|
| 16 | +0.15 | +0.50 | — |
| 14 | +0.10 | +0.25 | +0.10 |
| 12 | — | +0.40 | +0.50 |

Apple은 크기가 같으면 자간도 같습니다 — Headline과 Body 모두 17pt / -0.43입니다.

### `wide`(양수)를 두는 시스템

Evergreen(`+0.6px`) · Radix Themes(`+0.0025em`, 12px에서만) ·
**Tailwind**(`wide` +0.025 / `wider` +0.05 / `widest` +0.1em)입니다.
Backpack·Seed Design은 `narrow`만 3단계씩 둡니다.

**Tailwind만 0 양쪽으로 대칭 3단계**입니다 — 음수 2단계(`tighter`·`tight`) +
0 + 양수 3단계(`wide`·`wider`·`widest`)입니다.

## 스케일 정의 방식 — 5가지

| 방식 | 시스템 | 내용 |
|------|--------|------|
| 값 목록 | 대부분 | 단계마다 직접 지정 |
| **재귀 함수** | **Carbon** | 증분이 4스텝마다 커지는 수식 |
| **`clamp()` 유동** | **Pajamas** | 뷰포트에 따라 변함 + `-fixed` 쌍 |
| **이름 없는 배열** | **Evergreen** | `fontSizes[0]`·`[1]` — 인덱스 참조 |
| 시드 파생 | Ant Design | `fontSize: 14` 시드에서 파생 |
| **런타임 배율** | **Mantine · Radix Themes** | `calc(1rem * var(--scale))` |
| **CSS 단축 속성 문자열** | **Atlassian** | `"normal 653 24px/28px …"` 한 값 |
| **플랫폼 2벌 `sets`** | **Spectrum** (2026-08-18) | 18단 전부 `{desktop, mobile}` 두 값 |
| **스페이싱 맵 공유** | **Polaris** (2026-08-18) | `font-size-350` = `space-350` = `size[350]` = 14px |
| **크기 스케일 없음 — 역할만** | **Cloudscape** (2026-08-18) | `body-m` · `heading-l`이 곧 토큰. 번호 스케일 부재 |
| **CSS 단축 + 개별 속성 병행** | **Primer** (2026-08-18) | `*-shorthand`가 `var()` 조합이라 **둘 다 사용 가능** |

### 단축 속성 토큰 — Atlassian과 Primer가 갈립니다 (2026-08-18)

둘 다 CSS `font` 단축 속성을 토큰으로 두는데, 분해 가능 여부가 반대입니다.

| | 값 | 개별 속성 |
|---|------|:---:|
| **Atlassian** | 리터럴 문자열 `"normal 653 24px/28px \"Atlassian Sans\""` | **불가** |
| **Primer** | `var(--text-body-weight) var(--text-body-size-medium) / var(--text-body-lineHeight-medium) var(--fontStack-sansSerif)` | **가능** — 참조된 토큰이 전부 공개 |

Primer는 11역할 전부에 `*-shorthand`를 두면서 크기·굵기·행간 토큰도 나란히
노출합니다. **단축은 편의고 개별 속성이 계약**인 구조입니다.
Material 3의 변수 참조 조합(`static/*` → `M3/*`)과 같은 진영이고,
Atlassian만 분해 불가 진영입니다 (아래 "복합 토큰" 절).

### Spectrum — 플랫폼 2벌을 타이포에도 적용합니다 (2026-08-18)

스페이싱의 `sets: {desktop, mobile}` 구조를 **크기 18단 · 행간 18단 전부**에
그대로 씁니다.

| | desktop | mobile |
|---|:---:|:---:|
| `font-size-25` (최소) | 10px | 12px |
| `font-size-100` (본문) | 14px | **17px** |
| `font-size-1500` (최대) | 73px | 88px |

모바일 값이 데스크톱의 약 1.2배입니다. **소스에 배율 상수는 없고 값만
열거**돼 있습니다 — Spectrum 컴포넌트 높이 스케일이 정확히 ×1.25인 것과 다릅니다.

**유동 타이포(`clamp()`)와 다른 접근입니다** — 뷰포트 연속 보간이 아니라
**토큰 값 자체를 두 벌 두고 플랫폼이 고릅니다.** 앞서 정리한 네 가지 유동
방식(`clamp()` · `calc()` 선형 보간 · 반응형 루트 · 브레이크포인트 함수) 중
어디에도 속하지 않는 **다섯 번째**입니다.

### Atlassian — 크기·굵기·행간·서체가 한 토큰

```
font.heading.large = "normal 653 24px/28px \"Atlassian Sans\", …"
                      style weight size/line-height family
```

**CSS `font` 단축 속성 문법 그대로**입니다. 개별 속성 토큰이 없어
**크기만 따로 쓸 수 없습니다.**

| 장점 | 대가 |
|------|------|
| 한 토큰으로 타이포 전체가 결정됨 | 크기·행간을 분리해 쓸 수 없음 |
| CSS `font:` 한 줄로 적용 | 파싱해야 개별 값을 얻음 |

Material 3도 조합형 토큰을 두지만 **개별 속성 토큰과 조합 토큰을 둘 다** 노출합니다.
Atlassian은 조합형만 있습니다.

### 런타임 배율 — 배율 1 가정값임을 항상 명시해야 합니다

```css
--mantine-font-size-md: calc(1rem * var(--mantine-scale));
--font-size-3: calc(16px * var(--scaling));    /* Radix Themes */
```

Radix Themes는 `--scaling`이 `90% · 95% · 100% · 105% · 110%`로 노출됩니다.
**같은 `--font-size-3`이 14.4px ~ 17.6px 사이에서 움직입니다.**

이 문서의 Mantine·Radix Themes 값은 전부 **배율 100% 기준**입니다.

### Carbon — 함수로 정의

```scss
@function get-type-size($step) {
  @if $step == 1 { @return 12px; }
  @return get-type-size($step - 1) + (math.floor(($step - 2) * 0.25) + 1) * 2;
}
```

23스텝: `12·14·16·18·20·24·28·32·36·42·48·54·60·68·76·84·92·102·112·122·132·144·156`

**스케일 확장에 임의 판단이 개입하지 않습니다.** 다만 소스 주석은 공식 지원을 12~92px로 한정합니다.

### Pajamas — 유동/고정 쌍

```
heading.scale.500         clamp(1.125rem, 0.9028rem + 0.463vw, 1.25rem)   18→20px
heading.scale.500-fixed   1.125rem                                        18px
```

**h1~h3만 유동이고 h4~h6은 고정입니다.** 유동/고정 선택을 토큰 레이어에서 합니다.

## 단계 수와 촘촘함

| 시스템 | 단계 | 10~16px 구간 |
|--------|:---:|:---:|
| **TDS (Toss)** | **32 (고정) + 20 (역할)** | 6 (11~16 전부) — **11~42px 연속 1px** |
| **Seed Design** | 18 | **7** (10·11·12·13·14·15·16) |
| Material 3 | 15 | 4 |
| Apple iOS | 11 | 4 |
| Paste | 11 | 4 |
| Evergreen | 8 | 3 |
| Protocol (제목) | 8 | 1 |
| Carbon | 23 (17 지원) | 3 |
| **Tailwind** | **13** | 3 (12·14·16) |
| **Radix Themes** | **9** | 3 (12·14·16) |
| **Atlassian** | 10 (본문 3 + 제목 7) | 3 (12·14·16) |
| **Mantine** | 5 (+ 제목 6) | 3 (12·14·16) |

**TDS가 11~42px을 연속 1px 32단계로 채워 촘촘함 최대를 넘겨받았습니다.**
Seed Design(10~16 1px)과 함께 **1px 진영 1·2위가 모두 한국 시스템입니다** —
KRDS의 홀수 본문(13/15/17/19)까지 합치면 한국 3표본이 전부 1px/홀수 감도를 보입니다.
근거는 어느 소스에도 없습니다.

**프레임워크 4개는 전부 10~16px 구간이 `12 · 14 · 16` 3단계입니다.**
11·13·15px을 두지 않습니다 — 예외 없이 일치합니다.

**Tailwind가 13단계로 가장 많지만 상단이 벌어져 있습니다** —
`5xl`(48) 이상이 48·60·72·96·128px로 5단계입니다.
본문 구간(12~20px)은 `xs·sm·base·lg·xl` 5단계뿐입니다.

**Radix Themes 8단계가 35px입니다** — 12·14·16·18·20·24·28 다음이 32도 36도 아닙니다.
표본에서 20px 이상의 홀수 본문 크기는 이것뿐입니다.

## 행간

### 변형을 제공하는 시스템 — Apple만

| | Large Title | Body | Caption 2 |
|---|:---:|:---:|:---:|
| Tight | 39 | — | — |
| 기본 | 41 | 22 | 13 |
| Loose | 43 | 24 | 15 |

**Loose는 11개 스타일 전부 예외 없이 기본 +2px입니다.**

### 행간 비율

| 시스템 | 방식 |
|--------|------|
| Apple iOS | 크기별 고정 px (34→41, 17→22, 11→13) |
| Material 3 | 크기별 고정 px (57→64, 14→20, 11→16) |
| **Atlassian** | 크기별 고정 px, **전부 4의 배수** (32→36, 14→20, 12→16) |
| **Radix Themes** | 크기별 고정 px, **본문/제목 2벌** |
| Evergreen | **별도 배열** `[16,18,20,24,28,32,40]` |
| Pajamas | **비율** `1.25` (제목 전부) · `1.125` (scale.800) |
| **Mantine** | **비율, 크기마다 다름** (1.4 → 1.65) |
| **Tailwind** | **비율로 적었지만 원본은 px** (`calc(1.25 / 0.875)`) |
| Codex · Seed | `static/line-height` 별도 계열 |

**Pajamas만 비율(1.25)로 통일합니다.** 나머지는 크기별 고정 px입니다.

Evergreen은 크기 배열과 행간 배열이 **분리돼 있어** 조합을 구현이 결정합니다.

### 행간 비율의 방향이 갈립니다

| 시스템 | 작은 글자 | 큰 글자 | 방향 |
|--------|:---:|:---:|------|
| Apple iOS | Caption 2 11→13 = **1.18** | Large Title 34→41 = **1.21** | 거의 평평 |
| Atlassian | body.small 12→16 = **1.333** | heading.xxlarge 32→36 = **1.125** | **감소** |
| Radix Themes | 1단계 12→16 = **1.333** | 9단계 60→60 = **1.0** | **감소** |
| **Mantine** | `xs` 12 → **1.4** | `xl` 20 → **1.65** | **증가** |
| Tailwind | `xs` 12→16 = **1.333** | `5xl` 이상 = **1.0** | **감소** |

**Mantine만 방향이 반대입니다.** 큰 글자에서 행간 비율이 커집니다.
제목(`h1`~`h6`)도 1.3 → 1.5로 작은 제목이 더 넓습니다 — 본문과 같은 방향입니다.

**나머지는 전부 감소**입니다. 큰 글자는 행간 비율이 작아도 절대 간격이 충분합니다.

### Atlassian — 행간이 항상 4의 배수입니다

| 크기 | 행간 | 비율 |
|:---:|:---:|:---:|
| 12 | 16 | 1.333 |
| 14 | 20 | 1.429 |
| 16 | 20 | 1.25 |
| 20 | 24 | 1.2 |
| 24 | 28 | 1.167 |
| 28 | 32 | 1.143 |
| 32 | 36 | 1.125 |

**비율은 1.125~1.429로 흔들리지만 절대값이 예외 없이 4의 배수입니다.**
비율을 맞추는 대신 4px 격자를 맞춘 형태입니다.

**14px과 16px이 행간 20px을 공유합니다** — 비율이 1.429와 1.25로 크게 갈립니다.

### Radix Themes — 본문과 제목 행간이 별도 계열

| 단계 | 본문 | 제목 | 차이 |
|:---:|:---:|:---:|:---:|
| 1 | 16 | 16 | 0 |
| 2 | 20 | **18** | -2 |
| 3 | 24 | **22** | -2 |
| 4 | 26 | **24** | -2 |
| 5 | 28 | **26** | -2 |
| 6~9 | 30 · 36 · 40 · 60 | 동일 | 0 |

**작은 단계(2~5)에서만 제목 행간이 2px 좁습니다.** 6단계(24px) 이상은 완전히 같습니다.
표본에서 본문·제목 행간을 별도 토큰 계열로 두는 것은 Radix Themes뿐입니다.

## 강조 방식

| 시스템 | 방식 |
|--------|------|
| **Material 3** | 모든 스타일에 `Weight-emphasized` 쌍 (Regular→Medium, Medium→SemiBold) |
| **Apple iOS** | Regular / Emphasized / Italic / Emphasized Italic **별도 스타일** (총 102개) |
| Apple (Headline vs Body) | 크기·행간·자간 동일, **굵기만** 다름 (**590** vs 400) |
| visionOS | 기본이 **Bold(700)** |
| Pajamas | 제목 전부 `fontWeight: 600` |

**Material은 굵기 한 단계 올리는 규칙**을, **Apple은 조합마다 별도 스타일**을 둡니다.

### 굵기 상한 — 600에서 멈추는 시스템이 있습니다 (2026-08-18)

| 시스템 | 굵기 토큰 | 상한 |
|--------|------|:---:|
| **Primer** | light 300 · normal 400 · medium 500 · semibold 600 | **600** |
| **Carbon** | light 300 · regular 400 · semibold 600 | **600** |
| **Cloudscape** | lighter 300 · normal 400 · bold/heavy 700 | 700 |
| **Polaris** | regular **450** · medium **550** · semibold **650** · bold 700 | 700 |
| **Spectrum** | light · regular · medium · bold · extra-bold · black (**이름**) | — |
| Tailwind · Chakra | 100~900 9단 | 900 |

- **Primer·Carbon은 700(bold)이 없습니다.** 굵기 축이 300~600 4단·3단입니다.
  Tailwind·Chakra의 9단과 반대 극단이고, CJK 표본의 400/700 2단과도 다릅니다
  (양끝이 아니라 **중간만** 갖는 형태).
- **Polaris는 100의 배수가 아닙니다** — 450 · 550 · 650. Inter 가변 서체의
  중간 인스턴스이고, Apple(590) · Atlassian(653)과 같은 계열입니다.
  **가변 서체 중간값을 4단 전부에 쓰는 것은 Polaris뿐**입니다.
- **Spectrum은 굵기 값이 숫자가 아니라 이름입니다** (`extra-bold` · `black`).
  가변 서체 `Adobe Clean Spectrum VF`의 인스턴스 이름을 그대로 값으로 쓰고,
  숫자 매핑은 토큰 파일에 없습니다. **굵기를 수치가 아닌 토큰으로 두는 유일한 표본입니다.**
- **Cloudscape는 제목 굵기가 전부 700 하나**입니다 — 크기만 다르고 굵기는
  같습니다. 단, `display-xl`(64px)만 400으로 되돌아갑니다.

## 계열 분리

| 시스템 | 계열 |
|--------|------|
| Material 3 | Display · Headline · Title · Body · Label (5계열 × L/M/S) |
| **Helios** | Display · Body · **Code** — Body와 Code가 크기 공유 (13/14/16) |
| **Evergreen** | **Display / UI / Mono 서체 분리** |
| Paste | 본문 스케일 + **display 별도** (32/48/64) |
| Protocol | **제목만** 별도 스케일 (16→64, 8px 등차) |
| Carbon | IBM Plex Sans / Serif / Mono |
| **Atlassian** | heading · body · code · **metric** + **brand(Charlie) 별도 서체** |
| **Mantine** | 본문 5단계 + 제목 `h1`~`h6` 별도 |
| **Radix Themes** | 본문·제목이 크기는 공유, **행간만 별도** |
| **shadcn/ui** | `--font-sans` · `--font-heading` · `--font-mono` + **`--font-ar` · `--font-he`** |

### Atlassian — `metric` 계열이 따로 있습니다

| 토큰 | 크기/행간 | 같은 값의 heading |
|------|:---:|------|
| `font.metric.large` | 28/32 | `heading.xlarge` |
| `font.metric.medium` | 24/28 | `heading.large` |
| `font.metric.small` | 16/20 | `heading.small` |

**값이 heading과 완전히 같은데 이름이 분리돼 있습니다.**
숫자 지표(대시보드 큰 숫자)용 계열이며, 나중에 heading과 다르게 바꿀 여지를 남긴 형태입니다.
Atlassian의 `border.width.selected`/`focused`가 값은 같지만 별도 토큰인 것과 같은 패턴입니다.

### 브랜드 서체를 분리하는 시스템 — 2개

| 시스템 | 제품 UI | 브랜드 |
|--------|---------|--------|
| **Atlassian** | Atlassian Sans | **Charlie Display / Charlie Text** |
| Evergreen | SF UI Text | SF UI Display |

**Atlassian은 서체 자체가 다릅니다** (Atlassian Sans ↔ Charlie).
Evergreen은 같은 SF 계열에서 Display/Text만 갈립니다.

### 언어별 서체 — shadcn/ui만

```css
[data-lang="ar"] { font-family: var(--font-ar); }
[data-lang="he"] { font-family: var(--font-he); }
```

**아랍어·히브리어에 별도 서체 슬롯을 둡니다.**
표본에서 언어별 서체 스위치를 토큰 레이어에 둔 것은 shadcn/ui뿐입니다.
→ **정정 (2026-08-18): LINE이 언어를 토큰 이름의 1급 축(EN/JP/TC/TH)으로 두고
언어별 서체 매핑을 스케일에 동반합니다.** 아래 "68표본 재종합 — 언어축" 절 참조.

`i18n/README.md`의 RTL 항목과 직결되는 지점입니다 —
**RTL은 방향만 뒤집는 문제가 아니라 서체까지 바뀌는 문제**임을
토큰 구조에서 인정한 유일한 사례입니다.

CJK(한국어·일본어·중국어) 서체 슬롯은 **없습니다.**
→ **정정 (2026-08-18): Charcoal이 CJK 전용 서체(Sarasa UI J)를 시스템 서체로 지정하고,
LINE은 언어별 서체 매핑(JP Hiragino · ZH PingFang · TH Thonburi · KO Apple SD Gothic Neo)을
스케일에 동반합니다. Vibe·Vibes는 서체 스택 층에서 처리합니다.**

**Helios는 본문과 코드가 같은 크기를 씁니다** — 인프라 제품에서 코드 블록이
본문과 같은 비중이라는 뜻입니다.

**Evergreen은 Display와 UI 서체를 분리합니다** — 제목용·인터페이스용을 다르게 둡니다.

## 서체

| 시스템 | 서체 |
|--------|------|
| Apple iOS · visionOS | SF Pro |
| Material 3 | Roboto |
| Carbon | IBM Plex (Sans/Serif/Mono) |
| Evergreen | SF UI Display / SF UI Text / SF Mono → system stack |

## 복합 토큰

**Pajamas만 타이포 토큰에 여백과 색을 넣습니다.**

```js
heading.1 = {
  fontWeight: 600, fontSize: 'clamp(…)', lineHeight: 1.25,
  letterSpacing: '-0.01em',
  marginTop: '0px', marginBottom: '1rem',   // ← 여백
  color: '#18171d',                          // ← 색
}
```

스페이싱 토큰이 따로 있는데도 제목 여백을 타이포 쪽에 넣었습니다.

Material 3도 조합형 토큰을 두지만 **구조가 2계층입니다.**

```
M3/headline/large = Font(
  family:        "Static/Headline Large/Font",     ← 변수 참조
  style:         Static/Headline Large/Weight,     ← 변수 참조
  size:          Static/Headline Large/Size,       ← 변수 참조
  lineHeight:    Static/Headline Large/Line Height,
  letterSpacing: Static/Headline Large/Tracking,
)
```

**모든 하위 속성이 리터럴이 아니라 변수 참조입니다.**
`static/*` 변수 계층 → `M3/*` 스타일 계층 순서입니다.

Atlassian은 반대로 값을 문자열에 박습니다
(`"normal 653 24px/28px \"Atlassian Sans\""`) — **개별 속성을 따로 쓸 수 없습니다.**

| 시스템 | 조합 방식 | 개별 속성 접근 |
|--------|-----------|:---:|
| **Material 3** | 변수 참조 조합 (`static/*` → `M3/*`) | **가능** |
| **Atlassian** | 리터럴 문자열 | **불가** |
| Pajamas | 객체 (여백·색 포함) | 가능 |

Material 3은 여백·색을 타이포 토큰에 포함하지 않습니다 (Pajamas와 다름).

### Material 3은 가변 서체 축을 씁니다

```
fontVariationSettings: '"wdth" 100'
```

Roboto의 **폭(width) 축**을 100으로 지정합니다.
표본에서 `font-variation-settings`가 확인된 것은 Material 3뿐입니다.

굵기(`wght`)만 쓰는 다른 시스템과 달리 **축이 두 개**입니다 —
Apple(590) · Atlassian(653)이 굵기 축의 중간값을 쓰는 것과 층위가 다릅니다.

컬러 역할 변수는 `schemes/*`, 타이포는 `static/*`으로 이름공간이 분리돼 있습니다
(`schemes/on-surface` · `schemes/outline-variant` · `static/headline-large/size`).

## 68표본 재종합 — 컴포넌트 실측 (2026-08-18)

`partial` 수집 심화로 서체 실측이 68개 시스템으로 늘어, 이 문서의 결론을 그 표본으로 재검증했습니다.
**타이포 스케일이 아니라 "그 스케일이 컨트롤에서 실제로 어떤 값이 되는가"**를 봅니다.

### 컨트롤 서체 굵기 — 500이 다수, 양극단이 400과 800입니다

```
400   Astro · Bootstrap · Naive UI · Nord(large만 500) · Porsche · Serendie ·
      SGDS · Stacks · Tegel · Vibe                                          (10)
450   EUI · Auro                                                             (2)
500   Base Web · Canvas · Cedar · Chakra · DSFR · Forma 36 · HSDS ·
      Intergalactic · MUI · Orbit · Pluralsight · Shoelace(`semibold`=500) ·
      Vuetify …                                                            (다수)
600   Asphalt · Bolt · Braid · Clarity · Italia · NYSDS · Park UI · Paste ·
      Semi · Welcome UI                                                     (10)
700   Backpack · Charcoal · Codex · 디지털청 · Gestalt · NASA WDS · Pharos ·
      Priceline · Protocol · Seed(brandSolid) · Siemens iX · SmartHR ·
      Thumbprint · Vitamin · WMN · eBay(primary 변형만)                     (16)
800   PIE · Unify                                                            (2)
```

**`button.md`가 700 진영을 9개로 적었는데, 68표본에서 16개까지 늘었습니다**
(2026-08-18 정정). **볼드 버튼은 소수파가 아닙니다.**

**400 진영은 "컨트롤에 볼드를 얹지 않는다"를 명시적 선택으로 둡니다** —
Astro는 컨트롤 전용 서체 토큰(`font-control-*`)을 두고도 굵기는 400 그대로이고
(갈리는 것은 굵기가 아니라 행간), Naive UI는 `strong`(500)조차 쓰지 않으며,
Stacks는 **버튼 400 · 라벨 700으로 굵기 위계가 표본 다수와 뒤집혀** 있습니다.

**같은 시스템 안에서 버튼과 입력의 굵기를 가르는 사례가 둘 있습니다** —
**Paste**(버튼 600 / 입력 500) · **Grommet**(입력값이 세미볼드 600 — 대부분 400인 자리).
**SmartHR은 tertiary 버튼만 굵기 normal + 링크색**으로 두어
"3차 버튼 = 링크"라는 판단을 굵기로 표현합니다.

**CJK 4표본(KRDS · 디지털청 · Charcoal · Serendie)이 전부 2굵기(400/700)인데,
그중 Serendie만 버튼을 regular 쪽에 배정**했습니다 —
SmartHR · Vibes · Charcoal · Spindle은 전부 bold입니다.
**2굵기 체계에서는 버튼이 어느 쪽에 서는지가 곧 시스템의 인상**이 됩니다.

### 컨트롤 서체 크기 — 본문보다 작은 진영과 큰 진영이 둘 다 있습니다

| 관계 | 시스템 |
|------|--------|
| **컨트롤 < 본문** | **Bolt**(기본 버튼 12.8px, 본문 16) · **Evergreen**(medium 버튼까지 12px, 본문 14 — large만 14) · **Charcoal**(14px, 본문 16) · **Clarity**(12px, 본문 13) · **Serendie**(expanded 라벨 13px, 본문 16) · **Shoelace**(버튼 12/14/16이 입력 14/16/20보다 **한 단계 작음**) · Vapor(입력 sm만 12px) · HSDS(11~14) |
| **컨트롤 = 본문 + 볼드** | **Backpack** 16/700 · **Codex** 1rem/700 · **Gestalt** 16 bold · **Pharos** 16/700 · **Thumbprint** 16/700 · **Braid** 16/600 · **디지털청** 16/700 · **Siemens iX** 14/700 · NASA WDS 17/700 · **Grommet**(버튼 전용 서체 없이 본문 스케일 18px 그대로) |
| **컨트롤 > 본문** | **PIE** 20px/800 · **Origami**(입력 18px, 본문 16 — "신문 조판 감각") · **Orbit**(입력 16px, 본문 15) · **KRDS**(xlarge 입력 19px + heading 서체 + 볼드 = 메인 검색창) |

**전자는 밀집 업무 UI, 후자는 소비자·마케팅 쪽**이라는 `button.md`의 관찰이
68표본에서도 유지됩니다. 다만 **큰 쪽에 두 동기가 섞여 있습니다** —
PIE는 브랜드 표현이고, **Orbit·Origami는 iOS Safari의 16px 자동 확대 임계값**입니다.

**크기 단과 서체 단을 분리하는 진영**도 확인됩니다 — **Vapor**는 sm·md·lg 세 단이
같은 14px을 쓰고 xl만 16px로 오르고, **Vibe**는 5단 중 넷이 14px입니다.
반대로 **Kontur는 크기 3단이 서체까지 비례로 바꿉니다**(14/16/18) —
밀도 3단이 곧 타이포 3단입니다.

### 행간이 컨트롤 높이를 결정합니다 — 세 수법

높이를 선언하지 않는 시스템에서 행간은 타이포 값이 아니라 **레이아웃 값**입니다.

| 수법 | 시스템 |
|------|--------|
| **행간을 높이에서 역산** | **Shoelace**(`calc(높이 − 보더 2px)`) · **Vibes**(`calc(높이 − 2px)`) · Garden · **MUI**(행간 1.75 무단위 → 13×1.75=22.75px 소수 높이) |
| **행간을 1로 죽이고 패딩만 씀** | **Asphalt**(본문은 1.618 황금비인데 **버튼만 행간 1 강제**) · **Origami**(`line-height = font-size`, 튜플 스케일의 행간 16·20px을 버튼에서 버림) · 디지털청(`oln-16B-100` = 행간 1) |
| **본문 행간이 그대로 높이를 지배** | **SGDS**(본문 행간 **2.0** — 표본 최대. 버튼·입력·본문이 같은 Bootstrap 변수를 써서 **가독 행간 결정이 곧 컨트롤 높이 결정**) · Bootstrap 1.5 · Protocol 1.5 |

**"행간을 조정했더니 버튼 높이가 바뀌는" 시스템이 상당수**라는 것이 이 축의 결론입니다.
SGDS가 극단인데, 행간 2.0이 높이 사다리를 등차로 펴는 부작용까지 확인됩니다.

**세로 중앙 정렬의 기준이 갈립니다** — 대부분 행간이지만
**Braid는 캡하이트(capHeight)** 기준으로 상하 패딩을 `(min-height − 캡하이트)/2`로 잡고,
**Porsche는 행간 자체가 `calc(6px + 2.125ex)`** — 폰트의 실제 x-height에 반응합니다.
**`ex` 파생 행간은 표본 유일**입니다.

### 자간을 크기 축에 매핑하는 진영

| 방식 | 시스템 |
|------|--------|
| **크기에 반비례** (작을수록 넓게) | **Pluralsight** — 12px `+0.025em` / 14px `+0.025em` / 16px `+0.01em` / 18px `0`. 자간 토큰 5단을 버튼 크기 축에 매핑 |
| **크기에 비례** (양수 소수) | **Vitamin** — 14px `+0.24px` / 16px `+0.27px` / 20px `+0.34px` |
| **비례식 calc** | **Pharos** — `calc(font-size × −0.02)`가 버튼·입력·모달 본문까지 관통 |
| 대문자 + 넓은 자간 | **Clarity** 12px `0.12em` uppercase · **MUI** `0.02857em` uppercase · Odyssey(다이얼로그 라벨) · Pharos(라벨) · LeafyGreen(12px uppercase) |
| 서브픽셀 리터럴 | **NYSDS** `0.044px` |
| 브랜드 축 | **Tegel** — Scania Sans Semi Condensed(`−0.14px`) ↔ TRATON Type Text(`0`), 테마가 자간을 바꿈 |

**Pluralsight의 반비례와 Vitamin의 비례가 정반대입니다.** 위 "자간 — 방향이
시스템마다 반대입니다" 절의 결론(Apple U자 · Material 단조 증가)이
**컨트롤 층에서도 같은 형태로 재현**됩니다 — 자간 방향은 합의된 적이 없습니다.

### 언어축 — CJK 표본에서만 규칙이 관측됩니다

- **본문 14px 관행**: 중화권 3표본 전부(Ant · Semi · Naive UI)와
  일본 업무 도구(Serendie compact · **Vibes** 폼 기본 `0.875rem/1.5`),
  **Charcoal 컨트롤 14px**. 한국(정부)만 17px 축입니다
- **CJK 조판 속성을 리셋 CSS에**: **SmartHR**이 preflight base에
  **`text-spacing-trim: space-all`**을 둡니다 — Windows Yu Gothic의 기호 과잉 축약 회피.
  같은 시스템이 **스페이싱 단위를 문자 수(1文字 = 16px)로** 두고,
  본문 폰트를 조화수열(6/7 = 13.71px)로 파생시켜 **버튼 높이가 31.7px 소수**가 됩니다
- **셀렉터 층 언어 분기**: **Rakuten ReX**가 `:lang(en)` 1.444 / `:lang(ja)` 1.333
  **행간 분기를 CSS에 배포**합니다. **LINE**은 토큰 이름에 언어 축(EN/JP/TC/TH)을 1급으로 둡니다
- **서체 스택으로 처리**: **Vibes**가 일본어 서체명을 **이중 등재**(구형 브라우저·OS의
  폰트명 해석 차이 대응)하고, **Vibe**는 기본 스택에 **히브리·아랍·일본어 폰트를 명시**합니다
- **역할로 행간을 가르기**: **Serendie**가 라벨 행간 1.0 / 본문 1.6으로 나눕니다
- **CJK 14px와 iOS 16px의 충돌**: **Charcoal**이 16px로 렌더한 뒤
  `transform: scale(0.875)`로 시각 14px을 만들고 전 치수를 `calc(… / 0.875)`로 역보정합니다.
  **두 규칙을 동시에 만족시킨 유일한 해법**이고, 나머지는 한쪽을 포기합니다
  (`form.md`의 "iOS 자동 확대 방지" 절과 교차)

> **정정.** "CJK·아랍어 행간 조정 규칙이 어느 시스템에서도 확인되지 않았습니다"는
> **반증됐습니다** — Rakuten(`:lang()` 행간) · SmartHR(`text-spacing-trim` · 문자 단위 스페이싱) ·
> Serendie(역할별 행간) · Charcoal(scale 역보정) · Vibes·Vibe(서체 스택)가 각각 다른
> 층에서 규칙을 둡니다. **다만 전부 CJK 표본입니다** — 아랍어·RTL 행간 규칙은
> 여전히 shadcn/ui의 `--font-ar`·`--font-he` 서체 슬롯 외에 확인되지 않았습니다.

#### Spectrum — CJK 스케일을 통째로 한 벌 더 둡니다 (2026-08-18)

앞의 6표본이 **한 층**(서체 스택 / 행간 / 리셋 CSS / 셀렉터 분기)에서
규칙을 두는 데 비해, Spectrum은 **크기·행간·굵기·서체 전부를 별도 축**으로 둡니다.
모든 타이포 역할(`heading` · `title` · `body` · `detail` · `code`)에
`-cjk-` 쌍이 있습니다.

| | 라틴 | CJK |
|---|:---:|:---:|
| `body-size-m` | 16px | **14px** |
| `body-size-l` | 18px | 16px |
| `heading-size-l` | 28px | **25px** |
| `heading-size-xl` | 36px | 32px |
| `body-line-height` | 1.5 | **1.7** |
| `heading-line-height` | 1.3 | **1.5** |
| 서체 | Adobe Clean Spectrum VF | **Adobe Clean Han** |

**규칙이 두 방향으로 일관됩니다 — 크기는 한 단계 내리고 행간은 올립니다.**
CJK 크기는 라틴 스케일의 바로 아래 단계와 일치합니다
(`body-cjk-size-m` 14px = `body-size-s` = `font-size-100`).

- **"CJK는 14px" 관행(Ant · Semi · Naive UI · Serendie compact · Vibes ·
  Charcoal)을 Spectrum은 토큰 구조로 표현합니다** — 본문 기본이 라틴 16 / CJK 14입니다.
- **Charcoal이 `scale(0.875)` 역보정으로 푼 문제와 같은 문제**인데,
  Spectrum은 스케일을 두 벌 두는 방식으로 풉니다. 렌더 트릭 없이 값으로 해결합니다.
- 자간도 `cjk-letter-spacing`이 별도 토큰이지만 값은 `0em`으로 라틴과 같습니다.
- **CJK 대응이 서체 교체 한 축을 넘어 스케일 전체로 확장된 유일한 표본입니다.**
  Serendie(역할별 행간) · Rakuten(언어별 행간)이 행간 한 축만 다루는 것과 층위가 다릅니다.

Carbon도 언어 축이 있으나 **서체 슬롯 층**입니다 — `$font-families` 11개 중
7개가 언어별(`sans-arabic` · `sans-devanagari` · `sans-hebrew` · `sans-jp` ·
`sans-kr` · `sans-thai` · `sans-thai-looped`)이고, **태국어만 looped/비looped
두 벌**입니다. 크기·행간 분기는 없습니다.
**아랍어 슬롯을 둔 두 번째 표본**이지만(shadcn/ui `--font-ar`에 이어),
여전히 **행간·자간 규칙은 아랍어·RTL에서 확인되지 않습니다.**

### 유동 타이포 — 네 가지 방식

| 방식 | 시스템 |
|------|--------|
| **`clamp()`** | **Pajamas**(제목 h1~h3, `-fixed` 쌍 동반) · **Seed Design**(전 타이포 토큰이 `clamp(정적×0.8, 계산값×OS배율, 정적×1.5)`) · **Porsche**(2xs~sm 정적 / md~5xl fluid) · Asphalt·Nord·Bolt(치수 쪽) |
| **`calc()` 선형 보간** | **Fleet** — `calc(최소 + 증분 × ((100vw − 시작vp) / vp폭))` + 미디어쿼리 상하한. **`clamp()` 표준화 이전 세대의 원형**이 수식 그대로 남아 있습니다 |
| **반응형 루트 폰트** | **Audi** — 루트가 16 → 18 → 20px로 오르고, 서체·행간이 rem·패딩이 em이라 **버튼 높이 자체가 51 → 57 → 63px로** 따라 커집니다 |
| **브레이크포인트 함수** | **Strapi**(입력 서체 16 → 14px, 행간 24 → 22px) · **Priceline**(반응형 배열 `fontSize: [2, null, 1]` = mobile 16 / desktop 14) · **Mística**(Text3 mobile 16 / desktop 18) · **DSFR**(제목 22/28 → 768px↑ 24/32) · **Nord**(≤480px에서 서체 m→l 자동 승급) · **Carbon**(`expressive-*`·`display-*` 10스타일이 토큰 안에 `breakpoints: (md/lg/xlg/max)` 를 내장 — `display-04` 42 → 68 → 92 → 122 → 156px) |
| **플랫폼 스케일 2벌** (2026-08-18 추가) | **Spectrum** — 18단 전부 `sets: {desktop, mobile}`. 뷰포트 보간이 아니라 **토큰 값 자체가 두 벌**이고 플랫폼이 고릅니다 · **Polaris** — `light-mobile` 테마가 `text-*` 14개를 덮습니다 |

**다섯 번째 방식이 추가됐습니다 (2026-08-18).** Spectrum·Polaris는 위 넷 중
어디에도 속하지 않습니다 — **테마/세트 축으로 스케일을 통째로 교체**합니다.
Spectrum이 컴포넌트 높이를 medium/large 두 스케일로 바꾸던 것과 같은 수법을
타이포에도 씁니다 (`systems/spectrum.md`).

**Polaris는 방향이 일정하지 않습니다** — 본문 계열은 모바일에서 커지는데
(`body-md` 13 → 16px), 큰 제목 둘은 **작아집니다**(`heading-xl` 24 → 22 ·
`heading-lg` 20 → 18). 나머지 표본은 전부 한 방향입니다.
소스에 이유는 적혀 있지 않습니다.

**Carbon은 브레이크포인트를 토큰 값 안에 중첩 맵으로 넣습니다.**
Strapi·Nord가 CSS 미디어쿼리로 분기하는 것과 달리, 값 자체가
`(md: (...), lg: (...))` 구조라 **토큰을 읽는 쪽이 분기를 해석**합니다.
브레이크포인트에서 **굵기까지 바뀝니다** (`expressive-heading-05` 32px/400 → md 36px/300).

**넷의 차이는 "무엇이 연속인가"입니다.** `clamp()`·`calc()`는 크기가 연속이고,
반응형 루트는 **시스템 전체가 통째로** 연속이며, 브레이크포인트 함수는 계단식입니다.

**Audi가 가장 파급이 큽니다** — 타이포 결정 하나가 컴포넌트 치수 전체를 밀어
고정 px 높이 진영과 다른 층에 놓입니다. **Seed Design은 반대로 OS 접근성 배율을
`clamp()` 안에 넣어** 사용자 설정을 토큰 층에서 상하한으로 묶습니다.

### 크기 축을 타이포에 통째로 위임하는 사례

- **Skeleton** — 크기 파라미터가 `--btn-size` 하나이고 **그 값이 폰트 크기 토큰**입니다.
  높이 = `2 × 폰트 − 2px` 산식 파생이고, **크기 변형 13단이 Tailwind 타이포 스케일 전체와 1:1**입니다
  (`btn-9xl` = 폰트 8rem · 높이 254px까지 문법상 존재). 입력도 같은 산식(`--field-size`)
- **Forma 36** — 밀도 축(`-high` 짝)이 서체 → 패딩 → min-height → 라운드까지 관통합니다
- **Kontur** — 크기 3단이 서체·아이콘·간격까지 비례로 바꿉니다
- **Serendie** — 밀도(compact/expanded)가 타이포뿐 아니라 **터치 타깃 크기까지** 바꿉니다

**"크기 변형"이 실제로는 타이포 변형인 시스템이 넷 있습니다.**
Skeleton이 극단이고, 이 구조에서는 **타이포 스케일을 바꾸면 전 컴포넌트 치수가 바뀝니다.**

## 구현 시 기본값

**본문 크기 — 플랫폼으로 갈립니다. 통일할 수 없습니다.**

```
차량        24  (Android Automotive 최소. 이 아래로 못 내려감)
iOS         17  (Apple Body)
웹          16  (다수) 또는 14 (밀도 높은 관리 화면)
```

**웹 기준 16, 밀도가 필요하면 14**로 잡고, iOS·차량은 별도로 둡니다.

**14px 진영이 표본에서 가장 큽니다 — 17개입니다** (2026-08-19 재집계.
2026-08-18 1차 정정에서 13개, 그 이전 판은 7개).
Ant Design · Material 3(Body Medium) · Helios · Evergreen · Seed · Atlassian ·
shadcn/ui · Ring UI · Siemens iX · Serendie(compact) · Vibes · Naive UI · PrimeVue ·
**Primer**(`base.text.size.sm`) · **Cloudscape**(`body-m`) · **Carbon**(`body-short-01`) ·
**Spectrum**(`font-size-100` — **데스크톱 한정**, 모바일은 17px).
**Spectrum을 빼면 무조건부 16개**이고, 16px 진영은 10개입니다.

> 위 "본문 기본 크기" 절의 표는 같은 날 `full` 수집 대형 5종(Spectrum·Primer·Cloudscape·
> Carbon·Polaris) 토큰 경로가 해소되면서 4표본이 늘었는데, 이 절의 숫자가 따라가지
> 못했던 것입니다. **표와 이 절이 어긋나면 표가 기준입니다.**
**관리 화면·엔터프라이즈에 중화권 3표본이 더해진 구성**입니다 (위 "본문 기본 크기" 절).

**토큰 기본값과 컴포넌트 실사용값을 구분해서 정하세요.** shadcn/ui는 토큰이 16px인데
컴포넌트가 전부 14px입니다. 이 불일치가 문서화되지 않으면 구현이 흔들립니다.
**68표본에서 이 권고의 근거가 커졌습니다** — 컨트롤 서체가 본문보다 작은 시스템이
여덟(Bolt 12.8 · Evergreen 12 · Clarity 12 · Charcoal 14 …), 큰 시스템이 넷 확인됩니다.
**"본문 = 컨트롤"은 관행이 아닙니다.**

**입력 필드만 모바일에서 16px로 올리는 것을 검토하세요** (2026-08-18 보강).
iOS Safari의 자동 확대를 막는 처리이며, **shadcn/ui만의 방식이 아니라 일곱 시스템의
공통 문제**입니다 — Bolt(전역 강제) · Nord(`≤480px` 승급) · Strapi(반응형 토큰) ·
Priceline(반응형 배열) · Orbit(입력 서체를 본문보다 크게 16px) · Stacks(`@supports` iOS 분기) ·
**Charcoal**(16px 렌더 후 `scale(0.875)` 역보정). 방식 비교는 `form.md`에 있습니다.

**자간 — 플랫폼별로 나누세요.**

```
iOS       큰 글자 양수 / 중간 음수     (Apple 곡선)
Android   작을수록 양수로 증가          (Material 곡선)
웹        0 또는 큰 제목만 약한 음수    (Pajamas -0.01em 방식)
```

**한 값으로 통일하면 iOS·Android 양쪽에서 어긋납니다.** 이건 취향이 아니라 사실입니다.

`em`을 쓰면 크기에 비례하고 `px`을 쓰면 안 합니다. **`em`을 권합니다** —
Evergreen처럼 px 고정이면 큰 제목에서 자간이 상대적으로 좁아집니다.

**자간을 크기 토큰에 넣을지, Tailwind처럼 독립 유틸리티로 둘지 정하세요.**
독립으로 두면 조합이 자유롭지만 **크기를 바꿀 때 자간이 따라오지 않습니다.**
스케일에 내장하면 일관되지만 예외 자리에서 오버라이드가 필요합니다.

**자간 토큰을 아예 두지 않는 것도 선택지입니다** — Atlassian·Mantine이 그렇습니다.
서체 기본 자간을 신뢰하는 방식이며, 표본에서 소수는 아닙니다.

**단계 수**

```
6~8단계로 시작
```

Protocol이 제목 8단계, Evergreen·Radix Themes가 8~9단계로 운영됩니다.
Mantine은 본문 5 + 제목 6입니다.

**10~16px 구간은 `12 · 14 · 16` 3단계로 충분합니다.** 프레임워크 4개가
예외 없이 그렇게 하고, 11·13·15px을 두지 않습니다.

Seed Design(18단계)처럼 1px 단위로 가려면 **한글·CJK처럼 자소 밀도가 높아
1px 차이가 실제로 보이는 경우**여야 합니다 — 그렇지 않으면 선택 부담만 늘어납니다.

**행간**

```
비율 1.25~1.5  (제목 1.25, 본문 1.5)
```

Pajamas가 제목 전부 1.25로 통일합니다. 크기별 고정 px보다 관리가 쉽습니다.

**비율을 쓸 거면 크기가 커질수록 줄이세요.** 표본 5개 중 4개가 감소 방향입니다
(Mantine만 증가). 큰 글자는 비율이 작아도 절대 간격이 충분합니다.

**행간을 정하기 전에 컨트롤 높이를 어떻게 만드는지 확인하세요** (2026-08-18 추가).
높이를 선언하지 않는 시스템에서 **행간은 타이포 값이 아니라 레이아웃 값**입니다 —
SGDS는 본문 행간 2.0이 버튼·입력 높이 사다리를 그대로 지배하고,
MUI는 무단위 1.75 때문에 버튼 높이가 36.5px 소수로 떨어집니다.
반대 극단이 **행간을 1로 죽이고 패딩만 쓰는 진영**(Asphalt는 본문 1.618인데 버튼만 1,
Origami는 `line-height = font-size`)입니다.
**컨트롤 높이를 정수로 유지하고 싶으면 행간을 px로 고정하거나 높이에서 역산하세요** —
Shoelace·Vibes·Garden이 `calc(높이 − 보더)`로 그렇게 합니다.

**고정 px을 쓸 거면 4px 격자에 맞추는 것을 검토하세요** (Atlassian 방식).
비율은 1.125~1.429로 흔들리지만 절대값이 항상 4의 배수라 레이아웃 계산이 단순해집니다.

다만 **Apple·Material은 크기별 고정 px이므로, 그 시안을 옮길 때는 비율로 환산하지 말고
값을 그대로 쓰세요** — 특히 작은 크기에서 어긋납니다 (Apple Caption 2는 11px에 행간 13px = 1.18).

**본문과 제목 행간을 나눌지 정하세요.** Radix Themes는 작은 단계(14~20px)에서만
제목을 2px 좁힙니다. 24px 이상은 같은 값입니다 — **나눌 필요가 있는 구간이 좁습니다.**

**굵기**

```
400 (본문) · 500 (강조) · 600~700 (제목)
```

**제목 굵기를 하나로 통일하는 것은 표본에서 흔한 선택입니다** (Pajamas 600 ·
Atlassian 653 · Mantine 700). 단 **값은 수렴하지 않았습니다** — 팀이 정해야 합니다.

**컨트롤 굵기는 500에서 시작하세요** (2026-08-18 추가). 68표본에서 500이 다수이고,
양극단이 400(10개)과 800(PIE · Unify 2개)입니다. **볼드 컨트롤(700)이 16개로
소수파가 아니므로** "버튼은 미디엄"을 전제로 두지 마세요 —
**본문 크기 그대로 볼드만 얹는 조합**(16px/700)이 Backpack · Codex · Gestalt ·
Pharos · Thumbprint · 디지털청에서 반복됩니다.

**컨트롤 굵기를 본문 위계와 함께 정하세요.** Stacks는 **버튼 400 · 라벨 700**으로
다수와 뒤집혀 있고, Paste는 버튼 600 / 입력 500, Grommet은 입력값만 600입니다.
**한 시스템 안에서 컨트롤끼리 굵기가 갈리면 굵기가 위계 신호로 못 쓰이게 됩니다.**

**2굵기(400/700) 체계라면 버튼을 어느 쪽에 둘지가 인상을 결정합니다.**
CJK 4표본(KRDS · 디지털청 · Charcoal · Serendie) 전부가 2굵기인데,
**Serendie만 버튼을 400에 두었습니다.**

**9단계(100~900)를 다 두지 마세요.** Tailwind만 그렇게 하고, 가변 서체가 아니면
대부분의 단계에 실제 폰트 파일이 없습니다.

**유동 타이포(`clamp()`)를 쓸 거면 고정 변형도 함께 두세요.**
Pajamas가 모든 단계에 `-fixed` 쌍을 두는 이유입니다 — 표·코드 블록처럼
크기가 흔들려서는 안 되는 자리가 있습니다.
**Porsche는 같은 문제를 크기 구간으로 풉니다** — 2xs~sm(12·14·16px)은 정적,
md 이상만 fluid입니다. **본문·컨트롤 구간을 유동에서 빼는 쪽이 관리가 쉽습니다**
(2026-08-18 추가).

**유동 타이포의 방식은 네 가지입니다** (2026-08-18 추가).

| 방식 | 예 | 파급 |
|------|-----|------|
| `clamp()` | Pajamas · Seed Design · Porsche | 크기만 연속 |
| `calc()` 선형 보간 + 미디어쿼리 상하한 | **Fleet** | `clamp()` 이전 세대. 결과는 같고 식이 길어짐 |
| **반응형 루트 폰트** | **Audi** (16→18→20px) | **컴포넌트 치수 전체가 함께 움직임** — 버튼 51→57→63px |
| 브레이크포인트 함수 | Strapi · Priceline · Mística · DSFR · Nord | 계단식 |

**반응형 루트를 고를 때는 그것이 타이포 결정이 아니라 레이아웃 결정임을 알아야 합니다.**
Audi에서는 rem 서체 + em 패딩 조합 때문에 루트 변경이 컨트롤 높이까지 밀어 올립니다.

**OS 접근성 배율을 지원하려면 `clamp()` 안에 상하한으로 묶는 방법이 있습니다** —
Seed Design이 모든 타이포 토큰을 `clamp(정적×0.8, 계산값×배율, 정적×1.5)`로 감쌉니다.

**런타임 배율(`calc(1rem * var(--scale))`)을 쓸 거면 문서에 배율 기준을 명시하세요.**
Mantine·Radix Themes의 값은 배율 100% 가정값입니다. Radix Themes는 90~110% 사이에서
움직이므로 `--font-size-3`이 14.4~17.6px입니다.

**다국어 대응**

**언어별 서체 슬롯을 둘지 초기에 정하세요.** shadcn/ui가 `--font-ar` · `--font-he`를
둡니다. RTL은 방향 문제만이 아니라 **서체 문제**입니다.

> **정정 (2026-08-18).** "CJK 서체 슬롯을 둔 시스템은 표본에 없습니다"와
> "shadcn/ui가 유일합니다"는 **둘 다 반증됩니다.**
> **LINE**은 언어를 **토큰 이름의 1급 축**으로 둡니다(`$ldsg-en-title-xxl-200` —
> 언어 EN/JP/TC/TH × 타입 × 크기 × 굵기)이고, LDSM 쪽은 스케일에
> **언어별 서체 매핑**(iOS SF Pro · JP Hiragino · ZH PingFang · TH Thonburi ·
> KO Apple SD Gothic Neo)을 동반합니다.
> **Vibe**는 기본 서체 스택에 히브리·아랍·일본어 폰트를 명시하고,
> **Charcoal**은 CJK 전용 오픈소스 서체(Sarasa UI J)를 시스템 서체로 지정합니다.

**세 층 중 어디서 처리할지 고르는 문제입니다** (2026-08-18 정리).

```
토큰 이름 축     LINE (언어 × 타입 × 크기 × 굵기)     — 전면적, 토큰 수가 언어 배수로 늘어남
서체 슬롯        shadcn/ui (--font-ar/-he) · Charcoal   — 값 하나 교체
서체 스택        Vibe · Vibes (일본어명 이중 등재)      — 토큰 없이 폴백 체인으로 처리
셀렉터 분기      Rakuten (:lang(en)/:lang(ja) 행간)     — 크기가 아니라 행간만 다를 때
```

**CJK를 다룰 거면 행간부터 확인하세요.** 크기(14 vs 16 vs 17)보다
**행간이 먼저 어긋납니다** — Rakuten이 같은 스타일에서 `:lang(en)` 1.444 /
`:lang(ja)` 1.333으로 가르고, Serendie는 라벨 1.0 / 본문 1.6으로 역할별로 나눕니다.

**일본어 조판을 다루면 `text-spacing-trim`을 리셋에 넣는 것을 검토하세요** —
SmartHR이 preflight base에 `space-all`을 둡니다(Windows Yu Gothic의 기호 과잉 축약 회피).
**CJK 조판 속성이 시스템 리셋 CSS에 들어간 표본은 SmartHR입니다.**

**아랍어·RTL은 여전히 서체 슬롯 외에 규칙이 확인되지 않았습니다** —
언어별 행간·자간 규칙이 관측된 것은 **전부 CJK 표본**입니다.
본문 크기도 갈립니다 — `i18n/README.md`를 함께 보세요.

## 판단 지침 — 스타일 사용 규정 실측 (2026-08-18)

7개 시스템의 타이포 사용 지침을 직접 읽었습니다. 자리 배정의 공통 뼈대:
**"헤딩은 외형이 아니라 위계로 선택"(Cloudscape 명문) + h1은 페이지당
1개(Atlassian·Cloudscape 동일) + 레벨 건너뛰기 금지.**

- **Cloudscape가 자리별로 가장 구체적**: Heading XL=페이지 제목(h1) →
  L=컨테이너 → M=카드 섹션·키/값 컬럼 → S=문단 제목 → XS=문단 내 구획.
  Body S=폼 설명·제약·에러. Display large=홈 타이틀·대시보드 숫자.
  monospace는 코드·수치·타임스탬프·IP·ID에만. **12px 미만 금지**
- **M3 역할 규정**: Display="짧고 중요한 텍스트나 숫자 전용, 큰 화면" ·
  Body 장문에 "장식적 서체 금지" · **"버튼은 label large"**. 행간 규칙:
  큰 스타일 1.2× / 본문 1.5×, 값이 바뀌는 곳·표에 tabular numbers
- **Atlassian은 크기-컴포넌트 짝을 명시**: Heading M↔모달(Body M과 짝) ·
  S·XS↔flag류 · XXS↔fine print(Body S와 짝). **"볼드·크기 변경이 아니라
  heading 스타일을 쓸 것"**
- **Carbon은 2세트 축**: productive(-01, 14px 기반)=밀도 높은 제품 UI /
  expressive(-02, 16px)=웹페이지. label-01은 "필드 라벨·에러·캡션용,
  본문 금지". body-compact=4줄 이하 / body=4줄 초과 — **문단 길이로
  스타일을 가르는 유일 표본**
- **Spectrum은 포맷 금칙이 특징**: Italic은 placeholder·캡션에만 ·
  **밑줄은 링크에만(강조 수단 금지)** · 커스텀도 정의된 크기 목록에서만 ·
  본문 폭 50~120자(이상 70자)
- **GOV.UK**: 본문 19px 고정("대부분 표준 19px 유지") · lead paragraph
  24px는 **페이지당 1회** · caption-*으로 상위 섹션 소속 표시 ·
  장문 페이지는 헤딩 스케일 한 단계 격상(h1=xl)
- Polaris 현행: 스타일 배치 규정 대폭 축소 — Heading이 **섹션 중첩
  깊이로 h2/h3/h4를 자동 할당**(수동 지정 불가)하는 구조 규정만 남음

## 아직 못 채운 것

- ~~스타일 사용 지침~~ → **해소 (2026-08-18)** — 위 "판단 지침" 절
- ~~CarPlay 타이포~~ → **값이 없음이 확인됨 (2026-08-18)** — HIG CarPlay 페이지
  전문(DocC JSON, 7.4KB)에 폰트·크기 수치가 0건입니다. CarPlay는 시스템이
  템플릿을 렌더링하는 구조라 앱 개발자용 타이포 규격 자체가 존재하지 않습니다
  (`systems/carplay.md`의 "템플릿 기반" 구조와 정합)
- ~~컨트롤(버튼·입력) 서체 크기·굵기 분포~~ → **해소 (2026-08-18)** —
  위 "68표본 재종합" 절. 굵기 400(10) / 450(2) / 500(다수) / 600(10) / 700(16) / 800(2),
  컨트롤이 본문보다 작은 진영 8 · 큰 진영 4
- ~~유동 타이포의 방식~~ → **해소 (2026-08-18)** — 네 가지(`clamp()` · `calc()` 선형 보간 ·
  반응형 루트 · 브레이크포인트 함수). 위 재종합 절
- **다국어 대응 규격** — ~~CJK·아랍어 행간 조정 규칙이 어느 시스템에서도 확인되지 않았습니다~~
  → **CJK 한정 해소 (2026-08-18)**, 반례가 6건으로 늘었습니다:
  Rakuten ReX(`:lang(en)` 1.444 / `:lang(ja)` 1.333 행간 분기) ·
  LINE(토큰 이름의 언어 축 EN/JP/TC/TH + 언어별 서체 매핑) ·
  SmartHR(`text-spacing-trim: space-all` 리셋 + 문자 수 스페이싱) ·
  Serendie(라벨 1.0 / 본문 1.6 역할별 행간) ·
  Charcoal(CJK 14px과 iOS 16px을 `scale(0.875)` 역보정으로 동시 충족) ·
  Vibes·Vibe(서체 스택 층 처리). 위 "다국어 대응" 절.
  **관측된 규칙이 전부 CJK 표본이라는 점은 그대로입니다** —
  **아랍어·RTL은 서체 슬롯(shadcn/ui `--font-ar`·`--font-he`, Vibe 기본 스택) 외에
  행간·자간 규칙이 여전히 확인되지 않았습니다**
- ~~**Spectrum · Polaris · Primer · Cloudscape 타이포** — 토큰 경로 미확인~~
  → **전건 해소 (2026-08-18)**, Carbon 보강 포함. 경로는 전부 npm 배포본 안에 있었습니다:
  `@adobe/spectrum-tokens@15.0.0` `src/typography.json` + 역할별
  `src/{heading,title,body,detail,code}.json`(CJK 쌍 포함) /
  `@shopify/polaris-tokens@9.4.2` `dist/cjs/src/themes/base/{font,text}.js`
  (**npm에 `src/`가 없어 컴파일 산출물에서 읽음**) /
  `@primer/primitives@11.10.0` `src/tokens/base/typography/typography.json5` +
  `dist/css/functional/typography/typography.css` /
  `@cloudscape-design/design-tokens@3.0.107` `index.scss`의 `$font-*`·
  `$line-height-*`·`$letter-spacing-*` /
  `@carbon/type@11.65.0` `scss/_styles.scss`(타입 스타일 34종)·`scss/_font-family.scss`.
  결과는 위 "단축 속성 토큰" · "Spectrum 플랫폼 2벌" · "굵기 상한" ·
  "대형 5종의 자간 방향" · "Spectrum CJK 스케일" 절과 각 `systems/*.md`.
  (Atlassian은 앞서 해결 — `dist/cjs/artifacts/tokens-raw/atlassian-typography.js`)
- **Mantine 제목 자간·서체** — 크기·굵기·행간만 CSS 변수로 노출됩니다
- ~~**shadcn/ui 8개 스타일 변형**(`luma`~`vega`)의 타이포 차이 — `styles/` 디렉터리 미확인~~
  → **해소 (2026-08-18)** — `apps/v4/styles/`는 gitignore 대상 빌드 산출물이었고
  소스는 `apps/v4/registry/styles/style-*.css` 8개입니다. 버튼 서체가
  `text-sm medium`(5개) / `text-xs medium`(`lyra`·`mira`) /
  **`text-xs semibold tracking-widest`**(`sera` — 자간 0.1em 편집디자인 문법)로 갈립니다
  (`systems/shadcn-ui.md`). **크기가 가장 큰 스타일이 글자는 가장 작은** 구성입니다
