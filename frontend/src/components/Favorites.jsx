import React, { useState, useEffect } from 'react';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
        // Assuming you have a way to fetch or access all recipes (e.g., an API or passed as props)
        const allRecipes = []; // Replace this with the actual recipes data

        const filteredFavorites = allRecipes.filter(recipe => 
            favorites.has(recipe._id)
        );
        setFavoriteRecipes(filteredFavorites);
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
