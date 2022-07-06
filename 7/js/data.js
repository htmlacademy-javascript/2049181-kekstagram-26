import {getRandomPositiveInteger, spawnGetRandomPositiveIntegerNoRepeat, getRandomArrayElement} from './random.js';

const NAMES = [
  'Артём',
  'Макар',
  'Ирина',
  'Меченый',
  'Мария',
  'Елена',
  'Сергей',
  'Максим',
  'Джек',
  'Хуан Пабло',
  'Виктор',
  'Кристина',
  'Диана',
  'Ольга',
  'Володя',
  'Карина',
  'Жорж',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Моё первое фото.',
  'Это я с котаном.',
  'Весело было.',
  'Четвёртое описание.',
  'В отпуске.',
];

// Объект с данными о количестве комментариев
const CommentsQuantity = {
  MIN: 1,
  MAX: 10,
};

// Образование замыкания для функции получения случайного натурального числа из диапазона без повторов
const getRandomNoRepeatId = spawnGetRandomPositiveIntegerNoRepeat(1, 25);
const getRandomNoRepeatUrl = spawnGetRandomPositiveIntegerNoRepeat(1, 25);

// Функция создания объекта комментария
const createComment = () =>
  ({
    id: getRandomNoRepeatId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  });

// Функция создания объекта поста с фотографией
const createPhoto = () => ({
  id: getRandomNoRepeatId(),
  url: `photos/${getRandomNoRepeatUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: getRandomPositiveInteger(CommentsQuantity.MIN, CommentsQuantity.MAX)}, createComment),
});

// Функция генерации массива постов с фотографиями
const createPhotos = (quantity) => Array.from({length: quantity}, createPhoto);

export {createPhotos};
