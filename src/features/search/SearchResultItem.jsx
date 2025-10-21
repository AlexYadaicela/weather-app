function SearchResultItem({ location, handlePressLocation }) {
  const handleClick = () => {
    handlePressLocation(location);
  };
  return (
    <li>
      <button onClick={handleClick}>
        <span>{location.name}</span>
        <span>{location.admin1}</span>
        <span>{location.country}</span>
      </button>
    </li>
  );
}

export default SearchResultItem;
