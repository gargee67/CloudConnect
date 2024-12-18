// Import required dependencies
import React, { useState, useEffect } from 'react';
import './HomePage.css';

const Homee = () => {
  const [campaigns, setCampaigns] = useState([]);

  // Fetch active campaigns (mock data for now)
  useEffect(() => {
    const mockCampaigns = [
      { id: 1, title: 'Save the Forests', image: 'https://via.placeholder.com/600x300', description: 'Help us protect the forests by donating to our campaign.' },
      { id: 2, title: 'Education for All', image: 'https://via.placeholder.com/600x300', description: 'Provide quality education to underprivileged children.' },
      { id: 3, title: 'Clean Water Initiative', image: 'https://via.placeholder.com/600x300', description: 'Ensure clean drinking water for rural communities.' },
    ];
    setCampaigns(mockCampaigns);
  }, []);

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <header className="nav-bar">
        <h1 className="logo">CrowdfundIt</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search campaigns..." />
        </div>
        <div className="nav-links">
          <a href="/explore">Explore</a>
          <a href="/create">Start a Campaign</a>
          <a href="/profile">Profile</a>
        </div>
      </header>

      {/* Main Feed Section */}
      <main className="feed-section">
        <h2>Active Campaigns</h2>
        <div className="sliding-feed">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="campaign-card">
              <img src={campaign.image} alt={campaign.title} />
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <button>Donate Now</button>
            </div>
          ))}
        </div>
      </main>

      {/* Trending Campaigns */}
      <aside className="trending-section">
        <h2>Trending Campaigns</h2>
        <ul>
          <li>Campaign A</li>
          <li>Campaign B</li>
          <li>Campaign C</li>
        </ul>
      </aside>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 CrowdfundIt. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Homee;
