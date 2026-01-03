import React, { useState } from 'react';
import '../../styles/auth-shared.css';
// ✅ FIX: Path changed from 'api' to 'apoi' to match your folder structure
import api from '../../apoi/api.js'; 
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/food-partner/register", formData);
      
      console.log("Partner Registration Successful:", response.data);

      // ✅ FIX: Save token so the next request is authorized
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'partner');
      }

      alert("Registration successful! Welcome aboard.");
      navigate("/create-food"); 

    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner with us</h1>
          <p className="auth-subtitle">Create a business account to start sharing food.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label>Full Name</label>
            <input name="name" type="text" onChange={handleChange} required />
          </div>
          <div className="field-group">
            <label>Business Name</label>
            <input name="businessName" type="text" onChange={handleChange} required />
          </div>
          <div className="field-group">
            <label>Email</label>
            <input name="email" type="email" onChange={handleChange} required />
          </div>
          <div className="field-group">
            <label>Phone Number</label>
            <input name="phoneNumber" type="text" onChange={handleChange} required />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input name="password" type="password" onChange={handleChange} required />
          </div>
          <button className="auth-submit" type="submit">Create Account</button>
        </form>
        <div className="auth-alt-action">
          Already a partner? <a href="/food-partner/login">Sign in here</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;