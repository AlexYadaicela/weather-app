function CurrentConditions({ currentCondition }) {
  const {
    precipitation,
    wind_speed_10m,
    relative_humidity_2m,
    apparent_temperature,
    weather_code,
  } = currentCondition;
  return (
    <div>
      <p>{precipitation}</p>
      <p>{wind_speed_10m}</p>
      <p>{relative_humidity_2m}</p>
      <p>{apparent_temperature}</p>
    </div>
  );
}

export default CurrentConditions;
