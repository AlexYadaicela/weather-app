import SearchResultItem from "./SearchResultItem";

function SearchResultList({
  geocodingResults,
  enableDropDown,
  setQueryForecast,
  queryString,
}) {
  const handleClick = (selectedLocation) => {
    setQueryForecast({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
    queryString("");
  };
  return (
    <>
      {enableDropDown && (
        <div>
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
