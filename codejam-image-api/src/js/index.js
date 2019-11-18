import rgbToHex from './rgbConverter';
import resize from './resize';
import line from './bresenham';
import { getMousePos, getPixelHexColor } from './utils';
import floodFill from './floodFill';
import makeQuery from './makeQuery';
import trackAuthentication from './auth';

const controlTool = new Map([
  [0, 'fill'],
  [1, 'color'],
  [2, 'pencil'],
]);
const hotkeyBindings = {
  KeyB: 'fill',
  KeyP: 'pencil',
  KeyC: 'color',
};
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const controls = document.querySelectorAll('.controls__control-btn');
const controlsList = controls[0].closest('ul');
const colorInput = document.querySelector('input[type="color"]');
const colorInputLbl = colorInput.closest('label');
const prevColorBtn = document.querySelector(
  '.colors__color--previous .colors__color-btn',
);
const presetBtns = document.querySelectorAll('.colors__preset button');
const presetBtnsColors = ['#ff0000', '#0000ff'];
const clearBtn = document.querySelector('#clear');
const activeClass = 'controls__control-btn--active';
const townInput = document.querySelector('#town-input');
const townBtn = document.querySelector('#town-search');
const sizeSelect = document.querySelector('#size-select');
const grayscaleBtn = document.querySelector('#grayscale-btn');
const [canvasWidth, canvasHeight] = [
  window
    .getComputedStyle(canvas)
    .getPropertyValue('width')
    .split('px')[0],
  window
    .getComputedStyle(canvas)
    .getPropertyValue('height')
    .split('px')[0],
];
let isGrayscaleAvailable = false;
let pixelSize = 1;
let tool;
let fillColor;
let lastCoords;

function switchTool(newTool) {
  if (newTool === undefined) throw new Error('Unknown app mode.');
  tool = newTool;
  localStorage.setItem('tool', tool);
}

function updateColorPalette() {
  colorInputLbl.style.backgroundColor = colorInput.value;
}

function saveColorPalette() {
  localStorage.setItem('mainColor', fillColor);
  localStorage.setItem(
    'prevColor',
    rgbToHex(prevColorBtn.style.backgroundColor),
  );
}

function changeColor(newColor, saveAfterChange = true) {
  if (newColor === fillColor) return;
  [colorInput.value, prevColorBtn.style.backgroundColor] = [
    newColor,
    fillColor,
  ];
  fillColor = colorInput.value;
  updateColorPalette();
  if (saveAfterChange) saveColorPalette();
}

function pressedMouseMoveHandler(evt) {
  const { x, y } = getMousePos(evt, pixelSize);
  lastCoords = lastCoords.x
    ? lastCoords
    : {
      x,
      y,
    };
  ctx.fillStyle = fillColor;
  line(ctx, lastCoords.x, lastCoords.y, x, y);
  lastCoords.x = x;
  lastCoords.y = y;
}

function updateControls(e, evtCode) {
  controls.forEach((el) => el.classList.remove(activeClass));
  if (evtCode) {
    const key = controlsList.querySelector(`*[data-key=${evtCode}]`);
    if (key) key.classList.add(activeClass);
  } else {
    e.target.classList.add(activeClass);
  }
}

function saveCanvas() {
  localStorage.setItem('canvasData', canvas.toDataURL());
}

function mouseLeaveHandler(e) {
  canvas.removeEventListener('mousemove', pressedMouseMoveHandler);

  function calculateLeaveCoords(event) {
    const leaveCoords = {};
    if (event.offsetX < canvasWidth && event.offsetX > 0) {
      leaveCoords.x = event.offsetX / pixelSize;
    } else if (event.offsetX >= canvasWidth) {
      leaveCoords.x = canvasWidth / pixelSize;
    } else {
      leaveCoords.x = 0;
    }

    if (event.offsetY < canvasHeight && event.offsetY > 0) {
      leaveCoords.y = event.offsetY / pixelSize;
    } else if (event.offsetY >= canvasHeight) {
      leaveCoords.y = canvasHeight / pixelSize;
    } else {
      leaveCoords.y = 0;
    }

    leaveCoords.x = Math.floor(leaveCoords.x);
    leaveCoords.y = Math.floor(leaveCoords.y);

    return leaveCoords;
  }

  const leaveCoords = calculateLeaveCoords(e);

  line(ctx, lastCoords.x, lastCoords.y, leaveCoords.x, leaveCoords.y);
  lastCoords = {};
  saveCanvas();
  canvas.removeEventListener('mouseleave', mouseLeaveHandler);
}


canvas.addEventListener('mousedown', (evt) => {
  if (tool === 'pencil') {
    canvas.addEventListener('mousemove', pressedMouseMoveHandler);
    const coordinates = getMousePos(evt, pixelSize);
    ctx.fillStyle = fillColor;
    ctx.fillRect(coordinates.x, coordinates.y, 1, 1);

    canvas.addEventListener('mouseleave', mouseLeaveHandler);
  }

  if (tool === 'fill') {
    const fillHandler = (e) => {
      ctx.fillStyle = fillColor;
      floodFill(getMousePos(e, pixelSize).x, getMousePos(e, pixelSize).y, canvas, fillColor);
      canvas.removeEventListener('click', fillHandler);
      saveCanvas();
    };
    canvas.addEventListener('click', fillHandler);
  }
  if (tool === 'color') {
    const colorClickHandler = (e) => {
      const colorHex = getPixelHexColor(getMousePos(e, pixelSize), ctx);
      changeColor(colorHex);
      controls[2].click();
      canvas.removeEventListener('click', colorClickHandler);
    };
    canvas.addEventListener('click', colorClickHandler);
  }
});


canvas.addEventListener('mouseup', () => {
  if (tool === 'pencil') {
    canvas.removeEventListener('mousemove', pressedMouseMoveHandler);
    canvas.removeEventListener('mouseleave', mouseLeaveHandler);
    saveCanvas();
    lastCoords = {};
  }
});

controlsList.addEventListener('click', (e) => updateControls(e));

controls.forEach((control, index) => {
  control.addEventListener('click', () => {
    switchTool(controlTool.get(index));
  });
});

document.addEventListener('keydown', (evt) => {
  switchTool(hotkeyBindings[evt.code]);
  updateControls(evt, evt.code);
});

colorInput.addEventListener('change', () => {
  prevColorBtn.style.backgroundColor = fillColor;
  changeColor(colorInput.value);
});

presetBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    changeColor(presetBtnsColors[index]);
  });
});

prevColorBtn.addEventListener('click', () => {
  changeColor(rgbToHex(prevColorBtn.style.backgroundColor));
  updateColorPalette();
});

clearBtn.addEventListener('click', () => {
  ctx.fillStyle = '#eeeeee';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = fillColor;
  isGrayscaleAvailable = false;
});

const frame = {
  width: canvas.width,
  height: canvas.height,
};

function updateSize(newPixelSize) {
  canvas.width = canvasWidth / newPixelSize;
  canvas.height = canvasHeight / newPixelSize;
  frame.width = canvas.width;
  frame.height = canvas.height;
}

function disableSmoothing() {
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
}

function drawImg(link, width, height, isFirstDraw = true) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  updateSize(pixelSize);
  const { width: resizedWidth, height: resizedHeight } = resize(frame,
    { width, height });
  return new Promise((resolve, reject) => {
    img.onload = () => {
      clearBtn.click();
      disableSmoothing();
      if (!isFirstDraw) {
        ctx.drawImage(img, 0,
          0, canvas.width, canvas.height);
      } else {
        ctx.drawImage(img, (canvas.width - resizedWidth) / 2,
          (canvas.height - resizedHeight) / 2,
          resizedWidth, resizedHeight);
      }
      isGrayscaleAvailable = true;
      resolve({ done: true });
    };
    img.onerror = reject;
    img.src = link;
  });
}


function changeHandler() {
  pixelSize = sizeSelect.value;
  localStorage.setItem('pixelSize', pixelSize);
  updateSize(pixelSize);
  const imgJson = JSON.parse(localStorage.getItem('imgData'));
  const dataURL = localStorage.getItem('canvasData');
  if (imgJson) {
    drawImg(dataURL, imgJson.width, imgJson.height, false);
  } else {
    drawImg(dataURL, canvas.width, canvas.height);
  }
}

async function loadHandler() {
  let prevSize;
  try {
    const json = await makeQuery(townInput.value || undefined);
    clearBtn.click();
    prevSize = sizeSelect.value;
    sizeSelect.value = 1;
    pixelSize = 1;
    localStorage.setItem('imgData', JSON.stringify(json));
    await drawImg(json.urls.regular, json.width, json.height);
    saveCanvas();
  } catch (e) {
    throw new Error(`Error: ${e}`);
  }

  sizeSelect.value = prevSize;
  pixelSize = prevSize;

  const changeEvt = new Event('change');
  sizeSelect.dispatchEvent(changeEvt);
}

townBtn.addEventListener('click', loadHandler);
sizeSelect.addEventListener('change', changeHandler);

grayscaleBtn.addEventListener('click', () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;
  function grayscale() {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  if (isGrayscaleAvailable) {
    grayscale();
    saveCanvas();
  } else {
    alert('Error: an image is not loaded!');
  }
});


function init() {
  fillColor = colorInput.value;
  tool = localStorage.getItem('tool') || 'pencil';
  lastCoords = {};
  canvas.width = canvasWidth / pixelSize;
  canvas.height = canvasHeight / pixelSize;
  disableSmoothing();
  let currentControl;
  controlTool.forEach((val, key) => {
    if (val === tool) currentControl = key;
  });
  controls[currentControl].click();
  changeColor(localStorage.getItem('mainColor') || '#000000', false);
  pixelSize = localStorage.getItem('pixelSize') || 1;
  sizeSelect.value = pixelSize;

  prevColorBtn.style.backgroundColor = localStorage.getItem('prevColor') || '#90ee90';

  const dataURL = localStorage.getItem('canvasData');
  if (dataURL) {
    const img = new Image();
    img.onload = () => {
      drawImg(img.src, img.width, img.height);
    };
    img.src = dataURL;
  }

  trackAuthentication();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
