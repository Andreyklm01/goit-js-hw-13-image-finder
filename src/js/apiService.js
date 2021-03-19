import cardTmpl from '../templates/card-tmpl.hbs';
import api from './settings';
const { BASE_URL, API_KEY } = api;

class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const searchList = await fetch(
      `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    );
    const searchData = await searchList.json();
    return searchData;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('input');
const btnRef = document.querySelector('#load-more');
const apiService = new ApiService();

formRef.addEventListener('submit', searchImages);

async function searchImages(event) {
  event.preventDefault();
  apiService.query = inputRef.value;
  if (apiService.query === '') {
    return;
  } else {
    onSubmit(inputRef.value, galleryRef);
    apiService.incrementPage();
  }
  // resetMarkup(inputRef);
}

btnRef.addEventListener('click', onBtnClick);

async function onSubmit(query, ref) {
  const inputValue = await apiService.fetchImages(query).then(data => {
    markupCard(data.hits, ref);
  });
  return inputValue;
}

function onBtnClick() {
  apiService.query = inputRef.value;
  onSubmit(inputRef.value, galleryRef);
  apiService.incrementPage();
}

function markupCard(value, ref) {
  const card = cardTmpl(value);
  ref.insertAdjacentHTML('beforeend', card);
}
function resetMarkup(element) {
  element.textContent = '';
}

// "Миша, все ху*ня, давай по новой" (с)

// import utils from './utils';
// const { incrementPage, resetPage } = utils;
// import galleryTmpl from '../templates/gallery-tmpl.hbs';
// import cardTmpl from '../templates/card-tmpl.hbs';

// const galleryRef = document.querySelector('.gallery');
// const formRef = document.querySelector('#search-form');
// const inputRef = document.querySelector('input');
// const btnRef = document.querySelector('#load-more');
// btnRef.classList.add('is-hidden');

// async function apiService(searchQuery) {
//   let page = 1;
//   // incrementPage(page);
//   const searchList = await fetch(
//     `${BASE_URL}&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`,
//   );
//   const searchResult = await searchList.json();
//   // incrementPage(2);
//   return searchResult;
// }

// formRef.addEventListener('submit', getImages);
// btnRef.addEventListener('click', onBtnClick);

// let temp = ''; //костыль для сохранения локальной переменной в глобальную

// function getImages(event) {
//   event.preventDefault();

//   if (inputRef.value === '') {
//     btnRef.classList.add('is-hidden'); //переделать
//     return;
//   } else {
//     apiService(inputRef.value).then(data => {
//       markupCard(data.hits, galleryRef);
//     });
//     temp = inputRef.value;
//     console.log(temp);
//     btnRef.classList.remove('is-hidden');
//   }
//
// }

// function onBtnClick(value) {
//   value = temp;
//   apiService(value).then(data => {
//     //переделать, повторяется
//     markupCard(data.hits, galleryRef);
//   });
//   apiService.incrementPage;
// }

// function markupCard(value, ref) {
//   const card = cardTmpl(value);
//   ref.insertAdjacentHTML('beforeend', card);
// }

// function resetMarkup(element) {
//   element.textContent = '';
// }

// написать функцию увеличения страниці на 1, и сброса на 1, при изменении запроса
