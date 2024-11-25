const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Routes for Recipe CRUD operations
router.get('/', recipeController.getAllRecipes); // List all recipes
router.get('/new', recipeController.renderRecipeForm); // Show the form to create a new recipe
router.post('/', recipeController.createRecipe); // Create a new recipe
router.get('/:id', recipeController.getRecipeById); // Show a single recipe
router.get('/:id/edit', recipeController.renderEditRecipeForm);
router.put('/:id', recipeController.updateRecipe); // Update a recipe
router.delete('/:id', recipeController.deleteRecipe); // Delete a recipe


// Render recipes page
router.get('/', (req, res) => {
    res.render('recipes', { title: 'Recipes Page', recipes: [] });
});

module.exports = router;


