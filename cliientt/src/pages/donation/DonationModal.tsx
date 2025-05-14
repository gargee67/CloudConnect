import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useContract, useContractRead, useContractWrite, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { supabase } from "../../../supabaseClient1";

type Campaign = {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
};

type Donor = {
  address: string;
  amount: number;
  timestamp: string;
};

type DonationModalProps = {
  campaign: Campaign;
  onClose: () => void;
};

const CONTRACT_ADDRESS = "0xd804d0ffbee61923726d69B10615d30Fdc0bD2Bf";
const PRESET_AMOUNTS = [0.01, 0.02, 0.03, 0.04];

export const DonationModal: React.FC<DonationModalProps> = ({ campaign, onClose }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [transactionHashes, setTransactionHashes] = useState<string[]>([]);
  const [donorData, setDonorData] = useState<Donor[]>([]);
  const [starCount, setStarCount] = useState(0);
  const userAddress = useAddress();

  // Supabase client setup (already in your supabaseClient1.ts)
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: donators, refetch: fetchDonators } = useContractRead(contract, "getDonators", [campaign.id]);
  const { mutateAsync: donateToCampaign } = useContractWrite(contract, "donateToCampaign");

  // Fetch initial star count
  useEffect(() => {
    const fetchStars = async () => {
      if (!userAddress) return;
      
      const { data, error } = await supabase
        .from('donor_stars')
        .select('stars')
        .eq('address', userAddress)
        .single();

      if (data) setStarCount(data.stars || 0);
    };
    
    fetchStars();
  }, [userAddress]);

  // Handle donation submission
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !userAddress) return;

    setIsLoading(true);
    
    try {
      // Process blockchain donation
      const tx = await donateToCampaign({
        args: [campaign.id],
        overrides: { value: ethers.utils.parseEther(amount) }
      });

      // Update star count
      const { data: existing } = await supabase
        .from('donor_stars')
        .select('stars')
        .eq('address', userAddress)
        .single();

      const newStars = (existing?.stars || 0) + 1;
      
      await supabase
        .from('donor_stars')
        .upsert({ address: userAddress, stars: newStars }, { onConflict: 'address' });

      setStarCount(newStars);
      setShowThankYou(true);
      
      // Update local state
      setTransactionHashes(prev => [...prev, tx.receipt.transactionHash]);
      await fetchDonators();
      
    } catch (error) {
      console.error("Donation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Thank you animation components
  const StarBurst = () => (
    <motion.div
      className="absolute"
      initial={{ scale: 0, opacity: 0.5 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="w-24 h-24 bg-pink-400/40 rounded-full blur-3xl" />
    </motion.div>
  );

  const AnimatedStar = () => (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="gold"
      viewBox="0 0 24 24"
      className="w-20 h-20 z-10"
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: [0, 1.5, 1.2], rotate: 360 }}
      transition={{ duration: 1.4 }}
    >
      <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847L19.335 24 12 20.202 4.665 24 6 15.597 0 9.75l8.332-1.595z" />
    </motion.svg>
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-[600px] w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 text-pink-200">
          <X className="w-6 h-6" />
        </button>

        {showThankYou ? (
          <div className="relative flex flex-col items-center mt-6">
            <StarBurst />
            <AnimatedStar />
            
            <motion.p
              className="text-pink-200 text-lg font-semibold mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              You've earned a star! 🌟<br />
              <span className="text-pink-300">Total Stars: {starCount}</span>
            </motion.p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Support {campaign.title}
            </h3>

            {/* Donation Form */}
            <form onSubmit={handleDonate}>
              <div className="mb-6">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset.toString())}
                      className={`py-2 rounded-lg ${
                        amount === preset.toString() 
                        ? "bg-pink-600 text-white" 
                        : "bg-gray-700 text-pink-200"
                      }`}
                    >
                      {preset} ETH
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Custom amount (ETH)"
                    className="w-full pl-4 pr-4 py-3 bg-gray-700 border-pink-500 text-white"
                    step="0.01"
                    min="0.01"
                  />
                  <span className="absolute right-4 top-3.5 text-pink-200">ETH</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-medium"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  "Donate Now"
                )}
              </button>
            </form>

            {/* Recent Supporters */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-3">Recent Supporters</h4>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {donorData.map((donor, index) => (
                  <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-pink-200">{donor.address.slice(0,6)}...{donor.address.slice(-4)}</span>
                    <span className="text-white float-right">{donor.amount.toFixed(4)} ETH</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};