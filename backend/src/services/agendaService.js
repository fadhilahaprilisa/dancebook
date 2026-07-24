const agendaModel = require('../models/agendaModel');
const ApiError = require('../utils/ApiError');

const VALID_TYPES = [
  'Latihan Rutin', 'Gladi Bersih', 'Pentas Sekolah', 'FLS3N', 'Perpisahan', 'Lomba', 'Lainnya',
];

function toHHMM(value) {
  // MySQL TIME kolom mengembalikan "HH:MM:SS"; <input type="time"> di
  // frontend butuh format "HH:MM" agar bisa terisi otomatis saat edit.
  return value ? value.slice(0, 5) : null;
}

function toResponse(row) {
  return {
    id: row.id,
    title: row.title,
    activityType: row.activity_type,
    date: row.date,
    startTime: toHHMM(row.start_time),
    endTime: toHHMM(row.end_time),
    location: row.location,
    description: row.description,
  };
}

function validate(data) {
  if (!data.title || !data.title.trim()) throw new ApiError(400, 'Judul wajib diisi');
  if (!VALID_TYPES.includes(data.activityType)) throw new ApiError(400, 'Jenis kegiatan tidak valid');
  if (!data.date) throw new ApiError(400, 'Tanggal wajib diisi');
}

async function getAgendas() {
  const rows = await agendaModel.findAll();
  return rows.map(toResponse);
}

async function createAgenda(data) {
  validate(data);
  const row = await agendaModel.create(data);
  return toResponse(row);
}

async function updateAgenda(id, data) {
  const existing = await agendaModel.findById(id);
  if (!existing) throw new ApiError(404, 'Agenda tidak ditemukan');
  validate(data);
  const row = await agendaModel.update(id, data);
  return toResponse(row);
}

async function deleteAgenda(id) {
  const existing = await agendaModel.findById(id);
  if (!existing) throw new ApiError(404, 'Agenda tidak ditemukan');
  await agendaModel.remove(id);
}

module.exports = { getAgendas, createAgenda, updateAgenda, deleteAgenda };
