const { pool } = require('../config/db');

async function findByDate(date) {
  const [rows] = await pool.query(
    'SELECT student_id, status FROM attendances WHERE date = ?',
    [date]
  );
  const map = {};
  rows.forEach((row) => {
    map[row.student_id] = row.status;
  });
  return map;
}

async function upsertMany(date, attendanceMap) {
  const entries = Object.entries(attendanceMap);
  for (const [studentId, status] of entries) {
    await pool.query(
      `INSERT INTO attendances (student_id, date, status) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE status = VALUES(status), updated_at = CURRENT_TIMESTAMP`,
      [studentId, date, status]
    );
  }
}

async function findAll() {
  const [rows] = await pool.query('SELECT student_id, date, status FROM attendances ORDER BY date');
  const result = {};
  rows.forEach((row) => {
    if (!result[row.date]) result[row.date] = {};
    result[row.date][row.student_id] = row.status;
  });
  return result;
}

module.exports = { findByDate, upsertMany, findAll };
