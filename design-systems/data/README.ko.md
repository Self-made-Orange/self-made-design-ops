<!-- lang-links -->
> [English](README.md) · **한국어**
<!-- /lang-links -->

# data/ — 기계가독 추출본

코퍼스를 코드·스크립트·LLM 컨텍스트에서 바로 쓰기 위한 JSON입니다.

| 파일 | 생성 방식 | 내용 |
|------|-----------|------|
| `systems.json` | **자동** — `node design-systems/build-data.mjs` | `systems/*.md` frontmatter 전체 (65개: 이름·조직·수집 깊이·플랫폼·도메인·소스 핀·검증일) |
| `values.json` | **수기 큐레이션** | 교차 비교 결론 — 스페이싱 채택률·본문 크기 진영·CJK 굵기·라운드 알약/정원·z-index 5산법·터치 타겟·스프링·다크 모드 방식·Liquid Glass |

## 규칙

- **`values.json`의 모든 항목에는 `source` 필드가 있습니다** — 근거 문서 경로.
  값의 맥락(반례·주의)은 그 문서에 있으므로, 값만 뽑아 쓰다 틀리기 쉬운 항목에는
  `$comment`로 함정을 요약해 뒀습니다 (예: `full`이 9999px인 시스템과 50%인 시스템)
- 시스템 항목을 추가·수정하면 `build-data.mjs`를 다시 실행해 `systems.json`을
  갱신합니다. `values.json`은 교차 문서(`patterns/`·`tokens/`)가 바뀔 때 함께 봅니다
- 여기 없는 값은 코퍼스가 검증하지 못한 값입니다 — 추측으로 채우지 않습니다
