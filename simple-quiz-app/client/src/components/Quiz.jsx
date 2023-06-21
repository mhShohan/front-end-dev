import React, { useContext, useState } from 'react';
import Question from './Question';
import Timer from './Timer';
import { QuestionContext } from '../context';

const Quiz = () => {
  const {
    state: { questions, isLoading },
  } = useContext(QuestionContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [resetTimer, setResetTimer] = useState(true);

  console.log(questions);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setResetTimer((prev) => !prev);
    setSelectedOption(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleTimeout = () => {
    handleNextQuestion();
  };

  return (
    <>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <div className='quiz'>
          {currentQuestionIndex < questions.length ? (
            <div>
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onOptionSelect={handleOptionSelect}
              />

              <Timer
                duration={60}
                onTimeout={handleTimeout}
                resetTimer={resetTimer}
              />
              <button
                className={selectedOption === null ? 'btn disable_btn' : 'btn'}
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
              >
                Next Question
              </button>
            </div>
          ) : (
            <div>
              <h2>Quiz Completed!</h2>
              <p>Your score: {(score / questions.length) * 100}%</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
