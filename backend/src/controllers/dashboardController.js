const asyncHandler = require('../utils/asyncHandler');
const dashboardService = require('../services/dashboardService');

const getSummary = asyncHandler(async (req, res) => {
  const summary = await dashboardService.getSummary();
  res.json({ success: true, data: summary });
});

module.exports = { getSummary };
