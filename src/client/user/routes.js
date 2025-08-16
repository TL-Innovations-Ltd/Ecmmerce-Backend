const express = require('express');
const router = express.Router();
const userController = require('./controllers/controllers');
const communityController = require('./controllers/community_controller');
const authUser = require('../../../src/middleware/user_verify');
const upload = require('../../../src/middleware/multer');
const analyticsController = require('./controllers/analytics.controller');
const brochureController = require('./controllers/brochure.controller');
const { cache } = require('../../utils/redisCache');

const FIVE_MINUTES = 5 * 60; // 5 minutes in seconds

router.get('/profile', authUser, cache(FIVE_MINUTES, 'user'), userController.getUserProfile); // caches for 5 minutes

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

// Analytics & Telemetry routes
router.post('/slide_shows/analytics', analyticsController.saveAnalytics);
router.get('/slide_shows/analytics', analyticsController.getAnalytics);

// Brochure email route (Limiai.co)
router.post('/brochure_email', brochureController.requestBrochure);
router.get('/brochure_email', brochureController.getBrochureRequests);

module.exports = router;
