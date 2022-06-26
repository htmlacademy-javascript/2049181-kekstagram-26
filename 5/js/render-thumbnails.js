// Отрисовка миниатюр
import {createPhotos} from './data.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');

const somePhotos = createPhotos(25);
const thumbnailsContainerFragment = document.createDocumentFragment();

somePhotos.forEach(({url, comments, likes}) => {
  const element = thumbnailTemplate.cloneNode(true);
  element.querySelector('img').src = url;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  thumbnailsContainerFragment.appendChild(element);
});

thumbnailsContainer.appendChild(thumbnailsContainerFragment);
