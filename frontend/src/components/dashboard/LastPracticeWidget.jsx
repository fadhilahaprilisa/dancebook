import { CalendarDays, UserCheck, UserX, HeartPulse, MessageCircleWarning } from 'lucide-react';

function formatTanggal(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function LastPracticeWidget({ data, isLoading }) {
  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-primary" />
        <h2 className="text-sm font-semibold text-on-surface">Latihan Terakhir</h2>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-4 w-40 bg-surface-container-highest rounded animate-pulse" />
          <div className="h-16 bg-surface-container-highest rounded-xl animate-pulse" />
        </div>
      ) : !data ? (
        <p className="text-sm text-on-surface-variant">Belum ada data latihan.</p>
      ) : (
        <>
          <p className="text-sm text-on-surface-variant mb-4">{formatTanggal(data.tanggal)}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary-container/60 rounded-xl p-3 flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-on-secondary-container" />
              <div>
                <p className="text-lg font-bold text-on-secondary-container leading-none">
                  {data.hadir}
                </p>
                <p className="text-[11px] text-on-secondary-container/80">Hadir</p>
              </div>
            </div>
            <div className="bg-surface-container rounded-xl p-3 flex items-center gap-2.5">
              <MessageCircleWarning className="w-4 h-4 text-on-surface-variant" />
              <div>
                <p className="text-lg font-bold text-on-surface leading-none">{data.izin}</p>
                <p className="text-[11px] text-on-surface-variant">Izin</p>
              </div>
            </div>
            <div className="bg-surface-container rounded-xl p-3 flex items-center gap-2.5">
              <HeartPulse className="w-4 h-4 text-on-surface-variant" />
              <div>
                <p className="text-lg font-bold text-on-surface leading-none">{data.sakit}</p>
                <p className="text-[11px] text-on-surface-variant">Sakit</p>
              </div>
            </div>
            <div className="bg-error-container/60 rounded-xl p-3 flex items-center gap-2.5">
              <UserX className="w-4 h-4 text-on-error-container" />
              <div>
                <p className="text-lg font-bold text-on-error-container leading-none">
                  {data.alfa}
                </p>
                <p className="text-[11px] text-on-error-container/80">Alfa</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}