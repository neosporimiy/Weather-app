import React from 'react';
import '../App.css';
import iconData from '../data/iconData.json';

export default function CurrentWeatherCard({ data }) {

  const temperatureValue = Math.max(-50, Math.min(data.currentTemp, 50));
  const fillPercentage = Math.abs(temperatureValue) * 2;

  function getIconImagePath(iconCode, isDay) {
    const icon = iconData.find((item) => item.code === iconCode);
    if (icon) {
      return `images/${isDay ? 'day' : 'night'}/${icon.icon}.png`;
    }
    return '';
  }

  function extractTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();  
    const timeOnly = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;    
    return timeOnly;
  }

  return (
      <div className="current-weather-card">
        <div className="temperature-indicator">
            <div className="temperature-bar">
            <div className={`temperature-fill ${temperatureValue < 0 ? 'negative-temperature' : 'positive-temperature'}`}
                    style={{ height: `${fillPercentage}%` }}>
            </div>
            </div>
        </div>
        <div>
            <div className="day-of-week">{extractTime(data.localTime)}</div>
            <div>
            <img 
                src={getIconImagePath(data.currentConditionCode, data.isDay)}
                alt={data.currentConditionText}
            />
            </div>
            <div className="temperature">{Math.round(data.currentTemp)}°C</div>
        </div>
      </div>
  );
}
