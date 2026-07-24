import axiosClient from './axiosClient';

export async function getBackupHistory() {
  const response = await axiosClient.get('/backups');
  return response.data.data.map((row) => ({
    id: row.id,
    fileName: row.file_name,
    fileSize: row.file_size,
    createdAt: row.created_at,
  }));
}

export async function downloadBackupFile(id, fileName) {
  const response = await axiosClient.get(`/backups/${id}/download`, { responseType: 'blob' });
  const url = URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function createBackup() {
  const response = await axiosClient.post('/backups');
  const backup = response.data.data;
  await downloadBackupFile(backup.id, backup.file_name);
  return backup;
}

export async function deleteBackupEntry(id) {
  await axiosClient.delete(`/backups/${id}`);
}