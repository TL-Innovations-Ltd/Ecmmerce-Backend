const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { validateConfig, validateIdParam, validateUserIdParam } = require("./middleware/light_config_validator");
const lightConfigController = require("./controllers/light_config_controller");
const lightConfigWhishlistController = require('./controllers/light_config_whishlist_controller');
const productController = require("./controllers/product_controller");
const authUser = require("../../middleware/user_verify");
const {cache} = require("../../utils/redisCache");

const uploadDir = "uploads/";

// Only create uploads folder if NOT running on Vercel
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'uploads', 'web_configurator');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB per file
  fileFilter: (req, file, cb) => {
    // Accept images and videos
    const filetypes = /jpeg|jpg|png|gif|mp4|webm|mov|avi/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});

// Light Configuration Routes
router.post("/light-configs", validateConfig, lightConfigController.createConfig);

// LightConfig Whishlist Routes (token required) - keep BEFORE :id routes
router.post('/light-configs/wishlist', authUser, lightConfigWhishlistController.setWishlist);
router.get('/light-configs/wishlist', authUser, lightConfigWhishlistController.getWishlist);

router.get("/light-configs/:id", validateIdParam, cache(5 * 60 , "light-configs"), lightConfigController.getConfig);
router.post("/users/light-configs", lightConfigController.getUserConfigs);
router.put("/light-configs/:id", validateIdParam, validateConfig, authUser, lightConfigController.updateConfig);
router.delete("/light-configs/:id", validateIdParam, lightConfigController.deleteConfig);
router.get("/all-light-configs", cache(5 * 60 , "light-configs"),  lightConfigController.getAllConfigs);

// CRUD Product Routes
router.post("/create", upload.array("images"), productController.createProduct);
router.get("/", productController.getAllProducts); 
router.get("/:id", productController.getProductById); 
router.put("/:id", upload.array("images"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Search products by query (name, category, etc)
router.post("/search", productController.searchProducts);

module.exports = router;
 