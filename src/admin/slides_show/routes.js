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

// Ensure uploads/screen_shot directory exists
const screenShotDir = path.join(__dirname, '../../../uploads/screen_shot');
if (!fs.existsSync(screenShotDir)) {
  fs.mkdirSync(screenShotDir, { recursive: true });
}

const storage_test = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../uploads/screen_shot'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload_test = multer({ storage: storage_test });

// Create or Update Slideshow
router.post('/slideshows', SlideshowController.createOrUpdateSlideshow);

// Get Slideshow by ID
router.get('/slideshows/:id', SlideshowController.getSlideshowById);

// Get Slideshows by Customer ID
router.get('/customers/:customerId/slideshows', SlideshowController.getSlideshowsByCustomerId);

// Delete Slideshow
router.delete('/slideshows/:id', SlideshowController.deleteSlideshow);

// Upload Media to Cloudinary
// router.post('/upload-media', upload.array('media', 10), SlideshowController.uploadMedia);
router.post('/upload-media', upload_test.array('media', 10), SlideshowController.uploadTesting);

router.get('/slideshows_images', SlideshowController.getAllSlideshowsImages);

router.get('/limi_bussiness_card_images', SlideshowController.getLimitBussinessCardImages);

router.get('/products_images', SlideshowController.getAllProductsImages);

module.exports = router;
