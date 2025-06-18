import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      
      if (response.data && response.data.success) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Navigate to the homepage or desired route
        navigate('/');
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response ? error.response.data.message : 'Error logging in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Delights</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}
