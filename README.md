# Recipe-App-MERN-Stack-Project
A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to browse, add, view, and manage their favorite recipes. Includes user authentication and category-based filtering.


## 🔧 Features

- User Authentication – Register, login, logout  
- Browse Recipes – View all recipes with ingredients, steps, and tags  
- Add Recipes – Submit a recipe with ingredient and cooking details  
- View Single Recipe – Read full recipe info with images and metadata  
- Category Filtering – Filter recipes by meal type (e.g., lunch, dessert)  
- Favorites Page – Store and access your favorite recipes  

---

## 🖥 Tech Stack

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- CORS Middleware  

### Frontend
- React.js (React Router DOM)  
- Axios for HTTP requests  
- Basic CSS  

---

## 🌐 Frontend Routes

| Path             | Component             | Purpose                           |
|------------------|------------------------|------------------------------------|
| `/`              | Home                   | View all recipes                   |
| `/recipes`       | RecipeItems            | Browse recipes                     |
| `/recipes/:id`   | RecipeDetailPage       | View individual recipe             |
| `/login`         | LoginPage              | Login form                         |
| `/logout`        | LogoutPage             | Logout page                        |
| `/signup`        | SignupPage             | User registration                  |
| `/add-recipe`    | AddRecipePage          | Form to add new recipe             |
| `/favorites`     | FavoritesPage          | View and manage favorites          |

---

## 📡 API Endpoints

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/`                         | Root welcome route                 |
| POST   | `/api/auth/register`        | Register a new user                |
| POST   | `/api/auth/login`           | Login with credentials             |
| GET    | `/api/all-recipes`          | Get all recipe entries             |
| GET    | `/api/recipes/:id`          | Get a single recipe by ID          |
| POST   | `/api/recipes`              | Add new recipe                     |
| PUT    | `/api/recipes/:id`          | Update existing recipe             |
| DELETE | `/api/recipes/:id`          | Delete a recipe                    |
| GET    | `/api/category/:category`   | Get recipes by category            |

---
