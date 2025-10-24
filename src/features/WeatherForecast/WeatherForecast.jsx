import CurrentConditions from "./CurrentConditions";
import HourlyConditions from "./HourlyConditions";
import DailyConditions from "./DailyConditionsDisplay/dailyConditions";
import { memo } from "react";
import styles from "./styles/WeatherForecast.module.css";

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
    <div className={styles.wrapper}>
      <div className={styles.itemOne}>
        <CurrentConditions
          currentConditions={current}
          selectedLocation={selectedLocation}
        />
      </div>
      <div className={styles.itemTwo}>
        <DailyConditions dailyConditions={daily} />
      </div>
      <div className={styles.itemThree}>
        <HourlyConditions hourlyConditions={hourly} />
      </div>
    </div>
  );
}

export default memo(WeatherForecast);
