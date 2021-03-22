import cardTmpl from '../templates/card-tmpl.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const { alert } = require('@pnotify/core');

function addClass(tag) {
  tag.classList.add('is-hidden');
}
function removeClass(tag) {
  tag.classList.remove('is-hidden');
}
function scrollPage(ref) {
  const { y } = ref.getBoundingClientRect();
  const screenHeight = document.documentElement.clientHeight;
  window.scrollTo({
    top: screenHeight - y,
    behavior: 'smooth',
  });
}

function markupCard(value, ref) {
  const card = cardTmpl(value);
  ref.insertAdjacentHTML('beforeend', card);
}
function resetMarkup(element) {
  element.textContent = '';
}
function onEmptyQuery() {
  alert({
    text: 'Please enter query',
    type: 'error',
    delay: 1000,
  });
}

function onNotFound() {
  alert({
    text: 'Not found',
    type: 'error',
    delay: 1000,
  });
}

export default {
  addClass,
  removeClass,
  markupCard,
  resetMarkup,
  scrollPage,
  onEmptyQuery,
  onNotFound,
};
