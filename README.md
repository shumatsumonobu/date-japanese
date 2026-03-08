# date-japanese

Seamless conversion between Japanese era dates (和暦) and Western dates — with full kanji numeral and OCR support.

```js
toWesternCalendar('令和4年2月21日');        // '2022-02-21'
toWesternCalendar('令和七年一月三十一日');    // '2025-01-31'  ← kanji numerals
toJapaneseCalendar('2022-02-21');           // '令和4年2月21日'
```

Five eras. One API. Zero friction.

## Features

- **Bidirectional** — Western ↔ Japanese, both directions
- **Kanji numerals** — `令和七年一月三十一日` just works
- **OCR-friendly** — auto-corrects common misrecognized characters
- **Flexible precision** — year-month-day, year-month, or year-only
- **Universal** — ESM, CommonJS, and browser (UMD)
- **TypeScript** — ships with type declarations out of the box

## Install

```bash
npm install date-japanese
```

## Quick Start

```js
// ESM
import {toWesternCalendar, toJapaneseCalendar, isValidJapaneseCalendar} from 'date-japanese';

// CommonJS
const {toWesternCalendar, toJapaneseCalendar, isValidJapaneseCalendar} = require('date-japanese');
```

```js
// Japanese → Western
toWesternCalendar('令和4年2月21日');                    // '2022-02-21'
toWesternCalendar('平成31年4月30日', 'YYYY/MM/DD');     // '2019/04/30'
toWesternCalendar('令和四年二月二十一日', 'YYYY-MM-DD'); // '2022-02-21'

// Western → Japanese
toJapaneseCalendar('2022-02-21');   // '令和4年2月21日'
toJapaneseCalendar('1989-01');      // '昭和64年1月'
toJapaneseCalendar('1868');         // '明治元年'

// Validation
isValidJapaneseCalendar('令和4年2月21日');   // true
isValidJapaneseCalendar('2022-02-21');      // false
```

**Browser (UMD)**

```html
<script src="node_modules/date-japanese/dist/build.js"></script>
<script>
  dateJapanese.toWesternCalendar('令和4年2月21日');   // '2022-02-21'
  dateJapanese.toJapaneseCalendar('2022-02-21');      // '令和4年2月21日'
</script>
```

## API

### `toWesternCalendar(japaneseDate, format?, throwOnInvalid?)`

Converts a Japanese calendar date to a Western (Gregorian) calendar date.
Kanji numerals and OCR-misrecognized characters are handled automatically.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `japaneseDate` | `string` | — | Japanese calendar date (e.g., `'令和4年2月20日'`, `'令和4年2月'`, `'令和4年'`) |
| `format` | `string` | `'YYYY-MM-DD'` | Output date format (see format tokens below). Throws `TypeError` if invalid. |
| `throwOnInvalid` | `boolean` | `false` | Throw `TypeError` on invalid input instead of returning `''` |

Returns the formatted Western date string, or `''` if the input is invalid and `throwOnInvalid` is `false`.

**Format tokens**

| Token | Output | Example |
|-------|--------|---------|
| `YYYY` | 4-digit year | `2022` |
| `YY` | 2-digit year | `22` |
| `MMMM` | Full month name | `February` |
| `MMM` | Abbreviated month | `Feb` |
| `MM` | 2-digit month | `02` |
| `M` | Month | `2` |
| `DD` | 2-digit day | `05` |
| `D` | Day | `5` |

```js
toWesternCalendar('令和4年2月21日');                    // '2022-02-21'
toWesternCalendar('平成31年4月30日', 'YYYY/MM/DD');     // '2019/04/30'
toWesternCalendar('令和四年二月二十一日', 'YYYY-MM-DD'); // '2022-02-21'
toWesternCalendar('令和4年2月', 'YYYY-MM');              // '2022-02'
toWesternCalendar('明治元年', 'YYYY');                   // '1868'
toWesternCalendar('invalid');                            // ''
toWesternCalendar('invalid', 'YYYY-MM-DD', true);       // throws TypeError
```

### `toJapaneseCalendar(westernDate, throwOnInvalid?)`

Converts a Western (Gregorian) calendar date to a Japanese calendar date.
Supports dates from **1868-01-25** onwards (Meiji era and later).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `westernDate` | `string` | — | Western date in any format listed below |
| `throwOnInvalid` | `boolean` | `false` | Throw `TypeError` on invalid input instead of returning `''` |

Returns the Japanese calendar date string (e.g., `'令和4年2月21日'`), or `''` if the input is before the Meiji era or invalid.

**Accepted input formats**

| Precision | Formats |
|-----------|---------|
| Year-month-day | `YYYY-MM-DD` `YYYY-M-D` `YYYY/MM/DD` `YYYY/M/D` |
| | `MM-DD-YYYY` `M-D-YYYY` `MM/DD/YYYY` `M/D/YYYY` |
| Year-month | `YYYY-MM` `YYYY-M` `YYYY/MM` `YYYY/M` |
| | `MM-YYYY` `M-YYYY` `MM/YYYY` `M/YYYY` |
| Year-only | `YYYY` |

```js
toJapaneseCalendar('2022-02-21');    // '令和4年2月21日'
toJapaneseCalendar('2019-05-01');    // '令和元年5月1日'
toJapaneseCalendar('1989-01');       // '昭和64年1月'
toJapaneseCalendar('1868');          // '明治元年'
toJapaneseCalendar('1867-12-31');    // ''  (before Meiji)
toJapaneseCalendar('invalid', true); // throws TypeError
```

### `isValidJapaneseCalendar(value)`

Checks if a string is a valid Japanese calendar date.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `string` | The value to validate |

Returns `true` if valid, `false` otherwise.

```js
isValidJapaneseCalendar('令和4年2月21日');   // true
isValidJapaneseCalendar('平成31年4月');      // true
isValidJapaneseCalendar('昭和元年');         // true
isValidJapaneseCalendar('2022-02-21');      // false
```

## Supported Eras

| Era | Japanese | Period |
|-----|----------|--------|
| Meiji | 明治 | 1868-01-25 ~ 1912-07-29 |
| Taisho | 大正 | 1912-07-30 ~ 1926-12-24 |
| Showa | 昭和 | 1926-12-25 ~ 1989-01-07 |
| Heisei | 平成 | 1989-01-08 ~ 2019-04-30 |
| Reiwa | 令和 | 2019-05-01 ~ present |

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Author

**shumatsumonobu** — [GitHub](https://github.com/shumatsumonobu) / [X](https://x.com/shumatsumonobu) / [Facebook](https://www.facebook.com/takuya.motoshima.7)

## License

[MIT](LICENSE)
