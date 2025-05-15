// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract CloudFunding {
    ////////
    struct RegisterUser {
        string emailId;
        bytes32 hashedPassword; // Store hashed password
        address walletAddress;
    }
    ///////
    struct Campaign {
        address owner; // The Ethereum address of the campaign creator
        string title; // The title or name of the campaign
        string description;
        uint256 target; // The fundraising goal or target amount in Wei
        uint256 deadline;
        uint256 amountCollected;
        string image;
        string campaigntype; //new add 1--
        string documentlink;
        address[] donators; // An array of addresses that have donated to the campaign
        uint256[] donations; // An array of donation amounts, matching the order in donators
    }
    ///////new add
    mapping(string => bool) private emailExists; // To ensure unique emails
    mapping(address => bool) private addressExists; // To ensure unique addresses
    mapping(address => RegisterUser) public users; // Map wallet address to user details
    mapping(string => address) public emailToAddress; // New mapping for email-to-wallet
    uint public userCount;

    event UserRegistered(address walletAddress, string emailId);
    event UserLoggedIn(address walletAddress, string emailId);

<<<<<<< HEAD
    constructor() {
=======
    constructor(){
        
>>>>>>> 6d8e48965ddf58479544ac960d9387031cae47ea
        userCount = 0;
    }

    // Function to register a new user
    function registerUser(
        string memory emailId,
        string memory password,
        string memory confirmPassword,
        address walletAddress
    ) public {
        require(!emailExists[emailId], "Email already exists.");
        require(
            !addressExists[walletAddress],
            "Wallet address already registered."
        );
        require(
            keccak256(abi.encodePacked(password)) ==
                keccak256(abi.encodePacked(confirmPassword)),
            "Passwords do not match."
        );

        bytes32 hashedPassword = keccak256(abi.encodePacked(password));
        users[walletAddress] = RegisterUser(
            emailId,
            hashedPassword,
            walletAddress
        );

        emailExists[emailId] = true;
        addressExists[walletAddress] = true;
        emailToAddress[emailId] = walletAddress; // Store email-to-wallet relation

        userCount++;
        emit UserRegistered(walletAddress, emailId);
    }

    // Function for users to sign in
    function signIn(
        string memory emailId,
        string memory password
    ) public returns (bool) {
        address walletAddress = getAddressByEmail(emailId);
        require(walletAddress != address(0), "User not found.");

        RegisterUser memory user = users[walletAddress];
        require(
            user.hashedPassword == keccak256(abi.encodePacked(password)),
            "Incorrect password."
        );

        // Emit an event for successful login
        emit UserLoggedIn(walletAddress, emailId);

        return true;
    }

    // Helper function to get a wallet address by email
    function getAddressByEmail(
        string memory emailId
    ) public view returns (address) {
        return emailToAddress[emailId]; // Direct lookup by email
    }

    // Function to check if an email is already registered
    function isEmailRegistered(
        string memory emailId
    ) public view returns (bool) {
        return emailExists[emailId];
    }

    function isAddressRegistered(
        address walletAddress
    ) public view returns (bool) {
        return addressExists[walletAddress];
    }
    //////////////////////////////
    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image,
        string memory _campaigntype,
        string memory _documentlink
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.campaigntype = _campaigntype;
        campaign.documentlink = _documentlink;
        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    /*event DonationReceived(
        uint256 indexed campaignId,
        address donor,
        uint256 amount
    );

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected += amount;
            emit DonationReceived(_id, msg.sender, amount);
        } else {
            revert("Transfer failed");
        }
    }
*/
    // Define the DonationReceived event
    event DonationReceived(uint256 campaignId, address donor, uint256 amount);

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id]; // Get the campaign by ID

        // Add the donator to the donators list and donation to donations list
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        // Send the funds directly to the campaign owner (not the contract)
        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        // Check if the transfer was successful
        if (sent) {
            campaign.amountCollected += amount; // Update the total collected
            emit DonationReceived(_id, msg.sender, amount); // Emit event
        } else {
            revert("Transfer failed");
        }
    }
    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        // First, determine how many campaigns are not owned by the caller
        uint count = 0;
        for (uint i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner != msg.sender) {
                count++;
            }
        }

        // Create a new array with the correct size
        Campaign[] memory allCampaigns = new Campaign[](count);
        uint index = 0;

        // Populate the new array with campaigns not owned by the caller
        for (uint i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner != msg.sender) {
                allCampaigns[index] = campaigns[i];
                index++;
            }
        }

        return allCampaigns;
    }
}
