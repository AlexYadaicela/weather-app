import { getShortDayName } from "../../../utils/dateConvert";
import { weatherCode } from "../../../utils/weatherCode";
import styles from "./DailyConditions.module.css";
function DailyConditionsCard({ time, tempMax, tempMin, code }) {
  const formattedDay = getShortDayName(time.slice(0, 10));
  const imgWeather = weatherCode(parseInt(code));
  return (
    <div className={styles.card}>
      <p>{formattedDay}</p>
      <img src={imgWeather} alt="weather icon" />
      <div>
        <p>
          <span>{tempMax}&deg;</span>
          <span>{tempMin}&deg;</span>
        </p>
      </div>
    </div>
  );
}

export default DailyConditionsCard;
