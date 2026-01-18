import * as vscode from "vscode";
import { THEME_CONFIG, COLOR_THEMES, ICON_THEMES } from "../themeConfig";
import { StatusBarMenuOption } from "./types";

export class StatusBarMenu {
  private statusBarItem: vscode.StatusBarItem;
  private disposables: vscode.Disposable[] = [];

  constructor(private readonly context: vscode.ExtensionContext) {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      -9999
    );
    this.statusBarItem.command = "liraTheme.showStatusBarMenu";
    this.statusBarItem.tooltip = "Lira Theme Options";

    this.registerCommand();
    this.updateDisplay();
    this.setupConfigListener();
  }

  private registerCommand(): void {
    const disposable = vscode.commands.registerCommand(
      "liraTheme.showStatusBarMenu",
      () => this.showMenu()
    );
    this.disposables.push(disposable);
    this.context.subscriptions.push(disposable);
  }

  private setupConfigListener(): void {
    const disposable = vscode.workspace.onDidChangeConfiguration((event) => {
      const affectsTheme = [
        "workbench.colorTheme",
        "workbench.iconTheme",
        "liraTheme.accent",
        "liraTheme.customAccent",
      ].some((setting) => event.affectsConfiguration(setting));

      if (affectsTheme) {
        this.updateDisplay();
      }
    });
    this.disposables.push(disposable);
    this.context.subscriptions.push(disposable);
  }

  async showMenu(): Promise<void> {
    const options: StatusBarMenuOption[] = [
      {
        label: "$(paintcan) Quick Accent Change",
        description: "Change accent color from presets",
        command: "liraTheme.accentPicker",
      },
      {
        label: "$(settings-gear) Open Settings Panel",
        description: "Full customization options",
        command: "liraTheme.openSettingsPanel",
      },
      {
        label: "$(folder) Toggle Icon Style",
        description: this.getIconStyleDescription(),
        command: "liraTheme.toggleIconStyleQuick",
      },
      {
        label: "$(color-mode) Switch Theme Variant",
        description: "Choose Lira color theme",
        command: "liraTheme.switchThemeVariant",
      },
      {
        label: "$(file-symlink-directory) Switch Icon Theme",
        description: "Choose Lira icon theme",
        command: "liraTheme.switchIconTheme",
      },
    ];

    const selected = await vscode.window.showQuickPick(options, {
      placeHolder: "Lira Theme Options",
      matchOnDescription: true,
    });

    if (selected) {
      if (selected.command === "liraTheme.toggleIconStyleQuick") {
        await this.toggleIconStyle();
      } else if (selected.command === "liraTheme.switchThemeVariant") {
        await this.showThemePicker();
      } else if (selected.command === "liraTheme.switchIconTheme") {
        await this.showIconThemePicker();
      } else {
        await vscode.commands.executeCommand(selected.command);
      }
    }
  }

  private async showThemePicker(): Promise<void> {
    const currentTheme = vscode.workspace
      .getConfiguration()
      .get<string>("workbench.colorTheme") || "";

    interface ThemeOption extends vscode.QuickPickItem {
      themeId: string;
    }

    const options: ThemeOption[] = [];

    // Add regular themes
    options.push({
      label: "Lira Themes",
      kind: vscode.QuickPickItemKind.Separator,
      themeId: "",
    });

    for (const theme of COLOR_THEMES) {
      const isActive = currentTheme === theme.id;
      options.push({
        label: `$(color-mode) ${theme.label}`,
        description: isActive ? "$(check) Active" : "",
        themeId: theme.id,
      });
    }

    // Add high contrast themes
    options.push({
      label: "High Contrast",
      kind: vscode.QuickPickItemKind.Separator,
      themeId: "",
    });

    for (const theme of COLOR_THEMES) {
      const hcId = theme.id + " High Contrast";
      const hcLabel = theme.label + " High Contrast";
      const isActive = currentTheme === hcId;
      options.push({
        label: `$(color-mode) ${hcLabel}`,
        description: isActive ? "$(check) Active" : "",
        themeId: hcId,
      });
    }

    const selected = await vscode.window.showQuickPick(options, {
      placeHolder: "Select Lira Color Theme",
      matchOnDescription: true,
    });

    if (selected && selected.themeId) {
      await vscode.workspace.getConfiguration().update(
        "workbench.colorTheme",
        selected.themeId,
        vscode.ConfigurationTarget.Global
      );
    }
  }

  private async showIconThemePicker(): Promise<void> {
    const currentIconTheme = vscode.workspace
      .getConfiguration()
      .get<string>("workbench.iconTheme") || "";

    interface IconThemeOption extends vscode.QuickPickItem {
      themeId: string;
    }

    const options: IconThemeOption[] = ICON_THEMES.map((theme) => {
      const isActive = currentIconTheme === theme.id;
      return {
        label: `$(file-symlink-directory) ${theme.label}`,
        description: isActive ? "$(check) Active" : "",
        themeId: theme.id,
      };
    });

    const selected = await vscode.window.showQuickPick(options, {
      placeHolder: "Select Lira Icon Theme",
      matchOnDescription: true,
    });

    if (selected && selected.themeId) {
      await vscode.workspace.getConfiguration().update(
        "workbench.iconTheme",
        selected.themeId,
        vscode.ConfigurationTarget.Global
      );
    }
  }

  private async toggleIconStyle(): Promise<void> {
    const current = vscode.workspace
      .getConfiguration("liraTheme")
      .get<boolean>("useOutlinedIcons") ?? false;
    await vscode.workspace
      .getConfiguration()
      .update("liraTheme.useOutlinedIcons", !current, vscode.ConfigurationTarget.Global);
  }

  private getIconStyleDescription(): string {
    const useOutlined = vscode.workspace
      .getConfiguration("liraTheme")
      .get<boolean>("useOutlinedIcons") ?? false;
    return useOutlined ? "Currently: Outlined → Switch to Filled" : "Currently: Filled → Switch to Outlined";
  }

  updateDisplay(): void {
    const isActive = this.isLiraThemeActive() || this.isLiraIconThemeActive();

    if (!isActive) {
      this.statusBarItem.hide();
      return;
    }

    const accentColor = vscode.workspace
      .getConfiguration("liraTheme")
      .get<string>("accent") ?? "Teal";
    const customAccent = vscode.workspace
      .getConfiguration("liraTheme")
      .get<string>("customAccent");

    const displayText = `$(paintcan) ${customAccent ? "Custom" : accentColor}`;

    this.statusBarItem.text = displayText;
    this.statusBarItem.color =
      customAccent ||
      THEME_CONFIG.accents[accentColor as keyof typeof THEME_CONFIG.accents] ||
      THEME_CONFIG.accents.Teal;

    this.statusBarItem.show();
  }

  private isLiraThemeActive(): boolean {
    const themeSettings = [
      "workbench.preferredLightColorTheme",
      "workbench.preferredDarkColorTheme",
      "workbench.preferredHighContrastColorTheme",
      "workbench.preferredHighContrastLightColorTheme",
    ];

    const autoDetect = vscode.workspace
      .getConfiguration()
      .get<boolean>("window.autoDetectColorScheme") ?? false;
    const activeTheme = vscode.window.activeColorTheme;
    const settingKey = autoDetect
      ? themeSettings[activeTheme.kind - 1]
      : "workbench.colorTheme";
    const currentTheme = vscode.workspace
      .getConfiguration()
      .get<string>(settingKey);

    return currentTheme?.toLowerCase().includes("lira") ?? false;
  }

  private isLiraIconThemeActive(): boolean {
    const iconTheme = vscode.workspace
      .getConfiguration()
      .get<string>("workbench.iconTheme");
    return iconTheme?.toLowerCase().includes("lira") ?? false;
  }

  getStatusBarItem(): vscode.StatusBarItem {
    return this.statusBarItem;
  }

  dispose(): void {
    this.statusBarItem.dispose();
    this.disposables.forEach((d) => d.dispose());
  }
}
