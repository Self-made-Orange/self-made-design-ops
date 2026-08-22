<!-- lang-links -->
> [English](UNVERIFIED.md) · **한국어**
<!-- /lang-links -->

# 미확인 항목 분류

`systems/*.md`의 `미확인` 표기를 **지금 해소 가능한 것 / 조건이 갖춰져야 되는 것 /
구조적으로 불가능한 것**으로 나눈 문서입니다.

정직한 표기는 미덕이지만, **분류되지 않은 428건은 숫자일 뿐 정보가 아닙니다.**
"아직 안 열어봐서 모른다"와 "그 시스템이 애초에 공개하지 않는다"는 완전히 다른 사실인데,
`미확인` 한 단어가 둘을 같은 칸에 넣습니다. 이 문서가 그 둘을 갈라 놓습니다.

**작성·전수 확인: 2026-08-18.** 갱신 절차는 맨 아래 「재점검 절차」를 보세요.

## 총계

| | 8/18 이전 | 1차 분류 후 | **B-1 렌더 후 (현재)** |
|---|:---:|:---:|:---:|
| `미확인` 문자열 등장 | 428 | 359 | **308** |
| frontmatter 미확인 필드 | — | — | **118** (a11y_target 59 · figma_kit 49 · license 9 · repo 1) |

**2회에 걸쳐 총 120개 표기가 사라졌습니다** — 1차(소스 재탐색) 66개 필드,
2차(**B-1 헤드리스 렌더**, 37개 시스템 4팀 병렬) 64건 처리(해소 27 · 부재 확정 37).

> **숫자는 측정 시점의 스냅숏입니다.** 아래 「재점검 절차」 1번의 두 줄로 다시 세세요.

## B-1 렌더 결과 — 분류 자체가 과대 계상이었습니다 (2026-08-18)

37개 시스템을 헤드리스로 전수 확인한 결과, **B-1(SPA라 렌더가 필요하다)는
과대 계상**이었습니다:

| 실제 상태 | 내용 |
|---|---|
| **정적·SSR이었음** | 다수 — curl로 본문이 그대로 나와 렌더 자체가 불필요했습니다 (W4 담당 10종 중 8종) |
| 진짜 SPA | 렌더로 값 확보 (Base Web · Canvas · Cloudscape · artsy-palette 등) |
| **SPA가 아니라 인증 뒤** | **Odyssey** — `odyssey.okta.com`이 Okta SSO 로그인 화면입니다. B-1이 아니라 **B-4(로그인 필요)** |
| 렌더해도 없음 | 다수 → **C 확정**. "안 열어봐서 모른다"가 "없는 걸 확인했다"로 바뀐 것이 이번 작업의 실질 성과입니다 |

**분류를 신뢰도 기준으로 다시 읽으세요** — curl 본문 길이만으로 나눈 1차 분류는
"렌더가 필요할 수 있다"는 **상한 추정**이지 확정이 아니었습니다.

### 렌더 실무 메모 (다음 작업자용)

- **Chrome이 `--dump-dom` 후 종료하지 않고 매달립니다.** DOM은 정상 기록되므로
  워치독으로 죽이세요 — macOS엔 `timeout`이 없어 `perl -e 'alarm shift; exec @ARGV' 150 ...`.
  **병렬로 띄우면 더 심합니다** — 순차 실행이 안정적입니다.
- **`sed 's/<[^>]*>//g'`만으로는 인라인 CSS가 남습니다** — `<script>`·`<style>` 블록을 먼저 제거하세요 (Carbon은 2.8MB 중 대부분이 CSS였습니다).
- **CloudFront가 헤드리스 기본 UA를 403 차단합니다** (canvas.workday.com · tegel) — `--user-agent` 위장 필요.
- **Storybook 사이트는 상위 URL이 사이드바만 줍니다** — 본문은 `iframe.html?id=<id>&viewMode=docs`, 스토리 목록은 `/index.json`을 curl로.
- **zeroheight 사이트는 경로가 해시형**입니다 (lightning) — 루트를 렌더해 `href`부터 추출하세요.
- **작업 후 프로세스 정리는 필수**입니다 (`agents/design-review.md`의 뒷정리 절) — 좀비가 남으면 메모리를 계속 잡습니다.

## A / B / C 분포 — 1차 분류 기준 (B-1 렌더 이전)

| 분류 | 건수 | 뜻 |
|:---:|:---:|------|
| **A. 지금 해소 가능** | **123** | 소스가 열려 있고 경로만 더 파면 되는 것 |
| **B. 조건부** | **136** | 브라우저·계정·URL 갱신 등 선행 조건이 있는 것 |
| **C. 구조적 불가** | **45** | 시스템이 그 값을 배포·공개하지 않음 — **부재가 사실** |

**B-1(87건)은 위 렌더 작업으로 소진됐습니다.** 남은 B는 SPA 외 조건
(로그인·소멸·Figma 킷)이고, C는 이번 렌더로 **더 늘었습니다**(부재 확정 37건).

분류 기준은 추측이 아니라 **실측**입니다. 100개 시스템의 `url`을 전부 열어
HTTP 코드 · 리다이렉트 도착지 · 태그 제거 후 본문 길이를 측정했고, 그 결과로 나눴습니다.

## A. 지금 해소 가능 — 123건

| 하위 유형 | 건수 | 필드 구성 |
|------|:---:|------|
| 문서 사이트가 HTML로 읽힘 — 경로 추가 탐색 | 87 | `a11y_target` 31 · `## 접근성` 29 · `figma_kit` 25 |
| npm·GitHub 경로가 이미 있음 — 미탐색 구간 | 36 | 토큰·컴포넌트 본문 절 (`HARVESTING.md` 교훈 6 유형) |

**문서 사이트가 읽히는 37개 시스템** — 홈과 사이트맵의 accessibility 페이지까지는 훑었으나
WCAG·Figma 문자열이 안 나온 곳입니다. 더 깊은 경로(`/foundations/*` · `/about/*` ·
`/resources/*`)가 남아 있습니다:

> ant-design · astro-uxds · bolt · bootstrap · braid · chakra-ui · codex · digital-go-jp ·
> eui · evergreen · fleet-boston · garden · grommet · headless-ui · helios · heroui ·
> intergalactic · italia · mui · nasa-wds · nhs · pajamas · panda-css · park-ui · pie ·
> priceline · protocol · semi · serendie · sgds · shoelace · skeleton · spindle · stacks ·
> thumbprint · tizen-circularui · welcome-ui

**npm·GitHub 미탐색 31개 시스템** — frontmatter `source`에 패키지 경로가 이미 적혀 있고,
그 패키지 안에서 아직 안 연 파일이 남은 경우입니다:

> ant-design · astro-uxds · atlassian · audi-ui · auro · backpack · base-web · blueprint ·
> canvas · carbon · codex · eui · fluent-2 · gestalt · govuk · helios · heroui · italia ·
> lightning · material-3 · open-props · orbit · origami · persona · primer · protocol ·
> semi · serendie · tizen-circularui · vapor · vuetify

**착수 전에 `HARVESTING.md`의 교훈 15건을 읽으세요.** 이 36건은 대부분
"`@import` 한 줄짜리 파일에 속았다"(교훈 4·13) · "`dist/cjs/`를 안 봤다"(교훈 11) ·
"보조 디렉터리(`internalCss`·`docs`·`figma`)를 건너뛰었다"(교훈 14) 계열입니다.

## B. 조건부 — 136건

### B-1. 문서 사이트가 SPA 빈 셸 — 87건 (37개 시스템)

curl로 200이 오지만 태그를 벗기면 본문이 **0~500자**입니다. 값은 존재하나
**브라우저 렌더링 없이는 읽히지 않습니다.**

| 본문 길이 | 시스템 |
|:---:|------|
| 0자 | base-web |
| 4~40자 | naive-ui · artsy-palette · clarity · mistica · strapi · lightning · vibes · kaizen · vuetify · pharos · charcoal · vibe |
| 50~500자 | ebay-skin · porsche · backpack · seed-design · auro · blueprint · persona · odyssey · yoga |
| (교차 표본) | aurora-gc · canvas · carbon · cloudscape · open-props · polaris · radix-themes · shadcn-ui · siemens-ix · spectrum · tailwind · tegel · uswds · vapor · ring-ui |

**해소 조건:** 헤드리스 브라우저(로컬 세션). `agents/` 아래 design-review 지침의
좀비 프로세스 뒷정리 규칙을 함께 지키세요.

### B-2. 문서 사이트 소멸·이전 — 15건 (6개 시스템)

| 시스템 | 실측 결과 |
|--------|------|
| `paste` | `paste.twilio.design` → **github.com/twilio-labs/paste로 리다이렉트** (문서 사이트 폐지) |
| `bf-solid` | `solid.buzzfeed.com` → `buzzfeed.com` 정적 자산 경로로 이동 |
| `audi-ui` | `github.com/audi/audi-ui` **HTTP 404** (저장소 삭제) |
| `wmn` | `designsystem.wmnetwork.co.uk` → `designsystem.tfwm.org.uk` (조직명 변경) |
| `primevue` | `primevue.org` → `primevue.dev` |
| `krds` | 저장소·문서 모두 SPA. npm `krds-uiux`는 3자 재배포판 |

**해소 조건:** frontmatter `url`·`repo`를 먼저 갱신해야 합니다. 갱신 없이 재수집하면
같은 404를 다시 만납니다.

### B-3. 문서 사이트 응답 없음·차단 — 13건 (4개 시스템)

`hsds` (HTTP 000) · `kontur` (000) · `orbit` (000) · `dsfr` (403).
로컬 macOS 세션에서도 열리지 않았습니다 — 네트워크 제약이 아니라 사이트 쪽 문제입니다.

### B-4. 문서 사이트 로그인 필요 — 11건 (4개 시스템)

| 시스템 | 실측 결과 |
|--------|------|
| `gestalt` | **Okta 로그인 벽** — "You need to sign in to access internal pages" |
| `origami` | `origami.ft.com` → **Google/Okta SSO 리다이렉트** |
| `vitamin` | `decathlon.design` → `/login` |
| `pluralsight` | `design-system.pluralsight.com` → `pando.zeroheight.com` (zeroheight 계정) |

**Pinterest Gestalt가 공개 문서를 내리고 사내화한 것은 이번 확인에서 나온 사실입니다.**
코퍼스의 Gestalt 항목은 npm 패키지 기반이라 유효하지만, 문서층은 더는 못 채웁니다.

### B-5. Figma 킷 접근 필요 — 6건 (4개 시스템)

`apple-hig`(컴포넌트 목록·타이포) · `visionos`(스페이싱/라운드) ·
`carplay`(타이포/컬러/스페이싱) · `android-automotive`(컴포넌트 목록).

**해소 조건:** Figma MCP + 해당 킷 접근. `HARVESTING.md`의
"인접 ID 프로브"(페이지 ID가 같은 대역의 홀수) 절차를 그대로 쓰면 됩니다.

### B-6. 기타 — 4건

`nord`·`vapor`의 `repo`(2) · `vapor`의 `url`(1) · `krds`의 `license`(1).
`krds`는 저장소에 LICENSE 파일이 없고 npm `krds-uiux@1.1.0`의 `license`는 `ISC`인데,
이는 `npm init` 기본값이라 **KRDS 본체의 라이선스로 볼 수 없습니다** — 그래서 미확인 유지입니다.

## C. 구조적 불가 — 45건 · **이것들은 발견입니다**

`미확인`이 "안 봐서 모른다"가 아니라 **"보았고, 그 시스템은 이 값을 공개하지 않는다"**인 경우입니다.
부재 자체가 코퍼스 정보입니다.

### C-1. 플랫폼 문서·Figma 킷만 배포 — 26건 (8개 시스템)

`apple-hig` · `carplay` · `tvos` · `visionos` · `macos` · `android-tv` ·
`android-automotive` · `wear-os`.

- **`license` 8건 — 저장소가 없으므로 LICENSE 파일도 없습니다.**
  Apple·Google은 디자인 리소스를 코드로 배포하지 않고 문서와 Figma 킷으로만 냅니다.
  npm·GitHub 어느 경로로도 SPDX 식별자가 나오지 않습니다.
- **`a11y_target` 8건 — WCAG 준수 목표를 선언하지 않습니다.**
  두 회사 모두 접근성 문서를 두지만, **디자인시스템 차원의 적합성 목표는 걸지 않습니다.**
  이건 웹 시스템 표본과 갈리는 지점입니다 — 웹 쪽은 목표를 명시하는 쪽이 다수입니다.
- **`## 접근성` 7건** — 위와 같은 이유.

**플랫폼이 다르면 토큰 구조가 다르다는 `platforms.md`의 결론이 메타데이터 층에서도 반복됩니다.**
모바일·차량·TV OS는 라이선스도 접근성 목표도 배포 단위가 아닙니다.

### C-2. 비공개·사내화 — 19건 (7개 시스템)

| 시스템 | 상태 |
|--------|------|
| `line` | LINE Design System — 비공개. npm은 서체 `line-seed-*`만 |
| `rakuten-rex` | `rex.rakuten.design` **403 (사내화)**. `github.com/rakuten-rex` org는 존속하나 공개 리포 0개 |
| `toss-tds` | 미니앱 문서만 공개. 분할 배포된 `@toss/tds-*` 패키지가 실질 소스 |
| `unify` | Tokopedia Unify — 저장소 비공개 |
| `asphalt` | Gojek Asphalt — 저장소 비공개 |
| `nord` | **npm에는 올라와 있으나 오픈소스가 아닙니다** (아래 참조) |
| `frr-dashboard` | 프라이빗 리포 (내부 표본, 공개 카운트 제외) |

### C-3. 이번에 "부재"로 확정해 해소한 2건

**부재를 확인하는 것도 해소입니다.** `미확인`(안 봄)에서 `null`/`false`(보았고 없음)로 옮겼습니다.

| 시스템 | 필드 | 확정 내용 |
|--------|------|------|
| `mantine` | `figma_kit: false` | "Design is not a part of the development process – **there are no official Figma or Sketch design files**" — 표본에서 **부재를 명문화한 유일한 사례** |
| `bootstrap` | `a11y_target: null` | WCAG 2.2 A/AA/AAA를 **"달성 가능"으로만 서술**하고 자체 준수는 선언하지 않습니다. 오히려 **기본 팔레트가 WCAG 대비에 미달할 수 있다고 스스로 경고** — 표본에서 자기 미달을 명시한 유일한 사례 |

## 이번에 해소한 66건

전부 실값 + 출처 경로 + 패키지@버전을 함께 적었고, 해당 파일의 `verified`를 갱신했습니다.

### `license` 34건 — 44 → 9

| 값 | 시스템 |
|------|--------|
| MIT | digital-go-jp · evergreen · forma-36 · hsds · mistica · orbit · pajamas · paste · pharos · semi · sgds · vapor |
| Apache-2.0 | atlassian · auro · backpack · blueprint · garden · gestalt · pluralsight · seed-design · thumbprint |
| MPL-2.0 | helios · protocol |
| BSD-3-Clause | lightning |
| GPL-2.0-or-later | codex |
| CC0-1.0 | nasa-wds |

**단순 SPDX로 안 끝나는 8건이 더 중요합니다:**

| 시스템 | 값 | 왜 중요한가 |
|--------|------|------|
| `polaris` | 커스텀 (MIT 본문 + Shopify 연동 앱 한정 조건) | **MIT로 적으면 틀립니다** — "applications that integrate or interoperate with Shopify" 제한이 붙습니다 |
| `nord` | 독점 (Nordhealth 사내 사용 한정 — 재배포 금지) | **공개 npm에 있지만 오픈소스가 아닙니다** |
| `dsfr` | Etalab-2.0 + 사용 제한 CGU | 오픈 라이선스에 **사용 주체 제한**(행정 외부 금지 · `.gouv.fr` 밖 복제 제한)이 얹힌 표본 |
| `eui` | SSPL-1.0 / Elastic-2.0 듀얼 | 파일 헤더가 우선하며 기본값이 듀얼 |
| `porsche` | code: Apache-2.0, assets: 별도 계약 | 코드와 브랜드 에셋의 라이선스가 갈립니다 |
| `cedar` | code: MIT, tokens: ISC | **컴포넌트 저장소와 토큰 저장소의 라이선스가 다릅니다** |
| `astro-uxds` · `uswds` | 퍼블릭 도메인 계열 | 미국 정부 발주·저작물. USWDS는 폰트 OFL-1.1 · 아이콘 Apache-2.0이 섞입니다 |

### `a11y_target` 18건 — 104 → 85

| 값 | 시스템 |
|------|--------|
| WCAG 2.2 AA | cedar · helios · nhs · nysds · vanilla |
| WCAG 2.1 AA | fluent-2 · forma-36 · tegel |
| WCAG 2.1 A/AA | canvas (**레벨을 A와 AA로 병기하는 드문 표기**) |
| WCAG 2.1 (레벨 미명시) | eui · grommet |
| WCAG AA (버전 미명시) | siemens-ix |
| WCAG 2.1 + Section 508 | leafygreen (원문이 두 규격을 뒤섞음 — 그대로 인용) |
| WCAG (버전·레벨 미명시) | ark-ui · primevue |
| 자체 방침 상위 | smarthr (WCAG 2.2 참조) · spindle (WCAG 2.1 기반 Ameba 가이드라인) |
| 선언 없음 → `null` | bootstrap |

**교차 비교로 드러난 것 두 가지:**

1. **버전·레벨을 다 적는 쪽이 오히려 소수입니다.** 18건 중 9건만 `2.x + AA`를 갖췄고,
   나머지는 레벨 누락(2) · 버전 누락(1) · 둘 다 누락(2) · 자체 방침 대체(2) · 선언 없음(1)입니다.
2. **일본계 두 시스템(SmartHR·Spindle)이 같은 구조를 씁니다** — WCAG를 그대로 목표로 걸지 않고
   **자체 가이드라인으로 번역해 상위에 두고**, 각 항목에 WCAG 달성 기준 번호를 붙입니다.
3. **`nysds`만 법정 기한을 함께 적습니다** — 2027-01 뉴욕주 기술법(STL §103-d)이 WCAG 2.2 AA,
   2027-04-26 미 법무부 규칙이 WCAG 2.1 AA. 목표의 **출처가 규제**인 유일한 표본입니다.

### `figma_kit` 14건 — 92 → 78

`true` 13건 — evergreen · forma-36 · heroui · intergalactic · leafygreen · nysds ·
pajamas · park-ui · pluralsight · ring-ui · serendie · smarthr · vanilla
(전부 공식 문서 사이트 또는 저장소 README의 `figma.com` 링크로 확인. 링크 URL을 각 파일 `## 참고`에 기록)

`false` 1건 — mantine (위 C-3)

**`figma.com/@조직` 프로필 링크만 있는 경우는 해소하지 않았습니다** —
프로필의 존재가 공식 라이브러리 배포를 뜻하지는 않기 때문입니다.
`forma-36`·`intergalactic`·`evergreen`은 프로필 외에 **본문에 라이브러리 안내 문구**가
따로 있어서 해소했습니다.

## 재점검 절차

다음 사람이 이어받는 순서입니다.

1. **현황 재계산**
   ```bash
   cd design-systems
   grep -o "미확인" systems/*.md | wc -l          # 총 등장
   grep -oE "~~[^~]*미확인[^~]*~~" systems/*.md | wc -l   # 취소선(기해소)
   ```
   차이가 **열린 미확인**입니다. 이 문서의 「총계」 표를 갱신하세요.

2. **분류 갱신은 실측으로** — 문서 사이트를 열어 HTTP 코드·리다이렉트·본문 길이를 재고
   A/B/C를 다시 나눕니다. **본문 900자 미만이면 SPA로 보고 B-1**입니다.
   사이트 상태는 자주 바뀝니다 (이번에도 Gestalt 사내화 · Paste 폐지 · audi-ui 404가 새로 나왔습니다).

3. **착수 우선순위**
   1. **A / npm·GitHub 미탐색 36건** — 네트워크 없이도 되고 `HARVESTING.md` 교훈이 그대로 적용됩니다
   2. **A / 문서 사이트 87건** — 로컬 세션에서 사이트맵의 `accessibility`·`figma` 경로부터
   3. **B-2 (URL 갱신 6건)** — 값을 캐기 전에 `url`·`repo`부터 고쳐야 합니다
   4. **B-1 (브라우저 87건)** — 헤드리스 렌더링. 뒷정리 규칙 준수
   5. **B-5 (Figma 킷 6건)** — 인접 ID 프로브

4. **해소 시 표기 규칙** (기존과 동일)
   - frontmatter: `미확인` → 실값. **취소선을 쓰지 마세요** — YAML이 깨집니다
   - 본문: `미확인` → `~~미확인~~ → **실값 (YYYY-MM-DD 해소).**` + 출처 경로
   - 출처는 `npm <패키지>@<버전> → <파일 경로>` 또는 `github <org>/<repo> → <파일>` 형식
   - `verified:`를 그날 날짜로 갱신
   - **부재를 확인했으면 `null`/`false`로 적고 근거를 본문에 남기세요.**
     `미확인`으로 두면 다음 사람이 같은 사이트를 또 엽니다

5. **추측 금지는 그대로입니다.** 확인 못 했으면 값을 비우고 분류만 갱신하세요
   (`SCHEMA.md` 원칙 3).

## 관련 문서

- `HARVESTING.md` — 수집 경로와 교훈 15건. **A 분류 착수 전 필독**
- `SCHEMA.md` — frontmatter 필드 정의와 `null` vs `미확인` 구분
- `freshness.md` — 소스 버전 신선도 (`check-sources.mjs` 생성)
- `index.md` — 시스템 목록과 수집 깊이
