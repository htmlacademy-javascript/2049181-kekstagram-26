// Получение случайного натурального числа из диапазона
const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Получение случайного натурального числа из диапазона без повторов
const spawnGetRandomPositiveIntegerNoRepeat = (min, max) => {
  const usedValues = [];
  return function ()  {
    let currentValue = getRandomPositiveInteger(min, max);
    if (usedValues.length >= (max - min + 1)) {
      //usedValues.length = 0;
      return undefined;
    }
    while (usedValues.includes(currentValue)){
      currentValue = getRandomPositiveInteger(min, max);
    }
    usedValues.push(currentValue);
    return currentValue;
  };
};

// Получение случайного элемента массива
const getRandomArrayElement = (items) => items[getRandomPositiveInteger(0, items.length - 1)];

export {getRandomPositiveInteger, spawnGetRandomPositiveIntegerNoRepeat, getRandomArrayElement};
