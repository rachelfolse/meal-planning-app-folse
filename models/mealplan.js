const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  recipes: [{ type: String, required: true}], // References Recipe model
  description: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

const MealPlan = mongoose.model('MealPlan', MealPlanSchema);

module.exports = MealPlan;






