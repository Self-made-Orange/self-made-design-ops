# Self-Made DesignOps

![Design systems](https://img.shields.io/badge/design_systems-116-blue)
![Pattern axes](https://img.shields.io/badge/pattern_axes-9-8A2BE2)
![Platforms](https://img.shields.io/badge/platform_axes-7-teal)
![Machine readable](https://img.shields.io/badge/data-JSON-orange)
![Agent guides](https://img.shields.io/badge/agent_guides-4-green)
![Docs language](https://img.shields.io/badge/corpus_language-English%20%2B%20한국어-blue)

[English](README.md) · **한국어** · [日本語](README.ja.md) · [简体中文](README.zh-Hans.md) · [Bahasa Indonesia](README.id.md) · [Español](README.es.md)

📖 **[웹에서 코퍼스 둘러보기](https://keepyaoung.github.io/self-made-design-ops/)** — 116개 시스템 전부를 플랫폼·수집 깊이·도메인으로 걸러 찾아볼 수 있습니다.

디자인과 개발 사이에서 반복되는 작업을 **공용 자산으로 만들어 두는 저장소**입니다 — 여러 제품에 재사용되는 규약·레퍼런스·도구를 담습니다. **특정 제품의 실 데이터는 두지 않습니다** — 그건 해당 제품 저장소에 속합니다.

`design-systems` `design-tokens` `ui-patterns` `event-taxonomy` `i18n` `l10n` `llm-agents` `figma`

## 어떻게 쓰는가

**1. "이 값, 우리만 이상한가?" — 확인하고 논쟁을 끝냅니다.**
버튼 높이를 두고 회의에서 20분 다투는 대신 `design-systems/patterns/button.md`를 엽니다.
77개 시스템 실측 분포가 있고, **최빈값이 40px이지만 그마저 약 23%**라
"업계 표준 높이는 없다"가 결론입니다. 논쟁이 *"무엇이 맞나"*에서
*"우리 밀도에 무엇이 맞나"*로 옮겨집니다.

**2. 새로 만들 때 — 빈 화면에서 시작하지 않습니다.**
각 `patterns/*.md` 끝의 **「구현 시 기본값」** 절이 목적지입니다.
스페이싱·타이포·모션 스케일을 처음부터 발명하지 말고, 여기서 시작해 필요한 것만 바꾸세요.

**3. 리뷰 근거 — 취향이 아니라 표본으로 말합니다.**
"이건 좀 아닌 것 같아요" 대신 **"이 값은 79표본에 반례가 없습니다"**라고 쓸 수 있습니다.
`agents/design-review.md`가 그 절차이고, 3분 판정(*수렴 이탈 / 수용 가능한 분기 /
내부 불일치*)이 **취향 지적과 실제 문제를 갈라냅니다.**

**4. LLM 에이전트의 근거 자료로.**
`design-systems/data/*.json`이 기계 가독이고 `agents/`에 실행 절차가 있습니다.
에이전트에게 시안 검수·이벤트 시트 작성·다국어 점검을 맡길 때 이 코퍼스를 물려주세요.

## 무엇이 좋아지는가

- **결정이 빨라집니다** — "다른 데는 어떻게 하지?"를 매번 검색하는 시간이 사라집니다.
- **결정이 남습니다** — 왜 그 값인지가 **표본 수와 함께** 기록되므로, 반년 뒤 같은 논쟁을 반복하지 않습니다.
- **틀린 통념이 걸러집니다** — 이 코퍼스도 표본을 늘리며 **자기 결론 24건을 뒤집었습니다**
  (예: "웹 모달 라운드는 8~12px에 몰려 있다" → 실제로는 그 대역이 **가장 얇은** 군집).
  소수 표본으로 굳은 관행이 얼마나 자주 틀리는지가 기록에 남습니다.
- **모르는 것을 모른다고 씁니다** — 확인 못 한 값은 `미확인`으로 남깁니다.
  그럴듯하게 채운 값보다 낫고, 다음 사람이 이어받을 수 있습니다.

> **처음이라면** — `design-systems/patterns/`에서 축 하나를 골라 **맨 끝 「구현 시 기본값」부터** 읽으세요.
> 그 위쪽은 전부 그 결론의 근거입니다.

## awesome-design-systems와 무엇이 다른가

[`alexpate/awesome-design-systems`](https://github.com/alexpate/awesome-design-systems)는 이 코퍼스의 후보 풀이었습니다 — 두 저장소는 목적이 다르고 상호 보완적입니다:

| | awesome-design-systems | **Self-Made DesignOps** |
|---|---|---|
| 정체 | 큐레이션된 **링크 목록** (~160개) | **검증값 코퍼스** (116개) |
| 콘텐츠 단위 | 이름 + URL | 실측 토큰 값 — 주장마다 출처·버전 고정 |
| 답하는 질문 | *"어떤 디자인시스템이 있는가?"* | *"실제로 어떤 값을 쓰고, 어디서 수렴·분기하는가?"* |
| 깊이 | 각 시스템 문서로 링크 | 시스템별 항목 + 교차 패턴 9축, 끝은 **구현 시 기본값** |
| 검증 | — | 미확인 값은 미확인으로 표기, 월간 신선도 CI가 고정 버전 재대조 |
| 기계가독 | — | `design-systems/data/*.json` |
| 소비자 | 둘러보는 사람 | 값을 정하는 사람 — 그리고 **LLM 에이전트** (`agents/` 절차) |

시스템을 발견할 때는 awesome 목록을, 버튼 높이를 정할 때는 이 코퍼스를 쓰세요.


## 구성

| 디렉터리 | 내용 | 상태 |
|----------|------|------|
| [`design-systems/`](design-systems/) | 공개 디자인시스템 레퍼런스 코퍼스 — 토큰 실값 기준 검증 | **116개** |
| [`agents/`](agents/) | LLM 에이전트 작업 지침 — 디자인 검수·이벤트 시트·로컬라이제이션 | 지침 4종 + 내비게이션 |
| [`profiles/`](profiles/) | **제작 지시서** — 코퍼스에서 파생한 `DESIGN.md` 프로필, 모든 값에 근거 등급 표기 | measured 4종 + interpreted 계층 |
| [`event-taxonomy/`](event-taxonomy/) | 분석 이벤트 시트 작성 규약 + 변환기/린터 | 규약 · 변환기 |
| [`i18n/`](i18n/) | 로컬라이제이션 규약 + 린터 | 규약 · 린터 |
| [`mockups/`](mockups/) | 디바이스 목업 자산 인벤토리 | Apple · Google · Samsung · Meta · Microsoft · Figma 공식 — **6종** |

> **참고:** 코퍼스 문서의 주 노출본은 영어이고, 한국어 원문이 `<slug>.ko.md`로 나란히 보존돼 있습니다. 토큰 값·표·JSON 추출본(`design-systems/data/`)은 언어 중립입니다.

## `design-systems/` — 코퍼스

"모달 너비를 몇 단계로 둘까", "스페이싱 스케일을 어디서 끊을까" 같은 결정 앞에서 **메이저 시스템들이 실제로 어떻게 했는지** 근거를 확인하기 위한 자료입니다. 모든 주장에 출처와 버전이 박혀 있고, 확인 못 한 값은 `미확인`으로 남깁니다.

- **`systems/`** — 시스템당 1파일(116개), YAML frontmatter(조직·수집 깊이·플랫폼·검증일·출처)
- **`patterns/`** — **9개 컴포넌트 축** 교차 비교: typography · color · button · form · motion · modal · table · navigation · feedback. 각 문서 끝의 **"구현 시 기본값"** 절이 이 코퍼스의 목적입니다
- **`tokens/scales.md`** — 스페이싱·라운드·보더 교차 비교. 핵심 결론: **보편 스페이싱 값은 없습니다** — 남는 것은 채택률 순위(4/8/16 최강, 그다음 32, 24)
- **`platforms.md`** — 플랫폼 7축 전부 표본 확보: web · mobile · desktop · spatial · automotive · wearable · tv. **플랫폼이 다르면 토큰 구조 자체가 다릅니다**
- **`data/`** — 기계가독 JSON (frontmatter 전체 + 교차 결론 큐레이션)
- **`GLOSSARY.md`** — 시스템 간 동의어/이의어 용어집 (Liquid Glass 파라미터, 알약 vs 정원, rem 루트 전제…)
- **`HARVESTING.md`** — 수집 방법과 우회 채널 (Apple HIG DocC JSON, androidx sparse-clone, Figma 인접 ID 프로브)
- **`INTEROP.md`** — 에이전트용 교환 포맷 **`DESIGN.md`**와의 관계(스펙·린터), 그리고 코퍼스 기본값을 스캐폴드로 내보내는 `to-design-md.mjs`
- **`check-sources.mjs`** — 신선도 감시: 항목별 고정 버전을 npm 최신과 대조 (월간 CI + git 훅)

### 권역별 수집 목록

**플랫폼 / OS 벤더 (10)** — Apple: iOS/iPadOS HIG, macOS 26, tvOS, visionOS, CarPlay · Google: Material 3, Android Automotive, Android TV, Wear OS · Samsung: Tizen CircularUI

**오픈소스 프레임워크 (19)** — Tailwind CSS, shadcn/ui, Mantine, Radix Themes, Chakra UI, Ark UI, Open Props, Bootstrap, MUI, HeroUI, Park UI, Naive UI, PrimeVue, Vuetify, Skeleton, Shoelace, Headless UI, Panda CSS, vanilla-extract

**북미 (42)** — Carbon(IBM), Fluent 2(Microsoft), Spectrum(Adobe), Lightning(Salesforce), Primer(GitHub), Polaris(Shopify), Cloudscape(AWS), Base Web(Uber), Gestalt(Pinterest), Canvas(Workday), Paste(Twilio), Garden(Zendesk), Blueprint(Palantir), Helios(HashiCorp), Pajamas(GitLab), EUI(Elastic), Evergreen(Segment), LeafyGreen(MongoDB), Clarity(VMware), Odyssey(Okta), Grommet(HPE), Protocol(Mozilla), Codex(Wikimedia), Stacks(Stack Overflow), Skin(eBay), Cedar(REI), Thumbprint(Thumbtack), Auro(Alaska Airlines), Priceline, Pluralsight, HSDS(Help Scout), Intergalactic(Semrush), Pharos(JSTOR), Palette(Artsy), Solid(BuzzFeed), Astro UXDS(우주·관제), NASA WDS, USWDS(미 연방), NYSDS(뉴욕주), Bolt(Pega), Aurora(캐나다 정부, 문서층 표본), Fleet(보스턴시)

**유럽 (22)** — GOV.UK, NHS, WMN(교통), Origami(Financial Times), Backpack(Skyscanner), Vanilla(Canonical), PIE(Just Eat Takeaway), DSFR(프랑스 정부), Vitamin(Decathlon), Strapi, Welcome UI(WTTJ), Porsche, Audi UI, Siemens iX, Forma 36(Contentful), Mística(Telefónica), Italia(이탈리아 정부), Tegel(Scania), Orbit(Kiwi.com), Ring UI(JetBrains), Nord(Nordhealth), Kontur UI(SKB Kontur)

**동아시아 (14)** — 한국: KRDS(정부), TDS(토스), Seed Design(당근), Vapor UI(구름) · 일본: LINE(LY Corp, 문서층 표본), ReX(라쿠텐), 디지털청, SmartHR UI, Charcoal(pixiv), Spindle(Ameba), Serendie(미쓰비시전기), Vibes(freee) · 중국: Ant Design(Ant Group), Semi Design(ByteDance)

**동남아시아 (4)** — SGDS(싱가포르 정부), Asphalt(Gojek), Unify(Tokopedia), Persona(Privy)

**오세아니아 (3)** — Atlassian, Braid(SEEK), Kaizen(Culture Amp)

**중남미 (1)** — Yoga(Wellhub) · **중동 (1)** — Vibe(monday.com)

## `agents/` — LLM 작업 지침

이 저장소를 사람의 참고 자료가 아니라 **에이전트의 작업 도구**로 쓸 때의 실행 절차입니다. [`agents/README.md`](agents/README.md)가 코퍼스 내비게이션(질문 유형 → 파일)과 공통 규율(인용 의무·추측 금지·린터 통과)을 담습니다. **다른 프로젝트에서 쓰려면**: 이 리포를 옆에 clone(또는 submodule)하고 제품 저장소 `CLAUDE.md`에 포인터를 추가하세요 — 복붙 스니펫과 피드백 루프는 [`agents/README.md`](agents/README.md)의 "다른 프로젝트에서 쓰기" 절에 있습니다. 지침 4종:

- **[`system-selection.md`](agents/system-selection.md)** — 제품 좌표(플랫폼·시청 거리·문자 문화권·도메인)에 맞는 참조 시스템 선정 — 단일 채택이 아니라 축별 분할, 코드 이식 전 라이선스 게이트
- **[`design-review.md`](agents/design-review.md)** — 코퍼스 근거 검수를 **3판정**으로: *수렴 이탈* / *허용 분기* / *내부 비일관*. 존재하지 않는 "16px 표준"을 근거로 14px 본문을 지적하는 오류를 구조적으로 막습니다
- **[`event-instrumentation.md`](agents/event-instrumentation.md)** — Figma·코드에서 UX 맥락을 읽고 `event-taxonomy/` 규약대로 이벤트 시트를 제안 (상태 변형은 프로퍼티, 퍼널은 enum 순서, PII 금지, 판단 못 한 것은 질문 목록으로)
- **[`localization.md`](agents/localization.md)** — 문자열과 맥락을 추출해 `i18n/` 규약대로 로컬라이제이션 (문자열이 숨는 자리, 이벤트 시트와 화면명 정규화 공유, 톤은 관찰하되 창작 금지, CJK/RTL 리스크 보고)

## `event-taxonomy/` — 분석 이벤트 시트

제품 분석 이벤트 정의용 시트 규약: `{도메인}_{동작}` 명명, 화면마다 이벤트를 쪼개지 않고 `screen_name` enum으로, 조건부 프로퍼티 표기법, 검토 체크리스트. `convert.mjs`가 시트를 **JSON · 마크다운 · HTML · 스프레드시트 · Notion**으로 변환하고, `--lint-only`(+CI용 `--strict`)로 규약 위반을 검사합니다.

## `i18n/` — 로컬라이제이션

규약 + 템플릿 + 린터: BCP 47 로케일 식별자, 키 명명, ICU MessageFormat(복수형·선택·숫자·날짜), CLDR 언어별 복수형 카테고리(한국어 1 · 영어 2 · **아랍어 6**), 텍스트 확장 예산, RTL. 코퍼스와 연결됩니다 — 본문 크기 관행이 문자 문화권마다 다르고(Ant Design 14px · 서구 웹 16px · Apple 17pt) 그것이 다국어 레이아웃을 좌우합니다. `lint.mjs`는 파일명에서 로케일을 읽어 그 언어에 실제로 필요한 복수형 카테고리를 검사합니다.

## `mockups/`

디바이스 목업이 **어디에 무엇이 있는지**만 기록합니다 — 라이선스·용량 문제로 파일 자체는 커밋하지 않고 출처와 인벤토리만 남깁니다.

## 원칙

- **공용만 남긴다.** 제품 고유 데이터가 들어오면 해당 제품 저장소로 보냅니다.
- **추측 금지.** 확인 못 한 값은 `미확인`으로 남깁니다. 그럴듯한 값 하나가 자료 전체의 신뢰를 무너뜨립니다.
- **출처와 버전을 남긴다.** 재검증이 가능해야 합니다.
- **원문 복사 금지.** 외부 산문은 요약·재서술하고 출처를 링크합니다. 토큰 값 같은 사실 정보는 그대로 인용해도 무방합니다.

## 알려진 제약

- **디자인시스템 문서 사이트가 이그레스 프록시에서 차단됩니다** (carbondesignsystem.com, m3.material.io, primer.style 등). GitHub·npm은 열려 있어 토큰 수집은 가능하지만 컴포넌트 사용 지침은 대부분 못 긁습니다. 소스 공개 시스템(shadcn/ui)과 컴포넌트 CSS 배포 시스템(Mantine·Radix Themes)이 공백을 상당히 메우고, Apple(HIG DocC JSON)·Google(developer.android.com, androidx) 우회 채널 2개를 찾았습니다 — `design-systems/HARVESTING.md`.
- **대비 비율을 토큰에 수치로 명시하는 곳은 Cloudscape 하나입니다** (차트색 단계 번호 = 대비 비율). 116개 중 다른 어떤 패키지도 대비 수치나 WCAG 목표를 담지 않습니다.
- **신선도를 자동 감시합니다** — `check-sources.mjs`가 첫 실행에서 Base Web major 2개 낡음을, Mística 17에서 실제 토큰 변경(고대비 원시값 업스트림 제거)을 잡았습니다.

## 언어

문서는 **영어가 주 노출본**이고, 한국어 원문이 `<slug>.ko.md`로 나란히 보존돼 있습니다.
짝은 `design-systems/i18n.mjs --check`가 강제하며 CI에 걸려 있습니다.

명령줄 도구도 같은 규약을 따릅니다 — **기본 영어, 한국어 지원.**

```bash
node design-systems/i18n.mjs --check --lang=ko   # 명령 단위
DESIGNOPS_LANG=ko node site/build.mjs            # 세션 전체
LANG=ko_KR.UTF-8 node i18n/lint.mjs ko-KR.json   # 셸 로케일 그대로
```

우선순위는 `--lang` → `DESIGNOPS_LANG` → `LC_ALL`/`LC_MESSAGES`/`LANG` → 영어이고,
해당 로케일에 없는 문장은 키를 찍지 않고 영어로 떨어집니다 (`tools/cli-i18n.mjs`).
언어를 늘리려면 거기에 코드를 추가하고 각 도구에 카탈로그를 넣으면 됩니다.

**로케일을 따르지 않는 것 두 가지**입니다:

- **생성 JSON 안의 문자열**(`design-systems/data/`·`docs/data/`)과 생성물인
  `design-systems/freshness.md` — 커밋되는 산출물이라, 언어를 바꿀 때마다 저장소
  문서가 갈아엎어집니다.
- **이벤트 시트의 CSV 컬럼 이름과 `필수` 표기** — `event-taxonomy/convert.mjs`가
  문자열 그대로 매칭하므로 메시지가 아니라 데이터 계약입니다. 그 도구가 **렌더링하는
  산문**(md·html 라벨)은 로케일을 따릅니다.

`design-systems/to-design-md.mjs`는 DESIGN.md 스캐폴드 전체를 선택한 언어로 냅니다.
frontmatter의 키·값은 스펙이 정한 이름이라 언어와 무관합니다.

## 사전 준비

| 항목 | 설명 |
|------|------|
| Node.js / Bun | 스크립트 런타임 (의존성 없음) |
| `FIGMA_OAUTH_TOKEN` | Figma API 토큰 — 환경 변수로 설정, **커밋 금지** |

MCP 서버 설정은 `.claude/settings.local.json`에 둡니다 (토큰 포함 가능성 — gitignore 대상).

## 라이선스

**코드 MIT · 문서와 코퍼스 CC BY 4.0** — [`LICENSE`](LICENSE) 참고.

킷은 클론해서 쓰라고 만든 것이니 도구는 MIT입니다. 실측값은 인용하라고 만든 것이니
CC BY 4.0입니다 — 출처만 밝히면 상업적 이용을 포함해 어디든 쓸 수 있습니다.

두 라이선스 모두 업스트림을 재라이선스하지 않습니다. 이 저장소는 남의 것인 시스템 116개를
기술합니다. 여기서 라이선스되는 건 **이 저장소 자신의 작업**(실측·분석·서술·도구)뿐입니다.
토큰 값은 사실이라 저작권 대상이 아니고, 업스트림 산문은 복제하지 않으며, 3자 에셋은
저장하지 않습니다. 경계는 `LICENSE`에 전부 적어 뒀습니다.
