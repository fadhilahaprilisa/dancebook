import { Play, ImageOff } from 'lucide-react';

function formatTanggal(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function MediaGrid({ items, onOpen }) {
  if (items.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center text-sm text-on-surface-variant">
        Belum ada dokumentasi pada kategori ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onOpen(item)}
          className="group relative aspect-square rounded-2xl overflow-hidden bg-surface-container-low text-left"
        >
          {item.mediaUrl ? (
            item.mediaType === 'video' ? (
              <>
                <video src={item.mediaUrl} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-4 h-4 text-primary ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </>
            ) : (
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
              <ImageOff className="w-6 h-6" />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-white text-xs font-semibold truncate">{item.title}</p>
            <p className="text-white/80 text-[10px]">{formatTanggal(item.activityDate)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}