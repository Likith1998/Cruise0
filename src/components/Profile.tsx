import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';

const Profile = ({ emailVerified }: { emailVerified: boolean }) => {
  const { user, logout, isAuthenticated } = useAuth0();

  // console.log(user);
  
  // If not authenticated, show a message
  if (!isAuthenticated) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <img 
            src={process.env.PUBLIC_URL + '/cruise_logo.jpg'} 
            alt="Cruise Logo" 
            className="login-logo"
          />
          <h2>Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={process.env.PUBLIC_URL + '/cruise_logo.jpg'} 
          alt="Cruise Logo" 
          className="login-logo"
        />
        <h2>Welcome, {user?.name}!</h2>
      </div>
      <div className="profile-content">
        {/* <img 
          src={user?.picture} 
          alt={user?.name} 
          className="profile-picture"
        /> */}
        <div className="profile-details">
          <p><strong>Email:</strong> {user?.email}</p>
          <p>
            <strong>Email Verified:</strong> 
            {emailVerified ? (
              <span className="verified-badge">✓ Yes</span>
            ) : (
              <span className="unverified-badge">
                ⚠ No - <a href="https://auth0.com/docs/email/verification" target="_blank" rel="noopener noreferrer" className="verify-link">Verify Email</a>
              </span>
            )}
          </p>
          <p><strong>Country:</strong> {user?.country || 'Not specified'}</p>
          <p><strong>Last Login:</strong> {new Date(user?.updated_at || '').toLocaleString()}</p>
          
          <div className="logout-container">
            <button 
              className="logout-button"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;