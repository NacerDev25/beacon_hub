(function () {
  "use strict";

  const THEME_STORAGE_KEY = "beacon-hub-theme";
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
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
    const themeToggle = document.getElementById("light-theme-toggle");

    if (!settingsButton || !dialog || !closeButton || !themeToggle) {
      return;
    }

    function updateTheme(theme, shouldStore) {
      setDocumentTheme(theme);
      themeToggle.checked = theme === LIGHT_THEME;

      if (shouldStore) {
        storeTheme(theme);
      }
    }

    themeToggle.checked = root.dataset.theme === LIGHT_THEME;

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

    themeToggle.addEventListener("change", () => {
      updateTheme(themeToggle.checked ? LIGHT_THEME : DARK_THEME, true);
    });

    systemThemeQuery.addEventListener("change", (event) => {
      if (getStoredTheme() !== null) {
        return;
      }

      updateTheme(event.matches ? LIGHT_THEME : DARK_THEME, false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSettingsDialog, { once: true });
  } else {
    initializeSettingsDialog();
  }
})();
