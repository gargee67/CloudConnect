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
            {/* Profile avatar or icon */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
