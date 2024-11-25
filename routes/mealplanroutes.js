const express = require('express');
const mealPlanController = require('../controllers/mealPlanController');

const router = express.Router();

router.get('/new', mealPlanController.renderMealPlanForm);    // Form for creating new meal plan
router.post('/', mealPlanController.createMealPlan);       // CREATE
router.get('/', mealPlanController.getAllMealPlans);       // READ all
router.get('/:id', mealPlanController.getMealPlanById);    // READ one
router.put('/:id', mealPlanController.updateMealPlan);     // UPDATE
router.delete('/:id', mealPlanController.deleteMealPlan);  // DELETE
router.get('/mealplans', mealPlanController.renderMealPlans);         // List all meal plans
router.get('/:id', mealPlanController.renderMealPlan);        // View a single meal plan
router.get('/:id/edit', mealPlanController.renderEditMealPlanForm);

module.exports = router;