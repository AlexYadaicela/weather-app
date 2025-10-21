import CurrentConditions from "./CurrentConditions";
import HourlyConditions from "./HourlyConditions";
import WeatherDisplay from "./WeatherDisplay/WeatherDisplay";

function WeatherForecast({
  currentCondition,
  hourlyCondition,
  dailyCondition,
  isLoading,
}) {
  return (
    <div>
      {isLoading ? (
        <p>is Loading</p>
      ) : (
        <div>
          {/* <CurrentConditions currentCondition={currentCondition} /> */}
          <WeatherDisplay dailyCondition={dailyCondition} />
          {/* <HourlyConditions hourlyCondition={hourlyCondition} /> */}
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;
