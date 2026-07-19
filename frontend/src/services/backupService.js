const HISTORY_KEY = 'dancebook_backup_history';

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Gagal membaca riwayat backup dari penyimpanan lokal', err);
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function triggerDownload(filename, content) {
  const blob = new Blob([content], { type: 'application/sql;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return blob.size;
}

// TODO (Tahap 10): ganti dengan backup nyata dari server — endpoint backend
// yang men-dump database MySQL (mysqldump) dan mengembalikan file .sql/.zip
// sesungguhnya, bukan snapshot data localStorage seperti saat ini.

export async function getBackupHistory() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return loadHistory().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function createBackup() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const snapshot = {
    students: JSON.parse(localStorage.getItem('dancebook_students_v2') || '[]'),
    attendance: JSON.parse(localStorage.getItem('dancebook_attendance') || '{}'),
    grades: JSON.parse(localStorage.getItem('dancebook_grades') || '{}'),
    agendas: JSON.parse(localStorage.getItem('dancebook_agendas') || '[]'),
    generatedAt: new Date().toISOString(),
  };

  const sqlContent = `-- DanceBook Backup
-- Dibuat otomatis: ${snapshot.generatedAt}
-- Catatan: backup ini adalah snapshot data lokal (mock). Setelah Tahap 10,
-- file ini akan digantikan dump MySQL sesungguhnya (mysqldump).

-- Data (JSON snapshot):
${JSON.stringify(snapshot, null, 2)}
`;

  const fileName = `dancebook_backup_${snapshot.generatedAt.replace(/[:.]/g, '-')}.sql`;
  const fileSize = triggerDownload(fileName, sqlContent);

  const history = loadHistory();
  const newEntry = {
    id: `bk-${Date.now()}`,
    fileName,
    fileSize,
    createdAt: snapshot.generatedAt,
  };
  const updated = [newEntry, ...history];
  saveHistory(updated);

  return newEntry;
}

export async function deleteBackupEntry(id) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const history = loadHistory();
  const updated = history.filter((b) => b.id !== id);
  saveHistory(updated);
}