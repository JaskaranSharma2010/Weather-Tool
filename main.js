document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.getElementById('getWeather');
    const coordinatesInput = document.getElementById('coordinates');
    const weatherInfo = document.querySelector('.weather-info');
    
    getWeatherBtn.addEventListener('click', async () => {
        const coordinates = coordinatesInput.value.trim();
        if (!coordinates) {
            alert('Please enter coordinates in the format: lat:lon');
            return;
        }

        try {
            // Show loading state
            weatherInfo.classList.remove('hidden');
            document.getElementById('cityName').textContent = 'Loading...';
            
            // Split coordinates
            const [lat, lon] = coordinates.split(':');
            
            // First, get city name using reverse geocoding
            const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=3356d213048d8a42a5f5fa1608140756`);
            const geoData = await geoResponse.json();
            
            if (!geoData || geoData.length === 0) {
                throw new Error('Location not found');
            }
            
            const city = geoData[0].name;
            document.getElementById('cityName').textContent = city;
            
            // Then, get weather data
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3356d213048d8a42a5f5fa1608140756`);
            const weatherData = await weatherResponse.json();
            
            if (weatherResponse.status !== 200) {
                throw new Error('Failed to fetch weather data');
            }
            
            // Update UI with weather data
            const tempCelsius = (weatherData.main.temp - 273.15).toFixed(2);
            const feelsLikeCelsius = (weatherData.main.feels_like - 273.15).toFixed(2);
            
            document.getElementById('temp').textContent = `${tempCelsius}°C`;
            document.getElementById('feelsLike').textContent = `Feels like: ${feelsLikeCelsius}°C`;
            document.getElementById('weatherCondition').textContent = weatherData.weather[0].description;
            document.getElementById('humidity').textContent = `Humidity: ${weatherData.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind: ${weatherData.wind.speed} m/s`;
            
        } catch (error) {
            alert(`Error: ${error.message}`);
            weatherInfo.classList.add('hidden');
        }
    });
}); 