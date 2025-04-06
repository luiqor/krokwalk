const convertSecondsToHoursAndMinutes = (seconds: number) => {
  const hours = Math.floor(seconds / 3600); 
  const remainingSeconds = seconds % 3600; 
  const minutes = Math.floor(remainingSeconds / 60);
  return { hours, minutes };
};

const convertHoursAndMinutesToSeconds = (hours: number, minutes: number) => {
  return hours * 60 * 60 + minutes * 60;
};

export { convertSecondsToHoursAndMinutes, convertHoursAndMinutesToSeconds };
