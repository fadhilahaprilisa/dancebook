const asyncHandler = require('../utils/asyncHandler');
const attendanceService = require('../services/attendanceService');

const getAttendanceByDate = asyncHandler(async (req, res) => {
  const data = await attendanceService.getAttendanceByDate(req.query.date);
  res.json({ success: true, data });
});

const saveAttendance = asyncHandler(async (req, res) => {
  const data = await attendanceService.saveAttendance(req.params.date, req.body.attendance);
  res.json({ success: true, data });
});

const getAllAttendance = asyncHandler(async (req, res) => {
  const data = await attendanceService.getAllAttendance();
  res.json({ success: true, data });
});

module.exports = { getAttendanceByDate, saveAttendance, getAllAttendance };
