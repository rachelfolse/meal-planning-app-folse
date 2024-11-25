const { MealPlan } = require('../models');

// Create a new Meal Plan
exports.createMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.create(req.body);
    res.redirect('/mealplans'); // Redirect to the list of meal plans
  } catch (err) {
    res.status(500).json({ error: 'Failed to create meal plan', details: err });
  }
};

// Get all Meal Plans
exports.getAllMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find().lean();
    res.render('mealplans', {mealPlans});
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve meal plans', details: err });
  }
};

exports.getMealPlanById = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id).lean();
    res.render('mealplans/show', { mealPlan });
  } catch (err) {
    res.render('error', { message: 'Meal plan not found' });
  }
};

exports.updateMealPlan = async (req, res) => {
  try {
    const updatedMealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMealPlan) {
      return res.status(404).render('error', { message: 'Meal plan not found' });
    }
    res.redirect(`/mealPlans/${req.params.id}`);
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to update meal plan', details: err });
  }
};

// Delete a Meal Plan
exports.deleteMealPlan = async (req, res) => {
  try {
    const deletedMealPlan = await MealPlan.findByIdAndDelete(req.params.id);
    if (!deletedMealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }
    res.redirect('/mealplans');
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete meal plan', details: err });
  }
};

// Render a form for creating or editing a Meal Plan
exports.renderMealPlanForm = async (req, res) => {
  res.render('mealplans/new');
};

exports.renderEditMealPlanForm = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id).lean();
    res.render('mealplans/edit', { mealPlan });
  } catch (err) {
    res.render('error', { message: 'Meal plan not found' });
  }
};

// Render all Meal Plans
exports.renderMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find();
    res.render('mealplans', { mealPlans });
  } catch (err) {
    res.status(500).send('Failed to render meal plans.');
  }
};

// Render a single Meal Plan
exports.renderMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    if (!mealPlan) {
      return res.status(404).send('Meal plan not found.');
    }
    res.render('mealplan', { mealPlan });
  } catch (err) {
    res.status(500).send('Failed to render meal plan.');
  }
};