import "./App.css";
import { useState, useEffect, useCallback } from "react";
import SearchForm from "./features/search/SearchForm";
import SearchResultList from "./features/search/SearchResultList";
import WeatherForecast from "./features/WeatherForecast/WeatherForecast";

const urlGeocoding = "https://geocoding-api.open-meteo.com/v1/search?name=";
const urlForecast = "https://api.open-meteo.com/v1/forecast";
const urlForecastParameters =
  "daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature,weather_code&timezone=auto";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [queryLocationString, setQueryLocationString] = useState("");
  const [geocodingResults, setGeocodingResults] = useState(null);
  const [queryForecast, setQueryForecast] = useState({
    latitude: "52.52",
    longitude: "13.41",
  });

  const [forecastResultHourly, setForecastResultHourly] = useState(null);
  const [forecastResultCurrent, setForecastResultCurrent] = useState(null);
  const [forecastResultDaily, setForecastResultDaily] = useState(null);

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
        console.log(queryForecast);
        setIsLoading(true);
        const response = await fetch(encodeForecastUrl());
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        const { hourly, current, daily } = await response.json();
        setForecastResultHourly(hourly);
        setForecastResultCurrent(current);
        setForecastResultDaily(daily);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
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
        setQueryForecast={setQueryForecast}
        queryString={setQueryLocationString}
      />
      <WeatherForecast
        currentCondition={forecastResultCurrent}
        // hourlyCondition={forecastResultHourly}
        // dailyCondition={forecastResultDaily}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
