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
}