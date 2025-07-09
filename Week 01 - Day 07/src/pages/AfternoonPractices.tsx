// App.tsx
import React, { useState, useEffect } from 'react';
import StatusBar from '../components/StatusBar';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import Loading from '../components/Loading';
import Error from '../components/Error';
import type { WeatherData } from '../types/weather';

const WeatherApp: React.FC = () => {
  const [searchCity, setSearchCity] = useState('Da Nang');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hourlyData, setHourlyData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = 'c9a0ca46550648b29ce125849232709';

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no&lang=vi`
      );

      if (!currentResponse.ok) {
        throw new Error('City not found');
      }

      const currentData = await currentResponse.json();

      // Fetch hourly forecast
      const forecastResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no&lang=vi`
      );

      if (!forecastResponse.ok) {
        throw new Error('Forecast data not available');
      }

      const forecastData = await forecastResponse.json();

      setWeatherData(currentData);
      setHourlyData(forecastData.forecast.forecastday[0].hour);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch weather data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeatherData(searchCity.trim());
    }
  };

  const handleRetry = () => {
    fetchWeatherData(searchCity);
  };

  useEffect(() => {
    fetchWeatherData(searchCity);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />;
  }

  if (!weatherData) {
    return <Error message="No weather data available" onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 max-w-sm mx-auto">
      <StatusBar />
      <SearchBar
        value={searchCity}
        onChange={setSearchCity}
        onSearch={handleSearch}
      />
      <CurrentWeather
        temperature={weatherData.current.temp_c}
        condition={weatherData.current.condition.text}
        humidity={weatherData.current.humidity}
        windSpeed={weatherData.current.wind_kph}
      />
      <HourlyForecast hourlyData={hourlyData} />
    </div>
  );
};

export default WeatherApp;