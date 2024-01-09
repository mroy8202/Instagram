import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App
