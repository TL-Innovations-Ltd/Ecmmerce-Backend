const express = require('express');
const router = express.Router();
const userController = require('./controllers/controllers');
const authUser = require('../../middleware/user_verify');
const upload = require('../../middleware/multer');


// Public routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Example of a protected route
router.get('/profile', authUser, userController.getUserProfile);

// Update profile route (protected)
router.put('/profile', authUser, userController.updateProfile);

// Update profile picture route (protected)

router.put('/profile/picture', 
  authUser, 
  upload.single('profilePicture'),
  userController.updateProfilePicture
);

// Remove profile picture route (protected)
router.delete('/profile/picture', authUser, userController.removeProfilePicture);

// Favorite products routes
router.post('/favorites/add', authUser, userController.addFavorite);
router.post('/favorites/remove', authUser, userController.removeFavorite);

// Contact Us routes
router.post('/contact', authUser, userController.submitContactForm);
router.get('/contact-messages', authUser, userController.getContactMessages);

// Distributor Contact routes
router.post('/distributor/contact', authUser ,  userController.submitDistributorContact);
router.get('/distributor/contact', authUser, userController.getDistributorContacts);

module.exports = router;
