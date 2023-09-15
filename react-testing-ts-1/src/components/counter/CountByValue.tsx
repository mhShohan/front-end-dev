import { useState } from 'react';

const CountByValue = () => {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState<number>(0);

  return (
    <div>
      <h1>{count}</h1>
      <input
        type='number'
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button onClick={() => setCount(amount)}>Set</button>
    </div>
  );
};

export default CountByValue;
