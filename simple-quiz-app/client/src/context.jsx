import { createContext, useEffect, useReducer, useState } from 'react';

/// context creator
export const QuestionContext = createContext();

// Initial state
const initState = {
  questions: [],
  isLoading: true,
  error: null,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, isLoading: true };
    case 'SUCCESS':
      return { ...state, questions: action.payload, isLoading: false };
    case 'FAILED':
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

// Provider
const QuestionContextProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [state, dispatch] = useReducer(reducer, initState);

  const request = () => ({ type: 'REQUEST' });
  const success = (questions) => ({ type: 'SUCCESS', payload: questions });
  const failed = (error) => ({ type: 'FAILED', payload: error });

  useEffect(() => {
    dispatch(request());
    (async () => {
      try {
        const res = await fetch('https://quiz-demo-gamma.vercel.app/all');
        const data = await res.json();
        dispatch(success(data.quiz));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [update]);

  return (
    <QuestionContext.Provider value={{ state, dispatch, setUpdate }}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
