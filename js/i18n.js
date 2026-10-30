(function () {
  'use strict';

  const STORAGE_KEY = 'beacon-hub-language';
  const DEFAULT_LANGUAGE = 'en';
  const SUPPORTED_LANGUAGES = ['en', 'ar', 'fr'];
  const DIRECTIONS = { en: 'ltr', ar: 'rtl', fr: 'ltr' };

  const translations = {
    en: {
      'skip': 'Skip to main content',
      'brand.slogan': 'Discover technology, and use it independently.',
      'nav.label': 'Primary navigation',
      'nav.home': 'Home',
      'nav.apps': 'Apps',
      'nav.channels': 'Channels & Communities',
      'nav.more': 'More',
      'settings.label': 'Settings',
      'settings.language': 'Language',
      'footer': 'Beacon Hub — A free project serving blind and low-vision users',
      'common.comingSoon': 'Coming soon',
      'filter.all': 'All',
      'filter.phone': 'Phone',
      'filter.pc': 'Computer',
      'filter.channels': 'Channels',
      'status.all': 'Showing all sections.',
      'status.phone': 'Showing phone sections.',
      'status.pc': 'Showing computer sections.',
      'status.channels': 'Showing channels and communities sections.',
      'block.phoneApps': 'Phone apps',
      'block.phoneApps.text': 'Phone apps will be added soon.',
      'block.phoneScreenReaders': 'Phone screen readers',
      'block.phoneScreenReaders.text': 'Resources will be added soon.',
      'block.phoneGames': 'Phone games for blind users',
      'block.phoneGames.text': 'Games will be added soon.',
      'block.pcApps': 'Computer apps',
      'block.pcApps.text': 'Computer apps will be added soon.',
      'block.pcScreenReaders': 'Computer screen readers',
      'block.pcScreenReaders.text': 'Resources will be added soon.',
      'block.pcGames': 'Computer games for blind users',
      'block.pcGames.text': 'Games will be added soon.',
      'block.channels': 'Channels & Communities',
      'block.channels.text': 'YouTube channels and Telegram groups will be added soon.',
      'block.youtube': 'YouTube channels',
      'block.youtube.text': 'Channels will be added soon.',
      'block.telegram': 'Telegram groups',
      'block.telegram.text': 'Groups will be added soon.',
      'block.more': 'More',
      'block.more.text': 'More sections will be added later.',
      'link.apps': 'View apps section',
      'link.channels': 'View channels section',
      'home.title': 'Beacon Hub - Home',
      'home.description': 'Beacon Hub — a free platform gathering apps, screen readers, audio games, channels, and tech tutorials for blind and low-vision users.',
      'home.filterLabel': 'Filter content by section',
      'apps.title': 'Beacon Hub - Apps',
      'apps.description': 'A directory of phone and computer apps, screen readers, and audio games for blind and low-vision users.',
      'apps.sectionLabel': 'Apps by device',
      'apps.tablistLabel': 'Choose device type',
      'apps.tab.phone': 'Phone apps',
      'apps.tab.pc': 'Computer apps',
      'channels.title': 'Beacon Hub - Channels & Communities',
      'channels.description': 'A directory of YouTube channels and Telegram groups with useful tech content for blind and low-vision users.',
      'channels.sectionLabel': 'Channels and communities',
      'channels.tablistLabel': 'Choose source type',
      'channels.tab.youtube': 'YouTube channels',
      'channels.tab.telegram': 'Telegram groups',
      'more.title': 'Beacon Hub - More',
      'more.description': 'Additional sections coming soon to Beacon Hub for blind and low-vision users.'
    },
    ar: {
      'skip': 'تخطي إلى المحتوى الرئيسي',
      'brand.slogan': 'اكتشف التكنولوجيا، واستعملها باستقلالية.',
      'nav.label': 'التنقل الرئيسي',
      'nav.home': 'الرئيسية',
      'nav.apps': 'التطبيقات',
      'nav.channels': 'القنوات والمجتمعات',
      'nav.more': 'المزيد',
      'settings.label': 'الإعدادات',
      'settings.language': 'اللغة',
      'footer': 'Beacon Hub — مشروع مجاني لخدمة المكفوفين وضعاف البصر',
      'common.comingSoon': 'قريبًا',
      'filter.all': 'الكل',
      'filter.phone': 'الهاتف',
      'filter.pc': 'الحاسوب',
      'filter.channels': 'القنوات',
      'status.all': 'يتم عرض جميع الأقسام.',
      'status.phone': 'يتم عرض أقسام الهاتف.',
      'status.pc': 'يتم عرض أقسام الحاسوب.',
      'status.channels': 'يتم عرض أقسام القنوات والمجتمعات.',
      'block.phoneApps': 'تطبيقات الهاتف',
      'block.phoneApps.text': 'سيتم إضافة التطبيقات قريبًا.',
      'block.phoneScreenReaders': 'قارئات الشاشة الخاصة بالهاتف',
      'block.phoneScreenReaders.text': 'سيتم إضافة الموارد قريبًا.',
      'block.phoneGames': 'ألعاب الهاتف الموجهة للمكفوفين',
      'block.phoneGames.text': 'سيتم إضافة الألعاب قريبًا.',
      'block.pcApps': 'تطبيقات الحاسوب',
      'block.pcApps.text': 'سيتم إضافة التطبيقات قريبًا.',
      'block.pcScreenReaders': 'قارئات الشاشة الخاصة بالحاسوب',
      'block.pcScreenReaders.text': 'سيتم إضافة الموارد قريبًا.',
      'block.pcGames': 'ألعاب الحاسوب الموجهة للمكفوفين',
      'block.pcGames.text': 'سيتم إضافة الألعاب قريبًا.',
      'block.channels': 'القنوات والمجتمعات',
      'block.channels.text': 'سيتم إضافة قنوات يوتيوب ومجموعات تيليغرام قريبًا.',
      'block.youtube': 'قنوات يوتيوب',
      'block.youtube.text': 'سيتم إضافة القنوات قريبًا.',
      'block.telegram': 'مجموعات تيليغرام',
      'block.telegram.text': 'سيتم إضافة المجموعات قريبًا.',
      'block.more': 'المزيد',
      'block.more.text': 'سيتم إضافة أقسام أخرى لاحقًا.',
      'link.apps': 'عرض قسم التطبيقات',
      'link.channels': 'عرض قسم القنوات والمجتمعات',
      'home.title': 'Beacon Hub - الرئيسية',
      'home.description': 'Beacon Hub — منصة مجانية تجمع التطبيقات وقارئات الشاشة والألعاب الصوتية والقنوات والشروحات التقنية للمكفوفين وضعاف البصر.',
      'home.filterLabel': 'فلترة المحتوى حسب القسم',
      'apps.title': 'Beacon Hub - التطبيقات',
      'apps.description': 'دليل تطبيقات الهاتف والحاسوب وقارئات الشاشة والألعاب الصوتية الموجهة للمكفوفين وضعاف البصر.',
      'apps.sectionLabel': 'أقسام التطبيقات حسب الجهاز',
      'apps.tablistLabel': 'اختيار نوع الجهاز',
      'apps.tab.phone': 'تطبيقات الهاتف',
      'apps.tab.pc': 'تطبيقات الحاسوب',
      'channels.title': 'Beacon Hub - القنوات والمجتمعات',
      'channels.description': 'دليل قنوات يوتيوب ومجموعات تيليغرام التقنية المفيدة للمكفوفين وضعاف البصر.',
      'channels.sectionLabel': 'القنوات والمجتمعات',
      'channels.tablistLabel': 'اختيار نوع المصدر',
      'channels.tab.youtube': 'قنوات يوتيوب',
      'channels.tab.telegram': 'مجموعات تيليغرام',
      'more.title': 'Beacon Hub - المزيد',
      'more.description': 'أقسام إضافية قادمة إلى Beacon Hub لخدمة المكفوفين وضعاف البصر.'
    },
    fr: {
      'skip': 'Aller au contenu principal',
      'brand.slogan': 'Découvrez la technologie et utilisez-la en toute autonomie.',
      'nav.label': 'Navigation principale',
      'nav.home': 'Accueil',
      'nav.apps': 'Applications',
      'nav.channels': 'Chaînes et communautés',
      'nav.more': 'Plus',
      'settings.label': 'Paramètres',
      'settings.language': 'Langue',
      'footer': 'Beacon Hub — Un projet gratuit au service des personnes aveugles et malvoyantes',
      'common.comingSoon': 'Bientôt disponible',
      'filter.all': 'Tout',
      'filter.phone': 'Téléphone',
      'filter.pc': 'Ordinateur',
      'filter.channels': 'Chaînes',
      'status.all': 'Affichage de toutes les sections.',
      'status.phone': 'Affichage des sections pour téléphone.',
      'status.pc': 'Affichage des sections pour ordinateur.',
      'status.channels': 'Affichage des sections des chaînes et communautés.',
      'block.phoneApps': 'Applications pour téléphone',
      'block.phoneApps.text': 'Les applications pour téléphone seront ajoutées bientôt.',
      'block.phoneScreenReaders': 'Lecteurs d’écran pour téléphone',
      'block.phoneScreenReaders.text': 'Les ressources seront ajoutées bientôt.',
      'block.phoneGames': 'Jeux pour téléphone destinés aux personnes aveugles',
      'block.phoneGames.text': 'Les jeux seront ajoutés bientôt.',
      'block.pcApps': 'Applications pour ordinateur',
      'block.pcApps.text': 'Les applications pour ordinateur seront ajoutées bientôt.',
      'block.pcScreenReaders': 'Lecteurs d’écran pour ordinateur',
      'block.pcScreenReaders.text': 'Les ressources seront ajoutées bientôt.',
      'block.pcGames': 'Jeux pour ordinateur destinés aux personnes aveugles',
      'block.pcGames.text': 'Les jeux seront ajoutés bientôt.',
      'block.channels': 'Chaînes et communautés',
      'block.channels.text': 'Les chaînes YouTube et les groupes Telegram seront ajoutés bientôt.',
      'block.youtube': 'Chaînes YouTube',
      'block.youtube.text': 'Les chaînes seront ajoutées bientôt.',
      'block.telegram': 'Groupes Telegram',
      'block.telegram.text': 'Les groupes seront ajoutés bientôt.',
      'block.more': 'Plus',
      'block.more.text': 'D’autres sections seront ajoutées plus tard.',
      'link.apps': 'Voir la section des applications',
      'link.channels': 'Voir la section des chaînes',
      'home.title': 'Beacon Hub - Accueil',
      'home.description': 'Beacon Hub — une plateforme gratuite qui rassemble des applications, des lecteurs d’écran, des jeux audio, des chaînes et des tutoriels techniques pour les personnes aveugles et malvoyantes.',
      'home.filterLabel': 'Filtrer le contenu par section',
      'apps.title': 'Beacon Hub - Applications',
      'apps.description': 'Un répertoire d’applications pour téléphone et ordinateur, de lecteurs d’écran et de jeux audio pour les personnes aveugles et malvoyantes.',
      'apps.sectionLabel': 'Applications par appareil',
      'apps.tablistLabel': 'Choisir le type d’appareil',
      'apps.tab.phone': 'Applications pour téléphone',
      'apps.tab.pc': 'Applications pour ordinateur',
      'channels.title': 'Beacon Hub - Chaînes et communautés',
      'channels.description': 'Un répertoire de chaînes YouTube et de groupes Telegram proposant du contenu technique utile aux personnes aveugles et malvoyantes.',
      'channels.sectionLabel': 'Chaînes et communautés',
      'channels.tablistLabel': 'Choisir le type de source',
      'channels.tab.youtube': 'Chaînes YouTube',
      'channels.tab.telegram': 'Groupes Telegram',
      'more.title': 'Beacon Hub - Plus',
      'more.description': 'D’autres sections arrivent bientôt sur Beacon Hub pour les personnes aveugles et malvoyantes.'
    }
  };

  let currentLanguage = DEFAULT_LANGUAGE;

  function isSupportedLanguage(language) {
    return SUPPORTED_LANGUAGES.indexOf(language) !== -1;
  }

  function readStoredLanguage() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return isSupportedLanguage(stored) ? stored : DEFAULT_LANGUAGE;
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // Storage may be unavailable; the language still applies for this page.
    }
  }

  function translate(key) {
    const table = translations[currentLanguage] || translations[DEFAULT_LANGUAGE];
    if (Object.prototype.hasOwnProperty.call(table, key)) {
      return table[key];
    }
    const fallback = translations[DEFAULT_LANGUAGE];
    return Object.prototype.hasOwnProperty.call(fallback, key) ? fallback[key] : key;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = DIRECTIONS[currentLanguage] || 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      element.textContent = translate(element.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (element) {
      element.setAttribute('aria-label', translate(element.getAttribute('data-i18n-aria-label')));
    });

    document.querySelectorAll('[data-i18n-content]').forEach(function (element) {
      element.setAttribute('content', translate(element.getAttribute('data-i18n-content')));
    });
  }

  function syncLanguageOptions() {
    document.querySelectorAll('input[name="language"]').forEach(function (input) {
      input.checked = input.value === currentLanguage;
    });
  }

  function applyLanguage(language) {
    if (!isSupportedLanguage(language)) {
      return;
    }

    currentLanguage = language;
    storeLanguage(language);
    applyTranslations();
    syncLanguageOptions();

    document.dispatchEvent(new CustomEvent('languagechange', {
      detail: { language: language }
    }));
  }

  function initSettings() {
    const button = document.getElementById('settings-button');
    const panel = document.getElementById('settings-panel');
    if (!button || !panel) {
      return;
    }

    function closePanel(returnFocus) {
      panel.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      if (returnFocus) {
        button.focus();
      }
    }

    function openPanel() {
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');

      const selected = panel.querySelector('input[name="language"]:checked');
      const first = panel.querySelector('input[name="language"]');
      const target = selected || first;
      if (target) {
        target.focus();
      }
    }

    button.addEventListener('click', function () {
      if (panel.hidden) {
        openPanel();
      } else {
        closePanel(false);
      }
    });

    panel.addEventListener('change', function (event) {
      if (event.target && event.target.name === 'language') {
        applyLanguage(event.target.value);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !panel.hidden) {
        event.preventDefault();
        closePanel(true);
      }
    });

    document.addEventListener('click', function (event) {
      if (panel.hidden) {
        return;
      }
      const clickedOutside = !panel.contains(event.target) && !button.contains(event.target);
      if (clickedOutside) {
        closePanel(false);
      }
    });
  }

  currentLanguage = readStoredLanguage();
  applyTranslations();
  syncLanguageOptions();
  initSettings();

  window.BeaconHubI18n = {
    getLanguage: function () {
      return currentLanguage;
    },
    setLanguage: applyLanguage,
    translate: translate
  };
})();
