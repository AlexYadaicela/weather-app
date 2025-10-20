import SearchResultItem from "./SearchResultItem";

function SearchResultList({ geocodingResults, enableDropDown }) {
  return (
    <>
      {enableDropDown && (
        <div>
          <ul>
            {geocodingResults.map((location) => (
              <SearchResultItem key={location.id} location={location} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SearchResultList;
