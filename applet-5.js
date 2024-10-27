class WeatherApp {
    constructor() {
        // API Key and City Input for the main interface
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.cityInput = document.getElementById('cityInput');
        this.getWeatherBtn = document.getElementById('getWeatherBtn');
        this.getLocationBtn = document.getElementById('getLocationBtn');

        // Modal Inputs
        this.modalApiKeyInput = document.getElementById('modalApiKeyInput');
        this.modalCityInput = document.getElementById('modalCityInput');
        this.modalGetWeatherBtn = document.getElementById('modalGetWeatherBtn');
        this.modalGetLocationBtn = document.getElementById('modalGetLocationBtn');

        // Weather Card
        this.weatherCard = document.getElementById('weatherCard');
        this.cityName = document.getElementById('cityName');
        this.temperature = document.getElementById('temperature');
        this.description = document.getElementById('description');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');

        // Event Listeners for Main Interface
        this.getWeatherBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.fetchWeather();
        });
        
        this.getLocationBtn.addEventListener('click', () => this.fetchWeatherByLocation());

        // Event Listeners for Modal
        this.modalGetWeatherBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.fetchWeatherFromModal();
        });
        
        this.modalGetLocationBtn.addEventListener('click', () => this.fetchWeatherByLocationFromModal());
    }

    async fetchWeather() {
        const apiKey = this.apiKeyInput.value;
        const city = this.cityInput.value.trim();

        if (apiKey && city) {
            const data = await this.getWeatherData(city, apiKey);
            if (data) {
                this.displayWeather(data);
            } else {
                alert('City not found. Please try again.');
            }
        } else {
            alert('Please enter both an API Key and a city name.');
        }
    }

    async fetchWeatherFromModal() {
        const apiKey = this.modalApiKeyInput.value;
        const city = this.modalCityInput.value.trim();

        if (apiKey && city) {
            const data = await this.getWeatherData(city, apiKey);
            if (data) {
                this.displayWeather(data);
            } else {
                alert('City not found. Please try again.');
            }
        } else {
            alert('Please enter both an API Key and a city name.');
        }
    }

    async fetchWeatherByLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = this.apiKeyInput.value || this.modalApiKeyInput.value;
                    const data = await this.getWeatherDataByCoordinates(latitude, longitude, apiKey);
                    if (data) {
                        this.displayWeather(data);
                    } else {
                        alert('Unable to retrieve weather data for your location.');
                    }
                },
                () => {
                    alert('Unable to retrieve your location. Please allow location access.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    async fetchWeatherByLocationFromModal() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = this.modalApiKeyInput.value;
                    const data = await this.getWeatherDataByCoordinates(latitude, longitude, apiKey);
                    if (data) {
                        this.displayWeather(data);
                    } else {
                        alert('Unable to retrieve weather data for your location.');
                    }
                },
                () => {
                    alert('Unable to retrieve your location. Please allow location access.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    async getWeatherData(city, apiKey) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        return null;
    }

    async getWeatherDataByCoordinates(latitude, longitude, apiKey) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching weather data by coordinates:', error);
        }
        return null;
    }

    displayWeather(data) {
        this.cityName.textContent = `${data.name}, ${data.sys.country} (${data.coord.lat}, ${data.coord.lon})`;
        this.temperature.textContent = `Temperature: ${data.main.temp} °C`;
        this.description.textContent = `Weather: ${data.weather[0].description}`;
        this.humidity.textContent = `Humidity: ${data.main.humidity}%`;
        this.windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        // Set the weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weatherIcon').src = iconUrl;

        this.weatherCard.style.display = 'block';
        this.weatherCard.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the WeatherApp
const weatherApp = new WeatherApp();

document.addEventListener('DOMContentLoaded', () => {
    const modal = new bootstrap.Modal(document.getElementById('infoModal'));
    modal.show();
});
