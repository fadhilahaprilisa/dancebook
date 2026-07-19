import { useState } from 'react';
import { Users, CalendarCheck, GraduationCap, Download } from 'lucide-react';
import Swal from 'sweetalert2';
import { exportStudentsCSV, exportAttendanceCSV, exportGradesCSV } from '../services/csvExportService';

const EXPORTS = [
  {
    key: 'students',
    title: 'Data Murid',
    description: 'Nama, kelas, dan status seluruh murid.',
    icon: Users,
    action: exportStudentsCSV,
  },
  {
    key: 'attendance',
    title: 'Absensi',
    description: 'Rekap kehadiran seluruh murid per tanggal.',
    icon: CalendarCheck,
    action: exportAttendanceCSV,
  },
  {
    key: 'grades',
    title: 'Nilai Rapor',
    description: 'Nilai dan checklist penilaian per tahun.',
    icon: GraduationCap,
    action: exportGradesCSV,
  },
];

export default function DownloadCSVPage() {
  const [downloadingKey, setDownloadingKey] = useState(null);

  const handleDownload = async (item) => {
    setDownloadingKey(item.key);
    try {
      await item.action();
      Swal.fire({
        icon: 'success',
        title: 'File CSV Diunduh',
        text: item.title,
        timer: 1300,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengunduh',
        text: 'Terjadi kesalahan saat membuat file CSV.',
        confirmButtonColor: '#E91E63',
      });
    } finally {
      setDownloadingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">Download CSV</h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Unduh data DanceBook dalam format CSV untuk arsip atau laporan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXPORTS.map((item) => {
          const Icon = item.icon;
          const isDownloading = downloadingKey === item.key;
          return (
            <div key={item.key} className="glass-card rounded-2xl p-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">{item.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1">{item.description}</p>
              </div>
              <button
                onClick={() => handleDownload(item)}
                disabled={isDownloading}
                className="btn-primary flex items-center justify-center gap-2 mt-auto disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                {isDownloading ? 'Menyiapkan...' : 'Download CSV'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}