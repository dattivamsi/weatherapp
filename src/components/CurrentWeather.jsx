// components/CurrentWeather.js
import React from "react";

function CurrentWeather({ data }) {
  return (
    <div className="current-weather">
      <h2>{data.name}</h2>
      <p>{data.weather[0].description}</p>
      <p>{Math.round(data.main.temp)}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
}

export default CurrentWeather;
