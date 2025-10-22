import SearchResultItem from "./SearchResultItem";
import styles from "./styles/SearchForm.module.css";

function SearchResultList({
  geocodingResults,
  enableDropDown,
  setQueryForecast,
  queryString,
  setSelectedLocation,
}) {
  const handleClick = (selectedLocation) => {
    setQueryForecast({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
    setSelectedLocation(selectedLocation);
    queryString("");
  };
  return (
    <>
      {enableDropDown && (
        <div className={styles.resultList}>
          <ul>
            {geocodingResults.map((location) => (
              <SearchResultItem
                key={location.id}
                location={location}
                handlePressLocation={handleClick}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SearchResultList;
