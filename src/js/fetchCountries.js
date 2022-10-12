import debounce from "lodash.debounce";

export const fetchCountriesName = (name) => {};

const countryRef = document.getElementById("search-box");
let name = null;

countryRef.addEventListener("input", debounce(onInputHandler, 300));

function onInputHandler(event) {
  name = event.target.value;
  console.log(name);

  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((response) => {
      return response.json();
    })
    .then((country) => {
      console.log(country);
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderCountryCard(country) {
  const markup = ``;
}
