import { renderFullsizeViewer } from './viewer.js';

// Нахождение шаблона миниатюры
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Нахождение контейнера для миниатюр в разметке
const thumbnailsContainer = document.querySelector('.pictures');

// Функция для отрисовки миниатюр на основе массива объектов
const renderThumbnails = (thumbnails) => {

  const thumbnailNodes = [];
  thumbnails.forEach(({url, comments, likes, description}) => {
    const element = thumbnailTemplate.cloneNode(true);
    const thumbnailClickHandler = renderFullsizeViewer({url, comments, likes, description});
    element.querySelector('img').src = url;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture__likes').textContent = likes;
    element.addEventListener('click', thumbnailClickHandler);
    thumbnailNodes.push(element);
  });

  thumbnailsContainer.append(...thumbnailNodes);
};

export {renderThumbnails};
