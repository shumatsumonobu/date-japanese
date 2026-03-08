import {isValidJapaneseCalendar} from '../dist/build.mjs';

describe('isValidJapaneseCalendar', () => {
  describe('returns true for valid Japanese calendar dates', () => {
    test.each([
      '明治元年1月25日',
      '明治45年7月29日',
      '大正元年7月30日',
      '大正15年12月24日',
      '昭和元年12月25日',
      '昭和64年1月7日',
      '平成元年1月8日',
      '平成31年4月30日',
      '令和元年5月1日',
      '令和4年2月21日',
    ])('year-month-day: "%s"', (date) => {
      expect(isValidJapaneseCalendar(date)).toBe(true);
    });

    test.each([
      '明治元年1月',
      '明治45年7月',
      '大正元年7月',
      '大正15年12月',
      '昭和元年12月',
      '昭和64年1月',
      '平成元年1月',
      '平成31年4月',
      '令和元年5月',
      '令和4年2月',
    ])('year-month: "%s"', (date) => {
      expect(isValidJapaneseCalendar(date)).toBe(true);
    });

    test.each([
      '明治元年',
      '明治45年',
      '大正元年',
      '大正15年',
      '昭和元年',
      '昭和64年',
      '平成元年',
      '平成31年',
      '令和元年',
      '令和4年',
    ])('year-only: "%s"', (date) => {
      expect(isValidJapaneseCalendar(date)).toBe(true);
    });
  });

  describe('returns false for Western calendar dates', () => {
    test.each([
      '1868-01-25',
      '1912-07-29',
      '1912-07-30',
      '1926-12-24',
      '1926-12-25',
      '1989-01-07',
      '1989-01-08',
      '2019-04-30',
      '2019-05-01',
      '2022-02-21',
    ])('YYYY-MM-DD: "%s"', (date) => {
      expect(isValidJapaneseCalendar(date)).toBe(false);
    });

    test.each([
      '1868-01',
      '1912-07',
      '1912-08',
      '1926-12',
      '1927-01',
      '1989-01',
      '1989-02',
      '2019-04',
      '2019-05',
      '2022-02',
    ])('YYYY-MM: "%s"', (date) => {
      expect(isValidJapaneseCalendar(date)).toBe(false);
    });

    test.each([
      '1868',
      '1912',
      '1913',
      '1926',
      '1927',
      '1989',
      '1990',
      '2019',
      '2020',
      '2022',
    ])('YYYY: "%s"', (date) => {
      expect(isValidJapaneseCalendar(date)).toBe(false);
    });
  });

  describe('returns false for malformed values', () => {
    test.each([
      ['', 'empty string'],
      ['abc', 'random string'],
      ['令和', 'era name only without year'],
      ['令和年', 'era name with 年 but no number'],
      ['2022年2月21日', 'Western year with Japanese suffixes'],
      ['令和-4年', 'era name with invalid separator'],
    ])('%s (%s)', (date) => {
      expect(isValidJapaneseCalendar(date)).toBe(false);
    });
  });
});
