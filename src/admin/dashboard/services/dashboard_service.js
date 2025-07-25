const Dashboard = require('../models/dashboard_model');

exports.createDashboard = async (data) => {
  const dashboard = new Dashboard(data);
  return await dashboard.save();
};

exports.getDashboards = async () => {
  return await Dashboard.find();
};
