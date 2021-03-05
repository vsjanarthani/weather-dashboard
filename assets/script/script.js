// Initialising DOM Elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');


// Function to search and fetch data
searchButton.addEventListener('click', () => {
  const inputValue = searchInput.value;
  const ApiKey = "c42b97fce8e9798a49e614a426da209d";

  fetch(`api.openweathermap.org/data/2.5/weather?q={inputValue}&appid={ApiKey}`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('err'))
});