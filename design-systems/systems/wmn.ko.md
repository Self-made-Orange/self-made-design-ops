---
name: WMN Design System
org: West Midlands Network (영국 교통국)
coverage: partial
url: https://designsystem.tfwm.org.uk
repo: https://github.com/wmcadigital/wmn-design-system
license: 미지정 — 사실상 all rights reserved (LICENSE 파일·package.json license·README 언급 전무, GitHub API license null — 2026-08-18 확인)
tech: [SCSS, Nunjucks 패턴]
figma_kit: 미확인
tokens_format: [CSS, JSON(패턴 데이터)]
a11y_target: 미확인
platform: web
domain: transit
verified: 2026-08-18
source: "npm pack wmn-design-system@2.4.0 → build/json/merged.njk.json + build/css/wmnds.min.css"
---
<!-- lang-links -->
> [English](wmn.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

영국 웨스트미들랜즈 교통국 — **교통(transit) 도메인 표본**. 색 분류 축에
**교통수단(`modal`: bus·metro·railway·susTravel·roads)**이 1급으로 들어가
있고, 컴포넌트가 아니라 **"버스표 사기" 같은 과업 패턴 단위**로 배포됩니다.

## 색 — 교통수단이 분류 축입니다

```
brand:          primary/secondary (퍼플)
modal:          bus · metro · railway · susTravel · roads   ← 교통수단별 색
web:            text · cta · error · warning · success · information
backgroundOnly: plannedDisruption · disable · background
```

- **`modal`이 대화상자가 아니라 transport modality(교통수단)입니다** —
  코퍼스 용어 충돌 사례 (GLOSSARY 후보). 노선도 색 관행이 토큰 체계로
  올라온 형태 — 도메인 전용 색 계열(차트·사이드바 등) 축의 **교통판**입니다.
- `plannedDisruption`(계획 운행중단)이 **배경 전용 색**으로 따로 있음 —
  교통 서비스의 상태 어휘가 토큰 이름에 들어온 사례.

## 패턴 단위 배포

배포물이 컴포넌트 목록이 아니라 **과업 패턴 HTML**입니다:

```
buy-a-ticket · live-departures · find-a-timetable · find-a-stop-or-station ·
travel-updates · question-form · feedback-loop · cookies …
```

GOV.UK의 패턴 지향(서비스 과업 중심)을 교통 도메인으로 옮긴 구조 —
**"컴포넌트가 아니라 여정이 단위"**인 시스템입니다.

## 수치 (min.css 실측)

- 포커스: `0 0 0 2px #fff, 0 0 0 4px #9d5baf` — **흰 갭 2px + 퍼플 4px
  이중 링** (GOV.UK 노란 이중 링과 같은 구조, 색만 브랜드 퍼플)
- 루트 16px(1rem), 본문 1rem 지배 — 패딩은 0.25~3rem (4px 배수 우세,
  `0.7rem` 같은 이탈값 소수 존재)

## 특징적 결정

- **교통 도메인 첫 표본** — 색 축에 교통수단, 상태 어휘에 운행중단
- 과업 패턴 단위 배포 (GOV.UK 계보의 도메인 특화)
- 이중 포커스 링 (영국 정부 계열 관행 계승)
- `modal` 용어 충돌 — 같은 철자가 시스템마다 다른 뜻

## 컴포넌트 심화 — (2026-08-18)

같은 패키지(`wmn-design-system@2.4.0`) 안에 컴포넌트 층이 있습니다 —
`build/njk/components/` **Nunjucks 매크로 21종** + `build/css/
wmnds-components.min.css`(통합본 wmnds.min.css). 폼 요소는 form-elements
하위(체크박스·라디오·date/number/text-input·textarea·dropdown·파일 업로드)로
GOV.UK 구성 그대로입니다. **모달·다이얼로그 컴포넌트는 없습니다** —
`.wmnds-*` 클래스 전수 grep에서 modal/dialog/overlay/popup 계열은
`branded-banner__modal`(배너 하위 요소, 대화상자 아님)뿐. "여정이 단위"인
시스템답게 오버레이 UI 자체를 두지 않은 구성입니다.

### 버튼 (`.wmnds-btn`)

- **min-height 50px** — 대형 타깃. 패딩은 4px 8px뿐이고 flex 세로 중앙
  정렬로 높이를 채웁니다. 라운드 5px · 1rem/**700**/행간 1.3rem ·
  transition 0.2s ease-in-out.
- 기본형이 `justify-content: space-between` — **아이콘 우측 배치를 전제**한
  레이아웃입니다 (매크로에 iconLeft/iconRight/로딩 스피너 슬롯).
- 색: 기본 **#1d7bbf 파랑**(hover #145686 · active/focus #0f3e60) ·
  primary #3c1053(브랜드 퍼플) · secondary 퍼플 아웃라인 ·
  **start #00703c · destructive #d4351c — GOV.UK 버튼 초록·빨강 그대로**.
  색 계보가 브랜드 축(퍼플·파랑)과 GOV.UK 차용 축(초록·빨강)으로
  이원화돼 있습니다.

### 입력 (`.wmnds-fe-input`)

- 패딩 12px · 보더 **1px 퍼플 #3c1053**(회색이 아니라 브랜드색 보더) ·
  라운드 0(직각 — GOV.UK 계보) · 1rem/행간 1.5rem · width 100%.
- 오류: 보더 2px #d4351c + 그룹(`fe-group--error`)에 **왼쪽 5px 빨간 바**
  — GOV.UK 오류 문법 그대로입니다.

### 포커스 — 전역 1규칙

`[class*=wmnds-] :focus` 단일 셀렉터가 전 컴포넌트를 덮습니다 —
`0 0 0 2px #fff, 0 0 0 4px #9d5baf` (토큰 절의 이중 링과 동일 값).
컴포넌트별 포커스 정의를 거의 두지 않는 **전역 1규칙** 방식이고,
버튼만 focus/active에서 배경색 #0f3e60을 추가로 얹습니다.

## 접근성

미확인 (이중 포커스 링은 GOV.UK 계열 고대비 대응 패턴 — 전역 1규칙
적용 방식은 위 심화 절).

## 참고

- **URL 이전 (2026-08-18 확인):** `designsystem.wmnetwork.co.uk` → `designsystem.tfwm.org.uk` (301, 조직명 변경)

- ~~라이선스~~ → **미지정 확정 (2026-08-18).** LICENSE 파일 없음(루트 전수
  확인) · package.json license 필드 없음 · README 언급 0건 · GitHub API
  `license: null`. **사실상 all rights reserved** — 코드·패턴 재사용 전에
  WMCA에 문의가 필요합니다. (같은 org의 파생 저장소는 MIT지만 본체 미적용.
  저장소는 활성 — 최근 푸시 2026-06-01)
- **남은 확인 사항:** 색 실값 전체(varName만 JSON에 있음 — 버튼·오류
  계열 실값은 심화 절에서 min.css로 일부 확보), 타이포 스케일 전체,
  WCAG 목표
