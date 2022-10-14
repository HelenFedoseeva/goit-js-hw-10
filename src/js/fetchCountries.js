import debounce from "lodash.debounce";
import Notiflix from "notiflix";

export const fetchCountriesName = (name) => {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch((error) => {
      countryListRef.innerHTML;
      countryDivRef.innerHTML;
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });
};

const countryRef = document.getElementById("search-box");
const countryListRef = document.querySelector(".country-list");
const countryDivRef = document.querySelector(".country-info");

countryRef.addEventListener("input", debounce(onInputHandler, 1000));

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
    .catch((error) => {
      if (error === 404) {
        return Notiflix.Notify.failure(
          "Oops, there is no country with that name"
        );
      }
    });
}

function renderCountryList(countries) {
  console.log(123);
  const markupList = countries
    .map(({ name, flags }) => {
      return `<li class="country-list__element">
      <img class="country-list__img" src="${flags.svg}" alt="flag" width=60 height=30/>
      <p>${name}</p>
    </li>`;
    })
    .join("");

  return (countryListRef.innerHTML = markupList);
}
function renderCountryCard(countries) {
  const markupCard = countries
    .map(({ name, flags, capital, population, languages }) => {
      const language = languages.map((object) => object.name);
      return `<li class="country-list__card card">
   <div class="card__wrapper">
      <img class="country-list__img" src="${flags.svg}" alt="flag" width=60 height=30/> 
      <p class="card__name">${name}</p>
  </div>
    <p><span class="card__description">Capital:</span>&#32${capital}</p>
    <p><span class="card__description">Population:</span>&#32 ${population}</p>
    <p><span class="card__description">Languages:</span>&#32${language}</p>
    </li>`;
    })
    .join("");
  return (countryDivRef.innerHTML = markupCard);
}

// function onFetchError(error) {
//   Notiflix.Notify.failure("There is no country with that name");
// }
