// src/pages/LogoutPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user email is stored in localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setEmail(user.email); // Pre-fill email from localStorage
        }
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            
            if (response.data && response.data.success) {
                localStorage.removeItem('user'); // Clear user data from localStorage
                navigate('/'); // Redirect to login page after logout
            } else {
                alert('Invalid email or password. Please try again.'); // Show error if credentials are incorrect
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert(error.response ? error.response.data.message : 'Error logging in. Please try again.');
        }
    };

    return (
        <div className="logout-container">
            <h2>Logout from Delights</h2>
            <form onSubmit={handleLogout}>
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
                <button type="submit" className="logout-button">Confirm Logout</button>
            </form>
        </div>
    );
}
