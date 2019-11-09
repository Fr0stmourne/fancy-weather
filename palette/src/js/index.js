const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const controls = document.querySelectorAll('.controls__control-btn');
const controlsList = controls[0].closest('ul');
// const labels = document.querySelectorAll('.picture-controls__label');
const pixelSize = 128;
const activeClass = 'controls__control-btn--active';


const fillColor = 'green';
canvas.width = 4;
canvas.height = 4;

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
  canvas.addEventListener('mousemove', pressedMouseMoveHandler);

  const coordinates = getMousePos(evt);
  ctx.fillStyle = fillColor;
  ctx.fillRect(coordinates.x, coordinates.y, 1, 1);
});

canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', pressedMouseMoveHandler);
});

controlsList.addEventListener('click', (e) => {
  controls.forEach((el) => el.classList.remove(activeClass));
  e.target.classList.add(activeClass);
});
