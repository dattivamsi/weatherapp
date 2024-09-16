// components/Forecast.js
import React from "react";

function Forecast({ data }) {
  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {data.list
          .filter((_, idx) => idx % 8 === 0)
          .map((forecast, idx) => (
            <div key={idx} className="forecast-day">
              <p>{new Date(forecast.dt_txt).toLocaleDateString()}</p>
              <p>{forecast.weather[0].description}</p>
              <p>{Math.round(forecast.main.temp)}°C</p>
              <p>
                Min: {Math.round(forecast.main.temp_min)}°C / Max:{" "}
                {Math.round(forecast.main.temp_max)}°C
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Forecast;
