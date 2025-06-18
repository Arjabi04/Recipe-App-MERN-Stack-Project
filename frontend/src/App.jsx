import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import RecipeItems from './components/RecipeItems';
import MainNavigation from './components/MainNavigation';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import SignupPage from './pages/SignUpPage';
import AddRecipePage from './pages/AddRecipePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';

// Fetching data from the database
const getAllRecipes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/all-recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; 
  }
};

// Create browser router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: getAllRecipes,
      },
      {
        path: "/recipes",
        element: <RecipeItems />, 
        loader: getAllRecipes, 
      },
      {
        path: "/recipes/:id", 
        element: <RecipeDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/logout",
        element: <LogoutPage/>,
      },
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: '/signup',
        element: <SignupPage />, 
        
      },
      {
        path: '/add-recipe',
        element: <AddRecipePage/>,
      },
      {
         path:"/favorites",
          element:<FavoritesPage/>,
      },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
