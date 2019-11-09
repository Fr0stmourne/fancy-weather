const controlMode = new Map([
  [0, 'fill'],
  [1, 'color'],
  [2, 'pencil']
]);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const controls = document.querySelectorAll('.controls__control-btn');
const controlsList = controls[0].closest('ul');
const colorInput = document.querySelector('input[type="color"]'); // need to remove second input
// const labels = document.querySelectorAll('.picture-controls__label');
const pixelSize = 128;
const activeClass = 'controls__control-btn--active';

let mode = 'fill';


let fillColor = colorInput.value;
console.log(fillColor);
canvas.width = 512 / pixelSize;
canvas.height = 512 / pixelSize;

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.floor((evt.clientX - rect.left) / pixelSize),
    y: Math.floor((evt.clientY - rect.top) / pixelSize),
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

});

canvas.addEventListener('mouseup', () => {
  if (mode === 'pencil') {
    canvas.removeEventListener('mousemove', pressedMouseMoveHandler);
  }
});

controlsList.addEventListener('click', (e) => {
  controls.forEach((el) => el.classList.remove(activeClass));
  e.target.classList.add(activeClass);
});

controls.forEach((control, index) => {
  control.addEventListener('click', () => {
    mode = controlMode.get(index);
  })
})


colorInput.addEventListener('change', () => {

  fillColor = colorInput.value;
  console.log(fillColor);
})

controls[2].click();
