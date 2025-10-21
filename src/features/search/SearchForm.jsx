import { useState, useEffect } from "react";

function SearchForm({ setQueryLocationString }) {
  const [localQueryString, setLocalQueryString] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log("SearchFrom is accessed");
      setQueryLocationString(localQueryString);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryLocationString]);

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
