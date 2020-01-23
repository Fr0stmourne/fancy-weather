import { getPixelHexColor } from './utils';
import { hexToRgb } from './rgbConverter';

export default function floodFill(startX, startY, canvas, fillColor) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const startColor = hexToRgb(getPixelHexColor({
    x: startX,
    y: startY,
  }, ctx));
  const desiredColor = hexToRgb(fillColor);

  function matchStartColor(pixelPos) {
    const [r, g, b] = imageData.data.slice(pixelPos, pixelPos + 3);
    return [r, g, b].every((el, index) => el === startColor[index]);
  }

  function colorPixel(pixelPos) {
    [imageData.data[pixelPos], imageData.data[pixelPos + 1],
      imageData.data[pixelPos + 2]] = desiredColor;
  }

  if (fillColor === startColor) return;

  const pixelStack = [[startX, startY]];

  while (pixelStack.length) {
    let reachLeft;
    let reachRight;
    const newPos = pixelStack.pop();
    const x = newPos[0];
    let y = newPos[1];
    let pixelPos = (y * canvas.width + x) * 4;

    while (y >= 0 && matchStartColor(pixelPos)) {
      pixelPos -= canvas.width * 4;
      y -= 1;
    }
    y += 1;
    pixelPos += canvas.width * 4;

    reachLeft = false;
    reachRight = false;

    while (y < canvas.height && matchStartColor(pixelPos)) {
      colorPixel(pixelPos);

      if (x > 0) {
        if (
          matchStartColor(pixelPos - 4)
        ) {
          if (!reachLeft) {
            pixelStack.push([x - 1, y]);
            reachLeft = true;
          }
        } else if (reachLeft) {
          reachLeft = false;
        }
      }

      if (x < canvas.width) {
        if (
          matchStartColor(pixelPos + 4)
        ) {
          if (!reachRight) {
            pixelStack.push([x + 1, y]);
            reachRight = true;
          }
        } else if (reachRight) {
          reachRight = false;
        }
      }
      pixelPos += canvas.width * 4;
      y += 1;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
