const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formatDate = (time) => {
  const currentTime = new Date(time);

  const day = days[currentTime.getDay()];
  const date = currentTime.getDate();
  const month = months[currentTime.getMonth()];
  const year = currentTime.getFullYear();

  return {
    day,
    date: `${date < 10 ? `0${date}` : date}, ${month} ${year}`,
  };
};

export default formatDate;