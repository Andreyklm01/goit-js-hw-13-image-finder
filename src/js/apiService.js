import api from './settings';
const { BASE_URL, API_KEY } = api;
import utils from './utils';
const { incrementPage, resetPage } = utils;
import galleryTmpl from '../templates/gallery-tmpl.hbs';
import cardTmpl from '../templates/card-tmpl.hbs';

async function apiService(searchQuery) {
  let page = 1;
  const searchList = await fetch(
    `${BASE_URL}&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`,
  );
  const searchResult = await searchList.json();
  // incrementPage(page);
  return searchResult;
}

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('input');
const btnRef = document.querySelector('#load-more');
btnRef.classList.add('is-hidden');

formRef.addEventListener('submit', getImages);
// btnRef.addEventListener('click', getImages);

function getImages(event) {
  event.preventDefault();

  if (inputRef.value === '') {
    btnRef.classList.add('is-hidden');
  } else {
    apiService(inputRef.value).then(data => {
      markupCard(data.hits, galleryRef);
    });
    btnRef.classList.remove('is-hidden');
    // incrementPage;
  }
  resetMarkup(galleryRef);
  formRef.reset();
}

function markupCard(value, ref) {
  const card = cardTmpl(value);
  ref.insertAdjacentHTML('beforeend', card);
}

function resetMarkup(element) {
  element.textContent = '';
}

// написать функцию увеличения страниці на 1, и сброса на 1, при изменении запроса
// Добавить кнопку лоад море, которая получает еще 12 объектов и стаивит страницу +1
