const { pool } = require('../config/db');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM agendas ORDER BY date, start_time');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM agendas WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO agendas (title, activity_type, date, start_time, end_time, location, description)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title, data.activityType, data.date,
      data.startTime || null, data.endTime || null,
      data.location || null, data.description || null,
    ]
  );
  return findById(result.insertId);
}

async function update(id, data) {
  await pool.query(
    `UPDATE agendas SET title = ?, activity_type = ?, date = ?, start_time = ?, end_time = ?, location = ?, description = ?
     WHERE id = ?`,
    [
      data.title, data.activityType, data.date,
      data.startTime || null, data.endTime || null,
      data.location || null, data.description || null, id,
    ]
  );
  return findById(id);
}

async function remove(id) {
  await pool.query('DELETE FROM agendas WHERE id = ?', [id]);
}

module.exports = { findAll, findById, create, update, remove };
