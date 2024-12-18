import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xF47E2c20bcF3bE7822846E8420AeBAa8DCB7E766'); // Smart contract address
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
  

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        publishCampaign, // Provide the publishCampaign function
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
