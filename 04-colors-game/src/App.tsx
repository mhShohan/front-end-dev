import { useState } from 'react';
import Colors from './components/Colors';

const App = () => {
  const [start, setStart] = useState<boolean>(false);

  const [answerCount, setAnswerCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const addAnswerCount = () => {
    setAnswerCount((p) => p + 1);
  };
  const addCorrectCount = () => {
    setCorrectAnswer((p) => p + 1);
  };

  const handleStart = () => {
    setStart(true);
    setAnswerCount(0);
    setCorrectAnswer(0);
  };

  return (
    <main className='container'>
      <h1 className='heading'>Colors</h1>
      {start ? (
        <Colors
          start={start}
          setStart={setStart}
          setAnswerCount={addAnswerCount}
          setCorrectAnswer={addCorrectCount}
        />
      ) : (
        <section className='start-section'>
          <button className='btn' onClick={handleStart}>
            Start
          </button>
          <p>
            <strong>Hints:</strong> Choose the color box regarding the text color, not the word
            written!
          </p>
        </section>
      )}
      {correctAnswer !== 0 && answerCount !== 0 && !start && (
        <section className='result'>
          <h1>Previous Result</h1>
          <h1>Correct Answer: {((correctAnswer / answerCount) * 100).toFixed(2)}%</h1>
          <p>
            Total Answer: {answerCount} || Correct: {correctAnswer}
          </p>
        </section>
      )}
    </main>
  );
};

export default App;
