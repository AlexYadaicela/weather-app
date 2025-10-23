import "./App.css";
import { useState, useEffect, useCallback } from "react";
import SearchForm from "./features/search/SearchForm";
import SearchResultList from "./features/search/SearchResultList";
import WeatherForecast from "./features/WeatherForecast/WeatherForecast";

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
    <>
      <div>
        <SearchForm
          setQueryLocationString={setQueryLocationString}
          queryString={queryLocationString}
        />
        <SearchResultList
          geocodingResults={geocodingResults}
          enableDropDown={hasLoad}
          setQueryForecast={setQueryForecast}
          queryString={setQueryLocationString}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
      <WeatherForecast
        forecastResults={forecastResults}
        selectedLocation={selectedLocation}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
