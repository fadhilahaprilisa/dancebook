import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import AgendaMonthCalendar from '../components/agenda/AgendaMonthCalendar';
import AgendaListItem from '../components/agenda/AgendaListItem';
import AgendaFormModal from '../components/agenda/AgendaFormModal';
import AgendaDetailModal from '../components/agenda/AgendaDetailModal';
import { ACTIVITY_TYPES } from '../utils/agendaTypes';
import { getAgendas, createAgenda, updateAgenda, deleteAgenda } from '../services/agendaService';

function todayStr() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

const FILTERS = [
  { key: 'today', label: 'Hari Ini' },
  { key: 'week', label: 'Minggu Ini' },
  { key: 'month', label: 'Bulan Ini' },
  { key: 'all', label: 'Semua' },
];

export default function AgendaPage() {
  const [agendas, setAgendas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeFilter, setActiveFilter] = useState('month');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState(null);
  const [detailAgenda, setDetailAgenda] = useState(null);
  const [formDefaultDate, setFormDefaultDate] = useState(todayStr());

  const loadAgendas = async () => {
    setIsLoading(true);
    const data = await getAgendas();
    setAgendas(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAgendas();
  }, []);

  const visibleAgendas = useMemo(() => {
    if (selectedDate) {
      return agendas.filter((a) => a.date === selectedDate);
    }

    const today = new Date();
    if (activeFilter === 'today') {
      const t = todayStr();
      return agendas.filter((a) => a.date === t);
    }
    if (activeFilter === 'week') {
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return agendas.filter((a) => {
        const d = new Date(a.date);
        return d >= start && d <= end;
      });
    }
    if (activeFilter === 'month') {
      return agendas.filter((a) => {
        const d = new Date(a.date);
        return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
      });
    }
    return agendas;
  }, [agendas, activeFilter, selectedDate]);

  const handleSelectDate = (dateStr) => {
    setSelectedDate((prev) => (prev === dateStr ? null : dateStr));
  };

  const handleOpenAdd = (dateStr) => {
    setEditingAgenda(null);
    setFormDefaultDate(dateStr || selectedDate || todayStr());
    setIsFormOpen(true);
  };

  const handleOpenEdit = (agenda) => {
    setDetailAgenda(null);
    setEditingAgenda(agenda);
    setFormDefaultDate(agenda.date);
    setIsFormOpen(true);
  };

  const handleSubmit = async (values) => {
    if (editingAgenda) {
      await updateAgenda(editingAgenda.id, values);
    } else {
      await createAgenda(values);
    }
    setIsFormOpen(false);
    await loadAgendas();
    Swal.fire({ icon: 'success', title: 'Agenda Tersimpan', timer: 1300, showConfirmButton: false });
  };

  const handleDelete = async (agenda) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: `Hapus agenda "${agenda.title}"?`,
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#E91E63',
    });
    if (result.isConfirmed) {
      await deleteAgenda(agenda.id);
      setDetailAgenda(null);
      await loadAgendas();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Agenda</h1>
          <p className="text-sm text-on-surface-variant mt-1">Pusat informasi kegiatan ekstrakurikuler tari.</p>
        </div>
        <button onClick={() => handleOpenAdd(null)} className="btn-primary flex items-center gap-2 self-start md:self-auto">
          <Plus className="w-4 h-4" /> Tambah Agenda
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <AgendaMonthCalendar agendas={agendas} selectedDate={selectedDate} onSelectDate={handleSelectDate} />

          <div className="glass-card rounded-2xl p-4 mt-4">
            <p className="text-xs font-semibold text-on-surface-variant mb-2">Keterangan Warna</p>
            <div className="flex flex-wrap gap-2">
              {ACTIVITY_TYPES.map((item) => (
                <span key={item.value} className="flex items-center gap-1.5 text-[10px] font-medium text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.value}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {selectedDate ? (
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-on-surface">
                  Agenda{' '}
                  {new Date(selectedDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <button onClick={() => setSelectedDate(null)} className="text-xs font-semibold text-primary hover:underline">
                  Lihat semua
                </button>
              </div>
            ) : (
              <div className="flex gap-2 bg-surface-container-low p-1 rounded-full flex-wrap">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`px-3.5 py-1.5 text-[11px] font-bold rounded-full transition-all ${
                      activeFilter === f.key ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
            {selectedDate && (
              <button
                onClick={() => handleOpenAdd(selectedDate)}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah untuk tanggal ini
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-surface-container-highest rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : visibleAgendas.length === 0 ? (
            <div className="glass-card rounded-2xl p-10 text-center text-sm text-on-surface-variant">
              Belum ada agenda pada rentang ini.
            </div>
          ) : (
            <div className="space-y-2.5">
              {visibleAgendas.map((agenda) => (
                <AgendaListItem key={agenda.id} agenda={agenda} onClick={setDetailAgenda} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AgendaFormModal
        isOpen={isFormOpen}
        initialData={editingAgenda}
        defaultDate={formDefaultDate}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <AgendaDetailModal agenda={detailAgenda} onClose={() => setDetailAgenda(null)} onEdit={handleOpenEdit} onDelete={handleDelete} />
    </div>
  );
}