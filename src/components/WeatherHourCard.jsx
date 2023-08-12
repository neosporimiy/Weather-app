import React from 'react';
import '../App.css'
import iconData from "../data/iconData.json";

export default function WeatherHourCard({data}) {

    function getIconImagePath(iconCode, isDay) {
        const icon = iconData.find((item) => item.code === iconCode);
        if (icon) {
          return `images/${isDay ? "day" : "night"}/${icon.icon}.png`;
        }
        return "";
      }
      
      function formatTime(dateTime) {
        const date = new Date(dateTime);
        const hours = date.getHours();
        const minutes = date.getMinutes();
      
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      }

    return (
        <div className="one-hour-weather-card">
            <div>{formatTime(data.hour)}</div>
            <div><img src={getIconImagePath(data.hourConditionCode, data.isDay)} alt={data.hourConditionText}/></div>
            <div className='temperature'>{Math.round(data.hourTemp)}°C</div>
        </div>

    );
};

