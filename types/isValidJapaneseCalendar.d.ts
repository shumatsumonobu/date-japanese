import 'moment/locale/ja';
/**
 * Checks if the given value is a valid Japanese calendar date string.
 * Supported eras: Meiji (明治), Taisho (大正), Showa (昭和), Heisei (平成), Reiwa (令和).
 * Supported formats: year-month-day (e.g., '令和4年2月20日'), year-month (e.g., '令和4年2月'), or year-only (e.g., '令和4年').
 *
 * @param {string} value The value to be validated.
 * @return {boolean} `true` if the value is a valid Japanese calendar date, `false` otherwise.
 * @example
 * // Year-month-day format
 * isValidJapaneseCalendar('令和4年2月20日');
 * // => true
 *
 * @example
 * // Year-month format
 * isValidJapaneseCalendar('平成31年4月');
 * // => true
 *
 * @example
 * // Year-only format
 * isValidJapaneseCalendar('昭和元年');
 * // => true
 *
 * @example
 * // Western calendar dates are not valid
 * isValidJapaneseCalendar('2022-02-21');
 * // => false
 */
declare const _default: (value: string) => boolean;
export default _default;
