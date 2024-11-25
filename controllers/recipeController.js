const express = require('express');
const Recipe = require('../models');
const mongoose = require('mongoose');

// Route to render homepage (if needed, you can move this to a different controller if necessary)
const renderHomepage = (req, res) => {
  res.render('home', { title: 'Welcome to Meal Planner' });
};

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.redirect('/recipes');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe', details: error.message });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().lean(); // Fetch plain objects
    res.render('recipes', { recipes }); // Render recipes page with recipes
  } catch (error) {
    res.status(500).send('Error fetching recipes');
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid Recipe ID');
    }

    const recipe = await Recipe.findById(id).lean();
    if (!recipe) {
      return res.status(404).render('error', { message: 'Recipe not found' });
    }

    res.render('recipes/show', { recipe });
  } catch (err) {
    res.status(400).render('error', { message: err.message });
  }
};

// Render the edit form for a specific recipe
const renderEditRecipeForm = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).lean();
    if (!recipe) {
      return res.status(404).render('error', { message: 'Recipe not found' });
    }
    res.render('recipes/edit', { recipe }); // Render the edit view and pass the recipe data
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to load recipe' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) {
      return res.status(404).render('error', { message: 'Recipe not found' });
    }
    res.redirect(`/recipes/${req.params.id}`); // Redirect to the updated recipe's detail page
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to update recipe', details: err.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.redirect('/recipes');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe', details: error.message });
  }
};

// Render the recipe form (for creating a new recipe)
const renderRecipeForm = (req, res) => {
  res.render('recipes/new', { title: 'Create a New Recipe' });
};

// Exporting all functions together
module.exports = {
  renderHomepage,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  renderEditRecipeForm,
  updateRecipe,
  deleteRecipe,
  renderRecipeForm
};
