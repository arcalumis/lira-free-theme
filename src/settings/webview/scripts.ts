// Client-side JavaScript for the settings panel webview

export function getScripts(): string {
  return `
    const vscode = acquireVsCodeApi();

    // ==================== Tab Navigation ====================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        // Update buttons
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Update panels
        tabPanels.forEach(panel => {
          panel.classList.remove('active');
          panel.hidden = true;
        });

        const targetPanel = document.getElementById(targetTab + '-tab');
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.hidden = false;
        }

        // Save state
        vscode.setState({ ...vscode.getState(), activeTab: targetTab });
      });
    });

    // Restore state on load
    const previousState = vscode.getState();
    if (previousState?.activeTab) {
      const btn = document.querySelector('[data-tab="' + previousState.activeTab + '"]');
      if (btn) btn.click();
    }

    // ==================== Utility Functions ====================
    function sendMessage(command, data = {}) {
      vscode.postMessage({ command, ...data });
    }

    function updatePreviewColor(color) {
      document.documentElement.style.setProperty('--preview-accent', color);
      const previewBtn = document.querySelector('.preview-button');
      const previewLink = document.querySelector('.preview-link');
      const previewBadge = document.querySelector('.preview-badge');
      if (previewBtn) previewBtn.style.background = color;
      if (previewLink) previewLink.style.color = color;
      if (previewBadge) previewBadge.style.background = color;
    }

    // ==================== Theme Functions ====================
    function setColorTheme(themeId) {
      sendMessage('setColorTheme', { themeId });
      // Update UI
      document.querySelectorAll('.theme-card').forEach(card => {
        const isActive = card.dataset.theme === themeId ||
                        card.dataset.theme + ' High Contrast' === themeId;
        card.classList.toggle('active', isActive);
        const indicator = card.querySelector('.active-indicator');
        if (indicator) indicator.textContent = isActive ? 'Active' : '';
      });
    }

    function setIconTheme(themeId) {
      sendMessage('setIconTheme', { themeId });
      // Update UI
      document.querySelectorAll('.icon-theme-card').forEach(card => {
        card.classList.toggle('active', card.dataset.theme === themeId);
      });
    }

    function toggleHighContrast(enabled) {
      sendMessage('toggleHighContrast', { enabled });
    }

    // ==================== Color Functions ====================
    function setAccent(accentName) {
      sendMessage('setAccent', { accentName });
      // Update UI immediately
      document.querySelectorAll('.accent-btn').forEach(btn => {
        const isActive = btn.dataset.accent === accentName;
        btn.classList.toggle('active', isActive);
        btn.innerHTML = isActive ? '<span class="check-icon">&#10003;</span>' : '';
      });
      // Clear custom accent input
      const hexInput = document.getElementById('hex-input');
      if (hexInput) hexInput.value = '';
    }

    function applyCustomAccent() {
      const hexInput = document.getElementById('hex-input');
      if (!hexInput) return;

      const value = hexInput.value.trim();
      if (/^#([0-9A-Fa-f]{6})$/i.test(value)) {
        sendMessage('setCustomAccent', { hexColor: value });
        // Remove active state from preset buttons
        document.querySelectorAll('.accent-btn').forEach(btn => {
          btn.classList.remove('active');
          btn.innerHTML = '';
        });
        updatePreviewColor(value);
      } else {
        alert('Please enter a valid 6-digit hex color (e.g., #FF5722)');
      }
    }

    function updateCustomAccent(value) {
      const hexInput = document.getElementById('hex-input');
      if (hexInput) hexInput.value = value;
      if (/^#([0-9A-Fa-f]{6})$/i.test(value)) {
        updatePreviewColor(value);
      }
    }

    function validateHexInput(input) {
      let value = input.value.trim();
      // Auto-add # if missing
      if (value && !value.startsWith('#')) {
        value = '#' + value;
        input.value = value;
      }
      // Update preview if valid
      if (/^#([0-9A-Fa-f]{6})$/i.test(value)) {
        updatePreviewColor(value);
      }
    }

    function clearCustomAccent() {
      sendMessage('clearCustomAccent');
      const hexInput = document.getElementById('hex-input');
      if (hexInput) hexInput.value = '';
    }

    // ==================== Icon Functions ====================
    function setIconStyle(outlined) {
      sendMessage('setIconStyle', { outlined });
      document.querySelectorAll('.style-option').forEach((opt, i) => {
        opt.classList.toggle('active', (i === 1) === outlined);
      });
    }

    function toggleSetting(setting, value) {
      sendMessage('toggleSetting', { setting, value });
    }

    // ==================== Export Functions ====================
    function exportAsZip() {
      const options = {
        includeFileIcons: document.getElementById('include-file-icons')?.checked ?? true,
        includeFolderIcons: document.getElementById('include-folder-icons')?.checked ?? true,
        includeAccentVariants: document.getElementById('include-accent-variants')?.checked ?? false,
      };
      sendMessage('exportAsZip', { options });
      updateExportStatus('zip-export-status', 'Preparing export...', '');
    }

    function exportAsJson() {
      sendMessage('exportAsJson');
    }

    function copyConfig() {
      sendMessage('copyConfig');
    }

    function updateExportStatus(elementId, message, className) {
      const el = document.getElementById(elementId);
      if (el) {
        el.textContent = message;
        el.className = 'export-note ' + className;
      }
    }

    // ==================== Import Functions ====================
    function handleFileImport(input) {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          sendMessage('importConfig', { config });
        } catch (err) {
          updateImportStatus('Error: Invalid JSON file', 'error');
        }
      };
      reader.onerror = () => {
        updateImportStatus('Error: Could not read file', 'error');
      };
      reader.readAsText(file);
    }

    function updateImportStatus(message, className) {
      const el = document.getElementById('import-status');
      if (el) {
        el.textContent = message;
        el.className = 'import-status ' + className;
      }
    }

    // Drag and drop support
    const dropZone = document.getElementById('drop-zone');
    if (dropZone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.add('drag-over');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.remove('drag-over');
        });
      });

      dropZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer?.files?.[0];
        if (file && file.name.endsWith('.json')) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            try {
              const config = JSON.parse(evt.target.result);
              sendMessage('importConfig', { config });
            } catch (err) {
              updateImportStatus('Error: Invalid JSON file', 'error');
            }
          };
          reader.readAsText(file);
        } else {
          updateImportStatus('Error: Please drop a JSON file', 'error');
        }
      });
    }

    // ==================== Message Handler ====================
    window.addEventListener('message', event => {
      const message = event.data;
      switch (message.command) {
        case 'exportProgress':
          updateExportStatus('zip-export-status', 'Exporting... ' + message.progress + '%', '');
          break;
        case 'exportComplete':
          updateExportStatus('zip-export-status', 'Export complete! File saved.', 'success');
          break;
        case 'exportError':
          updateExportStatus('zip-export-status', 'Export failed: ' + message.error, 'error');
          break;
        case 'importSuccess':
          updateImportStatus('Configuration imported successfully!', 'success');
          // Refresh the page to show new values
          setTimeout(() => location.reload(), 500);
          break;
        case 'importError':
          updateImportStatus('Import failed: ' + message.error, 'error');
          break;
      }
    });

    // ==================== Keyboard Navigation ====================
    document.addEventListener('keydown', (e) => {
      // Enter key on accent buttons
      if (e.key === 'Enter' && e.target.classList.contains('accent-btn')) {
        e.target.click();
      }
      // Enter key on hex input
      if (e.key === 'Enter' && e.target.id === 'hex-input') {
        applyCustomAccent();
      }
    });

    // ==================== Expose Functions to Window ====================
    // Required for inline onclick handlers in HTML
    window.setColorTheme = setColorTheme;
    window.setIconTheme = setIconTheme;
    window.toggleHighContrast = toggleHighContrast;
    window.setAccent = setAccent;
    window.applyCustomAccent = applyCustomAccent;
    window.updateCustomAccent = updateCustomAccent;
    window.validateHexInput = validateHexInput;
    window.clearCustomAccent = clearCustomAccent;
    window.setIconStyle = setIconStyle;
    window.toggleSetting = toggleSetting;
    window.exportAsZip = exportAsZip;
    window.exportAsJson = exportAsJson;
    window.copyConfig = copyConfig;
    window.handleFileImport = handleFileImport;
  `;
}
