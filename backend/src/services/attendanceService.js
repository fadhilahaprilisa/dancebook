const attendanceModel = require('../models/attendanceModel');
const ApiError = require('../utils/ApiError');

const VALID_STATUS = ['hadir', 'izin', 'sakit', 'alfa'];

async function getAttendanceByDate(date) {
  if (!date) throw new ApiError(400, 'Parameter tanggal wajib diisi');
  return attendanceModel.findByDate(date);
}

async function saveAttendance(date, attendanceMap) {
  if (!date) throw new ApiError(400, 'Tanggal wajib diisi');
  Object.values(attendanceMap || {}).forEach((status) => {
    if (!VALID_STATUS.includes(status)) throw new ApiError(400, `Status absensi tidak valid: ${status}`);
  });
  await attendanceModel.upsertMany(date, attendanceMap || {});
  return attendanceModel.findByDate(date);
}

async function getAllAttendance() {
  return attendanceModel.findAll();
}

module.exports = { getAttendanceByDate, saveAttendance, getAllAttendance };
