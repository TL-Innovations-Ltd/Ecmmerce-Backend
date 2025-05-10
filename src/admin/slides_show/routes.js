const express = require('express');
const router = express.Router();
const SlideshowController = require('./controllers/slide-show_controller');

// Create or Update Slideshow
router.post('/slideshows', SlideshowController.createOrUpdateSlideshow);

// Get Slideshow by ID
router.get('/slideshows/:id', SlideshowController.getSlideshowById);

// Get Slideshows by Customer ID
router.get('/customers/:customerId/slideshows', SlideshowController.getSlideshowsByCustomerId);

// Delete Slideshow
router.delete('/slideshows/:id', SlideshowController.deleteSlideshow);

module.exports = router;