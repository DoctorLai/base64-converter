# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Because this project ships continuously to GitHub Pages rather than publishing
versioned packages, releases are dated (`YYYY.M.D`).

## [Unreleased]

### Added

- GitHub Pages deployment workflow, triggered by pushes to `main` and manual
  dispatch (`.github/workflows/deploy.yml`).
- **Traditional Chinese (`zh-TW`)** translation, bringing the interface to
  26 languages.

### Changed

- Links are now rendered in yellow in dark mode for better contrast.
- Refactored i18n so each language lives in its own JSON file under
  `src/lang/locales/` instead of a single module.

## [2026.7.11]

### Added

- **Internationalization (i18n):** the interface can now be displayed in 25
  languages via a language selector, with the choice persisted in `localStorage`.
  Translations live in `src/lang/`.
- **Copy to clipboard** button for the output area.
- **Live character and byte counts** for the input and output.
- ESLint configuration and `npm run lint` / `npm run lint:fix` scripts.
- `npm run check` script that runs formatting, linting, coverage, and build.
- Community health files: `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  `SUPPORT.md`, `PRIVACY.md`, `CHANGELOG.md`.
- Repository config: `.gitattributes`, `.nvmrc`, `.github/dependabot.yml`, and a
  pull request template.
- A workflow that publishes a **dynamic JavaScript-percentage badge**.
- Many additional badges in the README.

### Changed

- Raised coverage thresholds to 80% across lines, statements, functions, and
  branches, and expanded the test suite to meet them.
- CI now runs linting and coverage in addition to formatting, tests, and build.
- Consolidated the Vitest configuration and corrected the test setup file path.

### Fixed

- Repaired three unit tests in `Functions.test.js` that were wrapped in `if(...)`
  guards and therefore never executed.
- Corrected misleading test descriptions for non-ASCII text detection.

## [1.0.0]

### Added

- Initial release: Base64 encode/decode for text and files, `.b64`/`.bin`
  download, dark mode, tab support, and GitHub Pages deployment.
