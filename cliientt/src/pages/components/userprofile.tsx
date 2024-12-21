import React from 'react';
import { User, Wallet, Mail } from 'lucide-react';

interface UserProfileProps {
  username: string;
  accountId: string;
  balance: string;
}

export default function UserProfile({ username, accountId, balance }: UserProfileProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100">Welcome, {username}</h3>
        </div>
      </div>
      <div className="space-y-4">
        <ProfileItem icon={User} label="Account ID" value={accountId} />
        <ProfileItem icon={Wallet} label="Balance" value={balance} />
        <ProfileItem icon={Mail} label="Email" value="user@example.com" />
      </div>
    </div>
  );
}

interface ProfileItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function ProfileItem({ icon: Icon, label, value }: ProfileItemProps) {
  return (
    <div className="flex items-center space-x-3">
      <Icon size={20} className="text-pink-300" />
      <div>
        <p className="text-sm text-pink-200">{label}</p>
        <p className="text-gray-100 text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}