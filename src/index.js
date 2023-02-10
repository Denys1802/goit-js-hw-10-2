import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const listCountry = document.querySelector('.country-list');

const inputEl = document.getElementById('search-box');
inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const inputValue = e.target.value.trim();
  if (inputValue === '') {
    reset();
    return;
  } else {
    fetchCountries(inputValue)
      .then(country => {
        if (country.length < 2) {
          createCountryCard(country);
          Notify.success('Here is sesult!!');
        } else if (country.length > 1 && country.length < 10) {
          createCountryList(country);
        } else {
          reset();
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(() => {
        reset();
        Notify.failure('Oops, there is no country with that name');
      });
  }
}

function createCountryCard(country) {
  reset();
  const { name, capital, languages, population, flags } = country[0];
  const card = `<div class="card-header">
	<img src="${flags.svg}" alt="${name.official} width="55", height="40"">
	<h2 class="card-official">${name.official}</h2>
  </div>
  <p class="card-item">Capital: ${capital}</p>
  <p class="card-item">Population: ${population}</p>
  <p class="card-item">Languages: ${Object.values(languages).join(',')}</p>
  `;
  countryInfo.innerHTML = card;
}
function createCountryList(array) {
  reset();
  listCountry.innerHTML = array
    .map(({ flags, name }) => {
      return `<li class="country-list__item">
            <img class="country-list__img" src="${flags.svg}" alt="${name.official}" width="55", height="40">
            <h3 class="country-list__title">${name.official}</h3>
        </li>`;
    })
    .join('');
}

function reset() {
  listCountry.innerHTML = '';
  countryInfo.innerHTML = '';
}
