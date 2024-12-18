import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite';
import './KYCVerification.css';

const KYCVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    govIdFile: null,

    // Contact Details
    email: '',
    phoneNumber: '',
    emailVerified: false,
    phoneVerified: false,

    // Wallet Information
    blockchainWallet: '',
    publicKey: '',
    walletVerified: false,

    // Profile Information
    profilePicture: null,
    shortBio: '',

    // Account Type
    accountType: 'backer',
    
    // Optional Organization Details
    organizationName: '',
    organizationDoc: null,

    // Security
    twoFactorEnabled: false,
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Validation functions for each step
  const validatePersonalInfo = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const today = new Date();
    const dob = new Date(formData.dateOfBirth);
    const age = today.getFullYear() - dob.getFullYear();
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else if (age < 18) {
      newErrors.dateOfBirth = "You must be at least 18 years old";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactDetails = () => {
    const newErrors = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateWalletInfo = () => {
    const newErrors = {};
    
    // Basic blockchain address validation (can be more specific based on blockchain)
    const walletRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    
    if (!walletRegex.test(formData.blockchainWallet)) {
      newErrors.blockchainWallet = "Invalid blockchain wallet address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  

  const handleNextStep = () => {
    let isValid = false;

    switch(currentStep) {
      case 1:
        isValid = validatePersonalInfo();
        break;
      case 2:
        isValid = validateContactDetails();
        break;
      case 3:
        isValid = validateWalletInfo();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      // Here you would typically send the form data to your backend
      // For this example, we'll simulate a submission
      console.log("Submitting KYC data:", formData);
      
      // Redirect to dashboard or next step
      navigate('/login');
    } catch (error) {
      console.error("KYC Submission Error:", error);
      alert("Failed to submit KYC information");
    } finally {
      setLoading(false);
    }
  };
  

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="kyc-step">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
              {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
            </div>
            <div className="form-group">
              <label>Government ID (Optional)</label>
              <input
                type="file"
                name="govIdFile"
                ref={fileInputRef}
                onChange={handleInputChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="kyc-step">
            <h2>Contact Details</h2>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
              {!formData.emailVerified && (
                <button type="button" className="verify-btn">
                  Verify Email
                </button>
              )}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
              {!formData.phoneVerified && (
                <button type="button" className="verify-btn">
                  Verify Phone
                </button>
              )}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="kyc-step">
            <h2>Wallet Information</h2>
            <div className="form-group">
              <label>Blockchain Wallet Address</label>
              <input
                type="text"
                name="blockchainWallet"
                value={formData.blockchainWallet}
                onChange={handleInputChange}
                required
              />
              {errors.blockchainWallet && <p className="error">{errors.blockchainWallet}</p>}
            </div>
            <div className="form-group">
              <label>Public Key (Optional)</label>
              <input
                type="text"
                name="publicKey"
                value={formData.publicKey}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Account Type</label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
              >
                <option value="backer">Backer</option>
                <option value="creator">Campaign Creator</option>
              </select>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="kyc-step">
            <h2>Security and Terms</h2>
            <div className="form-group">
              <label>Two-Factor Authentication</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  name="twoFactorEnabled"
                  checked={formData.twoFactorEnabled}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    twoFactorEnabled: e.target.checked
                  }))}
                />
                <span>Enable Two-Factor Authentication</span>
              </div>
            </div>
            <div className="form-group">
              <label>Terms and Conditions</label>
              <div className="terms-acceptance">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    termsAccepted: e.target.checked
                  }))}
                  required
                />
                <span>
                  I agree to the Terms and Conditions of the platform
                </span>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="kyc-verification-container">
      <form onSubmit={handleSubmit} className="kyc-form">
        <div className="step-indicator">
          {[1, 2, 3, 4].map(step => (
            <div 
              key={step} 
              className={`step ${currentStep === step ? 'active' : currentStep > step ? 'completed' : ''}`}
            >
              Step {step}
            </div>
          ))}
        </div>

        {renderStep()}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button 
              type="button" 
              onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
              className="prev-btn"
            >
              Previous
            </button>
          )}
          
          {currentStep < 4 ? (
            <button 
              type="button" 
              onClick={handleNextStep}
              className="next-btn"
            >
              Next
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={loading}
              className="submit-btn"
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : "Complete Verification"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default KYCVerification;