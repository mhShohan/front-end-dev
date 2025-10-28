import { useEffect, useState } from 'react';
import shuffle from './utils/shuffleArray';
import SchulteTable from './components/SchulteTable';
import timeFormatter from './utils/TimeFormatter';

const App = () => {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(false);
  const [nextNumber, setNextNumber] = useState(1);
  const [result, setResult] = useState(null);

  const restart = () => {
    setResult(null);
    setNextNumber(1);
    setStart(true);
  };

  useEffect(() => {
    const shuffledData = shuffle();
    setData(shuffledData);
  }, [nextNumber]);

  return (
    <main>
      <h1 className='heading'>Schulte Table</h1>
      {start && !result ? (
        <SchulteTable
          data={data}
          nextNumber={nextNumber}
          setNextNumber={setNextNumber}
          setStart={setStart}
          start={start}
          setResult={setResult}
        />
      ) : (
        <section className='center'>
          {!result && (
            <button onClick={() => setStart(true)} className='start-btn'>
              start
            </button>
          )}
        </section>
      )}
      {result && (
        <section className='result-section'>
          <h1>Completed in {timeFormatter(result)}</h1>
          <br />
          <button className='start-btn' onClick={restart}>
            Restart
          </button>
        </section>
      )}
    </main>
  );
};

export default App;
