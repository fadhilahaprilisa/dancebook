import { useEffect, useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import Swal from 'sweetalert2';
import CalendarPicker from '../components/common/CalendarPicker';
import AttendanceStatusRow from '../components/attendance/AttendanceStatusRow';
import { getStudents } from '../services/studentService';
import { getAttendanceByDate, saveAttendanceByDate, getDatesWithAttendance } from '../services/attendanceService';

function todayStr() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function formatTanggal(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AbsensiPage() {
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [markedDates, setMarkedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getStudents().then((data) => setStudents(data.filter((s) => s.status === 'aktif')));
    getDatesWithAttendance().then(setMarkedDates);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getAttendanceByDate(selectedDate).then((data) => {
      setAttendance(data);
      setIsLoading(false);
    });
  }, [selectedDate]);

  const summary = useMemo(() => {
    const values = Object.values(attendance);
    return {
      hadir: values.filter((v) => v === 'hadir').length,
      izin: values.filter((v) => v === 'izin').length,
      sakit: values.filter((v) => v === 'sakit').length,
      alfa: values.filter((v) => v === 'alfa').length,
      belum: students.length - values.length,
    };
  }, [attendance, students]);

  const handleChangeStatus = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllHadir = () => {
    const updated = {};
    students.forEach((s) => {
      updated[s.id] = 'hadir';
    });
    setAttendance(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await saveAttendanceByDate(selectedDate, attendance);
    const dates = await getDatesWithAttendance();
    setMarkedDates(dates);
    setIsSaving(false);
    Swal.fire({
      icon: 'success',
      title: 'Absensi Tersimpan',
      text: formatTanggal(selectedDate),
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">Absensi</h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Pilih tanggal latihan, lalu tandai kehadiran setiap murid.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <CalendarPicker selectedDate={selectedDate} onSelectDate={setSelectedDate} markedDates={markedDates} />
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-on-surface-variant">Tanggal Terpilih</p>
              <p className="text-sm font-bold text-on-surface">{formatTanggal(selectedDate)}</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-semibold text-on-surface-variant flex-wrap">
              <span>Hadir: <span className="text-on-surface">{summary.hadir}</span></span>
              <span>Izin: <span className="text-on-surface">{summary.izin}</span></span>
              <span>Sakit: <span className="text-on-surface">{summary.sakit}</span></span>
              <span>Alfa: <span className="text-on-surface">{summary.alfa}</span></span>
              <span>Belum diisi: <span className="text-on-surface">{summary.belum}</span></span>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={handleMarkAllHadir} className="text-xs font-semibold text-primary hover:underline">
              Tandai Hadir Semua
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-surface-container-highest rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : students.length === 0 ? (
            <div className="glass-card rounded-2xl p-10 text-center text-sm text-on-surface-variant">
              Belum ada murid aktif. Tambahkan murid terlebih dahulu di menu Data Murid.
            </div>
          ) : (
            <div className="glass-card rounded-2xl overflow-hidden divide-y divide-surface-container-highest">
              {students.map((student) => (
                <AttendanceStatusRow
                  key={student.id}
                  student={student}
                  status={attendance[student.id]}
                  onChange={handleChangeStatus}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || students.length === 0}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Menyimpan...' : 'Simpan Absensi'}
          </button>
        </div>
      </div>
    </div>
  );
}