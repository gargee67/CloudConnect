/*import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x4530B83eE5a5F94DC3E3588453eC76fd7b10d172'); // Smart contract address
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    console.log("Publishing campaign...");
    try {
      const targetValue = ethers.utils.parseUnits(form.target, 18).toString(); // Convert target to string
  
      const data = await createCampaign({
        args: [
          address, // owner (the current connected address)
          form.title, // campaign title
          form.description, // campaign description
          targetValue, // target funding amount as a string
          new Date(form.deadline).getTime(), // deadline as a timestamp
          form.image, // campaign image URL
          form.campaignType,// campaign type
          form.documentlink//document link
        ],
      });
  
      console.log("Contract call successful", data);
    } catch (error) {
      console.error("Contract call failure", error);
    }
  };
  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        publishCampaign,
        donate,
        getDonations, // Provide the publishCampaign function
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
*/
import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x4530B83eE5a5F94DC3E3588453eC76fd7b10d172');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const targetValue = ethers.utils.parseUnits(form.target, 18).toString();
      const deadline = new Date(form.deadline).getTime();

      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          targetValue,
          deadline,
          form.image,
          form.campaignType,
          form.documentlink,
        ],
      });

      console.log('Campaign published successfully:', data);
    } catch (error) {
      console.error('Error publishing campaign:', error);
    }
  };

  /*const donate = async (pId, amount) => {
    try {
      const data = await contract.call('donateToCampaign', [pId], {
        value: ethers.utils.parseEther(amount),
      });
      console.log('Donation successful:', data);
      return data;
    } catch (error) {
      console.error('Error donating:', error);
      throw error;
    }
  };*/
  /*const donate = async (pId, amount, contract) => {
    try {
      // Call the smart contract's donateToCampaign function
      const data = await contract.call('donateToCampaign', [pId], {
        value: ethers.utils.parseEther(amount),
      });
  
      // Fetch the updated list of donors
      const updatedDonors = await contract.call('getDonators', [pId]);
  
      // Format the updated donor data
      const formattedDonors = updatedDonors[0].map((address, index) => ({
        address,
        amount: parseFloat(ethers.utils.formatEther(updatedDonors[1][index])),
      }));
  
      console.log('Donation successful:', data);
      console.log('Updated Donors:', formattedDonors);
  
      return { transaction: data, donors: formattedDonors };
    } catch (error) {
      console.error('Error donating:', error);
      throw error;
    }
  };
  const getDonations = async (pId) => {
    try {
      const donations = await contract.call('getDonators', [pId]);
      const parsedDonations = donations[0].map((donator, index) => ({
        donator,
        donation: ethers.utils.formatEther(donations[1][index].toString()),
      }));

      console.log('Donations fetched successfully:', parsedDonations);
      return parsedDonations;
    } catch (error) {
      console.error('Error fetching donations:', error);
      throw error;
    }
  };*/
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  return (
    <StateContext.Provider value={{ address, contract, connect, publishCampaign, donate, getDonations , getCampaigns,
        getUserCampaigns}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
