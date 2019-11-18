import { getPixelHexColor } from './utils';

export default function floodFill(startX, startY, canvas) {
  const ctx = canvas.getContext('2d');
  const startColor = getPixelHexColor({
    x: startX,
    y: startY,
  }, ctx);

  function matchStartColor(pixelPos) {
    const currentPixelColor = getPixelHexColor(pixelPos, ctx);
    return currentPixelColor === startColor;
  }

  const pixelStack = [[startX, startY]];

  while (pixelStack.length) {
    let reachLeft;
    let reachRight;
    const newPos = pixelStack.pop();
    const pixelPos = {
      x: newPos[0],
      y: newPos[1],
    };

    while (pixelPos.y >= 0 && matchStartColor(pixelPos)) {
      pixelPos.y -= 1;
    }
    pixelPos.y += 1;
    reachLeft = false;
    reachRight = false;
    while (pixelPos.y < canvas.height && matchStartColor(pixelPos)) {
      ctx.fillRect(pixelPos.x, pixelPos.y, 1, 1);

      if (pixelPos.x > 0) {
        if (
          matchStartColor({
            x: pixelPos.x - 1,
            y: pixelPos.y,
          })
        ) {
          if (!reachLeft) {
            pixelStack.push([pixelPos.x - 1, pixelPos.y]);
            reachLeft = true;
          }
        } else if (reachLeft) {
          reachLeft = false;
        }
      }

      if (pixelPos.x < canvas.width) {
        if (
          matchStartColor({
            x: pixelPos.x + 1,
            y: pixelPos.y,
          })
        ) {
          if (!reachRight) {
            pixelStack.push([pixelPos.x + 1, pixelPos.y]);
            reachRight = true;
          }
        } else if (reachRight) {
          reachRight = false;
        }
      }

      pixelPos.y += 1;
    }
  }
}
