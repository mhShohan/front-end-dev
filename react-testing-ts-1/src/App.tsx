import './App.css';
import Application from './components/application/Application';
import Skills from './components/skills/Skills';

const App = () => {
  const skills = ['HTML', 'CSS', 'JS'];

  return (
    <div className='App'>
      <Application />
      <Skills skills={skills} />
    </div>
  );
};

export default App;
