(function () {
  "use strict";

  const INSTALL_PROMPT_STORAGE_KEY = "beacon-hub-install-prompt-seen";
  const AUTO_PROMPT_DELAY = 1200;
  const AVAILABILITY_TIMEOUT = 5000;
  const INSTALL_STATES = Object.freeze({
    checking: "checking",
    available: "available",
    prompting: "prompting",
    ios: "ios",
    installed: "installed",
    unavailable: "unavailable",
    cancelled: "cancelled",
    failed: "failed",
  });
  const STATE_PRESENTATION = {
    [INSTALL_STATES.checking]: {
      statusKey: "settings.install.checking",
      buttonLabelKey: null,
    },
    [INSTALL_STATES.available]: {
      statusKey: null,
      buttonLabelKey: "settings.install.action",
    },
    [INSTALL_STATES.prompting]: {
      statusKey: "settings.install.prompting",
      buttonLabelKey: null,
    },
    [INSTALL_STATES.ios]: {
      statusKey: null,
      buttonLabelKey: "settings.install.howTo",
    },
    [INSTALL_STATES.installed]: {
      statusKey: "settings.install.installed",
      buttonLabelKey: null,
    },
    [INSTALL_STATES.unavailable]: {
      statusKey: "settings.install.unavailable",
      buttonLabelKey: null,
    },
    [INSTALL_STATES.cancelled]: {
      statusKey: "settings.install.cancelled",
      buttonLabelKey: null,
    },
    [INSTALL_STATES.failed]: {
      statusKey: "settings.install.failed",
      buttonLabelKey: null,
    },
  };

  let installState = INSTALL_STATES.checking;
  let deferredInstallPrompt = null;
  let autoPromptTimer = 0;
  let availabilityTimer = 0;
  let installPromptReturnFocus = null;
  let ui = null;

  function getInstallText(key) {
    if (window.BeaconI18n && typeof window.BeaconI18n.translate === "function") {
      return window.BeaconI18n.translate(key);
    }

    return key;
  }

  function createElement(tagName, className, textContent) {
    const element = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  }

  function isStandalone() {
    const displayModeQuery = window.matchMedia("(display-mode: standalone)");
    return displayModeQuery.matches || window.navigator.standalone === true;
  }

  function isIosDevice() {
    const isIpadOs = window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
    return isIpadOs || /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  }

  function supportsInstallPrompt() {
    return "onbeforeinstallprompt" in window;
  }

  function getInitialInstallState() {
    if (isStandalone()) {
      return INSTALL_STATES.installed;
    }

    if (isIosDevice()) {
      return INSTALL_STATES.ios;
    }

    if (supportsInstallPrompt()) {
      return INSTALL_STATES.checking;
    }

    return INSTALL_STATES.unavailable;
  }

  function hasSeenInstallPrompt() {
    try {
      return window.localStorage.getItem(INSTALL_PROMPT_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  }

  function markInstallPromptSeen() {
    try {
      window.localStorage.setItem(INSTALL_PROMPT_STORAGE_KEY, "true");
    } catch {
      return;
    }
  }

  function createInstallRow() {
    const row = createElement("div", "settings-option settings-install");
    row.id = "settings-install";
    row.lang = "en";
    row.dir = "ltr";

    const copy = createElement("div", "settings-option__copy settings-install__copy");
    const label = createElement("p", "settings-option__label", getInstallText("settings.install.label"));
    label.id = "settings-install-label";

    const status = createElement("p", "settings-install__status");
    status.id = "settings-install-status";
    status.hidden = true;

    const liveRegion = createElement("p", "visually-hidden");
    liveRegion.id = "settings-install-announcement";
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-atomic", "true");

    const button = createElement("button", "settings-install__button");
    button.type = "button";
    button.id = "settings-install-button";
    button.hidden = true;

    copy.append(label, status, liveRegion);
    row.append(copy, button);

    return { row, label, status, liveRegion, button };
  }

  function createInstallPromptDialog() {
    const dialog = createElement("dialog", "settings-dialog install-dialog");
    dialog.id = "install-dialog";
    dialog.lang = "en";
    dialog.dir = "ltr";
    dialog.setAttribute("aria-labelledby", "install-dialog-title");
    dialog.setAttribute("aria-describedby", "install-dialog-description");

    const body = createElement("div", "install-dialog__body");
    const title = createElement("h2", "install-dialog__title", getInstallText("install.title"));
    title.id = "install-dialog-title";

    const description = createElement("p", "install-dialog__description", getInstallText("install.description"));
    description.id = "install-dialog-description";

    const actions = createElement("div", "install-dialog__actions");
    const installButton = createElement(
      "button",
      "install-dialog__button install-dialog__button--primary",
      getInstallText("settings.install.action")
    );
    installButton.type = "button";
    installButton.id = "install-dialog-install-button";

    const dismissButton = createElement("button", "install-dialog__button", getInstallText("install.notNow"));
    dismissButton.type = "button";
    dismissButton.id = "install-dialog-dismiss-button";

    actions.append(installButton, dismissButton);
    body.append(title, description, actions);
    dialog.append(body);

    return { dialog, title, description, installButton, dismissButton };
  }

  function createIosInstructionsDialog() {
    const dialog = createElement("dialog", "settings-dialog install-dialog");
    dialog.id = "install-ios-dialog";
    dialog.lang = "en";
    dialog.dir = "ltr";
    dialog.setAttribute("aria-labelledby", "install-ios-dialog-title");
    dialog.setAttribute("aria-describedby", "install-ios-dialog-description");

    const body = createElement("div", "install-dialog__body");
    const title = createElement("h2", "install-dialog__title", getInstallText("install.ios.title"));
    title.id = "install-ios-dialog-title";

    const description = createElement("p", "install-dialog__description", getInstallText("install.ios.description"));
    description.id = "install-ios-dialog-description";

    const actions = createElement("div", "install-dialog__actions");
    const closeButton = createElement(
      "button",
      "install-dialog__button install-dialog__button--primary",
      getInstallText("install.ios.close")
    );
    closeButton.type = "button";
    closeButton.id = "install-ios-close-button";

    actions.append(closeButton);
    body.append(title, description, actions);
    dialog.append(body);

    return { dialog, title, description, closeButton };
  }

  function renderInstallUi(shouldAnnounce) {
    if (!ui) {
      return;
    }

    const presentation = STATE_PRESENTATION[installState] || STATE_PRESENTATION[INSTALL_STATES.unavailable];
    const statusText = presentation.statusKey ? getInstallText(presentation.statusKey) : "";
    const buttonLabel = presentation.buttonLabelKey ? getInstallText(presentation.buttonLabelKey) : "";

    ui.label.textContent = getInstallText("settings.install.label");
    ui.status.textContent = statusText;
    ui.status.hidden = !statusText;
    ui.button.textContent = buttonLabel;
    ui.button.hidden = !buttonLabel;

    ui.installDialog.title.textContent = getInstallText("install.title");
    ui.installDialog.description.textContent = getInstallText("install.description");
    ui.installDialog.installButton.textContent = getInstallText("settings.install.action");
    ui.installDialog.dismissButton.textContent = getInstallText("install.notNow");

    ui.iosDialog.title.textContent = getInstallText("install.ios.title");
    ui.iosDialog.description.textContent = getInstallText("install.ios.description");
    ui.iosDialog.closeButton.textContent = getInstallText("install.ios.close");

    if (shouldAnnounce && statusText) {
      ui.liveRegion.textContent = statusText;
    }
  }

  function updateInstallState(nextState, shouldAnnounce = false) {
    installState = nextState;

    if (installState !== INSTALL_STATES.checking) {
      window.clearTimeout(availabilityTimer);
      availabilityTimer = 0;
    }

    renderInstallUi(shouldAnnounce);
  }

  function startAvailabilityTimeout() {
    if (availabilityTimer || installState !== INSTALL_STATES.checking) {
      return;
    }

    availabilityTimer = window.setTimeout(() => {
      availabilityTimer = 0;

      if (installState === INSTALL_STATES.checking) {
        updateInstallState(INSTALL_STATES.unavailable);
      }
    }, AVAILABILITY_TIMEOUT);
  }

  function getFallbackFocusTarget() {
    const settingsButton = document.getElementById("settings-button");
    return settingsButton instanceof HTMLElement ? settingsButton : null;
  }

  function openIosInstructions() {
    if (!ui || ui.iosDialog.dialog.open) {
      return;
    }

    ui.iosDialog.dialog.showModal();
    ui.iosDialog.closeButton.focus();
  }

  function showAutomaticInstallPrompt() {
    if (!ui || !deferredInstallPrompt || hasSeenInstallPrompt() || isStandalone()) {
      return;
    }

    const openDialog = document.querySelector("dialog[open]");

    if (openDialog) {
      openDialog.addEventListener("close", () => window.setTimeout(showAutomaticInstallPrompt, 0), {
        once: true,
      });
      return;
    }

    installPromptReturnFocus =
      document.activeElement instanceof HTMLElement && document.activeElement !== document.body
        ? document.activeElement
        : null;

    try {
      ui.installDialog.dialog.showModal();
    } catch {
      installPromptReturnFocus = null;
      return;
    }

    markInstallPromptSeen();
    ui.installDialog.installButton.focus();
  }

  function scheduleAutomaticInstallPrompt() {
    if (
      !ui ||
      !deferredInstallPrompt ||
      hasSeenInstallPrompt() ||
      isStandalone() ||
      autoPromptTimer
    ) {
      return;
    }

    autoPromptTimer = window.setTimeout(() => {
      autoPromptTimer = 0;
      showAutomaticInstallPrompt();
    }, AUTO_PROMPT_DELAY);
  }

  async function promptInstallation() {
    if (!deferredInstallPrompt) {
      updateInstallState(INSTALL_STATES.unavailable);
      return;
    }

    const promptEvent = deferredInstallPrompt;
    deferredInstallPrompt = null;
    updateInstallState(INSTALL_STATES.prompting);

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;

      if (choice.outcome === "accepted") {
        markInstallPromptSeen();
        updateInstallState(INSTALL_STATES.installed, true);
        return;
      }

      markInstallPromptSeen();
      updateInstallState(INSTALL_STATES.cancelled, true);
    } catch {
      updateInstallState(INSTALL_STATES.failed, true);
    }
  }

  function handleSettingsInstallClick() {
    if (installState === INSTALL_STATES.ios) {
      openIosInstructions();
      return;
    }

    if (installState === INSTALL_STATES.available) {
      promptInstallation();
    }
  }

  function initializeInstallExperience() {
    if (ui) {
      return;
    }

    const settingsBody = document.querySelector("#settings-dialog .settings-dialog__body");
    if (!settingsBody) {
      return;
    }

    const installRow = createInstallRow();
    const termsButton = document.getElementById("terms-open-button");
    const installPromptDialog = createInstallPromptDialog();
    const iosDialog = createIosInstructionsDialog();

    if (termsButton && termsButton.parentElement === settingsBody) {
      settingsBody.insertBefore(installRow.row, termsButton);
    } else {
      settingsBody.append(installRow.row);
    }

    document.body.append(installPromptDialog.dialog, iosDialog.dialog);

    ui = {
      ...installRow,
      installDialog: installPromptDialog,
      iosDialog,
    };

    installRow.button.addEventListener("click", handleSettingsInstallClick);

    installPromptDialog.installButton.addEventListener("click", () => {
      installPromptDialog.dialog.close();
      promptInstallation();
    });

    installPromptDialog.dismissButton.addEventListener("click", () => {
      installPromptDialog.dialog.close();
    });

    installPromptDialog.dialog.addEventListener("close", () => {
      markInstallPromptSeen();

      const returnFocus = installPromptReturnFocus;
      installPromptReturnFocus = null;

      if (returnFocus && returnFocus.isConnected) {
        returnFocus.focus();
        return;
      }

      const fallbackFocusTarget = getFallbackFocusTarget();
      if (fallbackFocusTarget) {
        fallbackFocusTarget.focus();
      }
    });

    iosDialog.closeButton.addEventListener("click", () => {
      iosDialog.dialog.close();
    });

    iosDialog.dialog.addEventListener("close", () => {
      installRow.button.focus();
    });

    document.addEventListener("beacon:languagechange", () => renderInstallUi(false));

    if (installState === INSTALL_STATES.checking) {
      installState = getInitialInstallState();
    }

    updateInstallState(installState);
    startAvailabilityTimeout();
    scheduleAutomaticInstallPrompt();
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    if (!supportsInstallPrompt() || isStandalone() || isIosDevice()) {
      return;
    }

    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallState(INSTALL_STATES.available);
    scheduleAutomaticInstallPrompt();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    window.clearTimeout(autoPromptTimer);
    window.clearTimeout(availabilityTimer);
    autoPromptTimer = 0;
    availabilityTimer = 0;
    markInstallPromptSeen();

    if (ui && ui.installDialog.dialog.open) {
      ui.installDialog.dialog.close();
    }

    updateInstallState(INSTALL_STATES.installed, true);
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeInstallExperience, { once: true });
  } else {
    initializeInstallExperience();
  }
})();
