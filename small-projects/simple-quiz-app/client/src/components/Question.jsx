import React, { useEffect, useState } from 'react';

const Question = ({ question, options, onOptionSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option, index) => {
    setSelected(index);
    onOptionSelect(option);
  };

  useEffect(() => {
    setSelected(null);
  }, [question]);

  return (
    <div>
      <h2>{question}</h2>
      <br />
      <ul>
        {options.map((option, index) => (
          <li
            key={option}
            onClick={() => handleSelect(option, index)}
            className={index === selected ? 'answer selected' : 'answer'}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
