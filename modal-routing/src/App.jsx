import { Route, Routes, useLocation } from 'react-router-dom';
import Modal from './components/Modal';
import Homepage from './pages/Homepage';

function App() {
  const location = useLocation();
  const curLocation = location.state?.prevLocation;

  return (
    <div>
      <Routes location={curLocation}>
        <Route path='/' element={<Homepage />} />
      </Routes>

      <Routes>
        <Route path='/posts/:id' element={<Modal />} />
      </Routes>
    </div>
  );
}

export default App;
