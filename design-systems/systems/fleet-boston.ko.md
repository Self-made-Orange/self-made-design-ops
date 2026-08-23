---
name: Fleet (Boston Patterns)
org: 보스턴시 (City of Boston Digital Team)
coverage: partial
url: https://patterns.boston.gov
repo: https://github.com/CityOfBoston/patterns
license: "이중 구조 — 코드 CC0-1.0 (package.json 명기) / 시 마크·트레이드 드레스 재사용 금지 (README 명문)"
tech: [Stylus, PostCSS, Fractal, Stencil 웹컴포넌트]
figma_kit: 미확인
tokens_format: [Stylus 변수, 공개 CSS 실측]
a11y_target: 미확인
platform: web
domain: government(municipal)
verified: 2026-08-18
source: "patterns.boston.gov/css/public.css (184,235B — 리포 develop과 라이브 동일 크기 확인) + github CityOfBoston/patterns@55b4676056 → stylesheets/variables/*.styl"
---
<!-- lang-links -->
> [English](fleet-boston.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

보스턴시 패턴 라이브러리 — **색 이름이 지역 정체성인**(Charles Blue ·
Freedom Trail Red · Optimistic Blue) 시정부 표본입니다. 타이포가
Montserrat/Lora 2서체 + **`calc()` 유동 수식**(clamp 이전 세대의 유동 타이포 —
코퍼스 희귀 표본)이고, **border-radius 0 진영**(장식 radius 전무)이며,
버튼 hover가 파랑→빨강으로 **브랜드색 교대**합니다. 리포는 2026-04 push —
**현역**.

## 소스 상태 · 라이선스 이중 구조

- 리포 `CityOfBoston/patterns`: 2016-06 생성, **최종 push 2026-04-16 (현역)**,
  기본 브랜치 develop. GitHub API license 필드는 None이나
  **package.json에 `"license": "CC0-1.0"`** 명기.
- README 첫머리에 상반 조항: "이 프로젝트는 보스턴시 디지털 자산의 마크와
  트레이드 드레스를 포함하며 **시의 명시 허가 없이 재사용 불가**" —
  **코드는 퍼블릭 도메인, 정체성은 잠금**. 정부계 이중 라이선스의 명시 표본
  (uswds·govuk의 단일 라이선스와 대비).
- 값 검증 경로 2중: 라이브 `css/public.css`(184,235B)와 스크래치 수집본이
  바이트 동일 + 리포 `stylesheets/variables/*.styl` 원본 대조.

## 컬러 — 이름이 지리입니다

`variables/_colors.styl` 명명 팔레트 (public.css 실측 고유 헥스 **20종**):

| 이름 | 헥스 | 비고 |
|------|------|------|
| Charles Blue | #091F2F | 주 다크 — 찰스강. css 내 167회 |
| Optimistic Blue (light/dark) | **#1871BD (동일값)** | 주석상 light/dark 구분인데 **실값이 같음** — 2019-01 개명 리팩터의 흔적 |
| Optimistic Blue SR | #28A7DF | "screen readers" — **대비 실패를 색으로 패치**한 주석 명문 |
| Optimistic Blue hover | #175182 | |
| Freedom Trail Red light/dark | #FB4D42 / #D22D23 | light=다크 배경용 · dark=흰 배경 텍스트용 — **대비 방향별 이원화** |
| Yellow | #FCB61A | hover는 `darken($yellow, 20)` 산식 (#AE7902로 출력) |
| Body Text | #58585B | 본문 회색 |
| Grey 000~300 | #F3F3F3 · #E0E0E0 · #C8C8C8 · #828282 | 4단 |

- **-light/-dark가 명도 램프가 아니라 "어느 배경 위 텍스트인가"의 축** —
  주석에 사용처가 조항처럼 붙어 있습니다 (focus = Optimistic light ·
  error 테두리 = Freedom light · error 텍스트 = Freedom dark).
- 시맨틱 별도 팔레트 없음 — 오류·포커스도 브랜드색을 재지정해서 씁니다.

## 타이포 — calc() 유동 수식 (희귀 표본)

서체: **Montserrat**(Arial 폴백 — 견출·버튼·대문자) + **Lora**(Georgia 폴백 —
본문 세리프). 시정부에서 세리프 본문은 드문 선택.

**유동 타이포가 `clamp()`가 아니라 `calc()` + 미디어쿼리 상하한**입니다
(수식 원문, public.css 실측):

```css
.h1  { font-size: calc(30px + 45 * ((100vw - 480px) / 960)); }  /* 480→1440px에서 30→75px */
@media (min-width:1440px) { .h1 { font-size: 75px } }            /* 상한 고정 */
.btn { font-size: calc(14px + 2 * ((100vw - 480px) / 960)); }    /* 14→16px */
.hro-t--l { font-size: calc(45px + 45 * ((100vw - 420px) / 860)); } /* 히어로 45→90px */
```

- 패턴: `calc(최소 + 증분 * ((100vw - 시작vp) / vp폭))` — **선형 보간을
  손으로 편 것**. clamp() 표준화(2020) 이전 세대의 유동 타이포 원형이
  현역 사이트에 살아 있는 표본 → `patterns/typography.md` "유동 스케일"
  절(Pajamas clamp() · Mantine/Radix 런타임 배율)의 **제3형**으로 교차.
  rem 계열 수식(`calc(.875rem + .125 * ((100vw - 30rem) / 60))`)도 병존.
- 고정 스케일은 `_fonts.styl`의 8단: 12/14/16/18/20/25(1.4rem "fixed")/
  ~26.7(1.6667rem)/45px(2.8125rem) — 주석의 "~20px"는 오기(1.6667rem≈26.7px).
  실측 고정 px 최대는 75px(h1 상한), 히어로 확장형만 90px.
- 행간 8단(1/1.1/1.2/1.32/1.5/2/2.5/3.5) · 보더 8단(0~10px, 0.222rem 같은
  분수 rem 끼움) · 스페이싱 12단(0~4rem, **275·450 같은 중간 삽입 단계** —
  GLOSSARY 이름-값 역전 계열).

## 컴포넌트 — radius 0 진영, hover가 브랜드 교대

- **border-radius 장식 용도 0** — public.css의 radius는 0/50%/100%(원형)뿐.
  govuk·nysds와 같은 각진 정부 진영의 시정부 표본.
- 버튼: Montserrat 700 대문자 + letter-spacing 1px · padding 1.25rem ·
  radius 없음 · **기본 파랑(#1871BD) → hover 시 Freedom Trail Red(#FB4D42)** —
  hover가 명도 변화가 아니라 **브랜드 제2색으로 교대**하는 드문 규칙.
- 색 변형 4종(기본 블루 · `--w` 흰/파랑 · `--y` 옐로 · `--c` Charles Blue) +
  `--br` 3px 테두리형 + hover 오버라이드(`--r-hov`/`--w-hov`) — 각 변형이
  hover 색을 따로 규정 (옐로는 #AE7902 다크닝, 흰색형은 흰 배경+빨강 텍스트).
- 브레이크포인트 7단(480/768/840/980/1280/1300 + 1440 타이포 상한) —
  **840·980·1300 같은 비관행 값** (콘텐츠 맞춤 경계).
- 빌드는 Stylus→PostCSS, 문서는 Fractal, 신규 컴포넌트는 Stencil 웹컴포넌트
  (`web-components/` 병행) — CSS 라이브러리에서 WC로 이행 중인 단면.

## 특징적 결정

- 색 이름 = 도시 지리·역사 (Charles Blue · Freedom Trail Red) —
  네이밍이 브랜딩 문서를 겸하는 표본
- calc() 선형 보간 유동 타이포 — clamp 이전 세대 원형, 수식 원문 확보
- -light/-dark를 명도가 아니라 **배경 대비 방향**으로 정의 + SR 전용 색상
- radius 0 + hover 브랜드색 교대 — 각지고 선명한 시정부 아이덴티티
- 코드 CC0 / 트레이드 드레스 금지의 이중 라이선스
- Montserrat + Lora — 정부계에서 드문 세리프 본문

## 접근성

목표 선언 미확인. 단서: `-SR`(screen reader) 전용 색상 변수, `-dark` 변형의
존재 이유가 "흰 배경 대비 강화"로 주석 명문, focus indicator 색 지정.

## 참고

- 문서: https://patterns.boston.gov (Fractal — 페이지 title "Overview | Fleet")
- CSS: https://patterns.boston.gov/css/public.css (184KB)
- 리포: https://github.com/CityOfBoston/patterns (develop, 2026-04 push)
- **남은 확인 사항:** Stencil 웹컴포넌트 층의 토큰(별도 빌드), Figma/Sketch
  킷, 접근성 목표 명문(위키 working agreement 링크만 확인), grid 시스템
  실값(`stylesheets/grid/` 미수집), Optimistic Blue light/dark 동일값의
  의도 여부 (개명 리팩터 미완 가능성)
