const STATUS_OPTIONS = [
  { value: 'hadir', label: 'Hadir', className: 'bg-secondary-container text-on-secondary-container' },
  { value: 'izin', label: 'Izin', className: 'bg-primary-container text-on-primary-container' },
  { value: 'sakit', label: 'Sakit', className: 'bg-surface-container-highest text-on-surface-variant' },
  { value: 'alfa', label: 'Alfa', className: 'bg-error-container text-on-error-container' },
];

export default function AttendanceStatusRow({ student, status, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5 flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-bold shrink-0">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-on-surface truncate">{student.name}</p>
          <p className="text-[11px] text-on-surface-variant">Kelas {student.kelas}</p>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap justify-end">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(student.id, opt.value)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              status === opt.value
                ? `${opt.className} ring-2 ring-primary/40`
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}