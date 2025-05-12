# 🔤 Base64 Converter  
[![Base64 Converter (Built, Lint and Test)](https://github.com/DoctorLai/base64-converter/actions/workflows/ci.yaml/badge.svg)](https://github.com/DoctorLai/base64-converter/actions/workflows/ci.yaml)
 
A simple web-based tool to **encode or decode Base64** strings or files. This app is built using React and runs directly in your browser. It provides an easy-to-use interface with two text areas—just paste your content and convert instantly, or upload files for encoding.
 
This tool also supports decoding of `.b64` files into their original binary form.

## 🚀 Features  
 
- **Base64 Encode/Decode**: Convert plain text to Base64 and vice versa.  
- **File Upload**: Upload `.txt` files to encode or `.b64` files to decode.  
- **Download Results**: Download the converted content as `.b64` or `.bin`.  
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
npm run test
```bash
 
5. Lint the code:
```bash
npm run lint
```
 
6. Open [http://localhost:5173/base64-converter/](http://localhost:5173/base64-converter/) in your browser.  
 
## ✨ Usage  
 
### 📄 Text Encoding/Decoding  
 
1. **Enter plain text** in the input box.  
2. **Click ENcode →** to encode the string to Base64.  
3. **Enter Base64-encoded string** in the input box.  
4. **Click “← Decode”** to decode.  
 
### 📁 File Encoding/Decoding  
 
- **To encode a file**:  
  - Select a file using the "Load File" button.  
  - If the file is binary, it will be encoded automatically.  
  - Click **Save File** to save the result as `.b64`.  
 
- **To decode a file**:  
  - Select a `.b64` file using the "Load File" button.  
  - On success, the output will show `Loaded .b64 file. Decoded binary ready to save.`  
  - Click **Save File** to save the decoded content (in binary).  
 
Use the **🌞/🌙 toggle** on top to switch between Light and Dark mode.  
 
## 🤝 Contributing  
 
We welcome contributions!  
 
1. Fork the repo.
2. Create your feature branch:
> git checkout -b feature-name
 
3. Commit your changes:  
> git commit -am 'Add cool feature'
 
4. Push to GitHub:  
> git push origin feature-name
 
5. Open a pull request 🚀  
 
## 📄 License  
 
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file.  
 
## 🙏 Acknowledgments  
 
- Made with ❤️ by [@justyy](https://github.com/doctorlai)  
- Like this project? Consider [buying me a coffee](https://justyy.com/out/bmc) ☕  
