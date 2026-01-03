import React from 'react';
import '../../styles/auth-shared.css';
// ✅ FIX: Using 'apoi' to match your actual folder structure
import api from '../../apoi/api.js'; 
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Use the central 'api' instance for environment variable support
      const response = await api.post("/api/auth/food-partner/login", {
        email,
        password
      });

      console.log("Login Successful:", response.data);

      // ✅ CRITICAL FIX: Save the token to stop 401 Unauthorized errors
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Helps the frontend know this is a partner account
        localStorage.setItem('role', 'partner'); 
      }
      
      // Redirect to the dashboard/create page
      navigate("/create-food"); 

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" required />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Password" required />
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