const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Dashboard', DashboardSchema);
