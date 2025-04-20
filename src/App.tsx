import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './components/Login';
import Profile from './components/Profile';
import EmailVerificationRequired from './components/EmailVerificationRequired';
import './App.css';

function App() {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);

  // Set initial email verification from user object (if available)
  useEffect(() => {
    // console.log(user)
    if (user && user.email_verified !== undefined) {
      setEmailVerified(user.email_verified);
    }
  }, [user]);

  // Poll user info from Auth0 to check for verification updates
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const checkEmailVerification = async () => {
      try {
        const token = await getAccessTokenSilently();
        const userInfoResponse = await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });

        const userInfo = await userInfoResponse.json();
        setEmailVerified(userInfo.email_verified);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    checkEmailVerification();
    const interval = setInterval(checkEmailVerification, 30000); // check every 30s
    return () => clearInterval(interval);
  }, [isAuthenticated, user, getAccessTokenSilently]);

  // Show loading spinner only while Auth0 or user info is loading
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


  if (!emailVerified) {
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
        <Profile emailVerified={emailVerified}/>
      </header>
    </div>
  );
}

export default App;