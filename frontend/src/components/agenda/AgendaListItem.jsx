import { Clock, MapPin } from 'lucide-react';
import { getActivityColor } from '../../utils/agendaTypes';

function formatTanggalPendek(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AgendaListItem({ agenda, onClick }) {
  const color = getActivityColor(agenda.activityType);

  return (
    <button
      onClick={() => onClick(agenda)}
      className="w-full flex items-start gap-3 px-4 py-3.5 rounded-2xl bg-surface hover:bg-primary/5 transition-colors text-left border border-surface-container-highest"
    >
      <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-on-surface truncate">{agenda.title}</p>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
            style={{ backgroundColor: `${color}22`, color }}
          >
            {agenda.activityType}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] text-on-surface-variant">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {formatTanggalPendek(agenda.date)}
            {agenda.startTime && ` • ${agenda.startTime}${agenda.endTime ? '–' + agenda.endTime : ''}`}
          </span>
          {agenda.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {agenda.location}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}