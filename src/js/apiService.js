import api from './settings';
const { BASE_URL, API_KEY } = api;
import galleryTmpl from '../templates/gallery-tmpl.hbs';
import cardTmpl from '../templates/card-tmpl.hbs';

async function apiService(searchQuery) {
  try {
    const searchList = await fetch(
      `${BASE_URL}&q=${searchQuery}&page=1&per_page=12&key=${API_KEY}`,
    )
      .then(result => result.json())
      .then(data => data.hits);
    //нужно вытянуть нужные параметры из хитс
    return searchList;
  } catch (error) {
    console.log(error);
  }
}

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('input');

formRef.addEventListener('submit', event => {
  event.preventDefault();

  console.log(inputRef.value);
  // не рендерется шаблон
  const query = apiService(inputRef.value);
  markupCard(query);
  formRef.reset();
});

function markupCard(value) {
  const card = cardTmpl(value);

  const addElement = document.createElement('li');
  addElement.insertAdjacentHTML('beforeend', card);
  galleryRef.appendChild(addElement);
}

//Если промис возвращает true, зарендерить разметку каждого в кард.
// Затем зарендерить в ul галерею
// написать функцию увеличения страниці на 1, и сброса на 1, при изменении запроса
// Добавить кнопку лоад море, которая получает еще 12 объектов и рендерит результат
