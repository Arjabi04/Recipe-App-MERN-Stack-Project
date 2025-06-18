import React from 'react';
import { useNavigate } from 'react-router-dom';
import homepagepic from '../assets/homepagepic.jpg';
import RecipeItems from '../components/RecipeItems';

export default function Home() {
  const navigate = useNavigate();

  const handleShareRecipeClick = () => {
    navigate('/add-recipe'); // Redirect to the AddRecipePage
  };

  return (
    <>
      <section className="home">
        <div className="left">
          <h1>Welcome to Delights!</h1>
          <h4>
            Embark on a Culinary Journey: Explore, Share, and Indulge in a Diverse Collection of Recipes. Discover Delicious Creations Designed to Satisfy Every Taste and Occasion, Whether You're Trying New Flavors or Simply Enjoying the Art of Cooking.
          </h4>
          <button onClick={handleShareRecipeClick}>Share your recipe</button>
        </div>

        <div className="right">
          <img src={homepagepic} alt="Home" width="570px" height="700px" />
        </div>
      </section>
      <div className='recipe'>
        <RecipeItems />
      </div>
    </>
  );
}
