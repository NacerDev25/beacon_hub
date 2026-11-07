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
      "settings.support.label": "Support",
      "settings.support.description": "For removal requests or general support, contact our team by email.",
      "settings.support.emailLabel": "Email support",
      "settings.terms.open": "Terms of Use",
      "settings.install.label": "Install app",
      "settings.install.action": "Install",
      "settings.install.howTo": "How to install",
      "settings.install.checking": "Checking installation availability...",
      "settings.install.prompting": "Opening installation prompt...",
      "settings.install.installed": "Installed",
      "settings.install.unavailable": "Installation is not available in this browser.",
      "settings.install.cancelled": "Installation was cancelled. Reload the page to try again.",
      "settings.install.failed": "Installation could not be started. Reload the page to try again.",
      "install.title": "Install Beacon Hub",
      "install.description": "Install Beacon Hub for quick access and offline use.",
      "install.notNow": "Not now",
      "install.ios.title": "Install on iPhone or iPad",
      "install.ios.description": "Open the Share menu in Safari, then choose Add to Home Screen.",
      "install.ios.close": "Got it",
      "language.name.en": "English",
      "language.name.fr": "Français",
      "language.name.ar": "العربية",
      "theme.status.light": "Switched to light mode.",
      "theme.status.dark": "Dark mode enabled.",
      "terms.title": "Terms of Use",
      "terms.close": "Close terms of use",
      "terms.updated": "Last updated: 5 November 2026",
      "terms.intro": "Welcome to Beacon Hub. These terms explain how to use the platform and the nature of our relationship with you. By using the platform, you agree to these terms.",
      "terms.about.title": "About the platform",
      "terms.about.body": "Beacon Hub is a free platform that helps users discover apps, screen readers, audio games, and channels suited to blind and low-vision users. These resources are presented as links and descriptive information.",
      "terms.free.title": "A free platform",
      "terms.free.body": "The platform is provided entirely free of charge. We do not charge users for access to the content or for viewing links, and we do not aim to make a profit from them.",
      "terms.links.title": "How links work",
      "terms.links.body": "The platform works as a link directory. When you select an app or channel link, you may be taken to an app store or an external website operated by another party, which applies its own terms and policies.",
      "terms.external.title": "External services",
      "terms.external.body": "The platform does not host apps, files, or external content, and does not control their content, updates, prices, availability, security, or compatibility with devices or screen readers. Displaying a link does not imply a partnership or endorsement by the platform unless explicitly stated.",
      "terms.responsibility.title": "Your responsibility",
      "terms.responsibility.body": "You are responsible for verifying an app or external service before downloading it, making a purchase, or sharing data. We recommend reviewing that party’s terms and privacy policy before use.",
      "terms.removal.title": "Removing an app listing",
      "terms.removal.body": "If you own or develop an app listed on the platform and want its link removed, contact our support team by email at the address shown in the Support section, including the app name, its link, and evidence of ownership or authorization. We will review the request in good faith and respond within a reasonable time. Removal applies only to the app link on the platform and does not remove the app from an app store or any other external service.",
      "terms.removal.link": "Go to the Support section",
      "terms.ip.title": "Intellectual property",
      "terms.ip.body": "All rights relating to the Beacon Hub name, logo, design, interface, and original content belong to the Beacon Hub platform unless otherwise stated. No part may be copied, modified, reused, or distributed without prior written permission. These rights do not cover the names, logos, or content of external apps and services.",
      "terms.acceptable.title": "Acceptable use",
      "terms.acceptable.body": "You may not use the platform for unlawful or harmful activity, attempt to disrupt or damage it or related services, or impersonate the platform owner or support team.",
      "terms.liability.title": "Limitation of liability",
      "terms.liability.body": "The platform makes reasonable efforts to keep links accurate and up to date, but does not guarantee that any external app or service will remain available or be free of errors. To the extent permitted by law, the platform is not liable for any loss or damage arising from the use of external websites or apps or reliance on their content.",
      "terms.changes.title": "Changes",
      "terms.changes.body": "These terms may be updated from time to time to reflect platform improvements or legal requirements. Continued use of the platform after an update is published constitutes acceptance of the updated version.",
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
      "settings.support.label": "الدعم",
      "settings.support.description": "لطلبات إزالة التطبيقات أو الدعم العام، تواصل مع فريقنا عبر البريد الإلكتروني.",
      "settings.support.emailLabel": "مراسلة الدعم عبر البريد الإلكتروني",
      "settings.terms.open": "شروط الاستخدام",
      "settings.install.label": "Install app",
      "settings.install.action": "Install",
      "settings.install.howTo": "How to install",
      "settings.install.checking": "Checking installation availability...",
      "settings.install.prompting": "Opening installation prompt...",
      "settings.install.installed": "Installed",
      "settings.install.unavailable": "Installation is not available in this browser.",
      "settings.install.cancelled": "Installation was cancelled. Reload the page to try again.",
      "settings.install.failed": "Installation could not be started. Reload the page to try again.",
      "install.title": "Install Beacon Hub",
      "install.description": "Install Beacon Hub for quick access and offline use.",
      "install.notNow": "Not now",
      "install.ios.title": "Install on iPhone or iPad",
      "install.ios.description": "Open the Share menu in Safari, then choose Add to Home Screen.",
      "install.ios.close": "Got it",
      "language.name.en": "English",
      "language.name.fr": "Français",
      "language.name.ar": "العربية",
      "theme.status.light": "تم العودة للوضع العادي",
      "theme.status.dark": "تم تفعيل الوضع الليلي",
      "terms.title": "شروط الاستخدام",
      "terms.close": "إغلاق شروط الاستخدام",
      "terms.updated": "آخر تحديث: 5 نوفمبر 2026",
      "terms.intro": "مرحبًا بك في Beacon Hub. توضح هذه الشروط كيفية استخدام المنصة وطبيعة العلاقة بينك وبيننا. باستخدامك المنصة، فإنك توافق على هذه الشروط.",
      "terms.about.title": "حول المنصة",
      "terms.about.body": "Beacon Hub منصة مجانية تساعد المستخدمين على اكتشاف تطبيقات وقارئات شاشة وألعاب صوتية وقنوات مناسبة للمكفوفين وضعاف البصر. وتُعرض هذه الموارد على شكل روابط وبيانات تعريفية.",
      "terms.free.title": "منصة مجانية",
      "terms.free.body": "تُقدَّم المنصة مجانًا بالكامل، ولا تفرض رسومًا على المستخدمين مقابل الوصول إلى المحتوى أو عرض الروابط، ولا تهدف إلى تحقيق ربح من وراء ذلك.",
      "terms.links.title": "طبيعة الروابط",
      "terms.links.body": "تعمل المنصة كدليل روابط. عند النقر على رابط تطبيق أو قناة، قد ينتقل المستخدم إلى متجر تطبيقات أو موقع خارجي تديره جهة أخرى، وتخضع تلك الجهة لشروطها وسياساتها الخاصة.",
      "terms.external.title": "الجهات الخارجية",
      "terms.external.body": "لا تستضيف المنصة التطبيقات أو الملفات أو المحتوى الخارجي، ولا تتحكم في محتواه أو تحديثاته أو أسعاره أو توفره أو أمانه أو توافقه مع الأجهزة أو قارئات الشاشة. ولا يعني عرض أي رابط وجود شراكة أو تأييد من المنصة، ما لم يُذكر ذلك صراحةً.",
      "terms.responsibility.title": "مسؤولية المستخدم",
      "terms.responsibility.body": "يقع على المستخدم مسؤولية التحقق من التطبيق أو الجهة الخارجية قبل التنزيل أو الشراء أو مشاركة البيانات. ويُنصح بمراجعة الشروط وسياسة الخصوصية الخاصة بتلك الجهة قبل استخدامها.",
      "terms.removal.title": "طلب إزالة تطبيق",
      "terms.removal.body": "إذا كنت مالكًا أو مطورًا لتطبيق مدرج في المنصة وترغب في إزالة رابطه، تواصل مع فريق الدعم عبر البريد الإلكتروني الموضح في قسم الدعم، مع ذكر اسم التطبيق ورابطه وما يثبت ملكيتك أو تفويضك. سنراجع الطلب بحسن نية ونستجيب له في مدة معقولة. وتقتصر الإزالة على رابط التطبيق داخل المنصة، ولا تشمل حذفه من متجر التطبيقات أو أي جهة خارجية.",
      "terms.removal.link": "الانتقال إلى قسم الدعم",
      "terms.ip.title": "الملكية الفكرية",
      "terms.ip.body": "جميع الحقوق المتعلقة باسم Beacon Hub وشعاره وتصميمه وواجهته ومحتواه الأصلي مملوكة لمنصة Beacon Hub، ما لم يُذكر خلاف ذلك. لا يجوز نسخ أو تعديل أو إعادة استخدام أو توزيع أي جزء منها دون إذن كتابي مسبق. ولا تشمل هذه الحقوق أسماء أو شعارات أو محتوى التطبيقات والجهات الخارجية.",
      "terms.acceptable.title": "الاستخدام المقبول",
      "terms.acceptable.body": "يُمنع استخدام المنصة في أي نشاط غير قانوني أو ضار، أو محاولة تعطيلها أو الإضرار بها أو بالخدمات المرتبطة بها، أو انتحال صفة مالك المنصة أو فريق الدعم.",
      "terms.liability.title": "حدود المسؤولية",
      "terms.liability.body": "تبذل المنصة جهودًا معقولة للحفاظ على دقة الروابط وتحديثها، لكنها لا تضمن استمرار توفر أي تطبيق أو خدمة خارجية أو خلوها من الأخطاء. وفي الحدود التي يجيزها القانون، لا تتحمل المنصة المسؤولية عن أي خسارة أو ضرر ناتج عن استخدام المواقع أو التطبيقات الخارجية أو الاعتماد على محتواها.",
      "terms.changes.title": "التعديلات",
      "terms.changes.body": "قد تُحدَّث هذه الشروط من وقت لآخر لتعكس تحسينات المنصة أو المتطلبات القانونية. ويُعد استمرار استخدام المنصة بعد نشر التحديث موافقة على النسخة المحدثة.",
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
      "settings.support.label": "Assistance",
      "settings.support.description": "Pour les demandes de retrait ou l’assistance générale, contactez notre équipe par e-mail.",
      "settings.support.emailLabel": "Contacter l’assistance par e-mail",
      "settings.terms.open": "Conditions d’utilisation",
      "settings.install.label": "Install app",
      "settings.install.action": "Install",
      "settings.install.howTo": "How to install",
      "settings.install.checking": "Checking installation availability...",
      "settings.install.prompting": "Opening installation prompt...",
      "settings.install.installed": "Installed",
      "settings.install.unavailable": "Installation is not available in this browser.",
      "settings.install.cancelled": "Installation was cancelled. Reload the page to try again.",
      "settings.install.failed": "Installation could not be started. Reload the page to try again.",
      "install.title": "Install Beacon Hub",
      "install.description": "Install Beacon Hub for quick access and offline use.",
      "install.notNow": "Not now",
      "install.ios.title": "Install on iPhone or iPad",
      "install.ios.description": "Open the Share menu in Safari, then choose Add to Home Screen.",
      "install.ios.close": "Got it",
      "language.name.en": "English",
      "language.name.fr": "Français",
      "language.name.ar": "العربية",
      "theme.status.light": "Mode clair activé.",
      "theme.status.dark": "Mode sombre activé.",
      "terms.title": "Conditions d’utilisation",
      "terms.close": "Fermer les conditions d’utilisation",
      "terms.updated": "Dernière mise à jour : 5 novembre 2026",
      "terms.intro": "Bienvenue sur Beacon Hub. Ces conditions expliquent comment utiliser la plateforme et la nature de notre relation avec vous. En utilisant la plateforme, vous acceptez ces conditions.",
      "terms.about.title": "À propos de la plateforme",
      "terms.about.body": "Beacon Hub est une plateforme gratuite qui aide les utilisateurs à découvrir des applications, des lecteurs d’écran, des jeux audio et des chaînes adaptés aux personnes aveugles et malvoyantes. Ces ressources sont présentées sous forme de liens et d’informations descriptives.",
      "terms.free.title": "Une plateforme gratuite",
      "terms.free.body": "La plateforme est entièrement gratuite. Nous ne facturons aucun frais aux utilisateurs pour accéder au contenu ou consulter les liens, et nous ne cherchons pas à en tirer un profit.",
      "terms.links.title": "Fonctionnement des liens",
      "terms.links.body": "La plateforme fonctionne comme un annuaire de liens. Lorsque vous sélectionnez le lien d’une application ou d’une chaîne, vous pouvez être redirigé vers une boutique d’applications ou un site externe géré par un tiers, qui applique ses propres conditions et politiques.",
      "terms.external.title": "Services externes",
      "terms.external.body": "La plateforme n’héberge pas les applications, fichiers ou contenus externes, et ne contrôle pas leur contenu, leurs mises à jour, leurs prix, leur disponibilité, leur sécurité ou leur compatibilité avec les appareils ou les lecteurs d’écran. L’affichage d’un lien n’implique aucun partenariat ni approbation de la plateforme, sauf mention explicite.",
      "terms.responsibility.title": "Votre responsabilité",
      "terms.responsibility.body": "Il vous incombe de vérifier une application ou un service externe avant de le télécharger, d’effectuer un achat ou de partager des données. Nous vous recommandons de consulter les conditions et la politique de confidentialité du tiers avant utilisation.",
      "terms.removal.title": "Retrait d’une application référencée",
      "terms.removal.body": "Si vous êtes propriétaire ou développeur d’une application référencée sur la plateforme et souhaitez retirer son lien, contactez notre équipe d’assistance à l’adresse e-mail indiquée dans la section Assistance, en précisant le nom de l’application, son lien et tout élément prouvant votre propriété ou votre autorisation. Nous examinerons la demande de bonne foi et y répondrons dans un délai raisonnable. Le retrait concerne uniquement le lien de l’application sur la plateforme et n’entraîne pas sa suppression de la boutique ou de tout autre service externe.",
      "terms.removal.link": "Accéder à la section Assistance",
      "terms.ip.title": "Propriété intellectuelle",
      "terms.ip.body": "Tous les droits liés au nom, au logo, au design, à l’interface et au contenu original de Beacon Hub appartiennent à la plateforme Beacon Hub, sauf mention contraire. Aucune partie ne peut être copiée, modifiée, réutilisée ou distribuée sans autorisation écrite préalable. Ces droits ne couvrent pas les noms, logos ou contenus des applications et services externes.",
      "terms.acceptable.title": "Utilisation acceptable",
      "terms.acceptable.body": "Il est interdit d’utiliser la plateforme à des fins illégales ou nuisibles, de tenter de la perturber ou de l’endommager, elle ou les services associés, ou d’usurper l’identité du propriétaire de la plateforme ou de l’équipe d’assistance.",
      "terms.liability.title": "Limitation de responsabilité",
      "terms.liability.body": "La plateforme fait des efforts raisonnables pour maintenir les liens exacts et à jour, mais ne garantit pas qu’une application ou un service externe restera disponible ou exempt d’erreurs. Dans les limites permises par la loi, la plateforme n’est pas responsable des pertes ou dommages résultant de l’utilisation de sites ou d’applications externes ou de la confiance accordée à leur contenu.",
      "terms.changes.title": "Modifications",
      "terms.changes.body": "Ces conditions peuvent être mises à jour de temps à autre afin de refléter les améliorations de la plateforme ou les exigences légales. La poursuite de l’utilisation de la plateforme après la publication d’une mise à jour vaut acceptation de la version mise à jour.",
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
