const { pool } = require('../config/db');

async function findAll() {
  const [rows] = await pool.query(
    'SELECT id, name, kelas, status, created_at, updated_at FROM students ORDER BY name'
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create({ name, kelas }) {
  const [result] = await pool.query(
    'INSERT INTO students (name, kelas, status) VALUES (?, ?, "aktif")',
    [name, kelas]
  );
  return findById(result.insertId);
}

async function update(id, { name, kelas }) {
  await pool.query('UPDATE students SET name = ?, kelas = ? WHERE id = ?', [name, kelas, id]);
  return findById(id);
}

async function updateStatus(id, status) {
  await pool.query('UPDATE students SET status = ? WHERE id = ?', [status, id]);
  return findById(id);
}

async function remove(id) {
  await pool.query('DELETE FROM students WHERE id = ?', [id]);
}

module.exports = { findAll, findById, create, update, updateStatus, remove };
