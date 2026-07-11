# 🔤 Base64 Converter
<!-- Build & docs -->
[![CI](https://github.com/DoctorLai/base64-converter/actions/workflows/ci.yaml/badge.svg)](https://github.com/DoctorLai/base64-converter/actions/workflows/ci.yaml)
[![Test Coverage](https://github.com/DoctorLai/base64-converter/actions/workflows/coverage.yaml/badge.svg)](https://github.com/DoctorLai/base64-converter/actions/workflows/coverage.yaml)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/DoctorLai/base64-converter)

<!-- Project info -->
[![License: MIT](https://img.shields.io/github/license/DoctorLai/base64-converter?color=blue)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-5FA04E?logo=node.js&logoColor=white)](.nvmrc)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![JavaScript](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FDoctorLai%2Fbase64-converter%2Fbadges%2Fjavascript.json)](https://github.com/DoctorLai/base64-converter/search?l=javascript)

<!-- Repository stats -->
![Top language](https://img.shields.io/github/languages/top/DoctorLai/base64-converter)
![Repo size](https://img.shields.io/github/repo-size/DoctorLai/base64-converter)
![Commit activity](https://img.shields.io/github/commit-activity/m/DoctorLai/base64-converter)
![Last commit](https://img.shields.io/github/last-commit/DoctorLai/base64-converter)

<!-- Community -->
[![Stars](https://img.shields.io/github/stars/DoctorLai/base64-converter?style=social)](https://github.com/DoctorLai/base64-converter/stargazers)
[![Forks](https://img.shields.io/github/forks/DoctorLai/base64-converter?style=social)](https://github.com/DoctorLai/base64-converter/network/members)
[![Watchers](https://img.shields.io/github/watchers/DoctorLai/base64-converter?style=social)](https://github.com/DoctorLai/base64-converter/watchers)
[![Open issues](https://img.shields.io/github/issues/DoctorLai/base64-converter)](https://github.com/DoctorLai/base64-converter/issues)
[![Open PRs](https://img.shields.io/github/issues-pr/DoctorLai/base64-converter)](https://github.com/DoctorLai/base64-converter/pulls)
 
A simple, privacy-friendly web tool to **encode or decode Base64** strings and files, right in your browser. Built with React, it offers a clean two-textarea interface — paste content to convert instantly, or upload files for encoding. The interface is available in **26 languages**, with light/dark themes, live counts, and one-click copy. Your data never leaves your device.
 
This tool also supports decoding of `.b64` files into their original binary form.

## 🚀 Features

- **Base64 Encode/Decode**: Convert plain text to Base64 and vice versa.  
- **File Upload**: Upload files to encode or `.b64` files to decode.
- **Download Results**: Download the converted content as `.b64`, `.bin`, or `.txt`.  
- **Copy to Clipboard**: Copy the input or output with a single click.  
- **Live Counts**: See character and UTF-8 byte counts as you type.  
- **26 Languages**: Switch the interface language on the fly (with right-to-left support).  
- **Dark Mode**: Toggle between light and dark themes.  
- **Tab Support**: Proper indentation when using the "Tab" key in text areas.  
- **Simple and Intuitive UI**: Clean interface that's beginner-friendly.  
- **Easy Deployment**: Use `npm run build` and `npm run deploy` for production.  
 
## 🌐 Live Demo
 
Try it out on GitHub Pages: [Base64 Converter](https://doctorlai.github.io/base64-converter/)

![image](https://github.com/user-attachments/assets/d17ed6ea-eef5-4616-8025-07a2ce861013)

Please note: this is the open source version of this online tool: [Base64 Encoder/Decoder (Javascript) for Text/Binary Files](https://rot47.net/base64encoder.html)

## 🛠 Installation
 
To run the tool locally:
 
1. Clone the repository:
```bash
git clone https://github.com/doctorlai/base64-converter.git
cd base64-converter
```
 
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run tests:
```bash
## or: npm test
npm run test
```

5. Test coverage (enforces the 80% thresholds):
```bash
npm run coverage
```

6. Lint and format:
```bash
## check formatting (Prettier) and lint (ESLint)
npm run format
npm run lint

## auto-fix formatting and lint issues
npm run format:fix
npm run lint:fix
```

7. Run everything at once (format, lint, coverage, build):
```bash
npm run check
```

8. Open [http://localhost:5173/base64-converter/](http://localhost:5173/base64-converter/) in your browser.

## 📦 Available Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the production bundle. |
| `npm run preview` | Preview the production build locally. |
| `npm run test` | Run the test suite once. |
| `npm run coverage` | Run tests and enforce the 80% coverage thresholds. |
| `npm run lint` | Lint the source with ESLint. |
| `npm run lint:fix` | Lint and auto-fix where possible. |
| `npm run format` | Check formatting with Prettier. |
| `npm run format:fix` | Auto-format the source with Prettier. |
| `npm run check` | Run format + lint + coverage + build (everything). |
| `npm run deploy` | Build and deploy to GitHub Pages. |

## ✨ Usage

### 📄 Text Encoding/Decoding

1. **Enter plain text** in the input box.
2. **Click → Encode** to encode the string to Base64.
3. **Enter a Base64-encoded string** in the input box.
4. **Click ← Decode** to decode.

### 📁 File Encoding/Decoding

- **To encode a file**:
  - Select a file using the "Load File" button.
  - If the file is binary, it will be encoded automatically.
  - Click **Save File** to save the result as `.b64`.

- **To decode a file**:
  - Select a `.b64` file using the "Load File" button.
  - On success, the output will show the decoded binary (which seems random output).
  - Click **Save File** to save the decoded content (in binary).

Use the **🌞/🌙 toggle** on top to switch between Light and Dark mode.

## 🤝 Contributing

We welcome contributions! Please read the [Contributing Guide](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md) before you start.
 
1. Fork the repo.
2. Create your feature branch:
```bash
git checkout -b feature-name
```

3. Commit your changes:
```bash
git commit -am 'Add cool feature'
```

4. Push to GitHub:
```bash
git push origin feature-name
```

5. Open a pull request 🚀  

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file.

## 📚 Documentation

- [AI-generated wiki (DeepWiki)](https://deepwiki.com/DoctorLai/base64-converter)
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Support](SUPPORT.md)
- [Privacy Policy](PRIVACY.md)
- [Changelog](CHANGELOG.md)
 
## 🙏 Acknowledgments

- Made with ❤️ by [@justyy](https://github.com/doctorlai)
- Initial Boilerplate code contributed by ChatGPT-4o and o4-mini.
- Like this project? Consider [buying me a coffee](https://buymeacoffee.com/y0btg5r) ☕  
