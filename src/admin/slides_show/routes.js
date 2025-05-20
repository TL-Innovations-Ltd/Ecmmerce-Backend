const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const SlideshowController = require('./controllers/slide-show_controller');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/slideshow/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB per file
});

// Create or Update Slideshow
router.post('/slideshows', SlideshowController.createOrUpdateSlideshow);

// Get Slideshow by ID
router.get('/slideshows/:id', SlideshowController.getSlideshowById);

// Get Slideshows by Customer ID
router.get('/customers/:customerId/slideshows', SlideshowController.getSlideshowsByCustomerId);

// Delete Slideshow
router.delete('/slideshows/:id', SlideshowController.deleteSlideshow);

// Upload Media to Cloudinary
router.post('/upload-media', upload.array('media', 10), SlideshowController.uploadMedia);

router.get('/slideshows_images', SlideshowController.getAllSlideshowsImages);

router.get('/limi_bussiness_card_images', SlideshowController.getLimitBussinessCardImages);

router.get('/products_images', SlideshowController.getAllProductsImages);

module.exports = router;
