import { useState } from 'react';
import Quiz from './components/Quiz';
import QuestionContextProvider from './context';

const App = () => {
  const [step, setStep] = useState(0);

  return (
    <div className='center'>
      <QuestionContextProvider>
        <Quiz />
      </QuestionContextProvider>
    </div>
  );
};

export default App;
