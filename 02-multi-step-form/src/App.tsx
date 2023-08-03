import React, { useState } from 'react';
import StepOne from './components/StepOne';
import StepThree from './components/StepThree';
import StepTwo from './components/StepTwo';
import useMultiStepHooks from './hooks/useMultiStepHooks';

type FormDate = {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    university: string;
    department: string;
    hometown: string;
    states: string;
    country: string;
};

const initState: FormDate = {
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    university: '',
    department: '',
    hometown: '',
    states: '',
    country: '',
};

function App() {
    const [data, setData] = useState(initState);

    const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const { step, steps, currentStepIndex, back, next } = useMultiStepHooks([
        <StepOne {...data} updateFields={updateFields} />,
        <StepTwo {...data} updateFields={updateFields} />,
        <StepThree {...data} updateFields={updateFields} />,
    ]);

    const handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h6>
                    Step {currentStepIndex + 1} of {steps.length}
                </h6>
                <div>{step}</div>
                <div className='btn-group'>
                    {currentStepIndex !== 0 && (
                        <button type='button' onClick={back}>
                            Back
                        </button>
                    )}
                    {currentStepIndex !== steps.length - 1 ? (
                        <button type='button' onClick={next}>
                            Next
                        </button>
                    ) : (
                        <button type='submit'>Submit</button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default App;
