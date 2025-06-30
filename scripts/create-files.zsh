#!/bin/zsh

# create-files.zsh - Creates file structure for refactoring tasks
# Usage: ./create-files.zsh <refactor-target>

set -e  # Exit on any error

# Function to create directory structure and files
createStructure() {
    local TARGET_DIR=$1
    local MESSAGE=$2
    shift 2
    local FILES=("$@")
    
    echo "$MESSAGE"
    
    # Create the directory
    mkdir -p "$TARGET_DIR"
    echo "📁 Created directory: $TARGET_DIR"
    
    # Create the files
    for file in "${FILES[@]}"; do
        touch "$TARGET_DIR/$file"
        echo "📄 Created file: $TARGET_DIR/$file"
    done
    
    echo "✅ Structure created successfully!"
    echo ""
    echo "📂 Structure created:"
    tree "$TARGET_DIR" 2>/dev/null || ls -la "$TARGET_DIR"
}

# Check if parameter is provided
if [ $# -eq 0 ]; then
    echo "❌ Error: Please specify a refactor target"
    echo "Usage: ./create-files.zsh <target>"
    echo "Available targets: useAdmin, useAdminTests"
    exit 1
fi

TARGET=$1

case $TARGET in
    "useAdmin")
        TARGET_DIR="app/pages/admin/useAdmin"
        FILES=(
            "index.ts"
            "types.ts"
            "useCreators.ts"
            "useHistory.ts"
            "useSearch.ts"
            "useCategories.ts"
        )
        createStructure "$TARGET_DIR" "🚀 Creating useAdmin directory structure..." "${FILES[@]}"
        ;;
        
    "useAdminTests")
        TARGET_DIR="app/pages/admin/useAdmin/__tests__"
        TEST_FILES=(
            "useCreators.test.ts"
            "useHistory.test.ts"
            "useSearch.test.ts"
            "useCategories.test.ts"
        )
        createStructure "$TARGET_DIR" "🧪 Creating useAdmin test files..." "${TEST_FILES[@]}"
        ;;
        
    *)
        echo "❌ Error: Unknown target '$TARGET'"
        echo "Available targets: useAdmin, useAdminTests"
        exit 1
        ;;
esac