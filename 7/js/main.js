import {renderThumbnails} from './render-thumbnails.js';
import {createPhotos} from './data.js';
import './upload-form.js';
import './validate.js';

// Создание массива объектов с «рыбой» фотографий
const somePhotos = createPhotos(25);

// Отрисовка миниатюр
renderThumbnails(somePhotos);
