import React from 'react'
import { Client } from 'appwrite';
import Login from './components/Login';
import Signup from './components/Signup';<Route path="/" element={<Signup/>} />
import { Route, Routes } from 'react-router-dom';
import { CampaignDetails, CreateCampaign, Profile } from './pages';
import { Slidebar,Navbar} from './components';
import { Donation } from './pages/Donation';
import { CampaignList } from './pages/CampaignList';
import KYCVerification from './components/KYCVerification';
import Homee from './components/Homee';
const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
       
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
         <Route path="/" element={<Signup/>} />
          <Route path="/kyc" element={<KYCVerification/>} />
          <Route path="/home" element={<Homee/>} />

          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/donation" element={<Donation/>}/>
          <Route path="/campaigns/:category" element={<CampaignList/>} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
