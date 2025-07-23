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

// GET /analytics?customerId=optional_customer_id
exports.getAnalytics = async (req, res) => {
  try {
    const { customerId } = req.query;
    const query = {};
    
    if (customerId) {
      query.customerId = customerId;
    }
    
    const analytics = await Analytics.find(query).sort({ createdAt: -1 }).limit(100);
    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve analytics data.', details: err.message });
  }
};
