const mongoose = require('mongoose');

const lightConfigSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
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
  iframe: { type: Object, default: {} },
  user_id: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('LightConfig', lightConfigSchema);
