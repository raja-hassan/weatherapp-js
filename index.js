const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');

const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeather(city);
  } else {
    weatherInfo.textContent = 'Please enter a city name';
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    if (data.cod === '404') {
      weatherInfo.textContent = 'City not found';
    } else {
      const weather = `Weather: ${data.weather[0].description}`;
      const temperature = `Temperature: ${data.main.temp}°C`;
      const humidity = `Humidity: ${data.main.humidity}%`;

      weatherInfo.innerHTML = `<p>${weather}</p><p>${temperature}</p><p>${humidity}</p>`;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfo.textContent = 'Failed to fetch weather data. Please try again later.';
  }
}
