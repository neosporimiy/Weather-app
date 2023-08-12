export default class WeatherParser {
  static parseForecast(weekForecast) {
    const fullWeatherInfo = {
      country: weekForecast.location.country,
      region: weekForecast.location.region,
      city: weekForecast.location.name,
      localTime: weekForecast.location.localtime,
      isDay: weekForecast.current.is_day,
      currentTemp: weekForecast.current.temp_c,
      currentConditionText: weekForecast.current.condition.text,
      currentConditionIcon: weekForecast.current.condition.icon,
      currentConditionCode: weekForecast.current.condition.code,
      days: weekForecast.forecast.forecastday.map((forecastDay) => {
        const date = forecastDay.date;
        const hours = forecastDay.hour.map((hourData) => ({
          hour: hourData.time,
          isDay: hourData.is_day,
          hourTemp: hourData.temp_c,
          hourConditionIcon: hourData.condition.icon,
          hourConditionText: hourData.condition.text,
          hourConditionCode: hourData.condition.code,
        }));
        return {
          isDay: weekForecast.current.is_day,
          date,
          dayMaxTemp: forecastDay.day.maxtemp_c,
          dayMinTemp: forecastDay.day.mintemp_c,
          dayConditionIcon: forecastDay.day.condition.icon,
          dayConditionText: forecastDay.day.condition.text,
          dayConditionCode: forecastDay.day.condition.code,
          dayHoursForecast: hours,
        };
      }),
    };

    return fullWeatherInfo;
  }
}
