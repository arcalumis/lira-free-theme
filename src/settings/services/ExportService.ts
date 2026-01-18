import * as vscode from "vscode";
import { ExportZipOptions, LiraConfiguration, VALID_CONFIG_KEYS } from "../types";

export class ExportService {
  constructor(private readonly context: vscode.ExtensionContext) {}

  /**
   * Export icons as a ZIP file
   * Note: Full ZIP implementation requires jszip library
   */
  async exportAsZip(
    options: ExportZipOptions,
    onProgress?: (progress: number) => void
  ): Promise<void> {
    try {
      // For now, show a message that this feature requires jszip
      // In production, implement with JSZip library
      const iconsPath = vscode.Uri.joinPath(
        this.context.extensionUri,
        "src",
        "icons"
      );

      // Collect files to export
      const filesToExport: string[] = [];
      let totalFiles = 0;

      if (options.includeFileIcons) {
        const fileIconsPath = vscode.Uri.joinPath(iconsPath, "files");
        try {
          const fileIcons = await vscode.workspace.fs.readDirectory(fileIconsPath);
          const svgFiles = fileIcons.filter(([name]) => name.endsWith(".svg"));
          totalFiles += svgFiles.length;
          filesToExport.push(...svgFiles.map(([name]) => `files/${name}`));
        } catch {
          // Directory may not exist
        }
      }

      if (options.includeFolderIcons) {
        const useOutlined = vscode.workspace
          .getConfiguration("liraTheme")
          .get<boolean>("useOutlinedIcons") ?? false;
        const style = useOutlined ? "outlined" : "filled";
        const folderIconsPath = vscode.Uri.joinPath(iconsPath, "folders", style);

        try {
          const folderIcons = await vscode.workspace.fs.readDirectory(folderIconsPath);
          let svgFiles = folderIcons.filter(([name]) => name.endsWith(".svg"));

          if (!options.includeAccentVariants) {
            // Filter out accent variants
            svgFiles = svgFiles.filter(
              ([name]) => !name.includes(".accent.") && !name.includes(".variant.")
            );
          }

          totalFiles += svgFiles.length;
          filesToExport.push(...svgFiles.map(([name]) => `folders/${style}/${name}`));
        } catch {
          // Directory may not exist
        }
      }

      onProgress?.(10);

      // Show save dialog
      const saveUri = await vscode.window.showSaveDialog({
        defaultUri: vscode.Uri.file("lira-icons-export.zip"),
        filters: { "ZIP files": ["zip"] },
        saveLabel: "Export",
        title: "Export Lira Icons",
      });

      if (!saveUri) {
        return; // User cancelled
      }

      onProgress?.(20);

      // Create a simple manifest instead of actual ZIP (jszip required for real ZIP)
      const manifest = {
        exportedAt: new Date().toISOString(),
        totalFiles,
        options,
        files: filesToExport,
        note: "Full ZIP export requires jszip library. Install with: npm install jszip",
      };

      // For now, save as JSON manifest
      // In production with jszip: create actual ZIP
      const manifestPath = saveUri.fsPath.replace(".zip", "-manifest.json");
      const manifestUri = vscode.Uri.file(manifestPath);
      const content = new TextEncoder().encode(JSON.stringify(manifest, null, 2));
      await vscode.workspace.fs.writeFile(manifestUri, content);

      onProgress?.(100);

      const installJszip = "Install jszip";
      const result = await vscode.window.showInformationMessage(
        `Icon manifest saved! Found ${totalFiles} icons. For actual ZIP export, install jszip dependency.`,
        installJszip
      );

      if (result === installJszip) {
        vscode.env.openExternal(vscode.Uri.parse("https://www.npmjs.com/package/jszip"));
      }
    } catch (error) {
      throw new Error(`Failed to export icons: ${error}`);
    }
  }

  /**
   * Export current configuration as JSON
   */
  async exportAsJson(): Promise<void> {
    const config = this.getCurrentConfiguration();
    const jsonContent = JSON.stringify(config, null, 2);

    const saveUri = await vscode.window.showSaveDialog({
      defaultUri: vscode.Uri.file("lira-theme-config.json"),
      filters: { "JSON files": ["json"] },
      saveLabel: "Export",
      title: "Export Lira Configuration",
    });

    if (saveUri) {
      const content = new TextEncoder().encode(jsonContent);
      await vscode.workspace.fs.writeFile(saveUri, content);
      vscode.window.showInformationMessage(
        `Configuration exported to ${saveUri.fsPath}`
      );
    }
  }

  /**
   * Copy configuration to clipboard
   */
  async copyConfigToClipboard(): Promise<void> {
    const config = this.getCurrentConfiguration();
    const jsonContent = JSON.stringify(config, null, 2);
    await vscode.env.clipboard.writeText(jsonContent);
    vscode.window.showInformationMessage("Configuration copied to clipboard");
  }

  /**
   * Import configuration from JSON object
   */
  async importConfiguration(config: Record<string, unknown>): Promise<void> {
    const validatedConfig: Partial<LiraConfiguration> = {};

    // Validate and filter config
    for (const key of VALID_CONFIG_KEYS) {
      if (key in config && config[key] !== undefined) {
        validatedConfig[key] = config[key] as any;
      }
    }

    if (Object.keys(validatedConfig).length === 0) {
      throw new Error("No valid configuration keys found in the imported file");
    }

    // Apply each setting
    for (const [key, value] of Object.entries(validatedConfig)) {
      await vscode.workspace.getConfiguration().update(
        `liraTheme.${key}`,
        value,
        vscode.ConfigurationTarget.Global
      );
    }

    vscode.window.showInformationMessage(
      `Imported ${Object.keys(validatedConfig).length} settings successfully`
    );
  }

  /**
   * Get current configuration for export
   */
  private getCurrentConfiguration(): LiraConfiguration {
    const config = vscode.workspace.getConfiguration("liraTheme");
    return {
      accent: config.get("accent"),
      customAccent: config.get("customAccent"),
      useOutlinedIcons: config.get("useOutlinedIcons"),
      hidesExplorerArrows: config.get("hidesExplorerArrows"),
      showBorders: config.get("showBorders"),
      contrastedTabs: config.get("contrastedTabs"),
      solidLineHighlight: config.get("solidLineHighlight"),
      hidesShadows: config.get("hidesShadows"),
      exportedAt: new Date().toISOString(),
      version: this.getExtensionVersion(),
    };
  }

  /**
   * Get extension version
   */
  private getExtensionVersion(): string {
    const extension = vscode.extensions.getExtension("Lirasoft.lira-free-theme");
    return extension?.packageJSON?.version || "unknown";
  }
}
