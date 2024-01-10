import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className='w-screen font-inter'>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
