#!/bin/bash

# Usage: ./scripts/new-trace.sh "title" "kind"
# Example: ./scripts/new-trace.sh "cool-tool" "til"

TITLE=$1
KIND=${2:-"til"}

if [ -z "$TITLE" ]; then
    echo "Usage: $0 \"title\" [kind]"
    echo "Kinds: til, win, idea"
    exit 1
fi

# Convert title to filename
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
DATE=$(date +%Y-%m-%d)
FULL_FILENAME="${DATE}-${FILENAME}.md"

# Create the trace
hugo new traces/$FULL_FILENAME

# Update the kind in the front matter
if [ -f "content/traces/$FULL_FILENAME" ]; then
    sed -i '' "s/trace_kind: \"til\"/trace_kind: \"$KIND\"/" "content/traces/$FULL_FILENAME"
    echo "Created: content/traces/$FULL_FILENAME"
    echo "Kind set to: $KIND"
    
    # Open in editor (VS Code)
    if command -v code &> /dev/null; then
        code "content/traces/$FULL_FILENAME"
    else
        echo "Open content/traces/$FULL_FILENAME in your editor"
    fi
else
    echo "Error: Failed to create trace file"
    exit 1
fi
