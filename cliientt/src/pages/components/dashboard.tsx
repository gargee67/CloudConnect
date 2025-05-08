import React from 'react';
import CampaignStats from './campaignstat';
import MenuGrid from './menugrid';

export default function Dashboard() {
  const campaigns = parseInt(localStorage.getItem('campaigns') || '0', 10);
  return (
    <div className="flex-1 bg-gray-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Campaign Dashboard</h1>
          <CampaignStats totalCampaigns={campaigns} />
        </div>

        <MenuGrid />
      </div>
    </div>
  );
}