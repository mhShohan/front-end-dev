import { useState } from 'react';

type CounterProps = {
  initCount: number;
};

const useCounter = ({ initCount = 0 }: CounterProps) => {
  const [count, setCount] = useState(initCount);

  const increment = () => setCount((p) => p + 1);
  const decrement = () => setCount((p) => p - 1);

  return { count, increment, decrement };
};

export default useCounter;
