const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Asset = require('./models/asset.model');
const { envPath } = require('../../config/env');


const router = express.Router();

// Base assets directory under project root uploads/assests
// __dirname is src/admin/assests_managment -> go up three levels to project root
const BASE_ASSETS_DIR = path.join(__dirname, '../../..', 'uploads', 'assests');

// Ensure base and sub-directories exist
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

ensureDir(BASE_ASSETS_DIR);
ensureDir(path.join(BASE_ASSETS_DIR, 'models'));
ensureDir(path.join(BASE_ASSETS_DIR, 'images'));
ensureDir(path.join(BASE_ASSETS_DIR, 'videos'));

// Allowed extensions
const MODEL_EXTS = ['.glb', '.gltf', '.usdz', '.fbx'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const VIDEO_EXTS = ['.mp4', '.mov', '.webm', '.mkv'];

// Decide subfolder by file extension
function getSubfolderByExt(ext) {
  const lower = ext.toLowerCase();
  if (MODEL_EXTS.includes(lower)) return 'models';
  if (IMAGE_EXTS.includes(lower)) return 'images';
  if (VIDEO_EXTS.includes(lower)) return 'videos';
  return null;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext = path.extname(file.originalname || '');
    const sub = getSubfolderByExt(ext);
    if (!sub) {
      return cb(new Error(`Unsupported file type: ${ext}`));
    }
    const dest = path.join(BASE_ASSETS_DIR, sub);
    ensureDir(dest);
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    // Keep the original filename as sent from the frontend
    // Ensure we only use the base name to avoid path traversal
    const original = path.basename(file.originalname || '');

    // Determine subfolder again to construct the absolute path for existence check
    const ext = path.extname(original || '');
    const sub = getSubfolderByExt(ext);
    if (!sub) {
      return cb(new Error(`Unsupported file type: ${ext}`));
    }

    const absPath = path.join(BASE_ASSETS_DIR, sub, original);
    try {
      if (fs.existsSync(absPath)) {
        const err = new Error('Filename already exists');
        err.code = 'FILENAME_EXISTS';
        return cb(err);
      }
    } catch (e) {
      return cb(e);
    }

    return cb(null, original);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname || '').toLowerCase();
  if ([...MODEL_EXTS, ...IMAGE_EXTS, ...VIDEO_EXTS].includes(ext)) {
    return cb(null, true);
  }
  return cb(new Error(`Unsupported file type: ${ext}`));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    // Allow large 3D models/videos
    fileSize: 200 * 1024 * 1024, // 200MB per file
    files: 30,
  },
});

// Accepts multipart/form-data with any file field names (Postman friendly)
router.post('/upload', (req, res) => {
  // Invoke multer and capture errors here so we can map them to proper HTTP codes
  upload.any()(req, res, (err) => {
    if (err) {
      if (err.code === 'FILENAME_EXISTS') {
        return res.status(409).json({ message: 'Filename already exists', code: err.code });
      }
      const status = err.code && typeof err.code === 'string' && err.code.startsWith('LIMIT') ? 413 : 400;
      return res.status(status).json({ message: err.message || 'Upload failed', code: err.code || undefined });
    }

    try {
      const baseHost = envPath === '.env.dev' ? 'https://dev.api1.limitless-lighting.co.uk' : 'https://api1.limitless-lighting.co.uk';
      const files = (req.files || []).map((f) => {
        // Build a public URL under /assets
        // Example: /assets/models/filename.ext
        const sub = path.basename(path.dirname(f.path));
        const relative = path.join('/assets', sub, path.basename(f.path)).replace(/\\/g, '/');
        const fullUrl = baseHost ? `${baseHost}${relative}` : relative;
        return {
          fieldname: f.fieldname,
          originalname: f.originalname,
          mimetype: f.mimetype,
          size: f.size,
          destination: f.destination,
          filename: f.filename,
          path: f.path,
          url: fullUrl,
          category: sub,
        };
      });

      // Persist file metadata in MongoDB
      Asset.insertMany(files)
        .then((docs) => {
          return res.status(201).json({
            message: 'Files uploaded successfully',
            count: docs.length,
            files: docs,
          });
        })
        .catch((dbErr) => {
          // DB failed but files are already saved to disk
          return res.status(500).json({ message: dbErr.message || 'Failed to save file records', code: 'DB_SAVE_FAILED', files });
        });
    } catch (e) {
      return res.status(500).json({ message: e.message || 'Upload processing failed' });
    }
  });
});

// Forces browser to download the file (Content-Disposition: attachment)
router.get('/download', (req, res) => {
  try {
    const relPath = (req.query.path || '').toString();
    if (!relPath) {
      return res.status(400).json({ message: 'Missing required query parameter: path' });
    }

    // Only allow under known categories
    const parts = relPath.split('/');
    const category = parts[0];
    if (!['models', 'images', 'videos'].includes(category)) {
      return res.status(400).json({ message: 'Invalid category in path' });
    }

    // Resolve and prevent path traversal
    const normalized = path.normalize(relPath).replace(/^\.\/+/, '');
    const absPath = path.join(BASE_ASSETS_DIR, normalized);

    if (!absPath.startsWith(BASE_ASSETS_DIR)) {
      return res.status(400).json({ message: 'Invalid path' });
    }

    if (!fs.existsSync(absPath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Suggest original filename to client
    const downloadName = path.basename(absPath);
    return res.download(absPath, downloadName);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Download failed' });
  }
});

module.exports = router;
