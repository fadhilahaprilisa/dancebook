const studentModel = require('../models/studentModel');
const ApiError = require('../utils/ApiError');

const VALID_STATUS = ['aktif', 'lulus', 'keluar'];
const KELAS_PATTERN = /^[1-6][A-Za-z]?$/;

async function getStudents() {
  return studentModel.findAll();
}

async function createStudent({ name, kelas }) {
  if (!name || !name.trim()) throw new ApiError(400, 'Nama wajib diisi');
  if (!kelas || !KELAS_PATTERN.test(kelas.trim())) throw new ApiError(400, 'Format kelas tidak valid');
  return studentModel.create({ name: name.trim(), kelas: kelas.trim() });
}

async function updateStudent(id, { name, kelas }) {
  const existing = await studentModel.findById(id);
  if (!existing) throw new ApiError(404, 'Murid tidak ditemukan');
  if (!name || !name.trim()) throw new ApiError(400, 'Nama wajib diisi');
  if (!kelas || !KELAS_PATTERN.test(kelas.trim())) throw new ApiError(400, 'Format kelas tidak valid');
  return studentModel.update(id, { name: name.trim(), kelas: kelas.trim() });
}

async function updateStudentStatus(id, status) {
  const existing = await studentModel.findById(id);
  if (!existing) throw new ApiError(404, 'Murid tidak ditemukan');
  if (!VALID_STATUS.includes(status)) throw new ApiError(400, 'Status tidak valid');
  return studentModel.updateStatus(id, status);
}

async function deleteStudent(id) {
  const existing = await studentModel.findById(id);
  if (!existing) throw new ApiError(404, 'Murid tidak ditemukan');
  await studentModel.remove(id);
}

module.exports = { getStudents, createStudent, updateStudent, updateStudentStatus, deleteStudent };
