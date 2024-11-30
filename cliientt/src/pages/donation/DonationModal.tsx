import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Campaign } from '../../pages/donation/types/';

type DonationModalProps = {
  campaign: Campaign;
  onClose: () => void;
  onDonate: (amount: number) => void;
};

export const DonationModal: React.FC<DonationModalProps> = ({
  campaign,
  onClose,
  onDonate,
}) => {
  const [amount, setAmount] = useState('');
  const presetAmounts = [10, 25, 50, 100];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = parseFloat(amount);
    if (donationAmount > 0) {
      onDonate(donationAmount);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-pink-200 hover:text-pink-100"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-semibold mb-4 text-white">Donate to {campaign.title}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-pink-200 mb-2">Select Amount</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className={`py-2 rounded-lg transition-colors duration-200 ${
                    amount === preset.toString()
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-700 text-pink-200 hover:bg-gray-600'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-200">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-8 pr-4 py-2 border rounded-lg bg-gray-700 border-pink-500 text-white placeholder-pink-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Complete Donation
          </button>
        </form>
      </div>
    </div>
  );
};