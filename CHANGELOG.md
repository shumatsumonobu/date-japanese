# Changelog

## [2.1.0] - 2025-03-09

Stability and reliability improvements.

### Bug Fixes

- **No more global locale mutation** — switched from global `moment.locale()` to instance-level locale (`moment(value, format, 'ja', true)`), eliminating locale state leaks between function calls entirely

### Improvements

- **Expanded test coverage** — added tests for invalid inputs, `throwOnInvalid` behavior, custom output formats, and edge cases across all functions
- **Updated all dependencies** — jest 29 → 30, rimraf 3 → 6, rollup 4.32 → 4.59, and all rollup plugins to latest

## [2.0.0] - 2025-02-03

A major update with kanji numeral support, OCR correction, and a cleaner API.

### Breaking Changes

All public functions have been renamed for clarity:

| Before | After |
|--------|-------|
| `jp2west()` | `toWesternCalendar()` |
| `west2jp()` | `toJapaneseCalendar()` |
| `isJapaneseCalendar()` | `isValidJapaneseCalendar()` |

### Highlights

- **Kanji numerals** — pass `令和七年一月三十一日` directly, no manual conversion needed
- **OCR correction** — katakana look-alikes (ニ→二, ロ→六, ハ→八, ...) are auto-corrected
- **Custom output formats** — `toWesternCalendar('令和4年2月21日', 'YYYY/MM/DD')` → `'2022/02/21'`
- **Error control** — new `throwOnInvalid` option for explicit `TypeError` instead of silent `''`
- **Flexible precision** — year-month-day, year-month, and year-only all supported in both directions
- **TypeScript ready** — ships with type declarations out of the box

### Under the Hood

- moment 2.29.1 → 2.30.1
- rollup 2.67.3 → 4.32.1

## [1.0.1] - 2023-11-07

- **Validation** — new `isJapaneseCalendar()` function to check if a string is a valid Japanese calendar date

## [1.0.0] - 2022-02-21

First release. Bidirectional conversion between Japanese era dates (和暦) and Western dates across all five modern eras — Meiji, Taisho, Showa, Heisei, Reiwa. Available as ESM, CommonJS, and UMD bundles.

[1.0.0]: https://github.com/shumatsumonobu/date-japanese/releases/tag/v1.0.0
[1.0.1]: https://github.com/shumatsumonobu/date-japanese/compare/v1.0.0...v1.0.1
[2.0.0]: https://github.com/shumatsumonobu/date-japanese/compare/v1.0.1...v2.0.0
[2.1.0]: https://github.com/shumatsumonobu/date-japanese/compare/v2.0.0...v2.1.0
