const dashboardService = require('../services/dashboard_service');

exports.createDashboard = async (req, res) => {
  try {
    const { name, email, organization } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const dashboard = await dashboardService.createDashboard({ name, email, organization });
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDashboards = async (req, res) => {
  try {
    const dashboards = await dashboardService.getDashboards();
    res.status(200).json(dashboards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
