import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const EmailVerificationRequired = () => {
  const { user, getAccessTokenSilently, logout } = useAuth0();
  const [verificationSent, setVerificationSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleResendVerification = async () => {
    try {
      setError(null);
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/jobs/verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user?.sub
        })
      });
      
      if (response.ok) {
        setVerificationSent(true);
      } else {
        setError('Failed to send verification email. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="verification-required-container">
      <img 
        src={process.env.PUBLIC_URL + '/cruise_logo.jpg'} 
        alt="Cruise Logo" 
        className="verification-logo"
      />
      <h2>Email Verification Required</h2>
      <div className="verification-message-box">
        <p>Please verify your email address to access all features.</p>
        <p>We've sent a verification email to <strong>{user?.email}</strong>.</p>
        <p>Click the link in the email to verify your account.</p>
        
        {error && <p className="error-message">{error}</p>}
        
        {/* <button 
          className="resend-button"
          onClick={handleResendVerification}
          disabled={verificationSent}
        >
          {verificationSent ? 'Verification Email Sent' : 'Resend Verification Email'}
        </button> */}
        
        <p className="verification-instructions">
          After verifying your email, please refresh this page.
        </p>
        
        <button 
          className="logout-button"
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationRequired; 