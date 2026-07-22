const express = require('express');
const router = express.Router();
const controller = require('../controllers/gradeController');

router.get('/all', controller.getAllGrades);
router.get('/years', controller.getGradeYears);
router.get('/history/:studentId', controller.getGradeHistory);
router.get('/', controller.getGradesByYear);
router.put('/:year/:studentId', controller.saveGrade);

module.exports = router;
