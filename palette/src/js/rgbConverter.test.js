import rgbToHex from './rgbConverter';

test('rgbToHex basic tests', () => {
  expect(rgbToHex('rgb(255,255,255)')).toBe('#ffffff');
  expect(rgbToHex('rgb(0,0,0)')).toBe('#000000');
  expect(rgbToHex('rgb(181,53,43)')).toBe('#b5352b');
});

test('rgbToHex returns null when str is not passed into the function', () => {
  expect(rgbToHex()).toBe(null);
  expect(rgbToHex(null)).toBe(null);
  expect(rgbToHex(undefined)).toBe(null);
  expect(rgbToHex(0)).toBe(null);
  expect(rgbToHex('')).toBe(null);
});
