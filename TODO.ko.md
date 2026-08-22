# 남은 태스크

> [English](TODO.md) · **한국어**

2026-08-18 시점의 잔여 작업 목록입니다. 8/17판 TODO의 A·B·C·D 중
**A는 전부 해소**됐고(로컬 세션의 네트워크 개방 — `HARVESTING.md` 상단 노트),
B 대표 6건·C 네트워크 확인 12건·D npm 재확인이 처리됐습니다.

## 현재 상태 스냅샷

| 축 | 상태 |
|----|------|
| 코퍼스 | **116개** (113 공개 + 문서층 2 + 코드층 신규 — 구성: `design-systems/index.md` 상단) + 내부 표본 1 |
| `full` 수집 심화 | 20/20 · **`partial` 수집 심화 79건(대상 전량)** 완료 |
| patterns 백로그 | 판단 지침 9축 + 소스 파기류 전부 해소 · **재종합 9/9축 완료** (표본 16~83) — 약한 3축(table 16 · navigation 16 · feedback 18) 보강 완료 (2026-08-18) |
| 미확인 | **428 → 308** (2회 처리 — 소스 재탐색 66필드 · B-1 렌더 64건). 분류·잔여는 `design-systems/UNVERIFIED.md` |
| 신선도 | 총 **185건** · 낡음 1(Orbit prerelease, 의도) · 실패 0 · 수동 21 — **드리프트 3건 처리 완료 (2026-08-18)** |
| a11y_target | `full` 수집 10개 시스템 문서 층 확인 완료 (명시 6 · 부재 확인 4) |
| README | 6개 언어판 — **Self-Made DesignOps로 개명 반영** |

## A. ~~환경 제약에 막힌 것~~ → 해소 (2026-08-18)

문서 사이트가 로컬 세션에서 열려 전 항목을 수집했습니다:

- ✅ 모달 배경 클릭·ESC·중첩 (`patterns/modal.md`) — 중첩 금지 4 : 조건부 2
- ✅ primary 버튼 개수·변형 용도·로딩·최소 너비 (`patterns/button.md`) — "화면당 1개" 6표본 수렴
- ✅ 에러 표시 시점·라벨 위치·필수 표시 (`patterns/form.md`) — blur 다수 vs GOV.UK 제출 전용
- ✅ 토스트 위치·지속시간·개수 + 얼럿 배치·자동 닫힘 (`patterns/feedback.md`) — 배너 자동 소멸 없음 8/8 만장일치
- ✅ 언제 애니메이션을 넣는가 (`patterns/motion.md`) — 5개 시스템 판단 규칙
- ✅ 사이드바 vs 상단·깊이 제한·부모 강조 (`patterns/navigation.md`)
- ✅ 정렬 UI·행 선택 (`patterns/table.md`)
- ✅ 타입 스타일 사용 지침 (`patterns/typography.md`)
- ✅ WCAG 목표 명시 여부 10개 시스템 (`patterns/color.md` + 각 frontmatter `a11y_target`)

**후속 원칙:** 문서 층 수집이 더 필요하면 로컬 세션에서. 컨테이너 세션은
우회 채널(DocC JSON·sparse-clone·빌드 산출물)만 유효합니다.

## B. 항목별 남은 확인 사항 — 소소, 기회가 되면

8/17판의 대표 6건은 전부 해소됐습니다 (M3 shadows → 엘리베이션 구조 확인 ·
shadcn 정규화 지점 · TDS 4건 · Audi 타임라인 · Persona 스페이싱 · Italia 층 구조).
남은 것은 `systems/*.md`의 "남은 확인 사항"에 산재하며, 해당 시스템을
실제로 쓸 때 채우면 됩니다.

```bash
grep -rn "남은 확인 사항" design-systems/systems/   # 전체 열람
```

patterns 쪽에 남은 소스 파기류:

- [x] ~~Mantine `ModalBase.css`·`Button.css` 패딩, Radio·Switch 치수~~ —
  **해소 (2026-08-18, `@mantine/core@9.5.1` npm)**: 버튼 패딩 14~32 +
  compact 축, 모달 패딩 16 고정, Radio/Switch 재확인 일치. 덤으로
  Notification·Alert 치수, Textarea 최소 높이, 0ms 셀렉터,
  헬프텍스트 간격(5px)까지 (`button.md`·`form.md`·`modal.md`·`feedback.md`·`motion.md`)
- [x] ~~Radix Themes 26색 `--accent-9` 실값, `tab-nav.css`~~ —
  **해소 (2026-08-18, `@radix-ui/themes@3.3.0` + `@radix-ui/colors@3.0.0`)**:
  26색 표(`color.md`) — 9단계는 gray 빼고 라이트/다크 동일. tab-nav는
  tabs와 규격 100% 공유(`navigation.md`). button/callout/text-area 치수 +
  에러 셀렉터 부재 확정까지 (`button.md`·`form.md`·`feedback.md`)
- [x] ~~shadcn `button-group`·`empty`·`pagination`·`navigation-menu`·`menubar` 소스~~ —
  **해소 (2026-08-18, GitHub main@8a7701e)**: button-group·spinner →
  `button.md`, empty → `feedback.md`, pagination·navigation-menu·menubar →
  `navigation.md`
- [x] ~~Spectrum·Polaris·Primer·Cloudscape·Carbon 컬러·타이포 토큰 경로 (`color.md`·`typography.md`)~~
  — **해소 (2026-08-18)**: 5개 전건 수집. `@adobe/spectrum-tokens@15.0.0` ·
  `@shopify/polaris-tokens@9.4.2`(동결) · `@primer/primitives@11.10.0` ·
  `@cloudscape-design/design-tokens@3.0.107` · `@carbon/colors@11.56.0` +
  `@carbon/themes@11.79.0` + `@carbon/type@11.65.0`.
  전부 npm 배포본에 있었고 **경로 부재가 아니라 안 열어본 것**이었습니다
  (교훈 6 재확인). 새 함정 3종은 `HARVESTING.md` 교훈 11~13.
  교차 결론: `patterns/color.md`("램프 단계 수" · "시맨틱 계층 깊이") ·
  `patterns/typography.md`("단축 속성 토큰" · "굵기 상한" · "대형 5종의 자간 방향" ·
  "Spectrum CJK 스케일"). **이로써 B절 소스 파기류 전소진**
- [x] ~~Primer 컴포넌트 토큰 층~~ — **해소 (2026-08-18, 컨테이너 세션)**:
  27파일·364토큰(색 354 — 사실상 색 전용, 치수는 functional 몫).
  다크 오버라이드 인라인(`org.primer.overrides`), Figma Variables 동기화
  메타데이터 내장(표본 유일), `$type: border` 복합 타입, `headerSerach` 오타
  박제까지 (`systems/primer.md` 컴포넌트 토큰 층 절)
- [x] ~~Orbit 이징~~ — **부재 확정으로 해소 (2026-08-18)**: Tailwind 기본
  베지어 단일 수렴(52회). 이로써 motion.md 이징 백로그 전소진
- [x] ~~Audi UI 버튼 높이~~ — **해소 (2026-08-18)**: 실효 51px, 루트 반응형으로
  51→57→63px (`audi-ui.md` 심화 절). 폐기 사유 발표문은 미발견 종결

## B-2. ~~patterns 재종합~~ → 완료 (2026-08-18)

심화로 확보한 실측이 `systems/*.md`에만 있고 교차 비교 문서가 소수 표본 결론을
유지하던 문제 — **7축 전부 재종합 완료**입니다.

| 축 | 표본 | 뒤집힌 결론 |
|----|:---:|:---:|
| button | 77 | 1 (기본 높이 36→40px) |
| form | 78 | 1 (입력 최소 너비 '없음' → 13개+) |
| modal | 79 | **6** |
| motion | 83 | **7** |
| color | 79 | 3 |
| typography | 68 | 4 |
| table | 6 | 2 (표 축은 심화 후순위였음을 명시) |

- navigation · feedback 2축은 **대상 아님** — 이번 심화에 신규 표본이 없습니다.
- 부수 성과: 개별 항목끼리 서로 모르는 채 "표본 유일"을 주장하던 교차 모순
  2건 정정(Blueprint·Kaizen이 각각 '모달 오버슈트는 자기뿐').
- 영어판(`implementation-defaults.md`) 머리말에 "결론 스냅샷이며 원문이
  우선"임을 명시. **다음 재종합 때 영어판 본문도 함께 갱신할 것.**
- 축별 다이제스트 보존: `/private/tmp/claude-501/-Users-sey-yeah-311kakao-com-Downloads-0000-git-repository/digest-shared/`
  (세션 밖 경로 — 단, 재부팅 시 사라질 수 있으므로 필요하면 재생성)

## B-3. ~~B-1 문서 사이트 렌더~~ → 완료 (2026-08-18)

37개 시스템을 헤드리스 Chrome으로 전수 확인했습니다 (4팀 병렬).
**해소 27 · 부재 확정(C) 37 · 렌더 실패 0.**

**가장 중요한 결과는 분류가 과대 계상이었다는 것**입니다 — B-1은 "SPA라
렌더가 필요하다"였는데, 실제로는 **정적·SSR이라 렌더가 불필요한 것이 다수**였고
Odyssey는 **SPA가 아니라 Okta SSO 뒤**였습니다. 상세·렌더 실무 메모는
`design-systems/UNVERIFIED.md`의 "B-1 렌더 결과" 절.

부수 정정 2건:
- **Spectrum `figma_kit: true` → `false`** — UI 킷 페이지가 "XD files" 명시 +
  CMS `patterns_figma_url`이 null. 기존 값은 출처 없이 들어가 있었습니다.
- **`figma_kit` 타입 오염 13건 정규화** — 값에 설명이 붙어 불리언이 문자열로
  깨져 있었습니다. 값(`true`/`false`/`미확인`)과 근거(본문)를 분리.

**잔여 (다음 사람이 이어받을 지점):**
- [ ] `a11y_target` 미확인 **59건** · `figma_kit` **49건** — 남은 최대 덩어리.
  상당수는 이미 C(선언 없음)일 가능성이 높지만 **확인 전까지는 미확인**입니다
- [x] ~~Odyssey~~ — **npm 경로로 해소 (2026-08-18)**: 토큰 전수 206
  (타이포 13단계·전역 트랜지션 100ms linear 1쌍·보더 1.5px 비정수·
  Depth/Shadow 병존), 컴포넌트 ≈95종 실측. 문서 층(접근성 목표·Figma 킷)만
  SSO 뒤로 남음 — npm으로는 종결
- [ ] **Backpack `url`이 사실상 죽은 주소** — `backpack.github.io`는 루트만 200이고
  하위 전부 404, 실제 문서는 `skyscanner.design/latest`(Supernova).
  값이 `미확인`이 아니라 자동 분류에 안 걸립니다 — **교체 여부 판단 필요**
- [x] ~~`license` 미확인 9건 · `repo` 1건~~ — **처리 (2026-08-18, 컨테이너)**:
  Android 3건 = 문서 CC BY 2.5·코드 Apache 2.0 (developer.android.com/license 확인) ·
  KRDS = npm ISC 선언 · Apple 5건 = 시도 기록 남기고 미확인 유지
  (resources 페이지 JS 렌더링 — 로컬 세션 몫) ·
  Nord repo = nordhealth/design-system 선언 확인(접근은 인증 요구)

## C. 정기 운영 — 자동화가 잡아주는 것

- [ ] **월간 freshness CI** 결과 처리 (절차: `freshness.md` — 실례 4건:
  Base Web·Mística·Pajamas + **Polaris 저장소 아카이브**(2026-08-18, 값 아닌 지위 드리프트))
  - ✅ **드리프트 3건 처리 (2026-08-18)** — USWDS 3.13.0→**3.14.0**(minor) ·
    Grommet 2.56.0→**2.56.1** · Vibe `@vibe/core` 4.5.8→**4.5.9**.
    **셋 다 기록 값 무변경**입니다. 판정 근거:
    USWDS는 토큰 디렉터리 전체 `diff -rq`에서 차이가 2파일뿐이고
    `font/stacks.scss`는 **줄바꿈만 바뀐 포맷 변경**, 실변경은 미수집 층인
    컬러의 `"ink"` 매핑(`base-darkest`→`base-ink`) 하나 — 컬러 수집 시 기준점.
    Grommet은 기록한 5개 토큰 절(`dataTable`·`sidebar`·`tab`·`menu`·`notification`)을
    절별 대조해 전부 동일, 변경은 `dateTimeInput` 신규 + SPDX 헤더 삽입.
    Vibe는 **토큰 출처인 `monday-ui-style`이 0.26.2로 여전히 최신**이고
    컴포넌트 패키지만 올라간 경우 — 값 재수집 불필요.
    **교훈: minor 승급이라도 실변경은 포맷 잡음에 묻혀 있을 수 있으므로
    파일 단위 diff가 아니라 "우리가 기록한 절" 단위로 대조할 것.**
- [ ] **수동 확인 15건** — Figma 킷 5건(Apple HIG·macOS·visionOS·Atlassian·KRDS,
  커뮤니티 파일 Change Log)이 핵심. **macOS는 2026-08-18 MCP로 확인 완료**
  (Menu Bar and Dock 페이지 구조가 실측 당시와 일치 — 변경 없음).
  나머지 4건은 **파일 키가 코퍼스에 미기록**이라 MCP 확인 불가 —
  다음 로컬 세션에서 확인할 때 `source:`에 파일 키를 함께 기록할 것. github·web 종류 10건은 2026-08-18 네트워크로
  일괄 확인 완료(전부 변경 없음) — 다음 확인은 로컬 세션에서 같은 방식으로
- [x] ~~`hooks/install.sh` 새 클론 설치~~ — 이 클론에 설치됨 (`core.hooksPath=hooks`)
- [x] ~~Polaris Web Components 토큰 수집~~ — **완료 (2026-08-18, 기존 항목
  개편 방침 확정·수집)**: polaris.md "Web Components 세대" 절. 공개 토큰
  레이어 소멸(npm 없음·해시 변수) — 값은 CDN 번들 실측. 스페이싱 실값 동일·
  범위 절단, 웨이트 한 단계 경량화, 버튼 모바일 44px 반응형 전면화.
  **CDN 번들이 무버전이라 freshness 자동 감시 불가** — 재검증은 수동(번들 해시 대조)

## D. 선택적 확장 — 필요해지면

- [ ] **npm 부재로 보류된 시스템** — 방침 확정 (2026-08-18):
  **파일럿 후 수치 밀도가 충분하면 "문서층 표본"으로 편입.**
  - ✅ **LINE 편입 완료** (`systems/line.md`, 113번째·문서층 첫 표본)
  - ❌ **Kakao·Naver 편입 불가 확정** (2026-08-18 파일럿) — 공식 발행물이
    로그인 버튼 가이드 + 브랜드 CI뿐 (Kakao 실값 ~12개 · Naver ~10개,
    스페이싱·타이포·팔레트 스케일 전무). 사내 DS는 존재 정황만, 비공개.
    둘 다 브랜드색-버튼색 이원화 관찰(#FAE100/#FEE500 · #03C75A/#03A94D)은
    있으나 항목 밀도 미달 — **불가 사유는 라이선스가 아니라 밀도**입니다.
    참고: Naver brandGuide에 "재배포·템플릿·데이터셋·생성형 AI 학습자료 제공
    금지" 조항이 있으나 **대상은 로고 리소스(zip·이미지)**입니다 — 헥스값
    같은 수치는 사실 데이터라 md 기록에 문제없음 (HARVESTING 기록 규칙과 동일).
    로고 애셋 동봉·재배포만 불가. 재검토 조건: 공개 DS 문서/토큰 배포 신설 시
  - ✅ **파일럿 전량 종결 (2026-08-18)**: Rakuten ReX(npm 코드층 편입 —
    문서 사내화, npm 36패키지 MIT 생존) · Aurora(문서층 2호, 2019 동결 명기) ·
    Fleet(공개 CSS 실측, 코드 CC0) 편입 → **코퍼스 116**. Grab은 불가 —
    design.grab.com이 "Coming Soon"(실체는 사내 Duxton). **모니터링 대상**:
    design.grab.com 오픈 시 재평가
- [ ] **watchOS·tvOS Figma 킷** — 공개 링크 없음 확인(사용자 확인 완료).
  공식 킷이 공개되면 인접 ID 프로브로 수집
- [x] ~~코퍼스 본문 다국어화 1단계~~ — **완료 (2026-08-18)**:
  `patterns/implementation-defaults.md` (9절 통합 번역 977줄).
  다음 단계는 수요 생기면 systems/ 항목 또는 patterns 전문 번역
- [x] ~~`partial` 수집 심화~~ — **심화 대상 전량 완료 (2026-08-18, 총 79건).**
  4개 배치(20) + 웨이브 1(30: Thumbprint~Intergalactic) + 웨이브 2(29:
  Pajamas~Serendie + 토큰 전용 4종 컴포넌트 층 확인). 주요 정정: Blueprint
  10px 그리드 레거시 · Grommet 모바일 오버라이드 · Serendie compact/expanded
  방향 · bf-solid "컴포넌트 없음" 가정 · Asphalt "토큰만" 추정.
  **잔여 14건은 심화 비대상**: 플랫폼 문서형 7(Android TV·CarPlay·macOS·
  tvOS·visionOS·Wear OS·Tizen) · 팔레트/유틸 전용 2(Artsy·Open Props) ·
  문서층/신규 편입 4(LINE·Aurora·Fleet·ReX — 항목 본문에 실측 포함) ·
  Mantine(심화 데이터가 patterns/*.md에 기존)
- [ ] **agents/ 지침 실전 검증** — **design-review 1/3 완료 (2026-08-18)**:
  정착 플래너 대시보드에 절차 적용 → `agents/case-studies/frr-dashboard-review.md`
  (이탈 6 · 분기 4 · 비일관 8). 절차 자체의 결함 12건이 드러나 지침 개정(24곳) —
  리비전 고정·대비 계산 절차·헤드리스 렌더 규칙·산출물 배치 절 신설.
  **잔여: `event-instrumentation` · `localization` 2종** — 각각 실제 이벤트 시트와
  다국어 문자열을 가진 대상이 필요합니다 (제품 데이터 반입 금지 원칙 때문에
  대상 선정이 먼저)
- [x] ~~mockups/ 인벤토리 확충~~ — **완료 (2026-08-18)**: 1건 → 6건
  (Google·Samsung·Meta·Figma 공식·Microsoft — 부재 확인 3건 포함).
  추가 확충은 새 공식 소스가 생길 때

## E. 제작 지시서 계층 (2026-08-18 신설)

`profiles/`가 코퍼스(기술)와 분리된 규범 층입니다. 남은 것:

- [ ] `profiles/interpreted/` **비어 있음** — 실제 제품 작업에서 해석이 필요할 때
  채웁니다 (미리 만들면 검증 안 된 A 값만 쌓임)
- [ ] `tv-wall` 타이포 **U** — 3m 실물 검증이 필요합니다. 검증하면
  코퍼스(`systems/tvos.md` "남은 확인 사항")와 프로필 양쪽을 갱신
- [x] ~~코퍼스 갱신 시 `profiles/measured/` **재생성**이 필요한지 점검~~ —
  **완료 (2026-08-19).** `to-design-md.mjs`의 하드코딩 값을 patterns 재종합 절과
  대조: 버튼 40px(button.md 77표본 최빈) · 모달 512px/450~520 대역(modal.md 79표본) ·
  간격 6단·라운드 0·4·8·16(scales.md)은 **일치**. **본문 14px 진영의 표본 수만
  낡아 있었습니다**(13 → **17**) — 아래 "이번에 고친 것" 참조. 4종 재생성 후
  린트 오류 0 · 경고 0 재확인

## 하지 않기로 한 것 (기록)

- ~~문서 사이트 스크래핑 우회 시도~~ — 컨테이너 세션 한정으로 유지.
  로컬 세션은 차단 자체가 없어 우회가 불필요합니다 (`HARVESTING.md` 상단)
- 소유자의 Figma 제품 라이브러리(2개, 이름은 여기 적지 않습니다) 수집 — 제품 데이터 반입 금지 원칙
- 특정 제품의 이벤트 정의·번역 문자열 커밋 — 해당 제품 저장소 소관

## 이번에 고친 것 (2026-08-19)

코퍼스 **내부 비일관 3건**을 해소했습니다. 새 수집이 아니라 **이미 가진 값끼리
어긋나 있던 것**들이고, 셋 다 "같은 날 보강한 표가 아래 요약 문장에 반영되지
않은" 같은 형태였습니다.

| 위치 | 어긋남 | 처리 |
|------|--------|------|
| `patterns/typography.md` | "본문 기본 크기" 표의 14px 행은 **17표본**인데, 200줄 아래 "구현 시 기본값"은 **13개**라고 요약 (`full` 수집 대형 5종 보강분 4표본 누락) | 17로 정정 + Spectrum이 데스크톱 한정임을 명시 + "표가 기준" 규칙 추가 |
| `tokens/scales.md` | "격자가 4px이 아닌 시스템" 절의 **제목 6표본 · 표 8행 · 본문 8표본**이 셋 다 다름 | 제목을 8표본으로 맞추고, **8행이 같은 유형이 아니라는 것**(Braid·KRDS는 표기만 다름 → 실제 이탈은 6)을 명시 |
| `to-design-md.mjs` · `profiles/README.md` · `case-studies/system-selection-calendar.md` | 위 13표본을 그대로 인용 | 17로 전파 · `profiles/measured/` 4종 재생성 |
| `data/values.json` | 기계가독 추출본이 13px 진영 1표본 · 14px 진영 13표본 · 비4px 격자 "6표본"/"7표본 중 3곳"으로 낡아 있었음 | 2·17·"8행 중 실제 이탈 6, 그중 4곳"으로 정정 + `sample_size: 100`이 축의 표본 수가 아님을 주석으로 명시 |

**교훈 (`agents/design-review.md`가 이미 규칙화한 것의 실례입니다):**
같은 문서 안에서도 **표/재종합 절이 요약 문장보다 최신**입니다. 보강은 표에
들어가는데 요약 문장은 손대지 않고 남는 경로가 반복 확인됐습니다. 요약을 인용할
때는 그 축의 표를 한 번 세어 보세요.

**FRR 표본 관련 후속은 여기서 처리할 수 없습니다.** 차트 색 하드코딩 ·
카탈로그↔대시보드 드리프트 · `--yellow` 대비 미달은 전부
프라이빗 리포(주소 비기록) 소관이고, 이 컨테이너 세션은
해당 리포에 접근 경로가 없습니다(`add_repo` 크로스수집 깊이 거부 · 클론 인증 실패 ·
github MCP 스코프 밖 — 3경로 모두 확인). 제품 데이터 반입 금지 원칙으로도
수정본을 이 리포에 두지 않습니다.

## F. 공개 사이트 (2026-08-19 신설)

`site/build.mjs` → `docs/` 로 GitHub Pages 한 장을 만들었습니다
(`site/README.md`에 구조·갱신 절차·근거 등급). 남은 것:

- [ ] **저장소 설정에서 Pages 켜기 (소유자만 가능)** —
  Settings → Pages → Build and deployment → Source: **GitHub Actions**.
  켜면 `.github/workflows/pages.yml`이 이후 배포를 전부 맡습니다.
  **자동화 3경로가 전부 막혔습니다** (2026-08-20 확인):
  ① github MCP에 Pages 도구 없음 ② 워크플로의 `configure-pages`
  `enablement: true` → `Resource not accessible by integration`
  (`pages: write`로도 사이트 *생성*은 불가, run 32322753388)
  ③ REST API 직접 호출 → 이 세션 이그레스 프록시가 차단
- [x] ~~저장소 이름 변경 반영~~ — `design-ops-kit` → **`self-made-design-ops`**.
  저장소 URL은 GitHub이 리다이렉트하지만 **Pages 주소는 리다이렉트되지 않습니다**
  (현재 이름 기준). README 6종·사이트·에이전트 지침의 링크를 전부 갱신
- [x] ~~사이트 문안 언어~~ — **영어로 전환 (2026-08-19).** 링크 대상 문서가
  한국어라는 사실을 페이지에 명시했습니다. 데이터에서 오는 한국어 값은
  `TOKEN_LABEL_EN` 표에 있는 것만 영어 라벨을 붙이고 원문은 툴팁으로 남깁니다
- [ ] `TOKEN_LABEL_EN` 미등록 `tokens_format` 값은 한국어 원문 그대로 나갑니다.
  새 표본이 들어와 표기가 늘면 표에 추가해야 하고, 자동 검증이 없습니다
- [ ] `docs/index.html`의 축 한 줄 결론 9개는 **사람이 쓴 요약**입니다.
  `patterns/*.md` 결론이 바뀌면 같이 고쳐야 하고, 자동 검증이 없습니다
  (표본 수만 생성기가 문서에서 읽습니다)

## G. 사이트 시각 정리 (2026-08-20)

- [x] **다크 온리 전환** — 라이트 테마·토글·FOUC 스크립트 제거. `:root` 하나가
  다크 값을 들고 `color-scheme: dark`. 팔레트는 **GitHub Primer 다크**를 참조
  시스템으로 채택(액센트 `#1f6feb`만 코퍼스 실측, 중립색은 A)
- [x] **배경 도트 안 보이던 버그 수정** — `body::before z-index:-1`은 불투명한
  `html` 배경 뒤로 밀려 실제 페이지에서 사라졌습니다. `body`의 `background-image`
  (`attachment: fixed`)로 직접 칠하는 방식으로 바꿔 해결. 로컬 렌더로 도트가
  실제로 그려지는 것을 확대 크롭으로 확인
- [ ] **라이브 페이지 육안 확인은 소유자 몫으로 남음** — `keepyaoung.github.io`가
  이 컨테이너 이그레스 프록시에 막혀 있어 배포된 결과를 직접 못 엽니다.
  배포 파이프라인 성공 + 배포되는 파일 그 자체를 헤드리스로 검증한 상태입니다
