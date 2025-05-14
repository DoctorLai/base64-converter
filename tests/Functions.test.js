import { describe, it, expect } from 'vitest';
import {
  encodeToBase64,
  decodeFromBase64,
  isLikelyText,
} from '../src/functions';

describe('Base64 converter', () => {
  it('encodes plain text to Base64', () => {
    const plainText = 'Hello, Ryan!';
    const encoded = encodeToBase64(plainText);
    expect(encoded).toBe('SGVsbG8sIFJ5YW4h');
  });

  it('decodes Base64 to plain text', () => {
    const base64Str = 'SGVsbG8sIFJ5YW4h';
    const decoded = decodeFromBase64(base64Str);
    expect(decoded).toBe('Hello, Ryan!');
  });

  // decode with whitespace
  it('decodes Base64 with whitespace', () => {
    const base64Str = 'SGVsbG8sIFJ5YW4h   ';
    const decoded = decodeFromBase64(base64Str);
    expect(decoded).toBe('Hello, Ryan!');
  });
  it('throws error for invalid Base64 string', () => {
    const invalidBase64 = 'SGVsbG8sIFJ5YW4h!';
    expect(() => decodeFromBase64(invalidBase64)).toThrow(
      'Invalid Base64 length'
    );
  });
});

describe('Is likely text', () => {
  it('returns true for likely text', () => {
    const text = 'Hello, Ryan!';
    const result = isLikelyText(text);
    expect(result).toBe(true);
  });

  it('returns false for binary data', () => {
    const binaryData = new Uint8Array([0, 1, 2, 3, 4, 0]);
    const result = isLikelyText(binaryData);
    expect(result).toBe(false);
  });

  it('returns false for unsupported input type', () => {
    const unsupportedInput = { key: 'value' };
    const result = isLikelyText(unsupportedInput);
    expect(result).toBe(false);
  });

  it('returns false for invalid UTF-8 binary data', () => {
    const invalidUtf8 = new Uint8Array([0, 159, 146, 150]);
    const result = isLikelyText(invalidUtf8);
    expect(result).toBe(false);
  });

  it('returns true for Chinese Characters', () => {
    const chineseText = '你好，Ryan！';
    const result = isLikelyText(chineseText);
    expect(result).toBe(false);
  });

  it('returns true for Japanese Characters', () => {
    const japaneseText = 'こんにちは、Ryan！';
    const result = isLikelyText(japaneseText);
    expect(result).toBe(false);
  });

  it('returns true for Korean Characters', () => {
    const koreanText = '안녕하세요, Ryan!';
    const result = isLikelyText(koreanText);
    expect(result).toBe(false);
  });

  it('returns true for a sentence', () => {
    const text = 'A quick brown fox jumps over the lazy dog.';
    const result = isLikelyText(text);
    expect(result).toBe(true);
  });
});
