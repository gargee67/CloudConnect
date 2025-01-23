/*import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { Campaign } from '../../pages/donation/types/';
//import { useContract } from '@thirdweb-dev/react';

type DonationModalProps = {
  campaign: Campaign;
  onClose: () => void;
};

export const DonationModal: React.FC<DonationModalProps> = ({
  campaign,
  onClose,
}) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [donorData, setDonorData] = useState<{ address: string; amount: number }[]>([]);

  const presetAmounts = [10, 25, 50, 100];

  const contractAddress = '0x180efC54F935107D3f161F887180D7F34c41B849';
  const { contract } = useContract(contractAddress);

  // Fetch donor addresses
  const { data: donators, refetch: fetchDonators } = useContractRead(
    contract,
    'getDonators',
    [campaign.id]
  );

  const { mutateAsync: donateToCampaign } = useContractWrite(contract, 'donateToCampaign');

  useEffect(() => {
    const fetchDonorData = async () => {
      if (donators && donators[0]?.length) {
        const addresses = donators[0] as string[];
        const amounts = donators[1] as string[];

        const formattedData = addresses.map((address, index) => ({
          address,
          amount: parseFloat(ethers.utils.formatEther(amounts[index])),
        }));

        setDonorData(formattedData);
      }
    };

    fetchDonorData();
  }, [donators]);

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setIsLoading(true);
    try {
      await donateToCampaign({
        args: [campaign.id],
        overrides: { value: ethers.utils.parseEther(amount) },
      });

      setShowThankYou(true);
      await fetchDonators();

      campaign.raisedAmount += parseFloat(amount);

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
              <label className="block text-pink-200 mb-2">Campaign id: </label>
              <p className="block text-pink-200 mb-2">{campaign.id}</p>
              <label className="block text-pink-200 mb-2">Select Amount</label>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className={`py-2 rounded-lg transition-colors duration-200 ${amount === preset.toString()
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
            {donorData.length > 0 ? (
              donorData.map(({ address, amount }, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="text-pink-200 font-medium">
                      {formatAddress(address)}
                    </div>
                    <div className="text-sm text-gray-400">{new Date().toLocaleDateString()}</div>
                  </div>
                  <div className="text-white font-medium">{amount.toFixed(4)} ETH</div>
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
};*/
//////////////////////////////
/*import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { Campaign } from '../../pages/donation/types/';

type DonationModalProps = {
  campaign: Campaign;
  onClose: () => void;
};

export const DonationModal: React.FC<DonationModalProps> = ({
  campaign,
  onClose,
}) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [donorData, setDonorData] = useState<
    { address: string; amount: number; timestamp: string }[]
  >([]);

  const presetAmounts = [0.01, 0.02, 0.03, 0.04];

  const contractAddress = '0x180efC54F935107D3f161F887180D7F34c41B849';
  const { contract } = useContract(contractAddress);

  // Fetch donor addresses
  const { data: donators, refetch: fetchDonators } = useContractRead(
    contract,
    'getDonators',
    [campaign.id]
  );

  const { mutateAsync: donateToCampaign } = useContractWrite(contract, 'donateToCampaign');

  useEffect(() => {
    const fetchDonorData = async () => {
      if (donators && donators[0]?.length) {
        const addresses = donators[0] as string[];
        const amounts = donators[1] as string[];

        const formattedData = addresses.map((address, index) => ({
          address,
          amount: parseFloat(ethers.utils.formatEther(amounts[index])),
          timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        }));

        setDonorData(formattedData);
      }
    };

    fetchDonorData();
  }, [donators]);

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setIsLoading(true);
    try {
      await donateToCampaign({
        args: [campaign.id],
        overrides: { value: ethers.utils.parseEther(amount) },
      });

      setShowThankYou(true);
      await fetchDonators();

      const currentTimestamp =
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();

      setDonorData((prevDonors) => [
        ...prevDonors,
        {
          address: '0xYourAddress', // Placeholder, as we are no longer using the signer
          amount: parseFloat(amount),
          timestamp: currentTimestamp,
        },
      ]);

      campaign.raisedAmount += parseFloat(amount);

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

  // Calculate total collected amount
  const totalCollected = donorData.reduce((sum, donor) => sum + donor.amount, 0);

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-[600px] w-full p-6 relative max-h-[90vh] overflow-y-auto scrollbar-hide">
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
              <label className="block text-pink-200 mb-2">Campaign id: </label>
              <p className="block text-pink-200 mb-2">{campaign.id}</p>
              <label className="block text-pink-200 mb-2">Target Amount: {campaign.targetAmount}</label>
              <label className="block text-pink-200 mb-2">Select Amount</label>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className={`py-2 rounded-lg transition-colors duration-200 ${amount === preset.toString()
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-700 text-pink-200 hover:bg-gray-600'
                      }`}
                  >
                    {preset}eth
                  </button>
                ))}
              </div>

              <div className="relative">
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
          <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-hide">
            {donorData.length > 0 ? (
              donorData.map(({ address, amount, timestamp }, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="text-pink-200 font-medium">{formatAddress(address)}</div>
                    <div className="text-sm text-gray-400">{timestamp}</div>
                  </div>
                  <div className="text-white font-medium">{amount.toFixed(4)} ETH</div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">Be the first to donate!</p>
            )}
          </div>
        </div>
        {totalCollected >= campaign.targetAmount && (
          <button
            type="button"
            className="w-full bg-red-500 text-white py-3 mt-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
            onClick={() => alert('This campaign is now closed!')}
          >
            Campaign Closed
          </button>
        )}
        <div className="mt-6 text-white text-lg font-semibold">
          Total Collected: {totalCollected.toFixed(2)} ETH
        </div>

      </div>
    </div>
  );
};
*/
////////with transaction hash

import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Campaign } from "../../pages/donation/types/";

type DonationModalProps = {
  campaign: Campaign;
  onClose: () => void;
};

export const DonationModal: React.FC<DonationModalProps> = ({ campaign, onClose }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [donorData, setDonorData] = useState<
    { address: string; amount: number; timestamp: string }[]
  >([]);

  const presetAmounts = [0.01, 0.02, 0.03, 0.04];
  const contractAddress = "0x180efC54F935107D3f161F887180D7F34c41B849";
  const { contract } = useContract(contractAddress);
  console.log("letssee", campaign.id);
  const { data: donators, refetch: fetchDonators } = useContractRead(contract, "getDonators", [campaign.id]);
  const { mutateAsync: donateToCampaign } = useContractWrite(contract, "donateToCampaign");

  useEffect(() => {
    const fetchDonorData = async () => {
      if (donators && donators[0]?.length) {
        const addresses = donators[0] as string[];
        const amounts = donators[1] as string[];

        const formattedData = addresses.map((address, index) => ({
          address,
          amount: parseFloat(ethers.utils.formatEther(amounts[index])),
          timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
        }));

        setDonorData(formattedData);
      }
    };

    fetchDonorData();
  }, [donators]);

  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => {
        setShowThankYou(false);
        setAmount("");
        setTransactionHash(null);
      }, 3000);

      // Clean up the timeout if the component is unmounted or showThankYou is set to false early
      return () => clearTimeout(timer);
    }
  }, [showThankYou]);

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setIsLoading(true);

    try {
      const transactionResponse = await donateToCampaign({
        args: [campaign.id],
        overrides: { value: ethers.utils.parseEther(amount) },
      });

      setTransactionHash(transactionResponse.receipt.transactionHash);

      setShowThankYou(true);
      await fetchDonators();

      const currentTimestamp = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

      setDonorData((prevDonors) => [
        ...prevDonors,
        {
          address: "0xYourAddress", // Replace with donor address
          amount: parseFloat(amount),
          timestamp: currentTimestamp,
        },
      ]);

      campaign.raisedAmount += parseFloat(amount);
    } catch (error) {
      console.error("Error in donation:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const totalCollected = donorData.reduce((sum, donor) => sum + donor.amount, 0);
  localStorage.setItem("totalCollected", totalCollected.toString());
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-[600px] w-full p-6 relative max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button onClick={onClose} className="absolute right-4 top-4 text-pink-200 hover:text-pink-100">
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
            {transactionHash && (
              <p className="text-gray-300 text-sm mt-2">
                Transaction Hash:{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 underline"
                >
                  {transactionHash.slice(0, 6)}...{transactionHash.slice(-4)}
                </a>
              </p>
            )}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDonate();
            }}
          >
            <div className="mb-6">
              <label className="block text-pink-200 mb-2">Campaign id:</label>
              <p className="block text-pink-200 mb-2">{campaign.id}</p>
              <label className="block text-pink-200 mb-2">
                Target Amount: {campaign.targetAmount}
              </label>
              <label className="block text-pink-200 mb-2">Select Amount</label>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className={`py-2 rounded-lg transition-colors duration-200 ${amount === preset.toString()
                      ? "bg-pink-500 text-white"
                      : "bg-gray-700 text-pink-200 hover:bg-gray-600"
                      }`}
                  >
                    {preset}eth
                  </button>
                ))}
              </div>

              <div className="relative">
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
                "Complete Donation"
              )}
            </button>
          </form>
        )}

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white mb-3">Recent Donors</h4>
          <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-hide">
            {donorData.length > 0 ? (
              donorData.map(({ address, amount, timestamp }, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="text-pink-200 font-medium">{formatAddress(address)}</div>
                    <div className="text-sm text-gray-400">{timestamp}</div>
                  </div>
                  <div className="text-white font-medium">{amount.toFixed(4)} ETH</div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">Be the first to donate!</p>
            )}
          </div>
        </div>
        {totalCollected >= campaign.targetAmount && (
          <button
            type="button"
            className="w-full bg-red-500 text-white py-3 mt-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
            onClick={() => alert("This campaign is now closed!")}
          >
            Campaign Closed
          </button>
        )}
        <div className="mt-6 text-white text-lg font-semibold">
          Total Collected: {totalCollected.toFixed(2)} ETH

        </div>
      </div>
    </div>
  );
};
