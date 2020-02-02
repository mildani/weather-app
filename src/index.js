//Display the weather conditions (and city) from the weather API response

function showWeather(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#temperature-value").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather-description-display").innerHTML = response.data.weather[0].main;
}

//Display city name and receive temperature based on form input

function overwriteCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-city");
  if (searchInput.value) {
    let displayCity = document.querySelector("#city-display");
    let city = searchInput.value;
    displayCity.innerHTML = city;
  }
}

function getTemperature(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-city");
  if (searchInput.value) {
    //function only works if there is a value on the searchInput
    let city = searchInput.value;
    let apiKey = "dc3cada4523181d62d387960cea623b8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(`${apiUrl}`).then(showWeather);
  }
}

//Display city name and receive temperature based on current location

function overwriteCurrentCity(response) {
  let city = response.data.name;
  let displayCity = document.querySelector("#city-display");
  displayCity.innerHTML = city;
}

function getCurrentTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "dc3cada4523181d62d387960cea623b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
  axios.get(`${apiUrl}`).then(overwriteCurrentCity);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentTemperature);
}

//Listen for form submission or current location request

let form = document.querySelector("#search-city");
form.addEventListener("submit", getTemperature);
form.addEventListener("submit", overwriteCity);

let button = document.querySelector("#button-current-location");
button.addEventListener("click", getCurrentLocation);
