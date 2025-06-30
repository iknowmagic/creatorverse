#!/bin/zsh

# create-files.zsh - Creates file structure for refactoring tasks
# Usage: ./create-files.zsh <refactor-target>

set -e  # Exit on any error

# Check if parameter is provided
if [ $# -eq 0 ]; then
    echo "❌ Error: Please specify a refactor target"
    echo "Usage: ./create-files.zsh <target>"
    echo "Available targets: useAdmin"
    exit 1
fi

TARGET=$1

case $TARGET in
    "useAdmin")
        echo "🚀 Creating useAdmin directory structure..."
        
        # Create the main directory
        BASE_DIR="app/pages/admin/useAdmin"
        mkdir -p "$BASE_DIR"
        echo "📁 Created directory: $BASE_DIR"
        
        # Create the TypeScript files
        FILES=(
            "index.ts"
            "types.ts"
            "useCreators.ts"
            "useHistory.ts"
            "useSearch.ts"
            "useCategories.ts"
        )
        
        for file in "${FILES[@]}"; do
            touch "$BASE_DIR/$file"
            echo "📄 Created file: $BASE_DIR/$file"
        done
        
        echo "✅ useAdmin structure created successfully!"
        echo ""
        echo "📂 Structure created:"
        tree "$BASE_DIR" 2>/dev/null || ls -la "$BASE_DIR"
        ;;
        
    *)
        echo "❌ Error: Unknown target '$TARGET'"
        echo "Available targets: useAdmin"
        exit 1
        ;;
esac

echo ""
echo "🎯 Next steps:"
echo "1. Move code from app/pages/admin/useCreators.ts to the new files"
echo "2. Update imports in components"
echo "3. Test the refactored structure"