import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true'
  );

  useEffect(() => {
    const checkLoggedInStatus = () => {
      setLoggedIn(localStorage.getItem('loggedIn') === 'true');
      const isLoginPage = window.location.pathname === '/Frontend-Assignment-3/';

      if (!isLoggedIn && !isLoginPage) {
        window.location.replace('/Frontend-Assignment-3/');
      } else if (isLoggedIn && isLoginPage) {
        window.location.replace('/Frontend-Assignment-3/Dashboard');
      }
    };

    checkLoggedInStatus();

    const intervalId = setInterval(checkLoggedInStatus, 60000);

    return () => clearInterval(intervalId);
  }, [isLoggedIn]);

  return (
    <Router basename='/Frontend-Assignment-3'>
      <Routes>
        <Route
          path="/Frontend-Assignment-3/"
          element={<Login />}
        />
        <Route
          path="/Dashboard"
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <Navigate to="/Frontend-Assignment-3/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
