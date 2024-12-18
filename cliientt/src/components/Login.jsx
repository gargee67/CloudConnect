import React, { useState, useEffect } from 'react';
import { account } from '../appwrite'; // Import account from appwrite setup
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession('current'); // Get the current session
        if (session) {
          navigate("/dashboard"); // Redirect to the dashboard if a session exists
        }
      } catch (error) {
        console.log("No active session found.");
      }
    };

    checkSession(); // Call the checkSession function
  }, [navigate]); // Dependency array ensures the check happens only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log("User logged in:", response);
      navigate("/dashboard"); // Redirect to the dashboard on successful login
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Login to Your Account</h1>
        <p>Enter your credentials to access your account</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
