import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user data is in localStorage
        const userData = localStorage.getItem('user');
        setIsLoggedIn(!!userData); // Set to true if user data exists
    }, []);

    return (
        <header>
            <h2><Link to="/">Delights</Link></h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipes">All Recipe</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
                {isLoggedIn ? (
                    <li><Link to="/logout">Logout</Link></li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
                {/* <li className="search-container">
                    <IoIosSearch className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search recipes" 
                        className="search-input" 
                    />
                </li> */}
            </ul>
        </header>
    );
}
