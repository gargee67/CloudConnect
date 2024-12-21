import React from 'react';
import Navbar from '../pages/components/navbar';
import UserProfile from '../pages/components/userprofile';
import AccountActions from '../pages/components/accountactions';
import DashboardStats from '../pages/components/dashboardstat';
import MenuGrid from '../pages/components/menugrid';

const Home = () => {
  const mockUser = {
    username: "John Doe",
    accountId: "0x1234...5678",
    balance: "1,234 USDT"
  };
  return (
    <div className="min-h-screen bg-[#1313131a]">
      <Navbar />

      <div className="flex pt-16">
        <aside className="w-64 bg-[#131313] text-gray-100 h-[calc(100vh-4rem)] p-6 flex flex-col">
          <div className="flex-1 space-y-8">
            <UserProfile {...mockUser} />
            <div className="border-t border-pink-500/20 pt-6">
              <AccountActions />
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-100 mb-4">Campaign Dashboard</h1>
              <DashboardStats totalCampaigns={12} />
            </div>
            <MenuGrid />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home
