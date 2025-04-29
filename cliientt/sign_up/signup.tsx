
/*import React, { useState, useEffect } from 'react';
import { useContract, useAddress } from '@thirdweb-dev/react'; // Import the useAddress hook from Thirdweb
import { ArrowRight, Wallet, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between SignUp and SignIn
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [isModalOpen, setIsModalOpen] = useState(false); // State for success modal
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    walletAddress: '',
  });

  const navigate = useNavigate();

  // Initialize Thirdweb contract instance
  const { contract } = useContract('0x825fd52b432e6AeD5Eb5b098AE0A618ea3Dc006a
  '); // Replace with your contract address

  // Get the connected wallet address using Thirdweb's hook
  const address = useAddress();

  // Update wallet address automatically on connection
  useEffect(() => {
    if (address) {
      setFormData((prevData) => ({ ...prevData, walletAddress: address }));
    }
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      // SignUp logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        setIsLoading(false);
        return;
      }

      try {
        await contract?.call('registerUser', [
          formData.email,
          formData.password,
          formData.confirmPassword,
          formData.walletAddress,
        ]);
        setIsLoading(false);
        setIsModalOpen(true); // Open modal after successful registration
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Failed to create account. Please try again.');
        setIsLoading(false);
      }
    } else {
      // SignIn logic
      try {
        const tx = await contract?.call('signIn', [
          formData.email,
          formData.password,
        ]);

        if (tx) {
          console.log('Login successful:', tx);
          alert('Successfully signed in!');
          localStorage.setItem('useremail', formData.email);
          localStorage.setItem('walletAddress', formData.walletAddress);
          navigate('/');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#131313]">
     
      <div className="absolute inset-0">
        <div className="absolute animate-pulse w-96 h-96 -top-10 -left-10 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute animate-pulse w-96 h-96 top-1/2 right-0 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute animate-pulse w-96 h-96 bottom-0 left-1/3 bg-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#1313131a] backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-pink-500/20 hover:shadow-pink-500/10 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-500 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-pink-500/70">
              {isSignUp ? 'Join our funding platform' : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-pink-500 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1313131a] border border-pink-500/20 text-pink-500 placeholder-pink-500/30 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-500 mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1313131a] border border-pink-500/20 text-pink-500 placeholder-pink-500/30 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>

            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-pink-500 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#1313131a] border border-pink-500/20 text-pink-500 placeholder-pink-500/30 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-pink-500 mb-2">Wallet Address</label>
                  <input
                    type="text"
                    name="walletAddress"
                    value={formData.walletAddress}
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-[#1313131a] border border-pink-500/20 text-pink-500 placeholder-pink-500/30 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                    placeholder="Wallet Address"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-all flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin h-5 w-5" /> : isSignUp ? 'Create Account' : 'Sign In'}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-pink-500/70 hover:text-pink-500 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h2 className="text-xl font-bold text-pink-500 mb-4">Registration Successful!</h2>
            <p className="text-gray-700 mb-6">You can now log in to your account.</p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSignUp(false); // Switch to SignIn form
              }}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
*/
import React, { useState, useEffect } from 'react';
import { useContract, useAddress } from '@thirdweb-dev/react';
import { ArrowRight, Wallet, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    walletAddress: '',
  });

  const navigate = useNavigate();
  const { contract } = useContract('0x825fd52b432e6AeD5Eb5b098AE0A618ea3Dc006a');
  const address = useAddress();

  useEffect(() => {
    if (address) {
      setFormData((prevData) => ({ ...prevData, walletAddress: address }));
    }
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        setIsLoading(false);
        return;
      }

      try {
        await contract?.call('registerUser', [
          formData.email,
          formData.password,
          formData.confirmPassword,
          formData.walletAddress,
        ]);
        setIsLoading(false);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Failed to create account. Please try again.');
        setIsLoading(false);
      }
    } else {
      try {
        const tx = await contract?.call('signIn', [
          formData.email,
          formData.password,
        ]);

        if (tx) {
          console.log('Login successful:', tx);
          localStorage.setItem('useremail', formData.email);
          localStorage.setItem('walletAddress', formData.walletAddress);
          navigate('/');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400">
            {isSignUp ? 'Join our funding platform' : 'Sign in to continue'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-pink-400 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-pink-600/30 text-white 
                         focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-pink-400 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-pink-600/30 text-white 
                         focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-pink-600/30 text-white 
                             focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="Confirm your password"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Wallet Address</label>
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-pink-600/30 text-gray-400 
                             cursor-not-allowed"
                  placeholder="Wallet Address"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white 
                       py-3 rounded-xl font-semibold hover:opacity-90 transition-all 
                       flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin h-5 w-5" />
            ) : (
              <>
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-pink-400 hover:text-pink-500 transition-colors"
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-2xl p-8 text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-pink-500 mb-4">Registration Successful!</h2>
            <p className="text-gray-300 mb-6">You can now log in to your account.</p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSignUp(false);
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white 
                         px-6 py-3 rounded-xl hover:opacity-90 transition-all"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
