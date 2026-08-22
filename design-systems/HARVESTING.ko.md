<!-- lang-links -->
> [English](HARVESTING.md) · **한국어**
<!-- /lang-links -->

# 수집 방법

이 코퍼스를 어떻게 채우는지에 대한 실무 문서입니다. **새 항목을 추가하기 전에 반드시 읽으세요.**
특히 이 환경에는 네트워크 제약이 있어서, 그냥 문서 사이트를 여는 방식은 통하지 않습니다.

> **⚠ 아래 제약은 환경 의존적입니다 (2026-08-18 확인).** 이 문서의 프록시
> 차단표는 **컨테이너(클라우드) 세션** 기준입니다. 로컬 macOS 세션에서
> 실측한 결과 `carbondesignsystem.com`·`m3.material.io`·`spectrum.adobe.com`·
> `atlassian.design`·`ui.shadcn.com`·`api.github.com` 등 **전 도메인이
> 열립니다** — 이 개방 창에서 patterns 9축의 판단 지침(산문)을 수집했습니다.
> 문서 층 수집이 필요하면 로컬 세션에서 하세요. 우회 채널들(DocC JSON ·
> androidx sparse-clone · 빌드 산출물 파싱)은 컨테이너 세션용으로 여전히 유효합니다.

## 이 환경의 네트워크 제약

디자인시스템 **공식 문서 사이트는 이그레스 프록시에서 차단**됩니다. 확인된 것만 해도:

| 도메인 | 상태 |
|--------|------|
| `carbondesignsystem.com` | 차단 |
| `m3.material.io` | 차단 |
| `primer.style` | 차단 |
| `polaris.shopify.com` | 차단 |
| `github.com` / `raw.githubusercontent.com` | **가능** |
| `registry.npmjs.org` (npm) | **가능** (프록시 우회 목록) |
| `pypi.org` | **가능** (프록시 우회 목록) |
| **`developer.android.com`** | **가능** |
| **`developer.apple.com`** | **가능** (단, HIG는 JS 렌더링) |
| **`figma.com` / `api.figma.com`** | **차단** (단, **Figma MCP는 별도 채널로 가능**) |

도메인 25개를 실측한 결과 **열린 곳은 `developer.apple.com`·`developer.android.com` 둘뿐**입니다.
나머지(`spectrum.adobe.com` · `atlassian.design` · `orbit.kiwi` · `eui.elastic.co` ·
`nordhealth.design` · `seed-design.io` · `design.gitlab.com` 등)는 전부 차단됩니다.

### 스크래핑 도구는 도움이 되지 않습니다

Scrapling·Playwright를 실제로 설치해 테스트했습니다. **차단 지점이 요청 이전입니다.**

```
curl:      CONNECT tunnel failed, response 403
Chromium:  net::ERR_TUNNEL_CONNECTION_FAILED
```

프록시가 CONNECT 터널 자체를 거부하므로 헤더 위장·JS 렌더링·안티봇 우회가 무의미합니다.
**도구 문제가 아니라 네트워크 허용 목록 문제입니다.**

열린 도메인이라도 브라우저 렌더링은 별개로 리셋됩니다 —
`developer.apple.com`은 curl로 200이 나오지만 Chromium은 `ERR_CONNECTION_RESET`입니다.
그래서 Apple HIG(JS 렌더링)는 여전히 읽을 수 없습니다.

### 에러 세 종류가 원인을 구분해줍니다

같은 Chromium으로 세 호스트를 열면 에러가 다릅니다.

| 호스트 | 에러 | 원인 |
|--------|------|------|
| `github.com` | `ERR_CERT_AUTHORITY_INVALID` | 프록시 CA를 Chromium이 불신 |
| `developer.apple.com` | `ERR_CONNECTION_RESET` | 허용됐지만 렌더링 요청이 리셋 |
| `ui.shadcn.com` · `figma.com` | **`ERR_TUNNEL_CONNECTION_FAILED`** | **정책 거부 (CONNECT 403)** |

**세 번째가 우회 불가입니다.** 브라우저는 컨테이너 안에서 `HTTPS_PROXY`를 통과하므로
curl로 막힌 곳은 크롬으로도 막힙니다.

**크롬 확장·Figma 플러그인도 방법이 아닙니다.**
`figma.com`이 차단이고, 브라우저 프로필이 매 실행마다 새로 생겨 로그인 세션이 없으며,
Figma 플러그인은 브라우저 확장이 아니라 Figma 앱 내부에서 실행됩니다.
**Figma 접근은 MCP 채널로만 됩니다** (아래 절 참고).

첫 번째(인증서)는 고칠 여지가 있으나 실익이 없습니다 —
`raw.githubusercontent.com`을 curl로 이미 읽고 있고 소스 수집에 그것으로 충분합니다.

### Apple 문서의 JSON API

`developer.apple.com`은 프레임워크 문서를 JSON으로 노출합니다.

```
https://developer.apple.com/tutorials/data/documentation/<framework>.json
```

`carplay.json`이 200으로 열립니다 (125KB). **단, 프레임워크 API 문서이고
HIG 디자인 지침은 이 경로에 없습니다** — HIG는 별도 콘텐츠 시스템입니다.

즉 **문서를 읽어서 정리하는 경로는 막혀 있고, 토큰 원본을 읽는 경로는 열려 있습니다.**

결과적으로 더 나은 방식이 됐습니다. 문서 산문에서 값을 옮겨 적으면 오탈자·구버전 위험이 있지만,
토큰 파일은 그 시스템의 실제 소스이므로 정확합니다. 저작권 면에서도 토큰 값은 사실 데이터라 안전합니다.

## 경로 1 — GitHub 원본 (1순위)

토큰이 저장소에 커밋돼 있는 시스템에 씁니다. Polaris, Primer가 여기 해당합니다.

1. 디렉터리 구조를 먼저 확인합니다. 파일명을 추측해서 raw URL을 때리면 404만 반복됩니다.
   `https://github.com/<org>/<repo>/tree/<branch>/<path>` 를 열어 파일 목록을 봅니다.
2. 파일을 찾으면 raw로 가져옵니다.
   `https://raw.githubusercontent.com/<org>/<repo>/<branch>/<path>`

### 주의: 참조 해석

토큰 파일은 다른 파일을 참조하는 경우가 많습니다. 참조를 끝까지 따라가야 실값이 나옵니다.

Polaris가 전형적입니다.

```
themes/base/space.ts    space-400: size[400]      ← 참조
src/size.ts             '400': '16px'             ← 실값
```

`space-400: size[400]`을 그대로 기록하면 쓸모가 없습니다. **`16px`까지 해석해서 적습니다.**

## 경로 2 — npm 배포 패키지 (2순위)

**토큰이 빌드 산출물이라 저장소에 없는 경우**에 씁니다. Carbon, Fluent가 여기 해당합니다.

Carbon 저장소의 `packages/layout/scss/_spacing.scss`는 `./generated/spacing`을 forward할 뿐이고,
`generated/` 디렉터리는 gitignore돼 있어 GitHub에서 볼 수 없습니다. 배포 패키지에는 들어 있습니다.

```bash
npm pack @carbon/layout --silent
tar -xzf carbon-layout-*.tgz
grep -E '^\$' package/scss/generated/_spacing.scss
```

### 확인된 토큰 패키지

npm에 존재를 확인한 목록입니다. **경로까지 확인된 것**은 파일 경로를 함께 적었습니다.

| 시스템 | 패키지 | 토큰 경로 |
|--------|--------|-----------|
| Carbon | `@carbon/layout`, `@carbon/type`, `@carbon/colors`, **`@carbon/themes`** | `scss/generated/_spacing.scss`, `scss/_scale.scss`, **`scss/_styles.scss`**(타입 스타일 34), **`@carbon/colors` `index.scss`**(원시 247), **`@carbon/themes` `js/generated/themes/*.js`**(시맨틱 235×4) + `js/generated/component-tokens/*.js` |
| Fluent 2 | `@fluentui/tokens` | `lib/global/spacings.js`, `lib/global/borderRadius.js` |
| Spectrum | `@adobe/spectrum-tokens` | `src/layout.json` (코어), `src/<component>.json`, **`src/typography.json`**, **`src/color-palette.json`**(원시 369) · **`src/semantic-color-palette.json`**(94) · **`src/color-aliases.json`**(170) |
| Spectrum (CSS 빌드) | `@spectrum-css/tokens` | |
| Primer | `@primer/primitives` | `src/tokens/base/size/size.json5`, **`src/tokens/base/typography/typography.json5`**, **`src/tokens/base/color/{light,dark}/*.json5`**, **`dist/css/functional/**/*.css`**(공개), **`dist/internalCss/*.css`**(원시 램프 — 여기에만) |
| Polaris | `@shopify/polaris-tokens` | `src/size.ts`, `src/themes/base/*.ts` — **npm 배포본에는 `src/`가 없고 `dist/cjs/src/**`가 대응** (`colors.js` · `themes/base/{color,font,text}.js`) |
| Cloudscape | `@cloudscape-design/design-tokens` | `index.scss` (라이트 폴백값) + **`index-visual-refresh.json`** (다크·밀도·모션 축 · 색 컨텍스트 8종) |
| Ant Design | `antd` | `lib/theme/themes/seed.js`, `.../genSizeMapToken.js` |
| GOV.UK | `govuk-frontend` | `dist/govuk/settings/_spacing.scss` |
| Backpack | `@skyscanner/bpk-foundations-web` | `tokens/base.raw.json` |
| Canvas | `@workday/canvas-tokens-web` | `css/base/_variables.css` |
| Paste | `@twilio-paste/design-tokens` | `dist/tokens.custom-properties.css` |
| Codex | `@wikimedia/codex-design-tokens` | `theme-wikimedia-ui-mode-*.json` |
| Vapor UI | `@vapor-ui/core` | `dist/components/*.css.ts.vanilla.css` |
| Material 3 | `@material/web` | `md-shape-tokens.css` (**라운드만**) |
| Atlassian | `@atlaskit/tokens` | `figma/atlassian-spacing.json` · `figma/atlassian-shape.json` · **`dist/cjs/artifacts/tokens-raw/*.js` (타이포·컬러·모션 — 아래 참조)** |
| **Tailwind CSS** | **`tailwindcss`** | **`theme.css`** (459줄에 전체 테마) |
| **Mantine** | **`@mantine/core`** | **`styles.css`** + `styles/<Component>.css` (101개) |
| **Radix Themes** | **`@radix-ui/themes`** | **`styles.css`** + `src/components/*.css` (54개) |
| **shadcn/ui** | **npm 아님 → GitHub** | **`apps/v4/app/globals.css`** · `apps/v4/registry/new-york-v4/ui/*.tsx` |
| Elastic EUI | **`@elastic/eui-theme-common`** | `lib/esm/global_styling/variables/size.d.ts` (**JSDoc 주석**) |
| Nordhealth | **`@nordhealth/tokens`** | `lib/tokens.json` (`@nordhealth/themes`가 아님) |
| HashiCorp | `@hashicorp/design-system-tokens` | `dist/products/css/tokens.css` (**스페이싱 없음**) |
| Salesforce | `@salesforce-ux/design-system` | `design-tokens/dist/primitive.raw.json` |
| Base Web | `baseui` | `themes/shared/sizing.js` (**JS 객체 — 스캐너로 안 잡힘**) |
| Gestalt | `gestalt` | `dist/gestalt.css` (컴포넌트 패키지에 토큰 동봉) |
| Orbit | `@kiwicom/orbit-design-tokens` | `dist/index.js` (**JS 객체 `var space = {…}`**) |
| GitLab | `@gitlab/ui` | `src/tokens/build/json/tokens.json` (**`src/scss/tokens.scss`는 껍데기**) |
| Mozilla | `@mozilla-protocol/core` | `protocol/css/includes/_themes-sass.scss` |
| Segment | `evergreen-ui` → **GitHub `src/`** | `src/themes/default/tokens/*.js` (npm `esm/`에 없음) |
| Seed (당근) | `@seed-design/stylesheet` · **`@seed-design/design-token`** | `global.css` · `lib/vars/scale/*.js` |

**존재하지 않는 것으로 확인:** `@toss/tds`, `@linecorp/design-tokens`, `@daangn/seed-design`,
`@grafana/tokens`, `@segment/evergreen-ui`, `@material-design/tokens`

### 토큰 경로를 찾지 못한 패키지

다음은 npm에 존재하지만 이번 작업에서 토큰 파일 위치를 특정하지 못했습니다.
`extract.py` 같은 범용 스캐너로 `.json`/`.css`/`.scss`를 훑어도 나오지 않았습니다.

**없습니다.** 후보 30개 패키지 전부 경로를 특정했습니다.

마지막 두 건도 같은 패턴이었습니다.

- **GitLab Pajamas** — `src/scss/tokens.scss`가 `../tokens/build/css/tokens`를 import하는
  껍데기여서 헛다리를 짚었습니다. 실값은 `src/tokens/build/json/tokens.json`에 있습니다.
  Bootstrap 벤더 파일은 무관했습니다.
- **Evergreen** — npm 패키지의 `esm/`에는 컴포넌트만 있고,
  토큰은 `src/themes/default/tokens/`에 있습니다. GitHub에서 읽어야 합니다.

### 해결된 사례와 그 방법 — 이게 핵심입니다

| 시스템 | 문제 | 해결 |
|--------|------|------|
| Base Web | 토큰이 `.json`/`.css`가 아닌 **JS 객체** | `themes/shared/sizing.js` 직접 열기 |
| Orbit | 같은 문제 | `dist/index.js`의 `var space = {…}` |
| Nord | 패키지명을 잘못 짚음 | `@nordhealth/themes` → **`@nordhealth/tokens`** |
| Elastic EUI | 같은 문제 + 값이 **타입 정의에만** 있음 | `@elastic/eui-theme-common`의 `size.d.ts` JSDoc |
| Seed (당근) | 패키지가 용도별로 쪼개져 있음 | `stylesheet`(값) + `design-token`(참조) 둘 다 필요 |
| Salesforce | 디렉터리가 깊음 | `design-tokens/dist/primitive.raw.json` |
| GitLab | `tokens.scss`가 **import 껍데기** | `src/tokens/build/json/tokens.json` |
| Evergreen | npm 배포본에 토큰 **누락** | GitHub `src/themes/default/tokens/` |

**교훈 (2026-08-18 기준 15건):**

1. **범용 스캐너는 JS 객체 토큰을 놓칩니다.** `.json`/`.css`/`.scss`만 훑으면 안 됩니다.
   `themes/` · `tokens/` · `dist/` 안의 `.js`를 직접 열어보세요.
2. **값이 `.d.ts` JSDoc에만 있는 경우가 있습니다.** Elastic이 그렇습니다 —
   런타임 JS에는 테마 팩토리만 있고, 실값은 타입 주석의 `@default`에 적혀 있습니다.
3. **패키지명을 추측하지 말고 후보를 여러 개 probe하세요.**
   `-tokens` · `-theme-common` · `-design-token` · `-stylesheet` 조합을 다 시도합니다.
4. **`@import`·`@forward`만 있는 파일에 속지 마세요.** Carbon과 GitLab이 같은 함정이었습니다.
   `_spacing.scss`·`tokens.scss`를 열었을 때 import 한 줄만 있으면, 그 대상 경로를 따라가세요.
5. **npm 배포본에 토큰이 빠져 있을 수 있습니다.** Evergreen이 그렇습니다 —
   `files` 필드에서 `src/`를 제외했으므로 GitHub에서 읽어야 합니다.
6. **"경로 미발견"으로 넘기기 전에 `find`로 파일 목록을 먼저 보세요.**
   후보 26개 중 6개를 "미발견"으로 적었지만, **전부 안 열어봐서 못 찾은 것이었습니다.**
7. **`figma/` 디렉터리에 값이 다 있다고 가정하지 마세요.** Atlassian이 그렇습니다 —
   `figma/atlassian-typography.json`에는 서체·굵기만 있고 **크기·행간이 없습니다.**
   실값은 `dist/cjs/artifacts/tokens-raw/atlassian-typography.js`에 있습니다.
   Figma용 JSON만 보고 "타이포 스케일 미확인"으로 적으면 틀립니다.
8. **패키지 이름에 `tokens`가 없어도 토큰이 있을 수 있습니다.**
   `tailwindcss` · `@mantine/core` · `@radix-ui/themes`가 그렇습니다 —
   전부 메인 패키지의 `styles.css` / `theme.css`에 전체 테마가 들어 있습니다.
   **`-tokens` 접미사만 probe하면 프레임워크 계열을 전부 놓칩니다.**
9. **"없음" 판정은 단일명 probe로 내리지 마세요 — 검색 API를 쓰세요.**
   `@toss/tds`가 NONE이라 "Toss npm 없음"으로 기록했는데,
   `registry.npmjs.org/-/v1/search?text=toss+tds`로 검색하니
   `@toss/tds-colors` · `-typography` · `-easings` · `-mobile` · `-mobile-ait`가
   나왔습니다 — **분할 배포**였습니다. 검색 API는 허용 도메인 안에 있습니다:
   ```
   curl "https://registry.npmjs.org/-/v1/search?text=<질의>&size=12"
   ```
   미니앱·SDK 개방 시점에 사내 시스템이 공개되는 경우가 있으므로
   (구 스코프 `@toss-design-system/*` → 신 스코프 이전 흔적도 패키지에서 확인),
   과거 "없음" 판정은 주기적으로 재검색해야 합니다.
10. **npm에 없는 시스템도 있습니다.** shadcn/ui는 **소스 복사 배포**라 패키지가 없습니다.
   `raw.githubusercontent.com`으로 `.tsx`를 직접 읽어야 합니다 —
   그리고 **그쪽이 토큰보다 정보가 많습니다** (변형·상태·패딩·애니메이션이 전부 코드에 있음).
11. **`src/`가 없으면 `dist/cjs/`가 대응합니다** (2026-08-18, Polaris).
   `@shopify/polaris-tokens@9.4.2`의 `files`는 `dist/`만 담지만
   **`dist/cjs/src/themes/base/color.js`가 `src/themes/base/color.ts`와 1:1**입니다.
   Evergreen처럼 GitHub로 나갈 필요가 없었습니다 — **npm 안에서 끝납니다.**
   단, `themes/index.js`를 `require`하면 `deepmerge`가 필요하므로
   개별 `base/*.js`를 직접 읽거나 `npm i deepmerge`를 먼저 하세요.
12. **`index.scss`에 다크가 없을 수 있습니다** (2026-08-18, Cloudscape).
   SCSS는 CSS 변수 폴백값(=라이트)만 담고, **다크·밀도(comfortable/compact)·
   모션(default/disabled) 축은 같은 패키지의 `index-visual-refresh.json`**에
   `$value: {light, dark}` 형태로 있습니다. **색 컨텍스트 8종도 이 JSON에만** 있습니다.
   SCSS만 보고 "다크 미확인"으로 적으면 틀립니다.
13. **교훈 4의 재발 — 이번엔 `@forward`였습니다** (2026-08-18, `@carbon/themes`).
   `index.scss`가 `scss/config`·`scss/theme`·`scss/tokens`·`scss/component-tokens`를
   `@forward`할 뿐이고, **실값은 `js/generated/themes/*.js`**입니다.
   Carbon은 `_spacing.scss`(교훈 4)에 이어 **두 번째로 같은 함정**을 냅니다.
14. **원시 층을 일부러 배포에서 빼는 시스템이 있습니다** (2026-08-18, Primer).
   `dist/css/functional/themes/*.css`에 `--base-color-*`가 **0개**이고
   `dist/internalCss/`에만 있습니다. 공개 CSS만 훑으면
   "원시 램프 없음"으로 잘못 적게 됩니다 — **`internalCss`·`docs`·`figma` 같은
   보조 디렉터리를 반드시 함께 보세요** (`dist/docs/*.json`은 파싱하기 가장 쉽습니다).
15. **JSON5는 파이썬 표준 라이브러리로 못 읽습니다.** Primer가 `.json5`입니다.
   `npm i json5` 후 node로 파싱하거나, 빌드 산출물(`dist/docs/*.json` ·
   `dist/css/**`)로 우회하세요.

### Atlassian — 같은 패키지에 두 벌의 토큰이 있습니다

| 위치 | 내용 | 값 |
|------|------|-----|
| `figma/atlassian-typography.json` | 서체 · 굵기 **9개** | 크기·행간 **없음** |
| **`dist/cjs/artifacts/tokens-raw/atlassian-typography.js`** | **23개** | **크기·행간 포함** |

```bash
node -e "
const m=require('./dist/cjs/artifacts/tokens-raw/atlassian-typography.js');
const arr=m.default||Object.values(m)[0];
arr.forEach(t=>console.log(t.name,'=',JSON.stringify(t.value)));
"
```

`tokens-raw/` 아래 14개 파일이 있습니다 — 컬러 테마 12벌 + 타이포 + 스페이싱 + 모션.
**모션 68개는 `figma/atlassian-motion.json`에서는 0개로 나옵니다** (복합 객체라 값 추출 실패).

### 프레임워크 계열 probe 명령

```bash
for p in tailwindcss @mantine/core @radix-ui/themes; do
  npm pack "$p" --silent
done
# tailwindcss → package/theme.css      (전체 테마 한 파일)
# @mantine/core → package/styles.css   + package/styles/*.css
# @radix-ui/themes → package/styles.css + package/src/components/*.css

# shadcn/ui는 npm 패키지가 없습니다 — GitHub raw로 직접
curl -sS https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/app/globals.css
curl -sS https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/button.tsx
```

**`ui.shadcn.com/r/registry.json`은 프록시가 CONNECT를 403으로 차단합니다.**
컴포넌트 목록은 `apps/v4/registry/__index__.tsx`(1MB)에서 추출했습니다.

**curl로 여러 파일을 받을 때 파일명 충돌을 주의하세요.**
`apps/v4/app/globals.css`와 `apps/www/styles/globals.css`를 `basename`으로 저장하면
뒤엣것(404 본문)이 앞엣것을 덮어씁니다. 이번 작업에서 실제로 발생했습니다.

### 패키지가 토큰 전체를 담지 않는 경우

`@material/web`은 Material 3의 **웹 구현체**이며 shape 토큰만 들어 있습니다.
스페이싱·타이포 스케일이 없습니다. 패키지가 있다고 해서 토큰이 전부 있는 것은 아니므로,
**없는 값은 추측하지 말고 `미확인`으로 남기세요.**

## Figma MCP — 페이지 목록이 불완전합니다

**MCP는 `HTTPS_PROXY`를 타지 않는 별도 채널입니다.** 문서 사이트가 프록시에서 차단돼도
Figma 변수 읽기는 됩니다 (`figma.com`·`api.figma.com` 자체는 curl·크롬으로 막혀 있습니다).

### 확인된 한계

```
get_metadata(fileKey)               → 페이지 목록: "Cover" 1개
get_metadata(fileKey, "507:25993")  → "Toolbars" 페이지 전체 반환 ✅
```

**`nodeId` 없이 호출하면 페이지를 다 열거하지 않습니다.**
iOS 26 킷에서 목록은 1개를 보고했지만
최소 2개가 존재하며, 노드 ID를 직접 넣으면 읽힙니다.

**세션 초기에 "다른 페이지를 조회할 수 없다"고 판단한 원인이 이것입니다.**
파일 구조 문제가 아니라 **목록 API의 누락**이며, 별개로 rate limit도 겹쳤습니다.

**우회 시도 결과 (macOS 킷에서 전부 검증, 2026-08-17):**

| 시도 | 결과 |
|------|------|
| 페이지 목록 재호출 | Cover 1개만 (재확인) |
| REST API (`api.figma.com/v1/files/...`) | **프록시 차단** + 토큰 미설정 |
| Cover 페이지 내부의 링크 노드 | 없음 (이미지 1장뿐) |
| 페이지 ID 순번 프로브 (`207:14502` 등) | 실패 — 페이지 ID는 연속이 아님 |
| Header 인스턴스의 하이퍼링크 | **외부**(developer.apple.com)로만 감 |
| `search_design_system` | 파일이 구독한 라이브러리만 검색 — 킷 자신은 대상 아님 |

**결론(1차): 페이지 열거 API는 없습니다. 그러나 —**

### 인접 ID 프로브가 작동합니다 (2026-08-17 확정)

사용자가 페이지 URL 3개를 주자 패턴이 보였습니다: **페이지 ID가 같은 대역의
홀수**(`207:14475` · `14481` · `14495` …)입니다. 대역 안의 홀수를 프로브해
**7페이지를 자체 발견**했습니다 (Combo Boxes 14473 · Forms 14477 · Buttons 14487 ·
Search Fields 14491 · Sheets 14493 · Steppers 14497 · Lists and Tables 14499 ·
Tooltips 14503). 존재하지 않는 ID는 명확한 not-found 에러라 판별이 쉽습니다.

**절차: 페이지 URL을 하나라도 받으면, 그 ID 주변 홀수를 ±30 범위에서 프로브하세요.**
같은 파일의 페이지들은 한 세션에서 만들어져 ID 대역을 공유하는 경향이 있습니다
(항상은 아님 — 이 파일의 Cover는 131:8996으로 다른 대역).

대신 Header 링크에서 발견한 것 — **HIG DocC JSON 채널** (아래 절).

### 절차

1. `get_metadata(fileKey)` — 나오는 페이지가 전부라고 믿지 마세요
2. 사용자가 준 URL의 `node-id`를 먼저 넣어봅니다
3. 반환된 XML에서 자식 노드 ID를 수집해 관심 프레임을 짚습니다
4. `get_variable_defs(fileKey, nodeId)`로 변수를 읽습니다 —
   **그 노드가 실제로 쓰는 변수만** 반환합니다. 전체 변수 덤프가 아닙니다
5. 타이포·컬러가 필요하면 **해당 스타일을 쓰는 프레임**을 찾아 짚어야 합니다

### 변수 값의 형태

```
"Headline/Regular": "Font(family: \"SF Pro\", style: Semibold, size: 17,
                     weight: 590, lineHeight: 22, letterSpacing: -0.43)"
"Liquid Glass/Refraction": "100"
"Fills/Secondary": "#78788029"
```

**타이포는 `Font(...)` 복합 문자열입니다** — Atlassian의 CSS `font` 단축 속성과 같은 구조입니다.
**8자리 헥스(알파 포함)가 그대로 나옵니다** (`#78788029`).

### 킷 내부용 변수를 제품 토큰으로 착각하지 마세요

```
"Component Fill": "#f5f5f5"
"Component Stroke": "#6155f5"
```

**이 둘은 킷의 주석·프레임 표시용**이며 iOS 디자인 토큰이 아닙니다.
보라색(`#6155f5`)은 Apple 팔레트에 없는 값입니다.

### `get_libraries`로 접근 가능한 킷을 먼저 확인하세요

파일 하나에 대해 호출하면 **그 계정이 추가할 수 있는 커뮤니티·조직 라이브러리 전체**를
라이브러리 키와 함께 돌려줍니다. 파일과 무관하게 목록이 나옵니다.

이 저장소 작업 중 확인된 목록:

| 라이브러리 | 플랫폼 축 | 코퍼스 상태 |
|-----------|-----------|------|
| **macOS 26 / macOS 27** | **`desktop`** | **표본 0** |
| **watchOS 26** | **`wearable`** | **표본 0** |
| visionOS 26 | `spatial` | 수집됨 |
| iOS and iPadOS 26 | `mobile` | 수집됨 |
| **iOS and iPadOS 27** | `mobile` | **코퍼스보다 신버전** |
| Material 3 Design Kit | — | 수집됨 |
| **Simple Design System** (Figma 자체) | `web` | **미수집** |

`tvOS`는 목록에 없습니다.

### 라이브러리 키만으로는 에셋을 읽을 수 없습니다

```
search_design_system(includeLibraryKeys: [macOS 26 키])  → { variables: [], styles: [] }
```

**"추가 가능"(`libraries_available_to_add`) 상태에서는 검색이 비어 나옵니다.**
`libraries_added_to_file`에 있어야 검색됩니다.

**따라서 킷을 읽으려면 파일이 필요합니다** — 커뮤니티에서 duplicate한 뒤
`/design/<fileKey>/...` URL을 받아야 합니다.

### `search_design_system`은 질의한 파일이 아니라 계정의 라이브러리를 검색합니다

Material 3 킷의 fileKey로 `button`을 검색했더니 **사용자 팀의 제품 라이브러리**가
반환됐습니다 — 이 저장소가 다룰 대상이 아닌 제품 라이브러리 2개였습니다.
`fileKey`는 컨텍스트일 뿐 검색 범위가 아닙니다.

### 복제한 킷의 `fileKey`는 기록하지 마세요

이렇게 읽는 커뮤니티 킷은 커뮤니티 원본이 아니라 **내 복제본**이고, 그 `fileKey`는 내 계정을
가리킵니다. 크리덴셜은 아닙니다 — 파일을 여는 데는 여전히 권한이 필요합니다 — 그런데 Figma의
oEmbed 엔드포인트는 **인증 없이** 답합니다.

```
GET https://www.figma.com/api/oembed?url=https://www.figma.com/design/<fileKey>/x
→ {"title":"macOS 26 (Community)","folder_name":"<내 팀 폴더명>","thumbnail_url":…}
```

즉 공개된 `source:` 필드에 붙인 키 하나가 파일 제목·썸네일과 **그 파일이 든 팀 폴더 이름**을
넘겨줍니다. Apple 킷 키 2개가 그렇게 기록돼 있었고 2026-08-22에 제거했습니다. 항목은 이제
커뮤니티 파일명만 적고 복제본 키는 비기록으로 둡니다. 시스템 자체 문서 사이트가 링크하는 벤더
킷(LeafyGreen·Pluralsight·NYSDS)은 경우가 다릅니다 — 벤더가 공개한 URL이라 그대로 둡니다.

> **⚠ 범위 규칙.** 이렇게 노출된 **제품 라이브러리는 이 저장소에 수집하지 않습니다.**
> 이 저장소는 공용 자산만 담고, 제품 고유 데이터는 해당 제품 저장소에 속합니다
> (`README.md` 원칙). 컴포넌트 이름·치수 모두 포함해서 옮기지 않습니다.

### 플랜 수집 깊이 확인

`whoami`로 먼저 확인하세요 — rate limit과 사용 가능한 도구가 수집 깊이로 갈립니다.
`list_file_components_for_code_connect`는 Enterprise가 필요합니다.

## 경로 3 — 알고리즘 스케일 복원

스케일을 **값 목록이 아니라 함수로** 정의하는 시스템이 있습니다. 이 경우 함수를 실제로 실행해서
값을 뽑아야 합니다. 눈으로 계산하면 틀립니다.

Carbon 타이포 스케일이 그렇습니다 (`@carbon/type` 의 `_scale.scss`).

```scss
@function get-type-size($step) {
  @if $step == 1 { @return 12px; }
  @return get-type-size($step - 1) + (math.floor(($step - 2) * 0.25) + 1) * 2;
}
```

```python
v = [0] * 24
v[1] = 12
for n in range(2, 24):
    v[n] = v[n-1] + ((n - 2) // 4 + 1) * 2
```

→ `12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92, 102, 112, 122, 132, 144, 156`

이렇게 복원한 값은 **복원했다는 사실을 항목에 명시**합니다. 문서상 공식 지원 범위와
함수가 생성하는 범위가 다를 수 있기 때문입니다 (Carbon은 문서상 12~92px, 함수는 156px까지 생성).

## 기록 규칙

- **참조는 끝까지 해석한다.** `size[400]`이 아니라 `16px`.
- **확인 못 한 값은 비운다.** `미확인`으로 표기. 그럴듯한 값을 채우면 코퍼스 전체를 못 믿게 됩니다.
- **출처 경로를 남긴다.** 어느 패키지 어느 파일에서 뽑았는지 적어야 다음 사람이 재검증할 수 있습니다.
- **버전을 남긴다.** npm에서 뽑았으면 패키지 버전을 함께 적습니다.

## 아직 못 푼 것

- **문서 사이트에만 있는 정보** — 컴포넌트 사용 지침, 설계 근거, 접근성 서술은 토큰 파일에 없습니다.
  현재 경로로는 수집 불가입니다. 프록시 허용 목록에 문서 도메인을 추가하거나,
  네트워크가 열린 환경에서 별도로 수집해야 합니다.
- **토큰을 공개하지 않는 시스템** — Apple HIG처럼 문서만 있고 토큰 배포가 없는 경우.
  `index.md`에서 이런 항목은 수집 난이도를 따로 표시해야 합니다.


## 발견 채널 — Apple HIG DocC JSON (2026-08-17)

**HIG는 JS 렌더링이라 못 긁는다는 기록이 더는 사실이 아닙니다.**
문서 페이지의 데이터 백엔드가 프록시를 통과합니다:

```
https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<페이지>.json
```

- 경로 규칙: HIG URL의 `/design/human-interface-guidelines/sidebars` →
  `/tutorials/data/design/human-interface-guidelines/sidebars.json`
  (`/tutorials/data/documentation/...`은 404 — `documentation` 없이)
- 내용: `primaryContentSections` 트리에 본문 전체 (text/heading/codeVoice 노드 재귀 평탄화)
- 확보 실적: 메뉴 바 24pt · 기본 창 1280×720pt · 사이드바/메뉴 판단 지침
  (`systems/macos.md` 보강). **CarPlay 고유 수치도 이 채널로 수집 가능**해졌습니다
- 평탄화 스니펫은 세션 스크래치패드에 (재귀 flatten — dict의 type별 분기)

## 발견 채널 — developer.android.com 디자인 가이드 (2026-08-17)

`developer.android.com/design/ui/{wear,tv}` 계열이 프록시를 통과하고
**서버 렌더링 HTML**이라 그대로 긁힙니다 (`<article>` 추출 → 태그 제거).

- Wear OS: `guides/get-started` 페이지에 전체 가이드 목록(92링크)이 있음.
  `styles/typography/type-scale-tokens` · `foundations/adaptive-design`이 수치 밀도 최고
- Android TV: 허브에 9링크 — `components/cards`(개수별 폭)·`components/buttons`(포커스 규격)
- 확보 실적: `systems/wear-os.md` · `systems/android-tv.md` (플랫폼 7축 완성)
- 구세대 가이드가 `m2-5/` 경로에 병존 — 최신/구세대 URL을 구분할 것

## 발견 채널 — androidx sparse-clone (M3 생성 토큰 코드, 2026-08-17)

`m3.material.io`는 차단이지만 **M3 컴포넌트·모션 토큰의 생성 코드가
androidx 저장소에 있습니다** — 문서 사이트보다 원천에 가깝습니다.

```
git clone --depth 1 --filter=blob:none --sparse https://github.com/androidx/androidx.git
cd androidx
git sparse-checkout set compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens
```

- 거대 저장소이므로 **`--filter=blob:none --sparse` 필수** — 이 조합이면 수 초에 끝남
- `tokens/` 디렉터리에 컴포넌트별 토큰 파일 다수 (`*Tokens.kt`,
  `// GENERATED CODE` + `// VERSION: v0_103` 식 버전 표기)
- 확보 실적: `MotionTokens.kt`(이징 10종·지속시간 16토큰),
  `ExpressiveMotionTokens.kt`·`StandardMotionTokens.kt`(스프링 세트)
  → `patterns/motion.md` · `systems/material-3.md`
- raw.githubusercontent 429일 때도 clone 경로는 통과 (기존 규칙 재확인)

## 발견 채널 — Gatsby page-data JSON (문서층 표본, 2026-08-18)

토큰 배포가 없는 시스템도 **문서 사이트가 Gatsby면 전체 콘텐츠가
구조화 JSON으로 노출**됩니다:

```
https://<사이트>/page-data/<페이지 경로>/page-data.json
```

- LINE(designsystem.line.me)에서 첫 실전 적용 — `pageContext.
  standaloneComponents`에 컬러 팔레트 ~170헥스가 원데이터로 통째로
  들어 있었습니다 (이미지가 아니라 데이터). → 코퍼스 첫 **문서층 표본**
  (`systems/line.md`)
- **403은 폐쇄가 아니라 슬러그 변형 신호일 수 있습니다** — LINE LDSM은
  기본 슬러그(`-en`)가 사내용 403이고, **`-ex-en`(external) 접미판이
  공개본**입니다. Wayback CDX로 슬러그 패턴을 찾으면 뚫립니다.
- 문서층 표본은 라이선스 확인 필수 — LINE은 열람 한정이라
  **값의 사실 기록 + 출처만** 수록합니다 (원문·이미지 재배포 불가).

## 발견 채널 — CSS-in-JS 빌드 산출물 파싱 (2026-08-17)

styled-components·Griffel·Compiled 계열도 **npm dist에 값이 남습니다** —
소스가 아니라 빌드 산출물을 grep하면 됩니다.

| 시스템 | 패키지 | 값이 있는 곳 |
|--------|--------|--------------|
| Fluent 2 | `@fluentui/react-button` | `lib/**/*.styles.js` — Griffel 직렬화 문자열(`".f…{min-width:96px;}"`) |
| Atlassian | `@atlaskit/button` | `dist/cjs/**` — 구버튼은 JS 산식(`32/14 + "em"`), 신버튼은 `*.compiled.css` |
| Orbit | `@kiwicom/orbit-design-tokens` | `dist/index.js` — 참조 체인을 2단 추적 (`formBox* → size.*`) |
| Garden | `@zendeskgarden/css-buttons` | 클래식 CSS 라인이 따로 배포됨 — CSS-in-JS 우회 자체가 불필요 |

- 정규식은 직렬화 문자열 전제로: `"[^"]*min-width[^"]*"` 식으로 **따옴표 안**을 잡을 것
- 산식 값(`32/14`)은 주석(`// 32px`)이 옆에 있는 경우가 많음 — 주석까지 캡처
- 이로써 `full` 수집 20개 전부가 컴포넌트 층까지 심화됨 (2026-08-17)
