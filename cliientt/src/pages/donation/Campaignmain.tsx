import React from 'react';
import { Calendar, Target } from 'lucide-react';
import { Campaign } from '../donation/types';

type CampaignCardProps = {
  campaign: Campaign;
  onDonate: (campaign: Campaign) => void;
};

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDonate }) => {
  const progress = (campaign.raisedAmount / campaign.targetAmount) * 100;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
      <img
        src={campaign.imageUrl}
        alt={campaign.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium">
            {campaign.category}
          </span>
          <div className="flex items-center text-pink-200 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Due {new Date(campaign.deadline).toLocaleDateString()}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{campaign.title}</h3>
        <p className="text-pink-200 mb-4">{campaign.description}</p>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-pink-200">Progress</span>
            <span className="text-sm font-medium text-pink-400">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-pink-500 rounded-full h-2 transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-pink-200">
            <Target className="w-4 h-4 mr-1" />
            <span>Target: ${campaign.targetAmount.toLocaleString()}</span>
          </div>
          <a
            href={campaign.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 text-sm"
          >
            View Documents
          </a>
        </div>

        <button
          onClick={() => onDonate(campaign)}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};