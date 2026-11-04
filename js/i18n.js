(function () {
  "use strict";

  const LANGUAGE_STORAGE_KEY = "beacon-hub-language";
  const DEFAULT_LANGUAGE = "en";
  const SUPPORTED_LANGUAGES = ["en", "ar", "fr"];
  const RTL_LANGUAGES = ["ar"];

  const TRANSLATIONS = {
    en: {
      "skipLink": "Skip to main content",
      "search.label": "Search",
      "settings.open": "Settings",
      "nav.label": "Main navigation",
      "nav.home": "Home",
      "nav.phone": "Phone",
      "nav.computer": "Computer",
      "nav.channels": "Channels",
      "page.home.heading": "Home",
      "page.phone.heading": "Phone",
      "page.computer.heading": "Computer",
      "page.channels.heading": "Channels",
      "page.home.title": "Beacon Hub — Home",
      "page.phone.title": "Beacon Hub — Phone",
      "page.computer.title": "Beacon Hub — Computer",
      "page.channels.title": "Beacon Hub — Channels",
      "page.home.description": "A free platform bringing together apps, screen readers, audio games, and channels for blind and low-vision users.",
      "page.phone.description": "Mobile apps, screen readers, and audio games for blind and low-vision users.",
      "page.computer.description": "Desktop apps, screen readers, and audio games for blind and low-vision users.",
      "page.channels.description": "Technology YouTube channels and Telegram groups for blind and low-vision users.",
      "settings.title": "Settings",
      "settings.close": "Close settings",
      "settings.theme.label": "Site appearance",
      "settings.theme.toggleLabel": "Dark mode",
      "settings.language.label": "Language",
      "settings.language.changed": "Language changed to English.",
      "settings.fontSize.label": "Font size",
      "settings.fontSize.default": "Default",
      "settings.fontSize.large": "Large",
      "settings.fontSize.extraLarge": "Extra large",
      "settings.fontSize.status.default": "Font size set to default.",
      "settings.fontSize.status.large": "Font size set to large.",
      "settings.fontSize.status.extraLarge": "Font size set to extra large.",
      "language.name.en": "English",
      "language.name.fr": "Français",
      "language.name.ar": "العربية",
      "theme.status.light": "Switched to light mode.",
      "theme.status.dark": "Dark mode enabled.",
    },
    ar: {
      "skipLink": "تخطي إلى المحتوى الرئيسي",
      "search.label": "بحث",
      "settings.open": "الإعدادات",
      "nav.label": "التنقل الرئيسي",
      "nav.home": "الرئيسية",
      "nav.phone": "الهاتف",
      "nav.computer": "الحاسوب",
      "nav.channels": "القنوات",
      "page.home.heading": "الرئيسية",
      "page.phone.heading": "الهاتف",
      "page.computer.heading": "الحاسوب",
      "page.channels.heading": "القنوات",
      "page.home.title": "Beacon Hub — الرئيسية",
      "page.phone.title": "Beacon Hub — الهاتف",
      "page.computer.title": "Beacon Hub — الحاسوب",
      "page.channels.title": "Beacon Hub — القنوات",
      "page.home.description": "منصة مجانية تجمع التطبيقات وقارئات الشاشة والألعاب الصوتية والقنوات للمكفوفين وضعاف البصر.",
      "page.phone.description": "تطبيقات الهاتف وقارئات الشاشة والألعاب الصوتية للمكفوفين وضعاف البصر.",
      "page.computer.description": "تطبيقات الحاسوب وقارئات الشاشة والألعاب الصوتية للمكفوفين وضعاف البصر.",
      "page.channels.description": "قنوات يوتيوب ومجموعات تيليغرام التقنية للمكفوفين وضعاف البصر.",
      "settings.title": "الإعدادات",
      "settings.close": "إغلاق الإعدادات",
      "settings.theme.label": "مظهر الموقع",
      "settings.theme.toggleLabel": "الوضع الليلي",
      "settings.language.label": "اللغة",
      "settings.language.changed": "تم تغيير اللغة إلى العربية.",
      "settings.fontSize.label": "حجم الخط",
      "settings.fontSize.default": "افتراضي",
      "settings.fontSize.large": "كبير",
      "settings.fontSize.extraLarge": "كبير جدًا",
      "settings.fontSize.status.default": "تم ضبط حجم الخط على الافتراضي.",
      "settings.fontSize.status.large": "تم ضبط حجم الخط على كبير.",
      "settings.fontSize.status.extraLarge": "تم ضبط حجم الخط على كبير جدًا.",
      "language.name.en": "English",
      "language.name.fr": "Français",
      "language.name.ar": "العربية",
      "theme.status.light": "تم العودة للوضع العادي",
      "theme.status.dark": "تم تفعيل الوضع الليلي",
    },
    fr: {
      "skipLink": "Aller au contenu principal",
      "search.label": "Rechercher",
      "settings.open": "Paramètres",
      "nav.label": "Navigation principale",
      "nav.home": "Accueil",
      "nav.phone": "Téléphone",
      "nav.computer": "Ordinateur",
      "nav.channels": "Chaînes",
      "page.home.heading": "Accueil",
      "page.phone.heading": "Téléphone",
      "page.computer.heading": "Ordinateur",
      "page.channels.heading": "Chaînes",
      "page.home.title": "Beacon Hub — Accueil",
      "page.phone.title": "Beacon Hub — Téléphone",
      "page.computer.title": "Beacon Hub — Ordinateur",
      "page.channels.title": "Beacon Hub — Chaînes",
      "page.home.description": "Une plateforme gratuite réunissant des applications, des lecteurs d’écran, des jeux audio et des chaînes pour les personnes aveugles et malvoyantes.",
      "page.phone.description": "Applications mobiles, lecteurs d’écran et jeux audio pour les personnes aveugles et malvoyantes.",
      "page.computer.description": "Applications pour ordinateur, lecteurs d’écran et jeux audio pour les personnes aveugles et malvoyantes.",
      "page.channels.description": "Chaînes YouTube technologiques et groupes Telegram pour les personnes aveugles et malvoyantes.",
      "settings.title": "Paramètres",
      "settings.close": "Fermer les paramètres",
      "settings.theme.label": "Apparence du site",
      "settings.theme.toggleLabel": "Mode sombre",
      "settings.language.label": "Langue",
      "settings.language.changed": "Langue changée en français.",
      "settings.fontSize.label": "Taille du texte",
      "settings.fontSize.default": "Par défaut",
      "settings.fontSize.large": "Grand",
      "settings.fontSize.extraLarge": "Très grand",
      "settings.fontSize.status.default": "Taille du texte réglée sur la valeur par défaut.",
      "settings.fontSize.status.large": "Taille du texte agrandie.",
      "settings.fontSize.status.extraLarge": "Taille du texte très agrandie.",
      "language.name.en": "English",
      "language.name.fr": "Français",
      "language.name.ar": "العربية",
      "theme.status.light": "Mode clair activé.",
      "theme.status.dark": "Mode sombre activé.",
    },
  };

  const root = document.documentElement;
  let currentLanguage = DEFAULT_LANGUAGE;
  let languageAnnouncementTimer = 0;

  function isSupportedLanguage(language) {
    return SUPPORTED_LANGUAGES.includes(language);
  }

  function readStoredLanguage() {
    try {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return isSupportedLanguage(storedLanguage) ? storedLanguage : null;
    } catch {
      return null;
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      return;
    }
  }

  function getTranslation(language, key) {
    const dictionary = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
    const fallbackDictionary = TRANSLATIONS[DEFAULT_LANGUAGE];

    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
      return dictionary[key];
    }

    if (Object.prototype.hasOwnProperty.call(fallbackDictionary, key)) {
      return fallbackDictionary[key];
    }

    return key;
  }

  function applyDocumentLanguage(language) {
    root.lang = language;
    root.dir = RTL_LANGUAGES.includes(language) ? "rtl" : "ltr";
    root.dataset.language = language;
  }

  function applyTranslations(language) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      element.textContent = getTranslation(language, key);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      const mappings = element.getAttribute("data-i18n-attr").split(";");

      mappings.forEach((mapping) => {
        const separatorIndex = mapping.indexOf(":");
        if (separatorIndex === -1) {
          return;
        }

        const attribute = mapping.slice(0, separatorIndex).trim();
        const key = mapping.slice(separatorIndex + 1).trim();
        if (!attribute || !key) {
          return;
        }

        element.setAttribute(attribute, getTranslation(language, key));
      });
    });
  }

  function announceLanguageChange(language) {
    const status = document.getElementById("language-status");
    if (!status) {
      return;
    }

    window.clearTimeout(languageAnnouncementTimer);
    status.textContent = "";
    languageAnnouncementTimer = window.setTimeout(() => {
      status.textContent = getTranslation(language, "settings.language.changed");
    }, 0);
  }

  function setLanguage(language, options = {}) {
    if (!isSupportedLanguage(language)) {
      return false;
    }

    const shouldStore = options.shouldStore !== false;
    const shouldAnnounce = options.shouldAnnounce !== false;

    currentLanguage = language;
    applyDocumentLanguage(language);
    applyTranslations(language);

    if (shouldStore) {
      storeLanguage(language);
    }

    if (shouldAnnounce) {
      announceLanguageChange(language);
    }

    document.dispatchEvent(new CustomEvent("beacon:languagechange", { detail: { language } }));
    return true;
  }

  function initializeLanguageControl() {
    const select = document.getElementById("language-select");
    if (!select) {
      return;
    }

    select.value = currentLanguage;
    select.addEventListener("change", () => {
      const selectedLanguage = select.value;
      if (!setLanguage(selectedLanguage)) {
        select.value = currentLanguage;
      }
    });
  }

  function initializeI18n() {
    currentLanguage = readStoredLanguage() || DEFAULT_LANGUAGE;
    applyDocumentLanguage(currentLanguage);
    applyTranslations(currentLanguage);
    initializeLanguageControl();
  }

  window.BeaconI18n = Object.freeze({
    getLanguage: () => currentLanguage,
    translate: (key) => getTranslation(currentLanguage, key),
    setLanguage: (language) => setLanguage(language),
    languages: SUPPORTED_LANGUAGES.slice(),
  });

  initializeI18n();
})();
