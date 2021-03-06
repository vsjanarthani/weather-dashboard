// Initialising variables and DOM Elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
var locationEl = document.getElementById('location');
var dateEl = document.getElementById('date');
var imgsource = "https://openweathermap.org/img/w/";
var imageEl = document.getElementById('icon');
var weatherEl = document.getElementById('weather');
var temperatureEl = document.getElementById('temperature');
var humidityEl = document.getElementById('humidity');
var windSpeedEl = document.getElementById('wind-speed');
var displayResultEl = document.getElementById('display');
displayResultEl.classList.add("hide");
const ApiKey = "c42b97fce8e9798a49e614a426da209d";



// Function to search and fetch data
searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
  // Fetch request
    // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=imperial&appid=${ApiKey}`)
    fetch("./assets/script/response.json")
    .then(res => res.json())
    .then((data) => {
      displayData(data);
    })
    .catch(error => console.error(error))
});

// Function to display search results

function displayData(searchResult) {
  displayResultEl.classList.add("show");
  locationEl.innerText = searchResult.name;
  dateEl.innerText = "(" + new Date().toLocaleDateString() + ")";
  imgsource = imgsource + searchResult.weather[0].icon + ".png";
  imageEl.setAttribute('src', imgsource);
  weatherEl.innerText = "Weather forecast: " + searchResult.weather[0].description;
  temperatureEl.innerText = `Temperature: ${searchResult.main.temp} °F`;
  humidityEl.innerText = `Humidity: ${searchResult.main.humidity} %`;
  windSpeedEl.innerText = `Wind Speed: ${searchResult.wind.speed} mph`;
  console.log(searchResult);
}