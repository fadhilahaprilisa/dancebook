const express = require('express');
const router = express.Router();
const controller = require('../controllers/attendanceController');

router.get('/all', controller.getAllAttendance);
router.get('/', controller.getAttendanceByDate);
router.put('/:date', controller.saveAttendance);

module.exports = router;
