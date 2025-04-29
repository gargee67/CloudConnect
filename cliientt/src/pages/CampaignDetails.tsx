
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

    const contractAddress = "0x825fd52b432e6AeD5Eb5b098AE0A618ea3Dc006a";
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
                <h2 className="text-2xl font-semibold mb-4">My Campaigns</h2>
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

                               
                                <div className="text-sm text-gray-500 space-y-2">
                                    <p>
                                        <span className="font-semibold text-pink-400">Target Amount:</span>
                                        {campaign.targetAmount.toLocaleString()}ETH
                                    </p>
                                    <p>
                                        <span className="font-semibold text-pink-400">Deadline:</span>
                                        {new Date(campaign.deadline).toLocaleDateString()}
                                    </p>
                                    <a
                                        href={campaign.documentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 text-sm"
                                    >
                                        View Documents
                                    </a>
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
///////////

/*import React, { useState, useEffect } from "react";
import { campaigns } from './donation/data/campaigns';
import { Campaign } from './donation/types/index';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Clock, Target, FileText, DollarSign } from 'lucide-react';

const CampaignDetails: React.FC = () => {
    const [updatedCampaigns, setUpdatedCampaigns] = useState(campaigns);
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
    const [donorData, setDonorData] = useState<
        { address: string; amount: number; timestamp: string }[]
    >([]);
    const walletAddress = localStorage.getItem('walletAddress');

    useEffect(() => {
        if (walletAddress) {
            const newFilteredCampaigns = updatedCampaigns.filter((c) => c.id === walletAddress);
            setFilteredCampaigns(newFilteredCampaigns);
        }
    }, [updatedCampaigns, walletAddress]);

    const contractAddress = "0x825fd52b432e6AeD5Eb5b098AE0A618ea3Dc006a";
    const { contract } = useContract(contractAddress);
    const { data: donators } = useContractRead(contract, "getDonators", [walletAddress]);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    Campaign Dashboard
                </h1>

               
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center text-pink-400">
                        <FileText className="mr-3" /> Your Campaigns
                    </h2>
                    {filteredCampaigns.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCampaigns.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/30"
                                >
                                    <img
                                        src={campaign.imageUrl}
                                        alt={campaign.title}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-3 text-pink-400">{campaign.title}</h3>
                                        <p className="text-gray-400 mb-4 line-clamp-3">{campaign.description}</p>

                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm text-gray-300">
                                                <Target className="mr-2 w-4 h-4 text-pink-500" />
                                                <span className="font-semibold mr-2">Target:</span>
                                                {campaign.targetAmount.toLocaleString()} ETH
                                            </div>
                                            <div className="flex items-center text-sm text-gray-300">
                                                <Clock className="mr-2 w-4 h-4 text-pink-500" />
                                                <span className="font-semibold mr-2">Deadline:</span>
                                                {new Date(campaign.deadline).toLocaleDateString()}
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 bg-gray-800 p-6 rounded-lg">
                            No campaigns found for this wallet address.
                        </p>
                    )}
                </section>

               
                <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center text-pink-400">
                        Donor Contributions
                    </h2>
                    {donorData.length > 0 ? (
                        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                            <table className="w-full">
                                <thead className="bg-pink-600 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Donor Address</th>
                                        <th className="px-6 py-3 text-left">Amount (ETH)</th>

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

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 bg-gray-800 p-6 rounded-lg">
                            No donors found for this campaign.
                        </p>
                    )}
                </section>
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
import { Clock, Target, FileText, DollarSign } from 'lucide-react';

const CampaignDetails: React.FC = () => {
    const [updatedCampaigns, setUpdatedCampaigns] = useState(campaigns);
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
    const [donorData, setDonorData] = useState<
        { address: string; amount: number; timestamp: string }[]
    >([]);
    const walletAddress = localStorage.getItem('walletAddress');

    useEffect(() => {
        if (walletAddress) {
            const newFilteredCampaigns = updatedCampaigns.filter((c) => c.id === walletAddress);
            setFilteredCampaigns(newFilteredCampaigns);
        }
    }, [updatedCampaigns, walletAddress]);

    const contractAddress = "0x825fd52b432e6AeD5Eb5b098AE0A618ea3Dc006a";
    const { contract } = useContract(contractAddress);
    const { data: donators } = useContractRead(contract, "getDonators", [walletAddress]);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 relative">
            {/* Background Animation */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute animate-pulse w-96 h-96 -top-10 -left-10 bg-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute animate-pulse w-96 h-96 top-1/2 right-0 bg-pink-600/10 rounded-full blur-3xl"></div>
                <div className="absolute animate-pulse w-96 h-96 bottom-0 left-1/3 bg-pink-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    Campaign Dashboard
                </h1>

                {/* Campaigns Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center text-pink-400">
                        <FileText className="mr-3" /> Your Campaigns
                    </h2>
                    {filteredCampaigns.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCampaigns.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/30"
                                >
                                    <img
                                        src={campaign.imageUrl}
                                        alt={campaign.title}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-3 text-pink-400">{campaign.title}</h3>
                                        <p className="text-gray-400 mb-4 line-clamp-3">{campaign.description}</p>

                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm text-gray-300">
                                                <Target className="mr-2 w-4 h-4 text-pink-500" />
                                                <span className="font-semibold mr-2">Target:</span>
                                                {campaign.targetAmount.toLocaleString()} ETH
                                            </div>
                                            <div className="flex items-center text-sm text-gray-300">
                                                <Clock className="mr-2 w-4 h-4 text-pink-500" />
                                                <span className="font-semibold mr-2">Deadline:</span>
                                                {new Date(campaign.deadline).toLocaleDateString()}
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 bg-gray-800 p-6 rounded-lg">
                            No campaigns found for this wallet address.
                        </p>
                    )}
                </section>

                {/* Donors Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center text-pink-400">
                        Donor Contributions
                    </h2>
                    {donorData.length > 0 ? (
                        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                            <table className="w-full">
                                <thead className="bg-pink-600 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Donor Address</th>
                                        <th className="px-6 py-3 text-left">Amount (ETH)</th>
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

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 bg-gray-800 p-6 rounded-lg">
                            No donors found for this campaign.
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default CampaignDetails;
