#!/usr/bin/env bash
# hooks/install.sh — 이 디렉터리의 훅을 활성화합니다.
#
# .git/hooks 는 커밋되지 않으므로 훅을 저장소에 두려면 core.hooksPath 를 씁니다.
# git 2.9+ 필요합니다.
#
#   ./hooks/install.sh            설치
#   ./hooks/install.sh --uninstall  해제
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if [ "${1:-}" = "--uninstall" ]; then
  git config --unset core.hooksPath || true
  echo "core.hooksPath 해제됨. .git/hooks 기본 동작으로 돌아갑니다."
  exit 0
fi

# git 버전 확인
GIT_VER="$(git --version | awk '{print $3}')"
MAJOR="${GIT_VER%%.*}"
REST="${GIT_VER#*.}"
MINOR="${REST%%.*}"
if [ "$MAJOR" -lt 2 ] || { [ "$MAJOR" -eq 2 ] && [ "$MINOR" -lt 9 ]; }; then
  echo "core.hooksPath 는 git 2.9+ 가 필요합니다 (현재 $GIT_VER)." >&2
  echo "대안: cp hooks/post-checkout .git/hooks/post-checkout && chmod +x .git/hooks/post-checkout" >&2
  exit 1
fi

chmod +x hooks/post-checkout
git config core.hooksPath hooks

echo "설치됨 — core.hooksPath = hooks"
echo ""
echo "  post-checkout : 새 브랜치를 만들 때 소스 신선도를 확인합니다 (7일 스로틀)"
echo ""
echo "확인:  git config --get core.hooksPath"
echo "해제:  ./hooks/install.sh --uninstall"
