// Нахождение шаблона миниатюры
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создание узла миниатюры из объекта фотографии
const createThumbnail = (photo) => {
  const {url, comments, likes} = photo;
  const node = thumbnailTemplate.cloneNode(true);

  node.querySelector('img').src = url;
  node.querySelector('.picture__comments').textContent = comments.length;
  node.querySelector('.picture__likes').textContent = likes;

  return node;
};

export {createThumbnail};
