import { useEffect, useState } from 'react';
import { Database, DownloadCloud, Trash2, HardDrive } from 'lucide-react';
import Swal from 'sweetalert2';
import { getBackupHistory, createBackup, deleteBackupEntry } from '../services/backupService';

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatTanggal(isoStr) {
  return new Date(isoStr).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function BackupPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const loadHistory = async () => {
    setIsLoading(true);
    const data = await getBackupHistory();
    setHistory(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleCreateBackup = async () => {
    setIsCreating(true);
    try {
      await createBackup();
      await loadHistory();
      Swal.fire({ icon: 'success', title: 'Backup Berhasil Dibuat', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Backup Gagal', confirmButtonColor: '#E91E63' });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (entry) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: `Hapus riwayat "${entry.fileName}"?`,
      text: 'Ini hanya menghapus catatan riwayat, bukan file yang sudah terunduh.',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#E91E63',
    });
    if (result.isConfirmed) {
      await deleteBackupEntry(entry.id);
      await loadHistory();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Backup Database</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Unduh cadangan seluruh data DanceBook kapan pun dibutuhkan.
          </p>
        </div>
        <button
          onClick={handleCreateBackup}
          disabled={isCreating}
          className="btn-primary flex items-center gap-2 self-start md:self-auto disabled:opacity-60"
        >
          <Database className="w-4 h-4" />
          {isCreating ? 'Membuat Backup...' : 'Buat & Unduh Backup'}
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 py-3 bg-primary-container/50 border-b border-surface-container-highest flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-on-primary-container" />
          <h3 className="text-sm font-bold text-on-primary-container">Riwayat Backup</h3>
        </div>

        {isLoading ? (
          <div className="p-5 space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-surface-container-highest rounded-xl animate-pulse" />
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="p-10 text-center text-sm text-on-surface-variant">
            Belum ada riwayat backup. Klik "Buat &amp; Unduh Backup" untuk membuat yang pertama.
          </div>
        ) : (
          <div className="divide-y divide-surface-container-highest">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                    <DownloadCloud className="w-4 h-4 text-on-primary-container" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-on-surface truncate">{entry.fileName}</p>
                    <p className="text-[11px] text-on-surface-variant">
                      {formatTanggal(entry.createdAt)} • {formatFileSize(entry.fileSize)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(entry)}
                  className="p-2 rounded-full hover:bg-error-container/40 text-on-surface-variant hover:text-error transition-colors shrink-0"
                  aria-label="Hapus riwayat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}