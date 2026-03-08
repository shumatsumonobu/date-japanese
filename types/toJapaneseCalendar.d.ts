import 'moment/locale/ja';
/**
 * Converts a Western (Gregorian) calendar date to a Japanese calendar date.
 * Only supports dates from 1868-01-25 onwards (Meiji era and later).
 * Supported eras: Meiji (明治), Taisho (大正), Showa (昭和), Heisei (平成), Reiwa (令和).
 *
 * @param {string} westernDate Western calendar date in one of the following formats:
 *   - Year-month-day: 'YYYY-MM-DD', 'YYYY-M-D', 'YYYY/MM/DD', 'YYYY/M/D', 'MM-DD-YYYY', 'M-D-YYYY', 'MM/DD/YYYY', 'M/D/YYYY'
 *   - Year-month: 'YYYY-MM', 'YYYY-M', 'YYYY/MM', 'YYYY/M', 'MM-YYYY', 'M-YYYY', 'MM/YYYY', 'M/YYYY'
 *   - Year-only: 'YYYY'
 * @param {boolean} [throwOnInvalid=false] If `true`, throws an error for invalid input. If `false`, returns an empty string (default: `false`).
 * @return {string} The Japanese calendar date (e.g., '令和4年2月20日'), or an empty string if the input is before the Meiji era or invalid.
 * @throws {TypeError} If the input date format is invalid and `throwOnInvalid` is `true`.
 * @example
 * // Year-month-day conversion
 * toJapaneseCalendar('2022-02-21');
 * // => '令和4年2月21日'
 *
 * @example
 * // Year-month conversion
 * toJapaneseCalendar('1989-01');
 * // => '昭和64年1月'
 *
 * @example
 * // Year-only conversion
 * toJapaneseCalendar('1868');
 * // => '明治元年'
 *
 * @example
 * // Dates before the Meiji era return an empty string
 * toJapaneseCalendar('1867-12-31');
 * // => ''
 *
 * @example
 * // With throwOnInvalid enabled
 * toJapaneseCalendar('invalid', true);
 * // => throws TypeError
 */
declare const _default: (westernDate: string, throwOnInvalid?: boolean) => string;
export default _default;
