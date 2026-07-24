const asyncHandler = require('../utils/asyncHandler');
const agendaService = require('../services/agendaService');

const getAgendas = asyncHandler(async (req, res) => {
  const data = await agendaService.getAgendas();
  res.json({ success: true, data });
});

const createAgenda = asyncHandler(async (req, res) => {
  const data = await agendaService.createAgenda(req.body);
  res.status(201).json({ success: true, data });
});

const updateAgenda = asyncHandler(async (req, res) => {
  const data = await agendaService.updateAgenda(req.params.id, req.body);
  res.json({ success: true, data });
});

const deleteAgenda = asyncHandler(async (req, res) => {
  await agendaService.deleteAgenda(req.params.id);
  res.json({ success: true, message: 'Agenda berhasil dihapus' });
});

module.exports = { getAgendas, createAgenda, updateAgenda, deleteAgenda };
