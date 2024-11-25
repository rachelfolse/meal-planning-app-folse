const express = require('express');
const { engine } = require('express-handlebars');
const connectDB = require('./config/connection');
const { Recipe, MealPlan } = require('./models');
const path = require('path');
require('dotenv').config();
const methodOverride = require('method-override');
const app = express();

app.use(methodOverride('_method'));
const recipeRoutes = require('./routes/recipeRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('home', { title: 'Meal Planning App' });
})

// Set up Handlebars
app.engine(
  'handlebars',
  engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/mealplans', mealPlanRoutes);
app.use('/mealplans', mealPlanRoutes);
app.use('/recipes', recipeRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

