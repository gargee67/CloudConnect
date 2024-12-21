import React, { useState } from 'react';
import { ArrowRight, Wallet } from 'lucide-react';

function SignUp() {

    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      walletAddress: ''
    });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formData);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    
    return (
      <div className="min-h-screen relative overflow-hidden bg-[#131313]">
        {/* Background Circles */}
        <div className="absolute inset-0">
          <div className="absolute animate-[pulse_4s_ease-in-out_infinite] w-96 h-96 -top-10 -left-10 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute animate-[pulse_6s_ease-in-out_infinite] w-96 h-96 top-1/2 right-0 bg-pink-600/10 rounded-full blur-3xl"></div>
          <div className="absolute animate-[pulse_5s_ease-in-out_infinite] w-96 h-96 bottom-0 left-1/3 bg-pink-400/10 rounded-full blur-3xl"></div>
        </div>
    
        {/* Form Container */}
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="bg-[#1313131a] backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-pink-500/20 
            animate-[fadeIn_0.5s_ease-out] hover:shadow-pink-500/10 transition-all duration-300 hover:scale-[1.01]">
            
            {/* Form Header */}
            <div className="text-center mb-8 animate-[slideDown_0.5s_ease-out]">
              <h1 className="text-3xl font-bold text-pink-500 mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-pink-500/70">
                {isSignUp ? 'Join our funding platform' : 'Sign in to your account'}
              </p>
            </div>
    
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="animate-[slideUp_0.5s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
                <label className="block text-sm font-medium text-pink-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1313131a] border border-pink-500/20 text-pink-500 
                    placeholder-pink-500/30 focus:outline-none focus:border-pink-500 focus:ring-1 
                    focus:ring-pink-500 transition-all"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>
    
              {/* Password Input */}
              <div className="animate-[slideUp_0.5s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
                <label className="block text-sm font-medium text-pink-500 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1313131a] border border-pink-500/20 text-pink-500 
                    placeholder-pink-500/30 focus:outline-none focus:border-pink-500 focus:ring-1 
                    focus:ring-pink-500 transition-all"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
    
              {isSignUp && (
                <>
                  {/* Confirm Password Input */}
                  <div className="animate-[slideUp_0.5s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
                    <label className="block text-sm font-medium text-pink-500 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#1313131a] border border-pink-500/20 text-pink-500 
                        placeholder-pink-500/30 focus:outline-none focus:border-pink-500 focus:ring-1 
                        focus:ring-pink-500 transition-all"
                      placeholder="Confirm your password"
                      onChange={handleChange}
                    />
                  </div>
    
                  {/* Wallet Address Input */}
                  <div className="animate-[slideUp_0.5s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
                    <label className="block text-sm font-medium text-pink-500 mb-2">
                      Wallet Address
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5" />
                      <input
                        type="text"
                        name="walletAddress"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#1313131a] border border-pink-500/20 text-pink-500 
                          placeholder-pink-500/30 focus:outline-none focus:border-pink-500 focus:ring-1 
                          focus:ring-pink-500 transition-all"
                        placeholder="Enter your wallet address"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
    
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold 
                  hover:bg-pink-500 transition-all flex items-center justify-center group
                  animate-[slideUp_0.5s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
    
            {/* Toggle Form Type */}
            <div className="mt-6 text-center animate-[fadeIn_0.5s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-pink-500/70 hover:text-pink-500 transition-colors"
              >
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );

}

export default SignUp;