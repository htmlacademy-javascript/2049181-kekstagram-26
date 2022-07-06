// Нахождение шаблона миниатюры
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создание узла миниатюры из объекта фотографии
const createThumbnail = (photo) => {
  const {url, comments, likes} = photo;
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('img').src = url;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

export {createThumbnail};
