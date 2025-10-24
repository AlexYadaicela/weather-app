import { useState } from "react";
import {
  hourlyData,
  getDaysData,
  getFullDayName,
} from "../../utils/dateConvert";
import { weatherCode } from "../../utils/weatherCode";
import HourlyConditionsCard from "./HourlyConditionsCard";
import styles from "./styles/HourlyConditions.module.css";

function HourlyConditions({ hourlyConditions }) {
  const [showOptions, setShowOptions] = useState(false);
  const { time, temperature_2m, weather_code } = hourlyConditions;
  const results = hourlyData(time, temperature_2m, weather_code);
  const days = getDaysData(results);
  const [selectedDay, setSelectedDay] = useState(days[0]);

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.dropDownDisplayWrapper}>
          <p>Hourly forecast</p>
          <div className={styles.relativePos}>
            <div>
              <button
                className={styles.btnDropDown}
                onClick={() => {
                  if (showOptions === true) {
                    setShowOptions(false);
                  } else if (showOptions === false) {
                    setShowOptions(true);
                  }
                }}
              >
                {getFullDayName(selectedDay)}
                <img src="iconDropdown.svg" alt="dropdown icon" />
              </button>
            </div>
          </div>
          {showOptions && (
            <div className={styles.daysDropDown}>
              <ul>
                {days.map((day) => {
                  return (
                    <li key={day}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDay(day);
                          setShowOptions(false);
                        }}
                      >
                        {getFullDayName(day)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.hourlyWrapper}>
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
