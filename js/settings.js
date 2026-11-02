(function () {
  "use strict";

  const THEME_STORAGE_KEY = "beacon-hub-theme";
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const THEME_MESSAGE_KEYS = {
    [LIGHT_THEME]: "theme.status.light",
    [DARK_THEME]: "theme.status.dark",
  };
  const THEME_MESSAGE_FALLBACKS = {
    [LIGHT_THEME]: "Switched to light mode.",
    [DARK_THEME]: "Dark mode enabled.",
  };
  const root = document.documentElement;
  const systemThemeQuery = window.matchMedia("(prefers-color-scheme: light)");

  function getStoredTheme() {
    try {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      return storedTheme === LIGHT_THEME || storedTheme === DARK_THEME ? storedTheme : null;
    } catch {
      return null;
    }
  }

  function getPreferredTheme() {
    return getStoredTheme() || (systemThemeQuery.matches ? LIGHT_THEME : DARK_THEME);
  }

  function getThemeMessage(theme) {
    if (window.BeaconI18n && typeof window.BeaconI18n.translate === "function") {
      return window.BeaconI18n.translate(THEME_MESSAGE_KEYS[theme]);
    }

    return THEME_MESSAGE_FALLBACKS[theme];
  }

  function setDocumentTheme(theme) {
    root.dataset.theme = theme;
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      return;
    }
  }

  setDocumentTheme(getPreferredTheme());

  function initializeSettingsDialog() {
    const settingsButton = document.getElementById("settings-button");
    const dialog = document.getElementById("settings-dialog");
    const closeButton = document.getElementById("settings-close-button");
    const themeToggle = document.getElementById("theme-toggle");
    const themeStatus = document.getElementById("theme-status");

    if (!settingsButton || !dialog || !closeButton || !themeToggle || !themeStatus) {
      return;
    }

    function updateTheme(theme, shouldStore, shouldAnnounce) {
      setDocumentTheme(theme);
      themeToggle.setAttribute("aria-pressed", String(theme === DARK_THEME));

      if (shouldStore) {
        storeTheme(theme);
      }

      if (shouldAnnounce) {
        themeStatus.textContent = getThemeMessage(theme);
      }
    }

    updateTheme(root.dataset.theme === LIGHT_THEME ? LIGHT_THEME : DARK_THEME, false, false);

    document.addEventListener("beacon:languagechange", () => {
      themeStatus.textContent = "";
    });

    settingsButton.addEventListener("click", () => {
      dialog.showModal();
      settingsButton.setAttribute("aria-expanded", "true");
      themeToggle.focus();
    });

    closeButton.addEventListener("click", () => {
      dialog.close();
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = dialog.querySelectorAll(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    });

    dialog.addEventListener("close", () => {
      settingsButton.setAttribute("aria-expanded", "false");
      settingsButton.focus();
    });

    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) {
        return;
      }

      const dialogBounds = dialog.getBoundingClientRect();
      const clickedOutsideDialog =
        event.clientX < dialogBounds.left ||
        event.clientX > dialogBounds.right ||
        event.clientY < dialogBounds.top ||
        event.clientY > dialogBounds.bottom;

      if (clickedOutsideDialog) {
        dialog.close();
      }
    });

    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      updateTheme(nextTheme, true, true);
    });

    systemThemeQuery.addEventListener("change", (event) => {
      if (getStoredTheme() !== null) {
        return;
      }

      updateTheme(event.matches ? LIGHT_THEME : DARK_THEME, false, false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSettingsDialog, { once: true });
  } else {
    initializeSettingsDialog();
  }
})();
