function componentToHex(c) {
  const hex = (+c).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(str) {
  if (!str) return null;
  const rgbArr = str.split('(')[1].split(')')[0].split(',');
  return `#${rgbArr.reduce((acc, el) => {
    acc += componentToHex(el.trim());
    return acc;
  }, '')}`;
}

export default rgbToHex;
