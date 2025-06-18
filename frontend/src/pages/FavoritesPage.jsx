import React, { useState, useEffect } from 'react';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState(new Set());
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedFavorites = localStorage.getItem('fav');
        if (savedFavorites) {
            setFavorites(new Set(JSON.parse(savedFavorites)));
        }
    }, []);

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            const recipes = [];
            for (let id of favorites) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/items/${id}`);
                    recipes.push(response.data);
                } catch (error) {
                    console.error(`Error fetching recipe with ID ${id}:`, error);
                }
            }
            setFavoriteRecipes(recipes);
        };

        if (favorites.size > 0) {
            fetchFavoriteRecipes();
        }
    }, [favorites]);

    return (
        <div className="favorites-container">
            <h1>Your Favorites</h1>
            <div className="card-container">
                {favoriteRecipes.length > 0 ? (
                    favoriteRecipes.map(item => (
                        <div 
                            key={item._id} 
                            className="card"
                            onClick={() => navigate(`/recipes/${item._id}`)} // Navigate to recipe detail page
                        >
                            <img 
                                src={item.thumbnail_image} 
                                alt={item.name} 
                                width="120px" 
                                height="130px" 
                                style={{ objectFit: 'cover' }} 
                            />
                            <div className="card-body">
                                <div className="title">{item.name}</div>
                                <div className="icons">
                                    <div className="timer">
                                        <BsStopwatchFill />
                                        <span>{item.more[0].cook_time}</span>
                                    </div>
                                    <div className="heart">
                                        <FaHeart color="red" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>You have no favorite recipes yet.</p>
                )}
            </div>
        </div>
    );
}
