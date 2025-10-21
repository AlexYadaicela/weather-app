function WeatherDisplayCard({ time, tempMax, tempMin, weatherCode }) {
  return (
    <div>
      <p>{time}</p>
      <p>{tempMax}</p>
      <p>{tempMin}</p>
      <p>{weatherCode}</p>
    </div>
  );
}

export default WeatherDisplayCard;
