const asyncHandler = require('../utils/asyncHandler');
const studentService = require('../services/studentService');

const getStudents = asyncHandler(async (req, res) => {
  const students = await studentService.getStudents();
  res.json({ success: true, data: students });
});

const createStudent = asyncHandler(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  res.status(201).json({ success: true, data: student });
});

const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentService.updateStudent(req.params.id, req.body);
  res.json({ success: true, data: student });
});

const updateStudentStatus = asyncHandler(async (req, res) => {
  const student = await studentService.updateStudentStatus(req.params.id, req.body.status);
  res.json({ success: true, data: student });
});

const deleteStudent = asyncHandler(async (req, res) => {
  await studentService.deleteStudent(req.params.id);
  res.json({ success: true, message: 'Murid berhasil dihapus' });
});

module.exports = { getStudents, createStudent, updateStudent, updateStudentStatus, deleteStudent };
