// format time to HH:MM with AM or PM
const formatTime = (time) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return {
    time: `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes}`,
    period: hours >= 12 ? 'PM' : 'AM',
  };
};

export default formatTime;