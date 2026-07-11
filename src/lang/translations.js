// UI translations are stored as one JSON file per language in ./locales.
//
// Each locale file must define every key present in en.json (this is enforced by
// the i18n unit tests). To add a language:
//   1. Drop a `<code>.json` file into ./locales (e.g. `sv.json`, `zh-TW.json`).
//   2. Add its native display name to `languageNames` below.
//   3. If it is written right-to-left, add its code to `RTL_LANGUAGES`.

// Eagerly import every locale JSON so translations are bundled at build time.
const localeModules = import.meta.glob('./locales/*.json', { eager: true });

/**
 * Map of language code -> translation dictionary, assembled from the JSON files
 * in ./locales and keyed by file basename (e.g. "en", "zh", "zh-TW").
 */
export const translations = Object.fromEntries(
  Object.entries(localeModules).map(([path, mod]) => {
    const code = path.slice(path.lastIndexOf('/') + 1, -'.json'.length);
    return [code, mod.default];
  })
);

export const DEFAULT_LANG = 'en';

// Languages written right-to-left.
export const RTL_LANGUAGES = ['ar', 'ur', 'fa'];

// Native display names shown in the language selector.
export const languageNames = {
  en: 'English',
  zh: '简体中文',
  'zh-TW': '繁體中文',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
  bn: 'বাংলা',
  pt: 'Português',
  ru: 'Русский',
  ur: 'اردو',
  id: 'Bahasa Indonesia',
  de: 'Deutsch',
  ja: '日本語',
  tr: 'Türkçe',
  ko: '한국어',
  vi: 'Tiếng Việt',
  it: 'Italiano',
  fa: 'فارسی',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  mr: 'मराठी',
  pa: 'ਪੰਜਾਬੀ',
  pl: 'Polski',
  nl: 'Nederlands',
  th: 'ไทย',
};
