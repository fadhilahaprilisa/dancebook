const STORAGE_KEY = 'dancebook_students';

const SEED_STUDENTS = [
  { id: 's1', name: 'Aisyah Putri', class: 1, status: 'aktif' },
  { id: 's2', name: 'Bunga Lestari', class: 1, status: 'aktif' },
  { id: 's3', name: 'Citra Ayu', class: 2, status: 'aktif' },
  { id: 's4', name: 'Dewi Anggraini', class: 2, status: 'aktif' },
  { id: 's5', name: 'Erika Salsabila', class: 3, status: 'aktif' },
  { id: 's6', name: 'Fitri Handayani', class: 3, status: 'aktif' },
  { id: 's7', name: 'Gita Permata', class: 4, status: 'aktif' },
  { id: 's8', name: 'Hana Ramadhani', class: 4, status: 'aktif' },
  { id: 's9', name: 'Intan Maharani', class: 5, status: 'aktif' },
  { id: 's10', name: 'Jasmine Aulia', class: 5, status: 'aktif' },
  { id: 's11', name: 'Kirana Wulandari', class: 6, status: 'aktif' },
  { id: 's12', name: 'Larasati Dewi', class: 6, status: 'lulus' },
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
    if (a.class !== b.class) return a.class - b.class;
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
    class: Number(kelas),
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
    s.id === id ? { ...s, name: name.trim(), class: Number(kelas) } : s
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