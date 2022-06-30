import {isEscKey} from './util.js';

// Модальное окно просмотра большого изображения
const modalNode = document.querySelector('.big-picture');
// Контейнер для комментариев в модальном окне
const modalCommentsContainerNode = modalNode.querySelector('.social__comments');
// Шаблон комментария в модальном окне
const modalCommentTemplateNode = modalCommentsContainerNode.querySelector(':first-child');
// Кнопка закрытия модального окна
const modalCloseButtonNode = modalNode.querySelector('#picture-cancel');
// Большое изображение в модальном окне
const modalBigPictureNode = modalNode.querySelector('.big-picture__img').querySelector('img');
// Счётчик лайков в модальном окне
const modalLikesCountNode = modalNode.querySelector('.likes-count');
// Счётчик комментариев в модальном окне
const modalCommentsCountNode = modalNode.querySelector('.comments-count');
// Подпись к большому изображению
const modalSocialCaptionNode = modalNode.querySelector('.social__caption');
// Количество отображённых комментариев
const modalSocialCommentsCount = modalNode.querySelector('.social__comment-count');
// Кнопка загрузки новой порции комментариев
const modalCommentsLoaderButton = modalNode.querySelector('.comments-loader');
// Тег <body>
const bodyNode = document.querySelector('body');

// Функция рендера комменариев внутри модального окна
const renderComments = (comments) => {
  const commentNodes = [];
  modalCommentsContainerNode.replaceChildren();

  for (let i = 0; i < comments.length; i++) {
    const item = comments[i];
    const commentNode = modalCommentTemplateNode.cloneNode(true);
    const commentImageNode = commentNode.querySelector('img');
    commentImageNode.src = item.avatar;
    commentImageNode.alt = item.name;
    commentNode.querySelector('.social__text').textContent = item.message;
    commentNodes.push(commentNode);
  }
  modalCommentsContainerNode.append(...commentNodes);
};

// Функция рендера модального окна просмотра полноразмерного изображения
const renderModalNode = ({url, likes, comments, description}) => {
  modalBigPictureNode.src = url;
  modalLikesCountNode.textContent = likes;
  modalCommentsCountNode.textContent = comments.length;
  modalSocialCaptionNode.textContent = description;
  renderComments(comments);
  modalSocialCommentsCount.classList.add('hidden');
  modalCommentsLoaderButton.classList.add('hidden');
};

// Обработчик клика по кнопке закрытия модального окна
const onModalCloseButtonClick = (evt) => {
  evt.preventDefault();
  closePictureModal();
};

// Обработчик нажатия на клавишу ESC
const onModalEscKeydown = (evt) => {
  if (isEscKey(evt)){
    evt.preventDefault();
    closePictureModal();
  }
};

// Функция открытия модального окна
function openPictureModal (photo) {
  // 1. Показать окно
  renderModalNode(photo);
  modalNode.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
  // 2. Добавить обработчики для закрытия
  modalCloseButtonNode.addEventListener('click', onModalCloseButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
  // 3. Прочая логика
}

// Функция закрытия модального окна
function closePictureModal () {
  // 1. Скрыть окно
  modalNode.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  // 2. Удалить обработчики для закрытия
  modalCloseButtonNode.removeEventListener('click', onModalCloseButtonClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  // 3. Прочая логика
}

export {openPictureModal, closePictureModal};
