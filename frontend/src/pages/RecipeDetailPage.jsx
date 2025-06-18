import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function RecipeDetailPage() {
    const { id } = useParams(); // Get recipe ID from URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/items/${id}`);
                console.log('Fetched Recipe:', response.data); // Log the fetched recipe
                setRecipe(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                setError('Failed to load recipe details');
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!recipe) return <div>No recipe found</div>;

    return (
        <div className="recipe-detail-container">
            <img src={recipe.thumbnail_image} alt={recipe.name} />
            <h1>{recipe.name}</h1>

            <div className="recipe-details">
                {/* Instructions Section */}
                <div className="instructions">
                     <h2>Instructions</h2>
                     {recipe.instruction.split(/(?<=\.)\s+/).map((step, index) => (
                        step.trim().length > 0 && (
                            <div key={index}>
                                {step.replace(/^\d+\.\s*/, '')}
                            </div>
                        )
                    ))}
                
                    <div className="additional-info">
                {/* <h4>Additional Info</h4> */}
                <ul>
                    {recipe.more.map((info, index) => (
                        <React.Fragment key={index}>
                            <li>Prep Time: {info.prep_time}</li>
                            <li>Cook Time: {info.cook_time}</li>
                            <li>Servings: {info.servings}</li>
                            <li>Difficulty: {info.difficulty}</li>
                        </React.Fragment>
                    ))}
                </ul>
                    <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
                </div>
                </div>

                {/* Ingredients Section */}
                <div className="ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredient.map((ing, index) => (
                            <li key={index}>{ing.name} - {ing.quantity}</li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}
