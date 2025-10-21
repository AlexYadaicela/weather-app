import "./App.css";
import { useState, useEffect, useCallback } from "react";
import SearchForm from "./features/search/SearchForm";
import SearchResultList from "./features/search/SearchResultList";

const urlGeocoding = "https://geocoding-api.open-meteo.com/v1/search?name=";

const urlForecast = "https://api.open-meteo.com/v1/forecast";
const urlForecastParameters =
  "daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature,weather_code&timezone=auto";
function App() {
  const [queryLocationString, setQueryLocationString] = useState("");
  const [geocodingResults, setGeocodingResults] = useState(null);
  const [queryForecast, setQueryForecast] = useState({
    latitude: "52.52",
    longitude: "13.41",
  });

  const [forecastResult, setForecastResult] = useState(null);

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
    const fetchForecast = async () => {
      try {
        const response = await fetch(encodeForecastUrl());
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        const { hourly, current, daily } = await response.json();
        console.log(hourly);
        console.log(current);
        console.log(daily);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchForecast();
  }, [queryForecast, encodeForecastUrl]);

  useEffect(() => {
    if (!queryLocationString) {
      return;
    }

    const fetchLocation = async () => {
      try {
        const response = await fetch(encodeGeocodingUrl());
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        const { results } = await response.json();
        setGeocodingResults(results);
        console.log(results);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchLocation();
  }, [queryLocationString, encodeGeocodingUrl]);

  // check if dropdown renders
  const enableDropdown =
    geocodingResults &&
    geocodingResults.length > 0 &&
    queryLocationString.length > 0;

  return (
    <>
      <SearchForm setQueryLocationString={setQueryLocationString}></SearchForm>
      <SearchResultList
        geocodingResults={geocodingResults}
        enableDropDown={enableDropdown}
      />
    </>
  );
}

export default App;
