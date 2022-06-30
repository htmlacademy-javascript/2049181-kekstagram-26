const CLOSE_KEY = 'Escape';
// Модальное окно просмотра большого изображения
const overlayNode = document.querySelector('.big-picture');
// Контейнер для комментариев в модальном окне
const modalCommentsContainerNode = overlayNode.querySelector('.social__comments');
// Шаблон комментария в модальном окне
const modalCommentTemplateNode = modalCommentsContainerNode.querySelector(':first-child');
// Кнопка закрытия модального окна
const modalCloseButtonNode = overlayNode.querySelector('#picture-cancel');
// Большое изображение в модальном окне
const modalBigPictureNode = overlayNode.querySelector('.big-picture__img').querySelector('img');
// Счётчик лайков в модальном окне
const modalLikesCountNode = overlayNode.querySelector('.likes-count');
// Счётчик комментариев в модальном окне
const modalCommentsCountNode = overlayNode.querySelector('.comments-count');
// Подпись к большому изображению
const modalSocialCaptionNode = overlayNode.querySelector('.social__caption');
// Количество отображённых комментариев
const modalSocialCommentsCount = overlayNode.querySelector('.social__comment-count');
// Кнопка загрузки новой порции комментариев
const modalCommentsLoaderButton = overlayNode.querySelector('.comments-loader');
// Тег <body>
const bodyNode = document.querySelector('body');

// Обработчик события - закрытие модального окна по клавише ESC
const modalCloseByKeyHandler = (evt) => {
  if (evt.code === CLOSE_KEY){
    overlayNode.classList.add('hidden');
    bodyNode.classList.remove('modal-open');
    document.removeEventListener('keydown', modalCloseByKeyHandler);
    /* Здесь обработчик клика по кнопке закрытия модального окна не снимается, т.к. само окно уже скрыто и кликнуть по нему невозможно.
    Такой вариант имеет право на жизнь? Хотя, конечно, оптимальностью тут не пахнет.*/
  }
};

// Обработчик события - закрытие модального окна по клику на кнопку закрытия
const modalCloseByClickHandler = () => {
  overlayNode.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  // Обработчик нажатия ESC снимается чтобы нажатие клавиши ничему не мешало
  document.removeEventListener ('keydown', modalCloseByKeyHandler);
};

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
const renderFullsizeViewer = ({url, likes, comments, description}) => function (evt) {
  evt.preventDefault();

  modalCloseButtonNode.addEventListener('click', modalCloseByClickHandler, {once: true});
  modalBigPictureNode.src = url;
  modalLikesCountNode.textContent = likes;
  modalCommentsCountNode.textContent = comments.length;
  modalSocialCaptionNode.textContent = description;

  renderComments(comments);

  modalSocialCommentsCount.classList.add('hidden');
  modalCommentsLoaderButton.classList.add('hidden');
  overlayNode.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
  document.addEventListener('keydown', modalCloseByKeyHandler);
};


export {renderFullsizeViewer};
