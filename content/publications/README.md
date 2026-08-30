# 플랫폼별 소개 글 초안

작성일: 2026-08-31 · 사실 확인 기준: `279f465` · 작업 브랜치: `codex/designops-publication-drafts`

미디엄·브런치·Threads에 옮겨 쓸 원고입니다. 로컬 브랜치에 커밋하지 않은 파일로만 보관합니다. 실제 플랫폼에는 게시하지 않았으며, 발행된 글의 주소는 아직 없습니다. 아래 주소는 **각 글에서 독자를 안내할 프로젝트 주소**입니다.

| 플랫폼 | 언어 | 원고 | 연결할 웹사이트 |
|---|---|---|---|
| Medium | 영어 | [medium.en.md](medium.en.md) | [영어 홈페이지](https://self-made-orange.github.io/self-made-design-ops/?lang=en) |
| 브런치스토리 | 한국어 | [brunch.ko.md](brunch.ko.md) | [한국어 홈페이지](https://self-made-orange.github.io/self-made-design-ops/?lang=ko) |
| Threads | 한국어 | [threads.ko.md](threads.ko.md) | [한국어 홈페이지](https://self-made-orange.github.io/self-made-design-ops/?lang=ko) → [한국어 시스템 목록](https://self-made-orange.github.io/self-made-design-ops/catalog.html?lang=ko) |

저자는 초기 빌더·디자이너·스타트업이 참고 자료를 찾고 기준을 세우는 수고를 덜도록 돕는 제작자입니다. AI 친화성은 Markdown 가이드·JSON 데이터·DESIGN.md·작업 절차로 설명하며, 자동 연결이나 무검토 구현을 약속하지 않습니다.

미디엄은 제작 의도와 AI 작업 방식 중심, 브런치는 작게 시작하는 사람과 팀을 돕고 싶은 저자의 생각 중심으로 썼습니다. Threads는 일곱 게시물로 나눴습니다. 긴 글 두 편의 첫 제목과 바로 아래 문장은 각각 제목·부제로 사용할 수 있습니다. Threads 원고에서는 구분선과 맨 위 편집 안내를 제외하고 게시물별로 복사합니다.

**발행 전 보완:** 저자가 진행한 AI 루브릭 평가의 원문이 필요합니다. 다섯 항목명·항목별 점수·만점·종합 결과를 확인해 각 글 마지막의 편집 표시를 교체해야 합니다. 저장소와 확인 가능한 프로젝트 작업 기록에서는 점수를 찾지 못했습니다. 임의의 항목이나 새 평가 점수로 대체하지 않습니다.

## 링크 대응

| 용도 | 영어 독자 | 한국어 독자 |
|---|---|---|
| 프로젝트 소개 | [영어 사이트](https://self-made-orange.github.io/self-made-design-ops/?lang=en) | [한국어 사이트](https://self-made-orange.github.io/self-made-design-ops/?lang=ko) |
| 시스템 검색 | [영어 목록](https://self-made-orange.github.io/self-made-design-ops/catalog.html?lang=en) | [한국어 목록](https://self-made-orange.github.io/self-made-design-ops/catalog.html?lang=ko) |
| 버튼 비교 본문 | [영어 본문](https://self-made-orange.github.io/self-made-design-ops/patterns/button.html?lang=en) | [GitHub의 한국어 원문](https://github.com/Self-made-Orange/self-made-design-ops/blob/main/design-systems/patterns/button.ko.md) |
| 저장소 소개 | [영어 README](https://github.com/Self-made-Orange/self-made-design-ops/blob/main/README.md) | [한국어 README](https://github.com/Self-made-Orange/self-made-design-ops/blob/main/README.ko.md) |

`?lang=ko`는 웹사이트 UI 언어를 지정합니다. 상세 자료의 본문까지 한국어로 번역하지 않으므로, 한국어 본문을 소개할 때는 `.ko.md` 원문 주소를 사용합니다. 플랫폼의 최종 발행 주소는 게시 후 별도로 기록해야 합니다.

## 사실 확인과 편집 메모

- 전체 116개 시스템과 버튼 비교 77개 시스템을 구분했습니다. 아홉 비교 항목 모두에 116개 표본이 있다고 쓰지 않았습니다.
- 버튼의 현재 비교 문서는 40px을 가장 흔한 기본 높이로 설명하지만, 과반이나 보편적 표준으로 보지는 않습니다. 빈도 표와 요약 백분율의 분모를 동일하다고 단정하기 어려워 원고에는 백분율을 넣지 않았습니다.
- 사용자 성과나 절약 시간처럼 확인되지 않은 수치는 넣지 않았습니다. 빠른 시작과 AI 협업은 제작 목적이며, 측정된 성과로 표현하지 않았습니다.
- `awesome-design-md`도 좋았지만 실제 데이터와 여러 시스템의 종합적인 평균치가 필요했다는 동기는 저자가 직접 제공했습니다. [VoltAgent의 저장소](https://github.com/VoltAgent/awesome-design-md)를 연결했고, 본 프로젝트 README에서 언급하는 별개 자료인 `awesome-design-systems`와 혼동하지 않았습니다.
- 여러 시스템의 평균적인 선택을 알고 싶었다는 동기와, 실제 비교 자료의 분포·최빈값을 구분합니다. 모든 값을 단순 평균 낸 수치를 프로젝트가 제공한다고 주장하지 않습니다.
- 구현 가이드에서는 측정값·유도값·작성자 판단·미확인 값을 구분합니다. 측정 기반 프로필의 색상은 비워 두며, 별도로 색상을 정한 프로필도 있으므로 모든 프로필의 색상이 비어 있다고 쓰지 않았습니다.
- 도구 사용 예시는 Git과 Node를 전제로 합니다. 설치가 전혀 필요 없다는 표현 대신 추가 패키지가 필요 없다고 설명했습니다. 기존 `DESIGN.md`를 덮어쓰지 않도록 실행 위치 안내도 넣었습니다.
- 작성자 시점으로 소개하되, 특정 회사의 프로젝트 경험·실제 회의·사용자 반응은 꾸며 넣지 않았습니다. 웹 중심의 자료 편중과 조사 범위의 차이도 본문에 남겼습니다.

확인한 자료: [프로젝트 README](../../README.md), [버튼 비교](../../design-systems/patterns/button.md), [프로필 설명](../../profiles/README.md), [AI 작업 가이드 목록](../../agents/README.md), [사이트 언어 동작](../../site/README.md).
