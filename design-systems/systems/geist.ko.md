---
name: Geist
org: Vercel
coverage: partial
url: https://vercel.com/geist/introduction
repo: null
license: "미확인 (vercel.com/design.md·vercel.com/geist/vercel-brand.css 어느 쪽에도 라이선스 문구가 없음. 서체는 별도 패키지 — npm geist@1.7.2, SIL OFL-1.1, github.com/vercel/geist-font)"
tech: [React]
figma_kit: "미확인 (타이포그래피 문서가 클래스의 근거를 Geist Core Figma system 이라고 밝히나, 그 파일의 공개 여부는 확인하지 못함)"
tokens_format: [CSS, Tailwind]
a11y_target: "WCAG AA (버전 미표기 — 2026-09-03 확인)"
platform: web
domain: enterprise
verified: 2026-09-03
source: "vercel.com/geist/{introduction,colors,typography,grid} + vercel.com/geist/vercel-brand.css (108KB) + vercel.com/design.md (369줄), 2026-09-03 수집"
---
<!-- lang-links -->
> [English](geist.md) · **한국어**
<!-- /lang-links -->

## 한 줄

Vercel의 시스템 — 본문 스케일이 **줄 수를 기준으로 둘로 갈라지고**(`Label` 한 줄,
`Copy` 여러 줄), 모든 색 스케일이 **10단계 각각에 고정된 역할**을 부여하며, 브랜드 층을
**에이전트용 Markdown 파일과 별도 스타일시트로 분리**해 값이 모델 컨텍스트에 들어가지
않게 했다.

## 토큰

> **출처가 둘, 범위도 둘이다.** 아래 타입·색 스케일은 문서화된 Geist 파운데이션이다.
> 그 뒤의 수치 토큰 표는 `vercel-brand.css`에서 나왔고, 이 파일은 **브랜드 리포트 페이지**로
> 범위가 한정된다. 제품 전체 표면이 아니다. 같은 층이 아니므로 나눠서 기록한다.

### 타이포그래피 — 세 역할, 픽셀 크기로 명명

```
Heading   72 · 64 · 56 · 48 · 40 · 32 · 24 · 20 · 16 · 14
Copy      24 · 20 · 18 · 16 · 14 · 13        (+ mono 13)
Label     20 · 18 · 16 · 14 · 13 · 12        (+ mono 14 · 13 · 12)
Button    16 · 14 · 12
```

- **`Label`과 `Copy`가 본문 스케일을 줄 수로 가른다.** 출처는 Label을 한 줄용으로,
  아이콘과 짝지을 넉넉한 행간을 준 것으로 설명하고, Copy를 여러 줄용으로 행간이 더 높다고
  설명한다. 둘은 13–20px 구간에서 겹친다 — **같은 크기가 두 이름으로 두 번 존재한다.**
- **Tailwind 클래스로 소비한다**(`text-copy-16`, `text-label-14-mono`). 각 클래스가
  `font-size`·`line-height`·`letter-spacing`·`font-weight`를 한꺼번에 미리 묶는다.
  출처는 이 조합의 근거를 "Geist Core Figma system"이라고 밝힌다.
- **타이포그래피 클래스 안에 중첩한 `<strong>`이 Strong 수식어** — 굵기 변형을 별도
  클래스가 아니라 HTML 중첩으로 표현한다.
- `text-label-13`에 tabular 숫자가 명시돼 있고, mono 변형은 14 이하에만 있다.

### 색 — 10개 스케일, 단계마다 고정된 역할

스케일: `Backgrounds` · `Gray` · `Gray alpha` · `Blue` · `Red` · `Amber` · `Green` ·
`Teal` · `Purple` · `Pink`. 지원 브라우저·디스플레이에서는 P3를 쓴다.

| 단계 | 문서가 밝힌 역할 |
|------|------------------|
| 1–3 | 컴포넌트 배경 — 기본 / 호버 / 활성 |
| 4–6 | 테두리 — 기본 / 호버 / 활성 |
| 7–8 | 고대비 배경 — 기본 / 호버 |
| 9–10 | 텍스트와 아이콘 — 보조 / 주 |

- **단계 번호가 모든 스케일에서 역할을 나른다.** 4단계는 Gray든 Blue든 기본 테두리다.
- 페이지 배경은 별도의 두 값이다 — Background 1(기본)과 Background 2. 출처는 후자를
  미묘한 배경 구분이 필요할 때 아껴 쓰라고 적었다.
- 9–10단계는 접근 가능한 텍스트·아이콘용으로 설계했다고 출처가 밝힌다.

### 브랜드 리포트 토큰 세트 (`vercel-brand.css`)

커스텀 속성 선언 120개, 전부 `--vbg-` 접두사. 색은 **`light-dark()`로 감싼 `oklch()`** 로
적어 두 테마가 한 선언에 들어간다.

```
space   1..16 → 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 px   (base 4)
type    metadata/label .8125 · compact .875 · body 1 · lede 1.125 · subsection 1.25 ·
        section 1.5 · title 2 · page-title 2.5 · display 3 rem
leading caption 18 · compact 20 · body 24 · subsection 26 · lede 28 · section 32 ·
        title 40 · page-title 48 · display 56 px   (고정 px)
weight  regular 400 · heading 450 · medium 500 · semibold 600
radius  8px · small 6px
```

- **`weight-heading: 450`** — regular와 medium 사이에 놓인 비표준 가변 폰트 굵기. 이 세트의
  유일한 제목 굵기다.
- **글줄 길이와 폭이 레이아웃 코드가 아니라 토큰이다** — `reading-width 68ch` ·
  `title-measure 24ch` · `compact-title-measure 30ch` · `display-measure 20ch` ·
  `content-width 1200px` · `chart-min-width 640px`.
- **컨트롤 높이가 둘**이다 — `control-height 36px`, `control-height-touch 44px`.
- **간격을 의미론적 flow 이름으로 재수출한다** — `flow-tight` → space-2,
  `flow-copy` → space-4, `flow-group` → space-8, `flow-section` → space-16. 원 단계와
  리듬 역할 양쪽으로 지칭할 수 있다.
- 차트 계열 색(`chart-1`..`chart-6`)은 **전부 회색으로 해석된다**(`gray-1000/900/800`의
  반복). 기본값으로는 데이터 계열에 색상을 배정하지 않는다.

## 컴포넌트

Geist 사이트에 **72개 문서화**:

Avatar · Badge · Banner · Book · Breadcrumbs · Browser · Button · Calendar · Checkbox ·
Choicebox · Clearable Input · Code · Code Block · Collapse · Combobox · Command Menu ·
Context Card · Context Menu · Copy Button · Description · Destructive Action Modal ·
Dots Menu · Drawer · Empty State · Entity · Error · Error Card · Feedback · Fieldset ·
File Tree · Gauge · Grid · Input · JSON View · Keyboard Input · Label · Load More Button ·
Loading Dots · Menu · MiddleTruncate · Modal · Multi Select · Note · Pagination · Phone ·
Pill · Progress · Project Banner · Radio · Relative Time Card · Scroller · Search Input ·
Select · Separator · Sheet · Show more · Skeleton · Slider · Snippet · Spinner ·
Split Button · Status Dot · Switch · Table · Tabs · Text With Copy Button · Textarea ·
Theme Switcher · Toast · Toggle · Tooltip · Video

**컴포넌트는 문서화돼 있으나 배포되지 않는다.** npm 레지스트리에서 `@vercel/geist`는
404다(2026-09-03 확인). 공개된 `geist` 패키지는 **서체뿐**이다.

> **`@geist-ui/core`와 혼동하지 말 것** — `github.com/geist-org/geist-ui`의 별개 커뮤니티
> React 라이브러리로, Vercel의 Geist와 무관하다.

## 특징적 결정

- **본문 스케일을 크기가 아니라 줄 수로 가른다.** Label(한 줄)과 Copy(여러 줄)이 모두
  13–20px를 덮으므로, 텍스트 스타일을 고르려면 먼저 몇 줄짜리인지부터 답해야 한다. 표본의
  나머지에서 본문 스케일은 크기 사다리 하나다.
- **역할이 토큰 이름이 아니라 단계 번호에 붙어 있다.** 10개 스케일 전부에서 1–3단계가
  컴포넌트 배경, 4–6단계가 테두리이므로, 색상만 바꾸고 인덱스를 고정하면 의미 층에 닿는다.
- **에이전트용 브랜드 층이 산문과 스타일시트로 쪼개져 있다.** `vercel.com/design.md`는
  판단을 담고 수치가 거의 없다. 값은 `vercel.com/geist/vercel-brand.css`에 있고 브라우저가
  렌더 시점에 불러온다. `../INTEROP.ko.md` §6 참고 — **파일명이 같아도 Google Labs의
  `DESIGN.md`와는 다른 계약이다.**
- **브랜드 층이 자기가 거부하는 안티패턴을 이름으로 지목한다.** `design.md`는 알아보기 쉬운
  생성형 디자인 기본값 열여덟 가지가량을 피하라고 나열한다 — 장식용 그라디언트와 글로,
  가운데 정렬 히어로 문구 아래 카드 그리드, 카드 안의 카드, 평범한 메타데이터에 쓰는 배지,
  어두운 둥근 사각형으로 감싼 차트, 직접 레이블을 대신하는 범례 등. 그리고 이를 피하는 일이
  메마른 반(反)디자인 템플릿으로 굳어서는 안 된다고 덧붙인다.
- **차트 색은 기본값에서 보류한다.** 차트 계열 여섯 자리가 전부 회색으로 해석된다.
  `design.md`의 접근성 절은 색에만 의존하지 말라고 적었다.
- **CSS API가 동의어를 금지한다.** `design.md`는 공개된 자식 클래스 이름을 정확히 쓰라고
  지시하고, 지어내면 안 되는 예로 `vbg-stat-detail` 대신 쓴 `vbg-stat-note`를 든다.
  셸/레이아웃·타입/증거·계산기 묶음에 걸쳐 `.vbg-` 클래스 133개가 공개돼 있다.

## 접근성

- **명시 목표는 WCAG AA이고 버전은 없다** — `design.md`의 접근성 절이 WCAG AA를 충족하고
  색에만 의존하지 말라고 적었다. 파일에 2.1이나 2.2는 나오지 않는다.
- 색 문서는 시스템을 고대비·접근 가능이라 설명하고, 각 스케일의 9–10단계를 접근 가능한
  텍스트·아이콘 단계로 지정한다.
- `design.md`는 랜드마크, 서술적인 `h1` 하나, 순서 있는 제목 단계, 건너뛰기 링크, 네이티브
  컨트롤, 의미론적 표, 보이는 포커스, 대체 텍스트를 추가로 요구하고, 소스 순서를 읽는
  순서로 다루라고 적었다.
- 명시된 반응형 규칙: 그리드·플렉스 자식에 `min-width: 0`을 주고, 줄이기 전에 재배치하며,
  보이는 테마 전환 컨트롤 없이 라이트·다크 양쪽에서 쓸 수 있게 유지할 것.
  `.vbg-skip-link`와 `.vbg-visually-hidden`이 공개 클래스로 있다.

## 참고 자료

- Geist 소개 — https://vercel.com/geist/introduction
- 색 — https://vercel.com/geist/colors
- 타이포그래피 — https://vercel.com/geist/typography
- 그리드 — https://vercel.com/geist/grid
- 에이전트용 브랜드 파일 — https://vercel.com/design.md
- 브랜드 스타일시트(토큰 출처) — https://vercel.com/geist/vercel-brand.css
- 서체 — `npm geist@1.7.2` (SIL OFL-1.1) · https://github.com/vercel/geist-font
- 발표 글 — https://vercel.com/blog/how-our-agents-build-on-brand-pages-with-design-md
