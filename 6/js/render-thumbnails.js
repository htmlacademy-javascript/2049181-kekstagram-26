import {createThumbnail} from './create-thumbnail.js';
import {openPictureModal} from './render-modal.js';

const thumbnailsContainer = document.querySelector('.pictures');

const renderThumbnail = (photo) => {
  const node = createThumbnail(photo);

  node.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPictureModal(photo);
  });

  return node;
};

const renderThumbnails = (photos) => {
  thumbnailsContainer.append(...photos.map(renderThumbnail));
};

export {renderThumbnails};
