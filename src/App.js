import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dasboard from './pages/Dashboard';

const App = () => {
  // Use state to manage loggedIn status
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true'
  );

  useEffect(() => {
    const checkLoggedInStatus = () => {
      // Use setLoggedIn to update the state
      setLoggedIn(localStorage.getItem('loggedIn') === 'true');
      const isLoginPage = window.location.pathname === '/login';

      if (!isLoggedIn && !isLoginPage) {
        // Redirect to login if not logged in and not on the login page
        window.location.replace('/login');
      } else if (isLoggedIn && isLoginPage) {
        // Redirect to home if logged in and on the login page
        window.location.replace('/');
      }
    };

    checkLoggedInStatus();

    const intervalId = setInterval(checkLoggedInStatus, 60000);

    return () => clearInterval(intervalId);
  }, [isLoggedIn]); // Add isLoggedIn to dependency array

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<Dasboard />}
        />
      </Routes>
    </Router>
  );
};

export default App;
