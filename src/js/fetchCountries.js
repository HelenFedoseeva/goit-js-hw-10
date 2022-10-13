import debounce from "lodash.debounce";
import Notiflix from "notiflix";

export const fetchCountriesName = (name) => {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url).then((response) => {
    return response.json();
  });
};

const countryRef = document.getElementById("search-box");
const countryListRef = document.querySelector(".country-list");

countryRef.addEventListener("input", debounce(onInputHandler, 300));

function onInputHandler(event) {
  event.preventDefault();

  let name = event.target.value.toLowerCase();

  let resultName = name.trim();

  fetchCountriesName(resultName)
    .then((country) => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          "Too many matches found. Please enter a more specific name."
        );
      } else if (country.length > 2 && country.length < 10) {
        renderCountryList(country);
      } else if (country.length === 1) {
        renderCountryCard(country);
      }
    })
    .catch(onFetchError)
    .finally(() => {
      if (event.target.value === "") {
        countryListRef.innerHTML;
      }
    });
}

function renderCountryList(countries) {
  const markupList = countries.map(({ name, flags }) => {
    return `<li class="country-list__element">
      <img class="country-list__img" src="${flags.svg}" alt="flag" width=80 height=50/>
      <p>${name}</p>
    </li>`;
  });

  return countryListRef.insertAdjacentHTML("beforeend", markupList);
}
function renderCountryCard(countries) {
  const markupCard = countries.map(
    ({ name, flags, capital, population, languages }) => {
      const language = languages.map((object) => object.name);
      return `<li class="country-list__card card">
   <div class="card__wrapper">
    <img class="country-list__img" src="${flags.svg}" alt="flag" width=80 height=50/> 
    <p>${name}</p></div>
    <p>Capital:&#32${capital}</p>
    <p>Population:&#32 ${population}</p>
    <p>Languages:&#32${language}</p>
    </li>`;
    }
  );
  return countryListRef.insertAdjacentHTML("beforeend", markupCard);
}

function onFetchError(error) {
  Notiflix.Notify.failure("There is no country with that name");
}
