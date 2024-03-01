import React, { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather"; 
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

interface WeatherData {
  city: string;
  // Add other properties from the weather response
}

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any | null>(null);

  const handleOnSearchChange = (searchData: { value: string; label: string }) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        console.log(weatherResponse, "weather");
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />} 
    </div>
  );
}

export default App;
