#!/usr/bin/env zsh
# changelog-prep.zsh - Prepare changes for CHANGELOG update
# Usage: npm run changelog

set -e

# Find the last version tag
LAST_TAG=$(git describe --tags --abbrev=0 --match "v[0-9]*.[0-9]*.[0-9]*" 2>/dev/null || echo "v0.0.0")
CURRENT_VERSION=${LAST_TAG#v}
echo "Last version tag: $LAST_TAG"

# Calculate the next version (provisional)
IFS='.' read -r major minor patch <<< "$CURRENT_VERSION"
NEXT_MINOR="$major.$((minor + 1)).0"
NEXT_PATCH="$major.$minor.$((patch + 1))"

# Get the branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)
DATE=$(date +"%Y-%m-%d")

# Create a temporary file
OUTPUT_FILE="changes.txt"
rm -f $OUTPUT_FILE  # Remove if exists

# Write header instructions for GitHub Copilot
cat > $OUTPUT_FILE << EOL
# CHANGELOG Update Instructions for GitHub Copilot

Current version: $CURRENT_VERSION
Branch: $BRANCH
Date: $DATE

Please analyze the following commits and:
1. Create properly formatted CHANGELOG entries grouped by Added/Changed/Fixed/Removed
2. Suggest whether this should be a MINOR ($NEXT_MINOR) or PATCH ($NEXT_PATCH) version bump
3. Provide the full updated CHANGELOG.md content

## All commits since $LAST_TAG:

EOL

# Add all commits since the last tag
git log --pretty=format:"* %h %s" $LAST_TAG..HEAD >> $OUTPUT_FILE

# Add categorized commits for easier analysis
cat >> $OUTPUT_FILE << EOL

## Categorized commits:

### Features (suggests MINOR version bump):
EOL
git log --pretty=format:"* %h %s" $LAST_TAG..HEAD | grep -E "feat(\([^)]*\))?:" >> $OUTPUT_FILE || echo "No feature commits found."

cat >> $OUTPUT_FILE << EOL

### Fixes (suggests PATCH version bump):
EOL
git log --pretty=format:"* %h %s" $LAST_TAG..HEAD | grep -E "fix(\([^)]*\))?:" >> $OUTPUT_FILE || echo "No fix commits found."

cat >> $OUTPUT_FILE << EOL

### Chores:
EOL
git log --pretty=format:"* %h %s" $LAST_TAG..HEAD | grep -E "chore(\([^)]*\))?:" >> $OUTPUT_FILE || echo "No chore commits found."

cat >> $OUTPUT_FILE << EOL

### Docs:
EOL
git log --pretty=format:"* %h %s" $LAST_TAG..HEAD | grep -E "docs(\([^)]*\))?:" >> $OUTPUT_FILE || echo "No docs commits found."

cat >> $OUTPUT_FILE << EOL

### Refactor:
EOL
git log --pretty=format:"* %h %s" $LAST_TAG..HEAD | grep -E "refactor(\([^)]*\))?:" >> $OUTPUT_FILE || echo "No refactor commits found."

# Add instructions for GitHub Copilot
cat >> $OUTPUT_FILE << EOL

## Current CHANGELOG.md structure (first few lines):
$(head -n 20 ./CHANGELOG.md)

## Instructions for updating CHANGELOG:

1. If there are any feat: commits, suggest a MINOR version bump ($NEXT_MINOR)
2. Otherwise, suggest a PATCH version bump ($NEXT_PATCH)
3. Create a CHANGELOG entry for either v$NEXT_MINOR or v$NEXT_PATCH
4. Move any entries from [Unreleased] section to the new version section
5. Make sure to keep an empty [Unreleased] section at the top

## After updating CHANGELOG.md, execute:
git commit -am "docs: update CHANGELOG for v$NEXT_MINOR" (if minor version bump)
git commit -am "docs: update CHANGELOG for v$NEXT_PATCH" (if patch version bump)

Then run either:
npm run bump:minor (if minor version bump)
npm run bump:patch (if patch version bump)
EOL

echo "✅ Changes written to $OUTPUT_FILE"
echo "Please give this file to GitHub Copilot to update your CHANGELOG"