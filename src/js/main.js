import ApiService from './apiService';
import utils from './utils';
const { addClass, removeClass, markupCard, resetMarkup, scrollPage } = utils;

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('input');
const btnRef = document.querySelector('#load-more');

const apiService = new ApiService();

formRef.addEventListener('submit', searchImages);
btnRef.addEventListener('click', onBtnClick);

async function searchImages(event) {
  event.preventDefault();
  resetMarkup(galleryRef);
  apiService.resetPage();

  apiService.query = inputRef.value;
  onNotFound();

  if (apiService.query === '') {
    // проверка на пустое поле
    console.log('Введи запрос'); // сюда алерт "не найдено" с pnotify
    resetMarkup(galleryRef);
    addClass(btnRef);
    return;
  } else {
    onSubmit(inputRef.value, galleryRef);
    apiService.incrementPage();
    removeClass(btnRef);
    return;
  }
}

async function onSubmit(query, ref) {
  const inputValue = await apiService.fetchImages(query).then(data => {
    markupCard(data.hits, ref);
  });
  return inputValue;
}

async function onNotFound() {
  // проверка  если не найдено
  const inputFail = await apiService
    .fetchImages(apiService.query)
    .then(data => {
      return data.total;
    });
  if (inputFail === 0) {
    console.log('Не нашел :(');
    addClass(btnRef);
  }
}

async function onBtnClick() {
  apiService.query = inputRef.value;
  await onSubmit(inputRef.value, galleryRef);
  apiService.incrementPage();
  //540 высота контента на экране
  scrollPage(540);
}

//добавить нотификашки + модалку
