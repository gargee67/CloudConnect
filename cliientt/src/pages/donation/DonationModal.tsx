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

  const contractAddress = '0x825fd52b432e6AeD5Eb5b098AE0A618ea3Dc006a';
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

  const contractAddress = '0x825fd52b432e6AeD5Eb5b098AE0A618ea3Dc006a';
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
//////////////////////////////////////////////////////////////////////////////
/*import React, { useState, useEffect } from "react";
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
  const contractAddress = "0x825fd52b432e6AeD5Eb5b098AE0A618ea3Dc006a";
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
    //console.log("helloo baccha", campaign.id);
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
              donorData.map(({ address, amount }, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="text-pink-200 font-medium">{formatAddress(address)}</div>

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
          Total Collected: {totalCollected} ETH

        </div>
      </div>
    </div>
  );
};
*/
////////////////////////////////////////////////////////////nowwwwwww
import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useContract, useContractRead, useContractWrite, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Campaign } from "../../pages/donation/types/";

type Donor = {
  address: string;
  amount: number;
  timestamp: string;
};

type DonationModalProps = {
  campaign: Campaign;
  onClose: () => void;
};

const CONTRACT_ADDRESS = "0x825fd52b432e6AeD5Eb5b098AE0A618ea3Dc006a";
const PRESET_AMOUNTS = [0.01, 0.02, 0.03, 0.04];

export const DonationModal: React.FC<DonationModalProps> = ({ campaign, onClose }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [transactionHashes, setTransactionHashes] = useState<string[]>([]);
  const [donorData, setDonorData] = useState<Donor[]>([]);
  const userAddress = useAddress();

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: donators, refetch: fetchDonators } = useContractRead(
    contract,
    "getDonators",
    [campaign.id]
  );
  const { mutateAsync: donateToCampaign } = useContractWrite(contract, "donateToCampaign");

  useEffect(() => {
    const fetchDonorData = async () => {
      if (donators && donators[0]?.length) {
        const addresses = donators[0] as string[];
        const amounts = donators[1] as string[];

        const formattedData = addresses.map((address, index) => ({
          address,
          amount: parseFloat(ethers.utils.formatEther(amounts[index])),
          timestamp: new Date().toLocaleString(),
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
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [showThankYou]);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount (minimum 0.01 ETH)");
      return;
    }

    if (!userAddress) {
      alert("Please connect your wallet to make a donation");
      return;
    }

    setIsLoading(true);

    try {
      const transactionResponse = await donateToCampaign({
        args: [campaign.id],
        overrides: {
          value: ethers.utils.parseEther(amount),
          gasLimit: 300000,
        },
      });

      const newHash = transactionResponse.receipt.transactionHash;
      console.log("New transaction hash:", newHash); // Debug log

      setTransactionHashes(prev => [...prev, newHash]);
      setShowThankYou(true);

      await fetchDonators();

      setDonorData(prev => [
        ...prev,
        {
          address: userAddress,
          amount: parseFloat(amount),
          timestamp: new Date().toLocaleString(),
        }
      ]);

      campaign.raisedAmount += parseFloat(amount);

    } catch (error: any) {
      console.error("Donation error:", error);
      alert(`Transaction failed: ${error.message || "Please try again"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const totalCollected = donorData.reduce((sum, donor) => sum + donor.amount, 0);
  const isCampaignClosed = totalCollected >= campaign.targetAmount;
  const progressPercentage = Math.min(100, (totalCollected / campaign.targetAmount) * 100);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-[600px] w-full p-6 relative max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-pink-200 hover:text-pink-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {showThankYou ? (
          <div className="text-center py-8">
            <div className="text-pink-400 text-4xl mb-4">🎉</div>
            <h4 className="text-xl font-semibold text-white mb-2">Thank You for Your Donation!</h4>
            <p className="text-pink-200 mb-4">Your support makes a difference.</p>

            {transactionHashes.length > 0 && (
              <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                <p className="text-gray-300 text-sm mb-2">Latest Transaction:</p>
                <a
                  href={`https://sepolia.etherscan.io/tx/${transactionHashes[transactionHashes.length - 1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 underline hover:text-pink-300 break-all"
                >
                  {transactionHashes[transactionHashes.length - 1]}
                </a>
              </div>
            )}
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Support {campaign.title}
            </h3>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-pink-200 mb-1">
                <span>Raised: {totalCollected.toFixed(2)} ETH</span>
                <span>Goal: {campaign.targetAmount} ETH</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-pink-500 h-2.5 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleDonate}>
              <div className="mb-6">
                <label className="block text-pink-200 mb-3">Select Amount (ETH)</label>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset.toString())}
                      className={`py-2 rounded-lg transition-all ${amount === preset.toString()
                          ? "bg-pink-600 text-white shadow-md"
                          : "bg-gray-700 text-pink-200 hover:bg-gray-600"
                        }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Or enter custom amount"
                    className="w-full pl-4 pr-4 py-3 border rounded-lg bg-gray-700 border-pink-500 text-white placeholder-pink-200/50 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    step="0.01"
                    min="0.01"
                  />
                  <span className="absolute right-4 top-3.5 text-pink-200">ETH</span>
                </div>
              </div>

              {isCampaignClosed ? (
                <div className="w-full bg-red-500/90 text-white py-3 px-4 rounded-lg text-center font-medium">
                  Campaign Target Reached!
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !amount || parseFloat(amount) < 0.01}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Donate Now"
                  )}
                </button>
              )}
            </form>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-3">Recent Supporters</h4>
              <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-hide">
                {donorData.length > 0 ? (
                  donorData.map(({ address, amount }, index) => (
                    <div
                      key={index}
                      className="bg-gray-700/50 rounded-lg p-3 flex justify-between items-center hover:bg-gray-700/70 transition-colors"
                    >
                      <div className="text-pink-200 font-medium">
                        {formatAddress(address)}
                      </div>
                      <div className="text-white font-medium">
                        {amount.toFixed(4)} ETH
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-400">No donations yet. Be the first supporter!</p>
                  </div>
                )}
              </div>
            </div>

            {transactionHashes.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-3">All Transactions</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
                  {transactionHashes.map((hash, index) => (
                    <div key={index} className="text-sm">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-300 hover:underline break-all"
                      >
                        {hash}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};