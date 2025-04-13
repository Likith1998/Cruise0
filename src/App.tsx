import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './components/Login';
import Profile from './components/Profile';
import EmailVerificationRequired from './components/EmailVerificationRequired';
import './App.css';

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <div className="App">
        <header className="App-header">
          <Login />
        </header>
      </div>
    );
  }

  // If authenticated but email not verified, show verification required page
  if (!user?.email_verified) {
    return (
      <div className="App">
        <header className="App-header">
          <EmailVerificationRequired />
        </header>
      </div>
    );
  }

  // If authenticated and email verified, show profile
  return (
    <div className="App">
      <header className="App-header">
        <Profile />
      </header>
    </div>
  );
}

export default App;
