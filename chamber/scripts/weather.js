const myTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const myDiscription = document.querySelector('#weather-description');
const humidityElement = document.querySelector('#weather-humidity');

const myKey = "35b2a754cac71754ea8830c81a50210b"
const myLat = "32.776156345339935"
const myLong = "-96.794972134866"

const URL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`

async function apiFetch() {
    try {
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    myDiscription.innerHTML = data.weather[0].description
    myTemp.innerHTML = `${data.main.temp}&deg;F`
    humidityElement.innerHTML = `${data.main.humidity}% Humidity`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('SRC', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)
}

apiFetch();