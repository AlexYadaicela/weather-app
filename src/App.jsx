import "./App.css";
import { useState, useEffect, useCallback } from "react";
import WeatherPage from "./pages/WeatherPage";
import NotFound from "./pages/NotFound";
import { Route, Routes, useLocation } from "react-router";

const urlGeocoding = "https://geocoding-api.open-meteo.com/v1/search?name=";
const urlForecast = "https://api.open-meteo.com/v1/forecast";
const urlForecastParameters =
  "daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature,temperature_2m,weather_code";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [queryLocationString, setQueryLocationString] = useState("");
  const [geocodingResults, setGeocodingResults] = useState(null);
  const [queryForecast, setQueryForecast] = useState({
    latitude: "",
    longitude: "",
  });
  const [selectedLocation, setSelectedLocation] = useState("");
  const [forecastResults, setForecastResults] = useState(null);

  const encodeGeocodingUrl = useCallback(() => {
    return `${urlGeocoding}${encodeURIComponent(
      queryLocationString
    )}&count=10&language=en&format=json`;
  }, [queryLocationString]);

  const encodeForecastUrl = useCallback(() => {
    let coordLocation = `latitude=${queryForecast.latitude}&longitude=${queryForecast.longitude}`;
    return encodeURI(
      `${urlForecast}?${coordLocation}&${urlForecastParameters}`
    );
  }, [queryForecast]);

  useEffect(() => {
    if (!queryLocationString) {
      return;
    }

    const fetchLocation = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(encodeGeocodingUrl());
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        const { results } = await response.json();
        setGeocodingResults(results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [queryLocationString, encodeGeocodingUrl]);

  useEffect(() => {
    if (!queryForecast.latitude || !queryForecast.longitude) {
      return;
    }
    const fetchForecast = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(encodeForecastUrl());
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        const results = await response.json();
        setForecastResults(results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecast();
  }, [queryForecast, encodeForecastUrl]);

  // check if dropdown renders
  const hasLoad =
    geocodingResults &&
    geocodingResults.length > 0 &&
    queryLocationString.length > 0;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <WeatherPage
            setQueryLocationString={setQueryLocationString}
            queryString={queryLocationString}
            geocodingResults={geocodingResults}
            setQueryForecast={setQueryForecast}
            setSelectedLocation={setSelectedLocation}
            forecastResults={forecastResults}
            selectedLocation={selectedLocation}
            isLoading={isLoading}
            hasLoad={hasLoad}
          />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
