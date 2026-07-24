require('dotenv').config();
const bcrypt = require('bcrypt');
const { pool } = require('../config/db');

async function seed() {
  const email = process.env.SEED_USER_EMAIL || 'guru@ekstrakurikuler.tari';
  const password = process.env.SEED_USER_PASSWORD || 'gurutariku';
  const name = process.env.SEED_USER_NAME || 'Guru Ekstrakurikuler Tari';

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), password = VALUES(password)`,
    [name, email, hashedPassword]
  );

  console.log('Akun guru berhasil dibuat/diperbarui:');
  console.log(`  Email    : ${email}`);
  console.log(`  Password : ${password}`);
  console.log('Segera login, lalu simpan email/password ini di tempat aman.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Gagal membuat akun:', err);
  process.exit(1);
});
