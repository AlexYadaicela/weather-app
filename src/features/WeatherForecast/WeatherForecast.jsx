import CurrentConditions from "./CurrentConditions";
import HourlyConditions from "./HourlyConditions";
import WeatherDisplay from "./WeatherDisplay/WeatherDisplay";

function WeatherForecast({
  currentCondition,
  hourlyCondition,
  dailyCondition,
  selectedLocation,
  isLoading,
}) {
  return (
    <div>
      {isLoading || !currentCondition ? (
        <p>is Loading</p>
      ) : (
        <div>
          <CurrentConditions
            currentCondition={currentCondition}
            selectedLocation={selectedLocation}
          />
          {/* <WeatherDisplay dailyCondition={dailyCondition} /> */}
          {/* <HourlyConditions hourlyCondition={hourlyCondition} /> */}
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;
