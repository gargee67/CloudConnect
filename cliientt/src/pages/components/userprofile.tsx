/*import React from 'react';
import { User, Wallet, Mail } from 'lucide-react';

interface UserProfileProps {
  username: string;
  accountId: string;
  balance: string;
}

export default function UserProfile({ username, accountId, balance }: UserProfileProps) {
  // Fetch stored values with fallback
  const walletAddress = localStorage.getItem('walletAddress') || 'N/A';
  const userEmail = localStorage.getItem('useremail') || 'N/A';

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
        <ProfileItem icon={User} label="Account ID" value={walletAddress} />
        <ProfileItem icon={Wallet} label="Balance" value="ujb" />
        <ProfileItem icon={Mail} label="Email" value={userEmail} />
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
*/
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { User, Wallet, Mail } from 'lucide-react';

interface UserProfileProps {
  username: string;
  accountId: string;
}

export default function UserProfile({ username, accountId }: UserProfileProps) {
  const [balance, setBalance] = useState<string>('Fetching...');
  const walletAddress = localStorage.getItem('walletAddress') || 'N/A';
  const userEmail = localStorage.getItem('useremail') || 'N/A';
  const usernamei = userEmail.split('@')[0];

  useEffect(() => {
    async function fetchBalance() {
      if (window.ethereum && walletAddress !== 'N/A') {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getBalance(walletAddress);
          const formattedBalance = ethers.utils.formatEther(balance); // Convert from Wei to Ether
          setBalance(`${formattedBalance} ETH`);
        } catch (error) {
          console.error('Error fetching balance:', error);
          setBalance('Error fetching balance');
        }
      } else {
        setBalance('Wallet not connected');
      }
    }

    fetchBalance();
  }, [walletAddress]);

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
          <h3 className="text-lg font-semibold text-gray-100">Welcome, {usernamei}</h3>
        </div>
      </div>
      <div className="space-y-4">
        <ProfileItem icon={User} label="Account ID" value={walletAddress} />
        <ProfileItem icon={Wallet} label="Balance" value={balance} />
        <ProfileItem icon={Mail} label="Email" value={userEmail} />
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
