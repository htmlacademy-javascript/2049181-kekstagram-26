import {createThumbnail} from './create-thumbnail.js';
import {onModalCloseModal, openPictureModal, closePictureModal, setOnModalCloseCallback} from './render-modal.js';
// Контейнер для миниатюр
const thumbnailsContainer = document.querySelector('.pictures');
// Кнопка закрытия попапа
const modalCloseButton = document.querySelector('.big-picture').querySelector('#picture-cancel');

// Функция рендера одной миниатюры
const renderThumbnail = (photo) => {
  const thumbnail = createThumbnail(photo);

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    openPictureModal(photo);

    // Функция задаёт коллбэк для описания поведения обработчика закрытия попапа
    setOnModalCloseCallback(() => {
      closePictureModal();
      modalCloseButton.removeEventListener('click', onModalCloseModal);
      document.removeEventListener('keydown', onModalCloseModal);
    });
    // Подписка на события для закрытия попапа
    modalCloseButton.addEventListener('click', onModalCloseModal);
    document.addEventListener('keydown', onModalCloseModal);
  });

  return thumbnail;
};

// Функция рендера миниатюр из массива фотографий
const renderThumbnails = (photos) => {
  thumbnailsContainer.append(...photos.map(renderThumbnail));
};

export {renderThumbnails};
