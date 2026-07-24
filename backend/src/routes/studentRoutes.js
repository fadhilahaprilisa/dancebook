const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');

router.get('/', controller.getStudents);
router.post('/', controller.createStudent);
router.put('/:id', controller.updateStudent);
router.patch('/:id/status', controller.updateStudentStatus);
router.delete('/:id', controller.deleteStudent);

module.exports = router;
