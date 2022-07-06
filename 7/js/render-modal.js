import {isEscKey} from './util.js';

// Модальное окно просмотра большой фотографии
const modalWindow = document.querySelector('.big-picture');
// Контейнер для комментариев в попапе
const modalCommentsContainer = modalWindow.querySelector('.social__comments');
// Шаблон комментария в попапе
const modalCommentTemplate = modalCommentsContainer.querySelector(':first-child');
// Большое изображение в попапе
const modalBigPicture = modalWindow.querySelector('.big-picture__img').querySelector('img');
// Счётчик лайков в попапе
const modalLikesCount = modalWindow.querySelector('.likes-count');
// Счётчик комментариев в попапе
const modalCommentsCount = modalWindow.querySelector('.comments-count');
// Подпись к большому изображению
const modalSocialCaption = modalWindow.querySelector('.social__caption');
// Количество отображённых комментариев
const modalSocialCommentsCount = modalWindow.querySelector('.social__comment-count');
// Кнопка загрузки новой порции комментариев
const modalCommentsLoaderButton = modalWindow.querySelector('.comments-loader');

// Переменная для коллбэка обработчика закрытия
let onModalCloseCallback = null;

// Функция для поулчения коллбэка из другого модуля
const setOnModalCloseCallback = (callback) => {
  onModalCloseCallback = callback;
};

// Функция создания DOM-узла комментария
const createComment = (comment) => {
  const newComment = modalCommentTemplate.cloneNode(true);
  const commentImage = newComment.querySelector('img');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

// Функция рендера модального окна просмотра полноразмерной фотографии
const renderModalWindow = ({url, likes, comments, description}) => {
  modalBigPicture.src = url;
  modalLikesCount.textContent = likes;
  modalCommentsCount.textContent = comments.length;
  modalSocialCaption.textContent = description;
  modalCommentsContainer.replaceChildren(...comments.map(createComment));
  modalSocialCommentsCount.classList.add('hidden');
  modalCommentsLoaderButton.classList.add('hidden');
};

// Функция открытия попапа
const openPictureModal = (photo) => {

  renderModalWindow(photo);
  modalWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Функция закрытия попапа
const closePictureModal = () => {

  modalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Обработчик закрытия попапа по клавише ESC или по клику на кнопку закрытия
const onModalCloseModal = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    onModalCloseCallback();
  } else if (evt.target.id === 'picture-cancel') {
    evt.preventDefault();
    onModalCloseCallback();
  }
};

export {openPictureModal, closePictureModal, setOnModalCloseCallback, onModalCloseModal};
