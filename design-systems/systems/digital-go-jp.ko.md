---
name: 디지털청 디자인시스템 (デジタル庁)
org: 일본 정부 (Digital Agency)
coverage: partial
url: https://design.digital.go.jp
repo: https://github.com/digital-go-jp/design-tokens
license: MIT
tech: [CSS]
figma_kit: true
tokens_format: [CSS]
a11y_target: 미확인
platform: web
domain: public
verified: 2026-08-18
source: "npm @digital-go-jp/design-tokens@2.0.1 → dist/tokens.css · npm @digital-go-jp/tailwind-theme-plugin@1.0.1 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](digital-go-jp.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

일본 정부 시스템. **행간이 1~1.75 순비율 8단계**(표본 최다)이고 굵기가 **400/700 둘**,
스케일에 **17px**이 있습니다 — CJK 타이포 공백을 처음으로 채우는 표본입니다.

## 토큰 — 241개

`--color` 198 · `--font` 19 · `--line` 8 · `--elevation` 8 · `--border` 8.
**스페이싱 토큰이 없습니다** — Apple HIG·Material 3·Seed·Evergreen 계열의 다섯 번째.

### 타이포그래피 — CJK 첫 실측

크기 15단계 (이름 = px 값):

```
14 · 16 · 17 · 18 · 20 · 22 · 24 · 26 · 28 · 32 · 36 · 45 · 48 · 57 · 64
```

- **17px이 있습니다** — Apple(17pt Body) · KRDS(body.medium 17px)에 이어 셋째.
  **셋 다 CJK 문맥입니다** (iOS 글로벌 / 한국 정부 / 일본 정부).
  용도 지정은 토큰에 없어 본문 기본인지는 미확정입니다
- **45 · 57이 Material 3의 Display Medium/Large와 정확히 같은 값**입니다 —
  36/45/57 상단이 M3 스케일과 일치합니다. 소스에 관계 언급은 없습니다
- 14~28px 구간이 2px 단위로 촘촘합니다 (+17 예외)

**행간 — 순비율 8단계, 표본 최다:**

```
1 · 1.2 · 1.3 · 1.4 · 1.5 · 1.6 · 1.7 · 1.75
```

표본 다수는 행간이 크기별 고정 px이거나 비율 1~3개입니다
(`patterns/typography.md`). **1.7 같은 느슨한 단계까지 여덟을 두는 것은
디지털청뿐입니다** — 일본어 본문 관행(느슨한 행간)이 스케일 폭에 반영된
형태이나, 근거는 소스에 없습니다.

**굵기 — 400 · 700 둘뿐:**

KRDS(Regular/Bold)와 정확히 같은 구성입니다. **CJK 정부 시스템 둘 다
굵기 2단계입니다** — 100 단위 9굵기(Tailwind·Chakra)의 반대 극단.
CJK 서체의 실제 웨이트 파일 수와 맞물리는 자리이지만 근거는 미기재입니다.

서체: **Noto Sans JP** / Noto Sans Mono.

### 컬러 — 4계열

```
primitive 151 · neutral 26 · key 13 · semantic 8
```

**`key` 계열이 별도입니다** — 시맨틱(8)과 원시(151) 사이에 브랜드 핵심색
13개를 둡니다. Seed의 `static` 3계층과 비슷한 자리, 다른 이름입니다.

### 라운드 — 이름이 px 값

```
--border-radius-4/6/8/12/16/24/32 + full(624.9375rem = 9999px)
```

Primer식 값-이름 방식. **`full`을 rem으로 환산해 둔 것**(9999px ÷ 16)은 표본 유일 표기입니다.

### 엘리베이션 — 8단계 이중 그림자

`--elevation-1`~`8`, 전 단계가 **확산 그림자 + 근접 그림자 2겹 조합**입니다.

## 컴포넌트

~~토큰 패키지에는 없습니다.~~ → npm엔 없지만 **GitHub 공식 저장소로 배포**됩니다
— 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

npm에는 컴포넌트 패키지가 없고(검색 API 확인 — `@digital-go-jp` 스코프는
design-tokens · tailwind-theme-plugin · abr-* 뿐), 공식 컴포넌트는
**`digital-go-jp/design-system-example-components-react` v2.7.0** (GitHub,
MIT, 최근 커밋 2026-08-05) + 같은 내용의 `-html` 판입니다. 46개
(Accordion~UtilityLink, +deprecated/v1). 구현이 CSS 배포가 아니라
**Tailwind 클래스 문자열 export**입니다 (`@digital-go-jp/tailwind-theme-plugin@1.0.1`
전제) — shadcn식 소스 복사 배포의 정부판.

### 버튼 — 4단, 작은 버튼은 가상요소로 44px 히트영역

| | lg | md | sm | xs |
|---|:--:|:--:|:--:|:--:|
| min-height | **56px** | 48px | 36px | 28px |
| min-width | 136px | 96px | 80px | 72px |
| 라운드 | 8px | 8px | 6px | 4px |
| 패딩 (x/y) | 16/12px | 16/8 | 12/2 | 8/2 |
| 서체 | 16px·700·행간 1 | 동일 | 동일 | **14px**·700 |

- **sm·xs는 `after:` 가상요소를 세로로 늘여 44px 히트영역을 보장합니다** —
  시각 높이 28px 버튼도 터치 타깃은 44px. WCAG 2.5.5/Apple 44pt의
  코드 구현이며, 시각 크기와 타깃 크기를 분리한 표본 드문 사례입니다.
- 변형 solid-fill / outline / text 3종 — **셋 다 hover에서 밑줄이 생깁니다**
  (상태 표시를 색 변화에만 의존하지 않음).
- solid-fill의 보더가 **4px double(배경과 동색)** — 평소엔 안 보이고
  forced-colors 모드에서 윤곽으로 살아남는 장치입니다.

### 입력 — placeholder를 타입에서 금지

높이 3단 `sm/md/lg` = **40/48/56px, 기본이 lg(56px)**. 라운드 8px,
보더 1px(solid-gray-600), hover에서 검정.

- **`placeholder?: never`** — TypeScript 타입이 placeholder 속성 자체를
  금지합니다. "라벨을 써라"의 타입 시스템 강제, 표본 유일.
- read-only는 **점선 보더**로 구분 (배경색이 아니라 보더 스타일로).

### 모달 — 네이티브 dialog + 컨테이너 쿼리

- `<dialog>` 요소 + `::backdrop`. 콘텐츠 라운드 8px, **보더 1px 검정**,
  min-width `min(30rem, 100cqw - 2rem)` — 컨테이너 쿼리 단위(cqw)로 폭 하한.
- 폭 프리셋이 없습니다 — `--modal-dialog-width` 변수(기본 fit-content).
- dialog 자체는 `color-scheme: dark`, 콘텐츠 박스는 light —
  스크림·스크롤바만 다크 처리하는 이중 색 스킴.
- 위아래 `shrink-[9999]` 스페이서(기본 120px, 최소 16px) — 내용이 넘치면
  여백부터 줄어드는 신축 구조.
- 닫기가 아이콘 단독이 아니라 **X + "閉じる" 텍스트 병기**.

### 포커스 — 노랑 안쪽 + 검정 바깥 이중 링

전 컴포넌트 공통: `ring 2px yellow-300`(요소에 밀착) + `outline 4px black
offset 2px`(그 바깥). GOV.UK 계열과 같은 노랑+검정 2색인데 **검정이 바깥**
입니다. text 변형 버튼은 focus에서 배경 자체가 노랑으로.

출처: 저장소 `src/components/*/​*.tsx` 실측, 라운드·타이포 클래스 실값은
`@digital-go-jp/tailwind-theme-plugin@1.0.1` `dist/index.es.js`에서 해석
(`rounded-8`=8px, `oln-16B-100`=16px/700/행간1, `std-16N-170`=16px/400/1.7).

## 특징적 결정

- **행간 순비율 8단계** — 표본 최다. CJK 행간 축의 첫 데이터
- **굵기 400/700** — KRDS와 동일한 2단계. CJK 정부 공통 패턴 (표본 2/2)
- **17px 보유** — 세 번째, 전부 CJK 문맥
- 상단 크기(36/45/57)가 **Material 3 Display와 일치**
- **스페이싱 토큰 없음** — 다섯 번째
- `key` 컬러 계열 — 원시/시맨틱 사이 브랜드 층
- 공공 6표본째: 스페이싱 없음까지 포함하면 공공의 공통 관행은 여전히 **접근성 구조뿐**

## 접근성

고대비·색 대비 토큰은 이 패키지에 없습니다. JIS/WCAG 목표 미확인.

## 참고

- 토큰: `npm pack @digital-go-jp/design-tokens@2.0.1` → `dist/tokens.css`
- 컴포넌트: GitHub `digital-go-jp/design-system-example-components-react`
  v2.7.0 (MIT) — 위 심화 절 (2026-08-18)
- **남은 확인 사항:** 크기별 용도(본문 기본 확정), 컬러 primitive 구조,
  Figma 킷 상세, 라이선스(토큰 패키지 — 컴포넌트 저장소는 MIT 확인)
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github digital-go-jp/design-tokens → `LICENSE` (npm `@digital-go-jp/design-tokens@2.0.1` 메타와 일치)
