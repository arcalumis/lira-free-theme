#!/bin/bash

# Package and install Lira Theme extension to VS Code

cd "$(dirname "$0")"

# Find VS Code CLI
if command -v code &> /dev/null; then
    CODE_CMD="code"
elif [ -x "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ]; then
    CODE_CMD="/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
elif [ -x "$HOME/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ]; then
    CODE_CMD="$HOME/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
else
    echo "❌ VS Code CLI not found. Install it via: Cmd+Shift+P → 'Shell Command: Install code command'"
    echo "📦 Packaging anyway..."
fi

echo "📦 Packaging extension..."
npx @vscode/vsce package --allow-missing-repository

if [ $? -eq 0 ]; then
    VSIX=$(ls -t *.vsix 2>/dev/null | head -1)
    if [ -n "$VSIX" ]; then
        if [ -n "$CODE_CMD" ]; then
            echo "🚀 Installing $VSIX..."
            "$CODE_CMD" --install-extension "$VSIX" --force
            echo "✅ Done! Reload VS Code to see changes."
        else
            echo "📁 Packaged: $VSIX"
            echo "📌 To install manually: Open VS Code → Extensions → ... → Install from VSIX"
        fi
    else
        echo "❌ No .vsix file found"
        exit 1
    fi
else
    echo "❌ Packaging failed"
    exit 1
fi
