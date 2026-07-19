const STORAGE_KEY = 'dancebook_attendance';

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Gagal membaca data absensi dari penyimpanan lokal', err);
    return {};
  }
}

function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// TODO (Tahap 10): ganti dengan GET/PUT /api/attendances?date=... yang
// sesungguhnya setelah backend & database terhubung.

export async function getAttendanceByDate(dateStr) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const all = loadAll();
  return all[dateStr] || {};
}

export async function saveAttendanceByDate(dateStr, attendanceMap) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const all = loadAll();
  all[dateStr] = attendanceMap;
  saveAll(all);
  return attendanceMap;
}

export async function getDatesWithAttendance() {
  const all = loadAll();
  return Object.keys(all).filter((date) => Object.keys(all[date] || {}).length > 0);
}

export async function getAllAttendanceEntries() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return loadAll();
}