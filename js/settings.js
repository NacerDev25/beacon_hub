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
  const FONT_SIZE_STORAGE_KEY = "beacon-hub-font-size";
  const DEFAULT_FONT_SIZE = "default";
  const FONT_SIZES = ["default", "large", "extra-large"];
  const FONT_SIZE_MESSAGE_KEYS = {
    default: "settings.fontSize.status.default",
    large: "settings.fontSize.status.large",
    "extra-large": "settings.fontSize.status.extraLarge",
  };
  const FONT_SIZE_MESSAGE_FALLBACKS = {
    default: "Font size set to default.",
    large: "Font size set to large.",
    "extra-large": "Font size set to extra large.",
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

  function getStoredFontSize() {
    try {
      const storedFontSize = window.localStorage.getItem(FONT_SIZE_STORAGE_KEY);
      return FONT_SIZES.includes(storedFontSize) ? storedFontSize : null;
    } catch {
      return null;
    }
  }

  function getFontSizeMessage(fontSize) {
    if (window.BeaconI18n && typeof window.BeaconI18n.translate === "function") {
      return window.BeaconI18n.translate(FONT_SIZE_MESSAGE_KEYS[fontSize]);
    }

    return FONT_SIZE_MESSAGE_FALLBACKS[fontSize];
  }

  function setDocumentFontSize(fontSize) {
    root.dataset.fontSize = FONT_SIZES.includes(fontSize) ? fontSize : DEFAULT_FONT_SIZE;
  }

  function storeFontSize(fontSize) {
    try {
      window.localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSize);
    } catch {
      return;
    }
  }

  const initialFontSize = getStoredFontSize() || DEFAULT_FONT_SIZE;

  setDocumentTheme(getPreferredTheme());
  setDocumentFontSize(initialFontSize);

  function initializeBottomNavSpacing() {
    const nav = document.querySelector(".primary-nav");

    if (!nav) {
      return;
    }

    let animationFrame = 0;

    function updateSpacing() {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const navHeight = nav.getBoundingClientRect().height;

        if (navHeight > 0) {
          root.style.setProperty(
            "--bottom-nav-space",
            `calc(${Math.ceil(navHeight)}px + var(--space-2))`
          );
        }
      });
    }

    updateSpacing();

    if (typeof ResizeObserver === "function") {
      new ResizeObserver(updateSpacing).observe(nav);
    }

    window.addEventListener("resize", updateSpacing);
    window.addEventListener("load", updateSpacing, { once: true });
  }

  function initializeSettingsDialog() {
    const settingsButton = document.getElementById("settings-button");
    const dialog = document.getElementById("settings-dialog");
    const closeButton = document.getElementById("settings-close-button");
    const themeToggle = document.getElementById("theme-toggle");
    const themeStatus = document.getElementById("theme-status");
    const fontSizeSelect = document.getElementById("font-size-select");
    const fontSizeStatus = document.getElementById("font-size-status");

    if (
      !settingsButton ||
      !dialog ||
      !closeButton ||
      !themeToggle ||
      !themeStatus ||
      !fontSizeSelect ||
      !fontSizeStatus
    ) {
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

    function updateFontSize(fontSize, shouldStore, shouldAnnounce) {
      const nextFontSize = FONT_SIZES.includes(fontSize) ? fontSize : DEFAULT_FONT_SIZE;
      setDocumentFontSize(nextFontSize);
      fontSizeSelect.value = nextFontSize;

      if (shouldStore) {
        storeFontSize(nextFontSize);
      }

      if (shouldAnnounce) {
        fontSizeStatus.textContent = getFontSizeMessage(nextFontSize);
      }
    }

    updateTheme(root.dataset.theme === LIGHT_THEME ? LIGHT_THEME : DARK_THEME, false, false);
    updateFontSize(initialFontSize, false, false);

    document.addEventListener("beacon:languagechange", () => {
      themeStatus.textContent = "";
      fontSizeStatus.textContent = "";
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

    fontSizeSelect.addEventListener("change", () => {
      updateFontSize(fontSizeSelect.value, true, true);
    });

    systemThemeQuery.addEventListener("change", (event) => {
      if (getStoredTheme() !== null) {
        return;
      }

      updateTheme(event.matches ? LIGHT_THEME : DARK_THEME, false, false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        initializeSettingsDialog();
        initializeBottomNavSpacing();
      },
      { once: true }
    );
  } else {
    initializeSettingsDialog();
    initializeBottomNavSpacing();
  }
})();
