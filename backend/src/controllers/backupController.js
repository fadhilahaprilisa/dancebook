const asyncHandler = require('../utils/asyncHandler');
const backupService = require('../services/backupService');

const getBackupHistory = asyncHandler(async (req, res) => {
  const history = await backupService.getBackupHistory();
  res.json({ success: true, data: history });
});

const createBackup = asyncHandler(async (req, res) => {
  const backup = await backupService.createBackup();
  res.status(201).json({ success: true, data: backup });
});

const downloadBackup = asyncHandler(async (req, res) => {
  const { filePath, fileName } = await backupService.getBackupFilePath(req.params.id);
  res.download(filePath, fileName);
});

const deleteBackup = asyncHandler(async (req, res) => {
  await backupService.deleteBackup(req.params.id);
  res.json({ success: true, message: 'Riwayat backup berhasil dihapus' });
});

module.exports = { getBackupHistory, createBackup, downloadBackup, deleteBackup };
