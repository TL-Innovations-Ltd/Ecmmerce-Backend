const express = require('express');
const router = express.Router();
const userController = require('./controllers/controllers');
const communityController = require('./controllers/community_controller');
const authUser = require('../../../src/middleware/user_verify');
const upload = require('../../../src/middleware/multer');


// Public routes
// router.post('/signup', userController.signup);
// router.post('/login', userController.login);

// // Example of a protected route
router.get('/profile', authUser, userController.getUserProfile);   // checked

// Update profile route (protected)
router.put('/profile', authUser, userController.updateProfile);  

// Update profile picture route (protected)

router.put('/profile/picture',    // checked
  authUser, 
  upload.single('profilePicture'),
  userController.updateProfilePicture
);

// Remove profile picture route (protected)
router.delete('/profile/picture', authUser, userController.removeProfilePicture);  //checked

// Favorite products routes
router.post('/favorites/add', authUser, userController.addFavorite);
router.post('/favorites/remove', authUser, userController.removeFavorite);

// Contact Us routes
router.post('/contact', authUser, userController.submitContactForm);
router.get('/contact-messages', userController.getContactMessages);

// Distributor Contact routes
router.post('/distributor/contact', authUser, userController.submitDistributorContact);
router.get('/distributor/contact', userController.getDistributorContacts);

// Community Subscription routes
router.post('/community/subscribe', communityController.subscribeToCommunity);
router.get('/community/subscriptions', communityController.getCommunitySubscriptions);

module.exports = router;
