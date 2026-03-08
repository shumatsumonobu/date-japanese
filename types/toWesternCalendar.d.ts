import 'moment/locale/ja';
/**
 * Converts a Japanese calendar date to a Western (Gregorian) calendar date in the specified format.
 * Supported eras: Meiji (明治), Taisho (大正), Showa (昭和), Heisei (平成), Reiwa (令和).
 * This function can also handle Japanese dates written with kanji numerals (e.g., '令和四年二月二十日').
 *
 * @param {string} japaneseDate Japanese calendar date (e.g., '令和4年2月20日', '令和4年2月', '令和4年').
 * @param {string} [format='YYYY-MM-DD'] Output date format. Available tokens: YYYY, YY, M, MM, MMM, MMMM, D, DD (default: 'YYYY-MM-DD').
 * @param {boolean} [throwOnInvalid=false] If `true`, throws an error for invalid input. If `false`, returns an empty string (default: `false`).
 * @return {string} The Western calendar date in the specified format, or an empty string if the input is invalid and `throwOnInvalid` is `false`.
 * @throws {TypeError} If the input date is invalid (when `throwOnInvalid` is `true`) or the format string contains invalid tokens.
 * @example
 * // Default format (YYYY-MM-DD)
 * toWesternCalendar('令和4年2月20日');
 * // => '2022-02-20'
 *
 * @example
 * // Custom format
 * toWesternCalendar('平成31年4月30日', 'YYYY/MM/DD');
 * // => '2019/04/30'
 *
 * @example
 * // Year-month only
 * toWesternCalendar('昭和64年1月', 'YYYY-MM');
 * // => '1989-01'
 *
 * @example
 * // Kanji numeral input
 * toWesternCalendar('令和四年二月二十一日', 'YYYY-MM-DD');
 * // => '2022-02-21'
 *
 * @example
 * // Year-only
 * toWesternCalendar('明治元年', 'YYYY');
 * // => '1868'
 */
declare const _default: (japaneseDate: string, format?: string, throwOnInvalid?: boolean) => string;
export default _default;
