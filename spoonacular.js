const axios = require('axios');

const apiKey = process.env.SPOONACULAR_API_KEY;
const baseURL = 'https://api.spoonacular.com/recipes';

const spoonacular = axios.create({
  baseURL,
  params: { apiKey },
});

module.exports = {
  searchRecipes: async (query) => {
    try {
      const response = await spoonacular.get('/complexSearch', {
        params: {
          query,
          number: 10, // Number of results
        },
      });
      return response.data.results;
    } catch (err) {
      console.error('Error fetching recipes:', err.message);
      return [];
    }
  },
  getRecipeDetails: async (id) => {
    try {
      const response = await spoonacular.get(`/${id}/information`);
      return response.data;
    } catch (err) {
      console.error('Error fetching recipe details:', err.message);
      return null;
    }
  },
};