import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect, loginWithPopup } = useAuth0();

  const handleEmailLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        prompt: 'login'
      }
    });
  };

  const handleGoogleLogin = () => {
    loginWithPopup({
      authorizationParams: {
        connection: 'google-oauth2'
      }
    });
  };

  return (
    <div className="login-container">
      <img 
        src={process.env.PUBLIC_URL + '/cruise_logo.jpg'} 
        alt="Ship Logo" 
        className="login-logo"
      />
      <h2>Welcome Aboard</h2>
      <p className="login-description">Log in to book your travel with Cruise0</p>
      <div className="login-buttons">
        <button 
          className="login-button email-button"
          onClick={handleEmailLogin}
        >
          Sign Up / Login with Email
        </button>
        <button 
          className="login-button google-button"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
      </div>
      <p className="verification-note">
        New users will receive a verification email after signing up.
      </p>
    </div>
  );
};

export default Login; 