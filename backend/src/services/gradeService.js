const gradeModel = require('../models/gradeModel');
const ApiError = require('../utils/ApiError');

async function getGradesByYear(year) {
  if (!year) throw new ApiError(400, 'Parameter tahun wajib diisi');
  return gradeModel.getGradesByYear(year);
}

async function getGradeHistory(studentId) {
  return gradeModel.getGradeHistoryByStudent(studentId);
}

async function getGradeYears() {
  return gradeModel.getDistinctYears();
}

async function saveGrade(year, studentId, grade, checklist) {
  if (!['A', 'B'].includes(grade)) throw new ApiError(400, 'Nilai harus A atau B');

  const masterItems = await gradeModel.getChecklistMasterByType(grade);
  const labelToId = new Map(masterItems.map((item) => [item.label, item.id]));
  const checklistItemIds = (checklist || [])
    .map((label) => labelToId.get(label))
    .filter((id) => id !== undefined);

  const gradeId = await gradeModel.upsertGrade(year, studentId, grade);
  await gradeModel.replaceChecklistSelections(gradeId, checklistItemIds);

  return { grade, checklist: (checklist || []).filter((label) => labelToId.has(label)) };
}

async function getAllGrades() {
  return gradeModel.getAllGrades();
}

module.exports = { getGradesByYear, getGradeHistory, getGradeYears, saveGrade, getAllGrades };
