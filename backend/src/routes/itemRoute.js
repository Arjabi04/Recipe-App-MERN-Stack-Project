const express = require('express');
const router = express.Router();

const ItemController = require("../controllers/itemController")
router.get("/all-recipes",ItemController.getAllRecipes)
// router.get("/items",ItemController.getSearchedItems)
router.get("/items/:id",ItemController.getSingleItem) 
router.post('/items/add', ItemController.addRecipe);
router.put('/edit-recipe/:id', ItemController.editRecipe);
router.delete('/delete-recipe/:id', ItemController.deleteRecipe);
module.exports = router; 