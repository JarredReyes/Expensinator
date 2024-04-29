import React from 'react';
import './css/Profile.css';

const Profile = ({ expanded }) => {
  return (
    <div className={`profile-content ${expanded ? 'expanded' : 'collapsed'}`}>
      <h2>Welcome to Profile Page</h2>
      <p>This is the content of the Profile page.</p>
    </div>
  );
};

export default Profile;
