/*
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <button
          type="button"
          className={`py-2 px-4 rounded ${address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}`}
          onClick={() => {
            if (address) {
              console.log(address);
              navigate('create-campaign');
            } else {
              connect(); // Trigger MetaMask connection
            }
          }}
        >
          {address ? 'Create a campaign' : 'Connect'}
        </button>

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;*/
// components/Navbar.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address, disconnect } = useStateContext();

  // Store the address in localStorage when it changes
  useEffect(() => {
    if (address) {
      localStorage.setItem('walletAddress', address);
    }
  }, [address]);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <button
          type="button"
          className={`py-2 px-4 rounded ${address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}`}
          onClick={() => {
            if (address) {
              console.log('Connected Address:', address);
              navigate('create-campaign');
            } else {
              connect(); // Trigger MetaMask connection
            }
          }}
        >
          {address ? 'Create a campaign' : 'Connect'}
        </button>

        {address && (
          <button
            type="button"
            className="py-2 px-4 rounded bg-[#e74c3c] text-white"
            onClick={disconnect}
          >
            Disconnect
          </button>
        )}

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            {/* Profile avatar or icon */}
            <span className="text-white">P</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

