import { getTimeOfDay, capitalizeEach } from '../js/utils';

describe('getTimeOfDay', () => {
  test('returns night if 3 is passed to the func', () => {
    expect(getTimeOfDay(3)).toBe('night');
  });

  test('returns morning if 12 is passed to the func', () => {
    expect(getTimeOfDay(9)).toBe('morning');
  });

  test('returns evening if 19 is passed to the func', () => {
    expect(getTimeOfDay(19)).toBe('evening');
  });

  test('returns day if 12 is passed to the func', () => {
    expect(getTimeOfDay(12)).toBe('day');
  });

  test('returns night if 0 is passed to the func', () => {
    expect(getTimeOfDay(0)).toBe('night');
  });

  test('throws an error if a string is passed to the func', () => {
    expect(() => {
      getTimeOfDay('5');
    }).toThrow();
  });

  test('throws an error if an object is passed to the func', () => {
    expect(() => {
      getTimeOfDay({ hour: 5 });
    }).toThrow();
  });
});

describe('capitalizeEach', () => {
  test('throws an error if an passed object is not a string', () => {
    expect(() => {
      capitalizeEach({ hour: 5 });
    }).toThrow();
    expect(() => {
      capitalizeEach(true);
    }).toThrow();
  });

  test('returns given string with first letter capitalized', () => {
    expect(capitalizeEach('string')).toBe('String');
  });

  test('handles cases with several words (separated with spaces)', () => {
    expect(capitalizeEach('handles cases with several words')).toBe('Handles Cases With Several Words');
    expect(capitalizeEach('monday, 13 december')).toBe('Monday, 13 December');
  });
});
