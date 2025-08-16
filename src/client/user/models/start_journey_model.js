const mongoose = require('mongoose');

const startJourneySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    company: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StartJourney', startJourneySchema);
