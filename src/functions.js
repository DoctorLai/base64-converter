export function encodeToBase64(str) {
  return btoa(str);
}

export function decodeFromBase64(base64Str) {
  if (typeof base64Str !== 'string') {
    throw new Error('Input must be a string');
  }

  // Remove whitespace
  base64Str = base64Str.trim().replace(/\s+/g, '');

  // Basic length check
  if (base64Str.length % 4 !== 0) {
    throw new Error('Invalid Base64 length');
  }

  try {
    return atob(base64Str);
  } catch (e) {
    throw new Error('Invalid Base64 content');
  }
}

export function isLikelyText(content) {
  let text = '';

  if (typeof content === 'string') {
    text = content;
  } else if (content instanceof Uint8Array) {
    try {
      // Decode binary content to string (throws if invalid UTF-8)
      text = new TextDecoder('utf-8', { fatal: true }).decode(content);
    } catch {
      return false;
    }
  } else {
    return false; // unsupported input type
  }

  // Regex check: only printable ASCII characters and whitespace
  return /^[\x09\x0A\x0D\x20-\x7E]*$/.test(text);
}
