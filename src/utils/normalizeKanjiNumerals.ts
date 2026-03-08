/**
 * Replacement mapping from frequently misrecognized characters to correct kanji numerals.
 * Each entry consists of a regex pattern matching incorrect characters and the correct kanji replacement.
 */
const REPLACEMENTS: [RegExp, string][] = [
  [/[O。●○]/g, '〇'],
  [/[ー\-]/g, '一'],
  [/ニ/g, '二'],
  [/[ミ3]/g, '三'],
  [/シ/g, '四'],
  [/互/g, '五'],
  [/ロ/g, '六'],
  [/[ナ7]/g, '七'],
  [/ハ/g, '八'],
  [/ク/g, '九'],
  [/[チ+]/g, '十'],
];

/**
 * Replaces characters that are often misrecognized (e.g., by OCR) with the correct kanji numerals.
 *
 * Common misrecognitions corrected:
 * - Katakana look-alikes: ニ→二, ミ→三, シ→四, ロ→六, ナ→七, ハ→八, ク→九, チ→十
 * - Symbol look-alikes: O/。/●/○→〇, ー/-→一, 互→五, 3→三, 7→七, +→十
 *
 * @param {string} text The input text that may contain misrecognized characters.
 * @return {string} The text with misrecognized characters replaced by correct kanji numerals.
 * @example
 * normalizeKanjiNumerals('令和ロ年ニ月');
 * // => '令和六年二月'
 *
 * @example
 * normalizeKanjiNumerals('平成チハ年');
 * // => '平成十八年'
 */
export default (text: string): string => {
  return REPLACEMENTS.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), text);
}
