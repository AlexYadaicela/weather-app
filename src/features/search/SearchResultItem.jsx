import styles from "./styles/SearchForm.module.css";

function SearchResultItem({ location, handlePressLocation }) {
  const handleClick = () => {
    handlePressLocation(location);
  };
  return (
    <li className={styles.resultItem}>
      <button onClick={handleClick}>
        <span>{location.name}, </span>
        <span>{location.admin1}, </span>
        <span>{location.country}</span>
      </button>
    </li>
  );
}

export default SearchResultItem;
