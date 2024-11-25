const mongoose = require('mongoose');
const connectDB = require('../config/connection');
const { Recipe, MealPlan } = require('../models');

const seedDatabase = async () => {
  await connectDB();

  await Recipe.deleteMany({});
  await MealPlan.deleteMany({});

  const recipes = await Recipe.insertMany([
    {
      title: 'Spaghetti Bolognese',
      ingredients: ['Spaghetti', 'Ground beef', 'Tomato sauce', 'Garlic', 'Onion'],
      instructions: 'Cook spaghetti. Prepare sauce. Mix together.',
      prepTime: 30,
    },
    {
      title: 'Chicken Salad',
      ingredients: ['Chicken', 'Lettuce', 'Tomatoes', 'Cucumbers', 'Dressing'],
      instructions: 'Grill chicken. Toss with vegetables and dressing.',
      prepTime: 15,
    },
  ]);

  const mealPlan = await MealPlan.create({
    date: new Date(),
    recipes: recipes.map((recipe) => recipe._id),
  });

  console.log('Seeded database with recipes and meal plan!');
  process.exit(0);
};

seedDatabase();

