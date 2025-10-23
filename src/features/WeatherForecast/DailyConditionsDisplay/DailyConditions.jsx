import DailyConditionsCard from "./dailyConditionsCard";
import styles from "./DailyConditions.module.css";

function DailyConditions({ dailyConditions }) {
  console.log("Weather display", dailyConditions.time);
  return (
    <div>
      <p>Daily forecast</p>
      <div className={styles.wrapper}>
        {dailyConditions.time.map((item, index) => {
          return (
            <div>
              <DailyConditionsCard
                key={item}
                time={item}
                tempMax={dailyConditions.temperature_2m_max[index]}
                tempMin={dailyConditions.temperature_2m_min[index]}
                code={dailyConditions.weather_code[index]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DailyConditions;
