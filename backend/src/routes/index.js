const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const authRoutes = require('./authRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const studentRoutes = require('./studentRoutes');
const attendanceRoutes = require('./attendanceRoutes');
const gradeRoutes = require('./gradeRoutes');
const documentationRoutes = require('./documentationRoutes');
const agendaRoutes = require('./agendaRoutes');
const backupRoutes = require('./backupRoutes');

router.use('/auth', authRoutes);

router.use('/dashboard', authMiddleware, dashboardRoutes);
router.use('/students', authMiddleware, studentRoutes);
router.use('/attendances', authMiddleware, attendanceRoutes);
router.use('/grades', authMiddleware, gradeRoutes);
router.use('/documentations', authMiddleware, documentationRoutes);
router.use('/agendas', authMiddleware, agendaRoutes);
router.use('/backups', authMiddleware, backupRoutes);

module.exports = router;
