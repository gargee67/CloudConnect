/*import React from 'react';
import Navbar from '../pages/components/navbar';
import UserProfile from '../pages/components/userprofile';
import AccountActions from '../pages/components/accountactions';
import DashboardStats from '../pages/components/dashboardstat';
import MenuGrid from '../pages/components/menugrid';
import { TrendingUp } from 'lucide-react';

const Home = () => {
  const mockUser = {
    username: "John Doe",
    accountId: "0x1234...5678",
    balance: "1,234 USDT"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-16 grid grid-cols-12 gap-6">
        
        <aside className="col-span-3 bg-[#1313131a] backdrop-blur-lg border border-pink-500/20 
                          rounded-2xl p-6 space-y-6 
                          hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] 
                          transition-all duration-300">
          <UserProfile {...mockUser} />
          <div className="border-t border-pink-500/20 pt-6">
            <AccountActions />
          </div>
        </aside>
        
       
        <main className="col-span-9 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Campaign Dashboard
              </h1>
              <TrendingUp className="text-pink-500 w-8 h-8" />
            </div>
          </div>

          <DashboardStats totalCampaigns={12} />
          
          <MenuGrid />
        </main>
      </div>
    </div>
  );
}
export default Home
*/
import React from 'react';
import Navbar from '../pages/components/navbar';
import UserProfile from '../pages/components/userprofile';
import AccountActions from '../pages/components/accountactions';
import DashboardStats from '../pages/components/dashboardstat';
import MenuGrid from '../pages/components/menugrid';
import { TrendingUp } from 'lucide-react';

const Home = () => {
  const mockUser = {
    username: "John Doe",
    accountId: "0x1234...5678",
    balance: "1,234 USDT"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute animate-pulse w-96 h-96 -top-10 -left-10 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute animate-pulse w-96 h-96 top-1/2 right-0 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute animate-pulse w-96 h-96 bottom-0 left-1/3 bg-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 pt-16 grid grid-cols-12 gap-6 relative z-10">
        <aside className="col-span-3 bg-[#1313131a] backdrop-blur-lg border border-pink-500/20 
                          rounded-2xl p-6 space-y-6 
                          hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] 
                          transition-all duration-300">
          <UserProfile {...mockUser} />
          <div className="border-t border-pink-500/20 pt-6">
            <AccountActions />
          </div>
        </aside>
        
        <main className="col-span-9 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Campaign Dashboard
              </h1>
              <TrendingUp className="text-pink-500 w-8 h-8" />
            </div>
          </div>

          <DashboardStats totalCampaigns={12} />
          
          <MenuGrid />
        </main>
      </div>
    </div>
  );
}

export default Home;