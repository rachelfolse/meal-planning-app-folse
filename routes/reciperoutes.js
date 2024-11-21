const router = require('express').Router();
const { searchRecipes, getRecipeDetails } = require('../../utils/spoonacular');

// Search for recipes
router.get('/search', async (req, res) => {
  const query = req.query.q; // Search term
  if (!query) {
    return res.status(400).json({ message: 'Please provide a search term.' });
  }
  try {
    const recipes = await searchRecipes(query);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipes', error: err.message });
  }
});

// Get recipe details by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await getRecipeDetails(req.params.id);
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
      return;
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipe details', error: err.message });
  }
});

module.exports = router;

