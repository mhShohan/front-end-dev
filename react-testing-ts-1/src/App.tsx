import './App.css';
import Application from './components/application/Application';
import Counter from './components/counter/Counter';
import Skills from './components/skills/Skills';

const App = () => {
  const skills = ['HTML', 'CSS', 'JS'];

  return (
    <div className='App'>
      {/* <Application />
      <Skills skills={skills} /> */}
      <Counter />
    </div>
  );
};

export default App;
