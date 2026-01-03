import React from 'react';
import '../../styles/auth-shared.css';
import api from '../../apoi/api.js';// Ensure this points to your api.js
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await api.post("/api/auth/user/login", {
        email,
        password
      });

      console.log("User Login Successful:", response.data);

      // ✅ FIX: Save the token to LocalStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      // ✅ FIX: Also save user info if needed for the UI
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      navigate("/"); 

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your food journey.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
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