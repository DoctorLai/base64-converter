import { useState, useRef, useEffect } from 'react';
import { encodeToBase64, decodeFromBase64, isLikelyText } from './functions';
import './App.css';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  const fileInputRef = useRef(null);
  const binaryOutputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const encodeBase64 = () => {
    try {
      const encoded = encodeToBase64(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      binaryOutputRef.current = null;
    } catch {
      setOutput('Error encoding to Base64');
    }
  };

  const decodeBase64 = () => {
    try {
      // Clean up the Base64 string by removing any spaces and newlines
      const cleanedInput = input.replace(/\s+/g, '');

      // Decode the cleaned Base64 string
      const decoded = decodeFromBase64(cleanedInput);
      setOutput(decoded);

      // Check if the decoded content is likely text
      if (isLikelyText(decoded)) {
        // If it's text, just display the decoded text
        setOutput(decoded);
        binaryOutputRef.current = null;
      } else {
        // Otherwise, store binary data for saving
        binaryOutputRef.current = Uint8Array.from(decoded, c => c.charCodeAt(0));
      }
    } catch (error) {
      // Output specific error message for debugging
      console.error("Decoding Error:", error);
      setOutput('Error decoding Base64');
      binaryOutputRef.current = null;
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
          const decoded = atob(base64);
          const binary = Uint8Array.from(decoded, c => c.charCodeAt(0));
          binaryOutputRef.current = binary;

          // Check if the decoded content is likely text
          const isText = /^[\x09\x0A\x0D\x20-\x7E]*$/.test(decoded);
          if (isText) {
            setOutput(decoded); // Show decoded text
          } else {
            setOutput('Loaded .b64 file. Decoded binary ready to save.');
          }
        } catch {
          setOutput('Error decoding .b64 file.');
          binaryOutputRef.current = null;
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

    if (binaryOutputRef.current) {
      // Save decoded binary as .bin
      blob = new Blob([binaryOutputRef.current], { type: 'application/octet-stream' });
      filename += '.bin';
    } else {
      // Save Base64-encoded output as .b64
      blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
      filename += '.b64';
    }

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const arrayBufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let b of bytes) {
      binary += String.fromCharCode(b);
    }
    return btoa(binary);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const clearFields = () => {
    setInput('');
    setOutput('');
    binaryOutputRef.current = null;
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <div>
        <h1>🔐 Base64 Converter</h1>

        <div className="button-row">
          <button onClick={encodeBase64}>→ Encode</button>
          <button onClick={decodeBase64}>← Decode</button>
          <button onClick={handleLoadFile}>📂 Load File</button>
          <button onClick={handleSaveFile}>💾 Save File</button>
          <button onClick={toggleDarkMode}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
          <button onClick={clearFields}>🧹 Clear</button>
        </div>

        <textarea
          className={`textarea ${darkMode ? 'dark' : 'light'}`}
          placeholder="Input here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <textarea
          className={`textarea ${darkMode ? 'dark' : 'light'}`}
          placeholder="Output appears here..."
          value={output}
          readOnly
        />

        <input
          type="file"
          accept=".txt,.json,.yaml,.yml,.b64,image/*,.pdf"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
      </div>

      <div className="footer">
        <p>
          Made with ❤️ by{' '}
          <a
            href="https://github.com/doctorlai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', fontWeight: 'bold' }}
          >
            @justyy
          </a>
        </p>
        <p>
          If you found this useful, consider buying me a{' '}
          <a
            href="https://justyy.com/out/bmc"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007bff', textDecoration: 'underline' }}
          >
            coffee
          </a>{' '}
          ☕
        </p>
        <p>
          Open Source on{' '}
          <a
            href="https://github.com/DoctorLai/base64-converter"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007bff', textDecoration: 'underline' }}
          >
            GitHub
          </a>
        </p>
        <p>
          Alternatively: <a
            href="https://rot47.net/base64encoder.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007bff', textDecoration: 'underline' }}
          >Base64 Encoder/Decoder</a>
        </p>
      </div>
    </div>
  );
}
