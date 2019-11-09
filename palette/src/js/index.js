const controlMode = new Map([
  [0, 'fill'],
  [1, 'color'],
  [2, 'pencil']
]);
const hotkeyBindings = {
  'KeyB': 'fill',
  'KeyP': 'pencil',
  'KeyC': 'color'
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const controls = document.querySelectorAll('.controls__control-btn');
const controlsList = controls[0].closest('ul');
const colorInput = document.querySelector('input[type="color"]');
const colorInputLbl = colorInput.closest('label');
const prevColorBtn = document.querySelector('.colors__color--previous .colors__color-btn');
let img = new Image();
// const labels = document.querySelectorAll('.picture-controls__label');
const pixelSize = 128;
const activeClass = 'controls__control-btn--active';
let mode = 'fill';

function switchMode(newMode) {
  if (newMode === undefined) throw new Error('Unknown app mode.');
  mode = newMode;
}

let prevColor = 'lightgreen';
let lastColor;

let fillColor = colorInput.value;
canvas.width = 512 / pixelSize;
canvas.height = 512 / pixelSize;

function getMousePos(evt) {
  return {
    x: Math.floor(evt.offsetX / pixelSize),
    y: Math.floor(evt.offsetY / pixelSize),
  };
}

function pressedMouseMoveHandler(evt) {
  const {
    x,
    y,
  } = getMousePos(evt);
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, 1, 1);
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

canvas.addEventListener('mousedown', (evt) => {
  if (mode === 'pencil') {
    canvas.addEventListener('mousemove', pressedMouseMoveHandler);
    const coordinates = getMousePos(evt);
    ctx.fillStyle = fillColor;
    ctx.fillRect(coordinates.x, coordinates.y, 1, 1);
  }

  if (mode === 'fill') {
    canvas.addEventListener('click', (evt) => {
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
    })
  }
  if (mode === 'color') {
    const colorClickHandler = (evt) => {
      const color = ctx.getImageData(getMousePos(evt).x, getMousePos(evt).y, 1, 1).data.slice(0, 3);
      prevColorBtn.style.backgroundColor = fillColor;
      colorInput.value = rgbToHex(`rgb(${color.join(',')}`);
      updateColor();
      controls[2].click();
      canvas.removeEventListener('click', colorClickHandler);
    }
    canvas.addEventListener('click', colorClickHandler);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  let dataURL = localStorage.getItem('canvasData');
  if (dataURL) {
    let img = new Image;
    img.src = dataURL;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
})

canvas.addEventListener('mouseup', () => {
  if (mode === 'pencil') {
    canvas.removeEventListener('mousemove', pressedMouseMoveHandler);
    localStorage.setItem('canvasData', canvas.toDataURL());
  }
});

controlsList.addEventListener('click', (e) => updateControls(e));

controls.forEach((control, index) => {
  control.addEventListener('click', (e) => {
    switchMode(controlMode.get(index));
  });
})



document.addEventListener('keydown', (evt) => {
  switchMode(hotkeyBindings[evt.code]);
  updateControls(evt, evt.code);
})


colorInput.addEventListener('change', (e) => {
  prevColorBtn.style.backgroundColor = fillColor;
  updateColor();
});

function componentToHex(c) {
  var hex = (+c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(str) {
  const rgbArr = str.split("(")[1].split(")")[0].split(',');
  return "#" + rgbArr.reduce((acc, el) => acc += componentToHex(el.trim()), '');
}

function updateColor() {
  fillColor = colorInput.value;
  colorInputLbl.style.backgroundColor = colorInput.value;
}

controls[2].click();
prevColorBtn.style.backgroundColor = '#90ee90';

prevColorBtn.addEventListener('click', () => {
  [colorInput.value, prevColorBtn.style.backgroundColor] = [rgbToHex(prevColorBtn.style.backgroundColor), colorInput.value];
  updateColor();
})
