import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountActions() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage or any authentication tokens
    localStorage.clear();

    // Navigate to the sign-in page
    navigate('/sign_in');
  };
  const handleLogouty = () => {
    // Clear local storage or any authentication tokens

    // Navigate to the sign-in page
    navigate('/sign_in');
  };
  return (
    <div className="space-y-3">
      <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors" onClick={handleLogouty}>
        Register
      </button>
      <button className="w-full px-4 py-2 bg-[#131313] text-white rounded-lg hover:bg-gray-900 transition-colors border border-pink-500" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}