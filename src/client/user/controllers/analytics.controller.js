const Analytics = require('../models/analytics.model');

// POST /analytics
exports.saveAnalytics = async (req, res) => {
  try {
    const analytics = new Analytics(req.body);
    await analytics.save();
    res.status(201).json({ message: 'Analytics data saved successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save analytics data.', details: err.message });
  }
};

// GET /analytics
exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ createdAt: -1 }).limit(100); // limit for safety
    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve analytics data.', details: err.message });
  }
};
