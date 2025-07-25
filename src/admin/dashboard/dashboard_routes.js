const express = require('express');
const router = express.Router();
const dashboardController = require('./controllers/dashboard_controller');

// POST: Create dashboard entry
router.post('/investor_details', dashboardController.createDashboard);

// GET: Get all dashboard entries
router.get('/investor_details', dashboardController.getDashboards);

module.exports = router;
