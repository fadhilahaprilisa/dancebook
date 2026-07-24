const express = require('express');
const router = express.Router();
const controller = require('../controllers/backupController');

router.get('/', controller.getBackupHistory);
router.post('/', controller.createBackup);
router.get('/:id/download', controller.downloadBackup);
router.delete('/:id', controller.deleteBackup);

module.exports = router;
