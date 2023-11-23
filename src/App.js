import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
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
  // const url = "https://darshananandu.github.io/Frontend-Assignment-3";

  useEffect(() => {
    const checkLoggedInStatus = () => {
      setLoggedIn(localStorage.getItem('loggedIn') === 'true');
      const isLoginPage = window.location.pathname === '/';

      if (!isLoggedIn && !isLoginPage) {
        <Navigate to="/" />
      } else if (isLoggedIn && isLoginPage) {
        <Navigate to="/Dashboard" />
      }
    };

    checkLoggedInStatus();

    const intervalId = setInterval(checkLoggedInStatus, 60000);

    return () => clearInterval(intervalId);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/Dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
