let currentTime = new Date();
let currentMinutes = currentTime.getMinutes();
let currentHours = currentTime.getHours();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentTime.getDay()];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

function updatePage(response) {
  let city = response.data.name;
  let header = document.querySelector("h1");
  header.innerHTML = city;

  let temperature = response.data.main.temp;
  let temperatureField = document.querySelector("#temperature");
  temperatureField.innerHTML = temperature;
}

function getWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#search-field").value;

  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data//2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(updatePage);
}

function getLocalWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data//2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

  axios.get(`${apiUrl}&appid=${apiKey}`).then(updatePage);
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(getLocalWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", getWeather);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getPosition);
