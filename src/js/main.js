import ApiService from './apiService';
import utils from './utils';
const {
  addClass,
  removeClass,
  markupCard,
  resetMarkup,
  scrollPage,
  onEmptyQuery,
  onNotFound,
} = utils;
import openModal from './modal';
const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('.search-input');
const btnRef = document.querySelector('#load-more');

const apiService = new ApiService();

formRef.addEventListener('submit', searchImages);
btnRef.addEventListener('click', onBtnClick);
galleryRef.addEventListener('click', openModal);

async function searchImages(event) {
  event.preventDefault();
  resetMarkup(galleryRef);
  apiService.resetPage();

  apiService.query = inputRef.value;
  if (apiService.query === '') {
    onEmptyQuery();
    resetMarkup(galleryRef);
    addClass(btnRef);
    return;
  }
  onSubmit(inputRef.value, galleryRef);
}

async function onSubmit(query, ref) {
  const inputValue = await apiService.fetchImages(query).then(data => {
    if (data.hits.length === 0) {
      addClass(btnRef);
      onNotFound();
    } else {
      markupCard(data.hits, ref);
      removeClass(btnRef);
      apiService.incrementPage();
    }
  });
  return inputValue;
}

async function onBtnClick() {
  apiService.query = inputRef.value;
  if (inputRef.value === '') return;

  await onSubmit(inputRef.value, galleryRef);
  scrollPage(galleryRef);
}
