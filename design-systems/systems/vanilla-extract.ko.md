---
name: vanilla-extract
org: 오픈소스 (SEEK 출신 — Braid와 같은 뿌리)
coverage: minimal
url: https://vanilla-extract.style
repo: https://github.com/vanilla-extract-css/vanilla-extract
license: MIT
tech: [빌드타임 CSS-in-TS]
figma_kit: false
tokens_format: [없음 — 값을 배포하지 않음]
a11y_target: 해당 없음
platform: web
domain: framework
verified: 2026-08-17
source: "npm pack @vanilla-extract/css@1.21.2 → dist/ (기본 토큰 0개 확인)"
---
<!-- lang-links -->
> [English](vanilla-extract.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

"Zero-runtime Stylesheets-in-TypeScript" — **값을 하나도 배포하지 않는
토큰 기반 시설**입니다. `createTheme`/`createThemeContract`로 소비자가
자기 토큰을 타입으로 선언하면 빌드타임에 정적 CSS 변수로 굳혀 줍니다.
Panda가 "값을 주는 엔진"이라면 vanilla-extract는 **"값의 그릇만 주는 엔진"**.

## 코퍼스 안에서의 자리

- **테마 계약(theme contract)** 개념의 원류 표본 — 토큰의 *형태*를 먼저
  선언하고 값을 여러 벌 채우는 패턴 (라이트/다크/브랜드별 벌).
  Braid(SEEK)가 실제 소비자이고 두 프로젝트의 뿌리가 같습니다 —
  Braid의 격자배수 토큰이 이 계약 위에 서 있습니다.
- 스타일 엔진 3종 대비가 완성됩니다:

| 엔진 | 값 배포 | 방식 |
|------|:---:|------|
| Tailwind | O | base 하나 + 생성 |
| Panda | O | 열거 preset |
| **vanilla-extract** | **X** | **계약만 — 값은 소비자 몫** |

## 특징적 결정

- 기본 토큰 0 — 시스템이 아니라 시스템을 만드는 도구임을 배포물이 증명
- 타입 안전 토큰 계약 — 값 누락이 컴파일 에러
- zero-runtime — 빌드 산출물이 정적 CSS

## 참고

- 코퍼스 포함 사유: Braid 등 실표본의 토큰 기반 시설이며, "스타일 층 없음"
  분류(GLOSSARY)의 도구 쪽 끝을 표본화하기 위함
- **남은 확인 사항:** sprinkles(유틸리티 생성기)의 관례적 스케일 사용 실태
