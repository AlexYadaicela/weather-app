import styles from "./styles/HourlyConditions.module.css";
function HourlyConditionsCard({ time, timeOfDay, weatherRep, temp }) {
  return (
    <div className={styles.hourlyCard}>
      <p>
        <img src={weatherRep} alt="weather icon" />
        <span>
          {time} {timeOfDay}
        </span>
      </p>
      <p>
        <span>{temp}&deg;</span>
      </p>
    </div>
  );
}

export default HourlyConditionsCard;
