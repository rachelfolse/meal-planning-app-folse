const router = require('express').Router();
const User = require('../../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.userId = newUser._id;
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.checkPassword(req.body.password))) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }
    req.session.userId = user._id;
    res.json({ message: 'Logged in', user });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
