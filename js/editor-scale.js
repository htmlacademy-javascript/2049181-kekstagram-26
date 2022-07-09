const ScaleValue = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

// Поле вывода масштаба
const scaleValueDisplay = document.querySelector('.scale__control--value');
// Кнопка увеличения масштаба
const scaleUpButton = document.querySelector('.scale__control--bigger');
//Кнопка уменьшения масштаба
const scaleDownButton = document.querySelector('.scale__control--smaller');

let currentScale = ScaleValue.MAX;
let scaleChangeCallback = null;

const setScaleChangeHandler = (callback) => {
  scaleChangeCallback = callback;
};

const resetScale = () => {
  scaleValueDisplay.value = '100%';
};

const renderScale = (value) => {
  currentScale = value;
  scaleValueDisplay.value = `${value}%`;
  scaleChangeCallback(value);
};

scaleUpButton.addEventListener('click', () => {
  const nextScale = currentScale + ScaleValue.STEP;
  if (nextScale <= ScaleValue.MAX) {
    renderScale(nextScale);
  }
});

scaleDownButton.addEventListener('click', () => {
  const nextScale = currentScale - ScaleValue.STEP;
  if (nextScale >= ScaleValue.MIN) {
    renderScale(nextScale);
  }
});

export {resetScale, setScaleChangeHandler};
