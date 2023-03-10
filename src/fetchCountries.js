const URL = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(name) {
  return fetch(
    `${URL}${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  });
}
//`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
