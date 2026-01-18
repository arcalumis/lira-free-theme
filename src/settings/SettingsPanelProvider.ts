import * as vscode from "vscode";
import { getStyles } from "./webview/styles";
import { getScripts } from "./webview/scripts";
import { ThemesTab } from "./tabs/ThemesTab";
import { ColorsTab } from "./tabs/ColorsTab";
import { IconsTab } from "./tabs/IconsTab";
import { ExportTab } from "./tabs/ExportTab";
import { ExportService } from "./services/ExportService";
import {
  WebviewMessage,
  ThemeMessage,
  HighContrastMessage,
  AccentMessage,
  CustomAccentMessage,
  IconStyleMessage,
  ToggleSettingMessage,
  ExportZipMessage,
  ImportConfigMessage,
} from "./types";

export class SettingsPanelProvider {
  public static readonly viewType = "liraSettings";
  private panel: vscode.WebviewPanel | undefined;
  private disposables: vscode.Disposable[] = [];
  private exportService: ExportService;

  constructor(private readonly context: vscode.ExtensionContext) {
    this.exportService = new ExportService(context);
  }

  public show(): void {
    if (this.panel) {
      this.panel.reveal();
      this.updateContent();
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      SettingsPanelProvider.viewType,
      "Lira Theme Settings",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this.context.extensionUri, "src", "assets"),
          vscode.Uri.joinPath(this.context.extensionUri, "src", "icons"),
        ],
      }
    );

    this.panel.iconPath = vscode.Uri.joinPath(
      this.context.extensionUri,
      "src",
      "assets",
      "teal.svg"
    );

    this.updateContent();
    this.setupMessageHandler();

    this.panel.onDidDispose(
      () => {
        this.panel = undefined;
        this.disposables.forEach((d) => d.dispose());
        this.disposables = [];
      },
      null,
      this.disposables
    );
  }

  private updateContent(): void {
    if (this.panel) {
      this.panel.webview.html = this.getHtmlContent();
    }
  }

  private getHtmlContent(): string {
    const nonce = this.getNonce();
    const webview = this.panel!.webview;

    // Create tab instances
    const themesTab = new ThemesTab(this.context, webview);
    const colorsTab = new ColorsTab(this.context, webview);
    const iconsTab = new IconsTab(this.context, webview);
    const exportTab = new ExportTab(this.context, webview);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="
    default-src 'none';
    style-src ${webview.cspSource} 'unsafe-inline';
    script-src 'unsafe-inline';
    img-src ${webview.cspSource} data:;
    font-src ${webview.cspSource};
  ">
  <title>Lira Theme Settings</title>
  <style>${getStyles()}</style>
</head>
<body>
  <div class="settings-container">
    <header class="settings-header">
      <h1>Lira Theme Settings</h1>
      <p class="subtitle">Customize your VS Code experience</p>
    </header>

    <nav class="tab-nav" role="tablist">
      <button class="tab-btn active" data-tab="themes" role="tab" aria-selected="true">
        Themes
      </button>
      <button class="tab-btn" data-tab="colors" role="tab" aria-selected="false">
        Colors
      </button>
      <button class="tab-btn" data-tab="icons" role="tab" aria-selected="false">
        Icons
      </button>
      <button class="tab-btn" data-tab="export" role="tab" aria-selected="false">
        Export
      </button>
    </nav>

    <main class="tab-content">
      <section id="themes-tab" class="tab-panel active" role="tabpanel">
        ${themesTab.render()}
      </section>
      <section id="colors-tab" class="tab-panel" role="tabpanel" hidden>
        ${colorsTab.render()}
      </section>
      <section id="icons-tab" class="tab-panel" role="tabpanel" hidden>
        ${iconsTab.render()}
      </section>
      <section id="export-tab" class="tab-panel" role="tabpanel" hidden>
        ${exportTab.render()}
      </section>
    </main>
  </div>

  <script>${getScripts()}</script>
</body>
</html>`;
  }

  private getNonce(): string {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private setupMessageHandler(): void {
    this.panel!.webview.onDidReceiveMessage(
      async (message: WebviewMessage) => {
        try {
          await this.handleMessage(message);
        } catch (error) {
          console.error("Lira Settings: Error handling message", error);
          vscode.window.showErrorMessage(`Lira Theme: ${error}`);
        }
      },
      undefined,
      this.disposables
    );
  }

  private async handleMessage(message: WebviewMessage): Promise<void> {
    switch (message.command) {
      // Theme commands
      case "setColorTheme": {
        const { themeId } = message as ThemeMessage;
        await vscode.workspace.getConfiguration().update(
          "workbench.colorTheme",
          themeId,
          vscode.ConfigurationTarget.Global
        );
        break;
      }

      case "setIconTheme": {
        const { themeId } = message as ThemeMessage;
        await vscode.workspace.getConfiguration().update(
          "workbench.iconTheme",
          themeId,
          vscode.ConfigurationTarget.Global
        );
        break;
      }

      case "toggleHighContrast": {
        const { enabled } = message as HighContrastMessage;
        const currentTheme = vscode.workspace
          .getConfiguration()
          .get<string>("workbench.colorTheme") || "";

        let newTheme: string;
        if (enabled && !currentTheme.includes("High Contrast")) {
          // Add High Contrast
          newTheme = currentTheme + " High Contrast";
        } else if (!enabled && currentTheme.includes("High Contrast")) {
          // Remove High Contrast
          newTheme = currentTheme.replace(" High Contrast", "");
        } else {
          newTheme = currentTheme;
        }

        await vscode.workspace.getConfiguration().update(
          "workbench.colorTheme",
          newTheme,
          vscode.ConfigurationTarget.Global
        );
        break;
      }

      // Color commands
      case "setAccent": {
        const { accentName } = message as AccentMessage;
        await vscode.workspace.getConfiguration().update(
          "liraTheme.accent",
          accentName,
          vscode.ConfigurationTarget.Global
        );
        // Clear custom accent when preset is selected
        await vscode.workspace.getConfiguration().update(
          "liraTheme.customAccent",
          undefined,
          vscode.ConfigurationTarget.Global
        );
        break;
      }

      case "setCustomAccent": {
        const { hexColor } = message as CustomAccentMessage;
        if (/^#([0-9A-Fa-f]{6})$/i.test(hexColor)) {
          await vscode.workspace.getConfiguration().update(
            "liraTheme.customAccent",
            hexColor,
            vscode.ConfigurationTarget.Global
          );
        }
        break;
      }

      case "clearCustomAccent": {
        await vscode.workspace.getConfiguration().update(
          "liraTheme.customAccent",
          undefined,
          vscode.ConfigurationTarget.Global
        );
        break;
      }

      // Icon/UI commands
      case "setIconStyle": {
        const { outlined } = message as IconStyleMessage;
        await vscode.workspace.getConfiguration().update(
          "liraTheme.useOutlinedIcons",
          outlined,
          vscode.ConfigurationTarget.Global
        );
        vscode.window.showInformationMessage(
          `Icon style set to ${outlined ? "outlined" : "filled"}`
        );
        break;
      }

      case "toggleSetting": {
        const { setting, value } = message as ToggleSettingMessage;
        await vscode.workspace.getConfiguration().update(
          `liraTheme.${setting}`,
          value,
          vscode.ConfigurationTarget.Global
        );
        vscode.window.showInformationMessage(
          `${setting} set to ${value}`
        );
        break;
      }

      // Export commands
      case "exportAsZip": {
        const { options } = message as ExportZipMessage;
        try {
          await this.exportService.exportAsZip(options, (progress) => {
            this.sendToWebview({ command: "exportProgress", progress });
          });
          this.sendToWebview({ command: "exportComplete" });
        } catch (error) {
          this.sendToWebview({
            command: "exportError",
            error: String(error),
          });
        }
        break;
      }

      case "exportAsJson": {
        await this.exportService.exportAsJson();
        break;
      }

      case "copyConfig": {
        await this.exportService.copyConfigToClipboard();
        break;
      }

      case "importConfig": {
        const { config } = message as ImportConfigMessage;
        try {
          await this.exportService.importConfiguration(config);
          this.sendToWebview({ command: "importSuccess" });
          // Refresh the panel content
          this.updateContent();
        } catch (error) {
          this.sendToWebview({
            command: "importError",
            error: String(error),
          });
        }
        break;
      }
    }
  }

  private sendToWebview(message: Record<string, unknown>): void {
    this.panel?.webview.postMessage(message);
  }

  dispose(): void {
    this.panel?.dispose();
    this.disposables.forEach((d) => d.dispose());
  }
}
