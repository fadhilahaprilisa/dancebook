const { pool } = require('../config/db');

async function findAll() {
  const [rows] = await pool.query(
    'SELECT * FROM documentations ORDER BY activity_date DESC, created_at DESC'
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM documentations WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create({ title, description, activityDate, mediaType, mediaUrl, cloudinaryPublicId }) {
  const [result] = await pool.query(
    `INSERT INTO documentations (title, description, activity_date, media_url, media_type, cloudinary_public_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description || null, activityDate, mediaUrl, mediaType, cloudinaryPublicId]
  );
  return findById(result.insertId);
}

async function remove(id) {
  await pool.query('DELETE FROM documentations WHERE id = ?', [id]);
}

module.exports = { findAll, findById, create, remove };
