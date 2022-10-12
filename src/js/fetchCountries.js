import debounce from "lodash.debounce";

export const fetchCountriesName = (name) => {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((response) => {
      return response.json();
    })
    .then((country) => {
      console.log(country);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
};

const countryRef = document.getElementById("search-box");
let name = null;

countryRef.addEventListener("input", debounce(onInputHandler, 300));

function onInputHandler(event) {
  event.preventDefault();
  name = event.target.value;
  console.log(name);

  fetchCountriesName(name);
}

function renderCountryCard(country) {
  const markup = ``;
}
