/**
 * Converts kanji numerals within a Japanese calendar date string to Arabic numerals.
 * Also replaces 元年 (first year of an era) with 1年.
 *
 * @param {string} dateString The Japanese calendar date string containing kanji numerals.
 * @return {string} The date string with all kanji numerals replaced by Arabic numerals.
 * @example
 * convertKanjiToArabic('令和四年二月二十一日');
 * // => '令和4年2月21日'
 *
 * @example
 * convertKanjiToArabic('平成元年一月八日');
 * // => '平成1年1月8日'
 */
declare const _default: (dateString: string) => string;
export default _default;
