# Security Policy

## Supported Versions

This project is a client-side, browser-only tool with no backend. Security
fixes are always applied to the latest version deployed from the `main` branch.

| Version        | Supported          |
| -------------- | ------------------ |
| Latest (`main`)| :white_check_mark: |
| Older builds   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not open a public issue**.

Instead, report it privately using one of the following:

- Use GitHub's [private vulnerability reporting](https://github.com/DoctorLai/base64-converter/security/advisories/new).
- Or contact the maintainer via [https://justyy.com](https://justyy.com).

Please include:

- A clear description of the issue and its impact.
- Steps to reproduce (a minimal proof of concept is ideal).
- Any suggested remediation, if known.

## What to Expect

- We aim to acknowledge reports within **5 business days**.
- We will keep you informed as we investigate and work on a fix.
- Once resolved, we will credit you in the release notes unless you prefer to
  remain anonymous.

## Scope

Because Base64 Converter runs entirely in the browser and **never uploads your
data to any server**, the most relevant classes of issues are:

- Cross-site scripting (XSS) via crafted input or file content.
- Supply-chain issues in build/runtime dependencies.
- Denial of service in the browser (e.g. pathological inputs).

Thank you for helping keep the project and its users safe.
