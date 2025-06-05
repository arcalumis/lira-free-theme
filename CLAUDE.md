# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Lira", a VS Code theme extension that provides a free alternative to the paid Vira theme. The extension offers:

- Customizable accent colors and theme variants
- Folder icon theming with multiple styles (filled/outlined)
- Color customization features (borders, shadows, line highlights)
- License management and trial functionality
- Status bar integration for quick theme configuration

## Development Commands

### Build and Development
- `pnpm run compile` - Compile TypeScript to JavaScript
- `pnpm run watch` - Watch mode for continuous compilation during development
- `pnpm run vscode:prepublish` - Prepare extension for publishing (runs compile)

### Testing and Quality
- `pnpm run test` - Run extension tests using vscode-test
- `pnpm run pretest` - Prepare tests (compile + lint)
- `pnpm run lint` - Run ESLint on src directory

### Extension Development & Debugging
- Press `F5` to open Extension Development Host window with extension loaded
- Use `Ctrl+Shift+P` (or `Cmd+Shift+P`) to access command palette and test "Hello World" command
- Test files must follow pattern `**.test.ts` in the `test` folder
- Extension Test Runner extension recommended for running tests

## Code Architecture

### Core Structure
- **Single Extension File**: All functionality is in `src/extension.ts` (~1400+ lines)
- **Theme Configuration**: Large `THEME_CONFIG` object containing color mappings, folder names, and icon definitions
- **Licensing System**: Trial-based with remote validation against `https://l.vira.build/api/`

### Key Components

1. **Theme Management**
   - Dynamic theme file updates in `./build/themes` directory
   - Icon accent color customization with SVG file generation
   - Workbench color customizations through VS Code settings

2. **Configuration System**
   - Uses VS Code workspace configuration with `viraTheme.*` namespace
   - Persistent storage via extension context global state and secrets API
   - Real-time configuration change handlers

3. **License & Trial Logic**
   - 7-day trial period with server-side validation
   - License key storage in VS Code secrets API
   - Automatic extension uninstall on trial expiry

### Important Patterns

- **File Operations**: Uses VS Code workspace filesystem API (`vscode.workspace.fs`)
- **Theme Updates**: Batch updates to multiple theme files simultaneously
- **Status Bar**: Dynamic accent color display with click-to-configure functionality
- **Error Handling**: Network failures gracefully handled for license validation

### Extension Points

The extension contributes:
- Commands: Primary command is `lira-free-theme.helloWorld` 
- Multiple internal commands prefixed with `viraTheme.*` (accent picker, color updates, etc.)
- Color themes and icon themes (defined in package.json)
- Configuration settings under `viraTheme.*` namespace

### Critical Implementation Details

- **Theme File Location**: Expects theme files in `./build/themes` directory (not present in source)
- **Icon Assets**: References icons in `../icons/folders/filled/` and `../icons/folders/outlined/` paths
- **Network Dependencies**: License validation requires internet connectivity to `https://l.vira.build/api/`
- **State Management**: Heavy use of VS Code secrets API for license storage and global state for configuration

## Development Notes

- Built with TypeScript targeting ES2022
- Uses pnpm for package management
- ESLint configured for TypeScript with naming conventions
- Extension targets VS Code 1.100.0+
- Entry point is compiled to `./out/extension.js`