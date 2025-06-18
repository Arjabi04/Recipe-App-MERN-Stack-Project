const Item = require("../model/ItemModel");

const getAllRecipes = async (req, res) => {
    try {
        const result = await Item.find().sort({ createdAt: -1 });
        
        // Log the result to the console
        console.log("Items retrieved:", result);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error retrieving items:", error);
        res.status(500).json({ message: "An error occurred while fetching items." });
    }
};

const getSingleItem = async(req, res)=>{
    const {id} = req.params;
    try {
        const item = await Item.findById(id);
        res.json(item);
    } catch (error) {
        res.status(500).json({message:'no items found'});
        
    }
}

const addRecipe = async (req, res) => {
    try {
        const { name, thumbnail_image, category, instruction, tags, ingredients, more } = req.body;

        // Array to store validation errors
        const errors = [];

        // Define category to menuId mapping
        const categoryToMenuId = {
            'entree': 1,
            'breakfast': 2,
            'lunch': 3,
            'dessert': 4,
            'sides': 5,
            'drinks': 6
        };

        // Determine menuId based on category
        let menuId = categoryToMenuId[category.toLowerCase()];

        // Validate required fields and push to errors array if any issue
        if (!menuId) errors.push("category is required or invalid");
        if (!name) errors.push("name is required");
        if (!thumbnail_image) errors.push("thumbnail_image is required");
        if (!instruction) errors.push("instruction is required");

        // Check for ingredients array
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            errors.push("ingredients must be a non-empty array");
        } else {
            ingredients.forEach(ingredient => {
                if (!ingredient.name || !ingredient.quantity) {
                    errors.push("Each ingredient must have a name and quantity");
                }
            });
        }

        // Check for more array
        if (!Array.isArray(more) || more.length === 0) {
            errors.push("more must be a non-empty array");
        } else {
            more.forEach(moreDetail => {
                if (!moreDetail.prep_time || !moreDetail.cook_time || !moreDetail.servings || !moreDetail.difficulty || !moreDetail.source) {
                    errors.push("Each more detail must include prep_time, cook_time, servings, difficulty, and source");
                }
            });
        }

        // If there are errors, respond with the list of errors
        if (errors.length > 0) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required information',
                errors: errors
            });
        }

        // Create new recipe item
        const item = await Item.create({
            menuId,
            name,
            thumbnail_image,
            category,
            instruction,
            tags,           // Optional field
            ingredient: ingredients,  // Updated to handle array of ingredient objects
            more            // Updated to handle array of more details
        });

        // Send success response
        res.status(201).send({
            success: true,
            message: 'Recipe added successfully',
            item
        });
    } catch (error) {
        console.error('Error in adding recipe:', error);
        res.status(500).send({
            success: false,
            message: 'Error in adding recipe',
            error: error.message || error
        });
    }
};


const editRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, thumbnail_image, category, instruction, tags, ingredient, more } = req.body;

        // Array to store validation errors
        const errors = [];

        // Define category to menuId mapping
        const categoryToMenuId = {
            'entree': 1,
            'breakfast': 2,
            'lunch': 3,
            'desserts': 4,
            'sides': 5,
            'drinks': 6
        };

        // Determine menuId based on category
        let menuId = categoryToMenuId[category.toLowerCase()];
        
        // Validate required fields and push to errors array if any issue
        if (!menuId) errors.push("Invalid or missing category");
        if (!name) errors.push("name is required");
        if (!thumbnail_image) errors.push("thumbnail_image is required");
        if (!category) errors.push("category is required");
        if (!instruction) errors.push("instruction is required");

        // Return errors if any
        if (errors.length) {
            return res.status(400).send({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        // Find the existing recipe item by id
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).send({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Update the recipe with new data
        item.menuId = menuId;
        item.name = name;
        item.thumbnail_image = thumbnail_image;
        item.category = category;
        item.instruction = instruction;
        item.tags = tags;  // Optional field
        item.ingredient = ingredient; // Corrected field name
        item.more = more;

        // Save the updated recipe
        await item.save();

        // Send success response
        res.status(200).send({
            success: true,
            message: 'Recipe updated successfully',
            item
        });
    } catch (error) {
        console.error('Error in editing recipe:', error);
        res.status(500).send({
            success: false,
            message: 'Error in editing recipe',
            error: error.message || error
        });
    }
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the recipe by ID and delete it
        const item = await Item.findByIdAndDelete(id);

        // If the recipe is not found, return a 404 error
        if (!item) {
            return res.status(404).send({
                success: false,
                message: 'Recipe not found'
            });
        }

        // If deletion is successful, return a success message
        res.status(200).send({
            success: true,
            message: 'Recipe deleted successfully',
            item
        });
    } catch (error) {
        console.error('Error in deleting recipe:', error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting recipe',
            error: error.message || error
        });
    }
};


module.exports = {
    getAllRecipes,
    getSingleItem,
    addRecipe,
    editRecipe,
    deleteRecipe
};
