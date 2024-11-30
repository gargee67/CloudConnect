// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract CloudFunding {
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
        uint256[] donations; // An array of donation amounts, matching the order in `donators`
    }

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

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
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
