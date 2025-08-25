const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    fieldname: { type: String },
    originalname: { type: String, required: true },
    filename: { type: String, required: true },
    category: { type: String, enum: ['models', 'images', 'videos'], required: true },
    mimetype: { type: String },
    size: { type: Number },
    destination: { type: String },
    path: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Prevent duplicate filenames within the same category at DB level
assetSchema.index({ category: 1, filename: 1 }, { unique: true });

module.exports = mongoose.model('Asset', assetSchema);
