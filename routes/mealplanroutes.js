const router = require('express').Router();
const MealPlan = require('../../models/MealPlan');

// Get all meal plans for a user
router.get('/', async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ userId: req.session.userId });
    res.json(mealPlans);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new meal plan
router.post('/', async (req, res) => {
  try {
    const newMealPlan = await MealPlan.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(201).json(newMealPlan);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a meal plan
router.put('/:id', async (req, res) => {
  try {
    const updatedMealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMealPlan);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a meal plan
router.delete('/:id', async (req, res) => {
  try {
    await MealPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal plan deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

const { getRecipeDetails } = require('../../utils/spoonacular');

router.put('/:id/add-recipe/:recipeId', async (req, res) => {
  try {
    const recipe = await getRecipeDetails(req.params.recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    const updatedMealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          recipes: {
            title: recipe.title,
            ingredients: recipe.extendedIngredients.map((ing) => ing.original),
            instructions: recipe.instructions,
            apiId: req.params.recipeId,
          },
        },
      },
      { new: true }
    );
    res.json(updatedMealPlan);
  } catch (err) {
    res.status(500).json({ message: 'Error adding recipe to meal plan', error: err.message });
  }
});

module.exports = router;
