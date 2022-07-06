// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Попап редактирования загружаемого изображения
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
// Поле ввода комментария
const commentInput = imgUploadOverlay.querySelector('.text__description');
// Поле ввода хэштега
const hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-item__invalid',
  successClass: 'form-item__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

// Функция очистки от лишних пробелов, приведения к нижнему регистру и помещения в массив введённых хэштегов
const preparedHashtags = (value) => value.trim().toLowerCase().split(' ');

// Функция проверки архива на уникальность
const isArrayInique = (arrayToCheck) => {
  const length = arrayToCheck.length;

  for (let i = 0; i < length; i++) {
    const comparedElement = arrayToCheck[i];

    for (let j = i + 1; j < length; j++) {
      const elementToCompare = arrayToCheck[j];

      if (comparedElement === elementToCompare && comparedElement !== '#') {
        return false;
      }
    }
  }
  return true;
};

// Функция проверки комментария на максимальную длину
const validateComment = (value) =>  value.length <= 140;

// Проверки комментариев и хэштегов на валидность

pristine.addValidator(commentInput, validateComment,
  'Комментарий не должен быть длиннее 140 символов');

pristine.addValidator(hashtagsInput, (hashtags) => preparedHashtags(hashtags).length <= 5,
  'Не больше 5 хэштегов');

pristine.addValidator(hashtagsInput, (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => /[^-_=+;:,.]$/m.test(value)),
  'Хэштеги разделяются пробелом');

pristine.addValidator(hashtagsInput, (hashtags) => isArrayInique(preparedHashtags(hashtags)),
  'Хэштеги не должны повторяться');

pristine.addValidator(hashtagsInput, (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => /^#[a-zA-Zа-яА-ЯёЁ0-9]{0,}$/.test(value)),
  'Хэштег начинается с # и состоит только из букв и цифр');

pristine.addValidator(hashtagsInput, (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => value.length >= 2 && value.length <= 20),
  'Длина хэштега — от 1 до 19 символов после #');

// Обработчик действия при отправке формы
uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if(!isValid) {
    evt.preventDefault();}
});

/* Обработчик события изменения формы чтобы при закрытии попапа
   очищались предупреждений от старых проверок */
uploadForm.addEventListener('change', () => {
  pristine.validate();
});
