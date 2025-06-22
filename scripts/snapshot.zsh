#!/usr/bin/env zsh
# scripts/snapshot.zsh
# Usage:  npm run snap

set -e  # stop on any git error

# enforce a work/b#### branch
branch=$(git rev-parse --abbrev-ref HEAD)
# if [[ $branch != work/b* ]]; then
#   echo "Not on a work/* branch. Aborting."
#   exit 1
# fi

serial=${branch##*/}                 # b0007
today=$(date +%Y.%m.%d)              # 2025.05.10
index=1

# find next free tag name
while git rev-parse -q --verify "refs/tags/snap/${today}-${index}-${serial}" >/dev/null; do
  ((index++))
done

tag="snap/${today}-${index}-${serial}"

# create and push the annotated tag
git tag -a "$tag" -m "$tag"
git push origin "$tag"

echo "✅  Snapshot created: $tag"
