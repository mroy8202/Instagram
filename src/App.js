import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import OpenRoute from './components/OpenRoute';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import Myprofile from './pages/Myprofile';


function App() {

  const { user } = useSelector( (state) => state.profile );

  return (
    <div className='w-screen font-inter'>
      {/* Navigation bar */}
      {user && (
        <Navbar />
      )}
      
      <Routes>
        {/* signup route */}
        <Route path='/'
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        {/* login route */}
        <Route path='/login'  
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />

        {/* homepage */}
        <Route path='/user/homepage'
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />

        {/* My profile */}
        <Route path='/user/profile' 
          element={
            <PrivateRoute>
              <Myprofile />
            </PrivateRoute>
          }
        />
        

      </Routes>
    </div>
  );
}

export default App;
