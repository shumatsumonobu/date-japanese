import moment from 'moment';
import 'moment/locale/ja';
import isValidJapaneseCalendar from '~/isValidJapaneseCalendar';
import JAPANESE_CALENDAR_FORMATS from '~/utils/japaneseCalendarFormats';
import normalizeKanjiNumerals from '~/utils/normalizeKanjiNumerals';
import convertKanjiToArabic from '~/utils/convertKanjiToArabic';

/** Regex building blocks for validating the output format string. */
const YEAR_TOKEN = '(Y{2}|Y{4})';
const MONTH_TOKEN = 'M{1,4}';
const DAY_TOKEN = 'D{1,2}';
const SEPARATOR_TOKEN = '[^YMD]*';

/**
 * Pre-compiled regex that validates the output format string.
 * Accepts any permutation of year, month, and day tokens separated by non-token characters.
 */
const FORMAT_VALIDATION_REGEX = new RegExp(`^(${[
  `${YEAR_TOKEN}${SEPARATOR_TOKEN}`,
  `${MONTH_TOKEN}${SEPARATOR_TOKEN}`,
  `${DAY_TOKEN}${SEPARATOR_TOKEN}`,
  `${YEAR_TOKEN}${SEPARATOR_TOKEN}${MONTH_TOKEN}${SEPARATOR_TOKEN}`,
  `${YEAR_TOKEN}${SEPARATOR_TOKEN}${DAY_TOKEN}${SEPARATOR_TOKEN}`,
  `${YEAR_TOKEN}${SEPARATOR_TOKEN}${MONTH_TOKEN}${SEPARATOR_TOKEN}${DAY_TOKEN}${SEPARATOR_TOKEN}`,
  `${YEAR_TOKEN}${SEPARATOR_TOKEN}${DAY_TOKEN}${SEPARATOR_TOKEN}${MONTH_TOKEN}${SEPARATOR_TOKEN}`,
  `${MONTH_TOKEN}${SEPARATOR_TOKEN}${YEAR_TOKEN}${SEPARATOR_TOKEN}`,
  `${MONTH_TOKEN}${SEPARATOR_TOKEN}${DAY_TOKEN}${SEPARATOR_TOKEN}`,
  `${MONTH_TOKEN}${SEPARATOR_TOKEN}${YEAR_TOKEN}${SEPARATOR_TOKEN}${DAY_TOKEN}${SEPARATOR_TOKEN}`,
  `${MONTH_TOKEN}${SEPARATOR_TOKEN}${DAY_TOKEN}${SEPARATOR_TOKEN}${YEAR_TOKEN}${SEPARATOR_TOKEN}`,
  `${DAY_TOKEN}${SEPARATOR_TOKEN}${YEAR_TOKEN}${SEPARATOR_TOKEN}`,
  `${DAY_TOKEN}${SEPARATOR_TOKEN}${MONTH_TOKEN}${SEPARATOR_TOKEN}`,
  `${DAY_TOKEN}${SEPARATOR_TOKEN}${YEAR_TOKEN}${SEPARATOR_TOKEN}${MONTH_TOKEN}${SEPARATOR_TOKEN}`,
  `${DAY_TOKEN}${SEPARATOR_TOKEN}${MONTH_TOKEN}${SEPARATOR_TOKEN}${YEAR_TOKEN}${SEPARATOR_TOKEN}`,
].map(f => `(${f})`).join('|')})$`);

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
export default (japaneseDate: string, format: string = 'YYYY-MM-DD', throwOnInvalid: boolean = false): string => {
  // Correct potential misrecognized characters (e.g., from OCR) to proper kanji numerals.
  japaneseDate = normalizeKanjiNumerals(japaneseDate);

  // Convert kanji numerals to Arabic numerals (e.g., 四 → 4, 二十一 → 21).
  japaneseDate = convertKanjiToArabic(japaneseDate);

  // Validate the input date format.
  if (!isValidJapaneseCalendar(japaneseDate)) {
    if (throwOnInvalid)
      throw new TypeError('Invalid Japanese calendar date format.');
    else
      return '';
  }

  // Validate the output format string.
  if (!FORMAT_VALIDATION_REGEX.test(format))
    throw new TypeError('Invalid format string. Available tokens are YYYY, YY, M, MM, MMM, MMMM, D, DD');

  // Parse the Japanese calendar date with Japanese locale (instance-level, no global state).
  const parsedDate = moment(japaneseDate, JAPANESE_CALENDAR_FORMATS, 'ja', true);

  // Convert to Western calendar date and format.
  return parsedDate.format(format);
}
