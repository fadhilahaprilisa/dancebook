const asyncHandler = require('../utils/asyncHandler');
const documentationService = require('../services/documentationService');

const getDocumentations = asyncHandler(async (req, res) => {
  const data = await documentationService.getDocumentations();
  res.json({ success: true, data });
});

const createDocumentation = asyncHandler(async (req, res) => {
  const data = await documentationService.createDocumentation(req.body, req.file);
  res.status(201).json({ success: true, data });
});

const deleteDocumentation = asyncHandler(async (req, res) => {
  await documentationService.deleteDocumentation(req.params.id);
  res.json({ success: true, message: 'Dokumentasi berhasil dihapus' });
});

module.exports = { getDocumentations, createDocumentation, deleteDocumentation };
