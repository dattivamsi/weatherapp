// components/SearchBar.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchCitySuggestions = async (inputValue) => {
    if (inputValue.length > 2) {
      try {
        const response = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}`,
          {
            headers: {
              "X-RapidAPI-Key": "82892125afmshe27717ee321ef69p12f83cjsna90e85c77d68",
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        setSuggestions(response.data.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    fetchCitySuggestions(e.target.value);
  };

  const handleSelectCity = (city) => {
    setInput(city);
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelectCity(suggestion.city)}
            >
              {suggestion.city}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
