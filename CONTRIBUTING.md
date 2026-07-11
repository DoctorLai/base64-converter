# Contributing to Base64 Converter

First off, thank you for taking the time to contribute! 🎉 Contributions of all
kinds are welcome — bug reports, feature requests, documentation improvements,
translations, and code.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Available Scripts](#available-scripts)
- [Coding Standards](#coding-standards)
- [Adding a Translation](#adding-a-translation)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)

## Code of Conduct

This project and everyone participating in it is governed by our
[Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to
uphold it.

## Getting Started

1. **Fork** the repository and clone your fork.
2. Make sure you are using the Node.js version in [`.nvmrc`](.nvmrc)
   (Node 20+). If you use `nvm`, run `nvm use`.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

## Development Workflow

1. Create a feature branch:

   ```bash
   git checkout -b feature/my-cool-feature
   ```

2. Make your changes and add tests where relevant.
3. Run the full check suite before committing:

   ```bash
   npm run check
   ```

4. Commit, push, and open a pull request.

## Available Scripts

| Script                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the Vite development server.                 |
| `npm run build`        | Build the production bundle.                       |
| `npm run preview`      | Preview the production build locally.              |
| `npm run test`         | Run the test suite once.                           |
| `npm run coverage`     | Run tests and enforce coverage thresholds.         |
| `npm run lint`         | Lint the source with ESLint.                       |
| `npm run lint:fix`     | Lint and auto-fix where possible.                  |
| `npm run format`       | Check formatting with Prettier.                    |
| `npm run format:fix`   | Auto-format the source with Prettier.              |
| `npm run check`        | Run format + lint + coverage + build (everything). |

## Coding Standards

- **Formatting** is handled by [Prettier](https://prettier.io/). Run
  `npm run format:fix` before committing.
- **Linting** is handled by [ESLint](https://eslint.org/). Fix any warnings with
  `npm run lint:fix`.
- Keep functions small and pure where possible; the pure conversion helpers live
  in [`src/functions.js`](src/functions.js) and are covered by unit tests.
- Add or update tests in [`tests/`](tests) for any behavior change.

## Adding a Translation

UI strings live in one JSON file per language under
[`src/lang/locales/`](src/lang/locales) (for example, `en.json`, `zh-TW.json`).
To add or improve a language:

1. Copy [`src/lang/locales/en.json`](src/lang/locales/en.json) to
   `src/lang/locales/<code>.json` (using the language's BCP-47 code, e.g. `sv`
   or `zh-TW`) and translate every value.
2. Add the language's native display name to `languageNames` in
   [`src/lang/translations.js`](src/lang/translations.js) — and add its code to
   `RTL_LANGUAGES` there if it is written right-to-left.
3. Run `npm run test` — the i18n tests verify that every locale defines all keys.

## Commit Messages

- Use clear, imperative subject lines (e.g. "Add clipboard copy button").
- Reference issues where relevant (e.g. `Fixes #123`).

## Pull Requests

- Fill out the pull request template.
- Ensure `npm run check` passes locally and in CI.
- Keep pull requests focused; smaller PRs are easier to review.

Thanks again for contributing! 🙏
