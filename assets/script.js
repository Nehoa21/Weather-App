// Bring in all input and fetch elements from index as an object
const els = {
    cityInput: document.querySelector('#city-input'),
    searchBtn: document.querySelector('#search-btn'),
    historyEl: document.querySelector('.search-history'),
    currentWeather: document.querySelector('.current-weather'),
    forecastWeather: document.querySelector('#five-day-forecast'),
    currentCity: document.querySelector('#current-city'),
    currentTemp: document.querySelector('#current-temp'),
    currentWind: document.querySelector('#current-wind'),
    currentHumid: document.querySelector('#current-humid'),
};

// Set up 5 day forecast elements as an object in an array
const forecastEls = [];
for (let i = 0; i <=5; i++) {
    forecastEls.push({
        day: document.querySelector(`day-${i}`),
        icon: document.querySelector(`icon-${i}`),
        temp: document.querySelector(`temp-${i}`),
        wind: document.querySelector(`wind-${i}`),
        humid: document.querySelector(`humid-${i}`),
    })
};

// Set up API key
const apiKey = '';

// Search city function
const handleSearch = function() {

};

// Show search history
const searchHistory = function() {

};

// Show current weather
const getCurrentWeather = function() {

};

// Show 5 day forecast
const getForecastWeather = function() {

};

// Call handleSearch function on click
els.searchBtn.addEventListener('click', handleSearch);

// Call handleSearch function on button press'Enter'
els.cityInput.addEventListener('keypress')
