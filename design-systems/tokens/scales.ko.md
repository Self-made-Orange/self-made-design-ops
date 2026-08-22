<!-- lang-links -->
> [English](scales.md) · **한국어**
<!-- /lang-links -->

# 스케일 교차 비교

여러 시스템의 스케일을 나란히 놓고 **어디서 수렴하고 어디서 갈리는지** 봅니다.
새 프로젝트의 스케일을 정할 때 이 문서의 "구현 시 기본값"부터 보면 됩니다.

> **현재 수집 상태: 112개 시스템** (100 목록 + 플랫폼 번외 5 + 지역·정부 추가 5 + 프레임워크 번외 3: Headless UI·Panda CSS·vanilla-extract).
> Carbon(IBM) · Polaris(Shopify) · Primer(GitHub) · Fluent 2(Microsoft) · GOV.UK(영국 정부) ·
> Ant Design(Ant Group) · Cloudscape(AWS) · Backpack(Skyscanner) · Spectrum(Adobe) ·
> Material 3(Google) · Canvas(Workday) · Paste(Twilio) · Codex(Wikimedia) · Vapor UI(goorm) ·
> Atlassian · Gestalt(Pinterest) · Helios(HashiCorp) · Protocol(Mozilla) ·
> Base Web(Uber) · Nord(Nordhealth) · Apple HIG(iOS 26) · visionOS(Apple) ·
> Lightning(Salesforce) · EUI(Elastic) · Orbit(Kiwi.com) · Seed Design(당근) ·
> Pajamas(GitLab) · Evergreen(Segment) · Android Automotive(Google) · CarPlay(Apple) ·
> **Tailwind CSS · shadcn/ui · Mantine · Radix Themes ·
> Chakra UI · Open Props · Bootstrap · USWDS · KRDS · Garden(Zendesk) · Blueprint · Porsche · Thumbprint · Forma 36 · Cedar · Auro · SGDS · Semi · 디지털청(日) · TDS(Toss) · macOS 26 ·
> SmartHR(日) · Charcoal(pixiv) · Spindle(Ameba) · Serendie(三菱電機) ·
> Grommet(HPE) · Vibe(monday) · Ring UI(JetBrains) · Stacks(Stack Overflow) ·
> Mística(Telefónica) · Siemens iX · Vanilla(Canonical) · Strapi · Vibes(freee) ·
> Vuetify · Naive UI · PrimeVue · Skeleton · Shoelace · NASA WDS · DSFR(프랑스 정부) ·
> Odyssey(Okta) · PIE(Just Eat) · Vitamin(Decathlon) · Braid(SEEK) · Kaizen(Culture Amp) ·
> Clarity(VMware) · LeafyGreen(MongoDB) · Solid(BuzzFeed) · Pharos(JSTOR) ·
> Palette(Artsy) · Tegel(Scania) · Priceline · Yoga(Wellhub) · Welcome UI(WTTJ) · Intergalactic(Semrush) ·
> NHS(영국 보건) · Asphalt(Gojek) · Unify(Tokopedia) · Pluralsight · Skin(eBay) · Origami(FT) · Bolt ·
> HSDS(Help Scout) · MUI · HeroUI · Park UI · Ark UI · Kontur UI ·
> **Audi UI · Persona(Privy) · Italia(이탈리아 정부) · NYSDS(뉴욕주) · WMN(교통)** (2026-08-17 +5)**
>
> 플랫폼 분포: `web` 100 · `automotive` 2 · `wearable` 2 · `tv` 2 · `mobile` 1 · `spatial` 1 · `desktop` 1
> (`platform` 배열의 첫 값 기준).
>
> **스페이싱 스케일이 확인된 것은 63개**입니다 (Italia·NYSDS 추가) (2026-08-17 +25:
> Charcoal · Spindle · Serendie · SmartHR · Grommet · Vanilla · Stacks · Strapi · Vibe · Vibes ·
> Vuetify · Shoelace · Odyssey · PIE · Vitamin · Braid · Kaizen ·
> Clarity · LeafyGreen · Solid · Pharos · Artsy · Tegel · Priceline · Yoga).
> 스케일이 **존재하지 않는** 것 5개 — Apple HIG · Material 3 · Seed Design · Evergreen · shadcn/ui.
> **열거하지 않는** 것 3개 — Tailwind(base × calc) · **Ring UI**(`--ring-unit` × calc 437회) · **MUI**(`theme.spacing(n)` 함수).
> **스타일 층 자체가 없는** 것 3개 — **Ark UI**(anatomy만) · **Headless UI**(CSS 0바이트, 동작만) · **vanilla-extract**(값 없는 토큰 계약 도구).
> **Panda CSS**는 Tailwind 값을 **열거형으로 재배포**하며 반단계(4.5·5.5)·2xs를 증보 — 생성(Tailwind)↔상속(shadcn)↔열거(Panda) 3형태가 완성.
> **상속** 3개 — shadcn/ui · **Skeleton**(Tailwind `--spacing`) · **NASA WDS**(USWDS).
> **미확인** 11개 — Helios · visionOS · Android Automotive · CarPlay ·
> TDS(**해소 2026-08-17**: tds-mobile 빌드에 중앙 스페이싱 객체 없음 — 리터럴 분포 8>24>4>16, `systems/toss-tds.md`) · macOS(페이지 미실측) ·
> Mística(**해소 2026-08-17**: 원천 토큰이 스케일이 아니라 컴포넌트 슬롯별 + mobile/desktop 이중값, `systems/mistica.md`) ·
> Siemens iX · Naive UI · PrimeVue(전역 스케일 미발견, 컴포넌트 미조사) · DSFR(CSS 변수에 없음, SCSS 미조사).
> 2026-08-17 추가 5개: **Italia·NYSDS 4px 배수 열거**(스페이싱 확인 63개로), Audi UI는 4px 베이스 단위(`unit()` 함수형),
> Persona는 preset에 스페이싱 오버라이드 없음(Tailwind 기본 상속 추정 금지 — 미확인), WMN은 min.css 실측만.
> Tailwind는 **스케일을 열거하지 않고 base 하나에서 생성**하므로 값 비교표에서 별도로 다룹니다.

## 스페이싱

| px | Carbon | Polaris | Primer | Fluent | GOV.UK | Ant | Cloud | Backpk | Spectr | Canvas | Paste | Codex | Vapor |
|----|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 0 | | O | | O | O | | | O | | O | O | O | |
| 1 | | O | | | | | | O | O | | | O | |
| 2 | O | O | O | O | | | O | O | O | O | O | O | O |
| 4 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 5 | | | | | O | | | | | | | | |
| 6 | | O | O | O | | | | | O | O | | | O |
| 8 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 10 | | | | O | O | | | | | O | | | |
| 12 | O | O | O | O | | O | O | | O | O | O | O | O |
| 14 | | | | | | | | | | O | | | O |
| 15 | | | | | O | | | | | | | | |
| 16 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 18 | | | | | | | | | | O | | | O |
| 20 | | O | O | O | O | O | O | | O | O | O | O | O |
| 24 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 28 | | | O | | | | | | | O | O | | |
| 30 | | | | | O | | | | | | | | |
| 32 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 36 | | | O | | | | | | | O | O | | |
| 40 | O | O | O | | O | | O | O | O | O | O | O | O |
| 44 | | | O | | | | | | | | O | O | |
| 48 | O | O | O | | | O | | | O | O | O | O | O |
| 56 | | | | | | | | | | O | O | | O |
| 64 | O | O | O | | | | | O | O | O | O | O | |
| 80 | O | O | O | | | | | | O | | O | | |
| 96 | O | O | O | | | | | O | O | | O | | |
| 128 | | O | O | | | | | | | | | O | |
| 160 | O | | | | | | | | | | | | |

### 표에 없는 시스템의 스케일

위 13열 표에 더해지는 시스템입니다.

| 시스템 | 스케일 |
|--------|--------|
| Atlassian | 0·2·4·6·8·12·16·20·24·32·40·48·64·80 (+ 음수 -2~-32) |
| Gestalt | 0·4·8·12·16·20·24·28·32·36·40·44·48·52·56·60·64 (4px 완전 등차) |
| Protocol | 4·8·16·24·32·48 (6단계) |
| Base Web | 2·4·6·8·10·12·14·16·18·20·22·24·28·32·36·40·48·56·64·96·128·192 |
| Nord | 4·8·16·24·36·72 (6단계, 배수 불규칙) |
| Lightning | 0·2·4·8·12·16·24·32·48 (+ 가로/세로 축 분리) |
| EUI | 2·4·8·12·16·24·32·40·48·64 (`base`=16 중간 배치) |
| Orbit | 2·4·6·8·12·16·20·24·28·32·40·48·**52**·64 (+ 컨트롤 크기 별도) |
| Pajamas | 0·1·2·4·6·8·12·16·24·32·40·48·56·64·72·80·96 → 120·144·160·…·704 (인덱스 불규칙) |
| **Radix Themes** | **4·8·12·16·24·32·40·48·64** (9단계) |
| **Mantine** | **10·12·16·20·32** (5단계) |
| **Chakra UI** | 2·4·6·8·10·12·14·16·18·20·24·28·32·36·40·44·48·…·384 (**34단계**) |
| **Open Props** | 4·8·16·20·24·28·32·48·64·80·120·160·240·320·480 (+ **-4**) |
| **Bootstrap** | **0·4·8·16·24·48** (6단계) |
| **USWDS** | 1·2·4·8·12·16·20·24·32·40·48·56·64·72·80·120 (+ **음수 -120까지** + 레이아웃 160~1400) |
| **KRDS** | 1·2·4·6·8·10·12·16·20·24·28·32·36·40·44·48·56·64·72·80·96 (22단계, **루트 10px**) |
| **Garden** | **4·8·12·20·32·40·48** (곱수 1·2·3·5·8·10·12 — **16·24 없음**) |
| **Porsche** | **4·8·16·32·48** static (+ 전 단계 fluid `clamp()` 쌍 — **12·24 없음**) |
| **Blueprint** | 그리드 10px · 파생값 `4px×N` 소수 곱수 (스케일 열거 없음) |
| **Thumbprint** | 4·8·16·24·32·**64·128·256** (32 이후 순수 배가 — 열거형 최대) |
| **Forma 36** | 4·8·12·16·24·32·48·64·80 (9단계, 관행형) |
| **Cedar** | `x`의 분수·배수 산문 명명 — eighth-x(x/8)~four-x. rem 단위, 루트 미확정 |
| **Pharos**(JSTOR) | **Cedar와 같은 산문 체계** — one-eighth-x(2px)~10-x(160px). **기준 x = 1rem 확정** |
| **Clarity**(VMware) | 1·2·4·6·8·12·16·24·32·36·48·64·72·96 — 전부 `calc(n × 내부 배율)` |
| **LeafyGreen** | 0·2·4·6·8·12·16·20·24 (번호 = px × 25, 상단 24에서 종료) |
| **Solid**(BuzzFeed) | 4·8·16·24·32·48·72 (**번호 1 = 8px**, 4px은 `05`) |
| **Palette**(Artsy) | **5·10·20·40·60·120** (10px 단위 — **4·8·16 전부 없음**) |
| **Tegel**(Scania) | element 2·4·8·12·16·20·24·32·40·48 / layout 8·16·24·32·48·64·72·96·128·160 (**10:10 분리**) |
| **Priceline** | **0·4·8·16·32·64·128** (전 구간 2배 등비) |
| **Yoga**(Wellhub) | 0·4·8·12·16·20·24·32·40·56·72·80 (12단계, `huge`/`xhuge`) |
| **NHS** | 0·4·8·16·24·32·40·48·56·64 (**GDS 포크인데 4px로 교체** + 반응형 맵) |
| **Asphalt**(Gojek) | 2·4·8·12·16·20·24·28·32·40·48·56 (12단계 `3XS`~`6XL`) |
| **Unify**(Tokopedia) | sp 2·4·8·16·24·32·40·48 / ly 8·24·32·40·48·64·96·128 (8:8 분리) |
| **Pluralsight** | 4·8·12·16·24·48·64 (7단계, **32 없음**) |
| **Skin**(eBay) | 0·2·4·6·8·12·16·20·24·32·40·48·64·80 (번호 = px × 12.5) |
| **Bolt** | **격자 없음** — 축별 베이스 x 1.55 / y 1.35 × 배수 (medium = 24.8 / 21.6px) |
| **SGDS** | 0·4·8·16·24·32·40·48·56 (Bootstrap 포크 — **원본에 없던 32 복구**) |
| Semi · 디지털청(日) | **치수 토큰 없음** (Semi: 컴포넌트 리터럴 / 디지털청: 색·타이포만) |
| Evergreen | **없음** (라운드·타이포만) |
| **shadcn/ui** | **없음** — Tailwind의 `--spacing`을 그대로 씁니다 |
| **Tailwind CSS** | **열거하지 않음** — `--spacing: 0.25rem` 하나에서 `calc()` 곱셈으로 생성 |

#### Tailwind는 비교 대상이 스케일이 아니라 base입니다

```css
--spacing: 0.25rem;   /* 4px. 단계 목록이 없습니다 */
```

`p-3` = `calc(var(--spacing) * 3)` = 12px입니다. **정수배뿐 아니라 `p-1.5`(6px) ·
`p-2.5`(10px)도 유효**하므로 사실상 2px 단위 무한 스케일입니다.

| 방식 | 시스템 |
|------|--------|
| 단계를 열거 | 23개 |
| 시드에서 파생해 **유한 목록으로 내보냄** | Ant Design |
| **base 하나 + 런타임 곱셈. 목록 없음** | **Tailwind v4** |

**Ant Design과 다릅니다.** Ant은 `sizeUnit`·`sizeStep`에서 계산한 결과를
토큰 목록으로 내보냅니다. Tailwind는 목록 자체를 만들지 않습니다 —
**디자인 도구에 옮길 대상이 없습니다.**

### 코어 — 예외 없는 값이 사라졌습니다 (30개 표본)

**Garden(Zendesk)에 16px이 없습니다.** 곱수 `1·2·3·5·8·10·12`에서 ×4와 ×6을
건너뜁니다 — 마지막까지 무결하던 `16`이 30번째 표본에서 깨졌습니다.

GOV.UK(5px)·Blueprint(열거 없음)·Cedar(루트 미확정)와 열거하지 않는
Tailwind·Ring UI, 스케일 미확인(Mística·Siemens iX 등)을 제외한 **61개** 기준
(2026-08-17, 일본 5종 + 서구 18종 + 동남아 2종 + NHS + 프레임워크 확대 반영):

| 값 | 채택 | 빠진 시스템 |
|----|:----:|------|
| **8** | **57 / 61** | Mantine · Grommet · Kaizen · Artsy |
| **16** | **57 / 61** | Garden · Grommet · Kaizen · Artsy |
| 4 | 56 / 61 | Mantine · Grommet · Kaizen · Braid(최소 8px) · Artsy |
| **24** | **56 / 61** | Mantine · Garden · Porsche · Shoelace · Priceline(4→128 등비) |
| 32 | 52 / 61 | Nord · Bootstrap · Spindle · Grommet · Vanilla · Shoelace · Kaizen · LeafyGreen(24 종료) · Artsy |

> **정정 (같은 배치 내).** 직전 집계에서 Braid를 `16` 미보유로, Vitamin을 `24` 미보유로
> 적었습니다 — **둘 다 틀렸습니다.** Braid는 격자 배수라 `small: 4` = **16px**이고,
> Vitamin은 `spacing_5` = 1.5rem = **24px**입니다. 격자 배수·rem 표기를
> px로 환산하지 않고 숫자만 본 오류입니다.
| 12 | 25 / 29 | Backpack · Protocol · Nord · Open Props |
| 48 | 23 / 29 | Fluent · Cloudscape · Backpack · Nord · Mantine · KRDS(有) 외 |
| 40 | 22 / 29 | Fluent · Ant · Protocol · Nord · Mantine · Bootstrap · Open Props(有) 외 |
| 20 | 22 / 29 | Carbon · Backpack · Protocol · Nord · EUI · Radix Themes · Bootstrap |
| 2 | 20 / 29 | Ant · Gestalt · Protocol · Nord · Mantine · Radix Themes · Open Props · Bootstrap · Garden |
| 6 | 11 / 29 | |

> `12` 이하 행은 29표본 시점 집계 그대로입니다 — 상위 5개 값만 61표본으로 재집계했습니다.

**"모든 시스템이 갖는 값"은 이제 없습니다.** `8`·`16`이 57/61로 가장 강하고 `4`·`24`가 56/61이며,
빠뜨린 시스템이 서로 다릅니다 (4·8은 Mantine, 16은 Garden).
**24가 가장 빠르게 무너지고 있습니다** — 반례 셋(Mantine·Garden·Porsche)이 전부
최근 표본이며, 셋 다 5~7단계 T셔츠 스케일입니다.

**반례가 전부 이름 기반(T셔츠) 소단계 스케일입니다** —
Mantine(5단계) · Garden(7단계) · Nord(6단계) · **Porsche(5단계)** ·
**Kaizen(7단계)** · **Shoelace(10단계)**.
단계 수를 이름으로 묶으면서 중간을 건너뛴 경우들이고,
숫자 키·배수 키 시스템(Tailwind · Chakra · Polaris · USWDS …)은 전부 코어를 유지합니다.
**스케일을 이름으로 줄일 때 코어 값이 빠지기 시작합니다** —
50표본까지 이 경향에 예외가 없습니다 (Grommet·Braid는 T셔츠이면서
격자 자체가 4의 배수가 아닌 별개 유형).

#### 격자가 4px이 아닌 시스템 — 8표본

| 시스템 | 격자 | 코어 이탈 |
|--------|------|-----------|
| GOV.UK | **5px** | 4·8·16·24·32 전부 |
| Blueprint | **10px** | 열거 없음 |
| **Kaizen** | **6px** | **4·8·16·32** |
| **Palette**(Artsy) | **10px** (+ half 5px) | **4·8·16** |
| **Bolt** | **격자 자체가 없음** (x 1.55 / y 1.35 비율만) | **전부** |
| **Grommet** | 24의 약수 (3·6·12) | 4·8·16 |
| **Braid** | 4px 배수를 **무단위 값**으로 (최소 2단위=8) | 4 |
| KRDS | 루트 10px + 4계열 | 없음 (px 환산 시 준수) |

**4px 격자는 관행이지 규범이 아닙니다.** 5·6·10px 격자가 실재하며,
그중 GOV.UK·Kaizen·Artsy는 4px 격자와 사실상 호환되지 않습니다
(6px 격자는 12·24에서만, 10px 격자는 20·40에서만 만납니다).
**8표본 중 4곳이 4·8·16을 동시에 이탈합니다** — Kaizen(6px) · Artsy(10px) ·
Grommet(24 약수) · **Bolt(격자 없음 — 어떤 값도 정수 px이 아닙니다)**.

**표의 8행이 모두 같은 유형은 아닙니다.** Braid는 격자 자체가 4px 배수이고
표기만 무단위이며(최소 2단위 = 8px), KRDS는 루트가 10px이지만 px로 환산하면
4계열을 지킵니다. 둘은 **"표기가 다른" 유형**이라 코어 이탈로 세지 않습니다 —
실제로 4px 격자와 어긋나는 것은 나머지 6표본이고, 그중 4곳이 위의 동시 이탈입니다.

#### 반례가 `framework` 도메인에서 나왔습니다

Mantine과 Radix Themes는 **회사 제품용 디자인시스템이 아니라 프레임워크**입니다
(`domain: framework`). 이 도메인을 제외하면 코어는 21/21로 예외가 없습니다.

**그것을 근거로 Mantine을 표본에서 빼지는 않습니다.** 실무 참조 빈도로 보면
프레임워크 쪽이 더 높고, `4/8/16/24`를 "반드시 지켜야 하는 값"으로 쓰던 판단이
실제로 널리 쓰이는 시스템 하나에서 무너진다는 것이 이 코퍼스에서 확인해야 할 사실입니다.

수정된 결론:

- **16px은 예외가 없습니다** (23/23). 스케일에 반드시 넣습니다
- **`4/8/24`는 22/23으로 매우 강하지만 절대적이지 않습니다**
- **`32`도 22/23입니다** (Nord 빠짐)
- Mantine처럼 **5단계로 줄이면서 4·8을 버리는 선택**이 실제로 존재합니다.
  최소값이 `10`입니다 — 2px·4px 미세 조정을 포기한 형태입니다

Radix Themes는 반대 방향입니다 — `4·8·12·16·24·32·40·48·64` 9단계로
**코어 5개(4/8/16/24/32)를 모두 포함**하고 20px만 뺐습니다.

> **표본 확대 이력.**
>
> | 표본 | 결과 |
> |------|------|
> | 4개 | 코어 7개(`2/4/8/12/16/24/32`)로 판단 |
> | 8개 | **뒤집힘.** 코어 5개(`4/8/16/24/32`)로 축소 |
> | 13개 | **유지** |
> | 16개 | **유지** |
> | 18개 | **일부 수정.** Nord에 32px이 없어 코어가 `4/8/16/24` 4개로 축소 |
> | **24개** | **다시 뚫림.** Mantine에 4·8·24가 없어 **예외 없는 값은 `16` 하나**로 축소 |
| **27개** | **`16` 유지.** 다만 `32`의 예외가 Bootstrap으로 둘이 되고, `12`의 예외가 넷이 됨 |
| 29개 | `16` 유지 (USWDS·KRDS 모두 코어 보유) |
| **30개** | **전멸.** Garden에 16·24가 없어 **예외 없는 값이 0** |
| **42개** | **이탈 폭 갱신.** Grommet(24의 약수 격자 3·6·12)이 4·8·16을 **한꺼번에** 이탈 — 단일 시스템 최대. 32의 예외가 다섯(Spindle·Vanilla 추가) |
| **54개** | **최강값이 바뀌었습니다.** Kaizen(**6px 격자**)이 4·8·16·32를 전부 이탈해 이탈 폭 최대를 갱신하고, Braid(격자 배수, 최소 8px)가 4를 빠뜨려 — 최강값이 `4`에서 **`8`·`16`(각 51/54)**으로 이동했습니다 |
>
> 4→8에서 크게 뒤집힌 뒤 8→18에서 32px 하나가 탈락했고,
> 18→24에서 프레임워크 계열(Mantine)이 들어오며 나머지 셋도 뚫렸습니다.
>
> **"16도 뚫릴 수 있다"고 적어둔 지 한 배치 만에 뚫렸습니다.**
> 확대 9번 중 4번에서 결론이 바뀌었습니다. 이 표가 말하는 것은 명확합니다 —
> **"보편 값"은 표본을 늘리면 반드시 죽는 주장입니다. 남는 것은 채택률 순위뿐입니다.**
> 실무 권고는 그대로입니다: `4/8/16(각 28/29)`로 시작하는 것이 여전히 가장 안전합니다.
> 바뀐 것은 "반드시"라는 말을 쓸 수 없게 됐다는 점입니다.

### Protocol과 Mantine — 최소 스케일 두 개가 정반대 답을 냅니다

가장 적은 단계로 줄인 두 시스템입니다.

| 시스템 | 단계 | 스케일 |
|--------|:---:|--------|
| Mozilla Protocol | 6 | `4 · 8 · 16 · 24 · 32 · 48` |
| **Mantine** | **5** | **`10 · 12 · 16 · 20 · 32`** |

**겹치는 값이 `16`과 `32` 둘뿐입니다.**

Protocol은 코어 5개(`4/8/16/24/32`)와 앞 다섯이 정확히 일치합니다.
Mantine은 코어 중 `16`·`32`만 남기고 `4`·`8`·`24`를 버렸습니다.

**"최소로 줄이면 코어가 남는다"는 해석은 Protocol에서만 성립합니다.**
Mantine을 넣기 전에는 그 해석을 썼으나, 지금은 성립하지 않습니다 — 폐기합니다.

두 시스템이 갈리는 지점은 **최소값**입니다.

| | 최소값 | 최소 두 단계의 간격 |
|---|:---:|:---:|
| Protocol | 4px | +4 |
| Mantine | **10px** | **+2** |

Protocol은 4px 미세 조정을 남기고 상단을 48px까지 늘렸습니다.
Mantine은 4·8px을 버려 미세 조정을 포기하고, 대신 **10~12px 구간에 2px 간격**을 두었습니다.
Mantine의 상단은 32px입니다.

### GOV.UK의 5px — 공공 10표본, 그리고 결정적 반증

**공공 도메인이 10개가 됐는데 5px 베이스는 GOV.UK 하나입니다.**

| 시스템 | 정부/기관 | 베이스 |
|--------|------|:---:|
| **GOV.UK** | 영국 | **5px** (5·15·25·30·50·60) |
| Codex | Wikimedia | 4px 배수 |
| **USWDS** | 미국 | **8px** (`spacing-multiple()`) |
| **KRDS** | 한국 | 4px 계열 (2px 단위 촘촘) |
| **SGDS** | 싱가포르 | 16px `$spacer` 배수 (Bootstrap 포크) |
| **디지털청** | 일본 | **스페이싱 토큰 없음** |
| **DSFR** | 프랑스 | CSS 변수에 스페이싱 없음 (SCSS 미조사) |
| **NHS** | 영국 (보건) | **4px** — **GDS 코드 포크인데 값을 바꿨습니다** |
| **Italia** | 이탈리아 | **4px** 배수 12단계, 이름이 배수(`1x~24x`) — 2026-08-17 추가 |
| **NYSDS** | 미국 뉴욕주 | **4px** 배수 12단계, 이름이 8px=100 백분율 — 2026-08-17 추가 |

**NHS가 질문을 닫았습니다.** `nhsuk-frontend`의 스페이싱 파일 주석에
`"Original code taken from GDS (Government Digital Service)"`가 명시돼 있는데,
`$nhsuk-spacing-points`는 `4·8·16·24·32·40·48·56·64`입니다 —
**같은 코드를 가져다 쓰면서 5px 배수만 4px 배수로 교체**했습니다.
반응형 스페이싱 맵·순번 키·믹스인 같은 **메커니즘은 물려받고 값은 버린** 것으로,
5px가 계승되지 않는다는 직접 증거입니다 (`systems/nhs.md`).

**공공 8개의 공통점은 베이스가 아니라 접근성 구조입니다** — GOV.UK(반응형 내장) ·
USWDS(Section 508 문맥) · KRDS(고대비 모드 190개 동수 배포) ·
**NHS(포커스 노랑을 GOV.UK와 공유 + 인쇄용 `pt` 크기 토큰)**가 각자 다른 형태로
접근성을 토큰 구조에 넣습니다.

### 코어 재확인 — 29개에서도 `16` 무결

USWDS·KRDS 모두 `4/8/16/24/32`를 전부 갖고 있습니다. 예외 목록 변동 없음 —
`16` 29/29, `4/8/24`는 Mantine만, `32`는 Nord·Bootstrap만 빠집니다.

### 스케일 촘촘함의 차이가 큽니다

| 시스템 | 2~20px 구간 단계 수 |
|--------|:---:|
| **Base Web (Uber)** | **10** (2·4·6·8·10·12·14·16·18·20) — 24px까지 2px 단위 지속 |
| Canvas (Workday) | 10 (2·4·6·8·10·12·14·16·18·20) |
| Vapor UI | 8 |
| Primer · Spectrum | 7 |
| Polaris · Fluent | 7 |
| Paste · Codex | 6 |
| Carbon | 5 |
| Ant Design | 5 |
| Backpack | 4 |
| **Chakra UI** | **10** (2·4·6·8·10·12·14·16·18·20) |
| **Mantine** | **4** (10·12·16·20) |
| **Bootstrap** | **3** (4·8·16) |
| **Open Props** | **4** (4·8·16·20) |
| **Radix Themes** | **4** (4·8·12·16) |
| Nord | 3 (4·8·16) |
| **Tailwind** | **무한** (2px 단위 소수 배수 허용) |

**Base Web·Canvas는 Nord의 3배 이상 촘촘합니다.** 촘촘하면 미세 조정이 가능하지만
"10px과 12px 중 무엇" 판단을 매번 해야 합니다. 성기면 판단이 빨라지는 대신
맞지 않는 자리가 생깁니다.

### 상단 끝 — 5배 차이

| 시스템 | 최대값 |
|--------|:---:|
| Base Web | 192px |
| Carbon | 160px |
| Polaris · Primer · Codex | 128px |
| Paste | 116px |
| Backpack · Spectrum | 96px |
| GOV.UK | 60px |
| Vapor | 56px |
| Ant | 48px |
| **Open Props** | **480px** |
| **Chakra UI** | **384px** |
| **Radix Themes** | **64px** |
| **Bootstrap** | **48px** |
| Cloudscape | 40px |
| Fluent | 32px |
| **Mantine** | **32px** |

Nord는 72px로 중간입니다.
**Mantine이 Fluent와 함께 최하위(32px)입니다** — 단계가 5개뿐인 것과 함께 봐야 합니다.
Tailwind는 상단이 없습니다 — `p-96`(384px)도 유효합니다.

낮은 쪽은 Fluent 32px · Cloudscape 40px · Ant 48px로, 레이아웃 여백을 담기에는
부족한 범위입니다. 이 시스템들이 레이아웃 여백을 어떻게 다루는지는 확인하지 못했습니다.
**"스페이싱 토큰이 레이아웃까지 커버하는가"를 먼저 정해야** 상단 범위가 결정됩니다.

Codex(Wikimedia)는 아예 반대로 가서, 여백과 레이아웃 폭을 **하나의 `size` 스케일**에
통합하고 896px까지 담았습니다.

## 스케일을 정의하는 방식

| 방식 | 시스템 | 내용 |
|------|--------|------|
| 값 목록 | 대부분 | 단계마다 값을 직접 지정 |
| **시드 파생** | Ant Design | `sizeUnit`·`sizeStep` 2개에서 전체 계산 |
| **재귀 함수** | Carbon (타이포) | 증분이 4스텝마다 커지는 수식 |
| **런타임 배율** | Vapor UI · **Mantine** · **Radix Themes** | 전 토큰이 `calc(var(--scale) * Npx)` |
| **기준값 변수** | **shadcn/ui** (라운드) | `--radius` 하나에 배율 7개를 곱함 |
| **base 곱셈, 목록 없음** | **Tailwind v4** | `--spacing` 하나. 단계를 열거하지 않음 |
| **베이스라인 배수** | Canvas | 대형 값만 `calc(baseline * N)` |
| **이중 토큰 벌** | Cloudscape | `scaled`/`static` 두 벌 배포 |

### 런타임 배율 — 4개 시스템으로 늘었습니다

처음 Vapor UI 하나였을 때 "유일한 방식"으로 적었으나, **표본을 넓히니 프레임워크 계열에서
같은 방식이 표준적으로 쓰이고 있었습니다.**

| 시스템 | 배율 변수 | 개수 | 적용 범위 |
|--------|-----------|:---:|-----------|
| Vapor UI | `--vapor-scale-factor` · `--vapor-radius-factor` | 2 | 치수 / 라운드 |
| **Mantine** | `--mantine-scale` | **1** | 스페이싱 · 라운드 · 글자 크기 **전부** |
| **Radix Themes** | `--scaling` · `--radius-factor` | 2 | 치수·글자 / 라운드 |
| **shadcn/ui** | `--radius` (기준값) | 1 | 라운드만 |

**두 가지 축으로 갈립니다.**

1. **배율을 하나로 둘지 라운드를 분리할지** — Mantine은 하나, Vapor·Radix는 분리.
   라운드를 분리하면 브랜드 톤(각짐↔둥금)을 여백과 독립적으로 바꿀 수 있습니다
2. **배수를 변수로 둘지 기준값을 변수로 둘지** — Vapor·Mantine·Radix는 배수(`* var(--f)`),
   shadcn/ui는 기준값(`--radius: 10px`)에 상수 배율을 곱합니다

Radix Themes는 노출 값까지 정해두었습니다 — `--scaling`은 `90% · 95% · 100% · 105% · 110%`,
`--radius-factor`는 `0 · 0.75 · 1 · 1.5`입니다. **`0`으로 라운드를 전부 죽일 수 있습니다.**

Cloudscape가 같은 목적을 **토큰 두 벌**(`scaled`/`static`)로 푼 것과 대조됩니다 —
배포량이 2배가 되는 대신 런타임 `calc()` 의존이 없습니다.

**`calc()` 방식의 대가:** 토큰 파일만 읽어서는 최종 px을 알 수 없습니다.
이 코퍼스의 Vapor·Mantine·Radix 표는 모두 **배율 1(100%) 가정값**입니다.

## 이름 붙이는 방식

| 시스템 | 방식 | 16px을 부르는 이름 |
|--------|------|------------------|
| Carbon | 순번 | `spacing-05` |
| GOV.UK | 순번 | `govuk-spacing(4)` |
| Polaris | 4px 배수 숫자 | `space-400` |
| Spectrum | 비균등 숫자 | `spacing-300` |
| Paste | 10 단위 숫자 | `space-50` |
| Canvas | rem×200 숫자 | `base-size-200` |
| Codex | rem×100 숫자 | `size-100` |
| Vapor | rem×12.5 숫자 | `dimension-200` |
| Primer | px 실값 | 키 `16` |
| Fluent 2 | T셔츠 + 축 | `spacingHorizontalL` |
| Ant Design | T셔츠 | `size` / `sizeMS` |
| Cloudscape | T셔츠 × 2계열 | `space-scaled-m` / `space-static-m` |
| Backpack | T셔츠 | `SPACING_BASE` |
| Atlassian | 8px 배수 숫자 | `space.200` |
| **Mantine** | **T셔츠** | **`--mantine-spacing-md`** |
| **Radix Themes** | **순번** | **`--space-4`** |
| **Tailwind** | **배수 자체** | **`p-4` (= base × 4)** |
| **shadcn/ui** | Tailwind 상속 | `p-4` |

**같은 16px을 16가지로 부릅니다.** 숫자 방식만 6가지인데 기준이 전부 다릅니다.

| 시스템 | 16px의 번호 | 번호의 의미 |
|--------|:---:|------|
| Primer | 16 | px 그대로 |
| Paste | 50 | 임의 10단위 |
| Codex | 100 | rem × 100 |
| Vapor | 200 | rem × 12.5 |
| Canvas | 200 | rem × 200 |
| Spectrum | 300 | 비균등 |
| Polaris | 400 | 4px 단위 배수 |
| Atlassian | 200 | 8px 단위 배수 |
| **Radix Themes** | **4** | **순번 (1부터)** |
| **Tailwind** | **4** | **base(4px) 곱할 배수** |

**여러 시스템을 참조해 작업할 때 가장 사고가 나기 쉬운 지점입니다.**
`400`이 Polaris에서는 16px, Vapor에서는 32px, Atlassian에서는 32px입니다.

**`4`가 두 가지 뜻입니다.** Radix Themes의 `--space-4`는 **네 번째 단계**(16px)이고,
Tailwind의 `p-4`는 **base × 4**(16px)입니다. 우연히 같은 값이 되지만
`--space-5`는 24px, `p-5`는 20px로 갈립니다.

| 토큰 | Radix Themes | Tailwind |
|------|:---:|:---:|
| `4` | 16px | 16px |
| `5` | **24px** | **20px** |
| `6` | **32px** | **24px** |
| `7` | **40px** | **28px** |

**5단계부터 어긋납니다.** 두 시스템을 함께 쓰는 프로젝트에서 실수하기 쉬운 자리입니다.

## 라운드

| px | Polaris | Fluent | Ant | Cloud | Spectr | M3 | Paste | Vapor | Atlas | Gestalt | Helios | **Tailw** | **shadcn** | **Mant** | **Radix** |
|----|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 0 | O | O | | | O | O | O | O | | O | | | | | O |
| 2 | O | O | | | | | O | O | O | | | O | | O | |
| 3 | | | | O | O | | | | | | **O** | | | | **O** |
| 4 | O | O | | O | O | O | O | O | O | O | | O | | O | O |
| 5 | | | | | O | | | | | | **O** | | | | |
| 6 | O | O | **O** | | O | | | O | O | | O | O | O | | O |
| 7 | | | | | O | | | | | | | | | | |
| 8 | O | O | | O | O | O | O | O | O | O | O | O | O | O | O |
| 9 | | | | | O | | | | | | | | | | |
| 10 | | | | | O | | | | | | | | **O** | | |
| 12 | O | O | | O | | O | O | O | O | O | | O | | | O |
| 14 | | | | | | | | | | | | | **O** | | |
| 16 | O | O | | O | O | O | O | O | O | O | | O | | O | O |
| 18 | | | | | | | | | | | | | **O** | | |
| 20 | O | | | O | | O | O | O | | O | | | | | |
| 22 | | | | | | | | | | | | | **O** | | |
| 24 | | O | | | | | O | O | | O | | O | | | |
| 26 | | | | | | | | | | | | | **O** | | |
| 28 | | | | | | O | O | | | O | | | | | |
| 30 | O | | | | | | | | | | | | | | |
| 32 | | O | | | | O | O | O | | O | | O | | O | |
| 40 | | O | | | | | | O | | | | | | | |
| 48 | | | | | | O | | | | | | | | | |

Carbon · Primer · GOV.UK · Backpack · Codex · Canvas는 미확인.

- **4 / 8 / 16이 사실상 공통**입니다. 신규 4개 중 **Tailwind · Mantine · Radix Themes 전부 있고**,
  shadcn/ui만 없습니다 (기준값 10px에서 배율로 6/8/10/14/18/22/26이 나오므로 4·16이 빠짐)
- **8px은 15개 전부에 있습니다** (Ant 제외 시). 라운드에서 가장 강한 값입니다
- **Radix Themes에 3px이 있습니다.** Helios·Cloudscape·Spectrum과 함께 4개입니다.
  `--radius-1`이 `calc(3px * …)`입니다
- **shadcn/ui만 14·18·22·26px을 갖습니다.** 기준값 10px × 배율 1.4/1.8/2.2/2.6의 결과입니다.
  다른 시스템이 12·16·20·24로 4px 격자를 따르는 자리에 **2px 홀수 격자**가 들어갑니다
- **Mantine은 2·4·8·16·32 순수 2배 등비**입니다. 표본에서 유일합니다.
  6·12·20·24가 전부 없습니다
- **Helios(HashiCorp)는 3·5·6·8px 4단계뿐**이고 전부 8px 이하입니다.
  Spectrum과 함께 홀수 라운드를 쓰는 드문 사례이면서, 큰 라운드가 아예 없습니다
- **Gestalt는 스페이싱과 라운드가 같은 4px 리듬**을 갖습니다 (0·4·8·12·16·20·24·28·32)
- **Ant Design은 라운드가 값 하나(6px)뿐입니다.** 스케일 자체가 없습니다
- **Spectrum은 3~10px을 1px 단위로** 제공합니다. 가장 세분화돼 있습니다
- **Material 3은 큰 쪽으로 갑니다** — 28·32·48px. Carbon(라운드 0 지향)과 정반대 축입니다
- **Cloudscape는 일반 스케일 없이 컴포넌트별 값만** 노출합니다
- **Tailwind는 4px 격자에 정확히 맞습니다** — 2·4·6·8·12·16·24·32.
  shadcn/ui가 이것을 덮어써서 격자를 깨는 구조입니다

### 라운드 8단계 — Tailwind와 shadcn/ui가 같은 단계 이름에 다른 값을 씁니다

**같은 프로젝트에서 두 이름 체계가 겹치는 유일한 사례**입니다.
shadcn/ui는 Tailwind 위에 얹히면서 `--radius-*`를 재정의합니다.

| 단계 | Tailwind | shadcn/ui | 차이 |
|------|:---:|:---:|:---:|
| `xs` | 2 | — | 제거 |
| `sm` | 4 | **6** | +2 |
| `md` | 6 | **8** | +2 |
| `lg` | 8 | **10** | +2 |
| `xl` | 12 | **14** | +2 |
| `2xl` | 16 | **18** | +2 |
| `3xl` | 24 | **22** | **-2** |
| `4xl` | 32 | **26** | **-6** |

**`rounded-lg`가 Tailwind 프로젝트에서는 8px, shadcn/ui 프로젝트에서는 10px입니다.**
클래스 이름이 같아 코드만 봐서는 구분되지 않습니다.

`3xl`·`4xl`에서 부호가 반대로 바뀝니다 — shadcn/ui의 배율이 선형이라
Tailwind의 가속 스케일(16→24→32)을 따라가지 못합니다.

### "완전한 원"을 표현하는 방식 — 4가지로 갈립니다

| 방식 | 시스템 | 값 |
|------|--------|-----|
| 큰 상수 | Polaris · Atlassian | `9999px` |
| 큰 상수 | Nord (`pill`) | `999px` |
| 큰 상수 | Fluent 2 | `10000px` |
| 비율 | Spectrum | `0.5` |
| 비율 | Paste (`circle`) · Gestalt · Nord | `50%` |
| 고정 px | Paste (`pill`) | `100px` |
| **고정 px (작음)** | **Lightning (`PILL`)** | **`15rem` = 240px** |
| **컨테이너 쿼리 단위** | **Material 3** (웹) | **`50cqmin`** |
| 큰 상수 | **Material 3** (Figma) | **`1000px`** |
| **부분 비율** | **Atlassian (`radius.tile`)** | **`25%`** |

**Lightning의 240px이 표본 중 가장 작습니다.** 요소가 240px보다 크면 완전한 알약이 되지 않습니다.
9999px 계열과 실질적으로 다른 결과를 냅니다.

**Material 3은 출처에 따라 값이 다릅니다** — Figma 킷은 `1000px`, 웹 패키지는 `50cqmin`입니다.
같은 개념을 디자인 도구는 큰 상수로, 구현은 컨테이너 쿼리 단위로 표현합니다.
나머지 라운드 9단계는 두 출처가 정확히 일치합니다.

`50cqmin`은 유일하게 현대 CSS 단위를 씁니다.
Paste만 `pill`(알약)과 `circle`(원)을 **별개 토큰으로 구분**합니다.

Atlassian의 `radius.tile: 25%`는 원형이 아닌 **부분 비율 라운드**입니다. 표본에서 유일합니다.

Nord는 반대쪽 극단에 유일한 사례가 있습니다 — **완전한 0 라운드가 없고**
가장 각진 값이 `0.02em`입니다. 폰트 크기에 비례하는 극소 라운드로, 텍스트가 커지면
모서리도 미세하게 둥글어집니다.

## 보더 두께

| 시스템 | 값 | 명명 |
|--------|-----|------|
| Primer | 1 / 2 / 4px | 크기 (`thin`·`thick`·`thicker`) |
| Polaris | **0.66** / 1 / 2 / 4px | 숫자 |
| Spectrum | 1 / 2 / 4px | 숫자 |
| Ant Design | 1px (시드) | — |
| **Atlassian** | 1 / 2px | **상태** (`width`·`width.selected`·`width.focused`) |

**1 / 2 / 4px가 공통**입니다. Polaris의 0.66px은 서브픽셀 hairline으로, 유일한 사례입니다.

**Atlassian만 보더 두께를 상태로 명명합니다.** `selected`와 `focused`가 값은 같지만(2px)
별도 토큰이라, 나중에 두 상태를 다르게 바꿀 수 있습니다.
Primer가 크기(`thin`/`thick`)로 이름 붙인 것과 대조적입니다.

## 타이포그래피 — 두 모바일 OS 전체 스케일

Apple HIG와 Material 3의 전체 스케일이 확보됐습니다. 표본에서 **전 단계가 확인된 유일한 두 시스템**입니다.

| Apple (SF Pro) | 크기 | 자간 | | Material 3 (Roboto) | 크기 | 자간 |
|---|:---:|:---:|---|---|:---:|:---:|
| Large Title | 34 | +0.40 | | Display Large | 57 | -0.25 |
| Title 1 | 28 | +0.38 | | Display Medium | 45 | 0 |
| Title 2 | 22 | -0.26 | | Display Small | 36 | 0 |
| Title 3 | 20 | -0.45 | | Headline Large | 32 | 0 |
| Headline | 17 | -0.43 | | Headline Medium | 28 | 0 |
| Body | 17 | -0.43 | | Headline Small | 24 | 0 |
| Callout | 16 | -0.31 | | Title Large | 22 | 0 |
| Subheadline | 15 | -0.23 | | Title Medium | 16 | +0.15 |
| Footnote | 13 | -0.08 | | Body Large | 16 | +0.50 |
| Caption 1 | 12 | 0 | | Body Medium | 14 | +0.25 |
| Caption 2 | 11 | +0.06 | | Label Small | 11 | +0.50 |

### 자간이 정반대 곡선을 그립니다

| | 큰 글자 | 중간 | 작은 글자 |
|---|:---:|:---:|:---:|
| **Apple** | **양수** (+0.40) | 음수 (-0.45) | **양수** (+0.06) |
| **Material 3** | 음수 / 0 (-0.25) | 0 | **양수** (+0.50) |

**Apple은 U자, Material 3은 단조 증가입니다.**
큰 글자에서 Apple은 벌리고 Material은 좁힙니다 — 정면으로 반대입니다.
작은 글자에서만 둘 다 양수로 만나지만, Material(+0.50)이 Apple(+0.06)의 8배입니다.

**크로스 플랫폼에서 자간을 한 값으로 통일하면 양쪽 다 어긋납니다.**
플랫폼별로 나누는 것 외에 방법이 없습니다.

### Material 3은 자간을 크기가 아니라 용도로 정합니다

같은 14px이 계열마다 다릅니다 — Title 0.10 · Body 0.25 · Label 0.10.
Apple은 크기가 같으면 자간도 같습니다 (Headline·Body 모두 17px / -0.43).

### 행간 — Apple만 변형을 제공합니다

Apple은 같은 크기에 **Tight / 기본 / Loose** 세 벌을 둡니다.
Loose는 전 스타일 예외 없이 **기본 +2px**입니다.
행간 변형을 토큰으로 두는 것은 표본에서 Apple뿐입니다.

### 강조 굵기 — Material 3만 쌍으로 둡니다

모든 스타일에 `Weight`와 `Weight-emphasized`가 있고,
Regular→Medium, Medium→SemiBold로 한 단계씩 올립니다.

Apple은 Regular / Emphasized / Italic / Emphasized Italic 조합을 **별도 스타일**로 정의합니다
(총 102개).

## 본문 기본 크기

| 시스템 | 본문 기본 |
|--------|:---:|
| **Apple HIG** (Body) | **17px** |
| Canvas · Paste · Material 3 (Body Large) · **Tailwind** (`text-base`) · **Radix Themes** (`font-size-3`) · **Mantine** (`md`) | 16px |
| **Ant Design · Material 3 (Body Medium) · Helios · Atlassian · shadcn/ui** | **14px** |

**신규 4개가 두 진영으로 갈립니다.** Tailwind·Radix Themes·Mantine은 기본 토큰이 16px인데,
**shadcn/ui는 컴포넌트에서 `text-sm`(14px)을 씁니다** — Button·Input·Select·Table 전부입니다.
토큰 기본값(16)과 컴포넌트 실사용값(14)이 다릅니다.

**Atlassian은 `font.body.[default]`가 14px입니다** — 토큰 이름에 `[default]`가 박혀 있어
14가 기본임이 명시적입니다.

shadcn/ui Input만 예외로 **모바일 16 / 데스크톱 14**입니다 (`text-base md:text-sm`).

**17px은 Apple만 씁니다.** 16px도 14px도 아닌 값으로, 웹 관행과 어긋납니다.
iOS 시안을 웹으로 옮길 때 본문 크기를 그대로 가져오면 안 되는 이유입니다.

Material 3은 `Body Large`(16)와 `Body Medium`(14)을 둘 다 두어,
어느 쪽을 기본으로 볼지는 사용하는 쪽이 정합니다.

## 특수한 축

원시 스케일 외에 일부 시스템만 갖는 개념입니다.
**필요할 때 이런 축이 존재한다는 것 자체를 아는 게 중요합니다.**

| 축 | 보유 시스템 | 내용 |
|----|------------|------|
| **플랫폼 분기** | **Spectrum** | 토큰마다 desktop/mobile 값을 따로 (`sets`) |
| 반응형 스페이싱 | GOV.UK | 브레이크포인트별 값을 토큰에 내장 |
| **유동 타이포 (`clamp()`)** | **Pajamas** | 제목 크기가 뷰포트에 따라 변함. `-fixed` 변형 쌍 |
| 복합 타이포 토큰 | Pajamas | 크기·행간뿐 아니라 마진·색까지 한 토큰에 |
| 이름 없는 배열 토큰 | Evergreen | `radii[0]`·`radii[1]` — 인덱스로만 참조 |
| Tailwind 출력 | Pajamas | 토큰에서 Tailwind 설정 생성 |
| 밀도 반응 (토큰 이중화) | Cloudscape | `scaled`(축소됨) vs `static`(고정) |
| 밀도 반응 (런타임 배율) | Vapor UI | `--vapor-scale-factor` 하나로 전체 조정 |
| 축 분리 | Fluent 2 · **Lightning** | 가로/세로 스페이싱 별도 토큰 |
| **컨트롤 크기 분리** | **Orbit** | 스페이싱과 별개 `size` 스케일 5단계 (16~52px) |
| 상태별 색 10단계 | Orbit | 색상당 `normal`/`Active`/`Hover` × 명도 |
| 알파 색상 별도 계열 | Seed Design | `gray` / `gray-alpha-*` |
| 음수 스페이싱 | Primer · **Atlassian** | Primer -2~-48px · Atlassian -2~-32px |
| 시맨틱 별칭 | Polaris · Cloudscape · Backpack · **Gestalt** | `space-card-padding` 등 |
| **다중 값 라운드** | **Gestalt** | `0 50% 50% 0` 같은 4모서리 조합을 토큰화 |
| **상태별 보더 두께** | **Atlassian** | `width.selected` · `width.focused` |
| 투명도 스케일 | Gestalt | `--opacity-0` ~ `-500` |
| 자간 토큰 | Backpack | letter-spacing 독립 토큰 |
| 다중 브랜드 | Paste | SendGrid 등 브랜드별 테마 |
| 크로스 플랫폼 토큰 | Paste · Material 3 | iOS / Android 토큰 동시 배포 |
| 뷰포트를 스케일에 포함 | Codex | 브레이크포인트를 `size-viewport-*`로 |
| **커서 토큰** | **Radix Themes** | `--cursor-button`·`--cursor-link` 등 9개 |
| **컴포넌트 모션 토큰** | **Atlassian** | `motion.modal.enter` 등 68개 복합 객체 |
| **원근(perspective) 토큰** | **Tailwind** | `dramatic` 100 ~ `distant` 1200px 5단계 |
| **테마 축 조합** | **Radix Themes** | 강조색 26 × 회색 5 × 밀도 5 × 라운드 5 × 패널 2 |
| **높이 = 스페이싱 토큰** | **Radix Themes** | 버튼 높이가 `--space-5`~`8` |
| **언어별 서체 토큰** | **shadcn/ui** | `--font-ar`·`--font-he` |
| **차트 전용 토큰 100개** | **Atlassian** | `categorical` 16색 + 색상별 6 + 상태별 4 |
| **P3 대체 팔레트** | **Radix Themes** | `@supports`로 광색역 색 재정의 (1,579회) |
| **알파 12단계 전 색상** | **Radix Themes** | 색상당 불투명 12 + 알파 12 = 24 |
| **OKLCH 전용 컬러** | **shadcn/ui** | 전 색 토큰이 `oklch()` |
| **`UNSAFE` 접두 토큰** | **Atlassian** | `utility.UNSAFE.transparent` |

**밀도 대응을 두 방식으로 풀었습니다.**
Cloudscape는 토큰을 두 벌 만들어 설계 시점에 선택하게 하고,
Vapor UI·Mantine·Radix Themes는 배율 변수로 런타임에 조정합니다.
전자는 어떤 여백이 줄어도 되는지 명시적이고, 후자는 전부 균일하게 줄어듭니다.

**런타임 배율 쪽이 표본에서 더 흔합니다** (4 대 1). 자세한 비교는 위
"런타임 배율 — 4개 시스템으로 늘었습니다"를 보세요.

## 모바일 — 터치 타겟

표본에서 모바일 OS는 **Material 3**과 **Apple HIG(iOS 26)** 둘뿐입니다.

| 시스템 | 값 | 비고 |
|--------|:---:|------|
| Material 3 | 48dp | 단일 최소값 |
| **Apple — 상단 툴바** | **44pt** | |
| **Apple — 하단 툴바** | **48pt** | 엄지 도달 영역 |

**Apple은 화면 위치에 따라 터치 타겟을 다르게 둡니다.**
같은 심볼 버튼이 상단 44pt, 하단 48pt입니다.
단일 최소값을 두는 Material과 갈리는 지점이며, 표본에서 위치별로 나눈 것은 Apple뿐입니다.

**차량이 압도적으로 큽니다** — Android Automotive 64dp는 모바일(48dp)의 1.33배입니다.
같은 차량인 CarPlay는 44pt로, **두 차량 플랫폼 사이에 1.45배 차이**가 납니다.

**하단에서는 두 모바일 OS가 48로 일치합니다.** 크로스 플랫폼 앱이라면 48을 기준으로 잡고,
iOS 상단 툴바에서만 44를 허용하는 방식이 안전합니다.

### 자간 — 두 OS가 정반대

| 시스템 | 큰 제목 | 본문급 |
|--------|:---:|:---:|
| Apple HIG | Large Title 34px → **+0.40** | Headline 17px → **-0.43** |
| Material 3 | Headline 24·32px → **0** | Body Medium 14px → **+0.25** |

**Apple은 큰 글자를 벌리고 작은 글자를 좁힙니다. Material 3은 그 반대입니다.**
같은 문제(크기별 가독성)에 정반대로 답했습니다.

크로스 플랫폼에서 자간을 한 값으로 통일하면 **양쪽 다 어긋납니다.**
플랫폼별로 나누거나, 한쪽 관행을 택하고 그 이유를 문서화해야 합니다.

### Apple 안에서도 플랫폼마다 값이 다릅니다

iOS 26과 visionOS는 같은 SF Pro를 쓰고 스타일 이름도 같습니다.

| 스타일 | iOS 26 | visionOS |
|--------|:---:|:---:|
| Title 2 | 22 / 28 · 자간 **-0.26** | 22 / 28 · 자간 **0** |
| Title 3 | **20** / 25 · 자간 **-0.45** | **19** / 24 · 자간 **0** |
| 기본 굵기 | Regular (400) | **Bold (700)** |

**"Apple 디자인시스템"을 하나로 취급할 수 없습니다.**
visionOS는 자간을 전부 0으로 두고, Title 3에서 크기까지 1px 다릅니다.

### 상태 집합이 입력 방식에 종속됩니다

| 플랫폼 | Hover | 근거 |
|--------|:---:|---|
| `web` | O | 마우스 |
| `mobile` | ✗ | 터치는 hover 단계가 없음 |
| **`spatial`** | **O** | **시선(gaze)** |

**visionOS는 마우스가 없는데 Hover 상태가 있습니다.** 시선으로 대상을 가리키므로
탭 이전 단계가 생깁니다. 터치 전용으로 만든 컴포넌트를 그대로 옮기면 이 상태가 비어버립니다.

visionOS는 기본 상태 이름도 `Idle (No Platter)`입니다 — Platter는 컨트롤 뒤에 깔리는
유리판 배경이며, **배경이 옵션**이라는 뜻입니다.

### 스페이싱 토큰이 없는 시스템 — 이제 4개입니다

| 시스템 | 플랫폼 | 있는 것 |
|--------|--------|---------|
| Apple HIG | `mobile` | 타이포·컬러·재질·시트 라운드 |
| Material 3 | `[web, mobile]` | 타이포·컬러·라운드 |
| Seed Design | `[web, mobile]` | 타이포·컬러만 |
| **Evergreen** | **`web`** | 타이포·컬러·라운드 |

| **shadcn/ui** | **`web`** | 컬러·라운드 (스페이싱은 Tailwind에서 옴) |

**Evergreen이 순수 `web`인데도 스페이싱이 없습니다.**
"모바일 OS만의 특성"이라는 초기 해석은 성립하지 않습니다.

**shadcn/ui는 성격이 다른 부재입니다** — 스페이싱을 안 두는 것이 아니라
**Tailwind 것을 쓰기 때문에 다시 정의하지 않는 것**입니다.
Evergreen처럼 "스케일이 없음"이 아니라 "상속함"입니다.

### 두 모바일 OS 모두 스페이싱을 토큰화하지 않습니다

변수 export 전체를 확인한 결과입니다.

| 시스템 | 스페이싱 토큰 |
|--------|---|
| Apple HIG | **없음** — 컴포넌트 프레임에 직접 지정 |
| Material 3 | **없음** — 4dp 그리드는 문서상 개념일 뿐 |

웹 시스템 30개 중 27개가 스페이싱을 토큰으로 둡니다 —
예외는 Evergreen(없음) · shadcn/ui(Tailwind 상속) · Seed Design(없음)입니다.
`platform`이 토큰 구조를 가르는 실증 사례입니다 — 자세한 내용은 `../platforms.md` 참고.

모바일에서는 여백을 컴포넌트 규격(터치 타겟·툴바 높이)이 결정하므로
독립 스케일이 필요 없다는 해석이 가능하지만, **두 출처 어디에도 그 근거는 없습니다.**

실무적으로는 이렇습니다 — **iOS·Android 시안에서 스페이싱 스케일을 기대하지 마세요.**
대신 컴포넌트 실측 치수를 기준으로 삼아야 합니다.

### 차량 플랫폼에만 있는 제약 축

Android Automotive와 CarPlay를 넣으면 **다른 32개 시스템에 없는 종류의 규격**이 나옵니다.

| 축 | Android Automotive | CarPlay |
|----|---|---|
| 최소 폰트 | **24sp** | 미확인 |
| 타겟 간 간격 | **24dp** (규격) | 미확인 |
| 응답 시간 | 버튼 2초 · 실행/로딩 10초 | 미확인 |
| 태스크 단계 | **5화면 이하** | 템플릿이 강제 |
| 화면당 정보량 | 지도 주석 5 · 범례 3 | Grid 8 · POI 12 · Tab 5 |
| 주행 중 차단 | **플랫폼이 런타임 차단** | 미확인 |

**24sp 최소 폰트는 다른 시스템의 최대 본문 크기보다 큽니다.**
Apple iOS Body가 17pt, 대부분의 웹 시스템이 14~16px인데, 차량은 그 아래로 못 내려갑니다.

**시간과 태스크 단계를 규격화한 것은 차량뿐입니다.** 다른 시스템에서 시간은
모션 토큰의 영역이고 "얼마나 빨라야 하는가"는 규격에 없습니다.

**CarPlay는 템플릿 기반입니다.** 개발자가 레이아웃을 짜지 않고 Apple이 정한
템플릿 11종에 콘텐츠만 넣습니다. 개수 제한이 API에 강제됩니다.
표본에서 완성된 화면 템플릿을 제공하는 유일한 시스템입니다.

**차량 두 시스템 모두 자체 토큰이 없습니다** — Material 3 / iOS를 상속하고 규격만 추가합니다.

### 재질 — Apple만 가진 축

iOS 26의 `Liquid Glass`는 굴절 100 · 분산 0 · 조명 각도 -45 · 서리 7 · 깊이 16 ·
Splay 6 · 불투명도 60의 **광학 파라미터 7종**을 토큰으로 둡니다.

다른 시스템은 이 자리를 `shadow`·`elevation` 정도로 다룹니다.
**층위가 다른 개념이라 비교표에 넣을 수 없습니다.**
iOS 네이티브 느낌을 웹에서 흉내 내려 할 때 참고할 만합니다.

## 구현 시 기본값

**스페이싱 표본 24개** 기준 권고입니다.

**스페이싱** — 예외 없는 값은 하나뿐이지만, 실무 기본값은 여전히 코어에서 시작합니다.
```
4, 8, 12, 16, 24, 32
```

| 값 | 채택률 | 판단 |
|----|:---:|------|
| **16px** | **28/29** | Garden만 없습니다. 사실상 필수 |
| 4 · 8px | 28/29 | Mantine만 없습니다. 사실상 필수 |
| 24px | 27/29 | Mantine · Garden |
| 32px | 27/29 | Nord · Bootstrap |
| 12px | 20/23 | 8과 16 사이. 없으면 실제로 불편합니다 |
| 48px | 18/23 | 레이아웃 여백을 스페이싱으로 다룰 경우 |
| 40px | 18/23 | 위와 같음 |
| 2px | 17/23 | 아이콘·보더 인접 조정 |
| 20px | 17/23 | 16과 24 사이 |
| 6px | 9/23 | 절반 이하. 정말 필요할 때만 |

**`4, 8, 12, 16, 24, 32` 6단계로 시작**하는 것을 권합니다.

처음부터 20단계를 만들지 마세요. Canvas·Base Web처럼 2px 단위로 촘촘하게 가면
매 결정마다 판단 비용이 듭니다. 반대로 Mantine처럼 5단계로 줄이면
`4`·`8` 같은 미세 조정 자리가 없어집니다 — **줄일 거면 최소값을 무엇으로 둘지 먼저 정하세요.**

**단계 수를 줄이는 두 가지 답:**

| | 최소값 | 스케일 | 포기한 것 |
|---|:---:|--------|-----------|
| Protocol | 4px | `4·8·16·24·32·48` | 10~20px 구간의 중간값 |
| Mantine | 10px | `10·12·16·20·32` | 4·8px 미세 조정 |

**Tailwind 방식(base 하나 + 곱셈)을 쓸 거면 대가를 알고 쓰세요.** 스케일이 무한해져
"어떤 값을 쓸지" 판단이 사라지지 않고 **디자인 도구로 옮길 목록이 없어집니다.**
Figma Variables로 내보내려면 쓸 단계를 직접 골라 열거해야 합니다.

**라운드**
```
0, 4, 8, 16
```
+ 원형 표현 하나. 12·20·24는 필요해지면 추가합니다. (표본 15개)
브랜드 톤이 둥근 쪽이면 Material 3처럼 28·32까지 확장합니다.

**8px이 라운드에서 가장 강합니다** — 15개 중 Ant을 뺀 전부에 있습니다.

**`--radius` 하나에 배율을 곱하는 방식(shadcn/ui)은 격자를 깹니다.**
기준값 10px에서 6/8/10/14/18/22/26이 나와 4px 격자를 벗어납니다.
스페이싱과 라운드를 같은 격자에 두고 싶다면 값을 직접 열거하세요.

**Mantine의 순수 2배(2/4/8/16/32)는 12·20·24가 없습니다.**
`rounded-lg`쯤에서 8과 16 사이가 비어 실제로 불편해집니다.

**보더**
```
1, 2, 4
```

**포커스링** — 표본에서 2px이 다수이고, **shadcn/ui만 3px**입니다.
Atlassian은 `border.width.focused`를 2px 별도 토큰으로 둡니다.
링을 요소에 붙일지(shadcn/ui) offset을 둘지도 함께 정하세요.

**이름** — 팀 상황으로 정합니다.
- px으로 대화하는 팀이면 **px 실값**(Primer). 가장 오해가 적습니다
- 리스케일·리브랜딩 계획이 있으면 **순번**(Carbon·GOV.UK·Radix Themes) 또는 **시드 파생**(Ant Design)
- 단계가 8개 이하로 유지되면 **T셔츠**(Fluent·Backpack·Mantine)
- **숫자 방식을 쓸 거면 기준을 문서에 명시하세요.** 표본에서만 6가지 기준이 나왔습니다
- **`--space-4`(순번)와 `p-4`(배수)를 섞지 마세요.** 4단계까지는 우연히 같고
  5단계부터 갈립니다 (Radix 24 vs Tailwind 20)

한 번 정하면 되돌리기 매우 비쌉니다. 토큰 작업 착수 **전에** 확정하세요.

**밀도 모드를 지원할 계획이면** 초기에 방식을 정하세요.
- 여백마다 축소 여부를 다르게 하려면 → Cloudscape 방식(토큰 이중화)
- 전체를 균일하게 줄여도 되면 → Vapor 방식(런타임 배율). 훨씬 간단합니다

나중에 도입하려면 기존 토큰을 전부 재분류해야 합니다.

**모바일을 함께 다룬다면** Spectrum의 `sets` 구조(토큰당 desktop/mobile 값)를 검토하세요.
플랫폼 분기를 컴포넌트 구현이 아니라 토큰에서 흡수합니다.
