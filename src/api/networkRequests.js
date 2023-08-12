import WeatherParser from '../utils/weatherParser'

const API_BASE_URL = 'http://api.weatherapi.com/v1';
const API_KEY = 'e48a155e385343e38bd34247230608';

export async function getCityAutocomplete(searchQuery) {
    return await weatherApiRequest(`${API_BASE_URL}/search.json?key=${API_KEY}&q=${searchQuery}`);
}

export async function getTodayWeather(city) {
    return await weatherApiRequest(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=1`);
}

export async function getWeekWeather(city) {
    return await weatherApiRequest(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7`);    
}

export async function getWeatherByCoordinates(latitude, longitude) {
    return await weatherApiRequest(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7`);
}

async function weatherApiRequest(url) {
    try {
        const response = await fetch(url);
        
        if(!response.ok) {
            throw new Error('Network error')
        }

        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        throw error;
    }
}

export function sendLocationRequest() {
    return new Promise(async (resolve, reject) => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const weather = await getWeatherByCoordinates(latitude, longitude);
        const data = WeatherParser.parseForecast(weather);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  export function sendWeatherRequest(city) {
    return new Promise(async (resolve, reject) => {
      try {
        const weekForecast = await getWeekWeather(city);
        const data = WeatherParser.parseForecast(weekForecast);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("Geolocation is not available."));
      }
    });
  }