import React from 'react';

export default function AccountActions() {
  return (
    <div className="space-y-3">
      <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
        Switch Account
      </button>
      <button className="w-full px-4 py-2 bg-[#131313] text-white rounded-lg hover:bg-gray-900 transition-colors border border-pink-500">
        Logout
      </button>
    </div>
  );
}