---
name: Aurora Design System (GCTools)
org: 캐나다 정부 (GCTools / Digital Collaboration Division)
coverage: partial
url: https://design.gccollab.ca
repo: https://github.com/gctools-outilsgc/aurora-design-system (MIT)
license: MIT (리포) — 문서 사이트 콘텐츠 라이선스 별도 표기 없음
tech: [Bootstrap 4.1.3 스킨, Gatsby v1 문서 사이트]
figma_kit: false
tokens_format: [문서층 표본 — 서버 렌더링 HTML에서 실측, 토큰 배포 없음]
a11y_target: "WCAG 2.1 (버전 명시 — 컬러 대비는 AA 필수·AAA 권장, 2026-08-18 확인)"
platform: web
domain: government
verified: 2026-08-18
source: "design.gccollab.ca /component/{colour,typography,buttons,grids-and-spacing}/ 서버 렌더링 HTML 실측 — 문서층 표본 2호"
---
<!-- lang-links -->
> [English](aurora-gc.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

캐나다 정부 협업 도구(GCTools)의 디자인 가이드 — **문서층 표본 2호**입니다
(LINE에 이어). 토큰·코드 배포 없이 문서만 있으나, **Gatsby v1 정적 사이트라
서버 렌더링 HTML을 그대로 긁을 수 있어** 우회가 필요 없었습니다(LINE의
page-data JSON과 다른 결). 컴포넌트는 **Bootstrap 4.1.3 위 스킨**이라 고유
치수가 없고, 시스템의 실체는 컬러 스와치와 타이포 규정입니다.
**리포가 2019-06-13 이후 동결**된 정부 유산 표본.

> **문서층 표본 단서.** 이 항목의 값은 npm/저장소가 아니라 공식 문서
> HTML에서 왔습니다. 재검증 경로: `design.gccollab.ca/component/<페이지>/`
> (Gatsby v1 — JS 없이 본문이 HTML에 있음. 후행 슬래시 없으면 301).
> 리포는 MIT라 LINE 같은 열람 한정 제약은 없습니다.

## 소스 상태 — 2019-06 동결

- 리포 `gctools-outilsgc/aurora-design-system`: 최종 push **2019-06-13**
  (마지막 커밋들이 구버전 파일 삭제·페르소나 추가). archived 아님 — 방치.
- 문서 사이트 코드 `gctools-outilsgc/design-system-code`: `gatsby ^1.9.277` +
  `bootstrap ^4.1.3` (package.json 실측) — **Gatsby v1**이라 LINE의
  `/page-data/*.json` 채널은 없고(그건 v2+), 대신 HTML 자체가 완전합니다.
- 사이트는 2026-08 현재 200으로 살아 있음 — 코드만 죽고 문서는 사는
  정부 표본 특유의 수명 곡선 (Rakuten ReX와 정반대: 그쪽은 문서가 죽고
  npm이 남음).

## 컬러 — 스와치 패밀리 6 × 5헥스

시스템의 본체. 팀별로 2~3개 스와치를 골라 팔레트를 구성하라는 모델 —
**단일 팔레트 강제가 아니라 스와치 패밀리 카탈로그**입니다.

| 패밀리 | 헥스 5종 |
|--------|----------|
| **Aurora Borealis** (주 팔레트) | #002D42 · #137991 · #6DD2DA · #15A3A6 · #92CC6F |
| Canada.ca Theme | #333000 · #26374A · #AF3C43 · #F5F5F5 · #FFFFFF |
| Thunder and Lightning | #002D42 · #4D5D6C · #96A8B2 · #CECECE · #FEC04F |
| Blue Complimentary | #0D467D · #137991 · #6DD2DA · #FF9F40 · #FEC04F |
| Triad | #7E0C33 · #024571 · #5DC1BE · #F6CF22 · #EDDB7C |
| Green and Blue | #0278A4 · #4E4741 · #83C3F2 · #C9DF61 · #C1D699 |

- Canada.ca Theme의 #26374A·#AF3C43는 **캐나다 연방 웹 표준색과의 접점**
  (Canada.ca 헤더 남색·시그니처 레드).
- Aurora Borealis는 5스와치 × 6음영 **풀 팔레트 30헥스**가 문서에 원데이터로
  존재 (#002D42→#F3F8FA 식 밝기 램프) + CSS 그라디언트 4종 원문.

### 시맨틱 4종 (각 다크 텍스트 · 본색 · 연한 배경 3헥스)

```
Error    #923534 · #D3080C · #F3E9E8
Warning  #66512C · #FF9900 · #F9F4D4
Success  #2B542C · #278400 · #D8EECA
Info     #245269 · #269ABC · #D7FAFF
```

- 인터페이스색: 텍스트 #252525(오프블랙) · #FFFFFF · muted #666666.
  라이트 테마 #CCCCCC/#F5F5F5/#FAFAFA/#FFFFFF · 다크 테마
  #000000/#212121/#303030/#424242 — **2019년 정부 문서에 다크 테마 4단이
  이미 규정**돼 있던 표본.

## 타이포 — Rubik + Nunito Sans, pt 스케일

역할 분리: **Rubik = 타이틀·헤딩 / Nunito Sans = 서브헤딩·버튼·본문**
(둘 다 Google Fonts 오픈소스 — 폰트 차단 환경 대비 Calibri 폴백 명문).

```
H1  Rubik Light    36pt        H4  Rubik Regular       21pt (1.3125em)
H2  Rubik Regular  28pt (1.75em)   H5  Nunito Sans Regular 18pt (1.125em)
H3  Rubik Medium   24pt (1.5em, tracking 10)   H6  Nunito Sans Bold 16pt (1em)
본문 Nunito Sans Regular 16pt / leading 24pt
```

- **H5부터 서체가 바뀌는 2서체 스케일** — 크기만이 아니라 패밀리가
  위계 축입니다 (Fleet의 Montserrat/Lora 역할 분리와 같은 계열).
- 풀 인용: 들여쓰기 50px · 세로선 4px · 선-텍스트 패딩 8px · 1.25em/200% —
  문서가 인라인 스타일 원문까지 제공.
- 본문 줄 길이 목표 "약 60자" 명문.

## 컴포넌트 — Bootstrap 4.1.3 스킨 (고유 치수 없음)

- 버튼 문서가 `btn btn-primary` … `btn-dark` **Bootstrap 클래스 8종 +
  btn-sm/lg/block을 그대로 노출** — 자체 치수·radius 규정이 없습니다.
- 그리드도 WET(캐나다 Web Experience Toolkit) 경유 Bootstrap 12컬럼 —
  자체 브레이크포인트 없음.
- 즉 **이 시스템의 고유 기여는 컬러·타이포·콘텐츠 지침 층**이고 컴포넌트
  층은 차용입니다. 코퍼스에서 "디자인 시스템 = 프레임워크 스킨" 유형의
  명시 표본 (govuk 같은 자체 구현 정부계와 대비).

## 특징적 결정

- **문서층 표본 2호** — 단, LINE(폐쇄 JSON·열람 한정)과 달리
  **정적 HTML + MIT 리포**로 수집 장벽이 없는 쪽 극단
- 팔레트를 강제하지 않고 **스와치 패밀리 6종 카탈로그**로 제공 —
  제품군(GCTools 스위트)별 변주를 전제로 한 정부 시스템
- 2서체 위계 (Rubik/Nunito Sans, H5에서 교대)
- 컴포넌트 층 전체를 Bootstrap 4.1.3에 위임
- 2019-06 동결 — 살아 있는 사이트 + 죽은 리포

## 접근성

WCAG **AA 이상 대비 필수·AAA 권장** 명문 (컬러 페이지). 색만으로 의미 전달
금지 + `.sr-only` 대체 텍스트 지침 (버튼 페이지).
~~그 외 목표 선언 미확인.~~ → **2026-08-18 해소 — 준거 표준의 버전이
`WCAG 2.1`로 명시돼 있습니다.**

출처 <https://design.gccollab.ca/overview/introduction> — "Aurora를 쓰는 것은
**Web Experience Toolkit(WET) · Canada.ca 스타일 가이드 · 연방 아이덴티티
정책(FiP) · WCAG 2.1**을 보완한다"고 적습니다. 즉 Aurora 자체가 적합성을
주장하는 것이 아니라 **연방 표준 4종의 보완재로 위치**시키는 서술이며,
등급(A/AA/AAA)은 이 문장에 붙어 있지 않습니다 — 등급은 컬러 페이지의
대비 요구(AA 필수·AAA 권장)에만 있습니다.

홈에도 "Aurora는 **공용어와 접근성 같은 캐나다 정부 의무사항을 따른다**"
(Diverse 항목)는 원칙 수준 서술이 있습니다.
**별도 접근성 페이지·VPAT·적합성 선언문은 없습니다** (2026-08-18,
<https://design.gccollab.ca/> 서버 렌더 HTML 실측 — 사이트 전체 내비게이션은
Overview · Components · Content · Data 4개 축뿐입니다).

## 참고

- **Figma 킷 (false) 근거:** Figma 킷 없음 — 공식 UI Kit이 Adobe Illustrator 제작·Adobe XD 프로토타이핑, 사이트 전체 Figma 언급 0건, 2026-08-18 확인

- 문서: https://design.gccollab.ca (EN/FR 이중 언어)
- 리포: https://github.com/gctools-outilsgc/aurora-design-system (MIT,
  2017-12 생성 · 2019-06-13 최종 push) · 사이트 코드 `design-system-code`
- **남은 확인 사항:** 리포 동봉 UI Kit(.ai/.xd) 내용물과 문서 수치의 일치
  여부, FR판 콘텐츠 차이, 아이콘 세트 출처(FontAwesome 추정 — 사이트 코드
  의존성에서 확인), GCTools 제품들이 실제로 이 스킨을 썼는지
- **Figma 킷 부재 확정 (2026-08-18):** `figma_kit: false` — 출처
  <https://design.gccollab.ca/overview/download>. 공식 배포물은 두 개뿐이고
  (컴파일된 CSS/JS 번들, UI 킷), UI 킷은 "**Adobe Illustrator로 만들었고**
  각 컴포넌트를 내보내 **Adobe XD로 가져가 인터랙티브 프로토타입**을
  만들 수 있다"고 명시합니다. Introduction 페이지도 "**UI 킷(Adobe
  Illustrator용)을 내려받으면** 모든 컴포넌트 스케치를 쓸 수 있다"고
  반복합니다. 홈·Download·Introduction·Components 전 페이지에서 **Figma
  문자열 0건, Sketch 0건**입니다. **2019-06 동결 시점이 Figma가 기업
  표준으로 자리잡기 전**이라는 시기와 일치합니다 — 렌더링해도 이 시스템은
  Figma 킷을 공개하지 않습니다
- **렌더 불필요 확인 (2026-08-18):** Gatsby 정적 사이트지만 **본문이 서버
  렌더 HTML에 그대로 들어 있어** curl만으로 전문을 읽을 수 있습니다
  (헤드리스 렌더 불필요). 단 `sitemap.xml`은 404이며, 페이지 목록은
  내부 링크를 따라가야 합니다
