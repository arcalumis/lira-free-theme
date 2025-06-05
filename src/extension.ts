import * as vscode from "vscode";

// Type definitions
interface AccentOption {
  label: string;
  picked?: boolean;
  iconPath: vscode.Uri | vscode.ThemeIcon;
}

interface ThemeIconDefinition {
  iconPath: string;
}

interface ThemeConfig {
  iconDefinitions: { [key: string]: ThemeIconDefinition };
  hidesExplorerArrows?: boolean;
}

interface AccentColors {
  [key: string]: string;
}

// Theme Configuration
const FOLDER_NAMES = [
  "vscode",
  "gulp",
  "node",
  "images",
  "js",
  "css",
  "sass",
  "src",
  "assets",
  "git",
  "github",
  "test",
  "dist",
  "ci",
  "nginx",
  "types",
  "docs",
  "scripts",
  "changesets",
  "storybook",
  "jest",
  "locales",
  "husky",
  "turbo",
  "app",
  "next",
  "netlify",
  "server",
  "public",
  "gitlab",
  "api",
  "config",
  "webpack",
  "log",
  "components",
  "packages",
  "intellij",
  "nuxt",
  "decorators",
  "svg",
  "wordpress",
  "fonts",
];

const THEME_CONFIG = {
  defaultVariant: "Teal",
  defaultAccent: "Teal",
  foldersStyles: ["filled", "outlined"],
  accents: {
    Teal: "#80CBC4",
    Coral: "#E9A581",
    White: "#FFFFFF",
    Tomato: "#F85044",
    Orange: "#FF7042",
    Yellow: "#FFCF3D",
    "Acid Lime": "#C6FF00",
    Lime: "#39EA5F",
    "Bright Teal": "#64FFDA",
    Cyan: "#57D7FF",
    Blue: "#5393FF",
    Indigo: "#758AFF",
    Purple: "#B54DFF",
    Pink: "#FF669E",
  },
  colorCustomizations: {
    accentForegrounds: [
      "activityBarBadge.foreground",
      "button.foreground",
      "statusBarItem.remoteHoverForeground",
    ],
    shadowProperties: {
      "widget.shadow": { value: "#000000", alpha: 0 },
      "scrollbar.shadow": { value: "#000000", alpha: 0 },
    },
    lineHighlightProperties: {
      "editor.lineHighlightBackground": { value: "#ffffff", alpha: 0.06 },
      "editor.lineHighlightBorder": { value: "#ffffff", alpha: 0 },
    },
    contrastedTabsProperties: {
      "editorGroupHeader.tabsBackground": { value: "#ffffff", alpha: 0.04 },
      "tab.border": { value: "#ffffff", alpha: 0.005 },
      "tab.inactiveBackground": { value: "#ffffff", alpha: 0.005 },
    },
    bordersProperties: {
      "titleBar.border": { value: "#ffffff", alpha: 0.06 },
      "statusBar.border": { value: "#ffffff", alpha: 0.06 },
      "sideBar.border": { value: "#ffffff", alpha: 0.06 },
      "sideBarSectionHeader.border": { value: "#ffffff", alpha: 0.06 },
      "panel.border": { value: "#ffffff", alpha: 0.06 },
      "activityBar.border": { value: "#ffffff", alpha: 0.06 },
      "sideBarActivityBarTop.border": { value: "#ffffff", alpha: 0.06 },
      "sideBarStickyScroll.border": { value: "#ffffff", alpha: 0.08 },
    },
    accentsProperties: {
      "toolbar.activeBackground": { alpha: 0.15 },
      "button.background": { alpha: 1 },
      "button.hoverBackground": { alpha: 0.8 },
      "extensionButton.separator": { alpha: 0.2 },
      "extensionButton.background": { alpha: 0.08 },
      "extensionButton.foreground": { alpha: 1 },
      "extensionButton.hoverBackground": { alpha: 0.2 },
      "extensionButton.prominentForeground": { alpha: 1 },
      "extensionButton.prominentBackground": { alpha: 0.08 },
      "extensionButton.prominentHoverBackground": { alpha: 0.2 },
      "activityBarBadge.background": { alpha: 1 },
      "activityBar.activeBorder": { alpha: 1 },
      "activityBarTop.activeBorder": { alpha: 1 },
      "list.inactiveSelectionIconForeground": { alpha: 1 },
      "list.activeSelectionForeground": { alpha: 1 },
      "list.inactiveSelectionForeground": { alpha: 1 },
      "list.highlightForeground": { alpha: 1 },
      "sash.hoverBorder": { alpha: 0.5 },
      "list.activeSelectionIconForeground": { alpha: 1 },
      "scrollbarSlider.activeBackground": { alpha: 0.5 },
      "editorSuggestWidget.highlightForeground": { alpha: 1 },
      "textLink.foreground": { alpha: 1 },
      "progressBar.background": { alpha: 1 },
      "pickerGroup.foreground": { alpha: 1 },
      "tab.activeBorder": { alpha: 1 },
      "notificationLink.foreground": { alpha: 1 },
      "editorWidget.resizeBorder": { alpha: 1 },
      "editorWidget.border": { alpha: 1 },
      "settings.modifiedItemIndicator": { alpha: 1 },
      "panelTitle.activeBorder": { alpha: 1 },
      "breadcrumb.activeSelectionForeground": { alpha: 1 },
      "menu.selectionForeground": { alpha: 1 },
      "menubar.selectionForeground": { alpha: 1 },
      "editor.findMatchBorder": { alpha: 1 },
      "selection.background": { alpha: 0.25 },
      "statusBarItem.remoteBackground": { alpha: 0.08 },
      "statusBarItem.remoteHoverBackground": { alpha: 1 },
      "statusBarItem.remoteForeground": { alpha: 1 },
      "notebook.inactiveFocusedCellBorder": { alpha: 0.5 },
      "commandCenter.activeBorder": { alpha: 0.5 },
      "chat.slashCommandForeground": { alpha: 1 },
      "chat.avatarForeground": { alpha: 1 },
    },
  },
  accentableIcons: [
    "_folder_open",
    ...FOLDER_NAMES.map((name) => `_folder_${name}_open`),
  ],
  icons: {
    theme: {
      iconDefinitions: {
        _folder_dark: { iconPath: "../icons/folders/filled/folder_dark.svg" },
        _folder_light: { iconPath: "../icons/folders/filled/folder_light.svg" },
        _folder_root_dark: {
          iconPath: "../icons/folders/filled/folder_root_dark.svg",
        },
        _folder_root_light: {
          iconPath: "../icons/folders/filled/folder_root_light.svg",
        },
        _folder_open: { iconPath: "../icons/folders/filled/folder_open.svg" },
        _folder_root_open: {
          iconPath: "../icons/folders/filled/folder_root_open.svg",
        },
        ...(Object.fromEntries(
          FOLDER_NAMES.flatMap((name) => [
            [
              `_folder_${name}`,
              { iconPath: `../icons/folders/filled/folder_${name}.svg` },
            ],
            [
              `_folder_${name}_open`,
              { iconPath: `../icons/folders/filled/folder_${name}_open.svg` },
            ],
          ])
        ) as { [key: string]: ThemeIconDefinition }),
      },
    },
  },
  variantsIconsColors: {
    Teal: "#4A616C",
    Graphene: "#636363",
    Palenight: "#686F93",
    Ocean: "#373C4E",
    Carbon: "#303236",
    Deepforest: "#2E483C",
  },
  themeIconVariants: {
    Teal: "lira-icons-teal",
    Graphene: "lira-icons-graphene",
    Palenight: "lira-icons-palenight",
    Ocean: "lira-icons-ocean",
    Carbon: "lira-icons-carbon",
    Deepforest: "lira-icons-deepforest",
  },
  variantsIcons: [
    "_folder_dark",
    "_folder_light",
    "_folder_root_dark",
    "_folder_root_light",
    ...FOLDER_NAMES.map((name) => `_folder_${name}`),
  ],
};

// Localization strings
const STRINGS = {
  clear_accent: "Clear accent",
  use_custom_accent: "Use custom accent",
  activate: "Activate",
  placeholders: {
    enter_custom_accent: "Enter custom 6-digits HEX color",
    select_accent: "Select the accent color to use",
  },
  accentButtonTooltip: "Set the accent color",
  feedbacks: {
    no_valid_color: {
      title: "Only 6 or 8 digits hex colors",
      message: "Please enter a valid 6 digits hex color",
    },
    invalidColorFormat: "Invalid hex color format",
    invalidHexAlpha: "Alpha must be between 0 and 1",
    no_accent: {
      title: "",
      message: "No accent found",
    },
  },
};

// Utility Functions
function getConfiguration(key: string): any {
  return vscode.workspace.getConfiguration().get(`liraTheme.${key}`);
}

function slugify(text: string): string {
  return text.replace(/\s+/g, "-").toLowerCase();
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
    "./build/themes"
  );
  const files = await vscode.workspace.fs.readDirectory(themesPath);

  for (const [fileName] of files) {
    if (fileName.startsWith("Lira-Icons")) {
      const filePath = vscode.Uri.joinPath(themesPath, fileName);
      const fileData = await vscode.workspace.fs.readFile(filePath);
      const themeContent = new TextDecoder().decode(fileData);
      const themeObject = { ...JSON.parse(themeContent) } as ThemeConfig;
      const updatedTheme = updater(themeObject);
      const updatedData = new TextEncoder().encode(
        JSON.stringify(updatedTheme)
      );
      await vscode.workspace.fs.writeFile(filePath, updatedData);
    }
  }
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
    "./build/themes"
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
  const extension = vscode.extensions.getExtension("lira.lira-free-theme");
  if (!extension) {
    throw new Error("Extension with ID lira.lira-free-theme not found");
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
      "./build",
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

function createStatusBarItem(): void {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    -9999
  );

  const updateVisibility = () => {
    if (statusBarItem) {
      if (isLiraThemeActive() || isLiraIconThemeActive()) {
        statusBarItem.show();
      } else {
        statusBarItem.hide();
      }
    }
  };

  const updateStatusBar = () => {
    if (!statusBarItem) {
      return;
    }

    const accentColor = getConfiguration("accent") ?? "Teal";
    const customAccent = getConfiguration("customAccent");
    const displayText = `$(paintcan) ${
      customAccent ? "Custom accent" : accentColor
    }`;

    statusBarItem.text = displayText + " ";
    statusBarItem.color =
      customAccent ||
      THEME_CONFIG.accents[accentColor as keyof typeof THEME_CONFIG.accents] ||
      THEME_CONFIG.accents.Teal;
    updateVisibility();

    setTimeout(() => {
      if (statusBarItem) {
        statusBarItem.text = displayText;
      }
    }, 0);
  };

  const initialAccent = getConfiguration("accent") ?? "Teal";
  statusBarItem.text = `$(paintcan) ${initialAccent}`;
  statusBarItem.tooltip = "Set the accent color";
  statusBarItem.command = "liraTheme.accentPicker";
  statusBarItem.color =
    THEME_CONFIG.accents[initialAccent as keyof typeof THEME_CONFIG.accents] ||
    THEME_CONFIG.accents.Teal;
  updateVisibility();

  vscode.workspace.onDidChangeConfiguration((event) => {
    const affectsTheme = [
      "workbench.colorTheme",
      "workbench.preferredLightColorTheme",
      "workbench.preferredDarkColorTheme",
      "workbench.preferredHighContrastColorTheme",
      "workbench.preferredHighContrastLightColorTheme",
      "window.autoDetectColorScheme",
    ].some((setting) => event.affectsConfiguration(setting));

    const affectsIcon = event.affectsConfiguration("workbench.iconTheme");
    const affectsAccent =
      event.affectsConfiguration("liraTheme.accent") ||
      event.affectsConfiguration("liraTheme.customAccent");

    if (affectsAccent || affectsTheme || affectsIcon) {
      setTimeout(updateStatusBar, 200);
    }
  });
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

// Configuration change handlers
async function handleAccentChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    event.affectsConfiguration("liraTheme.accent") ||
    event.affectsConfiguration("liraTheme.customAccent")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand("liraTheme.updateAccent");
      await vscode.commands.executeCommand("liraTheme.updateIconsAccent");
    }, 200);
  }
}

async function handleBordersChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    isLiraThemeActive() &&
    event.affectsConfiguration("liraTheme.showBorders")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand(
        "liraTheme.showBorders",
        getConfiguration("showBorders") ?? false
      );
    }, 200);
  }
}

async function handleTabsChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    isLiraThemeActive() &&
    event.affectsConfiguration("liraTheme.contrastedTabs")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand(
        "liraTheme.showContrastedTabs",
        getConfiguration("contrastedTabs") ?? false
      );
    }, 200);
  }
}

async function handleShadowsChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    isLiraThemeActive() &&
    event.affectsConfiguration("liraTheme.hidesShadows")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand(
        "liraTheme.hidesShadows",
        getConfiguration("hidesShadows") ?? false
      );
    }, 200);
  }
}

async function handleLineHighlightChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    isLiraThemeActive() &&
    event.affectsConfiguration("liraTheme.solidLineHighlight")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand(
        "liraTheme.useSolidLineHighlight",
        getConfiguration("solidLineHighlight") ?? false
      );
    }, 200);
  }
}

async function handleExplorerArrowsChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (event.affectsConfiguration("liraTheme.hidesExplorerArrows")) {
    await vscode.commands.executeCommand(
      "liraTheme.hideExplorerArrows",
      getConfiguration("hidesExplorerArrows")
    );
  }
}

async function handleIconThemeChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    event.affectsConfiguration("workbench.iconTheme") &&
    isLiraIconThemeActive()
  ) {
    await vscode.commands.executeCommand("liraTheme.updateIconsAccent");
  }
}

async function handleOutlinedIconsChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (event.affectsConfiguration("liraTheme.useOutlinedIcons")) {
    await vscode.commands.executeCommand(
      "liraTheme.useOutlinedIcons",
      getConfiguration("useOutlinedIcons")
    );
  }
}

// Main activation function
export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  // Register commands
  const commands = [
    vscode.commands.registerCommand(
      "liraTheme.accentPicker",
      async () => await showAccentPicker(context)
    ),
    vscode.commands.registerCommand("liraTheme.clearAccent", clearAccent),
    vscode.commands.registerCommand(
      "liraTheme.updateAccent",
      updateColorCustomizations
    ),
    vscode.commands.registerCommand(
      "liraTheme.showBorders",
      updateColorCustomizations
    ),
    vscode.commands.registerCommand(
      "liraTheme.showContrastedTabs",
      updateColorCustomizations
    ),
    vscode.commands.registerCommand(
      "liraTheme.useSolidLineHighlight",
      updateColorCustomizations
    ),
    vscode.commands.registerCommand(
      "liraTheme.hidesShadows",
      updateColorCustomizations
    ),
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
  ];

  // Update version info
  context.globalState.update("liraTheme.version", getPackageInfo().version);

  // Setup configuration change listeners
  const configurationListeners = [
    vscode.workspace.onDidChangeConfiguration(handleAccentChange),
    vscode.workspace.onDidChangeConfiguration(handleBordersChange),
    vscode.workspace.onDidChangeConfiguration(handleTabsChange),
    vscode.workspace.onDidChangeConfiguration(handleShadowsChange),
    vscode.workspace.onDidChangeConfiguration(handleLineHighlightChange),
    vscode.workspace.onDidChangeConfiguration(handleExplorerArrowsChange),
    vscode.workspace.onDidChangeConfiguration(handleIconThemeChange),
    vscode.workspace.onDidChangeConfiguration(handleOutlinedIconsChange),
  ];

  // Subscribe to events
  context.subscriptions.push(...commands, ...configurationListeners);

  // Handle new app install
  const versionInfo = context.globalState.get("liraTheme.version");
  if (vscode.env.isNewAppInstall && versionInfo) {
    context.globalState.update("liraTheme.version", getPackageInfo().version);
  }

  // Initialize theme based on current settings
  if (getConfiguration("useOutlinedIcons") === true) {
    await vscode.commands.executeCommand(
      "liraTheme.useOutlinedIcons",
      getConfiguration("useOutlinedIcons")
    );
  }

  if (getConfiguration("accent")) {
    await vscode.commands.executeCommand("liraTheme.updateIconsAccent");
  }

  if (getConfiguration("hidesExplorerArrows") === false) {
    await vscode.commands.executeCommand(
      "liraTheme.hideExplorerArrows",
      getConfiguration("hidesExplorerArrows")
    );
  }

  // Initialize UI
  createStatusBarItem();
  await initializeColorCustomizations(context);
}

export async function deactivate(): Promise<void> {
  // Extension cleanup if needed
}
