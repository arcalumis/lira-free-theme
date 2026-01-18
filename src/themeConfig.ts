// Shared theme configuration constants

export interface ThemeIconDefinition {
  iconPath: string;
}

export interface ThemeConfig {
  iconDefinitions: { [key: string]: ThemeIconDefinition };
  hidesExplorerArrows?: boolean;
}

export interface AccentColors {
  [key: string]: string;
}

// Folder names used for icon generation
export const FOLDER_NAMES = [
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
] as const;

export type FolderName = (typeof FOLDER_NAMES)[number];

// Main theme configuration
export const THEME_CONFIG = {
  defaultVariant: "Teal",
  defaultAccent: "Teal",
  foldersStyles: ["filled", "outlined"] as const,
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
  } as const,
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
    Nord: "#4C566A",
  } as const,
  themeIconVariants: {
    Teal: "lira-icons-teal",
    Graphene: "lira-icons-graphene",
    Palenight: "lira-icons-palenight",
    Ocean: "lira-icons-ocean",
    Carbon: "lira-icons-carbon",
    Deepforest: "lira-icons-deepforest",
    Nord: "lira-icons-nord",
  } as const,
  variantsIcons: [
    "_folder_dark",
    "_folder_light",
    "_folder_root_dark",
    "_folder_root_light",
    ...FOLDER_NAMES.map((name) => `_folder_${name}`),
  ],
} as const;

export type AccentName = keyof typeof THEME_CONFIG.accents;
export type ThemeVariant = keyof typeof THEME_CONFIG.themeIconVariants;

// Localization strings
export const STRINGS = {
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
} as const;

// Theme preview colors for the settings panel
export const THEME_PREVIEW_COLORS = {
  Teal: { bg: "#263238", sidebar: "#1E272C", accent: "#80CBC4" },
  Graphene: { bg: "#212121", sidebar: "#1A1A1A", accent: "#80CBC4" },
  Palenight: { bg: "#292D3E", sidebar: "#232635", accent: "#80CBC4" },
  Ocean: { bg: "#0F111A", sidebar: "#090B10", accent: "#80CBC4" },
  Deepforest: { bg: "#1B2B22", sidebar: "#15231B", accent: "#80CBC4" },
  Carbon: { bg: "#1C1E21", sidebar: "#16181B", accent: "#80CBC4" },
  Nord: { bg: "#2E3440", sidebar: "#3B4252", accent: "#88C0D0" },
} as const;

// Available themes
export const COLOR_THEMES = [
  { label: "Teal", id: "Lira Teal", hasHighContrast: true },
  { label: "Graphene", id: "Lira Graphene", hasHighContrast: true },
  { label: "Palenight", id: "Lira Palenight", hasHighContrast: true },
  { label: "Ocean", id: "Lira Ocean", hasHighContrast: true },
  { label: "Deepforest", id: "Lira Deepforest", hasHighContrast: true },
  { label: "Carbon", id: "Lira Carbon", hasHighContrast: true },
  { label: "Nord", id: "Lira Nord", hasHighContrast: true },
] as const;

export const ICON_THEMES = [
  { label: "Teal", id: "lira-icons-teal" },
  { label: "Graphene", id: "lira-icons-graphene" },
  { label: "Palenight", id: "lira-icons-palenight" },
  { label: "Ocean", id: "lira-icons-ocean" },
  { label: "Deepforest", id: "lira-icons-deepforest" },
  { label: "Carbon", id: "lira-icons-carbon" },
  { label: "Nord", id: "lira-icons-nord" },
] as const;
