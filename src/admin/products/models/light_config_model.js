const mongoose = require('mongoose');

const lightConfigSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: {
    url: { type: String },
    public_id: { type: String }
  },
  config: {
    lightType: { type: String, required: true },
    pendantCount: { type: Number, required: true },
    cableColor: { type: String, required: true },
    cableLength: { type: String, required: true },
    pendantDesigns: [{ type: String, required: true }]
  },
  iframe: [String],
  user_id: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('LightConfig', lightConfigSchema);
