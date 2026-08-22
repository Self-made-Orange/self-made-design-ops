---
name: LINE Design System (LDSG · LDSM)
org: LY Corporation (일본)
coverage: partial
url: https://designsystem.line.me
repo: null (비공개 — npm은 서체 line-seed-* 만)
license: "열람 한정 (about/terms-en — 복제·수정·재배포 금지. 이 항목은 값의 사실 기록 + 출처만 수록)"
tech: [iOS, Android, Web — 코드·토큰 배포 없음]
figma_kit: 미확인
tokens_format: [문서층 표본 — Gatsby page-data JSON + 스펙 이미지]
a11y_target: 미확인
platform: [mobile, web]
domain: messaging
verified: 2026-08-18
source: "designsystem.line.me /page-data/**/page-data.json (Gatsby) + 스펙 이미지 판독 — 문서층 표본"
---
<!-- lang-links -->
> [English](line.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

LINE 메신저(LDSM)와 글로벌 패밀리 서비스 웹(LDSG)의 **2-tier 시스템** —
코퍼스 첫 **문서층 표본**입니다 (토큰·코드 배포 없음, 공식 문서의 구조화
JSON에서 실측). **브랜드 그린이 OS별로 다른 값**(#06C755/#4CC764)이고,
눌림 상태색을 **HSV 변환 수식으로 생성**하는 규칙이 명문화돼 있습니다.

> **문서층 표본 단서.** 이 항목의 값은 npm/저장소가 아니라 공식 문서
> 데이터에서 왔습니다. 재검증 경로: `/page-data/<경로>/page-data.json`.
> LDSM 상세는 기본 슬러그(`-en`)가 403(사내용)이고 **`-ex-en` 접미판이
> 공개본**입니다.

## 컬러 — ~170 헥스, 상태색이 수식입니다

- **LINE Green이 OS별 이원화**: iOS·웹 `#06C755` / Android `#4CC764` —
  플랫폼별로 브랜드 원색 자체를 달리 지정하는 명문 규칙 (Persona의
  Apple 그린 차용과 반대 방향 — 플랫폼 관행에 브랜드를 맞춤).
- **LINE Gray 19단계**: White · 100~900(650·750·770·850·870 같은 촘촘한
  중간 단계 — 다크모드용 회색축) · Black. `#FCFCFC`~`#111111`.
- Rainbow **16색상군 × 7~12단계** 전 헥스 확보. 각 색상군에
  **`p`(pressed) 접미 별도 헥스**(`600p`·`500p`…)가 있는 것이 특징 —
  M3 State Layer(알파 합성)·Polaris 상태 폴백과 다른 세 번째 방식:
  **눌림색을 팔레트에 미리 구워 둡니다.**
- **상태색 생성 수식이 명문화**: Pressed = HSV 변환 후
  V≤32% → V+45 / 33~86% → V−20 / ≥87% → V−35. 불투명도 상태(LDSG):
  Normal 100 / Hover 70 / Pressed 50%, Disabled `#E4E4E4`.
  상태색을 "값"이 아니라 **함수**로 규정한 표본은 코퍼스에서 드뭅니다
  (Gestalt의 press scale 산식과 같은 계열 — 그쪽은 크기, 이쪽은 색).
- LINE Navy 7단계에 용도 주석("iOS Navigation bar" 등) 동반.

## 스페이싱 — 15단계, 이름이 100단위

```
ldsg-spacing-50=2 · 100=4 · 200=8 · 300=12 · 400=16 · 500=20 · 600=24
· 700=28 · 800=32 · 900=36 · 1000=40 · 1100=44 · 1200=48 · 1300=52 · 1400=56
```

4px 배수 + 최소 예외 2px(`-50` = 반단계). **100 = 4px 배수 1단**의
100단위 네이밍은 Polaris(`space-100`=4px)와 같은 규칙 — 두 시스템이
독립적으로 같은 표기에 도달했습니다.

## 타이포 — LDSM은 pt 스케일, LDSG는 토큰 문법만 공개

- **LDSM (pt · 시스템 폰트)**: Heading 1~4 = Heavy 24 / Bold 17 / Bold 14 /
  Regular 13 · Title 1~5 = 23/19/16/15/14 · Body 1~4 = 16/14/13/12.
  **12pt 미만 비권장** 명문. 언어별 서체 매핑(iOS SF Pro · JP Hiragino
  W3/W6/W7 · ZH PingFang · TH Thonburi · KO Apple SD Gothic Neo)이
  스케일에 동반 — `i18n/README.md`의 언어축과 교차.
- **LDSG**: 토큰 문법만 공개 — `$ldsg-en-title-xxl-200` =
  **언어(EN/JP/TC/TH) × 타입 × 크기(XS~XXL) × 굵기(100/200/300)**.
  언어가 토큰 이름의 1급 축인 표본. 단계별 px·행간 표는 미공개
  (예시 Title XXL = 38px Bold만 확인).

## 라운드 · 보더 · 그림자 (LDSG)

```
radius  100=3 · 200=5 · 300=7 · 400=12px · circle=50%
border  50=0.5 · 100=1 · 200=2px
```

- **라운드가 3·5·7 홀수 진행** — 4/8/12 짝수 진영과 갈리는 값 선택
  (Persona의 7·22px과 함께 비관행 라운드 표본).
- 보더 0.5px — Polaris 0.66px과 같은 서브픽셀 hairline 진영.
- 그림자 6종 CSS 원값 확보 (on-white 3 + on-gray 3 —
  **배경색별로 그림자 세트를 분리**): on-white-100
  `0 0 2px rgba(0,0,0,.07), 0 1px 2px rgba(0,0,0,.07)` ~
  on-gray-300 `0 1px 15px rgba(0,0,0,.04)`.

## 그리드 · 컴포넌트 표본

- LDSG: 375px 기준 4컬럼 (컬럼 76~77 / 거터 12 / 마진 16px).
- LDSM: 공통 좌우 마진 16pt, 2컬럼 167/9/16 · 3컬럼 109/8/16 ·
  4컬럼 82/5/16 (컬럼폭/거터/마진).
- Capsule Button 높이 **42pt**(좌우 패딩 16pt) · FAB 지름 54pt ·
  아이콘 24×24px 그리드(패딩 2px · 스트로크 1.3/1.5/1.8pt · 각도 45°).

## 특징적 결정

- **코퍼스 첫 문서층 표본** — 토큰 배포 없이 문서 데이터만으로 편입
- 브랜드 원색의 OS별 이원화 (#06C755 / #4CC764)
- pressed 전용 `p` 팔레트 + HSV 상태색 생성 수식 — 상태색의 세 번째 방식
- 토큰 이름에 언어 축 (LDSG `-en-`·`-jp-`…)
- 2-tier(LDSG/LDSM) × 2-문서(`-en` 사내 / `-ex-en` 공개) 구조

## 접근성

미확인 (12pt 최소 크기 · 텍스트 불투명도 하한 70% 규정만 확인).

## 참고

- **Figma 킷 (미확인) 근거:** 사내 Figma 라이브러리 존재 추정

- 문서: https://designsystem.line.me (LDSG / LDSM)
- 이용 조건: https://designsystem.line.me/about/terms-en — **열람 한정.**
  문서 원문·이미지 재배포 불가, 이 항목은 수치의 사실 기록만 수록
- npm: `line-seed-*` 서체 패키지만 존재 (JP/KR/TH — 토큰 아님)
- **남은 확인 사항:** LDSG 타이포 px 스케일 전체(토큰 문법만 공개),
  브레이크포인트 실값(태블릿 8컬럼·PC 16컬럼 예고만), 컴포넌트 치수
  다수(스펙 이미지 의존), 접근성 목표, Figma 킷
