import {toWesternCalendar} from '../dist/build.mjs';

describe('toWesternCalendar', () => {
  describe('converts year-month-day input', () => {
    test.each([
      ['明治元年1月25日', '1868-01-25'],
      ['明治45年7月29日', '1912-07-29'],
      ['大正元年7月30日', '1912-07-30'],
      ['大正15年12月24日', '1926-12-24'],
      ['昭和元年12月25日', '1926-12-25'],
      ['昭和64年1月7日', '1989-01-07'],
      ['平成元年1月8日', '1989-01-08'],
      ['平成31年4月30日', '2019-04-30'],
      ['令和元年5月1日', '2019-05-01'],
      ['令和4年2月21日', '2022-02-21'],
    ])('"%s" → "%s"', (japaneseDate, expected) => {
      expect(toWesternCalendar(japaneseDate)).toBe(expected);
    });
  });

  describe('converts year-month input', () => {
    test.each([
      ['明治元年1月', 'YYYY-MM', '1868-01'],
      ['明治45年7月', 'YYYY-MM', '1912-07'],
      ['大正元年7月', 'YYYY-MM', '1912-07'],
      ['大正15年12月', 'YYYY-MM', '1926-12'],
      ['昭和元年12月', 'YYYY-MM', '1926-12'],
      ['昭和64年1月', 'YYYY-MM', '1989-01'],
      ['平成元年1月', 'YYYY-MM', '1989-01'],
      ['平成31年4月', 'YYYY-MM', '2019-04'],
      ['令和元年5月', 'YYYY-MM', '2019-05'],
      ['令和4年2月', 'YYYY-MM', '2022-02'],
    ])('"%s" → "%s" (format: %s)', (japaneseDate, format, expected) => {
      expect(toWesternCalendar(japaneseDate, format)).toBe(expected);
    });
  });

  describe('converts year-only input', () => {
    test.each([
      ['明治元年', 'YYYY', '1868'],
      ['明治45年', 'YYYY', '1912'],
      ['大正元年', 'YYYY', '1912'],
      ['大正15年', 'YYYY', '1926'],
      ['昭和元年', 'YYYY', '1926'],
      ['昭和64年', 'YYYY', '1989'],
      ['平成元年', 'YYYY', '1989'],
      ['平成31年', 'YYYY', '2019'],
      ['令和元年', 'YYYY', '2019'],
      ['令和4年', 'YYYY', '2022'],
    ])('"%s" → "%s" (format: %s)', (japaneseDate, format, expected) => {
      expect(toWesternCalendar(japaneseDate, format)).toBe(expected);
    });
  });

  describe('converts kanji numeral input', () => {
    test.each([
      ['明治元年一月二十五日', '1868-01-25'],
      ['明治四十五年七月二十九日', '1912-07-29'],
      ['大正元年七月三十日', '1912-07-30'],
      ['大正十五年十二月二十四日', '1926-12-24'],
      ['昭和元年十二月二十五日', '1926-12-25'],
      ['昭和六十四年一月七日', '1989-01-07'],
      ['平成元年一月八日', '1989-01-08'],
      ['平成三十一年四月三十日', '2019-04-30'],
      ['令和元年五月一日', '2019-05-01'],
      ['令和四年二月二十一日', '2022-02-21'],
      ['令和七年一月三十一日', '2025-01-31'],
      ['明治一年一月一日', '1868-01-01'],
      ['令和七年十月十日', '2025-10-10'],
    ])('"%s" → "%s"', (japaneseDate, expected) => {
      expect(toWesternCalendar(japaneseDate)).toBe(expected);
    });
  });

  describe('supports custom output formats', () => {
    test.each([
      ['YYYY/MM/DD', '2022/02/21'],
      ['YY-MM-DD', '22-02-21'],
      ['MM/DD/YYYY', '02/21/2022'],
      ['DD-MM-YYYY', '21-02-2022'],
      ['YYYY', '2022'],
      ['MM', '02'],
      ['DD', '21'],
      ['M', '2'],
      ['D', '21'],
    ])('format "%s" → "%s"', (format, expected) => {
      expect(toWesternCalendar('令和4年2月21日', format)).toBe(expected);
    });
  });

  describe('returns empty string for invalid input', () => {
    test.each([
      ['', 'empty string'],
      ['abc', 'random string'],
      ['2022-02-21', 'Western calendar date'],
      ['令和', 'era name only'],
    ])('%s (%s)', (japaneseDate) => {
      expect(toWesternCalendar(japaneseDate)).toBe('');
    });
  });

  describe('throwOnInvalid option', () => {
    test('throws TypeError for invalid input when enabled', () => {
      expect(() => toWesternCalendar('invalid', 'YYYY-MM-DD', true)).toThrow(TypeError);
    });

    test('does not throw for valid input when enabled', () => {
      expect(() => toWesternCalendar('令和4年2月21日', 'YYYY-MM-DD', true)).not.toThrow();
    });
  });

  describe('invalid format string', () => {
    test('throws TypeError for unrecognized format tokens', () => {
      expect(() => toWesternCalendar('令和4年2月21日', 'INVALID')).toThrow(TypeError);
    });
  });
});
