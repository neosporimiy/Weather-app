import { useState } from "react";
import { getCityAutocomplete, sendLocationRequest, sendWeatherRequest } from "./api/networkRequests";
import './App.css';
import WeatherHourCard from "./components/WeatherHourCard";
import WeatherDayCard from "./components/WeatherDayCard";
import SearchForm from "./components/SearchForm/SearchForm";
import Spinner from "./components/Spinner/Spinner";
import CurrentWeatherCard from "./components/CurrentWeatherCard";

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('London');
  const [daySelectedTab, setDaySelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isForecastVisible, setForecastVisible] = useState(false);
  const [statusLabel, setStatusLabel] = useState('Enter city or use geolocation forecast')

  const weatherHoursDividedData = isForecastVisible &&
    weatherData.days[daySelectedTab].dayHoursForecast.filter((_, hourIndex) => hourIndex % 3 === 2);

  function setInitialData() {
    setStatusLabel('Loading forecast');
    setForecastVisible(false);
    setCity('');
    setDaySelectedTab(0);
    setLoading(true);
    setWeatherData();
  }

  function setDataAfterFetch(data) {
    setWeatherData(data);
    setForecastVisible(true);
    const statusString = `${data.country},
                          ${data.region !== '' ? `${data.region},` : ''}
                          ${data.city}`
    setStatusLabel(statusString);
  }

  function handleDayClick(index) {
    setDaySelectedTab(index);
  }

  async function handleSearchClick() {
    if(city === ''){
      return;
    }
    setInitialData();
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // debug only
      const data = await sendWeatherRequest(city);
      setDataAfterFetch(data);
    } catch (error) {
      setForecastVisible(false);
      setStatusLabel('Something went wrong, check your internet connection');
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSuggestionClick() {
    setInitialData();
    setSuggestions([]);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // debug only
      const data = await sendWeatherRequest(city);
      setDataAfterFetch(data);
    } catch (error) {
      setForecastVisible(false);
      setStatusLabel('Something went wrong, check your internet connection');
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLocationClick() {
    setInitialData();
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // debug only
      const data = await sendLocationRequest();
      setDataAfterFetch(data);
    } catch (error) {
      setForecastVisible(false);
      setStatusLabel('Something went wrong, check your internet connection');
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleInputChange(inputValue) {
    setCity(inputValue);
    try {
      const data = await getCityAutocomplete(inputValue);
      setSuggestions(data.map(location => location.name));
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  }

  return (
    <div className="main-container">
      {loading ? <Spinner /> : null}

      <SearchForm city={city}
                  setCity={handleInputChange}
                  handleSearchClick={handleSearchClick}
                  suggestions={suggestions}
                  handleSuggestionClick={handleSuggestionClick}
                  handleLocationClick={handleLocationClick}/>

      <h2 style={{ textAlign: 'center' }}>{statusLabel}</h2>

      <div className="days-weather">
        {isForecastVisible && weatherData.days.map((dayForecast, index) => (
          <WeatherDayCard key={index}
                          className={`one-weather-card ${daySelectedTab === index ? 'active' : ''}`}
                          data={dayForecast}
                          onClick={() => {
                            handleDayClick(index);
                            setDaySelectedTab(index);
                          }}/>
        ))}
      </div>

      <div className="day-forecast">
        {isForecastVisible && daySelectedTab === 0 && <CurrentWeatherCard data={weatherData} />}
        <div className="weather-cards">
          {weatherHoursDividedData && weatherHoursDividedData.map((dayHourForecast, hourIndex) => (
            <WeatherHourCard key={hourIndex} data={dayHourForecast} />
          ))}
        </div>
      </div>
    </div>
  );
}
