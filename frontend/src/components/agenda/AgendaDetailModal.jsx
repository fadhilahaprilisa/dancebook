import { X, Clock, MapPin, Trash2, Pencil } from 'lucide-react';
import { getActivityColor } from '../../utils/agendaTypes';

function formatTanggal(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AgendaDetailModal({ agenda, onClose, onEdit, onDelete }) {
  if (!agenda) return null;
  const color = getActivityColor(agenda.activityType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${color}22`, color }}>
            {agenda.activityType}
          </span>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-primary/10 text-on-surface-variant" aria-label="Tutup">
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-lg font-bold text-on-surface mb-3">{agenda.title}</h2>

        <div className="space-y-2 text-sm text-on-surface-variant">
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {formatTanggal(agenda.date)}
            {agenda.startTime && ` • ${agenda.startTime}${agenda.endTime ? '–' + agenda.endTime : ''}`}
          </p>
          {agenda.location && (
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {agenda.location}
            </p>
          )}
        </div>

        {agenda.description && (
          <p className="text-sm text-on-surface-variant mt-4 leading-relaxed border-t border-surface-container-highest pt-4">
            {agenda.description}
          </p>
        )}

        <div className="flex gap-3 pt-6">
          <button
            onClick={() => onEdit(agenda)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => onDelete(agenda)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-error-container/60 text-on-error-container text-sm font-medium hover:bg-error-container transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}