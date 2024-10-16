const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

searchButton.addEventListener('click', () => {
    const APIkey = 'c572dc0cd0051964e6b56eee2fee93fd';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                notFound.style.display = 'block';
                return;
            }

            notFound.style.display = 'none';
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.humidity .value');
            const wind = document.querySelector('.wind .value');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './images/clear.png';
                    break;
                case 'Rain':
                    image.src = './images/rain.png';
                    break;
                case 'Snow':
                    image.src = './images/snow.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = './images/mist.png';
                    break;
                default:
                    image.src = './images/cloudy.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed.toFixed(2)} Km/h`;
        });
});
