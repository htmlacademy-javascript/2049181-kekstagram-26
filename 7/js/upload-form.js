// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Поле загрузки изображения
const uploadFileInput = uploadForm.querySelector('#upload-file');
// Попап (форма) редактирования загружаемого изображения
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
// Кнопка закрытия оверлея
const imgUploadOverlayCancellButton = uploadForm.querySelector('#upload-cancel');

/* Обработчик закрытия оверлея по клику или нажатию Esc
   Тут я вижу что код повторяется два раза и не соблюдается DRY, но не пойму как вынести повторяющуюся
  часть в функцию, чтобы не получить предупреждения от линтера что функция используется раньше чем объявлена */
const onImgUploadOverlayClickOrEscKeydown = (evt) => {
  if ((evt.code === 'Escape' || evt.code === 'Esc') &&
  document.activeElement.className !== 'text__hashtags' &&
  document.activeElement.className !== 'text__description' ) {

    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadForm.reset();
    document.removeEventListener('keydown', onImgUploadOverlayClickOrEscKeydown);
    imgUploadOverlayCancellButton.removeEventListener('click', onImgUploadOverlayClickOrEscKeydown);

  } else if (evt.target.id === 'upload-cancel') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadForm.reset();
    document.removeEventListener('keydown', onImgUploadOverlayClickOrEscKeydown);
    imgUploadOverlayCancellButton.removeEventListener('click', onImgUploadOverlayClickOrEscKeydown);
  }
};

// Событие изменения поля загрузки изображения
uploadFileInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onImgUploadOverlayClickOrEscKeydown);
  imgUploadOverlayCancellButton.addEventListener('click', onImgUploadOverlayClickOrEscKeydown);
});

