import SearchForm from "../features/search/SearchForm";
import SearchResultList from "../features/search/SearchResultList";

import WeatherForecast from "../features/WeatherForecast/WeatherForecast";

function WeatherPage({
  setQueryLocationString,
  queryString,
  geocodingResults,
  setQueryForecast,
  setSelectedLocation,
  forecastResults,
  selectedLocation,
  isLoading,
  hasLoad,
}) {
  return (
    <div>
      <h1>How's the sky looking today?</h1>
      <div className="searchBar">
        <SearchForm
          setQueryLocationString={setQueryLocationString}
          queryString={queryString}
        />

        <SearchResultList
          geocodingResults={geocodingResults}
          enableDropDown={hasLoad}
          setQueryForecast={setQueryForecast}
          queryString={setQueryLocationString}
          setSelectedLocation={setSelectedLocation}
        />
      </div>

      <WeatherForecast
        forecastResults={forecastResults}
        selectedLocation={selectedLocation}
        isLoading={isLoading}
      />
    </div>
  );
}

export default WeatherPage;
