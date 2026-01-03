import React from 'react';
import '../../styles/auth-shared.css';
// Import your central API hub
import api from '../api/api'; 
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Changed 'axios' to 'api' to use your Vercel/Local environment variables
      // We removed { withCredentials: true } because it's already in your api.js
      const response = await api.post("/api/auth/food-partner/login", {
        email,
        password
      });

      console.log("Login Successful:", response.data);
      
      // Redirect to create food page after login
      navigate("/create-food"); 

    } catch (error) {
      // Handle errors (like wrong password) so the app doesn't crash
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-login-title">
        <header>
          <h1 id="partner-login-title" className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="business@example.com" 
              autoComplete="email" 
              required 
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Password" 
              autoComplete="current-password" 
              required 
            />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New partner? <a href="/food-partner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;