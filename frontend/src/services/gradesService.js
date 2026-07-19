const STORAGE_KEY = 'dancebook_grades';

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Gagal membaca data nilai dari penyimpanan lokal', err);
    return {};
  }
}

function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// TODO (Tahap 10): ganti dengan GET/PUT /api/grades?year=...&studentId=...
// yang sesungguhnya setelah backend & database terhubung. Backend wajib
// menyimpan nilai per tahun tanpa menimpa tahun sebelumnya (lihat schema.sql
// tabel `grades` dengan UNIQUE(student_id, year)).

export async function getGradeYears() {
  const all = loadAll();
  return Object.keys(all)
    .map(Number)
    .sort((a, b) => b - a);
}

export async function getGradesByYear(year) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const all = loadAll();
  return all[year] || {};
}

export async function getStudentGradeHistory(studentId) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const all = loadAll();
  return Object.keys(all)
    .map(Number)
    .sort((a, b) => b - a)
    .filter((year) => all[year][studentId])
    .map((year) => ({ year, ...all[year][studentId] }));
}

export async function saveStudentGrade(year, studentId, { grade, checklist }) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const all = loadAll();
  if (!all[year]) all[year] = {};
  all[year][studentId] = { grade, checklist };
  saveAll(all);
  return all[year][studentId];
}

export async function getAllGradeEntries() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return loadAll();
}