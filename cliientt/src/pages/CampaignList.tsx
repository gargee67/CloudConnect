import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CampaignCard } from './donation/Campaignmain';
import { DonationModal } from './donation/DonationModal';
import { campaigns } from './donation/data/campaigns';
import { Campaign } from './donation/types/index';

export const CampaignList = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [updatedCampaigns, setUpdatedCampaigns] = useState(campaigns); // Local state for updated campaigns

  // Retrieve wallet address from localStorage
  const walletAddress = localStorage.getItem('walletAddress');

  // Filter campaigns based on category and exclude those matching the wallet address
  const filteredCampaigns = updatedCampaigns.filter((c) => {
    const matchesCategory = !category || c.category === category;
    const doesNotMatchWallet = c.id !== walletAddress; // Exclude campaigns with id equal to walletAddress
    return matchesCategory && doesNotMatchWallet;
  });

  const handleDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCompleteDonation = (amount: number) => {
    if (selectedCampaign) {
      // Update the raisedAmount for the selected campaign
      const updatedCampaign = { ...selectedCampaign, raisedAmount: selectedCampaign.raisedAmount + amount };

      // Update the campaign list with the updated raised amount
      const updatedCampaignsList = updatedCampaigns.map((campaign) =>
        campaign.id === selectedCampaign.id ? updatedCampaign : campaign
      );

      setUpdatedCampaigns(updatedCampaignsList); // Update the state of campaigns with the new raised amount

      alert(`Thank you for donating $${amount} to ${selectedCampaign.title}`);
      setSelectedCampaign(null); // Close the modal after donation
    }
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
          //onDonate={handleCompleteDonation} // Pass the updated onDonate logic here
          />
        )}
      </div>
    </div>
  );
};
