const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Token autentikasi tidak ditemukan'));
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(401, 'Token tidak valid atau sudah kedaluwarsa'));
  }
}

module.exports = authMiddleware;
