import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import AIButton from './components/AI/AIButton';
import AIDialog from './components/AI/AIDialog';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('Checking authentication status...');
        const response = await fetch('https://crm-server-qfv6.onrender.com/api/auth/status', {
          credentials: 'include'
        });
        console.log('Response from auth status:', response);
        const data = await response.json();
        console.log('Authentication data:', data);
        setIsAuthenticated(data.isAuthenticated);
        setLoading(false);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      console.log('Initiating logout...');
      const response = await fetch('https://crm-server-qfv6.onrender.com/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials if using sessions/cookies
      });
      console.log('Response from logout:', response);
      if (response.ok) {
        console.log('Logout successful');
        setIsAuthenticated(false); // Update React state after successful logout
      } else {
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  console.log('Rendering main app...');

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/home/*"
            element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        </Routes>
        
        {/* AI Button in the bottom-left corner */}
        <AIButton onClick={() => setShowAI(true)} />

        {/* AI Dialog that appears once the button is clicked */}
        <AIDialog open={showAI} onClose={() => setShowAI(false)} />
      </div>
    </Router>
  );
};

export default App;
