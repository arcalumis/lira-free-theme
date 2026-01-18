// Type definitions for settings panel

export type MessageCommand =
  // Theme commands
  | "setColorTheme"
  | "setIconTheme"
  | "toggleHighContrast"
  // Color commands
  | "setAccent"
  | "setCustomAccent"
  | "clearCustomAccent"
  // Icon/UI commands
  | "setIconStyle"
  | "toggleSetting"
  // Export commands
  | "exportAsZip"
  | "exportAsJson"
  | "importConfig"
  | "copyConfig"
  // Response commands (extension -> webview)
  | "exportProgress"
  | "exportComplete"
  | "exportError"
  | "importSuccess"
  | "importError"
  | "configData";

export interface WebviewMessage {
  command: MessageCommand;
  [key: string]: unknown;
}

export interface ThemeMessage extends WebviewMessage {
  command: "setColorTheme" | "setIconTheme";
  themeId: string;
}

export interface HighContrastMessage extends WebviewMessage {
  command: "toggleHighContrast";
  enabled: boolean;
}

export interface AccentMessage extends WebviewMessage {
  command: "setAccent";
  accentName: string;
}

export interface CustomAccentMessage extends WebviewMessage {
  command: "setCustomAccent";
  hexColor: string;
}

export interface IconStyleMessage extends WebviewMessage {
  command: "setIconStyle";
  outlined: boolean;
}

export interface ToggleSettingMessage extends WebviewMessage {
  command: "toggleSetting";
  setting: string;
  value: boolean;
}

export interface ExportZipMessage extends WebviewMessage {
  command: "exportAsZip";
  options: ExportZipOptions;
}

export interface ExportZipOptions {
  includeFileIcons: boolean;
  includeFolderIcons: boolean;
  includeAccentVariants: boolean;
}

export interface ImportConfigMessage extends WebviewMessage {
  command: "importConfig";
  config: Record<string, unknown>;
}

export interface ExportProgressMessage extends WebviewMessage {
  command: "exportProgress";
  progress: number;
}

export interface ExportCompleteMessage extends WebviewMessage {
  command: "exportComplete";
}

export interface ExportErrorMessage extends WebviewMessage {
  command: "exportError";
  error: string;
}

export interface ImportSuccessMessage extends WebviewMessage {
  command: "importSuccess";
}

export interface ImportErrorMessage extends WebviewMessage {
  command: "importError";
  error: string;
}

// Configuration that can be exported/imported
export interface LiraConfiguration {
  accent?: string;
  customAccent?: string;
  useOutlinedIcons?: boolean;
  hidesExplorerArrows?: boolean;
  showBorders?: boolean;
  contrastedTabs?: boolean;
  solidLineHighlight?: boolean;
  hidesShadows?: boolean;
  exportedAt?: string;
  version?: string;
}

// Valid configuration keys for import validation
export const VALID_CONFIG_KEYS: (keyof LiraConfiguration)[] = [
  "accent",
  "customAccent",
  "useOutlinedIcons",
  "hidesExplorerArrows",
  "showBorders",
  "contrastedTabs",
  "solidLineHighlight",
  "hidesShadows",
];

// Status bar menu option
export interface StatusBarMenuOption {
  label: string;
  description?: string;
  command: string;
  iconId?: string;
}
