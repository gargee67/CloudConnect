import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address, disconnect } = useStateContext();

  // Store the address in localStorage when it changes
  useEffect(() => {
    if (address) {
      localStorage.setItem("walletAddress", address);
    }
  }, [address]);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <button
          type="button"
          className={`py-2 px-4 rounded ${
            address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"
          }`}
          onClick={() => {
            if (address) {
              console.log("Connected Address:", address);
              navigate("create-campaign");
            } else {
              connect(); // Trigger MetaMask connection
            }
          }}
        >
          {address ? "Create a campaign" : "Connect"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
