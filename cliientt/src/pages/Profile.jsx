import React from 'react';
import { account } from '../appwrite'; // Make sure the Appwrite client is imported
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Delete the current session to log out the user
      await account.deleteSession('current');
      console.log('User logged out successfully.');
      // Redirect to the login page after logging out
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome to your profile!</p>
      
      {/* Logout Button */}
      <button onClick={handleLogout} style={{ padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
