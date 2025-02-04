import React from 'react'
import { Route, Routes } from 'react-router-dom';
import {  CreateCampaign, Home, Profile } from './pages';
import { Slidebar,Navbar} from './components';
import { Donation } from './pages/Donation';
import { CampaignList } from './pages/CampaignList';
import SignUp from '../sign_up/signup';
import DonationPage from '../src/pages/donation/DonationPage';
import CampaignDetails from '../src/pages/CampaignDetails';


const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
     
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
      <Navbar /> 
     
     
        <Routes>
        

          <Route path="/" element={<Home />} />
          <Route path="/sign_in" element={<SignUp/>}/> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/donation" element={<Donation/>}/>
          <Route path="/campaigns/:category" element={<CampaignList/>} />
          <Route path="/campaign-details" element={<CampaignDetails />} />
          <Route path="/donate/:campaignId" element={<DonationPage contractAddress="0x4530B83eE5a5F94DC3E3588453eC76fd7b10d172"/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App
