import { X, Trash2, Calendar } from 'lucide-react';

function formatTanggal(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function MediaLightbox({ item, onClose, onDelete }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-black flex items-center justify-center max-h-[60vh]">
          {item.mediaType === 'video' ? (
            <video src={item.mediaUrl} controls className="max-h-[60vh] w-full" />
          ) : (
            <img src={item.mediaUrl} alt={item.title} className="max-h-[60vh] w-full object-contain" />
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-on-surface">{item.title}</h3>
          <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-1">
            <Calendar className="w-3.5 h-3.5" /> {formatTanggal(item.activityDate)}
          </p>
          {item.description && (
            <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">{item.description}</p>
          )}

          <button
            onClick={() => onDelete(item)}
            className="mt-5 flex items-center gap-2 text-xs font-semibold text-error hover:underline"
          >
            <Trash2 className="w-3.5 h-3.5" /> Hapus Dokumentasi
          </button>
        </div>
      </div>
    </div>
  );
}