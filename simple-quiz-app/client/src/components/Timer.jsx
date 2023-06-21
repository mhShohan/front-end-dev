import React, { useEffect, useState } from 'react';

const Timer = ({ duration, onTimeout, resetTimer }) => {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
      onTimeout();
    }

    return () => clearInterval(timer);
  }, [seconds, onTimeout]);

  useEffect(() => {
    setSeconds(duration);
  }, [resetTimer, duration]);

  return <div className='timer'>{seconds} seconds remaining</div>;
};

export default Timer;
