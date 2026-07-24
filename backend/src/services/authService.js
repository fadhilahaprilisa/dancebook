const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const ApiError = require('../utils/ApiError');

async function login(email, password) {
  if (!email || !password) throw new ApiError(400, 'Email dan password wajib diisi');

  const user = await userModel.findByEmail(email);
  if (!user) throw new ApiError(401, 'Email atau password salah');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, 'Email atau password salah');

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

module.exports = { login };
