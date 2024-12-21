/*import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x33Ab556b1AEd46b76A734A58e831c778dE93528A'); // Smart contract address
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
  const { contract } = useContract('0x33Ab556b1AEd46b76A734A58e831c778dE93528A');
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

  const donate = async (pId, amount) => {
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
  };

  return (
    <StateContext.Provider value={{ address, contract, connect, publishCampaign, donate, getDonations }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
