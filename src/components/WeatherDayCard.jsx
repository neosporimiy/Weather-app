import React from 'react';
import '../App.css'
import iconData from "../data/iconData.json";

export default function WeatherDayCard({data, onClick, className}) {

    function getIconImagePath(iconCode, isDay) {
        const icon = iconData.find((item) => item.code === iconCode);
        if (icon) {
          return `images/${isDay ? "day" : "night"}/${icon.icon}.png`;
        }
        return "";
      }
      
    function formatDate(dateTime) {
        const date = new Date(dateTime);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dayOfMonth = date.getDate();
        const monthName = date.toLocaleDateString('en-US', { month: 'long' });
        
        return (
            <div className="date">
              <div className="day-of-week">{dayOfWeek}</div>
              <div className="day">{dayOfMonth}</div>
              <div className="month">{monthName}</div>
            </div>
          );
    }

    return (
        <div className={className} onClick={onClick}>
            <div>{formatDate(data.date)}</div>
            <div><img src={getIconImagePath(data.dayConditionCode, data.isDay)} alt={data.dayConditionText}/></div>
            <div className="temperature-container">
            <div className="temperature">{"min"}<span>{Math.round(data.dayMinTemp)}°C</span></div>
            <div className="temperature">{"max"}<span>{Math.round(data.dayMaxTemp)}°C</span></div>
            </div>
        </div>

    );
};

