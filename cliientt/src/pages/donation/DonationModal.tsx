
import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { Campaign } from '../../pages/donation/types/';

type DonationModalProps = {
  campaign: Campaign;
  onClose: () => void;
  onDonate: (amount: number) => void;
};

export const DonationModal: React.FC<DonationModalProps> = ({
  campaign,
  onClose,
}) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [donorAddresses, setDonorAddresses] = useState<string[]>([]);
  const [donationAmounts, setDonationAmounts] = useState<string[]>([]);
  const presetAmounts = [10, 25, 50, 100];

  const contractAddress = '0x33Ab556b1AEd46b76A734A58e831c778dE93528A';
  const { contract } = useContract(contractAddress);

  // Fetch donor data specific to the campaign
  const { data: donators, refetch: fetchDonators } = useContractRead(
    contract,
    'getDonators',
    [campaign.id] // Pass the campaign ID
  );

  const { mutateAsync: donateToCampaign } = useContractWrite(contract, 'donateToCampaign');

  useEffect(() => {
    if (donators) {
      const [addresses, amounts] = donators || [[], []];
      setDonorAddresses(addresses as string[]);
      setDonationAmounts(amounts as string[]);
    }
  }, [donators]);

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await donateToCampaign({
        args: [campaign.id],
        overrides: { value: ethers.utils.parseEther(amount) },
      });

      setShowThankYou(true);
      await fetchDonators(); // Refresh the donor list for the campaign
      
      // Reset form and show thank you message for 3 seconds
      setTimeout(() => {
        setShowThankYou(false);
        setAmount('');
      }, 3000);
    } catch (error) {
      console.error('Error in donation:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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

        <h3 className="text-2xl font-semibold mb-4 text-white">
          Donate to {campaign.title}
        </h3>

        {showThankYou ? (
          <div className="text-center py-8">
            <div className="text-pink-400 text-2xl mb-2">❤️</div>
            <h4 className="text-xl font-semibold text-white mb-2">Thank You!</h4>
            <p className="text-pink-200">Your generous donation will make a difference.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDonate();
            }}
          >
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-200">
                  $
                </span>
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
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
              className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Complete Donation'
              )}
            </button>
          </form>
        )}

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white mb-3">Recent Donors</h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {donorAddresses.length > 0 ? (
              donorAddresses.map((donor, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="text-pink-200 font-medium">
                      {formatAddress(donor)}
                    </div>
                    <div className="text-sm text-gray-400">{formatDate()}</div>
                  </div>
                  <div className="text-white font-medium">
                    {parseFloat(ethers.utils.formatEther(donationAmounts[index])).toFixed(4)} ETH
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">Be the first to donate!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
