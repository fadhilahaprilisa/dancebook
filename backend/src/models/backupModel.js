const { pool } = require('../config/db');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM backups ORDER BY created_at DESC');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM backups WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create({ fileName, fileSize }) {
  const [result] = await pool.query(
    'INSERT INTO backups (file_name, file_size) VALUES (?, ?)',
    [fileName, fileSize]
  );
  return findById(result.insertId);
}

async function remove(id) {
  await pool.query('DELETE FROM backups WHERE id = ?', [id]);
}

module.exports = { findAll, findById, create, remove };
