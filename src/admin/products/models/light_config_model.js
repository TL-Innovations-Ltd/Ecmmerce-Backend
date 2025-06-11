const mongoose = require('mongoose');

const lightConfigSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: {
    url: { type: String, default: '' },
    public_id: { type: String, default: '' }
  },
  config: { type: mongoose.Schema.Types.Mixed, required: true },
  iframe: [String],
  user_id: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('LightConfig', lightConfigSchema);
