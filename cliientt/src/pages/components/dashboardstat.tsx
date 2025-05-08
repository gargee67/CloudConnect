import React from 'react';

interface DashboardStatProps {
  totalCampaigns: number;
}

export default function DashboardStats({ totalCampaigns }: DashboardStatProps) {
  const campaigns = parseInt(localStorage.getItem('campaigns') || '0', 10);
  return (
    <div className="bg-[#131313] rounded-lg p-4 shadow-md border border-pink-500/10">
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Total Campaigns:</span>
        <span className="text-2xl font-bold text-pink-400">
          {campaigns ?? 0}
        </span>
      </div>
    </div>
  );
}
