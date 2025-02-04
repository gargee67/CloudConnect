import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import { Campaign } from '../types'; // Ensure the Campaign type is properly imported

const network = "sepolia";
const contractAddress = "0x4530B83eE5a5F94DC3E3588453eC76fd7b10d172"; // Your actual contract address
const clientId = "93c44c626e33356c63b280c392819e57"; // Your actual client ID

const sdk = new ThirdwebSDK(network, {
  clientId: clientId, // Required for thirdweb services
});

// Define a constant to store the campaigns
let campaigns: Campaign[] = [];

async function fetchCampaigns() {
  try {
    // Get the contract using the SDK
    const contract = await sdk.getContract(contractAddress);

    // Fetch the campaigns from the contract
    const campaignss = await contract.call("getCampaigns");
    console.log("Campaigns:", campaignss);

    // Map the fetched campaigns into the Campaign[] format
    campaigns = campaignss.map((campaign: any) => {
      const deadlinee = ethers.BigNumber.from(campaign.deadline._hex);
      const deadlineTimestampp = deadlinee.toString();
      const deadlineDatee = new Date(Number(deadlineTimestampp)).toLocaleString();

      const targett = ethers.BigNumber.from(campaign.target._hex);
      const targetInEtherr = ethers.utils.formatEther(targett);
      console.log("de", parseFloat(ethers.utils.formatEther(campaign.amountCollected._hex)));

      return {
        id: campaign.owner, // Assuming `campaign.id` exists, adjust as needed
        title: campaign.title,
        category: campaign.campaigntype,
        description: campaign.description,
        imageUrl: campaign.image, // Default image URL// use unsplash.com for pic collection
        deadline: deadlineDatee,
        targetAmount: parseFloat(targetInEtherr),
        raisedAmount: parseFloat(ethers.utils.formatEther(campaign.amountCollected._hex)),
        documentUrl: campaign.documentlink || '#', // Default link if not provided
      };
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
  }
}

// Call the fetchCampaigns function to fetch and set the campaigns
fetchCampaigns();
//const targetInEther = ethers.utils.formatEther(campaigns.target);
//const deadlineDate = new Date(Number(campaigns.deadline)).toLocaleString(); // Converts to local date and time
//console.log("Target Value:", campaigns.target); // Check if target is defined

//const exampleBigNumber = ethers.BigNumber.from(campaigns[0].target);
//console.log(campaigns[3]);
// Convert BigNumber to hex string
//const hexString = exampleBigNumber.toHexString();

// Print the hex string as it is
//console.log("Hexadecimal representation: ", hexString);
//const target = ethers.BigNumber.from(campaigns[0].target._hex); // 1000000000000000 Wei (1 ETH)

//const targetInEther = ethers.utils.formatEther(target); // Converts Wei to Ether

//console.log(`Target in Ether: ${targetInEther} ETH`);
//const deadline = ethers.BigNumber.from(campaigns[0].deadline._hex); // Example timestamp in BigNumber

// Convert BigNumber to number (milliseconds)
//const deadlineTimestamp = deadline.toString(); // Converts to string or use .toNumber() for direct number

// Create Date object from the timestamp
//const deadlineDate = new Date(Number(deadlineTimestamp)).toLocaleString();

//console.log(`Target in Ether: ${targetInEther} ETH`);
//console.log(`Deadline Date: ${deadlineDate}`);
/*catch (error) {
 console.error("Error fetching campaigns:", error);
}
}

fetchCampaigns();*/
export { campaigns };
/*export const campaigns: Campaign[] = [
  {
    id: '1',
    title: "Sarah's College Education Fund",
    category: 'education',
    description: 'Help Sarah pursue  school education.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
    deadline: '2024-06-30',
    targetAmount: 50000,
    raisedAmount: 15000,
    documentUrl: 'https://example.com/docs/sarah-education.pdf'
  },
  {
    id: '2',
    title: "Sarah's College Education Fund",
    category: 'education',
    description: 'Help Sarah pursue  sc dsvwfw  fewfwfhool education.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
    deadline: '2024-06-30',
    targetAmount: 50000,
    raisedAmount: 15000,
    documentUrl: 'https://example.com/docs/sarah-education.pdf'
  },
  {
    id: '3',
    title: 'Emergency Heart Surgery',
    category: 'medical',
    description: 'Support John\'s critical heart surgery and recovery process.',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80',
    deadline: '2024-04-15',
    targetAmount: 75000,
    raisedAmount: 45000,
    documentUrl: 'https://example.com/docs/medical-records.pdf'
  },
  {
    id: '4',
    title: 'Eco-Friendly Water Purification Startup',
    category: 'startup',
    description: 'Innovative startup developing sustainable water purification solutions for rural areas.',
    imageUrl: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&q=80',
    deadline: '2024-08-20',
    targetAmount: 100000,
    raisedAmount: 28000,
    documentUrl: 'https://example.com/docs/business-plan.pdf'
  },
  {
    id: '5',
    title: 'Community Food Bank Initiative',
    category: 'social',
    description: 'Help us feed 1000+ families in need through our local food bank program.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80',
    deadline: '2024-05-30',
    targetAmount: 25000,
    raisedAmount: 12000,
    documentUrl: 'https://example.com/docs/food-bank-proposal.pdf'
  }
];*/