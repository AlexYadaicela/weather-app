export const formatDate = (date) => {
  const event = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return event.toLocaleDateString(undefined, options);
};

export const getShortDayName = (date) => {
  if (!date) {
    return "missing date";
  }
  const event = formatDate(date);
  return event.slice(0, 3);
};

export const getFullDayName = (date) => {
  if (!date) {
    return "missing date";
  }
  const event = formatDate(date);
  const arrDate = event.split(",");
  return arrDate[0];
};

export const getTimeOfDate = (date) => {
  if (!date) {
    return "missing date";
  }
  const event = new Date(date);
  return event.toLocaleTimeString("en-US");
};

export const hourlyData = (time, temperature_2m, weather_code) => {
  const hourlyByDay = {};
  time.forEach((fullTime, index) => {
    const date = fullTime.substring(0, 10);
    const hourData = {
      time: getTimeOfDate(fullTime),
      temp: temperature_2m[index],
      code: weather_code[index],
    };
    if (!hourlyByDay[date]) {
      hourlyByDay[date] = [];
    }

    hourlyByDay[date].push(hourData);
  });

  return hourlyByDay;
};

export const getDaysData = (date) => {
  if (!date) {
    return "no data found";
  }
  let days = [];
  for (const key in date) {
    days.push(key);
  }
  return days;
};
