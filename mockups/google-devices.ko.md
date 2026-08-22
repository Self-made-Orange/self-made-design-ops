---
name: Google 공식 디바이스 아트
source: developer.android.com
type: hardware-mockup (웹 도구)
license: 공식 제공 — 단 Google Play 스토어 리스팅에는 사용 금지
verified: 2026-08-18
---
<!-- lang-links -->
> [English](google-devices.md) · **한국어**
<!-- /lang-links -->

# Google 공식 디바이스 아트 — 인벤토리

Google이 공식으로 제공하는 디바이스 프레임은 **Device Art Generator** 하나입니다.
PSD/Sketch/Figma 파일 배포가 아니라 **웹 도구**입니다 — PNG 스크린샷을
드래그하면 기기 프레임을 씌운 이미지를 만들어 줍니다.

- URL: <https://developer.android.com/distribute/marketing-tools/device-art-generator>
- 도구는 활성 상태 (페이지 최종 갱신 2025-07-21 표기 확인)
- 옵션: 그림자(Shadow) · 화면 반사(Screen Glare) · 회전(Rotate)
- 입력: 기기 화면 비율과 일치하는 PNG 스크린샷

## 지원 기기 (도구 JS에서 직접 추출)

### 기본 목록

| 기기 | 비고 |
|------|------|
| Pixel 6 / Pixel 6 Pro | **최신 기기 — 여기서 멈춰 있음** |
| Pixel 5 | |
| Pixelbook Go | 노트북 |
| 7.6" Foldable (main screen) | 제조사 불명 제네릭 폴더블 |
| 10.1" WXGA Tablet | 제네릭 태블릿 |
| Wear OS by Google (Square / Round) | 워치 제네릭 프레임 |

### "Older devices" (아카이브)

Nexus 5X · Nexus 6P · Nexus 9 · Pixel / Pixel XL · Pixel 2 / 2 XL ·
Pixel 3 / 3 XL · Pixel 3a / 3a XL · Pixel 4 / 4 XL · Pixel 4a · Pixelbook

(Nexus 6와 구형 Wear OS 프레임은 코드에 있으나 hidden 처리)

## 사용 조건

- 웹사이트·프로모션 자료 사용은 공식 용도로 안내됨.
- **Google Play 스토어의 스크린샷·피처 그래픽에는 프레임을 씌우지 말 것** —
  페이지에 명시된 금지 사항입니다.

## 없음 / 미확인

- **다운로드형 목업 파일(PSD·Figma) 없음** — Google은 Pixel 하드웨어 렌더링을
  파일로 배포하지 않습니다. Figma 공식 계정(@androiddesign, @tv)에도 하드웨어
  목업은 없습니다 ([`figma-community-kits.md`](figma-community-kits.md) 참고).
- **Android TV / Google TV 프레임 없음** — Device Art Generator에 TV 기기는 없습니다.
- Pixel 마케팅 이미지는 Google Partner Marketing Hub(파트너 전용)에 있을 것으로
  추정되나 **미확인** — 로그인 승인이 필요합니다.

## 쓸 때 주의

- 기기 라인업이 **Pixel 6 세대(2021)에서 멈춰** 있습니다. 최신 Pixel 목업이
  필요하면 공식 소스로는 안 됩니다.
- 출력이 도구가 만들어 주는 합성 PNG 하나뿐이라, 레이어를 만지거나 각도를
  바꾸는 작업은 불가능합니다.

## 출처

- Device Art Generator — developer.android.com/distribute/marketing-tools/device-art-generator
- 기기 목록은 도구의 `device-art-generator.js`를 직접 읽어 확인 (2026-08-18)
