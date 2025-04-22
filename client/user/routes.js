const express = require('express');

const router = express.Router();
const userController = require('./controllers/controllers');
const authUser = require('../../middleware/user_verify');

// Public routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Example of a protected route
router.get('/profile', authUser, (req, res) => {
  res.json({ sucess: true, user: req.user });
});

module.exports = router;
