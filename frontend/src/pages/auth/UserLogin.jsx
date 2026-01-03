import React from 'react';
import '../../styles/auth-shared.css';
// We use the central 'api' instance to handle the URL switch for Vercel
import api from '../api/api'; 
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Changed 'axios' to 'api'
      // Removed manual { withCredentials: true } as it is defined in api.js
      const response = await api.post("/api/auth/user/login", {
        email,
        password
      });

      console.log("User Login Successful:", response.data);
      navigate("/"); // Redirect to home after login

    } catch (error) {
      // Logic to catch 401/500 errors so the UI stays stable
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-login-title">
        <header>
          <h1 id="user-login-title" className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your food journey.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="you@example.com" 
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
              placeholder="••••••••" 
              autoComplete="current-password" 
              required 
            />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;