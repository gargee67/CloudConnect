import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountActions() {
  const navigate = useNavigate();


  const handleLogouty = () => {
    // Clear local storage or any authentication tokens
    localStorage.clear();
    // Navigate to the sign-in page
    navigate('/sign_in');
  };
  return (
    <div className="space-y-3">
      <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors" onClick={handleLogouty}>
        LogOut
      </button>

    </div>
  );
}