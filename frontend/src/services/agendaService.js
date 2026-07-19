const STORAGE_KEY = 'dancebook_agendas';

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Gagal membaca data agenda dari penyimpanan lokal', err);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
}

function saveAll(agendas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agendas));
}

function sortAgendas(agendas) {
  return [...agendas].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    return (a.startTime || '').localeCompare(b.startTime || '');
  });
}

// TODO (Tahap 10): ganti seluruh fungsi berikut dengan pemanggilan REST API
// nyata (GET/POST/PUT/DELETE /api/agendas) setelah backend terhubung.

export async function getAgendas() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return sortAgendas(loadAll());
}

export async function createAgenda(values) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const agendas = loadAll();
  const newAgenda = { id: `a-${Date.now()}`, ...values };
  const updated = [...agendas, newAgenda];
  saveAll(updated);
  return newAgenda;
}

export async function updateAgenda(id, values) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const agendas = loadAll();
  const updated = agendas.map((a) => (a.id === id ? { ...a, ...values } : a));
  saveAll(updated);
  return updated.find((a) => a.id === id);
}

export async function deleteAgenda(id) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const agendas = loadAll();
  const updated = agendas.filter((a) => a.id !== id);
  saveAll(updated);
}