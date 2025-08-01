const multer = require('multer');
const path = require('path');

const fs = require('fs');



// Use memory storage instead of disk storage
// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|gif|webp/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimetype && extname) {
//     return cb(null, true);
//   }
//   cb(new Error('Only image files are allowed (jpg, jpeg, png, gif, webp)'));
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//     files: 1
//   }
// });

// Ensure the directory exists
const uploadDir = path.join(__dirname, '../../uploads/profile_picture');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const userId = req.user ? req.user._id : 'unknown';
    cb(null, `${userId}_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
