import * as vscode from "vscode";

export class ExportTab {
  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly webview: vscode.Webview
  ) {}

  render(): string {
    return `
      <div class="section">
        <h3 class="section-title">Export Icons as ZIP</h3>
        <div class="card">
          <p>Download all current icon SVGs as a ZIP archive. Includes:</p>
          <ul class="export-list">
            <li>All file type icons (231 icons)</li>
            <li>Folder icons in current style (filled/outlined)</li>
            <li>Current accent color variants</li>
          </ul>
          <div class="export-options">
            <label class="checkbox-row">
              <input type="checkbox" id="include-file-icons" checked>
              <span>Include file icons</span>
            </label>
            <label class="checkbox-row">
              <input type="checkbox" id="include-folder-icons" checked>
              <span>Include folder icons</span>
            </label>
            <label class="checkbox-row">
              <input type="checkbox" id="include-accent-variants">
              <span>Include all accent variants (larger file)</span>
            </label>
          </div>
          <button class="btn export-btn" onclick="exportAsZip()">
            Export as ZIP
          </button>
          <p class="export-note" id="zip-export-status"></p>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Export Configuration as JSON</h3>
        <div class="card">
          <p>Save your current Lira theme configuration to a JSON file for backup or sharing.</p>
          <div class="config-preview">
            <pre id="config-preview">${this.getConfigPreview()}</pre>
          </div>
          <div class="export-actions">
            <button class="btn" onclick="exportAsJson()">
              Export JSON
            </button>
            <button class="btn btn-secondary" onclick="copyConfig()">
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Import Configuration</h3>
        <div class="card">
          <p>Restore settings from a previously exported JSON file.</p>
          <div class="import-area" id="drop-zone">
            <div class="upload-icon">&#128194;</div>
            <p>Drag and drop JSON file here or</p>
            <label class="file-input-label">
              <input type="file" id="import-file" accept=".json" onchange="handleFileImport(this)">
              <span class="btn btn-secondary">Browse Files</span>
            </label>
          </div>
          <p class="import-status" id="import-status"></p>
        </div>
      </div>
    `;
  }

  private getConfigPreview(): string {
    const config = vscode.workspace.getConfiguration("liraTheme");
    const exportConfig = {
      accent: config.get("accent"),
      customAccent: config.get("customAccent"),
      useOutlinedIcons: config.get("useOutlinedIcons"),
      hidesExplorerArrows: config.get("hidesExplorerArrows"),
      showBorders: config.get("showBorders"),
      contrastedTabs: config.get("contrastedTabs"),
      solidLineHighlight: config.get("solidLineHighlight"),
      hidesShadows: config.get("hidesShadows"),
    };

    // Filter out undefined/null values for cleaner preview
    const cleanConfig = Object.fromEntries(
      Object.entries(exportConfig).filter(([_, v]) => v !== undefined && v !== null)
    );

    return JSON.stringify(cleanConfig, null, 2)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
