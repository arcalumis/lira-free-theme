// CSS styles for the settings panel webview

export function getStyles(): string {
  return `
    :root {
      --panel-bg: var(--vscode-editor-background);
      --panel-fg: var(--vscode-foreground);
      --accent: var(--vscode-textLink-foreground);
      --border: var(--vscode-panel-border);
      --input-bg: var(--vscode-input-background);
      --input-border: var(--vscode-input-border);
      --button-bg: var(--vscode-button-background);
      --button-fg: var(--vscode-button-foreground);
      --button-hover: var(--vscode-button-hoverBackground);
      --card-bg: var(--vscode-editor-inactiveSelectionBackground);
      --secondary-bg: var(--vscode-button-secondaryBackground);
      --secondary-fg: var(--vscode-button-secondaryForeground);
      --secondary-hover: var(--vscode-button-secondaryHoverBackground);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      color: var(--panel-fg);
      background: var(--panel-bg);
      padding: 0;
      line-height: 1.5;
    }

    .settings-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }

    .settings-header {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }

    .settings-header h1 {
      font-size: 1.5em;
      font-weight: 600;
      color: var(--accent);
    }

    .subtitle {
      opacity: 0.7;
      margin-top: 4px;
    }

    /* Tab Navigation */
    .tab-nav {
      display: flex;
      gap: 4px;
      margin-bottom: 24px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0;
    }

    .tab-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--panel-fg);
      opacity: 0.7;
      cursor: pointer;
      font-size: 13px;
      font-family: inherit;
      transition: all 0.15s ease;
    }

    .tab-btn:hover {
      opacity: 1;
      background: var(--card-bg);
    }

    .tab-btn.active {
      opacity: 1;
      border-bottom-color: var(--accent);
      color: var(--accent);
    }

    .tab-panel {
      display: none;
      animation: fadeIn 0.2s ease;
    }

    .tab-panel.active {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Common Components */
    .section {
      margin-bottom: 24px;
    }

    .section-title {
      font-size: 1.1em;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .section-desc {
      font-size: 12px;
      opacity: 0.7;
      margin-bottom: 12px;
    }

    .card {
      background: var(--card-bg);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background: var(--button-bg);
      color: var(--button-fg);
      font-size: 13px;
      font-family: inherit;
      transition: background 0.15s;
    }

    .btn:hover {
      background: var(--button-hover);
    }

    .btn-secondary {
      background: var(--secondary-bg);
      color: var(--secondary-fg);
    }

    .btn-secondary:hover {
      background: var(--secondary-hover);
    }

    /* Toggle Switch */
    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--border);
    }

    .toggle-row:last-child {
      border-bottom: none;
    }

    .toggle-info h4 {
      margin-bottom: 2px;
      font-weight: 500;
    }

    .toggle-info p {
      font-size: 12px;
      opacity: 0.7;
    }

    .toggle-switch {
      position: relative;
      width: 40px;
      height: 22px;
      flex-shrink: 0;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: var(--input-bg);
      border-radius: 22px;
      transition: 0.2s;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 3px;
      bottom: 3px;
      background: var(--panel-fg);
      border-radius: 50%;
      transition: 0.2s;
    }

    .toggle-switch input:checked + .toggle-slider {
      background: var(--accent);
    }

    .toggle-switch input:checked + .toggle-slider:before {
      transform: translateX(18px);
    }

    /* Themes Tab Styles */
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
    }

    .theme-card {
      background: var(--card-bg);
      border: 2px solid transparent;
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
      transition: all 0.15s;
      text-align: center;
      font-family: inherit;
      color: inherit;
    }

    .theme-card:hover {
      border-color: var(--border);
    }

    .theme-card.active {
      border-color: var(--accent);
    }

    .theme-preview {
      height: 50px;
      border-radius: 4px;
      margin-bottom: 8px;
      position: relative;
      overflow: hidden;
    }

    .preview-sidebar {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 25%;
    }

    .preview-editor {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      left: 25%;
    }

    .preview-accent {
      position: absolute;
      bottom: 6px;
      left: 30%;
      width: 40%;
      height: 3px;
      border-radius: 2px;
    }

    .theme-label {
      font-size: 11px;
      font-weight: 500;
    }

    .active-indicator {
      display: block;
      font-size: 9px;
      color: var(--accent);
      margin-top: 2px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .icon-theme-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .icon-theme-card {
      background: var(--card-bg);
      border: 2px solid transparent;
      border-radius: 6px;
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
      font-size: 12px;
      color: inherit;
    }

    .icon-theme-card:hover {
      border-color: var(--border);
    }

    .icon-theme-card.active {
      border-color: var(--accent);
      color: var(--accent);
    }

    /* Colors Tab Styles */
    .accent-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
      max-width: 350px;
    }

    .accent-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid transparent;
      cursor: pointer;
      transition: transform 0.15s, border-color 0.15s;
      position: relative;
      padding: 0;
    }

    .accent-btn:hover {
      transform: scale(1.1);
    }

    .accent-btn.active {
      border-color: var(--panel-fg);
    }

    .accent-btn .check-icon {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      color: inherit;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }

    .custom-color-input {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    .color-preview-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    .color-preview-wrapper input[type="color"] {
      width: 60px;
      height: 60px;
      margin: -10px;
      cursor: pointer;
      border: none;
    }

    .hex-input {
      padding: 8px 12px;
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 4px;
      color: var(--panel-fg);
      font-family: monospace;
      width: 120px;
    }

    .hex-input:focus {
      outline: 1px solid var(--accent);
    }

    .input-hint {
      font-size: 11px;
      opacity: 0.6;
      margin-top: 8px;
    }

    .current-custom {
      font-size: 12px;
      margin-top: 8px;
    }

    .current-custom code {
      background: var(--input-bg);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
    }

    .accent-preview {
      margin-top: 16px;
    }

    .preview-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 8px 0;
    }

    .preview-label {
      width: 60px;
      font-size: 12px;
      opacity: 0.7;
    }

    .preview-button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      color: #000;
      font-size: 12px;
      cursor: default;
    }

    .preview-link {
      font-size: 13px;
      text-decoration: underline;
    }

    .preview-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-size: 11px;
      font-weight: 600;
      color: #000;
    }

    /* Icons Tab Styles */
    .icon-style-selector {
      display: flex;
      gap: 16px;
    }

    .style-option {
      flex: 1;
      background: var(--card-bg);
      border: 2px solid transparent;
      border-radius: 8px;
      padding: 20px;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
      font-family: inherit;
      color: inherit;
    }

    .style-option:hover {
      border-color: var(--border);
    }

    .style-option.active {
      border-color: var(--accent);
    }

    .style-preview {
      margin-bottom: 12px;
      color: var(--accent);
    }

    .style-preview svg {
      width: 48px;
      height: 48px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    .stat-card {
      background: var(--card-bg);
      padding: 16px;
      border-radius: 8px;
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: 600;
      color: var(--accent);
    }

    .stat-label {
      font-size: 12px;
      opacity: 0.7;
    }

    .future-feature .badge {
      background: var(--accent);
      color: var(--button-fg);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
      margin-left: 8px;
      font-weight: normal;
    }

    .card.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Export Tab Styles */
    .export-list {
      margin: 12px 0;
      padding-left: 20px;
    }

    .export-list li {
      margin: 4px 0;
      opacity: 0.8;
    }

    .export-options {
      margin: 16px 0;
    }

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      cursor: pointer;
      font-size: 13px;
    }

    .checkbox-row input {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    .export-btn {
      margin-top: 8px;
    }

    .export-note {
      margin-top: 12px;
      font-size: 12px;
      opacity: 0.7;
    }

    .config-preview {
      background: var(--input-bg);
      border-radius: 4px;
      padding: 12px;
      margin: 12px 0;
      overflow-x: auto;
      max-height: 200px;
    }

    .config-preview pre {
      margin: 0;
      font-size: 11px;
      font-family: var(--vscode-editor-font-family, monospace);
      white-space: pre-wrap;
      word-break: break-all;
    }

    .export-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .import-area {
      border: 2px dashed var(--border);
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      transition: border-color 0.15s, background 0.15s;
    }

    .import-area:hover,
    .import-area.drag-over {
      border-color: var(--accent);
      background: var(--card-bg);
    }

    .import-area .upload-icon {
      font-size: 32px;
      opacity: 0.5;
      margin-bottom: 8px;
    }

    .file-input-label {
      display: inline-block;
      margin-top: 8px;
    }

    .file-input-label input {
      display: none;
    }

    .import-status {
      margin-top: 12px;
      font-size: 12px;
    }

    .import-status.success {
      color: #4caf50;
    }

    .import-status.error {
      color: #f44336;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .settings-container {
        padding: 16px;
      }

      .tab-nav {
        flex-wrap: wrap;
      }

      .tab-btn {
        padding: 8px 12px;
        font-size: 12px;
      }

      .accent-grid {
        grid-template-columns: repeat(5, 1fr);
      }

      .icon-style-selector {
        flex-direction: column;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
}
