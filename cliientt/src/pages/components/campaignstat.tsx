import React from 'react';

interface CampaignStatsProps {
  totalCampaigns: number;
}

export default function CampaignStats({ totalCampaigns }: CampaignStatsProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Total Campaigns:</span>
        <span className="text-2xl font-bold text-pink-600">{totalCampaigns}</span>
      </div>
    </div>
  );
}