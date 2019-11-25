function componentToHex(c) {
  const hex = (+c).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(str) {
  if (!str) return null;
  const rgbArr = str.split('(')[1].split(')')[0].split(',');
  return `#${rgbArr.reduce((acc, el) => {
    acc += componentToHex(el.trim());
    return acc;
  }, '')}`;
}

export function hexToRgb(hex) {
  if (!hex) return null;
  const hexArr = hex.slice(1).match(/.{2}/g);
  return hexArr.map((hexPart) => parseInt(hexPart, 16));
}
