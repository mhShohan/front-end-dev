import { ReactElement, useState } from 'react';

const useMultiStepHooks = (steps: ReactElement[]) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const next = () => {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    };

    const back = () => {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    };

    const goTo = (index: number) => {
        setCurrentStepIndex(index);
    };

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        goTo,
        next,
        back,
        steps,
    };
};

export default useMultiStepHooks;
