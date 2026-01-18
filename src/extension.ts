import * as vscode from "vscode";
import {
  FOLDER_NAMES,
  THEME_CONFIG,
  STRINGS,
  ThemeIconDefinition,
  ThemeConfig,
} from "./themeConfig";
import { StatusBarMenu, SettingsPanelProvider } from "./settings";

// Type definitions
interface AccentOption {
  label: string;
  picked?: boolean;
  iconPath: vscode.Uri | vscode.ThemeIcon;
}


// Utility Functions
function getConfiguration(key: string): any {
  return vscode.workspace.getConfiguration().get(`liraTheme.${key}`);
}

function slugify(text: string): string {
  return text.replace(/\s+/g, "-").toLowerCase();
}

// Debounce utility to prevent multiple rapid calls
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

function isValidHexColor(color: string): boolean {
  return /^#([0-9A-F]{6})$/i.test(color);
}

function hasConfiguration(key: string): boolean {
  return vscode.workspace.getConfiguration().has(`liraTheme.${key}`);
}

async function updateConfiguration(
  key: string,
  value: any,
  target = vscode.ConfigurationTarget.Global
): Promise<void> {
  await vscode.workspace
    .getConfiguration()
    .update(`liraTheme.${key}`, value, target);
}

async function clearConfiguration(
  keys: string[] = ["customAccent", "accent"]
): Promise<void> {
  for (const key of keys) {
    await vscode.workspace
      .getConfiguration()
      .update(`liraTheme.${key}`, undefined, true);
  }
}

// Theme File Operations
async function updateThemeFiles(
  context: vscode.ExtensionContext,
  updater: (theme: ThemeConfig) => ThemeConfig
): Promise<void> {
  const themesPath = vscode.Uri.joinPath(
    vscode.Uri.file(context.extensionPath),
    "./src/themes"
  );
  const files = await vscode.workspace.fs.readDirectory(themesPath);

  // Filter icon theme files and process in parallel
  const iconThemeFiles = files
    .filter(([fileName]) => fileName.startsWith("Lira-Icons"))
    .map(([fileName]) => fileName);

  await Promise.all(
    iconThemeFiles.map(async (fileName) => {
      try {
        const filePath = vscode.Uri.joinPath(themesPath, fileName);
        const fileData = await vscode.workspace.fs.readFile(filePath);
        const themeContent = new TextDecoder().decode(fileData);
        const themeObject = { ...JSON.parse(themeContent) } as ThemeConfig;
        const updatedTheme = updater(themeObject);
        const updatedData = new TextEncoder().encode(JSON.stringify(updatedTheme, null, 2));
        await vscode.workspace.fs.writeFile(filePath, updatedData);
      } catch (error) {
        console.error(`Lira Theme: Failed to update ${fileName}`, error);
      }
    })
  );
}

// Explorer Arrows Management
async function hideExplorerArrows(
  context: vscode.ExtensionContext,
  shouldHide: boolean
): Promise<void> {
  await updateThemeFiles(context, (theme) => {
    theme.hidesExplorerArrows = shouldHide;
    return theme;
  });
}

// Icon Style Management
async function useOutlinedIcons(
  context: vscode.ExtensionContext,
  useOutlined: boolean
): Promise<void> {
  await updateThemeFiles(context, (theme) => {
    Object.values(theme.iconDefinitions).forEach((iconDef: any) => {
      if (useOutlined) {
        iconDef.iconPath = iconDef.iconPath.replace("filled", "outlined");
      } else {
        iconDef.iconPath = iconDef.iconPath.replace("outlined", "filled");
      }
    });
    return theme;
  });
}

// Accent Color Management
async function updateIconsAccentColor(
  context: vscode.ExtensionContext,
  accentName: string
): Promise<void> {
  const { accentableIcons } = THEME_CONFIG;
  const accentSlug = slugify(accentName);

  await updateThemeFiles(context, (theme) => {
    accentableIcons.forEach((iconName) => {
      const iconDef = theme.iconDefinitions[iconName] as
        | ThemeIconDefinition
        | undefined;
      if (iconDef) {
        const { iconPath } = iconDef;
        const newAccentPath = iconPath.includes(".accent.")
          ? iconPath.replace(
              /\.accent\.[^.]+\.svg$/,
              `.accent.${accentSlug}.svg`
            )
          : iconPath.replace(".svg", `.accent.${accentSlug}.svg`);
        const defaultPath = iconPath.replace(/\.accent\.[^.]+\.svg$/, ".svg");
        iconDef.iconPath = accentName === "Teal" ? defaultPath : newAccentPath;
      }
    });
    return theme;
  });
}

async function createCustomAccentIcons(
  context: vscode.ExtensionContext,
  customColor: string
): Promise<void> {
  const {
    accentableIcons,
    foldersStyles,
    icons: {
      theme: { iconDefinitions },
    },
  } = THEME_CONFIG;
  const themesPath = vscode.Uri.joinPath(
    vscode.Uri.file(context.extensionPath),
    "./src/themes"
  );
  const accentSuffix = `.accent.${customColor}.svg`;
  const previousCustomAccent = context.globalState.get(
    "liraTheme.iconsCustomAccent"
  ) as string | null;
  let previousAccentSuffix = null;

  if (previousCustomAccent) {
    previousAccentSuffix = `.accent.${previousCustomAccent}.svg`;
  }

  for (const style of foldersStyles) {
    for (const iconName of accentableIcons) {
      const iconPath = (iconDefinitions as any)[iconName].iconPath.replace(
        "filled/",
        `${style}/`
      );
      const sourcePath = vscode.Uri.joinPath(themesPath, iconPath);
      const sourceData = await vscode.workspace.fs.readFile(sourcePath);
      const svgContent = new TextDecoder().decode(sourceData);
      const targetPath = vscode.Uri.joinPath(
        themesPath,
        iconPath.replace(/\.svg$/, accentSuffix)
      );
      const coloredSvg = svgContent.replace(
        /fill="#[^"]*"/g,
        `fill="${customColor}"`
      );
      const encodedSvg = new TextEncoder().encode(coloredSvg);

      // Clean up previous custom accent files
      if (previousAccentSuffix) {
        const previousPath = vscode.Uri.joinPath(
          themesPath,
          iconPath.replace(/\.svg$/, previousAccentSuffix)
        );
        try {
          await vscode.workspace.fs.delete(previousPath);
        } catch {}
      }

      await vscode.workspace.fs.writeFile(targetPath, encodedSvg);
    }
  }

  await updateThemeFiles(context, (theme) => {
    accentableIcons.forEach((iconName) => {
      const iconDef = theme.iconDefinitions[iconName] as
        | ThemeIconDefinition
        | undefined;
      if (iconDef) {
        const { iconPath } = iconDef;
        const newPath = iconPath.includes(".accent.")
          ? iconPath.replace(/\.accent\.[^.]+\.svg$/, accentSuffix)
          : iconPath.replace(/\.svg$/, accentSuffix);
        iconDef.iconPath = newPath;
      }
    });
    return theme;
  });

  await context.globalState.update("liraTheme.iconsCustomAccent", customColor);
}

async function updateIconsAccent(
  context: vscode.ExtensionContext
): Promise<void> {
  const accentColor = getConfiguration("accent") || null;
  const customAccent = getConfiguration("customAccent") || null;

  if (!accentColor) {
    vscode.window.showInformationMessage(STRINGS.feedbacks.no_accent.message);
    return;
  }

  if (customAccent) {
    await createCustomAccentIcons(context, customAccent);
  } else {
    await updateIconsAccentColor(context, accentColor);
  }
}

// Package Information
function getPackageInfo(): any {
  const extension = vscode.extensions.getExtension("Lirasoft.lira-free-theme");
  if (!extension) {
    throw new Error("Extension with ID Lirasoft.lira-free-theme not found");
  }
  return extension.packageJSON;
}

// Theme Detection
function isLiraThemeActive(): boolean {
  const themeSettings = [
    "workbench.preferredLightColorTheme",
    "workbench.preferredDarkColorTheme",
    "workbench.preferredHighContrastColorTheme",
    "workbench.preferredHighContrastLightColorTheme",
  ];

  const autoDetect =
    vscode.workspace.getConfiguration().get("window.autoDetectColorScheme") ??
    false;
  const activeTheme = vscode.window.activeColorTheme;
  const settingKey = autoDetect
    ? themeSettings[activeTheme.kind - 1]
    : "workbench.colorTheme";
  const currentTheme = vscode.workspace.getConfiguration().get(settingKey) as
    | string
    | undefined;

  return currentTheme
    ? getPackageInfo().contributes.themes.some((theme: any) =>
        (currentTheme as string).includes(theme.label)
      )
    : false;
}

function isLiraIconThemeActive(): boolean {
  const iconTheme = vscode.workspace
    .getConfiguration()
    .get("workbench.iconTheme") as string | undefined;
  return iconTheme
    ? getPackageInfo().contributes.iconThemes.some((theme: any) =>
        (iconTheme as string).includes(theme.id)
      )
    : false;
}

// Color Utilities
function addAlphaToHex(color: string, alpha?: number): string {
  if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(color)) {
    throw new Error(STRINGS.feedbacks.invalidColorFormat);
  }
  if (alpha !== undefined && (alpha < 0 || alpha > 1)) {
    throw new Error(STRINGS.feedbacks.invalidHexAlpha);
  }
  if (alpha !== undefined) {
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    return `${color}${alphaHex}`;
  }
  return color;
}

function getContrastColor(color: string): string {
  const hex = color.replace(/^#/, "");
  const expandedHex =
    hex.length === 3
      ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      : hex;

  if (!/^[0-9A-Fa-f]{6}$/.test(expandedHex)) {
    return "#000000";
  }

  const r = parseInt(expandedHex.slice(0, 2), 16);
  const g = parseInt(expandedHex.slice(2, 4), 16);
  const b = parseInt(expandedHex.slice(4, 6), 16);

  return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? "#000000" : "#FFFFFF";
}

function applyAlphaToColor(color: string, alpha: number): string {
  return color && alpha < 1 ? addAlphaToHex(color, alpha) : color;
}

// Color Customization Functions
function generateAccentColors(accentProperties: any, accentColor: string): any {
  const validColor = /^#([0-9A-F]{6})$/i.test(accentColor)
    ? accentColor
    : undefined;

  return Object.keys(accentProperties).reduce((result, key) => {
    const {
      colorCustomizations: { accentForegrounds },
    } = THEME_CONFIG;
    const property = accentProperties[key];

    result[key] =
      validColor && property.alpha < 1
        ? addAlphaToHex(validColor, property.alpha)
        : validColor;

    if (validColor) {
      accentForegrounds.forEach((foregroundKey) => {
        result[foregroundKey] = getContrastColor(validColor);
      });
    }

    return result;
  }, {} as any);
}

function generateThemeColors(properties: any): any {
  return Object.keys(properties).reduce((result, key) => {
    const property = properties[key];
    const validColor = /^#([0-9A-F]{6})$/i.test(property.value)
      ? property.value
      : undefined;

    result[key] =
      validColor && property.alpha < 1
        ? addAlphaToHex(validColor, property.alpha)
        : validColor;

    return result;
  }, {} as any);
}

function removeColorProperties(
  properties: any,
  colorCustomizations: any
): void {
  Object.keys(properties).forEach((key) => {
    if (colorCustomizations["[Lira*]"]?.[key]) {
      delete colorCustomizations["[Lira*]"][key];
    }
  });
}

async function updateWorkbenchColors(colorCustomizations: any): Promise<void> {
  try {
    await vscode.workspace
      .getConfiguration()
      .update("workbench.colorCustomizations", colorCustomizations, true);
  } catch (error) {
    await vscode.window.showErrorMessage(String(error));
  }
}

// UI Functions
async function showAccentPicker(
  context: vscode.ExtensionContext
): Promise<void> {
  const accentOptions = Object.keys(THEME_CONFIG.accents).map((accentName) => {
    const accentSlug = slugify(accentName);
    const iconPath = vscode.Uri.joinPath(
      vscode.Uri.file(context.extensionPath),
      "./src",
      "assets",
      `${accentSlug}.svg`
    );
    const isSelected =
      hasConfiguration("accent") && getConfiguration("accent") === accentName;

    return {
      label: accentName,
      picked: isSelected,
      iconPath:
        accentName === "Clear accent"
          ? new vscode.ThemeIcon("close")
          : iconPath,
    };
  });

  // Add special options
  accentOptions.unshift({
    label: "Use custom accent",
    picked: false,
    iconPath: new vscode.ThemeIcon("paintcan"),
  });

  accentOptions.push({
    label: "Clear accent",
    picked: false,
    iconPath: new vscode.ThemeIcon("close"),
  });

  const selectedAccent = await vscode.window.showQuickPick(accentOptions, {
    placeHolder: STRINGS.placeholders.select_accent,
  });

  if (!selectedAccent) {
    return;
  }

  const existingColorCustomizations = vscode.workspace
    .getConfiguration()
    .get("workbench.colorCustomizations");
  if (!existingColorCustomizations) {
    return;
  }

  const { "[Lira*]": liraColors } = existingColorCustomizations as any;
  if (selectedAccent.label === "" && liraColors) {
    return;
  }

  if (selectedAccent.label === "Use custom accent") {
    const customColor = await promptForCustomAccent();
    if (!customColor || customColor === "") {
      return;
    }
    await updateConfiguration("customAccent", customColor);
  }

  if (selectedAccent.label === "Clear accent") {
    await vscode.commands.executeCommand("liraTheme.clearAccent");
  }

  if (
    selectedAccent.label !== "Use custom accent" &&
    selectedAccent.label !== "Clear accent"
  ) {
    await updateConfiguration("accent", selectedAccent.label);
  }
}

async function promptForCustomAccent(): Promise<string | undefined> {
  return await vscode.window.showInputBox({
    placeHolder: STRINGS.placeholders.enter_custom_accent,
    validateInput(value: string) {
      return /^#([0-9A-F]{6})$/i.test(value)
        ? null
        : STRINGS.feedbacks.no_valid_color.message;
    },
  });
}

async function clearAccent(): Promise<void> {
  await clearConfiguration(["customAccent", "accent"]);
}

async function updateColorCustomizations(): Promise<void> {
  const accentColor = getConfiguration("accent") ?? null;
  const customAccent = getConfiguration("customAccent") ?? null;
  const showBorders = getConfiguration("showBorders") ?? false;
  const contrastedTabs = getConfiguration("contrastedTabs") ?? false;
  const solidLineHighlight = getConfiguration("solidLineHighlight") ?? false;
  const hidesShadows = getConfiguration("hidesShadows") ?? false;

  if (!isLiraThemeActive()) {
    return;
  }

  const existingColorCustomizations = vscode.workspace
    .getConfiguration()
    .get("workbench.colorCustomizations");
  if (!existingColorCustomizations) {
    return;
  }

  const { "[Lira*]": liraColors } = existingColorCustomizations as any;
  const {
    accents,
    colorCustomizations: {
      accentsProperties,
      bordersProperties,
      contrastedTabsProperties,
      lineHighlightProperties,
      shadowProperties,
    },
  } = THEME_CONFIG;

  let accentColors = {};
  let selectedAccentColor = null;

  if (customAccent) {
    selectedAccentColor = customAccent;
  } else if (accentColor && accents[accentColor as keyof typeof accents]) {
    selectedAccentColor = accents[accentColor as keyof typeof accents];
  }

  if (selectedAccentColor) {
    accentColors = generateAccentColors(accentsProperties, selectedAccentColor);
  }

  const borderColors = showBorders
    ? generateThemeColors(bordersProperties)
    : {};
  const tabColors = contrastedTabs
    ? generateThemeColors(contrastedTabsProperties)
    : {};
  const lineColors = solidLineHighlight
    ? generateThemeColors(lineHighlightProperties)
    : {};
  const shadowColors = hidesShadows
    ? generateThemeColors(shadowProperties)
    : {};

  const newColorCustomizations = {
    ...existingColorCustomizations,
    "[Lira*]": {
      ...liraColors,
      ...accentsProperties,
      ...bordersProperties,
      ...contrastedTabsProperties,
      ...lineHighlightProperties,
      ...shadowProperties,
      ...accentColors,
      ...borderColors,
      ...tabColors,
      ...lineColors,
      ...shadowColors,
    },
  };

  if (!showBorders) {
    removeColorProperties(bordersProperties, newColorCustomizations);
  }
  if (!contrastedTabs) {
    removeColorProperties(contrastedTabsProperties, newColorCustomizations);
  }
  if (!solidLineHighlight) {
    removeColorProperties(lineHighlightProperties, newColorCustomizations);
  }
  if (!hidesShadows) {
    removeColorProperties(shadowProperties, newColorCustomizations);
  }

  await updateWorkbenchColors(newColorCustomizations);
}

async function initializeColorCustomizations(
  context: vscode.ExtensionContext
): Promise<void> {
  const storedCustomizations = context.globalState.get(
    "liraTheme.colorCustomizations"
  ) as string[] | undefined;
  const { colorCustomizations } = THEME_CONFIG;

  const allColorKeys = Object.keys(colorCustomizations).flatMap((category) => {
    const categoryColors =
      colorCustomizations[category as keyof typeof colorCustomizations];
    return Object.keys(categoryColors);
  });

  if (storedCustomizations) {
    const obsoleteKeys = storedCustomizations.filter(
      (key) => !allColorKeys.includes(key)
    );

    if (obsoleteKeys.length > 0) {
      const existingCustomizations = vscode.workspace
        .getConfiguration()
        .get("workbench.colorCustomizations");
      if (!existingCustomizations) {
        return;
      }

      const { "[Lira*]": liraColors, ...otherColors } =
        existingCustomizations as any;
      const cleanedLiraColors = liraColors ? { ...liraColors } : {};

      obsoleteKeys.forEach((key) => {
        if (cleanedLiraColors[key]) {
          delete cleanedLiraColors[key];
        }
      });

      const updatedCustomizations = {
        ...otherColors,
        "[Lira*]": { ...cleanedLiraColors },
      };

      await updateWorkbenchColors(updatedCustomizations);
    }
  }

  await context.globalState.update(
    "liraTheme.colorCustomizations",
    allColorKeys
  );
  await updateColorCustomizations();

  vscode.workspace.onDidChangeConfiguration(async (event) => {
    const affectsTheme = [
      "workbench.colorTheme",
      "workbench.preferredLightColorTheme",
      "workbench.preferredDarkColorTheme",
      "workbench.preferredHighContrastColorTheme",
      "workbench.preferredHighContrastLightColorTheme",
      "window.autoDetectColorScheme",
    ].some((setting) => event.affectsConfiguration(setting));

    if (affectsTheme) {
      await updateColorCustomizations();
    }
  });
}

// Consolidated configuration change handler
function createConfigurationChangeHandler(
  context: vscode.ExtensionContext
): (event: vscode.ConfigurationChangeEvent) => Promise<void> {
  // Debounced handlers for color customization updates
  const debouncedColorUpdate = debounce(async () => {
    try {
      await updateColorCustomizations();
    } catch (error) {
      console.error("Lira Theme: Failed to update color customizations", error);
    }
  }, 100);

  const debouncedIconsUpdate = debounce(async () => {
    try {
      await updateIconsAccent(context);
    } catch (error) {
      console.error("Lira Theme: Failed to update icons accent", error);
    }
  }, 100);

  // Theme-related settings that affect visibility/state
  const themeSettings = [
    "workbench.colorTheme",
    "workbench.preferredLightColorTheme",
    "workbench.preferredDarkColorTheme",
    "workbench.preferredHighContrastColorTheme",
    "workbench.preferredHighContrastLightColorTheme",
    "window.autoDetectColorScheme",
  ];

  return async (event: vscode.ConfigurationChangeEvent) => {
    const affectsTheme = themeSettings.some((s) => event.affectsConfiguration(s));
    const affectsIconTheme = event.affectsConfiguration("workbench.iconTheme");
    const affectsAccent =
      event.affectsConfiguration("liraTheme.accent") ||
      event.affectsConfiguration("liraTheme.customAccent");

    // Handle accent color changes
    if (affectsAccent) {
      debouncedColorUpdate();
      debouncedIconsUpdate();
    }

    // Handle theme changes
    if (affectsTheme) {
      debouncedColorUpdate();
    }

    // Handle icon theme switch to Lira
    if (affectsIconTheme && isLiraIconThemeActive()) {
      debouncedIconsUpdate();
    }

    // Handle Lira-specific settings (only when Lira theme is active)
    if (
      event.affectsConfiguration("liraTheme.showBorders") ||
      event.affectsConfiguration("liraTheme.contrastedTabs") ||
      event.affectsConfiguration("liraTheme.solidLineHighlight") ||
      event.affectsConfiguration("liraTheme.hidesShadows")
    ) {
      if (isLiraThemeActive()) {
        debouncedColorUpdate();
      } else {
        vscode.window.showWarningMessage(
          "Lira Theme: UI settings only work when using a Lira color theme"
        );
      }
    }

    // Handle icon-related settings (immediate, no debounce needed)
    if (event.affectsConfiguration("liraTheme.hidesExplorerArrows")) {
      if (isLiraIconThemeActive()) {
        try {
          await hideExplorerArrows(context, getConfiguration("hidesExplorerArrows") ?? true);
          vscode.window.showInformationMessage("Explorer arrows updated");
        } catch (error) {
          console.error("Lira Theme: Failed to update explorer arrows", error);
        }
      } else {
        vscode.window.showWarningMessage(
          "Lira Theme: Explorer arrows setting only works with Lira icon themes"
        );
      }
    }

    if (event.affectsConfiguration("liraTheme.useOutlinedIcons")) {
      if (isLiraIconThemeActive()) {
        try {
          await useOutlinedIcons(context, getConfiguration("useOutlinedIcons") ?? false);
          vscode.window.showInformationMessage(
            "Icon style updated. You may need to reload VS Code to see changes."
          );
        } catch (error) {
          console.error("Lira Theme: Failed to update outlined icons", error);
          vscode.window.showErrorMessage("Failed to update icon style: " + error);
        }
      } else {
        vscode.window.showWarningMessage(
          "Lira Theme: Icon style setting only works with Lira icon themes"
        );
      }
    }
  };
}

// Welcome screen for first-time users
async function showWelcomeScreen(context: vscode.ExtensionContext): Promise<void> {
  const panel = vscode.window.createWebviewPanel(
    "liraWelcome",
    "Welcome to Lira Theme",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  const accentColors = Object.entries(THEME_CONFIG.accents)
    .map(([name, color]) => `<button class="accent-btn" data-accent="${name}" style="background: ${color};" title="${name}"></button>`)
    .join("");

  panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Lira Theme</title>
  <style>
    body {
      font-family: var(--vscode-font-family);
      padding: 20px 40px;
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      line-height: 1.6;
    }
    h1 { color: var(--vscode-textLink-foreground); margin-bottom: 8px; }
    h2 { margin-top: 24px; margin-bottom: 12px; font-size: 1.2em; }
    .subtitle { opacity: 0.8; margin-bottom: 24px; }
    .section { margin: 20px 0; padding: 16px; background: var(--vscode-editor-inactiveSelectionBackground); border-radius: 8px; }
    .accent-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
    .accent-btn {
      width: 32px; height: 32px; border-radius: 50%; border: 2px solid transparent;
      cursor: pointer; transition: transform 0.15s, border-color 0.15s;
    }
    .accent-btn:hover { transform: scale(1.15); border-color: var(--vscode-focusBorder); }
    .feature-list { list-style: none; padding: 0; }
    .feature-list li { padding: 6px 0; display: flex; align-items: center; gap: 8px; }
    .feature-list li::before { content: "✓"; color: var(--vscode-textLink-foreground); font-weight: bold; }
    .btn {
      padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;
      background: var(--vscode-button-background); color: var(--vscode-button-foreground);
      font-size: 13px; margin-right: 8px; margin-top: 8px;
    }
    .btn:hover { background: var(--vscode-button-hoverBackground); }
    .btn-secondary { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); }
    .tip { font-size: 12px; opacity: 0.7; margin-top: 8px; }
  </style>
</head>
<body>
  <h1>Welcome to Lira Theme</h1>
  <p class="subtitle">A beautiful, customizable dark theme for Visual Studio Code</p>

  <div class="section">
    <h2>Quick Start: Choose Your Accent Color</h2>
    <p>Click any color to instantly apply it across your editor:</p>
    <div class="accent-grid">${accentColors}</div>
    <p class="tip">Tip: You can also use the status bar button or run "Lira: Select Accent Color" from the command palette.</p>
  </div>

  <div class="section">
    <h2>Features</h2>
    <ul class="feature-list">
      <li>6 carefully crafted theme variants (Teal, Graphene, Palenight, Ocean, Deepforest, Carbon)</li>
      <li>High contrast versions for accessibility</li>
      <li>14 accent colors + custom hex color support</li>
      <li>Matching icon themes that adapt to your accent color</li>
      <li>Configurable borders, tabs, shadows, and line highlights</li>
    </ul>
  </div>

  <div class="section">
    <h2>Commands</h2>
    <p>Access these from the Command Palette (Ctrl/Cmd + Shift + P):</p>
    <ul class="feature-list">
      <li>Lira: Select Accent Color</li>
      <li>Lira: Toggle Borders</li>
      <li>Lira: Toggle Contrasted Tabs</li>
      <li>Lira: Toggle Outlined Icons</li>
    </ul>
  </div>

  <div style="margin-top: 24px;">
    <button class="btn" onclick="closeAndApply()">Get Started</button>
    <button class="btn btn-secondary" onclick="openSettings()">Open Settings</button>
  </div>

  <script>
    const vscode = acquireVsCodeApi();

    document.querySelectorAll('.accent-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        vscode.postMessage({ command: 'setAccent', accent: btn.dataset.accent });
      });
    });

    function closeAndApply() {
      vscode.postMessage({ command: 'close' });
    }

    function openSettings() {
      vscode.postMessage({ command: 'openSettings' });
    }
  </script>
</body>
</html>`;

  panel.webview.onDidReceiveMessage(async (message) => {
    switch (message.command) {
      case "setAccent":
        await updateConfiguration("accent", message.accent);
        break;
      case "openSettings":
        await vscode.commands.executeCommand("workbench.action.openSettings", "liraTheme");
        break;
      case "close":
        panel.dispose();
        break;
    }
  });

  context.subscriptions.push(panel);
}

// Main activation function
export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  // Create status bar menu (replaces old status bar item)
  const statusBarMenu = new StatusBarMenu(context);
  context.subscriptions.push(statusBarMenu.getStatusBarItem());

  // Create settings panel provider
  const settingsPanelProvider = new SettingsPanelProvider(context);

  // Register commands
  const commands = [
    vscode.commands.registerCommand(
      "liraTheme.accentPicker",
      async () => await showAccentPicker(context)
    ),
    vscode.commands.registerCommand(
      "liraTheme.openSettingsPanel",
      () => settingsPanelProvider.show()
    ),
    vscode.commands.registerCommand("liraTheme.clearAccent", clearAccent),
    vscode.commands.registerCommand("liraTheme.updateAccent", updateColorCustomizations),
    vscode.commands.registerCommand("liraTheme.showBorders", updateColorCustomizations),
    vscode.commands.registerCommand("liraTheme.showContrastedTabs", updateColorCustomizations),
    vscode.commands.registerCommand("liraTheme.useSolidLineHighlight", updateColorCustomizations),
    vscode.commands.registerCommand("liraTheme.hidesShadows", updateColorCustomizations),
    vscode.commands.registerCommand(
      "liraTheme.updateIconsAccent",
      async () => await updateIconsAccent(context)
    ),
    vscode.commands.registerCommand(
      "liraTheme.hideExplorerArrows",
      async (hide: boolean) => await hideExplorerArrows(context, hide)
    ),
    vscode.commands.registerCommand(
      "liraTheme.useOutlinedIcons",
      async (outlined: boolean) => await useOutlinedIcons(context, outlined)
    ),
    vscode.commands.registerCommand("liraTheme.showWelcome", async () => await showWelcomeScreen(context)),
  ];

  context.subscriptions.push(...commands);

  // Setup configuration change listener (StatusBarMenu handles its own updates)
  const configChangeHandler = createConfigurationChangeHandler(context);
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(configChangeHandler)
  );

  // Check for first-time install
  const currentVersion = getPackageInfo().version;
  const storedVersion = context.globalState.get<string>("liraTheme.version");
  const isFirstInstall = !storedVersion;

  // Update stored version
  await context.globalState.update("liraTheme.version", currentVersion);

  // Show welcome screen for first-time users when Lira theme is active
  if (isFirstInstall && (isLiraThemeActive() || isLiraIconThemeActive())) {
    await showWelcomeScreen(context);
  }

  // Initialize theme based on current settings (with error handling)
  try {
    if (getConfiguration("useOutlinedIcons") === true) {
      await useOutlinedIcons(context, true);
    }

    if (getConfiguration("accent")) {
      await updateIconsAccent(context);
    }

    if (getConfiguration("hidesExplorerArrows") === false) {
      await hideExplorerArrows(context, false);
    }

    // Initialize color customizations
    await initializeColorCustomizations(context);
  } catch (error) {
    console.error("Lira Theme: Failed to initialize", error);
    vscode.window.showWarningMessage("Lira Theme: Some settings could not be applied. Please try reloading the window.");
  }
}

export async function deactivate(): Promise<void> {
  // Extension cleanup if needed
}
