import { useState, useRef, useEffect } from 'react';
import {
  encodeToBase64,
  decodeFromBase64,
  isLikelyText,
  arrayBufferToBase64,
} from './functions';
import { t, isRTL, getLanguageOptions, resolveInitialLang } from './lang';
import './App.css';

const LANGUAGE_OPTIONS = getLanguageOptions();

const byteLength = (text) => new TextEncoder().encode(text).length;

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [lang, setLang] = useState(() =>
    resolveInitialLang(
      localStorage.getItem('lang'),
      typeof navigator !== 'undefined' ? navigator.language : undefined
    )
  );

  const fileInputRef = useRef(null);
  const binaryOutputRef = useRef(null);
  const outputTypeRef = useRef(null);

  const tr = (key) => t(lang, key);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr';
    }
  }, [lang]);

  const encodeBase64 = () => {
    try {
      const encoded = encodeToBase64(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      binaryOutputRef.current = Uint8Array.from(encoded, (c) =>
        c.charCodeAt(0)
      );
      outputTypeRef.current = 'text';
    } catch (error) {
      setOutput('Error encoding to Base64: ' + error.message);
      binaryOutputRef.current = null;
      outputTypeRef.current = null;
    }
  };

  const decodeBase64 = () => {
    try {
      // Decode the cleaned Base64 string
      const binaryStr = decodeFromBase64(input);
      if (typeof binaryStr !== 'string') {
        throw new Error('Decoded result is not a string');
      }
      const bytes = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
      const decoded = new TextDecoder('utf-8').decode(bytes);
      setOutput(decoded);
      binaryOutputRef.current = Uint8Array.from(decoded, (c) =>
        c.charCodeAt(0)
      );

      if (isLikelyText(decoded)) {
        outputTypeRef.current = 'text';
      } else {
        outputTypeRef.current = 'binary';
      }
    } catch (error) {
      // Output specific error message for debugging
      console.error('Decoding Error:', error);
      setOutput('Error decoding Base64: ' + error.message);
      binaryOutputRef.current = null;
      outputTypeRef.current = null;
    }
  };

  const handleLoadFile = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.name.endsWith('.b64')) {
      // Read .b64 file as text
      reader.onload = (event) => {
        const base64 = event.target.result.trim();
        setInput(base64);

        try {
          const decoded = decodeFromBase64(base64);
          const binary = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
          binaryOutputRef.current = binary;
          outputTypeRef.current = 'binary';

          // Check if the decoded content is likely text
          const isText = isLikelyText(decoded);

          if (isText) {
            outputTypeRef.current = 'text';
            // utf-8
            const utf8Decoder = new TextDecoder('utf-8');
            const decodedText = utf8Decoder.decode(binary);
            setOutput(decodedText);
          } else {
            outputTypeRef.current = 'binary';
            setOutput(decoded);
          }
        } catch {
          setOutput('Error decoding .b64 file.');
          binaryOutputRef.current = null;
          outputTypeRef.current = null;
        }
      };
      reader.readAsText(file);
    } else {
      // Read any other file as binary and encode it to Base64
      reader.onload = (event) => {
        const buffer = event.target.result;
        const base64 = arrayBufferToBase64(buffer);
        setInput('');
        setOutput(base64);
        binaryOutputRef.current = null;
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSaveFile = () => {
    let filename = 'output';
    let blob;

    if (outputTypeRef.current === 'text') {
      // Save decoded text as .txt
      blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
      filename += '.txt';
    } else if (outputTypeRef.current === 'binary') {
      // Save decoded binary as .bin
      blob = new Blob([binaryOutputRef.current], {
        type: 'application/octet-stream',
      });
      filename += '.bin';
    } // else decode output field as .b64
    else {
      // Save Base64-encoded output as .b64
      blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
      filename += '.b64';
    }

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(output);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const clearFields = () => {
    setInput('');
    setOutput('');
    setCopied(false);
    binaryOutputRef.current = null;
    outputTypeRef.current = null;
  };

  const handleInputKeyDown = (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const target = e.target;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    setInput(input.slice(0, start) + '\t' + input.slice(end));
    requestAnimationFrame(() => {
      target.selectionStart = target.selectionEnd = start + 1;
    });
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <div>
        <div className='top-bar'>
          <h1>{`🔐 ${tr('title')}`}</h1>
          <label className='language-picker'>
            <span aria-hidden='true'>🌐</span>
            <select
              className='language-select'
              aria-label={tr('language')}
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className='button-row'>
          <button onClick={encodeBase64}>→ {tr('encode')}</button>
          <button onClick={decodeBase64}>← {tr('decode')}</button>
          <button onClick={handleLoadFile}>📂 {tr('loadFile')}</button>
          <button onClick={handleSaveFile}>💾 {tr('saveFile')}</button>
          <button onClick={toggleDarkMode}>
            {darkMode ? `🌞 ${tr('lightMode')}` : `🌙 ${tr('darkMode')}`}
          </button>
          <button onClick={clearFields}>🧹 {tr('clear')}</button>
        </div>

        <textarea
          className={`textarea ${darkMode ? 'dark' : 'light'}`}
          placeholder={tr('inputPlaceholder')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <div className='counts' data-testid='input-count'>
          {input.length} {tr('characters')} · {byteLength(input)} {tr('bytes')}
        </div>

        <div className='output-row'>
          <textarea
            className={`textarea ${darkMode ? 'dark' : 'light'}`}
            placeholder={tr('outputPlaceholder')}
            value={output}
            readOnly
          />
          <button
            className='copy-button'
            onClick={handleCopy}
            disabled={!output}
          >
            📋 {copied ? tr('copied') : tr('copy')}
          </button>
        </div>
        <div className='counts' data-testid='output-count'>
          {output.length} {tr('characters')} · {byteLength(output)}{' '}
          {tr('bytes')}
        </div>

        <input
          type='file'
          accept='*'
          aria-label={tr('loadFile')}
          className='hidden-file-input'
          ref={fileInputRef}
          onChange={onFileChange}
        />
      </div>

      <footer>
        <p>
          Made with ❤️ by{' '}
          <a
            href='https://github.com/doctorlai'
            target='_blank'
            rel='noopener noreferrer'
          >
            @justyy
          </a>
        </p>
        <p>
          If you found this useful, consider buying me a{' '}
          <a
            href='https://buymeacoffee.com/y0btg5r'
            target='_blank'
            rel='noopener noreferrer'
          >
            coffee
          </a>{' '}
          ☕
        </p>
        <p>
          Open Source on{' '}
          <a
            href='https://github.com/DoctorLai/base64-converter'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
        </p>
        <p>
          Alternatively:{' '}
          <a
            href='https://rot47.net/base64encoder.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Base64 Encoder/Decoder
          </a>
        </p>
      </footer>
    </div>
  );
}
