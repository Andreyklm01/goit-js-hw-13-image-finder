import api from './settings';
const { BASE_URL, API_KEY } = api;
import galleryTmpl from '../templates/gallery-tmpl.hbs';
import cardTmpl from '../templates/card-tmpl.hbs';

async function apiService(searchQuery) {
  try {
    const searchList = await fetch(
      `${BASE_URL}&q=${searchQuery}&page=1&per_page=12&key=${API_KEY}`,
    );
    return searchList.json();
  } catch (error) {
    throw error;
  }
}
const test = apiService('cat');
console.log(test);

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('input');

formRef.addEventListener('submit', event => {
  event.preventDefault();

  console.log(inputRef.value);

  formRef.reset();
});

//Если промис возвращает true, зарендерить разметку каждого в кард.
// Затем зарендерить в ul галерею
// написать функцию увеличения страниці на 1, и сброса на 1, при изменении запроса
// Добавить кнопку лоад море, которая получает еще 12 объектов и рендерит результат
