import { useState, useEffect } from "react";
import styles from "./styles/SearchForm.module.css";
import iconSearch from "../../assets/iconSearch.svg";

function SearchForm({ setQueryLocationString, queryString }) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
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
        <div className={styles.searchBar}>
          <img src={iconSearch} alt="search-icon" />
          <input
            className={styles.input}
            autoComplete="off"
            type="text"
            placeholder="Search for a place..."
            id="search"
            value={localQueryString}
            onChange={(e) => {
              setLocalQueryString(e.target.value);
            }}
          />
        </div>
        <div className={styles.btnSubmit}>
          <button type="button">Search</button>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
