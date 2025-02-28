const convertSecondsToHoursAndMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
};

const convertHoursAndMinutesToSeconds = (hours: number, minutes: number) => {
  return hours * 60 * 60 + minutes * 60;
};

export { convertSecondsToHoursAndMinutes, convertHoursAndMinutesToSeconds };
