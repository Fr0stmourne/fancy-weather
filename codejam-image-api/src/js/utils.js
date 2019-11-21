import { rgbToHex } from './rgbConverter';

export function getMousePos(evt, pixelSize) {
  return {
    x: Math.floor(evt.offsetX / pixelSize),
    y: Math.floor(evt.offsetY / pixelSize),
  };
}

export function getPixelHexColor(pixelPos, ctx) {
  const color = ctx.getImageData(pixelPos.x, pixelPos.y, 1, 1).data.slice(0, 3);
  return rgbToHex(`rgb(${color.join(',')}`);
}
