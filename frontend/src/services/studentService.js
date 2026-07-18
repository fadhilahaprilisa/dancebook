import { compareKelas } from '../utils/sortKelas';

const STORAGE_KEY = 'dancebook_students_v2';

const SEED_STUDENTS = [
  { id: 's1', name: 'Aisyah Putri', kelas: '1A', status: 'aktif' },
  { id: 's2', name: 'Bunga Lestari', kelas: '1A', status: 'aktif' },
  { id: 's3', name: 'Citra Ayu', kelas: '1B', status: 'aktif' },
  { id: 's4', name: 'Dewi Anggraini', kelas: '2', status: 'aktif' },
  { id: 's5', name: 'Erika Salsabila', kelas: '2', status: 'aktif' },
  { id: 's6', name: 'Fitri Handayani', kelas: '3', status: 'aktif' },
  { id: 's7', name: 'Gita Permata', kelas: '4A', status: 'aktif' },
  { id: 's8', name: 'Hana Ramadhani', kelas: '4B', status: 'aktif' },
  { id: 's9', name: 'Intan Maharani', kelas: '5', status: 'aktif' },
  { id: 's10', name: 'Jasmine Aulia', kelas: '5', status: 'aktif' },
  { id: 's11', name: 'Kirana Wulandari', kelas: '6A', status: 'aktif' },
  { id: 's12', name: 'Larasati Dewi', kelas: '6B', status: 'lulus' },
];

function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Gagal membaca data murid dari penyimpanan lokal', err);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_STUDENTS));
  return SEED_STUDENTS;
}

function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function sortStudents(students) {
  return [...students].sort((a, b) => {
    const kelasDiff = compareKelas(a.kelas, b.kelas);
    if (kelasDiff !== 0) return kelasDiff;
    return a.name.localeCompare(b.name, 'id');
  });
}

// TODO (Tahap 10): ganti seluruh fungsi berikut dengan pemanggilan REST API
// nyata (GET/POST/PUT/DELETE /api/students) setelah backend terhubung.

export async function getStudents() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return sortStudents(loadStudents());
}

export async function createStudent({ name, kelas }) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const students = loadStudents();
  const newStudent = {
    id: `s-${Date.now()}`,
    name: name.trim(),
    kelas: kelas.trim(),
    status: 'aktif',
  };
  const updated = [...students, newStudent];
  saveStudents(updated);
  return newStudent;
}

export async function updateStudent(id, { name, kelas }) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const students = loadStudents();
  const updated = students.map((s) =>
    s.id === id ? { ...s, name: name.trim(), kelas: kelas.trim() } : s
  );
  saveStudents(updated);
  return updated.find((s) => s.id === id);
}

export async function updateStudentStatus(id, status) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const students = loadStudents();
  const updated = students.map((s) => (s.id === id ? { ...s, status } : s));
  saveStudents(updated);
  return updated.find((s) => s.id === id);
}

export async function deleteStudent(id) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const students = loadStudents();
  const updated = students.filter((s) => s.id !== id);
  saveStudents(updated);
}