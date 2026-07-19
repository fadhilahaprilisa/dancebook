import { getStudents } from './studentService';
import { getAllAttendanceEntries } from './attendanceService';
import { getAllGradeEntries } from './gradesService';

function escapeCSVValue(value) {
  const str = String(value ?? '');
  return `"${str.replace(/"/g, '""')}"`;
}

function toCSV(headers, rows) {
  const lines = [headers.map(escapeCSVValue).join(',')];
  rows.forEach((row) => {
    lines.push(row.map(escapeCSVValue).join(','));
  });
  return lines.join('\n');
}

function triggerDownload(filename, content) {
  const blob = new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function todayLabel() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

// TODO (Tahap 10): setelah backend siap, pertimbangkan generate CSV di server
// (GET /api/export/...) khusus jika data sangat besar. Untuk saat ini, CSV
// dibuat langsung di browser dari data yang sudah dimuat.

export async function exportStudentsCSV() {
  const students = await getStudents();
  const headers = ['Nama', 'Kelas', 'Status'];
  const rows = students.map((s) => [s.name, s.kelas, s.status]);
  triggerDownload(`DanceBook_DataMurid_${todayLabel()}.csv`, toCSV(headers, rows));
}

export async function exportAttendanceCSV() {
  const [students, allAttendance] = await Promise.all([getStudents(), getAllAttendanceEntries()]);
  const studentMap = Object.fromEntries(students.map((s) => [s.id, s]));
  const headers = ['Tanggal', 'Nama Murid', 'Kelas', 'Status'];
  const rows = [];
  Object.keys(allAttendance)
    .sort()
    .forEach((date) => {
      Object.entries(allAttendance[date]).forEach(([studentId, status]) => {
        const student = studentMap[studentId];
        rows.push([date, student?.name || studentId, student?.kelas || '-', status]);
      });
    });
  triggerDownload(`DanceBook_Absensi_${todayLabel()}.csv`, toCSV(headers, rows));
}

export async function exportGradesCSV() {
  const [students, allGrades] = await Promise.all([getStudents(), getAllGradeEntries()]);
  const studentMap = Object.fromEntries(students.map((s) => [s.id, s]));
  const headers = ['Tahun', 'Nama Murid', 'Kelas', 'Nilai', 'Checklist'];
  const rows = [];
  Object.keys(allGrades)
    .sort()
    .forEach((year) => {
      Object.entries(allGrades[year]).forEach(([studentId, entry]) => {
        const student = studentMap[studentId];
        rows.push([
          year,
          student?.name || studentId,
          student?.kelas || '-',
          entry.grade,
          (entry.checklist || []).join('; '),
        ]);
      });
    });
  triggerDownload(`DanceBook_NilaiRapor_${todayLabel()}.csv`, toCSV(headers, rows));
}