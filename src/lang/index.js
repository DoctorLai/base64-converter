import {
  translations,
  languageNames,
  DEFAULT_LANG,
  RTL_LANGUAGES,
} from './translations';

/**
 * Translate a key for the given language, falling back to the default
 * language and finally to the key itself if it is missing.
 *
 * @param {string} lang - The language code (e.g. 'en', 'fr').
 * @param {string} key - The translation key.
 * @returns {string} The translated string.
 */
export function t(lang, key) {
  const base = translations[DEFAULT_LANG];
  const dict = translations[lang] || base;
  return dict[key] ?? base[key] ?? key;
}

/**
 * Return true if the given language is written right-to-left.
 *
 * @param {string} lang - The language code.
 * @returns {boolean}
 */
export function isRTL(lang) {
  return RTL_LANGUAGES.includes(lang);
}

/**
 * Return true if the given language code has a translation table.
 *
 * @param {string} lang - The language code.
 * @returns {boolean}
 */
export function isSupported(lang) {
  return Object.prototype.hasOwnProperty.call(translations, lang);
}

/**
 * Return the list of available languages as `{ code, name }` objects,
 * sorted with the default language first and the rest alphabetically by
 * native name.
 *
 * @returns {Array<{ code: string, name: string }>}
 */
export function getLanguageOptions() {
  return Object.keys(translations)
    .map((code) => ({ code, name: languageNames[code] || code }))
    .sort((a, b) => {
      if (a.code === DEFAULT_LANG) return -1;
      if (b.code === DEFAULT_LANG) return 1;
      return a.name.localeCompare(b.name);
    });
}

/**
 * Resolve the initial language: a previously saved choice, otherwise the
 * browser language if supported, otherwise the default language.
 *
 * @param {string|null} saved - A previously persisted language code.
 * @param {string} [browserLang] - The browser's language (e.g. `navigator.language`).
 * @returns {string}
 */
export function resolveInitialLang(saved, browserLang) {
  if (saved && isSupported(saved)) return saved;
  if (browserLang) {
    const short = browserLang.slice(0, 2).toLowerCase();
    if (isSupported(short)) return short;
  }
  return DEFAULT_LANG;
}

export { DEFAULT_LANG, RTL_LANGUAGES };
