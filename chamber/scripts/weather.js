const myTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const myDiscription = document.querySelector('#weather-description');
const humidityElement = document.querySelector('#weather-humidity');
const forecastContainer = document.querySelector('#forecast-container');
const tempMax = document.querySelector('#temp-max');
const tempMin = document.querySelector('#temp-min');
const tempFeel = document.querySelector('#temp-feel');

const myKey = "35b2a754cac71754ea8830c81a50210b"
const myLat = "32.776156345339935"
const myLong = "-96.794972134866"

const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial` // ADD THIS LINE

async function apiFetch() {
    try {
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function forecastFetch() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    myDiscription.innerHTML = data.weather[0].description
    myTemp.innerHTML = `${data.main.temp}&deg; F`
    tempMax.innerHTML = `Hight Temperature ${data.main.temp_max}&deg;F`
    tempMin.innerHTML = `Low Temperature ${data.main.temp_min}&deg;F`
    tempFeel.innerHTML = `Feels Like ${data.main.feels_like}&deg;F`
    humidityElement.innerHTML = `${data.main.humidity}% Humidity`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('src', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';

    const dailyData = [];
    const today = new Date().getDate();

    for (let i = 0; i < data.list.length && dailyData.length < 3; i++) {
        const forecastDate = new Date(data.list[i].dt * 1000);
        const forecastDay = forecastDate.getDate();

        if (forecastDay !== today && data.list[i].dt_txt.includes('12:00:00')) {
            dailyData.push(data.list[i]);
        }
    }

    dailyData.forEach((day, index) => {
        const date = new Date(day.dt * 1000);
        const dayName = index === 0 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'long' });

        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <h2>${dayName}</h2>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            <div class="forecast-temp">${Math.round(day.main.temp)}&deg;F</div>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}

apiFetch();
forecastFetch();