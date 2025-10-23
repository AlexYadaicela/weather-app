import CurrentConditions from "./CurrentConditions";
import HourlyConditions from "./HourlyConditions";
import DailyConditions from "./DailyConditionsDisplay/dailyConditions";
import { memo } from "react";

function WeatherForecast({ forecastResults, selectedLocation, isLoading }) {
  if (isLoading) {
    return <p>Loading weather data</p>;
  }

  if (!forecastResults) {
    return <p> Please search for a location to see the weather forecast.</p>;
  }
  const { current, daily, hourly } = forecastResults;
  console.log(forecastResults.current);
  return (
    <div>
      <CurrentConditions
        currentConditions={current}
        selectedLocation={selectedLocation}
      />
      <DailyConditions dailyConditions={daily} />
      {/* <HourlyConditions hourlyCondition={hourlyCondition} /> */}
    </div>
  );
}

export default memo(WeatherForecast);
