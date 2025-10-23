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
  const event = formatDate(date);
  return event.slice(0, 3);
};

export const getFullDayName = (date) => {
  const event = formatDate(date);
  const arrDate = event.split(",");
  return arrDate[0];
};
