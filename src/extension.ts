import * as vscode from "vscode";

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
    Vira: "#E9A581",
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
        ...Object.fromEntries(
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
        ),
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
    Teal: "vira-icons-teal",
    Graphene: "vira-icons-graphene",
    Palenight: "vira-icons-palenight",
    Ocean: "vira-icons-ocean",
    Carbon: "vira-icons-carbon",
    Deepforest: "vira-icons-deepforest",
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
  activateViraThemeTitle: "Activate Vira Theme",
  activateViraThemeDescription: "Activate Vira Theme",
  manageActivations: "Manage activations",
  feedbacks: {
    no_valid_color: {
      title: "Only 6 or 8 digits hex colors",
      message: "Please enter a valid 6 digits hex color",
    },
    invalidColorFormat: "Invalid hex color format",
    invalidHexAlpha: "Alpha must be between 0 and 1",
    no_accent: {
      title: "",
      message: "No vira theme accent found",
    },
    trial_activated: "Vira Theme: enjoy your 7-days trial period.",
    trial_has_expired: "Vira Theme: trial has expired.",
    active_trial: "Vira Theme: evaluation period will end in",
    activate_or_remove_message:
      "Activate your license key to continue using the extension. NOTE: if you don't activate Vira Theme, it'll be removed and you'll need to reinstall it to enter your license.",
    trial_hours_left: "hours.",
    trial_days_left: "days.",
    license_server_error: "Vira Theme: license server error.",
    license_activation_failed: "Vira Theme activation failed.",
    license_activation_success: "Vira Theme activated successfully.",
    license_no_longer_valid: "Vira Theme: license is no longer valid.",
    license_activation_too_soon:
      "Vira Theme: wait 30s before activating again.",
    no_internet_connection:
      "No internet connection. Vira Theme can't be activated.",
    empty_license:
      "You entered an empty string. Vira Theme can't be activated.",
    license_validation: "invalid format",
  },
};

// Utility Functions
function getConfiguration(key: string): any {
  return vscode.workspace.getConfiguration().get(`viraTheme.${key}`);
}

function slugify(text: string): string {
  return text.replace(/\s+/g, "-").toLowerCase();
}

function isValidHexColor(color: string): boolean {
  return /^#([0-9A-F]{6})$/i.test(color);
}

function hasConfiguration(key: string): boolean {
  return vscode.workspace.getConfiguration().has(`viraTheme.${key}`);
}

async function updateConfiguration(
  key: string,
  value: any,
  target = vscode.ConfigurationTarget.Global
): Promise<void> {
  await vscode.workspace
    .getConfiguration()
    .update(`viraTheme.${key}`, value, target);
}

async function clearConfiguration(
  keys: string[] = ["customAccent", "accent"]
): Promise<void> {
  for (const key of keys) {
    await vscode.workspace
      .getConfiguration()
      .update(`viraTheme.${key}`, undefined, true);
  }
}

// Theme File Operations
async function updateThemeFiles(
  context: vscode.ExtensionContext,
  updater: (theme: any) => any
): Promise<void> {
  const themesPath = vscode.Uri.joinPath(
    vscode.Uri.file(context.extensionPath),
    "./build/themes"
  );
  const files = await vscode.workspace.fs.readDirectory(themesPath);

  for (const [fileName] of files) {
    if (fileName.startsWith("Vira-Icons")) {
      const filePath = vscode.Uri.joinPath(themesPath, fileName);
      const fileData = await vscode.workspace.fs.readFile(filePath);
      const themeContent = new TextDecoder().decode(fileData);
      const themeObject = { ...JSON.parse(themeContent) };
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
      const iconDef = theme.iconDefinitions[iconName];
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
    "viraTheme.iconsCustomAccent"
  ) as string | null;
  let previousAccentSuffix = null;

  if (previousCustomAccent) {
    previousAccentSuffix = `.accent.${previousCustomAccent}.svg`;
  }

  for (const style of foldersStyles) {
    for (const iconName of accentableIcons) {
      const iconPath = iconDefinitions[iconName].iconPath.replace(
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
      const iconDef = theme.iconDefinitions[iconName];
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

  await context.globalState.update("viraTheme.iconsCustomAccent", customColor);
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
  const extension = vscode.extensions.getExtension("vira.vsc-vira-theme");
  if (!extension) {
    throw new Error("Extension with ID vira.vsc-vira-theme not found");
  }
  return extension.packageJSON;
}

// Theme Detection
function isViraThemeActive(): boolean {
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
  const currentTheme = vscode.workspace.getConfiguration().get(settingKey);

  return currentTheme
    ? getPackageInfo().contributes.themes.some((theme: any) =>
        currentTheme.includes(theme.label)
      )
    : false;
}

function isViraIconThemeActive(): boolean {
  const iconTheme = vscode.workspace
    .getConfiguration()
    .get("workbench.iconTheme");
  return iconTheme
    ? getPackageInfo().contributes.iconThemes.some((theme: any) =>
        iconTheme.includes(theme.id)
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
    if (colorCustomizations["[Vira*]"]?.[key]) {
      delete colorCustomizations["[Vira*]"][key];
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

// License Management Functions
async function activateLicense(licenseKey: string): Promise<any> {
  try {
    const timestamp = Date.now();
    const instanceName =
      `${vscode.env.appName}.${vscode.env.appHost}.${vscode.env.machineId}.${timestamp}`
        .replace(/\s+/g, "-")
        .toLowerCase();
    const productName = getPackageInfo().name;

    const response = await fetch("https://l.vira.build/api/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Vira-Theme": vscode.env.machineId,
      },
      body: JSON.stringify({
        license_key: licenseKey,
        instance_name: instanceName,
        product_id: productName,
      }),
    });

    if (response.status === 500) {
      return null;
    }

    const result = await response.json();
    return result.activated === undefined ? null : result;
  } catch {
    return null;
  }
}

async function validateLicense(
  licenseKey: string,
  instanceId: string
): Promise<any> {
  try {
    const response = await fetch("https://l.vira.build/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Vira-Theme": vscode.env.machineId,
      },
      body: JSON.stringify({
        license_key: licenseKey,
        instance_id: instanceId,
      }),
    });

    if (response.status === 500) {
      return null;
    }

    const result = await response.json();
    return result.validated === undefined ? null : result;
  } catch {
    return null;
  }
}

async function setTrialContext(isTrial: boolean): Promise<void> {
  await vscode.commands.executeCommand(
    "setContext",
    "viraTheme.isTrial",
    isTrial
  );
}

async function storeLicenseData(
  context: vscode.ExtensionContext,
  licenseKey: string,
  instanceId: string
): Promise<void> {
  const timestamp = Date.now();
  const encodedData = btoa(`${licenseKey}|${instanceId}|${timestamp}`);
  await context.secrets.store("viraTheme.licenseKey", encodedData);
}

async function checkInternetConnection(): Promise<boolean> {
  const testUrls = [
    "https://www.google.com/favicon.ico",
    "https://www.baidu.com/favicon.ico",
    "https://www.cloudflare.com/favicon.ico",
    "https://www.microsoft.com/favicon.ico",
    "https://www.apple.com/favicon.ico",
    "https://www.amazon.com/favicon.ico",
    "https://www.qq.com/favicon.ico",
    "https://www.weibo.com/favicon.ico",
    "https://www.jd.com/favicon.ico",
    "https://vira.build/favicon.ico",
  ];

  for (const url of testUrls) {
    try {
      await fetch(url, { method: "HEAD", mode: "no-cors" });
      return true;
    } catch {}
  }
  return false;
}

async function promptForLicenseKey(): Promise<string | undefined> {
  return await vscode.window.showInputBox({
    title: "Activate Vira Theme",
    prompt: "Activate Vira Theme",
    ignoreFocusOut: true,
    validateInput(value: string) {
      return value.length < 18 || /\s/.test(value)
        ? STRINGS.feedbacks.license_validation
        : null;
    },
  });
}

async function handleLicenseActivation(
  context: vscode.ExtensionContext,
  licenseKey: string
): Promise<boolean> {
  const result = await activateLicense(licenseKey);

  if (!result) {
    vscode.window.showErrorMessage(STRINGS.feedbacks.license_server_error);
    return false;
  }

  if (result.activated) {
    const { license_key, instance_id } = result;
    await storeLicenseData(context, license_key, instance_id);
    await setTrialContext(false);
    vscode.window.showInformationMessage(
      STRINGS.feedbacks.license_activation_success
    );
    return true;
  }

  let errorMessage = STRINGS.feedbacks.license_activation_failed;
  if (result.reason) {
    errorMessage += ` (${result.reason})`;
  }

  const action = await vscode.window.showErrorMessage(
    errorMessage,
    "Manage activations"
  );
  if (action === "Manage activations") {
    vscode.env.openExternal(
      vscode.Uri.parse("https://app.lemonsqueezy.com/my-orders")
    );
  }

  return false;
}

async function licenseInputBoxCommand(
  context: vscode.ExtensionContext
): Promise<boolean> {
  const licenseKey = await promptForLicenseKey();

  if (!licenseKey) {
    vscode.window.showWarningMessage(STRINGS.feedbacks.empty_license);
    return false;
  }

  if (!(await checkInternetConnection())) {
    vscode.window.showWarningMessage(STRINGS.feedbacks.no_internet_connection);
    return false;
  }

  const lastActivationTry = context.globalState.get(
    "viraTheme.latestActivationTry"
  ) as number | undefined;
  if (
    lastActivationTry !== undefined &&
    Date.now() - lastActivationTry < 30000
  ) {
    vscode.window.showWarningMessage(
      STRINGS.feedbacks.license_activation_too_soon
    );
    return false;
  }

  await context.globalState.update("viraTheme.latestActivationTry", Date.now());
  return await handleLicenseActivation(context, licenseKey);
}

async function uninstallExtension(): Promise<void> {
  try {
    await vscode.commands.executeCommand(
      "workbench.extensions.uninstallExtension",
      "vira.vsc-vira-theme"
    );
  } catch {}

  try {
    await vscode.commands.executeCommand(
      "_workbench.extensions.action.cleanUpExtensionsFolder"
    );
  } catch {}

  vscode.commands.executeCommand("workbench.action.reloadWindow");
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
    iconPath: new vscode.ThemeIcon("paintcan"),
  });

  accentOptions.push({
    label: "Clear accent",
    iconPath: new vscode.ThemeIcon("close"),
  });

  const selectedAccent = await vscode.window.showQuickPick(accentOptions, {
    placeHolder: STRINGS.placeholders.select_accent,
  });

  if (!selectedAccent) return;

  const existingColorCustomizations = vscode.workspace
    .getConfiguration()
    .get("workbench.colorCustomizations");
  if (!existingColorCustomizations) return;

  const { "[Vira*]": viraColors } = existingColorCustomizations as any;
  if (selectedAccent.label === "" && viraColors) return;

  if (selectedAccent.label === "Use custom accent") {
    const customColor = await promptForCustomAccent();
    if (!customColor || customColor === "") return;
    await updateConfiguration("customAccent", customColor);
  }

  if (selectedAccent.label === "Clear accent") {
    await vscode.commands.executeCommand("viraTheme.clearAccent");
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

  if (!isViraThemeActive()) {
    return;
  }

  const existingColorCustomizations = vscode.workspace
    .getConfiguration()
    .get("workbench.colorCustomizations");
  if (!existingColorCustomizations) {
    return;
  }

  const { "[Vira*]": viraColors } = existingColorCustomizations as any;
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
  } else if (accentColor) {
    selectedAccentColor = accents[accentColor];
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
    "[Vira*]": {
      ...viraColors,
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
      if (isViraThemeActive() || isViraIconThemeActive()) {
        statusBarItem.show();
      } else {
        statusBarItem.hide();
      }
    }
  };

  const updateStatusBar = () => {
    if (!statusBarItem) return;

    const accentColor = getConfiguration("accent") ?? "Teal";
    const customAccent = getConfiguration("customAccent");
    const displayText = `$(paintcan) ${
      customAccent ? "Custom accent" : accentColor
    }`;

    statusBarItem.text = displayText + " ";
    statusBarItem.color = customAccent || THEME_CONFIG.accents[accentColor];
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
  statusBarItem.command = "viraTheme.accentPicker";
  statusBarItem.color = THEME_CONFIG.accents[initialAccent];
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
      event.affectsConfiguration("viraTheme.accent") ||
      event.affectsConfiguration("viraTheme.customAccent");

    if (affectsAccent || affectsTheme || affectsIcon) {
      setTimeout(updateStatusBar, 200);
    }
  });
}

async function initializeColorCustomizations(
  context: vscode.ExtensionContext
): Promise<void> {
  const storedCustomizations = context.globalState.get(
    "viraTheme.colorCustomizations"
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
      if (!existingCustomizations) return;

      const { "[Vira*]": viraColors, ...otherColors } =
        existingCustomizations as any;
      const cleanedViraColors = viraColors ? { ...viraColors } : {};

      obsoleteKeys.forEach((key) => {
        if (cleanedViraColors[key]) {
          delete cleanedViraColors[key];
        }
      });

      const updatedCustomizations = {
        ...otherColors,
        "[Vira*]": { ...cleanedViraColors },
      };

      await updateWorkbenchColors(updatedCustomizations);
    }
  }

  await context.globalState.update(
    "viraTheme.colorCustomizations",
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

async function initializeTrial(
  context: vscode.ExtensionContext
): Promise<void> {
  if ((await context.secrets.get("viraTheme.licenseKey")) !== undefined) {
    return;
  }

  const trialActivation = await context.secrets.get(
    "viraTheme.trialActivation"
  );

  if (trialActivation === undefined) {
    const trialStart = btoa(new Date().toUTCString());
    await context.secrets.store("viraTheme.trialActivation", trialStart);
    await setTrialContext(true);
    vscode.window.showInformationMessage(STRINGS.feedbacks.trial_activated);
  } else {
    const trialStartDate = new Date(atob(trialActivation));
    const hasInternet = await checkInternetConnection();
    const trialEndDate = new Date(trialStartDate);
    trialEndDate.setDate(trialStartDate.getDate() + 7);
    const currentDate = new Date();

    if (currentDate > trialEndDate) {
      const action = await vscode.window.showInformationMessage(
        STRINGS.feedbacks.trial_has_expired,
        {
          modal: true,
          detail: STRINGS.feedbacks.activate_or_remove_message,
        },
        hasInternet ? "Activate" : ""
      );

      if (action === "Activate") {
        if (
          !(await vscode.commands.executeCommand("viraTheme.licenseInputBox"))
        ) {
          await uninstallExtension();
        }
      } else {
        await uninstallExtension();
      }
    } else {
      let trialMessage = STRINGS.feedbacks.active_trial;
      const hoursLeft = Math.ceil(
        (trialEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60)
      );
      const daysLeft = Math.ceil(hoursLeft / 24);

      if (daysLeft === 1) {
        trialMessage += ` ${hoursLeft} ${STRINGS.feedbacks.trial_hours_left}`;
      } else {
        trialMessage += ` ${daysLeft} ${STRINGS.feedbacks.trial_days_left}`;
      }

      await setTrialContext(true);
      vscode.window.showInformationMessage(trialMessage);

      setTimeout(async () => {
        await initializeTrial(context);
      }, 24 * 60 * 60 * 1000); // Check again in 24 hours
    }
  }
}

async function validateExistingLicense(
  context: vscode.ExtensionContext
): Promise<void> {
  const licenseData = await context.secrets.get("viraTheme.licenseKey");
  if (licenseData === undefined) {
    return;
  }

  const decodedData = atob(licenseData);
  const [licenseKey, instanceId, timestampStr] = decodedData.split("|");
  const licenseTimestamp = new Date(Number(timestampStr));
  const checkDate = new Date(licenseTimestamp);

  // Add random variation to check time
  const randomDays = Math.floor(Math.random() * 5);
  const randomHours = Math.floor(Math.random() * 23);
  const randomMinutes = Math.floor(Math.random() * 59);

  checkDate.setDate(licenseTimestamp.getDate() + 20 + randomDays);
  checkDate.setHours(randomHours);
  checkDate.setMinutes(randomMinutes);

  if (Date.now() > checkDate.getTime()) {
    const validateLicenseNow = async () => {
      const validationResult = await validateLicense(licenseKey, instanceId);

      if (!validationResult) {
        setTimeout(async () => {
          await validateLicenseNow();
        }, 3 * 60 * 60 * 1000); // Retry in 3 hours
        return;
      }

      if (validationResult.validated) {
        await storeLicenseData(context, licenseKey, instanceId);
      } else {
        await context.secrets.delete("viraTheme.licenseKey");
        const action = await vscode.window.showInformationMessage(
          STRINGS.feedbacks.license_no_longer_valid,
          {
            modal: true,
            detail: STRINGS.feedbacks.activate_or_remove_message,
          },
          "Activate"
        );

        if (action === "Activate") {
          if (
            !(await vscode.commands.executeCommand("viraTheme.licenseInputBox"))
          ) {
            await uninstallExtension();
          }
        } else {
          await uninstallExtension();
        }
      }
    };

    if (!(await checkInternetConnection())) {
      setTimeout(async () => {
        await validateLicenseNow();
      }, 3 * 60 * 60 * 1000); // Retry in 3 hours
      return;
    }

    await validateLicenseNow();
  }
}

function setupSecretListener(context: vscode.ExtensionContext): void {
  context.secrets.onDidChange(async (event) => {
    if (
      event.key === "viraTheme.licenseKey" &&
      (await context.secrets.get("viraTheme.licenseKey")) !== undefined
    ) {
      await setTrialContext(false);
    }
  });
}

// Configuration change handlers
async function handleAccentChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    event.affectsConfiguration("viraTheme.accent") ||
    event.affectsConfiguration("viraTheme.customAccent")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand("viraTheme.updateAccent");
      await vscode.commands.executeCommand("viraTheme.updateIconsAccent");
    }, 200);
  }
}

async function handleBordersChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    isViraThemeActive() &&
    event.affectsConfiguration("viraTheme.showBorders")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand(
        "viraTheme.showBorders",
        getConfiguration("showBorders") ?? false
      );
    }, 200);
  }
}

async function handleTabsChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    isViraThemeActive() &&
    event.affectsConfiguration("viraTheme.contrastedTabs")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand(
        "viraTheme.showContrastedTabs",
        getConfiguration("contrastedTabs") ?? false
      );
    }, 200);
  }
}

async function handleShadowsChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    isViraThemeActive() &&
    event.affectsConfiguration("viraTheme.hidesShadows")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand(
        "viraTheme.hidesShadows",
        getConfiguration("hidesShadows") ?? false
      );
    }, 200);
  }
}

async function handleLineHighlightChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    isViraThemeActive() &&
    event.affectsConfiguration("viraTheme.solidLineHighlight")
  ) {
    setTimeout(async () => {
      await vscode.commands.executeCommand(
        "viraTheme.useSolidLineHighlight",
        getConfiguration("solidLineHighlight") ?? false
      );
    }, 200);
  }
}

async function handleExplorerArrowsChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (event.affectsConfiguration("viraTheme.hidesExplorerArrows")) {
    await vscode.commands.executeCommand(
      "viraTheme.hideExplorerArrows",
      getConfiguration("hidesExplorerArrows")
    );
  }
}

async function handleIconThemeChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (
    event.affectsConfiguration("workbench.iconTheme") &&
    isViraIconThemeActive()
  ) {
    await vscode.commands.executeCommand("viraTheme.updateIconsAccent");
  }
}

async function handleOutlinedIconsChange(
  event: vscode.ConfigurationChangeEvent
): Promise<void> {
  if (event.affectsConfiguration("viraTheme.useOutlinedIcons")) {
    await vscode.commands.executeCommand(
      "viraTheme.useOutlinedIcons",
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
      "viraTheme.accentPicker",
      async () => await showAccentPicker(context)
    ),
    vscode.commands.registerCommand("viraTheme.clearAccent", clearAccent),
    vscode.commands.registerCommand(
      "viraTheme.updateAccent",
      updateColorCustomizations
    ),
    vscode.commands.registerCommand(
      "viraTheme.showBorders",
      updateColorCustomizations
    ),
    vscode.commands.registerCommand(
      "viraTheme.showContrastedTabs",
      updateColorCustomizations
    ),
    vscode.commands.registerCommand(
      "viraTheme.useSolidLineHighlight",
      updateColorCustomizations
    ),
    vscode.commands.registerCommand(
      "viraTheme.hidesShadows",
      updateColorCustomizations
    ),
    vscode.commands.registerCommand(
      "viraTheme.updateIconsAccent",
      async () => await updateIconsAccent(context)
    ),
    vscode.commands.registerCommand(
      "viraTheme.hideExplorerArrows",
      async (hide: boolean) => await hideExplorerArrows(context, hide)
    ),
    vscode.commands.registerCommand(
      "viraTheme.useOutlinedIcons",
      async (outlined: boolean) => await useOutlinedIcons(context, outlined)
    ),
    vscode.commands.registerCommand(
      "viraTheme.licenseInputBox",
      async () => await licenseInputBoxCommand(context)
    ),
  ];

  // Update version info
  context.globalState.update("viraTheme.version", getPackageInfo().version);

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
  const versionInfo = context.globalState.get("viraTheme.version");
  if (vscode.env.isNewAppInstall && versionInfo) {
    context.globalState.update(versionInfo, getPackageInfo().version);
  }

  // Initialize theme based on current settings
  if (getConfiguration("useOutlinedIcons") === true) {
    await vscode.commands.executeCommand(
      "viraTheme.useOutlinedIcons",
      getConfiguration("useOutlinedIcons")
    );
  }

  if (getConfiguration("accent")) {
    await vscode.commands.executeCommand("viraTheme.updateIconsAccent");
  }

  if (getConfiguration("hidesExplorerArrows") === false) {
    await vscode.commands.executeCommand(
      "viraTheme.hideExplorerArrows",
      getConfiguration("hidesExplorerArrows")
    );
  }

  // Initialize UI and licensing
  createStatusBarItem();
  await initializeColorCustomizations(context);
  await initializeTrial(context);
  await validateExistingLicense(context);
  setupSecretListener(context);
}

export async function deactivate(): Promise<void> {
  await setTrialContext(false);
}
