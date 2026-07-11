import { describe, it, expect } from 'vitest';
import {
  t,
  isRTL,
  isSupported,
  getLanguageOptions,
  resolveInitialLang,
  DEFAULT_LANG,
} from '../src/lang';
import { translations, languageNames } from '../src/lang/translations';

describe('i18n helpers', () => {
  it('translates a known key for a known language', () => {
    expect(t('fr', 'encode')).toBe('Encoder');
    expect(t('de', 'darkMode')).toBe('Dunkler Modus');
  });

  it('falls back to English for an unknown language', () => {
    expect(t('xx', 'encode')).toBe('Encode');
  });

  it('falls back to the key itself for an unknown key', () => {
    expect(t('en', 'does-not-exist')).toBe('does-not-exist');
  });

  it('detects right-to-left languages', () => {
    expect(isRTL('ar')).toBe(true);
    expect(isRTL('ur')).toBe(true);
    expect(isRTL('fa')).toBe(true);
    expect(isRTL('en')).toBe(false);
  });

  it('reports whether a language is supported', () => {
    expect(isSupported('de')).toBe(true);
    expect(isSupported('xx')).toBe(false);
  });

  it('lists all language options with the default language first', () => {
    const options = getLanguageOptions();
    expect(options[0].code).toBe(DEFAULT_LANG);
    expect(options).toHaveLength(Object.keys(translations).length);
    for (const option of options) {
      expect(option.name).toBe(languageNames[option.code]);
    }
  });

  it('resolves the initial language from a saved value', () => {
    expect(resolveInitialLang('de', 'en-US')).toBe('de');
  });

  it('ignores an unsupported saved value and uses the browser language', () => {
    expect(resolveInitialLang('xx', 'fr-FR')).toBe('fr');
  });

  it('falls back to the default language when nothing matches', () => {
    expect(resolveInitialLang(null, 'xx-YY')).toBe(DEFAULT_LANG);
    expect(resolveInitialLang(null, undefined)).toBe(DEFAULT_LANG);
  });

  it('supports Traditional Chinese (zh-TW) distinctly from Simplified (zh)', () => {
    expect(isSupported('zh-TW')).toBe(true);
    expect(t('zh-TW', 'title')).toBe('Base64 轉換器');
    expect(t('zh', 'title')).toBe('Base64 转换器');
    expect(t('zh-TW', 'encode')).toBe('編碼');
  });

  it('resolves region-specific browser languages', () => {
    expect(resolveInitialLang(null, 'zh-TW')).toBe('zh-TW');
    expect(resolveInitialLang(null, 'zh-tw')).toBe('zh-TW');
    expect(resolveInitialLang(null, 'zh-CN')).toBe('zh');
  });
});

describe('translation tables', () => {
  it('include exactly 26 languages', () => {
    expect(Object.keys(translations)).toHaveLength(26);
  });

  it('define every English key in each locale', () => {
    const englishKeys = Object.keys(translations.en).sort();
    for (const [code, dict] of Object.entries(translations)) {
      expect(Object.keys(dict).sort(), `locale "${code}" keys`).toEqual(
        englishKeys
      );
    }
  });

  it('provide a native display name for every language', () => {
    for (const code of Object.keys(translations)) {
      expect(languageNames[code], `name for "${code}"`).toBeTruthy();
    }
  });

  it('have non-empty string values for every key', () => {
    for (const [code, dict] of Object.entries(translations)) {
      for (const [key, value] of Object.entries(dict)) {
        expect(typeof value, `${code}.${key}`).toBe('string');
        expect(value.length, `${code}.${key}`).toBeGreaterThan(0);
      }
    }
  });
});
