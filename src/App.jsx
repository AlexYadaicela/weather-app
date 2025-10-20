import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [queryString, setQueryString] = useState("");
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${queryString}&count=10&language=en&format=json`;

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(`${url}`);
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    handleSearch();
  }, [queryString]);

  const preventRefresh = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={preventRefresh}>
        <input
          type="text"
          value={queryString}
          name="search"
          onChange={(e) => {
            setQueryString(e.target.value);
          }}
        />
        <button type="button">Search</button>
      </form>
    </>
  );
}

export default App;
