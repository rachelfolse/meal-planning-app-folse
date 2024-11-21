const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    ingredients: [String],
    instructions: String,
    apiId: String, // Optional, if linked to an external API
  });

const MealPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  recipes: [RecipeSchema], // Embedding recipes as subdocuments
});

const MealPlan = mongoose.model('MealPlan', MealPlanSchema);
module.exports = MealPlan;
