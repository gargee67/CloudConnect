import React from 'react';
import UserProfile from './userprofile';
import AccountActions from './accountactions';

export default function Sidebar() {
  // In a real app, these would come from your authentication/wallet state
  const mockUser = {
    username: "John Doe",
    accountId: "0x1234...5678",
    balance: "1,234 USDT"
  };

  return (
    <div className="w-64 bg-pink-950 text-white h-screen p-6 flex flex-col">
      <div className="flex-1 space-y-8">
        <UserProfile {...mockUser} />
        <div className="border-t border-pink-800 pt-6">
          <AccountActions />
        </div>
      </div>
    </div>
  );
}