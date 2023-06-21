import { useState } from 'react';
import { Step, Stepper } from 'react-form-stepper';
import Quiz from './components/Quiz';
import QuestionContextProvider from './context';

const App = () => {
  const [step, setStep] = useState(0);

  return (
    <div className='center'>
      {/* <Stepper activeStep={step}>
        <Step label='Children Step 1' />
        <Step label='Children Step 2' />
        <Step label='Children Step 3' />
        <Step label='Children Step 4' />
        <Step label='Children Step 5' />
      </Stepper>
      <button onClick={() => setStep((p) => p - 1)}>prev step</button>
      <button onClick={() => setStep((p) => p + 1)}>next step</button> */}
      <QuestionContextProvider>
        <Quiz />
      </QuestionContextProvider>
    </div>
  );
};

export default App;
