import api from './settings';
const { BASE_URL, API_KEY } = api;
import utils from './utils';
const { incrementPage, resetPage } = utils;
import galleryTmpl from '../templates/gallery-tmpl.hbs';
import cardTmpl from '../templates/card-tmpl.hbs';

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('input');
const btnRef = document.querySelector('#load-more');
btnRef.classList.add('is-hidden');

async function apiService(searchQuery) {
  let page = 1;
  const searchList = await fetch(
    `${BASE_URL}&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`,
  );
  const searchResult = await searchList.json();
  // incrementPage(page);
  return searchResult;
}

formRef.addEventListener('submit', getImages);
btnRef.addEventListener('click', onBtnClick);

let temp = ''; //костыль для сохранения локальной переменной в глобальную

function getImages(event) {
  event.preventDefault();

  if (inputRef.value === '') {
    btnRef.classList.add('is-hidden'); //переделать
    return;
  } else {
    apiService(inputRef.value).then(data => {
      markupCard(data.hits, galleryRef);
    });
    temp = inputRef.value;
    console.log(temp);
    btnRef.classList.remove('is-hidden');
  }
  resetMarkup(galleryRef);
}

function onBtnClick(value) {
  console.log(value);
  value = temp;
  apiService(value).then(data => {
    //переделать, повторяется
    markupCard(data.hits, galleryRef);
  });
}

function markupCard(value, ref) {
  const card = cardTmpl(value);
  ref.insertAdjacentHTML('beforeend', card);
}

function resetMarkup(element) {
  element.textContent = '';
}

// написать функцию увеличения страниці на 1, и сброса на 1, при изменении запроса
