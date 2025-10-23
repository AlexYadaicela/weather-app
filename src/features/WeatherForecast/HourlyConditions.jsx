import { useState } from "react";
import { hourlyData, getDaysData } from "../../utils/dateConvert";
import { weatherCode } from "../../utils/weatherCode";
import HourlyConditionsCard from "./HourlyConditionsCard";
import styles from "./styles/HourlyConditions.module.css";

function HourlyConditions({ hourlyConditions }) {
  const { time, temperature_2m, weather_code } = hourlyConditions;
  const results = hourlyData(time, temperature_2m, weather_code);
  const days = getDaysData(results);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  console.log(results);
  console.log(days);
  return (
    <div>
      <div>
        <p>Hourly forecast</p>
        <div>
          <button>{selectedDay}</button>
        </div>
        <ul>
          {days.map((day) => {
            return (
              <li key={day}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDay(day);
                  }}
                >
                  {day}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.wrapper}>
        {results[selectedDay].map((item) => {
          const time = item.time.slice(0, item.time.indexOf(":"));
          const timeOfDay = item.time.slice(
            item.time.indexOf(" "),
            item.time.length
          );
          const weatherRep = weatherCode(parseInt(item.code));

          return (
            <HourlyConditionsCard
              key={item.time}
              time={time}
              timeOfDay={timeOfDay}
              weatherRep={weatherRep}
              temp={item.temp}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HourlyConditions;
