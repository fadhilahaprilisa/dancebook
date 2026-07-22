const asyncHandler = require('../utils/asyncHandler');
const gradeService = require('../services/gradeService');

const getGradesByYear = asyncHandler(async (req, res) => {
  const data = await gradeService.getGradesByYear(req.query.year);
  res.json({ success: true, data });
});

const getGradeYears = asyncHandler(async (req, res) => {
  const data = await gradeService.getGradeYears();
  res.json({ success: true, data });
});

const getGradeHistory = asyncHandler(async (req, res) => {
  const data = await gradeService.getGradeHistory(req.params.studentId);
  res.json({ success: true, data });
});

const saveGrade = asyncHandler(async (req, res) => {
  const { year, studentId } = req.params;
  const data = await gradeService.saveGrade(year, studentId, req.body.grade, req.body.checklist);
  res.json({ success: true, data });
});

const getAllGrades = asyncHandler(async (req, res) => {
  const data = await gradeService.getAllGrades();
  res.json({ success: true, data });
});

module.exports = { getGradesByYear, getGradeYears, getGradeHistory, saveGrade, getAllGrades };
