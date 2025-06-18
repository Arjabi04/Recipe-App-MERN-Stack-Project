import React, { useState, useEffect } from 'react';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLoaderData, useNavigate } from 'react-router-dom';

const categories = ['entree', 'breakfast', 'lunch', 'drinks', 'desserts'];

export default function RecipeItems() {
    const allRecipe = useLoaderData();
    const [selectedCategory, setSelectedCategory] = useState('all'); 
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('fav'); // Changed key to 'fav'
        return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
    });
    const navigate = useNavigate(); 

    const filteredRecipes = selectedCategory === 'all'
        ? allRecipe
        : allRecipe.filter(recipe =>
            recipe.category.toLowerCase() === selectedCategory
        );

    const handleToggleFavorite = (id) => {
        setFavorites(prevFavorites => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            localStorage.setItem('fav', JSON.stringify([...newFavorites])); // Changed key to 'fav'
            return newFavorites;
        });
    };

    return (
        <div className="arecipe-container">
            <div className="selected-category">
                {selectedCategory === 'all' 
                    ? 'All Recipes' 
                    : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                }
            </div>
            <div className="category-buttons">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={selectedCategory === 'all' ? 'active' : ''}
                >
                    All Recipes
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? 'active' : ''}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
            <div className="card-container">
                {filteredRecipes.map((item) => (
                    <div 
                        key={item._id} 
                        className="card"
                        onClick={() => navigate(`/recipes/${item._id}`)} 
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
                                <div 
                                    className="heart" 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        handleToggleFavorite(item._id);
                                    }}
                                >
                                    {favorites.has(item._id) ? <FaHeart color="red" /> : <FaRegHeart />}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
