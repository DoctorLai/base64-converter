export function encodeToBase64(str) {
  return btoa(str);
}

export function decodeFromBase64(base64Str) {
  return atob(base64Str);
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
