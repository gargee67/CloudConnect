import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

const CustomAlert = ({ variant = 'default', icon: Icon, children }) => (
  <div className={`flex items-center gap-3 p-4 rounded-lg ${
    variant === 'destructive' 
      ? 'bg-red-50 border border-red-500 text-red-600' 
      : 'bg-emerald-50 border border-emerald-500 text-emerald-600'
  }`}>
    {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
    <p className="text-sm font-medium">{children}</p>
  </div>
);

const InputField = ({ label, id, type = "text", icon: Icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-[#0d2849] mb-1.5" htmlFor={id}>
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        className="block w-full rounded-lg border border-[#9bbfef] px-4 py-2.5 text-[#0d2849] placeholder:text-[#57636c] focus:border-[#164d8f] focus:ring-1 focus:ring-[#164d8f] sm:text-sm transition-colors"
        {...props}
      />
      {Icon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {Icon}
        </div>
      )}
    </div>
  </div>
);

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return false;
    }
    
    if (!isLogin && (!formData.firstName || !formData.lastName || !formData.phone)) {
      setError('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('Password must contain at least 8 characters, including uppercase, lowercase, number and special character');
      return false;
    }

    if (!isLogin) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError('Please enter a valid 10-digit phone number');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const endpoint = isLogin ? 
        `${import.meta.env.VITE_API_BASE_URL}/auth/login` : 
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (isLogin) {
        setSuccess('Login successful!');
      } else {
        setIsModalOpen(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2849] via-[#164d8f] to-[#5194e4] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-[#0d2849] p-4 rounded-lg inline-block mb-6">
              <img 
                src="/logo.png" 
                alt="Company Logo" 
                className="h-12 mx-auto"
              />
            </div>
            <h2 className="text-2xl font-semibold text-[#0d2849]">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-[#57636c] text-sm">
              {isLogin ? 'Sign in to access your account' : 'Fill in your information to get started'}
            </p>
          </div>

          {(error || success) && (
            <div className="pt-2">
              {error && (
                <CustomAlert variant="destructive" icon={AlertCircle}>
                  {error}
                </CustomAlert>
              )}
              {success && (
                <CustomAlert icon={CheckCircle2}>
                  {success}
                </CustomAlert>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                />
                <InputField
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>
            )}
            
            <InputField
              label="Email Address"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
            />

            {!isLogin && (
              <InputField
                label="Phone Number"
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="9000012345"
              />
            )}

            <InputField
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#57636c] hover:text-[#0d2849] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#164d8f] text-white rounded-lg font-medium hover:bg-[#0d2849] focus:outline-none focus:ring-2 focus:ring-[#5194e4] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#164d8f] hover:text-[#0d2849] font-medium hover:underline transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 text-center max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold text-[#0d2849] mb-4">Registration Successful!</h2>
            <p className="text-[#57636c] mb-6">You can now log in to your account.</p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsLogin(true);
              }}
              className="bg-[#164d8f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d2849] transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPages;