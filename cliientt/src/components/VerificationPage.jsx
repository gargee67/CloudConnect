import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { account } from '../appwrite'; // Ensure this is correctly set up

const VerificationPage = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('user_id');

    if (secret && userId) {
      // Call Appwrite API to verify the email
      account.updateVerification(userId, secret)
        .then(() => {
          console.log('Email verified successfully');
          // Redirect to dashboard or another page after successful verification
        })
        .catch((error) => {
          console.error('Verification failed', error);
        });
    } else {
      console.log('Invalid verification parameters');
    }
  }, [location]);

  return (
    <div>
      <h2>Verifying your email...</h2>
      {/* Optionally, display a loading spinner or a message */}
    </div>
  );
};

export default VerificationPage;
