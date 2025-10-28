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
    <section className='max-w-lg m-auto'>
      <h1 className='text-4xl text-center border-b-2 pb-2'>Color Game</h1>
      {start ? (
        <Colors
          start={start}
          setStart={setStart}
          setAnswerCount={addAnswerCount}
          setCorrectAnswer={addCorrectCount}
        />
      ) : (
        <section className='flex items-center flex-col justify-evenly h-72'>
          <button
            className='bg-cyan-600 border-2 cursor-pointer text-2xl border-cyan-900 py-1 px-16 rounded-full text-white font-semibold'
            onClick={handleStart}
          >
            Start
          </button>
          <p>
            <strong>Hints:</strong> Choose the color box regarding the text color!
          </p>
        </section>
      )}
      {correctAnswer !== 0 && answerCount !== 0 && !start && (
        <section className='text-center'>
          <h1 className='text-3xl'>Previous Result</h1>
          <h1 className='text-3xl'>
            Correct Answer: {((correctAnswer / answerCount) * 100).toFixed(2)}%
          </h1>
          <p className='text-xl'>
            Total Answer: {answerCount} || Correct: {correctAnswer}
          </p>
        </section>
      )}
    </section>
  );
};

export default App;
