const mongoose = require('mongoose');

const brochureRequestSchema = new mongoose.Schema(
  {
    email: { type: String, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model('BrochureRequest', brochureRequestSchema);
