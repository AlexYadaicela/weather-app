function SearchResultItem({ location }) {
  return (
    <li>
      <span>{location.name}</span>
      <span>{location.admin1}</span>
      <span>{location.country}</span>
    </li>
  );
}

export default SearchResultItem;
