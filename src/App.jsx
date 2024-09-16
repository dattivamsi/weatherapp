// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import ErrorMessage from "./components/ErrorMessage.jsx";

const API_KEY = "7b32543e9965a3e4461f0f2c2aa56356"; 

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    try {
      const currentWeatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(currentWeatherRes.data);
      setForecastData(forecastRes.data);
      setError(null);
    } catch (err) {
      setError("City not found. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeatherData(lastCity);
    }
  }, []);

  const handleSearch = (city) => {
    setCity(city);
    fetchWeatherData(city);
    localStorage.setItem("lastCity", city);
  };

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage message={error} />}
      {weatherData && <CurrentWeather data={weatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
}

export default App;
