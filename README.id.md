# Self-Made DesignOps

![Design systems](https://img.shields.io/badge/design_systems-116-blue)
![Pattern axes](https://img.shields.io/badge/pattern_axes-9-8A2BE2)
![Platforms](https://img.shields.io/badge/platform_axes-7-teal)
![Machine readable](https://img.shields.io/badge/data-JSON-orange)
![Agent guides](https://img.shields.io/badge/agent_guides-4-green)
![Docs language](https://img.shields.io/badge/corpus_language-English%20%2B%20한국어-blue)

[English](README.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [简体中文](README.zh-Hans.md) · **Bahasa Indonesia** · [Español](README.es.md)

📖 **[Jelajahi korpus di web](https://keepyaoung.github.io/self-made-design-ops/)** — indeks 116 sistem yang bisa dicari dan disaring per platform / tier / domain.

Repositori yang mengubah pekerjaan berulang antara desain dan pengembangan menjadi **aset bersama**: konvensi, referensi, dan alat yang dipakai ulang lintas produk. **Data spesifik produk tidak disimpan di sini** — itu milik repositori produk masing-masing.

`design-systems` `design-tokens` `ui-patterns` `event-taxonomy` `i18n` `l10n` `llm-agents` `figma`

## Cara memakainya

**1. "Nilai ini aneh, atau cuma kami?" — pastikan, lalu tutup perdebatan.**
Alih-alih berdebat dua puluh menit soal tinggi tombol, buka `design-systems/patterns/button.md`.
Di sana ada distribusi terukur dari 77 sistem: **40px adalah modus, tetapi hanya ~23%**,
sehingga kesimpulannya: *tidak ada tinggi standar industri*. Perdebatan bergeser dari
*"nilai mana yang benar"* menjadi *"nilai mana yang cocok dengan kepadatan kami"*.

**2. Saat memulai sesuatu yang baru — jangan mulai dari halaman kosong.**
Bagian **"Nilai default saat implementasi"** di akhir tiap `patterns/*.md` adalah tujuannya.
Jangan menciptakan skala spacing, tipografi, atau motion dari nol; mulai dari sana dan ubah seperlunya.

**3. Dasar review — berargumen dengan sampel, bukan selera.**
Alih-alih "rasanya kurang pas", Anda bisa menulis **"tidak ada contoh tandingan di 79 sistem"**.
`agents/design-review.md` adalah prosedurnya, dan tiga putusannya (*penyimpangan dari konvergensi /
divergensi yang dapat diterima / inkonsistensi internal*) **memisahkan soal selera dari cacat nyata.**

**4. Sebagai landasan untuk agen LLM.**
`design-systems/data/*.json` dapat dibaca mesin dan `agents/` berisi prosedur yang bisa dijalankan.
Serahkan korpus ini ketika Anda meminta agen mereview desain, menyusun sheet event, atau mengaudit lokalisasi.

## Apa manfaatnya

- **Keputusan jadi lebih cepat** — tak perlu mencari ulang "bagaimana yang lain melakukannya?" tiap kali.
- **Keputusan bertahan** — alasannya tercatat **beserta jumlah sampelnya**, jadi perdebatan yang sama tidak terulang.
- **Kearifan warisan tersaring** — korpus ini **membatalkan 24 kesimpulannya sendiri** seiring sampel bertambah
  (misalnya "radius modal web berkumpul di 8–12px" → ternyata justru kelompok **paling tipis**).
- **Yang tidak diketahui tetap ditandai** — nilai yang belum dipastikan ditandai `미확인` (belum terverifikasi),
  lebih baik daripada diisi asal masuk akal, dan orang berikutnya bisa melanjutkan.

> **Baru pertama kali?** Pilih satu sumbu di `design-systems/patterns/` dan baca **bagian akhirnya lebih dulu**.
> Semua di atasnya adalah bukti untuk kesimpulan itu.

## Apa bedanya dengan awesome-design-systems?

[`alexpate/awesome-design-systems`](https://github.com/alexpate/awesome-design-systems) adalah kolam kandidat korpus ini — keduanya berbeda tujuan dan saling melengkapi:

| | awesome-design-systems | **Self-Made DesignOps** |
|---|---|---|
| Hakikat | **Daftar tautan** terkurasi (~160 sistem) | **Korpus nilai terverifikasi** (116 sistem) |
| Satuan konten | Nama + URL | Nilai token terukur — sumber & versi terkunci per klaim |
| Pertanyaan yang dijawab | *"Design system apa saja yang ada?"* | *"Nilai apa yang benar-benar dipakai, di mana konvergen/divergen?"* |
| Kedalaman | Tautan ke dokumentasi tiap sistem | Entri per sistem + 9 sumbu pola lintas sistem, diakhiri **default implementasi** |
| Verifikasi | — | Nilai tak terverifikasi ditandai; CI bulanan mencek ulang versi terkunci |
| Terbaca mesin | — | `design-systems/data/*.json` |
| Pengguna | Orang yang menjelajah | Orang yang menentukan nilai — dan **agen LLM** (prosedur `agents/`) |

Pakai daftar awesome untuk menemukan sistem; pakai korpus ini untuk menentukan tinggi tombol Anda.


## Isi

| Direktori | Isi | Status |
|-----------|-----|--------|
| [`design-systems/`](design-systems/) | Korpus referensi design system publik — diverifikasi dengan nilai token nyata | **116 sistem** |
| [`agents/`](agents/) | Prosedur kerja untuk agen LLM — review desain, lembar event, lokalisasi | 4 panduan + navigasi |
| [`profiles/`](profiles/) | **Instruksi produksi** — profil `DESIGN.md` turunan korpus, setiap nilai diberi tingkat bukti | 4 measured + lapisan interpreted |
| [`event-taxonomy/`](event-taxonomy/) | Konvensi lembar event analitik + konverter/linter | konvensi · konverter |
| [`i18n/`](i18n/) | Konvensi lokalisasi + linter | konvensi · linter |
| [`mockups/`](mockups/) | Inventaris aset mockup perangkat | Apple, 1 entri |

> **Catatan:** dokumen korpus berbahasa Inggris sebagai versi utama, dengan naskah asli bahasa Korea tersimpan di sebelahnya sebagai `<slug>.ko.md`. Nilai token, tabel, dan ekstrak JSON (`design-systems/data/`) netral bahasa.

## `design-systems/` — korpus

Saat menghadapi keputusan seperti "berapa tingkat lebar modal" atau "di mana skala spacing dipotong", korpus ini memungkinkan Anda memeriksa **apa yang benar-benar dilakukan sistem-sistem besar** — dengan sumber dan versi terkunci pada setiap klaim, dan nilai yang tak terverifikasi ditandai "belum terverifikasi".

- **`systems/`** — satu berkas per sistem (116 entri), dengan frontmatter YAML (organisasi, tier, platform, tanggal verifikasi, sumber)
- **`patterns/`** — perbandingan lintas sistem pada **9 sumbu komponen**: typography · color · button · form · motion · modal · table · navigation · feedback. Tiap dokumen diakhiri bagian **"default implementasi"** — bagian itulah tujuan korpus ini
- **`tokens/scales.md`** — perbandingan spacing/radius/border. Kesimpulan utama: **tidak ada nilai spacing yang universal**; yang tersisa adalah peringkat adopsi (4/8/16 terkuat, lalu 32, 24)
- **`platforms.md`** — 7 sumbu platform semuanya bersampel: web · mobile · desktop · spatial · automotive · wearable · tv. **Platform berbeda, struktur token berbeda**
- **`data/`** — JSON terbaca mesin (seluruh frontmatter + kesimpulan lintas sistem terkurasi)
- **`GLOSSARY.md`** — istilah yang tampak sama tapi berbeda antarsistem (parameter Liquid Glass, pil vs lingkaran, asumsi root rem…)
- **`HARVESTING.md`** — cara pengumpulan nilai, termasuk kanal lolos proxy (Apple HIG DocC JSON, sparse-clone androidx, probing ID berdekatan di Figma)
- **`INTEROP.md`** — hubungan dengan format serah-terima agen **`DESIGN.md`** (spesifikasi, linter) dan `to-design-md.mjs` yang mengekspor nilai default korpus sebagai scaffold
- **`check-sources.mjs`** — pemantau kesegaran: membandingkan versi terkunci tiap entri dengan npm terbaru (CI bulanan + git hook)

### Korpus per kawasan

**Vendor Platform / OS (10)** — Apple: iOS/iPadOS HIG, macOS 26, tvOS, visionOS, CarPlay · Google: Material 3, Android Automotive, Android TV, Wear OS · Samsung: Tizen CircularUI

**Framework open-source (19)** — Tailwind CSS, shadcn/ui, Mantine, Radix Themes, Chakra UI, Ark UI, Open Props, Bootstrap, MUI, HeroUI, Park UI, Naive UI, PrimeVue, Vuetify, Skeleton, Shoelace, Headless UI, Panda CSS, vanilla-extract

**Amerika Utara (42)** — Carbon (IBM), Fluent 2 (Microsoft), Spectrum (Adobe), Lightning (Salesforce), Primer (GitHub), Polaris (Shopify), Cloudscape (AWS), Base Web (Uber), Gestalt (Pinterest), Canvas (Workday), Paste (Twilio), Garden (Zendesk), Blueprint (Palantir), Helios (HashiCorp), Pajamas (GitLab), EUI (Elastic), Evergreen (Segment), LeafyGreen (MongoDB), Clarity (VMware), Odyssey (Okta), Grommet (HPE), Protocol (Mozilla), Codex (Wikimedia), Stacks (Stack Overflow), Skin (eBay), Cedar (REI), Thumbprint (Thumbtack), Auro (Alaska Airlines), Priceline, Pluralsight, HSDS (Help Scout), Intergalactic (Semrush), Pharos (JSTOR), Palette (Artsy), Solid (BuzzFeed), Astro UXDS (antariksa), NASA WDS, USWDS (federal AS), NYSDS (Negara Bagian New York), Bolt (Pega), Aurora (pemerintah Kanada, sampel lapisan dokumen), Fleet (Kota Boston)

**Eropa (22)** — GOV.UK, NHS, WMN (transportasi), Origami (Financial Times), Backpack (Skyscanner), Vanilla (Canonical), PIE (Just Eat Takeaway), DSFR (pemerintah Prancis), Vitamin (Decathlon), Strapi, Welcome UI (WTTJ), Porsche, Audi UI, Siemens iX, Forma 36 (Contentful), Mística (Telefónica), Italia (pemerintah Italia), Tegel (Scania), Orbit (Kiwi.com), Ring UI (JetBrains), Nord (Nordhealth), Kontur UI (SKB Kontur)

**Asia Timur (14)** — Korea: KRDS (pemerintah), TDS (Toss), Seed Design (Karrot), Vapor UI (goorm) · Jepang: LINE (LY Corp, sampel lapisan dokumen), ReX (Rakuten), Digital Agency, SmartHR UI, Charcoal (pixiv), Spindle (Ameba), Serendie (Mitsubishi Electric), Vibes (freee) · Tiongkok: Ant Design (Ant Group), Semi Design (ByteDance)

**Asia Tenggara (4)** — SGDS (pemerintah Singapura), **Asphalt (Gojek)**, **Unify (Tokopedia)**, **Persona (Privy)**

**Oseania (3)** — Atlassian, Braid (SEEK), Kaizen (Culture Amp)

**Amerika Latin (1)** — Yoga (Wellhub) · **Timur Tengah (1)** — Vibe (monday.com)

## `agents/` — prosedur kerja LLM

Prosedur eksekusi untuk memakai repositori ini sebagai **alat kerja agen**, bukan sekadar referensi manusia. [`agents/README.md`](agents/README.md) memuat peta navigasi korpus (tipe pertanyaan → berkas) dan disiplin bersama (wajib sitasi, dilarang spekulasi, linter harus lulus). **Untuk dipakai dari proyek lain**: clone repo ini di sebelahnya (atau sebagai submodule) dan tambahkan penunjuk di `CLAUDE.md` proyek produk — snippet siap salin dan loop umpan balik ada di [`agents/README.md`](agents/README.md) § "다른 프로젝트에서 쓰기". Empat panduan:

- **[`system-selection.md`](agents/system-selection.md)** — memilih sistem rujukan yang cocok dengan koordinat produk (platform, jarak pandang, budaya aksara, domain) — dibagi per sumbu alih-alih mengadopsi satu sistem utuh, dengan gerbang lisensi sebelum kode dipinjam
- **[`design-review.md`](agents/design-review.md)** — audit desain/implementasi terhadap korpus dengan **vonis tiga arah**: *penyimpangan dari konvergensi* / *divergensi yang diterima* / *inkonsistensi internal* — sehingga teks 14px tidak pernah disalahkan atas nama "standar 16px" yang tidak ada
- **[`event-instrumentation.md`](agents/event-instrumentation.md)** — membaca konteks UX dari Figma atau kode lalu mengusulkan lembar event sesuai konvensi `event-taxonomy/` (varian state adalah properti, funnel adalah urutan enum, tanpa PII, hal yang tak terputuskan jadi daftar pertanyaan)
- **[`localization.md`](agents/localization.md)** — mengekstrak string dan konteks, lalu melokalkan sesuai konvensi `i18n/` (tempat string bersembunyi, normalisasi nama layar berbagi dengan lembar event, nada diamati bukan dikarang, risiko CJK/RTL dilaporkan)

## `event-taxonomy/` — lembar event analitik

Konvensi lembar untuk mendefinisikan event analitik produk: penamaan `{domain}_{aksi}`, layar sebagai enum `screen_name` alih-alih event per layar, notasi properti bersyarat, checklist review. `convert.mjs` mengonversi lembar ke **JSON · Markdown · HTML · spreadsheet · Notion**; `--lint-only` (+ `--strict` untuk CI) memeriksa pelanggaran konvensi.

## `i18n/` — lokalisasi

Konvensi + templat + linter: pengenal lokal BCP 47, penamaan kunci, ICU MessageFormat (plural/select/angka/tanggal), kategori plural CLDR per bahasa (Korea 1 · Inggris 2 · **Arab 6**), anggaran ekspansi teks, RTL. Terhubung dengan korpus: konvensi ukuran teks isi berbeda per budaya aksara (Ant Design 14px · web Barat 16px · Apple 17pt) dan itu menentukan tata letak multibahasa. `lint.mjs` membaca lokal dari nama berkas dan memeriksa kategori plural yang benar-benar dibutuhkan bahasa itu.

## `mockups/`

Mencatat **di mana mockup perangkat berada dan apa isinya** — hanya sumber dan inventaris; berkasnya sendiri tidak di-commit (lisensi dan ukuran).

## Prinsip

- **Hanya aset bersama.** Data spesifik produk dipindahkan ke repositori produknya.
- **Dilarang spekulasi.** Nilai yang tak terverifikasi tetap ditandai "belum terverifikasi". Satu nilai keliru yang tampak masuk akal meracuni kepercayaan seluruh korpus.
- **Sumber dan versi pada semuanya.** Verifikasi ulang harus dimungkinkan.
- **Dilarang menyalin verbatim** prosa eksternal; ringkas dan tautkan. Nilai token faktual boleh dikutip apa adanya.

## Batasan yang diketahui

- **Situs dokumentasi design system diblokir** oleh proxy egress (carbondesignsystem.com, m3.material.io, primer.style, …). GitHub dan npm terbuka sehingga pengumpulan token berjalan; panduan pemakaian komponen umumnya tidak. Sistem yang membuka sumbernya (shadcn/ui) atau menerbitkan CSS komponen (Mantine, Radix Themes) mengisi sebagian besar celah, dan dua kanal lolos ditemukan untuk Apple (HIG DocC JSON) dan Google (developer.android.com, androidx) — lihat `design-systems/HARVESTING.md`.
- **Hanya Cloudscape yang menyatakan rasio kontras secara numerik** dalam token-nya (nomor tingkat warna chart = rasio kontras). Dari 116 sistem, tidak ada paket lain yang menanamkan angka kontras atau target WCAG.
- **Kesegaran dipantau otomatis** — `check-sources.mjs` menangkap Base Web tertinggal dua versi mayor pada eksekusi pertamanya, dan perubahan token nyata di Mística 17 (primitif kontras tinggi dihapus di hulu).

## Prasyarat

| Item | Keterangan |
|------|-----------|
| Node.js / Bun | runtime skrip (tanpa dependensi) |
| `FIGMA_OAUTH_TOKEN` | token API Figma — set sebagai env var, **jangan pernah di-commit** |

Konfigurasi server MCP ada di `.claude/settings.local.json` (di-gitignore — bisa berisi token).
