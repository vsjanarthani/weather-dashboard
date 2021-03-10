// Initialising variables and DOM Elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
var locationEl = document.getElementById('location');
var countryEl = document.getElementById('country');
var dateEl = document.getElementById('date');
var imageEl = document.getElementById('icon');
var weatherEl = document.getElementById('weather');
var temperatureEl = document.getElementById('temperature');
var humidityEl = document.getElementById('humidity');
var windSpeedEl = document.getElementById('wind-speed');
var uvindexEl = document.getElementById('uv-index');
var displayResultEl = document.getElementById('display');
var addCityEl = document.getElementById('searched-city');
var fivedayRowEl = document.querySelector('.row');
var dayDisplayEl = document.getElementById('daydisplay');
var myModal = document.getElementById('myModal');
var myModalTitle = document.querySelector('.modal-title');
var myModalBody = document.getElementById('modalbodyval');
var closeModalEl = document.querySelector('.btn-close');
const ApiKey = "c42b97fce8e9798a49e614a426da209d";
myModal.classList.add("hide");
displayResultEl.classList.add("hide");
dayDisplayEl.classList.add("hide");

  
// Function to search and fetch data
searchButton.addEventListener('click', () => {
    var inputValue = searchInput.value.trim();
    if (inputValue.length != 0) {
      myModal.setAttribute('class', 'hide');
      fetchAPI(inputValue);
      fetchForecastAPI(inputValue);
      searchInput.value ="";
    }
});

// function to fetch weather data using API key
function fetchAPI(inputCity) {
   // Fetch request
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=imperial&appid=${ApiKey}`)
      // fetch("./assets/script/response.json")
      .then(res => {
        if (res.status != 200) {
          throw Error(res.status + " " + res.statusText);
        } else {
          return res.json();
        }
      })
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
      .catch(error => {
        displayResultEl.setAttribute('class', 'hide');
        dayDisplayEl.setAttribute('class', 'hide');
        myModal.setAttribute('class', 'show');
        myModalTitle.innerText = "Oops, Something went wrong. Try again";
        myModalBody.innerText = error;
        closeModalEl.addEventListener('click',() => {
          myModal.setAttribute('class', 'hide');
        });
      })
}

// Function to display search results

function displayData(searchResult) {
  displayResultEl.setAttribute('class', 'container border-top border-bottom displayres show');
  var imgsource = "https://openweathermap.org/img/w/";
  locationEl.innerText = searchResult.name + ",";
  countryEl.innerText = searchResult.sys.country;
  dateEl.innerText = "(" + new Date().toLocaleDateString() + ")";
  imgsource = imgsource + searchResult.weather[0].icon + ".png";
  imageEl.setAttribute('src', imgsource);
  weatherEl.innerText = `Weather Forecast: ${searchResult.weather[0].description}`;
  temperatureEl.innerText = `Temperature: ${searchResult.main.temp} °F`;
  humidityEl.innerText = `Humidity: ${searchResult.main.humidity} %`;
  windSpeedEl.innerText = `Wind Speed: ${searchResult.wind.speed} mph`;
  var longi = searchResult.coord.lon;
  var lati = searchResult.coord.lat;
  fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lati}&lon=${longi}&appid=${ApiKey}`)
  .then(res => {
    if (res.status != 200) {
      throw Error(res.status + " " + res.statusText);
    } else {
      return res.json();
    }
  })
  .then((data) => {
    const UVIndex = data.value;
    uvindexEl.innerText = UVIndex;
    if (UVIndex <= 2) {
      uvindexEl.setAttribute("style", "background-color: lightgreen;");
      console.log(UVIndex);
    } else if (UVIndex > 2 && UVIndex <= 5 ) {
      uvindexEl.setAttribute("style", "background-color: yellow;");
      console.log(UVIndex);
    } else if (UVIndex > 5 && UVIndex <= 7 ) {
      uvindexEl.setAttribute("style", "background-color: orange;");
      console.log(UVIndex);
    } else if (UVIndex > 7 && UVIndex <= 10 ) {
      uvindexEl.setAttribute("style", "background-color: tomato;");
      console.log(UVIndex);
    } else {
      uvindexEl.setAttribute("style", "background-color: violet;");
      console.log(UVIndex);
    }
  })
  .catch(error => {
    displayResultEl.setAttribute('class', 'hide');
    dayDisplayEl.setAttribute('class', 'hide');
    myModal.setAttribute('class', 'show');
    myModalTitle.innerText = "Oops, Something went wrong. Try again";
    myModalBody.innerText = error;
    closeModalEl.addEventListener('click',() => {
      myModal.setAttribute('class', 'hide');
    });
  })
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
      myModal.setAttribute('class', 'hide');
      var searchVal = event.target.textContent;
      fetchAPI(searchVal);
      fetchForecastAPI(searchVal);
  }
});

// function to fetch weather data for 5 days using API key
function fetchForecastAPI(inputCity) {
  // Fetch request
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&units=imperial&appid=${ApiKey}`)
    // fetch("./assets/script/response1.json")
    .then(res => {
      if (res.status != 200) {
        throw Error(res.status + " " + res.statusText);
      } else {
        return res.json();
      }
    })
     .then((data) => {
       // call back function to display the city weather data
       displayForecastData(data);
       })
       .catch(error => { 
        myModal.setAttribute('class', 'show');
        myModalTitle.innerText = "Oops, Something went wrong. Try again";
        myModalBody.innerText = error;
        closeModalEl.addEventListener('click',() => {
          myModal.setAttribute('class', 'hide');
        });
      })
}

// Function to display 5 days data
function displayForecastData(data) {
  dayDisplayEl.setAttribute('class', 'container border-top border-bottom displayday show');
  fivedayRowEl.innerHTML = "";
  var myData = data.list.filter(item => {
    if (item.dt_txt.endsWith("06:00:00")) {
      return true;  
    }
  });
  myData.forEach(item => {
    var divEl = document.createElement('div');
    divEl.setAttribute("class", "col");
    fivedayRowEl.appendChild(divEl);
    var h3El = document.createElement('h3');
    var str = item.dt_txt.split(" ")[0];
    var arr = str.split("-");
    var year = arr.shift();
    arr.push(year);
    h3El.innerText = arr.join("-");
    divEl.appendChild(h3El);
    var imgEl = document.createElement('img');
    var imgindex = item.weather[0].icon;
    var imgsource = `https://openweathermap.org/img/w/${imgindex}.png`;
    imgEl.setAttribute('src', imgsource);
    divEl.appendChild(imgEl);
    var ulistEl = document.createElement('ul');
    divEl.appendChild(ulistEl);
    var listEl = document.createElement('li');
    listEl.innerText = `Temperature: ${item.main.temp} °F`;
    ulistEl.appendChild(listEl);
    var list1El = document.createElement('li');
    list1El.innerText = `Humidity: ${item.main.humidity} %`;
    ulistEl.appendChild(list1El);
    var list2El = document.createElement('li');
    list2El.innerText = `Wind Speed: ${item.wind.speed} mph`;
    ulistEl.appendChild(list2El);
  });
}