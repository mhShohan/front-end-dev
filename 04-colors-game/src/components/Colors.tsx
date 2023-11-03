import { useState } from 'react';
import Timer from './Timer';

const colors = ['green', 'red', 'yellow', 'blue', 'black', 'orange', 'purple', 'grey', 'violet'];

const Colors = ({
  start,
  setStart,
  setAnswerCount,
  setCorrectAnswer,
}: {
  start: boolean;
  setStart: (value: boolean) => void;
  setAnswerCount: () => void;
  setCorrectAnswer: () => void;
}) => {
  const [gridColors, setGridColors] = useState(colors);
  const [answer, setAnswer] = useState(gridColors[Math.floor(Math.random() * colors.length)]);

  const handleTimeout = () => {
    // finish game
    setStart(false);
  };

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleColorOnClick = (color: string) => {
    const shuffledGridColors = shuffle(gridColors);
    setGridColors(shuffledGridColors);
    setAnswer(shuffledGridColors[Math.floor(Math.random() * colors.length)]);
    setAnswerCount();
    if (color === answer) {
      setCorrectAnswer();
    }
  };

  return (
    <section>
      <Timer duration={60} resetTimer={start} onTimeout={handleTimeout} />
      <h1 className='color-name' style={{ color: answer }}>
        {gridColors[Math.floor(Math.random() * colors.length)]}
      </h1>
      <div className='colors'>
        {gridColors.map((clr, i) => (
          <button
            key={i}
            className='color'
            style={{ backgroundColor: clr }}
            onClick={() => handleColorOnClick(clr)}
          ></button>
        ))}
      </div>
      <p>
        <strong>Hints:</strong> Choose the color box regarding the text color!
      </p>
    </section>
  );
};

export default Colors;
