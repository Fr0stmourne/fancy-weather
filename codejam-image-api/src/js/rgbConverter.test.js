import rgbToHex from './rgbConverter';

test('rgbToHex test', () => {
  expect(rgbToHex('rgb(255,255,255)')).toBe('#ffffff');
  expect(rgbToHex('rgb(0,0,0)')).toBe('#000000');
  expect(rgbToHex('rgb(181,53,43)')).toBe('#b5352b');
});
