import * as vscode from "vscode";

export class IconsTab {
  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly webview: vscode.Webview
  ) {}

  render(): string {
    const config = vscode.workspace.getConfiguration("liraTheme");
    const useOutlined = config.get<boolean>("useOutlinedIcons") ?? false;
    const hideArrows = config.get<boolean>("hidesExplorerArrows") ?? true;
    const showBorders = config.get<boolean>("showBorders") ?? false;
    const contrastedTabs = config.get<boolean>("contrastedTabs") ?? false;
    const solidLineHighlight = config.get<boolean>("solidLineHighlight") ?? false;
    const hidesShadows = config.get<boolean>("hidesShadows") ?? false;

    return `
      <div class="section">
        <h3 class="section-title">Folder Icon Style</h3>
        <p class="section-desc">Choose between filled and outlined folder icons</p>
        <div class="icon-style-selector">
          <button class="style-option ${!useOutlined ? "active" : ""}"
                  onclick="setIconStyle(false)">
            <div class="style-preview">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
              </svg>
            </div>
            <span>Filled</span>
          </button>
          <button class="style-option ${useOutlined ? "active" : ""}"
                  onclick="setIconStyle(true)">
            <div class="style-preview">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="none" stroke="currentColor" stroke-width="1.5" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
              </svg>
            </div>
            <span>Outlined</span>
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Interface Settings</h3>
        <div class="card">
          ${this.renderToggle(
            "hidesExplorerArrows",
            "Hide Explorer Arrows",
            "Remove folder expand/collapse arrows for a cleaner look",
            hideArrows
          )}
          ${this.renderToggle(
            "showBorders",
            "Show Borders",
            "Add subtle borders between UI sections",
            showBorders
          )}
          ${this.renderToggle(
            "contrastedTabs",
            "Contrasted Tabs",
            "Use different background for tab bar",
            contrastedTabs
          )}
          ${this.renderToggle(
            "solidLineHighlight",
            "Solid Line Highlight",
            "Use solid background instead of border for current line",
            solidLineHighlight
          )}
          ${this.renderToggle(
            "hidesShadows",
            "Hide Shadows",
            "Remove all shadows for a completely flat look",
            hidesShadows
          )}
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Icon Statistics</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">231</span>
            <span class="stat-label">File Icons</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">68</span>
            <span class="stat-label">Folder Icons</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">14</span>
            <span class="stat-label">Accent Variants</span>
          </div>
        </div>
      </div>

      <div class="section future-feature">
        <h3 class="section-title">Custom Icons <span class="badge">Coming Soon</span></h3>
        <p class="section-desc">Upload custom icons for specific file types</p>
        <div class="card disabled">
          <p>This feature will allow you to override default icons with your own SVG files.</p>
        </div>
      </div>
    `;
  }

  private renderToggle(
    setting: string,
    title: string,
    description: string,
    checked: boolean
  ): string {
    return `
      <div class="toggle-row">
        <div class="toggle-info">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
        <label class="toggle-switch">
          <input type="checkbox"
                 id="${setting}-toggle"
                 ${checked ? "checked" : ""}
                 onchange="toggleSetting('${setting}', this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </div>
    `;
  }
}
