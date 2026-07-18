import { useEffect, useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Swal from 'sweetalert2';
import StudentFormModal from '../components/students/StudentFormModal';
import StudentClassGroup from '../components/students/StudentClassGroup';
import {
  getStudents,
  createStudent,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
} from '../services/studentService';

const KELAS_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function DataMuridPage() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('aktif'); // 'aktif' | 'arsip'
  const [search, setSearch] = useState('');
  const [kelasFilter, setKelasFilter] = useState('semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadStudents = async () => {
    setIsLoading(true);
    const data = await getStudents();
    setStudents(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesTab = activeTab === 'aktif' ? s.status === 'aktif' : s.status !== 'aktif';
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchesKelas = kelasFilter === 'semua' || s.class === Number(kelasFilter);
      return matchesTab && matchesSearch && matchesKelas;
    });
  }, [students, activeTab, search, kelasFilter]);

  const groupedByClass = useMemo(() => {
    return KELAS_OPTIONS.map((kelas) => ({
      kelas,
      students: filteredStudents.filter((s) => s.class === kelas),
    })).filter((group) => group.students.length > 0);
  }, [filteredStudents]);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, values);
    } else {
      await createStudent(values);
    }
    setIsModalOpen(false);
    await loadStudents();
  };

  const handleDelete = async (student) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: `Hapus ${student.name}?`,
      text: 'Data yang dihapus tidak dapat dikembalikan. Untuk murid Lulus/Keluar, gunakan Arsip, bukan Hapus.',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#E91E63',
    });
    if (result.isConfirmed) {
      await deleteStudent(student.id);
      await loadStudents();
      Swal.fire({ icon: 'success', title: 'Terhapus', timer: 1200, showConfirmButton: false });
    }
  };

  const handleChangeStatus = async (student, status) => {
    await updateStudentStatus(student.id, status);
    await loadStudents();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Data Murid</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Kelola daftar murid ekstrakurikuler tari per kelas.
          </p>
        </div>
        {activeTab === 'aktif' && (
          <button
            onClick={handleOpenAdd}
            className="btn-primary flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" /> Tambah Murid
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-surface-container-low w-fit p-1 rounded-full">
        <button
          onClick={() => setActiveTab('aktif')}
          className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
            activeTab === 'aktif'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Murid Aktif
        </button>
        <button
          onClick={() => setActiveTab('arsip')}
          className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
            activeTab === 'arsip'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Arsip (Lulus & Keluar)
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Cari nama murid..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base pl-11"
          />
        </div>
        <select
          value={kelasFilter}
          onChange={(e) => setKelasFilter(e.target.value)}
          className="input-base sm:w-48"
        >
          <option value="semua">Semua Kelas</option>
          {KELAS_OPTIONS.map((kelas) => (
            <option key={kelas} value={kelas}>
              Kelas {kelas}
            </option>
          ))}
        </select>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-surface-container-highest rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : groupedByClass.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center text-sm text-on-surface-variant">
          Tidak ada murid yang cocok dengan pencarian/filter ini.
        </div>
      ) : (
        <div className="space-y-6">
          {groupedByClass.map((group) => (
            <StudentClassGroup
              key={group.kelas}
              kelas={group.kelas}
              students={group.students}
              activeTab={activeTab}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              onChangeStatus={handleChangeStatus}
            />
          ))}
        </div>
      )}

      <StudentFormModal
        isOpen={isModalOpen}
        initialData={editingStudent}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        kelasOptions={KELAS_OPTIONS}
      />
    </div>
  );
}