import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countriesList: document.querySelector('.country-list'),
    countriesInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue(event) {
    const inputValue = event.target.value.trim();
    // console.log(inputValue);
    if (inputValue === '') {
        refs.countriesList.innerHTML = '';
        refs.countriesInfo.innerHTML = '';
        return;
    }

    fetchCountries(inputValue)
        .then(countriesListCreate)
        .catch(countriesListError)
    
}

function countriesListError(error){
    Notify.failure('Oops, there is no country with that name');
    refs.countriesList.innerHTML = '';
    refs.countriesInfo.innerHTML = '';
    return error;
}
        
function countriesListCreate(countries) {
     
    const countriesCount = countries.length;

        if (countriesCount > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            refs.countriesList.innerHTML = '';
            refs.countriesInfo.innerHTML = '';
            return;
        }
        if (countries.length > 1 && countries.length <= 10) {
        const listCountries = countries.map(country => countriesList(country)).join('');
        refs.countriesList.innerHTML = listCountries;
        refs.countriesInfo.innerHTML = '';
        }
            
        if (countries.length === 1) {
        const cardCountry = countries.map(country => countryСard(country)).join('');
        refs.countriesInfo.innerHTML = cardCountry;
        refs.countriesList.innerHTML = '';
      }
    
}

function countriesList({ flags, name }) {
  return `
  <li class="country-list__item">
    <img " src="${flags.svg}" alt="${name.official}" width="25" />
    <h3 >${name.official}</h3>
  </li>
  `;
}

function countryСard({ flags, name, capital, population, languages }) {
  return `
    <div class="country-info">
      <div class="country-info__box">
        <img src="${flags.svg}" alt="${name.official}" width="50" />
        <h3 >${name.official}</h3>
      </div>
      <p ><span class="country-info__name">Capital:</span> ${capital}</p>
      <p ><span class="country-info__name">Population:</span> ${population}</p>
      <p ><span class="country-info__name">Languages:</span> ${Object.values(languages,)}</p>
    </div>
  `;
}

