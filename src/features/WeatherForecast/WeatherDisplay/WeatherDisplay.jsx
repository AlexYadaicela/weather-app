import WeatherDisplayCard from "./WeatherDisplayCard";

function WeatherDisplay({ dailyCondition }) {
  console.log("Weather display", dailyCondition.time);
  return (
    <div>
      <p>Daily forecast</p>
      {dailyCondition.time.map((item, index) => {
        return (
          <WeatherDisplayCard
            key={item}
            time={item}
            tempMax={dailyCondition.temperature_2m_max[index]}
            tempMin={dailyCondition.temperature_2m_min[index]}
            weatherCode={dailyCondition.weather_code[index]}
          />
        );
      })}
    </div>
  );
}

export default WeatherDisplay;
