/**
 * Ordered list of kanji digits from one (一) to nine (九).
 * The index corresponds to (digit value - 1).
 */
const KANJI_DIGITS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

/**
 * Extracts all one-digit and two-digit kanji numbers from a given string.
 *
 * Matches patterns such as:
 * - Single kanji digits: 一, 二, ..., 九
 * - Two-digit numbers using 十: 十, 十一, 二十, 二十三, etc.
 *
 * @param {string} str The string to extract kanji numbers from.
 * @return {string[]} An array of matched kanji number strings.
 * @example
 * extractKanjiNumbers('令和四年二月二十一日');
 * // => ['四', '二', '二十一']
 */
const extractKanjiNumbers = (str: string): string[] => {
  const kanjiNumberRegex = /(?:([二三四五六七八九])?(十)([一二三四五六七八九])?)|(?:[一二三四五六七八九])/g;
  return str.match(kanjiNumberRegex) || [];
}

/**
 * Converts a kanji number string to its Arabic numeral equivalent.
 *
 * Handles two cases:
 * - Numbers containing 十 (ten): interprets as a two-digit number (e.g., 二十三 → 23, 十五 → 15, 二十 → 20)
 * - Numbers without 十: converts each kanji digit individually (e.g., 四 → 4, 一二 → 12)
 *
 * @param {string} kanjiNumber The kanji number string to convert.
 * @return {number} The Arabic numeral equivalent.
 * @example
 * convertKanjiToNumber('二十三');
 * // => 23
 *
 * @example
 * convertKanjiToNumber('五');
 * // => 5
 */
const convertKanjiToNumber = (kanjiNumber: string): number => {
  let result = '';

  if (kanjiNumber.includes('十')) {
    // When the first character is 十, the tens digit is 1.
    if (kanjiNumber[0] === '十') {
      result = '1';
    }
    // When the first character is a kanji digit (二–九) followed by 十, use it as the tens digit.
    else if (KANJI_DIGITS.includes(kanjiNumber[0]) && kanjiNumber[1] === '十') {
      result = String(KANJI_DIGITS.indexOf(kanjiNumber[0]) + 1);
    }

    // Determine the ones digit: if the last character is a kanji digit, use it; if it's 十, the ones digit is 0.
    const lastChar = kanjiNumber[kanjiNumber.length - 1];
    if (KANJI_DIGITS.includes(lastChar)) {
      result += String(KANJI_DIGITS.indexOf(lastChar) + 1);
    } else if (lastChar === '十') {
      result += '0';
    }
  } else {
    // Without 十, simply convert each kanji digit to its Arabic equivalent.
    for (let i = 0; i < kanjiNumber.length; i++) {
      const digit = kanjiNumber[i];
      if (KANJI_DIGITS.includes(digit)) {
        result += String(KANJI_DIGITS.indexOf(digit) + 1);
      }
    }
  }

  return Number(result);
}

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
export default (dateString: string): string => {
  // Replace 元年 (first year of an era) with 1年.
  const normalizedDate = dateString.replace('元年', '1年');

  // Extract all kanji numbers and replace each with its Arabic equivalent.
  const kanjiNumbers = extractKanjiNumbers(normalizedDate);
  return kanjiNumbers.reduce((result, kanjiNumber) => {
    const number = convertKanjiToNumber(kanjiNumber);
    return result.replace(kanjiNumber, String(number));
  }, normalizedDate);
}
