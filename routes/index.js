const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const mealPlanRoutes = require('./api/mealPlanRoutes');

router.use('/api/users', userRoutes);
router.use('/api/meal-plans', mealPlanRoutes);

router.get('/', (req, res) => {
  res.render('home', { loggedIn: !!req.session.userId });
});

module.exports = router;
