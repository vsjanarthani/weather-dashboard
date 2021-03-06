// Initialising variables and DOM Elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
var locationEl = document.getElementById('location');
var dateEl = document.getElementById('date');
var imageEl = document.getElementById('icon');
var weatherEl = document.getElementById('weather');
var temperatureEl = document.getElementById('temperature');
var humidityEl = document.getElementById('humidity');
var windSpeedEl = document.getElementById('wind-speed');
var displayResultEl = document.getElementById('display');
var addCityEl = document.getElementById('searched-city');
displayResultEl.classList.add("hide");
const ApiKey = "c42b97fce8e9798a49e614a426da209d";
  
// Function to search and fetch data
searchButton.addEventListener('click', () => {
    var inputValue = searchInput.value.trim();
    if (inputValue.length != 0) {
      fetchAPI(inputValue);
      searchInput.value ="";
    }
});

// function to fetch weather data using API key
function fetchAPI(inputCity) {
   // Fetch request
      // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=imperial&appid=${ApiKey}`)
      fetch("./assets/script/response.json")
      .then(res => res.json())
      .then((data) => {
        // call back function to display the city weather data
        displayData(data);

        // store the search result in local storage
        if (localStorage.getItem('searched-city') == null) {
          searchedCity = [];
        } else {
          searchedCity = JSON.parse(localStorage.getItem('searched-city'));
        }
        if (!searchedCity.includes(inputCity)){
        
        // Add new data to the exisitng data
        searchedCity.push(inputCity);
        }
        // To display last 5 searches
        if (searchedCity.length > 5){
          searchedCity.shift(); 
        } 
        localStorage.setItem('searched-city', JSON.stringify(searchedCity)); 

        // Call back function to display searched city
        searchedCityDisplay();
        })
      .catch(error => console.error(error))
}

// Function to display search results

function displayData(searchResult) {
  displayResultEl.classList.add("show");
  var imgsource = "https://openweathermap.org/img/w/";
  locationEl.innerText = searchResult.name;
  dateEl.innerText = "(" + new Date().toLocaleDateString() + ")";
  imgsource = imgsource + searchResult.weather[0].icon + ".png";
  imageEl.setAttribute('src', imgsource);
  weatherEl.innerText = "Weather forecast: " + searchResult.weather[0].description;
  temperatureEl.innerText = `Temperature: ${searchResult.main.temp} °F`;
  humidityEl.innerText = `Humidity: ${searchResult.main.humidity} %`;
  windSpeedEl.innerText = `Wind Speed: ${searchResult.wind.speed} mph`;
}

// Function to apend and display searched results
function searchedCityDisplay() {
  addCityEl.innerHTML = "";
  searchedCity = JSON.parse(localStorage.getItem('searched-city'));
  if (searchedCity !=null) {
  searchedCity.forEach(element => {
    var buttonEl = document.createElement('button');
    buttonEl.setAttribute("class", "btn city");
    buttonEl.innerText = element;
    addCityEl.appendChild(buttonEl);
  });
  }
}
searchedCityDisplay();

// function to display weather data for searched cities
addCityEl.addEventListener('click', function(event) {
  if (event.target.classList == "btn city ripple-surface") {
      var searchVal = event.target.textContent;
      fetchAPI(searchVal);
  }
});
