import { useState } from 'react';

interface ISkills {
  skills: string[];
}

const Skills = ({ skills }: ISkills) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <ul>
        {skills?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <div>
        {isLoggedIn ? (
          <button>Start Learning</button>
        ) : (
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Skills;
