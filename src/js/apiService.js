import api from './settings';

const apiService = async searchQuery => {
  try {
    const searchList = await fetch(
      `${api.BASE_URL}&q=${searchQuery}&page=${page}&per_page=12&key=${api.API_KEY}`,
    );
    return searchList.json();
  } catch (error) {
    throw error;
  }
};
const test = apiService('cats');
console.log(test);
