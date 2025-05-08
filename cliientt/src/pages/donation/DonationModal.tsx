import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useContract, useContractRead, useContractWrite, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Campaign } from "../../pages/donation/types/";
//new add
import { motion } from "framer-motion";
import { supabase } from "../../../supabaseClient1";



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
  const [starCount, setStarCount] = useState<number>(0);


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
    const fetchUserStars = async () => {
      if (userAddress) {
        console.log("Updated Star Count:", starCount);
        const { data, error } = await supabase
          .from("donor_stars")
          .select("stars")
          .eq("address", userAddress)
          .single();

        if (error) {
          console.error("Error fetching user stars:", error.message);
        } else if (data) {
          setStarCount(data.stars);
        }
      }
    };

    fetchUserStars();
  }, [userAddress]);

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
      console.log("New transaction hash:", newHash);

      // Save transaction hash in localStorage
      const key = "transactionData";
      const existing = JSON.parse(localStorage.getItem(key) || "{}");

      if (!existing[campaign.id]) {
        existing[campaign.id] = [];
      }

      if (!existing[campaign.id].includes(newHash)) {
        existing[campaign.id].push(newHash);
      }

      localStorage.setItem(key, JSON.stringify(existing));

      setTransactionHashes(prev => [...prev, newHash]);
      setShowThankYou(true);
      ///new add
      try {
        const { data: existingEntry, error: fetchError } = await supabase
          .from("donor_stars")
          .select("stars")
          .eq("address", userAddress)
          .single();

        const newStars = existingEntry ? existingEntry.stars + 1 : 1;

        const { error: upsertError } = await supabase
          .from("donor_stars")
          .upsert([{ address: userAddress, stars: newStars }]);

        if (upsertError) {
          console.error("Error updating star count:", upsertError.message);
        }

        setStarCount(newStars);
      } catch (err) {
        console.error("Error managing Supabase star logic:", err);
      }
      // Fetch updated donators      
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
          //new add
          /* <div className="text-center py-8">
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
           </div>*/
          <div className="relative flex flex-col items-center mt-6">
            {/* Burst animation */}
            {/* Burst glow animation */}
            <motion.div
              className="absolute"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="w-24 h-24 bg-pink-400/40 rounded-full blur-3xl" />
            </motion.div>

            {/* Star icon animation */}
            {/* SVG Star icon */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gold"
              viewBox="0 0 24 24"
              stroke="none"
              className="w-20 h-20 z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.5, 1.2], rotate: [0, 360] }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847L19.335 24 12 20.202 4.665 24 6 15.597 0 9.75l8.332-1.595z" />
            </motion.svg>
            <motion.div
              className="absolute w-6 h-6 bg-white rounded-full"
              style={{ top: "-10px", right: "10px", opacity: 0.6 }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 0], opacity: [0.6, 1, 0] }}
              transition={{ delay: 0.3, duration: 1.2 }}
            />

            {/* Star count message */}
            <motion.p
              className="text-pink-200 text-lg font-semibold animate-pulse z-10 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
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