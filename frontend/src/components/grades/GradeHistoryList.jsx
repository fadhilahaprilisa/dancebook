export default function GradeHistoryList({ student, history, isLoading }) {
  if (!student) return null;

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-bold text-on-surface mb-4">Riwayat Nilai — {student.name}</h3>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-14 bg-surface-container-highest rounded-xl animate-pulse" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <p className="text-xs text-on-surface-variant">Belum ada riwayat nilai untuk murid ini.</p>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <details key={entry.year} className="bg-surface-container-low rounded-xl p-4 group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-xs font-bold text-on-surface">Tahun {entry.year}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container">
                  Nilai {entry.grade}
                </span>
              </summary>
              <ul className="mt-3 space-y-1">
                {entry.checklist.map((item) => (
                  <li key={item} className="text-[11px] text-on-surface-variant flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}