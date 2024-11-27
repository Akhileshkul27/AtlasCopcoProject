import React, { useEffect, useState } from 'react';

const Location = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (err) => {
          console.error(err);
          setError("Unable to retrieve location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    const API_KEY = '3489cc20d924408ab6ef1ce68eea7588'; // Replace with your actual Weather API key
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&include=minutely`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Ensure that the response has the expected structure
      if (data.data && data.data.length > 0) {
        const weatherInfo = data.data[0];
        setWeatherData({
          City: weatherInfo.city_name,
          Temperature: weatherInfo.temp,
          Humidity: weatherInfo.rh,
          WindSpeed: weatherInfo.wind_spd,
          WeatherDescription: weatherInfo.weather.description,
          Visibility: weatherInfo.vis,
          Sunrise: weatherInfo.sunrise,
          Sunset: weatherInfo.sunset,
        });
      } else {
        setError("No weather data available.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Current Location Weather</h1>
      {error && <p>Error: {error}</p>}
      {weatherData ? (
        <div>
          <h2>{weatherData.City}</h2>
          <p>Temperature: {weatherData.Temperature}°C</p>
          <p>Humidity: {weatherData.Humidity}%</p>
          <p>Wind Speed: {weatherData.WindSpeed} m/s</p>
          <p>Weather: {weatherData.WeatherDescription}</p>
          <p>Visibility: {weatherData.Visibility} meters</p>
          <p>Sunrise: {weatherData.Sunrise}</p>
          <p>Sunset: {weatherData.Sunset}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Location;
