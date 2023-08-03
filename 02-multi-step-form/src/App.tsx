import React, { useState, useEffect } from 'react';
import StepOne from './components/StepOne';
import StepThree from './components/StepThree';
import StepTwo from './components/StepTwo';
import useMultiStepHooks from './hooks/useMultiStepHooks';
import Table from './components/Table';

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
    const [dataArr, setDataArr] = useState<FormDate[]>([]);
    const [data, setData] = useState(initState);
    const [update, setUpdate] = useState<Boolean>(false);

    const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const { step, steps, currentStepIndex, back, next, goTo } =
        useMultiStepHooks([
            <StepOne {...data} updateFields={updateFields} />,
            <StepTwo {...data} updateFields={updateFields} />,
            <StepThree {...data} updateFields={updateFields} />,
        ]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(data);
        setDataArr((prev) => [...prev, data]);
        setUpdate((p) => !p);

        setData(initState);
        goTo(0);
    };

    useEffect(() => {
        console.log(dataArr);
    }, [update]);

    return (
        <div>
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
                        {currentStepIndex !== steps.length - 1 && (
                            <button type='button' onClick={next}>
                                Next
                            </button>
                        )}
                        {currentStepIndex === steps.length - 1 && (
                            <button type='submit'>Submit</button>
                        )}
                    </div>
                </form>
            </div>
            <Table data={dataArr} />
        </div>
    );
}

export default App;
