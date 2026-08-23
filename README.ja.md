# Self-Made DesignOps

![Design systems](https://img.shields.io/badge/design_systems-116-blue)
![Pattern axes](https://img.shields.io/badge/pattern_axes-9-8A2BE2)
![Platforms](https://img.shields.io/badge/platform_axes-7-teal)
![Machine readable](https://img.shields.io/badge/data-JSON-orange)
![Agent guides](https://img.shields.io/badge/agent_guides-4-green)
![Docs language](https://img.shields.io/badge/corpus_language-English%20%2B%20한국어-blue)

[English](README.md) · [한국어](README.ko.md) · **日本語** · [简体中文](README.zh-Hans.md) · [Bahasa Indonesia](README.id.md) · [Español](README.es.md)

📖 **[Web でコーパスを見る](https://keepyaoung.github.io/self-made-design-ops/)** — 116 システムをプラットフォーム・ティア・ドメインで絞り込めます。

デザインと開発の間で繰り返される作業を**共有資産にしておくリポジトリ**です。複数のプロダクトで再利用される規約・リファレンス・ツールを収めます。**特定プロダクトの実データは置きません** — それは各プロダクトのリポジトリに属します。

`design-systems` `design-tokens` `ui-patterns` `event-taxonomy` `i18n` `l10n` `llm-agents` `figma`

## どう使うか

**1.「この値、うちだけおかしい?」— 確認して議論を終わらせます。**
ボタンの高さで20分議論する代わりに `design-systems/patterns/button.md` を開きます。
77システムの実測分布があり、**最頻値は40pxですが、それでも約23%**にすぎません。
つまり「業界標準の高さは存在しない」が結論です。議論は*「何が正しいか」*から
*「自分たちの密度に何が合うか」*へ移ります。

**2. 新しく作るとき — 白紙から始めません。**
各 `patterns/*.md` の末尾にある**「実装時のデフォルト」**節が目的地です。
スペーシング・タイポ・モーションのスケールをゼロから発明せず、ここから始めて必要な分だけ変えてください。

**3. レビューの根拠 — 好みではなく標本で語ります。**
「なんか違う気がします」ではなく**「この値は79標本に反例がありません」**と書けます。
`agents/design-review.md` がその手順で、3分類の判定(*収束からの逸脱 / 許容される分岐 /
内部不整合*)が**好みの指摘と実際の欠陥を切り分けます。**

**4. LLMエージェントの根拠資料として。**
`design-systems/data/*.json` は機械可読で、`agents/` に実行手順があります。
デザインレビュー・イベントシート作成・多言語点検をエージェントに任せるとき、この資料を渡してください。

## 何が良くなるか

- **意思決定が速くなります** — 「他社はどうしてる?」を毎回調べる時間がなくなります。
- **意思決定が残ります** — なぜその値なのかが**標本数とともに**記録され、半年後に同じ議論を繰り返しません。
- **通説が濾されます** — この資料自体、標本を増やす過程で**自らの結論24件を覆しました**
  (例:「Webモーダルの角丸は8〜12pxに集まる」→ 実際にはその帯が**最も薄い**群でした)。
- **分からないものは分からないと書きます** — 未確認の値は `미확인`(未確認)のまま残します。
  もっともらしく埋めるより良く、次の人が引き継げます。

> **はじめての方へ** — `design-systems/patterns/` から軸を一つ選び、**末尾の「実装時のデフォルト」から**読んでください。
> その上はすべて、その結論の根拠です。

## awesome-design-systems と何が違うか

[`alexpate/awesome-design-systems`](https://github.com/alexpate/awesome-design-systems) はこのコーパスの候補プールでした — 両者は目的が異なり、補完関係にあります:

| | awesome-design-systems | **Self-Made DesignOps** |
|---|---|---|
| 正体 | キュレーションされた**リンク集**（約160件） | **検証値コーパス**（116件） |
| コンテンツの単位 | 名前 + URL | 実測トークン値 — 記述ごとに出典・バージョンを固定 |
| 答える問い | *「どんなデザインシステムがあるか？」* | *「実際にどの値を使い、どこで収斂・分岐するか？」* |
| 深さ | 各システムのドキュメントへリンク | システム別エントリ + 横断パターン9軸、末尾は**実装時のデフォルト** |
| 検証 | — | 未確認値は未確認と明記、月次CIが固定バージョンを再照合 |
| 機械可読 | — | `design-systems/data/*.json` |
| 想定読者 | 眺める人 | 値を決める人 — そして **LLMエージェント**（`agents/` 手順） |

システムの発見には awesome リストを、ボタンの高さを決めるにはこのコーパスを。


## 構成

| ディレクトリ | 内容 | 状態 |
|--------------|------|------|
| [`design-systems/`](design-systems/) | 公開デザインシステムのリファレンスコーパス — トークン実値で検証 | **116システム** |
| [`agents/`](agents/) | LLMエージェント向け作業手順 — デザインレビュー・イベントシート・ローカライゼーション | ガイド4種 + ナビゲーション |
| [`profiles/`](profiles/) | **制作指示書** — コーパスから導出した `DESIGN.md` プロファイル。全ての値に根拠グレードを付与 | measured 4種 + interpreted 層 |
| [`event-taxonomy/`](event-taxonomy/) | 分析イベントシート作成規約 + 変換・リントスクリプト | 規約 · 変換器 |
| [`i18n/`](i18n/) | ローカライゼーション規約 + リンター | 規約 · リンター |
| [`mockups/`](mockups/) | デバイスモックアップ資産の目録 | Apple · Google · Samsung · Meta · Microsoft · Figma 公式 — **6件** |

> **注:** コーパス本文は英語が主版で、韓国語の原文が `<slug>.ko.md` として併存しています。トークン値・表・JSON抽出（`design-systems/data/`）は言語中立です。

## `design-systems/` — コーパス

「モーダルの幅を何段階にするか」「スペーシングスケールをどこで切るか」といった判断の前に、**メジャーなシステムが実際にどうしたか**を根拠付きで確認するための資料です。すべての記述に出典とバージョンが固定され、確認できなかった値は「未確認」と明記します。

- **`systems/`** — 1システム1ファイル（116件）、YAML frontmatter（組織・ティア・プラットフォーム・検証日・出典）
- **`patterns/`** — **9つのコンポーネント軸**の横断比較: typography · color · button · form · motion · modal · table · navigation · feedback。各文書末尾の**「実装時のデフォルト」**節がこのコーパスの目的です
- **`tokens/scales.md`** — スペーシング・角丸・ボーダーの横断比較。結論: **普遍的なスペーシング値は存在しません** — 残るのは採用率ランキング（4/8/16 が最強、次いで 32、24）
- **`platforms.md`** — プラットフォーム7軸すべてに標本あり: web · mobile · desktop · spatial · automotive · wearable · tv。**プラットフォームが違えばトークン構造自体が違います**
- **`data/`** — 機械可読JSON（frontmatter全体 + 横断結論のキュレーション）
- **`GLOSSARY.md`** — システム間の同義語・異義語の用語集（Liquid Glass のパラメータ、ピル vs 真円、rem ルート前提…）
- **`HARVESTING.md`** — 収集方法と迂回チャネル（Apple HIG DocC JSON、androidx sparse-clone、Figma 隣接IDプローブ）
- **`INTEROP.md`** — エージェント向け交換フォーマット **`DESIGN.md`** との関係（仕様・リンター）と、コーパスのデフォルト値をスキャフォールドとして書き出す `to-design-md.mjs`
- **`check-sources.mjs`** — 鮮度監視: 各エントリの固定バージョンを npm 最新と照合（月次CI + git フック）

### 地域別収集リスト

**プラットフォーム / OS ベンダー (10)** — Apple: iOS/iPadOS HIG, macOS 26, tvOS, visionOS, CarPlay · Google: Material 3, Android Automotive, Android TV, Wear OS · Samsung: Tizen CircularUI

**オープンソースフレームワーク (19)** — Tailwind CSS, shadcn/ui, Mantine, Radix Themes, Chakra UI, Ark UI, Open Props, Bootstrap, MUI, HeroUI, Park UI, Naive UI, PrimeVue, Vuetify, Skeleton, Shoelace, Headless UI, Panda CSS, vanilla-extract

**北米 (42)** — Carbon (IBM), Fluent 2 (Microsoft), Spectrum (Adobe), Lightning (Salesforce), Primer (GitHub), Polaris (Shopify), Cloudscape (AWS), Base Web (Uber), Gestalt (Pinterest), Canvas (Workday), Paste (Twilio), Garden (Zendesk), Blueprint (Palantir), Helios (HashiCorp), Pajamas (GitLab), EUI (Elastic), Evergreen (Segment), LeafyGreen (MongoDB), Clarity (VMware), Odyssey (Okta), Grommet (HPE), Protocol (Mozilla), Codex (Wikimedia), Stacks (Stack Overflow), Skin (eBay), Cedar (REI), Thumbprint (Thumbtack), Auro (Alaska Airlines), Priceline, Pluralsight, HSDS (Help Scout), Intergalactic (Semrush), Pharos (JSTOR), Palette (Artsy), Solid (BuzzFeed), Astro UXDS (宇宙・管制), NASA WDS, USWDS (米連邦政府), NYSDS (ニューヨーク州), Bolt (Pega), Aurora (カナダ政府、ドキュメント層サンプル), Fleet (ボストン市)

**欧州 (22)** — GOV.UK, NHS, WMN (交通), Origami (Financial Times), Backpack (Skyscanner), Vanilla (Canonical), PIE (Just Eat Takeaway), DSFR (フランス政府), Vitamin (Decathlon), Strapi, Welcome UI (WTTJ), Porsche, Audi UI, Siemens iX, Forma 36 (Contentful), Mística (Telefónica), Italia (イタリア政府), Tegel (Scania), Orbit (Kiwi.com), Ring UI (JetBrains), Nord (Nordhealth), Kontur UI (SKB Kontur)

**東アジア (14)** — 韓国: KRDS (政府), TDS (Toss), Seed Design (Karrot), Vapor UI (goorm) · 日本: LINE (LY Corp、ドキュメント層サンプル), ReX (楽天), デジタル庁, SmartHR UI, Charcoal (pixiv), Spindle (Ameba), Serendie (三菱電機), Vibes (freee) · 中国: Ant Design (Ant Group), Semi Design (ByteDance)

**東南アジア (4)** — SGDS (シンガポール政府), Asphalt (Gojek), Unify (Tokopedia), Persona (Privy)

**オセアニア (3)** — Atlassian, Braid (SEEK), Kaizen (Culture Amp)

**中南米 (1)** — Yoga (Wellhub) · **中東 (1)** — Vibe (monday.com)

## `agents/` — LLM 作業手順

このリポジトリを人間の参考資料としてではなく**エージェントの作業ツール**として使うときの実行手順です。[`agents/README.md`](agents/README.md) がコーパスのナビゲーション（質問タイプ → ファイル）と共通規律（引用義務・推測禁止・リンター通過）を担います。**他プロジェクトから使うには**: このリポジトリを隣に clone（または submodule）し、製品リポジトリの `CLAUDE.md` にポインタを追加してください — コピペ用スニペットとフィードバックループは [`agents/README.md`](agents/README.md) の「다른 프로젝트에서 쓰기」節にあります。ガイド4種:

- **[`system-selection.md`](agents/system-selection.md)** — 製品の座標（プラットフォーム・視聴距離・文字文化圏・ドメイン）に合う参照システムを選定 — 単一採用ではなく軸ごとの分割、コード移植前のライセンスゲート
- **[`design-review.md`](agents/design-review.md)** — コーパスを根拠にしたレビューを**3判定**で行います: *収斂からの逸脱* / *許容される分岐* / *内部不整合*。存在しない「16px標準」を根拠に14px本文を指摘する誤りを構造的に防ぎます
- **[`event-instrumentation.md`](agents/event-instrumentation.md)** — Figma・コードからUX文脈を読み、`event-taxonomy/` 規約に沿ったイベントシートを提案（状態バリアントはプロパティ、ファネルはenumの順序、PII禁止、判断できないものは質問リストへ）
- **[`localization.md`](agents/localization.md)** — 文字列と文脈を抽出し `i18n/` 規約でローカライズ（文字列が隠れる場所、イベントシートと画面名正規化を共有、トーンは観察して従う、CJK/RTLリスクの報告）

## `event-taxonomy/` — 分析イベントシート

プロダクト分析イベント定義のシート規約: `{ドメイン}_{動作}` 命名、画面ごとにイベントを分割せず `screen_name` enum で扱う方式、条件付きプロパティ表記、レビューチェックリスト。`convert.mjs` がシートを **JSON · Markdown · HTML · スプレッドシート · Notion** に変換し、`--lint-only`（CI向け `--strict`）で規約違反を検査します。

## `i18n/` — ローカライゼーション

規約 + テンプレート + リンター: BCP 47 ロケール識別子、キー命名、ICU MessageFormat（複数形・選択・数値・日付）、CLDR の言語別複数形カテゴリ（韓国語 1 · 英語 2 · **アラビア語 6**）、テキスト拡張バジェット、RTL。コーパスと接続しています — 本文サイズの慣行は文字文化圏で異なり（Ant Design 14px · 欧米Web 16px · Apple 17pt）、多言語レイアウトを左右します。`lint.mjs` はファイル名からロケールを読み、その言語に実際に必要な複数形カテゴリを検査します。

## `mockups/`

デバイスモックアップが**どこに何があるか**だけを記録します — ライセンスと容量の問題からファイル自体はコミットせず、出典と目録のみ残します。

## 原則

- **共有資産のみ。** プロダクト固有データが入ってきたら該当プロダクトのリポジトリへ移します。
- **推測禁止。** 確認できない値は「未確認」のまま残します。もっともらしい誤値ひとつがコーパス全体の信頼を壊します。
- **出典とバージョンを残す。** 再検証が可能でなければなりません。
- **原文コピー禁止。** 外部の散文は要約・再記述して出典をリンク。トークン値のような事実情報はそのまま引用して構いません。

## 既知の制約

- **デザインシステムのドキュメントサイトがエグレスプロキシで遮断されます**（carbondesignsystem.com、m3.material.io、primer.style など）。GitHub・npm は開いているためトークン収集は可能ですが、コンポーネント使用ガイダンスはほぼ取得できません。ソース公開システム（shadcn/ui）とコンポーネントCSS配布システム（Mantine・Radix Themes)が空白をかなり埋め、Apple（HIG DocC JSON）・Google（developer.android.com、androidx）の迂回チャネルを2つ発見しました — `design-systems/HARVESTING.md`。
- **コントラスト比をトークンに数値で明記するのは Cloudscape だけです**（チャート色の段階番号 = コントラスト比）。116システム中、他のどのパッケージもコントラスト数値や WCAG 目標を含みません。
- **鮮度を自動監視します** — `check-sources.mjs` は初回実行で Base Web の major 2つ分の陳腐化を、Mística 17 で実際のトークン変更（ハイコントラスト原始値のアップストリーム削除）を検出しました。

## 事前準備

| 項目 | 説明 |
|------|------|
| Node.js / Bun | スクリプトのランタイム（依存なし） |
| `FIGMA_OAUTH_TOKEN` | Figma API トークン — 環境変数で設定、**コミット禁止** |

MCP サーバー設定は `.claude/settings.local.json` に置きます（トークンを含む可能性 — gitignore 対象）。
