import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CampaignCard } from './donation/Campaignmain';
import { DonationModal } from './donation/DonationModal';
import { campaigns } from './donation/data/campaigns';
import { Campaign } from './donation/types/index';

export const CampaignList = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
console.log(campaigns, "uhuho");
  const filteredCampaigns = category
    ? campaigns.filter((c) => c.category === category)
    : campaigns;

  const handleDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCompleteDonation = (amount: number) => {
    alert(`Thank you for donating $${amount} to ${selectedCampaign?.title}`);
    setSelectedCampaign(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          {category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Campaigns`
            : 'All Campaigns'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onDonate={handleDonate}
            />
          ))}
        </div>

        {selectedCampaign && (
          <DonationModal
            campaign={selectedCampaign}
            onClose={() => setSelectedCampaign(null)}
            onDonate={handleCompleteDonation}
          />
        )}
      </div>
    </div>
  );
};