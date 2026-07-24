const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json({ success: true, data: result });
});

module.exports = { login };
