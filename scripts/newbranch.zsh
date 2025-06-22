#!/usr/bin/env zsh
set -e

# --- find latest work/b#### ---------------------------------------------
latest=$(
  git for-each-ref --format='%(refname:short)' 'refs/heads/work/b*' 2>/dev/null |
  sed -E 's#.*/b([0-9]{4})$#\1#' |
  sort -n | tail -1
)

next=$(( ${latest:-0} + 1 ))
serial=$(printf "b%04d" $next)
branch="work/$serial"

git checkout -b $branch
echo "✅  Switched to $branch"
