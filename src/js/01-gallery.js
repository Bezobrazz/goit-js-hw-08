import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line

import { galleryItems } from './gallery-items.js';

const galleryElem = document.querySelector('.gallery');

renderGallery();

function generateGalleryItemMarkup(item) {
  return `
	<li class="gallery__item">
		<a class="gallery__link" href="${item.original}">
			<img class="gallery__image" src="${item.original}" alt="${item.description}" />
		</a>
	</li>`;
}

function generateGalleryMarkup(items) {
  return items.map(generateGalleryItemMarkup).join('');
}

function renderGallery() {
  const galleryMarkup = generateGalleryMarkup(galleryItems);
  galleryElem.innerHTML = galleryMarkup;

  // SimpleLightbox
  new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}
