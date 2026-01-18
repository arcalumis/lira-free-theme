import * as vscode from "vscode";
import { COLOR_THEMES, ICON_THEMES, THEME_PREVIEW_COLORS } from "../../themeConfig";

export class ThemesTab {
  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly webview: vscode.Webview
  ) {}

  render(): string {
    const currentColorTheme = vscode.workspace
      .getConfiguration()
      .get<string>("workbench.colorTheme") || "";
    const currentIconTheme = vscode.workspace
      .getConfiguration()
      .get<string>("workbench.iconTheme") || "";
    const isHighContrast = currentColorTheme.includes("High Contrast");

    return `
      <div class="section">
        <h3 class="section-title">Color Theme</h3>
        <p class="section-desc">Select your preferred Lira color variant</p>
        <div class="theme-grid">
          ${COLOR_THEMES.map((theme) => this.renderThemeCard(theme, currentColorTheme)).join("")}
        </div>
      </div>

      <div class="section">
        <div class="card">
          <div class="toggle-row">
            <div class="toggle-info">
              <h4>High Contrast Mode</h4>
              <p>Use high contrast variant for better accessibility</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox"
                     id="high-contrast-toggle"
                     ${isHighContrast ? "checked" : ""}
                     onchange="toggleHighContrast(this.checked)">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Icon Theme</h3>
        <p class="section-desc">Match your icon theme with the color variant</p>
        <div class="icon-theme-grid">
          ${ICON_THEMES.map((theme) => this.renderIconThemeCard(theme, currentIconTheme)).join("")}
        </div>
      </div>
    `;
  }

  private renderThemeCard(
    theme: (typeof COLOR_THEMES)[number],
    currentTheme: string
  ): string {
    const isActive = currentTheme.includes(theme.label);
    const colors = THEME_PREVIEW_COLORS[theme.label as keyof typeof THEME_PREVIEW_COLORS];

    return `
      <button class="theme-card ${isActive ? "active" : ""}"
              data-theme="${theme.id}"
              onclick="setColorTheme('${theme.id}')"
              title="${theme.label}">
        <div class="theme-preview" style="background: ${colors.bg}">
          <div class="preview-sidebar" style="background: ${colors.sidebar}"></div>
          <div class="preview-editor" style="background: ${colors.bg}"></div>
          <div class="preview-accent" style="background: ${colors.accent}"></div>
        </div>
        <span class="theme-label">${theme.label}</span>
        <span class="active-indicator">${isActive ? "Active" : ""}</span>
      </button>
    `;
  }

  private renderIconThemeCard(
    theme: (typeof ICON_THEMES)[number],
    currentTheme: string
  ): string {
    const isActive = currentTheme === theme.id;

    return `
      <button class="icon-theme-card ${isActive ? "active" : ""}"
              data-theme="${theme.id}"
              onclick="setIconTheme('${theme.id}')">
        ${theme.label} Icons
      </button>
    `;
  }
}
