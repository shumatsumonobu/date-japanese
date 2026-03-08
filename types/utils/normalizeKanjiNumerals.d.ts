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
declare const _default: (text: string) => string;
export default _default;
