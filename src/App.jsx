import "./App.css";
import { useState, useEffect, useCallback } from "react";
import SearchForm from "./features/search/SearchForm";
import SearchResultList from "./features/search/SearchResultList";

const url = "https://geocoding-api.open-meteo.com/v1/search?name=";

function App() {
  const [queryString, setQueryString] = useState("");
  const [geocodingResults, setGeocodingResults] = useState(null);

  const encodeUrl = useCallback(() => {
    return `${url}${encodeURIComponent(
      queryString
    )}&count=10&language=en&format=json`;
  }, [queryString]);

  useEffect(() => {
    if (!queryString) {
      return;
    }

    const fetchLocation = async () => {
      try {
        const response = await fetch(encodeUrl());
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
  }, [queryString, encodeUrl]);

  // check if dropdown renders
  const enableDropdown =
    geocodingResults && geocodingResults.length > 0 && queryString.length > 0;

  return (
    <>
      <SearchForm setQueryString={setQueryString}></SearchForm>
      <SearchResultList
        geocodingResults={geocodingResults}
        enableDropDown={enableDropdown}
      />
    </>
  );
}

export default App;
