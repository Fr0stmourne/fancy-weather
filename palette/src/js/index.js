const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);
const btn4x4 = document.getElementById(`4x4`);
const btn32x32 = document.getElementById(`32x32`);
const imageBtn = document.getElementById(`image`);
const labels = document.querySelectorAll(`.picture-controls__label`);

const activeClass = `picture-controls__label--active`;

btn4x4.addEventListener(`change`, (e) => {
  [...labels].forEach((el) => el.classList.remove(activeClass));
  e.target.closest(`label`).classList.add(activeClass);
  fetch(btn4x4.dataset.link)
    .then((response) => response.json())
    .then((matrix) => {
      drawImageFromMatrix(matrix);
    });
});

btn32x32.addEventListener(`change`, (e) => {
  [...labels].forEach((el) => el.classList.remove(activeClass));
  e.target.closest(`label`).classList.add(activeClass);
  fetch(btn32x32.dataset.link)
    .then((response) => response.json())
    .then((matrix) => {
      drawImageFromMatrix(matrix);
    });
});

imageBtn.addEventListener(`change`, (e) => {
  [...labels].forEach((el) => el.classList.remove(activeClass));
  e.target.closest(`label`).classList.add(activeClass);
  drawImageFromPic(imageBtn.dataset.link);
});


function drawImageFromMatrix(colorMatrix) {
  const canvasSize = colorMatrix.length;
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  function convertHexToRGBA(hexString) {
    const resultArr = [];
    for (let i = 0; i < 6; i += 2) {
      resultArr.push(parseInt(hexString.slice(i, i + 2), 16));
    }
    resultArr.push(255);
    return resultArr;
  }

  function convertColorMatrix(arr) {
    let hasToBeConverted = true;
    if (typeof arr[0][0] !== `string`) {
      hasToBeConverted = !hasToBeConverted;
    }
    return arr.reduce((acc, row) => {
      acc.push(row.reduce((rgbaArr, el) => {
        rgbaArr.push(new ImageData(new Uint8ClampedArray(hasToBeConverted ? convertHexToRGBA(el) : el), 1, 1));
        return rgbaArr;
      }, []));
      return acc;
    }, []);
  }

  const imageArr = convertColorMatrix(colorMatrix);

  for (let dy = 0; dy < canvasSize; dy++) {
    for (let dx = 0; dx < canvasSize; dx++) {
      ctx.putImageData(imageArr[dy][dx], dx, dy);
    }
  }
}

function drawImageFromPic(link) {
  const img = new Image();
  img.addEventListener(`load`, drawImg);
  img.src = `${link}`;

  function drawImg() {
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this, 0, 0);
  }
}

btn4x4.click();
