import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddRecipePage() {
  const [name, setName] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [category, setCategory] = useState('');
  const [instruction, setInstruction] = useState('');
  const [tags, setTags] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [more, setMore] = useState([{ prep_time: '', cook_time: '', servings: '', difficulty: '', source: '' }]);
  const navigate = useNavigate();

  // Map category to menuId
  const categoryToMenuId = {
    'entree': 1,
    'breakfast': 2,
    'lunch': 3,
    'dessert': 4,
    'sides': 5,
    'drinks': 6
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleMoreChange = (index, field, value) => {
    const newMore = [...more];
    newMore[index][field] = value;
    setMore(newMore);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine menuId based on category
    const menuId = categoryToMenuId[category.toLowerCase()];

    if (!menuId) {
      alert('Invalid category selected.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/items/add', {
        menuId, // Automatic menuId based on category
        name,
        thumbnail_image: thumbnailImage,
        category,
        instruction,
        tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags into an array
        ingredients,
        more
      });

      if (response.data.success) {
        navigate('/'); // Redirect to home page or any other page
      } else {
        alert('Failed to add recipe. Please try again.');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Thumbnail Image URL:</label>
          <input
            type="text"
            value={thumbnailImage}
            onChange={(e) => setThumbnailImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="entree">Entree</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dessert">Dessert</option>
            <option value="sides">Sides</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>
        <div>
          <label>Instruction:</label>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setIngredients([...ingredients, { name: '', quantity: '' }])}
          >
            Add Ingredient
          </button>
        </div>
        <div>
          <label>Additional Info:</label>
          {more.map((info, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Preparation Time"
                value={info.prep_time}
                onChange={(e) => handleMoreChange(index, 'prep_time', e.target.value)}
              />
              <input
                type="text"
                placeholder="Cooking Time"
                value={info.cook_time}
                onChange={(e) => handleMoreChange(index, 'cook_time', e.target.value)}
              />
              <input
                type="text"
                placeholder="Servings"
                value={info.servings}
                onChange={(e) => handleMoreChange(index, 'servings', e.target.value)}
              />
              <input
                type="text"
                placeholder="Difficulty"
                value={info.difficulty}
                onChange={(e) => handleMoreChange(index, 'difficulty', e.target.value)}
              />
              <input
                type="text"
                placeholder="Source"
                value={info.source}
                onChange={(e) => handleMoreChange(index, 'source', e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
