// Bring in all input and fetch elements from index as an object
const els = {
    cityInput: document.querySelector('#city-input'),
    searchBtn: document.querySelector('#search-btn'),
    historyEl: document.querySelector('#search-history'),
    currentWeather: document.querySelector('.current-weather'),
    forecastWeather: document.querySelector('#five-day-forecast'),
    currentCity: document.querySelector('#current-city'),
    currentIcon: document.querySelector('#current-icon'),
    currentTemp: document.querySelector('#current-temp'),
    currentWind: document.querySelector('#current-wind'),
    currentHumid: document.querySelector('#current-humid'),
};

// Set up 5 day forecast elements as an object in an array
const forecastEls = [];
for (let i = 0; i <= 5; i++) {
    forecastEls.push({
        day: document.querySelector(`day-${i}`),
        icon: document.querySelector(`icon-${i}`),
        temp: document.querySelector(`temp-${i}`),
        wind: document.querySelector(`wind-${i}`),
        humid: document.querySelector(`humid-${i}`),
    })
};

// Set up API key
const apiKey = '3ba7c5db60a6f3b4a530ece291eafd0b';

// Search city function
const handleSearch = function() {
    const city = els.cityInput.value.trim();
    if (!city) {
        return;
    }

    localStorage.setItem('city', city);
    getCurrentWeather(city);
    getForecastWeather(city);
    els.cityInput.value = '';
    searchHistory();
};

// Show search history
const searchHistory = function() {
    const cityHistory = document.createElement('button');
    const cityName = localStorage.getItem('city');
    cityHistory.textContent = cityName;
    cityHistory.className = 'cityHistoryBtn'

    cityHistory.addEventListener('click', () => {
        getCurrentWeather(cityName);
        getForecastWeather(cityName);
    });

    els.historyEl.appendChild(cityHistory);
};

// Show current weather
const getCurrentWeather = function(city) {
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    // Fetch API and append results to index for current weather
    fetch(apiCall)
        .then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    els.currentWeather.hidden = false;
                    els.currentCity.innerHTML = `${data.name} (${dayjs().format('MM/DD/YYYY')})`;
                    els.currentIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
                    els.currentTemp.innerHTML = `Temp: ${data.main.temp}°F`;
                    els.currentWind.innerHTML = `Wind: ${data.wind.speed} MPH`;
                    els.currentHumid.innerHTML = `Humidity: ${data.main.humidity}%`
                });
            } else {
                alert(`Error, City ${res.statusText}`);
            }
        });
};

// Show 5 day forecast
const getForecastWeather = function(city) {
    const apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    // Fetch API and append results to index for 5 day forecast
    fetch(apiCall)
        .then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    els.forecastWeather.hidden = false;

                    for (let i = 0; i < forecastEls.length; i++) {
                        const dayForecast = dayjs().add(i + 1, 'day').format('MM/DD/YYYY');
                        const dataForecast = data.list[i + 1];
                        const forecastArrayElement = forecastEls[i];

                        forecastArrayElement.day.innerHTML = dayForecast;
                        forecastArrayElement.icon.src = "https://openweathermap.org/img/wn/" + dataForecast.weather[0].icon + ".png";
                        forecastArrayElement.temp.innerHTML = `Temp: ${dataForecast.main.temp}°F`;
                        forecastArrayElement.wind.innerHTML = `Wind: ${dataForecast.wind.speed} MPH`;
                        forecastArrayElement.humid.innerHTML = `Humidity: ${dataForecast.main.humidity}%`
                    }; 
                });
            } else {
                alert(`Error, City ${res.statusText}`);
            }
        });
};

// Call handleSearch function on click
els.searchBtn.addEventListener('click', handleSearch);

// Call handleSearch function on button press'Enter'
els.cityInput.addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
        event.preventDefault();
        els.searchBtn.click();    
    }
});
