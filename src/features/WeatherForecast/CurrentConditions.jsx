import styles from "./styles/CurrentConditions.module.css";
import { formatDate } from "../../utils/dateConvert.js";
import { weatherCode } from "../../utils/weatherCode.js";
function CurrentConditions({ currentCondition, selectedLocation }) {
  const {
    time,
    precipitation,
    wind_speed_10m,
    relative_humidity_2m,
    apparent_temperature,
    temperature_2m,
    weather_code,
  } = currentCondition;

  const formattedDate = formatDate(time.slice(0, 10));
  const currentWeather = weatherCode(parseInt(weather_code));

  const { name, country } = selectedLocation;

  return (
    <div className={styles.wrapper}>
      <div className={styles.primaryCard}>
        <div className={styles.cardInformation}>
          <p>
            <span>
              {name},{country}
            </span>
          </p>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.cardTemp}>
          <img src={currentWeather} alt="" />
          <span>{temperature_2m}&deg;</span>
        </div>
      </div>
      <div className={styles.secondaryCard}>
        <div>
          <p>
            Feels like
            <span>{apparent_temperature}&deg;</span>
          </p>
        </div>
        <div>
          <p>
            Humidity
            <span>{relative_humidity_2m}%</span>
          </p>
        </div>
        <div>
          <p>
            Wind
            <span>{wind_speed_10m} km/h</span>
          </p>
        </div>
        <div>
          <p>
            Precipitation
            <span>{precipitation} mm</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentConditions;
