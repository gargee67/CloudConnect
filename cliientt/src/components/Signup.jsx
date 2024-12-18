import React, { useState, useEffect } from "react";
import { account } from "../appwrite";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Enhanced email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength evaluation
  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  // Password validation with more comprehensive rules
  const isValidPassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Check session on mount to prevent logged-in users from accessing signup
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession('current');
        if (session) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("No active session found.");
      }
    };
    checkSession();
  }, [navigate]);

  // Update password strength as user types
  useEffect(() => {
    setPasswordStrength(evaluatePasswordStrength(password));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Validate email
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return;
    }

    setLoading(true);

    try {
      // Create user using Appwrite
      const response = await account.create("unique()", email, password);
      console.log("User created:", response);

      // Optional: Create email verification session
      await account.createEmailPasswordSession(email, password);

      // Redirect to login page with success message
      navigate("/kyc", { 
        state: { 
          message: "Account created successfully! Please log in." 
        } 
      });
    } catch (error) {
      console.error("Error creating user:", error);
      
      // More specific error handling
      if (error.code === 409) {
        setError("An account with this email already exists.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Create an Account</h1>
        <p>Sign up to get started</p>
        <form 
          className="signup-form" 
          onSubmit={handleSubmit}
          aria-label="Signup Form"
        >
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              autoComplete="new-password"
            />
            <div 
              className="password-strength" 
              style={{
                width: `${passwordStrength * 20}%`,
                backgroundColor: 
                  passwordStrength <= 2 ? '#ff4136' : 
                  passwordStrength <= 4 ? '#ff851b' : 
                  '#2ecc40'
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-required="true"
              autoComplete="new-password"
            />
          </div>
          {error && <p className="error-message" role="alert">{error}</p>}
          <button 
            type="submit" 
            className="signup-button" 
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <div className="footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;