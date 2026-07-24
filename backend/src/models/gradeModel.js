const { pool } = require('../config/db');

async function upsertGrade(year, studentId, grade) {
  await pool.query(
    `INSERT INTO grades (student_id, year, grade) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE grade = VALUES(grade), updated_at = CURRENT_TIMESTAMP`,
    [studentId, year, grade]
  );
  const [rows] = await pool.query(
    'SELECT id FROM grades WHERE student_id = ? AND year = ?',
    [studentId, year]
  );
  return rows[0].id;
}

async function replaceChecklistSelections(gradeId, checklistItemIds) {
  await pool.query('DELETE FROM grade_checklist_selections WHERE grade_id = ?', [gradeId]);
  if (checklistItemIds.length === 0) return;
  const values = checklistItemIds.map((itemId) => [gradeId, itemId]);
  await pool.query(
    'INSERT INTO grade_checklist_selections (grade_id, checklist_item_id) VALUES ?',
    [values]
  );
}

async function getChecklistMasterByType(gradeType) {
  const [rows] = await pool.query(
    'SELECT id, label FROM grade_checklist_master WHERE grade_type = ?',
    [gradeType]
  );
  return rows;
}

async function getGradesByYear(year) {
  const [rows] = await pool.query(
    `SELECT g.student_id, g.grade, gcm.label
     FROM grades g
     LEFT JOIN grade_checklist_selections gcs ON gcs.grade_id = g.id
     LEFT JOIN grade_checklist_master gcm ON gcm.id = gcs.checklist_item_id
     WHERE g.year = ?`,
    [year]
  );
  const result = {};
  rows.forEach((row) => {
    if (!result[row.student_id]) {
      result[row.student_id] = { grade: row.grade, checklist: [] };
    }
    if (row.label) result[row.student_id].checklist.push(row.label);
  });
  return result;
}

async function getGradeHistoryByStudent(studentId) {
  const [rows] = await pool.query(
    `SELECT g.year, g.grade, gcm.label
     FROM grades g
     LEFT JOIN grade_checklist_selections gcs ON gcs.grade_id = g.id
     LEFT JOIN grade_checklist_master gcm ON gcm.id = gcs.checklist_item_id
     WHERE g.student_id = ?
     ORDER BY g.year DESC`,
    [studentId]
  );
  const byYear = new Map();
  rows.forEach((row) => {
    if (!byYear.has(row.year)) {
      byYear.set(row.year, { year: row.year, grade: row.grade, checklist: [] });
    }
    if (row.label) byYear.get(row.year).checklist.push(row.label);
  });
  return Array.from(byYear.values());
}

async function getDistinctYears() {
  const [rows] = await pool.query('SELECT DISTINCT year FROM grades ORDER BY year DESC');
  return rows.map((r) => r.year);
}

async function getAllGrades() {
  const [rows] = await pool.query(
    `SELECT g.year, g.student_id, g.grade, gcm.label
     FROM grades g
     LEFT JOIN grade_checklist_selections gcs ON gcs.grade_id = g.id
     LEFT JOIN grade_checklist_master gcm ON gcm.id = gcs.checklist_item_id`
  );
  const result = {};
  rows.forEach((row) => {
    if (!result[row.year]) result[row.year] = {};
    if (!result[row.year][row.student_id]) {
      result[row.year][row.student_id] = { grade: row.grade, checklist: [] };
    }
    if (row.label) result[row.year][row.student_id].checklist.push(row.label);
  });
  return result;
}

module.exports = {
  upsertGrade,
  replaceChecklistSelections,
  getChecklistMasterByType,
  getGradesByYear,
  getGradeHistoryByStudent,
  getDistinctYears,
  getAllGrades,
};
