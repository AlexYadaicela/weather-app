import "./App.css";
import { useState, useEffect, useCallback } from "react";
import SearchForm from "./features/search/SearchForm";

const url = "https://geocoding-api.open-meteo.com/v1/search?name=";

function App() {
  const [queryString, setQueryString] = useState("");
  const [location, setLocation] = useState(null);

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
        setLocation(results);
        console.log(results);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchLocation();
  }, [queryString, encodeUrl]);

  return (
    <>
      <SearchForm setQueryString={setQueryString}></SearchForm>
    </>
  );
}

export default App;
