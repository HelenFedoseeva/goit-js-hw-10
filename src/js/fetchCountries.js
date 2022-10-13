import debounce from "lodash.debounce";
import Notiflix from "notiflix";

export const fetchCountriesName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;

  return fetch(url).then((response) => {
    return response.json();
  });
};

const countryRef = document.getElementById("search-box");

countryRef.addEventListener("input", debounce(onInputHandler, 300));

function onInputHandler(event) {
  event.preventDefault();

  let name = event.target.value;
  let resultName = name.trim();

  fetchCountriesName(resultName)
    .then((country) => {
      console.log(country);
      if (country.length > 10) {
        Notiflix.Notify.info(
          "Too many matches found. Please enter a more specific name."
        );
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
}

function renderCountryCard(country) {
  const markup = ``;
}
