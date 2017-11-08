## 0.3.0 (November 8, 2017)

#### 🚀 New Feature

- `app`
  - Add WordPress type choice: single-site or multisite. ([@ruslankhh](https://github.com/ruslankhh))
  - Change WordPress file structure (`app` folder now includes `core`, `plugins` and `themes` folders). ([@ruslankhh](https://github.com/ruslankhh))

#### Committers: 1

- Ruslan Khusnetdinov ([ruslankhh](https://github.com/ruslankhh))

## 0.2.0 (November 6, 2017)

#### 🚀 New Feature

- `app`
  - Add creation MySQL database with WP-CLI. ([@ruslankhh](https://github.com/ruslankhh))
  - Add installation WordPress with WP-CLI. ([@ruslankhh](https://github.com/ruslankhh))

#### 🏠 Internal

- `app`
  - Add `wp-cli.local.yml` for WP-CLI. ([@ruslankhh](https://github.com/ruslankhh))
  - Update test cases for installation WP-CLI. ([@ruslankhh](https://github.com/ruslankhh))
  - Update test cases for installation WordPress. ([@ruslankhh](https://github.com/ruslankhh))

- Other
  - Add `services: mysql` to `.travis.yml`. ([@ruslankhh](https://github.com/ruslankhh))

#### Committers: 1

- Ruslan Khusnetdinov ([ruslankhh](https://github.com/ruslankhh))

## 0.1.0-unstable (November 6, 2017)

#### 🚀 New Feature

- `app`
  - Add prompts with default values. ([@ruslankhh](https://github.com/ruslankhh))
  - Add installation WP-CLI with Composer. ([@ruslankhh](https://github.com/ruslankhh))
  - Add download WordPress with WP-CLI. ([@ruslankhh](https://github.com/ruslankhh))

#### 🏠 Internal

- `app`
  - Update test cases for prompts. ([@ruslankhh](https://github.com/ruslankhh))
  - Update test cases for installation WP-CLI. ([@ruslankhh](https://github.com/ruslankhh))
  - Update test cases for download WordPress. ([@ruslankhh](https://github.com/ruslankhh))

- Other
  - Add `generators` folder to `.eslintignore`. ([@ruslankhh](https://github.com/ruslankhh))
  - Add all folder without ignored to `eslint`. ([@ruslankhh](https://github.com/ruslankhh))
  - Add `watch` to `npm scripts`. ([@ruslankhh](https://github.com/ruslankhh))
  - Delete `node_js: 7` from `.travis.yml`. ([@ruslankhh](https://github.com/ruslankhh))

#### Committers: 1

- Ruslan Khusnetdinov ([ruslankhh](https://github.com/ruslankhh))

## 0.0.4 (November 5, 2017)

#### 🐛 Bug Fix

- Fix problem with `npm link` and using generator. ([@ruslankhh](https://github.com/ruslankhh))

#### 🏠 Internal

- Move back `build/generators` to `generators`. ([@ruslankhh](https://github.com/ruslankhh))

#### Committers: 1

- Ruslan Khusnetdinov ([ruslankhh](https://github.com/ruslankhh))

## 0.0.3 (November 4, 2017)

#### 📝 Documentation

- Add CHANGELOG.md. ([@ruslankhh](https://github.com/ruslankhh))

#### 🏠 Internal

- Move back `templates` to `src/generators/app/templates`. ([@ruslankhh](https://github.com/ruslankhh))

#### Committers: 1

- Ruslan Khusnetdinov ([ruslankhh](https://github.com/ruslankhh))

## 0.0.2 (November 4, 2017)

#### 🏠 Internal

- Remove `build` folder. ([@ruslankhh](https://github.com/ruslankhh))

#### Committers: 1

- Ruslan Khusnetdinov ([ruslankhh](https://github.com/ruslankhh))

## 0.0.1 (November 1, 2017)

#### 💅 Enhancement

- Add `babel` for support `import`. ([@ruslankhh](https://github.com/ruslankhh))

#### 🏠 Internal

- Rename `generator-wp-site` to `generator-wp-app`. ([@ruslankhh](https://github.com/ruslankhh))
- Move `generators/app/templates` to `templates`. ([@ruslankhh](https://github.com/ruslankhh))

#### Committers: 1

- Ruslan Khusnetdinov ([ruslankhh](https://github.com/ruslankhh))
