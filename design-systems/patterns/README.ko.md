<!-- lang-links -->
> [English](README.md) · **한국어**
<!-- /lang-links -->

# patterns/ — 컴포넌트 축 교차 정리

`systems/`가 **시스템별**로 정리한 자료라면, 여기는 **컴포넌트별**로 가로지른 자료입니다.
UI를 만들 때 실제로 펴보게 되는 쪽은 이쪽입니다.

> **9개 전부 작성됨.** 계획했던 패턴 문서를 모두 채웠습니다.
>
> | 파일 | 근거 |
> |------|------|
> | `typography.md` | 타이포 스케일 — 표본 다수에서 확보 |
> | `color.md` | 팔레트 **구조** (전체 헥스값은 원문 링크로 갈음) |
> | `button.md` | 토큰 + Figma 실측 + shadcn/ui 소스 |
> | `form.md` | 프레임워크 3개 컴포넌트 CSS·소스 + Cloudscape 밀도 토큰 |
> | `motion.md` | 모션 토큰 9개 시스템 (Atlassian 68 · Cloudscape 15 · Canvas · Codex 외) |
> | `modal.md` | 6개 시스템 (프레임워크 3 + Atlassian 모션 + Cloudscape + Apple 시트) |
> | `table.md` | 4개 시스템 (프레임워크 3 + Cloudscape 밀도·컨텍스트) |
> | **`navigation.md`** | **6개 시스템** (shadcn/ui `sidebar.tsx` 21KB + Cloudscape 컨텍스트 + Apple·CarPlay) |
> | **`feedback.md`** | **6개 시스템** (Cloudscape 심각도 5단계·컨텍스트 4개 + Atlassian `motion.flag.*`) |
>
> **뒤 여섯 개는 프레임워크 계열이 들어온 뒤에야 작성 가능해졌습니다.**
> 그 전에는 "근거가 두세 줄뿐이라 착수하지 않았다"고 적어둔 항목이었습니다.
>
> **무엇이 공백을 메웠는가:**
>
> | 자원 | 열어준 것 |
> |------|-----------|
> | **컴포넌트 소스 공개** (shadcn/ui) | 변형·상태·패딩·포커스링·애니메이션·`:has()` 조건부 레이아웃 |
> | **컴포넌트 CSS 배포** (Radix Themes · Mantine) | 치수 변수, `max()`·`calc()` 파생 규칙, sticky·`dvh` 같은 실무 대응 |
> | **소스 주석** | `border-collapse` × `sticky` 충돌(Mantine), 오버레이 언마운트 트릭(Radix Themes) |
> | **토큰의 두 번째 축** (Cloudscape) | 밀도(`comfortable`/`compact`) · 컨텍스트 오버라이드 8개 · 대비 비율 |
> | **복합 모션 토큰** (Atlassian) | 컴포넌트별 진입·퇴장·재배치, 지연, `fill`, 전환 속성 |
>
> **문서 사이트가 차단된 환경에서 토큰만 배포하는 시스템은 한계가 분명합니다.**
> 소스나 컴포넌트 CSS가 공개된 시스템이 훨씬 많은 축을 열어줍니다.
>
> **여전히 못 채우는 것 — 전부 "판단 지침"입니다.**
>
> - 모달이 배경 클릭으로 닫히는가
> - primary 버튼을 화면당 몇 개 두는가
> - 에러를 입력 중에 보여주는가, blur에서 보여주는가
> - 정렬 UI를 어떻게 표시하는가
> - 토스트를 몇 초 띄우고 화면 어디에 두는가
> - 사이드바를 쓸까 상단 내비를 쓸까
> - 라벨을 위에 둘까 왼쪽에 둘까
>
> **값은 코드에 있지만 판단은 문서에만 있습니다.** 각 문서 하단
> **"아직 못 채운 것"** 절에 항목별로 명시했습니다.

## 작성 완료 — 9개

| 파일 | 다루는 축 |
|------|----------|
| `typography.md` | 본문 기본 크기, 자간 방향·단위, 스케일 정의 방식, 행간, 강조, 계열 분리, 언어별 서체 |
| `color.md` | 계층 구조, 상태 처리, 다크 모드, 고대비, 대비 비율, 색 공간(OKLCH·P3), 차트 색 |
| `button.md` | 높이·터치 타겟, 라운드, 패딩, 아이콘 크기, 상태 집합, 포커스링, 전환 시간 |
| `form.md` | 입력 높이, 패딩, 체크박스 치수, 에러 상태 훅, 포커스 표시, 커서, Select 드롭다운 |
| `motion.md` | 토큰화 깊이 5단계, 지속시간, 이징 명명 축, 전환 속성, 키프레임, 컴포넌트별 모션, 접근성 |
| `modal.md` | 너비, 패딩, 라운드, 화면 여백, 오버레이, 애니메이션, 닫기 버튼, 푸터 모바일 배치 |
| `table.md` | 밀도 3방식, 셀 패딩, 행 높이, 경계선 표현, 고정 헤더, hover 터치 분기, 숫자 정렬 |
| **`navigation.md`** | **사이드바 폭·항목 높이·상태 영속화, 탭 활성 표시·자간 보정, 브레드크럼, 상단 내비 컨텍스트** |
| **`feedback.md`** | **심각도 2축, 얼럿 치수, 아이콘 정렬, 토스트 모션(`reposition`), 배지, 컨텍스트 알파 조정** |

`spacing.md`는 만들지 않습니다 — **`../tokens/scales.md`가 이미 담당**합니다.

## 다음으로 보강할 것

패턴 축은 다 열었고, 남은 것은 **각 문서의 "아직 못 채운 것"** 항목입니다.
근거가 이미 손에 있는 것부터 적었습니다.

| 대상 | 필요한 작업 |
|------|-------------|
| ~~shadcn/ui 24개 스타일 변형~~ | **해소** — `apps/v4/styles/`는 빌드 산출물(gitignore)이었고, 소스 `registry/styles/style-*.css` 8개를 분석. 같은 코드에서 기본 버튼이 28~40px, radius 3갈래(알약/중간/직각), `min()` 클램프 라운드 발견. `systems/shadcn-ui.md` "8개 스타일의 실제 토큰 차이" |
| ~~shadcn/ui 미확인 컴포넌트~~ | **해소** — v4 스타일 CSS에서 6종 전부 확인. Sheet `w-3/4`+`max-w-sm` 상한, Drawer 오버레이 `black/10`+블러, NavigationMenu 방향 인지 슬라이드 8규칙, Empty 점선 테두리, Pagination은 Button 조립형. `systems/shadcn-ui.md` |
| ~~Mantine 컴포넌트 CSS~~ | **해소** — 5개 파일 분석. Notification 색 바 6px(라운드 연동 인셋), Switch 5축×5단계(트랙 라벨 5~11px 서체), Radio 팝 전환(opacity 100/transform 200ms), ModalBase sticky 헤더+스크롤바 5px 보정. `feedback.md`·`form.md`·`modal.md`에 반영 |
| ~~Radix Themes 컴포넌트 CSS~~ | **해소** — `text-field.css`(text-indent 채택, Root 포커스링, 0.5px 지터 보정), `tab-nav.css`+`base-tab-list.css`(투명 복제 라벨로 굵기 변화 폭 예약, Tabs·TabNav 공유 베이스). `form.md`·`navigation.md`에 반영 |
| ~~Cloudscape 나머지 컨텍스트~~ | **해소** — `app-layout-toolbar`는 563개 재선언 중 실제 차이 1개(`color-background-layout-main` 반 단계). 컨텍스트 8종 전수 확인. `feedback.md` |
| **Apple 모션** / ~~M3 이징~~ | Apple: Figma 킷에 모션이 없고 **HIG motion 페이지에도 수치가 없음을 확인** — 수치는 SwiftUI API 층. **M3는 해소** — androidx `MotionTokens.kt`에서 이징 10종·지속시간 16토큰·Expressive 스프링 세트 확보 (`motion.md`) |
| ~~z-index 스케일~~ | **해소** — Chakra(13단계 용도명) · Bootstrap · Open Props · Forma 36 · Vibes · Solid(BuzzFeed) · Pluralsight **7개가 토큰화하고 산법도 7가지**입니다. `systems/chakra-ui.md` 참조. 단 층위 **순서**는 시스템 간 모순 |
| ~~토스트 지속시간~~ | **첫 표본 확보** — Tizen CircularUI의 `Toast.DisplayText(text, duration = 3000)`. **3000ms가 API 기본값** (`systems/tizen-circularui.md`). 위치는 여전히 미확보 |

## 형식

```markdown
# <컴포넌트>

## <결정 축>
| 시스템 | <옵션A> | <옵션B> |
|--------|---------|---------|

→ 수렴/분기 해석 한두 줄.

## 구현 시 기본값
```

## 규칙

- **축은 실제로 갈리는 결정으로 잡습니다.** 모두가 똑같이 하는 것은 축이 될 수 없습니다.
  "버튼에 hover 상태가 있다"는 축이 아니고, "hover에서 배경을 바꾸는가 그림자를 바꾸는가"는 축입니다.
- **표만 두지 않습니다.** 해석이 없으면 자료를 옮겨 적은 것에 불과합니다.
  무엇이 수렴하고 무엇이 갈리는지, 갈린다면 왜 갈리는지를 씁니다.
- **`구현 시 기본값`이 목적입니다.** 나머지 섹션은 이 결론의 근거입니다.
- **표본 수를 밝힙니다.** 4개 시스템에서 관찰한 것과 20개에서 관찰한 것은 신뢰도가 다릅니다.

## 영어판

**`implementation-defaults.md`** — 9개 문서의 「구현 시 기본값」 절을 한 파일로 모은 영어 번역 스냅샷(2026-08-18)입니다. 근거·교차 비교는 각 한국어 원문에 있습니다.
