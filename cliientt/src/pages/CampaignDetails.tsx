
/*import React, { useState, useEffect } from "react";
import { campaigns } from './donation/data/campaigns';
import { Campaign } from './donation/types/index';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const CampaignDetails: React.FC = () => {
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [updatedCampaigns, setUpdatedCampaigns] = useState(campaigns);
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
    const [donorData, setDonorData] = useState<
        { address: string; amount: number; timestamp: string }[]
    >([]);
    const walletAddress = localStorage.getItem('walletAddress'); // walletAddress is a string, not an array

    // Handle the case when walletAddress is null or invalid
    useEffect(() => {
        if (walletAddress) {
            const newFilteredCampaigns = updatedCampaigns.filter((c) => {
                const matchesWallet = c.id === walletAddress;
                return matchesWallet; // Filter by walletAddress if it exists
            });
            setFilteredCampaigns(newFilteredCampaigns); // Update filtered campaigns
            console.log("Filtered Campaigns: ", newFilteredCampaigns);
        }
    }, [selectedCampaign, updatedCampaigns, walletAddress]);
    //console.log("babyyyyyyyyyy", filteredCampaigns); // Log filtered campaigns
    const contractAddress = "0x180efC54F935107D3f161F887180D7F34c41B849";
    const { contract } = useContract(contractAddress);
    const { data: donators, refetch: fetchDonators } = useContractRead(contract, "getDonators", [walletAddress]);
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
    console.log(donators);
    return (
        <div>

            <h1>Campaign Details</h1>

            {filteredCampaigns.length > 0 ? (
                <ul>
                    {filteredCampaigns.map((campaign) => (
                        <li key={campaign.id}>{campaign.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No campaigns found for this wallet address.</p>
            )}
        </div>
    );
};

export default CampaignDetails;
*/
/*import React, { useState, useEffect } from "react";
import { campaigns } from './donation/data/campaigns';
import { Campaign } from './donation/types/index';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const CampaignDetails: React.FC = () => {
    const [updatedCampaigns, setUpdatedCampaigns] = useState(campaigns);
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
    const [donorData, setDonorData] = useState<
        { address: string; amount: number; timestamp: string }[]
    >([]);
    const walletAddress = localStorage.getItem('walletAddress'); // walletAddress is a string

    // Filter campaigns based on wallet address
    useEffect(() => {
        if (walletAddress) {
            const newFilteredCampaigns = updatedCampaigns.filter((c) => c.id === walletAddress);
            setFilteredCampaigns(newFilteredCampaigns);
        }
    }, [updatedCampaigns, walletAddress]);

    const contractAddress = "0x180efC54F935107D3f161F887180D7F34c41B849";
    const { contract } = useContract(contractAddress);
    const { data: donators } = useContractRead(contract, "getDonators", [walletAddress]);

    // Format donor data
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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Campaign Details</h1>

            
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Filtered Campaigns</h2>
                {filteredCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-pink-500/40 transition-all duration-300"
                            >
                                <img
                                    src={campaign.imageUrl}
                                    alt={campaign.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                                <p className="text-gray-400 mb-4">{campaign.description}</p>
                                <div className="text-sm text-gray-500">
                                    <p>Category: {campaign.category}</p>
                                    <p>Target: ${campaign.targetAmount.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No campaigns found for this wallet address.</p>
                )}
            </div>

            
            <div>
                <h2 className="text-2xl font-semibold mb-4">Donor List</h2>
                {donorData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-pink-500 text-white">
                                    <th className="px-4 py-2 text-left">Address</th>
                                    <th className="px-4 py-2 text-left">Amount (ETH)</th>
                                    <th className="px-4 py-2 text-left">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donorData.map((donor, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                                            }`}
                                    >
                                        <td className="px-4 py-2">{donor.address}</td>
                                        <td className="px-4 py-2">{donor.amount}</td>
                                        <td className="px-4 py-2">{donor.timestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400">No donors found for this campaign.</p>
                )}
            </div>
        </div>
    );
};

export default CampaignDetails;
*/
import React, { useState, useEffect } from "react";
import { campaigns } from './donation/data/campaigns';
import { Campaign } from './donation/types/index';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const CampaignDetails: React.FC = () => {
    const [updatedCampaigns, setUpdatedCampaigns] = useState(campaigns);
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
    const [donorData, setDonorData] = useState<
        { address: string; amount: number; timestamp: string }[]
    >([]);
    const walletAddress = localStorage.getItem('walletAddress'); // walletAddress is a string

    // Filter campaigns based on wallet address
    useEffect(() => {
        if (walletAddress) {
            const newFilteredCampaigns = updatedCampaigns.filter((c) => c.id === walletAddress);
            setFilteredCampaigns(newFilteredCampaigns);
        }
    }, [updatedCampaigns, walletAddress]);

    const contractAddress = "0x180efC54F935107D3f161F887180D7F34c41B849";
    const { contract } = useContract(contractAddress);
    const { data: donators } = useContractRead(contract, "getDonators", [walletAddress]);

    // Format donor data
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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Campaign Details</h1>

            {/* Campaign Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Filtered Campaigns</h2>
                {filteredCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-pink-500/40 transition-all duration-300"
                            >
                                <img
                                    src={campaign.imageUrl}
                                    alt={campaign.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                                <p className="text-gray-400 mb-4">{campaign.description}</p>

                                {/* Campaign Details */}
                                <div className="text-sm text-gray-500 space-y-2">
                                    <p>
                                        <span className="font-semibold text-pink-400">Target Amount:</span>
                                        ${campaign.targetAmount.toLocaleString()}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-pink-400">Deadline:</span>
                                        {new Date(campaign.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No campaigns found for this wallet address.</p>
                )}
            </div>

            {/* Donor Section */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Donor List</h2>
                {donorData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-pink-500 text-white">
                                    <th className="px-4 py-2 text-left">Address</th>
                                    <th className="px-4 py-2 text-left">Amount (ETH)</th>
                                    <th className="px-4 py-2 text-left">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donorData.map((donor, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                                            }`}
                                    >
                                        <td className="px-4 py-2">{walletAddress}</td>
                                        <td className="px-4 py-2">{donor.amount}</td>
                                        <td className="px-4 py-2">{donor.timestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400">No donors found for this campaign.</p>
                )}
            </div>
        </div>
    );
};

export default CampaignDetails;





