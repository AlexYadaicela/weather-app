import { useState, useEffect } from "react";

function SearchForm({ setQueryString }) {
  const [localQueryString, setLocalQueryString] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log("SearchFrom is accessed");
      setQueryString(localQueryString);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={preventRefresh}>
        <input
          type="text"
          id="search"
          value={localQueryString}
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
        />
        <button type="button">Search</button>
      </form>
    </>
  );
}

export default SearchForm;
