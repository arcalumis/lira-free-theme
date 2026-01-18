import * as vscode from "vscode";
import { THEME_CONFIG } from "../../themeConfig";

export class ColorsTab {
  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly webview: vscode.Webview
  ) {}

  render(): string {
    const currentAccent = vscode.workspace
      .getConfiguration()
      .get<string>("liraTheme.accent") || "Teal";
    const customAccent = vscode.workspace
      .getConfiguration()
      .get<string>("liraTheme.customAccent") || "";

    const accentEntries = Object.entries(THEME_CONFIG.accents);
    const activeColor = customAccent ||
      THEME_CONFIG.accents[currentAccent as keyof typeof THEME_CONFIG.accents] ||
      THEME_CONFIG.accents.Teal;

    return `
      <div class="section">
        <h3 class="section-title">Accent Color</h3>
        <p class="section-desc">Choose an accent color for UI highlights</p>

        <div class="accent-grid">
          ${accentEntries.map(([name, color]) => `
            <button class="accent-btn ${currentAccent === name && !customAccent ? "active" : ""}"
                    data-accent="${name}"
                    style="background: ${color};"
                    onclick="setAccent('${name}')"
                    title="${name}"
                    tabindex="0">
              ${currentAccent === name && !customAccent ? '<span class="check-icon">&#10003;</span>' : ""}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Custom Accent Color</h3>
        <div class="card">
          <div class="custom-color-input">
            <div class="color-preview-wrapper">
              <input type="color"
                     id="color-picker"
                     value="${customAccent || activeColor}"
                     onchange="updateCustomAccent(this.value)">
            </div>
            <input type="text"
                   id="hex-input"
                   class="hex-input"
                   placeholder="#RRGGBB"
                   value="${customAccent}"
                   maxlength="7"
                   oninput="validateHexInput(this)">
            <button class="btn" onclick="applyCustomAccent()">Apply</button>
            <button class="btn btn-secondary" onclick="clearCustomAccent()">Clear</button>
          </div>
          <p class="input-hint">Enter a valid 6-digit hex color (e.g., #FF5722)</p>
          ${customAccent ? `<p class="current-custom">Current custom accent: <code>${customAccent}</code></p>` : ""}
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Preview</h3>
        <div class="accent-preview card">
          <div class="preview-row">
            <span class="preview-label">Button</span>
            <button class="preview-button" style="background: ${activeColor}">
              Sample Button
            </button>
          </div>
          <div class="preview-row">
            <span class="preview-label">Link</span>
            <a href="#" class="preview-link" style="color: ${activeColor}" onclick="return false">
              Sample Link Text
            </a>
          </div>
          <div class="preview-row">
            <span class="preview-label">Badge</span>
            <span class="preview-badge" style="background: ${activeColor}">
              12
            </span>
          </div>
        </div>
      </div>
    `;
  }
}
