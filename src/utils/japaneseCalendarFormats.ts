/**
 * Supported Japanese calendar date format patterns for moment.js parsing.
 *
 * Format tokens:
 * - `NNNN` — Era name in kanji (e.g., 令和, 平成, 昭和, 大正, 明治)
 * - `yo`   — Year with the Japanese "年" suffix (e.g., 4年, 元年)
 * - `M月`  — Month with the Japanese "月" suffix (e.g., 2月, 12月)
 * - `D日`  — Day with the Japanese "日" suffix (e.g., 1日, 31日)
 *
 * The formats are ordered from most specific (year-month-day) to least specific (year-only).
 * @example
 * // JAPANESE_CALENDAR_FORMATS contains:
 * // ['NNNNyoM月D日', 'NNNNyoM月', 'NNNNyo']
 * // Matches strings like: '令和4年2月20日', '平成31年4月', '昭和元年'
 */
const JAPANESE_CALENDAR_FORMATS: string[] = [
  'NNNNyoM月D日',
  'NNNNyoM月',
  'NNNNyo',
];

export default JAPANESE_CALENDAR_FORMATS;
