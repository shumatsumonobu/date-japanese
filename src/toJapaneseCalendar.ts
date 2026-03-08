import moment from 'moment';
import 'moment/locale/ja';

/** The start date of the Meiji era as YYYYMMDD. */
const MEIJI_START_DATE = 18680125;

/** The start year of the Meiji era. */
const MEIJI_START_YEAR = 1868;

/** The start year-month of the Meiji era as YYYYMM. */
const MEIJI_START_YEAR_MONTH = 186801;

/** The start date of the Taisho era as YYYYMMDD (exclusive upper bound for the Meiji era). */
const TAISHO_START_DATE = 19120730;

/** The year used to calculate the Japanese year within the Meiji era (Western year - MEIJI_YEAR_OFFSET = Meiji year). */
const MEIJI_YEAR_OFFSET = 1867;

/** Date formats for year-month-day input. */
const YEAR_MONTH_DAY_FORMATS = [
  'YYYY-MM-DD',
  'YYYY-M-D',
  'YYYY/MM/DD',
  'YYYY/M/D',
  'MM-DD-YYYY',
  'M-D-YYYY',
  'MM/DD/YYYY',
  'M/D/YYYY',
];

/** Date formats for year-month input. */
const YEAR_MONTH_FORMATS = [
  'YYYY-MM',
  'YYYY-M',
  'YYYY/MM',
  'YYYY/M',
  'MM-YYYY',
  'M-YYYY',
  'MM/YYYY',
  'M/YYYY',
];

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
export default (westernDate: string, throwOnInvalid: boolean = false): string => {
  // Parse the date once per format group with Japanese locale (instance-level, no global state).
  let parsedDate: moment.Moment;
  let formatType: 'ymd' | 'ym' | 'y';

  const ymdCandidate = moment(westernDate, YEAR_MONTH_DAY_FORMATS, 'ja', true);
  const ymCandidate = moment(westernDate, YEAR_MONTH_FORMATS, 'ja', true);
  const yCandidate = moment(westernDate, 'YYYY', 'ja', true);

  if (ymdCandidate.isValid()) {
    parsedDate = ymdCandidate;
    formatType = 'ymd';
  } else if (ymCandidate.isValid()) {
    parsedDate = ymCandidate;
    formatType = 'ym';
  } else if (yCandidate.isValid()) {
    parsedDate = yCandidate;
    formatType = 'y';
  } else {
    if (throwOnInvalid)
      throw new TypeError(`Invalid date format: ${westernDate}`);
    else
      return '';
  }

  // Reject dates before the Meiji era based on the input format precision.
  if (
    (formatType === 'ymd' && parseInt(parsedDate.format('YYYYMMDD'), 10) < MEIJI_START_DATE) ||
    (formatType === 'ym' && parseInt(parsedDate.format('YYYYMM'), 10) < MEIJI_START_YEAR_MONTH) ||
    (formatType === 'y' && parseInt(parsedDate.format('YYYY'), 10) < MEIJI_START_YEAR)
  )
    return '';

  // Build the Japanese era year string.
  let japaneseDate;
  if (parseInt(parsedDate.format('YYYYMMDD'), 10) < TAISHO_START_DATE) {
    // Meiji era: calculate the year manually since moment doesn't handle Meiji correctly.
    const meijiYear = parseInt(parsedDate.format('YYYY'), 10) - MEIJI_YEAR_OFFSET;
    japaneseDate = `明治${meijiYear > 1 ? meijiYear : '元'}年`;
  } else {
    // For Taisho and later eras, use moment's built-in Japanese era formatting.
    japaneseDate = parsedDate.format('NNNNyo');
  }

  // Append month if the input includes month information.
  if (formatType === 'ym' || formatType === 'ymd')
    japaneseDate += parsedDate.format('M月');

  // Append day if the input includes day information.
  if (formatType === 'ymd')
    japaneseDate += parsedDate.format('D日');

  return japaneseDate;
}
