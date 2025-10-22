import styles from "./styles/CurrentConditions.module.css";

function CurrentConditions({ currentCondition }) {
  const {
    precipitation,
    wind_speed_10m,
    relative_humidity_2m,
    apparent_temperature,
    temperature_2m,
    weather_code,
  } = currentCondition;
  return (
    <div>
      <div>
        <p>{temperature_2m}</p>
      </div>
      <div className={styles.card}>
        <div>
          <p>
            Feels like
            <span>{apparent_temperature}</span>
          </p>
        </div>
        <div>
          <p>
            Humidity
            <span>{relative_humidity_2m}</span>
          </p>
        </div>
        <div>
          <p>
            Wind
            <span>{wind_speed_10m}</span>
          </p>
        </div>
        <div>
          <p>
            Precipitation
            <span>{precipitation}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentConditions;
